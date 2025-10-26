"use client";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import IngredientSelector from "@/components/ingredient-selector";
import RecipeCard from "@/components/recipe-card";
import SearchModeToggle from "@/components/search-mode-toggle";
import type { Recipe } from "@/types/recipe";
import type { SearchMode, SearchResult } from "@/types/search";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URLクエリパラメータから初期値を取得
  const initialIngredients = searchParams.get("ingredients")
    ? searchParams.get("ingredients")?.split(",") || []
    : [];
  const initialMode = (searchParams.get("mode") || "or") as SearchMode;

  const [selectedIngredients, setSelectedIngredients] =
    useState<string[]>(initialIngredients);
  const [searchMode, setSearchMode] = useState<SearchMode>(initialMode);
  const [searchResult, setSearchResult] = useState<SearchResult<Recipe> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (selectedIngredients.length === 0) {
      setSearchResult(null);
      return;
    }

    setIsLoading(true);

    try {
      // URLクエリパラメータを更新
      const params = new URLSearchParams();
      params.set("ingredients", selectedIngredients.join(","));
      params.set("mode", searchMode);
      router.push(`/search?${params.toString()}`, { scroll: false });

      // 検索APIを呼び出し
      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error("検索エラー:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedIngredients, searchMode, router]);

  // 初回レンダリング時にURLパラメータから検索を実行
  useEffect(() => {
    if (initialIngredients.length > 0) {
      handleSearch();
    }
  }, [handleSearch, initialIngredients.length]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* ヘッダー */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight={700}
          sx={{ mb: 2 }}
        >
          食材から検索
        </Typography>
        <Typography variant="h6" color="text.secondary">
          使いたい食材を選んでレシピを見つけましょう
        </Typography>
      </Box>

      {/* 検索フォーム */}
      <Box
        sx={{
          mb: 6,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* 食材選択 */}
          <IngredientSelector
            selectedIngredients={selectedIngredients}
            onChange={setSelectedIngredients}
          />

          {/* 検索モード切り替え */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1" fontWeight={600}>
              検索条件:
            </Typography>
            <SearchModeToggle mode={searchMode} onChange={setSearchMode} />
          </Box>

          {/* 検索ボタン */}
          <Button
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            disabled={selectedIngredients.length === 0 || isLoading}
            sx={{ alignSelf: "flex-start" }}
          >
            {isLoading ? "検索中..." : "検索"}
          </Button>
        </Box>
      </Box>

      {/* 検索結果 */}
      {searchResult && (
        <Box>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            検索結果: {searchResult.total}件
          </Typography>

          {searchResult.total === 0 ? (
            <Typography variant="body1" color="text.secondary">
              条件に一致するレシピが見つかりませんでした。
            </Typography>
          ) : (
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
              {searchResult.items.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
