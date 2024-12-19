
import express from 'express'
import bodyParser from 'body-parser'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fallback from 'express-history-api-fallback'
import dataSource from './dataSource'
import { RegisterRoutes } from './routes/routes'


const connectDatabase = async () => {
    try {
      if (!dataSource.isInitialized) {
        await dataSource.initialize()
        console.log('Database connected successfully!');
      }
    } catch (err) {
      console.error('Error initializing database:', err);
      process.exit(1); // 無法連接資料庫則退出程序
    }
}

const app = express()

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

// Public folder
const router = express.Router()
RegisterRoutes(router)
app.use('/api', router)
app.use(express.static(`${__dirname}/../public`))
app.use(fallback('index.html', { root: `${__dirname}/../public` }))

const port = 3000;

app.listen(port, async () => {
  await connectDatabase()
  if (port === 3000) {
    console.log('true')
  }
  console.log(`server is listening on ${port} !!!`);
});
function logWithExpress(): any {
  throw new Error('Function not implemented.')
}

function applicationLoggerMiddleware(): any {
  throw new Error('Function not implemented.')
}

