import { BingoOCRResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function uploadToOCR(file: File, rows = 5, cols = 5): Promise<BingoOCRResponse> {
  const form = new FormData();
  form.append('file', file);
  form.append('rows', String(rows));
  form.append('cols', String(cols));

  const res = await fetch(`${API_BASE}/process`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Error OCR (${res.status}): ${txt || res.statusText}`);
  }
  const data = (await res.json()) as BingoOCRResponse;
  return data;
}
