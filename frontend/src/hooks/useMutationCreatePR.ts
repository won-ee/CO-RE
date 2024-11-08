import { useMutation } from "react-query";
import { postCreatePR } from "../api/pullRequestAPI";

export const useMutationCreatePR=()=>{
    return useMutation(postCreatePR)
}