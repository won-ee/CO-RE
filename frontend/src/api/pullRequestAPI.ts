import axios from 'axios';
import { PRDataType, CalendarPRParamsType, PRDegailParamsType } from '../Types/pullRequestType';

const BASE_URL = process.env.REACT_APP_API_BASE_URL; 

export const getCalendarPR = async ({
    owner,
    repo,
    writer,
    month,
    year,
  }: CalendarPRParamsType): Promise<PRDataType[]> => {
    const response = await axios.get<PRDataType[]>(
      `${BASE_URL}/pull-request/${owner}/${repo}/user`,
      {
        params: {
            writer,
            month,
            year,
        },
      }
    );
    return response.data;
  };

export const postCreatePR =async (PRData:CreatePRType)=>{
  const { data } = await axios.post(`${BASE_URL}/pull-request`,PRData,{
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
}
export const getPRDetail = async ({
  owner,
  repo,
  pullId
}: PRDegailParamsType): Promise<PRDataType> => {
  const response = await axios.get<PRDataType>(
    `${BASE_URL}/pull-request/${owner}/${repo}/${pullId}`,
  );
  return response.data;
};