import React from "react";
import Footer from "../../layout/Footer";
import Chatbot from "../../chatbot/Chatbot";
import EventDisplayAll from "./EventDisplayAll";
import EventHeader from "./EventHeader";
import EventAbout from "./EventAbout";

const AllEvents: React.FC = () => {

  return (
    <body>
        <div>
            <EventHeader/>
            {/* <HomeIntro /> */}
            <EventAbout />
            <EventDisplayAll />
            <Chatbot />
            <Footer />
        </div>
    </body>
  );
};
export default AllEvents;
