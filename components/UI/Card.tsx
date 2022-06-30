import React, { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <>
      <div className="border-2 p-2">{children}</div>
    </>
  );
};

export default Card;
