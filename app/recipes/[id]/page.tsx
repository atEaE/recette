import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Recipe } from "@/types/recipe";

async function getRecipe(id: string): Promise<Recipe | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/recipes/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* ヘッダー画像 */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 300, md: 500 },
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
        }}
      >
        <Image
          src={recipe.imageUrl || "/placeholder.jpg"}
          alt={recipe.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Box>

      {/* タイトルと基本情報 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight={700}
          sx={{ mb: 2 }}
        >
          {recipe.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          {recipe.description}
        </Typography>

        {/* 調理時間と人数 */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 3,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon color="action" />
            <Typography variant="body1">
              調理時間: <strong>{recipe.cookingTime}分</strong>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PeopleIcon color="action" />
            <Typography variant="body1">
              <strong>{recipe.servings}人分</strong>
            </Typography>
          </Box>
        </Box>

        {/* カテゴリーとタグ */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          {recipe.categories.map((category) => (
            <Chip key={category} label={category} color="primary" />
          ))}
          {recipe.tags.map((tag) => (
            <Chip key={tag} label={tag} variant="outlined" />
          ))}
        </Box>
      </Box>

      {/* 材料リスト */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
            材料
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box component="ul" sx={{ pl: 2 }}>
            {recipe.ingredients.map((ingredient) => (
              <Box
                component="li"
                key={ingredient.id}
                sx={{
                  mb: 1.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">{ingredient.name}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {ingredient.amount}
                  {ingredient.unit && ingredient.unit}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* 手順 */}
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
            作り方
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box>
            {recipe.steps.map((step) => (
              <Box key={step.id} sx={{ mb: 3, display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    minWidth: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  {step.order}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {step.description}
                  </Typography>
                  {step.imageUrl && (
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 200,
                        borderRadius: 1,
                        overflow: "hidden",
                        mt: 2,
                      }}
                    >
                      <Image
                        src={step.imageUrl}
                        alt={`手順 ${step.order}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
