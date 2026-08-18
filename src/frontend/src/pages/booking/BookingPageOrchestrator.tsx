import { createActor } from "@/backend";
import BookingHelpActions from "@/components/BookingHelpActions";
import { SEOHead } from "@/components/SEOHead";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "@/components/TravelSideActionRail";
import OptimizedImage from "@/components/media/OptimizedImage";
import { useTrekBatches } from "@/hooks/useTrekBatches";
import type { BookSearchParams } from "@/lib/book-route-search";
import {
  BOOKING_ADD_ONS,
  GEAR_RENTAL_ADDON_ID,
  parseBookingAddonIds,
} from "@/lib/booking-addons";
import { collectBookingAttachments } from "@/lib/booking-documents";
import {
  bookingDetailsPlainText,
  buildBookingEmailSections,
} from "@/lib/booking-email-details";
import {
  type BookingBackgroundJob,
  type BookingDeliveryStatus,
  submitBookingOptimistic,
} from "@/lib/booking-optimistic";
import {
  BOOKABLE_PACKAGES,
  BOOKABLE_TREKS,
  BOOKABLE_YATRAS,
  type BookableProduct,
  bookableSelectionKey,
  findBookableProductForPrefill,
  isPackageBooking,
  resolveBookableProductFromSelectionKey,
  selectionKeyFromBookSearch,
} from "@/lib/booking-product";
import {
  CTA_NAV_PRIMARY,
  CTA_NAV_PRIMARY_GROW,
  CTA_NAV_PRIMARY_SOLO,
  CTA_NAV_SECONDARY_FLEX,
  ctaMerge,
} from "@/lib/cta-buttons";
import {
  type DiscountValidationSuccess,
  markVoucherUsed,
  redeemGiftCard,
  validateDiscountCode,
} from "@/lib/discount-api";
import { scrollToPageTop } from "@/lib/route-scroll";
import { SITE_ORIGIN } from "@/lib/site-config";
import { useSearch } from "@tanstack/react-router";
import { useActor } from "@trekora/icp";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { toast } from "sonner";
import BookingStepIndicator from "./BookingStepIndicator";
import BookingSuccessScreen from "./BookingSuccessScreen";
import {
  type AppliedCodeDiscount,
  BOOKING_DRAFT_KEY,
  type CoTraveler,
  type CoTravelerFieldErrors,
  DEFAULT_FORM,
  type FormDataAccumulated,
  MAX_PARTY_SIZE,
  type Step2FieldErrors,
  type Step2FieldKey,
  calcPrices,
  formatBatchDateLongIN,
  formatINR,
  formatYmdFromBatchTs,
  generateRef,
  maxCompanionSlots,
  normalizeCoTravelers,
  normalizeStep2Fd,
  parseYmdLocal,
  partyHeadcount,
  scrollToFirstCoTravelerError,
  scrollToFirstStep2Error,
  syncPartyGroupSize,
  validateCoTravelers,
  validateStep2,
} from "./booking-form-shared";
import {
  BookingStepFallback,
  LazyDateSelectionStep,
  LazyDocumentsStep,
  LazyHealthInfoStep,
  LazyPreferencesStep,
  LazyReviewPaymentStep,
  LazyTravelerDetailsStep,
} from "./lazy-booking-steps";

// ── Main BookingPage ───────────────────────────────────────────────────────

function mergeBookableOption(
  list: BookableProduct[],
  extra: BookableProduct | undefined,
): BookableProduct[] {
  if (!extra) return list;
  const key = bookableSelectionKey(extra.kind, extra.slug);
  if (list.some((item) => bookableSelectionKey(item.kind, item.slug) === key)) {
    return list;
  }
  return [extra, ...list];
}

