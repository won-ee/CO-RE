import { useMutation } from "react-query";
import { postCreatePR,postPRReview } from "../api/pullRequestAPI";
import { TotalReviewsType } from "../Types/pullRequestType";

export const useMutationCreatePR=()=>{
    return useMutation(postCreatePR)
}
export const useMutationpostPRReview = () => {
    return useMutation((params: { owner: string; repo: string; pullId: string; reviewData: TotalReviewsType }) => postPRReview(params));
  };