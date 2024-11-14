import axios from 'axios';
import { PRDataType, CalendarPRParamsType, PRDetailParamsType, CreatePRType, TotalReviewsType, BranchListParams, BranchListType, CommitListParams, CommitListType, PRListParams, PRListType } from '../Types/pullRequestType';

const BASE_URL ='http://54.180.83.239:8080'; 

export const getCalendarPR = async ({
    owner,
    repo,
    writer,
    month,
    year,
  }: CalendarPRParamsType): Promise<PRDataType[]> => {
    const response = await axios.get<PRDataType[]>(
      `${BASE_URL}/pull-request/${owner}/${repo}/user`,
      {
        params: {
            writer,
            month,
            year,
        },
      }
    );
    return response.data;
  };

export const postCreatePR =async (PRData:CreatePRType)=>{
  const { data } = await axios.post(`${BASE_URL}/pull-request`,PRData,{
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
}
export const getPRDetail = async ({
  owner,
  repo,
  pullId
}: PRDetailParamsType): Promise<PRDataType> => {
  const response = await axios.get<PRDataType>(
    `${BASE_URL}/pull-request/${owner}/${repo}/${pullId}`,
  );
  return response.data;
};

export const postPRReview = async({owner,repo,pullId,reviewData,} : {
  owner: string;
  repo: string;
  pullId: string;
  reviewData: TotalReviewsType;})=>{
  const {data} = await axios.post(`${BASE_URL}/pull-request${owner}/${repo}/${pullId}`,reviewData,{
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
return data;
}

export const getBranchList = async({owner,repo}: BranchListParams): Promise<BranchListType[]>=>{
  try{
    const response = await axios.get<BranchListType[]>(`${BASE_URL}/branch/${owner}/${repo}`);
    return response.data;
  }
  catch (error) {
    console.error("Error fetching branch list:", error);
    throw error;
  }
}

export const getCommitList = async({owner,repo,base,head}: CommitListParams): Promise<CommitListType[]>=>{
  try{
    const response = await axios.get<CommitListType[]>(`${BASE_URL}/branch/${owner}/${repo}/${base}...${head}`);
    return response.data;
  }
  catch(error){
    console.error("Error fetching commit list:", error);
    throw error;
  }
}

export const getPRList = async({owner,repo,state}: PRListParams): Promise<PRListType[]>=>{
  try{
    const response = await axios.get<PRListType[]>(`${BASE_URL}/pull-request/${owner}/${repo}?state=${state}`);
    return response.data;
  }
  catch(error){
    console.error("Error fetching PR list:", error);
    throw error;
  }
}