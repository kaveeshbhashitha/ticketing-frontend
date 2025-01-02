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
import HomeQandA from "../content/HomeQandA";
import HomeNewsLetter from "../content/HomeNewsLetter";
import HomePackages from "../content/HomePackages";
import HomeContactUs from "../content/HomeContactUs";
import Chatbot from "../chatbot/Chatbot";

const Home: React.FC = () => {

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
            <HomeQandA />
            <HomeNewsLetter />
            <HomePackages />
            <HomeContactUs />
            <Chatbot />
            <Footer />
        </div>
    </body>
  );
};
export default Home;
