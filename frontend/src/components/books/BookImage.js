import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles({
  bookImage: {
    marginTop: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    width: 'auto',
    height: '300px',
  },
  favorite: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
  },
});

export const BookImage = ({ book, handleFavorite, isFavorited }) => {
  const classes = useStyles();
  console.log(book);
  return (
    <div>
      {book ? (
        <>
          <img
            className={classes.bookImage}
            src={
              book.imageLinks
                ? book.imageLinks.thumbnail
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Missing.png/440px-Missing.png'
            }
            alt={book.title}
          />
          <Button
            color='primary'
            className={classes.favorite}
            onClick={handleFavorite}
          >
            {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
        </>
      ) : null}
    </div>
  );
};
