"use client";
import { useEffect, useMemo, useState } from 'react';
import UploadModal from '@/components/UploadModal';
import CardEditorModal from '@/components/CardEditorModal';
import PatternSelector from '@/components/PatternSelector';
import NumberEntry from '@/components/NumberEntry';
import MiniCard from '@/components/MiniCard';
import { Card, Grid, PatternKey } from '@/lib/types';
import { sanitizeTo5x5, getMarks, checkPattern } from '@/lib/patterns';
import { loadCards, loadCalledNumbers, saveCalledNumbers, saveCards } from '@/lib/storage';

export default function Page() {
  const [cards, setCards] = useState<Card[]>([]);
  const [calledNumbers, setCalledNumbers] = useState<Set<number>>(new Set());
  const [selectedPattern, setSelectedPattern] = useState<PatternKey>('P');
  const [showUpload, setShowUpload] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editorGrid, setEditorGrid] = useState<Grid>(Array.from({ length: 5 }, () => Array(5).fill('')));

  // Cargar de localStorage al iniciar
  useEffect(() => {
    const storedCards = loadCards();
    const called = new Set(loadCalledNumbers());
    setCards(storedCards);
    setCalledNumbers(called);
  }, []);

  // Guardar cambios
  useEffect(() => {
    saveCards(cards);
  }, [cards]);

  useEffect(() => {
    saveCalledNumbers(Array.from(calledNumbers));
  }, [calledNumbers]);

  function openEditorWithGrid(grid: Grid) {
    setEditorGrid(sanitizeTo5x5(grid));
    setShowEditor(true);
  }

  function handleSaveGrid(cleanGrid: Grid, customId: string) {
    const card: Card = {
      id: crypto.randomUUID(),
      customId: customId || undefined,
      grid: sanitizeTo5x5(cleanGrid),
      createdAt: Date.now(),
    };
    setCards((prev: Card[]) => [card, ...prev]);
  }

  function deleteCard(cardId: string) {
    setCards((prev: Card[]) => prev.filter((c) => c.id !== cardId));
  }

  function addNumbers(nums: number[]) {
    setCalledNumbers((prev: Set<number>) => new Set([...Array.from(prev), ...nums]));
  }

  function resetNumbers() {
    setCalledNumbers(new Set());
  }

  const stats = useMemo(() => {
    // Cuenta cuántos cartones cumplen el patrón actual
    const total = cards.length;
    const success = cards.reduce((acc: number, c: Card) => {
      const marks = getMarks(c.grid, calledNumbers);
      return acc + (checkPattern(marks, selectedPattern) ? 1 : 0);
    }, 0);
    return { total, success };
  }, [cards, calledNumbers, selectedPattern]);

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Tus cartones</h2>
          <p className="text-sm text-gray-500">Se guardan en tu navegador con localStorage.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary-700"
            onClick={() => setShowUpload(true)}
          >Subir imagen</button>
        </div>
      </section>

      <section className="grid gap-6 rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <PatternSelector value={selectedPattern} onChange={setSelectedPattern} />
          <div className="text-sm text-gray-600">
            Cumplen patrón seleccionado: <span className="font-semibold">{stats.success}</span> / {stats.total}
          </div>
        </div>
        <NumberEntry onAddNumbers={addNumbers} onReset={resetNumbers} />
      </section>

      <section>
        {cards.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-gray-50 p-10 text-center text-gray-500">
            Aún no tienes cartones. Sube una imagen para comenzar.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {cards.map((card) => (
              <MiniCard
                key={card.id}
                grid={card.grid}
                calledNumbers={calledNumbers}
                selectedPattern={selectedPattern}
                customId={card.customId}
                onDelete={() => deleteCard(card.id)}
              />
            ))}
          </div>
        )}
      </section>

      <UploadModal
        open={showUpload}
        onClose={() => setShowUpload(false)}
        onGridReady={openEditorWithGrid}
      />

      <CardEditorModal
        open={showEditor}
        initialGrid={editorGrid}
        onSave={handleSaveGrid}
        onClose={() => setShowEditor(false)}
      />
    </div>
  );
}
