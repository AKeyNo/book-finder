import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Home = () => {
  const [search, setSearch] = useState(null);
  const [book, setBook] = useState(null);

  useEffect(() => {
    console.log('Hello there.');
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get('https://www.googleapis.com/books/v1/volumes?q=' + search)
      .then((data) => {
        console.log(data.data.items);
        setBook(data.data.items[0].volumeInfo);
      });
  };

  const BookInformation = () => {
    return <>{book.title}</>;
  };

  return (
    <>
      {search}
      <form onSubmit={handleSubmit}>
        <label>
          Book:
          <input
            type='text'
            name='title'
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <input type='submit' value='Search' />
      </form>
      {book && <BookInformation />}
    </>
  );
};
