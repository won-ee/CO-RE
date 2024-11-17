import { useState } from "react";
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
  } = useQuery<HistoryDataType>(
    ["graphData", selectedRepoId],
    () => fetchGraphDataById(selectedRepoId!),
    { enabled: !!selectedRepoId },
  );

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
