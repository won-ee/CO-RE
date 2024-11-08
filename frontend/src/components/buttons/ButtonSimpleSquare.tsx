import { ButtonSimpleSquareLayout } from "./ButtonSimpleSquare.styled";

interface ButtonSimpleSquareProps{
  text:string;
  color:string;
  bgc:string;
  btnEvent:() => void;
}

function ButtonSimpleSquare({ text,color,bgc,btnEvent }: ButtonSimpleSquareProps) {
  return (
    <ButtonSimpleSquareLayout color={color} bgc={bgc} onClick={()=>btnEvent()}>
      {text} {/* 전달된 text prop을 사용하여 표시 */}
    </ButtonSimpleSquareLayout>
  );
}

export default ButtonSimpleSquare