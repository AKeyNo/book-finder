import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  authors: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  bookSearch: {
    textAlign: 'center',
    margin: 16,
    marginBottom: 0,
  },
  bookImage: {
    margin: 'auto',
    marginTop: 16,
    display: 'block',
    width: 'auto',
    height: '150px',
  },
  paper: {
    width: '100%',
    height: '100%',
  },
  title: {
    margin: 8,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  gridItem: {},
  description: {},
});

export const BookSearch = () => {
  const classes = useStyles();

  // handles the input of the user
  const [input, setInput] = useState(null);
  // is an object that holds the search request and index it is at for that request
  const [search, setSearch] = useState(null);
  // holds all the books from a given request
  const [books, setBooks] = useState(null);
  // when loading is true, shows a loading icon
  const [loading, setLoading] = useState(false);
  // does not render any books when the page first loads
  const firstUpdate = useRef(true);

  // when search gets updated through either a page change or search change,
  // updates the books to include new book results
  useEffect(() => {
    // makes sure that books don't load in from null when the page loads
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    setLoading(true);
    axios
      .get(
        'https://www.googleapis.com/books/v1/volumes?maxResults=9&startIndex=' +
          search.index +
          '&q=' +
          search.search
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
  }, [search]);

  // handles when the user submits a search
  const handleSubmitSearch = (event) => {
    event.preventDefault();
    setSearch({ search: input, index: 0 });
  };

  // handles when the user looks for previous results
  const handlePreviousPage = (event) => {
    event.preventDefault();
    setSearch({ ...search, index: search.index - 9 });
  };

  // handles when the user looks for more results
  const handleNextPage = (event) => {
    event.preventDefault();
    setSearch({ ...search, index: search.index + 9 });
  };

  // returns a 3x3 grid that displays what is inside books
  const BookInformation = useCallback(() => {
    if (loading) return <></>;
    else {
      return (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={10}
        >
          {books.map((book) => {
            const bookInformation = book.volumeInfo;
            console.log(bookInformation.id);
            return (
              <Grid className={classes.gridItem} item xs={4} key={book.id}>
                <Paper
                  className={classes.paper}
                  elevation={0}
                  variant='outlined'
                >
                  <Link to={book.id !== undefined ? '/book/' + book.id : '/'}>
                    <img
                      className={classes.bookImage}
                      src={
                        bookInformation.imageLinks !== undefined
                          ? bookInformation.imageLinks.thumbnail
                          : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Missing.png/440px-Missing.png'
                      }
                      alt={bookInformation.title}
                    />
                  </Link>
                  <Typography
                    className={classes.title}
                    variant='h6'
                    gutterBottom
                  >
                    {bookInformation.title}
                  </Typography>

                  {bookInformation.authors !== undefined ? (
                    <Typography
                      className={classes.authors}
                      variant='subtitle1'
                      gutterBottom
                    >
                      {bookInformation.authors.join(', ')}
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.authors}
                      variant='subtitle2'
                      gutterBottom
                    >
                      Unknown Author
                    </Typography>
                  )}
                  <Typography
                    className={classes.description}
                    variant='body1'
                  ></Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      );
    }
  }, [books, classes, loading]);

  return (
    <>
      <form
        className={classes.bookSearch}
        onSubmit={handleSubmitSearch}
        noValidate
        autoComplete='off'
      >
        <TextField
          id='standard-basic'
          label='Enter book name'
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type='submit'>Submit</Button>
      </form>

      <div style={{ textAlign: 'center' }}>
        <img
          className={classes.bookSearch}
          src={'https://books.google.com/googlebooks/images/poweredby.png'}
          alt={'Google Books service'}
        />
      </div>

      <Grid container spacing={1}>
        <Grid container item xs={false} sm={1} />
        <Grid container justifyContent={'center'} item xs={12} sm={10}>
          {!loading ? books && <BookInformation /> : <CircularProgress />}
        </Grid>
        <Grid container item xs={false} sm={1} />
        <Grid container justifyContent={'center'} item xs={12}>
          {books && search.index > 0 ? (
            <Button className={classes.changePage} onClick={handlePreviousPage}>
              {'<'}
            </Button>
          ) : (
            <></>
          )}
          {books ? (
            <Button className={classes.changePage} onClick={handleNextPage}>
              {'>'}
            </Button>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  );
};
