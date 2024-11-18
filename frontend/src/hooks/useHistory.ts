import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchRepos, fetchGraphDataById } from "../api/historyAPI";
import { InitialDataType, HistoryDataType } from "../Types/historyType";

export const useHistoryData = (owner: string, repo: string) => {
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null);

  const { data: repos, isLoading: isLoadingRepos } = useQuery<
    InitialDataType[]
  >(["repos", owner, repo], () => fetchRepos(owner, repo));

  const {
    data: graphData,
    isLoading: isLoadingGraph,
    error: graphError,
    refetch: refetchGraphData,
  } = useQuery<HistoryDataType>(
    ["graphData", selectedRepoId],
    () => fetchGraphDataById(selectedRepoId!),
    { enabled: !!selectedRepoId },
  );

  useEffect(() => {
    if (selectedRepoId) {
      refetchGraphData();
    }
  }, [selectedRepoId, refetchGraphData]);

  return {
    repos,
    isLoadingRepos,
    selectedRepoId,
    setSelectedRepoId,
    graphData,
    isLoadingGraph,
    graphError,
  };
};
