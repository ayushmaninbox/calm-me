import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      { error: "Failed to get access token" },
      { status: 500 }
    );
  }

  return NextResponse.json({ accessToken });
}