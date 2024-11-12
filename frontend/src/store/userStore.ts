import { create } from 'zustand';
import { UserStoreType } from '../Types/userType';


const useUserStore = create<UserStoreType>((set) => ({
  userInfo: null,
  isLogin: false, 
  setUserInfo: (userInfo) => set({ userInfo }),
  login: () => set({ isLogin: true }), 
  logout: () => set({ isLogin: false }), 
}));



export default useUserStore;
