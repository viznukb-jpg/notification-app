import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "GET" });
}

export function POST() {
  return NextResponse.json({ message: "POST" });
}
