import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Typography } from '@material-ui/core';
import { useToken } from '../services/TokenContext';
import jwt_decode from 'jwt-decode';
import { BookDescription } from '../components/books/BookDescription';
import { BookImage } from '../components/books/BookImage';
import { AddToList } from '../components/books/AddToList';

const useStyles = makeStyles({
  loading: {
    justifyContent: 'center',
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
    axios
      .get(`http://localhost:3001/api/books/${id}`)
      .then((data) => {
        console.log(data.data);
        if (data.data) {
          setBook(data.data);
        }
      })
      .then(() => {})
      .catch((error) => {
        window.alert(error);
        setBook(null);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (accessToken == null) return;
    axios
      .get(
        `http://localhost:3001/api/users/${
          jwt_decode(accessToken).user_id
        }/${id}`
      )
      .then((data) => {
        const userInfoOnBook = data.data;
        if (data.data.status !== -1) {
          console.log(data.data);
          setStatus(userInfoOnBook.status);
          setPagesRead(userInfoOnBook.pagesread);
          setScore(userInfoOnBook.score);
        }
      });
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
        <Grid container spacing={8}>
          <Grid container item xs={false} sm={1} />
          <Grid container justifyContent={'center'} item xs={3}>
            <BookImage
              book={book}
              isFavorited={isFavorited}
              handleFavorite={handleFavorite}
            />
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
          <Grid container item direction='row' spacing={2} xs={7}>
            <Grid container item xs={12} />
            <Grid container item xs={12}>
              <Typography variant='h4' gutterBottom>
                {book.title}
              </Typography>
            </Grid>
            <BookDescription book={book} />
            <Grid container item xs={12} />
          </Grid>
          <Grid container justifyContent={'center'} item xs={6}></Grid>
          <Grid container item xs={false} sm={1} />
        </Grid>
      ) : (
        <CircularProgress className={classes.loading} />
      )}
    </>
  );
};
