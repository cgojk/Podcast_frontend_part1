
export default function Team(){
  const reviewsData = [
    {
      image: './images/about/team1.jpg',
      alt: 'Team Memeber CEO',
      text: 'Nakita is the CEO and founder of Corrupted Frequency, she is the one in charge of the company and the vision. Nakita’s favorite podcast genre is true crime!She keeps the team motivated .',
      name: 'Nakita Santucci',
    },
    {
      image: './images/about/team2-removebg.png',
      alt: 'A woman around 40 years old she is the one in charge of the Marketing',
      text: 'Logan keep the project running like the clockwork, balancing deadlines with a sharp ey for quality As our back-end architect, he ensures the database, server, and APIs work seamlessly',
      name: 'Logan Trundle',
    },
    {
      image: './images/about/team3.png',
      alt: 'Team Member Podcast Host',
      text: 'Catalina is one of our talented podcast hosts, known for her engaging storytelling and deep dives into complex topics. Her favorite podcast genre is investigative journalism!',
      name: 'Catalina Forero',
    },
    {
      image: './images/about/team4.jpg',
      alt: ' A woman her name is sarah and she is the one in charge of the design',
      text: 'Sarah is our creative director and designer, she is the one in charge of all the designs and the visual aspect of our podcasts. Sarah’s favorite podcast genre is storytelling!',
     
      name: 'Katrina Edillor',
    },
    {
      image: './images/about/team5.jpg',
      alt: 'a Men around 30 years old he is the one in charge of the development and audio Engineer',
      text: "Ella is our audio engineer and developer, he is the one in charge of the website and the audio quality of our podcasts. Ealla’s favorite podcast genre is storytelling!",
      name: 'Ella Smith',
    },
    {
      image: './images/about/team6.jpg',
      alt: 'A women black hair and glasses she is the one in charge of the social media',
      text: "Olivia is our social media manager, she is the one in charge of all our social media platforms and the community. Olivia’s favorite podcast genre is true crime!",
      name: 'Olivia Garcia',
    },
  ];


  return (
    <section className="about_team" aria-label="Corrupted Frequency Reviews">
         <h1 className="team-title"> Meet the Team</h1>
      <div className="testimonials__container  teams__container container">
       
        {reviewsData.map((review, index) => (
          <div className="aboutteam__card" 
          // testimonials__card" 
          key={index}>
            <div className="aboutteam__image-container ">
              <img className="aboutteam__image"src={review.image} alt={review.alt} />
            </div>
            <div className="aboutteam__card--content"> 
            {/* testimonials__card--content"> */}
             <h3 className="aboutteam__card-title"> 
              {/* testimonials__card-title"> */}{review.name}</h3>
              <p className="aboutteam__card-text">
                {/* testimonials__card-text"> */}{review.text}</p>
             
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}