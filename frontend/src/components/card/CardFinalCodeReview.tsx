import { useState, ChangeEvent } from "react";
import { CardCodeReviewLayout, ReviewTextArea, ButtonBox, PendingSpan } from "./CardFinalCodeReview.styled"
import ButtonSimpleSquare from "../buttons/ButtonSimpleSquare"

interface CardCodeReviewProps {
    onAdd: (content: string) => void; // 리뷰 내용을 부모에 전달하는 콜백
    commentNums :number;
  }
  
  function CardFinalCodeReview({ onAdd, commentNums }: CardCodeReviewProps) {
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
            <ReviewTextArea placeholder="Type your Final Comment..." onChange={handleContentChange} value={content}/>
            <ButtonBox>
              <PendingSpan>
                {commentNums} pending comment
              </PendingSpan>
              <ButtonSimpleSquare text='Submit Review' color='white' bgc='#1F883D' btnEvent={handleAddReview}/>
            </ButtonBox>
        </CardCodeReviewLayout>
    )
    }

export default CardFinalCodeReview