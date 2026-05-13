function useGTM() {
  const push = (event) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  };
  return { push };
}
export {
  useGTM as u
};
