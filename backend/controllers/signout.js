require('dotenv').config();
const signOutRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const jwt_decode = require('jwt-decode');
const middleware = require('../utils/middleware');

signOutRouter.post(
  '/',
  middleware.authenticateToken,
  async (request, response) => {
    console.log(`${request.user.username} is trying to sign out...`);

    const signOutQuery = await db.query(
      'UPDATE users SET token=NULL WHERE user_id=$1',
      [request.user.user_id]
    );

    if (signOutQuery.rowCount > 0) {
      console.log(`${request.user.username} successfully signed out!`);
      response.clearCookie('refreshToken', { domain: 'localhost' });
      return response
        .status(200)
        .json({ message: 'You have successfully signed out!' });
    } else {
      console.log(`${request.user.username}'s sign out attempt failed...'`);
      return response.status(500).json({
        message:
          'Something went wrong while trying to log out. Please try again later.',
      });
    }
  }
);

module.exports = signOutRouter;
