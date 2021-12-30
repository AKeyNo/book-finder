// Responsible for book reviews API calls.

require('dotenv').config();
const reviewsRouter = require('express').Router();
const db = require('../db');
const middleware = require('../utils/middleware');

const MINREVIEWCHARACTERLENGTH = 4;

// GET request for a specific user's review on a specific book.
reviewsRouter.get('/:book_id/:author_id', async (request, response) => {
  const { book_id, author_id } = request.params;

  try {
    const reviewQuery = await db.query(
      '\
      SELECT u.username, br.book_id, br.author_id, br.postTime, br.review\
      FROM users u, bookReviews br\
      WHERE br.book_id=$1 AND br.author_id=$2 AND br.author_id=u.user_id',
      [book_id, author_id]
    );

    if (reviewQuery.rowCount === 0) {
      return response.status(404).json({
        error: 'That book review does not exist!',
      });
    }
    const reviewInformation = reviewQuery.rows[0];

    return response.status(200).json({
      book_id: reviewInformation.book_id,
      author_id: reviewInformation.author_id,
      username: reviewInformation.username,
      postTime: reviewInformation.postTime,
      review: reviewInformation.review,
    });
  } catch (e) {
    console.log(e);
    return response.status(500).json({ error: 'Could not get book review!' });
  }
});

// GET request for all reviews regarding a certain book.
reviewsRouter.get('/:book_id', async (request, response) => {
  const { book_id } = request.params;

  try {
    const reviewQuery = await db.query(
      '\
      SELECT u.username, br.book_id, br.author_id, br.postTime, br.review\
      FROM users u, bookReviews br\
      WHERE br.book_id=$1 AND br.author_id=u.user_id',
      [book_id]
    );

    const reviews = reviewQuery.rows;

    return response.status(200).json({
      reviews,
    });
  } catch (e) {
    console.log(e);
    return response.status(500).json({ error: 'Could not get book review!' });
  }
});

// POST request for liking a book review
reviewsRouter.post(
  '/:book_id/:author_id/like',
  middleware.authenticateToken,
  async (request, response) => {
    const { book_id, author_id } = request.params;
    const { user_id } = request.user;

    // check if that book review is already liked by the requested user
    try {
      const checkExistingQuery = await db.query(
        '\
      SELECT 1\
      FROM bookReviewLikes\
      WHERE book_id=$1 AND\
        author_id=$2 AND userWhoLiked_id=$3',
        [book_id, author_id, user_id]
      );

      if (checkExistingQuery.rowCount > 0) {
        return response.status(406).json({
          error: 'You already like this book review!',
        });
      }

      const currentTime = new Date();
      const addLikeQuery = await db.query(
        '\
      INSERT INTO bookReviewLikes (book_id, author_id, userWhoLiked_id, likedTime)\
        VALUES ($1, $2, $3, $4)',
        [book_id, author_id, user_id, currentTime]
      );

      return response.status(201).json({
        message: 'Successfully liked book review!',
      });
    } catch (e) {
      console.log(e);
      return response
        .status(500)
        .json({ error: 'Could not like book review!' });
    }
  }
);

// POST request for a creating a book review
reviewsRouter.post(
  '/:book_id',
  middleware.authenticateToken,
  async (request, response) => {
    const { book_id } = request.params;
    const { user_id } = request.user;
    const { review } = request.body;

    // check if that user has an existing review already
    try {
      const checkExistingQuery = await db.query(
        '\
      SELECT 1\
      FROM bookReviews\
      WHERE book_id=$1 AND\
        author_id=$2',
        [book_id, user_id]
      );
      // check character count if < 200
      if (review.length < MINREVIEWCHARACTERLENGTH) {
        return response
          .status(406)
          .json({ error: 'Review must be greater than 200 characters!' });
      }
      if (checkExistingQuery.rowCount > 0) {
        return response.status(406).json({
          error:
            'An existing book review already exists for that user! Edit or delete that review to modify it.',
        });
      }

      const currentTime = new Date();

      const createBookReview = await db.query(
        '\
      INSERT INTO bookReviews (book_id, author_id, postTime, review)\
      VALUES ($1, $2, $3, $4)',
        [book_id, user_id, currentTime, review]
      );

      return response.status(201).json({
        message: 'Successfully uploaded book review!',
      });
    } catch (e) {
      console.log(e);
      return response
        .status(500)
        .json({ error: 'Could not upload book review!' });
    }
  }
);

// PUT request for updating a book review
reviewsRouter.put(
  '/:book_id',
  middleware.authenticateToken,
  async (request, response) => {
    const { book_id } = request.params;
    const { user_id } = request.user;
    const { review } = request.body;
    console.log('here');
    // check if that user has an existing review already
    try {
      const checkExistingQuery = await db.query(
        '\
      SELECT 1\
      FROM bookReviews\
      WHERE book_id=$1 AND\
        author_id=$2',
        [book_id, user_id]
      );

      if (checkExistingQuery.rowCount == 0) {
        return response.status(406).json({
          error: 'There is no existing book review for that book!',
        });
      }

      // check character count if < 200
      if (review.length < MINREVIEWCHARACTERLENGTH) {
        return response
          .status(406)
          .json({ error: 'Review must be greater than 200 characters!' });
      }

      const editBookReviewQuery = await db.query(
        '\
      UPDATE bookReviews\
      SET review=$1\
      WHERE book_id=$2 AND author_id=$3',
        [review, book_id, user_id]
      );

      return response.status(201).json({
        message: 'Successfully editted book review!',
      });
    } catch (e) {
      console.log(e);
      return response
        .status(500)
        .json({ error: 'Could not edit book review!' });
    }
  }
);

// DELETE request for a specific book review
reviewsRouter.delete(
  '/:book_id',
  middleware.authenticateToken,
  async (request, response) => {
    console.log('here');
    const { book_id } = request.params;
    const { user_id } = request.user;

    try {
      const deleteBookReview = await db.query(
        '\
      DELETE FROM bookReviews\
      WHERE book_id=$1 AND author_id=$2',
        [book_id, user_id]
      );

      console.log(
        `Deleted book review for book ${book_id} for user ${user_id}`
      );
      return response
        .status(200)
        .json({ message: 'Successfully deleted book review!' });
    } catch (e) {
      console.log(e);
      return response
        .status(500)
        .json({ error: 'Could not delete book review!' });
    }
  }
);

// DELETE request for deleting a book review like
reviewsRouter.delete(
  '/:book_id/:author_id/like',
  middleware.authenticateToken,
  async (request, response) => {
    const { book_id, author_id } = request.params;
    const { user_id } = request.user;

    try {
      const removeLikeQuery = await db.query(
        '\
      DELETE FROM bookReviewLikes\
      WHERE book_id=$1 AND author_id=$2 AND userWhoLiked_id=$3',
        [book_id, user_id, user_id]
      );

      console.log(
        `Deleted book review like for book ${book_id} for user ${user_id}`
      );
      return response
        .status(200)
        .json({ message: 'Successfully removed like from book review!' });
    } catch (e) {
      console.log(e);
      return response
        .status(500)
        .json({ error: 'Could not remove like from book review!' });
    }
  }
);

module.exports = reviewsRouter;
