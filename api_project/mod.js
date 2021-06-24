var express = require('express');

var router = express.Router();

const database = require('./database.js');
let db = database.getDB();

router.get('/mod/:userid', function (req, res){
        console.log('Got a request for user id #' + req.params.userid);
        let sql = 'SELECT * FROM user WHERE id = (?)';
        db.get(sql, [ req.params.userid ], function (err, rows){
                if(err){
                        console.log(err.message);
                }{
                        if(!rows){
                                res.sendStatus(404);
                        } else {
                                res.send(`<form>
                                <label for="username">Username:</label><br>
                                <input type="text" id="username" name="username" value= "` + rows.firstName + `"><br>
                                <label for="pwd">Password:</label><br>
                                <input type="password" id="pwd" name="pwd">
                                </form>`);
                        }
                }
        });
});

module.exports = router;