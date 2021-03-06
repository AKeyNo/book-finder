require('dotenv').config();
const tokenRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { token } = require('morgan');
const db = require('../db');

tokenRouter.post('/', async (request, response) => {
  const refreshToken = request.cookies.refreshToken;

  try {
    // check to see if there is a refresh token in the body
    if (refreshToken == null)
      return response.status(401).json({ error: 'refresh token not found...' });

    // perform query to check if that exists
    const tokenCheckQuery = await db.query(
      'SELECT COUNT(*) FROM users WHERE token=$1',
      [refreshToken]
    );
    if (parseInt(tokenCheckQuery.rows[0].count) !== 1) {
      return response.status(500).json({ error: 'something went wrong...' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return response.status(500).json({ error: 'an error has occurred...' });

      const accessToken = generateAccessToken({
        user_id: user.user_id,
        username: user.username,
      });
      response.json({ accessToken: accessToken });
    });
  } catch (e) {
    console.log(e);
  }
});

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

module.exports = tokenRouter;
