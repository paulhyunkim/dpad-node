import mongoose, { Schema, Document } from 'mongoose';

export enum Platform {
  Twitch = 'twitch',
  YouTube = 'youTube'
}

export interface Channel extends Document {
  id: string
  name: string
  userLogin: string
  imageURL: string
  platform: Platform
}

const channelSchema: Schema = new Schema({
  id: String,
  name: String,
  userLogin: String,
  imageURL: String,
  platform: {
    type: String,
    enum: Object.values(Platform)
  }
})

export default mongoose.model<Channel>('Channel', channelSchema)