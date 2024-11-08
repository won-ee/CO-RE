import { ReviewType } from "../../Types/pullRequestType";

interface CardCodeReviewReadProps{
    key:number;
    review: ReviewType
}

function CardCodeReviewRead({review}:CardCodeReviewReadProps) {
  return (
    <>
    {review.body}
    </>
  )
}

export default CardCodeReviewRead