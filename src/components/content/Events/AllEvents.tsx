import React from "react";
import Footer from "../../layout/Footer";
import HomeIntro from "../HomeIntro";
import Chatbot from "../../chatbot/Chatbot";
import AllEventHeader from "./AllEventHeader";
import EventAbout from "./EventAbout";
import EventDisplayAll from "./EventDisplayAll";

const AllEvents: React.FC = () => {

  return (
    <body>
        <div>
            <AllEventHeader/>
            <HomeIntro />
            <EventAbout />
            <EventDisplayAll />
            <Chatbot />
            <Footer />
        </div>
    </body>
  );
};
export default AllEvents;
