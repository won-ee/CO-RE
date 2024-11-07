import axios from 'axios';

const BASE_URL = 'https://16e2-121-178-98-53.ngrok-free.app'; 

export const userLogin = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/login/jira`);
    console.log(response.data);  // 응답 데이터를 확인
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error(`API 요청 실패: ${error.response?.data || error.message}`);
    } else {
      console.error('Unknown Error:', error);
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};
