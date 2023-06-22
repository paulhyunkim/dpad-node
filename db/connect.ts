import mongoose from 'mongoose'

export default async function connectDatabase(): Promise<void> {
  const mongoURL = 'mongodb+srv://paulhyunkim:password1234@dpad.nplbhqh.mongodb.net/?retryWrites=true&w=majority'
  const dbName = 'Dpad'

  await mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // apiVersion: ServerApiVersion.v1,
    // serverSelectionTimeoutMS: 5000,
    // socketTimeoutMS: 45000,
    dbName
  })

  console.log('Connected to MongoDB')
}



// interface ConnectOptions extends mongodb.MongoClientOptions {
//     /** Set to false to [disable buffering](http://mongoosejs.com/docs/faq.html#callback_never_executes) on all models associated with this connection. */
//     bufferCommands?: boolean;
//     /** The name of the database you want to use. If not provided, Mongoose uses the database name from connection string. */
//     dbName?: string;
//     /** username for authentication, equivalent to `options.auth.user`. Maintained for backwards compatibility. */
//     user?: string;
//     /** password for authentication, equivalent to `options.auth.password`. Maintained for backwards compatibility. */
//     pass?: string;
//     /** Set to false to disable automatic index creation for all models associated with this connection. */
//     autoIndex?: boolean;
//     /** Set to `true` to make Mongoose automatically call `createCollection()` on every model created on this connection. */
//     autoCreate?: boolean;
//   }