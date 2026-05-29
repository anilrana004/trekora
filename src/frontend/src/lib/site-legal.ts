/** Central copyright / proprietary notice — keep in sync with index.html meta. */
export const SITE_LEGAL_NAME = "Trekora";

export function getSiteCopyrightYear(): number {
  return new Date().getFullYear();
}

export function getSiteCopyrightLine(year = getSiteCopyrightYear()): string {
  return `© ${year} ${SITE_LEGAL_NAME}. All rights reserved.`;
}

export const SITE_PROPRIETARY_NOTICE =
  "Unauthorized copying, redistribution, or reverse engineering of this site or its software is prohibited.";
