import { StatsDataType } from "../../Types/dashboardType";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import statsDownIcon from "../../assets/DashboardStatsDown.png";
import statsUpIcon from "../../assets/DashboardStatsUp.png";
import CommitIcon from "../../assets/DashboardCommit.png";
import PRIcon from "../../assets/DashboardPR.png";
import CommentIcon from "../../assets/DashboardComment.png";
import HotFixIcon from "../../assets/DashboardHotFix.png";
import {
  StatTitle,
  StatValue,
  StatChangeLabel,
  StatIconWrapper,
  StatHeaderWrapper,
  CardBox,
  StyledSlider,
  Card,
} from "./MainStats.styled";

export default function MainStats({ data }: { data: StatsDataType }) {
  // console.log("Received data in MainStats:", data);
  const settings = {
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    centerPadding: "0px",
  };

  const statsItems = [
    {
      title: "Total Commit",
      value: data.totalCommit,
      weekly: data.commitGrowthRate,
      icon: CommitIcon,
    },
    {
      title: "Total Pull Request",
      value: data.totalPullRequest,
      weekly: data.pullRequestGrowthRate,
      icon: PRIcon,
    },
    {
      title: "Total Review",
      value: data.totalReview,
      weekly: data.reviewGrowthRate,
      icon: CommentIcon,
    },
    {
      title: "Total HotFix",
      value: data.totalHotfix,
      weekly: data.hotfixGrowthRate,
      icon: HotFixIcon,
    },
  ];

  return (
    <CardBox>
      <StyledSlider {...settings}>
        {statsItems.map((stat, index) => (
          <Card key={index} style={{ width: 285 }}>
            <StatHeaderWrapper>
              <StatTitle>{stat.title}</StatTitle>
              <StatIconWrapper>
                <img src={stat.icon} alt={`${stat.title} Icon`} />
              </StatIconWrapper>
            </StatHeaderWrapper>
            <StatValue>{stat.value.toLocaleString()}</StatValue>
            <StatChangeLabel $positive={stat.weekly >= 0}>
              <img
                src={stat.weekly >= 0 ? statsUpIcon : statsDownIcon}
                alt="Change Icon"
              />
              {Math.abs(stat.weekly).toLocaleString()}{" "}
              {stat.weekly >= 0 ? "Up" : "Down"} from past week
            </StatChangeLabel>
          </Card>
        ))}
      </StyledSlider>
    </CardBox>
  );
}
