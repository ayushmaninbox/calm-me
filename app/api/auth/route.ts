import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import { NextResponse } from "next/server";
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = headers();
    const accessToken = await getHumeAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: 500 }
      );
    }

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error('Error getting Hume access token:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}