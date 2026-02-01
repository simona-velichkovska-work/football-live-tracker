import { NextResponse } from "next/server";
import { getLiveMatches } from "@/lib/api";

export async function GET() {
  try {
    const matches = await getLiveMatches();
    return NextResponse.json(matches);
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}