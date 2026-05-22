export type CallbackEmailPayload = {
  phone: string;
  preferredTime?: string;
  source?: string;
  pagePath?: string;
};

export type CallbackEmailResult = { ok: true } | { ok: false; error: string };

export async function submitCallbackEmail(
  payload: CallbackEmailPayload,
): Promise<CallbackEmailResult> {
  try {
    const res = await fetch("/api/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...payload,
        pagePath:
          payload.pagePath ??
          (typeof window !== "undefined" ? window.location.pathname : ""),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };
    if (!res.ok || !data.ok) {
      return {
        ok: false,
        error:
          data.error ||
          "Could not send your callback request. Please try again or call us.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Network error. Check your connection and try again.",
    };
  }
}
