import { NextResponse } from 'next/server';
import { generateResponse } from '@/lib/chat-utils';

export async function POST(req: Request) {
  try {
    if (!req.body) {
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
    }

    const { currentMessage, stressLevel } = await req.json();

    if (!currentMessage || !stressLevel) {
      return NextResponse.json({ 
        error: 'currentMessage and stressLevel are required' 
      }, { status: 400 });
    }

    // Generate response
    const botResponse = await generateResponse(currentMessage, stressLevel);

    return NextResponse.json({
      success: true,
      botResponse
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to generate response' 
    }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}