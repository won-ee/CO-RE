import { MainLogo, SidebarLayout, ButtonLayout,ButtonBottomGroup,Divider } from "../styles/sidebarSyles"
import { useLocation } from "react-router-dom"
import ButtonSidebar from "./buttons/button_sidebar"

import Logo from '../assets/logo.png'
import Icon_calender from '../assets/icon_calender.png'
import Icon_dashboard from '../assets/icon_dashboard.png'
import Icon_history from '../assets/icon_history.png'
import Icon_issue from '../assets/icon_issue.png'
import Icon_member from '../assets/icon_member.png'
import Icon_pr from '../assets/icon_pr.png'
import Icon_logout from '../assets/icon_logout.png'
import Icon_setting from '../assets/icon_setting.png'

function Sidebar() {
  const location = useLocation()
  return (
    <SidebarLayout>
        <MainLogo src={Logo} alt="로고" />
        <ButtonLayout>
          <ButtonSidebar img={Icon_dashboard} name='Dashboard' ischoiced={location.pathname === "/dashboard"} path="/dashboard"/>
          <ButtonSidebar img={Icon_pr} name='Pull Request' ischoiced={location.pathname === "/pullrequest"} path="/pullrequest"/>
          <ButtonSidebar img={Icon_issue} name='Issue' ischoiced={location.pathname === "/issue"} path="/issue"/>
          <ButtonSidebar img={Icon_history} name='History' ischoiced={location.pathname === "/history"} path="/history"/>
          <ButtonSidebar img={Icon_calender} name='Calender' ischoiced={location.pathname === "/calender"} path="/calender"/>
          <ButtonSidebar img={Icon_member} name='Member' ischoiced={location.pathname === "/member"} path="/member"/>
          <ButtonBottomGroup>
          <Divider />
            <ButtonSidebar img={Icon_setting} name='Setting' ischoiced={location.pathname === "/setting"} path="/setting"/>
            <ButtonSidebar img={Icon_logout} name='Logout' ischoiced={false} path="/logout"/>
          </ButtonBottomGroup>
        </ButtonLayout>
    </SidebarLayout>
  )
}

export default Sidebar