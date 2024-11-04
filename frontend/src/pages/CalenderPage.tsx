import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "./CalenderPage.css"
import { usePullRequestData } from '../hooks/usePullRequestData';
import { PullRequestParams } from '../Types/pullRequestType';

const CalenderPage:React.FC = () => {
  const params: PullRequestParams = {
    owner: 'SSAFY',
    repo: 'CORE',
    writer: 'jmeve24',
    month: 10,
    year: 2024,
  };

  const { data, error, isLoading } = usePullRequestData(params);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
      title: item.title.length >= 6 ? item.title.slice(0, 7) + "..." : item.title,
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
            />
      </div>
    </div>
  );
}

export default CalenderPage;