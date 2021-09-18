require('dotenv').config();
const signOutRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const jwt_decode = require('jwt-decode');

signOutRouter.post('/', async (request, response) => {
  const body = request.body;

  jwt.verify(body.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return response.status(403).json({ error: 'unable to sign out' });
  });

  const decodedJWT = jwt_decode(body.accessToken);
  console.log(`${decodedJWT.username} is trying to sign out...`);

  if (Date.now() > decodedJWT)
    return response
      .status(403)
      .json({ error: 'The access token has already been expired!' });

  const signOutQuery = await db.query(
    'UPDATE users SET token=NULL WHERE user_id=$1',
    [decodedJWT.user_id]
  );

  if (signOutQuery.rowCount > 0) {
    console.log(`${decodedJWT.username} successfully signed out!`);
    response.clearCookie('refreshToken', { domain: 'localhost' });
    return response
      .status(200)
      .json({ message: 'You have successfully signed out!' });
  } else {
    console.log(`${decodedJWT.username}'s sign out attempt failed...'`);
    return response.status(403).json({
      message:
        'Something went wrong while trying to log out. Please try again later.',
    });
  }
});

module.exports = signOutRouter;
