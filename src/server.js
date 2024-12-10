// Node.js utility
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Vite
import { createServer } from 'vite'

// Express
import express from 'express'

// Helpers
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p)

const getIndexHTML = async () => {
  const indexHTML = resolve('../index.html')
  const html = await fs.promises.readFile(indexHTML, 'utf-8')
  return html
}

async function start() {
  const manifest = null
  const ssrServer = resolve('./main-server.js')

  const app = express()
  const router = express.Router()

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  // Ловим все запросы, а вообще можно продублировать тут
  // логику из src/router.js
  router.get('/*', async (req, res, next) => {
    try {
      const url = req.url
      let template = await getIndexHTML()
      template = await vite.transformIndexHtml(url, template)

      let render = (await vite.ssrLoadModule(ssrServer)).render
      
      const [appHtml, preloadLinks] = await render(url, manifest)
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace('<!--app-html-->', appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  // Routes
  app.use('/', router)

  app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000/');
  })
}

start()