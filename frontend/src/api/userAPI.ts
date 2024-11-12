import axios from 'axios';

const BASE_URL ='http://54.180.83.239:8080'; 

export const getUserInfo = async () => {
  const response = await axios.get(
    `${BASE_URL}/users/user-info`,{
      headers: {
        withCredentials: true,
      }
    },
  );  
  return response.data;
};

