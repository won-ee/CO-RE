import React from 'react'
import logoImg from '../assets/logoImg.png'
import loginImg from '../assets/loginImg.jpg'
import { Layout, LoginButton, LoginImg, LogoBox, LogoImg } from './LoginPage.styled'

const LoginPage:React.FC = () => {
  return (
    <>
        <Layout>
            <LoginImg src={loginImg}/>
            <LogoBox>
                <LogoImg src={logoImg}/>
                <LoginButton>SOCIAL LOGIN</LoginButton>
            </LogoBox>
        </Layout>
    </>
  )
}

export default LoginPage