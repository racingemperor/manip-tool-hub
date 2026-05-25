"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export type CompactSelectOption = {
  value: string;
  label: string;
  count?: number;
};

type CompactSelectProps = {
  ariaLabel: string;
  className?: string;
  getButtonLabel?: (option: CompactSelectOption) => string;
  onChange: (value: string) => void;
  options: CompactSelectOption[];
  renderOption?: (option: CompactSelectOption) => ReactNode;
  value: string;
};

export function CompactSelect({
  ariaLabel,
  className = "",
  getButtonLabel,
  onChange,
  options,
  renderOption,
  value
}: CompactSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];
  const buttonLabel = selectedOption ? getButtonLabel?.(selectedOption) ?? selectedOption.label : "";

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={`compact-select ${className}`.trim()} ref={rootRef}>
      <button
        className="compact-select-trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-label={ariaLabel}
        onClick={() => setOpen((next) => !next)}
      >
        <span className="compact-select-trigger-text">{buttonLabel}</span>
        <span className="compact-select-caret" aria-hidden="true" />
      </button>
      {open ? (
        <div className="compact-select-menu" role="listbox" id={listboxId} aria-label={ariaLabel}>
          {options.map((option) => (
            <button
              className={`compact-select-option ${option.value === value ? "active" : ""}`}
              type="button"
              role="option"
              aria-selected={option.value === value}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {renderOption ? renderOption(option) : <span className="compact-select-text">{option.label}</span>}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
