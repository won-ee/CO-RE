import Slider from "react-slick";
import styled from "styled-components";

export const CardBox = styled.div`
  margin: 2% 2% 4% 2%;
  width: 95%;
`;

export const Card = styled.div`
  height: 160px;
  background-color: white;
  border-radius: 20px;
  margin: 0 10px; 
  padding: 20px;
  box-sizing: border-box; 
`;

export const StyledSlider = styled(Slider)`
  .slick-slide {
    margin: 0 10px; 
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    opacity: 0.5;
    color: gray;
  }
`;

export const StatTitle = styled.h4`
  font-size: 18px;
  margin: 0;
  line-height: 1.5;
`;

export const StatValue = styled.h2`
  font-size: 32px;
  margin: 10px 0;
  line-height: 1.2;
`;

interface StatChangeLabelProps {
  $positive: boolean;
}

export const StatChangeLabel = styled.span<StatChangeLabelProps>`
  font-size: 14px;
  color: ${(props) => (props.$positive ? "green" : "red")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  img {
    width: 16px;
    height: 16px;
    transform: translate(-2px);
  }
`;

export const StatIconWrapper = styled.div`
  img {
    width: 31px;
    height: 31px;
  }
`;

export const StatHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;