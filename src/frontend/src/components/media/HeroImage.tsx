import OptimizedImage, { type OptimizedImageProps } from "./OptimizedImage";

type HeroImageProps = Omit<OptimizedImageProps, "variant">;

export default function HeroImage(props: HeroImageProps) {
  return <OptimizedImage {...props} variant="hero" />;
}
