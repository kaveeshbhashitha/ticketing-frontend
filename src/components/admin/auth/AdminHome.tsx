import React from "react";
import HomeIntro from "../../content/HomeIntro";
import HomeAbout from "../../content/HomeAbout";
import HomeSpeecker from "../../content/HomeSpeecker";
import HomeEventSchedule from "../../content/HomeEventSchedule";
import HomePlaces from "../../content/HomePlaces";
import HomeGalary from "../../content/HomeGalary";
import HomeSponsors from "../../content/HomeSponsers";
import Chatbot from "../../chatbot/Chatbot";
import Footer from "../../layout/Footer";
import AdminHeader from "./AdminHeader";


const Home: React.FC = () => {

  return (
    <body>
        <div>
            <AdminHeader/>
            <HomeIntro />
            <HomeAbout />
            <HomeSpeecker/>
            <HomeEventSchedule/>
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
