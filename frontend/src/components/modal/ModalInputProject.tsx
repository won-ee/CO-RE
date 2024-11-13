import React from 'react';
import { Input, LoginBoxContainer, Title, UserBox, Label, RegisterText, FormBox  } from './ModalInputProject.styled';


const ModalInputProject: React.FC = () => {
  return (
    <LoginBoxContainer>
      <Title>Project Input</Title>
      <FormBox>
        <UserBox>
          <Input type="OWNER" required />
          <Label>OWNER</Label>
        </UserBox>
        <UserBox>
          <Input type="PROJECT" required />
          <Label>PROJECT</Label>
        </UserBox>
        <RegisterText>REGISTER</RegisterText>
      </FormBox>
    </LoginBoxContainer>
  );
};

export default ModalInputProject;