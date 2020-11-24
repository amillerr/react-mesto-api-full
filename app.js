const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cors = require('cors');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const indexRouter = require('./routes/index');

const { loginValidate, registerValidate } = require('./middlewares/validRequest');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', loginValidate, login);
app.post('/signup', registerValidate, createUser);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);
app.use('/', indexRouter);

app.use(errorLogger);
app.use(errors());

app.use((error, req, res) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
