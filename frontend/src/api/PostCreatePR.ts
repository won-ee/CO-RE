import axios from "axios";
import { CreatePR } from "../Types/pullRequestType";

export const PostCreatePR =async (PRData:CreatePR)=>{
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/pull-request`,PRData,{
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  };