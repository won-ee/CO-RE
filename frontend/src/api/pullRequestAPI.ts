import axios from 'axios';
import { PRDataType, CalendarPRParamsType, PRDetailParamsType, CreatePRType, PRCreateReviewParamsType } from '../Types/pullRequestType';

const BASE_URL ='http://54.180.83.239:8080'; 

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
}: PRDetailParamsType): Promise<PRDataType> => {
  const response = await axios.get<PRDataType>(
    `${BASE_URL}/pull-request/${owner}/${repo}/${pullId}`,
  );
  return response.data;
};


export const postCreatePRReview = async ({
  owner,
  repo,
  pullId,
  comment
}: PRCreateReviewParamsType) => {
  const { data } = await axios.post(
    `${BASE_URL}/review/${owner}/${repo}/${pullId}/comment`,
    {
      body: comment
    }
  );
  return data;
};