export default function BookingPageOrchestrator() {
  const {
    trek: trekFromSearch,
    yatra: yatraFromSearch,
    package: packageFromSearch,
    voucher: voucherFromSearch,
    addons: addonsFromSearch,
    group: groupFromSearch,
  } = useSearch({ strict: false }) as BookSearchParams;

  const urlSelectionKey = useMemo(
    () =>
      selectionKeyFromBookSearch(
        trekFromSearch,
        yatraFromSearch,
        packageFromSearch,
      ),
    [trekFromSearch, yatraFromSearch, packageFromSearch],
  );

  const hasBookDeepLink = Boolean(
    trekFromSearch || yatraFromSearch || packageFromSearch,
  );

  const [step, setStep] = useState(0);
  const [selectionKey, setSelectionKey] = useState(urlSelectionKey);
  const [fd, setFd] = useState<FormDataAccumulated>(DEFAULT_FORM);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [successEmail, setSuccessEmail] = useState("");
  const [emailDelivery, setEmailDelivery] =
    useState<BookingDeliveryStatus>("delivered");
  const [step2Errors, setStep2Errors] = useState<Step2FieldErrors>({});
  const [companionErrors, setCompanionErrors] = useState<
    Record<number, CoTravelerFieldErrors>
  >({});
  // ← ADDED: voucher / gift card discount
  const [codeDiscountAmount, setCodeDiscountAmount] = useState(0);
  const [appliedCodeDiscount, setAppliedCodeDiscount] =
    useState<AppliedCodeDiscount | null>(null);
  const [prefilledVoucherResult, setPrefilledVoucherResult] =
    useState<DiscountValidationSuccess | null>(null);
  const draftRestored = useRef(false);
  const [bookingSending, setBookingSending] = useState(false);
  const preparedSubmitRef = useRef<BookingBackgroundJob | null>(null);
  const voucherAutoApplyInFlight = useRef(false);
  const addonsPrefilledFromUrl = useRef(false);
  const groupPrefilledFromUrl = useRef(false);

  useLayoutEffect(() => {
    scrollToPageTop();
  }, []);

  const { actor } = useActor(createActor);

  const product = useMemo(
    () => resolveBookableProductFromSelectionKey(selectionKey),
    [selectionKey],
  );

  const trekSelectOptions = useMemo(
    () =>
      mergeBookableOption(
        BOOKABLE_TREKS,
        product?.kind === "trek" ? product : undefined,
      ),
    [product],
  );

  const yatraSelectOptions = useMemo(
    () =>
      mergeBookableOption(
        BOOKABLE_YATRAS,
        product?.kind === "yatra" ? product : undefined,
      ),
    [product],
  );

  const packageSelectOptions = useMemo(
    () =>
      mergeBookableOption(
        BOOKABLE_PACKAGES,
        product?.kind === "package" ? product : undefined,
      ),
    [product],
  );

  useLayoutEffect(() => {
    if (!urlSelectionKey) return;
    setSelectionKey(urlSelectionKey);
    setFd((p) => ({ ...p, batchDate: null }));
  }, [urlSelectionKey]);

  useEffect(() => {
    if (!addonsFromSearch || addonsPrefilledFromUrl.current) return;
    const ids = parseBookingAddonIds(addonsFromSearch);
    if (ids.length === 0) return;
    addonsPrefilledFromUrl.current = true;
    setFd((p) => ({
      ...p,
      addOns: [...new Set([...p.addOns, ...ids])],
    }));
    if (ids.includes(GEAR_RENTAL_ADDON_ID)) {
      toast.success("Gear rental pack added — confirm items on step 1");
    }
  }, [addonsFromSearch]);

  useEffect(() => {
    if (groupFromSearch == null || groupPrefilledFromUrl.current) return;
    groupPrefilledFromUrl.current = true;
    setFd((p) => syncPartyGroupSize({ ...p, groupSize: groupFromSearch }));
  }, [groupFromSearch]);

  useEffect(() => {
    if (hasBookDeepLink) return;

    if (draftRestored.current) return;
    draftRestored.current = true;
    try {
      const raw = sessionStorage.getItem(BOOKING_DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw) as {
        selectionKey?: string;
        trekSlug?: string;
        fd?: Partial<FormDataAccumulated>;
        step?: number;
        codeDiscountAmount?: number;
        appliedCode?: { kind: string; code: string; amount: number } | null;
      };
      if (draft.fd) setFd((p) => ({ ...p, ...draft.fd }));
      if (
        typeof draft.codeDiscountAmount === "number" &&
        draft.codeDiscountAmount > 0
      ) {
        setCodeDiscountAmount(draft.codeDiscountAmount);
      }
      if (draft.appliedCode?.code) {
        setAppliedCodeDiscount({
          kind: draft.appliedCode.kind === "giftcard" ? "giftcard" : "voucher",
          code: draft.appliedCode.code,
          amount: draft.appliedCode.amount,
        });
      }
      if (
        typeof draft.step === "number" &&
        draft.step >= 0 &&
        draft.step <= 5
      ) {
        setStep(draft.step);
      }
      if (
        draft.selectionKey &&
        resolveBookableProductFromSelectionKey(draft.selectionKey)
      ) {
        setSelectionKey(draft.selectionKey);
      } else if (draft.trekSlug) {
        const legacy = findBookableProductForPrefill(draft.trekSlug, undefined);
        if (legacy) {
          setSelectionKey(bookableSelectionKey(legacy.kind, legacy.slug));
        }
      }
    } catch {
      /* ignore corrupt draft */
    }
  }, [hasBookDeepLink]);

  const { data: batches = [], isLoading: batchesLoading } = useTrekBatches(
    product?.kind === "trek" ? product.id : undefined,
  );

  const selectedBatch = useMemo(() => {
    if (!fd.batchDate || batchesLoading) return null;
    const actives = batches.filter((b) => b.isActive);
    const matches = actives.filter(
      (b) => formatYmdFromBatchTs(b.batchDate) === fd.batchDate,
    );
    if (matches.length === 0) return null;
    return matches.reduce((a, b) =>
      Number(b.availableSlots) > Number(a.availableSlots) ? b : a,
    );
  }, [batches, batchesLoading, fd.batchDate]);

  useEffect(() => {
    if (successRef) return;
    try {
      const { idProofFile, photoFile, fitnessCertFile, ...fdDraft } = fd;
      void idProofFile;
      void photoFile;
      void fitnessCertFile;
      sessionStorage.setItem(
        BOOKING_DRAFT_KEY,
        JSON.stringify({
          selectionKey,
          fd: {
            ...fdDraft,
            idProofFile: null,
            photoFile: null,
            fitnessCertFile: null,
          },
          step,
          codeDiscountAmount,
          appliedCode: appliedCodeDiscount,
        }),
      );
    } catch {
      /* quota / private mode */
    }
  }, [
    selectionKey,
    fd,
    step,
    successRef,
    codeDiscountAmount,
    appliedCodeDiscount,
  ]);

  const clearStep2FieldError = useCallback((field: Step2FieldKey) => {
    setStep2Errors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const clearCompanionFieldError = useCallback((index: number) => {
    setCompanionErrors((prev) => {
      if (!prev[index]) return prev;
      const next = { ...prev };
      delete next[index];
      return next;
    });
  }, []);

  const maxPartySlots = useMemo(() => {
    if (!selectedBatch) return MAX_PARTY_SIZE;
    return Math.min(
      MAX_PARTY_SIZE,
      Math.max(1, Number(selectedBatch.availableSlots)),
    );
  }, [selectedBatch]);

  useEffect(() => {
    if (!selectedBatch) return;
    const max = Math.min(
      MAX_PARTY_SIZE,
      Math.max(1, Number(selectedBatch.availableSlots)),
    );
    setFd((p) => {
      if (partyHeadcount(p) <= max && p.groupSize <= max) return p;
      const trimmed = p.coTravelers.slice(0, Math.max(0, max - 1));
      return syncPartyGroupSize(
        {
          ...p,
          coTravelers: trimmed,
          groupSize: Math.min(
            max,
            partyHeadcount({ ...p, coTravelers: trimmed }),
          ),
        },
        max,
      );
    });
  }, [selectedBatch]);

  const unitPrice = useMemo(() => product?.price ?? 0, [product]);
  const packageIdForDiscount = product ? `${product.kind}:${product.slug}` : "";
  const bundleSavings = useMemo(() => {
    if (!product || product.kind !== "package") return 0;
    const was = product.priceWas ?? 0;
    const from = product.price ?? 0;
    const perPerson = Math.max(0, was - from);
    return perPerson * partyHeadcount(fd);
  }, [product, fd]);
  const _prices = calcPrices(
    unitPrice,
    partyHeadcount(fd),
    fd.addOns,
    fd.promoDiscount,
    codeDiscountAmount,
  );
  const handleCodeDiscountApplied = useCallback(
    (meta: AppliedCodeDiscount, result?: DiscountValidationSuccess) => {
      setAppliedCodeDiscount(meta);
      setCodeDiscountAmount(meta.amount);
      if (result?.success) {
        setPrefilledVoucherResult(result);
      }
      setFd((p) => ({
        ...p,
        promoApplied: false,
        promoDiscount: 0,
        promoCode: meta.code,
      }));
    },
    [],
  );
  const handleCodeDiscountRemoved = useCallback(() => {
    setAppliedCodeDiscount(null);
    setCodeDiscountAmount(0);
    setPrefilledVoucherResult(null);
    setFd((p) => ({
      ...p,
      promoApplied: false,
      promoDiscount: 0,
      promoCode: "",
    }));
  }, []);

  const bookingSubtotalForVoucher = useMemo(
    () => unitPrice * partyHeadcount(fd),
    [unitPrice, fd],
  );

  useEffect(() => {
    if (
      !voucherFromSearch ||
      appliedCodeDiscount ||
      voucherAutoApplyInFlight.current
    ) {
      return;
    }
    if (!product || !packageIdForDiscount || bookingSubtotalForVoucher <= 0) {
      return;
    }

    voucherAutoApplyInFlight.current = true;
    void (async () => {
      try {
        const res = await validateDiscountCode({
          code: voucherFromSearch,
          bookingAmount: bookingSubtotalForVoucher,
          packageId: packageIdForDiscount,
          userId: fd.email.trim(),
        });
        if (!res.success) {
          toast.error(res.message || "Could not apply your promo code");
          voucherAutoApplyInFlight.current = false;
          return;
        }
        handleCodeDiscountApplied(
          {
            kind: res.kind,
            code: res.code,
            amount: res.discountAmount,
          },
          res,
        );
        toast.success(
          `${res.code} applied — you save ₹${res.discountAmount.toLocaleString("en-IN")}`,
        );
      } catch {
        toast.error("Unable to apply promo code right now. Please try again.");
        voucherAutoApplyInFlight.current = false;
      }
    })();
  }, [
    voucherFromSearch,
    appliedCodeDiscount,
    product,
    packageIdForDiscount,
    bookingSubtotalForVoucher,
    fd.email,
    handleCodeDiscountApplied,
  ]);

  useEffect(() => {
    scrollToPageTop();
  }, [step]);

  const buildSubmitJob = useCallback((): BookingBackgroundJob | null => {
    if (!product || !fd.batchDate || !fd.idProofFile || !fd.photoFile) {
      return null;
    }
    const dBatch = parseYmdLocal(fd.batchDate);
    if (!dBatch) return null;

    const normalized = syncPartyGroupSize(
      {
        ...normalizeStep2Fd(fd),
        coTravelers: normalizeCoTravelers(fd.coTravelers),
        hasCoTravelers: fd.coTravelers.length > 0,
      },
      maxPartySlots,
    );

    const { attachments, error: attachErr } = collectBookingAttachments({
      idProof: fd.idProofFile,
      photo: fd.photoFile,
      fitnessCert: fd.fitnessCertFile,
    });
    if (attachErr) return null;

    const addOnLabels = BOOKING_ADD_ONS.filter((a) =>
      fd.addOns.includes(a.id),
    ).map((a) => a.label);
    const unitPrice =
      selectedBatch?.priceOverride != null
        ? Number(selectedBatch.priceOverride)
        : (product.price ?? 0);
    const submitPrices = calcPrices(
      unitPrice,
      normalized.groupSize,
      fd.addOns,
      fd.promoDiscount,
      codeDiscountAmount,
    );
    const packageMeta = isPackageBooking(product)
      ? {
          packageTagline: product.tagline,
          packageDescription: product.description,
          packageCategory: product.categoryLabel,
          packageBadge: product.badge,
          packageBestSeason: product.bestSeason,
          packageBundleWas:
            product.priceWas != null
              ? `₹${product.priceWas.toLocaleString("en-IN")} (bundle list)`
              : undefined,
          packageHighlights: product.highlights,
          packageInclusions: product.inclusions,
          packageComponents: product.packageItems?.map(
            (i) => `${i.kind === "yatra" ? "Yatra" : "Trek"}: ${i.label}`,
          ),
        }
      : {};

    const sections = buildBookingEmailSections(
      {
        ...normalized,
        idProofFile: fd.idProofFile,
        photoFile: fd.photoFile,
        fitnessCertFile: fd.fitnessCertFile,
      },
      {
        itemType: product.kind,
        itemName: product.name,
        trekSlug: product.slug,
        batchDateLabel: formatBatchDateLongIN(fd.batchDate),
        batchStatus:
          product.kind === "package"
            ? "Curated package — team will confirm full itinerary & availability"
            : selectedBatch
              ? `Confirmed batch — ${Number(selectedBatch.availableSlots)} seat(s) available`
              : "On request — team will confirm availability",
        addOnLabels,
        ...packageMeta,
        pricing: {
          unitPrice,
          groupSize: normalized.groupSize,
          base: submitPrices.base,
          groupDiscount: submitPrices.groupDiscount,
          addOnsTotal: submitPrices.addOnsTotal,
          gst: submitPrices.gst,
          promoSavings: submitPrices.promoSavings,
          codeSavings: submitPrices.codeSavings,
          grandTotal: submitPrices.grandTotal,
        },
      },
    );

    const batchDateMs =
      selectedBatch != null
        ? selectedBatch.batchDate
        : BigInt(dBatch.getTime());

    return {
      emailPayload: {
        bookingRef: "",
        source: "Booking Page — Full flow",
        trekName: product.name,
        trekSlug: product.slug,
        batchDate: fd.batchDate,
        groupSize: normalized.groupSize,
        totalAmount: submitPrices.grandTotal,
        travelerName: normalized.fullName,
        email: normalized.email,
        phone: normalized.mobile,
        addOns: addOnLabels,
        sections,
        details: bookingDetailsPlainText(sections),
        attachments,
      },
      canisterPayload:
        actor && product.kind !== "package" && product.id > 0
          ? {
              itemId: BigInt(product.id),
              itemName: product.name,
              itemType: product.kind,
              travelerName: normalized.fullName,
              email: normalized.email,
              phone: normalized.mobile,
              groupSize: BigInt(normalized.groupSize),
              totalAmount: BigInt(Math.round(submitPrices.grandTotal)),
              advanceAmount: BigInt(0),
              batchDate: batchDateMs,
            }
          : null,
    };
  }, [fd, product, actor, selectedBatch, maxPartySlots, codeDiscountAmount]);

  useEffect(() => {
    if (step !== 5) {
      preparedSubmitRef.current = null;
      return;
    }
    const run = () => {
      preparedSubmitRef.current = buildSubmitJob();
    };
    if (typeof queueMicrotask === "function") {
      queueMicrotask(run);
    } else {
      run();
    }
  }, [step, buildSubmitJob]);

  const canGoNext = useCallback(() => {
    switch (step) {
      case 0:
        if (!selectionKey || !product) {
          toast.error("Please select a trek, yatra, or package first.");
          return false;
        }
        if (!fd.batchDate) {
          toast.error("Please choose your departure date.");
          return false;
        }
        if (
          selectedBatch &&
          partyHeadcount(fd) > Number(selectedBatch.availableSlots)
        ) {
          toast.error(
            `Only ${Number(selectedBatch.availableSlots)} seat(s) left for this batch. Remove companion(s) if you added any.`,
          );
          return false;
        }
        return true;
      case 1: {
        const normalized = normalizeStep2Fd(fd);
        const result = validateStep2(normalized);
        if (!result.valid) {
          setStep2Errors(result.errors);
          if (result.firstMessage) toast.error(result.firstMessage);
          scrollToFirstStep2Error(result.errors);
          return false;
        }
        setStep2Errors({});
        if (
          normalized.fullName !== fd.fullName ||
          normalized.email !== fd.email ||
          normalized.mobile !== fd.mobile ||
          normalized.whatsapp !== fd.whatsapp ||
          normalized.emergencyName !== fd.emergencyName ||
          normalized.emergencyPhone !== fd.emergencyPhone
        ) {
          setFd(normalized);
        }
        const synced = syncPartyGroupSize(normalized, maxPartySlots);
        if (
          synced.groupSize !== fd.groupSize ||
          synced.coTravelers.length !== fd.coTravelers.length
        ) {
          setFd(synced);
        }
        const companionCheck = validateCoTravelers(synced);
        if (!companionCheck.valid) {
          setCompanionErrors(companionCheck.errors);
          if (companionCheck.firstMessage) {
            toast.error(companionCheck.firstMessage);
          }
          scrollToFirstCoTravelerError(companionCheck.errors);
          return false;
        }
        setCompanionErrors({});
        if (synced.groupSize > maxPartySlots) {
          toast.error(
            `Only ${maxPartySlots} seat(s) available. Remove ${synced.groupSize - maxPartySlots} companion(s).`,
          );
          return false;
        }
        return true;
      }
      case 2:
        return true; // Health info is advisory
      case 3:
        if (!fd.idProofFile) {
          toast.error("Please upload your government ID proof.");
          return false;
        }
        if (!fd.photoFile) {
          toast.error("Please upload your passport-size photo.");
          return false;
        }
        return true;
      case 4:
        return true; // Special requests all optional
      default:
        return true;
    }
  }, [step, fd, selectionKey, product, selectedBatch, maxPartySlots]);

  const handleNext = () => {
    if (bookingSending) return;
    if (!canGoNext()) return;
    flushSync(() => setStep((s) => Math.min(s + 1, 5)));
  };

  const handleBack = () => {
    setStep2Errors({});
    setCompanionErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (bookingSending || successRef) return;
      if (!fd.termsAccepted) {
        toast.error("Please accept the terms and conditions.");
        return;
      }
      if (!product || !fd.batchDate) {
        toast.error(
          "Booking data is incomplete. Please go back and try again.",
        );
        return;
      }

      const dBatch = parseYmdLocal(fd.batchDate);
      if (!dBatch) {
        toast.error("Invalid batch date. Please pick a date again.");
        return;
      }
      if (!fd.idProofFile || !fd.photoFile) {
        toast.error("Please upload required documents before submitting.");
        return;
      }

      const normalized = syncPartyGroupSize(
        {
          ...normalizeStep2Fd(fd),
          coTravelers: normalizeCoTravelers(fd.coTravelers),
          hasCoTravelers: fd.coTravelers.length > 0,
        },
        maxPartySlots,
      );

      const leadCheck = validateStep2(normalized);
      if (!leadCheck.valid) {
        setStep2Errors(leadCheck.errors);
        if (leadCheck.firstMessage) toast.error(leadCheck.firstMessage);
        setStep(1);
        scrollToFirstStep2Error(leadCheck.errors);
        return;
      }

      const companionCheck = validateCoTravelers(normalized);
      if (!companionCheck.valid) {
        setCompanionErrors(companionCheck.errors);
        if (companionCheck.firstMessage)
          toast.error(companionCheck.firstMessage);
        setStep(1);
        scrollToFirstCoTravelerError(companionCheck.errors);
        return;
      }

      const ref = generateRef();
      setBookingSending(true);

      flushSync(() => {
        setFd((p) => ({
          ...p,
          fullName: normalized.fullName,
          email: normalized.email,
          mobile: normalized.mobile,
          whatsapp: normalized.whatsapp,
          emergencyName: normalized.emergencyName,
          emergencyPhone: normalized.emergencyPhone,
        }));
        setSuccessEmail(normalized.email);
        setEmailDelivery("sending");
        setSuccessRef(ref);
      });
      try {
        sessionStorage.removeItem(BOOKING_DRAFT_KEY);
      } catch {
        /* ignore */
      }

      const runBackgroundSubmit = () => {
        const base = buildSubmitJob();
        if (!base) {
          flushSync(() => {
            setSuccessRef(null);
            setEmailDelivery("delivered");
          });
          setBookingSending(false);
          toast.error(
            "Could not prepare your booking. Please review the form and submit again.",
          );
          return;
        }

        const emailPayload = {
          ...base.emailPayload,
          bookingRef: ref,
          email: normalized.email,
          travelerName: normalized.fullName,
          phone: normalized.mobile,
        };

        submitBookingOptimistic(
          {
            emailPayload,
            canisterPayload: base.canisterPayload,
            createBooking: actor
              ? (payload) => actor.createBooking(payload)
              : undefined,
          },
          () => {},
          {
            onSendSucceeded: () => {
              setEmailDelivery("delivered");
              setBookingSending(false);
              if (appliedCodeDiscount && normalized.email.trim()) {
                void (async () => {
                  try {
                    if (appliedCodeDiscount.kind === "voucher") {
                      await markVoucherUsed({
                        code: appliedCodeDiscount.code,
                        userId: normalized.email.trim(),
                        bookingId: ref,
                      });
                    } else {
                      await redeemGiftCard({
                        code: appliedCodeDiscount.code,
                        bookingId: ref,
                        amountUsed: appliedCodeDiscount.amount,
                      });
                    }
                  } catch {
                    /* redemption is best-effort after booking is recorded */
                  }
                })();
              }
            },
            onSendFailed: (message) => {
              setEmailDelivery("failed");
              setBookingSending(false);
              toast.error(
                `${message} Reference ${ref} — WhatsApp us if you need help.`,
              );
            },
          },
        );
      };

      runBackgroundSubmit();
    },
    [
      fd,
      product,
      actor,
      selectedBatch,
      maxPartySlots,
      appliedCodeDiscount,
      successRef,
      bookingSending,
      buildSubmitJob,
    ],
  );

  const STEP_TITLES = [
    {
      title: "Let's plan your Himalayan adventure! 🏔️",
      sub:
        product?.kind === "package"
          ? "Review your package, pick a start date, and add-ons"
          : "Select your trek or yatra, batch date, and add-ons",
    },
    {
      title: "Tell us about you & your group",
      sub: "Lead traveler details plus anyone traveling with you",
    },
    {
      title: "A few health questions for your safety 🏥",
      sub: "This helps our certified mountain guides ensure your safety",
    },
    {
      title: "Upload your documents",
      sub: "Government ID and passport-size photo for the lead traveler",
    },
    {
      title: "Almost done! Any special requirements? 🌟",
      sub: "Optional preferences — skip if none",
    },
    {
      title: "Review your booking summary",
      sub: "Confirm all details before submitting",
    },
  ];

  // Success screen
  if (successRef) {
    return (
      <div
        className="booking-page pt-24 min-h-screen pb-12 px-4"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        <SEOHead
          title="Booking Confirmed | Trekora"
          description="Your Trekora booking confirmation."
          canonical={`${SITE_ORIGIN}/book`}
          noindex
        />
        <BookingSuccessScreen
          bookingRef={successRef}
          trekName={product?.name ?? "your trip"}
          email={successEmail || fd.email}
          emailDelivery={emailDelivery}
        />
      </div>
    );
  }

  return (
    <div
      className="booking-page min-h-screen sm:pb-32"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      <SEOHead
        title="Book Your Trek | Trekora"
        description="Complete your Trekora trek or yatra booking securely online."
        canonical={`${SITE_ORIGIN}/book`}
        noindex
      />
      <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />
      <TravelSideActionRail
        variant="listing-booking"
        productName={product?.name}
      />

      {/* Sticky header */}
      <div
        className="sticky top-0 z-40 bg-white shadow-sm border-b"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          {product ? (
            <>
              <OptimizedImage
                src={product.image}
                alt={product.name}
                variant="thumbnail"
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: "var(--ew-text)" }}
                >
                  {product.name}
                </p>
                <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                  {product.kind === "package" ? "Curated package · " : ""}
                  {product.duration} days
                </p>
              </div>
              <span
                className="text-sm font-bold flex-shrink-0"
                style={{ color: "#C0001C" }}
              >
                Rs.{formatINR(product.price)}
                {product.kind === "package" ? "" : "/person"}
              </span>
            </>
          ) : (
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--ew-text)" }}
            >
              Trekora Booking
            </p>
          )}
        </div>
        {/* Progress bar */}
        <div
          className="h-1 w-full"
          style={{ background: "var(--ew-gray-mid)" }}
        >
          <div
            className="h-1 transition-all duration-500"
            style={{
              width: `${((step + 1) / 6) * 100}%`,
              background: "#C0001C",
            }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Step indicator */}
        <div className="mb-6 overflow-x-auto">
          <BookingStepIndicator current={step} />
        </div>

        {/* Form card */}
        <form
          onSubmit={
            step === 5
              ? handleSubmit
              : (e) => {
                  e.preventDefault();
                  handleNext();
                }
          }
          noValidate
        >
          <div
            className="booking-form-card bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            data-ocid="booking.form_card"
          >
            {/* Step title */}
            <div className="mb-6">
              <h2
                className="text-xl sm:text-2xl font-bold"
                style={{ color: "var(--ew-text)" }}
              >
                {STEP_TITLES[step].title}
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                {STEP_TITLES[step].sub}
              </p>
            </div>

            <BookingHelpActions productName={product?.name} />

            {addonsFromSearch?.includes(GEAR_RENTAL_ADDON_ID) &&
            fd.addOns.includes(GEAR_RENTAL_ADDON_ID) ? (
              <div
                className="mb-5 rounded-xl px-4 py-3 text-sm"
                style={{
                  background: "var(--ew-orange-lt)",
                  border: "1px solid var(--ew-orange)",
                  color: "var(--ew-text)",
                }}
                data-ocid="booking.rental.addon_banner"
              >
                <span className="font-semibold">Gear rental</span> is included
                in your quote. Pick your departure date above; sizes are
                confirmed after booking.
              </div>
            ) : null}

            {voucherFromSearch &&
            appliedCodeDiscount &&
            codeDiscountAmount > 0 ? (
              <div
                className="mb-5 rounded-xl px-4 py-3 text-sm"
                style={{
                  background: "#ECFDF5",
                  border: "1px solid #86EFAC",
                  color: "#166534",
                }}
                data-ocid="booking.promo.applied_banner"
              >
                <span className="font-semibold">
                  {appliedCodeDiscount.code}
                </span>{" "}
                is active — you save ₹
                {codeDiscountAmount.toLocaleString("en-IN")} on this booking.
                {step < 5 ? (
                  <span className="block text-xs mt-0.5 opacity-90">
                    Your discounted total appears on the final review step.
                  </span>
                ) : null}
              </div>
            ) : null}

            {/* Trek select (step 0 only) */}
            {step === 0 && (
              <div className="mb-5">
                <label
                  htmlFor="trek-select"
                  className="block text-[13px] font-medium mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  {product?.kind === "package"
                    ? "Your curated package *"
                    : "Choose your trek, yatra, or package *"}
                </label>
                <select
                  id="trek-select"
                  value={selectionKey}
                  onChange={(e) => {
                    setSelectionKey(e.target.value);
                    setFd((p) => ({ ...p, batchDate: null }));
                  }}
                  className="w-full border rounded-lg px-3 py-3 text-[16px] focus:outline-none focus:ring-2 focus:border-[#C0001C] border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30"
                  style={{ minHeight: 48 }}
                  data-ocid="booking.trek.select"
                >
                  <option value="">Select a trek, yatra, or package…</option>
                  <optgroup label="Curated packages">
                    {packageSelectOptions.map((p) => (
                      <option
                        key={bookableSelectionKey("package", p.slug)}
                        value={bookableSelectionKey("package", p.slug)}
                      >
                        {p.name} — Rs.{formatINR(p.price)}/person
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Treks">
                    {trekSelectOptions.map((t) => (
                      <option
                        key={bookableSelectionKey("trek", t.slug)}
                        value={bookableSelectionKey("trek", t.slug)}
                      >
                        {t.name} — Rs.{formatINR(t.price)}/person
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Yatras">
                    {yatraSelectOptions.map((y) => (
                      <option
                        key={bookableSelectionKey("yatra", y.slug)}
                        value={bookableSelectionKey("yatra", y.slug)}
                      >
                        {y.name} — Rs.{formatINR(y.price)}/person
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            )}

            {/* Step content */}
            {step === 0 && (
              <BookingStepFallback label="Loading dates & options…">
                <LazyDateSelectionStep
                  fd={fd}
                  setFd={setFd}
                  trek={product}
                  batches={batches}
                  batchesLoading={batchesLoading}
                />
              </BookingStepFallback>
            )}
            {step === 1 && (
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
            )}
            {step === 2 && (
              <BookingStepFallback label="Loading health details…">
                <LazyHealthInfoStep fd={fd} setFd={setFd} />
              </BookingStepFallback>
            )}
            {step === 3 && (
              <BookingStepFallback label="Loading document upload…">
                <LazyDocumentsStep fd={fd} setFd={setFd} />
              </BookingStepFallback>
            )}
            {step === 4 && (
              <BookingStepFallback label="Loading preferences…">
                <LazyPreferencesStep fd={fd} setFd={setFd} />
              </BookingStepFallback>
            )}
            {step === 5 && (
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
            )}

            {/* Step navigation — sticky on mobile */}
            {step <= 5 && (
              <div
                className={`booking-nav-bar${step > 0 ? " booking-nav-bar--split" : ""}`}
              >
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className={ctaMerge(CTA_NAV_SECONDARY_FLEX, "sm:flex-none")}
                    data-ocid={
                      step === 5
                        ? "booking.step6.back_button"
                        : `booking.step${step + 1}.back_button`
                    }
                  >
                    <ChevronLeft size={18} aria-hidden />
                    Back
                  </button>
                ) : null}
                {step < 5 ? (
                  <button
                    type="submit"
                    disabled={bookingSending}
                    className={ctaMerge(
                      CTA_NAV_PRIMARY,
                      step === 0 ? CTA_NAV_PRIMARY_SOLO : CTA_NAV_PRIMARY_GROW,
                      "sm:w-auto",
                    )}
                    data-ocid={`booking.step${step + 1}.next_button`}
                  >
                    {step === 4 ? "Review Booking" : "Next Step"}
                    <ChevronRight size={18} aria-hidden />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!fd.termsAccepted || bookingSending}
                    className={ctaMerge(CTA_NAV_PRIMARY_GROW, "sm:w-auto")}
                    data-ocid="booking.submit_button"
                    aria-busy={bookingSending}
                  >
                    {bookingSending ? "Submitting…" : "Submit Booking"}
                    <ChevronRight size={18} aria-hidden />
                  </button>
                )}
              </div>
            )}
          </div>
        </form>

        {/* Trust badges */}
        <div
          className="flex flex-wrap justify-center gap-4 mt-6 text-xs"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          <span>🔒 Secure & encrypted</span>
          <span>✅ Free cancellation (30 days)</span>
          <span>⭐ 4.8 rated by 2,400+ trekkers</span>
        </div>
      </div>

      <style>{`
        .success-check-ring {
          background: #22C55E;
          animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes pop-in {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
