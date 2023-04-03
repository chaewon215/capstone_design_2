// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');
 
// router.get("", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
    
//     const sqlQuery = "SELECT * FROM capstone2.lectures;"

//     db.query(sqlQuery, (err, result) => {
//         res.send(result);
//     });
// });



// module.exports = router;


const express = require('express');
const router = express();
const db = require('../config/db')
 
// http://localhost:4000/ 으로 접속 시 응답메시지 출력
router.get('/test', (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const sqlQuery = "SELECT * FROM capstone2.lectures;"

    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
})
 
module.exports = router;