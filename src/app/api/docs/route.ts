// pages/api/getFolders.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from "next/server";
export default async function POST(req:NextRequest,res:NextResponse) {
  try {
    const items = await fs.readdir('./src/content', { withFileTypes: true });
    const folders = items.filter((item) => item.isDirectory()).map((item) => item.name);
    return NextResponse.json({success : true})
  } catch (err) {
    console.error('Error reading directory:', err);
     return NextResponse.json({success : true})
  }
}
