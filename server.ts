import * as cron from 'node-cron'
import axios from 'axios'
import cheerio from 'cheerio'
import vm from 'vm'
import he from 'he'
import connectDatabase from './db/connect'
import { updateStreamURLs } from './db/streamers'
import { Channel } from './models/channel'
import { Stream } from './models/stream'
import { scrapeLiveVideoIDs } from './scraping'

// const scrapeLiveVideoIDs = async (channelHandles: string[]): Promise<string[]> => {
//   const liveVideoIDs: string[] = []

//   for (const channelHandle of channelHandles) {
//     const videoId = await scrapeLiveVideoID(channelHandle)
//     if (videoId) {
//       liveVideoIDs.push(videoId)
//     }
//   }

//   return liveVideoIDs
// }

// const scrapeLiveVideoID = async (channelHandle: string): Promise<string | null> => {
//   const url = `https://www.youtube.com/${channelHandle}/streams`

//   try {
//     const { data } = await axios.get(url)
//     const $ = cheerio.load(data)
//     let ytInitialData: any = null

//     const context: any = { ytInitialData: null }
//     vm.createContext(context)

//     $('script').each((i, element) => {
//       const scriptText = $(element).html()
//       if (scriptText && scriptText.includes('var ytInitialData = ')) {
//         const decodedScriptText = he.decode(scriptText)
//         const script = new vm.Script(decodedScriptText)
//         script.runInContext(context)
//       }
//     })

//     ytInitialData = context.ytInitialData;

//     if (ytInitialData === null) {
//       console.error('Failed to find ytInitialData in script.')
//       return null
//     }

//     const videoRenderers = jp.JSONPath({
//       path: '$..videoRenderer',
//       json: ytInitialData,
//     })

//     const filteredVideoRenderers = videoRenderers.filter((videoRenderer: any) => {
//       const thumbnailOverlays = videoRenderer.thumbnailOverlays || []
//       const hasThumbnailOverlayWithStyleLive = thumbnailOverlays.some(
//         (overlay: any) => overlay?.thumbnailOverlayTimeStatusRenderer?.style === 'LIVE'
//       )

//       return thumbnailOverlays.length > 0 && hasThumbnailOverlayWithStyleLive
//     })

//     const firstVideoRenderer = filteredVideoRenderers[0]
//     const videoId = firstVideoRenderer?.videoId || null

//     console.log(`Found live video with ID ${videoId}`)

//     return videoId
//   } catch (error) {
//     console.error('Error occurred while scraping live video ID:', error)
//     return null
//   }
// }

async function run(): Promise<void> {
  try {
    await connectDatabase()

    cron.schedule('*/30 * * * * *', () => {
      console.log('Running a task every 30 seconds')
      updateStreamURLs()
      scrapeLiveVideoIDs(['@MariaMarionette', '@ludwig'])
    })
  } catch (error) {
    console.error('Error occurred while running the app:', error)
  }
}

run().catch(console.dir)

// import * as cron from 'node-cron'
// import { exec } from 'child_process'
// import { MongoClient, ServerApiVersion } from 'mongodb'
// import axios from 'axios'
// import cheerio from 'cheerio'
// import vm from 'vm'
// import * as jp from 'jsonpath-plus'
// import he from 'he'

// 

// interface Sandbox {
//   var: (name: string, value: any) => void
// }

// const mongoURL = 'mongodb+srv://paulhyunkim:password1234@dpad.nplbhqh.mongodb.net/?retryWrites=true&w=majority'
// const dbName = 'Dpad'

// const client = new MongoClient(mongoURL, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true
//   }
// })

// const updateStreamURLs = (streamersCollection: any) => {
//   const streamers: string[] = ['ironmouse']

//   console.log("Updating streamers")

//   streamers.forEach((streamer) => {
//     const command = `streamlink --stream-url https://www.twitch.tv/${streamer} best`

//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Error extracting m3u8 URL for ${streamer}:`, error)
//         return
//       }

//       const m3u8URL = stdout.trim()

//       console.log(`Extracted m3u8 url of ${m3u8URL} for ${streamer}`)

//       streamersCollection.updateOne(
//         { name: streamer },
//         { $set: { m3u8URL } },
//         { upsert: true }
//       )
//     })
//   })
// }

// async function run() {
//   try {
//     await client.connect()
//     await client.db("admin").command({ ping: 1 })
//     console.log("Pinged your deployment. You successfully connected to MongoDB!")

//     const db = client.db(dbName)
//     const streamersCollection = db.collection<Streamer>('Streamers')

//     cron.schedule('*/30 * * * * *', () => {
//       console.log('Running a task every 30 seconds')
//       updateStreamURLs(streamersCollection)
//       // scrapeLiveVideoID('@MariaMarionette')
//       scrapeLiveVideoIDs(['@MariaMarionette', '@ludwig'])
//     })
//   } finally {
//   }
// }

