var express = require('express');

var router = express.Router();

const database = require('./database.js');
let db = database.getDB();
router.get('/posts', function(req, res){
        console.log('Got a get request on posts.');
        let sql = 'SELECT * FROM post ORDER BY timestamp';
        db.all(sql, [], function(err, rows){
                if(err){
                        console.log(err.message);
                } else {
                        console.log(rows);
                        res.json(rows);
                }
        });
});

router.delete('/posts/:postId', function (req, res){
        console.log('Got a request for post postId #' + req.params.postId);
        let sql = 'DELETE FROM post WHERE postId = (?)';
        db.run(sql, [ req.params.postId ], function (err, rows){
                if(err){
                        console.log(err.message);
                }{
                                console.log('Post deleted!');                                                                                                                   
                                res.json( 
                                        "Post deleted successfully!"
                                );  
                }
        });
});

router.get('/posts/:postId', function (req, res){
        console.log('Got a request for post with postId #' + req.params.postId);
        let sql = 'SELECT * FROM post WHERE postId = (?)';
        db.get(sql, [ req.params.postId ], function (err, rows){
                if(err){
                        console.log(err.message);
                }{
                        if(!rows){
                                res.sendStatus(404);
                        } else {
                                console.log(rows);
                                res.json(rows);
                        }
                }
        });
});

router.put('/posts/:postId', function (req, res){                   
        let sql = 'UPDATE post SET text = (?), userId = (?) WHERE postId = (?)';                    
        console.log([ req.body.text, req.body.userId ]);
        db.run(sql, [ req.body.text, req.body.userId, req.params.postId ], function (err){
                if(err){
                        console.log(err.message);
                } else {
                        console.log('Updated post!');                                                                                                                   
                        res.json(
                                "Updated post!"
                        );
                }
        });
});

router.post('/posts', function (req, res){                   
        let sql = 'INSERT INTO post (text, timestamp, userId) VALUES ( (?), (?), (?) )';                    
        console.log([ req.body.text, Date.now(), req.body.userId ]);
        db.run(sql, [ req.body.text, Date.now(), req.body.userId ], function (err){
                if(err){
                        console.log(err.message);
                } else {
                        console.log('Added post #' + this.lastID);                                                                                                                   
                        res.json( {
                                "newId" : this.lastID
                        });
                }
        });
});

module.exports = router;