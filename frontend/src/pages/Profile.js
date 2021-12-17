import { CircularProgress, Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BooksRead } from '../components/profile/BooksRead';
import { Summary } from '../components/profile/Summary';
// import { useToken, useTokenUpdate } from '../services/TokenContext';
// import axios from 'axios';

export const Profile = () => {
  const { user_id } = useParams();
  // const accessToken = useToken();
  // const updateAccessToken = useTokenUpdate();
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchUserReadList = async () => {
      try {
        const readListQuery = await axios.get(
          `http://localhost:3001/api/users/${user_id}/read`
        );

        if (readListQuery) {
          setBooks(readListQuery.data.books);
        }
      } catch (e) {
        window.alert(`ERROR: Could not query read list for ${user_id}`);
        console.log(e);
      }
    };

    fetchUserReadList();
    // eslint-disable-next-line
  }, []);

  const Layout = () => {
    return (
      <Grid container spacing={8}>
        <Grid container item xs={12} sm={4}>
          <Summary user={user_id} />
        </Grid>
        <Grid container item xs={12} sm={8}>
          <BooksRead books={books} />
        </Grid>
      </Grid>
    );
  };

  return <div>{books ? <Layout /> : <CircularProgress />}</div>;
};
