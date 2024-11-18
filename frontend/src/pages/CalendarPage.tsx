import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "./CalendarPage.css"
import { useQueryCalendarPR } from '../hooks/usePullRequestData';
import { CalendarPRParamsType } from '../Types/pullRequestType';
import { useProjectStore, useUserStore } from '../store/userStore';
import LoadingPage from './LoadingPage';
import NotFoundPage from './NotFoundPage';
import { useNavigate } from 'react-router-dom';
import { Block } from '../styles/GlobalStyled';

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();  
  const { selectedOwner, selectedRepo } = useProjectStore();
  const { userInfo } = useUserStore();
    const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const params: CalendarPRParamsType = {
    owner: selectedOwner,
    repo: selectedRepo,
    writer: userInfo?.userInfo.gitName || '',
    month: currentMonth,
    year: currentYear,
  };

  // API 호출
  const { data, error, isLoading } = useQueryCalendarPR(params);

  // 로딩 중 또는 에러 상태 처리
  if (isLoading) return <LoadingPage />;
  if (error) {
    return <NotFoundPage errorNumber={404} />;
  }

  const handleEventClick = (info: any) => {
    const pullRequestId = info.event.id;
    navigate(`/pullrequest/${pullRequestId}`); 
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const events = data ? data.map((item) => {
    const randomColor = getRandomColor(); 
    
    return {
      id: item.pullRequestId.toString(),
      title: item.title,
      start: item.deadline.split("T")[0],
      backgroundColor: randomColor, 
      borderColor: randomColor, 
    };
  }) : [];

  const handleDatesSet = (info: any) => {
    const newMonth = info.view.currentStart.getMonth() + 1;
    const newYear = info.view.currentStart.getFullYear();

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <div id="layout">
      <div id="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height="auto"
          events={events}
          dayMaxEvents={3}
          eventClick={handleEventClick}
          datesSet={handleDatesSet} 
        />
      </div>
      <Block />
    </div>
  );
};

export default CalendarPage;
