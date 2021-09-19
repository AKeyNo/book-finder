require('dotenv').config();
const booksRouter = require('express').Router();
const axios = require('axios');

booksRouter.get('/search/:keywords/:index', async (request, response) => {
  const { keywords, index } = request.params;

  try {
    const results = await axios.get(
      'https://www.googleapis.com/books/v1/volumes?maxResults=9&startIndex=' +
        index +
        '&q=' +
        keywords
    );
    response.status(200).json(results.data);
  } catch (e) {
    console.error(e);
  }
});

booksRouter.get('/:book_id', async (request, response) => {
  const { book_id } = request.params;

  try {
    const results = await axios
      .get(`https://www.googleapis.com/books/v1/volumes/${book_id}`)
      .catch((e) => {
        throw `${e.response.status}: ${e.response.statusText} for ${e.config.url}`;
      });

    // console.log(results.data.volumeInfo);
    response.json(results.data.volumeInfo);
  } catch (e) {
    console.error(e);
  }
});

module.exports = booksRouter;
