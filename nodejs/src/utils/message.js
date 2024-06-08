const message = {
  commonMsg: {
    somethingWentWrong: 'Something went wromg!!',
    apiReqNotFound: 'API Request not found!',
  },
  jwtToken: {
    inValidToken: 'Unauthorized token',
    tokenRequired: 'Token is required',
    sessionExpire: 'Session is expire.',
  },
  database: {
    connectionSuccess: 'Database connected successfully',
  },
  auth: {
    emailAlreadyExits: 'Email already exist',
    registerSuccess: 'Rregistered successfully.',
    verifyEmail: 'Please verify your email',
    loginSuccess: 'Login successful',
    incorrectEmail: 'Email not found',
    incorrectPassword: 'Password is incorrect',
  },
  article: {
    articleGetSuccess: 'Data get successfully.',
    articleAddSuccess: 'Article added successfully.',
    articleUpdated: 'Article updated successfully.',
    articleNotFound: 'Article not found.',
    articleDeleted: 'Article deleted successfully.',
  },
};

module.exports = message;
