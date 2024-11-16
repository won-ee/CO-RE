export interface UserStoreType {
    userInfo: UserInfoDataType | null;
    isLogin: boolean;
    setUserInfo: (userInfo: UserInfoDataType) => void;
    login: () => void;
    logout: () => void;
  }

  
export interface ProjectType {
    id: number; 
    name: string;
    image: string;
    ownerID: string; 
    ownerName: string;
    groupID: number;
    projectUserId:number;
    groupName: string; 
    githubOwner:string;
    githubRepo:string;
}
  

export interface UserInfoType {
    id: number; 
    email: string;
    name: string;
    nickName: string;
    image: string;
    accountId:string;
    gitToken:string;
}

export interface UserInfoDataType {
  projects:ProjectType[]
  userInfo:UserInfoType
}


export interface ProjectStoreType {
  selectedOwner:string,
  selectedRepo:string,
  selectedProjectId:number,
  selectedOwnerId:string,
  setSelectedOwner: (Owner: string ) => void;
  setSelectedPRepo: (Repo: string ) => void;
  setSelectedProjectId: (ProjectId: number ) => void;
  setSelectedOwnerId: (OwnerId:string ) => void;
}

export interface OptionType {
  value: string;
  label: string;
  githubOwner: string;
  githubRepo: string;
  projectUserId:number;
  ownerId:string;
}

export interface ProjectMemberType {
  projectId: number;
  projectUserId: number;
  userId: number;
  userName: string;
  userUrl: string;
  userEmail:string;
  userNickName:string
};

export interface ProjectDataType {
  targetScore:string;
  reviewerCount:string;
  template:string;
}

export interface ProjectSettingType {
  targetScore: number;
  reviewerCount: number;
  template: string;
}

export interface patchUserInfoType {
  nickName : string;
  gitToken : string;
}
export interface githubInfoType {
  projectId: number;
  githubOwner: string;
  githubRepo:string;
}