import "./Spinner.css";
import React, { forwardRef } from "react";


const Spinner = ({ className = "" }, ref: any) => {
  return (
    <div ref={ref} className={`flex justify-center items-center ${className}`}>
      <span className="loader"></span>
    </div>
  );
};

export default forwardRef(Spinner);

