import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getDashStatsData,
  getDashPRData,
  getDashIssueData,
  getVersionData,
  getEditVersion,
  getVersionStatsData,
} from "../api/dashboardAPI";
import {
  StatsDataType,
  StatsParamsType,
  DashPRDataType,
  DashPRParamsType,
  DashIssueType,
  VersionDataType,
  VersionStatsDataType,
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

export const useVersionNote = (selectedRepoId: string | null) => {
  return useQuery<VersionDataType>(
    ["versionData", selectedRepoId],
    () => getVersionData(selectedRepoId!),
    { enabled: !!selectedRepoId, staleTime: 1000 * 60 * 5 },
  );
};

export const useEditVersion = (selectedRepoId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedVersionData: Partial<VersionDataType>) => {
      if (!selectedRepoId) {
        throw new Error("selectedRepoId is null");
      }
      return getEditVersion(selectedRepoId, updatedVersionData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["versionData", selectedRepoId]);
      },
      onError: (error) => {
        console.error("Error updating version:", error);
      },
    },
  );
};

export const useVersionStats = (selectedRepoId: string | null) => {
  return useQuery<VersionStatsDataType[]>(
    ["versionStatsData", selectedRepoId],
    () => getVersionStatsData(selectedRepoId!),
    { enabled: !!selectedRepoId, staleTime: 1000 * 60 * 5 },
  );
};
