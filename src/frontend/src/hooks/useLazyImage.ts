import { useEffect, useRef, useState } from "react";

interface UseLazyImageOptions {
  rootMargin?: string;
  threshold?: number;
}

export function useLazyImage(options: UseLazyImageOptions = {}) {
  const { rootMargin = "200px 0px", threshold = 0.01 } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin, threshold },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [isVisible, rootMargin, threshold]);

  return { ref, isVisible };
}
