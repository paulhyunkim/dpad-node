import { exec } from 'child_process'
import StreamerModel, { Streamer } from '../models/streamer'

export async function updateStreamURLs(): Promise<void> {
  const streamers: string[] = ['ironmouse']

  console.log('Updating streamers')

  for (const streamer of streamers) {
    const command = `streamlink --stream-url https://www.twitch.tv/${streamer} best`

    exec(command, (error, stdout) => {
      if (error) {
        console.error(`Error extracting m3u8 URL for ${streamer}:`, error)
        return
      }

      const m3u8URL = stdout.trim()

      console.log(`Extracted m3u8 URL of ${m3u8URL} for ${streamer}`)

      StreamerModel.updateOne({ name: streamer }, { $set: { m3u8URL } }, { upsert: true }, (err) => {
        if (err) {
          console.error('Failed to update stream URL:', err)
        }
      })
    })
  }
}
