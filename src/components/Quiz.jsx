

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomByGenre } from "../api";
import CardsEntry from "../components/CardsEntry";
import { getRandomFallbackImage } from "../utils/fallbackImage";


export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);;;;
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const questions = [
    {
      title: "What kind of story appeals most to you?",
      options: [
        { text: "A real-life account that opens your eyes", icon: "🕵️‍♂️" },
        { text: "A high-stakes mystery with layered twists", icon: "🕵️‍♀️" },
        { text: "A surreal narrative that bends reality", icon: "🎭" },
        { text: "An immersive world of magic and quests", icon: "🧙‍♂️" },
        { text: "A quirky, character-driven quest full of dice rolls", icon: "🎲" },
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

  const handleAnswerSelect = async (optionText) => {
    setLoading(true);
    setError(null);
    setResults([]);
    setAnswers([optionText]);

    const genre = answerToGenreMap[optionText] || "storytelling";

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
        podcastsArray = [];
      }

      const podcastsWithGenreName = podcastsArray.map((podcast) => ({
        ...podcast,
        genre_name: genreIdToName[podcast.genre_id] || "unknown",
      }));

      setResults(podcastsWithGenreName);

      if (podcastsWithGenreName.length === 0) {
        setError("Hmm, no podcasts matched that vibe. Try another choice!");
      }
    } catch (err) {
      setError(
        "Oops! Something went wrong. Maybe try a different option for some great podcasts or check our list of podcasts!"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setAnswers([]);
    setResults([]);
    setError(null);
  };

  return (
    <>
      {/* Quiz Card */}
      {!answers.length && (
        // <section className="section_quiz  fade-slide-in push-up">
        <section className="section_quiz   push-up">
         
          <div className="quiz-card sm-container">
            
            <h2 className="quiz-title"> Still not sure what podcast to choose </h2>
            <p className="quiz-question">{questions[0].title}</p>
            <div className="quiz-options">
              {questions[0].options.map((opt) => (
                <button
                  className="btn__quiz-option"
                  key={opt.text}
                  onClick={() => handleAnswerSelect(opt.text)}
                >
                  <span style={{ marginRight: "0.5em" }}>{opt.icon}</span>
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Podcast Results */}
      {answers.length > 0 && (
        <section className="podcast-results-section fade-slide-in">
          <div className={`podcast-results-quiz ${!loading ? "show" : ""}`}>
            <h2>Recommended Podcasts</h2>
            {loading && <p>Loading recommendations...</p>}
            {error && <p className="friendly-error">{error}</p>}
            {!loading && !error && results.length === 0 && (
              <p>Try another choice to discover some amazing podcasts!</p>
            )}
            <div className="podcast-list-quiz">
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

            <button className="btn__quiz-complete" onClick={resetQuiz}>
              Retake Quiz
            </button>
          </div>
        </section>
      )}
    </>
  );
}