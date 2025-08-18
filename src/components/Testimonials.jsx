
export default function Testimonials(){
  const reviewsData = [
    {
      image: './images/testimonials/testimonial-1.jpg',
      alt: 'Reviewer 1',
      text: '"Corrupted Frequency is my favorite podcast right now. Deep, thought-provoking, and raw."',
      name: 'Ava Reynolds',
    },
    {
      image: './images/testimonials/testimonial-2.jpg',
      alt: 'Reviewer 2',
      text: '"I never miss an episode. It’s like diving into a twisted mirror of reality — in the best way!"',
      name: 'Liam Chen',
    },
    {
      image: './images/testimonials/testimonial-3.jpg',
      alt: 'Reviewer 3',
      text: '"The sound design and storytelling are next level. It pulls you in and keeps you hooked."',
      name: 'Noah Bennett',
    },
    {
      image: './images/testimonials/testimonial-4.jpg',
      alt: 'Reviewer 4',
      text: '"Every episode is a journey. I love the dark themes and the way they explore human nature."',
      name: 'Mia Johnson',
    },
    {
      image: './images/testimonials/testimonial-5.jpg',
      alt: 'Reviewer 5',
      text: '"A must-listen for anyone who loves deep, gritty storytelling. It’s addictive!"',
      name: 'Ethan Smith',
    },
    {
      image: './images/testimonials/testimonial-6.jpg',
      alt: 'Reviewer 6',
      text: '"Corrupted Frequency is unlike any other podcast. It’s raw, real, and utterly captivating."',
      name: 'Olivia Garcia',
    },
  ];


  return (
    <section className="testimonials" aria-label="Corrupted Frequency Reviews">
         <h2>Corrupted Frequency Reviews</h2>
      <div className="testimonials__container container">
       
        {reviewsData.map((review, index) => (
          <div className="testimonials__card" key={index}>
            <div className="testimonials__image">
              <img src={review.image} alt={review.alt} />
            </div>
            <div className="testimonials__card--content">
              <p className="testimonials__card-text">{review.text}</p>
              <h3 className="testimonials__card-title">{review.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}