import React, { useEffect, useState } from 'react';
import { Grid, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
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
  const [bookReviews, setBookReviews] = useState(null);

  useEffect(() => {
    const fetchBookReviewsOnBook = async () => {
      const bookReviewsOnBookQuery = await axios.get(
        `http://localhost:3001/api/reviews/${book_id}`
      );

      setBookReviews(bookReviewsOnBookQuery.data.reviews);
    };

    fetchBookReviewsOnBook();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container direction='row' spacing={2}>
      {bookReviews &&
        bookReviews.map((review, index) => {
          return (
            <Grid container item xs={12} key={index}>
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
                    <span className={classes.username}>{review.username}</span>
                  </Link>
                </Typography>
                <Typography className={classes.review}>
                  <br />
                  {review.review}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
    </Grid>
  );
};
