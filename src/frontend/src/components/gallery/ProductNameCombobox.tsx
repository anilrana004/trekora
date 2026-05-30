"use client";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import {
  PRODUCT_TREK_COUNT,
  PRODUCT_YATRA_COUNT,
  type ProductNameOption,
  highlightProductName,
  searchProductNameOptions,
} from "@/lib/product-name-options";
import {
  type ResolvedUploadProduct,
  resolveProductForUpload,
} from "@/lib/resolve-product-upload";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Mountain, Search } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

type ProductNameComboboxProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onResolvedChange?: (resolved: ResolvedUploadProduct | null) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  "data-ocid"?: string;
};

function OptionName({
  name,
  query,
}: {
  name: string;
  query: string;
}) {
  const parts = highlightProductName(name, query);
  if (!parts) {
    return <span className="truncate font-medium">{name}</span>;
  }
  return (
    <span className="truncate font-medium">
      {parts.before}
      <mark
        className="rounded px-0.5 font-semibold not-italic"
        style={{
          background: "rgba(229, 57, 53, 0.12)",
          color: "var(--ew-red)",
        }}
      >
        {parts.match}
      </mark>
      {parts.after}
    </span>
  );
}

export default function ProductNameCombobox({
  id: idProp,
  value,
  onChange,
  onResolvedChange,
  placeholder = "Type to search — e.g. valley, kedarnath",
  required,
  disabled,
  className,
  inputClassName,
  "data-ocid": dataOcid,
}: ProductNameComboboxProps) {
  const autoId = useId();
  const inputId = idProp ?? autoId;
  const listboxId = `${inputId}-listbox`;
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const resolved = useMemo(() => resolveProductForUpload(value), [value]);
  const search = useMemo(() => searchProductNameOptions(value), [value]);
  const {
    items: options,
    isEmptyQuery,
    totalCatalog,
    query: searchQuery,
  } = search;

  useEffect(() => {
    onResolvedChange?.(resolved);
  }, [resolved, onResolvedChange]);

  useEffect(() => {
    setHighlightIndex(0);
  }, [value, options.length]);

  const selectOption = useCallback(
    (opt: ProductNameOption) => {
      onChange(opt.name);
      setOpen(false);
      inputRef.current?.blur();
    },
    [onChange],
  );

  const openList = useCallback(() => {
    if (disabled) return;
    setOpen(true);
  }, [disabled]);

  const closeList = useCallback(() => {
    setOpen(false);
  }, []);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openList();
      setHighlightIndex((i) =>
        Math.min(i + 1, Math.max(0, options.length - 1)),
      );
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      openList();
      setHighlightIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter" && open && options[highlightIndex]) {
      e.preventDefault();
      selectOption(options[highlightIndex]);
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      closeList();
    }
  };

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-index="${highlightIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, open]);

  const showValidHint = value.trim().length > 0 && resolved;
  const showInvalidHint =
    value.trim().length >= 2 && !resolved && !open && !isEmptyQuery;

  const panelTitle = isEmptyQuery
    ? `${totalCatalog} treks & yatras — type to search`
    : options.length === 0
      ? "No matches"
      : `${options.length} match${options.length === 1 ? "" : "es"}`;

  return (
    <div className={cn("relative w-full", className)}>
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverAnchor className="relative block w-full">
          <div className="relative w-full">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--ew-gray-dark)" }}
              aria-hidden
            />
            <input
              ref={inputRef}
              id={inputId}
              type="search"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                openList();
              }}
              onFocus={openList}
              onBlur={() => {
                window.setTimeout(() => closeList(), 150);
              }}
              onKeyDown={onInputKeyDown}
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="search"
              role="combobox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={
                open && options[highlightIndex]
                  ? `${inputId}-opt-${highlightIndex}`
                  : undefined
              }
              className={cn(
                "w-full rounded-lg py-2.5 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ew-red)]/30 border text-[var(--ew-text)]",
                resolved
                  ? "border-[var(--ew-green)]"
                  : "border-[var(--ew-gray-mid)]",
                inputClassName,
              )}
              data-ocid={dataOcid}
            />
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (open) {
                  closeList();
                  inputRef.current?.blur();
                } else {
                  inputRef.current?.focus();
                  openList();
                }
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-md text-[var(--ew-gray-dark)] hover:bg-[var(--ew-gray-lt)] disabled:opacity-50"
              aria-label={open ? "Close trek list" : "Show trek list"}
            >
              <ChevronDown
                size={18}
                className={cn(
                  "transition-transform duration-200",
                  open && "rotate-180",
                )}
                aria-hidden
              />
            </button>
          </div>
        </PopoverAnchor>

        <PopoverContent
          align="start"
          side="bottom"
          sideOffset={6}
          collisionPadding={12}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "z-[120] w-[var(--radix-popover-trigger-width)] p-0",
            "rounded-xl border border-[var(--ew-gray-mid)] bg-[var(--ew-white)] shadow-lg",
            "max-h-[min(320px,55dvh)] overflow-hidden flex flex-col",
          )}
        >
          <div
            className="shrink-0 px-3 py-2 border-b border-[var(--ew-gray-mid)]"
            style={{ background: "var(--ew-gray-lt)" }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              {panelTitle}
            </p>
            {isEmptyQuery ? (
              <p
                className="text-[11px] mt-0.5"
                style={{ color: "var(--ew-text-lt)" }}
              >
                {PRODUCT_TREK_COUNT} treks · {PRODUCT_YATRA_COUNT} yatras — type
                a few letters (like +91 for India)
              </p>
            ) : null}
          </div>

          <ul
            ref={listRef}
            id={listboxId}
            aria-label="Trek and yatra names"
            className="overflow-y-auto overscroll-contain py-1 scroll-py-1"
            style={{ maxHeight: "min(280px, calc(55dvh - 4rem))" }}
          >
            {isEmptyQuery ? (
              <>
                <li
                  className="px-3 py-2 text-[11px] font-semibold"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  Popular — or keep typing
                </li>
                {options.map((opt, index) => (
                  <OptionRow
                    key={`${opt.type}-${opt.slug}`}
                    opt={opt}
                    index={index}
                    inputId={inputId}
                    searchQuery={searchQuery}
                    resolved={resolved}
                    highlighted={index === highlightIndex}
                    onHighlight={() => setHighlightIndex(index)}
                    onSelect={() => selectOption(opt)}
                  />
                ))}
              </>
            ) : options.length === 0 ? (
              <li
                className="px-3 py-6 text-center text-sm"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                <Mountain
                  size={22}
                  className="mx-auto mb-2 opacity-50"
                  aria-hidden
                />
                No trek or yatra matches &quot;{value.trim()}&quot;
                <span className="block text-xs mt-1 opacity-80">
                  Try valley, kedarnath, char dham, or the full name
                </span>
              </li>
            ) : (
              options.map((opt, index) => (
                <OptionRow
                  key={`${opt.type}-${opt.slug}`}
                  opt={opt}
                  index={index}
                  inputId={inputId}
                  searchQuery={searchQuery}
                  resolved={resolved}
                  highlighted={index === highlightIndex}
                  onHighlight={() => setHighlightIndex(index)}
                  onSelect={() => selectOption(opt)}
                />
              ))
            )}
          </ul>
        </PopoverContent>
      </Popover>

      {showValidHint ? (
        <p
          className="mt-1 text-[11px] font-medium"
          style={{ color: "var(--ew-green)" }}
        >
          {resolved.name} · {resolved.type === "yatra" ? "Yatra" : "Trek"}
        </p>
      ) : null}
      {showInvalidHint ? (
        <p className="mt-1 text-[11px]" style={{ color: "var(--ew-orange)" }}>
          Select a match from the list — every trek and yatra is searchable.
        </p>
      ) : null}
    </div>
  );
}

