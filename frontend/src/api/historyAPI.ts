import axios from "axios";
import { InitialDataType, HistoryDataType } from "../Types/historyType";

const BASE_URL = "http://54.180.83.239:8080";
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoxLCJleHAiOjE3MzE5ODczNDQsImVtYWlsIjoiaGtrMzYyNkBuYXZlci5jb20ifQ.Ud0t67fGyyhUgXMROWJ9rK9iY2MO3Vs8yO1G-2j5TtyRXYjgJPa3gWNV76CTFdzzMyD-mdnx6LboFwpULH2U1Q";

export const fetchRepos = async (): Promise<InitialDataType[]> => {
  const { data } = await axios.get(`${BASE_URL}/version/JEM1224/github-api`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
};

export const fetchGraphDataById = async (
  id: string,
): Promise<HistoryDataType> => {
  const { data } = await axios.get(`${BASE_URL}/version/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
};
