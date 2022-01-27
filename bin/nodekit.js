import sade from 'sade'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import NodeKit from '../index.js'

import packageInfo from '../package.json'

const app = sade('nodekit')

app
  .version(packageInfo.version)
  .describe('A Small Web server.')

app
  .command('serve [pathToServe]', '', {default: true})
  .option('--base-path', 'The path pathToServe is relative to', '/')
  .describe('Start server as regular process.')
  .action(async (pathToServe, options) => {
    const absolutePathToServe = path.resolve(options['base-path'], pathToServe === undefined ? '.' : pathToServe)

    if (!fs.existsSync(absolutePathToServe)) {
      console.error(`${absolutePathToServe} not found.`)
      process.exit(1)
    }

    console.log('Starting NodeKit…')
    console.log('Serving', absolutePathToServe)
    const nodeKit = new NodeKit(absolutePathToServe)
    await nodeKit.initialise()
  })

app
  .command('enable')
  .describe('Install server systemd service and start it at hostname using globally-trusted TLS certificates.')
  .option('--skip-domain-reachability-check', 'Do not run pre-flight check for domain reachability.')
  .action(options => {
    console.log('enable: unimplemented', options)
  })

app.parse(process.argv)
