# Kaazap
Absolutely not a copyright infringement of a classic in-game card battle. Imitation is flattery, right?

## Development Journal

### Prompt 1
Create a new next.js app in this folder. It will use react, typescript, and tailwind. This project will not be using any react server components. There are no databases nor APIs to access. All components will use "use client". Be sure to follow the rules in .cursor/rules/.

**Actions summary**
- Read `.cursor/rules/general.md` to follow repository and coding conventions.
- Scaffolded a new Next.js (React + TypeScript + Tailwind) app in `Kaazap/` using `create-next-app`.
- Ensured the app is effectively client-only by adding `"use client";` to:
  - `app/layout.tsx`
  - `app/page.tsx`
- Removed `metadata` from `app/layout.tsx` after making it a client component (to avoid conflicts with Next metadata exports).
- Verified the setup with:
  - `npm run lint`
  - `npm run build`

**Explanation**
- Your requirement explicitly disallows React Server Components, so I marked the primary App Router entry files as client components.
- Because the scaffold used the App Router by default, simply marking page/components with `use client` isn’t sufficient in practice unless the App Router boundary files are compatible; updating `app/layout.tsx` and `app/page.tsx` makes the entry boundary client-side.
- I ran lint/build to confirm the code compiles and the configuration is consistent.

### Prompt 2
Create a section in the README.md called "Development Journal". For every prompt I give you, add that prompt and a summary of your actions with explanations to the journal with clear formatting. Do this now for the first prompt I gave and your response, and then for this prompt and your response.

**Actions summary**
- Added the `## Development Journal` section to the top-level `README.md`.
- Recorded Prompt 1 and this prompt as separate subsections with:
  - the exact prompt text
  - an actions summary
  - a short explanation of key decisions

**Explanation**
- You requested a persistent, clearly formatted audit trail in `README.md`, so I structured the journal with `### Prompt 1` and `### Prompt 2`, each containing actions and explanations for traceability.

### Prompt 3
Add a state variable to page.tsx called currentView which is a string value. Create 3 new components, each representing one of those views. Each will be 640px high by 800px wide, centered in the viewport. Only one view will be rendered at a time - the one corresponding to the state value. Name the components "SplashScreen" with a light red background, "CardSelectionScreen" with a light blue background, and "GameScreen" with a light green background. Pass the state setting function into each component. Add a title heading displaying the name of the component and a centered button in each component which will change the value in state so that the next view in the cycle will be displayed. The cycle is "SplashScreen" to "CardSelectionScreen" to "GameScreen" and then back to "SplashScreen".

**Actions summary**
- Added `constants.ts` with view name strings, ordered cycle list, `ViewName` type, and `getNextView()` helper (avoids enums; single source of truth per project rules).
- Created client components in `app/components/`:
  - `splash-screen.tsx` (`SplashScreen`, light red `bg-red-200`)
  - `card-selection-screen.tsx` (`CardSelectionScreen`, light blue `bg-blue-200`)
  - `game-screen.tsx` (`GameScreen`, light green `bg-green-200`)
- Updated `app/page.tsx` with `useState<ViewName>` defaulting to splash; viewport-centered wrapper (`flex min-h-full flex-1 items-center justify-center`); conditional render so only one screen mounts at a time; passed `setCurrentView` into each screen.
- Each screen shows an `h1` with the component name and a centered “Next” `button` that advances state using `getNextView(...)`.
- Panels use `h-[640px]` and `max-w-[800px] w-full` so the layout stays mobile-first while matching the target size on larger viewports.
- Ran `npm run lint` and `npm run build`.

**Explanation**
- Centralizing view ids in `constants.ts` keeps the cycle deterministic and typed while still satisfying “string value” state at runtime.
- Splitting screens into separate files matches separation of concerns and keeps each file small.
- `role="region"` + `aria-labelledby` ties headings to panels for clearer screen-reader structure.
