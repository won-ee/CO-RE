import { useMutation } from "react-query";
import { PostCreatePR } from "../api/PostCreatePR";

export const useMutationCreatePR=()=>{
    return useMutation(PostCreatePR)
}