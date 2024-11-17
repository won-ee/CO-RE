import axios from "axios";
import { InitialDataType, HistoryDataType } from "../Types/historyType";

const BASE_URL = "https://k11s106.p.ssafy.io/api";

export const fetchRepos = async (
  owner: string,
  repo: string,
): Promise<InitialDataType[]> => {
  const { data } = await axios.get(
    `${BASE_URL}/github/version/${owner}/${repo}`,
    {
      headers: {
        withCredentials: true,
      },
    },
  );
  return data;
};

export const fetchGraphDataById = async (
  id: string,
): Promise<HistoryDataType> => {
  const { data } = await axios.get(`${BASE_URL}/github/version/${id}`, {
    headers: {
      withCredentials: true,
    },
  });
  return data;
};
