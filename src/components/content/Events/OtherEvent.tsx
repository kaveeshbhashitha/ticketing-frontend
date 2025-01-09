import React from "react";
import Footer from "../../layout/Footer";
import Chatbot from "../../chatbot/Chatbot";
import EventAbout from "./EventAbout";
import EventDisplayOther from "./EventDisplayOther";
import EventHeader from "./EventHeader";

const AllEvents: React.FC = () => {

  return (
    <body>
        <div>
            <EventHeader/>
            {/* <HomeIntro /> */}
            <EventAbout />
            <EventDisplayOther />
            <Chatbot />
            <Footer />
        </div>
    </body>
  );
};
export default AllEvents;
