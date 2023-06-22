import Realm from "realm"
import { StreamerSchema } from "../schemas"

export class Streamer extends Realm.Object<Streamer> {
  _id!: Realm.BSON.ObjectId
  name?: string
  m3u8URL?: string
  static schema = StreamerSchema
}

// import Realm from "realm";

// export type Streamer = {
//   _id: Realm.BSON.ObjectId;
//   m3u8URL?: string;
//   name?: string;
// };
