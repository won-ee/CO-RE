import { ReviewType } from "../../Types/pullRequestType";
import { CardCodeReviewReadLayout, CardCodeReviewReadBox } from "./CardCodeReviewRead.styled";

interface CardCodeReviewReadProps{
    key:number;
    review: ReviewType
}

function CardCodeReviewRead({review}:CardCodeReviewReadProps) {
  return (
    <CardCodeReviewReadLayout>
      <CardCodeReviewReadBox>
        {review.body}
      </CardCodeReviewReadBox>
    </CardCodeReviewReadLayout>
  )
}

export default CardCodeReviewRead