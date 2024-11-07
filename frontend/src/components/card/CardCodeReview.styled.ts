import styled from "styled-components";

export const CardCodeReviewLayout = styled.div`
    display: flex;
    flex-direction: column;
    padding: 6px;
    border-top: 1px solid #e1e4e8;
    border-bottom: 1px solid #e1e4e8;
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