"use client";
import { Grid, PatternKey } from '@/lib/types';
import { checkPattern, getMarks } from '@/lib/patterns';
import { motion } from 'framer-motion';

interface Props {
  grid: Grid;
  calledNumbers: Set<number>;
  selectedPattern: PatternKey;
  customId?: string;
  onDelete?: () => void;
}

export default function MiniCard({ grid, calledNumbers, selectedPattern, customId, onDelete }: Props) {
  const marks = getMarks(grid, calledNumbers);
  const hasBingo = checkPattern(marks, selectedPattern);
  const n = grid.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-xl border bg-white p-2 shadow-sm ${hasBingo ? 'ring-2 ring-green-500' : ''}`}
    >
      {customId && (
        <div className="mb-1 truncate text-center text-xs font-semibold text-gray-700">
          {customId}
        </div>
      )}
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: n }).map((_, i) =>
          Array.from({ length: n }).map((_, j) => {
            const center = n === 5 && i === 2 && j === 2;
            const marked = marks[i]?.[j];
            const cellValue = grid[i]?.[j] ?? '';
            const displayValue = center ? '' : cellValue;
            
            return (
              <div
                key={`${i}-${j}`}
                className={`flex aspect-square items-center justify-center rounded-md text-[10px] font-semibold transition-colors ${
                  marked ? 'bg-primary-500 text-white' : 'bg-gray-50 text-gray-700'
                } ${center ? 'opacity-60' : ''}`}
                title={cellValue}
              >
                {displayValue}
              </div>
            );
          })
        )}
      </div>
      {hasBingo && (
        <div className="pointer-events-none absolute -top-2 -right-2 rounded-full bg-green-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
          Bingo
        </div>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-transform hover:scale-110 hover:bg-red-600"
          title="Eliminar cartón"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
}
