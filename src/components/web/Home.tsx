import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import HomeSpeecker from "../content/HomeSpeecker";
import HomeAbout from "../content/HomeAbout";
import HomeEventSchedule from "../content/HomeEventSchedule";
import HomePlaces from "../content/HomePlaces";
import HomeIntro from "../content/HomeIntro";
import HomeGalary from "../content/HomeGalary";
import HomeSponsors from "../content/HomeSponsers";
import Chatbot from "../chatbot/Chatbot";

const Home: React.FC = () => {
  sessionStorage.setItem('team_Access_password', "pasindu123456789");
  return (
    <body>
      
        <div>
            <Header />
            <HomeIntro />
            <HomeAbout />
            <HomeSpeecker />
            <HomeEventSchedule />
            <HomePlaces />
            <HomeGalary />
            <HomeSponsors />
            <Chatbot />
            <Footer />
        </div>
    </body>
  );
};
export default Home;
