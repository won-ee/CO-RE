import styled from "styled-components";

export const ButtonReviewLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4880FF;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-weight: normal;
  text-align: center;
  cursor: pointer;
  align-self: flex-start;
  box-shadow: 0px 3px 6px rgba(37, 41, 46, 0.12);
  transition: transform 0.2s ease; /* 애니메이션 효과 추가 */

  &:hover {
    transform: scale(1.5); /* 10% 확대 */
    line-height: 30px;
  }
`