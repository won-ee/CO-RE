export interface UserStoreType {
    userInfo: UserInfoType | null;
    isLogin: boolean;
    setUserInfo: (userInfo: UserInfoType) => void;
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
  }
  
export interface UserInfoType {
    id: number; 
    email: string;
    name: string;
    nickName: string;
    image: string;
    projects: ProjectType[];
}
  