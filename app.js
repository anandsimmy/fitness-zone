// third party libs
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// first party libs
const auth = require('./auth');

// require database connection
const dbConnect = require('./db/dbConnect');
const User = require('./db/userModel');
const Customer = require('./db/customerModel');

dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response, next) => {
  response.json({ message: 'Hey! This is your server response!' });
  next();
});

// free endpoint
app.get('/free-endpoint', (request, response) => {
  response.json({ message: 'You are free to access me anytime' });
});

// authentication endpoint
app.get('/auth-endpoint', auth, (request, response) => {
  response.json({ message: 'You are authorized to access me' });
});

app.post('/register', (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      // saving user to db
      user
        .save()
        .then((result) => {
          response.status(201).send({
            message: 'User Created Successfully',
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: 'Error creating user',
            error,
          });
        });
    })
    .catch((e) => {
      response.status(500).send({
        message: 'Password was not hashed successfully',
        e,
      });
    });
});

app.post('/login', (request, response) => {
  User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: 'Passwords does not match',
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            'RANDOM-TOKEN',
            { expiresIn: '24h' }
          );

          //   return success response
          response.status(200).send({
            message: 'Login Successful',
            email: user.email,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: 'Passwords does not match',
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: 'Email not found',
        e,
      });
    });
});

app.post('/addNewCustomer', auth, (request, response) => {
  const { name, age, email, plan, date, comment } = request.body;
  const customer = new Customer({
    name,
    age,
    email,
    date,
    plans: [plan],
    comments: [comment],
  });

  // saving customer to db
  customer
    .save()
    .then((result) => {
      response.status(201).send({
        message: 'New Customer added Successfully',
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: 'Error creating customer',
        error,
      });
    });
});

module.exports = app;
