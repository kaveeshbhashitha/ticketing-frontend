import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAllEvents } from "../../../service/EventService";

const localizer = momentLocalizer(moment);

interface CustomEvent {
  title: string;
  start: Date;
  end: Date;
  type: string;
}

interface EventResponse {
  eventId: string;
  eventName: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventType: string;
}

interface EventCalendarProps {
  height: string;
}

export default function EventCalendar({ height }: EventCalendarProps) {
  const [events, setEvents] = useState<CustomEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response: EventResponse[] = await getAllEvents();

        const calendarEvents: CustomEvent[] = response.map((event) => {
          const [startHour, startMinute] = event.startTime.split(":").map(Number);
          const [endHour, endMinute] = event.endTime.split(":").map(Number);

          return {
            title: event.eventName || "Unnamed Event",
            start: new Date(
              new Date(event.eventDate).setHours(startHour, startMinute, 0, 0)
            ),
            end: new Date(
              new Date(event.eventDate).setHours(endHour, endMinute, 0, 0)
            ),
            type: event.eventType || "default",
          };
        });

        setEvents(calendarEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const getEventColor = (eventType: string, eventDate: Date): string => {
    const currentDate = new Date();
  
    if (eventDate < currentDate) {
      return "#000000"; // Black color for past events
    }
  
    switch (eventType) {
      case "theater":
        return "#FF6347";
      case "sports":
        return "#4682B4";
      case "generalEvent":
        return "#61d53d";
      default:
        return "#135bf2";
    }
  };
  
  const eventStyleGetter = (event: CustomEvent): { style: React.CSSProperties } => {
    const backgroundColor = getEventColor(event.type, event.start);
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "5px",
        border: "none",
      },
    };
  };
  

  return (
    <div style={{ height: "80vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height }}
        titleAccessor="title"
        views={["month"]}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
