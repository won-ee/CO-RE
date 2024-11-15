export interface ReviewerType {
  writerId: string;
  writerImg: string;
}

export interface CommitType {
  id: string;
  message: string;
  writerId: string;
  writerImg: string;
  date: string;
}
export type ReviewType = {
  writer: ReviewerType;
  content: string;
  reviews: ChildReviewType[];
};

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

export type ChildReviewType = {
  body: string;
  path: string;
  line: number;
};
export interface CommentType{
  content: string;
  score: number;
  status: boolean;
  date:string;
}

export interface CommentsType{
  comment:CommentType;
  writer:ReviewerType;
}

export interface PRDataType {
  pullRequestId: number;
  title: string;
  writer: ReviewerType;
  head: string;
  base: string;
  status: string;
  priority: string;
  afterReview: boolean;
  createdDate: string;
  deadline: string;
  commentCount: number;
  reviewers: ReviewerType[];
  id: number;
  summary: string | null;
  description: string;
  mergeStatus: boolean;
  commits: CommitType[];
  reviews: ReviewType[];
  comments: CommentsType[];
}

export interface PRDetailParamsType {
  owner: string;
  repo: string;
  pullId: number;
}

export interface TotalReviewsType{
    commit_id: string,
    body: string,
    event: string,
    comments: ReviewType[]
}

export interface BranchListParams{
  owner:string;
  repo:string;
}

export interface BranchType{
  name:string;
}

export interface CommitListParams{
  owner : string;
  repo : string;
  base : string;
  head : string;
}

export interface CommitListType{
  message: string;
  writerName: string;
  date: string;
}


export interface PRListType{
  pullRequestId: number;
  title: string;
  writer: ReviewerType;
  head: string;
  base: string;
  status: string;
  priority: string;
  afterReview: boolean;
  deadline: string;
  reviewers: ReviewerType[];
  commentCount: number;
}

export interface PRListParams{
  owner: string;
  repo: string;
  state: string;
}