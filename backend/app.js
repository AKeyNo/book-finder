const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req.body.name);
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  console.log(req.body.name);
  res.end();
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
