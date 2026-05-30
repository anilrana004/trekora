/**
 * Direct modal openers registered by Layout — one tap, no custom-event delay.
 */
type Opener = (() => void) | null;

let openQueryModalOpener: Opener = null;
let openTrekQuizOpener: Opener = null;
let openCallbackOpener: Opener = null;

export function registerLayoutModalOpeners(handlers: {
  openQueryModal: Opener;
  openTrekQuiz: Opener;
  openCallback?: Opener;
}) {
  openQueryModalOpener = handlers.openQueryModal;
  openTrekQuizOpener = handlers.openTrekQuiz;
  openCallbackOpener = handlers.openCallback ?? null;
}

export function openQueryModalFromLayout() {
  if (openQueryModalOpener) {
    openQueryModalOpener();
    return;
  }
  window.dispatchEvent(new CustomEvent("open-query-modal", { bubbles: true }));
}

export function openTrekQuizFromLayout() {
  if (openTrekQuizOpener) {
    openTrekQuizOpener();
    return;
  }
  window.dispatchEvent(new CustomEvent("open-trek-quiz", { bubbles: true }));
}

export function openCallbackFromLayout() {
  if (openCallbackOpener) {
    openCallbackOpener();
    return;
  }
  window.dispatchEvent(
    new CustomEvent("open-callback-panel", { bubbles: true }),
  );
}
