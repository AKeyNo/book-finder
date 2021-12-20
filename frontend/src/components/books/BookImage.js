import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import missingBookImage from '../../images/missingBookImage.png';

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
  return (
    <div>
      {book ? (
        <>
          <img
            className={classes.bookImage}
            src={book.imageLinks ? book.imageLinks.thumbnail : missingBookImage}
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
