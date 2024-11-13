import { useQuery } from "react-query";
// import { getDashStatsData, getDashPRData } from "../api/dashboardAPI";
import { getDashPRData } from "../api/dashboardAPI";
import {
  //   StatsDataType,
  DashPRDataType,
  DashPRParamsType,
} from "../Types/dashboardType";

// export const useDashboard = () => {
//   return useQuery<StatsDataType, Error>("dashboardData", getDashStatsData, {
//     staleTime: 1000 * 60 * 5,
//   });
// };

export const useDashPR = (params: DashPRParamsType) => {
  return useQuery<DashPRDataType[], Error>(
    ["dashPRData", params],
    () => getDashPRData(params),
    {
      enabled: !!params?.owner && !!params?.repo && !!params?.state,
      staleTime: 1000 * 60 * 5,
    },
  );
};
