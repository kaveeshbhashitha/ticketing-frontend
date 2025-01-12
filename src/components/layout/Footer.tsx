import React from "react";

const Footer: React.FC = () => {
  return(
    <div>
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 footer-info">
                            <img src="img/logo.png" alt="TheEvenet" />
                            <p className="text-justify"><i>"The Event" is your go-to platform for seamless ticket booking across a wide range of events. Whether you're looking for sports, theater, outdoor adventures, or conferences, we make it easy to secure your spot at the best events. Enjoy hassle-free bookings and discover exciting experiences all in one place.</i></p>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                            <li><i className="fa fa-angle-right"></i> <a href="/">Home</a></li>
                            <li><i className="fa fa-angle-right"></i> <a href="/AllEvents">Events</a></li>
                            <li><i className="fa fa-angle-right"></i> <a href="/myTickets">My Tickets</a></li>
                            <li><i className="fa fa-angle-right"></i> <a href="/userProfile">Profile</a></li>
                            <li><i className="fa fa-angle-right"></i> <a href="/contact">Contact Us</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Events Categories</h4>
                            <ul>
                            <li><i className="fa fa-angle-right"></i> <a href="/AllEvents">All</a></li>
                            <li><i className="fa fa-angle-right"></i> <a href="/GeneralEvent">General Events</a></li>
                            <li><i className="fa fa-angle-right"></i> <a href="/SportEvent">Sport Events</a></li>
                            <li><i className="fa fa-angle-right"></i> <a href="/TheaterEvent">Theater Events</a></li>
                            <li><i className="fa fa-angle-right"></i> <a href="/OtherEvent">Other Events</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-contact">
                            <h4>Contact Us</h4>
                            <p>
                                No 100, Sebestian Lane<br/>
                                Colombo 7<br/>
                                Sri Lanaka<br/><br/>
                                <strong>Phone:</strong> +94 123 233 444<br />
                                <strong>Email:</strong> contact@theevenet.com<br />
                            </p>

                            <div className="social-links">
                            <a href="#" className="twitter"><i className="fa-brands fa-x-twitter"></i></a>
                            <a href="#" className="facebook"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="instagram"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#" className="google-plus"><i className="fa-brands fa-whatsapp"></i></a>
                            <a href="#" className="linkedin"><i className="fa-brands fa-linkedin-in"></i></a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong>TheEvent</strong>. All Rights Reserved
                    </div>
                </div>
        </footer>
        <a href="#" className="back-to-top"><i className="fa fa-angle-up"></i></a>
    </div>
  );
};
export default Footer;