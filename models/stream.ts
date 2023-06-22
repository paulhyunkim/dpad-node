// import mongoose, { Schema, Document } from 'mongoose'
import { Channel } from './channel'

// export interface Stream extends Document {
//   url: string
//   channel: Channel['_id']
//   viewerCount: number
//   startTime?: Date
//   title?: string
//   gameName?: string
//   chatURL?: string
// }

// const streamSchema: Schema = new Schema({
//   url: String,
//   channel: {
//     type: Schema.Types.ObjectId,
//     ref: 'Channel',
//   },
//   viewerCount: Number,
//   startTime: Date,
//   title: String,
//   gameName: String,
//   chatURL: String,
// })

// export default mongoose.model<Stream>('Stream', streamSchema)



import Realm from "realm"
import { StreamSchema } from '../schemas'

export class Stream extends Realm.Object<Stream> {
  _id!: Realm.BSON.ObjectId
  channel?: Channel;
  chatURL?: string;
  gameName?: string;
  startTime?: Date;
  title?: string;
  url?: string;
  viewerCount?: number;
  static schema = StreamSchema
}

// export type Stream = {
//   _id: Realm.BSON.ObjectId;
//   channel?: Channel;
//   chatURL?: string;
//   gameName?: string;
//   startTime?: Date;
//   title?: string;
//   url?: string;
//   viewerCount?: number;
// };