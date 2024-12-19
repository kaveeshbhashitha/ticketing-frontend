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
                        <img src="img/hotels/1.jpg" alt="Hotel 1" className="img-fluid" />
                        </div>
                        <h3><a href="#">Hotel 1</a></h3>
                        <div className="stars">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        </div>
                        <p>0.4 Mile from the Venue</p>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="hotel">
                        <div className="hotel-img">
                        <img src="img/hotels/2.jpg" alt="Hotel 2" className="img-fluid" />
                        </div>
                        <h3><a href="#">Hotel 2</a></h3>
                        <div className="stars">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-full"></i>
                        </div>
                        <p>0.5 Mile from the Venue</p>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="hotel">
                        <div className="hotel-img">
                        <img src="img/hotels/3.jpg" alt="Hotel 3" className="img-fluid" />
                        </div>
                        <h3><a href="#">Hotel 3</a></h3>
                        <div className="stars">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        </div>
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
