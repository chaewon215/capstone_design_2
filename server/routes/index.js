const express = require('express');
const router = express();
const db = require('../config/db')
const session = require('express-session');
var url = require('url');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sessionOption = require('../config/sessionOption');

var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(sessionOption);
router.use(session({  
  key: 'session_cookie_name',
  secret: '~',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}))

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.get('/authcheck', (req, res) => {      
  const sendData = { isLogin: "" };
  if (req.session.is_logined) {
      sendData.isLogin = "True"
  } else {
      sendData.isLogin = "False"
  }
  res.send(sendData);
})


router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
      res.redirect('/');
  });
});


// 로그인 서버 통신 ----
router.get("/user_inform", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const sqlQuery = "SELECT * FROM capstone2.user;"
  db.query(sqlQuery, (err, result) => {
    res.send(result);
    // console.log(result);
  });
});

// router.post('/user_inform', (req, res) => {
//   const user_ID = req.body.user_ID;
//   const user_pw = req.body.user_pw;

//   // let salt = Math.round((new Date().valueOf() * Math.random())) + "";
//   // let hashPassword = crypto.createHash("sha512").update(user_pw + salt)

//   const query = `SELECT COUNT(*) AS count FROM capstone2.user WHERE user_ID = ? AND user_pw = ?`;

//   db.query(query, [db.escape(user_ID), db.escape(user_pw)], (error, results) => {
//     if (error) {
//       // console.log(error);
//     }
//     // console.log(results);     
//     const count = results[0].count;
//     const result = (count === 1);

//     res.send({
//       result: result
//     });
//   });
// });

router.post("/user_inform", (req, res) => { // 데이터 받아서 결과 전송
  const username = req.body.userName;
  const userid = req.body.user_ID;
  const password = req.body.user_pw;
  const sendData = { isLogin: "" };


  if (userid && password) {             // id와 pw가 입력되었는지 확인
      db.query('SELECT * FROM user WHERE user_ID = ?', [userid], function (error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {       // db에서의 반환값이 있다 = 일치하는 아이디가 있다.      
              // console.log('password', password);
              // console.log('results[0].user_chn', results[0].user_chn);
              // console.log('is it same? ', password == results[0].user_chn);
            
              bcrypt.compare(password , results[0].user_chn, (err, result) => {    // 입력된 비밀번호가 해시된 저장값과 같은 값인지 비교
                
                  if (result === true) {                  // 비밀번호가 일치하면
                      req.session.is_logined = true;      // 세션 정보 갱신
                      req.session.nickname = userid;
                      req.session.save(function () {
                          sendData.isLogin = "True"
                          res.send(sendData);
                      });
                      db.query(`INSERT INTO logTable (created, userid, action, command, actiondetail) VALUES (NOW(), ?, 'login' , ?, ?)`
                          , [req.session.nickname, '-', `React 로그인 테스트`], function (error, result) { });
                  }
                  else{                                   // 비밀번호가 다른 경우
                      // console.log(res)  
                      sendData.isLogin = "로그인 정보가 일치하지 않습니다."
                      res.send(sendData);
                  }
              })                      
          } else {    // db에 해당 아이디가 없는 경우
              sendData.isLogin = "아이디 정보가 일치하지 않습니다."
              res.send(sendData);
          }
      });
  } else {            // 아이디, 비밀번호 중 입력되지 않은 값이 있는 경우
      sendData.isLogin = "아이디와 비밀번호를 입력하세요!"
      res.send(sendData);
  }
});


