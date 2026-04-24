// ── Static data & ambient particles ──────────────────────────────────────────
/* ══════════════════════════════════════ DATA ═══════════════════════════════════════ */
const LIVE_FEED=[["Hi-Lo","ghost_x","$1,240","8.4×"],["Mines","neon_wolf","$640","3.2×"],["Keno","astro_k","$3,200","22×"],["Hi-Lo","shadow99","$4,400","22×"],["Crash","vaultmax","$7,500","31.2×"],["Hi-Lo","pulse_r","$820","5.1×"],["Keno","void_x","$12,400","55×"],["Mines","dark_ace","$1,100","5.5×"],["Hi-Lo","ultra_v","$18,400","86×"],["Keno","whale_01","$28,500","110×"],["Mines","mr_bet","$990","2.0×"],["Hi-Lo","jackshot","$3,300","14.9×"],["Mines","silent_k","$11,200","44.2×"],["Crash","whale_01","$55,000","204×"],["Keno","gem_lord","$640","3.2×"],["Hi-Lo","ghost_x","$2,840","12.4×"]];

/* ══════════════════════════════════════ PARTICLES ═══════════════════════════════════ */
const AMB_PTS=Array.from({length:20},(_,i)=>({id:i,l:(Math.random()*100).toFixed(1),t:(Math.random()*100).toFixed(1),w:(Math.random()*2+.5).toFixed(1),bg:["rgba(167,139,250,.5)","rgba(0,212,255,.45)","rgba(236,72,153,.4)"][i%3],op:(Math.random()*.2+.05).toFixed(2),dur:(Math.random()*12+8).toFixed(1),del:(Math.random()*8).toFixed(1)}));
const AMB_CSS=AMB_PTS.map(p=>{const tx=((Math.random()-.5)*80).toFixed(0),ty=((Math.random()-.5)*80).toFixed(0);return `@keyframes pf${p.id}{0%,100%{transform:translate(0,0)}50%{transform:translate(${tx}px,${ty}px)}}`}).join("");


export { LIVE_FEED, AMB_PTS, AMB_CSS };
