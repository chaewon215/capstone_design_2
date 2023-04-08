import React, { useEffect, useState } from 'react';

import styles from './AttendenceCheck.module.css';
import axios from 'axios';
import { useNavigate, Route, Link, useParams, Routes, Router } from 'react-router-dom';


function StudentList(){

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
            console.log('attendenceCheck.js', res.data.lecture_code);
            setInputData(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })

    }



    return (
        <div className={styles.AttendenceCamBox}>
            <table className={styles.AttendenceCamTable}>
                <tr height='400'>

                    <td className={styles.attendenceTd}>
                        <table className={styles.AttendenceCheckTable}>
                            <tr height='40'>
                                <th width='150' align="center">학생명</th>
                                <th width='70' align="center">출석</th>
                            </tr>
                            {inputData ? inputData.map((inputDatas)=>(
                                <tr id={inputDatas.student_id}>
                                    <td>
                                            <li>{inputDatas.student_name}</li>
                                    </td>
                                    <td className='listTableIndex'>
                                        <p>-</p>
                                        {/* <button><Link to={`/attendence/${inputDatas.lecture_code}`}>출석체크</Link></button> */}
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
        </div>
    );
};

export default StudentList;