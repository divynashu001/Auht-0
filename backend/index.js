const express = require("express");
const app = express();
require("dotenv").config();
require("./models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;
const AuthRouter = require("./routes/authRouter.js")
const ProductRouter = require("./routes/productRouter.js")
app.use(cors({
  origin: true,  // Allows all origins
  credentials: true
}));

app.use(bodyParser.json());

app.use("/auth", AuthRouter)
app.use("/products", ProductRouter)

app.get("/ping", (req, res) => {
  res.send("PONG");
});


app.listen(port, (req, res) => {
  console.log(`Server is running to ${port}`);
});
