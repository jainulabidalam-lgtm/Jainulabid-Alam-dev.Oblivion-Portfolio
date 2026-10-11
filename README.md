# Portfolio

React + Vite + TypeScript. CSS 3D project ring, glass UI, no 3D dependencies.

```bash
npm install
npm run dev        # develop
npm run build      # tsc + vite build
npm run lint
```

## Before you publish: fill these in

`src/data/profile.ts`

- `name` and `email` are **placeholders** ("Your Name", hello@example.com).
- `links` is empty. Add `{ label, href }` entries for GitHub, LinkedIn, etc.
- `intro`, `about`, `SKILL_GROUPS` are conservative copy derived only from the six project names. Edit freely.

`src/data/projects.ts` holds the six projects. Summaries are deliberately minimal; add real detail, URLs and screenshots when you have them.

## Loader

`src/components/ui/dotm-square-8.tsx` is a local implementation of the DotmSquare8 API
(`size`, `dotSize`, `speed`, `bloom`, `pattern`, `colorPreset`, `muted`, `animated`,
`opacityBase/Mid/Peak`, `cellPadding`, `boxSize`, `minSize`). Run

```bash
npx shadcn@latest add @dotmatrix/dotm-square-8
```

to replace it with the official component; the import path is identical. If you do,
the `.dotm*` rules at the bottom of `src/index.css` can be deleted.

## Ring tuning

`.ring { --w; --r }` in `src/index.css` sets card width and radius. The ring angle is
written to a CSS variable from `src/hooks/useRing.ts`, so rotating never re-renders React.
