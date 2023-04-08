const express = require('express');
const router = express();
const db = require('../config/db')
var url = require('url');

// http://localhost:4000/ 으로 접속 시 응답메시지 출력
router.get('/test', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var sql1 = "SELECT * FROM capstone2.lectures;"

    db.query(sql1, (err, result) => {
        res.send(result);
    });
})

router.get('/attendence', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    var q = url.parse(req.headers.referer);
    var lecture_code = q.path.substring(1)
    
    console.log(lecture_code)

    var sql2 = 'SELECT * FROM capstone2.studentforlecture WHERE lecture_code=?';

    db.query(sql2, lecture_code, (err, result) => {
        res.send(result);
        
    });
})

module.exports = router;