import React, { useEffect } from 'react';
import { Route, BrowserRouter, Routes, Switch } from 'react-router-dom';
import axios from 'axios';

import LectureList from './components/lecture/pages/LectureList';
import AttendenceCheck from './components/lecture/pages/AttendenceCheck';
// import Dashboard from './components/lectures/pages/Dashboard';

function App() {
  useEffect(() => {
    axios.get('/api/test')
      .then(res => console.log(res))
      .catch()
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LectureList />}></Route>
          <Route path='/attendence:id' element={<AttendenceCheck />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;