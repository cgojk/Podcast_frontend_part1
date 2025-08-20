import { useState } from "react";


export default function LazyImage({ src, alt, className}) { 
    const [loaded, setLoaded] = useState(false)

    return (
        <div 
            className={`lazy-image-container ${className}`}
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1/1'
            }}
        >
            {!loaded && (
                <div className="placeholder"></div>
            )}
            <img 
                src={src} 
                alt={alt} 
                style={{
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.5s ease-in",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
                onLoad={() => setLoaded(true)}
            />
        </div>
    )
}