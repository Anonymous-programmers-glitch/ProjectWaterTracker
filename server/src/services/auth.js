import createHttpError from 'http-errors';
import path from 'node:path';
import fs from 'node:fs/promises';
import Handlebars from 'handlebars';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UserCollection } from '../db/models/User.js';
import { SessionCollection } from '../db/models/Session.js';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';
import {
  // FIFTEEN_SECONDS,
  // FIFTEEN_MINUTES,
  THIRTY_DAYS,
  SMTP,
  TEMPLATES_DIR,
  TWO_HOURS,
} from '../constants/index.js';
import {
  getFullNameFromGoogleTokenPayload,
  validateCode,
} from '../utils/googleOAuth2.js';

const appDomain = env('APP_DOMAIN');
const senderEmail = env(SMTP.SMTP_FROM);
const jwtSecret = env('JWT_SECRET');

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    // accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    // accessTokenValidUntil: new Date(Date.now() + FIFTEEN_SECONDS),
    accessTokenValidUntil: new Date(Date.now() + TWO_HOURS),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const findSession = (filter) => SessionCollection.findOne(filter);

export const findUser = (filter) => UserCollection.findOne(filter);

export const signup = async (payload) => {
  const { email, password } = payload;

  const user = await findUser({ email });
  if (user) throw createHttpError(409, 'Email in use!');

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  const emailTemplatePath = path.join(TEMPLATES_DIR, 'verify-email.html');

  const templateSource = await fs.readFile(emailTemplatePath, 'utf-8');

  const template = Handlebars.compile(templateSource);

  const token = jwt.sign({ email }, jwtSecret, { expiresIn: '24h' });

  const html = template({
    link: `${appDomain}/auth/verify?token=${token}`,
    currentYear: new Date().getFullYear(),
  });

  await sendEmail({
    from: senderEmail,
    to: email,
    subject: 'Verify email',
    html,
  });

  return newUser;
};

export const verifyUser = async (token) => {
  try {
    const { email } = jwt.verify(token, jwtSecret);
    const user = await findUser({ email });
    if (!user) {
      throw createHttpError(404, `${email} not found!`);
    }

    return await UserCollection.findByIdAndUpdate(user._id, { verify: true });
  } catch (error) {
    throw createHttpError(401, error.message);
  }
};

export const login = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid!');
  }

  if (!user.verify) {
    throw createHttpError(401, 'Email not verified!');
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Email or password invalid!');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  const session = await SessionCollection.create({
    userId: user._id,
    ...newSession,
  });

  return {
    user,
    session,
  };
};

export const logout = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const refreshSession = async ({ sessionId, refreshToken }) => {
  const session = await findSession({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  if (Date.now() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session token expired!');
  }

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });

  const newSession = createSession();

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const requestResetToken = async (email) => {
  const user = await findUser({ email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = await fs.readFile(resetPasswordTemplatePath, 'utf-8');

  const template = Handlebars.compile(templateSource);

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    jwtSecret,
    {
      expiresIn: '5m',
    },
  );

  const html = template({
    name: user.name ?? 'Guest',
    // link: `${appDomain}/auth/reset-pwd?token=${resetToken}`,
    link: `http://localhost:5173/forgotpassword?token=${resetToken}`,
    currentYear: new Date().getFullYear(),
  });

  await sendEmail({
    from: senderEmail,
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (err) {
    console.error('Failed token:', err.message);
    throw createHttpError(401, 'Token is expired or invalid!');
  }

  const user = await findUser({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UserCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};

export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401, 'Unauthorized!');

  let user = await findUser({ email: payload.email });
  if (!user) {
    const password = await bcrypt.hash(randomBytes(10), 10);
    user = await UserCollection.create({
      name: getFullNameFromGoogleTokenPayload(payload),
      email: payload.email,
      password,
    });
  }

  const newSession = createSession();

  return await SessionCollection.create({
    userId: user._id,
    ...newSession,
  });
};
