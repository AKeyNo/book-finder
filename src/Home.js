import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Home = () => {
  const [search, setSearch] = useState(null);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Hello there.');
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .get('https://www.googleapis.com/books/v1/volumes?q=' + search)
      .then((data) => {
        console.log(data.data.items);
        console.log(data);
        if (data.data.totalItems > 0) {
          setBook(data.data.items[0].volumeInfo);
          // console.log(book.imageLinks);
        } else {
          setBook(null);
          window.alert(search + ' did not return any results.');
        }
      })
      .catch((error) => {
        window.alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const BookInformation = () => {
    return (
      <div>
        <img
          src={
            book.imageLinks !== undefined
              ? book.imageLinks.thumbnail
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Missing.png/440px-Missing.png'
          }
          alt={book.title}
        />
      </div>
    );
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
      {!loading ? book && <BookInformation /> : 'loading'}
    </>
  );
};
