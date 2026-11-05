import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/*
 * Cookie consent for third-party embeds (Google Maps; FacebookVideo if it is used again).
 * The site itself sets no tracking cookies; these embeds may set their own.
 *   consent: null (not chosen yet) | 'all' | 'essential'
 */
const KEY = 'pid-cookie-consent';
const VERSION = 1; // bump to re-ask everyone if what we load changes

const ConsentContext = createContext(null);

function read() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    return saved?.v === VERSION ? saved.choice : null;
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }) {
  const [consent, setConsentState] = useState(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = read();
    setConsentState(saved);
    setOpen(saved == null);
    setReady(true);
  }, []);

  const choose = useCallback((choice) => {
    setConsentState(choice);
    setOpen(false);
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: VERSION, choice, at: new Date().toISOString() }));
    } catch {}
  }, []);

  const value = {
    consent,
    ready,
    allowsEmbeds: consent === 'all',
    bannerOpen: ready && open,
    acceptAll: () => choose('all'),
    essentialOnly: () => choose('essential'),
    openSettings: () => setOpen(true),
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used inside <ConsentProvider>');
  return ctx;
}
