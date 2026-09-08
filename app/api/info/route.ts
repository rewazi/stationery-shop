import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    team: process.env.TEAM_NAME ?? "Неизвестная команда (Ошибка!)",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
