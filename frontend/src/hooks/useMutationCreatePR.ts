import { useMutation } from "react-query";
import { postCreatePR,postPRReview } from "../api/pullRequestAPI";
import { TotalReviewsType } from "../Types/pullRequestType";
import { ProjectSettingType } from "../Types/userType";
import { patchProjectSetting } from "../api/userAPI";

export const useMutationCreatePR=()=>{
    return useMutation(postCreatePR)
}
export const useMutationpostPRReview = () => {
    return useMutation((params: { owner: string; repo: string; pullId: string; reviewData: TotalReviewsType }) => postPRReview(params));
  };

  export const useMutationCreateProjectSetting = () => {
    return useMutation({
      mutationFn: (variables: { selectedProjectId: number; projectData: ProjectSettingType }) => {
        console.log('Selected Project ID:', variables.selectedProjectId);
        console.log('Project Data:', variables.projectData);
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
  