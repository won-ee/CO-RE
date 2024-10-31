import { create } from 'zustand';

interface UserStore {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  isLogin: false, 
  login: () => set({ isLogin: true }), 
  logout: () => set({ isLogin: false }), 
}));

export default useUserStore;
