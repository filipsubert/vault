import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { StatsModal } from "../components/StatsModal.jsx";
import { CSS_WHEEL } from "../shared/css_wheel.js";
// ── Wheel of fortune game ─────────────────────────────────────────────────────
/* ══════════════════════════════════════ WHEEL ART ════════════════════════════════ */
function WheelArt(){
  const cx=120,cy=144,r=94,ri=22,n=6;
  const rO=Math.PI/2; // rotate so 2x segment lands under pointer
  const segs=[
    {color:"#991b1b",label:"0x",   mult:0},
    {color:"#dc2626",label:"0x",   mult:0},
    {color:"#1d4ed8",label:"0.8x", mult:.8},
    {color:"#0891b2",label:"1.5x", mult:1.5},
    {color:"#7c3aed",label:"2x",   mult:2},
    {color:"#b45309",label:"1.43x",mult:1.43},
  ];
  const mA=(i)=>(i/n+.5/n)*Math.PI*2-Math.PI/2+rO;
  const lR=r*.65;
  const spokes=Array.from({length:n},(_,i)=>(i/n)*Math.PI*2-Math.PI/2+rO);
  return(
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
      <defs>
        <radialGradient id="waBg" cx="50%" cy="40%" r="72%">
          <stop offset="0%" stopColor="#160830"/><stop offset="52%" stopColor="#0a0418"/><stop offset="100%" stopColor="#02010a"/>
        </radialGradient>
        <radialGradient id="waAtm" cx="50%" cy="46%" r="55%">
          <stop offset="0%" stopColor="rgba(124,58,237,.18)"/>
          <stop offset="55%" stopColor="rgba(100,40,200,.06)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <linearGradient id="waRimG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgba(210,160,255,.9)"/>
          <stop offset="25%"  stopColor="rgba(124,58,237,.6)"/>
          <stop offset="50%"  stopColor="rgba(192,132,252,1)"/>
          <stop offset="75%"  stopColor="rgba(109,40,217,.55)"/>
          <stop offset="100%" stopColor="rgba(210,160,255,.9)"/>
        </linearGradient>
        <linearGradient id="waPtr" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7"/><stop offset="40%" stopColor="#f5c400"/><stop offset="100%" stopColor="#92400e"/>
        </linearGradient>
        <radialGradient id="waHub" cx="38%" cy="32%" r="66%">
          <stop offset="0%" stopColor="#4c1d95"/><stop offset="55%" stopColor="#220b50"/><stop offset="100%" stopColor="#0e0424"/>
        </radialGradient>
        <radialGradient id="waHubSh" cx="28%" cy="22%" r="58%">
          <stop offset="0%" stopColor="rgba(220,180,255,.5)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <linearGradient id="waBadge" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(192,132,252,0)"/>
          <stop offset="35%" stopColor="rgba(210,160,255,.55)"/>
          <stop offset="50%" stopColor="rgba(225,185,255,.7)"/>
          <stop offset="65%" stopColor="rgba(210,160,255,.55)"/>
          <stop offset="100%" stopColor="rgba(192,132,252,0)"/>
        </linearGradient>
        {segs.map((s,i)=>(
          <radialGradient key={i} id={`waSg${i}`} cx="68%" cy="24%" r="85%">
            <stop offset="0%"  stopColor={s.color} stopOpacity={i===4?.7:.4}/>
            <stop offset="55%" stopColor={s.color} stopOpacity="1"/>
            <stop offset="100%" stopColor={s.color} stopOpacity=".78"/>
          </radialGradient>
        ))}
        <filter id="waGXL"><feGaussianBlur stdDeviation="14"/></filter>
        <filter id="waGL"><feGaussianBlur stdDeviation="7"/></filter>
        <filter id="waGM"><feGaussianBlur stdDeviation="3.5"/></filter>
        <filter id="waGS"><feGaussianBlur stdDeviation="1.8"/></filter>
        <filter id="waSh"><feDropShadow dx="0" dy="8" stdDeviation="18" floodColor="rgba(0,0,0,.9)"/></filter>
        <filter id="waShS"><feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="rgba(0,0,0,.75)"/></filter>
        <filter id="waNoise" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" stitchTiles="stitch" result="n"/>
          <feColorMatrix type="saturate" values="0" in="n" result="g"/>
          <feBlend in="SourceGraphic" in2="g" mode="soft-light" result="b"/>
          <feComposite in="b" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>

      <rect width="240" height="320" fill="url(#waBg)"/>
      <ellipse cx="120" cy="144" rx="112" ry="94" fill="url(#waAtm)" filter="url(#waXL)"/>

      {[[14,20,1.1],[58,12,.9],[114,6,1.5],[170,14,1.0],[212,20,1.3],
        [230,58,.9],[234,112,1.3],[226,176,.8],[218,240,1.1],
        [8,74,1.0],[6,148,1.4],[12,220,1.0],[24,284,1.2],
        [60,302,.9],[152,308,1.1],[196,298,.8],[88,18,1.0],[202,46,1.2]].map(([x,y,rv],i)=>(
        <circle key={i} cx={x} cy={y} r={rv}
          fill={`rgba(${i%3===0?"220,200,255":i%3===1?"180,140,255":"255,255,255"},${.28+i%4*.14})`}/>
      ))}
      {[[16,46],[226,38],[232,216],[14,270]].map(([x,y],i)=>(
        <g key={i}>
          <line x1={x} y1={y-6} x2={x} y2={y+6} stroke="rgba(167,139,250,.45)" strokeWidth="1"/>
          <line x1={x-6} y1={y} x2={x+6} y2={y} stroke="rgba(167,139,250,.45)" strokeWidth="1"/>
          <circle cx={x} cy={y} r="1.3" fill="rgba(200,160,255,.8)"/>
        </g>
      ))}

      {/* Wheel shadow */}
      <ellipse cx={cx} cy={cx+14} rx={r+18} ry={14} fill="rgba(0,0,0,.6)" filter="url(#waSh)"/>

      {/* Outer rim — 3 rings */}
      <circle cx={cx} cy={cy} r={r+16} fill="none" stroke="rgba(124,58,237,.14)" strokeWidth="8"/>
      <circle cx={cx} cy={cy} r={r+14} fill="none" stroke="url(#waRimG)"          strokeWidth="3"/>
      {Array.from({length:24},(_,i)=>{
        const a=i/24*Math.PI*2;
        const gx=cx+(r+14)*Math.cos(a), gy=cy+(r+14)*Math.sin(a);
        const cols=["#c084fc","#f5c400","#60a5fa","#f87171","#34d399","#e040fb","#fbbf24","#a78bfa"];
        return <circle key={i} cx={gx} cy={gy} r={i%2===0?3.2:2.0} fill={cols[i%8]} stroke="rgba(0,0,0,.4)" strokeWidth=".7"/>;
      })}
      <circle cx={cx} cy={cy} r={r+7}  fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="1.5"/>
      <circle cx={cx} cy={cy} r={r+2}  fill="none" stroke="rgba(0,0,0,.7)"        strokeWidth="1"/>

      {/* Segments */}
      {segs.map((seg,i)=>{
        const sa=(i/n)*Math.PI*2-Math.PI/2+rO;
        const ea=((i+1)/n)*Math.PI*2-Math.PI/2+rO;
        const x1=cx+r*Math.cos(sa),y1=cy+r*Math.sin(sa);
        const x2=cx+r*Math.cos(ea),y2=cy+r*Math.sin(ea);
        const path=`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`;
        const ma=mA(i);
        const lx=cx+lR*Math.cos(ma), ly=cy+lR*Math.sin(ma);
        const isW=i===4;
        return(
          <g key={i}>
            {isW&&<path d={path} fill="rgba(160,100,255,.35)" filter="url(#waGL)"/>}
            <path d={path} fill={`url(#waSg${i})`} stroke="rgba(0,0,0,.58)" strokeWidth="1.5"/>
            <path d={path} fill={seg.color} opacity=".07" filter="url(#waNoise)"/>
            <path d={`M${cx+ri*Math.cos(sa)},${cy+ri*Math.sin(sa)} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} L${cx+ri*Math.cos(ea)},${cy+ri*Math.sin(ea)}`}
              fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="1"/>
            {isW&&<path d={path} fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.5)" strokeWidth="2"/>}
            <text x={lx} y={ly+5} textAnchor="middle"
              fontFamily="'Space Grotesk',sans-serif"
              fontSize={seg.label.length>3?"10.5":"12"}
              fontWeight="800"
              fill={isW?"#fff":"rgba(255,255,255,.88)"}
              style={{filter:isW?"drop-shadow(0 0 6px rgba(210,160,255,.9))":"drop-shadow(0 1px 3px rgba(0,0,0,.9))"}}>
              {seg.label}
            </text>
          </g>
        );
      })}

      {spokes.map((a,i)=>(
        <g key={i}>
          <line x1={cx+ri*Math.cos(a)} y1={cy+ri*Math.sin(a)} x2={cx+r*Math.cos(a)} y2={cy+r*Math.sin(a)} stroke="rgba(0,0,0,.7)" strokeWidth="2.5"/>
          <line x1={cx+ri*Math.cos(a)} y1={cy+ri*Math.sin(a)} x2={cx+r*Math.cos(a)} y2={cy+r*Math.sin(a)} stroke="rgba(255,255,255,.055)" strokeWidth="1"/>
        </g>
      ))}
      <circle cx={cx} cy={cy} r={r}   fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="2"/>
      <circle cx={cx} cy={cy} r={r+2} fill="none" stroke="rgba(0,0,0,.6)"        strokeWidth="1"/>

      {/* Hub */}
      <circle cx={cx} cy={cy} r={ri+11} fill="rgba(0,0,0,.8)" filter="url(#waShS)"/>
      <circle cx={cx} cy={cy} r={ri+9}  fill="url(#waHub)"/>
      <circle cx={cx} cy={cy} r={ri+9}  fill="none" stroke="rgba(130,55,240,.6)" strokeWidth="2.5"/>
      <circle cx={cx} cy={cy} r={ri+4}  fill="rgba(0,0,0,.3)"/>
      <circle cx={cx} cy={cy} r={ri+4}  fill="none" stroke="rgba(192,132,252,.25)" strokeWidth="1"/>
      <circle cx={cx} cy={cy} r={ri}    fill="url(#waHubSh)"/>
      <polygon points={`${cx},${cy-ri+3} ${cx+ri-4},${cy} ${cx},${cy+ri-3} ${cx-ri+4},${cy}`}
        fill="rgba(200,150,255,.08)" stroke="rgba(200,150,255,.18)" strokeWidth=".8"/>
      <circle cx={cx-5} cy={cy-5} r="5" fill="rgba(255,255,255,.13)"/>
      <circle cx={cx-3} cy={cy-3} r="2.5" fill="rgba(255,255,255,.28)"/>
      <text x={cx} y={cy+5} textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="13" fontWeight="900" fill="rgba(220,180,255,.95)">V</text>

      {/* Pointer — wide base at top, tip points DOWN into wheel */}
      <ellipse cx={cx} cy={cy-r-10} rx="16" ry="10" fill="rgba(245,196,0,.2)" filter="url(#waGM)"/>
      <polygon points={`${cx},${cy-r+10} ${cx-12},${cy-r-16} ${cx+12},${cy-r-16}`}
        fill="rgba(0,0,0,.5)" transform="translate(2,3)" filter="url(#waShS)"/>
      <polygon points={`${cx},${cy-r+10} ${cx-12},${cy-r-16} ${cx+12},${cy-r-16}`}
        fill="url(#waPtr)" stroke="rgba(110,48,0,.65)" strokeWidth="1.2"/>
      <polygon points={`${cx-12},${cy-r-16} ${cx-5},${cy-r-16} ${cx-8},${cy-r+2}`}
        fill="rgba(255,255,255,.38)"/>
      <circle cx={cx} cy={cy-r-18} r="5.5" fill="#fef3c7" stroke="rgba(170,85,0,.65)" strokeWidth="1.2"/>
      <circle cx={cx-1} cy={cy-r-20.5} r="2.2" fill="rgba(255,255,255,.9)"/>

      {/* Badge */}
      <rect x="44" y="270" width="152" height="40" rx="13" fill="rgba(124,58,237,.15)" filter="url(#waGS)"/>
      <rect x="44" y="270" width="152" height="40" rx="13" fill="rgba(8,2,20,.92)"/>
      <rect x="44" y="270" width="152" height="40" rx="13" fill="none" stroke="url(#waBadge)" strokeWidth="1.6"/>
      <text x="120" y="283" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="7.5" fontWeight="800" fill="rgba(192,132,252,.5)" letterSpacing="3.5">SPIN TO WIN</text>
      <text x="120" y="303" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="20" fontWeight="900" fill="rgba(220,180,255,.95)" letterSpacing="-0.5"
        style={{filter:"drop-shadow(0 0 8px rgba(160,100,255,.8))"}}>UP TO 2.73×</text>
    </svg>
  );
}

