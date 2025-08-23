


// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { getRandomByGenre } from "../api";
// // import CardsEntry from "../components/CardsEntry";
// // import { getRandomFallbackImage } from "../utils/fallbackImage";

// // export default function Quiz() {
// //   const [step, setStep] = useState(0);
// //   const [answers, setAnswers] = useState([]);
// //   const [results, setResults] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const navigate = useNavigate();

// //   const questions = [
// //     {
// //       title: "What kind of story appeals most to you?",
// //       options: [
// //         "A real-life account that opens your eyes",
// //         "A high-stakes mystery with layered twists",
// //         "A surreal narrative that bends reality",
// //         "An immersive world of magic and quests",
// //         "A quirky, character-driven quest full of dice rolls",
// //       ],
// //     },
// //   ];

// //   const answerToGenreMap = {
// //     "A real-life account that opens your eyes": "crime",
// //     "A high-stakes mystery with layered twists": "storytelling",
// //     "A surreal narrative that bends reality": "fiction",
// //     "An immersive world of magic and quests": "fantasy",
// //     "A quirky, character-driven quest full of dice rolls": "dnd",
// //   };

// //   const genreIdToName = {
// //     1: "crime",
// //     2: "storytelling",
// //     3: "fiction",
// //     4: "fantasy",
// //     5: "dnd",
// //   };

// //   // Fetch recommendations when quiz is finished
// //   useEffect(() => {
// //     if (step === questions.length) {
// //       fetchRecommendations();
// //     }
// //   }, [step]);

// //   // This waits until we are done answering all questions, then automatically asks the server for podcast recommendations.

// //   const fetchRecommendations = async () => {
// //     setLoading(true);
// //     setError(null);
// //     setResults([]);
// //     const genre = answerToGenreMap[answers[answers.length - 1]] || "storytelling";

// //     try {
// //       const data = await getRandomByGenre(genre);

// //       let podcastsArray;

// //       if (Array.isArray(data)) {
// //         podcastsArray = data;
// //       } else if (data.podcast_id) {
// //         podcastsArray = [data];
// //       } else if (data.podcasts) {
// //         podcastsArray = data.podcasts;
// //       } else {
// //         throw new Error("Unexpected response format");
// //       }

// //       const podcastsWithGenreName = podcastsArray.map((podcast) => ({
// //         ...podcast,
// //         genre_name: genreIdToName[podcast.genre_id] || "unknown",
// //       }));

// //       setResults(podcastsWithGenreName);
// //     } catch (error) {
// //       setError("Failed to fetch recommendations. Try again later.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAnswerSelect = (option) => {
// //     const updated = [...answers];
// //     updated[step] = option; // Save answer at current step (supports going back)
// //     setAnswers(updated);
// //     setStep((s) => Math.min(s + 1, questions.length));
// //   };

// //   const goBack = () => {
// //     setStep((s) => Math.max(s - 1, 0));
// //   };

// //   const resetQuiz = () => {
// //     setStep(0);
// //     setAnswers([]);
// //     setResults([]);
// //     setError(null);
// //   };

// //   return (
// //     <section className="section_quiz container" >
// //       {/* Left: Quiz questions */}
// //       <div
// //         className="quiz-card sm-container" >
// //         {step < questions.length ? (
// //           <>
// //             {/* <h2  className="quiz-title">
// //               Question {step + 1} of {questions.length}
// //             </h2> */}
// //             <h2 className="quiz-title">Which Podcast Matches Your Vibe?
// //             </h2>
// //             <p className="quiz-question">{questions[step].title}</p>
// //             <div className="quiz-options">
// //               {questions[step].options.map((opt) => (
// //                  <button
// //                   className={`btn__quiz-option ${answers[step] === opt ? "selected" : ""}`}
// //                   key={opt}
// //                   onClick={() => handleAnswerSelect(opt)}
// //       >
// //                 {opt}
// //               </button>
// //               ))}
// //             </div>
// //             <div style={{ marginTop: "1rem" }}>
// //               <button
// //                 onClick={goBack}
// //                 disabled={step === 0}
// //                 style={{ marginRight: "1rem" }}
// //               >
// //                 Previous
// //               </button>
// //               {step < questions.length - 1 && (
// //                 <button
// //                   onClick={() => setStep(step + 1)}
// //                   disabled={!answers[step]}
// //                 >
// //                   Next
// //                 </button>
// //               )}
// //               {step === questions.length - 1 && (
// //                 <button
// //                   onClick={() => setStep(questions.length)}
// //                   disabled={!answers[step]}
// //                 >
// //                   See Recommendations
// //                 </button>
// //               )}
// //             </div>
// //           </>
// //         ) : (
// //           <>
// //             <h2>Your quiz is complete!</h2>
// //             <button className="btn__quiz-complete "onClick={resetQuiz}>Retake Quiz</button>
// //           </>
// //         )}
// //       </div>



     


