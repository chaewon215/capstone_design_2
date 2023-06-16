import React, { useEffect, useState, useRef } from 'react';

import styles from './AttendenceCheck.module.css';
import axios from 'axios';
import { useNavigate, Route, Link, useParams, Routes, Router } from 'react-router-dom';

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "../../../components/loader";
import { ButtonHandler, updatedAttend } from "../../../components/btn-handler";
// import { FileDownloadButton } from "../../../components/save-xlsx";
import { detectImage, detectVideo } from "../../../utils/detect";
import "../../../style/Live.css";
import { renderBoxes, Attendence } from "../../../utils/renderBox";
import labels from "../../../utils/labels.json";

import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';


import Calendar from 'react-calendar';
import './Calendar copy.css'; // css import
import moment from "moment";
import dayjs from 'dayjs';


// import Live from "../../../components/lecture/live/Live.js";

export const datas = new Map();

function StudentList(){
    const [value, onChange] = useState(new Date());
    const pickedDate = moment(value).format("_MM_DD");


    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var date = ('0' + today.getDate()).slice(-2);
    var yyyy_mm_dd = year + '_' + month + '_' + date
    var attendence_mm_dd = 'attendence_' + month + '_' + date


    const [inputData, setInputData] = useState()



    // useEffect(() => {
    //     try {
    //         studentForLectureData();

    //     } catch(e){
    //         console.error(e.message)
    //     }
    // }, [])


    // // const handleDataUpdate = async () => {
    // const handleDataUpdate = async () => {
    //     try {
    //       const response = await axios.post('/api/attendence', value);
    //       console.log('.post response.data', response.data);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //     studentForLectureData();

    //   };



    // async function studentForLectureData() {
    //     await axios
    //     .get('/api/attendence')
    //     .then((res)=>{
    //         setInputData(res.data);
    //         console.log('js, get', res.data)
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }


    // const [fetchedData, setFetchedData] = useState({});
    // const [modifiedData, setModifiedData] = useState({});
  

    // 서버에서 데이터를 가져오는 함수

  
    // 수정된 데이터를 서버에 보내는 함수
    const handleDataUpdate = async () => {
      try {
        const response = await axios.post('/api/attendence', pickedDate);
        console.log('.post response.data', response.data);
      } catch (err) {
        console.error(err);
      }
    };


    const fetchData = async () => {
        try{
          const response = await axios.get('/api/attendence');
          // 가져온 데이터를 state에 저장
          setInputData(response.data);
          console.log('.get response.data', response.data);
        } catch (err) {
          console.error(err);
        }
      };

      useEffect(() => {
        fetchData();  
      }, []);
    








    // useEffect(() => {
    //     try {
    //         // studentForLectureData();
    //     } catch(e){
    //         console.error(e.message)
    //     }
    // }, [])


    // const handleDataUpdate = async () => {
    //     try {
    //       const response = await axios.post('/api/attendence', pickedDate);
    //       console.log('.post response.data', response.data);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //     studentForLectureData();

    //   };


    //   const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setModifiedData(prevData => ({ ...prevData, [name]: value }));
    //   };


    // async function studentForLectureData() {
    //     await axios
    //     .get('/api/attendence')
    //     .then((res)=>{
    //         // console.log('attendenceCheck.js', res.data.lecture_code);
    //         setInputData(res.data);
    //         // console.log(res.data[0][`attendence${_mm_dd}`]);
    //         // console.log(res.data);
    //         // console.log(typeof(res.data));
    //         datas = res.data
    //         // for (let i=0; i < res.data.length; i++) {
    //         //     datas[i]['student_id'] = res.data[i].student_id
    //         //     datas[i]['student_name'] = res.data[i].student_name
    //         //     datas[i]['attendence_mm_dd'] = res.data[i].attendence_mm_dd
    //         // }
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }

//     // -----------------------------------------------------------------

//     const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
//   const [model, setModel] = useState({
//     net: null,
//     inputShape: [1, 0, 0, 3],
//   }); // init model & input shape

//   // references
//   const imageRef = useRef(null);
//   const cameraRef = useRef(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // model configs
//   const modelName = "yolov5s";
//   const classThreshold = 0.2;

