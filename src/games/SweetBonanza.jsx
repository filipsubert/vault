import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { StatsModal } from "../components/StatsModal.jsx";
// ── Sweet Bonanza slot ────────────────────────────────────────────────────────
/* ══════════════════════════════════════ SWEET BONANZA ════════════════════════════════ */
function SweetBonanzaArt(){
  return(
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
      <defs>
        <radialGradient id="sbABg" cx="50%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#c2185b"/><stop offset="40%" stopColor="#6a0080"/><stop offset="100%" stopColor="#0d001c"/>
        </radialGradient>
        <radialGradient id="sbAGl" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="rgba(255,50,180,.55)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="sbALol" cx="32%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#fff9f0"/><stop offset="10%" stopColor="#ffe0f0"/><stop offset="35%" stopColor="#ff1493"/><stop offset="70%" stopColor="#c2185b"/><stop offset="100%" stopColor="#7b0040"/>
        </radialGradient>
        <radialGradient id="sbASheen" cx="30%" cy="25%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,.55)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="sbABan" cx="38%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#fffde7"/><stop offset="30%" stopColor="#ffee58"/><stop offset="100%" stopColor="#f9a825"/>
        </radialGradient>
        <radialGradient id="sbAGrp" cx="35%" cy="28%" r="65%">
          <stop offset="0%" stopColor="#e1bee7"/><stop offset="100%" stopColor="#6a1b9a"/>
        </radialGradient>
        <radialGradient id="sbAWm" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#ffcdd2"/><stop offset="40%" stopColor="#f44336"/><stop offset="100%" stopColor="#b71c1c"/>
        </radialGradient>
        <radialGradient id="sbACnd" cx="40%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#fff"/><stop offset="30%" stopColor="#ff80ab"/><stop offset="100%" stopColor="#f50057"/>
        </radialGradient>
        <radialGradient id="sbAVig" cx="50%" cy="50%" r="70%">
          <stop offset="50%" stopColor="transparent"/><stop offset="100%" stopColor="rgba(0,0,0,.7)"/>
        </radialGradient>
        <filter id="sbABlur"><feGaussianBlur stdDeviation="7"/></filter>
        <filter id="sbADrp"><feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="rgba(0,0,0,.8)"/></filter>
        <filter id="sbAGlow"><feGaussianBlur stdDeviation="2.5"/></filter>
        <filter id="sbAStar"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffe066" floodOpacity=".9"/></filter>
      </defs>

      {/* Background */}
      <rect width="240" height="320" fill="url(#sbABg)"/>

      {/* Scattered sparkle dots */}
      {Array.from({length:55},(_,i)=>{
        const x=(i*43+i%11*17)%240;const y=(i*37+i%8*23)%320;
        return <circle key={i} cx={x} cy={y} r={1+i%3} fill={["rgba(255,100,220,.22)","rgba(255,230,50,.18)","rgba(100,210,255,.16)","rgba(255,120,60,.16)","rgba(200,100,255,.22)"][i%5]}/>;
      })}

      {/* Central glow */}
      <ellipse cx="120" cy="148" rx="105" ry="88" fill="url(#sbAGl)" filter="url(#sbABlur)" opacity=".95"/>

      {/* Rainbow arc behind lollipop */}
      {[["#ff4da6",22],["#ff8c00",18],["#ffe066",14],["#44ff88",10],["#00d4ff",6]].map(([col,yOff],i)=>(
        <path key={i} d={`M25,${148+yOff} Q120,${50+yOff} 215,${148+yOff}`} fill="none"
          stroke={col} strokeWidth={3.5-i*.4} opacity={.35-i*.03} strokeLinecap="round"/>
      ))}

      {/* Main lollipop — centered, large */}
      <g filter="url(#sbADrp)">
        {/* Outer ring glow */}
        <circle cx="120" cy="140" r="70" fill="rgba(255,0,120,.18)" filter="url(#sbABlur)"/>
        {/* Main candy circle */}
        <circle cx="120" cy="140" r="62" fill="url(#sbALol)"/>
        {/* Spiral stripes */}
        <path d="M120 80 C162 83 184 110 184 138 C184 170 160 192 130 195" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="8" strokeLinecap="round"/>
        <path d="M120 88 C155 91 174 115 174 140 C174 168 152 185 126 188" fill="none" stroke="rgba(255,120,50,.38)" strokeWidth="5.5" strokeLinecap="round"/>
        <path d="M120 96 C148 99 164 120 164 142 C164 165 145 179 122 181" fill="none" stroke="rgba(255,230,60,.3)" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M120 104 C140 107 154 124 154 144 C154 162 138 173 118 174" fill="none" stroke="rgba(100,220,255,.25)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Inner glow layers */}
        <circle cx="120" cy="140" r="44" fill="rgba(255,10,110,.35)"/>
        <circle cx="120" cy="140" r="24" fill="rgba(255,50,140,.45)"/>
        {/* Glass sheen */}
        <circle cx="120" cy="140" r="62" fill="url(#sbASheen)"/>
        <ellipse cx="100" cy="118" rx="16" ry="21" fill="rgba(255,255,255,.32)" transform="rotate(-25,100,118)"/>
        <ellipse cx="96" cy="114" rx="7" ry="10" fill="rgba(255,255,255,.45)" transform="rotate(-25,96,114)"/>
        {/* BONUS text */}
        <text x="120" y="138" textAnchor="middle" fontSize="0" fontFamily="'Fredoka One',cursive" fontWeight="900" fill="none" stroke="rgba(100,0,50,.6)" strokeWidth="2.5">BONUS</text>
        <text x="120" y="138" textAnchor="middle" fontSize="11" fontFamily="'Fredoka One',cursive" fontWeight="900" fill="#fff" letterSpacing=".6">BONUS</text>
        {/* Star above */}
        <polygon points="120,72 122.5,79 130,79 124,83.5 126.5,91 120,86.5 113.5,91 116,83.5 110,79 117.5,79"
          fill="#ffe066" filter="url(#sbAStar)" opacity=".92"/>
        {/* Stick */}
        <rect x="116" y="200" width="8" height="72" rx="4" fill="#fffde7" stroke="#f5c842" strokeWidth="1.2"/>
        <rect x="118" y="200" width="3" height="72" rx="1.5" fill="rgba(255,255,255,.4)"/>
      </g>

      {/* Fruit cluster — top left */}
      <g transform="translate(30,55)" filter="url(#sbAGlow)" opacity=".95">
        {/* Heart candy */}
        <path d="M0,20 C-2,17 -22,2 -22,-12 C-22,-22 -11,-27 0,-15 C11,-27 22,-22 22,-12 C22,2 2,17 0,20Z" fill="url(#sbACnd)"/>
        <ellipse cx="-8" cy="-14" rx="6" ry="8" fill="rgba(255,255,255,.35)" transform="rotate(-18,-8,-14)"/>
      </g>
      {/* Banana — top right */}
      <g transform="translate(210,52)" filter="url(#sbAGlow)" opacity=".92">
        <path d="M10,22 C7,12 -8,2 -10,-5 A10,10 0 1 1 10,-5 C8,2 -7,12 -10,18Z" fill="url(#sbABan)"/>
        <path d="M8,18 C6,10 -6,1 -8,-4 A8,8 0 1 1 8,-4 C6,1 -6,10 -8,14Z" fill="rgba(255,255,255,.2)"/>
      </g>
      {/* Watermelon — bottom left */}
      <g transform="translate(32,262)" filter="url(#sbAGlow)" opacity=".9">
        <path d="M-26,0 A26,26 0 0 1 26,0 Z" fill="#2e7d32"/>
        <path d="M-24,0 A24,24 0 0 1 24,0 Z" fill="#43a047"/>
        <path d="M-22,0 A22,22 0 0 1 22,0 Z" fill="url(#sbAWm)"/>
        {[[-15,-4],[-8,-13],[0,-16],[8,-13],[15,-4]].map(([x,y],i)=>(
          <ellipse key={i} cx={x} cy={y} rx="2.5" ry="4" fill="#111" opacity=".65" transform={`rotate(${-14+i*7},${x},${y})`}/>
        ))}
        <ellipse cx="-10" cy="-8" rx="6" ry="4" fill="rgba(255,255,255,.22)" transform="rotate(-20,-10,-8)"/>
      </g>
      {/* Grapes — bottom right */}
      <g transform="translate(208,262)" filter="url(#sbAGlow)" opacity=".9">
        <path d="M-3,-20 C-1,-24 3,-24 5,-20" fill="none" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round"/>
        {[[-11,-15],[5,-15],[-18,-5],[0,-5],[18,-5],[-11,6],[7,6]].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="10.5" fill="url(#sbAGrp)"/>
            <ellipse cx={x-3} cy={y-3} rx="4.5" ry="3.5" fill="rgba(255,255,255,.28)"/>
          </g>
        ))}
      </g>

      {/* Star sparkles */}
      {[[28,108],[214,106],[40,195],[198,190],[120,278],[68,38],[172,35]].map(([x,y],i)=>(
        <g key={i} transform={`translate(${x},${y})`} opacity={.55+i*.05}>
          <line x1="0" y1="-9" x2="0" y2="9" stroke="#ffe066" strokeWidth="1.8"/>
          <line x1="-9" y1="0" x2="9" y2="0" stroke="#ffe066" strokeWidth="1.8"/>
          <line x1="-6" y1="-6" x2="6" y2="6" stroke="rgba(255,220,100,.45)" strokeWidth="1.1"/>
          <line x1="6" y1="-6" x2="-6" y2="6" stroke="rgba(255,220,100,.45)" strokeWidth="1.1"/>
        </g>
      ))}

      {/* Title */}
      <text x="120" y="298" textAnchor="middle" fontSize="14" fontFamily="'Fredoka One',cursive,sans-serif" fontWeight="900" fill="#fff" letterSpacing=".6" filter="url(#sbAGlow)">SWEET BONANZA</text>
      <text x="120" y="312" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fontWeight="700" fill="rgba(255,180,230,.5)" letterSpacing=".2em">CLUSTER PAYS</text>

      {/* Vignette */}
      <rect width="240" height="320" fill="url(#sbAVig)"/>
    </svg>
  );
}

/* ── Symbol SVGs ── accurate Sweet Bonanza style ── */
/* ── SB_Heart (candy1) — red/pink puffy heart, highest paying ── */
const SB_Candy1=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="90%" height="90%">
    <defs>
      <radialGradient id="sb_c1A" cx="38%" cy="28%" r="72%">
        <stop offset="0%" stopColor="#fff0f5"/><stop offset="18%" stopColor="#ff6eb4"/>
        <stop offset="55%" stopColor="#e91e8c"/><stop offset="100%" stopColor="#880044"/>
      </radialGradient>
      <radialGradient id="sb_c1Hl" cx="32%" cy="25%" r="50%">
        <stop offset="0%" stopColor="rgba(255,255,255,.6)"/><stop offset="100%" stopColor="transparent"/>
      </radialGradient>
      <filter id="sb_c1Glow"><feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#ff1493" floodOpacity=".6"/></filter>
    </defs>
    {/* Main heart */}
    <path d="M26 44 C26 44 5 30 5 17 C5 9 11 4 18 4 C21.5 4 24.5 5.5 26 8 C27.5 5.5 30.5 4 34 4 C41 4 47 9 47 17 C47 30 26 44 26 44Z"
      fill="url(#sb_c1A)" filter="url(#sb_c1Glow)"/>
    {/* Top sheen */}
    <ellipse cx="17" cy="14" rx="7" ry="9" fill="url(#sb_c1Hl)" transform="rotate(-20,17,14)"/>
    <ellipse cx="15" cy="12" rx="3" ry="4" fill="rgba(255,255,255,.55)" transform="rotate(-20,15,12)"/>
    {/* Edge highlight */}
    <path d="M10 15 C9 20 10 27 16 33" fill="none" stroke="rgba(255,200,220,.45)" strokeWidth="2.2" strokeLinecap="round"/>
    {/* Bottom shine */}
    <path d="M20 38 C22 40 25 42 26 43" fill="none" stroke="rgba(255,180,210,.35)" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
));

/* ── SB_Cube (candy2) — purple/blue rounded square, 2nd highest ── */
const SB_Candy2=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="90%" height="90%">
    <defs>
      <linearGradient id="sb_c2Top" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="#e0c8ff"/><stop offset="30%" stopColor="#9b59f5"/>
        <stop offset="70%" stopColor="#5b0fd0"/><stop offset="100%" stopColor="#2d0070"/>
      </linearGradient>
      <linearGradient id="sb_c2Lft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7a20c0"/><stop offset="100%" stopColor="#4a0099"/>
      </linearGradient>
      <linearGradient id="sb_c2Rgt" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6010a0"/><stop offset="100%" stopColor="#3a0080"/>
      </linearGradient>
      <filter id="sb_c2Glow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#9b59f5" floodOpacity=".6"/></filter>
    </defs>
    {/* 3D cube — top face */}
    <polygon points="26,6 44,14 44,36 26,44 8,36 8,14" fill="url(#sb_c2Top)" filter="url(#sb_c2Glow)"/>
    {/* Facet lines for 3D look */}
    <polygon points="26,6 44,14 26,22 8,14" fill="rgba(255,255,255,.22)"/>
    <polygon points="8,14 26,22 26,44 8,36" fill="url(#sb_c2Lft)" opacity=".85"/>
    <polygon points="44,14 26,22 26,44 44,36" fill="url(#sb_c2Rgt)" opacity=".85"/>
    <line x1="26" y1="6" x2="26" y2="44" stroke="rgba(255,255,255,.18)" strokeWidth=".8"/>
    <line x1="8" y1="14" x2="44" y2="14" stroke="rgba(255,255,255,.15)" strokeWidth=".7"/>
    {/* Sheen */}
    <ellipse cx="19" cy="15" rx="7" ry="4.5" fill="rgba(255,255,255,.38)" transform="rotate(-30,19,15)"/>
    <ellipse cx="17" cy="14" rx="3" ry="2" fill="rgba(255,255,255,.55)" transform="rotate(-30,17,14)"/>
  </svg>
));