router.post("/signup", (req, res) => {  // 데이터 받아서 결과 전송
  const username = req.body.userName;
  const userid = req.body.userId;
  const password = req.body.userPassword;
  const password2 = req.body.userPassword2;
  
  const sendData = { isSuccess: "" };

  if (userid && password && password2) {
      db.query('SELECT * FROM user WHERE user_ID = ?', [userid], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
          if (error) throw error;
          if (results.length <= 0 && password == password2) {         // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우
              const hasedPassword = bcrypt.hashSync(password, 10);    // 입력된 비밀번호를 해시한 값
              db.query('INSERT INTO user (user_name, user_ID, user_pw, user_chn) VALUES(?,?,?,?)', [username, userid, password, hasedPassword], function (error, data) {
                  if (error) throw error;
                  req.session.save(function () {                        
                      sendData.isSuccess = "True"
                      res.send(sendData);
                  });
              });
          } else if (password != password2) {                     // 비밀번호가 올바르게 입력되지 않은 경우                  
              sendData.isSuccess = "입력된 비밀번호가 서로 다릅니다."
              res.send(sendData);
          }
          else {                                                  // DB에 같은 이름의 회원아이디가 있는 경우            
              sendData.isSuccess = "이미 존재하는 아이디 입니다!"
              res.send(sendData);  
          }            
      });        
  } else {
      sendData.isSuccess = "필수 정보를 입력하세요."
      res.send(sendData);  
  }
  
});

