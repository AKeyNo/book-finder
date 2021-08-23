const usersRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../db');
const axios = require('axios');
const middleware = require('../utils/middleware');

usersRouter.get('/', async (request, response) => {
  const results = await db.query('SELECT user_id, username FROM USERS');
  console.log(results.rows);

  response.json(results.rows);
});

usersRouter.post('/signup', async (request, response) => {
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
    const userID = parseInt(countQuery.rows[0].count) + 1;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    await db.query(
      `INSERT INTO users (user_id, username, hashedPassword) values ($1, $2, $3) returning *`,
      [userID, body.username, hashedPassword]
    );

    response.json({ message: `${body.username} was added!` });
  } catch (error) {
    console.error(error);
    return response.status(400).json({
      error: 'something went wrong...',
    });
  }
});

usersRouter.post(
  '/read/:book_id',
  middleware.authenticateToken,
  async (request, response) => {
    console.log(request.params);
    const user_id = request.user.user_id;
    const { book_id } = request.params;
    const pages_read = request.body.pages_read;
    let book, finished;

    console.log(
      `user_id ${user_id} is attempting to update book_id ${book_id}`
    );

    // check if the id exists in the users table
    try {
      const checkIDQuery = await db.query(
        'SELECT COUNT(*) FROM users WHERE user_id=$1',
        [user_id]
      );
      if (parseInt(checkIDQuery.rows[0].count) === 0) {
        throw 'InvalidUserException';
      }
    } catch (e) {
      if (e === 'InvalidUserException') {
        return response
          .status(406)
          .json({ error: `${user_id} does not exist!` });
      } else {
        return response.status(406).json({ error: 'could not query database' });
      }
    }

    // check to see if the book is real probably using axios
    // if greater than the book's page count, throw an error
    // also update finished status
    try {
      const bookInformation = await axios.get(
        'https://www.googleapis.com/books/v1/volumes/' + book_id
      );
      book = bookInformation.data.volumeInfo;

      if (pages_read > book.pageCount) {
        throw 'PageCountException';
      } else if (pages_read == book.pageCount) {
        finished = true;
      } else {
        finished = false;
      }
    } catch (e) {
      if (e === 'PageCountException') {
        return response.status(401).json({
          error: `${pages_read} is greater than ${book.title}'s ${book.pageCount} pages`,
        });
      } else {
        return response.status(401).json({ error: 'invalid book' });
      }
    }

    // check if that user_id has a book_id in the readlist table
    // if there isn't one create one with what was retrieved
    // else update it
    try {
      await db.query(
        'INSERT INTO readlist (book_id, user_id, pages_read, finished)\
      VALUES ($1, $2, $3, $4)\
      ON CONFLICT (book_id, user_id) DO UPDATE\
      SET book_id=$1,\
        user_id=$2,\
        pages_read=$3,\
        finished=$4',
        [book_id, user_id, pages_read, finished]
      );
    } catch (e) {
      response.status(401).json({ error: 'readlist could not be updated' });
    }

    console.log(`successfully updated ${book_id} for user_id ${user_id}`);
    response.status(200).json({
      message: `successfully updated ${user_id}'s book entry for user_id ${book_id}`,
    });
  }
);

module.exports = usersRouter;
