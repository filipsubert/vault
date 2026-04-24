import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { StatsModal } from "../components/StatsModal.jsx";
import { CSS_VIDEOPOKER } from "../shared/css_videopoker.js";
// ── Missing constants (math.js neexportuje tieto hodnoty) ────────────────────
const RED = new Set(["♥", "♦"]);
const _RANKS = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const _SUITS = ["♠","♥","♦","♣"];
function newDeck() {
  const deck = _RANKS.flatMap(rank => _SUITS.map(suit => ({ rank, suit, visible: false })));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
// ── Video Poker game ──────────────────────────────────────────────────────────
/* ══════════════════════════════════════ VIDEO POKER ART ══════════════════════════════ */
function VideoPokerArt(){
  // Royal Flush: A♠ K♠ Q♠ J♠ 10♠
  // Cards laid in a gentle arc, large and detailed
  // viewBox 240×320
  const cards=[
    {rank:"A",  suit:"♠", rot:-16, cx:52,  cy:155, red:false},
    {rank:"K",  suit:"♠", rot:-8,  cx:84,  cy:145, red:false},
    {rank:"Q",  suit:"♠", rot:0,   cx:120, cy:140, red:false},
    {rank:"J",  suit:"♠", rot:8,   cx:156, cy:145, red:false},
    {rank:"10", suit:"♠", rot:16,  cx:188, cy:155, red:false},
  ];
  // Card dimensions: 58×82, pivot at center
  const W=58, H=82;
  return(
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
      <defs>
        {/* Deep casino background */}
        <radialGradient id="vaBg" cx="50%" cy="38%" r="72%">
          <stop offset="0%" stopColor="#1a0a38"/>
          <stop offset="50%" stopColor="#0d0520"/>
          <stop offset="100%" stopColor="#04020e"/>
        </radialGradient>
        {/* Felt surface at bottom */}
        <radialGradient id="vaFelt" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#0c2210"/>
          <stop offset="100%" stopColor="#05110a"/>
        </radialGradient>
        {/* Card face */}
        <linearGradient id="vaCardFace" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffcfa"/>
          <stop offset="100%" stopColor="#f5f0ff"/>
        </linearGradient>
        {/* Card back */}
        <linearGradient id="vaCardBack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d1270"/>
          <stop offset="100%" stopColor="#0e0428"/>
        </linearGradient>
        {/* Royal Flush badge gradient */}
        <linearGradient id="vaRfBadge" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#78350f"/>
          <stop offset="20%" stopColor="#fef3c7"/>
          <stop offset="45%" stopColor="#f5c400"/>
          <stop offset="65%" stopColor="#fef3c7"/>
          <stop offset="85%" stopColor="#d97706"/>
          <stop offset="100%" stopColor="#78350f"/>
        </linearGradient>
        {/* Chip gradients */}
        <radialGradient id="vaChip1" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#e040fb"/>
          <stop offset="55%" stopColor="#9c27b0"/>
          <stop offset="100%" stopColor="#4a0072"/>
        </radialGradient>
        <radialGradient id="vaChip2" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#00e5ff"/>
          <stop offset="55%" stopColor="#0091ea"/>
          <stop offset="100%" stopColor="#003d6b"/>
        </radialGradient>
        <radialGradient id="vaChip3" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#f5c400"/>
          <stop offset="55%" stopColor="#e65100"/>
          <stop offset="100%" stopColor="#7c2e00"/>
        </radialGradient>
        {/* Glow filters */}
        <filter id="vaGlowBig"><feGaussianBlur stdDeviation="9"/></filter>
        <filter id="vaGlowMid"><feGaussianBlur stdDeviation="5"/></filter>
        <filter id="vaGlowSm"><feGaussianBlur stdDeviation="2.5"/></filter>
        <filter id="vaCardShadow"><feDropShadow dx="0" dy="5" stdDeviation="9" floodColor="rgba(0,0,0,.9)"/></filter>
        <filter id="vaRfGlow"><feGaussianBlur stdDeviation="4"/></filter>
        {/* Felt noise texture */}
        <filter id="vaFeltNoise" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feBlend in="SourceGraphic" mode="multiply" result="blend"/>
          <feComposite in="blend" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>

      {/* ── BACKGROUND ── */}
      <rect width="240" height="320" fill="url(#vaBg)"/>

      {/* Ambient center glow */}
      <ellipse cx="120" cy="140" rx="110" ry="90" fill="rgba(124,58,237,.14)" filter="url(#vaGlowBig)"/>
      <ellipse cx="120" cy="140" rx="70" ry="55" fill="rgba(167,139,250,.08)" filter="url(#vaGlowMid)"/>

      {/* Stars */}
      {[[16,18,1.3],[55,10,1.0],[98,6,1.6],[148,10,1.1],[190,15,1.4],[225,28,1.0],
        [230,80,1.2],[228,145,0.9],[8,55,1.1],[12,125,1.5],[20,195,1.0],[10,268,1.3],
        [230,235,1.0],[60,298,0.9],[165,302,1.2]].map(([x,y,r],i)=>(
        <circle key={i} cx={x} cy={y} r={r} fill={`rgba(220,210,255,${.4+i%4*.12})`}/>
      ))}
      {/* Cross sparkles */}
      {[[28,40],[212,35],[225,178],[15,180]].map(([x,y],i)=>(
        <g key={i}>
          <line x1={x} y1={y-6} x2={x} y2={y+6} stroke="rgba(167,139,250,.45)" strokeWidth=".9"/>
          <line x1={x-6} y1={y} x2={x+6} y2={y} stroke="rgba(167,139,250,.45)" strokeWidth=".9"/>
          <circle cx={x} cy={y} r="1.2" fill="rgba(192,132,252,.7)"/>
        </g>
      ))}

      {/* ── FELT TABLE ── */}
      <ellipse cx="120" cy="265" rx="115" ry="42" fill="url(#vaFelt)"/>
      <ellipse cx="120" cy="265" rx="115" ry="42" fill="rgba(0,0,0,.1)" filter="url(#vaFeltNoise)"/>
      <ellipse cx="120" cy="265" rx="115" ry="42" fill="none" stroke="rgba(0,180,70,.18)" strokeWidth="1.5"/>
      <ellipse cx="120" cy="265" rx="108" ry="36" fill="none" stroke="rgba(0,180,70,.08)" strokeWidth="1"/>

      {/* ── CHIP STACKS ── */}
      {/* Left stack */}
      {[0,1,2,3,4].map(n=>(
        <g key={n}>
          <ellipse cx="28" cy={278-n*6} rx="14" ry="4.5"
            fill={n%2===0?"url(#vaChip1)":"rgba(80,0,120,.8)"}
            stroke="rgba(255,255,255,.25)" strokeWidth=".7"/>
          <line x1="14" y1={278-n*6} x2="42" y2={278-n*6}
            stroke="rgba(255,255,255,.22)" strokeWidth=".6"/>
        </g>
      ))}
      <ellipse cx="28" cy="248" rx="14" ry="4.5" fill="url(#vaChip1)" stroke="rgba(255,255,255,.35)" strokeWidth="1"/>
      {/* Right stack */}
      {[0,1,2,3].map(n=>(
        <g key={n}>
          <ellipse cx="212" cy={280-n*6} rx="13" ry="4.2"
            fill={n%2===0?"url(#vaChip2)":"rgba(0,60,100,.8)"}
            stroke="rgba(255,255,255,.2)" strokeWidth=".7"/>
        </g>
      ))}
      <ellipse cx="212" cy="256" rx="13" ry="4.2" fill="url(#vaChip2)" stroke="rgba(255,255,255,.3)" strokeWidth="1"/>
      {/* Center scatter chip */}
      <ellipse cx="120" cy="280" rx="12" ry="4" fill="url(#vaChip3)" stroke="rgba(245,196,0,.5)" strokeWidth="1"/>
      <line x1="108" y1="280" x2="132" y2="280" stroke="rgba(255,255,255,.2)" strokeWidth=".6"/>

      {/* ── CARDS — Royal Flush A♠ K♠ Q♠ J♠ 10♠ in a fan arc ── */}
      {cards.map((c,i)=>{
        const x=c.cx-W/2, y=c.cy-H/2;
        const col="#1e1060"; // spades are dark
        const isAce=c.rank==="A";
        const isFace=["K","Q","J"].includes(c.rank);
        return(
          <g key={i} transform={`rotate(${c.rot} ${c.cx} ${c.cy})`} filter="url(#vaCardShadow)">
            {/* Card body */}
            <rect x={x} y={y} width={W} height={H} rx="7" fill="url(#vaCardFace)" stroke="rgba(255,255,255,.92)" strokeWidth="1.4"/>
            {/* Paper grain */}
            <rect x={x} y={y} width={W} height={H} rx="7" fill="rgba(230,220,255,.06)"/>
            {/* Top-left corner */}
            <text x={x+5} y={y+14} fontFamily="Georgia,serif" fontSize="11" fontWeight="700" fill={col}>{c.rank}</text>
            <text x={x+5} y={y+23} fontFamily="Georgia,serif" fontSize="9" fill={col}>{c.suit}</text>
            {/* Bottom-right corner = top-left mirrored by rotating 180° around card center */}
            <text x={x+5} y={y+14} fontFamily="Georgia,serif" fontSize="11" fontWeight="700" fill={col} transform={`rotate(180 ${c.cx} ${c.cy})`}>{c.rank}</text>
            <text x={x+5} y={y+23} fontFamily="Georgia,serif" fontSize="9" fill={col} transform={`rotate(180 ${c.cx} ${c.cy})`}>{c.suit}</text>
            {/* Center pip / symbol */}
            {isAce?(
              <text x={c.cx} y={c.cy+10} textAnchor="middle" fontFamily="Georgia,serif" fontSize="32" fontWeight="900" fill={col}>{c.suit}</text>
            ):isFace?(
              <>
                {/* Face card — stylized */}
                <rect x={x+8} y={y+28} width={W-16} height={H-36} rx="4" fill="rgba(30,16,96,.08)"/>
                <text x={c.cx} y={c.cy+6} textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fontWeight="700" fill={col} opacity=".7">{c.suit}</text>
                <text x={c.cx} y={c.cy+22} textAnchor="middle" fontFamily="'Space Grotesk',serif" fontSize="14" fontWeight="900" fill="rgba(30,16,96,.5)">{c.rank}</text>
              </>
            ):(
              /* 10 — PIP_POS["10"] scaled to avoid corner zones.
                 Card W=58 H=82, pip area: x in [8,50], y in [18,64] (avoids corners).
                 PIP_POS x 0-100 → card_x: x-29 + 8 + px*0.42
                 PIP_POS y 0-100 → card_y: y-41 + 18 + py*0.46  */
              <>
                {[[28,14],[72,14],[50,27],[28,38],[72,38],[28,62],[72,62],[50,73],[28,86],[72,86]].map(([px,py],pi)=>{
                  const rx = -29 + 8 + px*0.42;
                  const ry = -41 + 18 + py*0.46;
                  return <text key={pi} x={c.cx+rx} y={c.cy+ry} textAnchor="middle" fontFamily="Georgia,serif" fontSize="7.5" fill={col} opacity=".82">{c.suit}</text>;
                })}
              </>
            )}
            {/* Card top shine */}
            <ellipse cx={c.cx-8} cy={y+12} rx={W*.3} ry="5" fill="rgba(255,255,255,.22)" transform={`rotate(-12 ${c.cx-8} ${y+12})`}/>
          </g>
        );
      })}

      {/* ── HOLD tag on center card (Q♠) ── */}
      <g transform="rotate(0 120 190)">
        <rect x="95" y="184" width="50" height="15" rx="7.5"
          fill="linear-gradient(135deg,#7c3aed,#c084fc)"
          stroke="rgba(192,132,252,.6)" strokeWidth="1.2"/>
        <rect x="95" y="184" width="50" height="15" rx="7.5" fill="rgba(124,58,237,.85)"/>
        <text x="120" y="195" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
          fontSize="7" fontWeight="900" fill="rgba(255,255,255,.95)" letterSpacing="1.5">HOLD</text>
      </g>

      {/* ── ROYAL FLUSH badge ── */}
      {/* Outer glow */}
      <rect x="34" y="248" width="172" height="54" rx="14" fill="rgba(245,196,0,.12)" filter="url(#vaRfGlow)"/>
      {/* Badge body */}
      <rect x="34" y="248" width="172" height="54" rx="14" fill="rgba(10,6,22,.9)" stroke="none"/>
      <rect x="34" y="248" width="172" height="54" rx="14" fill="none" stroke="url(#vaRfBadge)" strokeWidth="1.8"/>
      {/* Inner subtle bg */}
      <rect x="36" y="250" width="168" height="50" rx="12" fill="rgba(245,196,0,.04)"/>
      {/* Crown icon */}
      <path d="M54 268 L54 259 L61 264 L68 255 L75 264 L82 259 L82 268 Z"
        fill="#f5c400" opacity=".9"/>
      <rect x="52" y="267" width="32" height="5" rx="2" fill="#f5c400" opacity=".85"/>
      {/* Text */}
      <text x="148" y="265" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="7.5" fontWeight="800" fill="rgba(245,196,0,.55)" letterSpacing="3">ROYAL FLUSH</text>
      <text x="148" y="284" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="20" fontWeight="900" fill="rgba(245,196,0,.96)" letterSpacing="-0.5">800×</text>
    </svg>
  );
}

/* ══════════════════════════════════════ VIDEO POKER GAME ════════════════════════════ */
// Hand rankings
const VP_PAYS=[
  {name:"Royal Flush",   mult:800, check:(h)=>vpIsRoyalFlush(h)},
  {name:"Straight Flush",mult:50,  check:(h)=>vpIsStraightFlush(h)},
  {name:"Four of a Kind",mult:25,  check:(h)=>vpIsFourKind(h)},
  {name:"Full House",    mult:9,   check:(h)=>vpIsFullHouse(h)},
  {name:"Flush",         mult:6,   check:(h)=>vpIsFlush(h)},
  {name:"Straight",      mult:4,   check:(h)=>vpIsStraight(h)},
  {name:"Three of a Kind",mult:3,  check:(h)=>vpIsThreeKind(h)},
  {name:"Two Pair",      mult:2,   check:(h)=>vpIsTwoPair(h)},
  {name:"Jacks or Better",mult:1,  check:(h)=>vpIsJacksOrBetter(h)},
];
function vpRankVal(r){return{A:14,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,J:11,Q:12,K:13}[r]||0;}
function vpIsFlush(h){return h.every(c=>c.suit===h[0].suit);}
function vpIsStraight(h){
  let vs=h.map(c=>vpRankVal(c.rank)).sort((a,b)=>a-b);
  if(vs[4]-vs[0]===4&&new Set(vs).size===5)return true;
  // Ace-low: A2345
  if(JSON.stringify(vs)==='[2,3,4,5,14]')return true;
  return false;
}
function vpGroups(h){const m={};h.forEach(c=>{m[c.rank]=(m[c.rank]||0)+1;});return Object.values(m).sort((a,b)=>b-a);}
function vpIsRoyalFlush(h){return vpIsFlush(h)&&vpIsStraight(h)&&h.some(c=>c.rank==='A')&&h.some(c=>c.rank==='K');}
function vpIsStraightFlush(h){return vpIsFlush(h)&&vpIsStraight(h)&&!vpIsRoyalFlush(h);}
function vpIsFourKind(h){return vpGroups(h)[0]===4;}
function vpIsFullHouse(h){const g=vpGroups(h);return g[0]===3&&g[1]===2;}
function vpIsThreeKind(h){const g=vpGroups(h);return g[0]===3&&g[1]!==2;}
function vpIsTwoPair(h){const g=vpGroups(h);return g[0]===2&&g[1]===2;}
function vpIsJacksOrBetter(h){
  const m={};h.forEach(c=>{m[c.rank]=(m[c.rank]||0)+1;});
  return Object.entries(m).some(([r,cnt])=>cnt>=2&&['J','Q','K','A'].includes(r));
}
function vpEvalHand(h){
  for(const pay of VP_PAYS){if(pay.check(h))return pay;}
  return null;
}
// AI hint: suggest best holds
function vpBestHolds(hand){
  let best=0,bestMask=0;
  for(let mask=0;mask<32;mask++){
    const held=hand.filter((_,i)=>mask>>i&1);
    let score=0;
    // Royal flush draw
    if(held.length===4){
      const test=[...held,{rank:"A",suit:held[0].suit}];
      if(vpIsRoyalFlush(test))score=800;
      else if(vpIsFlush(test))score=6;
      else if(vpIsStraight(test))score=4;
    }
    // Score existing held cards
    const r=vpEvalHand(held.length===5?held:[...held,...Array(5-held.length).fill(held[0]||{rank:"2",suit:"♠"})]);
    if(r)score=Math.max(score,r.mult*(held.length/5));
    if(held.length===0)score=-1;
    if(score>best){best=score;bestMask=mask;}
  }
  return Array.from({length:5},(_,i)=>!!(bestMask>>i&1));
}

function VPCard({card,held,onToggle,dealIdx=0,phase}){
  if(!card)return null;
  const isRed=RED.has(card.suit);
  const col=isRed?"#9b1c1c":"#1e1060";
  const isFace=['J','Q','K'].includes(card.rank);
  const isAce=card.rank==='A';
  const isBack=!card.visible;
  // Single SVG viewBox — everything scales uniformly
  // viewBox: 0 0 100 141  (ratio 0.71, matches aspect-ratio:.71)
  const VW=100, VH=141;
  const VP_PIPS={
    "2":[[50,44],[50,97]],
    "3":[[50,38],[50,70],[50,103]],
    "4":[[28,42],[72,42],[28,99],[72,99]],
    "5":[[28,41],[72,41],[50,70],[28,100],[72,100]],
    "6":[[28,38],[72,38],[28,70],[72,70],[28,103],[72,103]],
    "7":[[28,38],[72,38],[50,52],[28,70],[72,70],[28,103],[72,103]],
    "8":[[28,35],[72,35],[50,50],[28,68],[72,68],[50,91],[28,106],[72,106]],
    "9":[[28,33],[72,33],[28,53],[72,53],[50,71],[28,89],[72,89],[28,108],[72,108]],
    "10":[[28,31],[72,31],[50,45],[28,58],[72,58],[28,84],[72,84],[50,97],[28,110],[72,110]],
  };
  const pips=VP_PIPS[card.rank]||[];
  const pipFs=pips.length>=10?"8.5":pips.length>=7?"9.5":"11";
  return(
    <div className="vp-card-wrap" onClick={onToggle}>
      <div className={`vp-card${phase==="dealt"||phase==="drawn"?" vp-card-deal":""}`}
        style={{animationDelay:`${dealIdx*0.08}s`,boxShadow:held?"0 8px 28px rgba(124,58,237,.5)":"0 4px 18px rgba(0,0,0,.6)"}}>
        {isBack?(
          <div className="vp-card-back"/>
        ):(
          <svg viewBox={`0 0 ${VW} ${VH}`} style={{position:"absolute",inset:0,width:"100%",height:"100%",borderRadius:10}} xmlns="http://www.w3.org/2000/svg">
            {/* Card background */}
            <rect width={VW} height={VH} rx="8" fill={isRed?"#fff8f8":"#f8f8ff"}/>
            {/* Border */}
            <rect width={VW} height={VH} rx="8" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.5"/>
            {/* Subtle gradient overlay */}
            <rect width={VW} height={VH} rx="8" fill={isRed?"rgba(155,28,28,.025)":"rgba(30,16,96,.025)"}/>

            {held&&(
              <>
                <rect width={VW} height={VH} rx="8" fill="rgba(124,58,237,.06)"/>
                <rect width={VW} height={VH} rx="8" fill="none" stroke="rgba(167,139,250,.8)" strokeWidth="2.5"/>
              </>
            )}

            {/* ── TOP-LEFT CORNER ── */}
            <text x="6" y="16" fontFamily="Georgia,serif" fontSize="13" fontWeight="700" fill={col}>{card.rank}</text>
            <text x="7" y="27" fontFamily="Georgia,serif" fontSize="10" fill={col}>{card.suit}</text>

            {/* ── BOTTOM-RIGHT CORNER (rotated 180° around center) ── */}
            <g transform={`rotate(180 ${VW/2} ${VH/2})`}>
              <text x="6" y="16" fontFamily="Georgia,serif" fontSize="13" fontWeight="700" fill={col}>{card.rank}</text>
              <text x="7" y="27" fontFamily="Georgia,serif" fontSize="10" fill={col}>{card.suit}</text>
            </g>

            {/* ── CENTER CONTENT ── */}
            {isFace?(
              // Face cards: big suit + rank letter
              <>
                <text x={VW/2} y={VH*0.52} textAnchor="middle" dominantBaseline="middle"
                  fontFamily="Georgia,serif" fontSize="38" fontWeight="700" fill={col} opacity=".75">{card.suit}</text>
                <text x={VW/2} y={VH*0.68} textAnchor="middle" dominantBaseline="middle"
                  fontFamily="Georgia,serif" fontSize="22" fontWeight="900" fill={col} opacity=".5">{card.rank}</text>
              </>
            ):isAce?(
              <text x={VW/2} y={VH/2+4} textAnchor="middle" dominantBaseline="middle"
                fontFamily="Georgia,serif" fontSize="46" fontWeight="700" fill={col}>{card.suit}</text>
            ):(
              // Pip cards
              pips.map(([px,py],pi)=>(
                <text key={pi} x={px} y={py} textAnchor="middle" dominantBaseline="middle"
                  fontFamily="Georgia,serif" fontSize={pipFs} fill={col}>{card.suit}</text>
              ))
            )}

            {/* Hold HOLD badge */}
            {held&&(
              <>
                <rect x={VW/2-18} y={VH-14} width="36" height="12" rx="6" fill="rgba(124,58,237,.9)"/>
                <text x={VW/2} y={VH-6} textAnchor="middle" dominantBaseline="middle"
                  fontFamily="'Space Grotesk',sans-serif" fontSize="6.5" fontWeight="900" fill="#fff" letterSpacing="1">HOLD</text>
              </>
            )}
          </svg>
        )}
      </div>
    </div>
  );
}

function VideoPokerGame({balance,setBalance,setPage}){
  const [phase,setPhase]=useState("bet"); // bet|dealt|drawn
  const [bet,setBet]=useState(10);
  const [hand,setHand]=useState([null,null,null,null,null]);
  const [holds,setHolds]=useState([false,false,false,false,false]);
  const [result,setResult]=useState(null);
  const [deckRef]=useState({d:newDeck()});
  const [showStats,setShowStats]=useState(false);
  const [vpStats,setVpStats]=useState({profit:0,wagered:0,wins:0,losses:0,history:[0]});

  function drawCard(){
    if(deckRef.d.length<10)deckRef.d=newDeck();
    const c=deckRef.d[0];deckRef.d=deckRef.d.slice(1);
    return {...c,visible:true};
  }

  function deal(){
    if(bet<=0||bet>balance)return;
    sfx.deal();
    setBalance(b=>+(b-bet).toFixed(2));
    const newHand=Array.from({length:5},()=>drawCard());
    setHand(newHand);
    setHolds([false,false,false,false,false]);
    setResult(null);
    setPhase("dealt");
  }

  function toggleHold(i){
    if(phase!=="dealt")return;
    sfx.click();
    setHolds(h=>{const n=[...h];n[i]=!n[i];return n;});
  }

  function draw(){
    sfx.deal();
    const newHand=hand.map((c,i)=>holds[i]?c:drawCard());
    setHand(newHand);
    setPhase("drawn");
    const r=vpEvalHand(newHand);
    if(r){
      const win=+(bet*r.mult).toFixed(2);
      setBalance(b=>+(b+win).toFixed(2));
      sfx.win(r.mult);
      setResult({...r,win,profit:+(win-bet).toFixed(2)});
      setVpStats(s=>({profit:+(s.profit+(win-bet)).toFixed(2),wagered:+(s.wagered+bet).toFixed(2),wins:s.wins+1,losses:s.losses,history:[...s.history,+(s.profit+(win-bet)).toFixed(2)]}));
    } else {
      sfx.lose();
      setResult(null);
      setVpStats(s=>({profit:+(s.profit-bet).toFixed(2),wagered:+(s.wagered+bet).toFixed(2),wins:s.wins,losses:s.losses+1,history:[...s.history,+(s.profit-bet).toFixed(2)]}));
    }
  }

  function newGame(){sfx.click();setPhase("bet");setHand([null,null,null,null,null]);setHolds([false,false,false,false,false]);setResult(null);}

  const winRow=result?VP_PAYS.findIndex(p=>p.name===result.name):-1;

  return(
    <div className="gamepage"><style>{CSS_VIDEOPOKER}</style>
      <div className="bc">
        <a onClick={()=>setPage("lobby")}>Home</a><span style={{opacity:.35}}>›</span>
        <a onClick={()=>setPage("casino")}>Casino</a><span style={{opacity:.35}}>›</span>
        <span style={{color:"var(--tx2)",fontWeight:500}}>Video Poker</span>
      </div>
      <div className="gamebody">
        {/* LEFT PANEL */}
        <div className="lp">
          <div className="fld">
            <div className="flbl">Bet Amount <span>${balance.toFixed(2)}</span></div>
            <div className="fi-w">
              <span className="fi-pre">◈</span>
              <input className="fi" type="number" min={1} step={1} value={bet}
                onChange={e=>phase==="bet"&&setBet(Math.max(1,+e.target.value))} disabled={phase!=="bet"}/>
              <span className="fi-suf">USD</span>
            </div>
            <div className="qb">
              {["½","2×","5×","MAX"].map(v=>(
                <button key={v} className="qbtn" disabled={phase!=="bet"} onClick={()=>{
                  sfx.tick();
                  if(v==="½")setBet(b=>Math.max(1,+(b/2).toFixed(0)));
                  else if(v==="2×")setBet(b=>+(b*2).toFixed(0));
                  else if(v==="5×")setBet(b=>+(b*5).toFixed(0));
                  else setBet(Math.floor(balance));
                }}>{v}</button>
              ))}
            </div>
          </div>
          <div className="sep"/>
          <div className="sr"><span className="sl">Bet</span><span className="sv" style={{color:"var(--go)"}}>${bet.toFixed(2)}</span></div>
          <div className="sr"><span className="sl">Max Win</span><span className="sv" style={{color:"var(--puLL)"}}>${(bet*800).toLocaleString()}</span></div>
          <div className="sr"><span className="sl">RTP</span><span className="sv" style={{color:"var(--nG)"}}>95.5%</span></div>
          <div className="sep"/>
          {phase==="bet"&&<button className="vp-deal-btn" onClick={deal} disabled={bet<=0||bet>balance}>🃏 Deal Cards</button>}
          {phase==="dealt"&&<button className="vp-draw-btn" onClick={draw}>⚡ Draw</button>}
          {phase==="drawn"&&<button className="vp-deal-btn" onClick={newGame}>↺ New Game</button>}
          <button className="sm-btn" onClick={()=>setShowStats(true)} style={{marginTop:8,width:"100%",justifyContent:"center"}}>
            📊 Stats & History
          </button>
        </div>
        {showStats&&<StatsModal gameName="Video Poker" onClose={()=>setShowStats(false)} stats={vpStats}/>}

        {/* GAME AREA */}
        <div className="garea">
          <div className="gcent" style={{maxWidth:580,gap:12}}>

            {/* Result bar */}
            <div style={{minHeight:44}}>
              {phase==="drawn"&&(
                <div className={`vp-result-bar${result?"":" lose"}`}>
                  <span className="vp-result-name">{result?result.name:"No Win"}</span>
                  <span className="vp-result-amt">{result?`+$${result.profit.toFixed(2)}`:`-$${bet.toFixed(2)}`}</span>
                </div>
              )}
              {phase==="dealt"&&(
                <div style={{padding:"10px 16px",borderRadius:12,background:"rgba(124,58,237,.07)",border:"1px solid rgba(167,139,250,.2)",fontSize:".8rem",color:"var(--tx2)",textAlign:"center"}}>
                  👆 Tap cards to hold, then Draw
                </div>
              )}
            </div>

            {/* Table with paytable + cards */}
            <div className="vp-table">
              <div className="vp-inner">
                {/* Paytable */}
                <table className="vp-paytable">
                  <tbody>
                    {VP_PAYS.map((p,i)=>(
                      <tr key={i} className={winRow===i?"vp-winner":""}>
                        <td><span className={`vp-pt-name${winRow===i?" highlighted":""}`}>{p.name.toUpperCase()}</span></td>
                        <td><span className="vp-pt-mult">{p.mult}×</span></td>
                        <td><span className="vp-pt-win">${(bet*p.mult).toFixed(2)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Cards */}
                <div className="vp-cards">
                  {hand.map((c,i)=>(
                    <VPCard key={i} card={c} held={holds[i]} onToggle={()=>toggleHold(i)}
                      dealIdx={i} phase={phase}/>
                  ))}
                </div>

                {/* Action hint */}
                {phase==="bet"&&(
                  <div style={{textAlign:"center",padding:"8px 0 4px",fontSize:".7rem",color:"var(--tx3)"}}>
                    Set your bet and Deal to start
                  </div>
                )}
              </div>
            </div>

            {/* Pills */}
            <div className="pills">
              <div className="pill"><span className="pl-l">House Edge</span><span className="pl-v" style={{color:"var(--tx2)"}}>4.5%</span></div>
              <div className="pill"><span className="pl-l">Decks</span><span className="pl-v" style={{color:"var(--puLL)"}}>1</span></div>
              <div className="pill"><span className="pl-l">Jacks or Better</span><span className="pl-v" style={{color:"var(--nG)"}}>1×</span></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


export { VideoPokerGame, VideoPokerArt };