/* ── SB_Pentagon (candy3) — green rounded pentagon gem, 3rd highest ── */
const SB_Candy3=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="90%" height="90%">
    <defs>
      <radialGradient id="sb_c3A" cx="38%" cy="28%" r="72%">
        <stop offset="0%" stopColor="#ccfce8"/><stop offset="20%" stopColor="#34d399"/>
        <stop offset="60%" stopColor="#059669"/><stop offset="100%" stopColor="#014d30"/>
      </radialGradient>
      <filter id="sb_c3Glow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00e890" floodOpacity=".65"/></filter>
    </defs>
    {/* Pentagon */}
    <polygon points="26,4 47,19 39,44 13,44 5,19" fill="url(#sb_c3A)" filter="url(#sb_c3Glow)"
      stroke="rgba(52,211,153,.7)" strokeWidth="1.2"/>
    {/* Inner facets */}
    <polygon points="26,4 47,19 26,26 5,19" fill="rgba(255,255,255,.18)"/>
    <polygon points="26,4 47,19 39,44 26,26" fill="rgba(0,0,0,.1)"/>
    <polygon points="26,4 5,19 13,44 26,26" fill="rgba(255,255,255,.06)"/>
    {/* Sheen */}
    <ellipse cx="18" cy="18" rx="8" ry="5" fill="rgba(255,255,255,.42)" transform="rotate(-30,18,18)"/>
    <ellipse cx="16" cy="16" rx="3.5" ry="2.2" fill="rgba(255,255,255,.6)" transform="rotate(-30,16,16)"/>
    {/* Edge highlight */}
    <path d="M7 22 C8 28 12 36 16 41" fill="none" stroke="rgba(180,255,220,.4)" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
));

/* ── SB_Pill (candy4) — blue/teal oval pill, 4th highest ── */
const SB_Candy4=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="90%" height="90%">
    <defs>
      <radialGradient id="sb_c4A" cx="38%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#e0f7ff"/><stop offset="22%" stopColor="#38bdf8"/>
        <stop offset="62%" stopColor="#0284c7"/><stop offset="100%" stopColor="#01305a"/>
      </radialGradient>
      <filter id="sb_c4Glow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00aaff" floodOpacity=".65"/></filter>
    </defs>
    {/* Oval pill body */}
    <ellipse cx="26" cy="26" rx="22" ry="16" fill="url(#sb_c4A)" filter="url(#sb_c4Glow)"
      stroke="rgba(56,189,248,.7)" strokeWidth="1.2"/>
    {/* Center divide line */}
    <line x1="26" y1="10.5" x2="26" y2="41.5" stroke="rgba(255,255,255,.4)" strokeWidth="1.5"/>
    {/* Sheen */}
    <ellipse cx="16" cy="19" rx="9" ry="5.5" fill="rgba(255,255,255,.45)" transform="rotate(-18,16,19)"/>
    <ellipse cx="14" cy="17.5" rx="4" ry="2.5" fill="rgba(255,255,255,.6)" transform="rotate(-18,14,17.5)"/>
    {/* Bottom reflection */}
    <path d="M10 30 C12 36 20 40 26 40" fill="none" stroke="rgba(150,220,255,.35)" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
));

/* ── SB_Apple — red apple ── */
const SB_Apple=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="90%" height="90%">
    <defs>
      <radialGradient id="sb_apA" cx="38%" cy="28%" r="70%">
        <stop offset="0%" stopColor="#ffd5d5"/><stop offset="22%" stopColor="#f87171"/>
        <stop offset="60%" stopColor="#dc2626"/><stop offset="100%" stopColor="#7f0000"/>
      </radialGradient>
      <filter id="sb_apGlow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#ef4444" floodOpacity=".5"/></filter>
    </defs>
    <path d="M26 13 C36 13 45 20 45 30 C45 42 36 49 26 49 C16 49 7 42 7 30 C7 20 16 13 26 13Z"
      fill="url(#sb_apA)" filter="url(#sb_apGlow)"/>
    {/* Indent at top */}
    <path d="M22 13 C22 10 24 9 26 9" fill="none" stroke="rgba(150,30,0,.35)" strokeWidth="1.5"/>
    {/* Stem */}
    <path d="M26 9 C28 5 31 3 33 3" fill="none" stroke="#5d4037" strokeWidth="2.8" strokeLinecap="round"/>
    {/* Leaf */}
    <path d="M32 4 C38 1 43 5 39 10 C36 13 29 9 32 4Z" fill="#43a047"/>
    <path d="M33 5 C36 4 38 6.5 36 9" fill="none" stroke="#2e7d32" strokeWidth="1.1"/>
    {/* Sheen */}
    <ellipse cx="18" cy="22" rx="6" ry="9" fill="rgba(255,255,255,.42)" transform="rotate(-20,18,22)"/>
    <ellipse cx="17" cy="20" rx="2.5" ry="4" fill="rgba(255,255,255,.55)" transform="rotate(-20,17,20)"/>
    <path d="M12 28 C12 33 14 39 18 43" fill="none" stroke="rgba(255,200,200,.35)" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
));

/* ── SB_Plum — single dark purple plum ── */
const SB_Grape=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="90%" height="90%">
    <defs>
      <radialGradient id="sb_grA" cx="35%" cy="26%" r="72%">
        <stop offset="0%" stopColor="#f3d9ff"/><stop offset="20%" stopColor="#c084fc"/>
        <stop offset="58%" stopColor="#7e22ce"/><stop offset="100%" stopColor="#3b0764"/>
      </radialGradient>
      <filter id="sb_grGlow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#a855f7" floodOpacity=".55"/></filter>
    </defs>
    {/* Plum body */}
    <path d="M26 11 C38 11 46 19 46 30 C46 41 38 49 26 49 C14 49 6 41 6 30 C6 19 14 11 26 11Z"
      fill="url(#sb_grA)" filter="url(#sb_grGlow)"/>
    {/* Top cleft */}
    <path d="M22 11 C22 8 24 6 26 6" fill="none" stroke="rgba(80,0,120,.4)" strokeWidth="1.8"/>
    {/* Stem */}
    <path d="M26 6 C28 3 31 2 33 2" fill="none" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Small leaf */}
    <path d="M32 3 C37 1 40 5 37 8 C34 10 29 6 32 3Z" fill="#388e3c"/>
    {/* Sheen */}
    <ellipse cx="17" cy="21" rx="6" ry="9.5" fill="rgba(255,255,255,.4)" transform="rotate(-18,17,21)"/>
    <ellipse cx="16" cy="19" rx="2.5" ry="4.5" fill="rgba(255,255,255,.55)" transform="rotate(-18,16,19)"/>
    <path d="M10 28 C10 34 13 41 18 45" fill="none" stroke="rgba(220,180,255,.3)" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
));

/* ── SB_Lime — bright green round lime/ball ── */
/* ── SB_Watermelon — proper watermelon slice (semicircle view from above) ── */
const SB_Watermelon=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="90%" height="90%">
    <defs>
      <linearGradient id="sb_wmRind" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4ade80"/><stop offset="40%" stopColor="#16a34a"/>
        <stop offset="100%" stopColor="#14532d"/>
      </linearGradient>
      <radialGradient id="sb_wmFlesh" cx="50%" cy="60%" r="65%">
        <stop offset="0%" stopColor="#fca5a5"/><stop offset="30%" stopColor="#f87171"/>
        <stop offset="65%" stopColor="#dc2626"/><stop offset="100%" stopColor="#991b1b"/>
      </radialGradient>
      <filter id="sb_wmGl"><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#22c55e" floodOpacity=".5"/></filter>
    </defs>
    {/* Outer rind — full semicircle */}
    <path d="M4 30 A23 23 0 0 1 48 30 Z" fill="url(#sb_wmRind)" filter="url(#sb_wmGl)"/>
    {/* White inner rind ring */}
    <path d="M7 30 A21 21 0 0 1 45 30 Z" fill="#dcfce7"/>
    {/* Thin white divider */}
    <path d="M8.5 30 A20 20 0 0 1 43.5 30 Z" fill="white"/>
    {/* Red flesh */}
    <path d="M9.5 30 A19 19 0 0 1 42.5 30 Z" fill="url(#sb_wmFlesh)"/>
    {/* Flesh highlight */}
    <path d="M11 26 A17 17 0 0 1 26 11" fill="none" stroke="rgba(255,255,255,.38)" strokeWidth="2.8" strokeLinecap="round"/>
    {/* Seeds — classic watermelon seed shape */}
    {[[17,24,-15],[26,20,0],[35,24,12],[21,27,-8],[31,27,8],[26,30,0]].map(([x,y,rot],i)=>(
      <ellipse key={i} cx={x} cy={y} rx="1.8" ry="3.2" fill="#1c1917" opacity=".75" transform={`rotate(${rot},${x},${y})`}/>
    ))}
    {/* Top rind edge highlight */}
    <path d="M4 30 C8 24 18 20 26 20 C34 20 44 24 48 30" fill="none" stroke="rgba(134,239,172,.5)" strokeWidth="1.4"/>
    {/* Flat bottom */}
    <line x1="4" y1="30" x2="48" y2="30" stroke="rgba(74,222,128,.4)" strokeWidth="1"/>
  </svg>
));

/* ── SB_Scatter — accurate Sweet Bonanza lollipop ── */
const SB_Scatter=React.memo(()=>(
  <svg viewBox="0 0 54 64" width="96%" height="96%">
    <defs>
      <radialGradient id="sb_scB" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#ffe0f0"/><stop offset="25%" stopColor="#ff80c0"/>
        <stop offset="60%" stopColor="#e91e8c"/><stop offset="100%" stopColor="#880044"/>
      </radialGradient>
      <radialGradient id="sb_scH" cx="30%" cy="28%" r="44%">
        <stop offset="0%" stopColor="rgba(255,255,255,.7)"/><stop offset="100%" stopColor="transparent"/>
      </radialGradient>
      <filter id="sb_scGl" x="-35%" y="-35%" width="170%" height="170%">
        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ff1493" floodOpacity=".65"/>
      </filter>
      <filter id="sb_scSp"><feGaussianBlur stdDeviation="1" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <clipPath id="sb_scClip"><circle cx="27" cy="24" r="20"/></clipPath>
    </defs>

    {/* Outer glow aura */}
    <circle cx="27" cy="24" r="23" fill="none" stroke="rgba(255,20,147,.18)" strokeWidth="2.5"/>

    {/* Candy body */}
    <circle cx="27" cy="24" r="20" fill="url(#sb_scB)" filter="url(#sb_scGl)"/>

    {/* Swirl stripes — clipped to candy circle */}
    <g clipPath="url(#sb_scClip)">
      {/* Wide white swirl */}
      <path d="M27 4 C44 5 53 14 53 24 C53 36 44 47 31 49" fill="none"
        stroke="rgba(255,255,255,.6)" strokeWidth="8" strokeLinecap="round"/>
      {/* Cyan swirl */}
      <path d="M27 7 C41 8.5 49 17 49 25 C49 35 41 44 30 46" fill="none"
        stroke="rgba(80,220,255,.55)" strokeWidth="5.5" strokeLinecap="round"/>
      {/* Yellow swirl */}
      <path d="M27 11 C38 12 45 20 45 26 C45 34 38 41 29 43" fill="none"
        stroke="rgba(255,220,50,.45)" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Magenta thin swirl */}
      <path d="M27 15 C35 16 40 22 40 27 C40 33 35 38 27 40" fill="none"
        stroke="rgba(255,80,200,.4)" strokeWidth="2" strokeLinecap="round"/>
    </g>

    {/* Sheen overlay */}
    <circle cx="27" cy="24" r="20" fill="url(#sb_scH)"/>
    {/* Crisp white highlight */}
    <ellipse cx="18" cy="14" rx="5.5" ry="7.5" fill="rgba(255,255,255,.38)" transform="rotate(-25,18,14)"/>
    <ellipse cx="16.5" cy="12.5" rx="2.2" ry="3.2" fill="rgba(255,255,255,.6)" transform="rotate(-25,16.5,12.5)"/>

    {/* Candy outline */}
    <circle cx="27" cy="24" r="20" fill="none" stroke="rgba(255,160,200,.5)" strokeWidth="1.5"/>

    {/* SCATTER text — bold white with dark outline */}
    <text x="27" y="22" textAnchor="middle" fontSize="6.2"
      fontFamily="'Fredoka One',cursive,sans-serif" fontWeight="900"
      fill="none" stroke="rgba(80,0,40,.65)" strokeWidth="2.8" strokeLinejoin="round">SCATTER</text>
    <text x="27" y="22" textAnchor="middle" fontSize="6.2"
      fontFamily="'Fredoka One',cursive,sans-serif" fontWeight="900" fill="#fff">SCATTER</text>
    {/* BONUS sub text */}
    <text x="27" y="30" textAnchor="middle" fontSize="4.8"
      fontFamily="'Fredoka One',cursive,sans-serif" fontWeight="700"
      fill="none" stroke="rgba(80,0,40,.5)" strokeWidth="2">BONUS</text>
    <text x="27" y="30" textAnchor="middle" fontSize="4.8"
      fontFamily="'Fredoka One',cursive,sans-serif" fontWeight="700" fill="rgba(255,240,160,.95)">BONUS</text>

    {/* Stick — straight white/pink striped candy cane stick */}
    <rect x="24.5" y="43" width="5" height="18" rx="2.5" fill="white" stroke="rgba(255,100,180,.5)" strokeWidth=".8"/>
    {/* Pink diagonal stripes on stick */}
    {[44.5,47.5,50.5,53.5,56.5].map((y,i)=>(
      <rect key={i} x="24.5" y={y} width="5" height="1.8" rx=".9" fill="#f472b6" opacity=".55"/>
    ))}
    {/* Stick sheen */}
    <rect x="25.5" y="43.5" width="2" height="16" rx="1" fill="rgba(255,255,255,.45)"/>

    {/* Sparkle dots */}
    <circle cx="49" cy="9"  r="2.4" fill="#ffe066" filter="url(#sb_scSp)"/>
    <circle cx="5"  cy="14" r="1.8" fill="#ff69b4" filter="url(#sb_scSp)"/>
    <circle cx="47" cy="39" r="1.6" fill="#c084fc" filter="url(#sb_scSp)"/>
    <circle cx="4"  cy="35" r="1.4" fill="#67e8f9"/>
    <circle cx="46" cy="3"  r="1.1" fill="#fff" opacity=".9"/>
    <circle cx="10" cy="5"  r="1.0" fill="#ffe066" opacity=".8"/>
  </svg>
));

