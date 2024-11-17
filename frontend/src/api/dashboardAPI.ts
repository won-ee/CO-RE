import axios from "axios";
import {
  StatsDataType,
  StatsParamsType,
  DashPRDataType,
  DashPRParamsType,
  DashIssueType,
} from "../Types/dashboardType";

const BASE_URL = "http://54.180.83.239:8080";
// const BASE_URL = "https://k11s106.p.ssafy.io/api";
const TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoxLCJleHAiOjE3MzE5ODczNDQsImVtYWlsIjoiaGtrMzYyNkBuYXZlci5jb20ifQ.Ud0t67fGyyhUgXMROWJ9rK9iY2MO3Vs8yO1G-2j5TtyRXYjgJPa3gWNV76CTFdzzMyD-mdnx6LboFwpULH2U1Q'

export const getDashStatsData = async ({
  owner,
  repo,
}: StatsParamsType): Promise<StatsDataType> => {
  const response = await axios.get<StatsDataType>(
    `${BASE_URL}/stats/${owner}/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );
  return response.data;
};

export const getDashPRData = async ({
  owner,
  repo,
  state,
}: DashPRParamsType): Promise<DashPRDataType[]> => {
  try {
    const response = await axios.get<DashPRDataType[]>(
      `${BASE_URL}/pull-request/${owner}/${repo}?state=${state}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching PR list:", error);
    throw error;
  }
};
export const getDashIssueData = async (
  projectUserId: number,
): Promise<DashIssueType[]> => {
  try {
    const response = await axios.get<DashIssueType[]>(
      `${BASE_URL}/issue/search/list/${projectUserId}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Issue list:", error);
    throw error;
  }
};
