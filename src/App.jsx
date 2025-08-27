// App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Press from './pages/Press'; // Importing the Press page
import Podcasts from './pages/Podcasts/Podcasts'; // Importing the Podcasts page
import PodcastDetail from './pages/Podcasts/PodcastDetail'; // Importing the PodcastDetail page
import Layout from "./components/Layout"
import Store from './pages/Merch/Store'; // Importing the Store page
import StoreDetails from './pages/Merch/StoreDetails'; // Importing the StoreDetail page
import GenreGrid from './pages/Merch/GenreGrid'; // Importing the GenreGrid page
import MerchByGenre from './pages/Merch/MerchByGenre'; // Importing
// import PodcastControl from './pages/Podcasts/PodcastControl'; // Importing the PodcastControl page
import PodcastListen from './pages/Podcasts/PodcastListen'; // import your new listen page
//




export default function App() {
  return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} /> {/*  */}
            <Route path="contact" element={<Contact />} /> {/* l */}
            <Route path="press" element={<Press />} /> {/*  */}
            
            {/* Podcasts routes */}
            <Route path="podcasts" element={<Podcasts />} /> {/*  */}
            <Route path="podcasts/:id" element={<PodcastDetail />} /> {/*  */}
            <Route path="podcasts/:id/listen" element={<PodcastListen />} />


            {/* Merch routes */}
            <Route path="store" element={<Store />} />
            <Route path="store/:id" element={<StoreDetails />} />
            <Route path="store/genres" element={<GenreGrid />} />
            <Route path="store/genre/:genre" element={<MerchByGenre />} />


            
        </Route>
      </Routes>
    </BrowserRouter>
  );
}