// // {/* Right: Recommendations */}
// // {step === questions.length && (
// //   <div className={`podcast-results-quiz ${!loading ? "show" : ""}`}>
// //     <h2>Recommended Podcasts</h2>
// //     {loading && <p>Loading recommendations...</p>}
// //     {error && <p style={{ color: "red" }}>{error}</p>}
// //     {!loading && !error && results.length === 0 && (
// //       <p>No recommendations found.</p>
// //     )}
// //     <div className="podcast-list-quiz">
// //       {results.map((p) => {
// //         const id = p.podcast_id || p.id;
// //         const img =
// //           p.cover_image_url || p.imageUrl || getRandomFallbackImage(id);
// //         const altText = p.cover_image_alt_text || "Podcast cover";
// //         return (
// //           <CardsEntry
// //             key={id}
// //             id={id}
// //             img={img}
// //             altText={altText}
// //             name={p.title || p.name}
// //             description={p.description}
// //             genre={p.genre_name || p.genre}
// //             duration={`Episodes: ${p.episode_count || p.duration}`}
// //             hosts={p.hosts || []}
// //             averageRating={p.average_rating || p.averageRating}
// //             mode="compact"
// //             linkTo={() => navigate(`/podcasts/${id}`)}
// //           />
// //         );
// //       })}
// //     </div>
// //   </div>
// // )}
// //   </section>
// //   );
// // } 


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getRandomByGenre } from "../api";
// import CardsEntry from "../components/CardsEntry";
// import { getRandomFallbackImage } from "../utils/fallbackImage";

// export default function Quiz() {
//   const [answers, setAnswers] = useState([]);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const questions = [
//     {
//       title: "What kind of story appeals most to you?",
//       options: [
//         "A real-life account that opens your eyes",
//         "A high-stakes mystery with layered twists",
//         "A surreal narrative that bends reality",
//         "An immersive world of magic and quests",
//         "A quirky, character-driven quest full of dice rolls",
//       ],
//     },
//   ];

//   const answerToGenreMap = {
//     "A real-life account that opens your eyes": "crime",
//     "A high-stakes mystery with layered twists": "storytelling",
//     "A surreal narrative that bends reality": "fiction",
//     "An immersive world of magic and quests": "fantasy",
//     "A quirky, character-driven quest full of dice rolls": "dnd",
//   };

//   const genreIdToName = {
//     1: "crime",
//     2: "storytelling",
//     3: "fiction",
//     4: "fantasy",
//     5: "dnd",
//   };

//   const fetchRecommendations = async (selectedOption) => {
//     setLoading(true);
//     setError(null);
//     setResults([]);

//     const genre = answerToGenreMap[selectedOption] || "storytelling";

//     try {
//       const data = await getRandomByGenre(genre);

//       let podcastsArray;

//       if (Array.isArray(data)) {
//         podcastsArray = data;
//       } else if (data.podcast_id) {
//         podcastsArray = [data];
//       } else if (data.podcasts) {
//         podcastsArray = data.podcasts;
//       } else {
//         throw new Error("Unexpected response format");
//       }

//       const podcastsWithGenreName = podcastsArray.map((podcast) => ({
//         ...podcast,
//         genre_name: genreIdToName[podcast.genre_id] || "unknown",
//       }));

//       setResults(podcastsWithGenreName);
//       setAnswers([selectedOption]); // save choice
//     } catch (error) {
//       setError("Failed to fetch recommendations. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetQuiz = () => {
//     setAnswers([]);
//     setResults([]);
//     setError(null);
//   };

//   return (
//     <section className="section_quiz container">
//       {/* Quiz or Results */}
//       <div className="quiz-card sm-container">
//         {answers.length === 0 ? (
//           <>
//             <h2 className="quiz-title">Which Podcast Matches Your Vibe?</h2>
//             <p className="quiz-question">{questions[0].title}</p>
//             <div className="quiz-options">
//               {questions[0].options.map((opt) => (
//                 <button
//                   className="btn__quiz-option"
//                   key={opt}
//                   onClick={() => fetchRecommendations(opt)}
//                 >
//                   {opt}
//                 </button>
//               ))}
//             </div>
//           </>
//         ) : (
//           <>
//             <h2>Your quiz is complete!</h2>
//             <button className="btn__quiz-complete" onClick={resetQuiz}>
//               Retake Quiz
//             </button>
//           </>
//         )}
//       </div>

