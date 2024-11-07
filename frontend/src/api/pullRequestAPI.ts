import axios from 'axios';
import { PullRequestData, PullRequestParams, CreatePRType } from '../Types/pullRequestType';

const BASE_URL = process.env.REACT_APP_API_BASE_URL; 

export const fetchPullRequest = async ({
    owner,
    repo,
    writer,
    month,
    year,
  }: PullRequestParams): Promise<PullRequestData[]> => {
    const response = await axios.get<PullRequestData[]>(
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
};