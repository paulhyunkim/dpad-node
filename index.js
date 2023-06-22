// // server.js

// const cron = require('node-cron');
// const { exec } = require('child_process');
// // const { MongoClient } = require('mongodb');
// const streamlink = require('streamlink');

// const mongoURL = 'mongodb+srv://paulhyunkim:password1234@dpad.nplbhqh.mongodb.net/?retryWrites=true&w=majority';
// const dbName = 'Dpad';

// const { MongoClient, ServerApiVersion } = require("mongodb");
// // Replace the placeholder with your Atlas connection string

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(mongoURL, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// }
// );

// async function run() {
//     try {
//         await client.connect();
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");

//         const db = client.db(dbName);
//         const streamersCollection = db.collection('Streamers');

//         const updateStreamerURLs = () => {
//             // Get the list of streamers from your data source (e.g., database)
//             const streamers = ['ironmouse'];

//             console.log("Updating streamers");

//             streamers.forEach((streamer) => {
//                 const command = `streamlink --stream-url https://www.twitch.tv/${streamer}`;

//                 exec(command, (error, stdout, stderr) => {
//                     if (error) {
//                         console.error(`Error extracting m3u8 URL for ${streamer}:`, error);
//                         return;
//                     }

//                     const m3u8URL = stdout.trim();

//                     // Update the MongoDB collection with the extracted m3u8 URL
//                     streamersCollection.updateOne(
//                         { name: streamer },
//                         { $set: { m3u8URL } },
//                         { upsert: true },
//                         (err, result) => {
//                             if (err) {
//                                 console.error(`Error updating m3u8 URL for ${streamer}:`, err);
//                                 return;
//                             }

//                             console.log(`Updated m3u8 URL for ${streamer}:`, m3u8URL);
//                         }
//                     );
//                 });
//             });
//         };

//         cron.schedule('*/5 * * * *', updateStreamerURLs);

//         const fetchInitialStreamerData = () => {
//             // Fetch initial data for streamers from your data source
//             // For example, fetch streamer names from a database or an API
//             // Populate the `streamers` array with the initial data

//             // Once you have the initial data, you can call `updateStreamerURLs()` to update the URLs immediately
//             updateStreamerURLs();
//         };

//         fetchInitialStreamerData();
//     } finally {
//         // await client.close();
//     }
// }

// run().catch(console.dir);

// // MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
// //     if (err) {
// //         console.error('Error connecting to MongoDB:', err);
// //         return;
// //     }

// //     console.log('Connected to MongoDB successfully');
// //     const db = client.db(dbName);
// //     const streamersCollection = db.collection('Streamers');

// //     // Function to periodically update the streamer URLs
// //     const updateStreamerURLs = () => {
// //         // Get the list of streamers from your data source (e.g., database)
// //         const streamers = ['ironmouse'];

// //         console.log("Updating streamers");

// //         streamers.forEach((streamer) => {
// //             // Scrub YouTube and Twitch to check if the streamer is currently live

// //             // Use streamlink to extract the m3u8 URL of the live stream
// //             streamlink(['https://www.twitch.tv/' + streamer], 'best').then((streams) => {
// //                 const m3u8URL = streams[0].url;

// //                 // Update the MongoDB collection with the extracted m3u8 URL
// //                 streamersCollection.updateOne(
// //                     { name: streamer },
// //                     { $set: { m3u8URL } },
// //                     { upsert: true },
// //                     (err, result) => {
// //                         if (err) {
// //                             console.error(`Error updating m3u8 URL for ${streamer}:`, err);
// //                             return;
// //                         }

// //                         console.log(`Updated m3u8 URL for ${streamer}:`, m3u8URL);
// //                     }
// //                 );
// //             }).catch((error) => {
// //                 console.error(`Error extracting m3u8 URL for ${streamer}:`, error);
// //             });
// //         });

// //     };

// //     // Schedule the periodic updates (e.g., every 5 minutes)
// //     cron.schedule('*/5 * * * *', updateStreamerURLs);

// //     // Start the server or perform any other operations

//     // const fetchInitialStreamerData = () => {
//     //     // Fetch initial data for streamers from your data source
//     //     // For example, fetch streamer names from a database or an API
//     //     // Populate the `streamers` array with the initial data

//     //     // Once you have the initial data, you can call `updateStreamerURLs()` to update the URLs immediately
//     //     updateStreamerURLs();
//     // };

//     // // Call the function to fetch initial streamer data
//     // fetchInitialStreamerData();

// // });