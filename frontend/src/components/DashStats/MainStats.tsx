import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import statsDownIcon from "../../assets/DashboardStatsDown.png";
import statsUpIcon from "../../assets/DashboardStatsUp.png";
import CommentIcon from "../../assets/DashboardComment.png";
import CommitIcon from "../../assets/DashboardCommit.png";
import PRIcon from "../../assets/DashboardPR.png";
import IssueIcon from "../../assets/DashboardIssueIcon.png";
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

const STATS_DATA = [
  {
    id: 1,
    TITLE: "Total Commit",
    VALUE: "2,512",
    CHANGE: "8.5%",
    POSITIVE: true,
    ICON: CommitIcon,
  },
  {
    id: 2,
    TITLE: "Total Comment",
    VALUE: "1,293",
    CHANGE: "1.3%",
    POSITIVE: true,
    ICON: CommentIcon,
  },
  {
    id: 3,
    TITLE: "Total Issue",
    VALUE: "8,900",
    CHANGE: "4.3%",
    POSITIVE: false,
    ICON: IssueIcon,
  },
  {
    id: 4,
    TITLE: "Total Pull Request",
    VALUE: "204",
    CHANGE: "1.8%",
    POSITIVE: true,
    ICON: PRIcon,
  },
  {
    id: 5,
    TITLE: "Total HotFix",
    VALUE: "204",
    CHANGE: "1.8%",
    POSITIVE: true,
    ICON: HotFixIcon,
  },
];

export default function SimpleSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true, 
    centerPadding: '0px',
  };

  return (
    <CardBox>
      <StyledSlider {...settings}>
        {STATS_DATA.map((stat) => (
          <Card key={stat.id} style={{ width: 285}}>
            <StatHeaderWrapper>
              <StatTitle>{stat.TITLE}</StatTitle>
              <StatIconWrapper>
                <img src={stat.ICON} alt={`${stat.TITLE} Icon`} />
              </StatIconWrapper>
            </StatHeaderWrapper>
            <StatValue>{stat.VALUE}</StatValue>
            <StatChangeLabel $positive={stat.POSITIVE}>
              <img
                src={stat.POSITIVE ? statsUpIcon : statsDownIcon}
                alt={stat.POSITIVE ? "Up Icon" : "Down Icon"}
              />
              {stat.CHANGE} {stat.POSITIVE ? "Up" : "Down"} from past week
            </StatChangeLabel>
          </Card>
        ))}
      </StyledSlider>
    </CardBox>
  );
}
