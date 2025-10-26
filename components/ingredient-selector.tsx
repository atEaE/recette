"use client";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ingredientsMaster } from "@/data/ingredients";

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onChange: (ingredients: string[]) => void;
}

export default function IngredientSelector({
  selectedIngredients,
  onChange,
}: IngredientSelectorProps) {
  // 食材名のリスト
  const ingredientNames = ingredientsMaster.map((ing) => ing.name);

  return (
    <Autocomplete
      multiple
      id="ingredient-selector"
      options={ingredientNames}
      value={selectedIngredients}
      onChange={(_event, newValue) => {
        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="食材を選択"
          placeholder="食材名で検索..."
          variant="outlined"
        />
      )}
      filterSelectedOptions
      noOptionsText="該当する食材が見つかりません"
      sx={{
        minWidth: { xs: "100%", sm: 300 },
      }}
    />
  );
}
