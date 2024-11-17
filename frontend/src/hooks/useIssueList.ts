import { useQuery } from 'react-query';
import { EpicType, IssueListType } from '../Types/IssueType';
import { getEpicList, getIssueList } from '../api/IssueAPI';




export const useQueryIssueList = (selectedProjectId:number) => {
  
    const query = useQuery<IssueListType[], Error>(
        ['IssueListData', selectedProjectId],
        () => getIssueList(selectedProjectId),
      {
        staleTime: 1000 * 60 * 5, 
        enabled: !!selectedProjectId, 

      }
    );
  
    return query;
  };

  export const useQueryEpicList = (selectedProjectId:number) => {
  
    const query = useQuery<EpicType[], Error>(
        ['EpicListData', selectedProjectId],
        () => getEpicList(selectedProjectId),
      {
        staleTime: 1000 * 60 * 5, 
        enabled: !!selectedProjectId, 
      }
    );
  
    return query;
  };