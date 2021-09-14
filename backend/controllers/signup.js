require('dotenv').config();
const signupRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

signupRouter.post('/', async (request, response) => {
  const body = request.body;
  console.log(`Attempting to create an account for ${body.username}...`);

  if (body.username.length < 3 || body.password.length < 3) {
    console.error('username and password must have 3 more more characters');
    return response.status(400).json({
      error: 'username and password must have 3 more more characters',
    });
  }

  const existsQuery = await db.query(`SELECT * FROM users WHERE username=$1`, [
    body.username,
  ]);
  if (existsQuery.rowCount >= 1) {
    console.error(`${body.username} has already been taken...`);
    return response.status(400).json({
      error: `${body.username} has already been taken...`,
    });
  }

  try {
    const countQuery = await db.query('SELECT COUNT(*) FROM users');
    const user_id = parseInt(countQuery.rows[0].count) + 1;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const accessToken = generateAccessToken({
      user_id,
      username: body.username,
    });
    const refreshToken = generateRefreshToken({
      user_id,
      username: body.username,
    });
    await db.query(
      `INSERT INTO users (user_id, username, hashedPassword, token) values ($1, $2, $3, $4) returning *`,
      [user_id, body.username, hashedPassword, refreshToken]
    );

    console.log(`Account successfully created for ${body.username}!`);
    response.cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });
    response.json({ message: `${body.username} was created!`, accessToken });
  } catch (error) {
    console.error(error);
    return response.status(400).json({
      error: 'something went wrong...',
    });
  }
});

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = signupRouter;
