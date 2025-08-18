



import { Link } from "react-router-dom";
import { getRandomFallbackImage } from "../utils/fallbackImage"; // Import the utility function to get fallback images

export default function CardsEntry(props) {
  const {
    id,
    img,
    altText = "",
    name,
    genre,
    description,
    duration,
    hosts = [],
    averageRating = "N/A",
    linkTo,
    mode = "compact",
    onImageClick,
  } = props;

  const shortDescription = description
    ? description.slice(0, 100) + "..."
    : "No description available.";

  const fallbackImage = getRandomFallbackImage(id);
  const displayImage = img || fallbackImage;

  // Compact mode
  if (mode === "compact") {
    return (
      <article
        data-id={id}
        className="contact-card"
        onClick={() => {
          linkTo && linkTo();
        }}
      >
        <div className="cardItem">
          <div className="cardpodcasts_image">
            <img
              className="image_podcast"
              src={displayImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
              alt={altText || "Podcast cover"}
            />
          </div>
          <div className="infoPodcasts">
            <h3 className="title_podcasts_genre">{name}</h3>
            <span className={`genre-tag ${genre?.toLowerCase()} selected`}>
              {genre}
            </span>
            <p className="description_short">{shortDescription}</p>
          </div>
        </div>
      </article>
    );
  }

  // Full mode
  return (
    <article data-id={id} className="contact-card">
      <div className="cardItem">
        <div
          className="cardpodcasts_image"
          onClick={onImageClick}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onImageClick && onImageClick();
            }
          }}
        >
          <img
            className="image_podcast"
            src={displayImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
            alt={altText || `Cover of ${name}`}
          />
        </div>

        <div className="infoPodcasts">
          <div className="title_genre">
            <h3 className="title_podcasts_genre">{name}</h3>
            <span className={`genre-tag ${genre?.toLowerCase()} selected`}>
              {genre}
            </span>
          </div>

          <div className="info-group">
            <p>{description}</p>
          </div>

          <div className="info-group">
            <p className="duration_podcast">{duration}</p>
            <p className="hosts_podcast">
              <span className="label">Hosts:</span> {hosts.join(", ")}
            </p>
            <p className="rating_podcast">
              <span className="label">Rating:</span> {averageRating}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}