import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useToken } from '../services/TokenContext';
import jwt_decode from 'jwt-decode';
import { BookDescription } from '../components/books/BookDescription';
import { BookImage } from '../components/books/BookImage';
import { AddToList } from '../components/books/AddToList';
import { BookReviews } from '../components/books/BookReviews';
import { PostBookReview } from '../components/books/PostBookReview';

const useStyles = makeStyles({
  reviewHeaderText: {
    flexGrow: '1',
  },
  reviewButton: {
    height: '50px',
    width: '150px',
  },
  loading: {
    textAlign: 'center',
  },
});

export const BookPage = () => {
  const classes = useStyles();
  const accessToken = useToken();
  const [book, setBook] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [status, setStatus] = useState(0);
  const [pagesRead, setPagesRead] = useState(0);
  const [score, setScore] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const fetchBookInformation = async () => {
      try {
        const bookInformation = await axios.get(
          `http://localhost:3001/api/books/${id}`
        );

        if (bookInformation.data) {
          setBook(bookInformation.data);
        }
      } catch (e) {
        window.alert('ERROR: Unable to fetch book information.');
        setBook(null);
      }
    };

    fetchBookInformation();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchUserInfoOnBook = async () => {
      const userInfoOnBookQuery = await axios.get(
        `http://localhost:3001/api/users/${
          jwt_decode(accessToken).user_id
        }/${id}`
      );

      const userInfoOnBook = userInfoOnBookQuery.data;
      if (userInfoOnBook.status !== -1) {
        setStatus(userInfoOnBook.status);
        setPagesRead(userInfoOnBook.pagesread);
        setScore(userInfoOnBook.score);
      }
    };
    if (accessToken == null) return;

    fetchUserInfoOnBook();
    // eslint-disable-next-line
  }, [accessToken]);

  const handleFavorite = (event) => {
    event.preventDefault();
    setIsFavorited(!isFavorited);
  };

  const handleStatus = (event) => {
    event.preventDefault();
    setStatus(event.target.value);
  };

  const handlePagesRead = (event) => {
    event.preventDefault();
    setPagesRead(parseInt(event.target.value));
  };

  const handleScore = (event) => {
    event.preventDefault();
    setScore(parseInt(event.target.value));
  };

  const handleSubmitClicked = async (event) => {
    event.preventDefault();

    await axios.post(
      `http://localhost:3001/api/users/read/${id}`,
      { pagesRead, status, score },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return (
    <>
      {book ? (
        <Grid container>
          <Grid container item justifyContent='center' xs={3}>
            <Grid container direction='column'>
              <Grid container item justifyContent='center'>
                <BookImage
                  book={book}
                  isFavorited={isFavorited}
                  handleFavorite={handleFavorite}
                />
              </Grid>
              <Grid container item>
                {accessToken ? (
                  <AddToList
                    book={book}
                    handleSubmitClicked={handleSubmitClicked}
                    handleStatus={handleStatus}
                    handlePagesRead={handlePagesRead}
                    pagesRead={pagesRead}
                    score={score}
                    status={status}
                    handleScore={handleScore}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid container item direction='row' xs={9}>
            <>
              <Typography variant='h4'>{book.title}</Typography>
              {book.description ? <BookDescription book={book} /> : <></>}
              <Typography variant='h4' className={classes.reviewHeaderText}>
                Reviews
              </Typography>
              <BookReviews book_id={id} />
            </>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};
