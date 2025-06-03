const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("../Routes/authRoutes");
const app = express();
const port = process.env.PORT;



app.use(cors());
app.use(bodyParser.json());
require('dotenv').config({ path: __dirname +'/../../.env' });


app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
