import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedWave() {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    gsap.to(path, {
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      attr: {
        d: "M0,80 C150,100 350,0 500,80 L500,0 L0,0 Z", // alternate path for wave
      },
    });
  }, []);

  return (
    <svg
      width="100%"
      height="200"
      viewBox="0 0 500 200"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: "200px" }}
    >
      <path
        ref={pathRef}
        d="M0,100 C150,0 350,200 500,100 L500,0 L0,0 Z"
        fill="#dfd932" // color of the wave (match your style)
      />
    </svg>
  );
}