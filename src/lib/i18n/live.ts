import { useEffect, useMemo, useState } from "react";

export type Lang = "fr" | "en";
type Dict = Record<string, string>;

function humanizeKey(key: string) {
  const last = key.split(".").pop() || key;
  const withSpaces = last
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

export function useLiveT(lang: Lang, apiBase: string) {
  const [dict, setDict] = useState<Dict>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const res = await fetch(`${apiBase}/api/translations?lang=${lang}`);
        const json = await res.json();
        if (!alive) return;
        setDict((json?.data ?? json?.translations ?? {}) as Record<string,string>);
      } catch {
        if (!alive) return;
        setDict({});
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    const intervalMs = (import.meta.env.DEV ? 1500 : 30000);
    const id = window.setInterval(load, intervalMs);

    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [lang, apiBase]);

  const t = useMemo(() => {
    return (key: string) => dict[key] ?? humanizeKey(key);
  }, [dict]);

  return { t, dict, loading };
}