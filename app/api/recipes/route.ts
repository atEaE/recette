import { NextResponse } from "next/server";
import { mockRecipes } from "@/data/mock-recipes";

export async function GET() {
  // 実際のAPIではデータベースから取得する想定
  return NextResponse.json(mockRecipes);
}
