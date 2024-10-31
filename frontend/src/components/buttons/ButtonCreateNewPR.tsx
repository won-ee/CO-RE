import { ButtonCreateNewPRLayout } from './ButtonCreateNewPR.Styled'

interface Props{
  text:string;
  btnEvent:() => void;
}

function ButtonCreateNewPR({ text,btnEvent }: Props) {
  return (
    <ButtonCreateNewPRLayout onClick={()=>btnEvent()}>
      {text} {/* 전달된 text prop을 사용하여 표시 */}
    </ButtonCreateNewPRLayout>
  );
}

export default ButtonCreateNewPR