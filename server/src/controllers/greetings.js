export const getGreetingController = async (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to the Water tracker app!',
  });
};
