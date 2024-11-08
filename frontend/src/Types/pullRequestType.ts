  export interface ReviewerType {
    id: number;
    reviewerId: string;
    score: number;
  }
  
  export interface CommitType {
    id: number;
    message: string;
    author: string;
    timestamp: string;
  }
export interface ChangeType {
  file: {
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    patch: string;
  };
  content: string;
}
export interface CreatePRType{
  title: string,
  body: string,
  base: string,
  head: string,
  owner: string,
  repo: string,
  description: string,
  afterReview: boolean,
  deadline: string,
  priority: number,
  writerId: string
}

export interface CalendarPRParamsType {
  owner: string;
  repo: string;
  writer: string;
  month: number;
  year: number;
}

export interface PRDataType {
  id: number;
  title: string;
  pullRequestId: number;
  writerId: string;
  writerImg:string
  summary: string;
  head: string;
  base: string;
  mergeStatus: boolean;
  priority: number;
  afterReview: boolean;
  deadline: string;
  createdDate: string;
  commits: CommitType[];
  reviewers: ReviewerType[];
}

export interface PRDegailParamsType {
  owner: string;
  repo: string;
  pullId: number;

}
export interface ReviewType{
  path: string,
  startLine: number,
  endLine: number,
  commitId: string,
  body: string//내용
}
export interface TotalReviewsType{
    commit_id: string,
    body: string,
    event: string,
    comments: ReviewType[]
}