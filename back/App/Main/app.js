const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("../Routes/authRoutes");
const app = express();
require('dotenv').config({ path: __dirname +'/../../.env' });
const port = process.env.PORT;



app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Theme Project Backend is Running ✅");
});


app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
