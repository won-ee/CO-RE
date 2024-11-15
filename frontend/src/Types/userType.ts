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
}

export interface UserInfoDataType {
  projects:ProjectType[]
  userInfo:UserInfoType
}


export interface ProjectStoreType {
  selectedOwner:string,
  selectedRepo:string,
  selectedProjectId:number,
  setSelectedOwner: (Owner: string ) => void;
  setSelectedPRepo: (Repo: string ) => void;
  setSelectedProjectId: (ProjectId: number ) => void;
}

export interface OptionType {
  value: string;
  label: string;
  githubOwner: string;
  githubRepo: string;
  projectUserId:number;
}