function OptionRow({
  opt,
  index,
  inputId,
  searchQuery,
  resolved,
  highlighted,
  onHighlight,
  onSelect,
}: {
  opt: ProductNameOption;
  index: number;
  inputId: string;
  searchQuery: string;
  resolved: ResolvedUploadProduct | null;
  highlighted: boolean;
  onHighlight: () => void;
  onSelect: () => void;
}) {
  const selected = resolved?.slug === opt.slug && resolved?.type === opt.type;

  return (
    <li role="presentation">
      <button
        type="button"
        role="option"
        id={`${inputId}-opt-${index}`}
        data-index={index}
        aria-selected={highlighted}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onSelect}
        onMouseEnter={onHighlight}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors min-h-[44px]",
          highlighted && "bg-[var(--ew-gray-lt)]",
        )}
        style={{ color: "var(--ew-text)" }}
      >
        <span className="flex-1 min-w-0">
          <OptionName name={opt.name} query={searchQuery} />
        </span>
        <span
          className="shrink-0 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
          style={{
            background:
              opt.type === "yatra"
                ? "rgba(255,152,0,0.12)"
                : "rgba(229,57,53,0.1)",
            color: opt.type === "yatra" ? "var(--ew-orange)" : "var(--ew-red)",
          }}
        >
          {opt.type === "yatra" ? "Yatra" : "Trek"}
        </span>
        {selected ? (
          <Check
            size={16}
            className="shrink-0"
            style={{ color: "var(--ew-green)" }}
            aria-hidden
          />
        ) : null}
      </button>
    </li>
  );
}
