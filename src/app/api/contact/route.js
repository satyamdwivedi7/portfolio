import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    const response = await fetch(`${API_BASE_URL}/sendmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'secret': process.env.API_SECRET || '',
      },
      body: JSON.stringify({
        name: name.trim(),
        to: email.trim(),
        messageFromVisitor: message.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Failed to send message' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Mail sent' });
  } catch (error) {
    console.error('Contact API route error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
