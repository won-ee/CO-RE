import { useQuery } from 'react-query';
import { UserInfoDataType } from '../Types/userType';
import { getUserInfo } from '../api/userAPI';
import { useUserStore } from '../store/userStore';

export const useQueryUserInfo = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const query = useQuery<UserInfoDataType, Error>(
    ['userData'],
    () => getUserInfo(),
    {
      staleTime: 1000 * 60 * 5, 
      onSuccess: (data) => {
        setUserInfo(data);
      }
    }
  );

  return query;
};
