import axios from "axios";
import {
  //   StatsDataType,
  DashPRDataType,
  DashPRParamsType,
} from "../Types/dashboardType";

const BASE_URL = "http://54.180.83.239:8080";

// export const getDashStatsData = async (): Promise<StatsDataType> => {
//   const response = await axios.get<StatsDataType>(
//     `${BASE_URL}/status/owner/repo`,
//     // `${BASE_URL}/status/JEM1224/github-api`
//   );
//   return response.data;
// };

export const getDashPRData = async ({
  owner,
  repo,
  state,
}: DashPRParamsType): Promise<DashPRDataType[]> => {
  const response = await axios.get<DashPRDataType[]>(
    `${BASE_URL}/pull-request/${owner}/${repo}?state=${state}`,
  );
  return response.data;
};
