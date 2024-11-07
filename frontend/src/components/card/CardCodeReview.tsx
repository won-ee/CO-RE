import { useState, ChangeEvent } from "react";
import { CardCodeReviewLayout, ReviewTextArea, ButtonBox } from "./CardCodeReview.styled"
import ButtonSimpleSquare from "../buttons/ButtonSimpleSquare"
import { ReviewType } from "../../Types/pullRequestType";

interface CardCodeReviewProps {
    onCancel: () => void;
    onAdd: () => void;
    content :string;
    setContent:
  }

function CardCodeReview({onCancel, onAdd, } : CardCodeReviewProps) {
    const [content, setContent] = useState<string>('')

    const handleContent = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        setContent(e.target.value)
      }

    return (
        <CardCodeReviewLayout>
            <ReviewTextArea placeholder="Type your Review..." onChange={handleContent} value={content}/>
            <ButtonBox>
                <ButtonSimpleSquare text='Cancle' color='black' bgc='#EFF2F5' btnEvent={onCancel}/>
                <ButtonSimpleSquare text='Add Review' color='white' bgc='#1F883D' btnEvent={onAdd}/>
            </ButtonBox>
        </CardCodeReviewLayout>
    )
    }

export default CardCodeReview