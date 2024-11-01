import styled from "styled-components";

export const ContainerLayout = styled.div`
    display: flex;
    flex-direction: row;
`

export const ImgBox = styled.div`
    position: relative;
`

export const ProfileImg = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin-left: 20px;
`
export const EditImg = styled.img`
    position: absolute;
    width: 30px;
    height: 30px;
    top: 85px;
    right: -5px;
    cursor: pointer;
`

export const FormBox = styled.div`
    margin-left: 50px;
`

export const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
`;

export const FormLow = styled.form`
    display: flex;
    flex-direction: row;
`;

export const FormLeft= styled.form`

`;

export const FormRight= styled.form`
     margin-left: 20px; 
`;

export const LabelBox = styled.div`
    margin-top: 10px;
`

export const Label = styled.label`
    font-size: 14px;
    color: #232323;
`;

export const Input = styled.input`
    width: 300px;
    height: 25px;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    color: #718EBF;
`;

export const GitTokenBox = styled.div`
    grid-column: span 2;
    display: flex;
    flex-direction: column;
`;

export const GitTokenInput = styled.input`
    width: 645px;
    height: 25px;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    color: #718EBF;
`;

export const SaveButton = styled.button`
    grid-column: span 2;
    margin-top: 50px;
    margin-left: 565px;
    width: 100px;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #4880FF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;