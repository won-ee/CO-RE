import { useQuery } from 'react-query';
import { fetchPullRequest } from '../api/pullRequestAPI';
import { PullRequestParams, PullRequestData } from '../Types/pullRequestType';

export const usePullRequestData = (params: PullRequestParams) => {
  return useQuery<PullRequestData[], Error>(
    ['pullRequest', params],
    () => fetchPullRequest(params),
    {
      enabled: !!params.writer && !!params.month && !!params.year, 
      staleTime: 1000 * 60 * 5, 
    }
  );
};
