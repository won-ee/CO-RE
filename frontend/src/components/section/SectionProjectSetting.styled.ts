import styled from "styled-components";

export const FormLayout = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

export const FormRow = styled.form`
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
`;

export const LabelBox = styled.div`
`
export const Label = styled.label`  
    margin-left: 30px;
    font-size: 14px;
    color: #232323;
`;

export const Input = styled.input`
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 385px;
    font-size: 14px;
    color: #718EBF;
    margin-left: 30px;

`;

export const TemplateInput = styled.textarea`
    margin-top: 10px;
    margin-left: 30px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 820px;
    font-size: 14px;
    color: #718EBF;
    &::placeholder{
        font-family: 'Pretendard';
        font-size: 14px;
        color: rgba(128,127,127,0.5);
    }
`;

export const SaveButton = styled.button`
    grid-column: span 2;
    margin-top: 50px;
    margin-left: 770px;
    width: 100px;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #4880FF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;