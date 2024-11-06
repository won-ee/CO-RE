import { TabLayout, ContentBox } from './TabChange.styled';


interface Props<T extends string | number> {
  values: T[];
  selectedTab: T;
  onTabChange: (tab: T) => void;
}

function TabChange<T extends string | number>({ values, selectedTab, onTabChange }: Props<T>) {
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
}

export default TabChange;