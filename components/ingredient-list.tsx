"use client";

import SearchIcon from "@mui/icons-material/Search";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import type { IngredientMaster } from "@/data/ingredients";

interface IngredientListProps {
  ingredients: IngredientMaster[];
  categories: readonly string[];
}

export default function IngredientList({
  ingredients,
  categories,
}: IngredientListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // 検索フィルタリング
  const filteredIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.alternativeNames?.some((altName) =>
        altName.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  // カテゴリー別にグループ化
  const groupedIngredients = categories.reduce(
    (acc, category) => {
      acc[category] = filteredIngredients.filter(
        (ingredient) => ingredient.category === category,
      );
      return acc;
    },
    {} as Record<string, IngredientMaster[]>,
  );

  return (
    <Box>
      {/* 検索ボックス */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="食材名で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
            },
          }}
        />
      </Box>

      {/* 統計情報 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          全{filteredIngredients.length}件の食材
          {searchQuery && ` (検索結果)`}
        </Typography>
      </Box>

      {/* カテゴリー別アコーディオン */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {categories.map((category) => {
          const categoryIngredients = groupedIngredients[category];
          if (categoryIngredients.length === 0) return null;

          return (
            <Accordion key={category} defaultExpanded>
              <AccordionSummary>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {category}
                  </Typography>
                  <Chip
                    label={categoryIngredients.length}
                    size="small"
                    color="primary"
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {categoryIngredients.map((ingredient) => (
                    <Chip
                      key={ingredient.id}
                      label={
                        <Box>
                          <Typography component="span" variant="body2">
                            {ingredient.name}
                          </Typography>
                          {ingredient.alternativeNames &&
                            ingredient.alternativeNames.length > 0 && (
                              <Typography
                                component="span"
                                variant="caption"
                                sx={{ ml: 0.5, opacity: 0.7 }}
                              >
                                ({ingredient.alternativeNames.join(", ")})
                              </Typography>
                            )}
                        </Box>
                      }
                      variant="outlined"
                      sx={{
                        height: "auto",
                        py: 0.5,
                        "& .MuiChip-label": {
                          whiteSpace: "normal",
                          display: "block",
                        },
                      }}
                    />
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>

      {/* 検索結果なし */}
      {filteredIngredients.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="body1" color="text.secondary">
            該当する食材が見つかりませんでした
          </Typography>
        </Box>
      )}
    </Box>
  );
}
