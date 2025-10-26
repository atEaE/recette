export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  categories: string[];
  tags: string[];
  ingredients: Ingredient[];
  steps: Step[];
  cookingTime: number; // 分単位
  servings: number; // 何人分
  createdAt: Date;
  updatedAt: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit?: string;
}

export interface Step {
  id: string;
  order: number;
  description: string;
  imageUrl?: string;
}
