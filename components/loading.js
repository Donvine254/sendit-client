import "./loading.css"
import React from "react";

export default function Loading() {
  return (
    <div className="container">
      <div className="loader">
        <div className="loader--dot"></div>
        <div className="loader--dot"></div>
        <div className="loader--dot"></div>
        <div className="loader--dot"></div>
        <div className="loader--dot"></div>
        <div className="loader--dot"></div>
        <div className="loader--text"></div>
      </div>
    </div>
  );
}