// 나의 강좌 목록 출력 ----
router.get('/lectures', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  var q = url.parse(req.headers.referer);
  var lecture_code = q.path.split('/')[1];
  // console.log('lecture_code', lecture_code);

  // var sql1 = "SELECT * FROM capstone2.lectures";
  var sql1 = `SELECT * FROM capstone2.lectures WHERE professors_id='${lecture_code}' ORDER BY lecture_name;`;

  db.query(sql1, (err, result) => {
    if (!err) {
      // console.log(result);
      res.send(result);

      var today = new Date();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var date = ('0' + today.getDate()).slice(-2);
      var attendence_mm_dd = 'attendence_' + month + '_' + date

      var sql = `SELECT EXISTS (SELECT 1 FROM Information_schema.columns WHERE table_name = 'studentforlecture' AND column_name = '${attendence_mm_dd}') AS result`

      db.query(sql, (err, result) => {
        if (Object.values(result[0])[0] === 0) {

          var sql_mkcol = `ALTER TABLE studentforlecture ADD ${attendence_mm_dd} varchar(10);`
          var sql_init = `UPDATE studentforlecture SET ${attendence_mm_dd}='결석';`


          db.query(sql_mkcol, (err1, result1) => {
            if (err1) {
              // console.log('cannot add new column in table "studentforlecture".');
              console.error(err1);
            } else {
              // console.log('add new column ' + attendence_mm_dd);

              db.query(sql_init, (err2, result2) => {
                if (err2) {
                  console.error(err2);
                  // console.log(`Cannot update column ${attendence_mm_dd}`);
                } else {
                  // console.log(`Update column ${attendence_mm_dd}`);
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


// 수강생 목록 페이지 출력 ----
router.get('/attendence', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  var today = new Date();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var date = ('0' + today.getDate()).slice(-2);
  var attendence_mm_dd = 'attendence_' + month + '_' + date

  var q = url.parse(req.headers.referer);
  var lecture_code = q.path.substring(1);

  var sql3 = 'SELECT lecture_name, lecture_code, professors_id FROM capstone2.lectures WHERE lecture_code=?'
  db.query(sql3, lecture_code, (err4, result4) => {
    if (err4) {
      console.error(err4);
    } else {
      res.send(result4)
      // let response = []
      // const filter = result3.map(data => ({
      //   ...data, lecture_name: result4[0].lecture_name
      // }))

      // response = [...filter]
      // res.send(response);
      // console.log(response);       
    }

    // var sql2 = `SELECT student_name, lecture_code, ${attendence_mm_dd} FROM capstone2.studentforlecture WHERE lecture_code=?;`
    // db.query(sql2, lecture_code, (err3, result3) => {
    //     if(err3) {
    //         console.error(err3);
    //     } else {
    //         console.log('success', result3[0].lecture_code);
    //         // res.send(result3);
    //         var sql3 = 'SELECT lecture_name FROM capstone2.lectures WHERE lecture_code=?'
    //         db.query(sql3, lecture_code, (err4, result4) => {
    //           if (err4){
    //             console.error(err4);
    //           } else {
    //             res.send(result4)
    //             let response = []
    //             const filter = result3.map(data => ({
    //               ...data, lecture_name: result4[0].lecture_name
    //             }))

    //             response = [...filter]
    //             res.send(response);
    //             console.log(response);       
    //           }
    //         })
    //     }
  });
})

// 수강생 목록 페이지에서 날짜를 클릭하면 해당 날짜의 정보 전송 ----
router.post("/attendance", (req, res) => {
  const { date } = req.body;
  // console.log("Received data:", date);

  var attendence_mm_dd = 'attendence_' + date

  var q = url.parse(req.headers.referer);
  var lecture_code = q.path.substring(1);

  var sql2 = `SELECT student_name, student_id, lecture_code, ${attendence_mm_dd} FROM capstone2.studentforlecture WHERE lecture_code=? ORDER BY student_name;`
  db.query(sql2, lecture_code, (err3, result3) => {
    if (err3) {
      console.error(err3);
      res.status(500).json({ error: "An error occurred" });
    } else {
      // console.log('success', result3[0].lecture_code);
      // res.send(result3);
      var sql3 = 'SELECT lecture_name FROM capstone2.lectures WHERE lecture_code=?'
      db.query(sql3, lecture_code, (err4, result4) => {
        if (err4) {
          console.error(err4);
        } else {
          let response = []
          const filter = result3.map(data => ({
            ...data, lecture_name: result4[0].lecture_name
          }))

          response = [...filter]
          res.send(response);
          // console.log(response);
        }
      })
    }
  });
})


let clickedDate;
// 클릭한 날짜 정보를 서버에 전달
router.post('/date', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const { formattedDate } = req.body;

  clickedDate = formattedDate;

  // console.log('.post /date; server ', clickedDate)
  res.send(clickedDate)

});

// // // 클릭한 날짜 정보를 서버에 전달
router.get('/date', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const responseData = {
    date: clickedDate,
  };

  // console.log('.get /date; server ', responseData)
  res.json(responseData);

});


// 수강생 정보 수정 페이지 출력 ----
router.get('/edit', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  // console.log(req);

  var today = new Date();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var date = ('0' + today.getDate()).slice(-2);
  var attendence_mm_dd = 'attendence_' + clickedDate;
  
  var q = url.parse(req.headers.referer);
  var lecture_code = q.path.split('/')[1];
  // console.log('q', q);

  var sql2 = `SELECT student_name, student_id, lecture_code, ? FROM capstone2.studentforlecture WHERE lecture_code=? ORDER BY student_name;`
  var values = [attendence_mm_dd, lecture_code];
  db.query(sql2, values, (err3, result3) => {
      if(err3) {
          console.error(err3);
      } else {
          // console.log('success', result3);
          // res.send(result3);
          var sql3 = 'SELECT lecture_name FROM capstone2.lectures WHERE lecture_code=?'
          db.query(sql3, lecture_code, (err4, result4) => {
            if (err4){
              console.error(err4);
            } else {
              let response = []
              const filter = result3.map(data => ({
                ...data, lecture_name: result4[0].lecture_name
              }))

              response = [...filter]
              res.send(response);
              // console.log(response);       
            }
          })
      }
  })
})

const util = require('util');
const { format } = require('path');

// 수정한 수강생 정보를 DB에 업데이트 ----

router.post('/edit', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  var today = new Date();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var attendence_mm_dd = 'attendence_' + month + '_' + day
  
  // console.log('/edit: req.body', req.body)
  
  const { modifiedData, clickedDate } = req.body
  // console.log(clickedDate)
  var attendence_mm_dd = 'attendence_' + clickedDate

  // console.log('post /edit attendence_mm_dd', attendence_mm_dd)

  var q = url.parse(req.headers.referer);
  var lecture_code = q.path.split('/')[1];
  // console.log('lecture_code', lecture_code);
  
  // console.log(mo)

  var studentList = Object.keys(modifiedData);
  var attendenceList = Object.values(modifiedData);

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


// 감지된 얼굴 정보를 DB에 업데이트 ----
router.post('/update', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  var today = new Date();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var date = ('0' + today.getDate()).slice(-2);
  var attendence_mm_dd = 'attendence_' + req.body.clickedDate

  var q = url.parse(req.headers.referer);
  var lecture_code = q.path.substring(1);

  var studentList = Object.keys(req.body.updatedAttend);
  var attendenceList = Object.values(req.body.updatedAttend);


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
        // console.log(attendence, studentName)
        // console.log('Updated student: ', studentName);
      }
    });

  };
}
)


module.exports = router;