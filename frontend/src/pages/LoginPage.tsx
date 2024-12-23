import React from 'react'
import logoImg from '../assets/logoImg.png'
import loginImg from '../assets/loginImg.jpg'
import { Layout, LoginButton, LoginImg, LogoBox, LogoImg } from './LoginPage.styled'


const LoginPage:React.FC = () => {
  const handleLogin = () => {
    window.location.href = 'https://k11s106.p.ssafy.io/api/login/jira'; 
  };
  return (
    <>
        <Layout>
            <LoginImg src={loginImg}/>
            <LogoBox>
                <LogoImg src={logoImg}/>
                <LoginButton onClick={handleLogin}>SOCIAL LOGIN</LoginButton>
            </LogoBox>
        </Layout>
    </>
  )
}

export default LoginPage