import axios from 'axios';
import { ProjectSettingType, githubInfoType, patchUserInfoType } from '../Types/userType';

const BASE_URL ='https://k11s106.p.ssafy.io/api'; 
const TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjozLCJleHAiOjE3MzIwMzkzMTYsImVtYWlsIjoiYnVzbGF1dEBuYXZlci5jb20ifQ.hT5aSns2FbztvD352HBqQxlLcDbqbPLutorPWpAvRvJFLwJ4xP5cqZUfKUPUfSXSTbk0jz-A29yT-9nvoeQyfw'

export const getUserInfo = async () => {
  const response = await axios.get(
    `${BASE_URL}/users/user-info`,{
      headers: {
        // withCredentials: true,
        Authorization: `Bearer ${TOKEN}`
      }
    },
  );  
  
  return response.data;
};

export const getMemberList = async (selectedProjectId:number) => {
  const response = await axios.get(
    `${BASE_URL}/project-users/search/list/${selectedProjectId}`,{
      headers: {
        // withCredentials: true,
        Authorization: `Bearer ${TOKEN}`
      }
    },
  );  
  
  return response.data;
};

export const getProjectData = async (selectedProjectId:number) => {
  const response = await axios.get(
    `${BASE_URL}/project/search/set/${selectedProjectId}`,{
      headers: {
        // withCredentials: true,
        Authorization: `Bearer ${TOKEN}`
      }
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
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );  
  return response.data;
};

export const patchProjectSetting = async (
  selectedProjectId: number,
  projectData: ProjectSettingType
) => {  
  const response = await axios.patch(
    `${BASE_URL}/project/update/set/${selectedProjectId}`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );  
  return response.data;
};


export const postGithubInfo = async (
  githubInfo:githubInfoType
) => {
  
  const response = await axios.post(
    `${BASE_URL}/project/update/set/github`,
    githubInfo,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );  
  return response.data;
};

