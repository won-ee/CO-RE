import { ButtonReviewLayout } from "./ButtonReview.styled";

interface Props{
  btnEvent:() => void;
}

function ButtonReview({ btnEvent }: Props) {
  return (
    <ButtonReviewLayout onClick={()=>btnEvent()}>
      +
    </ButtonReviewLayout>
  );
}

export default ButtonReview