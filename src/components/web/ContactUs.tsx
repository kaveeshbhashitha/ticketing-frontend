import React from 'react';
import HomeQandA from '../content/HomeQandA';
import HomeNewsLetter from '../content/HomeNewsLetter';
import HomePackages from '../content/HomePackages';
import HomeContactUs from '../content/HomeContactUs';
import Chatbot from '../chatbot/Chatbot';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import HomeIntro from '../content/HomeIntro';
import HomeAbout from '../content/HomeAbout';

const ContactUs: React.FC = () => {

    return (
      <body>
          <div>
              <Header />
              <HomeIntro />
              <HomeAbout />
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
  export default ContactUs;
