import React, { useState } from 'react'
import SectionEditProfile from '../components/section/SectionEditProfile';
import SectionProjectSetting from '../components/section/SectionProjectSetting';
import { ContainerLayout, Tab, TabMenu } from './SettingPage.styled';

const SettingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('editProfile');

  return (
    <ContainerLayout>
      <TabMenu>
        <Tab $active={activeTab === 'editProfile'} onClick={() => setActiveTab('editProfile')}>
          Edit Profile
        </Tab>
        <Tab $active={activeTab === 'projectSetting'} onClick={() => setActiveTab('projectSetting')}>
          Project Setting
        </Tab>
      </TabMenu>

      {activeTab === 'editProfile' ? <SectionEditProfile /> : <SectionProjectSetting />}
    </ContainerLayout>
  );
};

export default SettingPage;