import axios from 'axios';

const BASE_URL ='https://k11s106.p.ssafy.io/api'; 
const TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoxLCJleHAiOjE3MzE3ODAwMTksImVtYWlsIjoiaGtrMzYyNkBuYXZlci5jb20ifQ.ifGnDqIPFQ3F43841OrCAaXdIzjwEgPONNlcu3IV30Enj6FH-1aQzSjF7DqDsyI5F4doXo0kMhLJ_ySqDyvhYg'

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

