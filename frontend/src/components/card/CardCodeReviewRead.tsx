import { ReviewType } from "../../Types/pullRequestType";

import { CardCodeReviewReadLayout, CardCodeReviewReadBox, ContentBox, NameBox, NameSpan, BodyBox, UserImg } from "./CardCodeReviewRead.styled";
import { PRDataReviewType } from "../../Types/pullRequestType";

interface CardCodeReviewReadProps{
    key:number;
    review: ReviewType
    reviewData : PRDataReviewType[]
}

function CardCodeReviewRead({review,reviewData}:CardCodeReviewReadProps) {
  const matchedData = reviewData.find((data) =>
    data.reviews.some(
      (item) =>
        item.path === review.path &&
        item.line === review.line &&
        item.body === review.body
    )
  );

  const writerId = matchedData?.writer.writerId || "Unknown Writer";
  const writerImg = matchedData?.writer.writerImg || "/default-image.jpg"; // 기본 이미지 처리

  return (
    <CardCodeReviewReadLayout>
      <CardCodeReviewReadBox>
        <UserImg src={writerImg}/>
        <ContentBox>
          <NameBox>
            <NameSpan>{writerId}</NameSpan>
            {/* <HourSpan>Hour</HourSpan> */}
          </NameBox>
          <BodyBox>
          {review.body}
          </BodyBox>
        </ContentBox>
      </CardCodeReviewReadBox>
    </CardCodeReviewReadLayout>
  )
}

export default CardCodeReviewRead