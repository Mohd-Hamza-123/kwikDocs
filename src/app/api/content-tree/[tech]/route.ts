import { NextResponse } from 'next/server'
import path from 'path'
import getContentTree from '@/services/helpers/getContentTree'

export async function GET(request: Request, { params }: { params: { tech: string } }) {
    try {
        const folderPath = path.join(process.cwd(), 'src', 'content', params.tech)
        const tree = await getContentTree(folderPath)
        return NextResponse.json({ tree: tree || null }, { status: 200 })
    } catch (error) {

    }

}
