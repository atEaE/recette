import { NextResponse } from "next/server";
import { mockRecipes } from "@/data/mock-recipes";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // モックデータからレシピを検索
  const recipe = mockRecipes.find((r) => r.id === id);

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  return NextResponse.json(recipe);
}
