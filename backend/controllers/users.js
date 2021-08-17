const usersRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../db');

usersRouter.get('/', async (request, response) => {
  const results = await db.query('SELECT user_id, username FROM USERS');
  console.log(results.rows);

  response.json(results.rows);
});

usersRouter.post('/signup', async (request, response) => {
  const body = request.body;
  console.log(
    `Attempting to create an account for ${request.body.username}...`
  );

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
    const userID = parseInt(countQuery.rows[0].count) + 1;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    await db.query(
      `INSERT INTO users (user_id, username, password) values ($1, $2, $3) returning *`,
      [userID, body.username, passwordHash]
    );

    response.json({ message: `${body.username} was added!` });
  } catch (error) {
    console.error(error);
    return response.status(400).json({
      error: 'something went wrong...',
    });
  }
});

module.exports = usersRouter;
