#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function generateOne(page, inputPath, outputPath) {
  const url = `file://${inputPath}`
  await page.goto(url, { waitUntil: 'networkidle0' })
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
  })
}

async function run() {
  const projectRoot = path.resolve(__dirname, '..')
  const publicDir = path.join(projectRoot, 'public')
  const inputs = [
    { in: path.join(publicDir, 'cv-fr.html'), out: path.join(publicDir, 'CV-Abdelaziz-Elhathout-FR.pdf') },
    { in: path.join(publicDir, 'cv-en.html'), out: path.join(publicDir, 'CV-Abdelaziz-Elhathout-EN.pdf') },
    { in: path.join(publicDir, 'cover-letter-fr.html'), out: path.join(publicDir, 'Cover-Letter-Abdelaziz-Elhathout-FR.pdf') },
    { in: path.join(publicDir, 'cover-letter-en.html'), out: path.join(publicDir, 'Cover-Letter-Abdelaziz-Elhathout-EN.pdf') },
  ]

  for (const i of inputs) {
    const exists = await fs.access(i.in).then(() => true).catch(() => false)
    if (!exists) {
      throw new Error(`Input not found: ${i.in}`)
    }
  }

  await ensureDir(publicDir)

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  try {
    const page = await browser.newPage()
    for (const doc of inputs) {
      await generateOne(page, doc.in, doc.out)
      console.log(`Generated: ${path.basename(doc.out)}`)
    }
  } finally {
    await browser.close()
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})


