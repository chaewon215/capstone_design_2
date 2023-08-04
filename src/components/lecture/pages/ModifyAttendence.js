import React, { useEffect, useState } from 'react';

import styles from './ModifyAttendence.module.css';
import axios from 'axios';
import { useNavigate, Route, Link, useParams, Routes, Router } from 'react-router-dom';


const ModifyAttendence = () => {
  
  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var date = ('0' + today.getDate()).slice(-2);
  var yyyy_mm_dd = year + '_' + month + '_' + date
  var _mm_dd = '_' + month + '_' + date
  
  
  const [fetchedData, setFetchedData] = useState({});
  const [modifiedData, setModifiedData] = useState({});
  const [clickedDate, setclickedDate] = useState({});
  

  useEffect(() => {
    // fetchDateData();
    fetchData();  
  }, []);

  useEffect(() => {
    // GET request to fetch data from the server
    fetch("/api/date")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("date 정보 가져올 수 없음");
        }
      })
      .then((data) => {
        // Set the received data to the state variable
        // setResponseData(data.date);
        // console.log('data.date', data.date)
        setclickedDate(data.date);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  // 서버에서 데이터를 가져오는 함수
  const fetchData = async () => {
    try{
      const response = await axios.get('/api/edit');
      // 가져온 데이터를 state에 저장
      setFetchedData(response.data);
      // console.log('.get response.data', response.data);
    } catch (err) {
      console.error(err);
    }
  };



  // 수정된 데이터를 서버에 보내는 함수
  const handleDataUpdate = async () => {
    try {
      const response = await fetch("/api/edit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ modifiedData: modifiedData, clickedDate: clickedDate }),
    });
    if (response.ok) {
      const data = await response.json();
      // console.log("handleDataUpdate:", data);
  }
    } catch (err) {
      console.error(err);
    }
  };

  // 데이터를 수정하는 이벤트 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifiedData(prevData => ({ ...prevData, [name]: value }));
  };

  
  return (

    <div className={styles.AttendenceCamBox}>
      <div className={styles.logoutBtnBox}>
        <Link to={'/'}>
          <button className={styles.logoutBtn}>LOGOUT</button>
        </Link>
      </div>
        <table className={styles.AttendenceCamTable}>
        {Object.values(fetchedData) ? Object.values(fetchedData).map((fetchedDatas)=>(
                      <th colSpan={2} className={styles.lectureName}>
                          <p>{fetchedDatas.lecture_name}</p>
                      </th>
                        ))[0] : ''}
        {/* {fetchedData ? fetchedData.map((fetchedDatas)=>(
                    <th colSpan={2} className={styles.lectureName}>
                        <p>{fetchedDatas.lecture_name}</p>
                    </th>
                    ))[0] : ''} */}
            <tr height='400'>

                <td className={styles.attendenceTd}>
                    <table className={styles.AttendenceCheckTable}>
                        <tr height='40'>
                              <th width='70' align='center'>학번</th>
                              <th width='70' align="center">학생명</th>
                              <th width='70' align="center">출석여부</th>
                        </tr>
                        {Object.values(fetchedData) ? Object.values(fetchedData).map((fetchedDatas)=>(
                            
                            <tr id={fetchedDatas.student_id} height='30px'>
                                <td className={styles.classCols}>
                                        <li>{fetchedDatas.student_id}</li>
                                </td>
                                <td className={styles.classCols}>
                                        <li>{fetchedDatas.student_name}</li>
                                </td>
                                <td className={styles.btnCols}>
                                    {/* <p>{inputDatas[`attendence${_mm_dd}`]}</p> */}
                                    {/* <select onChange={handleInputChange} name={`${itemData[0].student_id}`} value={itemData[0].attendence_04_12 || ''}>{options}</select> */}
                                    <select onChange={handleInputChange} name={fetchedDatas.student_name} style={{border: 0, color: (236, 236, 236)}} >
                                      <option value=""></option>
                                      <option value="출석">출석</option>
                                      <option value="결석">결석</option>
                                      <option value="지각">지각</option>
                                    </select>
                                </td>
                            </tr>
    
                        )) : ''}
                    </table>
                </td>
    
                {/* <td className={styles.ipCamTd}>
                    <td><button className={styles.startCam}>시작</button></td>
                    
                    <video controls='controls' poster='http://via.placeholder.com/640x360'>
                    </video>
                    
                </td> */}
            </tr>
            <tr className={styles.modifyBtn}>
              <div className={styles.btnsRow}>

            {Object.values(fetchedData) ? Object.values(fetchedData).map((fetchedDatas)=>(
              <Link to={`/${fetchedDatas.lecture_code}`}>
                    <button onClick={handleDataUpdate}>저장</button>
                    <button>취소</button>
                </Link>
            ))[0] : ''}
        
            </div>

            </tr>
            <p className={styles.copyright}>Copyright ⓒ 2023. Hayeong Koo, Chaewon Kim. All rights reserved.</p>
        </table>



    </div>

);

}


export default ModifyAttendence;