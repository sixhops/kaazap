/** Canonical view ids used by `currentView` state and screen components. */
export const VIEW_SPLASH = "SplashScreen";
export const VIEW_CARD_SELECTION = "CardSelectionScreen";
export const VIEW_GAME = "GameScreen";

export const VIEW_CYCLE_ORDER = [
  VIEW_SPLASH,
  VIEW_CARD_SELECTION,
  VIEW_GAME,
] as const;

export type ViewName = (typeof VIEW_CYCLE_ORDER)[number];

export function getNextView(current: ViewName): ViewName {
  const index = VIEW_CYCLE_ORDER.indexOf(current);
  const safeIndex = index === -1 ? 0 : index;
  const nextIndex = (safeIndex + 1) % VIEW_CYCLE_ORDER.length;
  return VIEW_CYCLE_ORDER[nextIndex]!;
}

/** Shared Tailwind classes for primary actions (dark fill). */
export const primaryButtonClassName =
  "rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900";

/** Append to `primaryButtonClassName` for disabled primary buttons. */
export const primaryButtonDisabledClassName =
  "disabled:cursor-not-allowed disabled:bg-zinc-400 disabled:text-zinc-200 disabled:opacity-70 disabled:hover:bg-zinc-400";

/** Compact primary (e.g. modal confirm). */
export const primaryButtonCompactClassName =
  "rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900";

/** Outline secondary (e.g. modal cancel). */
export const secondaryOutlineButtonClassName =
  "rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700";
