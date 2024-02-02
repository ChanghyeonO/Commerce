import { useState, useEffect } from "react";
import {
  Container,
  SlideImage,
  Pagination,
  NavButton,
} from "./ImageSliderStyle";

const imageData = [
  { id: 1, url: "image1.jpg" },
  { id: 2, url: "image2.jpg" },
  { id: 3, url: "image3.jpg" },
];

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % imageData.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <Container>
      {imageData.map((image, index: number) => (
        <SlideImage
          key={image.id}
          src={image.url}
          alt={`Slide ${index}`}
          style={{ display: index === currentSlide ? "block" : "none" }}
        />
      ))}
      <Pagination>
        {imageData.map((_, index) => (
          <NavButton
            key={index}
            $isActive={index === currentSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </Pagination>
    </Container>
  );
};

export default ImageSlider;
