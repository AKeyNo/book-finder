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

// grabs readlist of the specific user
usersRouter.get('/:user_id/read', async (request, response) => {
  const { user_id } = request.params;
  try {
    const getReadListQuery = await db.query(
      'SELECT * FROM readlist WHERE user_id=$1',
      [user_id]
    );
    return response.status(200).json({ books: getReadListQuery.rows });
  } catch (e) {
    return response.status(400).json({ error: 'something went wrong...' });
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

    // quick check to see if pages_read is invalid
    if (!pages_read || isNaN(pages_read) || !Number.isInteger(pages_read)) {
      return response
        .status(401)
        .json({ error: 'pages_read is not an integer' });
    } else if (pages_read < 0) {
      return response
        .status(401)
        .json({ error: 'pages_read cannot be less than 0' });
    }

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
        return response.status(500).json({ error: 'could not query database' });
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
      } else {
        finished = pages_read == book.pageCount;
      }
    } catch (e) {
      if (e === 'PageCountException') {
        return response.status(406).json({
          error: `${pages_read} is greater than ${book.title}'s ${book.pageCount} pages`,
        });
      } else {
        return response.status(406).json({ error: 'invalid book' });
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
      console.error(e);
      return response
        .status(500)
        .json({ error: 'readlist could not be updated' });
    }

    console.log(`successfully updated ${book_id} for user_id ${user_id}`);
    response.status(200).json({
      message: `successfully updated ${user_id}'s book entry for user_id ${book_id}`,
    });
  }
);

module.exports = usersRouter;
