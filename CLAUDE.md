# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

This repository explores agentic development patterns through example projects.

## Projects

### car-store-react-ts

React + TypeScript car inventory management app (CRUD, localStorage persistence). Built with Vite.

**Commands** (run from `car-store-react-ts/`):

```
npm run dev      # start dev server on :5173
npm run build    # type-check + production build
npm run lint     # eslint
```

**Architecture:**

- `src/types.ts` — `Car` and `CarFormData` interfaces
- `src/useCarStore.ts` — custom hook; owns all CRUD state and syncs to `localStorage`
- `src/App.tsx` — top-level; manages `Mode` union (`idle | add | edit`) to control form visibility
- `src/CarForm.tsx` — shared add/edit form; receives `initial?: Car` to distinguish modes
- `src/CarCard.tsx` — read-only card with edit/delete actions

**Node version:** requires Node LTS (v24+). Use `nvm use --lts` or let `.nvmrc` handle it.
