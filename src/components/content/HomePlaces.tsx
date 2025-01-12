import React from "react";

const HomePlaces: React.FC = () => {
  return (
    <div>
      <section id="hotels" className="section-with-bg wow fadeInUp">
        <div className="container">
            <div className="section-header">
                <h2>Hotels</h2>
                <p>Her are some nearby hotels</p>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="hotel">
                        <div className="hotel-img">
                        <img src="img/venue-gallery/7.jpg" alt="Musical" className="img-fluid" />
                        </div>
                        <h3><a href="#">ENTERTAINMENT</a></h3>
                        <p>0.4 Mile from the Venue</p>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="hotel">
                        <div className="hotel-img">
                        <img src="img\venue-gallery\stadium1.jpg" alt="Conference" className="img-fluid" />
                        </div>
                        <h3><a href="#">SPORTS</a></h3>
                        <p>0.5 Mile from the Venue</p>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="hotel">
                        <div className="hotel-img">
                        <img src="img/venue-gallery/bmich.jpg" alt="Hotel 3" className="img-fluid" />
                        </div>
                        <h3><a href="#">MEETINGS & CONVENTIONS</a></h3>
                        <p>0.6 Mile from the Venue</p>
                    </div>
                </div>
            </div>
        </div>
        </section>
    </div>
  );
};
export default HomePlaces;
