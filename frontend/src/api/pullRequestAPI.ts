import axios from "axios";
import {
  PRDataType,
  CalendarPRParamsType,
  PRDetailParamsType,
  CreatePRType,
  TotalReviewsType,
  BranchListParams,
  BranchListType,
  CommitListParams,
  CommitListType,
  PRListParams,
  PRListType,
  ChangeType,
  TemplateType,
  CommentType
} from "../Types/pullRequestType";

const BASE_URL ='https://k11s106.p.ssafy.io/api'; 

export const getCalendarPR = async ({
  owner,
  repo,
  writer,
  month,
  year,
}: CalendarPRParamsType): Promise<PRDataType[]> => {
  const response = await axios.get<PRDataType[]>(
    `${BASE_URL}/github/pull-request/${owner}/${repo}/user`,
    {
      params: {
        writer,
        month,
        year,
      },
      headers: {
        withCredentials: true,
      },
    },
  );
  
  return response.data;
};

export const postCreatePR = async (PRData: CreatePRType) => {
  const { data } = await axios.post(`${BASE_URL}/github/pull-request`, PRData, {
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
    },
  });
  return data;
};

export const getPRDetail = async ({
  owner,
  repo,
  pullId,
}: PRDetailParamsType): Promise<PRDataType> => {
  const response = await axios.get<PRDataType>(
    `${BASE_URL}/github/pull-request/${owner}/${repo}/${pullId}`,
    {
      headers: {
        withCredentials: true,
      },
    },
  );
  return response.data;
};

export const postPRReview = async ({
  owner,
  repo,
  pullId,
  reviewData,
}: {
  owner: string;
  repo: string;
  pullId: string;
  reviewData: TotalReviewsType;
}) => {
  const { data } = await axios.post(
    `${BASE_URL}/github/pull-request${owner}/${repo}/${pullId}`,
    reviewData,
    {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    },
  );
  return data;
};

export const getBranchList = async ({
  owner,
  repo,
}: BranchListParams): Promise<BranchListType[]> => {
  try {
    const response = await axios.get<BranchListType[]>(
      `${BASE_URL}/github/branch/${owner}/${repo}`,
      {
        headers: {
          withCredentials: true,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching branch list:", error);
    throw error;
  }
};

export const getCommitList = async ({
  owner,
  repo,
  base,
  head,
}: CommitListParams): Promise<CommitListType[]> => {
  try {
    const response = await axios.get<CommitListType[]>(
      `${BASE_URL}/github/branch/${owner}/${repo}/${base}...${head}`,
      {
        headers: {
          withCredentials: true,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching commit list:", error);
    throw error;
  }
};

export const getPRList = async ({
  owner,
  repo,
  state,
}: PRListParams): Promise<PRListType[]> => {
  try {
    const response = await axios.get<PRListType[]>(
      `${BASE_URL}/github/pull-request/${owner}/${repo}?state=${state}`,
      {
        headers: {
          withCredentials: true,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching PR list:", error);
    throw error;
  }
};

export const getChangeList = async ({
  owner,
  repo,
  base,
  head,
}: CommitListParams): Promise<ChangeType[]> => {
  try {
    const response = await axios.get<ChangeType[]>(
      `${BASE_URL}/github/branch/${owner}/${repo}/${base}...${head}/files`,
      {
        headers: {
          withCredentials: true,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching Change list:", error);
    throw error;
  }
};

export const getTemplateInsight = async({owner,repo,base,head}: CommitListParams) : Promise<TemplateType>=>{
  try{
    const response = await axios.get<TemplateType>(`${BASE_URL}/github/insight/${owner}/${repo}/${base}...${head}`,
      {
        headers: {
          withCredentials: true,
        }
      }
    )
    return response.data
  } catch (error) {
    console.log("Error fetching Template:", error);
    throw error
  }
}

export const postReviewComment = async({owner,repo,pullId,commentData}: {
  owner: string;
  repo: string;
  pullId: number;
  commentData: CommentType;})=>{
  const { data } = await axios.post(`${BASE_URL}/github/pull-request/${owner}/${repo}/${pullId}`,commentData,{
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
    },
  })
  return data;
}