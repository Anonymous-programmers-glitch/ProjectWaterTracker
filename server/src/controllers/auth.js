import {
  signup,
  login,
  logout,
  refreshSession,
  requestResetToken,
  resetPassword,
  loginOrSignupWithGoogle,
  verifyUser,
} from '../services/auth.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';

const setupSession = (res, session) => {
  const { _id, refreshToken, refreshTokenValidUntil } = session;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
};

export const signupUserController = async (req, res) => {
  const user = await signup(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { user: { email: user.email } },
  });
};

export const verifyUserController = async (req, res) => {
  const { token } = req.query;

  await verifyUser(token);

  res.redirect('https://project-water-tracker.vercel.app/success');
};

export const loginUserController = async (req, res) => {
  const { user, session } = await login(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'User successfully logged in!',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        dailyNorma: user.dailyNorma,
        avatarUrl: user.avatarUrl,
      },
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logout(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetEmailController = async (req, res) => {
  console.log('req.body.email :>> ', req.body.email);
  await requestResetToken(req.body.email);

  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent!',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    status: 200,
    message: 'Password has been successfully reset!',
    data: {},
  });
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();

  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
