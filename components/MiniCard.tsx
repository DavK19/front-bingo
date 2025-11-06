"use client";
import { Grid, PatternKey } from '@/lib/types';
import { checkPattern, getMarks } from '@/lib/patterns';
import { motion } from 'framer-motion';

interface Props {
  grid: Grid;
  calledNumbers: Set<number>;
  selectedPattern: PatternKey;
}

export default function MiniCard({ grid, calledNumbers, selectedPattern }: Props) {
  const marks = getMarks(grid, calledNumbers);
  const hasBingo = checkPattern(marks, selectedPattern);
  const n = grid.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-xl border bg-white p-2 shadow-sm ${hasBingo ? 'ring-2 ring-green-500' : ''}`}
    >
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: n }).map((_, i) =>
          Array.from({ length: n }).map((_, j) => {
            const center = n === 5 && i === 2 && j === 2;
            const marked = marks[i]?.[j];
            return (
              <div
                key={`${i}-${j}`}
                className={`flex aspect-square items-center justify-center rounded-md text-xs font-semibold ${
                  marked ? 'bg-primary-100 text-primary-700' : 'bg-gray-50 text-gray-500'
                } ${center ? 'opacity-60' : ''}`}
                title={grid[i]?.[j] ?? ''}
              >
                {/* No es necesario mostrar número en miniatura */}
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
    </motion.div>
  );
}
