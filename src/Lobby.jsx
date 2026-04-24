import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "./shared/sfx.js";
import { ICO } from "./shared/icons.jsx";
import { LIVE_FEED, AMB_PTS, AMB_CSS } from "./shared/data.js";
// ── Lobby: game art thumbnails + main lobby page ─────────────────────────────
/* ══════════════════════════════════════ LOBBY ════════════════════════════════════ */

function HiLoArt(){
  return(
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
      <defs>
        <radialGradient id="hlBg" cx="50%" cy="40%" r="65%"><stop offset="0%" stopColor="#1a0840"/><stop offset="100%" stopColor="#04020e"/></radialGradient>
        <radialGradient id="hlGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(167,139,250,.35)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
        <filter id="hlBlur"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="hlShadow"><feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(0,0,0,.7)"/></filter>
        <linearGradient id="hlCardFace" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fffafa"/><stop offset="100%" stopColor="#ffe8e8"/></linearGradient>
      </defs>
      <rect width="240" height="320" fill="url(#hlBg)"/>
      <ellipse cx="120" cy="130" rx="90" ry="80" fill="url(#hlGlow)" filter="url(#hlBlur)"/>
      <ellipse cx="120" cy="200" rx="110" ry="30" fill="rgba(0,80,30,.18)"/>
      {[6,4,2,0].map(n=>(
        <rect key={n} x={52+n} y={88-n} width="76" height="108" rx="9"
          fill={`hsl(${258+n*4},65%,${18+n*3}%)`}
          stroke="rgba(167,139,250,.25)" strokeWidth="1.2"
          transform={`rotate(${-8+n*1.5} 90 142)`}/>
      ))}
      <rect x="112" y="82" width="76" height="108" rx="9" fill="url(#hlCardFace)" stroke="rgba(255,255,255,.9)" strokeWidth="1.5" transform="rotate(5 150 136)" filter="url(#hlShadow)"/>
      <text x="118" y="102" fontFamily="Georgia,serif" fontSize="13" fontWeight="700" fill="#9b1c1c" transform="rotate(5 150 136)">A</text>
      <text x="118" y="113" fontFamily="Georgia,serif" fontSize="10" fill="#9b1c1c" transform="rotate(5 150 136)">♥</text>
      <text x="150" y="148" fontFamily="Georgia,serif" fontSize="32" fill="#9b1c1c" textAnchor="middle" transform="rotate(5 150 136)">♥</text>
      <path d="M80 228 L92 212 L104 228Z" fill="none" stroke="rgba(0,255,136,.9)" strokeWidth="2.5" strokeLinejoin="round"/>
      <line x1="92" y1="228" x2="92" y2="245" stroke="rgba(0,255,136,.7)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M145 212 L157 228 L169 212Z" fill="none" stroke="rgba(239,68,68,.9)" strokeWidth="2.5" strokeLinejoin="round"/>
      <line x1="157" y1="212" x2="157" y2="227" stroke="rgba(239,68,68,.7)" strokeWidth="2.5" strokeLinecap="round"/>
      {[[40,60],[195,45],[210,200],[30,250]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={1.5+i*.5} fill="rgba(192,132,252,.7)"/>
      ))}
    </svg>
  );
}

