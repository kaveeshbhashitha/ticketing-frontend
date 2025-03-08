import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Chatbot from "./chatbot/Chatbot";
import DevTeamPage from "./DevTeamPage";
import HomeAbout from "./content/HomeAbout";
import HomeIntro from "./content/HomeIntro";


const Developers: React.FC = () => {

  return (
    <body>
        <div>
            <Header />
            <HomeIntro />
            <HomeAbout />
            <DevTeamPage/>
            <Chatbot />
            <Footer />
        </div>
    </body>
  );
};
export default Developers;
