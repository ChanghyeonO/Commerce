import React from "react";
import LoadingGif from "../../assets/images/Loading.gif";

import { LoadingOverlay, LoadingImage } from "./LoadingStyle";

const Loading = () => {
  return (
    <LoadingOverlay>
      <LoadingImage src={LoadingGif} alt="Loading..." />
    </LoadingOverlay>
  );
};

export default Loading;
