import { NextResponse } from 'next/server'
import path from 'path'
import getContentTree from '@/services/helpers/getContentTree'

// Do NOT destructure directly in params – type it properly
export async function GET(
    request: Request,
    context: any // context type
) {
    try {
        const tech = context?.params?.tech
        const folderPath = path.join(process.cwd(), 'src', 'content', tech)
        const tree = await getContentTree(folderPath)

        return NextResponse.json({ tree: tree || null }, { status: 200 })
    } catch (error: any) {
        console.error(error?.message)
        return NextResponse.json({ error: error?.message || null }, { status: 500 })
    }
}
