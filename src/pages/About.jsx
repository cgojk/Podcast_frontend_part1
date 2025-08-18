import React from "react"
import Team from "../components/Team.jsx";
import MissionAbout from "../components/MissionAbout.jsx";
import StoryAbout from "../components/StoryAbout.jsx";
import Logos from "../components/Logos.jsx";


export default function About() {
    return (
         <div className="about-page-container">
            
            <Team/>
            <MissionAbout/>
            <StoryAbout/>
             <h1 className="logo-title">Our Sponsors</h1>
            <Logos/>



       </div>



       
       
    );


}