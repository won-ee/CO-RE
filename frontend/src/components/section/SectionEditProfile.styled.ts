import styled from "styled-components";

export const ContainerLayout = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ImgBox = styled.div`
    position: relative;
    margin-left: 60px;
`;

export const ProfileImg = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin-left: 20px;
`;

export const EditImg = styled.img`
    position: absolute;
    width: 30px;
    height: 30px;
    top: 85px;
    right: -5px;
    cursor: pointer;
`;

export const FormBox = styled.div`
    margin-left: 50px;
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FormLow = styled.div`
    display: flex;
    flex-direction: row;
`;

export const FormLeft = styled.div` 
`;

export const FormRight = styled.div` 
    margin-left: 20px;
`;

export const LabelBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

export const Label = styled.label`
    font-size: 14px;
    color: #232323;
`;

export const ProfileBox = styled.div`
    width: 300px;
    height: 25px;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    color: #718EBF;
`;

export const NickNameInput = styled.input`
    width: 300px;
    height: 25px;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    color: gray;
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
    color: grey;
`;

export const SaveButton = styled.div`
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
    
    display: flex;
    justify-content: center;
    align-items: center;
`;
