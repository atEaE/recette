"use client";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import type { SearchMode } from "@/types/search";

interface SearchModeToggleProps {
  mode: SearchMode;
  onChange: (mode: SearchMode) => void;
}

export default function SearchModeToggle({
  mode,
  onChange,
}: SearchModeToggleProps) {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: SearchMode | null,
  ) => {
    if (newMode !== null) {
      onChange(newMode);
    }
  };

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleChange}
      aria-label="検索モード"
      size="small"
    >
      <ToggleButton value="and" aria-label="AND検索">
        <Typography variant="body2" fontWeight={mode === "and" ? 600 : 400}>
          すべて含む（AND）
        </Typography>
      </ToggleButton>
      <ToggleButton value="or" aria-label="OR検索">
        <Typography variant="body2" fontWeight={mode === "or" ? 600 : 400}>
          いずれか含む（OR）
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
