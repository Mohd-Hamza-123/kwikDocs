// pages/api/getFolders.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const items = await fs.readdir('./src/content', { withFileTypes: true });
    const folders = items.filter((item) => item.isDirectory()).map((item) => item.name);
    res.status(200).json({ folders });
  } catch (err) {
    console.error('Error reading directory:', err);
    res.status(500).json({ error: 'Failed to read directories' });
  }
}
