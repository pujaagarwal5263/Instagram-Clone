import * as React from "react";

interface Image {
  src: string;
}

export const ImageBox = ({ src }: Image) => {
  return (
    <>
      <img
        src={src}
        style={{
          width: "100%",
          objectFit: "cover",
          height: "100%",
          cursor: "pointer",
        }}
      />
    </>
  );
};
