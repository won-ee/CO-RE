import axios from "axios";
import {
  StatsDataType,
  StatsParamsType,
  DashPRDataType,
  DashPRParamsType,
  DashIssueType,
  VersionDataType,
  VersionStatsDataType,
  DashVersionDataType,
} from "../Types/dashboardType";

const BASE_URL = "https://k11s106.p.ssafy.io/api";

export const getDashStatsData = async ({
  owner,
  repo,
}: StatsParamsType): Promise<StatsDataType> => {
  const response = await axios.get<StatsDataType>(
    `${BASE_URL}/github/stats/${owner}/${repo}`,
    {
      headers: {
        withCredentials: true,
      },
    },
  );
  console.log(response.data);
  return response.data;
};

export const getDashPRData = async ({
  owner,
  repo,
  state,
}: DashPRParamsType): Promise<DashPRDataType[]> => {
  try {
    const response = await axios.get<DashPRDataType[]>(
      `${BASE_URL}/github/pull-request/${owner}/${repo}?state=${state}`,
      {
        headers: {
          withCredentials: true,
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
          withCredentials: true,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Issue list:", error);
    throw error;
  }
};

export const getVersionData = async (id: string): Promise<VersionDataType> => {
  const { data } = await axios.get(`${BASE_URL}/github/version/note/${id}`, {
    headers: {
      withCredentials: true,
    },
  });
  return data;
};
export const getVersionListData = async ({
  owner,
  repo,
}: StatsParamsType): Promise<DashVersionDataType[]> => {
  const { data } = await axios.get(`${BASE_URL}/github/version/${owner}/${repo}`, {
    headers: {
      withCredentials: true,
    },
  });
  console.log(data);
  return data;
};

export const getEditVersion = async (
  id: string,
  updatedVersionData: Partial<VersionDataType>,
): Promise<VersionDataType> => {
  const response = await axios.patch(
    `${BASE_URL}/github/version/note/${id}`,
    updatedVersionData,
    {
      headers: {
        withCredentials: true,
      },
    },
  );

  return response.data;
};

export const getVersionStatsData = async (
  id: string,
): Promise<VersionStatsDataType> => {
  const response = await axios.get(`${BASE_URL}/github/stats/${id}`, {
    headers: {
      withCredentials: true,
    },
  });
  return response.data;
};
