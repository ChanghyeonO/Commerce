import React, { useEffect } from "react";
import LoadingGif from "../../assets/images/Loading.gif";
import { LoadingOverlay, LoadingImage } from "./LoadingStyle";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <LoadingOverlay>
      <LoadingImage src={LoadingGif} alt="Loading..." />
    </LoadingOverlay>
  );
};

export default Loading;