function MinesArt(){
  return(
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
      <defs>
        <radialGradient id="mnBg" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#0d0b22"/><stop offset="100%" stopColor="#04020e"/>
        </radialGradient>
        <radialGradient id="mnGem" cx="32%" cy="25%" r="65%">
          <stop offset="0%" stopColor="rgba(160,255,210,.98)"/>
          <stop offset="38%" stopColor="rgba(0,255,136,.9)"/>
          <stop offset="100%" stopColor="rgba(0,100,50,.55)"/>
        </radialGradient>
        <radialGradient id="mnCellGreen" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="rgba(0,255,136,.22)"/>
          <stop offset="100%" stopColor="rgba(0,140,60,.06)"/>
        </radialGradient>
        <radialGradient id="mnCellRed" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="rgba(239,68,68,.26)"/>
          <stop offset="100%" stopColor="rgba(160,20,20,.06)"/>
        </radialGradient>
        <filter id="mnGlowG"><feGaussianBlur stdDeviation="5"/></filter>
        <filter id="mnGlowR"><feGaussianBlur stdDeviation="4"/></filter>
        <filter id="mnShadow"><feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,.85)"/></filter>
        <clipPath id="mnClip0"><rect x="31" y="58" width="48" height="48" rx="7"/></clipPath>
        <clipPath id="mnClip4"><rect x="93" y="120" width="48" height="48" rx="7"/></clipPath>
        <clipPath id="mnClip8"><rect x="155" y="182" width="48" height="48" rx="7"/></clipPath>
      </defs>

      <rect width="240" height="320" fill="url(#mnBg)"/>

      {/* 3x3 GRID — origin (28,55), cell 54x54, step 62 */}
      {Array.from({length:9},(_,i)=>{
        const c=i%3, r=Math.floor(i/3);
        const cx2=28+c*62, cy2=55+r*62;
        const isGem=i===4, isMine=i===0||i===8;
        return(
          <g key={i}>
            {isGem&&<rect x={cx2-3} y={cy2-3} width="60" height="60" rx="12"
              fill="rgba(0,255,136,.14)" filter="url(#mnGlowG)"/>}
            {isMine&&<rect x={cx2-3} y={cy2-3} width="60" height="60" rx="12"
              fill="rgba(239,68,68,.14)" filter="url(#mnGlowR)"/>}
            <rect x={cx2} y={cy2} width="54" height="54" rx="9"
              fill={isGem?"url(#mnCellGreen)":isMine?"url(#mnCellRed)":"rgba(22,18,46,.8)"}
              stroke={isGem?"rgba(0,255,136,.72)":isMine?"rgba(239,68,68,.62)":"rgba(167,139,250,.13)"}
              strokeWidth={isGem||isMine?"1.9":"1.1"}/>
            <rect x={cx2+5} y={cy2+5} width="44" height="9" rx="4"
              fill={isGem?"rgba(0,255,136,.12)":isMine?"rgba(239,68,68,.1)":"rgba(255,255,255,.04)"}/>
            {!isGem&&!isMine&&<>
              <line x1={cx2+27} y1={cy2+20} x2={cx2+27} y2={cy2+34} stroke="rgba(167,139,250,.18)" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1={cx2+20} y1={cy2+27} x2={cx2+34} y2={cy2+27} stroke="rgba(167,139,250,.18)" strokeWidth="1.5" strokeLinecap="round"/>
            </>}
          </g>
        );
      })}

      {/* GEM inside cell 4 — center (117,144), clipped to cell interior */}
      <g clipPath="url(#mnClip4)">
        <ellipse cx="117" cy="144" rx="19" ry="19" fill="rgba(0,255,136,.2)" filter="url(#mnGlowG)"/>
        <polygon points="117,128 132,137 132,154 117,163 102,154 102,137"
          fill="url(#mnGem)" stroke="rgba(0,255,136,.78)" strokeWidth="1.3" filter="url(#mnShadow)"/>
        <polygon points="117,128 132,137 117,143 102,137" fill="rgba(200,255,230,.58)"/>
        <polygon points="117,143 132,137 132,154 117,163" fill="rgba(0,170,80,.25)"/>
        <polygon points="117,143 102,137 102,154 117,163" fill="rgba(0,255,136,.38)"/>
        <line x1="117" y1="128" x2="117" y2="163" stroke="rgba(0,255,136,.14)" strokeWidth=".7"/>
        <circle cx="109" cy="133" r="2.8" fill="rgba(255,255,255,.88)"/>
        <circle cx="121" cy="130" r="1.5" fill="rgba(255,255,255,.65)"/>
      </g>

      {/* MINE inside cell 0 — center (55,82), clipped to cell interior */}
      <g clipPath="url(#mnClip0)">
        <circle cx="55" cy="82" r="15" fill="rgba(239,68,68,.25)" filter="url(#mnGlowR)"/>
        {[0,45,90,135,180,225,270,315].map((deg,i)=>(
          <line key={i}
            x1={55+10*Math.cos(deg*Math.PI/180)} y1={82+10*Math.sin(deg*Math.PI/180)}
            x2={55+15*Math.cos(deg*Math.PI/180)} y2={82+15*Math.sin(deg*Math.PI/180)}
            stroke="rgba(239,68,68,.78)" strokeWidth="1.8" strokeLinecap="round"/>
        ))}
        <circle cx="55" cy="82" r="10" fill="rgba(200,28,28,.96)" stroke="rgba(239,68,68,.5)" strokeWidth="1"/>
        <circle cx="55" cy="82" r="6" fill="rgba(255,75,75,.98)"/>
        <path d="M55 72 Q61 65 68 67" stroke="#f5c400" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="68" cy="66" r="2.8" fill="#f5c400"/>
        <circle cx="49" cy="77" r="2.3" fill="rgba(255,255,255,.42)"/>
      </g>

      {/* MINE inside cell 8 — center (179,206), clipped to cell interior */}
      <g clipPath="url(#mnClip8)">
        <circle cx="179" cy="206" r="15" fill="rgba(239,68,68,.25)" filter="url(#mnGlowR)"/>
        {[0,45,90,135,180,225,270,315].map((deg,i)=>(
          <line key={i}
            x1={179+10*Math.cos(deg*Math.PI/180)} y1={206+10*Math.sin(deg*Math.PI/180)}
            x2={179+15*Math.cos(deg*Math.PI/180)} y2={206+15*Math.sin(deg*Math.PI/180)}
            stroke="rgba(239,68,68,.78)" strokeWidth="1.8" strokeLinecap="round"/>
        ))}
        <circle cx="179" cy="206" r="10" fill="rgba(200,28,28,.96)" stroke="rgba(239,68,68,.5)" strokeWidth="1"/>
        <circle cx="179" cy="206" r="6" fill="rgba(255,75,75,.98)"/>
        <path d="M179 196 Q185 189 192 191" stroke="#f5c400" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="192" cy="190" r="2.8" fill="#f5c400"/>
        <circle cx="173" cy="201" r="2.2" fill="rgba(255,255,255,.38)"/>
      </g>

      {/* Multiplier badge */}
      <rect x="60" y="252" width="120" height="44" rx="11"
        fill="rgba(0,255,136,.07)" stroke="rgba(0,255,136,.32)" strokeWidth="1.3"/>
      <text x="120" y="271" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="10" fontWeight="700" fill="rgba(0,255,136,.55)" letterSpacing="2.5">MULTIPLIER</text>
      <text x="120" y="288" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="20" fontWeight="800" fill="rgba(0,255,136,.95)" letterSpacing="-0.5">44.2x</text>

      {[[40,196],[200,82],[26,134],[216,238]].map(([x,y],i)=>(
        <g key={i}>
          <line x1={x} y1={y-5} x2={x} y2={y+5} stroke="rgba(192,132,252,.55)" strokeWidth="1.3"/>
          <line x1={x-5} y1={y} x2={x+5} y2={y} stroke="rgba(192,132,252,.55)" strokeWidth="1.3"/>
        </g>
      ))}
    </svg>
  );
}

