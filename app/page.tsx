import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RecipeCard from "@/components/recipe-card";
import type { Recipe } from "@/types/recipe";

async function getRecipes(): Promise<Recipe[]> {
  // 開発環境とプロダクション環境で動作するようにベースURLを構築
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/recipes`, {
      // Next.jsのキャッシュ設定
      next: { revalidate: 60 }, // 60秒ごとに再検証
    });

    if (!res.ok) {
      throw new Error("Failed to fetch recipes");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight={700}
          sx={{ mb: 2 }}
        >
          レシピ一覧
        </Typography>
        <Typography variant="h6" color="text.secondary">
          お気に入りのレシピを見つけて、料理を楽しみましょう
        </Typography>
      </Box>
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
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Box>
    </Container>
  );
}
