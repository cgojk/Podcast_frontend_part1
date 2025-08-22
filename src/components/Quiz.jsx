


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomByGenre } from "../api";
import CardsEntry from "../components/CardsEntry";
import { getRandomFallbackImage } from "../utils/fallbackImage";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const questions = [
    {
      title: "What kind of story appeals most to you?",
      options: [
        "A real-life account that opens your eyes",
        "A high-stakes mystery with layered twists",
        "A surreal narrative that bends reality",
        "An immersive world of magic and quests",
        "A quirky, character-driven quest full of dice rolls",
      ],
    },
  ];

  const answerToGenreMap = {
    "A real-life account that opens your eyes": "crime",
    "A high-stakes mystery with layered twists": "storytelling",
    "A surreal narrative that bends reality": "fiction",
    "An immersive world of magic and quests": "fantasy",
    "A quirky, character-driven quest full of dice rolls": "dnd",
  };

  const genreIdToName = {
    1: "crime",
    2: "storytelling",
    3: "fiction",
    4: "fantasy",
    5: "dnd",
  };

  // Fetch recommendations when quiz is finished
  useEffect(() => {
    if (step === questions.length) {
      fetchRecommendations();
    }
  }, [step]);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    const genre = answerToGenreMap[answers[answers.length - 1]] || "storytelling";

    try {
      const data = await getRandomByGenre(genre);

      let podcastsArray;

      if (Array.isArray(data)) {
        podcastsArray = data;
      } else if (data.podcast_id) {
        podcastsArray = [data];
      } else if (data.podcasts) {
        podcastsArray = data.podcasts;
      } else {
        throw new Error("Unexpected response format");
      }

      const podcastsWithGenreName = podcastsArray.map((podcast) => ({
        ...podcast,
        genre_name: genreIdToName[podcast.genre_id] || "unknown",
      }));

      setResults(podcastsWithGenreName);
    } catch (error) {
      setError("Failed to fetch recommendations. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (option) => {
    const updated = [...answers];
    updated[step] = option; // Save answer at current step (supports going back)
    setAnswers(updated);
    setStep((s) => Math.min(s + 1, questions.length));
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setResults([]);
    setError(null);
  };

  return (
    <section className="section_quiz" style={{ display: "flex", gap: "2rem" }}>
      {/* Left: Quiz questions */}
      <div
        className="quiz-card"
        style={{
          flex: 1,
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        {step < questions.length ? (
          <>
            <h2>
              Question {step + 1} of {questions.length}
            </h2>
            <p>{questions[step].title}</p>
            <div>
              {questions[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswerSelect(opt)}
                  style={{
                    display: "block",
                    margin: "0.5rem 0",
                    backgroundColor: answers[step] === opt ? "#4caf50" : "",
                    color: answers[step] === opt ? "white" : "",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={goBack}
                disabled={step === 0}
                style={{ marginRight: "1rem" }}
              >
                Previous
              </button>
              {step < questions.length - 1 && (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!answers[step]}
                >
                  Next
                </button>
              )}
              {step === questions.length - 1 && (
                <button
                  onClick={() => setStep(questions.length)}
                  disabled={!answers[step]}
                >
                  See Recommendations
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <h2>Your quiz is complete!</h2>
            <button onClick={resetQuiz}>Retake Quiz</button>
          </>
        )}
      </div>

      {/* Right: Recommendations */}
      <div
        className="podcast-results-quiz"
        style={{
          flex: 1,
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
          minHeight: "400px",
          overflowY: "auto",
        }}
      >
        <h2>Recommended Podcasts</h2>
        {loading && <p>Loading recommendations...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && results.length === 0 && (
          <p>Complete the quiz to see recommendations.</p>
        )}
        <div
          className="podcast-list-quiz"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {results.map((p) => {
            const id = p.podcast_id || p.id;
            const img =
              p.cover_image_url || p.imageUrl || getRandomFallbackImage(id);
            const altText = p.cover_image_alt_text || "Podcast cover";
            return (
              <CardsEntry
                key={id}
                id={id}
                img={img}
                altText={altText}
                name={p.title || p.name}
                description={p.description}
                genre={p.genre_name || p.genre}
                duration={`Episodes: ${p.episode_count || p.duration}`}
                hosts={p.hosts || []}
                averageRating={p.average_rating || p.averageRating}
                mode="compact"
                linkTo={() => navigate(`/podcasts/${id}`)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}