import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    team: "nptv23",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
