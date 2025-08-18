

import React from "react"
import { useParams } from "react-router-dom"

export default function StoreDetails() {
  const params = useParams()
  const [merch, setMerch] = React.useState(null)
  const [error, setError] = React.useState(null)       

  React.useEffect(() => {
    const fetchMerch = async () => {
      try {
        const res = await fetch(`/api/merches/${params.id}`)

        // 2. Check for bad HTTP response
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()

        //  3. Set merch state
        setMerch(data.merches)
      } catch (error) {
        console.error("Failed to fetch merch details:", error)

        //  4. Set error state
        setError("Failed to load merch details. Please try again.")
      }
    }

    fetchMerch()
  }, [params.id])

  return (
    <section className="merch-detail container">
      {/* /*  5. Show error message if fetch fails */ }
      {error && <p className="error">{error}</p>}

      {/* 6. Show merch if loaded */}
      {merch && !error ? (
        <>
        

          <div className="merch-image">
            <img src={merch.imageUrl} alt={merch.name} className="merch-image" />
          </div>
          <div className="merch-info">
            <h1>{merch.name}</h1>
            <p><strong>Genre:</strong> {merch.genre}</p>
            <p><strong>Price:</strong> ${merch.price}</p>
            <p><strong>Description:</strong> {merch.description}</p>
            <p><strong>Duration:</strong> {merch.duration}</p>
            <a className="btn">Add to Cart</a>
          </div>
        </>
      ) : !error ? (
        <p>Loading merch details...</p>  /*  7. Loading state */
      ) : null}
    </section>
  )
}

