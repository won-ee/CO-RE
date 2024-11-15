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
}

export interface UserInfoDataType {
  projects:ProjectType[]
  userInfo:UserInfoType
}


export interface ProjectStoreType {
  selectedOwner:string|null,
  selectedRepo:string|null,
  setSelectedOwner: (Owner: string | null) => void;
  setSelectedPRepo: (Repo: string | null) => void;
}

export interface OptionType {
  value: string;
  label: string;
  githubOwner: string;
  githubRepo: string;
}