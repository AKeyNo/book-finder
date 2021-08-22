require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const usersRouter = require('./controllers/users');
const booksRouter = require('./controllers/books');
const middleware = require('./utils/middleware');
const port = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/books', booksRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
