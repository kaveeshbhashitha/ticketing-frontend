import React from "react";
import { Link } from "react-router-dom";


const Footer: React.FC = () => {
  return(
    <div>
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 footer-info">
                            <img src="/img/logo.png" alt="TheEvenet" />
                            <p className="text-justify"><i>"The Event" is your go-to platform for seamless ticket booking across a wide range of events. Whether you're looking for sports, theater, outdoor adventures, or conferences, we make it easy to secure your spot at the best events. Enjoy hassle-free bookings and discover exciting experiences all in one place.</i></p>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                            <li><i className="fa fa-angle-right"></i> <Link to="/">Home</Link></li>
                            <li><i className="fa fa-angle-right"></i> <Link to="/AllEvents">Events</Link></li>
                            <li><i className="fa fa-angle-right"></i> <Link to="/myTickets">My Tickets</Link></li>
                            <li><i className="fa fa-angle-right"></i> <Link to="/userProfile">Profile</Link></li>
                            <li><i className="fa fa-angle-right"></i> <Link to="/contact">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Events Categories</h4>
                            <ul>
                            <li><i className="fa fa-angle-right"></i> <Link to="/AllEvents">All</Link></li>
                            <li><i className="fa fa-angle-right"></i> <Link to="/GeneralEvent">General Events</Link></li>
                            <li><i className="fa fa-angle-right"></i> <Link to="/SportEvent">Sport Events</Link></li>
                            <li><i className="fa fa-angle-right"></i> <Link to="/TheaterEvent">Theater Events</Link></li>
                            <li><i className="fa fa-angle-right"></i> <Link to="/OtherEvent">Other Events</Link></li>
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
                            <Link to="#" className="twitter"><i className="fa-brands fa-x-twitter"></i></Link>
                            <Link to="#" className="facebook"><i className="fa-brands fa-facebook-f"></i></Link>
                            <Link to="#" className="instagram"><i className="fa-brands fa-instagram"></i></Link>
                            <Link to="#" className="google-plus"><i className="fa-brands fa-whatsapp"></i></Link>
                            <Link to="#" className="linkedin"><i className="fa-brands fa-linkedin-in"></i></Link>
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
        <Link to="#" className="back-to-top"><i className="fa fa-angle-up"></i></Link>
    </div>
  );
};
export default Footer;