/* ══════════════════════════════════════ WHEEL GAME ════════════════════════════════ */
// All configs: EV = sum(mults)/6 = 5.73/6 = 0.955 → 4.5% house edge
const WHEEL_CONFIGS={
  low:{name:"Low",segments:[
    {mult:0,   color:"#dc2626",label:"0×"},
    {mult:0.8, color:"#1e40af",label:"0.8×"},
    {mult:0.8, color:"#1d4ed8",label:"0.8×"},
    {mult:1.0, color:"#0891b2",label:"1×"},
    {mult:1.5, color:"#7c3aed",label:"1.5×"},
    {mult:1.63,color:"#b45309",label:"1.63×"},
  ]},
  medium:{name:"Medium",segments:[
    {mult:0,   color:"#991b1b",label:"0×"},
    {mult:0,   color:"#dc2626",label:"0×"},
    {mult:1.5, color:"#1d4ed8",label:"1.5×"},
    {mult:2.0, color:"#0891b2",label:"2×"},
    {mult:3.0, color:"#7c3aed",label:"3×"},
    {mult:5.0, color:"#b45309",label:"5×"},
  ]},
  high:{name:"High",segments:[
    {mult:0,   color:"#7f1d1d",label:"0×"},
    {mult:0,   color:"#991b1b",label:"0×"},
    {mult:0,   color:"#dc2626",label:"0×"},
    {mult:3.0, color:"#0891b2",label:"3×"},
    {mult:10.0,color:"#7c3aed",label:"10×"},
    {mult:25.0,color:"#b45309",label:"25×"},
  ]},
};

