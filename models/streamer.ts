import mongoose, { Document, Schema } from 'mongoose'

export enum Platform {
  Twitch = 'twitch',
  YouTube = 'youtube',
}

export interface Streamer extends Document {
  name: string
  m3u8URL: string
}

const streamerSchema: Schema = new Schema({
  name: String,
  m3u8URL: String,
})

export default mongoose.model<Streamer>('Streamer', streamerSchema)