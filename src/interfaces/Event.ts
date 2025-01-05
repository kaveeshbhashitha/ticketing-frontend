export interface Event {
  eventId: string;
  eventName: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventVenue: string;
  eventOrganizer: string;
  description: string;
  oneTicketPrice: number;
  eventType: string;
  eventIsFor: string;
  numOfTickets: number;
  teamOne: string;
  teamTwo: string;
  maxPerson: number;
  duration: string;
  theaterTime1: string;
  theaterTime2: string;
  theaterIsFor: string;
  dateAdded: string;
  timeAdded: string;
  eventImagePath: string;
  imageData?: string;
  contentType?: string;
}
