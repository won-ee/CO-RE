import axios from 'axios';

const BASE_URL ='https://k11s106.p.ssafy.io/api'; 
const TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoxLCJleHAiOjE3MzE2ODE3MzEsImVtYWlsIjoiaGtrMzYyNkBuYXZlci5jb20ifQ.3FxW0IZs_DL2BHNHt6VcNPo10SWvGjo17orcOwTDkJCYKOSnQR5Fx4laldpHoxH3gCOYh8_aV-1uo8Htt0r3Eg'

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

