import OptimizedImage, { type OptimizedImageProps } from "./OptimizedImage";

interface GalleryImageProps extends Omit<OptimizedImageProps, "variant"> {
  full?: boolean;
}

export default function GalleryImage({ full, ...rest }: GalleryImageProps) {
  return (
    <OptimizedImage
      {...rest}
      variant={full ? "gallery-full" : "gallery-thumb"}
    />
  );
}
