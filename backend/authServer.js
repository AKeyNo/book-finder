require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const loginRouter = require('./controllers/login');
const tokenRouter = require('./controllers/token');
const middleware = require('./utils/middleware');
const signupRouter = require('./controllers/signup');
const port = process.env.AUTHPORT || 4001;

app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(middleware.requestLogger);

app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter);
app.use('/api/token', tokenRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
