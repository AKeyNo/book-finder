import { Grid, Link, makeStyles, Paper } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  bookImage: {
    display: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookInformation: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const BooksRead = ({ books }) => {
  const classes = useStyles();

  const BookList = () => {
    return books.map((book, index) => {
      console.log(book);
      return (
        <Grid item xs={12} key={index}>
          <Paper elevation={0} variant='outlined'>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <a href={`/book/` + book.book_id}>
                  <img
                    className={classes.bookImage}
                    src={
                      book.image !== undefined
                        ? book.image
                        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Missing.png/440px-Missing.png'
                    }
                    alt={book.title}
                  />
                </a>
              </Grid>
              <Grid item xs={8}>
                <Link
                  href={`/book/` + book.book_id}
                  color='inherit'
                  className={classes.bookInformation}
                >
                  {book.title}
                </Link>
                <br />
                {book.authors ? book.authors : 'Unknown Author'}
                <br />
                {book.status ? book.status : 'Unknown Status'}
                <br />
                <br />
                Rating: {book.score ? `${book.score}/10` : 'Unrated'}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      );
    });
  };

  return (
    <Grid container spacing={1}>
      <BookList />
    </Grid>
  );
  //   return <div>{books && books[0].book_id}</div>;
};