// run().catch(console.dir)

// const scrapeLiveVideoIDs = async (channelHandles: string[]): Promise<string[]> => {
//   const liveVideoIDs: string[] = []

//   for (const channelHandle of channelHandles) {
//     const videoId = await scrapeLiveVideoID(channelHandle)
//     if (videoId) {
//       liveVideoIDs.push(videoId)
//     }
//   }

//   return liveVideoIDs
// }

// const scrapeLiveVideoID = async (channelHandle: string): Promise<string | null> => {
//   const url = `https://www.youtube.com/${channelHandle}/streams`

//   try {
//     const { data } = await axios.get(url)
//     const $ = cheerio.load(data)
//     let ytInitialData: any = null

//     const context: any = { ytInitialData: null }
//     vm.createContext(context)

//     $('script').each((i, element) => {
//       const scriptText = $(element).html()
//       if (scriptText && scriptText.includes('var ytInitialData = ')) {
//         const decodedScriptText = he.decode(scriptText)
//         const script = new vm.Script(decodedScriptText)
//         script.runInContext(context)
//       }
//     })

//     ytInitialData = context.ytInitialData

//     if (ytInitialData === null) {
//       console.error("Failed to find ytInitialData in script.")
//       return null
//     }

//     const videoRenderers = jp.JSONPath({
//       path: "$..videoRenderer",
//       json: ytInitialData
//     })

//     const filteredVideoRenderers = videoRenderers.filter((videoRenderer: any) => {
//       const thumbnailOverlays = videoRenderer.thumbnailOverlays || []
//       const hasThumbnailOverlayWithStyleLive = thumbnailOverlays.some(
//         (overlay: any) => overlay?.thumbnailOverlayTimeStatusRenderer?.style === 'LIVE'
//       )
    
//       return thumbnailOverlays.length > 0 && hasThumbnailOverlayWithStyleLive
//     })

//     const firstVideoRenderer = filteredVideoRenderers[0]
//     const videoId = firstVideoRenderer?.videoId || null

//     console.log(`Found live video with ID ${videoId}`)

//     return videoId
//   } catch (error) {
//     console.error("Error occurred while scraping live video ID:", error)
//     return null
//   }
// }
    
//     // if (liveVideo) {
//     //   const videoId = liveVideo.videoId
//     //   console.log(`Found live video with ID ${videoId}`)
//     // } else {
//     //   console.log("No live videos found.")
//     // }
    
     

//     // console.log(liveVideos)
    
//     // if (liveVideos.length > 0) {
//     //   const videoId = jp.JSONPath({
//     //     path: "$.videoId",
//     //     json: liveVideos[0]
//     //   })[0]
    
//     //   console.log(`Found live video with ID ${videoId}`)
//     // } else {
//     //   console.log("No live videos found.")
//     // }

//     // const liveVideos = jp.JSONPath({
//     //   path: "$..videoRenderer[?(typeof @.thumbnailOverlays !== 'undefined' && @.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.style=='LIVE')]",
//     //   json: ytInitialData
//     // })
    
//     // console.log(liveVideos)

//     // if (liveVideos.length > 0) {
//     //   const videoId = liveVideos[0].videoId
//     //   console.log(`Found live video with ID ${videoId}`)
//     // } else {
//     //   console.log("No live videos found.")
//     // }

// //   } catch (error) {
// //     console.error(`Failed to scrape live video ID for channel handle ${channelHandle}:`, error)
// //   }
// // }



// // // server.ts

// // import * as cron from 'node-cron'
// // import { exec } from 'child_process'
// // import { MongoClient, ServerApiVersion } from 'mongodb'
// // import axios from 'axios'
// // import cheerio from 'cheerio'
// // import puppeteer from 'puppeteer'
// // import vm from 'vm'
// // // import JSONPath from 'jsonpath-plus'
// // import * as jp from 'jsonpath-plus';
// // import he from 'he'

// // interface Sandbox {
// //   var: (name: string, value: any) => void
// // }

// // const mongoURL = 'mongodb+srv://paulhyunkim:password1234@dpad.nplbhqh.mongodb.net/?retryWrites=true&w=majority'
// // const dbName = 'Dpad'

// // const client = new MongoClient(mongoURL, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true
// //   }
// // })

// // async function run() {
// //   try {
// //     await client.connect()
// //     await client.db("admin").command({ ping: 1 })
// //     console.log("Pinged your deployment. You successfully connected to MongoDB!")

// //     const db = client.db(dbName)
// //     const streamersCollection = db.collection('Streamers')

// //     const updateStreamerURLs = () => {
// //       const streamers: string[] = ['ironmouse']

