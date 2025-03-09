import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Chatbot from "./chatbot/Chatbot";
import DevTeamPage from "./DevTeamPage";
import HomeAbout from "./content/HomeAbout";
import HomeIntro from "./content/HomeIntro";


const Developers: React.FC = () => {
  sessionStorage.setItem('team_Access_password', "pasindu123456789");
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
