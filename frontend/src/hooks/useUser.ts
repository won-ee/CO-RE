import { useQuery } from 'react-query';
import { ProjectMemberType, UserInfoDataType } from '../Types/userType';
import { getMemberList, getUserInfo } from '../api/userAPI';
import { useUserStore } from '../store/userStore';

export const useQueryUserInfo = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const {login} = useUserStore()
  const query = useQuery<UserInfoDataType, Error>(
    ['userData'],
    () => getUserInfo(),
    {
      staleTime: 1000 * 60 * 5, 
      onSuccess: (data) => {
        setUserInfo(data);
        login()
      }
    }
  );

  return query;
};

export const useMemberList = (selectedProjectId:number) => {

  const query = useQuery<ProjectMemberType[], Error>(
    ['MemberList',selectedProjectId],
    () => getMemberList(selectedProjectId),
    {
      staleTime: 1000 * 60 * 5, 
      enabled: !!selectedProjectId, 
    }
  );

  return query;
};
