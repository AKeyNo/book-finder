import { Grid, Link, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import missingBookImage from '../../images/missingBookImage.png';

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
                    src={book.image !== null ? book.image : missingBookImage}
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
                <br />
                {book.status ? book.status : 'Unknown Status'}
                <br />
                {book.status != 'Plan to Read' ? `${book.pagesRead}/` : null}
                {book.pageCount != undefined ? book.pageCount : '?'}
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
