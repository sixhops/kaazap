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

### Human work

Started adding components for holding the cards and displaying them in rows. Since cards can have multiple values and multiple operations you can do before playing them, I added a possible values array and a selectedValue which is displayed by default and can be changed before playing, and added left and right operations to hold toggle functions for values and other properties. I ended up giving the agent a little cleanup work.

### Prompt 4

Refactor card-data.ts to change the "value" property to "values" and make it an array of the existing value. Update each Card in each array reflect the change. Add a "selectedValue" property which will be set to the value in "values".

**Actions summary**

- Updated the `Card` interface in `app/card-data.ts`:
  - replaced `value: number` with `values: number[]`
  - added `selectedValue: number`
- Refactored every `Card` object in all exported arrays (`HOUSE_CARDS`, `BLUE_CARDS`, `RED_CARDS`, `SWITCH_CARDS`) from:
  - `value: X`
    to:
  - `values: [X]`
  - `selectedValue: X`
- Verified the refactor with linting/diagnostics and a project-wide search for remaining `value` property usages in TypeScript files.

**Explanation**

- This change aligns the data model with multi-value card behavior while keeping current behavior unchanged (each card still starts with a single effective value).
- Adding `selectedValue` as the initialized active value preserves compatibility with UI/game logic that needs one currently selected numeric value, while `values` remains extensible for future toggles or modifiers.

### Prompt 5

Make a directory inside app named "constants", move the card-data.ts and constants.ts files into it, and update all imports using the files.

**Actions summary**

- Created `app/constants/` and moved constants modules into it:
  - `constants.ts` -> `app/constants/constants.ts`
  - `app/card-data.ts` -> `app/constants/card-data.ts`
- Updated all imports that referenced `@/constants` to `@/app/constants/constants` in:
  - `app/page.tsx`
  - `app/components/splash-screen.tsx`
  - `app/components/card-selection-screen.tsx`
  - `app/components/game-screen.tsx`
- Updated commented example imports in `app/components/card-box.tsx` and `app/components/card-row.tsx` to the new path for consistency.
- Removed the old files after relocation and verified there were no stale import references.
- Cleaned lint warnings in touched files (`card-box.tsx`, `card-row.tsx`) introduced by unused imports/props.

**Explanation**

- Grouping shared constants/data under `app/constants/` improves project structure and keeps related modules co-located.
- Updating all import paths in one pass avoids broken module resolution and keeps references consistent for future development.

### Human work

Added components for CardRow and CardBox to display the cards in the CardSelectionScreen. I designed CardRow to be used in multiple places in the game so it is flexible in what cards it can display, how many it can display, and the actions that the click can perform. Clicking on the cards on the left adds a copy of that card to the side deck, Clicking on the cards in the side deck removes them from the side deck.

Added styling for cards to make them look like Pazaak cards. The implementation might need to be changed when we factor in the left and right operations that change the state of the card before it is played. i.e. There might be more conditions that need to be worked in to support the display on the game screen. Also noticing that Tailwind class lists are getting extremely long. Looked up what to do about this and it seems that the preferred way is to abstract out sets of resuable styles into components and then have the children of those components inherit as much as possible. I have doubts that I'd be able to easily refactor this project to work like that, given the exacting nature of the game layouts, but I'll try and work that into my next project.

Began adding the layout for the game screen. Realized that if an array is used for the side hands then playing a card will result in all cards to the right moving over one slot to the left. While this doesn't actually break anything or impede game functionality, it isn't ideal user experience. I opted to leave it in for now and add support for each card staying in place via a map after the whole main concept is finished.
