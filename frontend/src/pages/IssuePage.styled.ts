import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $isErrorInquirySelected: boolean; 
}

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $isIssueSelected: boolean; 
}

export const IssueLayout = styled.div`
  background-color:#F5F6FA ;
`;

export const FormContainerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;
  margin-top: 30px;
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
  margin-top: 56px;
  margin-right: 20px;
  margin-left: 50px;
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
  color:  ${({ $isErrorInquirySelected }) => ($isErrorInquirySelected ? 'white' : 'black')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  background-color: ${({ $isErrorInquirySelected }) => ($isErrorInquirySelected ? '#4880FF' : 'white')};
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
`;

export const TabBox  = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 gap: 13px;
 margin-top: 20px;
`

export const IssueListText = styled.span<TabProps>`
  margin-left: 50px;
  font-size: 20px;
  padding: 13px;
  color: ${({ $isIssueSelected }) => ($isIssueSelected ? '#343C6A' : '#B9B9B9')};
  border-bottom: ${({ $isIssueSelected }) => ($isIssueSelected ? 'solid 3px #343C6A' : '')};
  font-weight: ${(props) => (props.$isIssueSelected ? "bold" : "normal")}; 
  cursor: pointer;
`

export const ReassignedTasksText = styled.span<TabProps>`
  margin-left: 10px;
  font-size: 20px;
  padding: 13px;
  color: ${({ $isIssueSelected }) => ($isIssueSelected ? '#B9B9B9' : '#343C6A')};
  border-bottom: ${({ $isIssueSelected }) => ($isIssueSelected ? 'none' : 'solid 3px #343C6A')};
  font-weight: ${(props) => (props.$isIssueSelected ? "normal" : "bold")}; 
  cursor: pointer;
`