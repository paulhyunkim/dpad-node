// import mongoose, { Schema, Document } from 'mongoose';

// export enum Platform {
//   Twitch = 'twitch',
//   YouTube = 'youTube'
// }

// export interface Channel extends Document {
//   id: string
//   name: string
//   userLogin: string
//   imageURL: string
//   platform: Platform
// }

// const channelSchema: Schema = new Schema({
//   id: String,
//   name: String,
//   userLogin: String,
//   imageURL: String,
//   platform: {
//     type: String,
//     enum: Object.values(Platform)
//   }
// })

// export default mongoose.model<Channel>('Channel', channelSchema)


import Realm from "realm"
import { ChannelSchema } from "../schemas"

export class Channel extends Realm.Object<Channel> {
  _id!: Realm.BSON.ObjectId
  channelID?: string;
  imageURL?: string;
  name?: string;
  userLogin?: string;
  // platform: Platform
  static schema = ChannelSchema
}

// import Realm from "realm";

// export type Channel = {
//   _id: Realm.BSON.ObjectId;
//   id?: string;
//   imageURL?: string;
//   name?: string;
//   userLogin?: string;
// };
