import React, { useState } from "react";
import {
  StatsCarouselLayout,
  StatCard,
  StatTitle,
  StatValue,
  StatChangeLabel,
  StatIconWrapper,
  CarouselContainer,
  CarouselNavButton,
} from "./MainStats.styled";

import statsDownIcon from "../../assets/DashboardStatsDown.png";
import statsUpIcon from "../../assets/DashboardStatsUp.png";
import CommentIcon from "../../assets/DashboardComment.png";
import CommitIcon from "../../assets/DashboardCommit.png";
import PRIcon from "../../assets/DashboardPR.png";
import IssueIcon from "../../assets/DashboardIssueIcon.png";
import HotFixIcon from "../../assets/DashboardHotFix.png";
import carouselButtonLeft from "../../assets/DashboardCarouselLeft.png";
import carouselButtonRight from "../../assets/DashboardCarouselRight.png";

const STATS_DATA = [
  {
    TITLE: "Total Commit",
    VALUE: "2,512",
    CHANGE: "8.5%",
    POSITIVE: true,
    ICON: CommitIcon,
  },
  {
    TITLE: "Total Comment",
    VALUE: "1,293",
    CHANGE: "1.3%",
    POSITIVE: true,
    ICON: CommentIcon,
  },
  {
    TITLE: "Total Issue",
    VALUE: "8,900",
    CHANGE: "4.3%",
    POSITIVE: false,
    ICON: IssueIcon,
  },
  {
    TITLE: "Total Pull Request",
    VALUE: "204",
    CHANGE: "1.8%",
    POSITIVE: true,
    ICON: PRIcon,
  },
  {
    TITLE: "Total HotFix",
    VALUE: "204",
    CHANGE: "1.8%",
    POSITIVE: true,
    ICON: HotFixIcon,
  },
];

const ITEMS_PER_PAGE = 4;

const MainStats: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = STATS_DATA.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1,
    );
  };

  const getVisibleStats = () => {
    const visibleStats = [];
    for (let i = 0; i < ITEMS_PER_PAGE; i++) {
      visibleStats.push(STATS_DATA[(currentIndex + i) % totalItems]);
    }
    return visibleStats;
  };

  return (
    <StatsCarouselLayout>
      <CarouselNavButton onClick={handlePrevious}>
        <img src={carouselButtonLeft} alt="Previous" />
      </CarouselNavButton>
      <CarouselContainer>
        {getVisibleStats().map((stat, index) => (
          <StatCard key={index}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <StatTitle>{stat.TITLE}</StatTitle>
              <StatIconWrapper>
                <img src={stat.ICON} alt={`${stat.TITLE} Icon`} />
              </StatIconWrapper>
            </div>
            <StatValue>{stat.VALUE}</StatValue>
            <StatChangeLabel $positive={stat.POSITIVE}>
              <img
                src={stat.POSITIVE ? statsUpIcon : statsDownIcon}
                alt={stat.POSITIVE ? "Up Icon" : "Down Icon"}
              />
              {stat.CHANGE} {stat.POSITIVE ? "Up" : "Down"} from past week
            </StatChangeLabel>
          </StatCard>
        ))}
      </CarouselContainer>
      <CarouselNavButton onClick={handleNext}>
        <img src={carouselButtonRight} alt="Next" />
      </CarouselNavButton>
    </StatsCarouselLayout>
  );
};

export default MainStats;
