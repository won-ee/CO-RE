import axios from 'axios';
import { PRDataType, CalendarPRParamsType, PRDetailParamsType, CreatePRType, TotalReviewsType, BranchListParams, BranchListType, CommitListParams, CommitListType, PRListParams, PRListType, ChangeType } from '../Types/pullRequestType';

const BASE_URL ='http://54.180.83.239:8080'; 
const TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjoxLCJleHAiOjE3MzE5ODczNDQsImVtYWlsIjoiaGtrMzYyNkBuYXZlci5jb20ifQ.Ud0t67fGyyhUgXMROWJ9rK9iY2MO3Vs8yO1G-2j5TtyRXYjgJPa3gWNV76CTFdzzMyD-mdnx6LboFwpULH2U1Q'

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
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
      },
    );
    return response.data;
  };

export const postCreatePR =async (PRData:CreatePRType)=>{
  const { data } = await axios.post(`${BASE_URL}/pull-request`,PRData,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`
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
    `${BASE_URL}/pull-request/${owner}/${repo}/${pullId}`,{
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    },
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
      Authorization: `Bearer ${TOKEN}`
    },
  }
);
return data;
}

export const getBranchList = async({owner,repo}: BranchListParams): Promise<BranchListType[]>=>{
  try{
    const response = await axios.get<BranchListType[]>(`${BASE_URL}/branch/${owner}/${repo}`,{
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    return response.data;
  }
  catch (error) {
    console.error("Error fetching branch list:", error);
    throw error;
  }
}

export const getCommitList = async({owner,repo,base,head}: CommitListParams): Promise<CommitListType[]>=>{
  try{
    const response = await axios.get<CommitListType[]>(`${BASE_URL}/branch/${owner}/${repo}/${base}...${head}`,{
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    return response.data;
  }
  catch(error){
    console.error("Error fetching commit list:", error);
    throw error;
  }
}

export const getPRList = async({owner,repo,state}: PRListParams): Promise<PRListType[]>=>{
  try{
    const response = await axios.get<PRListType[]>(`${BASE_URL}/pull-request/${owner}/${repo}?state=${state}`,{
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    return response.data;
  }
  catch(error){
    console.error("Error fetching PR list:", error);
    throw error;
  }
}

export const getChangeList = async({owner,repo,base,head}: CommitListParams): Promise<ChangeType[]>=>{
  try{
    const response = await axios.get<ChangeType[]>(`${BASE_URL}/pull-request/${owner}/${repo}/${base}...${head}/files`,{
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  );
    return response.data
  }
  catch(error){
    console.log("Error fetching Change list:", error);
    throw error;    
  }
}