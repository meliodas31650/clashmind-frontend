import React, { createContext, useContext, useMemo, useState } from "react";
import { useLiveT, type Lang } from "../lib/i18n/live";

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  loading: boolean;
};

const Ctx = createContext<I18nCtx | null>(null);

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string) ||
  (import.meta.env.VITE_API_BASE as string) ||
  (import.meta.env.DEV ? "http://localhost:3001" : "https://clashmind-backend.onrender.com");

const DEFAULT_LANG = ((import.meta.env.VITE_LANG as string) || "fr") as Lang;

export function I18nLiveProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const { t, loading } = useLiveT(lang, API_BASE);

  const value = useMemo(() => ({ lang, setLang, t, loading }), [lang, t, loading]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useT() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useT must be used within I18nLiveProvider");
  return v;
}
