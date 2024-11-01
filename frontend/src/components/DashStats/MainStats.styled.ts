import styled from "styled-components";

export const StatsCarouselLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
`;

export const CarouselContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 15px;
  padding: 10px 10px;
  width: 90%;
  transition: transform 0.5s ease;
`;

export const StatCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  width: calc(25% - 15px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 130px;
  gap: 10px;
  transition: transform 0.2s;
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

export const CarouselNavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;

  img {
    width: 20px;
    height: 20px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StatHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
