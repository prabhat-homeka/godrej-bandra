"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type FormType =
  | "Enquire Now"
  | "Request a Callback"
  | "Download Brochure"
  | "View Floor Plan"
  | "Check Price"
  | "Unlock Video";

type EnquiryContextValue = {
  isOpen: boolean;
  openEnquiry: (formType: FormType, context?: string) => void;
  closeEnquiry: () => void;
  formType: FormType;
  context: string;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

const AUTO_POPUP_DELAY_MS = 30000;

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>("Enquire Now");
  const [context, setContext] = useState("General");
  const hasOpenedRef = useRef(false);

  const openEnquiry = useCallback((type: FormType = "Enquire Now", ctx = "General") => {
    hasOpenedRef.current = true;
    setFormType(type);
    setContext(ctx);
    setIsOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpenedRef.current) {
        openEnquiry("Enquire Now", "Auto-popup (30s)");
      }
    }, AUTO_POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [openEnquiry]);

  const value = useMemo(
    () => ({ isOpen, formType, context, openEnquiry, closeEnquiry }),
    [isOpen, formType, context, openEnquiry, closeEnquiry]
  );

  return (
    <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return ctx;
}
