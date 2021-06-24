const sqlite3 = require('sqlite3').verbose()
let db = undefined;

function openDB(){
        db = new sqlite3.Database('datastore.db', (err) => {
                if(err){
                        return console.error(err.message);
                }
                console.log('Successfully connected to database.');
        });
}

function getDB(){
        return db;
}

module.exports = {
        openDB,
        getDB
}