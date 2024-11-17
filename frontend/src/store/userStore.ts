import { create } from "zustand";
import { ProjectStateType, ProjectStoreType, UserStateType, UserStoreType } from "../Types/userType";

const initialUserState: UserStateType = {
  userInfo: null,
  isLogin: false,
};

const initialProjectState: ProjectStateType = {
  selectedOwner: "",
  selectedRepo: "",
  selectedProjectId: 0,
  selectedProjectUserId: 0,
  selectedOwnerId: "",
  selectedGroupId: 0,
};

export const useUserStore = create<UserStoreType>((set) => ({
  ...initialUserState,
  setUserInfo: (userInfo) => set({ userInfo }),
  login: () => set({ isLogin: true }),
  logout: () => set(initialUserState),
}));

export const useProjectStore = create<ProjectStoreType>((set) => ({
  ...initialProjectState,
  setSelectedOwner: (Owner) => set({ selectedOwner: Owner }),
  setSelectedPRepo: (Repo) => set({ selectedRepo: Repo }),
  setSelectedProjectId: (ProjectId) => set({ selectedProjectId: ProjectId }),
  setSelectedProjectUserId: (ProjectUserId) =>
    set({ selectedProjectUserId: ProjectUserId }),
  setSelectedOwnerId: (OwnerId) => set({ selectedOwnerId: OwnerId }),
  setSelectedGroupId: (GroupId) => set({ selectedGroupId: GroupId }),
  resetProjectState: () => set(initialProjectState),
}));

