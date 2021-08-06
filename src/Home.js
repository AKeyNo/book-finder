import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  bookSearch: {
    textAlign: 'center',
  },
});

export const Home = () => {
  const classes = useStyles();
  const [search, setSearch] = useState(null);
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Hello there.');
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .get(
        'https://www.googleapis.com/books/v1/volumes?maxResults=9&q=' + search
      )
      .then((data) => {
        console.log(data.data);
        if (data.data.totalItems > 0) {
          setBooks(data.data.items);
          // console.log(book.imageLinks);
        } else {
          setBooks(null);
          window.alert(search + ' did not return any results.');
        }
      })
      .catch((error) => {
        window.alert(error);
        setBooks(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //9x9 grid or something with a page next

  const BookInformation = useCallback(() => {
    return (
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}
      >
        {books.map((book) => {
          const bookInformation = book.volumeInfo;
          return (
            <Grid item xs={4} key={book.id}>
              <Paper elevation={0} variant='outlined'>
                <img
                  src={
                    bookInformation.imageLinks !== undefined
                      ? bookInformation.imageLinks.thumbnail
                      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Missing.png/440px-Missing.png'
                  }
                  alt={bookInformation.title}
                />
                <div>{bookInformation.title}</div>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  }, [books]);

  return (
    <>
      <form
        className={classes.bookSearch}
        onSubmit={handleSubmit}
        noValidate
        autoComplete='off'
      >
        <TextField
          id='standard-basic'
          label='Enter book name'
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type='submit'>Submit</Button>
      </form>

      <Grid container spacing={1}>
        <Grid container item xs={false} sm={1} />
        <Grid container justifyContent={'center'} item xs={12} sm={10}>
          {!loading ? books && <BookInformation /> : <CircularProgress />}
        </Grid>
        <Grid container item xs={false} sm={1} />
        <Grid container justifyContent={'center'} item xs={12}>
          <Button className={classes.changePage}>{'<'}</Button>
          <Button className={classes.changePage}>{'>'}</Button>
        </Grid>
      </Grid>
    </>
  );
};
