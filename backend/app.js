const express = require('express');

const mongoose = require('mongoose');

const { errors } = require('celebrate');
// eslint-disable-next-line import/no-unresolved
// const helmet = require('helmet');

const app = express();
app.use(express.json());

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// eslint-disable-next-line import/no-unresolved, import/extensions
const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

const { login, createUser } = require('./controllers/users');

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);
app.use(usersRouter);
app.use(cardsRouter);

mongoose.connect(DB_URL);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { message, statusCode = 500 } = err;
  console.log(message);
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

// app.use(helmet());

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://tzarbasil.nomoredomainsicu.ru',
  'http://tzarbasil.nomoredomainsicu.ru',
  'localhost:3000'
];

const { method } = req;

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

app.use(function (req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
