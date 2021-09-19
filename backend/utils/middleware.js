const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
  console.log('\n' + new Date().toLocaleString());
  //   console.log('Method:', request.method);
  //   console.log('Path:  ', request.path);
  //   console.log('Body:  ', request.body);
  //   console.log('---');
  next();
};

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token == null)
    return response.status(401).json({ error: 'token missing' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return response.status(401).json({ error: 'invalid token' });
    if (Date.now() / 1000 > user.exp)
      return response
        .status(403)
        .json({ error: 'The access token has already been expired!' });

    request.user = user;
    console.log(user);
    next();
  });
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  authenticateToken,
  unknownEndpoint,
  errorHandler,
};
