import React from "react"
import { Link } from "react-router-dom"

export default function Quiz() {
  const [podcasts, setPodcasts] = React.useState([])

  // Handle form submit
  async function AddGenre(event) {
    event.preventDefault() // prevent page reload on form submit
    const formData = new FormData(event.target)
    const genre = formData.get("podcast").toLowerCase().trim()

    if (!genre) {
      setPodcasts([])
      return
    }

    try {
      const response = await fetch(`/api/podcasts?genre=${genre}`)
      const data = await response.json()

      // Correctly access the podcasts array from the response object
      if (data.podcasts && data.podcasts.length > 0) {
        setPodcasts(data.podcasts)
      } else {
        setPodcasts([
          {
            id: "none",
            name: `No podcasts found for "${genre}"`,
            description: "",
            duration: "",
            imageUrl: ""
          }
        ])
      }
    } catch (error) {
      console.error("Failed to fetch podcasts:", error)
      setPodcasts([
        {
          id: "error",
          name: "Something went wrong. Please try again later.",
          description: "",
          duration: "",
          imageUrl: ""
        }
      ])
    }
  }

  const podcastListItems = podcasts.map((podcast, index) => (
    <li key={podcast.id || index} className="podcast">
      <h4>{podcast.name}</h4>
      <p><strong>Genre:</strong> {podcast.genre || "Unknown"}</p>
      <p>{podcast.description}</p>
      {podcast.duration && <p><strong>Duration:</strong> {podcast.duration} min</p>}
      {podcast.imageUrl && <img src={podcast.imageUrl} alt={podcast.name} width="100" />}
      {podcast.id && podcast.id !== "none" && podcast.id !== "error" && (
        <Link to={`/podcasts/${podcast.id}`} className="btn">
          View Details
        </Link>
      )}
    </li>
  ))

  return (
    <section className="container section_quiz">
      <h1 className="title_section title_section_quiz">What's your podcast vibe today?</h1>

      <form onSubmit={AddGenre} className="add-podcast-form">
        <div className="form-group">
          <input
            className="input_quiz"
            type="text"
            placeholder="Add a genre (crime, dna, fiction, storytelling)"
            name="podcast"
          />
          <button className="btn_quiz" aria-live="polite">
            Check podcasts
          </button>
        </div>
      </form>

      {podcasts.length > 0 && (
        <section className="podcast-results-quiz" aria-live="polite">
          <ul className="podcast_list_quiz">
            {podcastListItems}
          </ul>
        </section>
      )}
    </section>
  )
}