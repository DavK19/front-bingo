export type Grid = string[][];

export interface BingoOCRResponse {
  success: boolean;
  filename: string;
  grid: Grid;
  dimensions: { rows: number; cols: number };
  total_numbers: number;
}

export interface Card {
  id: string;
  customId?: string; // ID visible elegido por el usuario
  grid: Grid; // 5x5 expected. Center [2][2] must be '0' (comodín)
  createdAt: number;
}

export type PatternKey = 'P' | 'O' | 'F' | 'R' | 'FULL';
