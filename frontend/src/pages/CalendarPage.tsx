import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "./CalendarPage.css"
import { useQueryCalendarPR } from '../hooks/usePullRequestData';
import { CalendarPRParamsType } from '../Types/pullRequestType';
import { Block } from '../styles/GlobalStyled';
import { useNavigate } from 'react-router-dom';

const params: CalendarPRParamsType = {
  owner: 'JEM1224',
  repo: 'github-api',
  writer: 'JEM1224',
  month: 10,
  year: 2024,
};

const CalenderPage:React.FC = () => {
  const navigate = useNavigate(); 
  const { data, error, isLoading } = useQueryCalendarPR(params);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEventClick = (info:any) => {
    const pullRequestId = info.event.id;
    navigate(`/pullrequestdetail/${pullRequestId}`); 
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
  return (
    <div id='layout'>
      <div id="calendar-container">
          <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            height="auto"
            events={events}
            dayMaxEvents={3}
            eventClick={handleEventClick}
          />
      </div>
      <Block/>
    </div>
  );
}

export default CalenderPage;