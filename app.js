var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '116.196.102.8',
    user     : 'localyxc',
    password : 'yxc123456',
    database : 'weixin_data'
});

connection.connect();

connection.query('SELECT * FROM descrip', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});