var express = require('express');

var router = express.Router();

const database = require('./database.js');
let db = database.getDB();
router.get('/users', function(req, res){
        console.log('Got a get request on users.');
        let sql = 'SELECT * FROM user';
        db.all(sql, [], function(err, rows){
                if(err){
                        console.log(err.message);
                } else {
                        console.log(rows);
                        res.json(rows);
                }
        });
});

router.get('/users/:userid', function (req, res){
        console.log('Got a request for user id #' + req.params.userid);
        let sql = 'SELECT * FROM user WHERE id = (?)';
        db.get(sql, [ req.params.userid ], function (err, rows){
                if(err){
                        console.log(err.message);
                }{
                        if(!rows){
                                res.sendStatus(404);
                        } else {
                                res.json(rows);
                        }
                }
        });
});

router.get('/users/:userId/posts', function (req, res){
        console.log('Got a request for user userId #' + req.params.userId + ' posts!');
        let sql = 'SELECT * FROM post WHERE userId = (?)';
        db.all(sql, [ req.params.userId ], function (err, rows){
                if(err){
                        console.log(err.message);
                } else {
                        console.log(rows);
                        res.json(rows);
                }
        });
});

router.delete('/users/:id', function (req, res){
        console.log('Got a request for user id #' + req.params.id);
        let sql = 'DELETE FROM user WHERE id = (?)';
        db.run(sql, [ req.params.id ], function (err, rows){
                if(err){
                        console.log(err.message);
                }{
                                console.log('User deleted!');                                                                                                                   
                                res.json( 
                                        "User deleted successfully!"
                                );  
                }
        });
});

router.put('/users/:id', function (req, res){                   
        let sql = 'UPDATE user SET firstName = (?), lastName = (?), email = (?), password = (?) WHERE id = (?)';                    
        console.log([ req.body.firstName, req.body.lastName, req.body.email, req.body.password ]);
        db.run(sql, [ req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.params.id ], function (err){
                if(err){
                        console.log(err.message);
                } else {
                        console.log('Updated user!');                                                                                                                   
                        res.json(
                                "Updated user!"
                        );
                }
        });
});

router.post('/users', function (req, res){                   
        let sql = 'INSERT INTO user (firstName, lastName, email, password, joinedDate) VALUES ( (?), (?), (?), (?), (?) )';                    
        console.log([ req.body.firstName, req.body.lastName, req.body.email, req.body.password, Date.now() ]);
        db.run(sql, [ req.body.firstName, req.body.lastName, req.body.email, req.body.password, Date.now() ], function (err){
                if(err){
                        console.log(err.message);
                } else {
                        console.log('Added user #' + this.lastID);                                                                                                                   
                        res.json( {
                                "newId" : this.lastID
                        });
                }
        });
});


module.exports = router;