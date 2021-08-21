require('dotenv').config();
const loginRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

loginRouter.get('/', async (request, response) => {
  const body = request.body;
  console.log(`${body.username} is attempting to login...`);

  const userQuery = await db.query('SELECT * FROM USERS WHERE USERNAME=$1', [
    body.username,
  ]);

  const user = userQuery.rowFs[0];
  const isCorrectPassword =
    userQuery.rowCount === 0
      ? false
      : await bcrypt.compare(body.password, user.hashedpassword);

  if (!isCorrectPassword) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userInfo = { name: user.username };
  const accessToken = generateAccessToken(userInfo);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  response.json({ accessToken, refreshToken });
});

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
};

module.exports = loginRouter;
