import React from 'react';

import './Header.css'
import { useNavigate } from 'react-router-dom';


function Header(){
    const movePage = useNavigate();

    function golist(){
        movePage('/lecturelist');
      }

    return (
        <div className='TitleBox'>
                <h1 className='ListTitle'>진행 강좌 목록</h1>
                {/* <Link to='/' className='item'>KHU-FaceID</Link> */}
                <button onClick={golist}>홈으로이동</button>
        </div>
    );
};

export default Header;