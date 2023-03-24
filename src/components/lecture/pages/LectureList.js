import React from 'react';

import './LectureList.css'

function LectureList(props){

    const lectures = ['가상현실', '인공지능', '컴퓨터공학종합프로젝트2(캡스톤디자인)'];

    const lectureList = lectures.map((lecture) => (
        
            <tr>
                <td><li key={String(lecture)}>{lecture}</li></td>
                <td><button className='check'>출석체크</button></td>
            </tr>
    ))
            // {/* <li key={String(lecture)}>{lecture}<button className='check'>출석 체크</button></li>      */}


    return (
        <div className='LecturesBox'>
            <table className='LecturesTable'>
                <ol>
                    {lectureList}
                </ol>
            </table>
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