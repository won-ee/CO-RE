import React from 'react'
import logoImg from '../assets/logoImg.png'
import loginImg from '../assets/loginImg.jpg'
import { Layout, LoginButton, LoginImg, LogoBox, LogoImg } from './LoginPage.styled'
import useUserStore from '../store/userStore'


const LoginPage:React.FC = () => {
  const { login } = useUserStore(); 
  const handleLogin = () => {
    login(); 
    window.location.href = 'http://localhost:8080/login/jira;'; 
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