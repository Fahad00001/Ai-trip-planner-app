import { GoogleGenerativeAI } from "@google/generative-ai";
  
  // eslint-disable-next-line no-undef
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

     export const chatSession = model.startChat({
      generationConfig,

      history: [
        {
            role:"user",
            parts:[
                {text:"Generate  travel plan  for location : las vegas , for 3 days  for couple with a cheap budget, give me  a  hotels options list with  hotelname, hotel address, price,  hotel image url , geo coordinates ,rating , description and suggest itinerary  with placename,place details , place image url, geo cordinates, tickets, pricing ,rating, time travel of ecah location  for 3 days  with each day plan  with best time  to visit in JSON format "

                },
            ],
        },

        {
            role:"model",
            parts:[
                {
                    text:"```json\n{n \"hotels\": [\n  {\n \"hotelname\": \"The D las vegas\",\n \"hoteladdress\": \"301 fremont  street , Las vegas, NV  89101\":,\n  \"prices\": \"$50-$100 per night\", \n    \"hotelinageurl\": \"https://www.theDcasino.com/images/hero/main-hero-02.jpg\",\n geocordinates\": \"36.1695, -115.1438\",\n \"rating\": \"3.5 stars\",\n  \"description\":\"A budget friendly hotel located in  downtown  Las vegas  witha retro vibe . it feature a casinoi, a pool , and several  dining option.\"\n  },\n \"hotelname\":"  


                }
            ]
        }

        
      ],
    });
  
  
  
  
  
