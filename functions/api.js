const { User } = require('./models');
const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

/*
exports.handler = async (event, context) => {
  try {
    const users = await User.findAll();
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};*/

// Use the router
app.use('/.netlify/functions/api', router);

// User Routes
router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports.handler = serverless(app);