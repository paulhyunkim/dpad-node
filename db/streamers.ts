import { exec } from 'child_process'
// import { Streamer } from '../models/streamer'
import { Streamer } from '../models/streamer'
import Realm from 'realm'
import realmManager from '../realm'

export async function updateStreamURLs(): Promise<void> {
  const streamers: string[] = ['ironmouse', 'henyathegenius']

  console.log('Updating streamers')

//   const realm = await Realm.open({ schema: [Streamer] })
  const realm = await realmManager.openRealm()

  for (const streamer of streamers) {
    const command = `streamlink --stream-url https://www.twitch.tv/${streamer} best`

    exec(command, (error, stdout) => {
      if (error) {
        console.error(`Error extracting m3u8 URL for ${streamer}:`, error)
        return
      }

      const m3u8URL = stdout.trim()

      console.log(`Extracted m3u8 URL of ${m3u8URL} for ${streamer}`)

      realm.write(() => {
        const existingStreamer = realm.objects(Streamer).filtered(`name = "${streamer}"`)[0]
        if (existingStreamer) {
          existingStreamer.m3u8URL = m3u8URL
        } else {
          realm.create(Streamer, { name: streamer, m3u8URL })
        }
      })
    })
  }
}
