export function useGTM() {
  const push = (event: Record<string, unknown>) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  };
  return { push };
}
