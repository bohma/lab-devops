import { mkdir, writeFile } from 'node:fs/promises'
import { execSync } from 'node:child_process'

const commit = process.env.GITHUB_SHA
  ?? process.env.GIT_COMMIT
  ?? execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim()

const content = [
  'app=lab-devops',
  `commit=${commit}`,
  `built_at=${new Date().toISOString()}`,
  'artifact_type=build-info',
].join('\n')

await mkdir('dist-artifact', { recursive: true })
await writeFile('dist-artifact/build-info.txt', `${content}\n`, 'utf8')

console.log('Build artifact created: dist-artifact/build-info.txt')
console.log(content)
