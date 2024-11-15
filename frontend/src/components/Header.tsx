import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { HeaderLayout } from '../App.Styled';
import { useQueryUserInfo } from '../hooks/useUser';
import { useProjectStore } from '../store/userStore';
import { OptionType } from '../Types/userType';


const customStyles: StylesConfig<OptionType, false> = {
    control: (provided) => ({
      ...provided,
      minWidth: '244px',
      height: '40px',
      backgroundColor: 'white',
      borderColor: 'black',
      borderRadius: '8px',
      paddingLeft: '10px',
      boxShadow: 'none',
      fontSize: '18px',
      fontWeight: 'normal',
      '&:hover': {
        borderColor: 'black',
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      marginTop: '5px',
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '18px',
      fontWeight: 'normal',
      backgroundColor: state.isSelected ? 'lightgreen' : 'white',
      '&:hover': {
        backgroundColor: 'lightgray',
      },
      padding: '10px 20px',
    }),
  };
  
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

  if (secondSlashIndex !== -1) {
    result = str.slice(firstSlashIndex + 1, secondSlashIndex);
  } else {
    result = str.slice(firstSlashIndex + 1);
  }

  if (!page.includes(result)) {
    return 'Error';
  }
  if (result === 'project') {
    return '프로젝트를 선택해';
  }

  if (result === 'pullrequest') {
    return 'Pull Request';
  }

  return result.charAt(0).toUpperCase() + result.slice(1);
};

const Header: React.FC = () => {
  const location = useLocation();
  const [tempOption, setTempOption] = useState<OptionType[]>([]); 
  const { data: userInfo } = useQueryUserInfo(); 
  const { setSelectedOwner, setSelectedPRepo } = useProjectStore();
  const [selectedOp, setSelectedOp] = useState<SingleValue<OptionType | null>>(null); 
    
  useEffect(() => {
    if (userInfo && userInfo.projects) {
      const tempOption = userInfo.projects.map((project) => ({
        value: project.name,
        label: project.name,
        githubOwner: project.githubOwner,
        githubRepo: project.githubRepo,
      }));
      setTempOption(tempOption);

      if (tempOption.length > 0 && !selectedOp) {
        setSelectedOp(tempOption[0]);
        setSelectedOwner(tempOption[0].githubOwner);
        setSelectedPRepo(tempOption[0].githubRepo);
      }
    }
  }, [userInfo]);

  const handleChange = (option: SingleValue<OptionType | null>) => {
    setSelectedOp(option);
    if (option) {
      console.log(option);
      
      setSelectedOwner(option.githubOwner);
      setSelectedPRepo(option.githubRepo);
    }
  };

  return (
    <>
      <HeaderLayout>
        {ParseHeader(location.pathname)}
        <Select
          styles={customStyles} 
          value={selectedOp}
          onChange={handleChange}
          options={tempOption}
        />
      </HeaderLayout>
    </>
  );
};

export default Header;
