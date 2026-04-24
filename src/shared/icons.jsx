import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
// ── SVG icon set ─────────────────────────────────────────────────────────────
/* ══════════════════════════════════════ ICONS ═══════════════════════════════════════ */
const ICO={
  menu:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" width="18" height="18"><path d="M3 5h14M3 10h14M3 15h14"/></svg>,
  casino:<svg viewBox="0 0 20 20" fill="currentColor" width="17" height="17" opacity=".9"><rect x="2.5" y="2.5" width="5.5" height="5.5" rx="1.5"/><rect x="12" y="2.5" width="5.5" height="5.5" rx="1.5"/><rect x="2.5" y="12" width="5.5" height="5.5" rx="1.5"/><rect x="12" y="12" width="5.5" height="5.5" rx="1.5"/></svg>,
  star:<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M10 1.5l2.5 5.6 6.1.8-4.4 4.3 1 6.1-5.2-2.8-5.2 2.8 1-6.1L1.4 7.9l6.1-.8z"/></svg>,
  live:<svg viewBox="0 0 20 20" fill="none" width="17" height="17"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="10" r="3" fill="currentColor"/></svg>,
  sports:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" width="17" height="17"><circle cx="10" cy="10" r="7.5"/><path d="M10 2.5c0 0 2 3.5 2 7.5s-2 7.5-2 7.5M2.5 10h15"/></svg>,
  promo:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" width="17" height="17"><path d="M3 10V6.5l7-4.5 7 4.5V10"/><path d="M3 10v5.5a1 1 0 001 1h12a1 1 0 001-1V10"/></svg>,
  vip:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="17" height="17"><path d="M3 7l7 8 7-8" strokeLinejoin="round"/></svg>,
  support:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" width="17" height="17"><circle cx="10" cy="10" r="7.5"/><path d="M7.5 7.5a2.5 2.5 0 015 0c0 2-2.5 2.5-2.5 4" strokeLinecap="round"/><circle cx="10" cy="15" r=".8" fill="currentColor" stroke="none"/></svg>,
  search:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" width="14" height="14"><circle cx="9" cy="9" r="5.5"/><path d="M13.5 13.5L17 17" strokeLinecap="round"/></svg>,
  wallet:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="15" height="15"><rect x="2" y="5" width="16" height="12" rx="2"/><path d="M2 9h16"/><circle cx="14.5" cy="13.5" r=".8" fill="currentColor" stroke="none"/></svg>,
  chevR:<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="11" height="11"><path d="M7 5l5 5-5 5"/></svg>,
  up:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M12 19V5M5 12l7-7 7 7"/></svg>,
  down:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>,
};


export { ICO };
