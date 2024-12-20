import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HomeGallery: React.FC = () => {
  const galleryImages = [
    "img/gallery/1.jpg",
    "img/gallery/2.jpg",
    "img/gallery/3.jpg",
    "img/gallery/4.jpg",
    "img/gallery/5.jpg",
    "img/gallery/6.jpg",
    "img/gallery/7.jpg",
    "img/gallery/8.jpg",
  ];

  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 }, // 1 item for small screens
      600: { items: 2 }, // 2 items for medium screens
      1000: { items: 3 }, // 3 items for larger screens
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

      <OwlCarousel
        className="gallery-carousel"
        {...carouselOptions} // Use carouselOptions for flexibility
      >
        {galleryImages.map((image, index) => (
          <div className="item" key={index}>
            <a
              href={image}
              className="venobox"
              data-gall="gallery-carousel"
            >
              <img src={image} alt={`Gallery ${index + 1}`} />
            </a>
          </div>
        ))}
      </OwlCarousel>
    </section>
  );
};

export default HomeGallery;
