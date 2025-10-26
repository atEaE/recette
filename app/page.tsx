import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RecipeCard from "@/components/RecipeCard";
import { mockRecipes } from "@/data/mockRecipes";

export default function Home() {
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
        {mockRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Box>
    </Container>
  );
}
