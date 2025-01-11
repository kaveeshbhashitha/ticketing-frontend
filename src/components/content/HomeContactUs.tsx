import React from "react";

const HomeContactUs: React.FC = () => {
  return (
    <div>
      <section id="contact" className="section-bg wow fadeInUp">

<div className="container">

  <div className="section-header">
    <h2>Contact Us</h2>
    <p>Get in touch with us for any inquiries or support!</p>
  </div>

  <div className="row contact-info">

    <div className="col-md-4">
      <div className="contact-address">
        <i className="ion-ios-location-outline"></i>
        <h3>Address</h3>
        <address>No 100, Sebestian Lane, Colombo 7, Sri Lanaka</address>
      </div>
    </div>

    <div className="col-md-4">
      <div className="contact-phone">
        <i className="ion-ios-telephone-outline"></i>
        <h3>Phone Number</h3>
        <p><a href="tel:+155895548855">+94 123 233 444</a></p>
      </div>
    </div>

    <div className="col-md-4">
      <div className="contact-email">
        <i className="ion-ios-email-outline"></i>
        <h3>Email</h3>
        <p><a href="mailto:info@example.com">contact@theevenet.com</a></p>
      </div>
    </div>

  </div>

  <div className="form">
    <div id="sendmessage">Your message has been sent. Thank you!</div>
    <div id="errormessage"></div>
    <form action="" method="post" role="form" className="contactForm">
      <div className="form-row">
        <div className="form-group col-md-6">
          <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
          <div className="validation"></div>
        </div>
        <div className="form-group col-md-6">
          <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
          <div className="validation"></div>
        </div>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
        <div className="validation"></div>
      </div>
      <div className="form-group">
        <textarea className="form-control" name="message"  data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
        <div className="validation"></div>
      </div>
      <div className="text-center"><button type="submit">Send Message</button></div>
    </form>
  </div>

</div>
</section>
    </div>
  );
};
export default HomeContactUs;