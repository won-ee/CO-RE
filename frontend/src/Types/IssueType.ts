export interface IssueListType {
    issueId: number;
    issueTitle: string;
    issueContent: string;
    issueKey: string;
    issuePriority: number;
    issueDeadLine: string | null;
    issueStatus: "TODO" | "IN_PROGRESS" | "DONE";
    managerUserId: number;
    managerUserImage: string;
    managerUserName: string;
    epicName:string;
    epicKey:string;
};
  
export interface EpicType {
    id: number; 
    key: string;
    name: string; 
  };