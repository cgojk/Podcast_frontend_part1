
import {useState} from 'react';



export default function Rating({color = 'gold'}) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [submitted, setSubmitted]=useState(false);
    // Array of stars from 1 to 5
    // This can is used to display the rating visually
    // or to allow users to select a rating
    const stars = Array.from ({length:5 }, (_,i)=> i + 1);

    const feedbackMessages = ['Terrible', 'Bad', 'Okay', 'Good', 'Excellent'];

    const handleSubmit = () => {
    if (rating >0){
      setSubmitted(true);
    
    }
  };

  const closeModal = () => {
    setSubmitted(false);
    setRating(0);
    setHover(0);
  }

    // This is a simple rating component that displays stars
    // and allows users to select a rating by hovering over the stars
  return (

    <div className="container rating-container">
        <h2>Rate your experience</h2>
    <div className="stars">
        {stars.map((star) => (
            <span
            onClick={()=>setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            key={star}
            className='star'
            style={{color: star <= (hover || rating) ? color : '#ccc'}}
            aria-label={`Rate ${star} out of 5`}
                 >

                 {'\u2605'}
                 </span>
            ))}
        
        
      </div>
      {rating >0  && <p className="feedback">{feedbackMessages[rating - 1]}</p>}
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled= {rating===0} // Disable button if no rating is selected


      >
        Submit Rating
        
        {/* {submitted ? 'Submitted!' : 'Submit Rating'} */}
      </button>
    {/* modal */}
    {submitted && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Thank you for your feedback!</h3>
          <p>Your rating: {rating} star{rating > 1 ? 's' : ''}</p>
          <button className="modal-close-button" onClick={closeModal}>
            X
          </button>
          <p>We appreciate your input and will use it to improve our service.</p>
        </div>

      </div>

    )}
  

    </div>
  );
}
