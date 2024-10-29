import { useState } from 'react';
import TabChange from '../components/tab/TabChange';
import { PullRequestPageLayout, HeaderLayout } from './PullRequestPage.styled';
import SectionPRReceivedList from '../components/section/SectionPRReceivedList';
import SectionPRSentList from '../components/section/SectionPRSentList';
import ButtonCreateNewPR from '../components/buttons/ButtonCreateNewPR';

enum TabsEnum {
  Sent = 'Sent',
  Received = 'Received',
}

function PullRequestPage() {
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(TabsEnum.Sent);

  // 탭 변경 핸들러: enum 값으로 변경
  const handleTabChange = (tab: TabsEnum) => {
    setSelectedTab(tab);
  };

  // 선택된 탭에 따라 컴포넌트를 렌더링
  const tabComponents = {
    [TabsEnum.Sent]: <SectionPRSentList />,
    [TabsEnum.Received]: <SectionPRReceivedList />,
  };

  return (
    <PullRequestPageLayout>
      {/* TabChange에 enum과 선택된 탭 전달 */}
      <HeaderLayout>
        <TabChange
          values={Object.values(TabsEnum)} 
          selectedTab={selectedTab} 
          onTabChange={handleTabChange} 
        />
        <ButtonCreateNewPR/>
      </HeaderLayout>
      {/* 선택된 탭에 따라 컴포넌트 렌더링 */}
      {tabComponents[selectedTab]}
    </PullRequestPageLayout>
  );
}

export default PullRequestPage;
