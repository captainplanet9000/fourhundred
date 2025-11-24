import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'public', 'images', 'collection')
    const files = await fs.readdir(dir)
    const items = files
      .filter((n) => /\.(png|jpe?g|webp|gif)$/i.test(n))
      .map((n) => ({ src: `/images/collection/${n}`, alt: n.replace(/\.[^.]+$/, '') }))
    return NextResponse.json(items)
  } catch (e) {
    return NextResponse.json([], { status: 200 })
  }
}
