// import React, { useEffect, useState } from 'react';

// import styles from './ModifyAttendence.module.css';
// import axios from 'axios';
// import { useNavigate, Route, Link, useParams, Routes, Router } from 'react-router-dom';


// // const ModifyAttendence = ({ attendence }) => {
// //     const [itemData, setItemData] = useState({});
// //     const [inputData, setInputData] = useState();  

// //     const [choice, setChoice] = useState("");
// //     const states = ["-", "O", "X", "L"];

// //     const options = states.map((state) => {
// //         return <option value={state}>{state}</option>;
// //     });

// //     console.log('attendence', attendence);
// //     console.log('itemData', itemData)

  
// //     // 서버에서 항목 데이터 가져오기
// //     useEffect(() => {

// //         axios.get('/api//attendence/modify')
// //         .then(res => {
// //           setItemData(res.data);
// //           setInputData(res.data);
// //         })
// //         .catch(err => {
// //           console.error(err);
// //         });
// //     }, [attendence]); // itemId가 변경될 때마다 실행
  
// //     // 수정된 데이터 서버로 전송
// //     const handleSave = async () => {
// //         try {
// //             const response = await axios.put('/api/attendence/modify', itemData)
// //             console.log('데이터 업데이트 성공:', response.data);
// //         } catch (error)  {
// //           console.error('데이터 업데이트 실패:', error);
// //         };
// //     };
  
// //     // 수정된 데이터 핸들러
// //     const handleInputChange = e => {
// //         const { name, value } = e.target;
// //         setItemData(prevData => ({
// //           ...prevData,
// //           [name]: value
// //         }));
// //     };

// //     //   console.log('itemData after', itemData[0].lecture_code);
// //     console.log('itemData after', itemData)
    
// //     return (

// //         <div className={styles.AttendenceCamBox}>
// //             <table className={styles.AttendenceCamTable}>
// //                 {/* thead, tbody 설정하기... */}
// //                 <tr height='400'>

// //                     <td className={styles.attendenceTd}>
// //                         <table className={styles.AttendenceCheckTable}>
// //                             <tr height='40'>
// //                                 <th width='150' align="center">학생명</th>
// //                                 <th width='70' align="center">출석</th>
// //                             </tr>
// //                             {inputData ? inputData.map((inputDatas)=>(
                                
// //                                 <tr id={inputDatas.student_id} height='30px'>
// //                                     <td>
// //                                             <li>{inputDatas.student_name}</li>
// //                                     </td>
// //                                     <td className={styles.pMargin}>
// //                                         {/* <p>{inputDatas[`attendence${_mm_dd}`]}</p> */}
// //                                         <select onChange={handleInputChange} name={`${itemData[0].student_id}`} value={itemData[0].attendence_04_12 || ''}>{options}</select>
// //                                     </td>
// //                                 </tr>
        
// //                             )) : ''}
// //                         </table>
// //                     </td>
        
// //                     <td className={styles.ipCamTd}>
// //                         <td><button className={styles.startCam}>시작</button></td>
                        
// //                         <video controls='controls' poster='http://via.placeholder.com/640x360'>
// //                         </video>
                        
// //                     </td>
// //                 </tr>
// //             </table>

// //             <div className={styles.modifyBtn}>
// //                 {inputData ? inputData.map((inputDatas)=>(
// //                     <Link to={`/${inputDatas.lecture_code}`}>
// //                         <button onClick={handleSave}>저장</button>
// //                         <button>취소</button>
// //                     </Link>
// //                 ))[0] : ''}
// //             </div>

// //         </div>

// //   );
// // };
  
// // export default ModifyAttendence;


// function ModifyAttendence() {
//     const [inputData, setInputData] = useState();  

//     const [choice, setChoice] = useState();
//     const states = ["-", "O", "X", "L"];

//     const options = states.map((state) => {
//         return <option value={state}>{state}</option>;
//     });


//     // 수정된 데이터 핸들러
//     const handleInputChange = e => {
//         // const { name, value } = e.target;
//         // setItemData(prevData => ({
//         //   ...prevData,
//         //   [name]: value
//         // }));
//         setInputData(e.target.value);
//     };

//     // const handleStates = (event) => {
//     //     setChoice(event.target.value);
//     // };


//     var today = new Date();
//     var year = today.getFullYear();
//     var month = ('0' + (today.getMonth() + 1)).slice(-2);
//     var date = ('0' + today.getDate()).slice(-2);
//     var yyyy_mm_dd = year + '_' + month + '_' + date
//     var _mm_dd = '_' + month + '_' + date


//     useEffect(() => {
//         modify();
//     }, []);

//     async function modify() {
//         try {
//             const response = await axios.get('/api/attendence/modify');
//             setInputData(response.data);
//             console.log(response.data);
//             console.log('수정 완료');
//             document.location.href = `/${inputData.lecture_code}`;
//         } catch (error) {
//             console.log(error);
//         }
//     }



//     return (

