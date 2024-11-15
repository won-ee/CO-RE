import { useQuery } from 'react-query';
import { getCalendarPR, getPRDetail, getBranchList, getCommitList, getPRList, getChangeList } from '../api/pullRequestAPI';
import { PRDataType, CalendarPRParamsType, PRDetailParamsType, BranchListType, BranchListParams, CommitListParams, CommitListType, PRListParams, PRListType, ChangeListParams, ChangeType } from '../Types/pullRequestType';

export const useQueryCalendarPR = (params: CalendarPRParamsType) => {
  return useQuery<PRDataType[], Error>(
    ['pullRequest', params],
    () => getCalendarPR(params),
    {
      enabled: !!params.writer && !!params.month && !!params.year, 
      staleTime: 1000 * 60 * 5, 
    }
  );
};

export const useQueryPRDetail = (params: PRDetailParamsType) => {
  return useQuery<PRDataType, Error>(
    ['pullRequest', params],
    () => getPRDetail(params),
    {
      enabled: !!params.pullId, 
      staleTime: 1000 * 60 * 5, 
    }
  );
};

export const useQueryBranchList = (params: BranchListParams)=>{
  return useQuery<BranchListType[], Error>(
    ['branchList',params],()=>getBranchList(params),{
      enabled: !!params.owner && !!params.repo,
      staleTime: 1000*60*5,
    }
  )
}

export const useQueryCommitList = (params: CommitListParams)=>{
  return useQuery<CommitListType[],Error>(
    ['commitList',params],()=>getCommitList(params),{
      enabled: !!params.owner && !!params.repo && !!params.base && !!params.head,
      staleTime: 1000* 60*5
    }
  )
}

export const useQueryPRList = (params: PRListParams)=>{
  return useQuery<PRListType[],Error>(
    ['PRList',params],()=>getPRList(params),{
      enabled: !!params.owner && !!params.repo && !!params.state,
      staleTime: 1000* 60*5
    }
  )
}

export const useQueryChangeList = (params: ChangeListParams)=>{
  return useQuery<ChangeType[],Error>(
    ['ChangeList',params],()=>getChangeList(params),{
      enabled: !!params.owner && !!params.pullId && !!params.repo,
      staleTime: 1000* 60*5
    }
  )
}