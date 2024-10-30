import React, { useState } from 'react'
import SectionEditProfile from '../components/section/SectionEditProfile';
import SectionProjectSetting from '../components/section/SectionProjectSetting';
import { ContainerLayout, Tab, TabMenu } from './SettingPage.styled';




const SettingPage:React.FC = () => {
  const myInfo = {
    profileImg:'https://i.pravatar.cc/150?img=21',
    name:'Charlene Reed ',
    nickName:'Charlene Reed ',
    email:'charlenereed@gmail.com ',
    password:'**********',
    birth:'25 January 1990',
    address:'San Jose, California, USA',
    githubToken:'45962'
  }
  const [activeTab, setActiveTab] = useState('editProfile');
  return (
    <ContainerLayout>
      <TabMenu>
        <Tab active={activeTab === 'editProfile'} onClick={() => setActiveTab('editProfile')}>
          Edit Profile
        </Tab>
        <Tab active={activeTab === 'projectSetting'} onClick={() => setActiveTab('projectSetting')}>
          Project Setting
        </Tab>
      </TabMenu>

      {activeTab === 'editProfile' ? <SectionEditProfile myInfo={myInfo}/> : <SectionProjectSetting/>}
    </ContainerLayout>  
    )
}

export default SettingPage