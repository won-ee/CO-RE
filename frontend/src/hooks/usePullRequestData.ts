import { useQuery } from 'react-query';
import { getCalendarPR, getPRDetail, getBranchList, getCommitList, getPRList, getChangeList, getTemplateInsight } from '../api/pullRequestAPI';
import { PRDataType, CalendarPRParamsType, PRDetailParamsType, BranchListType, BranchListParams, CommitListParams, CommitListType, PRListParams, PRListType, ChangeType, TemplateType } from '../Types/pullRequestType';

export const useQueryCalendarPR = (params: CalendarPRParamsType) => {
  return useQuery<PRDataType[], Error>(
    ['calendarPR', params],
    () => getCalendarPR(params),
    {
      enabled: !!params.writer && !!params.month && !!params.year, 
      staleTime: 1000 * 60 * 5, 
    }
  );
};

export const useQueryPRDetail = (params: PRDetailParamsType) => {
  return useQuery<PRDataType, Error>(
    ['pullRequestDetail', params],
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
      refetchOnMount: true,
      staleTime: 0
    }
  )
}

export const useQueryChangeList = (params: CommitListParams)=>{
  return useQuery<ChangeType[],Error>(
    ['ChangeList',params],()=>getChangeList(params),{
      enabled: !!params.owner && !!params.repo && !!params.base && !!params.head,
      staleTime: 1000* 60*5
    }
  )
}

export const useQueryTemplate = (params: CommitListParams)=>{
  return useQuery<TemplateType,Error>(
    ['Template',params],()=>getTemplateInsight(params),{
      enabled: !!params.owner && !!params.repo && !!params.base && !!params.head,
      staleTime: 1000* 60*5
    }
  )
}