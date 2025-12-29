import React, { useEffect, useMemo, useState } from "react";
import { useLiveT, type Lang } from "../../src/lib/i18n/live";

type Dict = Record<string, string>;

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:3000";
const DEFAULT_LANG = ((import.meta.env.VITE_LANG as string) || "fr") as Lang;

async function fetchDict(lang: Lang): Promise<Dict> {
  const res = await fetch(`${API_BASE}/api/translations?lang=${lang}`);
  if (!res.ok) throw new Error(`Failed GET translations (${lang})`);
  const json = await res.json();
  return (json?.data ?? {}) as Dict;
}

async function saveKey(lang: Lang, key: string, value: string) {
  const res = await fetch(`${API_BASE}/api/translations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lang, key, value }),
  });
  if (!res.ok) throw new Error(`Failed POST ${key}`);
}

export default function AdminI18nPage() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const { t } = useLiveT(lang, API_BASE);

  const [fr, setFr] = useState<Dict>({});
  const [en, setEn] = useState<Dict>({});
  const [dirty, setDirty] = useState<Record<string, { fr?: string; en?: string }>>({});
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const [frD, enD] = await Promise.all([fetchDict("fr"), fetchDict("en")]);
      if (!alive) return;
      setFr(frD);
      setEn(enD);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const keys = useMemo(() => {
    const all = Array.from(new Set([...Object.keys(fr), ...Object.keys(en)])).sort();
    if (!q) return all;
    const s = q.toLowerCase();
    return all.filter(
      (k) =>
        k.toLowerCase().includes(s) ||
        (fr[k] ?? "").toLowerCase().includes(s) ||
        (en[k] ?? "").toLowerCase().includes(s),
    );
  }, [fr, en, q]);

  function onEdit(k: string, l: "fr" | "en", v: string) {
    setDirty((d) => ({ ...d, [k]: { ...d[k], [l]: v } }));
  }

  async function onSave(k: string) {
    const frVal = dirty[k]?.fr ?? fr[k] ?? "";
    const enVal = dirty[k]?.en ?? en[k] ?? "";
    await Promise.all([
      dirty[k]?.fr !== undefined ? saveKey("fr", k, frVal) : Promise.resolve(),
      dirty[k]?.en !== undefined ? saveKey("en", k, enVal) : Promise.resolve(),
    ]);
    setFr((x) => ({ ...x, [k]: frVal }));
    setEn((x) => ({ ...x, [k]: enVal }));
    setDirty((d) => {
      const c = { ...d };
      delete c[k];
      return c;
    });
  }

  if (loading) return <div style={{ padding: 16 }}>Chargement…</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Admin i18n</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setLang("fr")}>FR</button>
        <button onClick={() => setLang("en")}>EN</button>
        <input
          placeholder="Recherche…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ marginLeft: "auto" }}
        />
      </div>

      <div style={{ marginBottom: 12, fontSize: 12 }}>
        Aperçu live : <b>{t("menu.cortexArena")}</b>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Key</th>
            <th align="left">FR</th>
            <th align="left">EN</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {keys.map((k) => (
            <tr key={k}>
              <td><code>{k}</code></td>
              <td>
                <input
                  value={dirty[k]?.fr ?? fr[k] ?? ""}
                  onChange={(e) => onEdit(k, "fr", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={dirty[k]?.en ?? en[k] ?? ""}
                  onChange={(e) => onEdit(k, "en", e.target.value)}
                />
              </td>
              <td>
                <button disabled={!dirty[k]} onClick={() => onSave(k)}>
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
