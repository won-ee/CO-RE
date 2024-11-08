import { useState, ChangeEvent } from "react";
import { CardCodeReviewLayout, ReviewTextArea, ButtonBox } from "./CardCodeReview.styled"
import ButtonSimpleSquare from "../buttons/ButtonSimpleSquare"

interface CardCodeReviewProps {
    onCancel: () => void;
  }

const handleCreate = ()=>{
    console.log('add');
}

function CardCodeReview({onCancel} : CardCodeReviewProps) {
    const [content, setContent] = useState<string>('')

    const handleContent = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        setContent(e.target.value)
      }

    return (
        <CardCodeReviewLayout>
            <ReviewTextArea placeholder="Type your Review..." onChange={handleContent} value={content}/>
            <ButtonBox>
                <ButtonSimpleSquare text='Cancle' color='black' bgc='#EFF2F5' btnEvent={onCancel}/>
                <ButtonSimpleSquare text='Add Review' color='white' bgc='#1F883D' btnEvent={handleCreate}/>
            </ButtonBox>
        </CardCodeReviewLayout>
    )
    }

export default CardCodeReview