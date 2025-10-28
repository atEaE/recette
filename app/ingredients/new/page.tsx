import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IngredientForm from "@/components/ingredient-form";

/**
 * Server Component: 食材登録ページ
 */
export default function NewIngredientPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* ヘッダー */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight={700}
          sx={{ mb: 2 }}
        >
          食材登録
        </Typography>
        <Typography variant="h6" color="text.secondary">
          新しい食材をマスターに追加します
        </Typography>
      </Box>

      {/* フォーム */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 2,
        }}
      >
        <IngredientForm />
      </Paper>
    </Container>
  );
}
