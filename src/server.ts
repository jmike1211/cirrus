
import express from 'express'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fallback from 'express-history-api-fallback'
import dataSource from './dataSource'
import { RequestHandler } from 'express'

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

// Public folder
app.use(express.static(`${__dirname}/../public`))
app.use(fallback('index.html', { root: `${__dirname}/../public` }))

const port = 3000;

app.get('/api', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, async () => {
  await connectDatabase()
  if (port === 3000) {
    console.log('true')
  }
  console.log(`server is listening on ${port} !!!`);
});
