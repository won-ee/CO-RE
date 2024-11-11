import { useMutation } from "react-query";
import { postCreatePR, postCreatePRReview } from "../api/pullRequestAPI";

export const useMutationCreatePR=()=>{
    return useMutation(postCreatePR)
}

export const useMutationCreatePRReview=()=>{
    return useMutation(postCreatePRReview)
}