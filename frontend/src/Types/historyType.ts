export interface InitialDataType {
  id: string;
  name: string | null;
  owner: string;
  repo: string;
  content: string;
}

export interface CommitType {
  sha: string;
  message: string;
  writerId: string;
  writerImg: string;
  date: string;
  parent?: string;
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
