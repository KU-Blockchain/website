// components/ImageCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows:true,
    adaptiveHeight:true
  };

  return (
    <div >
      <Slider {...settings}>
        {images.map((image, index) => (
          <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}} key={index}>
            <img src={image.url} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
