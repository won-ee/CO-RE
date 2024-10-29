import React from 'react'
import { ButtonCreateNewPRLayout } from './ButtonCreateNewPR.Styled'

interface Props{
  text:string;
}

function ButtonCreateNewPR({ text }: Props) {
  return (
    <ButtonCreateNewPRLayout>
      {text} {/* 전달된 text prop을 사용하여 표시 */}
    </ButtonCreateNewPRLayout>
  );
}

export default ButtonCreateNewPR