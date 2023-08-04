import React, { useEffect, useState, useRef } from 'react';

import styles from './AttendenceCheck.module.css';
import axios from 'axios';
import { useNavigate, Route, Link, useParams, Routes, Router } from 'react-router-dom';

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "../../../components/loader";
import { ButtonHandler, updatedAttend } from "../../../components/btn-handler";
import { detectImage, detectVideo } from "../../../utils/detect";
import "../../../style/Live.css";
import { renderBoxes, Attendence } from "../../../utils/renderBox";
import labels from "../../../utils/labels.json";
import Calendar from 'react-calendar';
import './Calendar copy.css'; // css import
import moment from "moment";


export let Day ='';


const StudentList = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [response, setResponse] = useState(null);
    const [lectureInfo, setlectureInfo] = useState(null);
    const [date, setDate] = useState(null);

    let attendence_mm_dd = 'attendence_' + moment(selectedDate).format("MM_DD");
    useEffect(() => {
        try {
            studentForLectureData();
        } catch (e) {
            console.error(e.message)
        }
    }, [])

    async function studentForLectureData() {
        await axios
            .get('/api/attendence')
            .then((res) => {
                // console.log('attendenceCheck.js', res.data);
                setlectureInfo(res.data);
                // console.log(res.data[0][`attendence${_mm_dd}`]);
                // console.log(res.data);
                // console.log(typeof(res.data));

                // for (let i=0; i < res.data.length; i++) {
                //     datas[i]['student_id'] = res.data[i].student_id
                //     datas[i]['student_name'] = res.data[i].student_name
                //     datas[i]['attendence_mm_dd'] = res.data[i].attendence_mm_dd
                // }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const handleDateClick = async (date) => {
        setSelectedDate(date);
        const formattedDate = moment(date).format("MM_DD");
        setDate(formattedDate);
        Day = formattedDate;
        try {
            const response = await fetch("/api/attendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ date: formattedDate }),
            });
            
            if (response.ok) {
                const data = await response.json();
                setResponse(data);
                // console.log("Data received:", data);
                // console.log('response1.ok', response1)
            } else {
                // console.log("Failed to fetch data");
                // alert("Data received")
                alert('출석 정보가 없습니다. 다른 날짜를 선택해주세요.');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("An error occurred");
        }
    };



    const handleButtonClick = async () => {
        try {
        // const formattedDate = moment(date).format("MM_DD");
          
        const response = await fetch("/api/date", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ formattedDate: date }),
        });
            if (response.ok) {
                const data = await response.json();
                // console.log("handleButtonClick:", data);
            }
            else {
              console.log("/api/date으로 클릭한 날짜 정보 전송 실패");
            }
        } catch (err) {
          console.error(err);
        }
      };


    // ---------------------------------------- model

    const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
    const [model, setModel] = useState({
        net: null,
        inputShape: [1, 0, 0, 3],
    }); // init model & input shape

    // references
    const imageRef = useRef(null);
    const cameraRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // model configs
    const modelName = "yolov5s";
    const classThreshold = 0.2;

    useEffect(() => {
        tf.ready().then(async () => {
            const yolov5 = await tf.loadGraphModel(
                `${window.location.origin}/${modelName}_web_model/model.json`,
                {
                    onProgress: (fractions) => {
                        setLoading({ loading: true, progress: fractions }); // set loading fractions
                    },
                }
            ); // load model

            // warming up model
            const dummyInput = tf.ones(yolov5.inputs[0].shape);
            const warmupResult = await yolov5.executeAsync(dummyInput);
            tf.dispose(warmupResult); // cleanup memory
            tf.dispose(dummyInput); // cleanup memory
              console.log('model', model)
            setLoading({ loading: false, progress: 1 });
            setModel({
                net: yolov5,
                inputShape: yolov5.inputs[0].shape,
            }); // set model & input shape

        });
    }, []);


    return (


        <div className={styles.AttendenceCamBox}>
            <div className={styles.logoutBtnBox}>
                <Link to={'/'}>
                    <button className={styles.logoutBtn}>LOGOUT</button>
                </Link>
            </div>
            <table className={styles.AttendenceCamTable}>
                {lectureInfo ? lectureInfo.map((inputDatas) => (
                    <th colSpan={2} className={styles.lectureName}>
                        <p>{inputDatas.lecture_name}</p>
                    </th>
                )) : ''}

                <tr height='400'>
                    <tr>
                        <div style={{ padding: 10 }}>
                            <Calendar onClickDay={handleDateClick} />
                        </div>
                    </tr>
                    <tr>
                        <div>
                            {selectedDate && (
                                <p className={styles.selectedDate}>선택된 날짜: {moment(selectedDate).format("MM/DD/YYYY")}</p>
                            )}
                        </div>
                    </tr>
                    <td className={styles.attendenceTd}>
                        <table className={styles.AttendenceCheckTable}>
                            <tr height='40px'>
                                <th width='70' align='center'>학번</th>
                                <th width='70' align="center">학생명</th>
                                <th width='70' align="center">출석여부</th>
                            </tr>

                            {response ? response.map((inputDatas) => (
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
                        <tr className={styles.startBtn}>
                            <ButtonHandler className={styles.btn} cameraRef={cameraRef} clickedDate={date} />
                        </tr>
                        <tr>
                        {/* <Loader>Loading model...⏳ {(loading.progress * 100).toFixed(2)}%</Loader> */}
                            {loading.loading && <Loader>Loading model...⏳ {(loading.progress * 100).toFixed(2)}%</Loader>}
                        </tr>
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
                        <td>
                            {/* {loading.loading && <Loader>Loading model...⏳ {(loading.progress * 100).toFixed(2)}%</Loader>} */}
                        </td>
                    </td>

                </tr>


                <tr>
                    <div className={styles.btnsRow}>

                    <span className={styles.modifyBtn}>
                        {lectureInfo ? lectureInfo.map((inputDatas) => (
                            <Link to={`/${inputDatas.lecture_code}/edit`}>
                                <button onClick={handleButtonClick}>수정</button>
                            </Link>
                        )) : ''}
                    </span>
                    <span className={styles.modifyBtn}>
                        {lectureInfo ? lectureInfo.map((inputDatas) => (
                            <Link to={`/${inputDatas.professors_id}/lectures`}>
                                <button>강좌 목록</button>
                            </Link>
                        )) : ''}
                    </span>
                    <span>
                        {/* <button onClick={fileDownload}>FILE DONWLOAD</button>
                        <FileDownloadButton/> */}
                    </span>
                    </div>
                </tr>
            </table>
            <p className={styles.copyright}>Copyright ⓒ 2023. Hayeong Koo, Chaewon Kim. All rights reserved.</p>
        </div>
    );
};


export default StudentList;