require('dotenv').config();
const signInRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

signInRouter.post('/', async (request, response) => {
  const body = request.body;
  console.log(`${body.username} is attempting to sign in...`);

  const userQuery = await db.query('SELECT * FROM USERS WHERE USERNAME=$1', [
    body.username,
  ]);

  const user = userQuery.rows[0];
  const isCorrectPassword =
    userQuery.rowCount === 0
      ? false
      : await bcrypt.compare(body.password, user.hashedpassword);

  if (!isCorrectPassword) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userInfo = { user_id: user.user_id, username: user.username };
  const accessToken = generateAccessToken(userInfo);
  const refreshToken = generateRefreshToken(userInfo);
  await db.query('UPDATE users SET token=$1 WHERE user_id=$2', [
    refreshToken,
    userInfo.user_id,
  ]);

  console.log(`${body.username} successfully signed in!`);
  response.cookie('refreshToken', refreshToken, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  });
  response.json({ accessToken: accessToken });
});

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};
module.exports = signInRouter;
