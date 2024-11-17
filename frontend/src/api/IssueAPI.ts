import axios from "axios";

const BASE_URL ='https://k11s106.p.ssafy.io/api'; 

export const getIssueList = async (projectUserId:number) => {    
    const response = await axios.get(
      `${BASE_URL}/issue/search/list/${projectUserId}`,{
        headers: {
          withCredentials: true,
        }
      },
    );      
    return response.data;
  };

  export const getIssueLocationList = async (projectUserId:number) => {    
    const response = await axios.get(
      `${BASE_URL}/carrot/search/choice-list/${projectUserId}`,{
        headers: {
          withCredentials: true,
        }
      },
    );      
    return response.data;
  };

export const getIssueLocation = async (projectUserId:number) => {    
  const response = await axios.get(
    `${BASE_URL}/carrot/search/list/${projectUserId}`,{
      headers: {
        withCredentials: true,
      }
    },
  );   
  return response.data;
};

export const postAcceptIssueLocation = async (projectUserId:number,carrotId:number) => {    
  const response = await axios.get(
    `${BASE_URL}/carrot/accept/${projectUserId}?carrotId=${carrotId}`,{
      headers: {
        withCredentials: true,
      }
    },
  );   
  return response.data;
};

export const postIssueLocation = async (projectUserId:number,issueId:number) => {    
  const response = await axios.get(
    `${BASE_URL}/carrot/create/${projectUserId}?issueId=${issueId}`,{
      headers: {
        withCredentials: true,
      }
    },
  );   
  return response.data;
};

export const getEpicList = async (projectId:number) => {    
  const response = await axios.get(
    
    `${BASE_URL}/project/search/epic-list/${projectId}`,{
      headers: {
        withCredentials: true,
      }
    },
  );          
  return response.data;
};

export const postEpic = async (projectUserId:number,deadline:string,Priority:string) => {
  
  const response = await axios.post(
    `${BASE_URL} /issue/create/no-epic/${projectUserId}?deadline=${deadline}`,
    Priority,
    {
      headers: {
        withCredentials: true,
      },
    }
  );  
  return response.data;
};

export const postNoEpic = async (projectUserId:number,deadline:string,Priority:string) => {
  
  const response = await axios.post(
    `${BASE_URL}/issue/create/epic/${projectUserId}?deadline=${deadline}`,
    Priority,
    {
      headers: {
        withCredentials: true,
      },
    }
  );  
  return response.data;
};