/* ── SB_BombSym — tilted ~40° rainbow swirl ball, bigger for higher vals ── */
const SB_BombSym=React.memo(({val=2})=>{
  // Scale: 2/3=small, 5/10=medium, 25/50=large, 100=XL
  const ballR=val>=100?20:val>=25?18.5:val>=5?17:15.5;
  // Fuse exit point (top of cap), tilted so bomb leans \ ~40°
  // Center of ball at (27, 32), rotated -40° around center
  const cx=27,cy=32;
  return(
    <svg viewBox="0 0 54 58" width="92%" height="92%">
      <defs>
        <radialGradient id={`sb_bm${val}`} cx="34%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#a7f3d0"/>
          <stop offset="18%" stopColor="#34d399"/>
          <stop offset="36%" stopColor="#60a5fa"/>
          <stop offset="54%" stopColor="#c084fc"/>
          <stop offset="72%" stopColor="#f472b6"/>
          <stop offset="100%" stopColor="#ef4444"/>
        </radialGradient>
        <filter id={`sb_bmGl${val}`} x="-28%" y="-28%" width="156%" height="156%">
          <feDropShadow dx="0" dy="3" stdDeviation={val>=25?4:3} floodColor="#60a5fa" floodOpacity=".65"/>
        </filter>
        <clipPath id={`sb_bmCl${val}`}><circle cx={cx} cy={cy} r={ballR}/></clipPath>
      </defs>

      {/* Whole bomb tilted ~40° */}
      <g transform={`rotate(-40,${cx},${cy})`}>
        {/* Ball body */}
        <circle cx={cx} cy={cy} r={ballR} fill={`url(#sb_bm${val})`} filter={`url(#sb_bmGl${val})`}/>

        {/* Rainbow swirl stripes clipped to ball */}
        <g clipPath={`url(#sb_bmCl${val})`}>
          <path d={`M${cx-ballR*.8} ${cy-ballR*.9} C${cx} ${cy-ballR*1.1} ${cx+ballR*.9} ${cy-ballR*.6} ${cx+ballR*.9} ${cy+ballR*.2} C${cx+ballR*.9} ${cy+ballR*.9} ${cx+ballR*.3} ${cy+ballR*1.1} ${cx-ballR*.3} ${cy+ballR*1.1}`}
            fill="none" stroke="rgba(255,50,50,.75)" strokeWidth={ballR*.32} strokeLinecap="round"/>
          <path d={`M${cx-ballR*.9} ${cy-ballR*.5} C${cx-ballR*.1} ${cy-ballR*.9} ${cx+ballR*.8} ${cy-ballR*.4} ${cx+ballR*.8} ${cy+ballR*.4} C${cx+ballR*.8} ${cy+ballR*1.0} ${cx} ${cy+ballR*1.1} ${cx-ballR*.6} ${cy+ballR*1.0}`}
            fill="none" stroke="rgba(255,180,0,.7)" strokeWidth={ballR*.24} strokeLinecap="round"/>
          <path d={`M${cx-ballR*.95} ${cy} C${cx-ballR*.2} ${cy-ballR*.7} ${cx+ballR*.7} ${cy-ballR*.2} ${cx+ballR*.7} ${cy+ballR*.6} C${cx+ballR*.7} ${cy+ballR*.95} ${cx} ${cy+ballR*1.05} ${cx-ballR*.5} ${cy+ballR*.9}`}
            fill="none" stroke="rgba(50,220,130,.65)" strokeWidth={ballR*.18} strokeLinecap="round"/>
          <path d={`M${cx-ballR*.9} ${cy+ballR*.4} C${cx-ballR*.3} ${cy-ballR*.3} ${cx+ballR*.5} ${cy} ${cx+ballR*.5} ${cy+ballR*.7} C${cx+ballR*.5} ${cy+ballR*.9} ${cx} ${cy+ballR*1.0} ${cx-ballR*.4} ${cy+ballR*.8}`}
            fill="none" stroke="rgba(80,150,255,.6)" strokeWidth={ballR*.14} strokeLinecap="round"/>
          <path d={`M${cx-ballR*.7} ${cy+ballR*.7} C${cx-ballR*.2} ${cy+ballR*.2} ${cx+ballR*.3} ${cy+ballR*.5} ${cx+ballR*.3} ${cy+ballR*.85}`}
            fill="none" stroke="rgba(190,80,255,.55)" strokeWidth={ballR*.1} strokeLinecap="round"/>
        </g>

        {/* Sheen */}
        <ellipse cx={cx-ballR*.28} cy={cy-ballR*.32} rx={ballR*.42} ry={ballR*.55} fill="rgba(255,255,255,.28)" transform={`rotate(-20,${cx-ballR*.28},${cy-ballR*.32})`}/>
        <ellipse cx={cx-ballR*.34} cy={cy-ballR*.38} rx={ballR*.18} ry={ballR*.26} fill="rgba(255,255,255,.48)" transform={`rotate(-20,${cx-ballR*.34},${cy-ballR*.38})`}/>
        {/* Ball border */}
        <circle cx={cx} cy={cy} r={ballR} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.2"/>

        {/* Fuse cap — brown cylinder sitting on top of ball */}
        <rect x={cx-5} y={cy-ballR-7} width="10" height="7" rx="3" fill="#795548"/>
        <rect x={cx-5} y={cy-ballR-7} width="10" height="3.5" rx="1.8" fill="#a1887f"/>
        {/* Stripe on cap */}
        <rect x={cx-5} y={cy-ballR-4.5} width="10" height="1.5" rx=".5" fill="rgba(0,0,0,.15)"/>

        {/* Candy cane fuse — curves up-right from cap */}
        <path d={`M${cx} ${cy-ballR-7} C${cx+3} ${cy-ballR-13} ${cx+8} ${cy-ballR-15} ${cx+6} ${cy-ballR-20}`}
          fill="none" stroke="white" strokeWidth="3.8" strokeLinecap="round"/>
        <path d={`M${cx} ${cy-ballR-7} C${cx+3} ${cy-ballR-13} ${cx+8} ${cy-ballR-15} ${cx+6} ${cy-ballR-20}`}
          fill="none" stroke="#e91e8c" strokeWidth="3.8" strokeLinecap="round" strokeDasharray="2.8 2.8"/>
      </g>

      {/* Sparkle at fuse tip — OUTSIDE the rotation so it stays at top */}
      {(()=>{
        // fuse tip in rotated coords: cx+6, cy-ballR-20. Apply -40° rotation around cx,cy
        const tipX_local=cx+6, tipY_local=cy-ballR-20;
        const ang=-40*Math.PI/180;
        const dx=tipX_local-cx, dy=tipY_local-cy;
        const tx=cx+dx*Math.cos(ang)-dy*Math.sin(ang);
        const ty=cy+dx*Math.sin(ang)+dy*Math.cos(ang);
        return(
          <g>
            <circle cx={tx} cy={ty} r="3.2" fill="#ffe066"/>
            <circle cx={tx} cy={ty} r="1.6" fill="#fff" opacity=".9"/>
            {[0,60,120,180,240,300].map((a,i)=>{
              const ar=a*Math.PI/180;
              return <line key={i} x1={tx} y1={ty} x2={tx+Math.cos(ar)*5} y2={ty+Math.sin(ar)*5}
                stroke={i%2===0?"#ffe066":"#ff8c00"} strokeWidth="1.3" strokeLinecap="round"/>;
            })}
          </g>
        );
      })()}

      {/* Multiplier — always upright at bottom of ball */}
      <text x={cx} y={cy+ballR+10} textAnchor="middle"
        fontSize={val>=100?11:val>=25?12.5:val>=10?13.5:14}
        fontFamily="'Fredoka One',cursive,sans-serif" fontWeight="900"
        fill="none" stroke="rgba(0,0,0,.6)" strokeWidth="3" strokeLinejoin="round">{`×${val}`}</text>
      <text x={cx} y={cy+ballR+10} textAnchor="middle"
        fontSize={val>=100?11:val>=25?12.5:val>=10?13.5:14}
        fontFamily="'Fredoka One',cursive,sans-serif" fontWeight="900"
        fill="#fff">{`×${val}`}</text>
    </svg>
  );
});

/* ── SB_Banana — yellow banana ── */
const SB_Banana=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="90%" height="90%">
    <defs>
      <radialGradient id="sb_bnA" cx="36%" cy="24%" r="72%">
        <stop offset="0%" stopColor="#fffde7"/><stop offset="25%" stopColor="#ffee58"/>
        <stop offset="65%" stopColor="#f9a825"/><stop offset="100%" stopColor="#e65100"/>
      </radialGradient>
      <filter id="sb_bnGlow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f59e0b" floodOpacity=".55"/></filter>
    </defs>
    {/* Banana body */}
    <path d="M12 40 C10 27 12 13 22 7 C32 1 43 6 43 17 C42 28 33 38 22 42 C17 44 13 42 12 40Z"
      fill="url(#sb_bnA)" filter="url(#sb_bnGlow)"/>
    {/* Center line */}
    <path d="M12 40 C13 28 16 14 25 8.5" fill="none" stroke="rgba(180,90,0,.4)" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Bottom tip */}
    <path d="M12 40 L9 43 Q11 46.5 14 43Z" fill="#8b4513"/>
    {/* Top tip */}
    <path d="M43 17 L46 14 Q47 17 45 19.5Z" fill="#8b4513"/>
    {/* Sheen */}
    <ellipse cx="20" cy="14" rx="7" ry="10" fill="rgba(255,255,255,.4)" transform="rotate(-32,20,14)"/>
    <ellipse cx="18" cy="12" rx="3" ry="4.5" fill="rgba(255,255,255,.55)" transform="rotate(-32,18,12)"/>
  </svg>
));

/* ── SB Constants ── */
const SB_ROWS=5,SB_COLS=6;
const SB_BOMBS_LIST=[{s:"b2",v:2},{s:"b3",v:3},{s:"b5",v:5},{s:"b10",v:10},{s:"b25",v:25},{s:"b50",v:50},{s:"b100",v:100}];
const SB_BOMB_VAL={b2:2,b3:3,b5:5,b10:10,b25:25,b50:50,b100:100};
// Bomb weights: each higher tier is ~60% rarer than previous. Scatter is more rare too (1.4 base / 3.5 ante / 0.9 bonus)
// Weights: fruit symbols, scatter, bombs
// scatter reduced -17% from original; small bombs (b2,b3,b5) boosted +13% in bonus
const SB_NW={banana:12,grape:11,watermelon:10,apple:9,candy1:7,candy2:6,candy3:5,candy4:4,scatter:1.16};
const SB_AW={banana:12,grape:11,watermelon:10,apple:9,candy1:7,candy2:6,candy3:5,candy4:4,scatter:2.9};
const SB_BW={banana:13,grape:12,watermelon:11,apple:10,candy1:8,candy2:7,candy3:6,candy4:5,scatter:0.75,b2:3.16,b3:1.92,b5:1.13,b10:0.55,b25:0.28,b50:0.12,b100:0.04};
const SB_PAY={
  banana:    [[8,.5],[10,.8],[12,1.5],[15,2],[20,5],[25,10]],
  grape:     [[8,.6],[10,1],[12,2],[15,3],[20,8],[25,15]],
  watermelon:[[8,.8],[10,1.5],[12,3],[15,5],[20,15],[25,30]],
  apple:     [[8,1],[10,2],[12,4],[15,8],[20,20],[25,40]],
  candy1:    [[8,1.5],[10,3],[12,6],[15,15],[20,50],[25,100]],
  candy2:    [[8,2],[10,5],[12,10],[15,25],[20,100],[25,200]],
  candy3:    [[8,3],[10,8],[12,15],[15,40],[20,150],[25,300]],
  candy4:    [[8,5],[10,12],[12,25],[15,75],[20,250],[25,500]],
};
const SB_SYMS={
  banana:{name:"Banana",render:()=><SB_Banana/>},
  grape:{name:"Plum",render:()=><SB_Grape/>},
  watermelon:{name:"Melon",render:()=><SB_Watermelon/>},
  apple:{name:"Apple",render:()=><SB_Apple/>},
  candy1:{name:"Heart",render:()=><SB_Candy1/>},
  candy2:{name:"Cube",render:()=><SB_Candy2/>},
  candy3:{name:"Pentagon",render:()=><SB_Candy3/>},
  candy4:{name:"Pill",render:()=><SB_Candy4/>},
  scatter:{name:"Lollipop",render:()=><SB_Scatter/>},
  b2:{name:"×2",render:()=><SB_BombSym val={2}/>},
  b3:{name:"×3",render:()=><SB_BombSym val={3}/>},
  b5:{name:"×5",render:()=><SB_BombSym val={5}/>},
  b10:{name:"×10",render:()=><SB_BombSym val={10}/>},
  b25:{name:"×25",render:()=><SB_BombSym val={25}/>},
  b50:{name:"×50",render:()=><SB_BombSym val={50}/>},
  b100:{name:"×100",render:()=><SB_BombSym val={100}/>},
};

/* ── Helpers ── */
function sbPick(w){const tot=Object.values(w).reduce((a,b)=>a+b,0);let r=Math.random()*tot;for(const[k,v]of Object.entries(w)){r-=v;if(r<=0)return k;}return Object.keys(w)[0];}
// Pick a non-scatter, non-bomb symbol (for column dedup)
function sbPickNoBonusSym(w){const w2={...w};delete w2.scatter;Object.keys(w2).forEach(k=>{if(sbIsBomb(k))delete w2[k];});return sbPick(w2);}
// Column-aware grid gen: max 1 scatter per column, max 1 bomb per column
function sbGenGrid(isBonus=false,anteBet=false){
  const wt=isBonus?SB_BW:anteBet?SB_AW:SB_NW;
  const grid=Array.from({length:SB_ROWS},()=>Array(SB_COLS).fill(null));
  for(let c=0;c<SB_COLS;c++){
    let hasScatter=false,hasBomb=false;
    for(let r=0;r<SB_ROWS;r++){
      let s=sbPick(wt);
      if(s==="scatter"){if(hasScatter){s=sbPickNoBonusSym(wt);}else{hasScatter=true;}}
      else if(sbIsBomb(s)){if(hasBomb){s=sbPickNoBonusSym(wt);}else{hasBomb=true;}}
      grid[r][c]=s;
    }
  }
  return grid;
}
function sbSymPay(sym,count){const t=SB_PAY[sym];if(!t)return 0;let p=0;for(const[min,mult]of t){if(count>=min)p=mult;}return p;}
function sbIsBomb(s){return s&&s in SB_BOMB_VAL;}
function sbFindWinners(grid){
  const counts={};
  grid.forEach(row=>row.forEach(s=>{if(s&&s!=="scatter"&&!sbIsBomb(s))counts[s]=(counts[s]||0)+1;}));
  return Object.entries(counts).filter(([,c])=>c>=8).map(([s])=>s);
}
// Gravity with drop-distance tracking: returns {ng: new grid, dd: drop distances per cell}
function sbGravityTracked(grid){
  const ng=Array.from({length:SB_ROWS},()=>Array(SB_COLS).fill(null));
  const dd=Array.from({length:SB_ROWS},()=>Array(SB_COLS).fill(0));
  for(let c=0;c<SB_COLS;c++){
    const col=[];
    for(let r=0;r<SB_ROWS;r++){if(grid[r][c]!==null)col.push({s:grid[r][c],or:r});}
    const sr=SB_ROWS-col.length;
    for(let i=0;i<col.length;i++){const nr=sr+i;ng[nr][c]=col[i].s;dd[nr][c]=nr-col[i].or;}
  }
  return{ng,dd};
}
function sbFillGrid(grid,isBonus,anteBet){
  const wt=isBonus?SB_BW:anteBet?SB_AW:SB_NW;
  const colHasScatter=Array(SB_COLS).fill(false);
  const colHasBomb=Array(SB_COLS).fill(false);
  for(let c=0;c<SB_COLS;c++){
    for(let r=0;r<SB_ROWS;r++){
      if(grid[r][c]==="scatter")colHasScatter[c]=true;
      if(sbIsBomb(grid[r][c]))colHasBomb[c]=true;
    }
  }
  return grid.map((row)=>row.map((cell,c)=>{
    if(cell!==null)return cell;
    let s=sbPick(wt);
    if(s==="scatter"){if(colHasScatter[c]){s=sbPickNoBonusSym(wt);}else{colHasScatter[c]=true;}}
    else if(sbIsBomb(s)){if(colHasBomb[c]){s=sbPickNoBonusSym(wt);}else{colHasBomb[c]=true;}}
    return s;
  }));
}
// Fall duration ms from drop distance
function sbFallDur(drop){return drop>=(SB_ROWS+2)?490:Math.max(170,drop*72+150);}
// Initial spin per-cell delay: stagger left-right, top row lands last
function sbInitDelay(r,c){return c*52+(SB_ROWS-1-r)*18;}


