import OptimizedImage, { type OptimizedImageProps } from "./OptimizedImage";

interface CardImageProps extends Omit<OptimizedImageProps, "variant"> {
  cardType?: "trek" | "yatra" | "destination" | "blog";
}

const CARD_TO_VARIANT = {
  trek: "trek-card",
  yatra: "yatra-card",
  destination: "destination",
  blog: "blog-card",
} as const;

export default function CardImage({
  cardType = "trek",
  ...rest
}: CardImageProps) {
  return <OptimizedImage {...rest} variant={CARD_TO_VARIANT[cardType]} />;
}
