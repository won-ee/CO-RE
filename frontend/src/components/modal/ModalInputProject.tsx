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
import { useProjectStore, useUserStore } from "../../store/userStore";
import { useMutationGithubInfo, useMutationPatchUserInfo } from "../../hooks/useMutationCreatePR";
import LoadingPage from "../../pages/LoadingPage";
import NotFoundPage from "../../pages/NotFoundPage";
import { patchUserInfoType } from "../../Types/userType";
import { useNavigate } from "react-router-dom";

const ModalInputProject: React.FC = () => {
  const { mutate, isLoading, error } = useMutationGithubInfo();
  const { mutate: tokenMutation } = useMutationPatchUserInfo();
  const { selectedProjectId } = useProjectStore();
  const navigate = useNavigate();
  const [owner, setOwner] = useState("");
  const [project, setProject] = useState("");
  const [token, setToken] = useState("");

  const { userInfo } = useUserStore();

  if (isLoading) return <LoadingPage />;
  if (error) return <NotFoundPage errorNumber={404} />;

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwner(e.target.value);
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject(e.target.value);
  };

  const handleRegister = async () => {
    const params = {
      projectId: selectedProjectId,
      githubOwner: owner,
      githubRepository: project,
    };
  
    const userInfoParams = {
      nickName: userInfo?.userInfo.name ?? "",
      gitToken: token,
      userId: userInfo?.userInfo.id ?? 0,
    };
  
    tokenMutation(
      {
        userInfotData: userInfoParams as patchUserInfoType,
        userId: userInfoParams.userId,
      },
      {
        onSuccess: () => {
          console.log("GitHub 정보가 성공적으로 등록되었습니다!");
          
          mutate(
            {
              params: params,     
              projectId: params.projectId,  
            },
            {
              onSuccess: () => {
                console.log("성공적으로 GitHub 정보가 전송되었습니다!");
                navigate("/dashboard");

              },
              onError: (error) => {
                console.error("에러 발생:", error);
              },
            }
          );
        },
        onError: (error) => {
          console.error("토큰 등록 중 에러 발생:", error);
        },
      }
    );
  };
  

  return (
    <LoginBoxContainer>
      <Title>Project Input</Title>
      <FormBox>
        <UserBox>
          <Input
            type="text"
            value={token}
            onChange={handleTokenChange}
            required
          />
          <Label>GITHUB TOKEN</Label>
        </UserBox>
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
