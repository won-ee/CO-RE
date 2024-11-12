import { useQuery } from 'react-query';
import { UserInfoType } from '../Types/userType';
import { getUserInfo } from '../api/userAPI';
import useUserStore from '../store/userStore';



export const useQueryPRDetail = () => {
    const setUserInfo = useUserStore((state) => state.setUserInfo);

    return useQuery<UserInfoType, Error>(
      ['userData'],
      () => getUserInfo(),
      {
        staleTime: 1000 * 60 * 5, 
        onSuccess: (data) => {
            setUserInfo(data);
          },      
        }
    );
  };