//   useEffect(() => {
//     tf.ready().then(async () => {
//       const yolov5 = await tf.loadGraphModel(
//         `${window.location.origin}/${modelName}_web_model/model.json`,
//         {
//           onProgress: (fractions) => {
//             setLoading({ loading: true, progress: fractions }); // set loading fractions
//           },
//         }
//       ); // load model

//       // warming up model
//       const dummyInput = tf.ones(yolov5.inputs[0].shape);
//       const warmupResult = await yolov5.executeAsync(dummyInput);
//       tf.dispose(warmupResult); // cleanup memory
//       tf.dispose(dummyInput); // cleanup memory
//     //   console.log('model', model)
//       setLoading({ loading: false, progress: 1 });
//       setModel({
//         net: yolov5,
//         inputShape: yolov5.inputs[0].shape,
//       }); // set model & input shape

//     });
//   }, []);



    return (

        <div className={styles.AttendenceCamBox}>

                <table className={styles.AttendenceCamTable}>
                    <tr>

                            <div className={styles.calenderBox}>
                                <Calendar className={styles.calender} onChange={onChange} value={value}
                                formatDay ={(locale, date) => dayjs(date).format('DD')} />
                            </div>
                            <div>
                                {/* {value} */}
                                {pickedDate}
                                <button onClick={handleDataUpdate}>선택</button>
                            </div>
                            <div></div>
                    </tr>

                {/* {inputData ? inputData.map((inputDatas)=>(
                    <th colSpan={2} className={styles.lectureName}>
                        <p>{inputDatas.lecture_name}</p>
                    </th>
                    ))[0] : ''}
                        <tr height='400'>
                            <td className={styles.attendenceTd}>
                                <table className={styles.AttendenceCheckTable}>
                                    <tr height='40px'>
                                        <th width='70' align='center'>학번</th>
                                        <th width='70' align="center">학생명</th>
                                        <th width='70' align="center">출석여부</th>
                                    </tr>
                                    
                                    {inputData ? inputData.map((inputDatas)=>(                 
                                        <tr id={inputDatas.student_id} height='30px'>
                                            <td className={styles.classCols}>
                                                <li>{inputDatas.student_id}</li>
                                            </td>
                                            <td className={styles.classCols}>
                                                    <li>{inputDatas.student_name}</li>
                                            </td>
                                            <td className={styles.btnCols}>
                                                <p className={styles.pMargin}>
                                                    {inputDatas[`${attendence_mm_dd}`]}
                                                </p>
                                            </td>
                                        </tr>           
                                    )) : ''} 
                                </table>
                            </td>
                                                                
                        
                            <td className={styles.ipCamTd}>
                                <td>
                                    <ButtonHandler className={styles.btn} cameraRef={cameraRef} />
                                    
                                </td>
                                

                                <div className="content" >
                                        <video
                                        //   style
                                        autoPlay
                                        muted
                                        ref={cameraRef}
                                        onPlay={() => detectVideo(cameraRef.current, model, classThreshold, canvasRef.current)}
                                        />
                                        <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
                                    </div>

                                
                                <div className="App">
                                    {loading.loading && <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>}                                    
                                </div>
                            </td>

                        </tr> 
                

                <tr>
                    <span className={styles.modifyBtn}>
                        {inputData ? inputData.map((inputDatas)=>(

                            <Link to={`/${inputDatas.lecture_code}/edit`}>
                                <button>수정</button>
                            </Link>
                        ))[0] : ''}
                    </span>
                    <span className={styles.modifyBtn}>
                        {inputData ? inputData.map((inputDatas)=>(
                            <Link to={`/${inputDatas.professors_id}/lectures`}>
                                <button>강좌 목록</button>
                            </Link>
                            ))[0] : ''}
                    </span>
                    <span> */}
                        {/* <button onClick={fileDownload}>FILE DONWLOAD</button> */}
                        {/* <FileDownloadButton/> */}
                    {/* </span>
                </tr> */}
                </table>
                {/* <p className={styles.copyright}>Developed by 빠지지말아조 | hayeong koo, chaewon kim</p> */}
        </div>
      
    );
};

export default StudentList;