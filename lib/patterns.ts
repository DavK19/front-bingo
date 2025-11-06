import { Grid, PatternKey } from './types';

export function gridSize(grid: Grid): number {
  return Array.isArray(grid) ? grid.length : 0;
}

export function getMarks(grid: Grid, called: Set<number>): boolean[][] {
  const n = gridSize(grid);
  const marks: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (n === 5 && i === 2 && j === 2) {
        // Centro comodín
        marks[i][j] = true;
        continue;
      }
      const raw = (grid[i]?.[j] ?? '').toString().trim();
      const num = parseInt(raw, 10);
      if (!Number.isNaN(num) && called.has(num)) {
        marks[i][j] = true;
      }
    }
  }
  return marks;
}

export function checkPattern(marks: boolean[][], key: PatternKey): boolean {
  switch (key) {
    case 'P':
      return checkP(marks);
    case 'O':
      return checkO(marks);
    case 'F':
      return checkF(marks);
    case 'R':
      return checkR(marks);
    case 'FULL':
      return checkFull(marks);
  }
}

function checkRow(m: boolean[][], r: number): boolean {
  return m[r]?.every(Boolean) ?? false;
}

function checkCol(m: boolean[][], c: number): boolean {
  return m.every((row) => row?.[c]);
}

function inBounds(m: boolean[][], i: number, j: number): boolean {
  return i >= 0 && j >= 0 && i < m.length && j < m.length;
}

function checkP(m: boolean[][]): boolean {
  // "P": fila 0, fila 2, columna 0, y primeros 3 elementos de la última columna (0..2)
  const n = m.length;
  if (n !== 5) return false;
  if (!checkRow(m, 0)) return false;
  if (!checkRow(m, 2)) return false;
  if (!checkCol(m, 0)) return false;
  for (let r = 0; r < 3; r++) if (!inBounds(m, r, n - 1) || !m[r][n - 1]) return false;
  return true;
}

function checkO(m: boolean[][]): boolean {
  // "O": borde completo
  const n = m.length;
  if (n < 2) return false;
  for (let c = 0; c < n; c++) if (!m[0][c] || !m[n - 1][c]) return false; // filas extremas
  for (let r = 0; r < n; r++) if (!m[r][0] || !m[r][n - 1]) return false; // columnas extremas
  return true;
}

function checkF(m: boolean[][]): boolean {
  // "F": fila 0, fila 2 y columna 0
  const n = m.length;
  if (n !== 5) return false;
  if (!checkRow(m, 0)) return false;
  if (!checkRow(m, 2)) return false;
  if (!checkCol(m, 0)) return false;
  return true;
}

function checkR(m: boolean[][]): boolean {
  // "R": columna 0 y fila 0
  const n = m.length;
  if (n < 1) return false;
  if (!checkRow(m, 0)) return false;
  if (!checkCol(m, 0)) return false;
  return true;
}

function checkFull(m: boolean[][]): boolean {
  return m.every((row) => row.every(Boolean));
}

export function sanitizeTo5x5(grid: Grid): Grid {
  const n = 5;
  const out: string[][] = Array.from({ length: n }, () => Array(n).fill(''));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      out[i][j] = (grid[i]?.[j] ?? '').toString();
    }
  }
  // Centro comodín
  out[2][2] = '0';
  return out;
}
