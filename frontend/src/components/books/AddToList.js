import React from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles({
  box: {
    margin: '10px',
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

export const AddToList = ({
  handleSubmitClicked,
  handleStatus,
  book,
  handlePagesRead,
  pagesRead,
  score,
  status,
  handleScore,
}) => {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmitClicked}>
      <Box className={classes.box}>
        <Paper className={classes.box}>
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
                label={`Page Read (${
                  book.pageCount !== undefined ? book.pageCount : '?'
                } total)`}
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
        </Paper>
      </Box>
    </form>
  );
};
