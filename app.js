const express = require("express");
const mongoose = require("mongoose");
const { userRoutes } = require("./routes/users");
const { cardRoutes } = require("./routes/cards");

async function start() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mestodb", {});
  } catch (err) {
    console.log(err);
  }
}

const app = express();

start();

app.use((req, res, next) => {
  req.user = {
    _id: "6395fa72fa8e06ecf995b0f9",
  };

  next();
});

const { PORT = 3000 } = process.env;

app.use(userRoutes);

app.use(cardRoutes);

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