function SweetBonanzaGame({balance,setBalance,setPage}){
  const [grid,setGrid]=useState(()=>sbGenGrid(false,false));
  const [bet,setBet]=useState(1.00);
  const [anteBet,setAnteBet]=useState(false);
  const [spinning,setSpinning]=useState(false);
  const [winCells,setWinCells]=useState(new Set());
  const [removeCells,setRemoveCells]=useState(new Set());
  const [winAmt,setWinAmt]=useState(0);
  const [totalWin,setTotalWin]=useState(0);
  const [cascade,setCascade]=useState(0);
  const [bonusPhase,setBonusPhase]=useState(null);
  const [freeSpins,setFreeSpins]=useState(0);
  const [freeSpinsLeft,setFreeSpinsLeft]=useState(0);
  const [bonusWin,setBonusWin]=useState(0);
  const [runningMult,setRunningMult]=useState(0);
  const [scatterCount,setScatterCount]=useState(0);
  const [flashG,setFlashG]=useState(false);
  const [flashR,setFlashR]=useState(false);
  const [bigWin,setBigWin]=useState(null);
  const [cellKeys,setCellKeys]=useState(()=>Array.from({length:SB_ROWS},(_,r)=>Array.from({length:SB_COLS},(_,c)=>`${r}${c}0`)));
  const [cellDropDist,setCellDropDist]=useState(()=>Array.from({length:SB_ROWS},()=>Array(SB_COLS).fill(SB_ROWS+3)));
  const [stats,setStats]=useState({spins:0,wins:0,biggest:0,totalWon:0,totalBet:0});
  const [sbStatsModal,setSbStatsModal]=useState({profit:0,wagered:0,wins:0,losses:0,history:[0]});
  const [recentWins,setRecentWins]=useState([]);
  const [showStats,setShowStats]=useState(false);
  const [bombAnimMults,setBombAnimMults]=useState([]); // [{r,c,val,key}] for bomb explosion anim
  const [sbShowWin,setSbShowWin]=useState(false); // show win banner for sub-30x wins
  const [showBuyModal,setShowBuyModal]=useState(false);
  const [buyBonusActive,setBuyBonusActive]=useState(false);
  const spinningRef=useRef(false);
  const freeSpinsCountRef=useRef(0);

  const effectiveBet=anteBet?+(bet*1.25).toFixed(2):bet;
  // Free spins always pay on base bet — ante is only for triggering probability, not bonus value
  const spinBet=(isFS)=>isFS?bet:effectiveBet;
  const sleep=ms=>new Promise(res=>setTimeout(res,ms));

  async function doBuyBonusSpin(numSpins){
    if(spinningRef.current)return;
    spinningRef.current=true;
    setSpinning(true);
    setBuyBonusActive(true);
    setWinCells(new Set());setRemoveCells(new Set());setTotalWin(0);setCascade(0);setWinAmt(0);setSbShowWin(false);

    // Build grid with exactly 4 scatters spread nicely, rest random
    const picks=[[0,1],[1,4],[2,2],[3,5]];
    const scSet=new Set(picks.map(([r,c])=>`${r}-${c}`));
    const g=Array.from({length:SB_ROWS},(_,r)=>Array.from({length:SB_COLS},(_,c)=>scSet.has(`${r}-${c}`)?"scatter":sbPickNoBonusSym(SB_NW)));
    const initDrop=Array.from({length:SB_ROWS},(_,r)=>Array.from({length:SB_COLS},(_,c)=>({drop:SB_ROWS+3,delay:sbInitDelay(r,c)})));
    setCellDropDist(initDrop);
    setCellKeys(Array.from({length:SB_ROWS},(_,r)=>Array.from({length:SB_COLS},(_,c)=>`${r}${c}bb${Date.now()}`)));
    setGrid(g.map(r=>[...r]));
    const maxInitWait=(SB_COLS-1)*52+(SB_ROWS-1)*18+490;
    await sleep(maxInitWait);

    // Highlight scatter cells one by one with sound
    const scatterCells=new Set(picks.map(([r,c])=>`${r}-${c}`));
    setWinCells(scatterCells);
    picks.forEach((_,i)=>sfx.scatterPing(i));
    await sleep(480);

    // Trigger overlay + big sound
    sfx.bonusLand();
    setScatterCount(4);setBonusPhase("trigger");
    await sleep(2600);

    setWinCells(new Set());
    setBuyBonusActive(false);
    freeSpinsCountRef.current=numSpins;
    setFreeSpins(numSpins);setFreeSpinsLeft(numSpins);setBonusWin(0);setBonusPhase("spins");
    spinningRef.current=false;setSpinning(false);
  }

  async function doSpin(isFS=false){
    if(spinningRef.current)return;
    spinningRef.current=true;
    setSpinning(true);
    setWinCells(new Set());setRemoveCells(new Set());setTotalWin(0);setCascade(0);setWinAmt(0);setSbShowWin(false);

    const activeBet=isFS?bet:effectiveBet;
    const cost=isFS?0:effectiveBet;
    if(!isFS){setBalance(b=>+(b-cost).toFixed(2));setStats(s=>({...s,spins:s.spins+1,totalBet:+(s.totalBet+cost).toFixed(2)}));}

    // Generate new grid — all symbols drop from above (large drop distance + staggered delay per column)
    let g=sbGenGrid(isFS,anteBet);
    const initDropWithDelay=Array.from({length:SB_ROWS},(_,r)=>Array.from({length:SB_COLS},(_,c)=>({drop:SB_ROWS+3,delay:sbInitDelay(r,c)})));
    setCellDropDist(initDropWithDelay);
    setCellKeys(Array.from({length:SB_ROWS},(_,r)=>Array.from({length:SB_COLS},(_,c)=>`${r}${c}${Date.now()}`)));
    setGrid(g.map(r=>[...r]));

    // Wait for all symbols to land: last col delay + top row delay + fall duration
    const maxInitWait=(SB_COLS-1)*52+(SB_ROWS-1)*18+510;
    await sleep(maxInitWait);

    // Base game scatter check
    if(!isFS){
      const sc=g.flat().filter(s=>s==="scatter").length;
      if(sc>=4){
        setScatterCount(sc);setBonusPhase("trigger");
        sfx.win(4);
        await sleep(2200);
        const spinsAward=10+Math.max(0,(sc-4)*5);
        freeSpinsCountRef.current=spinsAward;
        setFreeSpins(spinsAward);setFreeSpinsLeft(spinsAward);setBonusWin(0);setBonusPhase("spins");
        spinningRef.current=false;setSpinning(false);return;
      }
    } else {
      const sc=g.flat().filter(s=>s==="scatter").length;
      if(sc>=4){
        const bonus=5+Math.max(0,(sc-4)*5);
        setFreeSpinsLeft(prev=>prev+bonus);setFreeSpins(prev=>{const n=prev+bonus;freeSpinsCountRef.current=n;return n;});
        sfx.win(2);
      }
    }

    // CASCADE LOOP — bombs stay on grid until no more wins, then collected at end
    let spinTotal=0,cascN=0;
    // Bonus spins slow everything down
    const cascWait=isFS?820:620;
    const removeWait=isFS?400:320;

    while(true){
      const winners=sbFindWinners(g);
      if(winners.length===0)break;

      const counts={};const wCells=new Set();
      g.forEach((row,r)=>row.forEach((s,c)=>{if(s&&winners.includes(s)){wCells.add(`${r}-${c}`);counts[s]=(counts[s]||0)+1;}}));
      setWinCells(wCells);

      let roundWin=0;
      for(const sym of winners)roundWin+=sbSymPay(sym,counts[sym])*activeBet;
      spinTotal+=roundWin;cascN++;setCascade(cascN);setWinAmt(roundWin);
      if(roundWin>0)sfx.gem(Math.min(roundWin/activeBet,3));
      await sleep(cascWait);

      setRemoveCells(wCells);await sleep(removeWait);

      // Remove winners
      for(let r=0;r<SB_ROWS;r++)for(let c=0;c<SB_COLS;c++){
        if(wCells.has(`${r}-${c}`))g[r][c]=null;
      }

      // Gravity with tracking
      const{ng,dd}=sbGravityTracked(g);
      g=ng;

      // Track null positions (need new symbols)
      const nullPos=new Set();
      for(let r=0;r<SB_ROWS;r++)for(let c=0;c<SB_COLS;c++){if(g[r][c]===null)nullPos.add(`${r}-${c}`);}
      g=sbFillGrid(g,isFS,anteBet);

      const cascDropDist=Array.from({length:SB_ROWS},(_,r)=>Array.from({length:SB_COLS},(_,c)=>{
        if(nullPos.has(`${r}-${c}`))return{drop:SB_ROWS+3,delay:c*(isFS?55:38)};
        if(dd[r][c]>0)return{drop:dd[r][c],delay:c*(isFS?30:22)};
        return{drop:0,delay:0};
      }));
      setCellDropDist(cascDropDist);

      setCellKeys(prev=>prev.map((row,r)=>row.map((k,c)=>{
        if(nullPos.has(`${r}-${c}`)||dd[r][c]>0)return `${r}${c}${Date.now()}c${cascN}`;
        return k;
      })));
      setRemoveCells(new Set());setWinCells(new Set());setGrid(g.map(row=>[...row]));

      const maxCascWait=(SB_COLS-1)*(isFS?55:38)+sbFallDur(SB_ROWS+3)+(isFS?90:60);
      await sleep(maxCascWait);

      // ── SCATTER CHECK after every tumble (catches scatters that land during cascades) ──
      if(!isFS){
        const sc=g.flat().filter(s=>s==="scatter").length;
        if(sc>=4){
          // Apply any winnings so far before triggering bonus
          if(spinTotal>0){
            setTotalWin(+spinTotal.toFixed(2));setBalance(b=>+(b+spinTotal).toFixed(2));
            setStats(s=>({...s,wins:s.wins+1,biggest:Math.max(s.biggest,spinTotal),totalWon:+(s.totalWon+spinTotal).toFixed(2)}));
            setSbStatsModal(s=>({profit:+(s.profit+spinTotal-cost).toFixed(2),wagered:+(s.wagered+cost).toFixed(2),wins:s.wins+1,losses:s.losses,history:[...s.history,+(s.profit+spinTotal-cost).toFixed(2)]}));
          }
          setScatterCount(sc);setBonusPhase("trigger");
          sfx.win(4);
          await sleep(2200);
          const spinsAward=10+Math.max(0,(sc-4)*5);
          freeSpinsCountRef.current=spinsAward;
          setFreeSpins(spinsAward);setFreeSpinsLeft(spinsAward);setBonusWin(0);setBonusPhase("spins");
          spinningRef.current=false;setSpinning(false);return;
        }
      } else {
        // During free spins: check for retrigger scatters after each tumble too
        const sc=g.flat().filter(s=>s==="scatter").length;
        if(sc>=4){
          const bonus=5+Math.max(0,(sc-4)*5);
          setFreeSpinsLeft(prev=>prev+bonus);
          setFreeSpins(prev=>{const n=prev+bonus;freeSpinsCountRef.current=n;return n;});
          sfx.win(2);
        }
      }
    }

    // ── COLLECT BOMBS — ONLY if there were actual wins (spinTotal > 0) ──
    let localMult=0;
    const bombPositions=[]; // [{r,c,val}]
    for(let r=0;r<SB_ROWS;r++)for(let c=0;c<SB_COLS;c++){
      if(sbIsBomb(g[r][c])){
        if(spinTotal>0){
          bombPositions.push({r,c,val:SB_BOMB_VAL[g[r][c]]});
          localMult+=SB_BOMB_VAL[g[r][c]];
          // Remove bomb from grid only when there's a win
          g[r][c]=null;
        }
        // On dead spin: bombs stay on grid, are NOT removed
      }
    }

    if(bombPositions.length>0&&spinTotal>0){
      // Animate each bomb exploding sequentially
      let accMult=0;
      for(let i=0;i<bombPositions.length;i++){
        const{r,c,val}=bombPositions[i];
        const bombFlash=new Set([`${r}-${c}`]);
        setWinCells(bombFlash);
        accMult+=val;
        setRunningMult(accMult);
        sfx.boom();
        setBombAnimMults(prev=>[...prev,{r,c,val,key:Date.now()+i}]);
        await sleep(420);
      }
      setGrid(g.map(row=>[...row]));
      await sleep(500);
      setWinCells(new Set());
      setBombAnimMults([]);
    } else {
      setGrid(g.map(row=>[...row]));
      setRunningMult(0);
    }

    // Apply multiplier
    const finalWin=localMult>0?+(spinTotal*localMult).toFixed(2):+spinTotal.toFixed(2);
    if(localMult>0)setTimeout(()=>setRunningMult(0),900);

    if(finalWin>0){
      setTotalWin(finalWin);setBalance(b=>+(b+finalWin).toFixed(2));
      setFlashG(true);setTimeout(()=>setFlashG(false),500);
      sfx.win(Math.min(finalWin/activeBet,5));
      setStats(s=>({...s,wins:s.wins+1,biggest:Math.max(s.biggest,finalWin),totalWon:+(s.totalWon+finalWin).toFixed(2)}));
      setSbStatsModal(s=>({profit:+(s.profit+finalWin-cost).toFixed(2),wagered:+(s.wagered+cost).toFixed(2),wins:s.wins+1,losses:s.losses,history:[...s.history,+(s.profit+finalWin-cost).toFixed(2)]}));
      setRecentWins(rw=>[{val:finalWin,mult:+(finalWin/activeBet).toFixed(1),bonus:isFS},...rw.slice(0,9)]);
      if(isFS)setBonusWin(prev=>+(prev+finalWin).toFixed(2));
      // Big win check: any win >= 30x base bet
      const winMult=finalWin/activeBet;
      if(winMult>=30){
        setBigWin({target:finalWin,mult:+winMult.toFixed(1)});
        setTimeout(()=>setBigWin(null),5800);
      } else if(finalWin>0){
        // Show win banner for smaller wins
        setSbShowWin(true);
        setTimeout(()=>setSbShowWin(false),2200);
      }
    }else if(!isFS&&spinTotal===0){
      setFlashR(true);setTimeout(()=>setFlashR(false),500);sfx.lose();
      setSbStatsModal(s=>({...s,profit:+(s.profit-cost).toFixed(2),wagered:+(s.wagered+cost).toFixed(2),losses:s.losses+1,history:[...s.history,+(s.profit-cost).toFixed(2)]}));
    }

    if(isFS){
      setFreeSpinsLeft(prev=>{
        const next=prev-1;
        if(next<=0)setTimeout(()=>setBonusPhase("end"),700);
        return Math.max(0,next);
      });
    }
    spinningRef.current=false;setSpinning(false);
  }

  function endBonus(){
    // No big win animation on Continue — it was already shown during the bonus
    setBonusPhase(null);setRunningMult(0);setFreeSpins(0);setFreeSpinsLeft(0);
    const eg=sbGenGrid(false,anteBet);
    setGrid(eg);
    setCellDropDist(Array.from({length:SB_ROWS},()=>Array(SB_COLS).fill({drop:SB_ROWS+3,delay:0})));
    setCellKeys(Array.from({length:SB_ROWS},(_,r)=>Array.from({length:SB_COLS},(_,c)=>`${r}${c}end${Date.now()}`)));
  }

  function buyBonus(){
    const cost=+(bet*100).toFixed(2);
    if(cost>balance)return;
    sfx.click();setBalance(b=>+(b-cost).toFixed(2));
    setStats(s=>({...s,spins:s.spins+1,totalBet:+(s.totalBet+cost).toFixed(2)}));
    setSbStatsModal(s=>({...s,wagered:+(s.wagered+cost).toFixed(2),profit:+(s.profit-cost).toFixed(2),history:[...s.history,+(s.profit-cost).toFixed(2)]}));
    setShowBuyModal(false);
    doBuyBonusSpin(10);
  }

  const isBonus=bonusPhase==="spins";

  const SB_CSS=`
    @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
    .sb-game{display:flex;flex-direction:column;flex:1;overflow:hidden;isolation:isolate;
      background:radial-gradient(ellipse at 50% -10%,#4a0080 0%,#1e0050 40%,#0d0025 100%);
      position:relative;}
    .sb-game::before{content:'';position:absolute;inset:0;
      background:
        radial-gradient(circle at 15% 25%,rgba(255,20,147,.1) 0%,transparent 45%),
        radial-gradient(circle at 85% 75%,rgba(120,0,220,.12) 0%,transparent 45%),
        radial-gradient(circle at 50% 110%,rgba(255,100,200,.08) 0%,transparent 50%),
        url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='rgba(255,255,255,0.03)'/%3E%3C/svg%3E");
      pointer-events:none;z-index:0;}
    /* Floating candy particles */
    .sb-candy-float{position:absolute;pointer-events:none;z-index:0;font-size:1.2rem;animation:sbCandyFloat var(--dur,8s) var(--del,0s) linear infinite;opacity:.18;left:var(--lft,50%);}
    @keyframes sbCandyFloat{0%{transform:translateY(100vh) rotate(0deg)}100%{transform:translateY(-120px) rotate(360deg)}}
    .sb-topbar{display:flex;align-items:center;justify-content:space-between;padding:8px 16px;
      background:rgba(6,0,18,.98);border-bottom:2px solid transparent;
      background-clip:padding-box;
      backdrop-filter:blur(20px);flex-shrink:0;z-index:10;position:relative;}
    .sb-topbar::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;
      background:linear-gradient(90deg,transparent,rgba(255,20,147,.7),rgba(255,220,60,.8),rgba(255,100,200,.7),rgba(255,20,147,.7),transparent);}
    .sb-title{font-family:'Fredoka One',cursive;font-size:1.22rem;color:#ff69b4;
      text-shadow:0 0 28px rgba(255,0,150,.9),0 0 60px rgba(255,0,150,.25),0 2px 4px rgba(0,0,0,.9);letter-spacing:.06em;}
    .sb-main{display:flex;flex:1;overflow:hidden;position:relative;z-index:1;}
    .sb-ctrl{width:190px;flex-shrink:0;background:rgba(5,0,18,.96);border-right:1px solid rgba(255,20,147,.12);
      display:flex;flex-direction:column;gap:0;padding:12px 10px;overflow-y:auto;scrollbar-width:none;}
    .sb-ctrl::-webkit-scrollbar{display:none;}
    .sb-arena{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6px 10px 4px;gap:5px;overflow:hidden;position:relative;}
    /* Frame — constrained to fit */
    .sb-frame{position:relative;border-radius:22px;padding:8px;
      background:rgba(255,20,147,.04);
      box-shadow:0 0 80px rgba(255,0,150,.18),0 0 40px rgba(100,0,200,.15),inset 0 0 60px rgba(0,0,35,.65);
      flex-shrink:0;}
    .sb-frame::before{content:'';position:absolute;inset:-2px;border-radius:24px;
      background:linear-gradient(135deg,#ff1493,#9b59b6,#ffe066,#ff6eb4,#00d4ff,#ff1493);
      background-size:300% 300%;animation:sbFrameShimmer 4s linear infinite;z-index:-1;filter:blur(1px);}
    @keyframes sbFrameShimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    .sb-grid{display:grid;contain:layout style paint;touch-action:none;grid-template-columns:repeat(6,1fr);gap:4px;width:min(470px,calc(100vh - 260px));}
    /* Cell with glassy Sweet-Bonanza look */
    .sb-cell{position:relative;will-change:transform,opacity;border-radius:16px;
      background:linear-gradient(145deg,rgba(25,0,60,.82),rgba(8,0,30,.9));
      border:1.5px solid rgba(255,100,200,.16);
      display:flex;align-items:center;justify-content:center;
      overflow:hidden;aspect-ratio:1;min-width:0;
      transition:border-color .2s,box-shadow .2s;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 4px 10px rgba(0,0,0,.5);}
    .sb-cell::after{content:'';position:absolute;inset:0;
      background:linear-gradient(145deg,rgba(255,255,255,.07) 0%,transparent 55%);
      border-radius:14px;pointer-events:none;}
    .sb-cell.win{border-color:rgba(255,220,0,.98)!important;
      background:linear-gradient(145deg,rgba(70,50,0,.98),rgba(35,25,0,.99))!important;
      box-shadow:inset 0 0 22px rgba(255,200,0,.38),0 0 22px rgba(255,200,0,.32),0 0 8px rgba(255,200,0,.2);
      animation:sbWinPulse .45s ease infinite;}
    .sb-cell.removing{animation:sbRemove .38s cubic-bezier(.55,.06,.68,.19) forwards!important;}
    .sb-cell.bomb-cell{border-color:rgba(200,100,255,.55)!important;
      box-shadow:inset 0 0 18px rgba(150,50,255,.3),0 0 18px rgba(150,50,255,.25);
      animation:sbBombGlow 1.6s ease infinite;}
    /* Scatter cell — special golden aura */
    .sb-cell.scatter-cell{
      border-color:rgba(255,215,0,.95)!important;
      background:linear-gradient(145deg,rgba(60,36,0,.96),rgba(25,12,0,.98))!important;
      box-shadow:inset 0 0 30px rgba(255,200,0,.35),0 0 36px rgba(255,180,0,.65),0 0 70px rgba(255,80,200,.3),0 0 110px rgba(255,150,0,.18)!important;
      animation:sbScatterCellGlow 1.1s ease infinite;
    }
    @keyframes sbScatterCellGlow{
      0%,100%{box-shadow:inset 0 0 28px rgba(255,200,0,.32),0 0 30px rgba(255,180,0,.55),0 0 60px rgba(255,80,200,.25);}
      50%{box-shadow:inset 0 0 50px rgba(255,210,0,.55),0 0 55px rgba(255,200,0,.85),0 0 100px rgba(255,100,200,.42);}
    }
    .sb-cell.bomb-explode{animation:sbBombExplode .5s cubic-bezier(.25,.46,.45,.94) forwards!important;
      border-color:rgba(255,200,0,.99)!important;
      box-shadow:0 0 40px rgba(255,200,0,.7),0 0 80px rgba(255,100,0,.4)!important;}
    /* Bomb multiplier pop */
    .sb-bomb-pop{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
      font-family:'Fredoka One',cursive;font-size:1.15rem;color:#ffe066;
      text-shadow:0 0 20px rgba(255,200,0,.9),0 0 40px rgba(255,100,0,.5);
      white-space:nowrap;z-index:20;pointer-events:none;
      animation:sbBombPopAnim .8s cubic-bezier(.22,1,.36,1) forwards;}
    @keyframes sbBombPopAnim{
      0%{opacity:0;transform:translate(-50%,-50%) scale(.2) rotate(-15deg)}
      40%{opacity:1;transform:translate(-50%,-80%) scale(1.3) rotate(5deg)}
      70%{opacity:.9;transform:translate(-50%,-120%) scale(1.05) rotate(-2deg)}
      100%{opacity:0;transform:translate(-50%,-160%) scale(.9) rotate(0)}
    }
    /* Running mult counter */
    .sb-bomb-tally{position:absolute;top:8px;right:8px;
      font-family:'Fredoka One',cursive;font-size:1.5rem;color:#ffe066;
      text-shadow:0 0 24px rgba(255,180,0,.9),0 0 48px rgba(255,100,0,.5);
      background:rgba(0,0,0,.55);border-radius:10px;padding:4px 12px;
      border:1.5px solid rgba(255,200,0,.4);z-index:15;pointer-events:none;
      animation:sbBombTallyIn .35s cubic-bezier(.34,1.5,.64,1);}
    @keyframes sbBombTallyIn{0%{transform:scale(.5);opacity:0}100%{transform:scale(1);opacity:1}}
    .sb-sym{width:100%;height:100%;display:flex;align-items:center;justify-content:center;
      animation:sbFall var(--fdur,490ms) cubic-bezier(.15,1.2,.5,1) both;
      animation-delay:var(--fdelay,0ms);
      filter:drop-shadow(0 3px 6px rgba(0,0,0,.7));will-change:transform;}
    .sb-hud{display:flex;gap:6px;align-items:stretch;width:100%;max-width:700px;}
    .sb-hud-box{background:linear-gradient(145deg,rgba(8,0,28,.95),rgba(4,0,18,.98));
      border:1px solid rgba(255,20,147,.22);border-radius:12px;
      padding:7px 10px;display:flex;flex-direction:column;align-items:center;gap:2px;
      min-width:58px;flex:1;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 4px 12px rgba(0,0,0,.4);}
    .sb-hud-lbl{font-size:.5rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,100,200,.45);}
    .sb-hud-val{font-family:'Fredoka One',cursive;font-size:1rem;color:#ff69b4;text-shadow:0 0 12px rgba(255,0,150,.5);font-variant-numeric:tabular-nums;}
    .sb-hud-val.green{color:#44ff88;text-shadow:0 0 14px rgba(0,255,100,.55);}
    .sb-hud-val.gold{color:#ffe066;text-shadow:0 0 18px rgba(255,200,0,.75);animation:sbGoldPulse 1s ease infinite;}
    .sb-spin-btn{width:100%;padding:16px;border-radius:50px;border:none;
      font-family:'Fredoka One',cursive;font-size:1.08rem;cursor:pointer;
      transition:all .2s cubic-bezier(.34,1.2,.64,1);
      background:linear-gradient(135deg,#c2185b,#e91e8c,#f06292,#ff8aa0);
      color:#fff;
      box-shadow:0 6px 32px rgba(200,24,120,.55),0 2px 0 rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.22),inset 0 -2px 0 rgba(0,0,0,.18);
      letter-spacing:.08em;position:relative;overflow:hidden;}
    .sb-spin-btn::before{content:'';position:absolute;top:0;left:0;right:0;height:50%;
      background:linear-gradient(to bottom,rgba(255,255,255,.12),transparent);
      border-radius:50px 50px 0 0;pointer-events:none;}
    .sb-spin-btn:hover:not(:disabled){transform:translateY(-2px) scale(1.03);
      box-shadow:0 10px 42px rgba(220,24,120,.72),0 2px 0 rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.22);}
    .sb-spin-btn:active:not(:disabled){transform:scale(.97) translateY(1px);
      box-shadow:0 3px 16px rgba(200,24,120,.45),inset 0 2px 4px rgba(0,0,0,.2);}
    .sb-spin-btn:disabled{background:linear-gradient(135deg,#1f2937,#374151);color:rgba(255,255,255,.25);cursor:not-allowed;box-shadow:none;}
    .sb-fs-btn{width:100%;padding:16px;border-radius:50px;border:none;
      font-family:'Fredoka One',cursive;font-size:1.08rem;cursor:pointer;
      background:linear-gradient(135deg,#e65100,#ff8f00,#ffb300,#ffd54f);
      color:#1a0800;
      box-shadow:0 6px 32px rgba(255,140,0,.52),0 2px 0 rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.3),inset 0 -2px 0 rgba(0,0,0,.12);
      transition:all .2s cubic-bezier(.34,1.2,.64,1);letter-spacing:.08em;position:relative;overflow:hidden;}
    .sb-fs-btn::before{content:'';position:absolute;top:0;left:0;right:0;height:50%;
      background:linear-gradient(to bottom,rgba(255,255,255,.18),transparent);
      border-radius:50px 50px 0 0;pointer-events:none;}
    .sb-fs-btn:hover:not(:disabled){transform:translateY(-2px) scale(1.03);box-shadow:0 10px 42px rgba(255,150,0,.68);}
    .sb-fs-btn:disabled{background:linear-gradient(135deg,#1f2937,#374151);color:rgba(255,255,255,.25);cursor:not-allowed;box-shadow:none;}
    @keyframes sbSpin360{to{transform:rotate(360deg)}}
    .sb-sec{font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,100,200,.45);padding:2px 0;}
    .sb-sep{height:1px;background:linear-gradient(90deg,transparent,rgba(255,20,147,.18),transparent);margin:2px 0;}
    .sb-stat{display:flex;justify-content:space-between;align-items:center;padding:4px 8px;
      background:rgba(6,0,20,.78);border-radius:8px;border:1px solid rgba(255,20,147,.08);}
    .sb-stat-l{font-size:.58rem;color:rgba(255,100,200,.48);font-weight:600;}
    .sb-stat-v{font-size:.7rem;font-weight:700;font-variant-numeric:tabular-nums;}
    .sb-bet-input{width:100%;background:rgba(6,0,20,.95);border:1px solid rgba(255,20,147,.32);
      border-radius:10px;padding:9px 28px 9px 24px;color:#ff69b4;
      font-family:'Fredoka One',cursive;font-size:.95rem;font-weight:700;
      outline:none;text-align:center;-moz-appearance:textfield;
      box-shadow:inset 0 2px 8px rgba(0,0,0,.45);transition:border-color .15s,box-shadow .15s;}
    .sb-bet-input:focus{border-color:rgba(255,20,147,.6);box-shadow:inset 0 2px 8px rgba(0,0,0,.45),0 0 0 3px rgba(255,20,147,.15);}
    .sb-bet-input::-webkit-outer-spin-button,.sb-bet-input::-webkit-inner-spin-button{-webkit-appearance:none;}
    .sb-bet-row{display:grid;grid-template-columns:1fr 1fr;gap:4px;}
    .sb-bet-btn{padding:6px 2px;border-radius:8px;border:1px solid rgba(255,20,147,.18);
      background:rgba(255,20,147,.07);color:rgba(255,120,200,.75);
      font-family:var(--f);font-size:.63rem;font-weight:700;cursor:pointer;text-align:center;transition:all .12s;}
    .sb-bet-btn:hover{background:rgba(255,20,147,.18);color:#ff69b4;border-color:rgba(255,20,147,.4);transform:translateY(-1px);}
    .sb-bet-btn:disabled{opacity:.22;cursor:not-allowed;}
    .sb-ante{width:100%;padding:9px 12px;border-radius:11px;border:1.5px solid rgba(255,200,0,.18);
      background:rgba(255,200,0,.04);color:rgba(255,200,0,.65);
      font-family:var(--f);font-size:.68rem;font-weight:700;cursor:pointer;transition:all .15s;
      display:flex;justify-content:space-between;align-items:center;}
    .sb-ante.on{border-color:rgba(255,200,0,.55);background:rgba(255,200,0,.1);color:#ffe066;box-shadow:0 0 16px rgba(255,200,0,.15);}
    .sb-buy-btn{width:100%;padding:9px 10px;border-radius:10px;border:1px solid rgba(255,100,200,.28);
      background:rgba(255,20,147,.08);color:rgba(255,150,210,.85);
      font-family:var(--f);font-size:.68rem;font-weight:700;cursor:pointer;text-align:left;
      transition:all .14s;display:flex;justify-content:space-between;align-items:center;gap:6px;}
    .sb-buy-btn:hover:not(:disabled){background:rgba(255,20,147,.18);border-color:rgba(255,100,200,.55);color:#ff69b4;transform:translateY(-1px);}
    .sb-buy-btn:disabled{opacity:.22;cursor:not-allowed;}
    .sb-buy-price{font-size:.62rem;color:rgba(255,100,200,.6);white-space:nowrap;}
    .sb-pay-row{display:flex;align-items:center;gap:5px;padding:2px 0;}
    .sb-pay-sym{width:28px;height:28px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:7px;background:rgba(10,0,30,.88);border:1px solid rgba(255,20,147,.16);overflow:hidden;}
    .sb-pay-name{font-size:.55rem;color:rgba(255,150,210,.65);flex:1;}
    .sb-pay-val{font-size:.58rem;font-weight:700;color:#ff69b4;}
    .sb-trigger-ov{position:absolute;inset:0;background:rgba(0,0,0,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:50;backdrop-filter:blur(14px);}
    .sb-end-ov{position:absolute;inset:0;background:rgba(0,0,0,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;z-index:50;}
    .sb-bonus-bar{display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,rgba(255,130,0,.1),rgba(255,60,150,.08));border-radius:12px;border:1px solid rgba(255,130,0,.22);padding:10px 12px;flex-direction:column;text-align:center;}
    .sb-fs-counter{font-family:'Fredoka One',cursive;font-size:3rem;color:#ffe066;line-height:1;text-shadow:0 0 28px rgba(255,200,0,.7);}
    .sb-mult-counter{font-family:'Fredoka One',cursive;font-size:1.8rem;color:#c840ff;text-shadow:0 0 24px rgba(200,64,255,.8);animation:sbMultBounce .5s cubic-bezier(.34,1.4,.64,1) both;}
    /* Bonus frame glow */
    .sb-frame.bonus-active::before{background:linear-gradient(135deg,#ffe066,#ff8800,#ff1493,#ffe066);animation:sbFrameShimmer 1.5s linear infinite;}
    @keyframes sbFall{
      0%{transform:translateY(calc(var(--fdrop,9)*-112%)) scaleY(calc(.58 + var(--fdrop,9)*.022));opacity:.04;}
      50%{transform:translateY(5%) scaleY(1.09);opacity:1;}
      68%{transform:translateY(-2.5%) scaleY(.96);}
      84%{transform:translateY(1.2%) scaleY(1.02);}
      100%{transform:translateY(0) scaleY(1);opacity:1;}
    }
    @keyframes sbWinPulse{0%,100%{transform:scale(1) brightness(1)}50%{transform:scale(1.1) brightness(1.18)}}
    @keyframes sbRemove{0%{opacity:1;transform:scale(1) rotate(0)}40%{transform:scale(.42) rotate(14deg);opacity:.65}100%{opacity:0;transform:scale(.06) rotate(28deg)}}
    @keyframes sbBombGlow{0%,100%{box-shadow:inset 0 0 18px rgba(150,50,255,.3),0 0 16px rgba(150,50,255,.22)}50%{box-shadow:inset 0 0 32px rgba(220,120,255,.48),0 0 28px rgba(200,80,255,.4)}}
    @keyframes sbBombExplode{0%{transform:scale(1)}25%{transform:scale(1.35)}50%{transform:scale(.88)}75%{transform:scale(1.12)}100%{transform:scale(1)}}
    @keyframes sbGoldPulse{0%,100%{opacity:1}50%{opacity:.7}}
    @keyframes sbMultBounce{0%{transform:scale(.3);opacity:0}60%{transform:scale(1.28)}80%{transform:scale(.9)}100%{transform:scale(1);opacity:1}}
    @keyframes sbBwRays{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    @keyframes sbBwTitle{0%{opacity:0;transform:scale(.25) translateY(20px)}60%{transform:scale(1.1) translateY(-4px)}100%{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes sbBwIn{0%{opacity:0;transform:translateY(-30px)}100%{opacity:1;transform:translateY(0)}}
    @keyframes sbBwPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
    @keyframes sbBwOut{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.07)}}
    @keyframes sbConfetti{0%{transform:translateY(0) rotate(0deg);opacity:.9}100%{transform:translateY(110vh) rotate(520deg);opacity:0}}
    @keyframes sbSpark{0%{transform:rotate(var(--r,0deg)) scaleY(0);opacity:1}60%{transform:rotate(var(--r,0deg)) scaleY(1);opacity:.8}100%{transform:rotate(var(--r,0deg)) scaleY(0);opacity:0}}
    @keyframes sbDot{0%{transform:scale(.6);opacity:.5}100%{transform:scale(1.4);opacity:1}}
    @keyframes sbFlyIn{0%{opacity:0;transform:scale(.2) rotate(-10deg)}55%{transform:scale(1.12) rotate(2deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
    @keyframes sbScatterBounce{0%{transform:scale(1) rotate(0)}25%{transform:scale(1.3) rotate(-8deg)}50%{transform:scale(1.2) rotate(6deg)}75%{transform:scale(1.25) rotate(-4deg)}100%{transform:scale(1.2) rotate(0)}}
  `;

  return(
    <div className="sb-game">
      <style>{SB_CSS}</style>
      {flashG&&<div className="fl-g"/>}
      {flashR&&<div className="fl-r"/>}
      {/* Floating candy particles */}
      {["🍬","🍭","🍒","🍇","🍉","🍌","⭐","💎","🍬","🍭"].map((em,i)=>(
        <div key={i} className="sb-candy-float" style={{"--dur":`${7+i*1.3}s`,"--del":`${i*0.9}s`,"--lft":`${8+i*9}%`,fontSize:`${0.8+((i%3)*.3)}rem`}}>{em}</div>
      ))}

      {/* Stats Modal */}
      {showStats&&<StatsModal gameName="Sweet Bonanza" onClose={()=>setShowStats(false)} stats={sbStatsModal}/>}

      {/* Buy Bonus Modal */}
      {showBuyModal&&(
        <div style={{position:"absolute",inset:0,zIndex:70,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(4,0,18,.82)",backdropFilter:"blur(7px)"}}
          onClick={e=>{if(e.target===e.currentTarget){sfx.click();setShowBuyModal(false);}}}>
          <div style={{background:"linear-gradient(160deg,rgba(30,5,60,.99),rgba(12,2,30,.99))",border:"1.5px solid rgba(255,20,147,.4)",borderRadius:22,padding:"28px 24px 22px",width:"min(340px,90vw)",display:"flex",flexDirection:"column",gap:18,animation:"goModalIn .38s cubic-bezier(.34,1.2,.64,1) both",boxShadow:"0 0 60px rgba(255,20,147,.14),0 30px 80px rgba(0,0,0,.9)"}}>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"1.5rem",color:"#ff69b4",textAlign:"center",textShadow:"0 0 20px rgba(255,100,180,.7)",letterSpacing:".04em"}}>🎰 Buy Bonus</div>
            <div style={{fontSize:".73rem",color:"rgba(255,180,230,.5)",textAlign:"center",marginTop:-10,lineHeight:1.5}}>Skip the base game and jump straight into Free Spins. Your bet stays the same.</div>
            {/* Option */}
            <div style={{borderRadius:14,border:"1.5px solid rgba(255,100,200,.85)",background:"rgba(60,10,40,.65)",padding:"16px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,boxShadow:"0 0 0 3px rgba(255,20,147,.15),0 0 28px rgba(255,20,147,.18)",animation:"goBuyPulse 2s ease infinite"}}>
              <div>
                <div style={{fontFamily:"'Fredoka One',cursive",fontSize:".92rem",color:"#ff69b4",marginBottom:4}}>🎰 Free Spins</div>
                <div style={{fontSize:".63rem",color:"rgba(255,160,210,.55)",lineHeight:1.4}}>10 free spins<br/>Bomb multipliers add up<br/>Retrigger possible</div>
              </div>
              <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"1.2rem",color:"#ffe066",whiteSpace:"nowrap",textShadow:"0 0 12px rgba(255,220,0,.5)"}}>${(bet*100).toFixed(2)}</div>
            </div>
            {/* Stats strip */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7}}>
              {[["10","Free Spins"],["∞","Retriggers"],["21175×","Max Win"]].map(([v,l])=>(
                <div key={l} style={{textAlign:"center",background:"rgba(10,2,28,.75)",border:"1px solid rgba(255,20,147,.15)",borderRadius:10,padding:"9px 6px"}}>
                  <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"1rem",color:"#ffe066"}}>{v}</div>
                  <div style={{fontSize:".56rem",color:"rgba(255,130,190,.45)",marginTop:2,fontWeight:600}}>{l}</div>
                </div>
              ))}
            </div>
            {/* Cost */}
            <div style={{background:"rgba(255,20,147,.05)",border:"1px solid rgba(255,20,147,.2)",borderRadius:11,padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:".6rem",color:"rgba(255,130,190,.45)",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase"}}>Total Cost</div>
                <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"1.5rem",color:"#ffe066",lineHeight:1,marginTop:2}}>${(bet*100).toFixed(2)}</div>
                <div style={{fontSize:".58rem",color:"rgba(255,130,190,.38)",marginTop:2}}>Balance after: ${Math.max(0,balance-bet*100).toFixed(2)}</div>
              </div>
              <div style={{fontSize:"2.2rem",opacity:.4}}>🎰</div>
            </div>
            <button
              disabled={bet*100>balance}
              style={{width:"100%",padding:13,borderRadius:12,border:"none",
                background:bet*100>balance?"#2a0030":"linear-gradient(135deg,#be185d,#ec4899,#be185d)",
                backgroundSize:"200% auto",animation:bet*100<=balance?"goShimmerSlide 3s linear infinite":"none",
                color:bet*100>balance?"rgba(255,255,255,.3)":"#fff",
                fontFamily:"'Fredoka One',cursive",fontSize:".95rem",fontWeight:900,cursor:bet*100>balance?"not-allowed":"pointer",
                letterSpacing:".04em",boxShadow:bet*100>balance?"none":"0 4px 20px rgba(255,20,147,.45)",
                transition:"transform .15s,box-shadow .15s",opacity:bet*100>balance?.35:1}}
              onClick={()=>{
                if(bet*100>balance)return;
                sfx.cash();setShowBuyModal(false);buyBonus();
              }}>
              {bet*100>balance?"Insufficient Balance":"🎰  CONFIRM BUY BONUS"}
            </button>
            <button onClick={()=>{sfx.click();setShowBuyModal(false);}}
              style={{width:"100%",padding:"9px",borderRadius:10,border:"1px solid rgba(255,20,147,.2)",background:"transparent",color:"rgba(255,130,190,.5)",fontFamily:"var(--f)",fontSize:".78rem",fontWeight:600,cursor:"pointer",marginTop:-6}}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Big Win Overlay */}
      {bigWin&&(
        <div style={{position:"absolute",inset:0,zIndex:80,overflow:"hidden"}}>
          <SBBigWinInner target={bigWin.target} mult={bigWin.mult} spins={freeSpinsCountRef.current} onDone={()=>setBigWin(null)}/>
        </div>
      )}

      {/* Bonus Trigger */}
      {bonusPhase==="trigger"&&(
        <div className="sb-trigger-ov">
          <div style={{fontSize:"3.5rem",animation:"sbScatterBounce .9s ease infinite"}}>🍭</div>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"2.8rem",color:"#ff1493",textShadow:"0 0 30px rgba(255,0,150,.85),0 0 60px rgba(255,0,150,.3)",animation:"sbFlyIn .55s cubic-bezier(.34,1.4,.64,1) both"}}>FREE SPINS!</div>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"1.1rem",color:"#ffe066",textShadow:"0 0 14px rgba(255,200,0,.6)"}}>
            {scatterCount} Scatters → {10+Math.max(0,(scatterCount-4)*5)} Free Spins!
          </div>
          <div style={{display:"flex",gap:7,marginTop:4}}>
            {Array.from({length:scatterCount},(_,i)=>(
              <div key={i} style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#ff1493,#ff8800)",display:"flex",alignItems:"center",justifyContent:"center",animation:`sbFlyIn .5s ${i*.1}s cubic-bezier(.34,1.4,.64,1) both`,boxShadow:"0 0 22px rgba(255,0,150,.65)",fontSize:"1.2rem"}}>🍭</div>
            ))}
          </div>
          <div style={{fontSize:".7rem",color:"rgba(255,160,220,.5)",marginTop:4}}>Multiplier bombs will appear during spins!</div>
        </div>
      )}

      {/* Bonus End — premium redesign */}
      {bonusPhase==="end"&&(
        <SBBonusComplete bonusWin={bonusWin} freeSpins={freeSpins} effectiveBet={effectiveBet} onContinue={endBonus}/>
      )}

      {/* Top Bar */}
      <div className="sb-topbar">
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <a onClick={()=>setPage("lobby")} style={{fontSize:".7rem",color:"rgba(255,100,200,.5)",cursor:"pointer"}}>Home</a>
          <span style={{color:"rgba(255,100,200,.28)",fontSize:".6rem"}}>›</span>
          <span style={{fontSize:".7rem",color:"rgba(255,100,200,.65)"}}>Casino</span>
          <span style={{color:"rgba(255,100,200,.28)",fontSize:".6rem"}}>›</span>
          <span style={{fontSize:".7rem",color:"rgba(255,160,225,.9)"}}>Sweet Bonanza</span>
        </div>
        <div className="sb-title">🍭 Sweet Bonanza</div>
        <div className="sb-hud-box" style={{minWidth:"auto",border:"1px solid rgba(255,20,147,.28)"}}>
          <div className="sb-hud-lbl">Balance</div>
          <div className="sb-hud-val">${balance.toFixed(2)}</div>
        </div>
      </div>

      <div className="sb-main">
        {/* LEFT CTRL */}
        <div className="sb-ctrl">

          {isBonus?(
            /* ── BONUS MODE ── */
            <div style={{display:"flex",flexDirection:"column",gap:10,height:"100%"}}>
              {/* Bonus badge */}
              <div style={{textAlign:"center",padding:"10px 8px 6px"}}>
                <div style={{fontFamily:"'Fredoka One',cursive",fontSize:".62rem",color:"#ff8800",letterSpacing:".18em",textTransform:"uppercase",marginBottom:4}}>🎰 Free Spins</div>
                <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"3.8rem",color:"#ffe066",lineHeight:1,textShadow:"0 0 28px rgba(255,200,0,.7)"}}>
                  {freeSpinsLeft}
                </div>
                <div style={{fontSize:".58rem",color:"rgba(255,180,60,.45)",marginTop:2,letterSpacing:".06em"}}>remaining</div>
              </div>
              {/* Won display */}
              <div style={{background:"linear-gradient(135deg,rgba(0,180,80,.1),rgba(0,100,50,.08))",border:"1px solid rgba(0,200,80,.18)",borderRadius:12,padding:"10px 12px",textAlign:"center"}}>
                <div style={{fontSize:".52rem",fontWeight:700,letterSpacing:".14em",color:"rgba(100,220,120,.5)",textTransform:"uppercase",marginBottom:3}}>Total Won</div>
                <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"1.55rem",color:"#44ff88",textShadow:"0 0 16px rgba(0,255,100,.45)"}}>${bonusWin.toFixed(2)}</div>
              </div>
              {runningMult>0&&(
                <div style={{textAlign:"center"}}>
                  <div className="sb-mult-counter" key={runningMult}>×{runningMult}</div>
                </div>
              )}
              <div style={{flex:1}}/>
              <button className="sb-fs-btn" disabled={spinning} onClick={()=>doSpin(true)}>
                {spinning?(
                  <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                    <span style={{display:"inline-block",width:16,height:16,border:"2.5px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"sbSpin360 .7s linear infinite"}}/>
                    Spinning…
                  </span>
                ):(
                  <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontSize:"1.1rem",letterSpacing:".06em"}}>
                    <span style={{width:0,height:0,borderTop:"7px solid transparent",borderBottom:"7px solid transparent",borderLeft:"11px solid currentColor",display:"inline-block",marginRight:2}}/>
                    SPIN
                  </span>
                )}
              </button>
            </div>
          ):(
            /* ── BASE GAME MODE ── */
            <div style={{display:"flex",flexDirection:"column",gap:9,height:"100%"}}>

              {/* BET SECTION */}
              <div style={{padding:"12px 10px 8px",background:"linear-gradient(160deg,rgba(40,0,80,.6),rgba(10,0,30,.5))",borderRadius:14,border:"1px solid rgba(255,20,147,.12)"}}>
                <div style={{fontSize:".52rem",fontWeight:700,letterSpacing:".16em",color:"rgba(255,100,200,.45)",textTransform:"uppercase",marginBottom:8}}>Bet Amount</div>
                <div style={{position:"relative",marginBottom:8}}>
                  <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:".78rem",color:"rgba(255,100,200,.6)",pointerEvents:"none",fontFamily:"'Fredoka One',cursive"}}>$</span>
                  <input className="sb-bet-input" type="number" min={.1} max={100} step={.1}
                    value={bet} disabled={spinning||!!bonusPhase}
                    onChange={e=>setBet(Math.max(.1,Math.min(100,parseFloat(e.target.value)||1)))}
                    style={{paddingLeft:22}}/>
                </div>
                <div className="sb-bet-row">
                  {["½","2×","5×","MAX"].map(v=>(
                    <button key={v} className="sb-bet-btn" disabled={spinning||!!bonusPhase} onClick={()=>{
                      sfx.tick();
                      if(v==="½")setBet(b=>Math.max(.1,+(b/2).toFixed(2)));
                      else if(v==="2×")setBet(b=>Math.min(100,+(b*2).toFixed(2)));
                      else if(v==="5×")setBet(b=>Math.min(100,+(b*5).toFixed(2)));
                      else setBet(Math.min(100,Math.floor(balance*10)/10));
                    }}>{v}</button>
                  ))}
                </div>
              </div>

              {/* ANTE BET */}
              <button className={`sb-ante${anteBet?" on":""}`} disabled={spinning||!!bonusPhase} onClick={()=>{sfx.click();setAnteBet(a=>!a);}}>
                <div style={{textAlign:"left"}}>
                  <div style={{fontWeight:700,fontSize:".68rem"}}>Ante Bet</div>
                  <div style={{fontSize:".54rem",opacity:.6,marginTop:1}}>+25% · 2× scatter chance</div>
                </div>
                <div style={{
                  width:32,height:18,borderRadius:9,
                  background:anteBet?"#ffe066":"rgba(255,255,255,.1)",
                  border:`1.5px solid ${anteBet?"#ffe066":"rgba(255,255,255,.2)"}`,
                  position:"relative",transition:"all .2s",flexShrink:0,
                }}>
                  <div style={{
                    position:"absolute",top:2,
                    left:anteBet?14:2,
                    width:10,height:10,borderRadius:"50%",
                    background:anteBet?"#1a0800":"rgba(255,255,255,.4)",
                    transition:"left .2s",
                  }}/>
                </div>
              </button>

              {/* INFO ROW */}
              <div style={{display:"flex",gap:5}}>
                <div style={{flex:1,background:"rgba(6,0,20,.75)",border:"1px solid rgba(255,20,147,.1)",borderRadius:10,padding:"7px 8px",textAlign:"center"}}>
                  <div style={{fontSize:".48rem",color:"rgba(255,100,200,.4)",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase"}}>Effective</div>
                  <div style={{fontFamily:"'Fredoka One',cursive",fontSize:".88rem",color:"#ff69b4",marginTop:1}}>${effectiveBet.toFixed(2)}</div>
                </div>
                <div style={{flex:1,background:"rgba(6,0,20,.75)",border:"1px solid rgba(255,20,147,.1)",borderRadius:10,padding:"7px 8px",textAlign:"center"}}>
                  <div style={{fontSize:".48rem",color:"rgba(255,100,200,.4)",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase"}}>Max Win</div>
                  <div style={{fontFamily:"'Fredoka One',cursive",fontSize:".88rem",color:"#c840ff",marginTop:1}}>${(bet*5000).toLocaleString()}</div>
                </div>
              </div>

              <div style={{flex:1}}/>

              {/* BUY BONUS */}
              {!bonusPhase&&(
                <button className="sb-buy-btn" disabled={spinning||bet*100>balance} onClick={()=>{sfx.click();setShowBuyModal(true);}}>
                  <div>
                    <div style={{fontSize:".66rem",fontWeight:700}}>🎰 Buy Free Spins</div>
                    <div style={{fontSize:".54rem",opacity:.55,marginTop:1}}>10 spins · bombs guaranteed</div>
                  </div>
                  <div style={{fontFamily:"'Fredoka One',cursive",fontSize:".85rem",color:"rgba(255,150,220,.9)",flexShrink:0}}>${(bet*100).toFixed(0)}</div>
                </button>
              )}

              {/* MAIN SPIN BUTTON */}
              <button className="sb-spin-btn" disabled={spinning||!!bonusPhase||effectiveBet>balance} onClick={()=>{sfx.click();doSpin(false);}}>
                {spinning?(
                  <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                    <span style={{display:"inline-block",width:16,height:16,border:"2.5px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"sbSpin360 .7s linear infinite"}}/>
                    Spinning…
                  </span>
                ):(
                  <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,fontSize:"1.1rem",letterSpacing:".06em"}}>
                    <span style={{width:0,height:0,borderTop:"7px solid transparent",borderBottom:"7px solid transparent",borderLeft:"11px solid rgba(255,255,255,.9)",display:"inline-block",marginRight:2}}/>
                    SPIN
                  </span>
                )}
              </button>

              {/* STATS BUTTON */}
              <button className="sm-btn" onClick={()=>setShowStats(true)} style={{
                width:"100%",justifyContent:"center",
                background:"rgba(255,20,147,.07)",
                borderColor:"rgba(255,20,147,.18)",
                color:"rgba(255,140,200,.7)",
                fontFamily:"var(--f)",
                fontSize:".7rem",
                padding:"8px",
                borderRadius:10,
              }}>
                📊 Stats & History
              </button>
            </div>
          )}
        </div>

        {/* CENTER GRID */}
        <div className="sb-arena">
          {/* Buy bonus active badge */}
          {buyBonusActive&&(
            <div className="bbs-badge" style={{
              background:"linear-gradient(135deg,rgba(180,0,120,.95),rgba(220,20,160,.9))",
              border:"2px solid rgba(255,160,220,.8)",
              color:"#ffcce8",
              "--bbs-glow":"rgba(255,80,180,.7)",
            }}>
              <span style={{fontSize:"1.1rem",filter:"drop-shadow(0 0 10px rgba(255,100,200,1))"}}>🍬</span>
              BONUS INCOMING
              <span style={{fontSize:"1.1rem",filter:"drop-shadow(0 0 10px rgba(255,100,200,1))"}}>🍬</span>
            </div>
          )}
          <div className={`sb-frame${isBonus?" bonus-active":""}`} style={{position:"relative"}}>
            {/* Bomb tally counter */}
            {runningMult>0&&<div className="sb-bomb-tally" key={runningMult}>×{runningMult}</div>}
            <div className="sb-grid">
              {Array.from({length:SB_ROWS},(_,r)=>Array.from({length:SB_COLS},(_,c)=>{
                const sym=grid[r]?.[c];
                const pos=`${r}-${c}`;
                const isWin=winCells.has(pos);
                const isRem=removeCells.has(pos);
                const isBomb=sbIsBomb(sym);
                const isScatter=sym==="scatter";
                const explodingBomb=bombAnimMults.find(b=>b.r===r&&b.c===c);
                return(
                  <div key={cellKeys[r][c]} className={`sb-cell${isWin&&isBomb?" bomb-explode":isWin?" win":""}${isRem?" removing":""}${isBomb&&!isWin?" bomb-cell":""}${isScatter&&!isWin?" scatter-cell":""}`} style={{position:"relative"}}>
                    {/* Buy bonus ripple VFX on scatter cells */}
                    {isScatter&&buyBonusActive&&winCells.has(pos)&&(
                      <>
                        <div className="bbs-ripple" style={{"--scatter-glow":"rgba(255,200,0,.8)"}}/>
                        <div className="bbs-ripple" style={{"--scatter-glow":"rgba(255,200,0,.7)",animationDelay:".15s"}}/>
                      </>
                    )}
                    <div className="sb-sym" style={{
                      '--fdrop': cellDropDist[r]?.[c]?.drop ?? cellDropDist[r]?.[c] ?? SB_ROWS+3,
                      '--fdur': `${sbFallDur(cellDropDist[r]?.[c]?.drop ?? cellDropDist[r]?.[c] ?? SB_ROWS+3)}ms`,
                      '--fdelay': `${cellDropDist[r]?.[c]?.delay ?? 0}ms`,
                    }}>
                      {SB_SYMS[sym]?.render()}
                    </div>
                    {explodingBomb&&<div className="sb-bomb-pop" key={explodingBomb.key}>×{explodingBomb.val}</div>}
                  </div>
                );
              }))}
            </div>
          </div>

          {/* Win banner — shown for sub-30x wins, clears on new spin */}
          <div className={`sb-win-banner${sbShowWin&&!bigWin?" show":""}`}
            style={{fontFamily:"'Fredoka One',cursive"}}>
            <div className="lb-win-amt" style={{color:"#ff69b4",textShadow:"0 0 20px rgba(255,100,200,.7)"}}>${totalWin.toFixed(2)}</div>
            <div className="lb-win-sub" style={{color:"rgba(255,220,100,.75)"}}>
              {totalWin>0&&(isBonus?bet:effectiveBet)>0?`${+(totalWin/(isBonus?bet:effectiveBet)).toFixed(1)}× BET`:""}
            </div>
          </div>

          {/* HUD */}
          <div className="sb-hud">
            <div className="sb-hud-box">
              <div className="sb-hud-lbl">Bet</div>
              <div className="sb-hud-val">${(isBonus?bet:effectiveBet).toFixed(2)}</div>
            </div>
            <div className="sb-hud-box">
              <div className="sb-hud-lbl">Win</div>
              <div className={`sb-hud-val${winAmt>0?" green":""}`}>{winAmt>0?`$${winAmt.toFixed(2)}`:"—"}</div>
            </div>
            <div className="sb-hud-box">
              <div className="sb-hud-lbl">Total Win</div>
              <div className={`sb-hud-val${totalWin>0?" green":""}`}>{totalWin>0?`$${totalWin.toFixed(2)}`:"$0.00"}</div>
            </div>
            {runningMult>0?(
              <div className="sb-hud-box">
                <div className="sb-hud-lbl">Mult</div>
                <div className="sb-hud-val gold" key={runningMult}>×{runningMult}</div>
              </div>
            ):isBonus?(
              <div className="sb-hud-box">
                <div className="sb-hud-lbl">Mult</div>
                <div className="sb-hud-val">×—</div>
              </div>
            ):(
              <div className="sb-hud-box">
                <div className="sb-hud-lbl">Cascades</div>
                <div className="sb-hud-val">{cascade}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Big Win inner component (needs to close SB scope cleanly) */
function SBBigWinInner({target,mult,spins,onDone}){
  const [display,setDisplay]=useState(0);
  const [phase,setPhase]=useState("in");
  const [skipped,setSkipped]=useState(false);
  const intervalRef=useRef(null);
  const timeoutsRef=useRef([]);
  const confettiColors=["#ff1493","#ffe066","#44ff88","#00d4ff","#ff8800","#c840ff","#ff6eb4","#ffcc00"];
  const particles=useMemo(()=>Array.from({length:60},(_,i)=>({
    id:i,x:Math.random()*100,size:5+Math.random()*10,
    color:confettiColors[i%confettiColors.length],
    delay:Math.random()*1.2,duration:1.6+Math.random()*1.8,
    rotate:Math.random()*360,shape:i%3,
  })),[]);

  const skipToEnd=useCallback(()=>{
    if(skipped)return;
    setSkipped(true);
    if(intervalRef.current){clearInterval(intervalRef.current);intervalRef.current=null;}
    timeoutsRef.current.forEach(t=>clearTimeout(t));
    setDisplay(target);setPhase("out");
    setTimeout(onDone,600);
  },[skipped,target,onDone]);

  useEffect(()=>{
    const add=t=>{timeoutsRef.current.push(t);return t;};
    add(setTimeout(()=>setPhase("count"),600));
    let step=0;const steps=75;const DURATION=2600;
    add(setTimeout(()=>{
      intervalRef.current=setInterval(()=>{
        step++;const p=step/steps;const e=1-Math.pow(1-p,4);
        setDisplay(+(e*target).toFixed(2));
        if(step>=steps){clearInterval(intervalRef.current);intervalRef.current=null;setDisplay(target);}
      },DURATION/steps);
    },800));
    add(setTimeout(()=>{setPhase("out");add(setTimeout(onDone,700));},5800));
    return()=>{if(intervalRef.current)clearInterval(intervalRef.current);timeoutsRef.current.forEach(t=>clearTimeout(t));};
  },[]);

  const label=mult>=200?"MEGA WIN!":mult>=100?"BIG WIN!":mult>=40?"GREAT WIN!":"NICE WIN!";
  const lc=mult>=200?"#ffe066":mult>=100?"#ff69b4":mult>=40?"#44ff88":"#fff";
  return(
    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"center",overflow:"hidden",cursor:"pointer",
      animation:phase==="out"?"sbBwOut .7s ease forwards":"none"}}
      onClick={skipToEnd}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 45%,rgba(40,0,80,.98) 0%,rgba(10,0,28,.97) 55%,rgba(2,0,8,.96) 100%)"}}/>
      <div style={{position:"absolute",inset:0,animation:"sbBwRays 5s linear infinite",background:"conic-gradient(from 0deg at 50% 50%,transparent 0deg,rgba(255,20,147,.055) 8deg,transparent 16deg,rgba(255,200,50,.045) 24deg,transparent 32deg,rgba(180,0,255,.055) 40deg,transparent 48deg,rgba(100,220,255,.04) 56deg,transparent 64deg,rgba(255,20,147,.055) 72deg,transparent 80deg,rgba(255,200,50,.045) 88deg,transparent 96deg,rgba(180,0,255,.055) 104deg,transparent 112deg,rgba(100,220,255,.04) 120deg,transparent 128deg,rgba(255,20,147,.055) 136deg,transparent 144deg,rgba(255,200,50,.045) 152deg,transparent 160deg,rgba(180,0,255,.055) 168deg,transparent 176deg,rgba(255,20,147,.055) 184deg,transparent 192deg,rgba(255,200,50,.045) 200deg,transparent 208deg,rgba(180,0,255,.055) 216deg,transparent 224deg,rgba(100,220,255,.04) 232deg,transparent 240deg,rgba(255,20,147,.055) 248deg,transparent 256deg,rgba(255,200,50,.045) 264deg,transparent 272deg,rgba(180,0,255,.055) 280deg,transparent 288deg,rgba(100,220,255,.04) 296deg,transparent 304deg,rgba(255,20,147,.055) 312deg,transparent 320deg,rgba(255,200,50,.045) 328deg,transparent 336deg,rgba(180,0,255,.055) 344deg,transparent 360deg)"}}/>
      {particles.map(p=>(
        <div key={p.id} style={{position:"absolute",top:"-14px",left:`${p.x}%`,
          width:`${p.size}px`,height:p.shape===0?`${p.size}px`:p.shape===1?`${p.size*2}px`:`${p.size*.55}px`,
          borderRadius:p.shape===0?"50%":p.shape===1?"3px":"2px",background:p.color,
          transform:`rotate(${p.rotate}deg)`,
          animation:`sbConfetti ${p.duration}s ${p.delay}s ease-in both`,opacity:.92}}/>
      ))}
      {Array.from({length:18},(_,i)=>{
        const angle=(i/18)*360;
        return(<div key={i} style={{position:"absolute",top:"50%",left:"50%",width:"2.5px",height:`${22+i%5*10}px`,background:`linear-gradient(to top,${confettiColors[i%confettiColors.length]},transparent)`,transformOrigin:"0 0",transform:`rotate(${angle}deg)`,animation:`sbSpark 2s ${i*0.1}s ease-out infinite`}}/>);
      })}
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6,pointerEvents:"none"}}>
        <div style={{fontSize:"5rem",animation:"sbScatterBounce .9s ease infinite",filter:`drop-shadow(0 0 20px ${lc})`}}>🍭</div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"clamp(2.2rem,5.5vw,3.8rem)",color:lc,textShadow:`0 0 40px ${lc},0 0 80px ${lc}55`,letterSpacing:".06em",animation:"sbBwTitle .65s cubic-bezier(.34,1.4,.64,1) both"}}>{label}</div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"clamp(3.2rem,9vw,7rem)",color:"#fff",textShadow:"0 0 30px rgba(255,100,200,.8),0 0 60px rgba(255,100,200,.3)",lineHeight:1,animation:"sbBwPulse 1.6s ease infinite"}}>${display.toFixed(2)}</div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"clamp(1rem,2.5vw,1.5rem)",color:"rgba(255,180,230,.72)",letterSpacing:".05em"}}>{mult.toFixed(1)}× BET</div>
        <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap",justifyContent:"center",maxWidth:200}}>
          {Array.from({length:Math.min(spins||10,14)},(_,i)=>(
            <div key={i} style={{width:9,height:9,borderRadius:"50%",background:confettiColors[i%confettiColors.length],boxShadow:`0 0 10px ${confettiColors[i%confettiColors.length]}`,animation:`sbDot .7s ${i*0.055}s ease infinite alternate`}}/>
          ))}
        </div>
        <div style={{marginTop:10,fontSize:".7rem",color:"rgba(255,150,220,.3)",letterSpacing:".06em"}}>Click anywhere to skip</div>
      </div>
    </div>
  );
}

