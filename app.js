var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'weixin_data'
});

connection.connect();

connection.query('SELECT * FROM descrip', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});