import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bingo OCR - Front',
  description: 'Cliente Next.js para gestionar cartones de bingo usando OCR',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh bg-gradient-to-b from-white to-slate-50">
        <header className="sticky top-0 z-30 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:glass">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary-600/90" />
              <h1 className="text-xl font-semibold tracking-tight">Bingo OCR</h1>
            </div>
            <div className="text-sm text-gray-500">Next.js + Tailwind</div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        <footer className="mx-auto max-w-6xl px-6 pb-10 pt-6 text-center text-sm text-gray-500">
          Hecho con ❤️ para Vercel
        </footer>
      </body>
    </html>
  );
}
