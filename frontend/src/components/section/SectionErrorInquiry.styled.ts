import styled from "styled-components";

export const RightSection = styled.div`
  flex: 2;
  margin-left: 50px;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  color: red;
  font-size: 22px;
  margin-bottom: 20px;
`;

export const ErrorIcon = styled.div`
  font-size: 24px;
  margin-right: 10px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 14px;
`;

export const SelectInput = styled.select`
  width: 250px;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 12px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TextInput = styled.textarea`
  width: 550px;
  padding: 10px;
  font-size: 162x;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: vertical;
  box-sizing: border-box;
`;

export const SubmitButton = styled(Button)`
  width: auto;
  padding: 10px 20px;
`;  