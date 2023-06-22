import * as cron from 'node-cron'
// import axios from 'axios'
// import cheerio from 'cheerio'
// import vm from 'vm'
// import he from 'he'
import connectDatabase from './db/connect'
import { updateStreamURLs } from './db/streamers'
// import { Channel } from './models/channel'
// import { Stream } from './models/stream'
import { scrapeLiveVideoIDs } from './scraping'
// import express, { Request, Response } from 'express'
// import Channel from './models/channel'
// import channelRoutes from './routes/channelRoutes'
// import Realm from 'realm'
import config from './config'

// const app = express()

// Register the channel routes
// app.use('/channels', channelRoutes)

// Initialize your App.
const app = new Realm.App({ id: config.realmAppID })

// Authenticate an anonymous user.
// const anonymousUser = await app.logIn(Realm.Credentials.anonymous())


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


