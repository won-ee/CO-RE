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
  path: string;
  line: number;
  body: string;
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
  priority: string,
  writerId: string;
  reviewers:string[];
}

export interface CalendarPRParamsType {
  owner: string;
  repo: string;
  writer: string;
  month: number;
  year: number;
}

export interface CommentType{
  content: string;
  score: number;
  status: boolean;
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
  reviews: TotalReviewsType[];
  comments: CommentsType[];
}

export interface PRDetailParamsType {
  owner: string;
  repo: string;
  pullId: number;
}

export interface TotalReviewsType{
    body: string,
    event: string,
    reviews: ReviewType[]
}

export interface BranchListParams{
  owner:string;
  repo:string;
}

export interface LastCommitType{
  sha:string;
  message:string;
  writerId: string,
  writerImg: string;
  date: string,
  parent: string,
  secondParent: string;
}

export interface BranchListType{
  name:string;
  lastCommit:LastCommitType;
}

export interface CommitListParams{
  owner : string;
  repo : string;
  base : string;
  head : string;
}

export interface CommitListType{
  message: string;
  date: string;
}


export interface PRListType{
  pullRequestId: number;
  title: string;
  writer: ReviewerType;
  head: string;
  base: string;
  createadDate:string;
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

export interface ChangeListParams{
  owner: string;
  repo: string;
}

export interface TemplateType{
  template:string;
}

export interface ReviewCommentTypeForPatch{
  body:string;
  score:number;
  status:string;
}