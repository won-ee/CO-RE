import React from 'react'
import logoImg from '../assets/logoImg.png'
import loginImg from '../assets/loginImg.jpg'
import { Layout, LoginButton, LoginImg, LogoBox, LogoImg } from './LoginPage.styled'
import useUserStore from '../store/userStore'

const LoginPage:React.FC = () => {
  const { login } = useUserStore(); 
  return (
    <>
        <Layout>
            <LoginImg src={loginImg}/>
            <LogoBox>
                <LogoImg src={logoImg}/>
                <LoginButton onClick={login}>SOCIAL LOGIN</LoginButton>
            </LogoBox>
        </Layout>
    </>
  )
}

export default LoginPage