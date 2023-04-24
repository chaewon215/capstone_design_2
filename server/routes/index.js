const express = require('express');
const router = express();
const db = require('../config/db')
var url = require('url');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/test', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var sql1 = "SELECT * FROM capstone2.lectures;";
    
    db.query(sql1, (err, result) => {
        if(!err) {
            res.send(result);

            var today = new Date();
            var month = ('0' + (today.getMonth() + 1)).slice(-2);
            var date = ('0' + today.getDate()).slice(-2);
            var attendence_mm_dd = 'attendence_' + month + '_' + date
        
            var sql = `SELECT EXISTS (SELECT 1 FROM Information_schema.columns WHERE table_name = 'studentforlecture' AND column_name = '${attendence_mm_dd}') AS result`
        
            db.query(sql, (err, result) => {
                if (Object.values(result[0])[0] === 0) {
        
                    var sql_mkcol = `ALTER TABLE studentforlecture ADD ${attendence_mm_dd} varchar(5);`
                    var sql_init = `UPDATE studentforlecture SET ${attendence_mm_dd}='-';`
        
        
                    db.query(sql_mkcol, (err1, result1) => {
                        if (err1) {
                          console.log('cannot add new column in table "studentforlecture".');
                          console.error(err1);
                        } else {
                          console.log('add new column ' + attendence_mm_dd);
                          
                          db.query(sql_init, (err2, result2) => {
                            if (err2) {
                                console.error(err2);
                                console.log(`Cannot update column ${attendence_mm_dd}`);
                              } else {
                                console.log(`Update column ${attendence_mm_dd}`);
                              }
                          })
                        }
                      });
                }
                })

        } else {
            res.send(err);
        }        
    });
})

router.get('/attendence', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var today = new Date();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var date = ('0' + today.getDate()).slice(-2);
    var attendence_mm_dd = 'attendence_' + month + '_' + date
    
    var q = url.parse(req.headers.referer);
    var lecture_code = q.path.substring(1);

    var sql2 = `SELECT student_name, lecture_code, ${attendence_mm_dd} FROM capstone2.studentforlecture WHERE lecture_code=?;`
    db.query(sql2, lecture_code, (err3, result3) => {
        if(err3) {
            console.error(err3);
        } else {
            console.log('success', result3);
            res.send(result3);
        }
    });
})


router.get('/edit', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var today = new Date();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var date = ('0' + today.getDate()).slice(-2);
    var attendence_mm_dd = 'attendence_' + month + '_' + date
    
    var q = url.parse(req.headers.referer);
    var lecture_code = q.path.split('/')[1];
    // console.log('q', q);

    var sql2 = `SELECT student_name, lecture_code, ? FROM capstone2.studentforlecture WHERE lecture_code=?;`
    var values = [attendence_mm_dd, lecture_code];
    db.query(sql2, values, (err3, result3) => {
        if(err3) {
            console.error(err3);
        } else {
            console.log('success', result3);
            res.send(result3);
        }
    })
})

const util = require('util')


router.post('/edit', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var today = new Date();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var date = ('0' + today.getDate()).slice(-2);
    var attendence_mm_dd = 'attendence_' + month + '_' + date

    var q = url.parse(req.headers.referer);
    var lecture_code = q.path.split('/')[1];
    console.log('lecture_code', lecture_code);
    
    var studentList = Object.keys(req.body);
    var attendenceList = Object.values(req.body);

    var sql_edit = `UPDATE studentforlecture SET ${attendence_mm_dd}=? WHERE student_name=? AND lecture_code=?;`;

    for (var i = 0; i < studentList.length; i++) {
        var studentName = studentList[i];
        var attendence = attendenceList[i];
      
        // SQL 쿼리 실행
        db.query(sql_edit, [attendence, studentName, lecture_code], (err, result) => {
          if (err) {
            // 에러 처리
            console.error(err);
          } else {
            // 결과 처리
            console.log('Updated student: ' + studentName);
          }
        });

    };
    }
);


module.exports = router;