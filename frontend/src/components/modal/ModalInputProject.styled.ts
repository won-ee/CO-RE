import styled from 'styled-components';

export const LoginBoxContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
`;

export const Title = styled.h2`
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
`;

export const UserBox = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
  ${Input}:focus ~ &,
  ${Input}:valid ~ & {
    top: -20px;
    left: 0;
    color: #4880FF;
    font-size: 12px;
  }
`;

export const RegisterText = styled.div`
  color: white;
  font-size: 16px;
  overflow: hidden;
  transition: 0.5s;
  padding: 10px;
  border-radius: 5px;
  border: white solid 1px;
  &:hover {
    color: #4880FF;
    border: #4880FF solid 1px;
  }
`;