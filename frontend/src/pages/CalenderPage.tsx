import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "./CalenderPage.css"

const CalenderPage:React.FC = () => {

  return (
    <div id='layout'>
      <div id="calendar-container">
          <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            height="auto"
            headerToolbar={{
              start: "prev next",
              center: "title",
              end: "dayGridMonth dayGridWeek",
            }}
            events={[
              { title: 'Event 1', date: '2024-06-01' },
              { title: 'Event 2', date: '2024-06-07' },
            ]}
            />
      </div>
    </div>
  );
}

export default CalenderPage;