// //       console.log("Updating streamers")

// //       streamers.forEach((streamer) => {
// //         const command = `streamlink --stream-url https://www.twitch.tv/${streamer} best`

// //         exec(command, (error, stdout, stderr) => {
// //           if (error) {
// //             console.error(`Error extracting m3u8 URL for ${streamer}:`, error)
// //             return
// //           }

// //           const m3u8URL = stdout.trim()

// //           console.log(`Extracted m3u8 url of ${m3u8URL} for ${streamer}`)

// //           streamersCollection.updateOne(
// //             { name: streamer },
// //             { $set: { m3u8URL } },
// //             { upsert: true }
// //             // (err, result) => {
// //             //   if (err) {
// //             //     console.error(`Error updating m3u8 URL for ${streamer}:`, err)
// //             //     return
// //             //   }

// //             //   console.log(`Updated m3u8 URL for ${streamer}:`, m3u8URL)
// //             // }
// //           )
// //         })
// //       })
// //     }

// //     cron.schedule('*/30 * * * * *', () => {
// //       console.log('Running a task every 30 seconds')
// //       updateStreamerURLs()
// //       // checkLiveStatus(['@ludwig'])

// //       scrapeLiveVideoID('@ludwig')
// //     })
// //     // cron.schedule('*/5 * * * *', updateStreamerURLs)

// //     // const fetchInitialStreamerData = () => {
// //     //   updateStreamerURLs()
// //     // }

// //     // fetchInitialStreamerData()
// //   } finally {
// //     // await client.close()
// //   }
// // }

// // run().catch(console.dir)


// // const scrapeLiveVideoID = async (channelHandle: string): Promise<void> => {
// //   const url = `https://www.youtube.com/${channelHandle}/streams`

// //   try {
// //     const { data } = await axios.get(url)
// //     const $ = cheerio.load(data)
// //     let ytInitialData: any = null

// //     // Create a simple context with a 'ytInitialData' variable
// //     const context: any = { ytInitialData: null }
// //     vm.createContext(context)

// //     $('script').each((i, element) => {
// //         const scriptText = $(element).html()
// //         if (scriptText && scriptText.includes('var ytInitialData = ')) {
// //             const decodedScriptText = he.decode(scriptText)
// //             const script = new vm.Script(decodedScriptText)
// //             script.runInContext(context)
// //         }
// //     })

// //     ytInitialData = context.ytInitialData

// //     // Check if ytInitialData has been set
// //     if (ytInitialData === null) {
// //       console.error("Failed to find ytInitialData in script.")
// //       return
// //     }

// //     // Use JSONPath to find videoRenderer objects with a live status.
// //     let liveVideos = jp.JSONPath({
// //       // This query may be wrong? I can see in the response that there is a videoRenderer object containing a thumbnailOverlays object with a style = "LIVE" property, but it is not returning the videoId of the videoRenderer object. I'm thinking our path needs to be updated?
// //       path: "$..richItemRenderer.content.videoRenderer[?(@.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.style=='LIVE')]",
// //       json: ytInitialData
// //     })

// //     console.log(ytInitialData)
// //     console.log(liveVideos)

// //     // If liveVideos is non-empty, the first element should be a live videoRenderer.
// //     if (liveVideos.length > 0) {
// //         let videoId = liveVideos[0].videoId;
// //         console.log(`Found live video with ID ${videoId}`);
// //     } else {
// //         console.log("No live videos found.");
// //     }
// //   } catch (error) {
// //       console.error(`Failed to scrape live video ID for channel handle ${channelHandle}:`, error)
// //   }
// // }



// // const checkLiveStatus = async (channelHandles: string[]) => {
// //   const browser = await puppeteer.launch({
// //     headless: "new"
// //   })

// //   for (const channelHandle of channelHandles) {
// //     const url = `https://www.youtube.com/${channelHandle}/streams`
 
// //     try {
// //       const page = await browser.newPage()
// //       await page.goto(url)

// //       // Wait for the 'span' containing 'LIVE NOW' to appear in the page. If it doesn't appear within a certain time, it will throw an error which we can catch and treat as the streamer being offline.
// //       // console.log(page)
// //       await page.waitForSelector('span')
// //       // await page.waitForSelector('span:contains(" LIVE ")', { timeout: 5000 })
// //       // console.log(page.)

// //       console.log(`The streamer with channel handle ${channelHandle} is live.`)
// //     } catch (error) {
// //       console.log(`The streamer with channel handle ${channelHandle} is not live.`)
// //     }

// //     await browser.close()
// //     // try {
// //     //   const response = await axios.get(url);
// //     //   const $ = cheerio.load(response.data);

// //     //   // This selector might change depending on YouTube's actual page structure
// //     //   const liveVideoElement = $('span:contains("LIVE")');
// //     //   console.log(response.data)

