import React from "react";
import {
  StatsContainer,
  StatBox,
  Title,
  Value,
  Change,
} from "./MainStats.styled";

const STATS_DATA = [
  { TITLE: "Total Commit", VALUE: "2,512", CHANGE: "8.5%", POSITIVE: true },
  { TITLE: "Total Comment", VALUE: "1,293", CHANGE: "1.3%", POSITIVE: true },
  { TITLE: "Total Issue", VALUE: "8,900", CHANGE: "4.3%", POSITIVE: false },
  { TITLE: "Total Pull Request", VALUE: "204", CHANGE: "1.8%", POSITIVE: true },
];

const MainStats: React.FC = () => (
  <StatsContainer>
    {STATS_DATA.map((stat, index) => (
      <StatBox key={index}>
        <Title>{stat.TITLE}</Title>
        <Value>{stat.VALUE}</Value>
        <Change $positive={stat.POSITIVE}>
          {stat.CHANGE} {stat.POSITIVE ? "Up" : "Down"} from past week
        </Change>
      </StatBox>
    ))}
  </StatsContainer>
);

export default MainStats;
