const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
  try {
    const token = await request.headers.authorization.split(' ')[1];

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, 'RANDOM-TOKEN');
    console.log('decodedToken', decodedToken);

    // retrieve the user details of the logged in user
    const user = await decodedToken;
    console.log('decodedToken user', user);

    request.user = user;

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    response.status(401).json({
      error: 'Unauthorized! Please login to continue',
    });
  }
};
