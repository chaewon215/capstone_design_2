import React, { useEffect, useState } from 'react';

import styles from './AttendenceCheck.module.css';
import axios from 'axios';
import { useNavigate, Route, Link, useParams, Routes, Router } from 'react-router-dom';


function StudentList(){

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var date = ('0' + today.getDate()).slice(-2);
    var yyyy_mm_dd = year + '_' + month + '_' + date
    var attendence_mm_dd = 'attendence_' + month + '_' + date


    const [inputData, setInputData] = useState()

    useEffect(() => {
        try {
            studentForLectureData();
        } catch(e){
            console.error(e.message)
        }
    }, [])

    async function studentForLectureData() {
        await axios
        .get('/api/attendence')
        .then((res)=>{
            // console.log('attendenceCheck.js', res.data.lecture_code);
            setInputData(res.data);
            // console.log(res.data[0][`attendence${_mm_dd}`]);
        })
        .catch((err)=>{
            console.log(err);
        })

    }










    

    return (

        <div className={styles.AttendenceCamBox}>
                <table className={styles.AttendenceCamTable}>
                {/* {inputData ? inputData.map((inputDatas)=>(
                    <tr height='100px'>
                        <p>{inputDatas.lecture_code}</p>
                    </tr>
                    ))[0] : ''} */}
                        <tr height='400'>
                            <td className={styles.attendenceTd}>
                                <table className={styles.AttendenceCheckTable}>
                                    <tr height='40px'>
                                        <th width='150' align="center">학생명</th>
                                        <th width='70' align="center">출석</th>
                                    </tr>
                                    
                                    {inputData ? inputData.map((inputDatas)=>(                 
                                        <tr id={inputDatas.student_id} height='30px'>
                                            <td>
                                                    <li>{inputDatas.student_name}</li>
                                            </td>
                                            <td>
                                                <p className={styles.pMargin}>
                                                    {inputDatas[`${attendence_mm_dd}`]}
                                                </p>
                                            </td>
                                        </tr>           
                                    )) : ''} 
                                </table>
                            </td>
                        
                            <td className={styles.ipCamTd}>
                                <td><button className={styles.startCam}>시작</button></td>
                                
                                <video controls='controls' poster='http://via.placeholder.com/640x360'>
                                </video>
                                
                            </td>

                        </tr>
                </table>
                
                <div className={styles.modifyBtn}>
                    {inputData ? inputData.map((inputDatas)=>(

                        <Link to={`/${inputDatas.lecture_code}/edit`}>
                            <button>수정</button>
                        </Link>
                    ))[0] : ''}
                </div>
        </div>
      
    );
};

export default StudentList;