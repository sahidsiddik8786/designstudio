import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import lg1 from "../../assets/lg1.jpg";
import lg2 from "../../assets/lg2.jpg";
import lg3 from "../../assets/lg3.jpg";

const BackgroundSlider = () => {
  return (
    <Carousel 
      autoPlay 
      infiniteLoop 
      showThumbs={false} 
      showStatus={false} 
      interval={2000} // Set interval to 3000 milliseconds
    >
      <div>
        <img src={lg1} alt="Background 1" />
      </div>
      <div>
        <img src={lg2} alt="Background 2" />
      </div>
      <div>
        <img src={lg3} alt="Background 3" />
      </div>
    </Carousel>
  );
};

export default BackgroundSlider;
