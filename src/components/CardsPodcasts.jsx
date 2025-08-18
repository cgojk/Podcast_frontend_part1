import React from "react"

import Star from "./Star.jsx" // Importing the Star component for favorite functionality

export default function CardsPodcasts(){

    const [podcastsCard, setPodcastsCard]= React.useState({
        Name:"The Daily",
        Description:"A daily news podcast by The New York Times.",
        Image:"/images/podcast_crime.png",
        Link:"https://www.nytimes.com/column/the-daily",
        Category:"News",
        isFavorite:true
    

})
   

    function toggleFavorite() {
        setPodcastsCard(prevState => ({
            ...prevState,
            isFavorite: !prevState.isFavorite
        }));
        console.log("Toggle Favorite")
        
    }

    return (
        <section className="container">
            <article className="cardPodcasts">
                <div className="cart-image">
                    <img
                        src={podcastsCard.Image}
                        className="imagePodcasts"
                        alt="podcast cover image"
                    />
                </div>
                <div className="infoPodcasts">
                   <Star isFilled={podcastsCard.isFavorite}handleClick={toggleFavorite} />
                    <h2 className="name">
                        {podcastsCard.Name} 
                    </h2>
                    <p className="contact">{podcastsCard.Description}</p>
                    <p className="contact">{podcastsCard.Link}</p>
                    <p className="contact">{podcastsCard.Category}</p>
                </div>

            </article>
           </section>
     
    )
}
