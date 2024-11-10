export interface HistoryParamsType {
  id: string;
}

export interface CommitType {
  sha: string;
  message: string;
  date: string;
  parent: string;
  secondParent?: string | null;
}

export interface PRDataType {
  prId: number;
  title: string;
  content: string;
  base: string;
  head: string;
  commits: CommitType[];
}

export type HistoryDataType = PRDataType[];

export interface GitGraphComponentProps {
  graphData: HistoryDataType;
}
