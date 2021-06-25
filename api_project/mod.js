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
                                res.send(`<!doctype html>

<html lang="en">
	<head>
		<meta charset="utf-8">
		<script src="https://unpkg.com/vue@next"></script>
		<title>Edit User</title>
	</head>
	<body>
		<header>
			<ul>
				<li><a href="http://35.39.165.238/posts.html">Posts</a></li>
				<li><a href="http://35.39.165.238/users.html">Users</a></li>
			</ul>
		</header>

		<form id='putform'>
            <b>Edit User ` + rows.id +`</b><br>
            <label for="firstname">First Name:</label><br>
            <input type="text" id="firstname" name="firstname" value= "` + rows.firstName + `"><br>
            <label for="lastname">Last Name:</label><br>
            <input type="text" id="lastname" name="lastname" value= "` + rows.lastName + `"><br>
            <label for="email">Email:</label><br>
            <input type="text" id="email" name="email" value= "` + rows.email + `"><br>
            <label for="password">Password:</label><br>
            <input type="text" id="password" name="password" value= "` + rows.password + `"><br>
            <button v-on:click="enterform">Enter</button>
        </form>
	</body>
<style>
        header {
        background-color:steelblue;
        border-bottom: 3px solid black;
        margin-bottom: 50px;
        text-align: center;
        }
        a:hover
        {
                Color: green; 
                text-decoration: none;
                font-weight: none;
        }
        ul
        {
                list-style: none;
                display: inline-block;
                padding: 2em;
                
                font-weight: bolder;
        }
        li{
                display: inline-block;
                padding: 0 2em;
                font-size: 2em; 
        }
        b{
                text-decoration: underline;
        }
</style>

	<script>
        const EventHandling = {
        methods: {
            enterform(){
                var fname = document.getElementById('firstname').value;
                var lname = document.getElementById('lastname').value;
                var mail = document.getElementById('email').value;
                var pass = document.getElementById('password').value;
                try{
				console.log(fname + ', ' + lname);
			fetch('http://35.39.165.238:3500/users/` + rows.id + `',
				{
					headers: {
						'Accept': 'application/json',
					         'Content-Type': 'application/json'
					},
					method: 'PUT',
					body:JSON.stringify({ 'firstName': fname,
						'lastName': lname,
                        'email': mail,
                        'password': pass
					})
				})
				.then(response => response.json())
                .then(data => console.log(data));
			} catch(e){
				console.log(e);
			}
			return false;
            }
        }
        }

        Vue.createApp(EventHandling).mount('#putform')
	</script>
</html>`);
                        }
                }
        });
});

module.exports = router;
