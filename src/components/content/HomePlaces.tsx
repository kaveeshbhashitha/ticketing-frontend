import React from "react";

const HomePlaces: React.FC = () => {
  return (
    <div>
      <section id="hotels" className="section-with-bg wow fadeInUp">
        <div className="container">
            <div className="section-header">
                <h2>Explore Our Event Categories</h2>
                <p>Find Every event you want.</p>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="hotel">
                        <div className="hotel-img">
                        <img src="img/venue-gallery/7.jpg" alt="Musical" className="img-fluid" />
                        </div>
                        <h3><a href="#">ENTERTAINMENT</a></h3>
                        <p>Book tickets for captivating dramas and live performance at venues designed to make every moment unforgettable.</p>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="hotel">
                        <div className="hotel-img">
                        <img src="img\venue-gallery\stadium1.jpg" alt="Conference" className="img-fluid" />
                        </div>
                        <h3><a href="#">SPORTS</a></h3>
                        <p>Secure your spot at thrilling sports events and tournaments, hosted in popular arenas for an unmatched experience.</p>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="hotel">
                        <div className="hotel-img">
                        <img src="img/venue-gallery/bmich.jpg" alt="Hotel 3" className="img-fluid" />
                        </div>
                        <h3><a href="#">MEETINGS & CONVENTIONS</a></h3>
                        <p>Reserve your place at professional conventions, seminars, and cooperate events held in state-of-the-art venues.</p>
                    </div>
                </div>
            </div>
        </div>
        </section>
    </div>
  );
};
export default HomePlaces;
