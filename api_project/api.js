#!/usr/bin/env node       

// Load in Express                                                                                                                                   
const express = require('express'), app = express(), port = process.env.PORT || 3500;
// Use the json middleware
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Load our database file
var database = require('./database.js');
// Connect to the database
database.openDB();

// Load our user routes from the users file
var users = require('./users.js');
// Apply the routes
app.use('/', users);

// Load our user routes from the posts file
var posts = require('./posts.js');
// Apply the routes
app.use('/', posts);

// Load our user routes from the posts file
var mod = require('./mod.js');
// Apply the routes
app.use('/', mod);

// Start listening
app.listen(port);
console.log('Began listening on port ' + port);