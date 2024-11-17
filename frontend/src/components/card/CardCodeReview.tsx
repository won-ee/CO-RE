import { useState, ChangeEvent } from "react";
import { CardCodeReviewLayout, ReviewTextArea, ButtonBox } from "./CardCodeReview.styled"
import ButtonSimpleSquare from "../buttons/ButtonSimpleSquare"

interface CardCodeReviewProps {
    onCancel?: () => void;
    onAdd: (content: string) => void; // 리뷰 내용을 부모에 전달하는 콜백
  }
  
  function CardCodeReview({ onCancel, onAdd }: CardCodeReviewProps) {
    const [content, setContent] = useState<string>(""); // content를 자식 컴포넌트 상태로 관리
  
    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    };
  
    const handleAddReview = () => {
      onAdd(content); // 부모에 content 전달
      setContent(""); // content 초기화
    };

    return (
        <CardCodeReviewLayout>
            <ReviewTextArea placeholder="Type your Review..." onChange={handleContentChange} value={content}/>
            <ButtonBox>
                {onCancel && <ButtonSimpleSquare $text='Cancle' $color='black' $bgc='#EFF2F5' btnEvent={onCancel}/>}
                <ButtonSimpleSquare $text='Add Review' $color='white' $bgc='#1F883D' btnEvent={handleAddReview}/>
            </ButtonBox>
        </CardCodeReviewLayout>
    )
    }

export default CardCodeReview