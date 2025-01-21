import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export async function POST(request: Request) {
  try {
    const { publicId, timestamp } = await request.json();

    // Generate signature
    const signature = createHmac('sha1', process.env.CLOUDINARY_API_SECRET!)
      .update(`public_id=${publicId}&timestamp=${timestamp}`)
      .digest('hex');

    return NextResponse.json({ signature });
  } catch (error) {
    console.error('Error generating signature:', error);
    return NextResponse.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    );
  }
}