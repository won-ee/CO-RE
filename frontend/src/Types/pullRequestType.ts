export interface PullRequestParams {
    owner: string;
    repo: string;
    writer: string;
    month: number;
    year: number;
  }
  
  export interface Reviewer {
    id: number;
    reviewerId: string;
    score: number;
  }
  
  export interface Commit {
    id: number;
    message: string;
    author: string;
    timestamp: string;
  }
  
  export interface PullRequestData {
    id: number;
    title: string;
    pullRequestId: number;
    writerId: string;
    summary: string;
    head: string;
    base: string;
    mergeStatus: boolean;
    priority: number;
    afterReview: boolean;
    deadline: string;
    createdDate: string;
    commits: Commit[];
    reviewers: Reviewer[];
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