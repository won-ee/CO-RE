import { useQuery } from 'react-query';
import { getCalendarPR, getPRDetail } from '../api/pullRequestAPI';
import { PRDataType, CalendarPRParamsType, PRDegailParamsType } from '../Types/pullRequestType';

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

export const useQueryPRDetail = (params: PRDegailParamsType) => {
  return useQuery<PRDataType, Error>(
    ['pullRequest', params],
    () => getPRDetail(params),
    {
      enabled: !!params.pullId, 
      staleTime: 1000 * 60 * 5, 
    }
  );
};
