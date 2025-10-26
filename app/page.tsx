import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RecipeListWithFilter from "@/components/recipe-list-with-filter";
import { mockRecipes } from "@/data/mock-recipes";

export default async function Home() {
  // サーバーコンポーネントなので、直接データを取得
  const recipes = mockRecipes;

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
      <RecipeListWithFilter recipes={recipes} />
    </Container>
  );
}
