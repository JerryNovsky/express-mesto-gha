/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');
const { NOT_FOUND } = require('./utils/errors');

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
app.use(express.json());
app.use(helmet());
app.use(limiter);

start();

app.use((req, res, next) => {
  req.user = {
    _id: '6395fa72fa8e06ecf995b0f9',
  };

  next();
});

const { PORT = 3000 } = process.env;

app.use(userRoutes);

app.use(cardRoutes);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: `${NOT_FOUND} - Page not found` });
});

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
