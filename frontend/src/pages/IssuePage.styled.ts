import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $isErrorInquirySelected: boolean; 
}

export const FormContainerLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;
  margin-top: 30px;
  background-color: #f9f9f9;
`;

export const FormWrapperBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1100px;
  width: 100%;
  max-height: 300px;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

export const LeftSectionBox = styled.div`
  flex: 1;
  margin-top: 50px;
  margin-right: 20px;
  margin-left: 100px;
`;

export const ErrorInquiryButton = styled.button<ButtonProps>`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  color: ${({ $isErrorInquirySelected }) => ($isErrorInquirySelected ? 'white' : 'black')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  background-color: ${({ $isErrorInquirySelected }) => ($isErrorInquirySelected ? '#4880FF' : 'white')};
`;

export const RelocationButton = styled.button<ButtonProps>`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  color:  ${({ $isErrorInquirySelected }) => ($isErrorInquirySelected ? 'black' : 'white')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  background-color: ${({ $isErrorInquirySelected }) => ($isErrorInquirySelected ? 'white' : '#4880FF')};
`;

export const SelectInput = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const DividerLine = styled.div`
  width: 0.3px; 
  height: 300px; 
  background-color: gray;
  padding: 0.3px;
  margin-left: 50px;
`;

export const IssueContainerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;
  margin-top: 30px;
  background-color: #f9f9f9;
`;
