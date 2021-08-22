require('dotenv').config();
const booksRouter = require('express').Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

booksRouter.post('/read/', async (request, response) => {
  const user_id = request.body.user_id;
  const book_id = request.body.book_id;
  const pages_read = request.body.pages_read;
  const finished = request.body.finished;

  console.log(`user_id ${user_id} is attempting to update book_id ${book_id}`);

  // check if the id exists in the users table
  try {
    const checkIDQuery = await db.query(
      'SELECT COUNT(*) FROM users WHERE user_id=$1',
      [user_id]
    );
    if (parseInt(checkIDQuery.rows[0].count) === 0) {
      await response.status(406).json({ error: `${user_id} does not exist!` });
      return;
    }
  } catch (e) {}

  // check to see if the book is real probably using axios
  try {
    await axios.get('https://www.googleapis.com/books/v1/volumes/' + book_id);
    console.log(`successfully updated ${book_id} for ${user_id}`);
    await response.status(200).json({
      message: `successfully updated ${user_id}'s book entry for ${book_id}`,
    });
  } catch (e) {
    response.status(401).json({ error: 'invalid book' });
    return;
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
});

module.exports = booksRouter;
