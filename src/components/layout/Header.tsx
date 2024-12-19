import React from "react";


const Header: React.FC = () => {
  return(
    <div>
        <header id="header">
            <div className="container">

            <div id="logo" className="pull-left">
                <a href="#intro" className="scrollto"><img src="img/logo.png" alt="Title" /></a>
            </div>

            <nav id="nav-menu-container">
                <ul className="nav-menu">
                <li className="menu-active"><a href="#intro">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#speakers">Speakers</a></li>
                <li><a href="#schedule">Schedule</a></li>
                <li><a href="#venue">Venue</a></li>
                <li><a href="#hotels">Hotels</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#sponsors">Sponsors</a></li>
                <li><a href="#contact">Contact</a></li>
                <li className="buy-tickets"><a href="#buy-tickets">Buy Tickets</a></li>
                </ul>
            </nav>
        </div>
    </header>
    </div>
  );
};
export default Header;