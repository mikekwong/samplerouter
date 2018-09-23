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

// route middlware that will happen on every request (multiple)
//
// we'll use router.use to define middleware. This will now be applied to all of the requests that come into our application for this instance of Router
router.use((req, res, next) => {
  // log each request to the console
  console.log(req.method, req.url);
  // continue doing what we were doing and go to the route
  next();
});

// We can define our routes right on our app. This is similar to using app.get, but we will use app.route. app.route is basically a shortcut to call the Express Router. Instead of calling express.Router(), we can call app.route and start applying our routes there. This uses method chaining.

// Using app.route lets us define multiple actions on a single login route. We'll need a GET route to show the login form and a POST route to process the login form.
app
  .route('login')
  // show the form (GET http://localhost:8080/login)
  .get((req, res) => {
    res.send('this is the login form');
  })
  //process the form (POST http://localhost:8080/login)
  .post((req, res) => {
    console.log('processing');
    res.send('processing the login form');
  });

// home page route(http://localhost:8080)
router.get('/', (req, res) => {
  res.send('Im the home page');
});

// About page route(http://localhost:8080/about)
router.get('/about', (req, res) => {
  res.send("I'm the about page!");
});

// route middleware to validate parameters, this case it is :name
router.param('name', (req, res, next, name) => {
  // do validation on name here
  // blah blah validation
  // log something so we know its working
  console.log('doing name validations on ' + name);

  // once validation is done, save the new item in the req
  req.name = name;
  // go to the next thing
  next();
});

// route with parameters(http:/localhost:8080/hello/:name)
router.get('/hello/:name', (req, res) => {
  res.send('hello ' + req.params.name + '!');
});

// Apply the routes to our application
app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log('Magic happens on port ' + port);
});
