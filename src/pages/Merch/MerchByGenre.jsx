
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CardsEntry from "../../components/CardsEntry.jsx"; // Ensure correct import path

export default function MerchByGenre() {
  const { genre } = useParams();
  const [merchandiseGenre, setMerchandiseGenre] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMerch() {
      try {
        const res = await fetch("/api/merches");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setMerchandiseGenre(data.merches.filter(item => item.genre === genre));
      } catch (err) {
        console.error("Failed to fetch merch:", err);
        setError("Failed to load merchandise.");
      }
    }
    fetchMerch();
  }, [genre]);

  return (
    <section className="container">
      <h1 className="mission-title">{genre.toUpperCase()} Merch</h1>
      {error && <p className="error">{error}</p>}

      <div className="contacts">
        {merchandiseGenre.map(item => (
          <CardsEntry
            key={item.id}
            id={item.id}
            img={item.imageUrl}
            name={item.name}
            genre={item.genre}
            description={item.description}
            duration={`${item.duration} min`}
            linkTo={`/store/${item.id}`} 
          />
        ))}
      </div>
    </section>
  );
}


