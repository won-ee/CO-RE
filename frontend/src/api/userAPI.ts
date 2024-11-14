import axios from 'axios';

const BASE_URL ='https://k11s106.p.ssafy.io/api'; 
const TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoxLCJleHAiOjE3MzE3NjcyMzMsImVtYWlsIjoiaGtrMzYyNkBuYXZlci5jb20ifQ.gU8GHjNf53K2gATceT67qRTambUe2F68LeCOteluUctx32OYVQUhZZ_ezmwYUcXV85UDl6cWgZkR8PV24pu9Mw'

export const getUserInfo = async () => {
  const response = await axios.get(
    `${BASE_URL}/users/user-info`,{
      headers: {
        // withCredentials: true,
        Authorization: `Bearer ${TOKEN}`
      }
    },
  );  
  console.log(response.data);
  
  return response.data;
};

