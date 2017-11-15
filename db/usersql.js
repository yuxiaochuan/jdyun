var UserSQL = {
    insert:'INSERT INTO user(username,password,date,type,openid) VALUES(?,?,?,?,?)',
    bangding:'UPDATE user SET type = ?,openid = ? WHERE username = ? AND password = ? ',
    queryAll:'SELECT * FROM user',
    getUserByOpenid:'SELECT * FROM user WHERE openid = ? ',
    getUserByInfo:'SELECT * FROM user WHERE username = ?',
    deleteUserByInfo:'DELETE FROM user WHERE username = ? AND password = ? ',
};
module.exports = UserSQL;