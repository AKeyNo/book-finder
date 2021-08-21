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

  const userInfo = { username: user.username };
  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
  response.json({ accessToken: accessToken });
});

module.exports = loginRouter;
