# Agent Guide for react-changes-listener

This document outlines the patterns, conventions, and tools used in this codebase to help AI agents work effectively.

## Project Overview
This is a lightweight React utility component library providing a `ChangesListener` component and `usePrevious` hook. It is written in TypeScript and built with `tsup`.

## Tooling & Commands

| Task | Command | Description |
|------|---------|-------------|
| **Build** | `pnpm run build` | Builds the library using `tsup` to `dist/` (ESM & CJS formats) |
| **Test** | `pnpm test` | Runs tests using `vitest` |
| **Lint/Format** | *Not explicitly configured* | Follow existing code style |

- **Package Manager**: `pnpm` (preferred), but standard `npm` scripts work.
- **Environment**: Node.js, `jsdom` for testing.

## Code Structure

- **src/**: Source code.
  - `ChangesListener.tsx`: Main component and utility hooks.
- **tests/**: Test files.
  - `ChangesListener.test.tsx`: Component integration tests.
  - `setup.ts`: Vitest setup (cleanup, jest-dom).
- **dist/**: Build output (gitignored).

## Coding Conventions

### TypeScript & React
- **Strict Mode**: `strict: true` is enabled in `tsconfig.json`.
- **Components**: Functional components using hooks.
- **Generics**: Heavy use of generics (`<T>`, `<K>`) to ensure type safety for watched values.
- **Null Render**: The main component `ChangesListener` returns `null` as it is a logic-only component.

### Testing (Vitest)
- **Framework**: `vitest` with `@testing-library/react`.
- **Pattern**:
  - Use `renderHook` for testing hooks.
  - Use `render` and `act` for testing component behavior/effects.
  - Mock listeners using `vi.fn()`.
  - Clean up is handled automatically via `tests/setup.ts`.

## Key Patterns
- **Effect-based Logic**: The component uses `useRef` to track previous values and triggers callbacks in the render phase or effects when comparisons fail.
- **Type Guards**: Checks like `typeof field !== "undefined"` are used to discriminate between object property watching and full value watching.

## Gotchas
- **Exports**: `package.json` defines exports for `import` (ESM) and `require` (CJS). Ensure new files are exported correctly if added.
- **No UI**: This library intentionally renders nothing (`return null`). Do not add UI elements to the main component.
