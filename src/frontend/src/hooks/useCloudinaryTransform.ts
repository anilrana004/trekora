import {
  type ImageDeliveryOptions,
  buildOptimizedImageUrl,
  buildResponsiveSrcSet,
} from "@/lib/images/cloudinary-url";
import { useMemo } from "react";

interface UseCloudinaryTransformArgs {
  src: string;
  widths?: readonly number[];
  options?: ImageDeliveryOptions;
}

export function useCloudinaryTransform({
  src,
  widths,
  options,
}: UseCloudinaryTransformArgs) {
  const optimizedSrc = useMemo(
    () => buildOptimizedImageUrl(src, options),
    [src, options],
  );

  const srcSet = useMemo(() => {
    if (!widths?.length) return undefined;
    return buildResponsiveSrcSet(src, widths);
  }, [src, widths]);

  return { optimizedSrc, srcSet };
}
