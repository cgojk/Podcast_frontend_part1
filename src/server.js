// import { createServer, Model } from "miragejs"

// createServer({
//     models: {
//         podcasts: Model,
//         merches:Model,
        
//     },

//     seeds(server) {
//         server.create("podcast", {
//             id: "1",
//             genre:"crime",
//             name: "The Daily",
//             duration: "30",
//             description: "A daily news podcast from The New York Times, bringing context and clarity to the headlines.",
//             imageUrl: "https://tse4.mm.bing.net/th/id/OIP.lcG8BwvOPZbVSxWE1He85gHaHa?pid=Api",
//             audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            
            
//         })
//         server.create("podcast", {
//             id: "2",
//             genre:"dna",
//             name: "Beach Crimes",
//             duration: "45",
//             description: "Exploring mysterious and unsolved cases that happened by the coast.",
//             imageUrl:"https://tse3.mm.bing.net/th/id/OIP.V8J63PKxTjTGw3OPvbzfgwHaHa?pid=Api",
//             audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          
//         })
//         server.create("podcast", {
//             id: "3",
//             genre:"storytelling",
//             name: "Reliable Reports",
//             duration: "60",
//             description: "Weekly investigative journalism featuring deep dives into underreported stories.",
//             imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png",
//             audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
//         })
//         server.create("podcast", {
//             id: "4",
//             genre:"crime",
//             name: "Dream Talk",
//             duration: "25",
//             description: "A podcast about dream interpretation and exploring the unconscious mind.",
//             imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png",
//              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
//                     })


//         server.create("podcast", {
//             id: "5",
//             genre:"storytelling",
//             name: "The Cruiser Cast",
//             duration: "50",
//             description: "Luxury lifestyle and travel stories from those who live life on the road.",
//             imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png",
//              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
//         })
//         server.create("podcast", {
//             id: "6",
//             genre:"fiction",
//             name: "Green Future",
//             duration: "40",
//             description: "Sustainable innovation and green energy tech, hosted by eco-enthusiasts.",
//             imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png",
//              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
//         })

//         server.create("podcast", {
//             id: "7",
//             genre:"dna",
//             name: "The Tech Talk",
//             duration: "35",
//             description: "Latest trends in technology, featuring interviews with industry leaders.",
//             imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png",
//              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
//         })

// //  creation of the merch items 
//     server.create("merch", {
//       id: "1",
//       name: "Crime Podcast Hoodie",
//       genre: "crime",
//       price: 29.99,
//       description: "A daily news podcast from The New York Times, bringing context and clarity to the headlines.",
//       imageUrl: "https://tse4.mm.bing.net/th/id/OIP.lcG8BwvOPZbVSxWE1He85gHaHa?pid=Api",
//       audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//       duration: "45 min"
//     })

//     server.create("merch", {
//       id: "2",
//       name: "Crime Podcast Hoodie",
//       genre: "crime",
//       price: 29.99,
//       description: "A daily news podcast from The New York Times, bringing context and clarity to the headlines.",
//       imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png",
//       duration: "60 min",
//        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
//     })

//     server.create("merch", {
//       id: "3",
//       name: "DNA Logo Mug",
//        genre: "dna",
//       price: 14.99,
//       description: "A podcast about dream interpretation and exploring the unconscious mind.",
//       imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png",
//       audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//       duration: "30 min"
//     })

//     server.create("merch", {
//     id: "4",
//     name: "Storytelling Cap",
//     genre: "storytelling",
//     price: 19.99,
//     description: "Luxury lifestyle and travel stories from those who live life on the road.",
//     imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//     duration: "20 min"
//     })

//     server.create("merch", {
//       id: "5",
//       name: "Fiction Sticker Pack",
//            genre: "fiction",
//       price: 6.99,
//       description: "Sustainable innovation and green energy tech, hosted by eco-enthusiasts.",
//       imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png",
//       audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//       duration: "10 min"
//     })

//      server.create("merch", {
//       id: "6",
//       name: "DNA Logo Mug",
//        genre: "dna",
//       price: 14.99,
//       description: "Latest trends in technology, featuring interviews with industry leaders.",
//       imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png",
//       audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//       duration: "30 min"
//     })

//     server.create("merch", {
//     id: "7",
//     name: "Storytelling Cap",
//     genre: "storytelling",
//     price: 19.99,
//     description: "Luxury lifestyle and travel stories from those who live life on the road.",
//     imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//     duration: "20 min"
//     })


//     server.create("merch", {
//       id: "8",
//       name: "Fiction Sticker Pack",
//       genre: "fiction",
//       price: 6.99,
//       description: "Sustainable innovation and green energy tech, hosted by eco-enthusiasts.",
//       imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png",
//       audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//       duration: "10 min"
//     })
//   },



    

 

// routes() {
//   this.namespace = "api"
//   this.logging = false

//   this.get("/podcasts", (schema, request) => {
//     const genre = request.queryParams.genre?.toLowerCase()
//     let podcasts = schema.podcasts.all().models

//     if (genre) {
//       podcasts = podcasts.filter(podcast =>
//         podcast.genre && podcast.genre.toLowerCase() === genre
//       )
//     }

//     return { podcasts}
//   })

//   this.get("/podcasts/:id", (schema, request) => {
//     const id = request.params.id
//     return {
//       podcast: schema.podcasts.find(id)
//     }
//   })



      
//         this.get("/merches", (schema) => {
//             return schema.merches.all()
//         })
//         this.get("/merches/:id", (schema, request) => {
//             const id = request.params.id
//             return schema.merches.find(id)
//         })

//     }
// })