function DiceArt(){
  return(
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
      <defs>
        <radialGradient id="dcBg" cx="50%" cy="40%" r="70%"><stop offset="0%" stopColor="#120830"/><stop offset="100%" stopColor="#04020e"/></radialGradient>
        <linearGradient id="dcDie1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3a1d80"/><stop offset="100%" stopColor="#1e0c50"/></linearGradient>
        <linearGradient id="dcDie2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2d1660"/><stop offset="100%" stopColor="#160840"/></linearGradient>
        <linearGradient id="dcRedBar" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3d0508"/><stop offset="100%" stopColor="rgba(239,68,68,.65)"/></linearGradient>
        <linearGradient id="dcGreenBar" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(0,180,70,.75)"/><stop offset="100%" stopColor="#00ff88"/></linearGradient>
        <filter id="dcGlow"><feGaussianBlur stdDeviation="8"/></filter>
        <filter id="dcShadow"><feDropShadow dx="4" dy="8" stdDeviation="14" floodColor="rgba(0,0,0,.85)"/></filter>
      </defs>
      <rect width="240" height="320" fill="url(#dcBg)"/>
      <ellipse cx="120" cy="150" rx="100" ry="80" fill="rgba(124,58,237,.12)" filter="url(#dcGlow)"/>
      <rect x="22" y="240" width="196" height="14" rx="7" fill="rgba(255,255,255,.05)" stroke="rgba(167,139,250,.12)" strokeWidth="1"/>
      <rect x="22" y="240" width="80" height="14" rx="7" fill="url(#dcRedBar)"/>
      <rect x="102" y="240" width="116" height="14" rx="7" fill="url(#dcGreenBar)"/>
      <rect x="95" y="236" width="14" height="22" rx="4" fill="white" stroke="rgba(167,139,250,.5)" strokeWidth="1.5" filter="url(#dcShadow)"/>
      <circle cx="178" cy="247" r="10" fill="rgba(0,255,136,.9)" stroke="rgba(0,255,136,.4)" strokeWidth="2"/>
      <text x="178" y="251" textAnchor="middle" fontSize="8" fontWeight="900" fill="#001a0a">73</text>
      <rect x="74" y="148" width="92" height="64" rx="12" fill="rgba(14,11,34,.9)" stroke="rgba(0,255,136,.4)" strokeWidth="1.5"/>
      <text x="120" y="165" textAnchor="middle" fontSize="9" fontWeight="700" fill="rgba(0,255,136,.5)" letterSpacing="3">ROLL OVER</text>
      <text x="120" y="200" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontSize="32" fontWeight="800" fill="rgba(0,255,136,.95)">73.42</text>
      {/* Big die — face showing 3: top-right, center, bottom-left (diagonal) */}
      {/* Die rect: x=148,y=60,w=72,h=72. Center before rotate=(184,96). rotate(12 184 96) */}
      <rect x="148" y="60" width="72" height="72" rx="16" fill="url(#dcDie1)" stroke="rgba(167,139,250,.4)" strokeWidth="1.5" transform="rotate(12 184 96)" filter="url(#dcShadow)"/>
      {/* Shine */}
      <ellipse cx="166" cy="72" rx="14" ry="7" fill="rgba(255,255,255,.12)" transform="rotate(12 184 96)"/>
      {/* 3 dots — diagonal: top-right, center, bottom-left */}
      {/* top-right: center+(+18,-18) = (202,78) */}
      <circle cx="202" cy="78" r="5.5" fill="#a78bfa" transform="rotate(12 184 96)" opacity=".95"/>
      {/* center: (184,96) */}
      <circle cx="184" cy="96" r="5.5" fill="#a78bfa" transform="rotate(12 184 96)" opacity=".95"/>
      {/* bottom-left: center+(-18,+18) = (166,114) */}
      <circle cx="166" cy="114" r="5.5" fill="#a78bfa" transform="rotate(12 184 96)" opacity=".95"/>

      {/* Small die — face showing 2: top-right, bottom-left (diagonal) */}
      {/* Die rect: x=26,y=80,w=52,h=52. Center=(52,106). rotate(-8 52 106) */}
      <rect x="26" y="80" width="52" height="52" rx="12" fill="url(#dcDie2)" stroke="rgba(167,139,250,.3)" strokeWidth="1.2" transform="rotate(-8 52 106)" filter="url(#dcShadow)"/>
      <ellipse cx="40" cy="88" rx="9" ry="5" fill="rgba(255,255,255,.1)" transform="rotate(-8 52 106)"/>
      {/* 2 dots — diagonal: top-right=(65,93), bottom-left=(39,119) */}
      <circle cx="65" cy="93" r="4" fill="#a78bfa" transform="rotate(-8 52 106)" opacity=".85"/>
      <circle cx="39" cy="119" r="4" fill="#a78bfa" transform="rotate(-8 52 106)" opacity=".85"/>
      {[[35,50],[210,60],[25,200],[215,180]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={1.5+i*.4} fill="rgba(192,132,252,.6)"/>
      ))}
    </svg>
  );
}

