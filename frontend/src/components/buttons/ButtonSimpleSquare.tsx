import { ButtonSimpleSquareLayout } from "./ButtonSimpleSquare.styled";

interface Props{
  text:string;
  color:string;
  bgc:string;
  btnEvent:() => void;
}

function ButtonSimpleSquare({ text,color,bgc,btnEvent }: Props) {
  return (
    <ButtonSimpleSquareLayout color={color} bgc={bgc} onClick={()=>btnEvent()}>
      {text} {/* 전달된 text prop을 사용하여 표시 */}
    </ButtonSimpleSquareLayout>
  );
}

export default ButtonSimpleSquare