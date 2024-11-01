import styled from "styled-components";
import { SingleSelectType } from "../../Types/SelectType";

export const SectionCreateBranchLayout = styled.div`
    margin: 10px 0px;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size: 16px;
`
export const MergeDirectionBox = styled.div`
    display: flex;
    font-weight: normal;
    margin-bottom: 20px;
    justify-content: start;
    align-items: center;
    gap: 5px;
`
export const HighLightBox = styled.div`
    background-color: #B4AEAE;
    padding: 3px 6px;
    border-radius: 5px;
`
export const TitleInput = styled.input`
    margin-top: 6px;
    margin-bottom: 25px;
    padding: 8px 20px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #807F7F;
    &::placeholder {
    color: gray;
    font-size: 14px;
    opacity: 1;
  }
`
export const DescriptionTextArea = styled.textarea`
    font-family: 'Pretendard';
    margin-top: 6px;
    margin-bottom: 25px;
    padding: 8px 20px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #807F7F;
    resize: none;
    height: 400px;
    &::placeholder {
    color: gray;
    font-size: 14px;
    opacity: 1;
    }
`
export const SelectBox: SingleSelectType = {
    control: (provided) => ({
      ...provided,
      marginTop: '6px',
      width:'300px',
      height:'35px',
      backgroundColor: 'white',
      border: '1px solid #807F7F',
      borderRadius: '5px',
      paddingLeft: '8px',
      boxShadow: 'none',
      fontSize:'16px',
      fontWeight:'normal',
      '&:hover': {
        borderColor: 'black',  // 마우스를 올렸을 때 테두리 색상 유지
      },
    }),
    menu: (provided) => ({
      ...provided,
      width:'300px',
      borderRadius: '5px',
      marginTop: '5px',
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize:'14px',
      fontWeight:'normal',
      backgroundColor: state.isSelected ? 'lightgreen' : 'white',
      '&:hover': {
        backgroundColor: 'lightgray',
      },
      padding: '10px 20px',
    }),
  };