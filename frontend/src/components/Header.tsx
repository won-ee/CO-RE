import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Select,{SingleValue} from "react-select"
import { OptionType } from '../Types/SelectType';
import { ChoiceStyles, HeaderLayout } from '../App.Styled';
import { useQueryUserInfo } from '../hooks/useUser';

const page = [
    '',
    'dashboard',
    'pullrequest',
    'pullrequest',
    'issue',
    'history',
    'calendar',
    'member',
    'setting',
    'pullrequest',
    'privacy',
];

const ParseHeader = (str: string) => {
    if (!str) return;

    const firstSlashIndex = str.indexOf('/');
    const secondSlashIndex = str.indexOf('/', firstSlashIndex + 1);
    let result = '';
    
    // 두 번째 '/'가 있을 때 첫 번째 '/'와 두 번째 '/' 사이의 문자열 반환
    if (secondSlashIndex !== -1) {
        result = str.slice(firstSlashIndex + 1, secondSlashIndex);
    } else { 
        // 두 번째 '/'가 없을 때 첫 번째 '/' 이후의 문자열 전체 반환
        result = str.slice(firstSlashIndex + 1);
    }
    
    // 페이지 배열에 없는 경우 'Error' 반환
    if (!page.includes(result)) {
        return 'Error';
    }
    if (result === 'project') {
        return '프로젝트를 선택해 주세요';
    }

    if (result === 'pullrequest') {
        return 'Pull Request';
    }

    return result.charAt(0).toUpperCase() + result.slice(1);
};


const Header:React.FC = () => {
    const location = useLocation()
    const [selectedOp,setSelectedOp] = useState<SingleValue<OptionType>>(null);
    const [tempOption,setTempOption] = useState<{ value: string; label: string; }[]>();
    const { data: userInfo } = useQueryUserInfo();
    console.log(userInfo);
    
    useEffect(() => {
        if (userInfo && userInfo.projects) {
          const tempOption = userInfo.projects.map((project) => ({
            value: project.name,
            label: project.name,
          }));
          setTempOption(tempOption);
        }
      }, [userInfo]); 
    
  const handleChange = (option: SingleValue<OptionType>)=>{
    setSelectedOp(option)
  }
    return (
        <>
        <HeaderLayout>
            {ParseHeader(location.pathname)}
            <Select
            styles={ChoiceStyles}
            value={selectedOp}
            onChange={handleChange}
            options={tempOption}
            />
        </HeaderLayout>
        </>
    )
}

export default Header