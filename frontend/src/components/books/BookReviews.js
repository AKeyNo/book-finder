import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { PostBookReview } from './PostBookReview';
import { useToken } from '../../services/TokenContext';

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
  },
  review: {
    padding: '20px',
    paddingTop: '0px',
  },
});

export const BookReviews = ({ book_id }) => {
  const classes = useStyles();
  const accessToken = useToken();

  const [bookReviews, setBookReviews] = useState(null);
  const [isReviewActive, setIsReviewActive] = useState(true);

  const handleSubmitReview = async (event, review) => {
    event.preventDefault();
    console.log(`${postBookReviewURL}/${book_id}/`);
    const sentBookReview = await axios.post(
      `${postBookReviewURL}/${book_id}/`,
      { review },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    console.log(sentBookReview);
    setIsReviewActive(false);
    console.log(review);
  };

  useEffect(() => {
    const fetchBookReviewsOnBook = async () => {
      const bookReviewsOnBookQuery = await axios.get(
        `http://localhost:3001/api/reviews/${book_id}`
      );
      console.log(bookReviewsOnBookQuery);
      setBookReviews(bookReviewsOnBookQuery.data.reviews);
    };

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
                      className={classes.bookInformation}
                    >
                      <span className={classes.username}>
                        {review.username}
                      </span>
                    </Link>
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
