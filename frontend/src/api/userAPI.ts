import axios from "axios";
import {
  ProjectSettingType,
  githubInfoType,
  patchUserInfoType,
} from "../Types/userType";

const BASE_URL ='https://k11s106.p.ssafy.io/api'; 

export const getUserInfo = async () => {
  const response = await axios.get(`${BASE_URL}/users/user-info`, {
    headers: {
      withCredentials: true,
    },
  });

  return response.data;
};

export const getMemberList = async (selectedProjectId: number) => {
  const response = await axios.get(
    `${BASE_URL}/project-users/search/list/${selectedProjectId}`,
    {
      headers: {
        withCredentials: true,
      },
    },
  );

  return response.data;
};

export const getProjectData = async (selectedProjectId: number) => {
  const response = await axios.get(
    `${BASE_URL}/project/search/set/${selectedProjectId}`,
    {
      headers: {
        withCredentials: true,
      },
    },
  );

  return response.data;
};

export const patchUserInfo = async (userInfotData: patchUserInfoType) => {
  const response = await axios.patch(
    `${BASE_URL}/users/update/my-info`,
    userInfotData,
    {
      headers: {
        withCredentials: true,
      },
    },
  );
  return response.data;
};

export const patchProjectSetting = async (
  selectedProjectId: number,
  projectData: ProjectSettingType,
) => {
  const response = await axios.patch(
    `${BASE_URL}/project/update/set/${selectedProjectId}`,
    projectData,
    {
      headers: {
        withCredentials: true,
      },
    },
  );
  return response.data;
};

export const postGithubInfo = async (githubInfo: githubInfoType) => {
  const response = await axios.post(
    `${BASE_URL}/project/update/set/github`,
    githubInfo,
    {
      headers: {
        withCredentials: true,
      },
    },
  );
  return response.data;
};

export const getAllProject = async (projectUserId:number) => {
  const response = await axios.get(
    `${BASE_URL}/group/search/project-list/${projectUserId}`,{
      headers: {
        withCredentials: true,
      }
    },
  );  
  
  return response.data;
};
