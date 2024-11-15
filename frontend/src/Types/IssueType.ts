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
};
  