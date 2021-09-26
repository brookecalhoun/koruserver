// imports
require("dotenv").config();
const express = require("express");
const journalController = require("./controllers/journalController");
const auth = require("./controllers/auth");
const cors = require("cors");
const port = process.env.PORT || 4000;
const app = express();
const rowdy = require("rowdy-logger");
const rowdyResults = rowdy.begin(app);
const db = require("./models");
const jwtCheck = require('./middleware/checkJwt')


// middleware
app.use(cors());
app.use(express.json());

// api routes
app.use('/auth', auth)
app.use("/api/journal", journalController);


// listen

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  rowdyResults.print();
});