function WheelSVG({segments,rotDeg,lastIdx,size=300}){
  const cx=size/2,cy=size/2,r=size/2-28,ri=20,n=segments.length;

  // Per-segment inner gradient IDs
  const segGradId=(i)=>`wsSeg${i}`;

  return(
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{display:"block",margin:"0 auto",maxWidth:"100%"}}>
      <defs>
        {/* Noise texture filter for segments */}
        <filter id="wsNoise" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="greyNoise"/>
          <feBlend in="SourceGraphic" in2="greyNoise" mode="soft-light" result="blend"/>
          <feComposite in="blend" in2="SourceGraphic" operator="in"/>
        </filter>
        {/* Segment radial gradients — lighter at edge, darker at center */}
        {segments.map((seg,i)=>(
          <radialGradient key={i} id={segGradId(i)} cx="70%" cy="30%" r="80%">
            <stop offset="0%" stopColor={seg.color} stopOpacity=".55"/>
            <stop offset="60%" stopColor={seg.color} stopOpacity="1"/>
            <stop offset="100%" stopColor={seg.color} stopOpacity=".85"/>
          </radialGradient>
        ))}
        {/* Outer rim gradient */}
        <linearGradient id="wsRimG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(192,132,252,.8)"/>
          <stop offset="25%" stopColor="rgba(124,58,237,.6)"/>
          <stop offset="50%" stopColor="rgba(167,139,250,.9)"/>
          <stop offset="75%" stopColor="rgba(109,40,217,.5)"/>
          <stop offset="100%" stopColor="rgba(192,132,252,.8)"/>
        </linearGradient>
        {/* Hub gradients */}
        <radialGradient id="wsHubBg" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#2e1065"/>
          <stop offset="55%" stopColor="#1a0840"/>
          <stop offset="100%" stopColor="#0d0520"/>
        </radialGradient>
        <radialGradient id="wsHubShine" cx="30%" cy="25%" r="60%">
          <stop offset="0%" stopColor="rgba(192,132,252,.4)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        {/* Pointer gradient */}
        <linearGradient id="wsPtrG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7"/>
          <stop offset="40%" stopColor="#f5c400"/>
          <stop offset="100%" stopColor="#92400e"/>
        </linearGradient>
        {/* Winner highlight */}
        <filter id="wsWinGlow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
        <filter id="wsShadow"><feDropShadow dx="0" dy="8" stdDeviation="18" floodColor="rgba(0,0,0,.8)"/></filter>
        <filter id="wsHubShadow"><feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="rgba(0,0,0,.7)"/></filter>
        <filter id="wsPtrShadow"><feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,.8)"/></filter>
        <filter id="wsRimGlow"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>

      {/* Outer ambient glow */}
      <circle cx={cx} cy={cy} r={r+26} fill="rgba(124,58,237,.06)" filter="url(#wsRimGlow)"/>

      {/* Shadow below wheel */}
      <ellipse cx={cx} cy={cy+12} rx={r+16} ry={14} fill="rgba(0,0,0,.5)" filter="url(#wsShadow)"/>

      {/* ── OUTER RIM — 3 rings + colored gem studs matching cover art ── */}
      <circle cx={cx} cy={cy} r={r+16} fill="none" stroke="rgba(124,58,237,.12)" strokeWidth="8"/>
      <circle cx={cx} cy={cy} r={r+14} fill="none" stroke="url(#wsRimG)" strokeWidth="3"/>
      {Array.from({length:24},(_,i)=>{
        const a=i/24*Math.PI*2;
        const gx=cx+(r+14)*Math.cos(a), gy=cy+(r+14)*Math.sin(a);
        const cols=["#c084fc","#f5c400","#60a5fa","#f87171","#34d399","#e040fb","#fbbf24","#a78bfa"];
        return <circle key={i} cx={gx} cy={gy} r={i%2===0?3:2} fill={cols[i%8]} stroke="rgba(0,0,0,.4)" strokeWidth=".6"/>;
      })}
      <circle cx={cx} cy={cy} r={r+7} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="1.5"/>

      {/* ── ROTATING GROUP ── */}
      <g transform={`rotate(${rotDeg} ${cx} ${cy})`}>

        {/* Segment fills with texture */}
        {segments.map((seg,i)=>{
          const sa=(i/n)*Math.PI*2-Math.PI/2, ea=((i+1)/n)*Math.PI*2-Math.PI/2;
          const x1=cx+r*Math.cos(sa),y1=cy+r*Math.sin(sa);
          const x2=cx+r*Math.cos(ea),y2=cy+r*Math.sin(ea);
          const path=`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`;
          const ma=(sa+ea)/2;
          const lx=cx+r*.68*Math.cos(ma), ly=cy+r*.68*Math.sin(ma);
          const isWinner=lastIdx===i;
          const dimmed=lastIdx!==null&&!isWinner;
          return(
            <g key={i} opacity={dimmed?.55:1}>
              {/* Base fill */}
              <path d={path} fill={`url(#${segGradId(i)})`} stroke="rgba(0,0,0,.6)" strokeWidth="1.5"/>
              {/* Subtle noise texture overlay */}
              <path d={path} fill={seg.color} opacity=".12" filter="url(#wsNoise)"/>
              {/* Top-edge highlight (shimmer near rim) */}
              <path d={`M${cx+ri*Math.cos(sa)},${cy+ri*Math.sin(sa)} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} L${cx+ri*Math.cos(ea)},${cy+ri*Math.sin(ea)}`}
                fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1"/>
              {/* Winner glow overlay */}
              {isWinner&&<path d={path} fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.5)" strokeWidth="2"/>}
              {/* Label */}
              <text x={lx} y={ly+4.5} textAnchor="middle"
                fontFamily="'Space Grotesk',sans-serif" fontSize={size>260?12.5:10.5}
                fontWeight="800" fill={isWinner?"#fff":"rgba(255,255,255,.88)"}
                style={{userSelect:"none",textShadow:"0 1px 4px rgba(0,0,0,.8)"}}>{seg.label}</text>
            </g>
          );
        })}

        {/* Spoke dividers */}
        {segments.map((_,i)=>{
          const a=(i/n)*Math.PI*2-Math.PI/2;
          return(
            <g key={i}>
              <line x1={cx+ri*Math.cos(a)} y1={cy+ri*Math.sin(a)}
                x2={cx+r*Math.cos(a)} y2={cy+r*Math.sin(a)}
                stroke="rgba(0,0,0,.7)" strokeWidth="2.5"/>
              <line x1={cx+ri*Math.cos(a)} y1={cy+ri*Math.sin(a)}
                x2={cx+r*Math.cos(a)} y2={cy+r*Math.sin(a)}
                stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
            </g>
          );
        })}
      </g>

      {/* Outer ring border (static, on top) */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="2"/>
      <circle cx={cx} cy={cy} r={r+2} fill="none" stroke="rgba(0,0,0,.6)" strokeWidth="1"/>

      {/* ── HUB (static) ── */}
      <circle cx={cx} cy={cy} r={ri+10} fill="rgba(0,0,0,.8)" filter="url(#wsHubShadow)"/>
      <circle cx={cx} cy={cy} r={ri+8} fill="url(#wsHubBg)"/>
      <circle cx={cx} cy={cy} r={ri+8} fill="none" stroke="rgba(124,58,237,.5)" strokeWidth="2"/>
      <circle cx={cx} cy={cy} r={ri+4} fill="rgba(0,0,0,.3)"/>
      <circle cx={cx} cy={cy} r={ri+4} fill="none" stroke="rgba(192,132,252,.25)" strokeWidth="1"/>
      <circle cx={cx} cy={cy} r={ri} fill="url(#wsHubShine)"/>
      {/* Hub facet diamond */}
      <polygon points={`${cx},${cy-ri+3} ${cx+ri-4},${cy} ${cx},${cy+ri-3} ${cx-ri+4},${cy}`}
        fill="rgba(192,132,252,.08)" stroke="rgba(192,132,252,.15)" strokeWidth=".8"/>
      {/* Hub shine */}
      <circle cx={cx-5} cy={cy-5} r="5" fill="rgba(255,255,255,.12)"/>
      {/* Hub label */}
      <text x={cx} y={cy+5} textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="12" fontWeight="900" fill="rgba(192,132,252,.9)" style={{userSelect:"none"}}>V</text>

      {/* ── POINTER — pointing DOWN into wheel, like a real casino wheel ── */}
      {/* Glow behind pointer base */}
      <ellipse cx={cx} cy={cy-r-10} rx="14" ry="10" fill="rgba(245,196,0,.2)" filter="url(#wsRimGlow)"/>
      {/* Shadow */}
      <polygon points={`${cx},${cy-r+12} ${cx-11},${cy-r-14} ${cx+11},${cy-r-14}`}
        fill="rgba(0,0,0,.5)" transform="translate(2,3)" filter="url(#wsPtrShadow)"/>
      {/* Body — wide at top, tip points down into rim */}
      <polygon points={`${cx},${cy-r+12} ${cx-11},${cy-r-14} ${cx+11},${cy-r-14}`}
        fill="url(#wsPtrG)" stroke="rgba(120,60,0,.6)" strokeWidth="1"/>
      {/* Left highlight */}
      <polygon points={`${cx-11},${cy-r-14} ${cx-4},${cy-r-14} ${cx-7},${cy-r+4}`}
        fill="rgba(255,255,255,.35)"/>
      {/* Gem at BASE (wide top of pointer) */}
      <circle cx={cx} cy={cy-r-16} r="4.5" fill="#fef3c7" stroke="rgba(180,100,0,.6)" strokeWidth="1"/>
      <circle cx={cx-1} cy={cy-r-18} r="1.8" fill="rgba(255,255,255,.85)"/>
    </svg>
  );
}

