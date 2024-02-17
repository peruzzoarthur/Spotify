import React, { ReactNode } from "react";
import image from "../../styles/img/analogBackground.jpg";

type AnalogBackgroundProps = {
  children?: ReactNode;
};
export const AnalogBackground: React.FC<AnalogBackgroundProps> = ({
  children,
}) => {
  const mainStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  return <main style={mainStyle}>{children}</main>;
};
