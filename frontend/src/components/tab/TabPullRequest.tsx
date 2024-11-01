import React,{ Dispatch, SetStateAction } from 'react'
import { TabLayout, TabBox, TabButton } from './TabPullRequest.styled'

interface TabPullRequestProps{
    isSeleted: string; 
    setIsSeleted: Dispatch<SetStateAction<string>>;
}

const TabPullRequest:React.FC<TabPullRequestProps> = ({isSeleted, setIsSeleted}) => {
    
  return (
    <>
        <TabLayout>
            <TabBox>
                <TabButton $isSeleted={isSeleted==='Overview'} onClick={()=>setIsSeleted('Overview')}>Overview</TabButton>
                <TabButton $isSeleted={isSeleted==='Commits'} onClick={()=>setIsSeleted('Commits')}>Commits</TabButton>
                <TabButton $isSeleted={isSeleted==='Changes'} onClick={()=>setIsSeleted('Changes')}>Changes</TabButton>
            </TabBox>
        </TabLayout>
    </>
    )
}

export default TabPullRequest