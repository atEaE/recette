"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import IngredientSelector from "@/components/ingredient-selector";
import RecipeCard from "@/components/recipe-card";
import SearchModeToggle from "@/components/search-mode-toggle";
import { filterRecipesByIngredients } from "@/lib/search-recipes";
import type { Recipe } from "@/types/recipe";
import type { SearchMode } from "@/types/search";

interface RecipeListWithFilterProps {
  recipes: Recipe[];
}

export default function RecipeListWithFilter({
  recipes,
}: RecipeListWithFilterProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchMode, setSearchMode] = useState<SearchMode>("or");

  // フィルタリングされたレシピ
  const filteredRecipes = useMemo(() => {
    if (selectedIngredients.length === 0) {
      return recipes;
    }
    return filterRecipesByIngredients(recipes, selectedIngredients, searchMode);
  }, [recipes, selectedIngredients, searchMode]);

  return (
    <Box>
      {/* フィルターエリア */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              食材で絞り込み
            </Typography>
            <Link component={NextLink} href="/search" underline="hover">
              詳細検索ページへ
            </Link>
          </Box>

          <IngredientSelector
            selectedIngredients={selectedIngredients}
            onChange={setSelectedIngredients}
          />

          {selectedIngredients.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                検索条件:
              </Typography>
              <SearchModeToggle mode={searchMode} onChange={setSearchMode} />
            </Box>
          )}
        </Box>
      </Box>

      {/* 結果表示 */}
      {selectedIngredients.length > 0 && (
        <Typography variant="body1" sx={{ mb: 2 }} color="text.secondary">
          {filteredRecipes.length}件のレシピが見つかりました
        </Typography>
      )}

      {/* レシピカードグリッド */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Box>

      {selectedIngredients.length > 0 && filteredRecipes.length === 0 && (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          条件に一致するレシピが見つかりませんでした
        </Typography>
      )}
    </Box>
  );
}
