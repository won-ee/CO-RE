import styled from "styled-components";

export const Layout = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`

export const LoginImg = styled.img`
    width: 50%;
`

export const LogoBox = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const LogoImg = styled.img`
    width: 25%;
    height: 25%;

`

export const LoginButton = styled.button`
    margin-top: 6%;
    width: 400px;
    height: 50px;
    border-radius: 10px;
    background-color: black;
    color: white;
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);

`