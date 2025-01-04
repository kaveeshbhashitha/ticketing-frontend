import React from "react";
import Footer from "../../layout/Footer";
import HomeIntro from "../HomeIntro";
import Chatbot from "../../chatbot/Chatbot";
import OtherEventHeader from "./OtherEventHeader";
import EventAbout from "./EventAbout";
import EventDisplayOther from "./EventDisplayOther";

const AllEvents: React.FC = () => {

  return (
    <body>
        <div>
            <OtherEventHeader/>
            <HomeIntro />
            <EventAbout />
            <EventDisplayOther />
            <Chatbot />
            <Footer />
        </div>
    </body>
  );
};
export default AllEvents;
