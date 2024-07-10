import React, { CSSProperties } from "react";

const Loader: React.FC<{ style?: CSSProperties; className?: string }> = ({
  className,
}) => {
  return <div className={`loader ${className}`}></div>;
};

export default Loader;
