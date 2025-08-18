
export default function Team(){
  const reviewsData = [
    {
      image: './images/about/team1.jpg',
      alt: 'Team Memeber CEO',
      text: 'CEO of our wonderful team, He started this company when he was a teenager  and keeps everyone on track. Alex’s favorite podcast genre is True Crime!',
      name: 'Alex Iverson',
    },
    {
      image: './images/about/team2.png',
      alt: 'A woman around 40 years old she is the one in charge of the Marketing',
      text: 'Lara is our head of marketing and connections, she is in charge of finding our podcast talent and the community. Lara’s favorite podcast genre is fiction!',
      name: 'Lara Sadr',
    },
    {
      image: './images/about/team3.png',
      alt: 'Team Member Podcast Host',
      text: 'Norah is one of our talented podcast hosts, known for his engaging storytelling and deep dives into complex topics. His favorite podcast genre is investigative journalism!',
      name: 'Norah Bennett',
    },
    {
      image: './images/about/team4.jpg',
      alt: ' A woman her name is sarah and she is the one in charge of the design',
      text: 'Sarah is our creative director and designer, she is the one in charge of all the designs and the visual aspect of our podcasts. Sarah’s favorite podcast genre is storytelling!',
     
      name: 'Sarah Johnson',
    },
    {
      image: './images/about/team5.jpg',
      alt: 'a Men around 30 years old he is the one in charge of the development and audio Engineer',
      text: "Ethan is our audio engineer and developer, he is the one in charge of the website and the audio quality of our podcasts. Ethan’s favorite podcast genre is storytelling!",
      name: 'Ethan Smith',
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
          <div className="aboutteam__card testimonials__card" key={index}>
            <div className="aboutteam__image testimonials__image">
              <img src={review.image} alt={review.alt} />
            </div>
            <div className="aboutteam__card--content testimonials__card--content">
              <p className="aboutteam__card-text testimonials__card-text">{review.text}</p>
              <h3 className="aboutteam__card-title testimonials__card-title">{review.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}