// import Login from './Login';
import axios from 'axios'; 
import React, { useEffect, useState }  from 'react';
import { BrowserRouter, Link, Routes, Route, Switch, useNavigate } from 'react-router-dom';
// import Dashboard from './Dashboard';
import img from "./jnu_logo.png";

import styles from './Signup.module.css';


function Signup(props) {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();
  


    function handleSignupClick() {
        const userData = {
          userName: name,
          userId: id,
          userPassword: password,
          userPassword2: password2,
        };
        fetch("/api/signup", { //signup 주소에서 받을 예정
          method: "post", // method :통신방법
          headers: {      // headers: API 응답에 대한 정보를 담음
            "content-type": "application/json",
          },
          body: JSON.stringify(userData), //userData라는 객체를 보냄
        })
          .then((res) => res.json())
          .then((json) => {
            if(json.isSuccess==="True"){
              alert('회원가입이 완료되었습니다!')
              navigate('/');

            //   props.setMode("LOGIN");
            }
            else{
              alert(json.isSuccess)
            }
          });
      }


    return <>
      {/* <h2 className={styles.title}>회원가입<hr width='380px'></hr></h2>
      

      <div className={styles.form}>
        <p><input className={styles.login} type="text" placeholder="이름" onChange={event => {
          setName(event.target.value);
        }} /></p>
        <p><input className={styles.login} type="text" placeholder="아이디" onChange={event => {
          setId(event.target.value);
        }} /></p>
        <p><input className={styles.login} type="password" placeholder="비밀번호" onChange={event => {
          setPassword(event.target.value);
        }} /></p>
        <p><input className={styles.login} type="password" placeholder="비밀번호 확인" onChange={event => {
          setPassword2(event.target.value);
        }} /></p>
  
        <p><button className={styles.btn} type='submit' value="회원가입" onClick={handleSignupClick}>회원가입</button></p>
      <p>
        <Link  to={'/'}>
        <button className={styles.btn}>로그인 화면으로 돌아가기</button>
        </Link>
        </p>
        <p className={styles.copyright}>Copyright ⓒ 2023. Hayeong Koo, Chaewon Kim. All rights reserved.</p>
      </div> */}

    <div className={styles.box}>
      <table className={styles.tbl}>
        <tr className={styles.system}>
          회원가입
        </tr>
        <tr><hr></hr></tr>

        <tr className={styles.inputWrap}>
          <input className={styles.login} type="text" placeholder="이름" onChange={event => {
            setName(event.target.value);
          }} />
        </tr>

        <tr className={styles.inputWrap}>
          <input className={styles.login} type="text" placeholder="아이디" onChange={event => {
            setId(event.target.value);
          }} />
        </tr>

        <tr className={styles.inputWrap}>
          <input className={styles.login} type="password" placeholder="비밀번호" onChange={event => {
            setPassword(event.target.value);
          }} />
        </tr>

        <tr className={styles.inputWrap}>
          <input className={styles.login} type="password" placeholder="비밀번호 확인" onChange={event => {
            setPassword2(event.target.value);
          }} />
        </tr>

        <tr>
          <div className={styles.btn}>
            <button type='submit' value="회원가입" onClick={handleSignupClick}>회원가입</button>
          </div>
          <div className={styles.btn}>
            <Link to={'/'}>
              <button>로그인 화면으로 돌아가기</button>
            </Link>
          </div>
        </tr>
      </table>
      <p className={styles.copyright}>Copyright ⓒ 2023. Hayeong Koo, Chaewon Kim. All rights reserved.</p>
    </div>

  </> 
  }
export default Signup;

