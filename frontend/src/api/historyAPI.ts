import axios from "axios";
import { HistoryParamsType, HistoryDataType } from "../Types/historyType";

const BASE_URL = "http://54.180.83.239:8080";

export const getHistoryData = async ({
  id,
}: HistoryParamsType): Promise<HistoryDataType> => {
  const response = await axios.get<HistoryDataType>(`${BASE_URL}/2/${id}`);
  return response.data;
};
