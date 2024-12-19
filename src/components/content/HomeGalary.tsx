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

  return (
    <section id="gallery" className="wow fadeInUp">
      <div className="container">
        <div className="section-header">
          <h2>Gallery</h2>
          <p>Check our gallery from the recent events</p>
        </div>
      </div>

      <OwlCarousel
        className="gallery-carousel" loop margin={10} nav items={3}  autoplay autoplayTimeout={3000} dots >
        {galleryImages.map((image, index) => (
          <a
            key={index}
            href={image}
            className="venobox"
            data-gall="gallery-carousel"
          >
            <img src={image} alt={`Gallery ${index + 1}`} />
          </a>
        ))}
      </OwlCarousel>
    </section>
  );
};

export default HomeGallery;
