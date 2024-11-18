import { useQuery } from 'react-query';
import { EpicType, IssueListType, IssueLocationType } from '../Types/IssueType';
import { getEpicList, getIssueList, getIssueLocation, getIssueLocationList } from '../api/IssueAPI';
import { getAllProject } from '../api/userAPI';
import { ProjectType } from '../Types/userType';




export const useQueryIssueList = (projectUserId:number) => {
  
    const query = useQuery<IssueListType[], Error>(
        ['IssueListData', projectUserId],
        () => getIssueList(projectUserId),
      {
        staleTime: 1000 * 60 * 5, 
        enabled: !!projectUserId, 

      }
    );
  
    return query;
  };

export const useQueryIssueLocation = (projectUserId:number) => {
  
    const query = useQuery<IssueLocationType[], Error>(
        ['IssueLocation', projectUserId],
        () => getIssueLocation(projectUserId),
      {
        staleTime: 1000 * 60 * 5, 
        enabled: !!projectUserId, 

      }
    );
  
    return query;
  };

  export const useQueryIssueLocationList = (projectUserId:number) => {
  
    const query = useQuery<IssueListType[], Error>(
        ['IssueLocationList', projectUserId],
        () => getIssueLocationList(projectUserId),
      {
        staleTime: 1000 * 60 * 5, 
        enabled: !!projectUserId, 

      }
    );
  
    return query;
  };

export const useQueryEpicList = (selectedTeamId:number) => {

  const query = useQuery<EpicType[], Error>(
      ['EpicListData', selectedTeamId],
      () => getEpicList(selectedTeamId),
    {
      staleTime: 1000 * 60 * 5, 
      enabled: !!selectedTeamId, 
    }
  );

  return query;
};


export const useQueryAllProject = (selectedProjectId:number) => {

  const query = useQuery<ProjectType[], Error>(
      ['AllProject', selectedProjectId],
      () => getAllProject(selectedProjectId),
    {
      staleTime: 1000 * 60 * 5, 
      enabled: !!selectedProjectId, 

    }
  );

  return query;
};