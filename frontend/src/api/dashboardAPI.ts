import axios from "axios";
import {
  StatsDataType,
  StatsParamsType,
  DashPRDataType,
  DashPRParamsType,
  DashIssueType,
  VersionDataType,
  VersionStatsDataType,
} from "../Types/dashboardType";

const BASE_URL = "http://54.180.83.239:8080";
// const BASE_URL = "https://k11s106.p.ssafy.io/api";
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoxLCJleHAiOjE3MzE4NTU5ODgsImVtYWlsIjoiaGtrMzYyNkBuYXZlci5jb20ifQ.pkoSBuFD1R9Lg5QdvhKjHhKIwHxO_a74V1N-u0WRKH2Z0OGU0XSulLAJ28O_kwTYQgom0oPO1h_uDaJbB-9_Gw";

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

export const getVersionData = async (id: string): Promise<VersionDataType> => {
  const { data } = await axios.get(`${BASE_URL}/version/note/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
};

export const getEditVersion = async (
  id: string,
  updatedVersionData: Partial<VersionDataType>,
): Promise<VersionDataType> => {
  const defaultData: VersionDataType = {
    name: "",
    content: "",
    mixingKneading: false,
    assembly: false,
    chemicalProcessing: false,
    modulePack: false,
    ess: false,
    ulsan: false,
    hungary1: false,
    hungary2: false,
    xian: false,
    spe: false,
    cheonan: false,
  };
  const requestData: VersionDataType = {
    ...defaultData,
    ...updatedVersionData,
  };
  const { data } = await axios.patch(
    `${BASE_URL}/version/note/${id}`,
    requestData,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );

  return data;
};

export const getVersionStatsData = async (
  id: string,
): Promise<VersionStatsDataType[]> => {
  const response = await axios.get(`${BASE_URL}/status/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};
