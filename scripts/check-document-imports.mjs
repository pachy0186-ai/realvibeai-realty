#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const trackedFiles = execSync('git ls-files -z', { encoding: 'utf8' })
  .split('\0')
  .filter(Boolean)

const invalidImports = []

for (const relativePath of trackedFiles) {
  if (
    relativePath.startsWith('node_modules/') ||
    relativePath.startsWith('.next/') ||
    relativePath.startsWith('reports-temp/')
  ) {
    continue
  }

  const absolutePath = path.join(root, relativePath)
  const contents = readFileSync(absolutePath, 'utf8')

  if (!contents.includes("next/document")) continue

  const isDocumentFile = /^pages\/\/_document\.[jt]sx?$/.test(relativePath)
  if (!isDocumentFile) {
    invalidImports.push(relativePath)
  }
}

if (invalidImports.length > 0) {
  console.error('next/document should only be imported inside pages/_document.* files.')
  console.error('Please remove the following invalid imports:')
  for (const file of invalidImports) {
    console.error(` - ${file}`)
  }
  process.exit(1)
}

console.log('✅  No invalid next/document imports detected.')
