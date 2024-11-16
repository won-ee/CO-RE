export interface StatsDataType {
  totalCommit: number;
  currentWeekCommit: number;
  lastWeekCommit: number;
  commitGrowthRate: number;

  totalPullRequest: number;
  currentWeekPullRequest: number;
  lastWeekPullRequest: number;
  pullRequestGrowthRate: number;

  totalReview: number;
  currentWeekReview: number;
  lastWeekReview: number;
  reviewGrowthRate: number;

  totalHotfix: number;
  currentWeekHotfix: number;
  lastWeekHotfix: number;
  hotfixGrowthRate: number;
}

export interface StatsParamsType {
  owner: string | null;
  repo: string | null;
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

export interface DashIssueType {
  issueId: number;
  issueTitle: string;
  issueContent: string;
  issueKey: string;
  issuePriority: number;
  issueDeadLine: string | null;
  issueStatus: "TODO" | "IN_PROGRESS" | "DONE";
  managerUserId: number;
  managerUserImage: string;
  managerUserName: string;
}
