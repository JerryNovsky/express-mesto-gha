/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');
const { NotFoundError, notFoundMessage } = require('./utils/NotFoundError');
const { login, createUser } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const { signInValidation, createUserValidation } = require('./validators/user');

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {});
  } catch (err) {
    console.log(err);
  }
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
mongoose.set({ runValidators: true });

app.use(bodyParser.json());

app.use(express.json());
app.use(helmet());
app.use(limiter);

start();

const { PORT = 3000 } = process.env;
app.post('/signin', signInValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use(userRoutes);
app.use(cardRoutes);

app.use(errors());

app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
