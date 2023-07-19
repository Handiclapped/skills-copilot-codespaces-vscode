// Create web server

// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/comments');

// Create web server
var app = express();
app.use(bodyParser.json());

// Load models
var Comment = require('./models/comment');

// Routes
app.get('/comments', function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        res.send(comments);
    });
});

app.post('/comments', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        res.status(201).send();
    });
});

// Start web server
app.listen(3000, function() {
    console.log('Server listening on port 3000');
});