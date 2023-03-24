import React from 'react';

import './Header.css'
// import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='TitleBox'>
                <h1 className='ListTitle'>진행 강좌 목록</h1>
                {/* <Link to='/' className='item'>KHU-FaceID</Link> */}
        </div>
    );
};

export default Header;