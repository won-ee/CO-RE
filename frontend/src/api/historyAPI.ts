import axios from "axios";
import { InitialDataType, HistoryDataType } from "../Types/historyType";

const BASE_URL = "http://54.180.83.239:8080";
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoxLCJleHAiOjE3MzE4NTU5ODgsImVtYWlsIjoiaGtrMzYyNkBuYXZlci5jb20ifQ.pkoSBuFD1R9Lg5QdvhKjHhKIwHxO_a74V1N-u0WRKH2Z0OGU0XSulLAJ28O_kwTYQgom0oPO1h_uDaJbB-9_Gw";

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
