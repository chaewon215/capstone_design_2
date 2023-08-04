// express 모듈 호출
const express = require('express');
const app = express();
const api = require('./routes/index');
// api 처리는 './routes/index'에서 일괄처리
app.use('/api', api);
 
// server port 3001 할당
// 클라이언트와 다른 번호로 충돌나지 않도록
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})

const cors  = require("cors");    // npm i cors | yarn add cors

app.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))
