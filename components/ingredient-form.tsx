"use client";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ingredientCategories } from "@/data/ingredients";

interface IngredientFormData {
  name: string;
  category: string;
  alternativeNames: string[];
}

interface IngredientFormProps {
  onSuccess?: () => void;
}

export default function IngredientForm({ onSuccess }: IngredientFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<IngredientFormData>({
    name: "",
    category: "",
    alternativeNames: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // バリデーション
    if (!formData.name.trim()) {
      setError("食材名を入力してください");
      return;
    }

    if (!formData.category) {
      setError("カテゴリーを選択してください");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "食材の登録に失敗しました");
        return;
      }

      setSuccess(true);
      // 成功後、食材一覧ページへ遷移
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/ingredients");
        }
      }, 1500);
    } catch (err) {
      console.error("登録エラー:", err);
      setError("食材の登録に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      category: "",
      alternativeNames: [],
    });
    setError(null);
    setSuccess(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* エラーメッセージ */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* 成功メッセージ */}
      {success && (
        <Alert severity="success">
          食材を登録しました。食材一覧ページへ移動します...
        </Alert>
      )}

      {/* 食材名 */}
      <TextField
        label="食材名"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        fullWidth
        disabled={isSubmitting}
        helperText="例: トマト、鶏もも肉"
      />

      {/* カテゴリー */}
      <FormControl fullWidth required disabled={isSubmitting}>
        <InputLabel>カテゴリー</InputLabel>
        <Select
          value={formData.category}
          label="カテゴリー"
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          {ingredientCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 別名（任意） */}
      <Autocomplete
        multiple
        freeSolo
        options={[]}
        value={formData.alternativeNames}
        onChange={(_, newValue) => {
          setFormData({ ...formData, alternativeNames: newValue });
        }}
        disabled={isSubmitting}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                key={key}
                label={option}
                {...tagProps}
                deleteIcon={<CloseIcon />}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="別名（任意）"
            placeholder="別名を入力してEnterキーで追加"
            helperText="検索時に使用される別の呼び方を登録できます（例: ピーマン → パプリカ）"
          />
        )}
      />

      {/* ボタン */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button
          type="button"
          variant="outlined"
          onClick={handleReset}
          disabled={isSubmitting}
        >
          クリア
        </Button>
        <Button
          type="submit"
          variant="contained"
          startIcon={isSubmitting ? <AddIcon /> : <SaveIcon />}
          disabled={isSubmitting}
        >
          {isSubmitting ? "登録中..." : "登録"}
        </Button>
      </Box>
    </Box>
  );
}
