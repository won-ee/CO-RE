import { create } from "zustand";
import { ProjectStoreType, UserStoreType } from "../Types/userType";

export const useUserStore = create<UserStoreType>((set) => ({
  userInfo: null,
  isLogin: true,
  setUserInfo: (userInfo) => set({ userInfo }),
  login: () => set({ isLogin: true }),
  logout: () => set({ isLogin: false }),
}));

export const useProjectStore = create<ProjectStoreType>((set) => ({
  selectedOwner: "",
  selectedRepo: "",
  selectedProjectId: 0,
  selectedProjectUserId: 0,
  selectedOwnerId: "",
  selectedGroupId:0,
  setSelectedOwner: (Owner) => set({ selectedOwner: Owner }),
  setSelectedPRepo: (Repo) => set({ selectedRepo: Repo }),
  setSelectedProjectId: (ProjectId) => set({ selectedProjectId: ProjectId }),
  setSelectedProjectUserId: (ProjectUserId) =>
    set({ selectedProjectUserId: ProjectUserId }),
  setSelectedOwnerId: (OwnerId) => set({ selectedOwnerId: OwnerId }),
  setSelectedGroupId: (GroupId) => set({ selectedGroupId: GroupId })
}));
