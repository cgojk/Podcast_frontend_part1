
// export default function Team(){
//   const reviewsData = 
//     [
//   {
//     image: './images/about/team2.png',
//     alt: 'Portrait of Nakita Santucci, CEO and founder',
//     text: 'Nakita is the CEO and founder of Corrupted Frequency. She leads the company with vision and passion, overseeing UX design and keeping the team motivated. Her favourite podcast genre is true crime!',
//     name: 'Nakita Santucci',
//   },
//   {
//     image: './images/about/team1.png',
//     alt: 'Portrait of Logan Trundle, back-end architect',
//     text: 'Logan keeps projects running like clockwork, balancing deadlines with precision and quality. As our Back-End, he ensures databases, servers, and APIs work seamlessly. His favourite podcast genre is fiction!',
//     name: 'Logan Trundle',
//   },
//   {
//     image: './images/about/team3.png',
//     alt: 'Portrait of Catalina Forero, front-end developer',
//     text: 'Catalina is our Front-End, bringing designs to life. She transforms complex ideas into user-friendly features, ensuring smooth interaction for every visitor. Her big challenge is making technology accessible',
//     name: 'Catalina Forero',
//   },
//   {
//     image: './images/about/team4.png',
//     alt: 'Portrait of Katrina Edillor, information architect and project manager',
//     text: 'Katrina is our Information Architect and occasional Project Manager. She ensures clear structure and smooth collaboration across the project. She adds visual flair to our podcast application. Her favourite podcast genre is storytelling!',
//     name: 'Katrina Edillor',
//   },
//   {
//     image: './images/about/team6.png',
//     alt: 'Portrait of Ella Smith, UX designer',
//     text: 'Ella is our UX Designer, making sure structure, flow, and organisation stay clear and intuitive. She guides the creative process behind visuals, ensuring experiences are smooth and accessible. Her favourite podcast genre is storytelling!',
//     name: 'Ella Smith',
//   },
//   {
//     image: './images/about/team5.png',
//     alt: 'Portrait of Orlando Oliver, social media manager',
//     text: 'Orlando is our Social Media Manager, handling all platforms and community engagement with creativity and care. He connects listeners with our work and keeps conversations alive. His favourite podcast genre is true crime!',
//     name: 'Orlando Oliver',
//   },
// ]


//   return (
//     <section className="about_team" aria-label="Corrupted Frequency Reviews">
//          <h1 className="team-title"> Meet the Team</h1>
//       <div className="testimonials__container  teams__container container ">
       
//         {reviewsData.map((review, index) => (
//           <div className="aboutteam__card" 
//           // testimonials__card" 
//           key={index}>
//             <div className="aboutteam__image-container push-up ">
//               <img className="aboutteam__image"src={review.image} alt={review.alt} />
//             </div>
//             <div className="aboutteam__card--content"> 
//             {/* testimonials__card--content"> */}
//              <h3 className="aboutteam__card-title"> 
//               {/* testimonials__card-title"> */}{review.name}</h3>
//               <p className="aboutteam__card-text">
//                 {/* testimonials__card-text"> */}{review.text}</p>
             
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect } from 'react';
import { getAllTeamMembers } from '../api';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllTeamMembers()
      .then(data => {
        if (data) {
          const transformed = data.map(member => ({
            image: member.picture_url || './images/default-team.png',
            alt: member.image_alt_text || `Portrait of ${member.name}`,
            name: member.name,
            text: member.bio,
          }));
          setTeamMembers(transformed);
        }
        setError(null);
      })
      .catch(() => setError('Error loading team members'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading team members...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="about_team" aria-label="Corrupted Frequency Reviews">
      <h1 className="team-title"> Meet the Team</h1>
      <div className="testimonials__container teams__container container">
        {teamMembers.map((review, index) => (
          <div className="aboutteam__card" key={index}>
            <div className="aboutteam__image-container push-up">
              <img
                className="aboutteam__image"
                src={review.image}
                alt={review.alt}
              />
            </div>
            <div className="aboutteam__card--content">
              <h3 className="aboutteam__card-title">{review.name}</h3>
              <p className="aboutteam__card-text">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}