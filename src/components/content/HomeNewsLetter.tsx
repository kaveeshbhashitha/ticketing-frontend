import React from "react";

const HomeNewsLetter: React.FC = () => {
  return (
    <div>
        <section id="subscribe">
            <div className="container wow fadeInUp">
                <div className="section-header">
                <h2>Newsletter</h2>
                <p>Subscribe to our newsletter and stay ahead with the latest updates!</p>
                </div>

                <form method="POST" action="#">
                <div className="form-row justify-content-center">
                    <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Enter your Email" />
                    </div>
                    <div className="col-auto">
                    <button type="submit">Subscribe</button>
                    </div>
                </div>
                </form>
            </div>
        </section>
    </div>
  );
};
export default HomeNewsLetter;