//         <div className={styles.AttendenceCamBox}>
//             <table className={styles.AttendenceCamTable}>
//                 {/* thead, tbody 설정하기... */}
//                 <tr height='400'>

//                     <td className={styles.attendenceTd}>
//                         <table className={styles.AttendenceCheckTable}>
//                             <tr height='40'>
//                                 <th width='150' align="center">학생명</th>
//                                 <th width='70' align="center">출석</th>
//                             </tr>
//                             {inputData && inputData.map(inputDatas=>(
                                
//                                 <tr id={inputDatas.student_id} height='30px'>
//                                     <td>
//                                             <li>{inputDatas.student_name}</li>
//                                     </td>
//                                     <td className={styles.pMargin}>
//                                         {/* <p>{inputDatas[`attendence${_mm_dd}`]}</p> */}
//                                         <select value={inputDatas.attendence_04_13} onChange={handleInputChange}>{options}</select></td>
//                                 </tr>
        
//                             ))}
//                         </table>
//                     </td>
        
//                     <td className={styles.ipCamTd}>
//                         <td><button className={styles.startCam}>시작</button></td>
                        
//                         <video controls='controls' poster='http://via.placeholder.com/640x360'>
//                         </video>
                        
//                     </td>
//                 </tr>
//             </table>

//             <div className={styles.modifyBtn}>
//                     {inputData ? inputData.map((inputDatas)=>(
//                         <Link to={`/${inputDatas.lecture_code}`}>
//                             <button type='submit'>완료</button>
//                             <button>취소</button>
//                         </Link>
//                     ))[0] : ''}
//             </div>

//         </div>

//   );
// }
// export default ModifyAttendence;









// // // function ModifyAttendence(){

// // //     var today = new Date();
// // //     var year = today.getFullYear();
// // //     var month = ('0' + (today.getMonth() + 1)).slice(-2);
// // //     var date = ('0' + today.getDate()).slice(-2);
// // //     var yyyy_mm_dd = year + '_' + month + '_' + date
// // //     var _mm_dd = '_' + month + '_' + date


// // //     const [inputData, setInputData] = useState();
// // //     const [editedData, setEditedData] = useState();

// // //     useEffect(() => {
// // //         try {
// // //             modify();
// // //         } catch(e){
// // //             console.error(e.message)
// // //         }
// // //     }, []);

// // //     async function modify() {
// // //         await axios
// // //         .get('/api/attendence/modify')
// // //         // .post('/api/attendence/modify', { editedData })
// // //         .then((res)=>{
// // //             setInputData(res.data);
// // //             // console.log(res.data[0][`attendence${_mm_dd}`]);
// // //             console.log(res.data);
// // //         })
// // //         .catch((err)=>{
// // //             console.log(err);
// // //         })

// // //     }


// // //     return (
// // //         <div className={styles.AttendenceCamBox}>
// // //             <table className={styles.AttendenceCamTable}>
// // //                 {/* thead, tbody 설정하기... */}
// // //                 <tr height='400'>

// // //                     <td className={styles.attendenceTd}>
// // //                         <table className={styles.AttendenceCheckTable}>
// // //                             <tr height='40'>
// // //                                 <th width='150' align="center">학생명</th>
// // //                                 <th width='70' align="center">출석</th>
// // //                             </tr>
// // //                             {inputData ? inputData.map((inputDatas)=>(
                                
// // //                                 <tr id={inputDatas.student_id} height='30px'>
// // //                                     <td>
// // //                                             <li>{inputDatas.student_name}</li>
// // //                                     </td>
// // //                                     <td className={styles.pMargin}>
// // //                                         {/* <p>{inputDatas[`attendence${_mm_dd}`]}</p> */}
// // //                                         <form>
// // //                                             <select>
// // //                                                 <option>-</option>          {/*Not strat yet*/}
// // //                                                 <option>O</option>          {/*Participate*/}
// // //                                                 <option>L</option>          {/*Late*/}
// // //                                                 <option>X</option>          {/*Absent*/}
// // //                                             </select>
// // //                                         </form>
// // //                                     </td>
// // //                                 </tr>
        
// // //                             )) : ''}
// // //                         </table>
// // //                     </td>
        
// // //                     <td className={styles.ipCamTd}>
// // //                         <td><button className={styles.startCam}>시작</button></td>
                        
// // //                         <video controls='controls' poster='http://via.placeholder.com/640x360'>
// // //                         </video>
                        
// // //                     </td>
// // //                 </tr>
// // //             </table>

// // //             <div className={styles.modifyBtn}>
// // //                     {inputData ? inputData.map((inputDatas)=>(
// // //                         <Link to={`/${inputDatas.lecture_code}`}>
// // //                             <button type='submit'>완료</button>
// // //                             <button>취소</button>
// // //                         </Link>
// // //                     ))[0] : ''}
// // //             </div>

// // //         </div>
// // //     );
// // // };

// // // export default ModifyAttendence;