function BlackjackArt(){
  return(
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
      <defs>
        <radialGradient id="bjBg" cx="50%" cy="38%" r="68%"><stop offset="0%" stopColor="#0a1a08"/><stop offset="100%" stopColor="#030a02"/></radialGradient>
        <radialGradient id="bjGlow" cx="50%" cy="45%" r="55%"><stop offset="0%" stopColor="rgba(245,196,0,.22)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
        <linearGradient id="bjCard1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fffafa"/><stop offset="100%" stopColor="#ffe8e8"/></linearGradient>
        <linearGradient id="bjCard2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f8f8ff"/><stop offset="100%" stopColor="#ece8ff"/></linearGradient>
        <linearGradient id="bjCardBack" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1e0a45"/><stop offset="100%" stopColor="#0e0428"/></linearGradient>
        <filter id="bjBlur"><feGaussianBlur stdDeviation="7"/></filter>
        <filter id="bjShadow"><feDropShadow dx="2" dy="8" stdDeviation="12" floodColor="rgba(0,0,0,.85)"/></filter>
        <filter id="bjGlowF"><feGaussianBlur stdDeviation="4"/></filter>
      </defs>
      <rect width="240" height="320" fill="url(#bjBg)"/>
      {/* Felt glow */}
      <ellipse cx="120" cy="155" rx="100" ry="90" fill="url(#bjGlow)" filter="url(#bjBlur)"/>
      {/* Felt arc hint */}
      <ellipse cx="120" cy="230" rx="130" ry="35" fill="rgba(0,80,20,.18)"/>
      <ellipse cx="120" cy="232" rx="100" ry="22" fill="rgba(0,60,15,.22)"/>

      {/* ── DEALER CARDS ── */}
      {/* Back card */}
      <rect x="12" y="42" width="82" height="116" rx="10" fill="url(#bjCardBack)"
        stroke="rgba(167,139,250,.45)" strokeWidth="1.5" transform="rotate(-6 53 100)" filter="url(#bjShadow)"/>
      <rect x="17" y="47" width="72" height="106" rx="7" fill="none"
        stroke="rgba(167,139,250,.18)" transform="rotate(-6 53 100)"/>
      {/* Diagonal pattern on back */}
      <path d="M18 50 L85 155 M30 48 L97 153 M42 46 L100 140 M15 62 L75 150 M14 76 L72 155"
        stroke="rgba(167,139,250,.08)" strokeWidth="1.5" transform="rotate(-6 53 100)" clipPath="none"/>
      <text x="53" y="100" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="18" fontWeight="800" fill="rgba(167,139,250,.18)" transform="rotate(-6 53 100)">V</text>

      {/* Ace of spades — front */}
      <rect x="44" y="36" width="82" height="116" rx="10" fill="url(#bjCard2)"
        stroke="rgba(255,255,255,.88)" strokeWidth="1.6" transform="rotate(4 85 94)" filter="url(#bjShadow)"/>
      <text x="50" y="57" fontFamily="'Playfair Display',Georgia,serif" fontSize="14" fontWeight="700"
        fill="#1e1060" transform="rotate(4 85 94)">A</text>
      <text x="50" y="68" fontFamily="Georgia,serif" fontSize="10" fill="#1e1060" transform="rotate(4 85 94)">♠</text>
      <text x="85" y="102" textAnchor="middle" fontFamily="Georgia,serif" fontSize="34"
        fill="#1e1060" transform="rotate(4 85 94)">♠</text>
      {/* Shine */}
      <ellipse cx="58" cy="48" rx="12" ry="5" fill="rgba(255,255,255,.35)" transform="rotate(-10 58 48) rotate(4 85 94)"/>

      {/* ── PLAYER CARDS ── */}
      {/* Ten of hearts — correct 10-pip layout (PIP_POS["10"] scaled to 82×116 card) */}
      <rect x="100" y="140" width="82" height="116" rx="10" fill="url(#bjCard1)"
        stroke="rgba(255,255,255,.88)" strokeWidth="1.6" transform="rotate(-8 141 198)" filter="url(#bjShadow)"/>
      <text x="106" y="161" fontFamily="'Playfair Display',Georgia,serif" fontSize="12" fontWeight="700"
        fill="#9b1c1c" transform="rotate(-8 141 198)">10</text>
      <text x="106" y="172" fontFamily="Georgia,serif" fontSize="9" fill="#9b1c1c" transform="rotate(-8 141 198)">♥</text>
      {[[126,162],[156,162],[141,175],[126,186],[156,186],[126,210],[156,210],[141,221],[126,234],[156,234]].map(([px,py],pi)=>(
        <text key={pi} x={px} y={py} textAnchor="middle" fontFamily="Georgia,serif" fontSize="9"
          fill="#9b1c1c" transform="rotate(-8 141 198)">♥</text>
      ))}
      <ellipse cx="112" cy="150" rx="10" ry="5" fill="rgba(255,255,255,.3)" transform="rotate(-8 141 198)"/>

      {/* Ace of hearts */}
      <rect x="136" y="148" width="82" height="116" rx="10" fill="url(#bjCard1)"
        stroke="rgba(255,255,255,.88)" strokeWidth="1.6" transform="rotate(6 177 206)" filter="url(#bjShadow)"/>
      <text x="142" y="169" fontFamily="'Playfair Display',Georgia,serif" fontSize="14" fontWeight="700"
        fill="#9b1c1c" transform="rotate(6 177 206)">A</text>
      <text x="142" y="180" fontFamily="Georgia,serif" fontSize="10" fill="#9b1c1c" transform="rotate(6 177 206)">♥</text>
      <text x="177" y="215" textAnchor="middle" fontFamily="Georgia,serif" fontSize="34"
        fill="#9b1c1c" transform="rotate(6 177 206)">♥</text>
      <ellipse cx="148" cy="157" rx="12" ry="5" fill="rgba(255,255,255,.35)" transform="rotate(6 177 206)"/>

      {/* BLACKJACK badge */}
      <rect x="52" y="248" width="136" height="30" rx="10" fill="rgba(245,196,0,.14)" stroke="rgba(245,196,0,.5)" strokeWidth="1.2" filter="url(#bjGlowF)"/>
      <rect x="52" y="248" width="136" height="30" rx="10" fill="rgba(245,196,0,.06)"/>
      <text x="120" y="262" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="9.5" fontWeight="900" fill="rgba(245,196,0,.9)" letterSpacing="3">BLACKJACK</text>
      <text x="120" y="274" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="8" fontWeight="700" fill="rgba(245,196,0,.5)" letterSpacing="2">PAYS 3:2</text>

      {/* Sparkles */}
      {[[22,24],[218,30],[220,230],[20,228],[120,15]].map(([x,y],i)=>(
        <g key={i}>
          <line x1={x} y1={y-5} x2={x} y2={y+5} stroke="rgba(245,196,0,.55)" strokeWidth="1.3"/>
          <line x1={x-5} y1={y} x2={x+5} y2={y} stroke="rgba(245,196,0,.55)" strokeWidth="1.3"/>
        </g>
      ))}
      {[[40,185],[200,100],[30,275],[210,270]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={1.5+i*.3} fill="rgba(245,196,0,.4)"/>
      ))}
    </svg>
  );
}


