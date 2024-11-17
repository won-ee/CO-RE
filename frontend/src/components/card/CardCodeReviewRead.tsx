import { ReviewType } from "../../Types/pullRequestType";
import {useUserStore} from "../../store/userStore";
import { CardCodeReviewReadLayout, CardCodeReviewReadBox, ContentBox, NameBox, NameSpan, BodyBox, UserImg } from "./CardCodeReviewRead.styled";


interface CardCodeReviewReadProps{
    key:number;
    review: ReviewType
}

function CardCodeReviewRead({review}:CardCodeReviewReadProps) {
  const userInfo = useUserStore((state)=>state.userInfo)
  return (
    <CardCodeReviewReadLayout>
      <CardCodeReviewReadBox>
        <UserImg src={userInfo?.userInfo.image}/>
        <ContentBox>
          <NameBox>
            <NameSpan>{userInfo?.userInfo.name}</NameSpan>
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