/* ── Sweet Bonanza Bonus Complete Screen ── */
function SBBonusComplete({bonusWin,freeSpins,effectiveBet,onContinue}){
  const mult=effectiveBet>0?+(bonusWin/effectiveBet).toFixed(1):0;
  const confettiColors=["#ff1493","#ffe066","#44ff88","#00d4ff","#ff8800","#c840ff","#ff6eb4","#ffcc00","#ff4081","#7c4dff"];
  const particles=useMemo(()=>Array.from({length:80},(_,i)=>({
    id:i,x:Math.random()*100,y:-10-Math.random()*20,
    size:4+Math.random()*9,color:confettiColors[i%confettiColors.length],
    delay:Math.random()*1.4,duration:1.8+Math.random()*2,
    rotate:Math.random()*360,shape:i%4,dx:(Math.random()-.5)*40,
  })),[]);
  const [phase,setPhase]=useState("in");
  const [display,setDisplay]=useState(0);
  const isHuge=mult>=50;
  const isBig=mult>=20;
  const winLabel=mult>=100?"🏆 MEGA WIN!":mult>=50?"🎊 BIG WIN!":mult>=20?"✨ GREAT WIN!":"🎉 Bonus Complete!";
  const accentCol=mult>=100?"#ffe066":mult>=50?"#ff1493":mult>=20?"#44ff88":"#ff69b4";

  useEffect(()=>{
    setTimeout(()=>setPhase("count"),500);
    const steps=70,DURATION=2400;
    const t=setTimeout(()=>{
      let s=0;
      const iv=setInterval(()=>{
        s++;const e=1-Math.pow(1-s/steps,4);
        setDisplay(+(e*bonusWin).toFixed(2));
        if(s>=steps){clearInterval(iv);setDisplay(bonusWin);}
      },DURATION/steps);
    },700);
    return()=>clearTimeout(t);
  },[bonusWin]);

  return(
    <div style={{position:"absolute",inset:0,zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
      {/* Backdrop */}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 40%,rgba(60,0,100,.97) 0%,rgba(15,0,40,.98) 55%,rgba(3,0,12,.97) 100%)",backdropFilter:"blur(6px)"}}/>
      {/* Rotating rays */}
      <div style={{position:"absolute",inset:0,animation:"sbBwRays 8s linear infinite",opacity:.55,background:"conic-gradient(from 0deg at 50% 50%,transparent 0deg,rgba(255,20,147,.08) 15deg,transparent 30deg,rgba(255,220,50,.06) 45deg,transparent 60deg,rgba(180,0,255,.07) 75deg,transparent 90deg,rgba(255,20,147,.08) 105deg,transparent 120deg,rgba(255,220,50,.06) 135deg,transparent 150deg,rgba(180,0,255,.07) 165deg,transparent 180deg,rgba(255,20,147,.08) 195deg,transparent 210deg,rgba(255,220,50,.06) 225deg,transparent 240deg,rgba(180,0,255,.07) 255deg,transparent 270deg,rgba(255,20,147,.08) 285deg,transparent 300deg,rgba(255,220,50,.06) 315deg,transparent 330deg,rgba(180,0,255,.07) 345deg,transparent 360deg)"}}/>
      {/* Confetti */}
      {particles.map(p=>(
        <div key={p.id} style={{position:"absolute",top:`${p.y}%`,left:`${p.x}%`,
          width:p.size,height:p.shape<2?p.size:p.shape===2?p.size*2:p.size*.5,
          borderRadius:p.shape===0?"50%":"3px",background:p.color,
          transform:`rotate(${p.rotate}deg)`,
          animation:`sbConfetti ${p.duration}s ${p.delay}s ease-in both`,opacity:.95}}/>
      ))}
      {/* Card */}
      <div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",alignItems:"center",gap:0,animation:"sbBwIn .6s cubic-bezier(.34,1.3,.64,1) both"}}>
        {/* Glowing card container */}
        <div style={{
          background:"linear-gradient(160deg,rgba(40,0,80,.95),rgba(10,0,35,.98))",
          border:"2px solid rgba(255,100,200,.4)",
          borderRadius:28,padding:"32px 40px 28px",
          boxShadow:`0 0 60px rgba(255,20,147,.35),0 0 120px rgba(255,20,147,.12),inset 0 1px 0 rgba(255,255,255,.08)`,
          display:"flex",flexDirection:"column",alignItems:"center",gap:16,
          minWidth:320,
          position:"relative",overflow:"hidden",
        }}>
          {/* Inner shimmer */}
          <div style={{position:"absolute",top:0,left:"-60%",width:"50%",height:"100%",background:"linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)",animation:"sbCandyFloat 3s 0.5s linear infinite",transform:"skewX(-15deg)"}}/>

          {/* Icon */}
          <div style={{fontSize:"3.4rem",animation:"sbScatterBounce .85s ease infinite",filter:`drop-shadow(0 0 18px ${accentCol})`}}>🎉</div>

          {/* Win label */}
          <div style={{
            fontFamily:"'Fredoka One',cursive",
            fontSize:"clamp(1.5rem,4vw,2.2rem)",
            color:accentCol,
            textShadow:`0 0 28px ${accentCol},0 0 56px ${accentCol}44`,
            letterSpacing:".06em",
            textAlign:"center",
          }}>{winLabel}</div>

          {/* Divider */}
          <div style={{width:"80%",height:1,background:`linear-gradient(90deg,transparent,${accentCol}55,transparent)`}}/>

          {/* Win amount */}
          <div style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"clamp(3rem,10vw,5.5rem)",
              color:"#fff",lineHeight:.95,
              textShadow:`0 0 32px ${accentCol}bb,0 0 64px ${accentCol}44`,
              animation:"sbBwPulse 1.8s ease infinite",letterSpacing:"-.01em",
            }}>${display.toFixed(2)}</div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"1rem",color:"rgba(255,180,230,.65)",marginTop:6,letterSpacing:".04em"}}>
              {freeSpins} Free Spins · {mult}× Bet
            </div>
          </div>

          {/* Dot decorations */}
          <div style={{display:"flex",gap:5,flexWrap:"wrap",justifyContent:"center",maxWidth:200}}>
            {Array.from({length:Math.min(freeSpins,14)},(_,i)=>(
              <div key={i} style={{width:8,height:8,borderRadius:"50%",background:confettiColors[i%confettiColors.length],
                boxShadow:`0 0 8px ${confettiColors[i%confettiColors.length]}`,
                animation:`sbDot .65s ${i*.06}s ease infinite alternate`}}/>
            ))}
          </div>

          {/* Continue button */}
          <button onClick={onContinue} style={{
            fontFamily:"'Fredoka One',cursive",fontSize:"1.05rem",letterSpacing:".06em",
            padding:"14px 40px",borderRadius:14,border:"none",cursor:"pointer",
            background:"linear-gradient(135deg,#ad1457,#e91e8c,#ff4da6,#ff8cc8)",
            color:"#fff",
            boxShadow:"0 4px 28px rgba(173,20,87,.55),inset 0 1px 0 rgba(255,255,255,.25)",
            transition:"all .18s cubic-bezier(.34,1.2,.64,1)",
            minWidth:200,marginTop:4,
            position:"relative",overflow:"hidden",
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px) scale(1.03)";e.currentTarget.style.boxShadow="0 8px 40px rgba(200,24,92,.75),inset 0 1px 0 rgba(255,255,255,.25)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 4px 28px rgba(173,20,87,.55),inset 0 1px 0 rgba(255,255,255,.25)";}}
          >
            ▶ Continue
          </button>
        </div>
      </div>
    </div>
  );
}


export { SweetBonanzaGame, SweetBonanzaArt };

