require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", (err) => console.log("Connected to DB"));

app.use(express.json());

const router = require("./routes/movie");
app.use("/movie", router);

app.listen(8000, () => console.log("Server Started"));
