import React from 'react';
import Typography from '@material-ui/core/Typography';

export const About = () => {
  return (
    <>
      <Typography variant='h4' gutterBottom>
        Attributions
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        Google Books™ service is a trademark of Google LLC. Any content you
        submit through the Books API, including your name or nicknames, may be
        made publicly available on Google services as described by the Books
        Privacy Policy at{' '}
        <a href='https://books.google.com/googlebooks/privacy.html'>
          https://books.google.com/googlebooks/privacy.html
        </a>{' '}
        and Help Center article at{' '}
        <a href='https://support.google.com/books/bin/answer.py?hl=en&answer=100088'>
          https://support.google.com/books/bin/answer.py?hl=en&answer=100088
        </a>
        .
      </Typography>
    </>
  );
};
