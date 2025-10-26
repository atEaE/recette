export interface IngredientMaster {
  id: string;
  name: string;
  category: string;
  alternativeNames?: string[]; // 検索用の別名
}

export const ingredientCategories = [
  "穀物・麺類",
  "肉類",
  "魚介類",
  "野菜",
  "果物",
  "卵・乳製品",
  "調味料",
  "その他",
] as const;

export const ingredientsMaster: IngredientMaster[] = [
  // 穀物・麺類
  { id: "pasta-1", name: "スパゲッティ", category: "穀物・麺類" },
  { id: "noodle-1", name: "中華麺", category: "穀物・麺類" },
  { id: "rice-1", name: "酢飯", category: "穀物・麺類" },
  { id: "bread-1", name: "食パン", category: "穀物・麺類" },
  { id: "shell-1", name: "タコスシェル", category: "穀物・麺類" },

  // 肉類
  { id: "pork-1", name: "ベーコン", category: "肉類" },
  { id: "chicken-1", name: "鶏もも肉", category: "肉類" },
  { id: "beef-1", name: "牛ひき肉", category: "肉類" },
  { id: "pork-2", name: "チャーシュー", category: "肉類" },

  // 魚介類
  { id: "fish-1", name: "サーモン", category: "魚介類" },

  // 野菜
  { id: "vegetable-1", name: "玉ねぎ", category: "野菜" },
  { id: "vegetable-2", name: "トマト", category: "野菜" },
  { id: "vegetable-3", name: "にんにく", category: "野菜" },
  { id: "vegetable-4", name: "きゅうり", category: "野菜" },
  { id: "vegetable-5", name: "アボカド", category: "野菜" },
  { id: "vegetable-6", name: "レタス", category: "野菜" },
  { id: "vegetable-7", name: "もやし", category: "野菜" },
  { id: "vegetable-8", name: "ネギ", category: "野菜" },

  // 卵・乳製品
  { id: "egg-1", name: "卵黄", category: "卵・乳製品" },
  { id: "egg-2", name: "卵", category: "卵・乳製品" },
  { id: "dairy-1", name: "パルメザンチーズ", category: "卵・乳製品" },
  { id: "dairy-2", name: "チーズ", category: "卵・乳製品" },
  { id: "dairy-3", name: "牛乳", category: "卵・乳製品" },
  { id: "dairy-4", name: "バター", category: "卵・乳製品" },

  // 調味料
  { id: "seasoning-1", name: "黒胡椒", category: "調味料" },
  { id: "seasoning-2", name: "カレールー", category: "調味料" },
  { id: "seasoning-3", name: "味噌", category: "調味料" },
  { id: "seasoning-4", name: "砂糖", category: "調味料" },

  // その他
  { id: "other-1", name: "海苔", category: "その他" },
];

/**
 * 食材名から食材マスターを検索
 */
export function findIngredientByName(
  name: string,
): IngredientMaster | undefined {
  return ingredientsMaster.find(
    (ingredient) =>
      ingredient.name === name || ingredient.alternativeNames?.includes(name),
  );
}

/**
 * カテゴリーから食材リストを取得
 */
export function getIngredientsByCategory(category: string): IngredientMaster[] {
  return ingredientsMaster.filter(
    (ingredient) => ingredient.category === category,
  );
}
