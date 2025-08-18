

export default function Mission({ sectionTitle, imageSrc, imageAlt, heading, text, reverse = false }) {
    return (
        <section className="mission-section">
            <h1 className="mission-title">{sectionTitle}</h1>
            <div className={`mission_container container ${reverse ? 'reverse' : ''}`}>
                <div className="mission-container_image">
                    <img className="mission-image" src={imageSrc} alt={imageAlt} />
                </div>
                <div className="container_text_mission">
                    <h1 className="mission-title_container">{heading}</h1>
                    <p className="mission-description">{text}</p>
                </div>
            </div>
        </section>
    );
}