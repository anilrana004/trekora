import type { ButtonHTMLAttributes } from "react";
import { useEnquiry } from "./EnquiryContext";

export type EnquiryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  trekName?: string;
};

/** Opens the Formspree enquiry modal — use instead of dead Book Now links. */
export function EnquiryButton({
  children,
  trekName,
  className,
  type = "button",
  onClick,
  ...rest
}: EnquiryButtonProps) {
  const { openEnquiry } = useEnquiry();
  return (
    <button
      type={type}
      className={className}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) openEnquiry(trekName);
      }}
    >
      {children}
    </button>
  );
}
