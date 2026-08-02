import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, projectType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    console.log('Received contact message:', { name, email, projectType, message });

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