// {
//     "hotels": [
//       {
//         "name": "The D Las Vegas",
//         "address": "301 Fremont Street, Las Vegas, NV 89101",
//         "price": "$$",
//         "imageUrl": "https://www.theconventions.com/media/photos/locations/9013/large/the-d-las-vegas-hotel-casino-las-vegas-nv-united-states-of-america.jpg",
//         "geoCoordinates": "36.1699° N, 115.1420° W",
//         "rating": 4,
//         "description": "A downtown Las Vegas hotel with a retro vibe, featuring a casino, multiple restaurants, and live entertainment."
//       },
//       {
//         "name": "Circus Circus Hotel & Casino",
//         "address": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",
//         "price": "$$",
//         "imageUrl": "https://media.timeout.com/images/103644213/image.jpg",
//         "geoCoordinates": "36.1241° N, 115.1694° W",
//         "rating": 3.5,
//         "description": "A budget-friendly option known for its circus acts, carnival midway, and casino."
//       },
//       {
//         "name": "Golden Nugget Hotel & Casino",
//         "address": "129 E Fremont St, Las Vegas, NV 89101",
//         "price": "$$$",
//         "imageUrl": "https://www.golden nugget.com/lasvegas/media/images/golden-nugget-las-vegas-hotel.jpg",
//         "geoCoordinates": "36.1693° N, 115.1404° W",
//         "rating": 4,
//         "description": "A historic downtown hotel with a large casino, a shark tank, and multiple dining options."
//       },
//       {
//         "name": "The Strat Hotel, Casino & SkyPod",
//         "address": "2000 Las Vegas Blvd S, Las Vegas, NV 89104",
//         "price": "$$",
//         "imageUrl": "https://images.trvl-media.com/media/content/hotels/4900000/4871000/4871700/4871723.jpg",
//         "geoCoordinates": "36.1259° N, 115.1638° W",
//         "rating": 4,
//         "description": "A tall hotel with an observation deck, a casino, restaurants, and a zip line."
//       }
//     ],
//     "itinerary": [
//       {
//         "day": "Day 1",
//         "plan": [
//           {
//             "time": "Morning (9:00 AM - 12:00 PM)",
//             "place": "Fremont Street Experience",
//             "details": "Walk the pedestrian-friendly Fremont Street Experience, featuring a canopy of lights and free live entertainment.",
//             "imageUrl": "https://www.visitlasvegas.com/media/images/freemont-street-experience.jpg",
//             "geoCoordinates": "36.1695° N, 115.1422° W",
//             "ticketPricing": "Free",
//             "rating": 4.5,
//             "travelTime": "10 minutes from most downtown hotels"
//           },
//           {
//             "time": "Afternoon (12:00 PM - 3:00 PM)",
//             "place": "Heart Attack Grill",
//             "details": "Enjoy a hearty, and perhaps unhealthy, meal at the infamous Heart Attack Grill, known for its calorie-laden burgers.",
//             "imageUrl": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/heart-attack-grill-las-vegas-las-vegas-restaurants-tips-1582325022.jpg?crop=1.00xw:0.752xh;0,0.184xh&resize=980:*",
//             "geoCoordinates": "36.1692° N, 115.1432° W",
//             "ticketPricing": "$$",
//             "rating": 3.5,
//             "travelTime": "5 minutes from Fremont Street"
//           },
//           {
//             "time": "Evening (6:00 PM - 9:00 PM)",
//             "place": "The LINQ Promenade",
//             "details": "Stroll along the LINQ Promenade, a bustling outdoor shopping and dining complex with the iconic High Roller observation wheel.",
//             "imageUrl": "https://www.visitlasvegas.com/media/images/linq-promenade-las-vegas-strip.jpg",
//             "geoCoordinates": "36.1107° N, 115.1724° W",
//             "ticketPricing": "Free (High Roller tickets are extra)",
//             "rating": 4,
//             "travelTime": "15 minutes from downtown"
//           }
//         ]
//       },
//       {
//         "day": "Day 2",
//         "plan": [
//           {
//             "time": "Morning (9:00 AM - 12:00 PM)",
//             "place": "Bellagio Conservatory & Botanical Garden",
//             "details": "Admire the stunning floral displays and seasonal themes at the Bellagio Conservatory & Botanical Garden.",
//             "imageUrl": "https://media.timeout.com/images/103621527/image.jpg",
//             "geoCoordinates": "36.1138° N, 115.1745° W",
//             "ticketPricing": "Free",
//             "rating": 4.5,
//             "travelTime": "10 minutes from The LINQ"
//           },
//           {
//             "time": "Afternoon (12:00 PM - 3:00 PM)",
//             "place": "Caesars Palace Forum Shops",
//             "details": "Browse designer shops and luxury brands at the Caesars Palace Forum Shops, a grand indoor mall.",
//             "imageUrl": "https://www.caesars.com/content/dam/caesars/las-vegas/images/forum-shops/FS-Exterior-Day-2.jpg",
//             "geoCoordinates": "36.1129° N, 115.1722° W",
//             "ticketPricing": "Free",
//             "rating": 4,
//             "travelTime": "5 minutes from Bellagio"
//           },
//           {
//             "time": "Evening (6:00 PM - 9:00 PM)",
//             "place": "Free Show on the Strip",
//             "details": "Enjoy a free evening show, such as the Bellagio Fountains, the Mirage Volcano, or the Wynn Lake of Dreams."
//           }
//         ]
//       },
//       {
//         "day": "Day 3",
//         "plan": [
//           {
//             "time": "Morning (9:00 AM - 12:00 PM)",
//             "place": "Red Rock Canyon National Conservation Area",
//             "details": "Drive to Red Rock Canyon National Conservation Area, a scenic desert landscape with hiking trails and stunning rock formations.",
//             "imageUrl": "https://www.nps.gov/redr/learn/nature/images/RedRock-Canyon-IMG_1528_edited-838x560.jpg",
//             "geoCoordinates": "36.1735° N, 115.2000° W",
//             "ticketPricing": "$15 per vehicle",
//             "rating": 4.5,
//             "travelTime": "30 minutes from the Strip"
//           },
//           {
//             "time": "Afternoon (12:00 PM - 3:00 PM)",
//             "place": "Neon Museum",
//             "details": "Visit the Neon Museum, a collection of vintage neon signs from Las Vegas's history.",
//             "imageUrl": "https://www.neonmuseum.org/wp-content/uploads/2018/04/NeonMuseum-Aerial-768x432.jpg",
//             "geoCoordinates": "36.1643° N, 115.1417° W",
//             "ticketPricing": "$25 per person",
//             "rating": 4,
//             "travelTime": "20 minutes from Red Rock Canyon"
//           },
//           {
//             "time": "Evening (6:00 PM - 9:00 PM)",
//             "place": "Last Supper at a Local Restaurant",
//             "details": "Indulge in a final meal at a local restaurant offering affordable and authentic Las Vegas cuisine."
//           }
//         ]
//       }
//     ]
//   }