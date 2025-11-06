"use client";
import { PatternKey } from '@/lib/types';

interface Props {
  value: PatternKey;
  onChange: (p: PatternKey) => void;
}

type PreviewCell = 0 | 1;

const PREVIEWS: Record<PatternKey, PreviewCell[][]> = {
  P: gridFrom((r, c) => r === 0 || r === 2 || c === 0 || (c === 4 && r < 3)),
  O: gridFrom((r, c) => r === 0 || r === 4 || c === 0 || c === 4),
  F: gridFrom((r, c) => r === 0 || r === 2 || c === 0),
  R: gridFrom((r, c) => r === 0 || c === 0),
  FULL: gridFrom(() => true),
};

function gridFrom(pred: (r: number, c: number) => boolean): PreviewCell[][] {
  const n = 5;
  return Array.from({ length: n }, (_, r) =>
    Array.from({ length: n }, (_, c) => (pred(r, c) ? 1 : 0))
  );
}

const labels: Record<PatternKey, string> = {
  P: 'p',
  O: 'o',
  F: 'f',
  R: 'r',
  FULL: 'e',
};

export default function PatternSelector({ value, onChange }: Props) {
  const ORDER: PatternKey[] = ['F', 'O', 'P', 'R', 'FULL'];
  const titles: Record<PatternKey, string> = { F: 'F', O: 'O', P: 'P', R: 'R', FULL: 'Todo' };

  return (
    <div className="flex flex-wrap gap-3">
      {ORDER.map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex items-center gap-2 rounded-xl border p-2 transition-all hover:shadow ${
            value === key ? 'border-primary-500 shadow-soft' : 'border-gray-200'
          }`}
          title={`Bingo: ${titles[key]}`}
        >
          <div className="grid grid-cols-5 gap-0.5">
            {PREVIEWS[key].flatMap((row, i) =>
              row.map((v, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`h-3 w-3 rounded-sm ${v ? 'bg-primary-500' : 'bg-gray-200'}`}
                />
              ))
            )}
          </div>
          <span className="text-sm font-medium">{labels[key]}</span>
        </button>
      ))}
    </div>
  );
}
