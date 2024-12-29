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
  //useAuthCheck(['User']);
  const scheduleData = [
    {
      day: "Day 1",
      events: [
        { time: "09:30 AM", title: "Registration", description: "Join us for registration." },
        {
          time: "10:00 AM",
          title: "Keynote",
          speaker: { name: "Brenden Legros", image: "/img/speakers/1.jpg" },
          description: "A deep dive into technology trends.",
        },
      ],
    },
    {
      day: "Day 2",
      events: [
        {
          time: "10:00 AM",
          title: "Tech Panel",
          speaker: { name: "Hubert Hirthe", image: "/img/speakers/2.jpg" },
          description: "Discussion on modern AI challenges.",
        },
      ],
    },
    {
      day: "Day 3",
      events: [
        {
          time: "10:00 AM",
          title: "Workshop",
          speaker: { name: "Cole Emmerich", image: "/img/speakers/3.jpg" },
          description: "Interactive hands-on session.",
        },
      ],
    },
  ];

  return (
    <body>
        <div>
            <Header />
            <HomeIntro />
            <HomeAbout />
            <HomeSpeecker />
            <HomeEventSchedule scheduleData={scheduleData} />
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
