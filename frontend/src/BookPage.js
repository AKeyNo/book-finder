import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

export const BookPage = () => {
  const [book, setBook] = useState(null);
  const [isBookFound, setIsBookFound] = useState(true);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    console.log(id);
    axios
      .get('http://localhost:3001/api/books/' + id)
      .then((data) => {
        console.log(data.data);
        if (data.data) {
          setBook(data.data);
        } else {
          setIsBookFound(false);
        }
      })
      .catch((error) => {
        window.alert(error);
        setBook(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return <div>{book ? book.title : <CircularProgress />}</div>;
};
