// import { Request, Response } from 'express'
// import Realm from 'realm'
// import config from '../config'

// export const createChannel = async (req: Request, res: Response): Promise<void> => {
//     const { name, userLogin, imageURL, platform } = req.body

//     const realmApp = new Realm.App({ id: config.realmAppID })

//     try {
//         // Check if a user is logged in
//         if (!realmApp.currentUser) {
//             throw new Error('User not logged in')
//         }

//         const mongodb = realmApp.currentUser.mongoClient('mongodb-atlas')
//         const channelsCollection = mongodb.db('Dpad').collection('Channel')

//         const result = await channelsCollection.insertOne({
//             name,
//             userLogin,
//             imageURL,
//             // platform,
//         });

//         res.json({ channelId: result.insertedId });
//     } catch (error) {
//         console.error('Failed to create channel:', error);
//         res.status(500).json({ error: 'Failed to create channel' })
//     }
// }