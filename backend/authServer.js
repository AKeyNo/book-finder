require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const port = process.env.AUTHPORT || 4001;

app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use(middleware.requestLogger);

app.use('/api/login', loginRouter);
// app.use('/api/token');

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
