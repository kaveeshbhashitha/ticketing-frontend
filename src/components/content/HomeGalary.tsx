import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { getAllOtherEventDataForFrontEndWithoutSort } from "../../service/EventService";
import { Event } from "../../interfaces/Event";
import { Link } from "react-router-dom";

const HomeGallery: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getAllOtherEventDataForFrontEndWithoutSort();
        if (eventList && eventList.length > 0) {
          setEvents(eventList);
          console.log("Events found:", eventList); // Log eventList directly
        } else {
          console.error("No events found to display.");
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);
  

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = events.map((event) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          if (event.imageData) {
            img.src = event.imageData; // Replace with the actual image field
          } else {
            reject(new Error("Image data is undefined"));
          }
          img.onload = resolve;
          img.onerror = reject;
        })
      );

      try {
        await Promise.all(imagePromises);
        setLoading(false); // All images are loaded
      } catch (error) {
        console.error("Error loading images:", error);
        setLoading(false); // Allow the page to render even if some images fail
      }
    };

    preloadImages();
  }, [events]);

  if (loading) {
    return <div>Loading events...</div>; // Display a loading indicator
  }


  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  };


  return (
    <section id="gallery" className="wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h2>Gallery</h2>
          <p>Check our gallery from the recent events</p>
        </div>
      </div>

      <OwlCarousel className="gallery-carousel" {...carouselOptions}>
        {events.map((event) => (
          <div className="item" key={event.eventId}>
            <Link
              to={`/event/${event.eventId}`}
              className="venobox"
              data-gall="gallery-carousel"
            >
              <img
                src={`data:${event.contentType};base64,${event.imageData}`}
                alt={event.eventName}
                style={{ width: "460px", height: "300px" }}
                
              />
            </Link>
          </div>
        ))}
      </OwlCarousel>
    </section>
  );
};

export default HomeGallery;
