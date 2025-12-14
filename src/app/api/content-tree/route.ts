import path from "path"
import { NextResponse } from "next/server"
import getContentTree from "@/utils/getContentTree"

export async function GET(
  request: Request, 
) {
  try {
     const url = new URL(request.url)
    const tech = url.searchParams.get('tech')
    console.log(tech)
    if (!tech) return NextResponse.json({ error: 'tech not provided' }, { status: 400 })

    const folderPath = path.join(process.cwd(), 'src', 'content', tech)
    const tree = await getContentTree(folderPath)
    return NextResponse.json({ tree: tree || null }, { status: 200 })
  } catch (error: any) {
    console.error(error?.message)
    return NextResponse.json({ error: error?.message || null }, { status: 500 })
  }
}
