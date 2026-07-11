"use client";

import { createContext, useContext, useMemo, useState } from "react";

type EnquiryContextValue = {
  isOpen: boolean;
  openEnquiry: (source?: string) => void;
  closeEnquiry: () => void;
  source: string;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("General");

  const value = useMemo(
    () => ({
      isOpen,
      source,
      openEnquiry: (src = "General") => {
        setSource(src);
        setIsOpen(true);
      },
      closeEnquiry: () => setIsOpen(false),
    }),
    [isOpen, source]
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
