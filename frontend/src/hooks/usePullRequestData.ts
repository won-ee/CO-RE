import { useQuery } from 'react-query';
import { getCalendarPR, getPRDetail, getBranchList } from '../api/pullRequestAPI';
import { PRDataType, CalendarPRParamsType, PRDetailParamsType, BranchType, BranchListParams } from '../Types/pullRequestType';

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

export const useQueryBranch = (params: BranchListParams)=>{
  return useQuery<BranchType[], Error>(
    ['branchList',params],()=>getBranchList(params),{
      enabled: !!params.owner && !!params.repo,
      staleTime: 1000*60*5,
    }
  )
}