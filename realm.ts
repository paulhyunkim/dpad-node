import Realm from 'realm'
import config from './config'
import { ChannelSchema, StreamSchema, StreamerSchema } from './schemas'

let realm: Realm | null = null

export const realmManager = {
  openRealm: async (): Promise<Realm> => {
    if (realm) {
      return realm
    }

    const app = Realm.App.getApp(config.realmAppID)
    const user = await app.logIn(Realm.Credentials.anonymous())

    const realmConfig: Realm.Configuration = {
      sync: {
        user: app.currentUser!,
        flexible: true,
        initialSubscriptions: {
          update: (subs, realm) => {
            // subs.add(realm.objects('Task'))
          },
          rerunOnOpen: true,
        },
      },
      schema: [ChannelSchema, StreamSchema, StreamerSchema],
    }

    realm = await Realm.open(realmConfig)

    return realm
  },

  closeRealm: (): void => {
    if (realm) {
      realm.close()
      realm = null
    }
  },
}

export default realmManager