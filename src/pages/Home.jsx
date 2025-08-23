import DataCards from "../components/DataCards.jsx";
import Quiz from "../components/Quiz.jsx";
import HeroSection from "../components/HeroSection.jsx";
import Logos from "../components/Logos.jsx";
import GenreGrid from "./Merch/GenreGrid.jsx";
// import { useEffect } from "react";



export default function Home() {
    return (
        <>
           
            <HeroSection/>
             <Logos/>
              <DataCards />
            <GenreGrid/>
             <Quiz/>
             
           

          

            
           

           
            
        </>
    );
}

