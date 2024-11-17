import React, { useEffect } from 'react';
import './NotFoundPage.css';
import { Background, ErrorText, NotFoundText, TextBox } from './NotFoundPage.styled';
import { useProjectStore, useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

interface NotFoundPageProps {
  errorNumber: number;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ errorNumber }) => {
  const { selectedOwner, selectedRepo, selectedOwnerId } = useProjectStore();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  useEffect(() => {
    if (selectedOwner&&selectedRepo) {      
      navigate("/dashboard");
    }else{
      if (userInfo?.userInfo.accountId === selectedOwnerId){
        navigate("/project");
      }
    }}, [selectedOwner,selectedRepo,userInfo,selectedOwnerId]);

  return (
    <Background $errorNumber={errorNumber}>
      <div className="stars">
        <div className="custom-navbar"></div>
        <TextBox $errorNumber={errorNumber}>
          <NotFoundText>{errorNumber}</NotFoundText>
          <ErrorText>ERROR</ErrorText>
          <a href="/dashboard" className="btn-go-home">GO BACK HOME</a>
        </TextBox>
        <div className="objects">
          <img
            className="object_rocket"
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
            alt="rocket"
          />
          <div className="earth-moon">
            <img
              className="object_earth"
              src="http://salehriaz.com/404Page/img/earth.svg"
              width="100px"
              alt="earth"
            />
            <img
              className="object_moon"
              src="http://salehriaz.com/404Page/img/moon.svg"
              width="80px"
              alt="moon"
            />
          </div>
          <div className="box_astronaut">
            <img
              className="object_astronaut"
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              width="140px"
              alt="astronaut"
            />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </Background>
  );
};

export default NotFoundPage;
