import React, { useState } from "react";
import {
  Input,
  LoginBoxContainer,
  Title,
  UserBox,
  Label,
  RegisterText,
  FormBox,
} from "./ModalInputProject.styled";
import { useProjectStore } from "../../store/userStore";
import { useMutationGithubInfo } from "../../hooks/useMutationCreatePR";
import LoadingPage from "../../pages/LoadingPage";
import NotFoundPage from "../../pages/NotFoundPage";

const ModalInputProject: React.FC = () => {
  const { mutate, isLoading,error } = useMutationGithubInfo();
  const [owner, setOwner] = useState("");
  const [project, setProject] = useState("");
  const { selectedProjectId } = useProjectStore()
  if (isLoading) return <LoadingPage />;
  if (error) return <NotFoundPage errorNumber={404}/>;

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwner(e.target.value);
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject(e.target.value);
  };


  const handleRegister = () => {
    const params = {
      projectId:selectedProjectId,
      githubOwner:owner, 
      githubRepo:project,
    };

    mutate(params, {
      onSuccess: () => {
        console.log("성공적으로 GitHub 정보가 전송되었습니다!");
      },
      onError: (error) => {
        console.error("에러 발생:", error);
      },
    });
  };

  return (
    <LoginBoxContainer>
      <Title>Project Input</Title>
      <FormBox>
        <UserBox>
          <Input
            type="text" 
            value={owner}
            onChange={handleOwnerChange}
            required
          />
          <Label>OWNER</Label>
        </UserBox>
        <UserBox>
          <Input
            type="text"
            value={project}
            onChange={handleProjectChange}
            required
          />
          <Label>PROJECT</Label>
        </UserBox>
        <RegisterText onClick={handleRegister}>REGISTER</RegisterText>
      </FormBox>
    </LoginBoxContainer>
  );
};

export default ModalInputProject;
