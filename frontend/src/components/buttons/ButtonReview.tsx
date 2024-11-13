import { ButtonReviewLayout } from "./ButtonReview.styled";

interface ButtonReviewProps{
  btnEvent:() => void;
}

function ButtonReview({ btnEvent }: ButtonReviewProps) {
  return (
    <ButtonReviewLayout onClick={()=>btnEvent()}>
      +
    </ButtonReviewLayout>
  );
}

export default ButtonReview