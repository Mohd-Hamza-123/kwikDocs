import { NextResponse } from 'next/server'
import path from 'path'
import getContentTree from '@/services/helpers/getContentTree'

export async function GET(
  request: Request,
  context: { params: { tech: string } }
) {
  try {
    const { tech } = context.params
    const folderPath = path.join(process.cwd(), 'src', 'content', tech)
    const tree = await getContentTree(folderPath)

    return NextResponse.json({ tree: tree || null }, { status: 200 })
  } catch (error: any) {
    console.error(error?.message)
    return NextResponse.json({ error: error?.message || null }, { status: 500 })
  }
}
