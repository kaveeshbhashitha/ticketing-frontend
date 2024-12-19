import React from "react";

interface HomeSpeecker {
    id: number;
    name: string;
    title: string;
    image: string;
    socials: { platform: string; url: string }[];
}

const speakersData: HomeSpeecker[] = [
    {
      id: 1,
      name: 'Brenden Legros',
      title: 'Quas alias incidunt',
      image: '/img/speakers/1.jpg',
      socials: [
        { platform: 'twitter', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'google-plus', url: '#' },
        { platform: 'linkedin', url: '#' },
      ],
    },
    {
      id: 2,
      name: 'Hubert Hirthe',
      title: 'Consequuntur odio aut',
      image: '/img/speakers/2.jpg',
      socials: [
        { platform: 'twitter', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'google-plus', url: '#' },
        { platform: 'linkedin', url: '#' },
      ],
    },
    {
      id: 3,
      name: 'Cole Emmerich',
      title: 'Fugiat laborum et',
      image: '/img/speakers/3.jpg',
      socials: [
        { platform: 'twitter', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'google-plus', url: '#' },
        { platform: 'linkedin', url: '#' },
      ],
    },
    {
      id: 4,
      name: 'Jack Christiansen',
      title: 'Debitis iure vero',
      image: '/img/speakers/4.jpg',
      socials: [
        { platform: 'twitter', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'google-plus', url: '#' },
        { platform: 'linkedin', url: '#' },
      ],
    },
    {
      id: 5,
      name: 'Alejandrin Littel',
      title: 'Qui molestiae natus',
      image: '/img/speakers/5.jpg',
      socials: [
        { platform: 'twitter', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'google-plus', url: '#' },
        { platform: 'linkedin', url: '#' },
      ],
    },
    {
      id: 6,
      name: 'Willow Trantow',
      title: 'Non autem dicta',
      image: '/img/speakers/6.jpg',
      socials: [
        { platform: 'twitter', url: '#' },
        { platform: 'facebook', url: '#' },
        { platform: 'google-plus', url: '#' },
        { platform: 'linkedin', url: '#' },
      ],
    },
];
  

const HomeSpeecker: React.FC = () => {
  return (
    <section id="speakers" className="wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h2>Event Speakers</h2>
          <p>Here are some of our speakers</p>
        </div>

        <div className="row">
          {speakersData.map((speaker) => (
            <div className="col-lg-4 col-md-6" key={speaker.id}>
              <div className="speaker">
                <img src={speaker.image} alt={speaker.name} className="img-fluid" />
                <div className="details">
                  <h3>
                    <a href="speaker-details.html">{speaker.name}</a>
                  </h3>
                  <p>{speaker.title}</p>
                  <div className="social">
                    {speaker.socials.map((social, index) => (
                      <a href={social.url} key={index}>
                        <i className={`fa fa-${social.platform}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HomeSpeecker;
