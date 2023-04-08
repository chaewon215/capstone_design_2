import React, { useEffect } from 'react';
import { Route, BrowserRouter, Routes, Switch, Link } from 'react-router-dom';
import axios from 'axios';

import LectureList from './components/lecture/pages/LectureList';
import AttendenceCheck from './components/lecture/pages/AttendenceCheck';
// import Dashboard from './components/lectures/pages/Dashboard';

function App() {
  // useEffect(() => {
  //   axios.get('/api/test')
  //     .then(res => console.log(res))
  // })
 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LectureList />}></Route>
          <Route path='/:id' element={<AttendenceCheck />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;