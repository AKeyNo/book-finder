import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { useToken } from '../services/TokenContext';
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
  bookInput: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 'auto',
  },
  submit: {
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 16,
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
      .catch((error) => {
        window.alert(error);
        setBook(null);
      });
  }, [id]);

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

    const submitRequest = await axios.post(
      `http://localhost:3001/api/users/read/${id}`,
      { pagesRead, status, score },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const BookDescription = React.memo(() => {
    return (
      <Grid container item xs={12}>
        <Typography variant='subtitle1'>
          <div dangerouslySetInnerHTML={{ __html: book.description }} />
        </Typography>
        {/* </Collapse> */}
      </Grid>
    );
  });

  const BookImage = React.memo(() => {
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
        {accessToken ? <AddToList /> : <></>}
      </div>
    );
  });

  const AddToList = React.memo(() => {
    return (
      <Paper variant='outlined'>
        <form onSubmit={handleSubmitClicked}>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            spacing={1}
          >
            <Grid container item xs={12}>
              <FormControl className={classes.bookInput}>
                <InputLabel>Status</InputLabel>
                <Select value={status} onChange={handleStatus}>
                  <MenuItem value='0'>Reading</MenuItem>
                  <MenuItem value='1'>Plan to Read</MenuItem>
                  <MenuItem value='2'>Completed</MenuItem>
                  <MenuItem value='3'>Paused</MenuItem>
                  <MenuItem value='4'>Dropped</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={12}>
              <TextField
                id='pages-read'
                label={`Page Read (${book.pageCount} total)`}
                type='number'
                onChange={handlePagesRead}
                className={classes.bookInput}
                autoFocus
                value={pagesRead}
              />
            </Grid>
            <Grid container item xs={12}>
              <FormControl className={classes.bookInput}>
                <InputLabel>Score</InputLabel>
                <Select value={score} onChange={handleScore}>
                  <MenuItem value='0'>0</MenuItem>
                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='8'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                  <MenuItem value='10'>10</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container justifyContent='center' item xs={12}>
              <Button
                type='submit'
                className={classes.submit}
                variant='outlined'
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  });

  const BookInformation = React.memo(() => {
    return (
      <Grid container spacing={8}>
        <Grid container item xs={false} sm={1} />
        <Grid container justifyContent={'center'} item xs={3}>
          <BookImage />
        </Grid>
        <Grid container item direction='row' spacing={2} xs={7}>
          <Grid container item xs={12} />
          <Grid container item xs={12}>
            <Typography variant='h4' gutterBottom>
              {book.title}
            </Typography>
          </Grid>
          <BookDescription />
          <Grid container item xs={12} />
        </Grid>
        <Grid container justifyContent={'center'} item xs={6}></Grid>
        <Grid container item xs={false} sm={1} />
      </Grid>
    );
  }, []);

  return <>{book ? <BookInformation /> : <CircularProgress />}</>;
};
