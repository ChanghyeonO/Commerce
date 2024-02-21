import React, { useState, useEffect } from "react";
import { db } from "../../api/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import {
  Container,
  SlideImage,
  Pagination,
  NavButton,
} from "./ImageSliderStyle";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const docRef = doc(db, "slideImages", "main");
    const unsubscribe = onSnapshot(docRef, doc => {
      if (doc.exists()) {
        setImages(doc.data().images || []);
      } else {
        console.log("No such document!");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % (images.length || 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

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
