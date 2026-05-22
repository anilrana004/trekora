/**
 * Builds booking/BookingPageOrchestrator.tsx from BookingPage.tsx
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pages = path.join(__dirname, "../src/frontend/src/pages");
const srcPath = path.join(pages, "BookingPage.tsx");
const outPath = path.join(pages, "booking/BookingPageOrchestrator.tsx");

const lines = fs.readFileSync(srcPath, "utf8").split(/\r?\n/);

const head = lines.slice(0, 101).join("\n");

const orchestratorImports = `
import BookingStepIndicator from "./BookingStepIndicator";
import BookingSuccessScreen from "./BookingSuccessScreen";
import {
  BookingStepFallback,
  LazyDateSelectionStep,
  LazyDocumentsStep,
  LazyHealthInfoStep,
  LazyPreferencesStep,
  LazyReviewPaymentStep,
  LazyTravelerDetailsStep,
} from "./lazy-booking-steps";
import {
  type AppliedCodeDiscount,
  type CoTraveler,
  type CoTravelerFieldErrors,
  type FormDataAccumulated,
  type Step2FieldErrors,
  type Step2FieldKey,
  BOOKING_DRAFT_KEY,
  DEFAULT_FORM,
  GEAR_RENTAL_ADDON_ID,
  calcPrices,
  formatINR,
  generateRef,
  maxCompanionSlots,
  normalizeCoTravelers,
  normalizeStep2Fd,
  partyHeadcount,
  scrollToFirstCoTravelerError,
  scrollToFirstStep2Error,
  syncPartyGroupSize,
  validateCoTravelers,
  validateStep2,
} from "./booking-form-shared";
`;

const tail = lines.slice(3514).join("\n");

const body = head + orchestratorImports + "\n" + tail;

let out = body
  .replace(/<StepIndicator /g, "<BookingStepIndicator ")
  .replace(/<SuccessScreen/g, "<BookingSuccessScreen")
  .replace(
    /\{step === 0 && \(\s*\n\s*<Step1[\s\S]*?<\/Step1>\s*\n\s*\)\}/,
    `{step === 0 && (
              <BookingStepFallback label="Loading dates & options…">
                <LazyDateSelectionStep
                  fd={fd}
                  setFd={setFd}
                  trek={product}
                  batches={batches}
                  batchesLoading={batchesLoading}
                />
              </BookingStepFallback>
            )}`,
  )
  .replace(
    /\{step === 1 && \(\s*\n\s*<Step2[\s\S]*?<\/Step2>\s*\n\s*\)\}/,
    `{step === 1 && (
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
            )}`,
  )
  .replace(
    /\{step === 2 && <Step3 fd={fd} setFd={setFd} \/>}/,
    `{step === 2 && (
              <BookingStepFallback label="Loading health details…">
                <LazyHealthInfoStep fd={fd} setFd={setFd} />
              </BookingStepFallback>
            )}`,
  )
  .replace(
    /\{step === 3 && <Step4 fd={fd} setFd={setFd} \/>}/,
    `{step === 3 && (
              <BookingStepFallback label="Loading document upload…">
                <LazyDocumentsStep fd={fd} setFd={setFd} />
              </BookingStepFallback>
            )}`,
  )
  .replace(
    /\{step === 4 && <Step5 fd={fd} setFd={setFd} \/>}/,
    `{step === 4 && (
              <BookingStepFallback label="Loading preferences…">
                <LazyPreferencesStep fd={fd} setFd={setFd} />
              </BookingStepFallback>
            )}`,
  )
  .replace(
    /\{step === 5 && \(\s*\n\s*<Step6[\s\S]*?<\/Step6>\s*\n\s*\)\}/,
    `{step === 5 && (
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
            )}`,
  );

// Remove duplicate imports from head that moved to shared
out = out
  .replace(/^const WeatherWidget = lazy\(\(\) => import\("\.\.\/components\/WeatherWidget"\)\);\n/m, "")
  .replace(/\nexport default function BookingPage\(\)/, "\nexport default function BookingPageOrchestrator()");

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out, "utf8");
process.stdout.write(`wrote ${outPath}\n`);
