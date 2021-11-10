const mysql = require('mysql');

// Mysql
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nexoweb_cinema_argentina'
});

// Check connection
db.connect(error => {
    if (error) throw error;
    console.log('Database is running !');
});

module.exports = db;