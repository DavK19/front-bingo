"use client";
import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadToOCR } from '@/lib/api';

interface Props {
  open: boolean;
  onClose: () => void;
  onGridReady: (grid: string[][]) => void;
}

export default function UploadModal({ open, onClose, onGridReady }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  async function handleProcess() {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const res = await uploadToOCR(file, 5, 5);
      onGridReady(res.grid);
      onClose();
      setFile(null);
    } catch (e: any) {
      setError(e?.message || 'Error procesando la imagen');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Subir cartón de bingo</h2>
              <button onClick={onClose} className="rounded-md p-2 text-gray-500 hover:bg-gray-100">✕</button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="aspect-square w-full overflow-hidden rounded-xl border bg-gray-50">
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewUrl} alt="preview" className="h-full w-full object-cover" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src="/example-bingo.png" alt="Ejemplo (reemplaza este archivo en public/)" className="h-full w-full object-cover opacity-80" />
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500">Imagen de ejemplo: coloca tu archivo en <code>public/example-bingo.png</code></p>
              </div>

              <div className="flex flex-col justify-between gap-3">
                <div>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="block w-full cursor-pointer rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3 text-sm"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                  <p className="mt-2 text-xs text-gray-500">Formatos soportados: png, jpg, jpeg, bmp, tiff</p>
                </div>
                {error && <div className="rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</div>}
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                  >Seleccionar</button>
                  <button
                    disabled={!file || loading}
                    onClick={handleProcess}
                    className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >{loading ? 'Procesando…' : 'Procesar'}</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
