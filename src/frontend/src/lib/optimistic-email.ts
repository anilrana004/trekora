/** Show success immediately; deliver email in background. Revert via onFailed if needed. */
export type EmailSubmitResult = { ok: true } | { ok: false; error: string };

export function submitEmailOptimistic(
  submit: () => Promise<EmailSubmitResult>,
  onInstantSuccess: () => void,
  onSendFailed: (message: string) => void,
  onSendSucceeded?: () => void,
): void {
  onInstantSuccess();
  const run = () => {
    void submit().then((result) => {
      if (!result.ok) {
        onSendFailed(
          result.error || "Could not send your request. Please try again.",
        );
        return;
      }
      onSendSucceeded?.();
    });
  };
  if (typeof queueMicrotask === "function") {
    queueMicrotask(run);
  } else {
    void Promise.resolve().then(run);
  }
}
