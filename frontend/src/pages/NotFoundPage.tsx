import React from 'react';
import './NotFoundPage.css';

const NotFoundPage:React.FC = () => {

  return (
    <div className="bg-purple">
      <div className="stars">
        <div className="custom-navbar">
        </div>
        <div className="central-body">
          <img className="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px" alt="404" />
          <a href="/dashboard" className="btn-go-home">GO BACK HOME</a>
        </div>
        <div className="objects">
          <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px" alt="rocket" />
          <div className="earth-moon">
            <img className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px" alt="earth" />
            <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" alt="moon" />
          </div>
          <div className="box_astronaut">
            <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px" alt="astronaut" />
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
    </div>
  );
};

export default NotFoundPage;
