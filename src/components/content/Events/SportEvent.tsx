import React from "react";
import Footer from "../../layout/Footer";
import Chatbot from "../../chatbot/Chatbot";
import EventAbout from "./EventAbout";
import EventDisplaySports from "./EventDisplaySports";
import EventHeader from "./EventHeader";

const AllEvents: React.FC = () => {

  return (
    <body>
        <div>
            <EventHeader/>
            {/* <HomeIntro /> */}
            <EventAbout />
            <EventDisplaySports />
            <Chatbot />
            <Footer />
        </div>
    </body>
  );
};
export default AllEvents;
