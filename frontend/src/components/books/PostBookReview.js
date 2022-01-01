import React, { useRef } from 'react';
import {
  Button,
  FormControl,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles({
  formControl: {
    padding: '15px',
  },
  paper: { padding: '15px' },
  loading: {
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
});

export const PostBookReview = ({ handleSubmitReview, review }) => {
  const classes = useStyles();

  const bookReview = useRef('');

  return (
    <form
      onSubmit={(e) => handleSubmitReview(e, bookReview.current)}
      className={classes.form}
    >
      <FormControl fullWidth className={classes.formControl}>
        <Paper className={classes.paper}>
          <TextField
            multiline
            fullWidth
            rows={5}
            maxRows={10}
            onChange={(e) => (bookReview.current = e.target.value)}
            defaultValue={review}
          ></TextField>
          <Button type='submit'>Submit Book Review</Button>
        </Paper>
      </FormControl>
    </form>
  );
};
