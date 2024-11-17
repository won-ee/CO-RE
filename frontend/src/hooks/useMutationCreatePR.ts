import { useMutation } from "react-query";
import { postCreatePR,postPRReview } from "../api/pullRequestAPI";
import { TotalReviewsType } from "../Types/pullRequestType";
import { ProjectSettingType, githubInfoType, patchUserInfoType } from "../Types/userType";
import { patchProjectSetting, patchUserInfo, postGithubInfo, postLogout } from "../api/userAPI";
import { postAcceptIssueLocation, postEpic, postIssueLocation, postNoEpic } from "../api/IssueAPI";
import { useProjectStore, useUserStore } from "../store/userStore";

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

export const useMutationLogout = () => {
  const logoutUserStore = useUserStore((state) => state.logout);
  const resetProjectState = useProjectStore((state) => state.resetProjectState);

  return useMutation(postLogout, {
    onSuccess: () => {
      logoutUserStore();
      resetProjectState();
      console.log("성공적으로 로그아웃되었습니다!");
    },
    onError: (error) => {
      console.error("로그아웃 중 에러 발생:", error);
    },
  });
};