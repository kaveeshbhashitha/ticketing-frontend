import React, { useState } from "react";
import axios from "axios";

const HomeContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    toEmail: "",
    subject: "",
    body: "",
  });

  const [formStatus, setFormStatus] = useState({
    success: false,
    error: false,
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ success: false, error: false, message: "" });
  
    console.log("Submitting form with data:", formData); 
  
    try {
      const response = await axios.post("https://ticketing-backend-production-088a.up.railway.app/api/addNotification", formData);
      console.log("Response:", response); 
      if (response.status === 200) {
        setFormStatus({
          success: true,
          error: false,
          message: "Your message has been sent. Thank you!",
        });
        setFormData({ name: "", toEmail: "", subject: "", body: "" });
      }
    } catch (error) {
      console.error("Failed to send message to primary link, trying secondary link:", error);
      
      try {
        const secondaryResponse = await axios.post("http://localhost:8081/notification/api/addNotification", formData);
        console.log("Secondary Response:", secondaryResponse);
        if (secondaryResponse.status === 200) {
          setFormStatus({
            success: true,
            error: false,
            message: "Your message has been sent via the secondary link. Thank you!",
          });
          setFormData({ name: "", toEmail: "", subject: "", body: "" });
        }
      } catch (secondaryError) {
        console.error("Failed to send message via both links:", secondaryError);
        setFormStatus({
          success: false,
          error: true,
          message: "An error occurred while sending your message. Please try again.",
        });
      }
    }
  };
  

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
                <address>No 100, Sebestian Lane, Colombo 7, Sri Lanka</address>
              </div>
            </div>

            <div className="col-md-4">
              <div className="contact-email">
                <i className="ion-ios-email-outline"></i>
                <h3>Email</h3>
                <p><a href="mailto:contact@theevent.com">contact@theevent.com</a></p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="contact-phone">
                <i className="ion-ios-telephone-outline"></i>
                <h3>Mobile</h3>
                <p>
                  <a href="tel:+94123233444">+94 123 233 444</a> | 
                  <a href="tel:+94112114251">+94 112 114 251</a>
                </p>
              </div>
            </div>
          </div>

          <div className="form">
            {formStatus.success && <div className="alert alert-primary">{formStatus.message}</div>}
            {formStatus.error && <div className="alert alert-danger">{formStatus.message}</div>}

            <form onSubmit={handleSubmit} className="contactForm">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="email"
                    name="toEmail"
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                    value={formData.toEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  id="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="body"
                  className="form-control"
                  id="message"
                  placeholder="Message"
                  value={formData.body}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContactUs;
