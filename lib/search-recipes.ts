import type { Recipe } from "@/types/recipe";
import type { SearchMode, SearchParams, SearchResult } from "@/types/search";

/**
 * 食材名でレシピを検索
 */
export function searchRecipesByIngredients(
  recipes: Recipe[],
  params: SearchParams,
): SearchResult<Recipe> {
  const { ingredients, mode } = params;

  // 食材が指定されていない場合は全件返す
  if (ingredients.length === 0) {
    return {
      items: recipes,
      total: recipes.length,
      params,
    };
  }

  const filtered = recipes.filter((recipe) => {
    const recipeIngredientNames = recipe.ingredients.map((ing) =>
      ing.name.toLowerCase(),
    );

    if (mode === "and") {
      // AND検索: 指定された全ての食材を含む
      return ingredients.every((searchIngredient) => {
        const searchLower = searchIngredient.toLowerCase();
        return recipeIngredientNames.some((recipeName) =>
          recipeName.includes(searchLower),
        );
      });
    }
    // OR検索: 指定されたいずれかの食材を含む
    return ingredients.some((searchIngredient) => {
      const searchLower = searchIngredient.toLowerCase();
      return recipeIngredientNames.some((recipeName) =>
        recipeName.includes(searchLower),
      );
    });
  });

  return {
    items: filtered,
    total: filtered.length,
    params,
  };
}

/**
 * レシピに含まれる食材をフィルタリング
 */
export function filterRecipesByIngredients(
  recipes: Recipe[],
  ingredientNames: string[],
  mode: SearchMode = "or",
): Recipe[] {
  const result = searchRecipesByIngredients(recipes, {
    ingredients: ingredientNames,
    mode,
  });
  return result.items;
}
