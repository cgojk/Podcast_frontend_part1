import { Link } from "react-router-dom"


export default function MerchCards({id,img,name,genre, price, description, duration}) {
    return (
      
             <article className="contact-card">
        <div className="cardItem">
                <div className="cardpodcasts_image">
                       <Link to={`/store/${id}`} 
                        aria-label={`View details for podcast "${name}", genre: ${genre}, description:${description}, duration: ${duration}, `}>
                           <img className="image_podcast"
                            src={img}
                            alt="podcast crime"/>
                       </Link>
               </div>
                   <div className ="infoPodcasts">
                        <div className="title_genre">
                          <h3 className="title_podcasts_genre">{name}</h3>
                          <span className={`genre-tag ${genre?.toLowerCase()} selected`}>{genre}</span>
                        </div>
                        <div className="info-group">
                            
                            <p>{description}</p>
                        </div>
                        <div className="info-group">
                             <p className="price_merch">{price}</p>
                            <p className="duration_podcast">{duration}</p>

                        </div>
                    </div>
        </div>
    </article>
   
    )
}