// // import React, { useEffect, useState } from 'react';
// // import styles from './ModifyAttendance.module.css';
// // import axios from 'axios';
// // import { useNavigate, Route, Link, useParams, Routes, Router } from 'react-router-dom';

// // const ModifyAttendance = ({ attendance }) => {
// //   const [itemData, setItemData] = useState([]);

// //   // 서버에서 항목 데이터 가져오기
// //   useEffect(() => {
// //     axios
// //       .get('/api/attendance/modify')
// //       .then(res => {
// //         setItemData(res.data);
// //       })
// //       .catch(err => {
// //         console.error(err);
// //       });
// //   }, [attendance]); // attendance가 변경될 때마다 실행

// //   // 수정된 데이터 서버로 전송
// //   const handleSave = async () => {
// //     try {
// //       const response = await axios.put('/api/attendance/modify', itemData);
// //       console.log('데이터 업데이트 성공:', response.data);
// //     } catch (error) {
// //       console.error('데이터 업데이트 실패:', error);
// //     }
// //   };

// //   // 수정된 데이터 핸들러
// //   const handleInputChange = (e, studentId) => {
// //     const { name, value } = e.target;
// //     setItemData(prevData => {
// //       return prevData.map(item => {
// //         if (item.student_id === studentId) {
// //           return { ...item, [name]: value };
// //         }
// //         return item;
// //       });
// //     });
// //   };

// //   return (
// //     <div className={styles.AttendanceCamBox}>
// //       <table className={styles.AttendanceCamTable}>
// //         {/* thead, tbody 설정하기... */}
// //         <tr height="400">
// //           <td className={styles.attendanceTd}>
// //             <table className={styles.AttendanceCheckTable}>
// //               <tr height="40">
// //                 <th width="150" align="center">
// //                   학생명
// //                 </th>
// //                 <th width="70" align="center">
// //                   출석
// //                 </th>
// //               </tr>
// //               {itemData &&
// //                 itemData.map(inputData => (
// //                   <tr key={inputData.student_id} height="30px">
// //                     <td>
// //                       <li>{inputData.student_name}</li>
// //                     </td>
// //                     <td className={styles.pMargin}>
// //                       <select
// //                         onChange={e => handleInputChange(e, inputData.student_id)}
// //                         name={`attendance_${inputData.student_id}`}
// //                         value={inputData[`attendance_${inputData.student_id}`] || ''}
// //                       >
// //                         <option value="-">-</option>
// //                         <option value="O">O</option>
// //                         <option value="X">X</option>
// //                         <option value="L">L</option>
// //                       </select>
// //                     </td>
// //                   </tr>
// //                 ))}
// //             </table>
// //           </td>

// //           <td className={styles.ipCamTd}>
// //             <td>
// //               <button className={styles.startCam}>시작</button>
// //             </td>
// //                                     <video controls='controls' poster='http://via.placeholder.com/640x360'>
// //                         </video>
                        
// //                     </td>
// //                 </tr>
// //             </table>

// //             <div className={styles.modifyBtn}>
// //                 {inputData ? inputData.map((inputDatas)=>(
// //                     <Link to={`/${inputDatas.lecture_code}`}>
// //                         <button onClick={handleSave}>저장</button>
// //                         <button>취소</button>
// //                     </Link>
// //                 ))[0] : ''}
// //             </div>

// //         </div>

// //   );
// // };



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModifyAttendence = () => {
  const [formData, setFormData] = useState({}); // 수정된 데이터를 저장할 상태
  const [fetchedData, setFetchedData] = useState({}); // 가져온 데이터를 저장할 상태

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 데이터를 가져오는 GET 요청
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 서버에서 데이터를 가져오는 GET 요청
      const response = await axios.get('/api/attendence/modify');
      // 가져온 데이터를 상태에 저장
      setFetchedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDataUpdate = async () => {
    try {
      // formData를 서버에 전송하는 POST 요청
      const response = await axios.post('/api/attendence/modify', formData);
      // 서버로부터 응답을 받은 후 필요한 처리를 수행
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 데이터를 수정하는 이벤트 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };


  for (var i= 0; i < fetchedData.length; i++ ) {
    console.log('fetchData', i, ':', fetchedData[i]);
  }

  return (
    <form>
      {/* 가져온 데이터를 보여주는 UI */}
      <div>
        <label>이름: </label>
        <span>{fetchedData.student_name}</span>
      </div>
      <div>
        <label>나이: </label>
        <span>{fetchedData.attendence_04_13}</span>
      </div>
      {/* 데이터 수정에 필요한 입력 폼 */}
      <input type="text" name="student_name" value={formData.student_name} onChange={handleInputChange} />
      <input type="text" name="attendence_04_13" value={formData.attendence_04_13} onChange={handleInputChange} />
      {/* 데이터 수정 버튼 */}
      <button type="button" onClick={handleDataUpdate}>데이터 수정</button>
    </form>
  );
};

export default ModifyAttendence;