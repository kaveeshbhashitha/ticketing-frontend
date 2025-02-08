import React from "react";

const HomeIntro: React.FC = () => {
  return (
    <div>
        <section id="intro">
            <div className ="intro-container wow fadeIn">
                <h1 className="mb-4 pb-0">The Annual<br /><span>Marketing</span> Conference</h1>
                <p className="mb-4 pb-0">10-12 December, Downtown Conference Center, New York</p>
                <a href="https://www.youtube.com/watch?v=bxUJgZLyfd4" className="venobox play-btn mb-4" data-vbtype="video"
                    data-autoplay="false"></a>
                <a href="#about" className="about-btn scrollto">About The Event</a>
            </div>
        </section>
    </div>
  );
};
export default HomeIntro;
