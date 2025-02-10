import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { folderName, fileName, content } = body;

        if (!folderName || !fileName || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const basePath = path.join(process.cwd(), 'src', 'content', folderName);

        // Ensuring the folder exists, create it if it doesn't
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
        }

        const filePath = path.join(basePath, fileName);

        // Checking if the file already exists
        if (fs.existsSync(filePath)) {
            return NextResponse.json({ message: `File already exists at ${filePath}, skipping creation.` });
        }

        fs.writeFileSync(filePath, content, 'utf8');
        return NextResponse.json({ message: `MDX file created successfully at ${filePath}` }, { status: 201 });
    } catch (error: any) {
        console.error(`Error writing file: ${error?.message}`);
        return NextResponse.json({ error: `Error writing file: ${error?.message}` }, { status: 500 });
    }
}
