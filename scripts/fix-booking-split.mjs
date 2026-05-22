import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const booking = path.join(__dirname, "../src/frontend/src/pages/booking");
const steps = path.join(booking, "steps");

const dateStep = fs.readFileSync(path.join(steps, "DateSelectionStep.tsx"), "utf8");
const lines = dateStep.split(/\r?\n/);
const travelStart = lines.findIndex((l) => l.includes("Traveling with you (companions)"));
const step1Only = lines.slice(0, travelStart - 1).join("\n");
fs.writeFileSync(path.join(steps, "DateSelectionStep.tsx"), step1Only + "\n", "utf8");

const travelBody = lines.slice(travelStart + 1, lines.length - 1).join("\n");
const travelFile = `import { Plus, Trash2, UserPlus, Users } from "lucide-react";
import { toast } from "sonner";
import { CTA_OUTLINE_DASHED, ctaMerge } from "@/lib/cta-buttons";
import { normalizeIndianPhoneDigits } from "@/lib/phone-countries";
import {
  BLOOD_GROUPS,
  COMPANION_RELATIONSHIPS,
  type CoTraveler,
  type CoTravelerFieldErrors,
  type FormDataAccumulated,
  emptyCoTraveler,
  maxCompanionSlots,
  partyHeadcount,
  syncPartyGroupSize,
} from "./booking-form-shared";

${travelBody.replace(/^function TravelingWithYouSection/, "export default function TravelingWithYouSection")}
`;
fs.writeFileSync(path.join(booking, "TravelingWithYouSection.tsx"), travelFile, "utf8");

const indicator = fs.readFileSync(path.join(booking, "BookingStepIndicator.tsx"), "utf8");
const indLines = indicator.split(/\r?\n/);
const calStart = indLines.findIndex((l) => l.includes("Batch Calendar"));
const stepIndOnly = `import { Check } from "lucide-react";
import { STEP_LABELS } from "./booking-form-shared";

${indLines.slice(2, calStart - 1).join("\n")}

export default StepIndicator;
`;
fs.writeFileSync(path.join(booking, "BookingStepIndicator.tsx"), stepIndOnly, "utf8");

const calBody = indLines.slice(calStart + 1, indLines.length - 1).join("\n");
const calFile = `import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TrekBatchPublic } from "@/backend";
import {
  DAYS_OF_WEEK,
  countFutureAvailableSlotsInMonth,
  firstMonthWithFutureBatch,
  formatYmdFromBatchTs,
  formatYmdLocal,
  parseYmdLocal,
} from "./booking-form-shared";

${calBody.replace(/^function BatchCalendar/, "export default function BatchCalendar")}
`;
fs.writeFileSync(path.join(booking, "BatchCalendar.tsx"), calFile, "utf8");

const traveler = fs.readFileSync(path.join(steps, "TravelerDetailsStep.tsx"), "utf8");
const tLines = traveler.split(/\r?\n/);
const uploadStart = tLines.findIndex((l) => l.includes("Document upload"));
const step2Only = tLines.slice(0, uploadStart - 1).join("\n");
if (!step2Only.includes("TravelingWithYouSection")) {
  // ensure import
}
const step2WithImport = step2Only.replace(
  /import PackageBookingSummary[^\n]+\n/,
  "",
);
const step2Final =
  step2WithImport.replace(
    'import PackageBookingSummary from "../PackageBookingSummary";\n',
    "",
  ) +
  `\nimport TravelingWithYouSection from "../TravelingWithYouSection";\n`;
// fix: add import after shared imports block
const fixedStep2 = step2Only.includes("TravelingWithYouSection")
  ? step2Only.replace(
      /} from "\.\.\/booking-form-shared";/,
      `} from "../booking-form-shared";
import TravelingWithYouSection from "../TravelingWithYouSection";`,
    )
  : step2Only;
fs.writeFileSync(
  path.join(steps, "TravelerDetailsStep.tsx"),
  fixedStep2 + "\n\nexport default Step2;\n",
  "utf8",
);

const uploadBody = tLines.slice(uploadStart + 1, tLines.length - 1).join("\n");
const uploadFile = `import { Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  BOOKING_DOC_LIMITS,
  fileToBookingPayload,
  formatFileSize,
  type BookingFilePayload,
} from "@/lib/booking-documents";
import { CTA_OUTLINE_DASHED, ctaMerge } from "@/lib/cta-buttons";

${uploadBody.replace(/^function BookingFileUpload/, "export default function BookingFileUpload")}
`;
fs.writeFileSync(path.join(booking, "BookingFileUpload.tsx"), uploadFile, "utf8");

