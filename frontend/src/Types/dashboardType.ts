export interface StatsDataType {
  totalCommit: number;
  totalPullRequest: number;
  totalReview: number;
  totalHotfix: number;
  weeklyCommit: number;
  weeklyPullRequest: number;
  weeklyReview: number;
  weeklyHotfix: number;
}

export interface DashPRParamsType {
  owner: string | null;
  repo: string | null;
  state: string | null;
}
export interface Reviewer {
  writerId: string;
  writerImg: string;
}

export interface Writer {
  writerId: string;
  writerImg: string;
}

export interface DashPRDataType {
  pullRequestId: number;
  title: string;
  writer: Writer;
  head: string;
  base: string;
  status: string | null;
  priority: number;
  afterReview: boolean;
  deadline: string;
  reviewers: Reviewer[];
  commentCount: number;
}
