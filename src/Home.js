import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

export const Home = () => {
  const [search, setSearch] = useState(null);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Hello there.");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=" + search)
      .then((data) => {
        console.log(data.data.items);
        console.log(data);
        if (data.data.totalItems > 0) {
          setBook(data.data.items[0].volumeInfo);
          // console.log(book.imageLinks);
        } else {
          setBook(null);
          window.alert(search + " did not return any results.");
        }
      })
      .catch((error) => {
        window.alert(error);
        setBook(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //9x9 grid or something with a page next

  const BookInformation = useCallback(() => {
    return (
      <Paper elevation={0} variant="outlined">
        <img
          src={
            book.imageLinks !== undefined
              ? book.imageLinks.thumbnail
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Missing.png/440px-Missing.png"
          }
          alt={book.title}
        />
        <div>{book.title}</div>
      </Paper>
    );
  }, [book]);

  return (
    <>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Enter book name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
      {!loading ? book && <BookInformation /> : <CircularProgress />}
    </>
  );
};