//       {/* Recommendations */}
//       {answers.length > 0 && (
//         <div className={`podcast-results-quiz ${!loading ? "show" : ""}`}>
//           <h2>Recommended Podcasts</h2>
//           {loading && <p>Loading recommendations...</p>}
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           {!loading && !error && results.length === 0 && (
//             <p>No recommendations found.</p>
//           )}
//           <div className="podcast-list-quiz">
//             {results.map((p) => {
//               const id = p.podcast_id || p.id;
//               const img =
//                 p.cover_image_url || p.imageUrl || getRandomFallbackImage(id);
//               const altText = p.cover_image_alt_text || "Podcast cover";
//               return (
//                 <CardsEntry
//                   key={id}
//                   id={id}
//                   img={img}
//                   altText={altText}
//                   name={p.title || p.name}
//                   description={p.description}
//                   genre={p.genre_name || p.genre}
//                   duration={`Episodes: ${p.episode_count || p.duration}`}
//                   hosts={p.hosts || []}
//                   averageRating={p.average_rating || p.averageRating}
//                   mode="compact"
//                   linkTo={() => navigate(`/podcasts/${id}`)}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getRandomByGenre } from "../api";
// import CardsEntry from "../components/CardsEntry";
// import { getRandomFallbackImage } from "../utils/fallbackImage";

// export default function Quiz() {
//   const [answers, setAnswers] = useState([]);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const questions = [
//     {
//       title: "What kind of story appeals most to you?",
//       options: [
//         "A real-life account that opens your eyes",
//         "A high-stakes mystery with layered twists",
//         "A surreal narrative that bends reality",
//         "An immersive world of magic and quests",
//         "A quirky, character-driven quest full of dice rolls",
//       ],
//     },
//   ];

//   const answerToGenreMap = {
//     "A real-life account that opens your eyes": "crime",
//     "A high-stakes mystery with layered twists": "storytelling",
//     "A surreal narrative that bends reality": "fiction",
//     "An immersive world of magic and quests": "fantasy",
//     "A quirky, character-driven quest full of dice rolls": "dnd",
//   };

//   const genreIdToName = {
//     1: "crime",
//     2: "storytelling",
//     3: "fiction",
//     4: "fantasy",
//     5: "dnd",
//   };

//   const handleAnswerSelect = async (option) => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setAnswers([option]); // save selected answer

//     const genre = answerToGenreMap[option] || "storytelling";

//     try {
//       const data = await getRandomByGenre(genre);

//       let podcastsArray;

//       if (Array.isArray(data)) {
//         podcastsArray = data;
//       } else if (data.podcast_id) {
//         podcastsArray = [data];
//       } else if (data.podcasts) {
//         podcastsArray = data.podcasts;
//       } else {
//         podcastsArray = [];
//       }

//       const podcastsWithGenreName = podcastsArray.map((podcast) => ({
//         ...podcast,
//         genre_name: genreIdToName[podcast.genre_id] || "unknown",
//       }));

//       setResults(podcastsWithGenreName);

//       if (podcastsWithGenreName.length === 0) {
//         setError("No podcasts match that choice. Try another option.");
//       }

//     } catch (err) {
//       setError("Failed to fetch recommendations. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetQuiz = () => {
//     setAnswers([]);
//     setResults([]);
//     setError(null);
//   };

//   return (
//     // <section className="section_quiz container">
//     //   <div className="quiz-card sm-container">
//     //     {!answers.length ? (
//     //       <>
//     //         <h2 className="quiz-title">Which Podcast Matches Your Vibe?</h2>
//     //         <p className="quiz-question">{questions[0].title}</p>
//     //         <div className="quiz-options">
//     //           {questions[0].options.map((opt) => (
//     //             <button
//     //               className="btn__quiz-option"
//     //               key={opt}
//     //               onClick={() => handleAnswerSelect(opt)}
//     //             >
//     //               {opt}
//     //             </button>
//     //           ))}
//     //         </div>
//     //       </>
//     //     ) : (
//     //       <>
//     //         <h2>Your quiz is complete!</h2>
//     //         <button className="btn__quiz-complete" onClick={resetQuiz}>
//     //           Retake Quiz
//     //         </button>
//     //       </>
//     //     )}
//     //   </div>

//     //   {/* Recommendations */}
//     //   {answers.length > 0 && (
//     //     <div className={`podcast-results-quiz ${!loading ? "show" : ""}`}>
//     //       <h2>Recommended Podcasts</h2>
//     //       {loading && <p>Loading recommendations...</p>}
//     //       {error && <p style={{ color: "red" }}>{error}</p>}
//     //       {!loading && !error && results.length === 0 && (
//     //         <p>No podcasts found for that choice.</p>
//     //       )}
//     //       <div className="podcast-list-quiz">
//     //         {results.map((p) => {
//     //           const id = p.podcast_id || p.id;
//     //           const img =
//     //             p.cover_image_url || p.imageUrl || getRandomFallbackImage(id);
//     //           const altText = p.cover_image_alt_text || "Podcast cover";
//     //           return (
//     //             <CardsEntry
//     //               key={id}
//     //               id={id}
//     //               img={img}
//     //               altText={altText}
//     //               name={p.title || p.name}
//     //               description={p.description}
//     //               genre={p.genre_name || p.genre}
//     //               duration={`Episodes: ${p.episode_count || p.duration}`}
//     //               hosts={p.hosts || []}
//     //               averageRating={p.average_rating || p.averageRating}
//     //               mode="compact"
//     //               linkTo={() => navigate(`/podcasts/${id}`)}
//     //             />
//     //           );
//     //         })}
//     //       </div>
//     //     </div>
//     //   )}
//     // </section>


//     <section className="section_quiz container">
//   <div className="quiz-card sm-container">
//     {!answers.length ? (
//       <>
//         <h2 className="quiz-title">Which Podcast Matches Your Vibe?</h2>
//         <p className="quiz-question">{questions[0].title}</p>
//         <div className="quiz-options">
//           {questions[0].options.map((opt) => (
//             <button
//               className="btn__quiz-option"
//               key={opt}
//               onClick={() => handleAnswerSelect(opt)}
//             >
//               {opt}
//             </button>
//           ))}
//         </div>
//       </>
//     ) : (
//       <>
//         <h2>Your quiz is complete!</h2>
//         <button className="btn__quiz-complete" onClick={resetQuiz}>
//           Retake Quiz
//         </button>
//       </>
//     )}
//   </div>

//   {answers.length > 0 && (
//     <div className={`podcast-results-quiz ${!loading ? "show" : ""}`}>
//       <h2>Recommended Podcasts</h2>
//       {loading && <p>Loading recommendations...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {!loading && !error && results.length === 0 && (
//         <p>No podcasts found for that choice.</p>
//       )}
//       <div className="podcast-list-quiz">
//         {results.map((p) => {
//           const id = p.podcast_id || p.id;
//           const img =
//             p.cover_image_url || p.imageUrl || getRandomFallbackImage(id);
//           const altText = p.cover_image_alt_text || "Podcast cover";
//           return (
//             <CardsEntry
//               key={id}
//               id={id}
//               img={img}
//               altText={altText}
//               name={p.title || p.name}
//               description={p.description}
//               genre={p.genre_name || p.genre}
//               duration={`Episodes: ${p.episode_count || p.duration}`}
//               hosts={p.hosts || []}
//               averageRating={p.average_rating || p.averageRating}
//               mode="compact"
//               linkTo={() => navigate(`/podcasts/${id}`)}
//             />
//           );
//         })}
//       </div>
//     </div>
//   )}
// </section>
//   );
// }





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getRandomByGenre } from "../api";
// import CardsEntry from "../components/CardsEntry";
// import { getRandomFallbackImage } from "../utils/fallbackImage";

// export default function Quiz() {
//   const [answers, setAnswers] = useState([]);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // Updated questions with icons
//   const questions = [
//     {
//       title: "What kind of story appeals most to you?",
//       options: [
//         { text: "A real-life account that opens your eyes", icon: "🕵️‍♂️" },
//         { text: "A high-stakes mystery with layered twists", icon: "🕵️‍♀️" },
//         { text: "A surreal narrative that bends reality", icon: "🎭" },
//         { text: "An immersive world of magic and quests", icon: "🧙‍♂️" },
//         { text: "A quirky, character-driven quest full of dice rolls", icon: "🎲" },
//       ],
//     },
//   ];

//   const answerToGenreMap = {
//     "A real-life account that opens your eyes": "crime",
//     "A high-stakes mystery with layered twists": "storytelling",
//     "A surreal narrative that bends reality": "fiction",
//     "An immersive world of magic and quests": "fantasy",
//     "A quirky, character-driven quest full of dice rolls": "dnd",
//   };

//   const genreIdToName = {
//     1: "crime",
//     2: "storytelling",
//     3: "fiction",
//     4: "fantasy",
//     5: "dnd",
//   };

//   const handleAnswerSelect = async (optionText) => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setAnswers([optionText]);

//     const genre = answerToGenreMap[optionText] || "storytelling";

//     try {
//       const data = await getRandomByGenre(genre);

//       let podcastsArray;

//       if (Array.isArray(data)) {
//         podcastsArray = data;
//       } else if (data.podcast_id) {
//         podcastsArray = [data];
//       } else if (data.podcasts) {
//         podcastsArray = data.podcasts;
//       } else {
//         podcastsArray = [];
//       }

//       const podcastsWithGenreName = podcastsArray.map((podcast) => ({
//         ...podcast,
//         genre_name: genreIdToName[podcast.genre_id] || "unknown",
//       }));

//       setResults(podcastsWithGenreName);

//       if (podcastsWithGenreName.length === 0) {
//         setError("No podcasts match that choice. Try another option.");
//       }
//     } catch (err) {
//       setError("Failed to fetch recommendations. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetQuiz = () => {
//     setAnswers([]);
//     setResults([]);
//     setError(null);
//   };

//   return (
//     <section className="section_quiz container">
//       <div className="quiz-card sm-container">
//         {!answers.length ? (
//           <>
//             <h2 className="quiz-title">Which Podcast Matches Your Vibe?</h2>
//             <p className="quiz-question">{questions[0].title}</p>
//             <div className="quiz-options">
//               {questions[0].options.map((opt) => (
//                 <button
//                   className="btn__quiz-option"
//                   key={opt.text}
//                   onClick={() => handleAnswerSelect(opt.text)}
//                 >
//                   <span style={{ marginRight: "0.5em" }}>{opt.icon}</span>
//                   {opt.text}
//                 </button>
//               ))}
//             </div>
//           </>
//         ) : (
//           <>
//           {/* <div className="quiz-complete-header">
//             <h2>Your quiz is complete!</h2> */}
//             <button className="btn__quiz-complete" onClick={resetQuiz}>
//               Retake Quiz
//             </button>
//           {/* </div> */}
//           </>
//         )}
//       </div>

//       {answers.length > 0 && (
//         <div className={`podcast-results-quiz ${!loading ? "show" : ""}`}>
//           <h2>Recommended Podcasts</h2>
//           {loading && <p>Loading recommendations...</p>}
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           {!loading && !error && results.length === 0 && (
//             <p>No podcasts found for that choice.</p>
//           )}
//           <div className="podcast-list-quiz">
//             {results.map((p) => {
//               const id = p.podcast_id || p.id;
//               const img =
//                 p.cover_image_url || p.imageUrl || getRandomFallbackImage(id);
//               const altText = p.cover_image_alt_text || "Podcast cover";
//               return (
//                 <CardsEntry
//                   key={id}
//                   id={id}
//                   img={img}
//                   altText={altText}
//                   name={p.title || p.name}
//                   description={p.description}
//                   genre={p.genre_name || p.genre}
//                   duration={`Episodes: ${p.episode_count || p.duration}`}
//                   hosts={p.hosts || []}
//                   averageRating={p.average_rating || p.averageRating}
//                   mode="compact"
//                   linkTo={() => navigate(`/podcasts/${id}`)}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getRandomByGenre } from "../api";
// import CardsEntry from "../components/CardsEntry";
// import { getRandomFallbackImage } from "../utils/fallbackImage";

// export default function Quiz() {
//   const [answers, setAnswers] = useState([]);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const questions = [
//     {
//       title: "What kind of story appeals most to you?",
//       options: [
//         { text: "A real-life account that opens your eyes", icon: "🕵️‍♂️" },
//         { text: "A high-stakes mystery with layered twists", icon: "🕵️‍♀️" },
//         { text: "A surreal narrative that bends reality", icon: "🎭" },
//         { text: "An immersive world of magic and quests", icon: "🧙‍♂️" },
//         { text: "A quirky, character-driven quest full of dice rolls", icon: "🎲" },
//       ],
//     },
//   ];

//   const answerToGenreMap = {
//     "A real-life account that opens your eyes": "crime",
//     "A high-stakes mystery with layered twists": "storytelling",
//     "A surreal narrative that bends reality": "fiction",
//     "An immersive world of magic and quests": "fantasy",
//     "A quirky, character-driven quest full of dice rolls": "dnd",
//   };

//   const genreIdToName = {
//     1: "crime",
//     2: "storytelling",
//     3: "fiction",
//     4: "fantasy",
//     5: "dnd",
//   };

//   const handleAnswerSelect = async (optionText) => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setAnswers([optionText]);

//     const genre = answerToGenreMap[optionText] || "storytelling";

//     try {
//       const data = await getRandomByGenre(genre);

//       let podcastsArray;

//       if (Array.isArray(data)) {
//         podcastsArray = data;
//       } else if (data.podcast_id) {
//         podcastsArray = [data];
//       } else if (data.podcasts) {
//         podcastsArray = data.podcasts;
//       } else {
//         podcastsArray = [];
//       }

//       const podcastsWithGenreName = podcastsArray.map((podcast) => ({
//         ...podcast,
//         genre_name: genreIdToName[podcast.genre_id] || "unknown",
//       }));

//       setResults(podcastsWithGenreName);

//       if (podcastsWithGenreName.length === 0) {
//         setError("No podcasts match that choice. Try another option.");
//       }
//     } catch (err) {
//       setError("Failed to fetch recommendations. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetQuiz = () => {
//     setAnswers([]);
//     setResults([]);
//     setError(null);
//   };

//   return (
//     <section className="section_quiz container">
//       <div className="quiz-card sm-container">
//         {!answers.length && (
//           <>
//             <h2 className="quiz-title">Which Podcast Matches Your Vibe?</h2>
//             <p className="quiz-question">{questions[0].title}</p>
//             <div className="quiz-options">
//               {questions[0].options.map((opt) => (
//                 <button
//                   className="btn__quiz-option"
//                   key={opt.text}
//                   onClick={() => handleAnswerSelect(opt.text)}
//                 >
//                   <span style={{ marginRight: "0.5em" }}>{opt.icon}</span>
//                   {opt.text}
//                 </button>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {answers.length > 0 && (
//         <>
//           <div className={`podcast-results-quiz ${!loading ? "show" : ""}`}>
//             <h2>Recommended Podcasts</h2>
//             {loading && <p>Loading recommendations...</p>}
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             {!loading && !error && results.length === 0 && (
//               <p>No podcasts found for that choice.</p>
//             )}
//             <div className="podcast-list-quiz">
//               {results.map((p) => {
//                 const id = p.podcast_id || p.id;
//                 const img =
//                   p.cover_image_url || p.imageUrl || getRandomFallbackImage(id);
//                 const altText = p.cover_image_alt_text || "Podcast cover";
//                 return (
//                   <CardsEntry
//                     key={id}
//                     id={id}
//                     img={img}
//                     altText={altText}
//                     name={p.title || p.name}
//                     description={p.description}
//                     genre={p.genre_name || p.genre}
//                     duration={`Episodes: ${p.episode_count || p.duration}`}
//                     hosts={p.hosts || []}
//                     averageRating={p.average_rating || p.averageRating}
//                     mode="compact"
//                     linkTo={() => navigate(`/podcasts/${id}`)}
//                   />
//                 );
//               })}
//             </div>
//           </div>

//           {/* Retake Quiz button below the results */}
//           <div style={{ textAlign: "center", marginTop: "2rem" }}>
//             <button className="btn__quiz-complete" onClick={resetQuiz}>
//               Retake Quiz
//             </button>
//           </div>
//         </>
//       )}
//     </section>
//   );
// }





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getRandomByGenre } from "../api";
// import CardsEntry from "../components/CardsEntry";
// import { getRandomFallbackImage } from "../utils/fallbackImage";

// export default function Quiz() {
//   const [answers, setAnswers] = useState([]);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();


//   // Quiz questions with icons
//   const questions = [
//     {
//       title: "What kind of story appeals most to you?",
//       options: [
//         { text: "A real-life account that opens your eyes", icon: "🕵️‍♂️" },
//         { text: "A high-stakes mystery with layered twists", icon: "🕵️‍♀️" },
//         { text: "A surreal narrative that bends reality", icon: "🎭" },
//         { text: "An immersive world of magic and quests", icon: "🧙‍♂️" },
//         { text: "A quirky, character-driven quest full of dice rolls", icon: "🎲" },
//       ],
//     },
//   ];

//   const answerToGenreMap = {
//     "A real-life account that opens your eyes": "crime",
//     "A high-stakes mystery with layered twists": "storytelling",
//     "A surreal narrative that bends reality": "fiction",
//     "An immersive world of magic and quests": "fantasy",
//     "A quirky, character-driven quest full of dice rolls": "dnd",
//   };

//   const genreIdToName = {
//     1: "crime",
//     2: "storytelling",
//     3: "fiction",
//     4: "fantasy",
//     5: "dnd",
//   };

//   const handleAnswerSelect = async (optionText) => {
//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setAnswers([optionText]);

//     const genre = answerToGenreMap[optionText] || "storytelling";

//     try {
//       const data = await getRandomByGenre(genre);

//       let podcastsArray;

//       if (Array.isArray(data)) {
//         podcastsArray = data;
//       } else if (data.podcast_id) {
//         podcastsArray = [data];
//       } else if (data.podcasts) {
//         podcastsArray = data.podcasts;
//       } else {
//         podcastsArray = [];
//       }

//       const podcastsWithGenreName = podcastsArray.map((podcast) => ({
//         ...podcast,
//         genre_name: genreIdToName[podcast.genre_id] || "unknown",
//       }));

//       setResults(podcastsWithGenreName);

//       if (podcastsWithGenreName.length === 0) {
//         setError("No podcasts match that choice. Try another option.");
//       }
//     } catch (err) {
//       setError("Failed to fetch recommendations. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetQuiz = () => {
//     setAnswers([]);
//     setResults([]);
//     setError(null);
//   };



// return (
//   <>
//     {/* Quiz Card */}
//     {!answers.length && (
//       <section className="section_quiz container">
//         <div className="quiz-card sm-container">
//           <h2 className="quiz-title">Which Podcast Matches Your Vibe?</h2>
//           <p className="quiz-question">{questions[0].title}</p>
//           <div className="quiz-options">
//             {questions[0].options.map((opt) => (
//               <button
//                 className="btn__quiz-option"
//                 key={opt.text}
//                 onClick={() => handleAnswerSelect(opt.text)}
//               >
//                 <span style={{ marginRight: "0.5em" }}>{opt.icon}</span>
//                 {opt.text}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>
//     )}

//     {/* Podcast Results */}
//     {answers.length > 0 && (
//       <section className="podcast-results-section">
//         <div className={`podcast-results-quiz ${!loading ? "show" : ""}`}>
//           <h2>Recommended Podcasts</h2>
//           {loading && <p>Loading recommendations...</p>}
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           {!loading && !error && results.length === 0 && (
//             <p>No podcasts found for that choice.</p>
//           )}
//           <div className="podcast-list-quiz">
//             {results.map((p) => {
//               const id = p.podcast_id || p.id;
//               const img =
//                 p.cover_image_url || p.imageUrl || getRandomFallbackImage(id);
//               const altText = p.cover_image_alt_text || "Podcast cover";
//               return (
//                 <CardsEntry
//                   key={id}
//                   id={id}
//                   img={img}
//                   altText={altText}
//                   name={p.title || p.name}
//                   description={p.description}
//                   genre={p.genre_name || p.genre}
//                   duration={`Episodes: ${p.episode_count || p.duration}`}
//                   hosts={p.hosts || []}
//                   averageRating={p.average_rating || p.averageRating}
//                   mode="compact"
//                   linkTo={() => navigate(`/podcasts/${id}`)}
//                 />
//               );
//             })}
//           </div>

//           <button className="btn__quiz-complete" onClick={resetQuiz}>
//             Retake Quiz
//           </button>
//         </div>
//       </section>
//     )}
//   </>
// );
// }



// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { getRandomByGenre } from "../api";
// // import CardsEntry from "../components/CardsEntry";
// // import { getRandomFallbackImage } from "../utils/fallbackImage";
// // // import "./Quiz.css"; // make sure your CSS file is imported

// // export default function Quiz() {
// //   const [answers, setAnswers] = useState([]);
// //   const [results, setResults] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const navigate = useNavigate();

// //   const questions = [
// //     {
// //       title: "What kind of story appeals most to you?",
// //       options: [
// //         { text: "A real-life account that opens your eyes", icon: "🕵️‍♂️" },
// //         { text: "A high-stakes mystery with layered twists", icon: "🕵️‍♀️" },
// //         { text: "A surreal narrative that bends reality", icon: "🎭" },
// //         { text: "An immersive world of magic and quests", icon: "🧙‍♂️" },
// //         { text: "A quirky, character-driven quest full of dice rolls", icon: "🎲" },
// //       ],
// //     },
// //   ];

// //   const answerToGenreMap = {
// //     "A real-life account that opens your eyes": "crime",
// //     "A high-stakes mystery with layered twists": "storytelling",
// //     "A surreal narrative that bends reality": "fiction",
// //     "An immersive world of magic and quests": "fantasy",
// //     "A quirky, character-driven quest full of dice rolls": "dnd",
// //   };

// //   const genreIdToName = {
// //     1: "crime",
// //     2: "storytelling",
// //     3: "fiction",
// //     4: "fantasy",
// //     5: "dnd",
// //   };

// //   const handleAnswerSelect = async (optionText) => {
// //     setLoading(true);
// //     setError(null);
// //     setResults([]);
// //     setAnswers([optionText]);

// //     const genre = answerToGenreMap[optionText] || "storytelling";

// //     try {
// //       const data = await getRandomByGenre(genre);
// //       let podcastsArray;

// //       if (Array.isArray(data)) {
// //         podcastsArray = data;
// //       } else if (data.podcast_id) {
// //         podcastsArray = [data];
// //       } else if (data.podcasts) {
// //         podcastsArray = data.podcasts;
// //       } else {
// //         podcastsArray = [];
// //       }

// //       const podcastsWithGenreName = podcastsArray.map((podcast) => ({
// //         ...podcast,
// //         genre_name: genreIdToName[podcast.genre_id] || "unknown",
// //       }));

// //       setResults(podcastsWithGenreName);

// //       if (podcastsWithGenreName.length === 0) {
// //         setError("Hmm, no podcasts matched that choice. Try another vibe!");
// //       }
// //     } catch (err) {
// //       setError(
// //         "Oops! Something went wrong. Try selecting another option for some great podcasts!"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const resetQuiz = () => {
// //     setAnswers([]);
// //     setResults([]);
// //     setError(null);
// //   };

// //   return (
// //     <section className="section_quiz">
// //       {/* Quiz Card */}
// //       <div
// //         className={`quiz-card ${answers.length ? "slide-out" : "slide-in"}`}
// //       >
// //         {!answers.length && (
// //           <>
// //             <h2 className="quiz-title">Which Podcast Matches Your Vibe?</h2>
// //             <p className="quiz-question">{questions[0].title}</p>
// //             <div className="quiz-options">
// //               {questions[0].options.map((opt) => (
// //                 <button
// //                   className="btn__quiz-option"
// //                   key={opt.text}
// //                   onClick={() => handleAnswerSelect(opt.text)}
// //                 >
// //                   <span style={{ marginRight: "0.5em" }}>{opt.icon}</span>
// //                   {opt.text}
// //                 </button>
// //               ))}
// //             </div>
// //           </>
// //         )}
// //       </div>

// //       {/* Podcast Results */}
// //       {answers.length > 0 && (
// //         <div
// //           className={`podcast-results-quiz fade-in-slide ${
// //             !loading ? "show" : ""
// //           }`}
// //         >
// //           <h2>Recommended Podcasts</h2>
// //           {loading && <p>Loading recommendations...</p>}
// //           {error && <p style={{ color: "inherit" }}>{error}</p>}
// //           {!loading && !error && results.length === 0 && (
// //             <p>No podcasts found for that choice. Try another vibe!</p>
// //           )}
// //           <div className="podcast-list-quiz">
// //             {results.map((p) => {
// //               const id = p.podcast_id || p.id;
// //               const img =
// //                 p.cover_image_url || p.imageUrl || getRandomFallbackImage(id);
// //               const altText = p.cover_image_alt_text || "Podcast cover";
// //               return (
// //                 <CardsEntry
// //                   key={id}
// //                   id={id}
// //                   img={img}
// //                   altText={altText}
// //                   name={p.title || p.name}
// //                   description={p.description}
// //                   genre={p.genre_name || p.genre}
// //                   duration={`Episodes: ${p.episode_count || p.duration}`}
// //                   hosts={p.hosts || []}
// //                   averageRating={p.average_rating || p.averageRating}
// //                   mode="compact"
// //                   linkTo={() => navigate(`/podcasts/${id}`)}
// //                 />
// //               );
// //             })}
// //           </div>

// //           <button className="btn__quiz-complete" onClick={resetQuiz}>
// //             Retake Quiz
// //           </button>
// //         </div>
// //       )}
// //     </section>
// //   );
// // }





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomByGenre } from "../api";
import CardsEntry from "../components/CardsEntry";
import { getRandomFallbackImage } from "../utils/fallbackImage";


export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
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
        "Oops! Something went wrong. Maybe try a different option for some great podcasts!"
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
            <h2 className="quiz-title">Which Podcast Matches Your Vibe?</h2>
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