import React from 'react';

import styles from './LectureList.module.css';
import { useNavigate } from 'react-router-dom';

function LectureList(props){
    // const lectures = [{value: '가상현실', id: 1}, {value: '인공지능', id: 2}, {value: '컴퓨터공학종합프로젝트2(캡스톤디자인)', id: 3}];
    const lectures = ['가상현실', '인공지능', '컴퓨터공학종합프로젝트2(캡스톤디자인)'];

    const lectureList = lectures.map((lecture) => (
        
            <tr>
                <td><li key={String(lecture)}>{lecture}</li></td>
                <td><button className='check' onClick={golist}>출석체크</button></td>
            </tr>
    ))
            
    const movePage = useNavigate();

    function golist(){
        movePage('/attendence:id');
      }

    return (
        <div>
            <div className={styles.TitleBox}>
                <h1 className={styles.ListTitle}>진행 강좌 목록</h1>
            </div>
            <div className={styles.LecturesBox}>
                <table className={styles.LecturesTable}>

                        {lectureList}

                </table>
            </div>
        </div>
        
    );
};





// const LectureList = () => {

//     const menus = [{key:1, value:'가상현실'},
//                {key:2, value:'인공지능'},
//                {key:3, value:'컴퓨터공학종합프로젝트2(캡스톤디자인)'}];
//     const menuList = menus.map((index, data) => (<li key={index}>{data}</li>))

//     // return(
//     //     <ul>
//     //         {menuList}
//     //     </ul>
//     // )

    

//     };


export default LectureList;