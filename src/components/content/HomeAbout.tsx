import React from "react";

const HomeAbout: React.FC = () => {
  return (
    <div>
      <section id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2>About The Event</h2>
              <p>
                Sed nam ut dolor qui repellendus iusto odit. Possimus inventore
                eveniet accusamus error amet eius aut accusantium et. Non odit
                consequatur repudiandae sequi ea odio molestiae. Enim possimus
                sunt inventore in est ut optio sequi unde.
              </p>
            </div>
            <div className="col-lg-3">
              <h3>Where</h3>
              <p>Downtown Conference Center, New York</p>
            </div>
            <div className="col-lg-3">
              <h3>When</h3>
              <p>
                Monday to Wednesday
                <br />
                10-12 December
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomeAbout;
