import { NextResponse } from "next/server";
import { mockRecipes } from "@/data/mock-recipes";
import { searchRecipesByIngredients } from "@/lib/search-recipes";
import type { SearchMode } from "@/types/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // クエリパラメータから検索条件を取得
  const ingredientsParam = searchParams.get("ingredients");
  const mode = (searchParams.get("mode") || "or") as SearchMode;

  // 食材リストを配列に変換
  const ingredients = ingredientsParam
    ? ingredientsParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  // 検索実行
  const result = searchRecipesByIngredients(mockRecipes, {
    ingredients,
    mode,
  });

  return NextResponse.json(result);
}
