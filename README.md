# Mr. Elote Mix Gourmet — sitio web

Sitio de la franquicia Mr. Elote Mix Gourmet, construido con Next.js 16 (App
Router), React 19, TypeScript y Tailwind CSS v4, siguiendo las convenciones
de shadcn/ui. El Hero usa un componente de scroll-expansión (imagen que
crece al hacer scroll) provisto originalmente por Luis.

## Requisitos

- Node.js 20 o superior
- npm (o pnpm/yarn si prefieres, ajustando los comandos)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Verificar tipos

```bash
npx tsc --noEmit
```

## Compilar para producción (exportación estática)

```bash
npm run build
```

Esto genera una carpeta `out/` con el sitio 100% estático (HTML, CSS, JS e
imágenes) — sin necesidad de un servidor Node. Es la carpeta que subes a
Netlify, Cloudflare Pages, o cualquier hosting estático.

> Nota: la primera vez que compiles necesitas conexión a internet para que
> Next.js descargue las fuentes de Google (Anton, Baloo 2, Permanent
> Marker) usadas en `app/layout.tsx`. Esto es normal y solo ocurre una vez
> por máquina/CI (se cachean).

## Publicar (hosting gratuito)

1. Corre `npm run build`.
2. Arrastra la carpeta `out/` a [Netlify Drop](https://app.netlify.com/drop)
   — o conecta el repositorio en Netlify/Cloudflare Pages con:
   - Build command: `npm run build`
   - Publish directory: `out`
3. Conecta tu dominio (ver la sección "Dominio y hosting" en los apuntes
   del proyecto).

## Estructura

- `app/` — layout raíz, metadata, estilos globales (`globals.css`).
- `components/site/` — secciones del sitio (Navbar, Hero, Quiénes somos,
  Experiencia, Galería, Franquicia, Footer, Marquee).
- `components/ui/` — primitivos estilo shadcn, incluido
  `scroll-expansion-hero.tsx` (el efecto de scroll del Hero).
- `lib/content.ts` — todo el contenido editable del sitio (textos, precios,
  planes de franquicia, galería) en un solo lugar.
- `public/images/` — fotos del negocio.

## Para agregar el video de la sección "Experiencia"

En `components/site/experiencia.tsx`, cambia la constante `VIDEO_SRC` de
`null` a la ruta del video (por ejemplo `/videos/experiencia.mp4`, colocando
el archivo en `public/videos/`). El scroll-scrubbing ya está listo, solo
necesita el archivo real.

## Deploy a GitHub Pages

El sitio se publica desde la rama `gh-pages` en https://ikyet.github.io/mrelote/.

```bash
NEXT_PUBLIC_BASE_PATH=/mrelote npm run build   # en PowerShell: $env:NEXT_PUBLIC_BASE_PATH='/mrelote'; npm run build
touch out/.nojekyll
```

Luego sube el contenido de `out/` a la rama `gh-pages`.
