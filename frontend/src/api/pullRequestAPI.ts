import axios from 'axios';
import { PRDataType, CalendarPRParamsType, PRDegailParamsType } from '../Types/pullRequestType';

const BASE_URL = 'http://54.180.83.239:8080'; 

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