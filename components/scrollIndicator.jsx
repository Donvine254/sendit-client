'use client'
import React, { useEffect } from 'react';

const ScrollIndicator = () => {
  useEffect(() => {
    const myFunction = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById('myBar').style.width = scrolled + '%';
    };

    window.addEventListener('scroll', myFunction);

    return () => {
      window.removeEventListener('scroll', myFunction);
    };
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full bg-slate-300 ">
      <div className="w-full h-2">
        <div className="h-2 accent" id="myBar"></div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
