const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDB = require("./db/db");
const routes = require("./routes/user");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/health", (req, res) => {
  res.send("Server running Successfully!");
});

app.use((err, req, res, next) => {
  const message = err.message ? err.message : "Server Error Occured!";
  const status = err.status ? err.status : 500;
  res.status(status).json({ message });
});

// connectDB("mongodb://127.0.0.1:27017/userrecord")
connectDB(MONGODB_URI)
  .then(() => {
    console.log("Database Connected Successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT} PORT`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
