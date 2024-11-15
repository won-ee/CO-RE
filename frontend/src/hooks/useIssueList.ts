import { useQuery } from 'react-query';
import { IssueListType } from '../Types/IssueType';
import { getIssueList } from '../api/IssueAPI';




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