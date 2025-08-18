import React from "react";
import Mission from "./Mission.jsx";

export default function Story() {
    return (
        <Mission
            sectionTitle="Our Story"
            imageSrc="/images/about/image2.jpg"
            imageAlt="Mission Image"
            heading="Our Story"
            text="Corrupted Frequency is a bold marketing website for
             podcast media groups. They dabble in the dark arts of storytelling.
              Adventures in Dungeons and Dragons, thrilling true crime investigations,
               creative stories and more, they are fine-tuned for the most creative
                listeners to enjoy compelling stories and gripping audio journeys.
                 They currently have dedicated fan base. They are always on the 
                 lookout for exciting new ideas 
            and concepts they can offer their support and resources to."
            reverse={true}
        />
    );
}