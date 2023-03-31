import React from 'react';

import styles from './AttendenceCheck.module.css';
import { useNavigate } from 'react-router-dom';

function StudentList(props){

    const students_attendence = [{value: '구하영', id: '-'}, {value: '김채원', id: '-'}, {value: '홍길동', id: '-'}]


    const studentAttendenceList = students_attendence.map((student, index) => (
            <tr>
                <td><li key={String(student)}>{student.value}</li></td>
                <td><li key={String(index)}>{student.id}</li></td>      
            </tr>
    ))
       


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
                                {studentAttendenceList}
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