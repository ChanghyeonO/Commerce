import { useState, useEffect } from "react";

import { db } from "../../api/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Container,
  SlideImage,
  Pagination,
  NavButton,
} from "./ImageSliderStyle";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const docRef = doc(db, "slideImages", "main");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Retrieved images:", docSnap.data().images);
        setImages(docSnap.data().images || []);
      } else {
        console.log("No such document!");
      }
    };

    fetchImages();

    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <Container>
      {images.map((url, index) => (
        <SlideImage
          key={index}
          src={url}
          alt={`Slide ${index}`}
          style={{ display: index === currentSlide ? "block" : "none" }}
        />
      ))}
      <Pagination>
        {images.map((_, index) => (
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
