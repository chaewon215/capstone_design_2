const express = require('express');
const router = express();
const db = require('../config/db')
var url = require('url');


router.get('/test', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var sql1 = "SELECT * FROM capstone2.lectures;";
    
    db.query(sql1, (err, result) => {
        if(!err) {
            res.send(result);
        } else {
            res.send(err);
        }        
    });
})

router.get('/attendence', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    var q = url.parse(req.headers.referer);
    var lecture_code = q.path.substring(1)
    var sql2 = 'SELECT * FROM capstone2.studentforlecture WHERE lecture_code=?';

    db.query(sql2, lecture_code, (err, result) => {
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
        if(!err) {
            res.send(result);
        } else {
            res.send(err);
        }    
    });
})


router.get('/attendence/modify', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    // console.log('.get req: ', req);
    // console.log('.get res: ', res);
    // console.log('-------------------------------------------------');

    var q = url.parse(req.headers.referer);
    // console.log(q);
    var lecture_code = q.path.split('/')[1]

    var sql2 = 'SELECT * FROM capstone2.studentforlecture WHERE lecture_code=?';
    
    db.query(sql2, lecture_code, (err, result) => {
        if(!err) {
            res.send(result);
        } else {
            res.send(err);
        }    
    });
})

const util = require('util')


router.post('/attendence/modify', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var data = [attendence_04_13, student_name]
 
    var sql = "update board set attendence_04_13=? WHERE student_name=?";
    conn.query(sql, data, function(err,result)
    {
        if(!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    });
    
    // const updatedData = req.body;

    // const sql = 'UPDATE `studentforlecture` SET attendence_04_12="X" WHERE student_name="구하영";';

    // db.query(sql, (err, result) => {
    //         if(!err) {
    //             // console.log('res: ', res);
    //             res.send(result);
    //         } else {
    //             res.send(err);
    //         }
    // });
})



module.exports = router;