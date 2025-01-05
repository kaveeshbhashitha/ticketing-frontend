import React, { useState, useEffect } from "react";
import { getEventsInThisMonth, getEventsInThisWeek, getEventsInThisYear } from "../../service/EventService";
import { Event } from "../../interfaces/Event";

interface DaySchedule {
  day: string;
  events: Event[];
}

const HomeEventSchedule: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<DaySchedule[]>([]);
  const [activeDay, setActiveDay] = useState<string>("This Week");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [weekEvents, monthEvents, yearEvents] = await Promise.all([
          getEventsInThisWeek(),
          getEventsInThisMonth(),
          getEventsInThisYear(),
        ]);

        const formattedScheduleData: DaySchedule[] = [
          { day: "This Week", events: weekEvents },
          { day: "This Month", events: monthEvents },
          { day: "This Year", events: yearEvents },
        ];

        setScheduleData(formattedScheduleData);
        setActiveDay("This Week"); // Default to "This Week"
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvents();
  }, []);

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
            <li className="nav-item mx-1" key={dayData.day}>
              <a
                className={`nav-link ${activeDay === dayData.day ? "active" : ""}`}
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
                  <div className="row schedule-item" key={event.eventId || index}>
                    <div className="col-md-2">
                      <time>
                        {`${event.startTime} - ${event.endTime}`} <br />
                        {new Date(event.eventDate).toDateString()}
                      </time>
                    </div>
                    <div className="col-md-10">
                      {event.imageData && (
                        <div className="speaker">
                          <img
                            src={`data:${event.contentType};base64,${event.imageData}`}
                            alt={event.eventName}
                          />
                        </div>
                      )}
                      <h4>
                        {event.eventName} <span>({event.eventType})</span>
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
