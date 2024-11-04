import styled from "styled-components";
import { SingleSelectType } from "../../Types/SelectType";

interface UrgentProps{
  isUrgent:boolean
}

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
      width:'fit-content',
      marginTop: '6px',
      minWidth:'300px',
      maxHeight:'35px',
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
      width:'auto',
      borderRadius: '5px',
      maxHeight:'150px',
      overflow:'auto'
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

export const DateInputContainer  = styled.div`
  font-family: 'Pretendard';
  margin-top: 6px;
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #807F7F;
  background-color: white;
  cursor: pointer;
  width: 300px;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  height: 39px;
  justify-content: start;
  align-items: center;
  gap: 20px;
`;

export const DatePickerImg = styled.img`
  width: 20px;
  height: 20px;
`

export const DeadLineBox = styled.div`
  display: flex;;
  gap: 66px;
  margin-top: 20px;
`
export const DatePickerBox = styled.div`
  display: flex;
  flex-direction: column;
`
export const UrgentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`
export const UrgentButton = styled.div<UrgentProps>`
  width: 110px;
  height: 30px;
  background-color: ${(props) => (props.isUrgent ? '#FF6767' : '#7667FF')};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`
export const PriorityBox : SingleSelectType = {
  control: (provided) => ({
    ...provided,
    width:'fit-content',
    marginTop: '6px',
    minWidth:'300px',
    maxHeight:'35px',
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
    width:'auto',
    borderRadius: '5px',
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

export const CreateButtonBox = styled.div`
  margin-top: 25px;
  margin-bottom: 100px;
`