function WheelGame({balance,setBalance,setPage}){
  const [risk,setRisk]=useState("low");
  const [bet,setBet]=useState(10);
  const [phase,setPhase]=useState("idle");
  const [rotDeg,setRotDeg]=useState(0);
  const [lastIdx,setLastIdx]=useState(null);
  const [result,setResult]=useState(null);
  const [flash,setFlash]=useState(null);
  const [toast,setToast]=useState(null);
  const [betHistory,setBetHistory]=useState([]);
  const rotRef=useRef(0)
  const [showStats,setShowStats]=useState(false);
  const [wlStats,setWlStats]=useState({profit:0,wagered:0,wins:0,losses:0,history:[0]});;
  const isSpinning=phase==="spinning";
  const segs=WHEEL_CONFIGS[risk].segments;

  function spin(){
    if(bet<=0||bet>balance||isSpinning)return;
    sfx.start();
    setBalance(b=>+(b-bet).toFixed(2));
    setPhase("spinning"); setResult(null); setLastIdx(null);
    const idx=Math.floor(Math.random()*segs.length);
    const seg=segs[idx];
    const segAngle=360/segs.length;
    const spins=5+Math.floor(Math.random()*3);
    // Pointer is at 12-o'clock. Segment idx is under pointer when:
    // rotDeg ≡ (360 - (idx+0.5)*segAngle) mod 360
    const needFinalRot=(360-(idx+0.5)*segAngle%360+360)%360;
    const currentRot=rotRef.current%360;
    const delta=(needFinalRot-currentRot+360)%360;
    const target=rotRef.current+spins*360+delta;
    const duration=3800+Math.random()*600;
    const startTime=Date.now();
    const startRot=rotRef.current;
    let ticking=0;
    function animate(){
      const elapsed=Date.now()-startTime;
      const t=Math.min(elapsed/duration,1);
      const eased=1-Math.pow(1-t,4);
      const cur=startRot+(target-startRot)*eased;
      rotRef.current=cur;
      setRotDeg(cur);
      if(t<1){
        ticking++;
        if(ticking%3===0)sfx.wheelSpin();
        requestAnimationFrame(animate);
      } else {
        rotRef.current=target%360;
        setRotDeg(target%360);
        setLastIdx(idx); setResult(seg); setPhase("result");
        const win=+(bet*seg.mult).toFixed(2);
        sfx.wheelLand(seg.mult);
        if(seg.mult>0){
          setBalance(b=>+(b+win).toFixed(2));
          if(seg.mult>1){setFlash("g");setTimeout(()=>setFlash(null),600);setToast(`+$${(win-bet).toFixed(2)}`);setTimeout(()=>setToast(null),2200);}
        } else {
          setFlash("r");setTimeout(()=>setFlash(null),700);
        }
        setBetHistory(h=>[{mult:seg.mult,profit:+(win-bet).toFixed(2),label:seg.label},...h.slice(0,7)]);
        setWlStats(s=>{const p=+(win-bet).toFixed(2);return{profit:+(s.profit+p).toFixed(2),wagered:+(s.wagered+bet).toFixed(2),wins:p>0?s.wins+1:s.wins,losses:p<0?s.losses+1:s.losses,history:[...s.history,+(s.profit+p).toFixed(2)]};});
      }
    }
    requestAnimationFrame(animate);
  }

  return(
    <div className="gamepage"><style>{CSS_WHEEL}</style>
      {flash==="r"&&<div className="fl-r"/>}
      {flash==="g"&&<div className="fl-g"/>}
      {toast&&<div className="cashpop">{toast}</div>}
      <div className="bc">
        <a onClick={()=>setPage("lobby")}>Home</a><span style={{opacity:.35}}>›</span>
        <a onClick={()=>setPage("casino")}>Casino</a><span style={{opacity:.35}}>›</span>
        <span style={{color:"var(--tx2)",fontWeight:500}}>Wheel</span>
      </div>
      <div className="gamebody">
        {/* LEFT PANEL */}
        <div className="lp">
          <div className="fld">
            <div className="flbl">Bet Amount <span>${balance.toFixed(2)}</span></div>
            <div className="fi-w">
              <span className="fi-pre">◈</span>
              <input className="fi" type="number" min={.1} step={.5} value={bet}
                onChange={e=>!isSpinning&&setBet(Math.max(.1,+e.target.value))} disabled={isSpinning}/>
              <span className="fi-suf">USD</span>
            </div>
            <div className="qb">
              {["½","2×","5×","MAX"].map(v=>(
                <button key={v} className="qbtn" disabled={isSpinning} onClick={()=>{
                  sfx.tick();
                  if(v==="½")setBet(b=>Math.max(.1,+(b/2).toFixed(2)));
                  else if(v==="2×")setBet(b=>+(b*2).toFixed(2));
                  else if(v==="5×")setBet(b=>+(b*5).toFixed(2));
                  else setBet(Math.floor(balance*100)/100);
                }}>{v}</button>
              ))}
            </div>
          </div>
          <div className="sep"/>
          <div className="fld">
            <div className="flbl">Risk Level</div>
            <div style={{display:"flex",background:"var(--bg)",borderRadius:8,padding:3,gap:2}}>
              {["low","medium","high"].map(r=>(
                <button key={r} className={`wheel-risk-btn${risk===r?" on":""}`}
                  onClick={()=>{sfx.tick();setRisk(r);setLastIdx(null);setResult(null);}}
                  disabled={isSpinning}>
                  {r.charAt(0).toUpperCase()+r.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="sep"/>
          <div className="sr"><span className="sl">Segments</span><span className="sv" style={{color:"var(--puLL)"}}>{segs.length}</span></div>
          <div className="sr"><span className="sl">Max Win</span><span className="sv" style={{color:"var(--go)"}}>{Math.max(...segs.map(s=>s.mult)).toFixed(2)}×</span></div>
          <div className="sr"><span className="sl">Potential</span><span className="sv" style={{color:"var(--nG)"}}>${(bet*Math.max(...segs.map(s=>s.mult))).toFixed(2)}</span></div>
          {result&&<div className="sr"><span className="sl">Last Spin</span><span className="sv" style={{color:result.mult===0?"var(--rd)":result.mult>1?"var(--nG)":"var(--tx2)"}}>{result.label}</span></div>}
          <div className="sep"/>
          <div style={{minHeight:46,flexShrink:0}}>
            <button className="cta go" onClick={spin} disabled={isSpinning||bet<=0||bet>balance}
              style={isSpinning?{opacity:.6}:{}}>
              {isSpinning
                ? <span style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{display:"inline-block",animation:"orbitSpin 1s linear infinite",transformOrigin:"center"}}>◈</span>
                    Spinning...
                  </span>
                : "🎡 Spin the Wheel"}
            </button>
          </div>
          <button className="sm-btn" onClick={()=>setShowStats(true)} style={{marginTop:6,width:"100%",justifyContent:"center"}}>
            📊 Stats & History
          </button>
        </div>
        {showStats&&<StatsModal gameName="Wheel" onClose={()=>setShowStats(false)} stats={{profit:wlStats.profit,wagered:wlStats.wagered,wins:wlStats.wins,losses:wlStats.losses,history:wlStats.history}}/>}

        {/* GAME AREA */}
        <div className="garea">
          <div className="gcent" style={{maxWidth:440,alignItems:"center",gap:14}}>

            {/* Result pill */}
            <div className={`wheel-result-pill${result?" visible":" "}${result?result.mult>1?"win":result.mult===0?"lose":"push":""}`}>
              {result
                ? result.mult===0
                  ? <><span style={{fontSize:"1.1rem"}}>✕</span><span style={{color:"var(--rd)"}}>No Win — Better luck next time</span></>
                  : result.mult<1
                  ? <><span style={{color:"var(--puLL)"}}>{result.label}</span><span style={{color:"var(--tx3)",fontSize:".8rem",marginLeft:4}}>Partial return</span></>
                  : result.mult===1
                  ? <><span style={{color:"var(--tx2)"}}>Push — {result.label}</span></>
                  : <><span style={{fontSize:"1.1rem"}}>✓</span><span style={{color:"var(--nG)"}}>{result.label} — <b>+${(bet*result.mult-bet).toFixed(2)}</b></span></>
                : <span style={{color:"var(--tx3)",fontSize:".9rem"}}>Place your bet and spin</span>
              }
            </div>

            {/* Wheel */}
            <div className="wheel-svg-wrap">
              <WheelSVG segments={segs} rotDeg={rotDeg} lastIdx={result?segs.indexOf(result):null} size={300}/>
            </div>

            {/* Segment legend */}
            <div className="wheel-legend">
              {segs.map((seg,i)=>(
                <div key={i} className="wl-chip"
                  style={{background:`${seg.color}1a`,border:`1px solid ${seg.color}40`,color:"rgba(255,255,255,.85)"}}>
                  <div className="wl-dot" style={{background:seg.color}}/>
                  {seg.label}
                </div>
              ))}
            </div>

            {/* Pills */}
            <div className="pills">
              <div className="pill"><span className="pl-l">House Edge</span><span className="pl-v" style={{color:"var(--tx2)"}}>4.5%</span></div>
              <div className="pill"><span className="pl-l">Risk</span><span className="pl-v" style={{color:"var(--puLL)"}}>{WHEEL_CONFIGS[risk].name}</span></div>
              <div className="pill"><span className="pl-l">RTP</span><span className="pl-v" style={{color:"var(--nG)"}}>95.5%</span></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


export { WheelGame, WheelArt };

