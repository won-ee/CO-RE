import { useMutation } from "react-query";
import { postCreatePR,postPRReview } from "../api/pullRequestAPI";
import { TotalReviewsType } from "../Types/pullRequestType";
import { ProjectSettingType, githubInfoType, patchUserInfoType } from "../Types/userType";
import { patchProjectSetting, patchUserInfo, postGithubInfo } from "../api/userAPI";
import { postAcceptIssueLocation, postEpic, postIssueLocation, postNoEpic } from "../api/IssueAPI";

export const useMutationCreatePR=()=>{
    return useMutation(postCreatePR)
}
export const useMutationpostPRReview = () => {
    return useMutation((params: { owner: string; repo: string; pullId: string; reviewData: TotalReviewsType }) => postPRReview(params));
  };

export const useMutationPatchProjectSetting = () => {
  return useMutation({
    mutationFn: (variables: { selectedProjectId: number; projectData: ProjectSettingType }) => {
      return patchProjectSetting(variables.selectedProjectId, variables.projectData);
    },
    onSuccess: (data) => {
      console.log('Success:', data);
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });
};

export const useMutationPatchUserInfo = () => {
  return useMutation({
    mutationFn: (variables: { userInfotData: patchUserInfoType }) => {
      return patchUserInfo(variables.userInfotData);
    },
    onSuccess: (data) => {
      console.log('Success:', data);
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });
};
  

export const useMutationGithubInfo = () => {
  return useMutation({
    mutationFn: (params: githubInfoType) => postGithubInfo(params),
    onMutate: (variables) => {
      console.log("GitHub 정보 요청 시작:", variables);
    },
    onSuccess: (data) => {
      console.log("GitHub 정보 요청 성공:", data);
    },
    onError: (error) => {
      console.error("GitHub 정보 요청 실패:", error);
    },
    onSettled: () => {
      console.log("GitHub 정보 요청 완료");
    },
  });
};

export const useMutationEpic = () => {
  return useMutation(
    ({ projectUserId, deadline, priority }: { projectUserId: number; deadline: string; priority: string }) => 
      postEpic(projectUserId, deadline, priority)
  );
};

export const useMutationNoEpic = () => {
  return useMutation(
    ({ projectUserId, deadline, priority }: { projectUserId: number; deadline: string; priority: string }) => 
      postNoEpic(projectUserId, deadline, priority)
  );
};

export const useMutationIssueLocation = () => {
  return useMutation(
    ({ projectUserId, issueId }: { projectUserId: number; issueId: number; }) => 
      postIssueLocation(projectUserId,issueId )
  );
};
export const useMutationAcceptIssueLocation = () => {
  return useMutation(
    ({ projectUserId, carrotId }: { projectUserId: number; carrotId: number; }) => 
      postAcceptIssueLocation(projectUserId,carrotId )
  );
};
