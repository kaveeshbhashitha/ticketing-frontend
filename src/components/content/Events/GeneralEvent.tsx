import React from "react";
import Footer from "../../layout/Footer";
import HomeIntro from "../HomeIntro";
import Chatbot from "../../chatbot/Chatbot";
import GeneralEventHeader from "./GeneralEventHeader";
import EventAbout from "./EventAbout";
import EventDisplayGeneral from "./EventDisplayGeneral";

const AllEvents: React.FC = () => {

  return (
    <body>
        <div>
            <GeneralEventHeader/>
            <HomeIntro />
            <EventAbout />
            <EventDisplayGeneral />
            <Chatbot />
            <Footer />
        </div>
    </body>
  );
};
export default AllEvents;
