import { MainLogo, SidebarLayout } from "../styles/sidebarSyles"
import ButtonSidebar from "./buttons/button_sidebar"

import Logo from '../assets/logo.png'
// import Icon_calender from '../assets/icon_calender.png'
import Icon_dashboard from '../assets/icon_dashboard.png'
// import Icon_history from '../assets/icon_history.png'
// import Icon_issue from '../assets/icon_issue.png'
// import Icon_member from '../assets/icon_member.png'
// import Icon_pr from '../assets/icon_pr.png'
// import Icon_logout from '../assets/icon_logout.png'
// import Icon_setting from '../assets/icon_setting.png'

function Sidebar() {
  return (
    <SidebarLayout>
        <MainLogo src={Logo} alt="로고" />
        <ButtonSidebar img={Icon_dashboard} name='dashboard'/>
    </SidebarLayout>
  )
}

export default Sidebar