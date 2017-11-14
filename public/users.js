var dbConfig = require('../db/DBConfig');
var User = require('../db/usersql');
var mysql = require('mysql'); // 引入mysql依赖
var express = require('express');
var router = express.Router();
var client = mysql.createConnection(dbConfig.mysql); // 建立连接



// 注册接口
router.all('/user/register', function(req, res, next){
    console.log("1123123123");
    console.log(req.query);
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    client.query(User.getUserByInfo,[param.username,param.password],function (err, results){
        if (err){
            throw err
        }else{
            // 数据库不存在 就注册成功
            if (results.length == 0) {
                // 把新用户插入数据库
                client.query(User.insert,[param.username,param.password,getDataStr(),'',''],function (err, results) {
                    if(err){
                        throw err
                    }else{
                        res.end(JSON.stringify({status:'100',msg:'注册成功!'}));
                    }
                })
            } else{ // 数据库存在就注册失败
                res.end(JSON.stringify({status:'101',msg:'该用户名已经被注册'}));
            }
        }
    })
});


// 登录接口
router.all('/user/login', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    client.query(User.getUserByInfo,[param.username,param.password],function (err, results){
        if (err){
            throw err
        }else{
            // 数据库存在
            if (results.length == 0) {
                res.end(JSON.stringify({status:'102',msg:'用户名或密码错误'}));
            } else{
                if (results[0].username == param.username && results[0].password == param.password) {
                    res.end(JSON.stringify({status:'100',msg:'登录成功'}));
                }
            }
        }
    })
});

// 第三方登陆接口
router.all('/user/thirdlogin', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    console.log(param.openid);
    client.query(User.getUserByOpenid,[param.openid],function (err, results){
        if (err){
            throw err
        }else{
            // 数据库不存在 就跳转绑定  flag=1 需要绑定  flag=2 // 不需要绑定
            if (results.length == 0) {
                res.end(JSON.stringify({status:'100',msg:'操作成功',flag:'1'}));
            } else{ // 数据库存在就登录成功
                res.end(JSON.stringify({status:'100',msg:'登录成功',flag:'2'}));
            }
        }
    })
});


// 绑定接口
router.all('/user/bangding', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    client.query(User.getUserByInfo,[param.username,param.password],function (err, results){
        if (err){
            throw err
        }else{
            // 更新用户信息
            client.query(User.bangding,[param.type,param.openid,param.username,param.password],function (err, results) {
                if(err){
                    throw err
                }else{
                    res.end(JSON.stringify({status:'100',msg:'绑定成功!'}));
                }
            })
        }
    })
});


module.exports = router;