// export const ChannelSchema: Realm.ObjectSchema = {
//     name: 'Channel',
//     primaryKey: '_id',
//     properties: {
//         _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
//         id: 'string?',
//         name: 'string?',
//         userLogin: 'string?',
//         imageURL: 'string?',
//     },
// }

// export const StreamSchema: Realm.ObjectSchema = {
//     name: 'Stream',
//     primaryKey: '_id',
//     properties: {
//         _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
//         url: 'string?',
//         channel: 'Channel?',
//         viewerCount: 'int?',
//         startTime: 'date?',
//         title: 'string?',
//         gameName: 'string?',
//         chatURL: 'string?',
//     },
// }

// export const StreamerSchema: Realm.ObjectSchema = {
//     name: 'Streamer',
//     primaryKey: '_id',
//     properties: {
//         _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
//         name: 'string?',
//         m3u8URL: 'string?',
//     },
// }

export const ChannelSchema = {
    name: 'Channel',
    properties: {
      _id: 'objectId',
      channelID: 'string?',
      imageURL: 'string?',
      name: 'string?',
      userLogin: 'string?',
    },
    primaryKey: '_id',
  };

export const StreamSchema = {
  name: 'Stream',
  properties: {
    _id: 'objectId',
    channel: 'Channel',
    chatURL: 'string?',
    gameName: 'string?',
    startTime: 'date?',
    title: 'string?',
    url: 'string?',
    viewerCount: 'int?',
  },
  primaryKey: '_id',
};

export const StreamerSchema = {
  name: 'Streamer',
  properties: {
    _id: 'objectId',
    m3u8URL: 'string?',
    name: 'string?',
  },
  primaryKey: '_id',
};

