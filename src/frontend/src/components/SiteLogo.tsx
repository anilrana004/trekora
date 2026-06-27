import { SITE_LOGO_DELIVERY, SITE_LOGO_URL } from "@/lib/site-brand";
import { Link } from "@tanstack/react-router";
import { OptimizedImage } from "./media/OptimizedImage";

type SiteLogoProps = {
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** When set, wraps the image in a home link (navbar, drawer). */
  link?: boolean;
  onNavigate?: () => void;
  dataOcid?: string;
};

function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function SiteLogo({
  className,
  imgClassName = "site-logo__img",
  sizes = "(max-width: 1023px) 220px, 260px",
  priority = true,
  link = true,
  onNavigate,
  dataOcid = "nav.logo",
}: SiteLogoProps) {
  const image = (
    <OptimizedImage
      src={SITE_LOGO_URL}
      delivery={SITE_LOGO_DELIVERY}
      alt="Trekora — Where Every Peak Tells a Story"
      width={480}
      height={115}
      priority={priority}
      variant="brand-logo"
      sizes={sizes}
      className={imgClassName}
    />
  );

  if (!link) {
    return <span className={cn("site-logo", className)}>{image}</span>;
  }

  return (
    <Link
      to="/"
      className={cn("site-logo group", className)}
      data-ocid={dataOcid}
      onClick={onNavigate}
    >
      {image}
    </Link>
  );
}
