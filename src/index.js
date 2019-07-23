import app from "./server"
import { MongoClient } from "mongodb"
import MoviesDAO from "../src/dao/moviesDAO"
import UsersDAO from "./dao/usersDAO"
import CommentsDAO from "./dao/commentsDAO"

const port = process.env.PORT || 8000

const mongodb_url = process.env.MFLIX_DB_URI || "mongodb+srv://mflix:Mkksgd38@mflixcluster-y4s0v.mongodb.net/test"

/**                                                                           
Ticket: Connection Pooling

Please change the configuration of the MongoClient object by setting the
maximum connection pool size to 50 active connections.
*/

/**
Ticket: Timeouts

Please prevent the program from waiting indefinitely by setting the write
concern timeout limit to 2500 milliseconds.
*/

MongoClient.connect(
  "mongodb://mflix:Mkksgd38@mflixcluster-shard-00-00-y4s0v.mongodb.net:27017,mflixcluster-shard-00-01-y4s0v.mongodb.net:27017,mflixcluster-shard-00-02-y4s0v.mongodb.net:27017/test?ssl=true&replicaSet=MflixCluster-shard-0&authSource=admin&retryWrites=true&w=majority",
  // TODO: Connection Pooling
  // Set the poolSize to 50 connections.
  // TODO: Timeouts
  // Set the write timeout limit to 2500 milliseconds.
  { useNewUrlParser: true },
)
  .catch(err => {
    console.log(err);
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await MoviesDAO.injectDB(client)
    await UsersDAO.injectDB(client)
    await CommentsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })
