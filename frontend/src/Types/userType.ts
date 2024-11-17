export interface UserStoreType {
  userInfo: UserInfoDataType | null;
  isLogin: boolean;
  setUserInfo: (userInfo: UserInfoDataType) => void;
  login: () => void;
  logout: () => void;
}
export interface UserStateType {
  userInfo: UserInfoDataType | null;
  isLogin: boolean;
}
export interface ProjectType {
  id: number;
  name: string;
  image: string;
  ownerId: string;
  ownerName: string;
  groupId: number;
  projectUserId: number;
  groupName: string;
  githubOwner: string;
  githubRepo: string;
}

export interface UserInfoType {
  id: number;
  email: string;
  name: string;
  nickName: string;
  image: string;
  accountId: string;
  gitToken: string;
}

export interface UserInfoDataType {
  projects: ProjectType[];
  userInfo: UserInfoType;
}

export interface ProjectStateType {
  selectedOwner: string;
  selectedRepo: string;
  selectedProjectId: number;
  selectedProjectUserId: number;
  selectedOwnerId: string;
  selectedGroupId: number;
}

export interface ProjectStoreType {
  selectedOwner: string;
  selectedRepo: string;
  selectedProjectId: number;
  selectedProjectUserId: number;
  selectedOwnerId: string;
  selectedGroupId:number;
  setSelectedOwner: (Owner: string) => void;
  setSelectedPRepo: (Repo: string) => void;
  setSelectedProjectId: (ProjectId: number) => void;
  setSelectedProjectUserId: (ProjectUserId: number) => void;
  setSelectedOwnerId: (OwnerId: string) => void;
  setSelectedGroupId: (GroupId: number) => void;
  resetProjectState: () => void;
}

export interface OptionType {
  value: string;
  label: string;
  githubOwner: string;
  githubRepo: string;
  id:number;
  projectUserId: number;
  ownerId: string;
  groupId:number;
}

export interface ProjectMemberType {
  projectId: number;
  projectUserId: number;
  userId: number;
  userName: string;
  userUrl: string;
  userEmail: string;
  userNickName: string;
}

export interface ProjectDataType {
  targetScore: string;
  reviewerCount: string;
  template: string;
}

export interface ProjectSettingType {
  targetScore: number;
  reviewerCount: number;
  template: string;
}

export interface patchUserInfoType {
  nickName : string;
  gitToken : string;
  userId : number;
}

export interface githubInfoType {
  projectId: number;
  githubOwner: string;
  githubRepo:string;
}

