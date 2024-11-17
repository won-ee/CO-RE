import axios from "axios";
import { InitialDataType, HistoryDataType } from "../Types/historyType";

const BASE_URL = "https://k11s106.p.ssafy.io/api";

export const fetchRepos = async (): Promise<InitialDataType[]> => {
  const { data } = await axios.get(`${BASE_URL}/github/version/JEM1224/github-api`, {
    headers: {
      withCredentials: true,
    },
  });
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