const GAMES = [
  { id:"hilo",        label:"Hi-Lo",         Art:HiLoArt },
  { id:"mines",       label:"Mines",          Art:MinesArt },
  { id:"dice",        label:"Dice",           Art:DiceArt },
  { id:"blackjack",   label:"Blackjack",      Art:BlackjackArt },
  { id:"crash",       label:"Crash",          Art:null },
  { id:"wheel",       label:"Wheel",          Art:null },
  { id:"videopoker",  label:"Video Poker",    Art:null },
  { id:"keno",        label:"Keno",           Art:null },
  { id:"coinflip",    label:"Coinflip",       Art:null },
  { id:"plinko",      label:"Plinko",         Art:null },
  { id:"sweetbonanza",label:"Sweet Bonanza",  Art:null },
  { id:"doghouse",    label:"Dog House",      Art:null },
  { id:"gatesolympus",label:"Gates of Olympus",Art:null },
  { id:"lebandit",    label:"Le Bandit",      Art:null },
  { id:"cloudprincess",label:"Cloud Princess",Art:null },
];

function PlaceholderArt({ label }) {
  return (
    <div style={{
      width:"100%", height:"100%", position:"absolute", inset:0,
      background:"linear-gradient(135deg,#0d0b22,#1a0840)",
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      <span style={{color:"rgba(167,139,250,.6)", fontWeight:700, fontSize:13, textAlign:"center", padding:"0 8px"}}>{label}</span>
    </div>
  );
}

function Lobby({ setPage }) {
  return (
    <div style={{ padding:"24px 16px" }}>
      <h2 style={{ color:"#e2d9f3", fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:800, marginBottom:20, letterSpacing:1 }}>
        🎮 Games
      </h2>
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))",
        gap:14,
      }}>
        {GAMES.map(({ id, label, Art }) => (
          <div
            key={id}
            onClick={() => setPage(id)}
            style={{
              position:"relative", borderRadius:12, overflow:"hidden",
              aspectRatio:"3/4", cursor:"pointer",
              border:"1px solid rgba(167,139,250,.2)",
              boxShadow:"0 4px 20px rgba(0,0,0,.5)",
              transition:"transform .15s, box-shadow .15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 8px 30px rgba(0,0,0,.7)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,.5)"; }}
          >
            {Art ? <Art /> : <PlaceholderArt label={label} />}
            <div style={{
              position:"absolute", bottom:0, left:0, right:0,
              background:"linear-gradient(transparent, rgba(0,0,0,.85))",
              padding:"20px 10px 10px",
              fontFamily:"'Space Grotesk',sans-serif",
              fontSize:12, fontWeight:700, color:"#e2d9f3",
              textAlign:"center", letterSpacing:.5,
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Lobby, HiLoArt, MinesArt, DiceArt, BlackjackArt };
