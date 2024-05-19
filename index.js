const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const products = require("./routes/products");
const auth = require("./middlewares/auth");
const corsOrigin = {
  origin: ["https://online-shop-97932.web.app", "http://localhost:5173"], //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};
dotenv.config();

const app = express();

app.use(cors(corsOrigin));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/products", products);

const port = process.env.PORT;
app.listen(port, () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(console.log("Connected to database"))
    .catch((err) => console.log(err));
  console.log("Port is listening", port);
});
