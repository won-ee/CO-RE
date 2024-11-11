import axios from "axios";
import { InitialDataType, HistoryDataType } from "../Types/historyType";

const BASE_URL = "http://54.180.83.239:8080";

export const fetchRepos = async (): Promise<InitialDataType[]> => {
  const { data } = await axios.get(`${BASE_URL}/version/JEM1224/github-api`);
  return data;
};

export const fetchGraphDataById = async (
  id: string,
): Promise<HistoryDataType> => {
  const { data } = await axios.get(`${BASE_URL}/version/${id}`);
  return data;
};
