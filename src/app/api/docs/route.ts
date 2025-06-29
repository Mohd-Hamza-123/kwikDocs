// pages/api/getFolders.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse) {
  try {
    const items = await fs.readdir('./src/content/sql', { withFileTypes: true });
    const folders = items.filter((item) => item.isDirectory()).map((item) => item.name);
    console.log("------------------------")
    console.log(folders)
    return NextResponse.json({success : true})
  } catch (err) {
    console.error('Error reading directory:', err);
     return NextResponse.json({success : true})
  }
}
