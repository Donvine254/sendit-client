'use client'
import { useState } from "react";
export default function FaqQuestion({ title, content }) {
    const [isDetailExpanded, setIsDetailExpanded] = useState(false);
  
    const toggleDetail = () => {
      setIsDetailExpanded(!isDetailExpanded);
    };
  
    return (
      <div className="p-3 container">
        <div
          className="flex justify-between hover:cursor-pointer w-full"
          onClick={toggleDetail}>
          <p
            className={`text-xl self-start ${
              isDetailExpanded ? "font-semibold text-primary" : ""
            }`}>
            {title}
          </p>
          <button className="self-end">
            {isDetailExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="">
          {isDetailExpanded && <p className="py-2 ">{content}</p>}
        </div>
      </div>
    );
  }