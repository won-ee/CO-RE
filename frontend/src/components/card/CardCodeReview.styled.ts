import styled from "styled-components";

interface CardCodeReviewLayoutProps{
    isAbsolute? : boolean
}

export const CardCodeReviewLayout = styled.div<CardCodeReviewLayoutProps>`
    display: flex;
    flex-direction: column;
    padding: 6px;
    border-top: 1px solid #e1e4e8;
    border-bottom: 1px solid #e1e4e8;
    ${({ isAbsolute }) => isAbsolute && `
        position: absolute;
        top:100%
        left: 0;
        right: 0;
        z-index: 10; /* 다른 요소 위에 표시 */
        background-color: white; /* 배경색 추가하여 다른 요소와 구분 */
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  `}
`
export const ReviewTextArea = styled.textarea`
    font-family: 'Pretendard';
    resize: vertical;
    height: 100px;
    padding: 10px;
    border-radius: 10px;
    &:focus {
    outline: none; /* 기본 outline 제거 */
    box-shadow: 0 0 0 1px #0969DA;
  }
`
export const ButtonBox = styled.div`
    display: flex;
    gap: 6px;
    justify-content: end;
    margin-top: 6px;
`