import { useMutation, useQueryClient } from "react-query";
import { patchReviewComment, postCreatePR,postPRReview, postReviewComment } from "../api/pullRequestAPI";
import { TotalReviewsType, CommentType, ReviewCommentTypeForPatch } from "../Types/pullRequestType";
import { ProjectSettingType, githubInfoType, patchUserInfoType } from "../Types/userType";
import { patchProjectSetting, patchUserInfo, postGithubInfo, postLogout } from "../api/userAPI";
import { postAcceptIssueLocation, postEpic, postIssueLocation, postNoEpic } from "../api/IssueAPI";
import { useProjectStore, useUserStore } from "../store/userStore";
import { EpicFieldsType } from "../Types/IssueType";

export const useMutationCreatePR=()=>{
    return useMutation(postCreatePR)
}
export const useMutationpostPRReview = () => {
    return useMutation((params: { owner: string; repo: string; pullId: string; reviewData: TotalReviewsType }) => postPRReview(params));
  };

  export const useMutationPatchProjectSetting = (options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
  }) => {
    return useMutation({
      mutationFn: (variables: { selectedProjectId: number; projectData: ProjectSettingType }) => {
        return patchProjectSetting(variables.selectedProjectId, variables.projectData);
      },
      onSuccess: (data) => {
        console.log('Success:', data);
        options?.onSuccess?.(data); 
      },
      onError: (error) => {
        console.error('Error:', error);
        options?.onError?.(error); 
      },
    });
  };
  

export const useMutationPatchUserInfo = () => {
  return useMutation({
    mutationFn: (variables: { userInfotData: patchUserInfoType,userId:number }) => {
      return patchUserInfo(variables.userInfotData,variables.userId);
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
    mutationFn: ({ params, projectId }: { params: githubInfoType, projectId: number }) =>
      postGithubInfo(params, projectId),
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
    ({ projectUserId, deadline, fields }: { projectUserId: number; deadline: string; fields: EpicFieldsType }) => 
      postEpic(projectUserId, deadline, fields),
    {
      onSuccess: (data) => {
        console.log('Epic 요청 성공:', data); 
      },
      onError: (error) => {
        console.error('Epic 요청 실패:', error); 
      }
    }
  );
};

export const useMutationNoEpic = () => {
  return useMutation(
    ({ projectUserId, deadline, fields }: { projectUserId: number; deadline: string; fields: EpicFieldsType }) => 
      postNoEpic(projectUserId, deadline, fields),
    {
      onSuccess: (data) => {
        console.log('NoEpic 요청 성공:', data); 
      },
      onError: (error) => {
        console.error('NoEpic 요청 실패:', error);
      }
    }
  );
};


export const useMutationIssueLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ projectUserId, issueId }: { projectUserId: number; issueId: number }) => 
      postIssueLocation(projectUserId, issueId),
    {
      onSuccess: (data, variables) => {
        console.log('Issue location updated successfully.');
        console.log(data);
        queryClient.invalidateQueries(['IssueLocationList', variables.projectUserId]);
        queryClient.refetchQueries(['IssueLocation', variables.projectUserId]);

      },
      onError: (error) => {
        console.error('Failed to update issue location:', error);
      },
    }
  );
};

export const useMutationAcceptIssueLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ projectUserId, carrotId }: { projectUserId: number; carrotId: number }) => 
      postAcceptIssueLocation(projectUserId, carrotId),
    {
      onSuccess: (data, variables) => {
        console.log('Issue location accepted successfully.');
        console.log(data);
        
        queryClient.invalidateQueries(['IssueLocationList', variables.projectUserId]);
        queryClient.refetchQueries(['IssueLocation', variables.projectUserId]);

      },
      onError: (error) => {
        console.error('Failed to accept issue location:', error);
        alert('이슈 위치 수락에 실패했습니다. 다시 시도해주세요.');
      },
    }
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

export const useMutationReviewComment = () =>{
  return useMutation((params: { owner: string; repo: string; pullId: number; commentData: CommentType }) => postReviewComment(params),{
    onSuccess:(data)=>{
      console.log("SUCCESS : ReviewComment Matation , ", data); 
    },
    onError: (data)=>{
      console.error("Error : ReviewComment Matation , ", data);
    }
  })
}

export const useMutationPatchReviewComment = ()=>{
  return useMutation((params: {owner: string, repo:string, id:number,commentData: ReviewCommentTypeForPatch}) => patchReviewComment(params),{
    onSuccess:(data)=>{
      console.log("SUCCESS : ReviewComment Patch Matation , ", data); 
    },
    onError: (data)=>{
      console.error("Error : ReviewComment Patch Matation , ", data);
    }
  })
}