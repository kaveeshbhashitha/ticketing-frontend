import React from "react";

const HomePackages: React.FC = () => {
  return (
    <div>
      <section id="buy-tickets" className="section-with-bg wow fadeInUp">
        <div className="container">
          <div className="section-header">
            <h2>Buy Tickets</h2>
            <p>
              Velit consequatur consequatur inventore iste fugit unde omnis eum
              aut.
            </p>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-5 mb-lg-0">
                <div className="card-body">
                  <h5 className="card-title text-muted text-uppercase text-center">
                    Standard Access
                  </h5>
                  <h6 className="card-price text-center">$150</h6>
                  <hr />
                  <ul className="fa-ul">
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      Regular Seating
                    </li>
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      Coffee Break
                    </li>
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      Custom Badge
                    </li>
                    <li className="text-muted">
                      <span className="fa-li">
                        <i className="fa fa-times"></i>
                      </span>
                      Community Access
                    </li>
                    <li className="text-muted">
                      <span className="fa-li">
                        <i className="fa fa-times"></i>
                      </span>
                      Workshop Access
                    </li>
                    <li className="text-muted">
                      <span className="fa-li">
                        <i className="fa fa-times"></i>
                      </span>
                      After Party
                    </li>
                  </ul>
                  <hr />
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn"
                      data-toggle="modal"
                      data-target="#buy-ticket-modal"
                      data-ticket-type="standard-access"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card mb-5 mb-lg-0">
                <div className="card-body">
                  <h5 className="card-title text-muted text-uppercase text-center">
                    Pro Access
                  </h5>
                  <h6 className="card-price text-center">$250</h6>
                  <hr />
                  <ul className="fa-ul">
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      Regular Seating
                    </li>
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      Coffee Break
                    </li>
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      Custom Badge
                    </li>
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      Community Access
                    </li>
                    <li className="text-muted">
                      <span className="fa-li">
                        <i className="fa fa-times"></i>
                      </span>
                      Workshop Access
                    </li>
                    <li className="text-muted">
                      <span className="fa-li">
                        <i className="fa fa-times"></i>
                      </span>
                      After Party
                    </li>
                  </ul>
                  <hr />
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn"
                      data-toggle="modal"
                      data-target="#buy-ticket-modal"
                      data-ticket-type="pro-access"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-muted text-uppercase text-center">
                    Premium Access
                  </h5>
                  <h6 className="card-price text-center">$350</h6>
                  <hr />
                  <ul className="fa-ul">
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      Regular Seating
                    </li>
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      Coffee Break
                    </li>
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      Custom Badge
                    </li>
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      Community Access
                    </li>
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      Workshop Access
                    </li>
                    <li>
                      <span className="fa-li">
                        <i className="fa fa-check"></i>
                      </span>
                      After Party
                    </li>
                  </ul>
                  <hr />
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn"
                      data-toggle="modal"
                      data-target="#buy-ticket-modal"
                      data-ticket-type="premium-access"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="buy-ticket-modal" className="modal fade">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Buy Tickets</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form method="POST" action="#">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="your-name"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="your-email"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="form-group">
                    <select
                      id="ticket-type"
                      name="ticket-type"
                      className="form-control"
                    >
                      <option value="">-- Select Your Ticket Type --</option>
                      <option value="standard-access">Standard Access</option>
                      <option value="pro-access">Pro Access</option>
                      <option value="premium-access">Premium Access</option>
                    </select>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn">
                      Buy Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePackages;
