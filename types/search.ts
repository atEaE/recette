/**
 * 検索モード
 */
export type SearchMode = "and" | "or";

/**
 * 検索条件
 */
export interface SearchParams {
  /** 選択された食材名のリスト */
  ingredients: string[];
  /** 検索モード (AND/OR) */
  mode: SearchMode;
}

/**
 * 検索結果
 */
export interface SearchResult<T> {
  /** 検索結果のアイテム */
  items: T[];
  /** 総件数 */
  total: number;
  /** 検索条件 */
  params: SearchParams;
}
