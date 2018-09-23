// Base setup
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Routes
// Sample route with a route the way we're used to seeing it
app.get('/sample', (req, res) => {
  res.send('this is a sample');
});

//we'll create our routes here

// get an instance of router
const router = express.Router();
// Apply routes to it

// route middlware that will happen on every request
router.use((req, res, next) => {
  // log each request to the console
  console.log(req.method, req.url);
  // continue doing what we were doing and go to the route
  next();
});

// home page route(http://localhost:8080)
router.get('/', (req, res) => {
  res.send('Im the home page');
});

// About page route(http://localhost:8080/about)
router.get('/about', (req, res) => {
  res.send("I'm the about page!");
});

// Apply the routes to our application
app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log('Magic happens on port ' + port);
});
