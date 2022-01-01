import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { PostBookReview } from './PostBookReview';
import { useToken } from '../../services/TokenContext';
import jwt_decode from 'jwt-decode';

const postBookReviewURL = 'http://localhost:3001/api/reviews/';

const useStyles = makeStyles({
  box: {
    padding: '15px',
  },
  profilePicture: {
    height: '50px',
    width: '50px',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    paddingBottom: '0px',
  },
  username: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
    flexGrow: '1',
  },
  review: {
    padding: '20px',
    paddingTop: '0px',
  },
  manageReviewButton: {
    display: 'flex-end',
  },
});

export const BookReviews = ({ book_id }) => {
  const classes = useStyles();
  const accessToken = useToken();

  const [bookReviews, setBookReviews] = useState(null);
  const [isReviewActive, setIsReviewActive] = useState(true);

  const handleSubmitReview = async (event, review) => {
    event.preventDefault();

    try {
      await axios.post(
        `${postBookReviewURL}${book_id}/`,
        { review },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    } catch (e) {
      window.alert('Could not upload book review!');
      console.log(e);
      return;
    }

    const reviewInformation = {
      author_id: jwt_decode(accessToken).user_id,
      book_id: book_id,
      postTime: new Date(),
      review: review,
      username: jwt_decode(accessToken).username,
    };

    // sort book reviews with new review on top
    const newReviewList = bookReviews;
    newReviewList.unshift(reviewInformation);

    setBookReviews(newReviewList);
    setIsReviewActive(false);
  };

  const handleDeleteReview = async (event, reviewToRemove) => {
    event.preventDefault();

    try {
      await axios.delete(`${postBookReviewURL}${book_id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setBookReviews(
        bookReviews.filter(
          (review) => review.author_id !== reviewToRemove.author_id
        )
      );
      setIsReviewActive(true);
    } catch (e) {
      window.alert('Unable to delete book review.');
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchBookReviewsOnBook = async () => {
      const bookReviewsOnBookQuery = await axios.get(
        `http://localhost:3001/api/reviews/${book_id}`
      );

      // set the user review to the first if it is there
      // if they have a review, do not show component for making one
      const currentUserReview = bookReviewsOnBookQuery.data.reviews.filter(
        (bookReview) => bookReview.author_id === currentUser
      );

      if (currentUserReview.length === 1) {
        setIsReviewActive(false);
      }

      const otherReviews = bookReviewsOnBookQuery.data.reviews.filter(
        (bookReview) => bookReview.author_id !== currentUser
      );

      const sortedReviews = currentUserReview.concat(otherReviews);
      setBookReviews(sortedReviews);
    };
    const currentUser = jwt_decode(accessToken).user_id;
    fetchBookReviewsOnBook();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container direction='row'>
      <Grid container item xs={12}>
        {isReviewActive ? (
          <PostBookReview handleSubmitReview={handleSubmitReview} />
        ) : null}
      </Grid>

      {bookReviews &&
        bookReviews.map((review, index) => {
          return (
            <Grid container item xs={12} key={index}>
              <Box display='inline-block' className={classes.box}>
                <Paper>
                  <Typography className={classes.user}>
                    <Link
                      href={`/profile/${review.author_id}`}
                      color='inherit'
                      className={classes.bookInformation}
                    >
                      <img
                        src={`http://localhost:3001/api/users/${review.author_id}/picture`}
                        alt={'profile'}
                        className={classes.profilePicture}
                      />
                    </Link>
                    <Link
                      href={`/profile/${review.author_id}`}
                      color='inherit'
                      className={classes.username}
                    >
                      <span>{review.username}</span>
                    </Link>
                    {review.author_id === jwt_decode(accessToken).user_id ? (
                      <>
                        <Button className={classes.manageReviewButton}>
                          Edit
                        </Button>
                        <Button
                          className={classes.manageReviewButton}
                          onClick={(event) => handleDeleteReview(event, review)}
                        >
                          Delete
                        </Button>
                      </>
                    ) : null}
                  </Typography>
                  <Typography className={classes.review}>
                    <br />
                    {review.review}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          );
        })}
    </Grid>
  );
};
