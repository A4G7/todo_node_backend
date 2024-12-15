require("dotenv").config();
const express = require("express");
const app = express();
const todoRouter = require("./routes");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", todoRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
