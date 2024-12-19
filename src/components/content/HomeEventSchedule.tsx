import React, { useState } from "react";

interface Speaker {
  name: string;
  image: string;
}

interface Event {
  time: string;
  title: string;
  description: string;
  speaker?: Speaker;
}

interface DaySchedule {
  day: string;
  events: Event[];
}

interface HomeEventScheduleProps {
  scheduleData: DaySchedule[];
}

const HomeEventSchedule: React.FC<HomeEventScheduleProps> = ({ scheduleData }) => {
  const [activeDay, setActiveDay] = useState<string>(scheduleData[0]?.day || ""); 

  const handleTabClick = (day: string) => {
    setActiveDay(day);
  };

  return (
    <section id="schedule" className="section-with-bg">
      <div className="container">
        <div className="section-header">
          <h2>Event Schedule</h2>
          <p>Here is our event schedule</p>
        </div>

        <ul className="nav nav-tabs" role="tablist">
          {scheduleData.map((dayData) => (
            <li className="nav-item" key={dayData.day}>
              <a
                className={`nav-link mx-1 ${activeDay === dayData.day ? "active" : ""}`}
                onClick={() => handleTabClick(dayData.day)}
              >
                {dayData.day}
              </a>
            </li>
          ))}
        </ul>

        <h3 className="sub-heading">
          Check out the agenda for each day to stay up-to-date with the event schedule.
        </h3>

        <div className="tab-content row justify-content-center">
          {scheduleData
            .filter((dayData) => dayData.day === activeDay)
            .map((dayData) => (
              <div key={dayData.day} className="col-lg-9 tab-pane fade show active">
                {dayData.events.map((event, index) => (
                  <div className="row schedule-item" key={index}>
                    <div className="col-md-2">
                      <time>{event.time}</time>
                    </div>
                    <div className="col-md-10">
                      {event.speaker && (
                        <div className="speaker">
                          <img src={event.speaker.image} alt={event.speaker.name} />
                        </div>
                      )}
                      <h4>
                        {event.title}{" "}
                        {event.speaker && <span>{event.speaker.name}</span>}
                      </h4>
                      <p>{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeEventSchedule;
