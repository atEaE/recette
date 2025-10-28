import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import IngredientList from "@/components/ingredient-list";
import { ingredientCategories, ingredientsMaster } from "@/data/ingredients";

/**
 * Server Component: 食材一覧ページ
 */
export default async function IngredientsPage() {
  // サーバーコンポーネントなので、直接データを取得
  const ingredients = await getIngredients();

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
          食材一覧
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          登録されている食材をカテゴリー別に表示
        </Typography>

        {/* 食材登録ボタン */}
        <Button
          component={Link}
          href="/ingredients/new"
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
        >
          新しい食材を登録
        </Button>
      </Box>

      {/* 食材リスト */}
      <IngredientList
        ingredients={ingredients}
        categories={ingredientCategories}
      />
    </Container>
  );
}

/**
 * 食材データを取得する
 * Server Componentなので、直接データを取得する
 */
const getIngredients = async () => {
  // 実際のアプリでは、ここでデータベースやAPIからデータを取得する
  return ingredientsMaster;
};
