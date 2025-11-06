"use client";
import { useState } from 'react';

interface Props {
  onAddNumbers: (nums: number[]) => void;
  onReset: () => void;
}

export default function NumberEntry({ onAddNumbers, onReset }: Props) {
  const [value, setValue] = useState('');

  function parseNumbers(input: string): number[] {
    const parts = input.split(/[^0-9]+/g).map((p) => p.trim()).filter(Boolean);
    const nums = parts.map((p) => parseInt(p, 10)).filter((n) => !Number.isNaN(n));
    // Filtra valores típicos de bingo 1..75, pero permite otros por si acaso
    return Array.from(new Set(nums));
  }

  function handleAdd() {
    const nums = parseNumbers(value);
    if (nums.length > 0) onAddNumbers(nums);
    setValue('');
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="text"
        inputMode="numeric"
        placeholder="Ingresa números (ej: 1, 23, 45)"
        className="w-64 rounded-lg border px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAdd()}
      />
      <button className="rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white" onClick={handleAdd}>Marcar</button>
      <button className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50" onClick={onReset}>Reiniciar</button>
    </div>
  );
}
