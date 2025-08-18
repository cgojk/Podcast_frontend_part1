import Rating from '../components/Rating'; // Importing the Rating component
import Testimonials from '../components/Testimonials';
// Importing the Testimonials component
import React from 'react';


export default function Press() {
    return (
        <>
            <h1 className='team-title center'>Press Page</h1>
            <p className="title_section-sm">This is the press page where you can find all the latest news and updates about</p>
            <Testimonials  />
            <Rating />

           
            
        </>
    )
}
