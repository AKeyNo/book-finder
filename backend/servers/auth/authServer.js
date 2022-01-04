require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const tokenRouter = require('../../controllers/token');
const middleware = require('../../utils/middleware');
const signInRouter = require('../../controllers/signin');
const signUpRouter = require('../../controllers/signup');
const signOutRouter = require('../../controllers/signout');
const port = process.env.AUTHPORT || 4001;

app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(middleware.requestLogger);

app.use('/api/signin', signInRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/signout', signOutRouter);
app.use('/api/token', tokenRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
