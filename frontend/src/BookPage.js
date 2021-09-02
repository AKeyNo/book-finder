import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, Collapse } from '@material-ui/core';
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

export const BookPage = () => {
  const classes = useStyles();
  const [book, setBook] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    axios
      .get('http://localhost:3001/api/books/' + id)
      .then((data) => {
        console.log(data.data);
        if (data.data) {
          setBook(data.data);
        }
      })
      .catch((error) => {
        window.alert(error);
        setBook(null);
      });
    console.log('yo');
  }, [id]);

  const handleCollapse = (event) => {
    event.preventDefault();
    setIsCollapsed(!isCollapsed);
  };

  const handleFavorite = (event) => {
    event.preventDefault();
    setIsFavorited(!isFavorited);
  };

  const BookDescription = React.memo(() => {
    return (
      <>
        <Grid container item xs={12}>
          <Collapse in={!isCollapsed} collapsedSize={200}>
            <div dangerouslySetInnerHTML={{ __html: book.description }} />
          </Collapse>

          {/* {book.description.replace(/(<([^>]+)>)/gi, '')} */}
        </Grid>
        <Grid container item xs={12}>
          <Button className={classes.changePage} onClick={handleCollapse}>
            {isCollapsed ? '∨' : '∧'}
          </Button>
        </Grid>
      </>
    );
  });

  const BookImage = () => {
    return (
      <div>
        <img
          className={classes.bookImage}
          src={book.imageLinks.thumbnail}
          alt={book.title}
        />
        <Button
          color='primary'
          className={classes.favorite}
          onClick={handleFavorite}
        >
          {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
      </div>
    );
  };

  const BookInformation = React.memo(() => {
    return (
      <Grid container spacing={1}>
        <Grid container item xs={false} sm={1} />
        <Grid container justifyContent={'center'} item xs={3}>
          <BookImage />
        </Grid>
        <Grid container item direction='row' spacing={2} xs={7}>
          <Grid container item xs={12} />
          <Grid container item xs={12}>
            {book.title}
          </Grid>
          <BookDescription />
          <Grid container item xs={12} />
        </Grid>
        <Grid container justifyContent={'center'} item xs={6}></Grid>
        <Grid container item xs={false} sm={1} />
      </Grid>
    );
  }, [book, classes]);
  // make it yourself
  return <>{book ? <BookInformation /> : <CircularProgress />}</>;
};
