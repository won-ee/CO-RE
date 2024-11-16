import { useQuery } from "react-query";
import {
  getDashStatsData,
  getDashPRData,
  getDashIssueData,
} from "../api/dashboardAPI";
import {
  StatsDataType,
  StatsParamsType,
  DashPRDataType,
  DashPRParamsType,
  DashIssueType,
} from "../Types/dashboardType";

export const useDashboard = (params: StatsParamsType) => {
  return useQuery<StatsDataType, Error>(
    ["dashboardData", params],
    () => getDashStatsData(params),
    {
      enabled: !!params?.owner && !!params?.repo,
      staleTime: 1000 * 60 * 5,
    },
  );
};

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

export const useDashIssue = (selectedProjectUserId: number) => {
  return useQuery<DashIssueType[], Error>(
    ["dashIssueData", selectedProjectUserId],
    () => getDashIssueData(selectedProjectUserId),
    {
      enabled: !!selectedProjectUserId,
      staleTime: 1000 * 60 * 5,
    },
  );
};
