import React from "react";
import Footer from "../../layout/Footer";
import HomeIntro from "../HomeIntro";
import Chatbot from "../../chatbot/Chatbot";
import TheaterEventHeader from "./TheaterEventHeader";
import EventAbout from "./EventAbout";
import EventDisplayTheater from "./EventDisplayTheater";

const AllEvents: React.FC = () => {

  return (
    <body>
        <div>
            <TheaterEventHeader/>
            <HomeIntro />
            <EventAbout />
            <EventDisplayTheater />
            <Chatbot />
            <Footer />
        </div>
    </body>
  );
};
export default AllEvents;
