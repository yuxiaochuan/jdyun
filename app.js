var express = require('express');
var app = new express();

var user = require('./public/user/users');

app.use(express.static('public')); //静态资源的入口
app.use('/user',user);

//http://blog.csdn.net/zhuming3834/article/details/54691317
// app.use('/',function (req, res) {
//     res.sendfile(__dirname + "/" + "views/index.html" );
// });
app.all('/register', function(req, res, next){
    res.sendfile(__dirname + "/" + "views/register.html" );
});
app.all('/login', function(req, res, next){
    res.sendfile(__dirname + "/" + "views/login.html" );
});
app.all('/index', function(req, res, next){
    res.sendfile(__dirname + "/" + "views/index.html" );
});
var server = app.listen(3000, function () {
    console.log("start");
});