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

export interface IssueLocationType {
  id: number;
  issueId: number; 
  name: string; 
  key: string; 
  epicName: string; 
  deadLine: string | null; 
  senderId: number; 
  senderName: string;
  senderImage: string;
  epicKey:string;
}

interface IssueType {
  name: string;
}

interface PriorityType {
  name: string;
}

interface Assignee {
  accountId: string;
}

interface Parent {
  key: string;
}

interface Project {
  key: string;
}

interface Fields {
  project: Project;
  summary: string;
  issuetype: IssueType;
  parent?: Parent;
  priority: PriorityType;
  assignee: Assignee;
}

export interface EpicFieldsType {
  fields: Fields;
}

export interface IssueListEpicType {
  epicKey: string;
  issueContent: string;
  issueTitle: string;
  issueKey: string;
  epicName: string;
  issueStatus: string;
  issuePriority: number;
}

