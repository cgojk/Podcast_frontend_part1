import React from "react"
import MerchCards from "../../components/MerchCards.jsx" // adjust path if needed
import { Link } from "react-router-dom"

export default function Store() {
  const [merchandise, setMerchandise] = React.useState([])

  React.useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const response = await fetch("/api/merches")
        const data = await response.json()
        console.log("Fetched merchandise:", data)
        setMerchandise(data.merches || []) // Ensure we use the correct property based on the server response
      } catch (error) {
        console.error("Error fetching merchandise:", error)
      }
    }
    fetchMerchandise()
  }, [])


    // If no merchandise is available, show a loading message

  if (merchandise.length === 0) return <p>Loading merch...</p>

  const merchCards = merchandise.map(item => (
    <MerchCards
      key={item.id}
      id={item.id} // unique id
      img={item.imageUrl} alt={`Image of ${item.name}`}
      genre={item.genre}
      name={item.name}
      price={`$${item.price}`}
      description={item.description}
      // Assuming duration is in minutes, format it as needed
      duration={`Duration: ${item.duration} min`} // or whatever fits  data
    />
  ))

  return (
    <section className="podcast-section">
      <h1 className="team-title">Buy our Podcasts</h1>
     <Link to="/store/genres" className="btn btn_store">Browse by Genre</Link>
      <p className="title_section-sm">Browse our curated list of episodes.</p>
      <div className="contacts">
        {merchCards}
      </div>
    </section>
  )
}

