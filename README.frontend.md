# Bingo OCR Front (Next.js)

Cliente web para cargar imágenes de cartones de bingo, corregirlos, guardarlos en localStorage y validar patrones (P, O, F, R y cartón lleno) en tiempo real.

## Requisitos

- Node.js 18+
- (Opcional) API corriendo localmente en `http://localhost:8000` o configura `NEXT_PUBLIC_API_BASE_URL`.

## Configuración

```powershell
# Windows PowerShell
Copy-Item .env.local.example .env.local
# Edita .env.local si es necesario
```

## Desarrollo

```powershell
npm install
npm run dev
```

Abre http://localhost:3000

## Producción (Vercel)

1. Sube este repo a GitHub.
2. Importa el proyecto en Vercel.
3. En Project Settings → Environment Variables, agrega:
   - `NEXT_PUBLIC_API_BASE_URL` apuntando a tu API (p.ej. `https://TU-API.example.com`).
4. Deploy.

## Dónde colocar la imagen de ejemplo

Coloca tu imagen en `public/example-bingo.png`. El modal de subida la mostrará cuando aún no se seleccione archivo.

## Notas funcionales

- Centro del cartón (posición [2,2] en 5x5) es comodín: se muestra vacío, no editable y se persiste como "0".
- Los cartones y números marcados se guardan en `localStorage`.
- Al ingresar números, las celdas coincidentes se resaltan en tiempo real en todos los cartones.
- Botón "Reiniciar" limpia los números marcados.

## Estructura

- `app/` App Router de Next.js
- `components/` Modales y UI (UploadModal, CardEditorModal, etc.)
- `lib/` Tipos, API client, validadores de patrones
- `public/` Estáticos (incluye `example-bingo.png` que debes añadir)

## API esperada

- POST `/process` multipart/form-data con campos `file`, `rows=5`, `cols=5` → devuelve `grid: string[][]`.
