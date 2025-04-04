import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    try {
        // Get the path to the JSON file
        const jsonPath = path.join(process.cwd(), 'public', 'data', 'all-articles.json');
        
        // Read the JSON file
        const fileContents = await fs.readFile(jsonPath, 'utf8');
        const data = JSON.parse(fileContents);
        
        // Return the data with proper headers
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading articles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch articles' },
            { status: 500 }
        );
    }
}