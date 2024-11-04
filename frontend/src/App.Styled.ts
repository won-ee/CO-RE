import styled from "styled-components";
import { SingleSelectStyles } from "./Types/SelectType";


export const DisplayLayout=styled.div`
display: flex;
height: 100vh;
`

export const SidebarLayout = styled.div`
  flex: 0 0 240px;
  height:100vh;
  position: fixed;
  background-color: white;
`

export const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 57px; 
  padding-right: 18px;
  background-color: white;
  height:70px;
  font-weight: bold;
  font-size:28px;
`
export const ChoiceStyles: SingleSelectStyles = {
  control: (provided) => ({
    ...provided,
    width:'244px',
    height:'40px',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: '8px',
    paddingLeft: '10px',
    boxShadow: 'none',
    fontSize:'18px',
    fontWeight:'normal',
    '&:hover': {
      borderColor: 'black',  // 마우스를 올렸을 때 테두리 색상 유지
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    marginTop: '5px',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize:'18px',
    fontWeight:'normal',
    backgroundColor: state.isSelected ? 'lightgreen' : 'white',
    '&:hover': {
      backgroundColor: 'lightgray',
    },
    padding: '10px 20px',
  }),
};

export const NavLayout = styled.div`
  flex: 1;
  margin-left: 240px;
  background-color:#F5F6FA;
`