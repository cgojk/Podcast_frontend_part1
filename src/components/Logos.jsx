import React, { useRef } from "react";

export default function Logos() {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <section className="logos-section">
        <div className="container logo-section">
            
            <p className="logo-description">
                We thank our sponsors for their support. Their contributions help us to continue creating and sharing quality content with our community.
            </p>

            <div className="logo-carousel-wrapper">
                <div className="arrow-container">
                     <button className="carousel-arrow" onClick={scrollLeft}>&lt;</button>
                </div>

            <div className="logo_container" ref={carouselRef}>
                <div className="logo-item"><img src="./images/logos_wall/logo1.png" alt="Logo 1" /></div>
                <div className="logo-item"><img src="./images/logos_wall/logo2.png" alt="Logo 2" /></div>
                <div className="logo-item"><img src="./images/logos_wall/logo3.png" alt="Logo 3" /></div>
                <div className="logo-item"><img src="./images/logos_wall/logo4.png" alt="Logo 4" /></div>
                <div className="logo-item"><img src="./images/logos_wall/logo5.png" alt="Logo 5" /></div>
                 <div className="logo-item"><img src="./images/logos_wall/logo6.png" alt="Logo 2" /></div>
                 <div className="logo-item"><img src="./images/logos_wall/logo7.png" alt="Logo 2" /></div>
                <div className="logo-item"><img src="./images/logos_wall/logo8.png" alt="Logo 3" /></div>
                <div className="logo-item"><img src="./images/logos_wall/logo9.png" alt="Logo 4" /></div>
            </div>

            <div className="arrow-container">
                <button className="carousel-arrow" onClick={scrollRight}>&gt;</button>
            </div>
        </div>
        </div>
     </section>
    );
}