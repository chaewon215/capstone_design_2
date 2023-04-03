// import React from 'react';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import styles from './LectureList.module.css';
import { Route, Link, useParams, Routes, Router  } from 'react-router-dom';

import AttendenceCheck from '../pages/AttendenceCheck'


function LectureList(){

    const [inputData, setInputData] = useState()

    useEffect(() => {
        try {
            lectureData();
        } catch(e){
            console.error(e.message)
        }
    }, [])

    async function lectureData() {
        await axios
        .get('/api/test')
        .then((res)=>{
            console.log(res.data); 
            setInputData(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })

    }
    
    const { productId } = useParams();

    return (
        <div>
            <div className={styles.TitleBox}>
                <h1 className={styles.ListTitle}>진행 강좌 목록</h1>
            </div>
            <div className={styles.LecturesBox}>
                <table className={styles.LecturesTable}>

                {inputData ? inputData.map((inputDatas)=>(
                        <tr id={inputDatas.lecture_code}>
                            <td>
                                    <li>{inputDatas.lecture_name}</li>
                            </td>
                            <td className='listTableIndex'>
                                <button><Link to={`/attendence/${inputDatas.lecture_code}`}>출석체크</Link></button>
                            </td>
                        </tr>
                    

                )) : ''}

                </table>
            </div>
        </div>
        
    );
};


export default LectureList;