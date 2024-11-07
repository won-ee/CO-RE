import axios from 'axios';
import { PullRequestData, PullRequestParams } from '../Types/pullRequestType';

const BASE_URL = 'http://54.180.83.239:8080'; 

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