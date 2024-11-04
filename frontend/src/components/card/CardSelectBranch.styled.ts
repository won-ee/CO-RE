import styled from "styled-components";
import { SingleSelectStyles } from "../../Types/SelectType";

export const CardSelectBranchLayout = styled.div`
`
export const CardSelectBranchHeader = styled.div`
    margin: 21px 0px;
    font-size:24px;
    font-weight: bold;
`
export const ChoiceStyles: SingleSelectStyles = {
    control: (provided) => ({
      ...provided,
      width:'300px',
      height:'40px',
      backgroundColor: 'white',
      borderColor: 'black',
      borderRadius: '8px',
      paddingLeft: '10px',
      boxShadow: 'none',
      fontSize:'16px',
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
export const BranchBox = styled.div`
    width: 460px;
    height: 75px;
    background-color: #ECECEF;
    margin: 20px 0px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`