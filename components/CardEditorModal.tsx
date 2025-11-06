"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  initialGrid: string[][];
  onSave: (grid: string[][]) => void;
  onClose: () => void;
}

export default function CardEditorModal({ open, initialGrid, onSave, onClose }: Props) {
  const [grid, setGrid] = useState<string[][]>(initialGrid);

  useEffect(() => {
    setGrid(initialGrid);
  }, [initialGrid]);

  function setCell(i: number, j: number, v: string) {
    setGrid((g: string[][]) => {
      const copy = g.map((row: string[]) => [...row]);
      copy[i][j] = v.replace(/\D+/g, ''); // sólo números
      return copy;
    });
  }

  function handleSave() {
    const clean = grid.map((r: string[]) => r.map((c: string) => (c ?? '').toString().trim()));
    // Centro comodín sin número visual: guardamos '0'
    if (clean[2]?.[2] !== undefined) clean[2][2] = '0';
    onSave(clean);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Editar cartón</h2>
              <button onClick={onClose} className="rounded-md p-2 text-gray-500 hover:bg-gray-100">✕</button>
            </div>
            <div className="grid-5x5 gap-2">
              {grid.map((row, i) =>
                row.map((cell, j) => {
                  const center = i === 2 && j === 2;
                  return (
                    <div key={`${i}-${j}`} className="aspect-square">
                      <input
                        className={`h-full w-full rounded-lg border text-center text-lg font-semibold tracking-wide ${
                          center
                            ? 'bg-gray-100 text-gray-400' 
                            : 'bg-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200'
                        }`}
                        value={center ? '' : (cell ?? '')}
                        disabled={center}
                        maxLength={3}
                        onChange={(e) => setCell(i, j, e.target.value)}
                      />
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50" onClick={onClose}>Cancelar</button>
              <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white" onClick={handleSave}>Guardar</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
