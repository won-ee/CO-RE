import {
  MainLogo,
  SidebarLayout,
  ButtonLayout,
  ButtonBottomGroup,
  Divider,
} from "./Sidebar.Styled.ts";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonSidebar from "./buttons/ButtonSidebar.tsx";

import Logo from "../assets/logo.png";
import Icon_calender from "../assets/icon_calender.png";
import Icon_dashboard from "../assets/icon_dashboard.png";
import Icon_history from "../assets/icon_history.png";
import Icon_issue from "../assets/icon_issue.png";
import Icon_member from "../assets/icon_member.png";
import Icon_pr from "../assets/icon_pr.png";
import Icon_logout from "../assets/icon_logout.png";
import Icon_setting from "../assets/icon_setting.png";
import { useProjectStore, useUserStore } from "../store/userStore.ts";
import { useEffect } from "react";

function Sidebar() {
  const { logout,userInfo } = useUserStore();
  const { selectedOwner, selectedRepo,selectedOwnerId } = useProjectStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!selectedOwner||!selectedRepo) {
      console.log(userInfo?.userInfo.accountId);
      console.log(selectedOwnerId);
      
      if (userInfo?.userInfo.accountId === selectedOwnerId){
        navigate("/project");
      }else{
        navigate("/403ERROR");
      }
  }}, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <SidebarLayout>
        <MainLogo src={Logo} alt="로고" />
        <ButtonLayout>
          <ButtonSidebar
            img={Icon_dashboard}
            name="Dashboard"
            ischoiced={location.pathname.includes("dashboard")}
            path="/dashboard"
          />
          <ButtonSidebar
            img={Icon_pr}
            name="Pull Request"
            ischoiced={location.pathname.includes("pullrequest")}
            path="/pullrequest"
          />
          <ButtonSidebar
            img={Icon_issue}
            name="Issue"
            ischoiced={location.pathname.includes("issue")}
            path="/issue"
          />
          <ButtonSidebar
            img={Icon_history}
            name="History"
            ischoiced={location.pathname.includes("history")}
            path="/history"
          />
          <ButtonSidebar
            img={Icon_calender}
            name="calendar"
            ischoiced={location.pathname.includes("calendar")}
            path="/calendar"
          />
          <ButtonSidebar
            img={Icon_member}
            name="Member"
            ischoiced={location.pathname.includes("member")}
            path="/member"
          />
          <ButtonBottomGroup>
            <Divider />
            <ButtonSidebar
              img={Icon_setting}
              name="Setting"
              ischoiced={location.pathname.includes("setting")}
              path="/setting"
            />
            <ButtonSidebar
              img={Icon_logout}
              name="Logout"
              ischoiced={false}
              path="/logout"
              onClick={handleLogout}
            />
          </ButtonBottomGroup>
        </ButtonLayout>
      </SidebarLayout>
    </>
  );
}

export default Sidebar;