// Clean step imports
for (const name of fs.readdirSync(steps)) {
  if (!name.endsWith(".tsx")) continue;
  let s = fs.readFileSync(path.join(steps, name), "utf8");
  s = s.replace(/\s*type AppliedCodeDiscount,\n/g, "");
  s = s.replace(/,\s*type AppliedCodeDiscount/g, "");
  if (name === "DateSelectionStep.tsx") {
    s = s.replace(
      /} from "\.\.\/booking-form-shared";/,
      `  MAX_PARTY_SIZE,
} from "../booking-form-shared";
import { isPackageBooking } from "@/lib/booking-product";`,
    );
    if (!s.includes("normalizeIndianPhoneDigits")) {
      // keep as is
    }
  }
  if (name === "ReviewPaymentStep.tsx") {
    s = s.replace(
      /} from "\.\.\/booking-form-shared";/,
      `} from "../booking-form-shared";
import type { AppliedCodeDiscount } from "../steps/ReviewPaymentStep";`,
    );
    // AppliedCodeDiscount is defined in ReviewPaymentStep - fix import
    s = s.replace(
      `import type { AppliedCodeDiscount } from "../steps/ReviewPaymentStep";`,
      "",
    );
  }
  if (name === "HealthInfoStep.tsx" || name === "DocumentsStep.tsx") {
    if (!s.includes("BookingFileUpload")) {
      s = s.replace(
        /} from "\.\.\/booking-form-shared";/,
        `} from "../booking-form-shared";
import BookingFileUpload from "../BookingFileUpload";`,
      );
    }
  }
  fs.writeFileSync(path.join(steps, name), s, "utf8");
}

// Orchestrator path + lazy steps
const orchPath = path.join(booking, "BookingPageOrchestrator.tsx");
let orch = fs.readFileSync(orchPath, "utf8");
orch = orch.replace(/from "\.\.\//g, 'from "@/');
orch = orch.replace(
  /import \{ bookRoute \} from "@\/router";/,
  'import { bookRoute } from "@/router";',
);
orch = orch.replace(
  /\s*GEAR_RENTAL_ADDON_ID,\n\s*} from "\.\/booking-form-shared";/,
  `} from "./booking-form-shared";`,
);
orch = orch.replace(
  /import \{[\s\S]*?GEAR_RENTAL_ADDON_ID,[\s\S]*?\} from "\.\/booking-form-shared";/,
  (m) => m.replace(/\s*GEAR_RENTAL_ADDON_ID,\n/, "\n"),
);
orch = orch.replace(
  /type AppliedCodeDiscount,\n/,
  "",
);
orch = orch.replace(
  /import \{[\s\S]*?from "\.\/booking-form-shared";/,
  `import {
  type AppliedCodeDiscount,
  type CoTraveler,
  type CoTravelerFieldErrors,
  type FormDataAccumulated,
  type Step2FieldErrors,
  type Step2FieldKey,
  BOOKING_DRAFT_KEY,
  DEFAULT_FORM,
  calcPrices,
  formatINR,
  formatYmdFromBatchTs,
  formatBatchDateLongIN,
  generateRef,
  maxCompanionSlots,
  MAX_PARTY_SIZE,
  normalizeCoTravelers,
  normalizeStep2Fd,
  parseYmdLocal,
  partyHeadcount,
  scrollToFirstCoTravelerError,
  scrollToFirstStep2Error,
  syncPartyGroupSize,
  validateCoTravelers,
  validateStep2,
} from "./booking-form-shared";`,
);
// AppliedCodeDiscount from ReviewPaymentStep export
orch = orch.replace(
  `  type AppliedCodeDiscount,\n`,
  "",
);
orch = orch.replace(
  /} from "\.\/booking-form-shared";/,
  `} from "./booking-form-shared";
import type { AppliedCodeDiscount } from "./steps/ReviewPaymentStep";`,
);

const step0 = `{step === 0 && (
              <BookingStepFallback label="Loading dates & options…">
                <LazyDateSelectionStep
                  fd={fd}
                  setFd={setFd}
                  trek={product}
                  batches={batches}
                  batchesLoading={batchesLoading}
                />
              </BookingStepFallback>
            )}`;
const step1 = `{step === 1 && (
              <BookingStepFallback label="Loading traveler form…">
                <LazyTravelerDetailsStep
                  fd={fd}
                  setFd={setFd}
                  fieldErrors={step2Errors}
                  onFieldChange={clearStep2FieldError}
                  maxPartySlots={maxPartySlots}
                  companionErrors={companionErrors}
                  onCompanionFieldChange={clearCompanionFieldError}
                />
              </BookingStepFallback>
            )}`;
const step5 = `{step === 5 && (
              <BookingStepFallback label="Loading review & payment…">
                <LazyReviewPaymentStep
                  fd={fd}
                  setFd={setFd}
                  trek={product}
                  unitPrice={unitPrice}
                  packageId={packageIdForDiscount}
                  userId={fd.email.trim()}
                  codeDiscountAmount={codeDiscountAmount}
                  onCodeDiscountApplied={handleCodeDiscountApplied}
                  onCodeDiscountRemoved={handleCodeDiscountRemoved}
                  bundleSavings={bundleSavings}
                  prefilledVoucherResult={prefilledVoucherResult}
                />
              </BookingStepFallback>
            )}`;

orch = orch.replace(/\{step === 0 && \([\s\S]*?<\/Step1>\s*\)\}/, step0);
orch = orch.replace(/\{step === 1 && \([\s\S]*?<\/Step2>\s*\)\}/, step1);
orch = orch.replace(/\{step === 5 && \([\s\S]*?<\/Step6>\s*\)\}/, step5);

fs.writeFileSync(orchPath, orch, "utf8");
process.stdout.write("fix-booking-split done\n");
