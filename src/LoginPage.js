// import Login from './Login';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route, Switch, useNavigate } from 'react-router-dom';
// import Dashboard from './Dashboard';
import img from "./jnu_logo.png";

import styles from './LoginPage.module.css';



function LoginPage(props) {
  // const [IsLogin, setIsLogin] = React.useState(false);

  // useEffect(() => {
  //   // axios.get('/api/user_inform')
  //   //   .then(res => console.log(res))
  //   //   .catch(err => console.log(err))

  //   // if (sessionStorage.getItem('user_ID') == null) {
  //   //   console.log('isLogin 값이 어떻게 되어있는가', IsLogin); //저장된 값이 없다면
  //   // } else {
  //   //   setIsLogin(true);
  //   //   console.log('isLogin 값이 어떻게 되어있는가', IsLogin);//저장된 값이 있다면
  //   // }
  // }, [])



  const [userid, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [useridVaild, setuseridValid] = React.useState(false);
  const [passwordVaild, setpasswordVaild] = React.useState(false);
  const [notallow, setNotallow] = React.useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (useridVaild && passwordVaild) {
      setNotallow(false);
      return;
    }
    setNotallow(true);
  }, [useridVaild, passwordVaild])


  const handleuserid = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length > 0) {
      setuseridValid(true);
    }
    else {
      setuseridValid(false);
    }
  }
  const handlepassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length > 0) {
      setpasswordVaild(true);
    }
    else {
      setpasswordVaild(false);
    }
  }

  const onClickConfirmButton = () => {
    // axios.post('/api/user_inform', {
    //   'user_ID': userid,
    //   'user_pw': password
    // }).then(response => {
    //   const data = response.data;
    //   if (data.result === true) {
    //     // alert('로그인 되었습니다!');
    //     sessionStorage.setItem('user_ID', userid);
    //     const storedUsername = sessionStorage.getItem('user_ID');
    //     console.log("로그인 아이디 : ", storedUsername); // 출력 결과: "my_userid"
    //     navigate(`${storedUsername}/lectures`);
    //     // 로그인 성공 시 처리
    //   } else {
    //     console.log(response.data);
    //     alert('아이디 또는 비밀번호가 일치하지 않습니다!');
    //     // 로그인 실패 시 처리
    //   }
    // }).catch(error => {
    //   console.error(error);
    //   alert('로그인에 실패하였습니다.');
    // });

  
      const userData = {
        user_ID: userid,
        user_pw: password,
      };
      console.log(userData)
      fetch("/api/user_inform", { //auth 주소에서 받을 예정
        method: "POST", // method :통신방법
        headers: {      // headers: API 응답에 대한 정보를 담음
          "content-type": "application/json",
        },
        body: JSON.stringify(userData), //userData라는 객체를 보냄
      })
        .then((res) => res.json())
        .then((json) => {            
          if(json.isLogin==="True"){
            // props.setMode("WELCOME");
            // alert('성공')
            sessionStorage.setItem('user_ID', userid);
            const storedUsername = sessionStorage.getItem('user_ID');
            console.log("로그인 아이디 : ", storedUsername); // 출력 결과: "my_userid"
            navigate(`${storedUsername}/lectures`);
          }
          else {
            alert(json.isLogin)
          }
        });
  }


  return (
    <div className={styles.box}>
      <table className={styles.tbl}>
        <tr className={styles.system}>
          학생 출결 관리 시스템
        </tr>
        <tr><hr></hr></tr>
        <tr>
          <div className={styles.titleWrap}>
            <img width='380px' src={img} alt="Logo" /> {/* //학교 이미지*/}
          </div>
        </tr>

        <tr className={styles.inputWrap}>
          <input type="text" name='id' id='id' autoComplete='off' required
            placeholder='USERNAME'
            value={userid}
            onChange={handleuserid}></input>
        </tr>

        <tr className={styles.inputWrap}>
          <input type="password" name='pw' id='pw' autoComplete='off' required
            placeholder='PASSWORD'
            value={password}
            onChange={handlepassword}></input>
        </tr>

        <tr>
          <div className={styles.btn}>
            <button onClick={onClickConfirmButton} disabled={notallow} type='submit'>LOGIN</button>
          </div>
          <div className={styles.btn}>
            <Link to={'/signup'}>
              <button>SIGN UP</button>
            </Link>
          </div>
        </tr>
      </table>
      <p className={styles.copyright}>Copyright ⓒ 2023. Hayeong Koo, Chaewon Kim. All rights reserved.</p>
    </div>
  )
}

export default LoginPage;
