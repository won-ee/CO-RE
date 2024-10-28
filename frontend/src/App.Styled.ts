import styled from "styled-components";

export const DisplayLayout=styled.div`
display: flex;
height: 100vh;
`

export const SidebarLayout = styled.div`
  flex: 0 0 240px;
  height:100vh;
  
  background-color: white;
`

export const HeaderLayout = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 57px; 
  background-color: white;
  height:70px;
  font-weight: bold;
  font-size:32px;
`

export const NavLayout = styled.div`
  flex: 1;
  background-color:#F5F6FA;
`