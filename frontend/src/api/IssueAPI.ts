import axios from 'axios';


const BASE_URL ='https://k11s106.p.ssafy.io/api'; 
const TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoxLCJleHAiOjE3MzE3ODAwMTksImVtYWlsIjoiaGtrMzYyNkBuYXZlci5jb20ifQ.ifGnDqIPFQ3F43841OrCAaXdIzjwEgPONNlcu3IV30Enj6FH-1aQzSjF7DqDsyI5F4doXo0kMhLJ_ySqDyvhYg'

export const getIssueList = async (projectUserId:number) => {    
    const response = await axios.get(
      `${BASE_URL}/issue/search/list/${projectUserId}`,{
        headers: {
          // withCredentials: true,
          Authorization: `Bearer ${TOKEN}`
        }
      },
    );      
    return response.data;
  };
  
  export const getEpicList = async (projectId:number) => {    
    const response = await axios.get(
      
      `${BASE_URL}/project/search/epic-list/${projectId}`,{
        headers: {
          // withCredentials: true,
          Authorization: `Bearer ${TOKEN}`
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
          Authorization: `Bearer ${TOKEN}`,
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
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );  
    return response.data;
  };
  