import React from "react";
import Footer from "../../layout/Footer";
import HomeIntro from "../HomeIntro";
import Chatbot from "../../chatbot/Chatbot";
import SportEventHeader from "./SportEventHeader";
import EventAbout from "./EventAbout";
import EventDisplaySports from "./EventDisplaySports";

const AllEvents: React.FC = () => {

  return (
    <body>
        <div>
            <SportEventHeader/>
            <HomeIntro />
            <EventAbout />
            <EventDisplaySports />
            <Chatbot />
            <Footer />
        </div>
    </body>
  );
};
export default AllEvents;
