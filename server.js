// imports
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const journalController = require('./controllers/journalController')
const cors = require('cors')
const port = process.env.PORT || 4000
const app = express()
const rowdy = require('rowdy-logger')
const rowdyResults = rowdy.begin(app)
const db = require('./models')

// middleware 

app.use(cors())
app.use(express.json())

// authentication

app.use(session({ secret: process.env.SESSION_SECRET }));

// Sign Up a New User
app.post("/signup", (req, res) => {
    // 1. ✅ take in the username and password from the form
    console.log(req.body);
    // 2. ✅ Make a query to create a new User
    db.User.create(req.body, (err, createdUser) => {
      if (err) console.log(err);
      console.log(createdUser);
      // 3. ✅ Redirect to /login
      req.session.currentUser = createdUser;
      res.json({
          message: "We successfully signed up for an account. Hooray!"
      });
    });
  });
  
  // Log the user in - track the user in a cookie on their browser
  app.post("/login", (req, res) => {
    console.log(req.body);
  
    // 1. ✅ Check if the user passed in exists
    db.User.findOne({ username: req.body.username }, (err, foundUser) => {
      if (err) return console.log(err);
      // If the username is not correct, send them to the /login page
      if (!foundUser) {
        return res.json({
            message: "Username is not found"
        });
      }
      // 2. ✅ Check if the password passed in matches the one on file,
      // if not send them to the /login page
      if (req.body.password !== foundUser.password) {
        return res.json({
            message: "Wrong password"
        });
      }
      // 3. ✅ Track the user in a cookie on their browser
      //- Adding a new property into our session object
      //- The session object will be accessible from any of my routes
      req.session.currentUser = foundUser;
  
      console.log(req.session);
  
      res.json({
          message: "You are now logged in"
      });
    });
  });
  // Logout
  app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });

// api routes
app.use('/api/journal', journalController)
// listen

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    rowdyResults.print()
})