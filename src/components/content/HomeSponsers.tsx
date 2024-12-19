import React from "react";

// Define an array to hold sponsor image data
const sponsorImages = [
  "img/sponsors/1.png",
  "img/sponsors/2.png",
  "img/sponsors/3.png",
  "img/sponsors/4.png",
  "img/sponsors/5.png",
  "img/sponsors/6.png",
  "img/sponsors/7.png",
  "img/sponsors/8.png",
];

const HomeSponsors: React.FC = () => {
  return (
    <section id="sponsors" className="section-with-bg wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h2>Sponsors</h2>
        </div>

        <div className="row no-gutters sponsors-wrap clearfix">
          {sponsorImages.map((image, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-xs-6">
              <div className="sponsor-logo">
                <img src={image} className="img-fluid" alt={`Sponsor ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSponsors;
