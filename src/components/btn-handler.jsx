import { useState, useRef, useEffect } from "react";
import { Webcam } from "../utils/webcam";
import { Attendence } from "../utils/renderBox";
import labels from "../utils/labels.json";
import axios from 'axios';
import { useNavigate, Route, Link, useParams, Routes, Router } from 'react-router-dom';


export const updatedAttend = new Map();
for (let i = 0; i <= labels.length; i++) {
  updatedAttend[labels[i]] = '출석';
}
// updatedAttend['date'] = '';


export const ButtonHandler = ({ imageRef, cameraRef, videoRef, clickedDate }) => {
  const [streaming, setStreaming] = useState(null); // streaming state
  const inputImageRef = useRef(null); // video input reference
  const inputVideoRef = useRef(null); // video input reference
  const webcam = new Webcam(); // webcam handler
  // const [clickedDate, setClickedDate] = useState('');

  // useEffect(() => {
  //   // 컴포넌트가 마운트될 때 /api/date에서 clickedDate를 가져옴
  //   axios
  //     .get('/api/attendance')
  //     .then((response) => {
  //       const { clickedDate } = response.data;
  //       console.log('response.data ',response.data)
  //       setClickedDate(clickedDate);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 설정



  // closing image
  const closeImage = () => {
    const url = imageRef.current.src;
    imageRef.current.src = "#"; // restore image source
    URL.revokeObjectURL(url); // revoke url

    setStreaming(null); // set streaming to null
    inputImageRef.current.value = ""; // reset input image
    imageRef.current.style.display = "none"; // hide image
  };

  // closing video streaming
  const closeVideo = () => {
    const url = videoRef.current.src;
    videoRef.current.src = ""; // restore video source
    URL.revokeObjectURL(url); // revoke url

    setStreaming(null); // set streaming to null
    inputVideoRef.current.value = ""; // reset input video
    videoRef.current.style.display = "none"; // hide video
  };





  return (
    <div className="btn-container">
      
      {/* Webcam Handler */}
      <button
        onClick={() => {
          // if not streaming
          if (streaming === null || streaming === "image") {
            // closing image streaming
            if (streaming === "image") closeImage();
            webcam.open(cameraRef.current); // open webcam
            cameraRef.current.style.display = "block"; // show camera
            setStreaming("camera"); // set streaming to camera


            // axios
            // .get('/api/date')
            // .then((response) => {
            //   // const { clickedDate } = response.data;
            //   // setClickedDate(clickedDate);
            // })
            // .catch((error) => {
            //   console.error(error);
            // });



          }
          // closing video streaming
          else if (streaming === "camera") {
            webcam.close(cameraRef.current);
            cameraRef.current.style.display = "none";
            setStreaming(null);
            updatedAttend['date'] = clickedDate
            console.log('clickedDate', clickedDate)

            // console.log('AttendenceCheck.js ', Attendence);
            for (let i = 0; i < labels.length; i++) {

              if (Attendence[labels[i]].length >= parseInt(Attendence['default'].length * 0.8 / 100)) { updatedAttend[labels[i]] = '출석' }
              else if (Attendence[labels[i]].length >= parseInt(Attendence['default'].length * 0.6 / 100)) { updatedAttend[labels[i]] = '지각' }
              else { updatedAttend[labels[i]] = '결석' }
              
              // updatedAttend['date'] = clickedDate
              

              axios
                .post("/api/update", {updatedAttend: updatedAttend, clickedDate: clickedDate})
                .then((response) => {
                  // 서버 응답 처리
                  // console.log(updatedAttend);
                  console.log(response.data); // 응답 데이터 출력
                  console.log("success");
                })
                .catch((error) => {
                  // 에러 처리
                  console.log('e')
                  console.error(error);
                });
            }
            window.location.reload();

          } else alert(`Can't handle more than 1 stream\nCurrently streaming : ${streaming}`); // if streaming video  


        }

        }
      >
        출석체크 {streaming === "camera" ? "종료" : "시작"}


      </button>
    </div>
  );
};

export default ButtonHandler;
