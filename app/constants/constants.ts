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
