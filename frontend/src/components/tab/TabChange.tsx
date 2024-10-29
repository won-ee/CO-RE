import React from 'react';
import { TabLayout, ContentBox } from './TabChange.styled';
import { TabsEnum } from '../../Types/TabsEnumType'; // Enum import

interface Props {
  values: TabsEnum[];
  selectedTab: TabsEnum;
  onTabChange: (tab: TabsEnum) => void;
}

const TabChange: React.FC<Props> = ({ values, selectedTab, onTabChange }) => {
  return (
    <TabLayout>
      {values.map((value, index) => (
        <ContentBox
          key={index}
          $ischoiced={selectedTab === value} // 선택된 탭인지 비교
          onClick={() => onTabChange(value)}
        >
          {value}
        </ContentBox>
      ))}
    </TabLayout>
  );
};

export default TabChange;
