require('dotenv').config();
const booksRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

booksRouter.post('/read/', async (request, response) => {
  const user_id = request.body.user_id;
  const book_id = request.body.book_id;
  const pages_read = request.body.pages_read;
  const finished = request.body.finished;

  console.log(`${body.user_id} is attempting to update ${body.bookid}`);

  // check if the id exists in the users table
  const checkIDQuery = await db.query(
    'SELECT COUNT(*) FROM users WHERE user_id-$1',
    [user_id]
  );

  if (parseInt(checkIDQuery.rows[0].count) !== 0) {
    request.status(406).json({ error: `${user_id} does not exist!` });
  }

  // check to see if the book is real probably using axios

  // check if that user_id has a book_id in the readlist table

  // if there isn't one create one with what was retrieved

  // else update it
});

module.exports = booksRouter;
