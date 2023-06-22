// "use strict";
// // server.ts
// var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
//     if (k2 === undefined) k2 = k;
//     var desc = Object.getOwnPropertyDescriptor(m, k);
//     if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
//       desc = { enumerable: true, get: function() { return m[k]; } };
//     }
//     Object.defineProperty(o, k2, desc);
// }) : (function(o, m, k, k2) {
//     if (k2 === undefined) k2 = k;
//     o[k2] = m[k];
// }));
// var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
//     Object.defineProperty(o, "default", { enumerable: true, value: v });
// }) : function(o, v) {
//     o["default"] = v;
// });
// var __importStar = (this && this.__importStar) || function (mod) {
//     if (mod && mod.__esModule) return mod;
//     var result = {};
//     if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
//     __setModuleDefault(result, mod);
//     return result;
// };
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const cron = __importStar(require("node-cron"));
// const child_process_1 = require("child_process");
// const mongodb_1 = require("mongodb");
// const puppeteer_1 = __importDefault(require("puppeteer"));
// const mongoURL = 'mongodb+srv://paulhyunkim:password1234@dpad.nplbhqh.mongodb.net/?retryWrites=true&w=majority';
// const dbName = 'Dpad';
// const client = new mongodb_1.MongoClient(mongoURL, {
//     serverApi: {
//         version: mongodb_1.ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true
//     }
// });
// function run() {
//     return __awaiter(this, void 0, void 0, function* () {
//         try {
//             yield client.connect();
//             yield client.db("admin").command({ ping: 1 });
//             console.log("Pinged your deployment. You successfully connected to MongoDB!");
//             const db = client.db(dbName);
//             const streamersCollection = db.collection('Streamers');
//             const updateStreamerURLs = () => {
//                 const streamers = ['ironmouse'];
//                 console.log("Updating streamers");
//                 streamers.forEach((streamer) => {
//                     const command = `streamlink --stream-url https://www.twitch.tv/${streamer} best`;
//                     (0, child_process_1.exec)(command, (error, stdout, stderr) => {
//                         if (error) {
//                             console.error(`Error extracting m3u8 URL for ${streamer}:`, error);
//                             return;
//                         }
//                         const m3u8URL = stdout.trim();
//                         console.log(`Extracted m3u8 url of ${m3u8URL} for ${streamer}`);
//                         streamersCollection.updateOne({ name: streamer }, { $set: { m3u8URL } }, { upsert: true }
//                         // (err, result) => {
//                         //   if (err) {
//                         //     console.error(`Error updating m3u8 URL for ${streamer}:`, err)
//                         //     return
//                         //   }
//                         //   console.log(`Updated m3u8 URL for ${streamer}:`, m3u8URL)
//                         // }
//                         );
//                     });
//                 });
//             };
//             cron.schedule('*/10 * * * * *', () => {
//                 console.log('Running a task every 10 seconds');
//                 updateStreamerURLs();
//                 checkLiveStatus(['@ludwig']);
//             });
//             // cron.schedule('*/5 * * * *', updateStreamerURLs)
//             // const fetchInitialStreamerData = () => {
//             //   updateStreamerURLs()
//             // }
//             // fetchInitialStreamerData()
//         }
//         finally {
//             // await client.close()
//         }
//     });
// }
// run().catch(console.dir);
// const checkLiveStatus = (channelHandles) => __awaiter(void 0, void 0, void 0, function* () {
//     const browser = yield puppeteer_1.default.launch({
//         headless: "new"
//     });
//     for (const channelHandle of channelHandles) {
//         const url = `https://www.youtube.com/${channelHandle}/streams`;
//         try {
//             const page = yield browser.newPage();
//             yield page.goto(url);
//             // Wait for the 'span' containing 'LIVE NOW' to appear in the page. If it doesn't appear within a certain time, it will throw an error which we can catch and treat as the streamer being offline.
//             yield page.waitForSelector('span:contains("LIVE")', { timeout: 5000 });
//             console.log(page);
//             console.log(`The streamer with channel handle ${channelHandle} is live.`);
//         }
//         catch (error) {
//             console.log(`The streamer with channel handle ${channelHandle} is not live.`);
//         }
//         yield browser.close();
//         // try {
//         //   const response = await axios.get(url);
//         //   const $ = cheerio.load(response.data);
//         //   // This selector might change depending on YouTube's actual page structure
//         //   const liveVideoElement = $('span:contains("LIVE")');
//         //   console.log(response.data)
//         //   if (liveVideoElement.length > 0) {
//         //     console.log(`The streamer with channel handle ${channelHandle} is live.`);
//         //   } else {
//         //     console.log(`The streamer with channel handle ${channelHandle} is not live.`);
//         //   }
//         // } catch (error) {
//         //   console.error(`Failed to check live status for channel handle ${channelHandle}:`, error);
//         // }
//     }
// });
