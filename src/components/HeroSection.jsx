import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const waveRef = useRef(null);

  useEffect(() => {
    if (!waveRef.current) return;

    gsap.to(waveRef.current, {
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      attr: {

        d: "M0,180s63.9,70.163,179.472,68.736c121.494-1.5,185.839-49.738,305.984-49.733,109.21,0,181.491,71.733,300.537,70.233,123.941-1.562,225.214-70.126,390.43-70.374,123.821-.185,353.982,78.374,458.976,76.373,217.907-4.153,284.6-77.236,284.6-77.236V351.03H0V180Z"
        
      }
    });
  }, []);

  return (
    <header className="hero">
     

      <div className="container hero-flex">
        <div className="hero-content">
          <h1 className="title_hero">Welcome Listeners</h1>
          <p className="hero_text">
            The frequency is open beloved listeners. Find the finest stories,
            dark thrilling and why not sweet treats.
            No breaks, no ads just pure retreat.
          </p>
          <Link to="/podcasts" className="btn btn_hero">
              Check our Podcasts
           </Link>
          
        </div>
         <div className="hero-image-wrapper">
           <img src="/images/logo.png" className="hero-image" alt="hero" /> 
         </div>
         
      </div>
     

      {/* SVG WAVE AT THE BOTTOM */}
      <svg
        className="frame-decoration"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1920 192.275"
      >
        <defs>
          <style>{`.cls-1 { fill: #f5f3f5; }`}</style>
       
        </defs>
        <title>frame-decoration</title>
        <path
          ref={waveRef}
          className="cls-1"
          d="M0,158.755s63.9,52.163,179.472,50.736c121.494-1.5,185.839-49.738,305.984-49.733,109.21,0,181.491,51.733,300.537,50.233,123.941-1.562,225.214-50.126,390.43-50.374,123.821-.185,353.982,58.374,458.976,56.373,217.907-4.153,284.6-57.236,284.6-57.236V351.03H0V158.755Z"
          transform="translate(0 -158.755)"
        />
      </svg>
    </header>
  );
}

