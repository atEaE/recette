import { NextResponse } from "next/server";
import {
  type IngredientMaster,
  ingredientCategories,
  ingredientsMaster,
} from "@/data/ingredients";

/**
 * 食材一覧を取得
 */
export async function GET() {
  return NextResponse.json({
    ingredients: ingredientsMaster,
    categories: ingredientCategories,
  });
}

/**
 * 新しい食材を登録
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // バリデーション
    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json({ error: "食材名は必須です" }, { status: 400 });
    }

    if (!body.category || typeof body.category !== "string") {
      return NextResponse.json(
        { error: "カテゴリーは必須です" },
        { status: 400 },
      );
    }

    // カテゴリーの妥当性チェック
    if (!ingredientCategories.includes(body.category)) {
      return NextResponse.json(
        { error: "無効なカテゴリーです" },
        { status: 400 },
      );
    }

    // 重複チェック（名前の完全一致）
    const existingIngredient = ingredientsMaster.find(
      (ingredient) => ingredient.name === body.name.trim(),
    );

    if (existingIngredient) {
      return NextResponse.json(
        { error: "この食材は既に登録されています" },
        { status: 409 },
      );
    }

    // 別名の重複チェック
    if (body.alternativeNames && Array.isArray(body.alternativeNames)) {
      for (const altName of body.alternativeNames) {
        const duplicate = ingredientsMaster.find(
          (ingredient) =>
            ingredient.name === altName ||
            ingredient.alternativeNames?.includes(altName),
        );
        if (duplicate) {
          return NextResponse.json(
            {
              error: `別名「${altName}」は既に使用されています（食材: ${duplicate.name}）`,
            },
            { status: 409 },
          );
        }
      }
    }

    // 新しい食材を作成
    const newIngredient: IngredientMaster = {
      id: `custom-${Date.now()}`,
      name: body.name.trim(),
      category: body.category,
      alternativeNames: body.alternativeNames?.filter((name: string) =>
        name.trim(),
      ),
    };

    // モックデータに追加（実際はDBに保存）
    ingredientsMaster.push(newIngredient);

    return NextResponse.json(
      {
        message: "食材を登録しました",
        ingredient: newIngredient,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("食材登録エラー:", error);
    return NextResponse.json(
      { error: "食材の登録に失敗しました" },
      { status: 500 },
    );
  }
}