// //     //   if (liveVideoElement.length > 0) {
// //     //     console.log(`The streamer with channel handle ${channelHandle} is live.`);
// //     //   } else {
// //     //     console.log(`The streamer with channel handle ${channelHandle} is not live.`);
// //     //   }
// //     // } catch (error) {
// //     //   console.error(`Failed to check live status for channel handle ${channelHandle}:`, error);
// //     // }
// //   }
// // }





// // // const scrapeLiveVideoID = async (channelHandle: string): Promise<void> => {
// // //   const url = `https://www.youtube.com/${channelHandle}/streams`

// // //   try {
// // //     const { data } = await axios.get(url)
// // //     const $ = cheerio.load(data)
// // //     let ytInitialData: string | null = null

// // //     // Create a simple context with a 'ytInitialData' variable
// // //     const context: any = { ytInitialData: null }
// // //     vm.createContext(context)

// // //     $('script').each((i, element) => {
// // //         const scriptText = $(element).html()
// // //         if (scriptText && scriptText.includes('var ytInitialData = ')) {
// // //             const decodedScriptText = he.decode(scriptText)
// // //             const script = new vm.Script(decodedScriptText)
// // //             script.runInContext(context)
// // //         }
// // //     })

// // //     ytInitialData = context.ytInitialData

// // //     // Check if ytInitialData has been set
// // //     if (ytInitialData === null) {
// // //       console.error("Failed to find ytInitialData in script.")
// // //       return
// // //     }

// // //     console.log(ytInitialData)

// // //     // Parse the data as JSON (assumes `ytInitialData` is a string containing valid JSON).
// // //     let dataJson = JSON.parse(ytInitialData)

// // //     // Use JSONPath to find videoRenderer objects with a live status.
// // //     let liveVideos = JSONPath.JSONPath({path: "$..videoRenderer[?(@.thumbnailOverlayTimeStatusRenderer && @.thumbnailOverlayTimeStatusRenderer.style=='LIVE')]", json: dataJson})

// // //     // If liveVideos is non-empty, the first element should be a live videoRenderer.
// // //     if (liveVideos.length > 0) {
// // //         let videoId = liveVideos[0].videoId;
// // //         console.log(`Found live video with ID ${videoId}`);
// // //     } else {
// // //         console.log("No live videos found.");
// // //     }
// // //   } catch (error) {
// // //       console.error(`Failed to scrape live video ID for channel handle ${channelHandle}:`, error)
// // //   }
// // // }


// // // const scrapeLiveVideoID = async (channelHandle: string): Promise<void> => {
// // //   const url = `https://www.youtube.com/${channelHandle}/streams`

// // //   try {
// // //     const { data } = await axios.get(url)
// // //     const $ = cheerio.load(data)
// // //     let ytInitialData: string | null = null
// // //     const sandbox: Record<string, any> = { 
// // //       var: (name: string, value: string) => { 
// // //         console.log(name)
// // //         console.log(value)
// // //         if (name === 'ytInitialData') ytInitialData = value 
// // //       } 
// // //     }
// // //     const context = vm.createContext(sandbox)

// // //     $('script').each((i, element) => {
// // //         const scriptText = $(element).html()
// // //         if (scriptText && scriptText.includes('var ytInitialData = ')) {
// // //             const decodedScriptText = he.decode(scriptText)
// // //             // Even though a script meeting the condition is found, the closure set on the sandbox is never called. Why could this be?
// // //             const script = new vm.Script(decodedScriptText)
// // //             script.runInContext(context)
// // //         }
// // //     })

// // //     // Check if ytInitialData has been set
// // //     if (ytInitialData === null) {
// // //       console.error("Failed to find ytInitialData in script.")
// // //       return
// // //     }

// // //     // Parse the data as JSON (assumes `ytInitialData` is a string containing valid JSON).
// // //     let dataJson = JSON.parse(ytInitialData)

// // //     // Use JSONPath to find videoRenderer objects with a live status.
// // //     let liveVideos = JSONPath.JSONPath({path: "$..videoRenderer[?(@.thumbnailOverlayTimeStatusRenderer && @.thumbnailOverlayTimeStatusRenderer.style=='LIVE')]", json: dataJson})

// // //     // If liveVideos is non-empty, the first element should be a live videoRenderer.
// // //     if (liveVideos.length > 0) {
// // //         let videoId = liveVideos[0].videoId;
// // //         console.log(`Found live video with ID ${videoId}`);
// // //     } else {
// // //         console.log("No live videos found.");
// // //     }
// // //   } catch (error) {
// // //       console.error(`Failed to scrape live video ID for channel handle ${channelHandle}:`, error)
// // //   }
// // // }

