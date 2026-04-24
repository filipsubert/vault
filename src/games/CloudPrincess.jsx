import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { StatsModal } from "../components/StatsModal.jsx";
// ── Cloud Princess slot ───────────────────────────────────────────────────────
/* ═══════════════════════════════════════════════════════════════════════════════
   ██████╗██╗      ██████╗ ██╗   ██╗██████╗     ██████╗ ██████╗ ██╗███╗   ██╗
  ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗    ██╔══██╗██╔══██╗██║████╗  ██║
  ██║     ██║     ██║   ██║██║   ██║██║  ██║    ██████╔╝██████╔╝██║██╔██╗ ██║
  ██║     ██║     ██║   ██║██║   ██║██║  ██║    ██╔═══╝ ██╔══██╗██║██║╚██╗██║
  ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝    ██║     ██║  ██║██║██║ ╚████║
   ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝     ╚═╝     ╚═╝  ╚═╝╚═╝╚═╝ ╚═══╝
   Cloud Princess — Hacksaw-style 6×5 Scatter Pays with Cascading Multipliers
  ═══════════════════════════════════════════════════════════════════════════════ */

const CP_ROWS=5,CP_COLS=6;
const CP_SYMS={
  // ── HIGH (Characters) ─────────────────────────────────────────────
  princess:{name:"Princess",w:{base:.060,bonus:.060},
    pay:[[8,4],[9,6],[10,8],[11,16],[13,40],[15,80],[17,240],[19,800]]},
  fairy:   {name:"Fairy",   w:{base:.065,bonus:.065},
    pay:[[8,3],[9,4.6],[10,6],[11,12],[13,30],[15,60],[17,180],[19,600]]},
  unicorn: {name:"Unicorn", w:{base:.070,bonus:.070},
    pay:[[8,3],[9,4.6],[10,6],[11,12],[13,30],[15,60],[17,180],[19,600]]},
  dragon:  {name:"Dragon",  w:{base:.075,bonus:.075},
    pay:[[8,2],[9,3],[10,4],[11,8],[13,20],[15,40],[17,120],[19,400]]},
  // ── LOW (Gems) ────────────────────────────────────────────────────
  gem_red:   {name:"Red Gem",   w:{base:.135,bonus:.135},
    pay:[[8,0.4],[9,0.8],[10,2],[11,4],[13,10],[15,20],[17,40],[19,100]]},
  gem_blue:  {name:"Blue Gem",  w:{base:.135,bonus:.135},
    pay:[[8,0.4],[9,0.8],[10,2],[11,4],[13,10],[15,20],[17,40],[19,100]]},
  gem_green: {name:"Green Gem", w:{base:.135,bonus:.135},
    pay:[[8,0.4],[9,0.8],[10,2],[11,4],[13,10],[15,20],[17,40],[19,100]]},
  gem_purple:{name:"Purple Gem",w:{base:.140,bonus:.140},
    pay:[[8,0.4],[9,0.8],[10,2],[11,4],[13,10],[15,20],[17,40],[19,100]]},
  // ── SPECIAL ───────────────────────────────────────────────────────
  scatter: {name:"Moon",    w:{base:.011,bonus:.014}, pay:[]},
  // Multipliers — land as symbols, escalate through cascades
  // Base weights drastically reduced so multipliers are rare in base game
  normal_mult:{name:"Normal×", w:{base:.0025,bonus:.014}, pay:[]},
  super_mult: {name:"Super×",  w:{base:.0010,bonus:.008}, pay:[]},
  epic_mult:  {name:"Epic×",   w:{base:.0004,bonus:.0014}, pay:[]},
};

const CP_SPECIAL=new Set(["scatter","normal_mult","super_mult","epic_mult"]);

// scatterBoost: 1=normal, 2=anteBet, 5=bonushunt feature
function cpRandSym(isBonus=false,anteBet=false,scatterBoost=1){
  const mode=isBonus?"bonus":"base";
  const pool=[];
  Object.entries(CP_SYMS).forEach(([k,v])=>{
    let w=v.w[mode];
    if(k==="scatter"){
      if(scatterBoost>1)w=w*scatterBoost;
      else if(anteBet)w=w*2;
    }
    const n=Math.round(w*1000);
    for(let i=0;i<n;i++)pool.push(k);
  });
  return pool[Math.floor(Math.random()*pool.length)];
}

function cpGenGrid(isBonus=false,anteBet=false){
  const colHasScatter=Array(CP_COLS).fill(false);
  return Array.from({length:CP_ROWS},()=>Array.from({length:CP_COLS},(_,c)=>{
    let sym=cpRandSym(isBonus,anteBet);
    if(sym==="scatter"){
      if(colHasScatter[c]){do{sym=cpRandSym(isBonus,anteBet);}while(sym==="scatter");}
      else colHasScatter[c]=true;
    }
    return sym;
  }));
}

function cpSymPay(sym,count){
  const t=CP_SYMS[sym]?.pay;
  if(!t||!t.length)return 0;
  let p=0;
  for(const[min,mult]of t){if(count>=min)p=mult;}
  return p;
}

function cpFindWinners(grid){
  const counts={};
  grid.forEach(row=>row.forEach(s=>{if(s&&!CP_SPECIAL.has(s))counts[s]=(counts[s]||0)+1;}));
  return Object.entries(counts).filter(([,c])=>c>=8).map(([s])=>s);
}

function cpGravity(grid){
  const ng=Array.from({length:CP_ROWS},()=>Array(CP_COLS).fill(null));
  const dd=Array.from({length:CP_ROWS},()=>Array(CP_COLS).fill(0));
  for(let c=0;c<CP_COLS;c++){
    const col=[];
    for(let r=0;r<CP_ROWS;r++){if(grid[r][c]!==null)col.push({s:grid[r][c],or:r});}
    const sr=CP_ROWS-col.length;
    for(let i=0;i<col.length;i++){const nr=sr+i;ng[nr][c]=col[i].s;dd[nr][c]=nr-col[i].or;}
  }
  return{ng,dd};
}

function cpFill(grid,isBonus,anteBet=false){
  const colHasScatter=Array(CP_COLS).fill(false);
  grid.forEach(row=>row.forEach((s,c)=>{if(s==="scatter")colHasScatter[c]=true;}));
  return grid.map(row=>row.map((s,c)=>{
    if(s!==null)return s;
    let sym=cpRandSym(isBonus,anteBet);
    if(sym==="scatter"){
      if(colHasScatter[c]){do{sym=cpRandSym(isBonus,anteBet);}while(sym==="scatter");}
      else colHasScatter[c]=true;
    }
    return sym;
  }));
}

function cpFillCapped(grid,isBonus,maxPerSym=7){
  const counts={};
  const colHasScatter=Array(CP_COLS).fill(false);
  grid.forEach(row=>row.forEach((s,c)=>{
    if(s===null)return;
    if(s==="scatter"){colHasScatter[c]=true;return;}
    if(!CP_SPECIAL.has(s))counts[s]=(counts[s]||0)+1;
  }));
  return grid.map(row=>row.map((s,c)=>{
    if(s!==null)return s;
    let sym,tries=0;
    do{
      sym=cpRandSym(isBonus);tries++;
      if(sym==="scatter"&&colHasScatter[c])continue;
      if(!CP_SPECIAL.has(sym)&&(counts[sym]||0)>=maxPerSym)continue;
      break;
    }while(tries<50);
    if(sym==="scatter")colHasScatter[c]=true;
    else if(!CP_SPECIAL.has(sym))counts[sym]=(counts[sym]||0)+1;
    return sym;
  }));
}

function cpRollCascadeDepth(isBonus){
  const r=Math.random();
  if(!isBonus){
    if(r<0.30)return 0;
    if(r<0.55)return 1;
    if(r<0.84)return 2;
    if(r<0.91)return 3;
    if(r<0.95)return 4;
    if(r<0.972)return 5;
    if(r<0.986)return 6;
    if(r<0.994)return 7;
    return 10;
  }else{
    if(r<0.20)return 0;
    if(r<0.48)return 1;
    if(r<0.68)return 2;
    if(r<0.80)return 3;
    if(r<0.89)return 4;
    if(r<0.95)return 5;
    if(r<0.98)return 6;
    return 10;
  }
}

function cpForceFirstWin(isBonus){
  const lowSyms=["gem_red","gem_blue","gem_green","gem_purple"];
  const forceSym=lowSyms[Math.floor(Math.random()*lowSyms.length)];
  const forceCount=8+Math.floor(Math.random()*3);
  const pos=[];
  for(let r=0;r<CP_ROWS;r++)for(let c=0;c<CP_COLS;c++)pos.push([r,c]);
  for(let i=pos.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pos[i],pos[j]]=[pos[j],pos[i]];}
  const g=Array.from({length:CP_ROWS},()=>Array(CP_COLS).fill(null));
  for(let i=0;i<forceCount;i++)g[pos[i][0]][pos[i][1]]=forceSym;
  const colHasScatter=Array(CP_COLS).fill(false);
  for(let i=forceCount;i<pos.length;i++){
    const[r,c]=pos[i];
    let sym,tries=0;
    do{sym=cpRandSym(isBonus);tries++;}while(tries<30&&(sym===forceSym||(sym==="scatter"&&colHasScatter[c])));
    if(sym==="scatter")colHasScatter[c]=true;
    g[r][c]=sym;
  }
  return g;
}

function cpGenGridForDepth(isBonus,depth,anteBet=false){
  if(depth===0){
    for(let i=0;i<50;i++){const g=cpGenGrid(isBonus,anteBet);if(cpFindWinners(g).length===0)return g;}
    return cpFillCapped(Array.from({length:CP_ROWS},()=>Array(CP_COLS).fill(null)),isBonus,7);
  }
  for(let i=0;i<50;i++){const g=cpGenGrid(isBonus,anteBet);if(cpFindWinners(g).length>0)return g;}
  return cpForceFirstWin(isBonus);
}

// Force at least one mult symbol onto the grid (for feature spins)
function cpForceMultInGrid(g){
  const hasMult=g.flat().some(s=>s==="normal_mult"||s==="super_mult"||s==="epic_mult");
  if(hasMult)return g;
  const cells=[];
  for(let r=0;r<CP_ROWS;r++)for(let c=0;c<CP_COLS;c++){if(!CP_SPECIAL.has(g[r][c]))cells.push([r,c]);}
  if(!cells.length)return g;
  const[r,c]=cells[Math.floor(Math.random()*cells.length)];
  g[r][c]="normal_mult";
  return g;
}

// Generate a grid for feature spin: guaranteed cluster win + guaranteed mult
function cpGenGridFeature(isBonus,scatterBoost=1){
  const colHasScatter=Array(CP_COLS).fill(false);
  const genCell=(c)=>{
    let sym=cpRandSym(isBonus,false,scatterBoost);
    if(sym==="scatter"){
      if(colHasScatter[c]){do{sym=cpRandSym(isBonus,false,scatterBoost);}while(sym==="scatter");}
      else colHasScatter[c]=true;
    }
    return sym;
  };
  for(let attempt=0;attempt<60;attempt++){
    colHasScatter.fill(false);
    const g=Array.from({length:CP_ROWS},()=>Array.from({length:CP_COLS},(_,c)=>genCell(c)));
    if(cpFindWinners(g).length>0)return g; // NO forced mult — same rarity as base game
  }
  return cpForceFirstWin(isBonus); // fallback: just guarantee a cluster win, no extra mult
}

// Multiplier initial values
function cpRollMultValue(type){
  if(type==="normal_mult")return[2,3,4][Math.floor(Math.random()*3)];
  if(type==="super_mult")return[5,10,15,20][Math.floor(Math.random()*4)];
  if(type==="epic_mult")return[5,10,50,100][Math.floor(Math.random()*4)];
  return 2;
}

// Escalate multiplier value by exactly one cascade step (applied directly to currentVal)
// normal_mult: +1 per cascade
// super_mult:  +2 per cascade
// epic_mult:   ×2 per cascade
function cpEscalateMultStep(type,currentVal){
  if(type==="normal_mult")return Math.min(currentVal+1,10);
  if(type==="super_mult")return currentVal+2;
  if(type==="epic_mult")return currentVal*2;
  return currentVal;
}

// Returns the value a mult contributes to the pool DISPLAY.
// normal_mult uses poolContrib — starts at baseVal for initial mults, 0 for mid-spin fills,
// so new symbols falling in during a cascade never cause a sudden pool jump; they grow +1/cascade.
// super/epic always use currentVal (reveal mechanics work differently for those).
function cpMultPoolVal(m){
  return m.type==="normal_mult"?(m.poolContrib??m.currentVal):m.currentVal;
}

/* ── Cloud Princess Art (lobby thumbnail) ── */
function CloudPrincessArt(){
  return(
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
      <defs>
        <radialGradient id="cpABg" cx="50%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#2a1060"/><stop offset="45%" stopColor="#120838"/><stop offset="100%" stopColor="#06020f"/>
        </radialGradient>
        <radialGradient id="cpAGlow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="rgba(180,120,255,.5)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="cpAMoon" cx="35%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#fffde0"/><stop offset="40%" stopColor="#ffe082"/><stop offset="100%" stopColor="#c8a000"/>
        </radialGradient>
        <filter id="cpABlr"><feGaussianBlur stdDeviation="10"/></filter>
        <filter id="cpADrp"><feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,.9)"/></filter>
        <filter id="cpAGl"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="rgba(180,120,255,.7)"/></filter>
      </defs>
      <rect width="240" height="320" fill="url(#cpABg)"/>
      {/* Stars */}
      {Array.from({length:60},(_,i)=><circle key={i} cx={(i*43+i%9*21)%240} cy={(i*29+i%7*19)%260} r={.3+i%4*.35} fill="rgba(220,200,255,.85)" opacity={.2+i%5*.15}/>)}
      {/* Atmospheric glow */}
      <ellipse cx="120" cy="140" rx="130" ry="85" fill="url(#cpAGlow)" filter="url(#cpABlr)"/>
      {/* Crescent moon */}
      <g filter="url(#cpADrp)">
        <circle cx="175" cy="55" r="30" fill="url(#cpAMoon)"/>
        <circle cx="188" cy="45" r="26" fill="url(#cpABg)"/>
      </g>
      {/* Clouds */}
      {[[30,200,90],[120,210,100],[190,195,80],[60,240,70],[160,235,85]].map(([x,y,w],i)=>(
        <ellipse key={i} cx={x} cy={y} rx={w*.55} ry={w*.25} fill={`rgba(${180+i*12},${160+i*10},${220+i*6},.${15+i*3})`} filter="url(#cpABlr)"/>
      ))}
      {/* Princess silhouette */}
      <g transform="translate(80,95)" filter="url(#cpAGl)">
        {/* Dress */}
        <path d="M30,50 Q5,70 0,110 L60,110 Q55,70 30,50Z" fill="rgba(200,160,255,.85)" stroke="rgba(255,200,255,.4)" strokeWidth="1"/>
        <path d="M15,65 L30,55 L45,65 L40,110 L20,110Z" fill="rgba(255,220,255,.25)"/>
        {/* Head */}
        <circle cx="30" cy="35" r="17" fill="rgba(255,225,200,.9)"/>
        {/* Hair */}
        <path d="M14,30 Q12,15 20,10 Q30,5 40,10 Q48,15 46,30" fill="rgba(255,220,100,.85)"/>
        <path d="M14,30 Q10,40 12,50" stroke="rgba(255,220,100,.7)" strokeWidth="4" fill="none"/>
        <path d="M46,30 Q50,40 48,50" stroke="rgba(255,220,100,.7)" strokeWidth="4" fill="none"/>
        {/* Crown */}
        <path d="M18,18 L22,8 L26,15 L30,5 L34,15 L38,8 L42,18" fill="rgba(255,215,0,.9)" stroke="rgba(200,170,0,.8)" strokeWidth="1"/>
        {/* Eyes */}
        <ellipse cx="24" cy="36" rx="2.5" ry="2" fill="rgba(100,60,200,.9)"/>
        <ellipse cx="36" cy="36" rx="2.5" ry="2" fill="rgba(100,60,200,.9)"/>
        <circle cx="24" cy="35.5" r="1" fill="#fff" opacity=".6"/>
        <circle cx="36" cy="35.5" r="1" fill="#fff" opacity=".6"/>
        {/* Smile */}
        <path d="M26,42 Q30,46 34,42" fill="none" stroke="rgba(200,120,100,.6)" strokeWidth="1" strokeLinecap="round"/>
      </g>
      {/* Multiplier orbs */}
      {[
        [35,170,14,"×3","rgba(100,200,255,.9)"],
        [195,160,13,"×10","rgba(255,100,200,.9)"],
        [45,270,12,"×50","rgba(255,200,50,.9)"],
        [190,260,13,"×2","rgba(120,255,180,.9)"]
      ].map(([x,y,r,t,col],i)=>(
        <g key={i} filter="url(#cpADrp)">
          <circle cx={x} cy={y} r={r+3} fill="rgba(180,120,255,.15)" filter="url(#cpABlr)"/>
          <circle cx={x} cy={y} r={r} fill={`rgba(${40+i*10},${20+i*8},${80+i*12},.9)`} stroke={col} strokeWidth="1.5"/>
          <text x={x} y={y+4} textAnchor="middle" fontSize={r*.6} fill="#fff" fontWeight="900" fontFamily="'Space Grotesk',sans-serif">{t}</text>
        </g>
      ))}
      {/* Sparkles */}
      {[[60,130],[170,125],[100,175],[200,200],[30,250]].map(([x,y],i)=>(
        <g key={i} opacity={.5+i*.08}>
          <line x1={x-4} y1={y} x2={x+4} y2={y} stroke="rgba(255,220,255,.8)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1={x} y1={y-4} x2={x} y2={y+4} stroke="rgba(255,220,255,.8)" strokeWidth="1.2" strokeLinecap="round"/>
        </g>
      ))}
      {/* Title text */}
      <text x="120" y="300" textAnchor="middle" fontSize="17" fill="#fff" fontWeight="900" fontFamily="'Playfair Display',serif" opacity=".95">Cloud Princess</text>
      <rect width="240" height="320" fill="url(#cpABg)" opacity=".08"/>
    </svg>
  );
}

/* ── Cloud Princess Symbol Renderers ── */
// PRINCESS — Red ornate highest-tier character (800× max, red demon-like ornate in image)
const CpPrincessSym=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="88%" height="88%">
    <defs>
      <radialGradient id="cpPrBg" cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#2a0008"/><stop offset="100%" stopColor="#0e0003"/></radialGradient>
      <radialGradient id="cpPrFace" cx="42%" cy="35%" r="58%"><stop offset="0%" stopColor="#ffd0c0"/><stop offset="55%" stopColor="#e89878"/><stop offset="100%" stopColor="#b06040"/></radialGradient>
      <linearGradient id="cpPrOrn" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ffa0a0"/><stop offset="50%" stopColor="#e04040"/><stop offset="100%" stopColor="#900010"/></linearGradient>
      <radialGradient id="cpPrGem" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#fff0f0"/><stop offset="50%" stopColor="#ff6060"/><stop offset="100%" stopColor="#cc0020"/></radialGradient>
      <filter id="cpPrGl"><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ff2244" floodOpacity=".9"/></filter>
      <filter id="cpPrGl2"><feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#ffaaaa" floodOpacity=".8"/></filter>
    </defs>
    <rect x="1" y="1" width="50" height="50" rx="9" fill="url(#cpPrBg)"/>
    {/* Top ornament arch */}
    <path d="M14,7 Q26,2 38,7 Q40,12 38,15 L26,12 L14,15 Q12,12 14,7Z" fill="url(#cpPrOrn)" filter="url(#cpPrGl)" opacity=".9"/>
    <circle cx="26" cy="7" r="3" fill="url(#cpPrGem)" filter="url(#cpPrGl2)"/>
    {/* Decorative side wings */}
    <path d="M4,20 Q8,14 11,18 Q9,22 8,28 Q6,24 4,20Z" fill="rgba(200,50,60,.6)" stroke="rgba(255,100,80,.4)" strokeWidth=".6"/>
    <path d="M48,20 Q44,14 41,18 Q43,22 44,28 Q46,24 48,20Z" fill="rgba(200,50,60,.6)" stroke="rgba(255,100,80,.4)" strokeWidth=".6"/>
    {/* Character face */}
    <ellipse cx="26" cy="26" rx="11" ry="12" fill="url(#cpPrFace)" filter="url(#cpPrGl2)"/>
    {/* Hair / headdress — red/dark */}
    <path d="M16,20 Q14,12 19,9 Q26,6 33,9 Q38,12 36,20" fill="rgba(160,20,20,.9)" stroke="rgba(220,60,60,.5)" strokeWidth=".7"/>
    <path d="M16,20 Q15,23 15,26" stroke="rgba(140,20,20,.8)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M36,20 Q37,23 37,26" stroke="rgba(140,20,20,.8)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    {/* Crown on top */}
    <path d="M19,15 L22,8 L25,13 L26,7 L27,13 L30,8 L33,15" fill="rgba(255,200,50,.9)" stroke="rgba(200,150,0,.7)" strokeWidth=".7" filter="url(#cpPrGl2)"/>
    {/* Eyes */}
    <ellipse cx="22" cy="25" rx="2.8" ry="2.2" fill="rgba(180,0,20,.95)"/>
    <ellipse cx="30" cy="25" rx="2.8" ry="2.2" fill="rgba(180,0,20,.95)"/>
    <circle cx="22" cy="24.5" r="1.1" fill="rgba(255,80,80,.7)"/>
    <circle cx="30" cy="24.5" r="1.1" fill="rgba(255,80,80,.7)"/>
    <circle cx="22.8" cy="24" r=".7" fill="#fff" opacity=".9"/>
    <circle cx="30.8" cy="24" r=".7" fill="#fff" opacity=".9"/>
    {/* Smile / expression */}
    <path d="M22,31 Q26,34 30,31" fill="none" stroke="rgba(180,50,50,.7)" strokeWidth="1.1" strokeLinecap="round"/>
    {/* Bottom gem ornament */}
    <path d="M18,43 Q26,48 34,43 Q32,40 26,42 Q20,40 18,43Z" fill="url(#cpPrOrn)" opacity=".85"/>
    <circle cx="26" cy="43" r="2.5" fill="url(#cpPrGem)" filter="url(#cpPrGl2)"/>
  </svg>
));
// FAIRY — Purple ornate fairy character (600× tier, 3rd symbol in high row of image)
const CpFairySym=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="88%" height="88%">
    <defs>
      <radialGradient id="cpFaBg" cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#180030"/><stop offset="100%" stopColor="#08001a"/></radialGradient>
      <radialGradient id="cpFaFace" cx="42%" cy="38%" r="58%"><stop offset="0%" stopColor="#ffe8f8"/><stop offset="55%" stopColor="#e0b0d8"/><stop offset="100%" stopColor="#b070a8"/></radialGradient>
      <radialGradient id="cpFaGem" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#f8d0ff"/><stop offset="50%" stopColor="#c050e8"/><stop offset="100%" stopColor="#7000b0"/></radialGradient>
      <linearGradient id="cpFaWing" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="rgba(200,120,255,.7)"/><stop offset="100%" stopColor="rgba(100,20,180,.3)"/></linearGradient>
      <filter id="cpFaGl"><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#cc44ff" floodOpacity=".9"/></filter>
      <filter id="cpFaGl2"><feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#e088ff" floodOpacity=".8"/></filter>
    </defs>
    <rect x="1" y="1" width="50" height="50" rx="9" fill="url(#cpFaBg)"/>
    {/* Fairy wings — left */}
    <path d="M14,22 Q4,14 6,8 Q12,10 16,18 Q14,20 14,22Z" fill="url(#cpFaWing)" stroke="rgba(180,100,255,.6)" strokeWidth=".7"/>
    <path d="M14,28 Q3,26 5,34 Q11,34 15,28Z" fill="url(#cpFaWing)" stroke="rgba(180,100,255,.5)" strokeWidth=".6" opacity=".8"/>
    {/* Fairy wings — right */}
    <path d="M38,22 Q48,14 46,8 Q40,10 36,18 Q38,20 38,22Z" fill="url(#cpFaWing)" stroke="rgba(180,100,255,.6)" strokeWidth=".7"/>
    <path d="M38,28 Q49,26 47,34 Q41,34 37,28Z" fill="url(#cpFaWing)" stroke="rgba(180,100,255,.5)" strokeWidth=".6" opacity=".8"/>
    {/* Wing shimmer lines */}
    <path d="M14,22 Q8,16 8,10" stroke="rgba(220,160,255,.5)" strokeWidth=".5" fill="none"/>
    <path d="M38,22 Q44,16 44,10" stroke="rgba(220,160,255,.5)" strokeWidth=".5" fill="none"/>
    {/* Body / gown */}
    <path d="M20,34 Q22,42 26,46 Q30,42 32,34 Q30,31 26,31 Q22,31 20,34Z" fill="rgba(160,60,220,.8)" stroke="rgba(200,100,255,.5)" strokeWidth=".7"/>
    {/* Face */}
    <ellipse cx="26" cy="24" rx="9" ry="10" fill="url(#cpFaFace)" filter="url(#cpFaGl2)"/>
    {/* Hair — purple flowing */}
    <path d="M17,20 Q16,12 19,9 Q26,6 33,9 Q36,12 35,20" fill="rgba(120,0,180,.9)" stroke="rgba(180,80,255,.5)" strokeWidth=".6"/>
    <path d="M17,20 Q15,24 14,30" stroke="rgba(100,0,160,.8)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M35,20 Q37,24 38,30" stroke="rgba(100,0,160,.8)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    {/* Top gem crown */}
    <circle cx="26" cy="8" r="4" fill="url(#cpFaGem)" filter="url(#cpFaGl)"/>
    <circle cx="26" cy="8" r="1.8" fill="rgba(255,255,255,.85)"/>
    {/* Eyes */}
    <ellipse cx="22.5" cy="23.5" rx="2.5" ry="2" fill="rgba(120,0,180,.95)"/>
    <ellipse cx="29.5" cy="23.5" rx="2.5" ry="2" fill="rgba(120,0,180,.95)"/>
    <circle cx="23.2" cy="23" r=".8" fill="rgba(220,150,255,.7)"/>
    <circle cx="30.2" cy="23" r=".8" fill="rgba(220,150,255,.7)"/>
    <circle cx="23.7" cy="22.6" r=".5" fill="#fff" opacity=".9"/>
    <circle cx="30.7" cy="22.6" r=".5" fill="#fff" opacity=".9"/>
    {/* Smile */}
    <path d="M22.5,28.5 Q26,31 29.5,28.5" fill="none" stroke="rgba(160,60,180,.7)" strokeWidth="1" strokeLinecap="round"/>
    {/* Magic sparkles */}
    {[[8,15],[44,15],[5,32],[47,32]].map(([x,y],i)=>(
      <g key={i} opacity=".7">
        <line x1={x} y1={y-3} x2={x} y2={y+3} stroke="rgba(220,160,255,.8)" strokeWidth=".8" strokeLinecap="round"/>
        <line x1={x-3} y1={y} x2={x+3} y2={y} stroke="rgba(220,160,255,.8)" strokeWidth=".8" strokeLinecap="round"/>
      </g>
    ))}
  </svg>
));
// UNICORN — Gold/amber ornate character (600× tier, 4th symbol in high row of image)
const CpUnicornSym=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="88%" height="88%">
    <defs>
      <radialGradient id="cpUnBg" cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#200800"/><stop offset="100%" stopColor="#0e0300"/></radialGradient>
      <radialGradient id="cpUnFace" cx="42%" cy="38%" r="58%"><stop offset="0%" stopColor="#fff0c8"/><stop offset="55%" stopColor="#e8c070"/><stop offset="100%" stopColor="#c09030"/></radialGradient>
      <radialGradient id="cpUnGem" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#fff8c0"/><stop offset="50%" stopColor="#ffcc00"/><stop offset="100%" stopColor="#c08000"/></radialGradient>
      <linearGradient id="cpUnOrn" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ffe890"/><stop offset="50%" stopColor="#d4a820"/><stop offset="100%" stopColor="#906000"/></linearGradient>
      <filter id="cpUnGl"><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ffcc00" floodOpacity=".9"/></filter>
      <filter id="cpUnGl2"><feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#ffe060" floodOpacity=".8"/></filter>
    </defs>
    <rect x="1" y="1" width="50" height="50" rx="9" fill="url(#cpUnBg)"/>
    {/* Top arch ornament */}
    <path d="M14,7 Q26,2 38,7 Q40,13 36,15 L26,12 L16,15 Q12,13 14,7Z" fill="url(#cpUnOrn)" filter="url(#cpUnGl)" opacity=".9"/>
    <circle cx="26" cy="7" r="3.5" fill="url(#cpUnGem)" filter="url(#cpUnGl)"/>
    {/* Side ornaments */}
    <path d="M5,19 Q8,15 11,19 Q9,23 8,28 Q6,23 5,19Z" fill="rgba(200,140,20,.7)" stroke="rgba(255,200,60,.4)" strokeWidth=".6"/>
    <path d="M47,19 Q44,15 41,19 Q43,23 44,28 Q46,23 47,19Z" fill="rgba(200,140,20,.7)" stroke="rgba(255,200,60,.4)" strokeWidth=".6"/>
    {/* Decorative swirls */}
    <path d="M6,30 Q10,28 12,32 Q10,36 7,34" fill="none" stroke="rgba(200,150,30,.5)" strokeWidth=".8"/>
    <path d="M46,30 Q42,28 40,32 Q42,36 45,34" fill="none" stroke="rgba(200,150,30,.5)" strokeWidth=".8"/>
    {/* Face */}
    <ellipse cx="26" cy="26" rx="10.5" ry="11" fill="url(#cpUnFace)" filter="url(#cpUnGl2)"/>
    {/* Hair / headdress — golden */}
    <path d="M16,22 Q15,13 20,10 Q26,7 32,10 Q37,13 36,22" fill="rgba(160,90,0,.9)" stroke="rgba(220,160,40,.5)" strokeWidth=".7"/>
    <path d="M16,22 Q14,26 14,30" stroke="rgba(140,80,0,.8)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M36,22 Q38,26 38,30" stroke="rgba(140,80,0,.8)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    {/* Golden horns / crown spikes */}
    {[[-8,0],[0,-5],[8,0]].map(([dx,dy],i)=>(
      <path key={i} d={`M${26+dx},${14+dy} L${24+dx},${8+dy} L${28+dx},${8+dy}Z`} fill="url(#cpUnOrn)" stroke="rgba(200,150,0,.6)" strokeWidth=".5" filter="url(#cpUnGl2)" opacity=".9"/>
    ))}
    {/* Eyes — amber */}
    <ellipse cx="22" cy="25" rx="2.7" ry="2.2" fill="rgba(180,80,0,.95)"/>
    <ellipse cx="30" cy="25" rx="2.7" ry="2.2" fill="rgba(180,80,0,.95)"/>
    <circle cx="22" cy="24.5" r="1" fill="rgba(255,180,0,.7)"/>
    <circle cx="30" cy="24.5" r="1" fill="rgba(255,180,0,.7)"/>
    <circle cx="22.8" cy="24" r=".6" fill="#fff" opacity=".9"/>
    <circle cx="30.8" cy="24" r=".6" fill="#fff" opacity=".9"/>
    {/* Smile */}
    <path d="M22,30.5 Q26,33 30,30.5" fill="none" stroke="rgba(160,90,20,.7)" strokeWidth="1.1" strokeLinecap="round"/>
    {/* Bottom gem */}
    <path d="M18,44 Q26,49 34,44 Q32,41 26,43 Q20,41 18,44Z" fill="url(#cpUnOrn)" opacity=".85"/>
    <circle cx="26" cy="44" r="2.5" fill="url(#cpUnGem)" filter="url(#cpUnGl2)"/>
  </svg>
));
// DRAGON — Green ornate medallion/compass (400× lowest high tier, 1st symbol in high row)
const CpDragonSym=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="88%" height="88%">
    <defs>
      <radialGradient id="cpDrBg" cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#021a08"/><stop offset="100%" stopColor="#010a04"/></radialGradient>
      <radialGradient id="cpDrOrb" cx="38%" cy="32%" r="62%"><stop offset="0%" stopColor="#c0ffd0"/><stop offset="40%" stopColor="#30c860"/><stop offset="80%" stopColor="#0a7030"/><stop offset="100%" stopColor="#043818"/></radialGradient>
      <radialGradient id="cpDrGem" cx="40%" cy="35%" r="60%"><stop offset="0%" stopColor="#d0ffdc"/><stop offset="50%" stopColor="#30e060"/><stop offset="100%" stopColor="#009030"/></radialGradient>
      <linearGradient id="cpDrFrame" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c0e870"/><stop offset="50%" stopColor="#80c030"/><stop offset="100%" stopColor="#408010"/></linearGradient>
      <filter id="cpDrGl"><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22ff66" floodOpacity=".9"/></filter>
      <filter id="cpDrGl2"><feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#88ff99" floodOpacity=".8"/></filter>
    </defs>
    <rect x="1" y="1" width="50" height="50" rx="9" fill="url(#cpDrBg)"/>
    {/* Compass/medallion outer ring */}
    <circle cx="26" cy="26" r="19" fill="none" stroke="url(#cpDrFrame)" strokeWidth="2.2" filter="url(#cpDrGl)"/>
    <circle cx="26" cy="26" r="15.5" fill="none" stroke="rgba(80,200,100,.35)" strokeWidth=".8"/>
    {/* Main orb */}
    <circle cx="26" cy="26" r="12.5" fill="url(#cpDrOrb)" filter="url(#cpDrGl)"/>
    {/* Compass rose points */}
    {[0,90,180,270].map((angle,i)=>{
      const rad=angle*Math.PI/180;
      const x1=26+Math.cos(rad)*12.5;const y1=26+Math.sin(rad)*12.5;
      const x2=26+Math.cos(rad)*19;const y2=26+Math.sin(rad)*19;
      return <polygon key={i} points={`${x1},${y1} ${26+Math.cos((angle-4)*Math.PI/180)*12.5},${26+Math.sin((angle-4)*Math.PI/180)*12.5} ${x2},${y2} ${26+Math.cos((angle+4)*Math.PI/180)*12.5},${26+Math.sin((angle+4)*Math.PI/180)*12.5}`} fill="url(#cpDrFrame)" filter="url(#cpDrGl)"/>;
    })}
    {/* Diagonal points (shorter) */}
    {[45,135,225,315].map((angle,i)=>{
      const rad=angle*Math.PI/180;
      const x1=26+Math.cos(rad)*12.5;const y1=26+Math.sin(rad)*12.5;
      const x2=26+Math.cos(rad)*17;const y2=26+Math.sin(rad)*17;
      return <polygon key={i} points={`${x1},${y1} ${26+Math.cos((angle-3)*Math.PI/180)*12.5},${26+Math.sin((angle-3)*Math.PI/180)*12.5} ${x2},${y2} ${26+Math.cos((angle+3)*Math.PI/180)*12.5},${26+Math.sin((angle+3)*Math.PI/180)*12.5}`} fill="rgba(120,200,80,.7)"/>;
    })}
    {/* Inner decoration */}
    <circle cx="26" cy="26" r="6" fill="url(#cpDrGem)" filter="url(#cpDrGl)"/>
    <circle cx="26" cy="26" r="3.5" fill="rgba(200,255,210,.9)"/>
    <circle cx="26" cy="26" r="1.8" fill="#fff" opacity=".95"/>
    {/* Shine on orb */}
    <ellipse cx="20" cy="20" rx="5" ry="3" fill="rgba(255,255,255,.3)" transform="rotate(-30,20,20)"/>
    <circle cx="19" cy="19" r="2" fill="rgba(255,255,255,.45)"/>
    {/* Outer sparkle dots */}
    {[0,60,120,180,240,300].map((angle,i)=>{
      const rad=angle*Math.PI/180;
      return <circle key={i} cx={26+Math.cos(rad)*19} cy={26+Math.sin(rad)*19} r="1.5" fill="url(#cpDrGem)" opacity=".8"/>;
    })}
  </svg>
));

const CpMoonSym=React.memo(()=>(
  <svg viewBox="0 0 56 56" width="92%" height="92%">
    <defs>
      <linearGradient id="cpScFrame" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5a6e9a"/><stop offset="30%" stopColor="#2e3e66"/><stop offset="70%" stopColor="#1e2e56"/><stop offset="100%" stopColor="#5a6e9a"/></linearGradient>
      <radialGradient id="cpScBg" cx="50%" cy="30%" r="65%"><stop offset="0%" stopColor="#1a2a58"/><stop offset="55%" stopColor="#0e1a3c"/><stop offset="100%" stopColor="#07102a"/></radialGradient>
      <radialGradient id="cpScSkin" cx="42%" cy="34%" r="54%"><stop offset="0%" stopColor="#ffeada"/><stop offset="65%" stopColor="#f5cdb5"/><stop offset="100%" stopColor="#e8b898"/></radialGradient>
      <linearGradient id="cpScHair" x1="22%" y1="0%" x2="78%" y2="100%"><stop offset="0%" stopColor="#ffffff"/><stop offset="18%" stopColor="#f2eeff"/><stop offset="45%" stopColor="#d8d0f2"/><stop offset="78%" stopColor="#b8b0da"/><stop offset="100%" stopColor="#9890c2"/></linearGradient>
      <radialGradient id="cpScJwl" cx="35%" cy="30%" r="60%"><stop offset="0%" stopColor="#a0e8ff"/><stop offset="50%" stopColor="#28b0e8"/><stop offset="100%" stopColor="#0868a8"/></radialGradient>
      <linearGradient id="cpScArm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c8e2f8"/><stop offset="50%" stopColor="#98b8e0"/><stop offset="100%" stopColor="#6080b8"/></linearGradient>
      <filter id="cpScGl"><feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="rgba(80,150,255,.6)"/></filter>
      <filter id="cpScMnGl"><feDropShadow dx="0" dy="0" stdDeviation="2.8" floodColor="rgba(160,230,255,.95)"/></filter>
      <filter id="cpScEyeGl"><feDropShadow dx="0" dy="0" stdDeviation="1.6" floodColor="rgba(50,190,255,.95)"/></filter>
      <clipPath id="cpScClip"><rect x="5.5" y="5.5" width="45" height="45" rx="6.5"/></clipPath>
    </defs>


    <g clipPath="url(#cpScClip)">
      <rect x="5.5" y="5.5" width="45" height="45" fill="url(#cpScBg)"/>
      <ellipse cx="28" cy="22" rx="22" ry="15" fill="rgba(55,100,200,.1)"/>
      <ellipse cx="28" cy="30" rx="16" ry="13" fill="rgba(80,160,255,.05)"/>

      {/* Hair — luxurious white/silver, flowing */}
      <path d="M9,24 Q8,13 13,8 Q20,3 28,5 Q36,3 43,8 Q48,13 47,24 Q49,33 47,41 L45,49 L40,43 Q36,38 32,42 L29,49 L27,49 L25,42 Q21,38 17,43 L12,49 L11,41 Q9,33 9,24Z" fill="url(#cpScHair)"/>
      {/* Inner hair volume */}
      <path d="M9,24 Q8,13 13,8 Q20,3 28,5 Q36,3 43,8 Q48,13 47,24" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth=".8"/>
      {/* Hair shimmer streaks */}
      <path d="M18,10 Q20,18 18,27" stroke="rgba(255,255,255,.5)" strokeWidth="2.1" fill="none" strokeLinecap="round"/>
      <path d="M38,10 Q36,18 38,27" stroke="rgba(255,255,255,.42)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M13,17 Q15,25 13,33" stroke="rgba(255,255,255,.22)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M43,17 Q41,25 43,33" stroke="rgba(255,255,255,.22)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M23,6 Q24,10 23,14" stroke="rgba(255,255,255,.18)" strokeWidth=".8" fill="none"/>
      <path d="M33,6 Q32,10 33,14" stroke="rgba(255,255,255,.18)" strokeWidth=".8" fill="none"/>
      <path d="M26,5 Q27,8 26,12" stroke="rgba(255,255,255,.1)" strokeWidth=".55" fill="none"/>
      <path d="M30,5 Q29,8 30,12" stroke="rgba(255,255,255,.1)" strokeWidth=".55" fill="none"/>

      {/* Face */}
      <ellipse cx="28" cy="27" rx="11.5" ry="13.5" fill="url(#cpScSkin)"/>
      <ellipse cx="28" cy="34" rx="9" ry="5.5" fill="rgba(210,170,150,.07)"/>
      <ellipse cx="26" cy="23" rx="4" ry="2.5" fill="rgba(255,255,255,.07)" transform="rotate(-10,26,23)"/>
      {/* Cheek blush */}
      <ellipse cx="20" cy="30" rx="3.8" ry="2.5" fill="rgba(255,135,125,.14)"/>
      <ellipse cx="36" cy="30" rx="3.8" ry="2.5" fill="rgba(255,135,125,.14)"/>

      {/* ── LEFT EYE — rich layered blue ── */}
      <ellipse cx="22.5" cy="26" rx="4" ry="4.6" fill="rgba(10,22,42,.97)"/>
      <ellipse cx="22.5" cy="26.8" rx="3.2" ry="3.7" fill="rgba(18,135,200,.94)" filter="url(#cpScEyeGl)"/>
      <ellipse cx="22.5" cy="27.6" rx="2.3" ry="2.8" fill="rgba(55,200,252,.82)"/>
      <ellipse cx="22.5" cy="28.1" rx="1.5" ry="1.9" fill="rgba(120,232,255,.58)"/>
      <ellipse cx="22.5" cy="28.4" rx=".8" ry=".95" fill="rgba(190,248,255,.4)"/>
      <circle cx="22.5" cy="26.2" r="1.65" fill="rgba(5,12,32,.97)"/>
      <circle cx="24.3" cy="24.9" r="1.35" fill="#fff" opacity=".95"/>
      <circle cx="21.4" cy="28.6" r=".62" fill="#fff" opacity=".62"/>
      <circle cx="23.9" cy="27.9" r=".42" fill="rgba(210,248,255,.72)"/>
      {/* Left lash */}
      <path d="M18.4,22.8 Q22.5,21.3 26.6,23" stroke="rgba(22,18,40,.93)" strokeWidth="1.15" fill="none" strokeLinecap="round"/>
      <path d="M18.1,23.1 L17.2,21.8" stroke="rgba(22,18,40,.76)" strokeWidth=".68" fill="none" strokeLinecap="round"/>
      <path d="M19.5,22.5 L18.8,21.2" stroke="rgba(22,18,40,.55)" strokeWidth=".58" fill="none" strokeLinecap="round"/>
      <path d="M26,22.8 L26.6,21.6" stroke="rgba(22,18,40,.5)" strokeWidth=".5" fill="none" strokeLinecap="round"/>
      <path d="M19.8,30.1 Q22.5,31 25.2,30.1" stroke="rgba(22,18,40,.17)" strokeWidth=".45" fill="none"/>

      {/* ── RIGHT EYE ── */}
      <ellipse cx="33.5" cy="26" rx="4" ry="4.6" fill="rgba(10,22,42,.97)"/>
      <ellipse cx="33.5" cy="26.8" rx="3.2" ry="3.7" fill="rgba(18,135,200,.94)" filter="url(#cpScEyeGl)"/>
      <ellipse cx="33.5" cy="27.6" rx="2.3" ry="2.8" fill="rgba(55,200,252,.82)"/>
      <ellipse cx="33.5" cy="28.1" rx="1.5" ry="1.9" fill="rgba(120,232,255,.58)"/>
      <ellipse cx="33.5" cy="28.4" rx=".8" ry=".95" fill="rgba(190,248,255,.4)"/>
      <circle cx="33.5" cy="26.2" r="1.65" fill="rgba(5,12,32,.97)"/>
      <circle cx="35.3" cy="24.9" r="1.35" fill="#fff" opacity=".95"/>
      <circle cx="32.4" cy="28.6" r=".62" fill="#fff" opacity=".62"/>
      <circle cx="34.9" cy="27.9" r=".42" fill="rgba(210,248,255,.72)"/>
      {/* Right lash */}
      <path d="M29.4,23 Q33.5,21.3 37.6,22.8" stroke="rgba(22,18,40,.93)" strokeWidth="1.15" fill="none" strokeLinecap="round"/>
      <path d="M37.9,23.1 L38.8,21.8" stroke="rgba(22,18,40,.76)" strokeWidth=".68" fill="none" strokeLinecap="round"/>
      <path d="M36.5,22.5 L37.2,21.2" stroke="rgba(22,18,40,.55)" strokeWidth=".58" fill="none" strokeLinecap="round"/>
      <path d="M30,22.8 L29.4,21.6" stroke="rgba(22,18,40,.5)" strokeWidth=".5" fill="none" strokeLinecap="round"/>
      <path d="M30.8,30.1 Q33.5,31 36.2,30.1" stroke="rgba(22,18,40,.17)" strokeWidth=".45" fill="none"/>

      {/* Eyebrows */}
      <path d="M18.6,21.8 Q22.5,20.3 26.1,21.8" stroke="rgba(195,185,215,.62)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      <path d="M29.9,21.8 Q33.5,20.3 38.4,21.8" stroke="rgba(195,185,215,.62)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>

      {/* Nose */}
      <path d="M28,31 L27.1,32.6" stroke="rgba(195,155,135,.28)" strokeWidth=".65" fill="none" strokeLinecap="round"/>

      {/* Mouth — elegant */}
      <path d="M23.8,34.2 Q28,37.8 32.2,34.2" stroke="rgba(210,108,108,.62)" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M24.4,34.5 Q28,36.8 31.6,34.5" fill="rgba(238,155,155,.22)"/>
      <path d="M25.5,35 L30.5,35" stroke="rgba(255,255,255,.26)" strokeWidth=".5" strokeLinecap="round"/>

      {/* Crystal earrings */}
      <circle cx="17" cy="30.5" r="2" fill="rgba(130,210,255,.72)" stroke="rgba(80,175,240,.52)" strokeWidth=".45"/>
      <circle cx="17" cy="30.5" r="1" fill="rgba(210,245,255,.88)"/>
      <circle cx="39" cy="30.5" r="2" fill="rgba(130,210,255,.72)" stroke="rgba(80,175,240,.52)" strokeWidth=".45"/>
      <circle cx="39" cy="30.5" r="1" fill="rgba(210,245,255,.88)"/>

      {/* Neck & shoulders */}
      <path d="M23.5,37 L21,41 Q15,45 9,48 L47,48 Q41,45 35,41 L32.5,37" fill="url(#cpScSkin)"/>
      {/* Armor collar */}
      <path d="M18,42 Q24,39.5 28,40.8 Q32,39.5 38,42 Q32,44.2 28,43.2 Q24,44.2 18,42Z" fill="url(#cpScArm)" opacity=".88" stroke="rgba(160,210,245,.52)" strokeWidth=".65"/>
      {/* Armor center gem */}
      <path d="M25.5,40.8 L28,38.2 L30.5,40.8" fill="rgba(140,215,255,.82)" stroke="rgba(80,185,245,.52)" strokeWidth=".55"/>
      <circle cx="28" cy="39.5" r="1.2" fill="rgba(220,248,255,.9)"/>
      {/* Crystal necklace */}
      <path d="M19,43 Q24,41.5 28,42.2 Q32,41.5 37,43" fill="none" stroke="rgba(200,232,255,.58)" strokeWidth=".82" strokeLinecap="round"/>
      {/* Shoulder skin */}
      <path d="M10,46 Q16,44 20,42" stroke="rgba(248,208,188,.28)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M46,46 Q40,44 36,42" stroke="rgba(248,208,188,.28)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>

      {/* Crystal moon gem on forehead */}
      <g filter="url(#cpScMnGl)">
        <circle cx="28" cy="17" r="4.5" fill="rgba(140,225,255,.9)" stroke="rgba(100,205,255,.65)" strokeWidth=".55"/>
        <circle cx="30.5" cy="15.5" r="3.2" fill="rgba(12,32,68,.97)"/>
        <ellipse cx="27.2" cy="16.8" rx="1.5" ry="1" fill="rgba(200,245,255,.72)" transform="rotate(-20,27.2,16.8)"/>
        <circle cx="27" cy="15.5" r=".55" fill="#fff" opacity=".6"/>
      </g>

      {/* Hair bangs over forehead */}
      <path d="M18,19 Q20,14 22,16 Q24,11 28,14 Q32,10.5 34,16 Q36,14 38,19" fill="url(#cpScHair)" opacity=".92"/>
      <path d="M20.5,15 Q22,12.5 24,15" stroke="rgba(255,255,255,.24)" strokeWidth=".7" fill="none"/>
      <path d="M32,15 Q34,12.5 35.5,15" stroke="rgba(255,255,255,.18)" strokeWidth=".6" fill="none"/>
    </g>
  </svg>
));

// Gem symbols — styled to match Cloud Princess paytable image
const CpGemSym=React.memo(({sym})=>{
  const gid=`cpGem${sym}`;
  // gem_green = emerald sphere, gem_blue = water drop, gem_purple = amethyst diamond, gem_red = ruby star
  if(sym==="gem_green"){
    return(
      <svg viewBox="0 0 52 52" width="88%" height="88%">
        <defs>
          <radialGradient id={`${gid}bg`} cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#0a2a10"/><stop offset="100%" stopColor="#020a04"/></radialGradient>
          <radialGradient id={`${gid}orb`} cx="36%" cy="30%" r="62%"><stop offset="0%" stopColor="#aaffc8"/><stop offset="38%" stopColor="#28e060"/><stop offset="75%" stopColor="#0a9030"/><stop offset="100%" stopColor="#045018"/></radialGradient>
          <filter id={`${gid}glow`}><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#22ff88" floodOpacity=".9"/></filter>
          <linearGradient id={`${gid}frame`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e0c060"/><stop offset="50%" stopColor="#c8a030"/><stop offset="100%" stopColor="#a07820"/></linearGradient>
        </defs>
        <rect x="1" y="1" width="50" height="50" rx="9" fill={`url(#${gid}bg)`}/>
        {/* Emerald sphere */}
        <circle cx="26" cy="26" r="14" fill={`url(#${gid}orb)`} filter={`url(#${gid}glow)`}/>
        {/* Facet lines */}
        <line x1="26" y1="12" x2="26" y2="40" stroke="rgba(255,255,255,.12)" strokeWidth=".7"/>
        <line x1="12" y1="26" x2="40" y2="26" stroke="rgba(255,255,255,.12)" strokeWidth=".7"/>
        <line x1="16" y1="16" x2="36" y2="36" stroke="rgba(255,255,255,.08)" strokeWidth=".6"/>
        <line x1="36" y1="16" x2="16" y2="36" stroke="rgba(255,255,255,.08)" strokeWidth=".6"/>
        {/* Highlights */}
        <ellipse cx="21" cy="20" rx="5" ry="3" fill="rgba(255,255,255,.4)" transform="rotate(-30,21,20)"/>
        <circle cx="19" cy="19" r="2" fill="rgba(255,255,255,.55)"/>
      </svg>
    );
  }
  if(sym==="gem_blue"){
    return(
      <svg viewBox="0 0 52 52" width="88%" height="88%">
        <defs>
          <radialGradient id={`${gid}bg`} cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#020a20"/><stop offset="100%" stopColor="#010510"/></radialGradient>
          <radialGradient id={`${gid}drop`} cx="38%" cy="28%" r="62%"><stop offset="0%" stopColor="#c0e8ff"/><stop offset="35%" stopColor="#3898f0"/><stop offset="70%" stopColor="#0050b8"/><stop offset="100%" stopColor="#002060"/></radialGradient>
          <filter id={`${gid}glow`}><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#2288ff" floodOpacity=".95"/></filter>
          <linearGradient id={`${gid}frame`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#80b0e0"/><stop offset="50%" stopColor="#4878c0"/><stop offset="100%" stopColor="#204090"/></linearGradient>
        </defs>
        <rect x="1" y="1" width="50" height="50" rx="9" fill={`url(#${gid}bg)`}/>
        {/* Teardrop / water drop shape */}
        <path d="M26,8 Q38,20 38,31 Q38,44 26,46 Q14,44 14,31 Q14,20 26,8Z" fill={`url(#${gid}drop)`} filter={`url(#${gid}glow)`}/>
        {/* Inner facets */}
        <path d="M26,12 Q34,22 34,31 Q34,40 26,42 Q18,40 18,31 Q18,22 26,12Z" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth=".8"/>
        <line x1="26" y1="14" x2="26" y2="43" stroke="rgba(255,255,255,.1)" strokeWidth=".7"/>
        {/* Highlights */}
        <ellipse cx="22" cy="20" rx="4" ry="6" fill="rgba(255,255,255,.42)" transform="rotate(-15,22,20)"/>
        <circle cx="20" cy="18" r="2.5" fill="rgba(255,255,255,.6)"/>
      </svg>
    );
  }
  if(sym==="gem_purple"){
    return(
      <svg viewBox="0 0 52 52" width="88%" height="88%">
        <defs>
          <radialGradient id={`${gid}bg`} cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#180028"/><stop offset="100%" stopColor="#08001a"/></radialGradient>
          <linearGradient id={`${gid}gem`} x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stopColor="#f0d0ff"/><stop offset="25%" stopColor="#c060f0"/><stop offset="65%" stopColor="#7010c0"/><stop offset="100%" stopColor="#380068"/></linearGradient>
          <filter id={`${gid}glow`}><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#aa44ff" floodOpacity=".95"/></filter>
        </defs>
        <rect x="1" y="1" width="50" height="50" rx="9" fill={`url(#${gid}bg)`}/>
        {/* Diamond/rhombus shape */}
        <polygon points="26,6 44,26 26,46 8,26" fill={`url(#${gid}gem)`} filter={`url(#${gid}glow)`}/>
        {/* Facets */}
        <polygon points="26,6 44,26 26,26" fill="rgba(255,255,255,.12)"/>
        <line x1="26" y1="6" x2="26" y2="46" stroke="rgba(255,255,255,.15)" strokeWidth=".8"/>
        <line x1="8" y1="26" x2="44" y2="26" stroke="rgba(255,255,255,.1)" strokeWidth=".7"/>
        <polygon points="26,6 44,26 26,46 8,26" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth=".8"/>
        {/* Highlights */}
        <ellipse cx="20" cy="18" rx="5" ry="3" fill="rgba(255,255,255,.45)" transform="rotate(-40,20,18)"/>
        <circle cx="18" cy="16" r="2.2" fill="rgba(255,255,255,.6)"/>
      </svg>
    );
  }
  // gem_red — ruby circular/star gem
  return(
    <svg viewBox="0 0 52 52" width="88%" height="88%">
      <defs>
        <radialGradient id={`${gid}bg`} cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#2a0008"/><stop offset="100%" stopColor="#100003"/></radialGradient>
        <radialGradient id={`${gid}gem`} cx="36%" cy="30%" r="62%"><stop offset="0%" stopColor="#ffc0c8"/><stop offset="30%" stopColor="#ff3050"/><stop offset="70%" stopColor="#b00020"/><stop offset="100%" stopColor="#580010"/></radialGradient>
        <filter id={`${gid}glow`}><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ff2244" floodOpacity=".95"/></filter>
        <linearGradient id={`${gid}frame`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e08080"/><stop offset="50%" stopColor="#c04050"/><stop offset="100%" stopColor="#802030"/></linearGradient>
      </defs>
      <rect x="1" y="1" width="50" height="50" rx="9" fill={`url(#${gid}bg)`}/>
      {/* Circular ruby gem */}
      <circle cx="26" cy="26" r="17" fill={`url(#${gid}gem)`} filter={`url(#${gid}glow)`}/>
      {/* Star cut facets */}
      {[0,45,90,135].map(a=>{
        const rad=a*Math.PI/180;
        return <line key={a} x1={26+Math.cos(rad)*5} y1={26+Math.sin(rad)*5} x2={26+Math.cos(rad)*16} y2={26+Math.sin(rad)*16} stroke="rgba(255,255,255,.2)" strokeWidth=".8"/>;
      })}
      <circle cx="26" cy="26" r="17" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth=".8"/>
      <circle cx="26" cy="26" r="10" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth=".7"/>
      {/* Highlights */}
      <ellipse cx="20" cy="19" rx="5" ry="3.5" fill="rgba(255,255,255,.42)" transform="rotate(-25,20,19)"/>
      <circle cx="18" cy="18" r="2.5" fill="rgba(255,255,255,.6)"/>

    </svg>
  );
});

const CpMultSym=React.memo(({type,value})=>{
  const uid=`cpM${type.replace(/_/g,"")}${value!=null?value:"q"}`;
  // normal_mult always shows value; super & epic show "?" when value is null
  const displayVal=value!=null?`×${value}`:"?";
  const isBig=displayVal.length>4;

  /* ── NORMAL MULT: 4-point silver/blue compass rose (matches pre-game right symbol) ── */
  if(type==="normal_mult") return(
    <svg viewBox="0 0 52 52" width="88%" height="88%">
      <defs>
        <linearGradient id={`${uid}disc`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8d8f0"/><stop offset="50%" stopColor="#8898c0"/><stop offset="100%" stopColor="#5868a0"/>
        </linearGradient>
        <radialGradient id={`${uid}sh`} cx="38%" cy="30%" r="62%">
          <stop offset="0%" stopColor="rgba(255,255,255,.32)"/><stop offset="60%" stopColor="rgba(255,255,255,.05)"/><stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
        <filter id={`${uid}glow`}><feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="rgba(80,180,255,.9)" floodOpacity="1"/></filter>
        <filter id={`${uid}tglow`}><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(100,200,255,1)" floodOpacity="1"/></filter>
      </defs>
      {/* Outer halo */}
      <circle cx="26" cy="26" r="25" fill="rgba(80,160,255,.07)"/>
      {/* Main disc */}
      <circle cx="26" cy="26" r="22" fill={`url(#${uid}disc)`} stroke="rgba(100,130,200,.7)" strokeWidth="1.5" filter={`url(#${uid}glow)`}/>
      {/* Inner ring */}
      <circle cx="26" cy="26" r="18" fill="none" stroke="rgba(180,200,240,.3)" strokeWidth=".8"/>
      {/* 4-point compass star — centred at 26,26 */}
      <polygon points="26,8 29,22 26,24 23,22" fill="rgba(200,220,255,.95)"/>
      <polygon points="26,44 29,30 26,28 23,30" fill="rgba(140,160,200,.85)"/>
      <polygon points="8,26 22,23 24,26 22,29" fill="rgba(160,180,220,.9)"/>
      <polygon points="44,26 30,23 28,26 30,29" fill="rgba(180,200,240,.9)"/>
      {/* Diagonal tick lines */}
      {[45,135,225,315].map(deg=>{const a=deg*Math.PI/180;return <line key={deg} x1={26+Math.cos(a)*4} y1={26+Math.sin(a)*4} x2={26+Math.cos(a)*13} y2={26+Math.sin(a)*13} stroke="rgba(160,180,220,.6)" strokeWidth="1.5" strokeLinecap="round"/>;} )}
      {/* Center jewel */}
      <circle cx="26" cy="26" r="5" fill="rgba(200,220,255,.9)" stroke="rgba(160,180,220,.4)" strokeWidth=".8"/>
      <circle cx="26" cy="26" r="2.8" fill="rgba(230,240,255,.95)"/>
      <circle cx="26" cy="26" r="1.2" fill="#fff"/>
      {/* Dashed orbit ring */}
      <circle cx="26" cy="26" r="21" fill="none" stroke="rgba(160,190,240,.2)" strokeWidth=".6" strokeDasharray="2 2"/>
      {/* Shine */}
      <circle cx="26" cy="26" r="22" fill={`url(#${uid}sh)`}/>
      {/* Value */}
      <text x="26" y={displayVal==="?"?"31":"43"} textAnchor="middle"
        fontSize={displayVal==="?"?"16":isBig?"7.5":"9"}
        fill="#ffffff" fontWeight="900" fontFamily="'Space Grotesk',sans-serif"
        filter={`url(#${uid}tglow)`} letterSpacing={isBig?"-0.5":"0"}>
        {displayVal}
      </text>
      {/* Label */}
      <text x="26" y="50" textAnchor="middle" fontSize="4.8" fill="rgba(100,200,255,.95)" fontWeight="700"
        fontFamily="'Space Grotesk',sans-serif" letterSpacing=".5">MULT</text>
    </svg>
  );

  /* ── SUPER MULT: 8-point purple/violet ornate compass (matches pre-game left symbol) ── */
  if(type==="super_mult") return(
    <svg viewBox="0 0 52 52" width="88%" height="88%">
      <defs>
        <linearGradient id={`${uid}disc`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0c0f0"/><stop offset="50%" stopColor="#9060c0"/><stop offset="100%" stopColor="#6040a0"/>
        </linearGradient>
        <radialGradient id={`${uid}sh`} cx="38%" cy="30%" r="62%">
          <stop offset="0%" stopColor="rgba(255,255,255,.28)"/><stop offset="60%" stopColor="rgba(255,255,255,.04)"/><stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
        <filter id={`${uid}glow`}><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(200,80,255,.9)" floodOpacity="1"/></filter>
        <filter id={`${uid}tglow`}><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(255,100,220,1)" floodOpacity="1"/></filter>
      </defs>
      {/* Outer halo */}
      <circle cx="26" cy="26" r="25.5" fill="rgba(160,80,240,.08)"/>
      <circle cx="26" cy="26" r="24" fill="rgba(160,80,240,.06)"/>
      {/* Main disc */}
      <circle cx="26" cy="26" r="22" fill={`url(#${uid}disc)`} stroke="rgba(160,100,240,.6)" strokeWidth="2" filter={`url(#${uid}glow)`}/>
      {/* Inner ring */}
      <circle cx="26" cy="26" r="18" fill="none" stroke="rgba(220,180,255,.35)" strokeWidth="1"/>
      {/* 8-point compass rose centred at 26,26 */}
      {[0,45,90,135,180,225,270,315].map((deg,i)=>{
        const a=deg*Math.PI/180, len=i%2===0?20:13, w2=i%2===0?3.2:2;
        const pts=`0,${-len} ${w2},${-4} 0,0 ${-w2},${-4}`;
        return <polygon key={deg} points={pts} fill={i%2===0?"rgba(220,180,255,.9)":"rgba(180,140,220,.75)"} stroke="rgba(140,100,200,.4)" strokeWidth=".5" transform={`translate(26,26) rotate(${deg})`}/>;
      })}
      {/* Inner ring jewel */}
      <circle cx="26" cy="26" r="9" fill="rgba(200,160,240,.8)" stroke="rgba(160,120,220,.4)" strokeWidth="1"/>
      <circle cx="26" cy="26" r="5.5" fill="rgba(230,200,255,.9)"/>
      <circle cx="26" cy="26" r="3" fill="rgba(180,120,240,.9)" stroke="rgba(220,180,255,.6)" strokeWidth=".8"/>
      <circle cx="26" cy="26" r="1.4" fill="rgba(240,220,255,.95)"/>
      <circle cx="26" cy="26" r=".6" fill="#fff" opacity=".9"/>
      {/* Orbital dashed ring with dots */}
      <circle cx="26" cy="26" r="21" fill="none" stroke="rgba(200,160,240,.25)" strokeWidth=".7" strokeDasharray="3 3"/>
      {[0,60,120,180,240,300].map(deg=>(
        <circle key={deg} cx={26+Math.cos(deg*Math.PI/180)*21} cy={26+Math.sin(deg*Math.PI/180)*21} r="1.4" fill="rgba(220,180,255,.5)"/>
      ))}
      {/* Shine */}
      <circle cx="26" cy="26" r="22" fill={`url(#${uid}sh)`}/>
      {/* Value */}
      <text x="26" y={displayVal==="?"?"31":"43"} textAnchor="middle"
        fontSize={displayVal==="?"?"16":isBig?"7.5":"9"}
        fill="#ffffff" fontWeight="900" fontFamily="'Space Grotesk',sans-serif"
        filter={`url(#${uid}tglow)`} letterSpacing={isBig?"-0.5":"0"}>
        {displayVal}
      </text>
      {/* Label */}
      <text x="26" y="50" textAnchor="middle" fontSize="4.8" fill="rgba(255,100,220,.95)" fontWeight="700"
        fontFamily="'Space Grotesk',sans-serif" letterSpacing=".5">SUPER</text>
    </svg>
  );

  /* ── EPIC MULT: 16-point pink compass + golden star center (matches pre-game center symbol) ── */
  return(
    <svg viewBox="0 0 52 52" width="88%" height="88%">
      <defs>
        <linearGradient id={`${uid}disc`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff0f8"/><stop offset="30%" stopColor="#ffb0d0"/><stop offset="70%" stopColor="#e060a0"/><stop offset="100%" stopColor="#a04080"/>
        </linearGradient>
        <linearGradient id={`${uid}star`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fffde0"/><stop offset="50%" stopColor="#ffe840"/><stop offset="100%" stopColor="#e0b000"/>
        </linearGradient>
        <radialGradient id={`${uid}sh`} cx="38%" cy="30%" r="62%">
          <stop offset="0%" stopColor="rgba(255,255,255,.3)"/><stop offset="60%" stopColor="rgba(255,255,255,.05)"/><stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
        <filter id={`${uid}glow`}><feDropShadow dx="0" dy="0" stdDeviation="5.5" floodColor="rgba(255,80,180,.85)" floodOpacity="1"/></filter>
        <filter id={`${uid}stargl`}><feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="rgba(255,240,100,.9)" floodOpacity="1"/></filter>
        <filter id={`${uid}tglow`}><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(255,200,50,1)" floodOpacity="1"/></filter>
      </defs>
      {/* Outer rainbow aura */}
      <circle cx="26" cy="26" r="25.5" fill="rgba(255,100,200,.07)"/>
      <circle cx="26" cy="26" r="24" fill="rgba(255,180,220,.06)"/>
      {/* Main disc */}
      <circle cx="26" cy="26" r="22" fill={`url(#${uid}disc)`} stroke="rgba(220,100,160,.55)" strokeWidth="2.5" filter={`url(#${uid}glow)`}/>
      {/* Inner ring */}
      <circle cx="26" cy="26" r="18" fill="none" stroke="rgba(255,200,230,.35)" strokeWidth="1.2"/>
      {/* 16-point compass rose centred at 26,26 */}
      {Array.from({length:16},(_,i)=>{
        const a=(i/16)*Math.PI*2;
        const len=i%4===0?18:i%2===0?13:8;
        const w2=i%4===0?3.5:i%2===0?2.2:1.3;
        const col=i%4===0?"rgba(255,240,200,.95)":i%2===0?"rgba(255,200,220,.85)":"rgba(240,180,210,.65)";
        const pts=`0,${-len} ${w2},${-4} 0,0 ${-w2},${-4}`;
        return <polygon key={i} points={pts} fill={col} stroke="rgba(200,120,160,.3)" strokeWidth=".4" transform={`translate(26,26) rotate(${(i/16)*360})`}/>;
      })}
      {/* Secondary inner ring */}
      <circle cx="26" cy="26" r="10" fill="rgba(255,220,240,.65)" stroke="rgba(240,160,200,.4)" strokeWidth="1"/>
      <circle cx="26" cy="26" r="7.5" fill="rgba(255,240,248,.8)"/>
      {/* Golden center star */}
      <g filter={`url(#${uid}stargl)`} transform="translate(26,26)">
        <polygon points="0,-6.5 1.6,-2 6.5,-2 2.6,1.3 4,6 0,3.2 -4,6 -2.6,1.3 -6.5,-2 -1.6,-2" fill={`url(#${uid}star)`} stroke="rgba(200,170,0,.5)" strokeWidth=".5"/>
      </g>
      <circle cx="26" cy="26" r="2" fill="rgba(255,250,220,.95)"/>
      <circle cx="26" cy="26" r=".9" fill="#fff"/>
      {/* Orbiting sparkle dots */}
      <circle cx="26" cy="26" r="21" fill="none" stroke="rgba(255,200,230,.2)" strokeWidth=".7" strokeDasharray="4 4"/>
      {[0,45,90,135,180,225,270,315].map(deg=>(
        <circle key={deg} cx={26+Math.cos(deg*Math.PI/180)*21} cy={26+Math.sin(deg*Math.PI/180)*21} r={deg%90===0?"2":"1.2"} fill={deg%90===0?"rgba(255,220,240,.75)":"rgba(240,200,230,.4)"}/>
      ))}
      {/* Shine */}
      <circle cx="26" cy="26" r="22" fill={`url(#${uid}sh)`}/>
      {/* Value */}
      <text x="26" y={displayVal==="?"?"31":"43"} textAnchor="middle"
        fontSize={displayVal==="?"?"16":isBig?"7.5":"9"}
        fill="#ffffff" fontWeight="900" fontFamily="'Space Grotesk',sans-serif"
        filter={`url(#${uid}tglow)`} letterSpacing={isBig?"-0.5":"0"}>
        {displayVal}
      </text>
      {/* Label */}
      <text x="26" y="50" textAnchor="middle" fontSize="4.8" fill="rgba(255,200,50,.95)" fontWeight="700"
        fontFamily="'Space Grotesk',sans-serif" letterSpacing=".5">EPIC</text>
    </svg>
  );
});

const CP_SYM_RENDER={
  princess:()=><CpPrincessSym/>,
  fairy:()=><CpFairySym/>,
  unicorn:()=><CpUnicornSym/>,
  dragon:()=><CpDragonSym/>,
  gem_red:()=><CpGemSym sym="gem_red"/>,
  gem_blue:()=><CpGemSym sym="gem_blue"/>,
  gem_green:()=><CpGemSym sym="gem_green"/>,
  gem_purple:()=><CpGemSym sym="gem_purple"/>,
  scatter:()=><CpMoonSym/>,
  normal_mult:(v)=><CpMultSym type="normal_mult" value={v}/>,
  super_mult:(v)=><CpMultSym type="super_mult" value={v}/>,
  epic_mult:(v)=><CpMultSym type="epic_mult" value={v}/>,
};

/* ═══════════════════════════════════ CLOUD PRINCESS GAME ═══════════════════════════════════ */
function CloudPrincessGame({balance,setBalance,setPage}){
  const [showIntro,setShowIntro]=useState(true);
  const [grid,setGrid]=useState(()=>cpGenGrid(false));
  const [bet,setBet]=useState(1.00);
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
  const [flashG,setFlashG]=useState(false);
  const [flashR,setFlashR]=useState(false);
  const [cellKeys,setCellKeys]=useState(()=>Array.from({length:CP_ROWS},(_,r)=>Array.from({length:CP_COLS},(_,c)=>`${r}${c}0`)));
  const [cellDrop,setCellDrop]=useState(()=>Array.from({length:CP_ROWS},()=>Array(CP_COLS).fill({drop:CP_ROWS+3,delay:0})));
  const [stats,setStats]=useState({spins:0,wins:0,biggest:0,totalWon:0,totalBet:0});
  const [showStats,setShowStats]=useState(false);
  const [scatterCount,setScatterCount]=useState(0);
  const [showWin,setShowWin]=useState(false);
  const [bigWin,setBigWin]=useState(null);
  // Multiplier tracking
  const [activeMultipliers,setActiveMultipliers]=useState([]); // [{type,baseVal,currentVal,r,c}]
  const [multDisplay,setMultDisplay]=useState(0); // sum of all active mults for display
  const [flashMult,setFlashMult]=useState(null);
  const [spinRawWin,setSpinRawWin]=useState(0);
  const [spinAppliedMult,setSpinAppliedMult]=useState(0);
  const [bannerPhase,setBannerPhase]=useState("hidden");
  const [bannerFinal,setBannerFinal]=useState(0);
  const [cpAnteBet,setCpAnteBet]=useState(false);
  const [cpFeatureMode,setCpFeatureMode]=useState(null); // null | 'bonushunt' | 'heavenly'
  const [tumbleHistory,setTumbleHistory]=useState([]);
  const [showBuyModal,setShowBuyModal]=useState(false);
  const [reTrigger,setReTrigger]=useState(null); // null | {spins, key}

  const [cpBonusType,setCpBonusType]=useState(null); // null | 'standard' | 'divine'
  const [divinePortal,setDivinePortal]=useState(0); // progressive divine mult portal (divine bonus only)

  const bannerTimers=useRef([]);
  const spinRef=useRef(false);
  const freeSpinsRef=useRef(0);
  const activeMultsRef=useRef([]);
  const divinePortalRef=useRef(0); // ref mirror of divinePortal for use inside async doSpin

  const isBonus=bonusPhase==="spins";
  const sleep=ms=>new Promise(res=>setTimeout(res,ms));
  const fallDur=drop=>drop>=(CP_ROWS+2)?470:Math.max(160,drop*60+130);
  const initDelay=(r,c)=>c*80+(CP_ROWS-1-r)*18;

  function clearBannerTimers(){bannerTimers.current.forEach(clearTimeout);bannerTimers.current=[];}
  function bt(fn,ms){const id=setTimeout(fn,ms);bannerTimers.current.push(id);return id;}

  // Buy Bonus — instantly trigger free spins
  async function doBuyBonusSpin(type,numSpins){
    if(spinRef.current)return;
    spinRef.current=true;setSpinning(true);
    setWinCells(new Set());setRemoveCells(new Set());setTotalWin(0);setCascade(0);
    setActiveMultipliers([]);setMultDisplay(0);

    // 100x (cloudsurge) = 3 scatters = standard bonus (10 spins)
    // 200x (divineboost) = 4 scatters = divine bonus (10 spins, progressive portal)
    const isPremium=type==="divineboost";
    const scatterTarget=isPremium?4:3;
    const spinsToAward=10; // both modes give 10 spins
    setCpBonusType(isPremium?"divine":"standard");
    divinePortalRef.current=0;setDivinePortal(0);

    // Generate a grid with scatter symbols placed for triggering
    // First clear all pre-existing scatters so we control the exact count
    let g=cpGenGrid(false,cpAnteBet);
    for(let r=0;r<CP_ROWS;r++)for(let c=0;c<CP_COLS;c++){if(g[r][c]==="scatter")g[r][c]=cpRandSym(false,false);}
    const pos=[];for(let r=0;r<CP_ROWS;r++)for(let c=0;c<CP_COLS;c++)pos.push([r,c]);
    for(let i=pos.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pos[i],pos[j]]=[pos[j],pos[i]];}
    const usedCols=new Set();let placed=0;
    for(const[r,c]of pos){
      if(placed>=scatterTarget)break;
      if(usedCols.has(c))continue;
      g[r][c]="scatter";usedCols.add(c);placed++;
    }

    const initDrop2=Array.from({length:CP_ROWS},(_,r)=>Array.from({length:CP_COLS},(_,c)=>({drop:CP_ROWS+3,delay:initDelay(r,c),mode:"fall"})));
    setCellDrop(initDrop2);
    setCellKeys(Array.from({length:CP_ROWS},(_,r)=>Array.from({length:CP_COLS},(_,c)=>`${r}${c}${Date.now()}`)));
    setGrid(g.map(r=>[...r]));
    await sleep((CP_COLS-1)*55+(CP_ROWS-1)*20+520);
    setCellDrop(Array.from({length:CP_ROWS},()=>Array.from({length:CP_COLS},()=>({mode:"still"}))));

    // Ping scatters
    const scPos=[];g.forEach((row,r)=>row.forEach((s,c)=>{if(s==="scatter")scPos.push([r,c]);}));
    const scCells=new Set(scPos.map(([r,c])=>`${r}-${c}`));
    setWinCells(scCells);
    scPos.forEach((_,i)=>sfx.scatterPing(i));
    await sleep(500);

    freeSpinsRef.current=spinsToAward;
    setFreeSpins(spinsToAward);setFreeSpinsLeft(spinsToAward);setBonusWin(0);
    sfx.bonusLand();
    setScatterCount(scatterTarget);setBonusPhase("trigger");
    await sleep(2600);
    setWinCells(new Set());
    setBonusPhase("spins");
    spinRef.current=false;setSpinning(false);
  }

  function showWinBanner(raw,mult,final){
    clearBannerTimers();setBannerPhase("hidden");
    if(final<=0)return;
    setBannerFinal(final);setSpinRawWin(raw);setSpinAppliedMult(mult);
    if(mult>1){
      bt(()=>setBannerPhase("split"),40);
      bt(()=>setBannerPhase("merge"),650);
      bt(()=>setBannerPhase("final"),1050);
      bt(()=>setBannerPhase("out"),2200);
      bt(()=>setBannerPhase("hidden"),2600);
    }else{
      bt(()=>setBannerPhase("final"),40);
      bt(()=>setBannerPhase("out"),1600);
      bt(()=>setBannerPhase("hidden"),2000);
    }
  }

  // Render symbol — multiplier symbols need their current value
  const cpSym=(sym,r,c)=>{
    if(!sym)return null;
    if(sym==="normal_mult"||sym==="super_mult"||sym==="epic_mult"){
      const am=activeMultipliers.find(m=>m.r===r&&m.c===c);
      if(sym==="normal_mult"){
        // Always show value immediately — am is synced before grid renders
        // am.currentVal is always a number (never null) for normal_mult
        return CP_SYM_RENDER[sym]?.(am?.currentVal??am?.baseVal??2);
      }
      // super/epic: show "?" until revealed; once revealed always show currentVal
      const val=am?.revealed?am.currentVal:null;
      return CP_SYM_RENDER[sym]?.(val);
    }
    return CP_SYM_RENDER[sym]?.();
  };

  async function doSpin(isFS=false){
    if(spinRef.current)return;
    spinRef.current=true;
    clearBannerTimers();
    setSpinning(true);
    setWinCells(new Set());setRemoveCells(new Set());setTotalWin(0);setCascade(0);setWinAmt(0);
    setShowWin(false);setSpinRawWin(0);setSpinAppliedMult(0);setBannerPhase("hidden");setBannerFinal(0);
    // Always reset mult state at spin start — mults are never carried over between spins
    setActiveMultipliers([]);setMultDisplay(0);activeMultsRef.current=[];
    setFlashMult(null);setTumbleHistory([]);

    const cpCost=isFS?0:cpAnteBet?+(bet*1.25).toFixed(2):bet;
    if(!isFS){
      setBalance(b=>+(b-cpCost).toFixed(2));
      setStats(s=>({...s,spins:s.spins+1,totalBet:+(s.totalBet+cpCost).toFixed(2)}));
    }

    const isFeatureSpin=!isFS&&(cpFeatureMode==="bonushunt"||cpFeatureMode==="heavenly");
    const maxCascade=isFeatureSpin?Math.max(1,cpRollCascadeDepth(isFS)):cpRollCascadeDepth(isFS);
    let g=isFeatureSpin
      ?cpGenGridFeature(isFS,cpFeatureMode==="bonushunt"?5:1)
      :cpGenGridForDepth(isFS,maxCascade,cpAnteBet);

    const initDrop=Array.from({length:CP_ROWS},(_,r)=>Array.from({length:CP_COLS},(_,c)=>({drop:CP_ROWS+3,delay:initDelay(r,c),mode:"fall"})));
    setCellDrop(initDrop);
    setCellKeys(Array.from({length:CP_ROWS},(_,r)=>Array.from({length:CP_COLS},(_,c)=>`${r}${c}${Date.now()}`)));
    setGrid(g.map(r=>[...r]));
    await sleep((CP_COLS-1)*55+(CP_ROWS-1)*20+520);
    setCellDrop(Array.from({length:CP_ROWS},()=>Array.from({length:CP_COLS},()=>({mode:"still"}))));

    // ── Scatter tracking — maxScatterSeen is the authoritative trigger count ──
    // Track the highest number of scatters seen on the grid at any point during this spin.
    let maxScatterSeen=g.flat().filter(s=>s==="scatter").length;

    if(!isFS){
      if(maxScatterSeen>=3){
        // Highlight scatters right away for visual feedback, cascade will still run
        const scPosPre=[];g.forEach((row,r)=>row.forEach((s,c)=>{if(s==="scatter")scPosPre.push([r,c]);}));
        setWinCells(new Set(scPosPre.map(([r,c])=>`${r}-${c}`)));
        scPosPre.forEach((_,i)=>sfx.scatterPing(i));
        await sleep(700);
        setWinCells(new Set()); // clear so cascade highlights work normally
      }
    }else{
      const sc=g.flat().filter(s=>s==="scatter").length;
      if(sc>=2){
        // Per game rules: 2 FS awards +2 free spins; 3 FS awards +4 free spins
        const bonus=sc>=3?4:2;
        setFreeSpinsLeft(p=>p+bonus);
        setFreeSpins(p=>{const n=p+bonus;freeSpinsRef.current=n;return n;});
        const scPos=[];g.forEach((row,r)=>row.forEach((s,c)=>{if(s==="scatter")scPos.push([r,c]);}));
        setWinCells(new Set(scPos.map(([r,c])=>`${r}-${c}`)));
        scPos.forEach((_,i)=>sfx.scatterPing(i));
        // ── RE-TRIGGER animation ──
        setReTrigger({spins:bonus,key:Date.now()});
        sfx.bonusLand();
        await sleep(1800);
        setReTrigger(null);
        setWinCells(new Set());
      }
    }

    let spinTotal=0,cascN=0;
    const cascWait=660,removeWait=320;

    // ── Multiplier tracking ──
    // Mults are NOT sticky — each spin (base or free) always starts with a fresh scan.
    // Multiplier symbols that land on the grid escalate during cascades within this spin only;
    // they are never carried over to the next spin.
    let mults=[];
    for(let r=0;r<CP_ROWS;r++)for(let c=0;c<CP_COLS;c++){
      const s=g[r][c];
      if(s==="normal_mult"||s==="super_mult"||s==="epic_mult"){
        const bv=cpRollMultValue(s);
        const revealed=s==="normal_mult";
        mults.push({type:s,baseVal:bv,r,c,cascadesActive:0,currentVal:bv,revealed,poolContrib:bv});
      }
    }
    // Sync to state — multDisplay shows only revealed mults initially
    setActiveMultipliers([...mults]);
    activeMultsRef.current=[...mults];
    setMultDisplay(mults.filter(m=>m.revealed).reduce((sum,m)=>sum+cpMultPoolVal(m),0));

    // ── MAIN CASCADE LOOP ──
    while(true){
      const winners=cpFindWinners(g);
      if(winners.length===0)break;

      const counts={};const wCells=new Set();
      g.forEach((row,r)=>row.forEach((s,c)=>{if(s&&winners.includes(s)){wCells.add(`${r}-${c}`);counts[s]=(counts[s]||0)+1;}}));

      // ── Reveal hidden super/epic mult values just before win highlights show ──
      const anyUnrevealed=mults.some(m=>!m.revealed);
      if(anyUnrevealed){
        mults=mults.map(m=>({...m,revealed:true}));
        setActiveMultipliers([...mults]);
        setMultDisplay(mults.reduce((acc,m)=>acc+cpMultPoolVal(m),0));
        await sleep(280); // brief flash so player sees the reveal
      }

      setWinCells(wCells);

      let roundWin=0;
      for(const sym of winners)roundWin+=cpSymPay(sym,counts[sym])*bet;
      spinTotal=+(spinTotal+roundWin).toFixed(2);
      cascN++;setCascade(cascN);setWinAmt(roundWin);

      // Escalate all multipliers on the grid (they grow with each cascade)
      mults=mults.map(m=>({...m,cascadesActive:m.cascadesActive+1,currentVal:cpEscalateMultStep(m.type,m.currentVal),poolContrib:m.type==="normal_mult"?Math.min((m.poolContrib??m.currentVal)+1,10):cpEscalateMultStep(m.type,m.poolContrib??m.currentVal),revealed:true}));
      setActiveMultipliers([...mults]);activeMultsRef.current=[...mults];
      const mSum=mults.reduce((s,m)=>s+cpMultPoolVal(m),0);
      setMultDisplay(mSum);

      const bestSym=winners.sort((a,b)=>cpSymPay(b,counts[b])-cpSymPay(a,counts[a]))[0];
      setTumbleHistory(prev=>[...prev,{sym:bestSym,win:roundWin,cascN}]);
      if(roundWin>0)sfx.gem(Math.min(roundWin/bet,3));
      await sleep(cascWait);

      // Remove winning symbols (multipliers & scatters NOT in wCells so they survive)
      setRemoveCells(wCells);await sleep(removeWait);
      for(let r=0;r<CP_ROWS;r++)for(let c=0;c<CP_COLS;c++){if(wCells.has(`${r}-${c}`))g[r][c]=null;}

      // Gravity
      const{ng,dd}=cpGravity(g);g=ng;
      // Re-scan mults after gravity — match by column order (gravity preserves column ordering)
      const newMults=[];
      const multsByCol={};
      mults.forEach(m=>{if(!multsByCol[m.c])multsByCol[m.c]=[];multsByCol[m.c].push(m);});
      Object.values(multsByCol).forEach(arr=>arr.sort((a,b)=>a.r-b.r));
      const colIdx={};
      for(let r=0;r<CP_ROWS;r++)for(let c=0;c<CP_COLS;c++){
        const s=g[r][c];
        if(s==="normal_mult"||s==="super_mult"||s==="epic_mult"){
          const ci=colIdx[c]||0;colIdx[c]=ci+1;
          const existing=(multsByCol[c]||[])[ci];
          if(existing){newMults.push({...existing,r,c});}
          else{const bv=cpRollMultValue(s);const rv=s==="normal_mult";newMults.push({type:s,baseVal:bv,r,c,cascadesActive:0,currentVal:bv,revealed:rv,poolContrib:0});}
        }
      }
      mults=newMults;

      const nullPos=new Set();
      for(let r=0;r<CP_ROWS;r++)for(let c=0;c<CP_COLS;c++){if(g[r][c]===null)nullPos.add(`${r}-${c}`);}
      const hitLimit=(maxCascade<10&&cascN>=maxCascade);
      g=hitLimit?cpFillCapped(g,isFS,7):cpFill(g,isFS);

      // Check for new multipliers that just fell in
      const newMultSet=new Set(mults.map(m=>`${m.r}-${m.c}`));
      for(let r=0;r<CP_ROWS;r++)for(let c=0;c<CP_COLS;c++){
        const s=g[r][c];
        if((s==="normal_mult"||s==="super_mult"||s==="epic_mult")&&nullPos.has(`${r}-${c}`)&&!newMultSet.has(`${r}-${c}`)){
          const bv=cpRollMultValue(s);
          // normal_mult lands showing value; super/epic land hidden until next win
          const rv=s==="normal_mult";
          mults.push({type:s,baseVal:bv,r,c,cascadesActive:0,currentVal:bv,revealed:rv,poolContrib:0});
        }
      }
      // Existing mults already have correct currentVal from top-of-loop escalation; don't re-map them
      setActiveMultipliers([...mults]);activeMultsRef.current=[...mults];
      setMultDisplay(mults.filter(m=>m.revealed).reduce((s,m)=>s+cpMultPoolVal(m),0));
      // Track max scatters ever seen (catches scatters that fall in during fills)
      const scNow=g.flat().filter(s=>s==="scatter").length;
      if(scNow>maxScatterSeen)maxScatterSeen=scNow;

      const cascDrop=Array.from({length:CP_ROWS},(_,r)=>Array.from({length:CP_COLS},(_,c)=>{
        if(nullPos.has(`${r}-${c}`))return{drop:CP_ROWS+3,delay:c*38,mode:"tumble"};
        if(dd[r][c]>0)return{drop:dd[r][c],delay:c*20,mode:"gravity"};
        return{drop:0,delay:0,mode:"still"};
      }));
      setCellDrop(cascDrop);
      setCellKeys(prev=>prev.map((row,r)=>row.map((k,c)=>{
        if(nullPos.has(`${r}-${c}`)||dd[r][c]>0)return`${r}${c}${Date.now()}c${cascN}`;
        return k;
      })));
      setRemoveCells(new Set());setWinCells(new Set());setGrid(g.map(row=>[...row]));
      sfx.tumble();
      await sleep((CP_COLS-1)*38+fallDur(CP_ROWS+3)+55);
      setCellDrop(Array.from({length:CP_ROWS},()=>Array.from({length:CP_COLS},()=>({mode:"still"}))));
    }

    // ── POST-LOOP REVEAL: any super/epic mults that fell on the final fill but got no further tumble
    //    → reveal them if there were wins (they count!), keep "?" only on a true dead spin
    const leftoverUnrevealed=mults.some(m=>!m.revealed);
    if(leftoverUnrevealed&&spinTotal>0){
      await sleep(220);
      mults=mults.map(m=>({...m,revealed:true}));
      setActiveMultipliers([...mults]);
      setMultDisplay(mults.reduce((s,m)=>s+cpMultPoolVal(m),0));
      await sleep(340); // let player see the reveal before the mult flash
    }

    // ── APPLY MULTIPLIERS ──
    const rawWin=spinTotal;
    let appliedMult=0;
    const totalMultSum=mults.reduce((s,m)=>s+(m.currentVal||0),0);
    const isDivine=cpBonusType==="divine"&&isFS;

    if(isDivine){
      // ── DIVINE BOOST: progressive portal mechanic ──
      // Win + mults on grid → add mults to portal, apply portal total to win
      // Win but no mults → portal stays inactive (no mult applied this spin)
      // Mults on grid but no win → mults NOT added to portal
      if(spinTotal>0&&totalMultSum>0){
        divinePortalRef.current=+(divinePortalRef.current+totalMultSum).toFixed(0);
        setDivinePortal(divinePortalRef.current);
        appliedMult=divinePortalRef.current;
        spinTotal=+(spinTotal*divinePortalRef.current).toFixed(2);
        setFlashMult({val:divinePortalRef.current,key:Date.now()});
        sfx.win(2);
        await sleep(800);
        setFlashMult(null);
      }
      // win but no mults, or mults but no win → no portal action this spin
    }else{
      // ── STANDARD bonus / base game: per-spin mult ──
      if(spinTotal>0&&totalMultSum>0){
        appliedMult=totalMultSum;
        spinTotal=+(spinTotal*totalMultSum).toFixed(2);
        setFlashMult({val:totalMultSum,key:Date.now()});
        sfx.win(2);
        await sleep(800);
        setFlashMult(null);
      }
    }

    // Post-cascade scatter check — always authoritative bonus trigger
    // Also re-check current grid in case scatters accumulated after last fill
    if(!isFS){
      const scFinal=Math.max(maxScatterSeen,g.flat().filter(s=>s==="scatter").length);
      if(scFinal>=3){
        // 3 scatters = standard bonus (10 spins), 4+ scatters = Divine Boost (10 spins + progressive portal)
        const spinsAward=10;
        const triggeredBonusType=scFinal>=4?"divine":"standard";
        setCpBonusType(triggeredBonusType);
        divinePortalRef.current=0;setDivinePortal(0);
        // Credit any wins from this spin BEFORE entering bonus
        if(spinTotal>0){
          const fw=+spinTotal.toFixed(2);
          setTotalWin(fw);setBalance(b=>+(b+fw).toFixed(2));
          setFlashG(true);setTimeout(()=>setFlashG(false),500);
          sfx.win(Math.min(fw/bet,5));
          setStats(s=>({...s,wins:s.wins+1,biggest:Math.max(s.biggest,fw),totalWon:+(s.totalWon+fw).toFixed(2)}));
          showWinBanner(rawWin,appliedMult,fw);
          await sleep(1200);
        }
        freeSpinsRef.current=spinsAward;
        setFreeSpins(spinsAward);setFreeSpinsLeft(spinsAward);setBonusWin(0);
        const scPos2=[];g.forEach((row,r)=>row.forEach((s,c)=>{if(s==="scatter")scPos2.push([r,c]);}));
        setWinCells(new Set(scPos2.map(([r,c])=>`${r}-${c}`)));
        scPos2.forEach((_,i)=>sfx.scatterPing(i));
        await sleep(680);sfx.bonusLand();
        setScatterCount(scFinal);setBonusPhase("trigger");
        await sleep(2600);
        setBonusPhase("spins");spinRef.current=false;setSpinning(false);return;
      }
    }

    const finalWin=+spinTotal.toFixed(2);
    if(finalWin>0){
      setTotalWin(finalWin);setBalance(b=>+(b+finalWin).toFixed(2));
      setFlashG(true);setTimeout(()=>setFlashG(false),500);
      sfx.win(Math.min(finalWin/bet,5));
      setStats(s=>({...s,wins:s.wins+1,biggest:Math.max(s.biggest,finalWin),totalWon:+(s.totalWon+finalWin).toFixed(2)}));
      if(isFS)setBonusWin(p=>+(p+finalWin).toFixed(2));
      showWinBanner(rawWin,appliedMult,finalWin);
      const wm=finalWin/bet;
      if(wm>=30){
        const bannerDelay=appliedMult>1?2700:2100;
        setTimeout(()=>setBigWin({target:finalWin,mult:+wm.toFixed(1)}),bannerDelay);
      }
    }else if(!isFS){
      setFlashR(true);setTimeout(()=>setFlashR(false),500);sfx.lose();
    }

    if(isFS){
      setFreeSpinsLeft(p=>{
        const next=p-1;
        if(next<=0){
          setTimeout(()=>{
            const bw=+(bonusWin+(finalWin>0?finalWin:0)).toFixed(2);
            if(bw/bet>=30)setBigWin({target:bw,mult:+(bw/bet).toFixed(1)});
            setBonusPhase("end");
          },finalWin>0?2800:600);
        }
        return next;
      });
    }
    // Always clear ref so mults never carry over to next spin
    activeMultsRef.current=[];
    spinRef.current=false;setSpinning(false);
  }

  function endBonus(){
    setBonusPhase(null);setFreeSpins(0);setFreeSpinsLeft(0);setBigWin(null);
    setActiveMultipliers([]);setMultDisplay(0);
    activeMultsRef.current=[];
    setCpBonusType(null);
    divinePortalRef.current=0;setDivinePortal(0);
    const eg=cpGenGrid(false);setGrid(eg);
    setCellDrop(Array.from({length:CP_ROWS},()=>Array(CP_COLS).fill({drop:CP_ROWS+3,delay:0})));
    setCellKeys(Array.from({length:CP_ROWS},(_,r)=>Array.from({length:CP_COLS},(_,c)=>`${r}${c}end${Date.now()}`)));
  }

  // Free spins are triggered manually via the spin button — no autoplay
  const CP_CSS=`
    @keyframes cpFall{
      0%{transform:translateY(calc(var(--fdrop,8)*-106%));opacity:0;}
      8%{opacity:1;}
      72%{transform:translateY(5%);opacity:1;}
      82%{transform:translateY(-2%);}
      95%{transform:translateY(0);}
      100%{transform:translateY(0);opacity:1;}
    }
    @keyframes cpFallTumble{
      0%{transform:translateY(calc(var(--fdrop,5)*-106%));opacity:0;}
      10%{opacity:1;}
      70%{transform:translateY(4%);}
      80%{transform:translateY(-2%);}
      100%{transform:translateY(0);opacity:1;}
    }
    @keyframes cpGravity{
      0%{transform:translateY(calc(var(--fdrop,1)*-106%));}
      68%{transform:translateY(3%);}
      82%{transform:translateY(-1.5%);}
      100%{transform:translateY(0);}
    }
    @keyframes cpWinPulse{0%,100%{filter:brightness(1)}50%{filter:brightness(1.25)}}
    @keyframes cpRemove{0%{transform:scale(1);opacity:1}100%{transform:scale(0);opacity:0}}
    @keyframes cpMultPop{0%{transform:translate(-50%,-50%) scale(0);opacity:0}40%{transform:translate(-50%,-50%) scale(1.4);opacity:1}100%{transform:translate(-50%,-50%) translateY(-60px) scale(.8);opacity:0}}
    @keyframes cpMultPoolBounce{0%{transform:scale(0.6)}50%{transform:scale(1.15)}100%{transform:scale(1)}}
    @keyframes cpScatterOrbit{from{transform:rotate(0deg) translateX(28px) rotate(0deg)}to{transform:rotate(360deg) translateX(28px) rotate(-360deg)}}
    @keyframes cpScatterPulseGlow{0%,100%{box-shadow:0 0 18px 6px rgba(255,224,130,.7),0 0 40px 12px rgba(255,224,130,.35)}50%{box-shadow:0 0 36px 14px rgba(255,224,130,1),0 0 80px 24px rgba(255,224,130,.55)}}
    @keyframes cpScatterFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-6px) scale(1.08)}}
    @keyframes cpWinSplitL{0%{opacity:0;transform:translateX(0) scale(.5)}100%{opacity:1;transform:translateX(-80px) scale(1)}}
    @keyframes cpWinSplitR{0%{opacity:0;transform:translateX(0) scale(.5)}100%{opacity:1;transform:translateX(80px) scale(1)}}
    @keyframes cpWinMergeL{0%{transform:translateX(-80px)}100%{transform:translateX(0);opacity:0}}
    @keyframes cpWinMergeR{0%{transform:translateX(80px)}100%{transform:translateX(0);opacity:0}}
    @keyframes cpWinFinalPop{0%{transform:scale(0);opacity:0}60%{transform:scale(1.2);opacity:1}100%{transform:scale(1)}}
    @keyframes cpWinSubIn{0%{opacity:0;transform:translateY(8px)}100%{opacity:1;transform:translateY(0)}}
    @keyframes cpReTrigIn{0%{opacity:0;transform:translate(-50%,-50%) scale(.4)}55%{transform:translate(-50%,-50%) scale(1.12)}75%{transform:translate(-50%,-50%) scale(.96)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}
    @keyframes cpReTrigOut{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.3)}}
    @keyframes cpReTrigGlow{0%,100%{text-shadow:0 0 30px rgba(255,200,80,.9),0 0 70px rgba(255,160,0,.5)}50%{text-shadow:0 0 50px rgba(255,220,120,1),0 0 120px rgba(255,180,0,.8)}}
    @keyframes cpReTrigSpins{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:translateY(0)}}
    @keyframes cpReTrigStars{0%{transform:scale(0) rotate(0deg);opacity:1}100%{transform:scale(2.5) rotate(180deg);opacity:0}}
    .cp-retrigger-overlay{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:60;pointer-events:none;text-align:center;width:100%;}
    .cp-retrigger-overlay.in{animation:cpReTrigIn .5s cubic-bezier(.34,1.4,.64,1) both;}
    .cp-retrigger-overlay.out{animation:cpReTrigOut .4s ease forwards;}
    .cp-retrigger-title{font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:900;color:#ffd700;animation:cpReTrigGlow 0.8s ease infinite;line-height:1;}
    .cp-retrigger-spins{font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:800;color:#e0d0ff;margin-top:6px;animation:cpReTrigSpins .4s .3s ease both;letter-spacing:.05em;}
    .cp-retrigger-star{position:absolute;font-size:1.6rem;animation:cpReTrigStars .9s ease-out both;pointer-events:none;}

    .cp-container{position:relative;display:flex;flex-direction:column;height:100%;
      background:radial-gradient(ellipse at 50% 20%,#1a0850 0%,#0a0420 40%,#04010e 100%);overflow:hidden;}
    .cp-container::before{content:'';position:absolute;inset:0;
      background:radial-gradient(circle at 30% 70%,rgba(180,100,255,.06) 0%,transparent 50%),
                 radial-gradient(circle at 70% 30%,rgba(100,180,255,.05) 0%,transparent 50%);pointer-events:none;}

    .cp-top{height:44px;display:flex;align-items:center;padding:0 12px;gap:8px;position:relative;z-index:10;flex-shrink:0;}
    .cp-back{background:none;border:1px solid rgba(180,140,255,.25);border-radius:6px;color:rgba(220,200,255,.9);font-size:.72rem;font-weight:600;padding:5px 12px;cursor:pointer;font-family:'Space Grotesk',sans-serif;}
    .cp-back:hover{background:rgba(180,140,255,.1);border-color:rgba(180,140,255,.5);}
    .cp-title-bar{flex:1;text-align:center;font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;color:rgba(220,200,255,.95);text-shadow:0 0 20px rgba(180,120,255,.4);}
    .cp-fs-badge{background:linear-gradient(135deg,rgba(180,100,255,.25),rgba(120,60,200,.3));border:1px solid rgba(180,140,255,.4);border-radius:16px;padding:4px 14px;font-family:'Space Grotesk',sans-serif;font-size:.7rem;font-weight:700;color:#e0d0ff;}

    .cp-main{flex:1;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;min-height:0;}

    .cp-frame{position:relative;transform:translateZ(0);padding:8px;
      background:linear-gradient(180deg,rgba(30,15,60,.7) 0%,rgba(15,8,35,.85) 100%);
      border-radius:16px;border:1.5px solid rgba(180,140,255,.2);
      box-shadow:0 0 40px rgba(120,60,200,.15),inset 0 0 30px rgba(0,0,0,.3);}

    .cp-grid{display:grid;contain:layout style paint;touch-action:none;grid-template-columns:repeat(6,1fr);gap:4px;width:min(460px,calc(100vh - 200px));}
    .cp-cell{position:relative;border-radius:9px;will-change:transform,opacity;contain:layout style;
      aspect-ratio:1;background:linear-gradient(145deg,rgba(25,12,50,.95),rgba(12,6,28,.98));
      border:1.5px solid rgba(120,80,200,.14);overflow:hidden;}
    .cp-cell::after{content:'';position:absolute;inset:0;background:linear-gradient(145deg,rgba(180,140,255,.08) 0%,transparent 50%,rgba(0,0,0,.12) 100%);border-radius:7px;pointer-events:none;}
    .cp-cell.win{border-color:rgba(255,224,130,.9)!important;background:linear-gradient(145deg,rgba(60,40,10,.99),rgba(30,20,5,.99))!important;box-shadow:inset 0 0 24px rgba(255,224,130,.3),0 0 22px rgba(255,224,130,.3)!important;animation:cpWinPulse .45s ease infinite;}
    .cp-cell.removing{animation:cpRemove .38s cubic-bezier(.55,.06,.68,.19) forwards!important;}
    .cp-cell.scatter-trigger{animation:cpScatterPulseGlow 0.7s ease-in-out infinite!important;overflow:visible!important;}
    .cp-cell.scatter-trigger .cp-sym{animation:cpScatterFloat 1.4s ease-in-out infinite!important;}
    .cp-cell.mult-cell{border-color:rgba(180,140,255,.5)!important;box-shadow:inset 0 0 15px rgba(180,140,255,.2),0 0 15px rgba(180,140,255,.2);}

    .cp-sym{width:100%;height:100%;display:flex;align-items:center;justify-content:center;will-change:transform;filter:drop-shadow(0 2px 6px rgba(0,0,0,.65));}
    .cp-sym.cp-fall{animation:cpFall var(--fdur,480ms) cubic-bezier(.25,.46,.45,.94) both;animation-delay:var(--fdelay,0ms);}
    .cp-sym.cp-tumble{animation:cpFallTumble var(--fdur,440ms) cubic-bezier(.25,.46,.45,.94) both;animation-delay:var(--fdelay,0ms);}
    .cp-sym.cp-gravity{animation:cpGravity var(--fdur,300ms) cubic-bezier(.25,.46,.45,.94) both;animation-delay:var(--fdelay,0ms);opacity:1!important;}
    .cp-sym.cp-still{animation:none!important;opacity:1!important;transform:none!important;}

    .cp-mult-pool{position:absolute;top:8px;right:8px;font-family:'Space Grotesk',sans-serif;font-size:1.3rem;font-weight:900;color:#e0d0ff;text-shadow:0 0 20px rgba(180,120,255,.9);background:rgba(0,0,0,.6);border-radius:10px;padding:3px 10px;border:1.5px solid rgba(180,140,255,.5);z-index:15;pointer-events:none;animation:cpMultPoolBounce .4s cubic-bezier(.34,1.5,.64,1);}
    .cp-divine-portal{position:absolute;top:8px;left:8px;font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:900;color:#ffe080;text-shadow:0 0 18px rgba(255,200,50,.9),0 0 6px rgba(255,255,100,.7);background:rgba(40,20,0,.8);border-radius:10px;padding:3px 10px;border:1.5px solid rgba(255,200,60,.6);z-index:15;pointer-events:none;animation:cpMultPoolBounce .4s cubic-bezier(.34,1.5,.64,1);}
    .cp-bolt-pop{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:900;color:#e0d0ff;text-shadow:0 0 16px rgba(180,120,255,.9);z-index:20;pointer-events:none;animation:cpMultPop .85s cubic-bezier(.22,1,.36,1) forwards;}

    .cp-win-banner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);height:0;overflow:visible;pointer-events:none;display:flex;align-items:center;justify-content:center;z-index:25;}
    .cp-wb-split-l,.cp-wb-split-r{position:absolute;font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:900;color:#e0d0ff;text-shadow:0 0 20px rgba(180,120,255,.9);white-space:nowrap;display:none;}
    .cp-wb-final{display:none;text-align:center;}
    .cp-wb-total{font-family:'Space Grotesk',sans-serif;font-size:2.2rem;font-weight:900;color:#fff;text-shadow:0 0 30px rgba(180,120,255,.9),0 0 60px rgba(120,60,200,.5);}
    .cp-wb-sub{font-family:'Space Grotesk',sans-serif;font-size:.8rem;font-weight:700;color:rgba(200,180,255,.8);margin-top:2px;}

    .cp-win-banner.split .cp-wb-split-l{display:block;animation:cpWinSplitL .38s cubic-bezier(.34,1.3,.64,1) both;}
    .cp-win-banner.split .cp-wb-split-r{display:block;animation:cpWinSplitR .38s cubic-bezier(.34,1.3,.64,1) both;}
    .cp-win-banner.split .cp-wb-final{display:none;}
    .cp-win-banner.merge .cp-wb-split-l{display:block;animation:cpWinMergeL .42s cubic-bezier(.6,0,.4,1) forwards;}
    .cp-win-banner.merge .cp-wb-split-r{display:block;animation:cpWinMergeR .42s cubic-bezier(.6,0,.4,1) forwards;}
    .cp-win-banner.final .cp-wb-split-l,.cp-win-banner.final .cp-wb-split-r{display:none;}
    .cp-win-banner.final .cp-wb-final{display:block;animation:cpWinFinalPop .5s cubic-bezier(.34,1.3,.64,1) both;}
    .cp-win-banner.final .cp-wb-sub{animation:cpWinSubIn .4s .25s ease both;}
    .cp-win-banner.out .cp-wb-split-l,.cp-win-banner.out .cp-wb-split-r{display:none;}
    .cp-win-banner.out .cp-wb-final{display:block;animation:cpWinFinalPop .3s ease reverse forwards;}

    .cp-bottom{height:64px;flex-shrink:0;position:relative;z-index:10;
      background:linear-gradient(180deg,rgba(15,8,35,.95),rgba(8,4,20,.98));
      display:flex;align-items:center;padding:0 12px;gap:8px;}
    .cp-bottom::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent 0%,rgba(180,140,255,.45) 25%,rgba(220,180,255,.8) 50%,rgba(180,140,255,.45) 75%,transparent 100%);}
    .cp-btm-left{display:flex;gap:6px;}
    .cp-btm-info{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;}
    .cp-btm-credits{display:flex;gap:24px;}
    .cp-btm-lbl{font-size:.55rem;font-weight:600;color:rgba(180,160,220,.6);text-transform:uppercase;letter-spacing:.08em;}
    .cp-btm-val{font-size:.88rem;font-weight:800;color:#e0d0ff;font-variant-numeric:tabular-nums;}
    .cp-btm-hint{font-size:.5rem;color:rgba(180,160,220,.35);margin-top:2px;}
    .cp-btm-right{display:flex;align-items:center;gap:6px;}
    .cp-ic-btn{width:32px;height:32px;border-radius:7px;background:none;border:1px solid rgba(180,140,255,.2);color:rgba(200,180,240,.7);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.85rem;}
    .cp-ic-btn:hover{background:rgba(180,140,255,.1);}
    .cp-adj-btn{width:32px;height:32px;border-radius:50%;background:rgba(180,140,255,.1);border:1px solid rgba(180,140,255,.3);color:#e0d0ff;font-size:1.1rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;}
    .cp-adj-btn:hover{background:rgba(180,140,255,.2);}
    .cp-adj-btn:disabled{opacity:.3;cursor:default;}
    .cp-big-spin{width:52px;height:52px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;
      background:linear-gradient(135deg,#c084fc,#9333ea);box-shadow:0 0 20px rgba(180,100,255,.4);transition:transform .1s;}
    .cp-big-spin:hover:not(:disabled){transform:scale(1.06);}
    .cp-big-spin:disabled{opacity:.4;cursor:default;}
    .cp-big-spin.bonus{background:linear-gradient(135deg,#ffd700,#ffaa00);box-shadow:0 0 20px rgba(255,200,0,.5);}
    .cp-big-spin.feature-bonushunt{background:linear-gradient(135deg,#ff6a00,#e8341a);box-shadow:0 0 22px rgba(232,52,26,.55),0 0 8px rgba(255,100,0,.3);}
    .cp-big-spin.feature-bonushunt::after{content:"×5";position:absolute;top:-7px;right:-7px;background:#e8341a;color:#fff;font-family:'Space Grotesk',sans-serif;font-size:.48rem;font-weight:900;padding:2px 5px;border-radius:5px;box-shadow:0 1px 4px rgba(0,0,0,.4);}
    .cp-big-spin.feature-heavenly{background:linear-gradient(135deg,#fff7c0,#ffe066,#ffcc00);box-shadow:0 0 22px rgba(255,220,0,.65),0 0 8px rgba(255,240,100,.3);}
    .cp-big-spin.feature-heavenly::after{content:"✦";position:absolute;top:-7px;right:-7px;background:#ffe066;color:#7a5a00;font-size:.65rem;padding:2px 4px;border-radius:5px;box-shadow:0 1px 4px rgba(0,0,0,.3);}
    .cp-feature-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-family:'Space Grotesk',sans-serif;font-size:.5rem;font-weight:800;letter-spacing:.06em;cursor:pointer;transition:opacity .15s;}
    .cp-feature-badge.bonushunt{background:rgba(232,52,26,.18);border:1px solid rgba(232,52,26,.5);color:#ff8866;}
    .cp-feature-badge.heavenly{background:rgba(255,220,0,.15);border:1px solid rgba(255,220,0,.5);color:#ffe066;}
    .cp-big-spin svg{width:22px;height:22px;}

    .cp-trigger-overlay{position:absolute;inset:0;z-index:50;display:flex;flex-direction:column;align-items:center;justify-content:center;
      background:radial-gradient(ellipse at 50% 50%,rgba(20,10,50,.92),rgba(5,2,15,.96));animation:bbsIn .5s ease both;}
    .cp-trigger-title{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:#ffd700;text-shadow:0 0 40px rgba(255,200,0,.6);margin-bottom:8px;}
    .cp-trigger-sub{font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:700;color:#e0d0ff;}
    .cp-bonus-end{position:absolute;inset:0;z-index:50;display:flex;flex-direction:column;align-items:center;justify-content:center;
      background:radial-gradient(ellipse at 50% 50%,rgba(20,10,50,.95),rgba(5,2,15,.98));animation:bbsIn .5s ease both;cursor:pointer;}
    .cp-bonus-incoming{position:absolute;top:6px;left:50%;transform:translateX(-50%);z-index:15;
      font-family:'Space Grotesk',sans-serif;font-size:.65rem;font-weight:800;color:#ffd700;
      background:rgba(0,0,0,.5);border:1px solid rgba(255,200,0,.4);border-radius:12px;padding:3px 14px;
      display:flex;gap:6px;align-items:center;animation:bbsPulse 1.6s ease infinite;pointer-events:none;}
  `;

  return(
    <div className="cp-container">
      <style>{CP_CSS}</style>

      {/* INTRO */}
      {showIntro&&(
        <div className="cpI-overlay" onClick={()=>{sfx.start();setShowIntro(false);}}>
          <style>{`
            @keyframes cpIFadeIn{0%{opacity:0}100%{opacity:1}}
            @keyframes cpISlideUp{0%{opacity:0;transform:translateY(40px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
            @keyframes cpIFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
            @keyframes cpIShimmer{0%{background-position:-200% 50%}100%{background-position:200% 50%}}
            @keyframes cpIGlow{0%,100%{opacity:.6;filter:brightness(1)}50%{opacity:1;filter:brightness(1.15)}}
            @keyframes cpIPulse{0%,100%{opacity:.45;transform:scale(1)}50%{opacity:.85;transform:scale(1.02)}}
            @keyframes cpICloudDrift{0%{transform:translateX(0)}100%{transform:translateX(30px)}}
            @keyframes cpICloudDrift2{0%{transform:translateX(0)}100%{transform:translateX(-20px)}}
            @keyframes cpIStarTwinkle{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
            @keyframes cpISpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
            @keyframes cpISpinRev{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
            @keyframes cpICardIn1{0%{opacity:0;transform:translateY(60px) scale(.7) rotate(-4deg)}100%{opacity:1;transform:translateY(0) scale(1) rotate(0)}}
            @keyframes cpICardIn2{0%{opacity:0;transform:translateY(70px) scale(.7)}100%{opacity:1;transform:translateY(0) scale(1)}}
            @keyframes cpICardIn3{0%{opacity:0;transform:translateY(60px) scale(.7) rotate(4deg)}100%{opacity:1;transform:translateY(0) scale(1) rotate(0)}}
            @keyframes cpITitleIn{0%{opacity:0;transform:translateY(-30px) scale(.6);filter:blur(12px)}60%{opacity:1;transform:translateY(5px) scale(1.05);filter:blur(0)}80%{transform:translateY(-2px) scale(.98)}100%{transform:translateY(0) scale(1)}}
            @keyframes cpICtaIn{0%{opacity:0}100%{opacity:1}}
            @keyframes cpICtaPulse{0%,100%{opacity:.7;letter-spacing:.12em}50%{opacity:1;letter-spacing:.18em}}
            @keyframes cpIRays{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
            @keyframes cpISparkle{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}

            .cpI-overlay{position:absolute;inset:0;z-index:60;cursor:pointer;overflow:hidden;overflow-y:auto;
              background:linear-gradient(180deg,#8ec5e8 0%,#b8ddf0 15%,#d4ecf8 28%,#e8f2f8 38%,#f0e8f0 50%,#f5e0ea 60%,#e8d8e8 72%,#d0cce8 85%,#b8c0e0 100%);
              display:flex;flex-direction:column;align-items:center;padding-bottom:clamp(40px,8vh,70px);}

            /* Cloud layers */
            .cpI-clouds{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
            .cpI-cloud{position:absolute;border-radius:50%;filter:blur(20px);}

            /* Stars / sparkles */
            .cpI-star{position:absolute;border-radius:50%;background:#fff;pointer-events:none;}

            /* Title area */
            .cpI-title-wrap{position:relative;z-index:5;display:flex;flex-direction:column;align-items:center;margin-top:clamp(10px,4vh,36px);animation:cpITitleIn .9s cubic-bezier(.34,1.2,.64,1) both;}
            .cpI-title-rays{position:absolute;top:50%;left:50%;width:200px;height:200px;pointer-events:none;animation:cpIRays 20s linear infinite;opacity:.15;}
            .cpI-title-text{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,4.5vw,2.8rem);font-weight:900;
              background:linear-gradient(180deg,#f0e0ff 0%,#d8b0f0 25%,#c088e0 50%,#a060d0 75%,#8040b0 100%);
              -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
              filter:drop-shadow(0 2px 8px rgba(160,80,200,.4)) drop-shadow(0 0 30px rgba(180,120,255,.3));
              position:relative;z-index:2;line-height:1.1;}
            .cpI-title-outline{position:absolute;top:0;left:0;right:0;text-align:center;font-family:'Playfair Display',serif;font-size:clamp(1.6rem,4.5vw,2.8rem);font-weight:900;
              color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.3);z-index:1;line-height:1.1;pointer-events:none;}
            .cpI-volatility{font-family:'Space Grotesk',sans-serif;font-size:clamp(.5rem,1.2vw,.7rem);font-weight:800;letter-spacing:.22em;text-transform:uppercase;
              color:#9070b0;margin-top:4px;display:flex;align-items:center;gap:4px;}
            .cpI-vol-icon{color:#b888e0;font-size:.6em;}

            /* Decorative crown/ornament above title */
            .cpI-crown{position:relative;z-index:3;margin-bottom:-6px;}

            /* Cards container */
            .cpI-cards{position:relative;z-index:5;display:flex;align-items:flex-end;justify-content:center;gap:clamp(8px,2vw,20px);margin-top:clamp(12px,3vh,28px);padding:0 12px;}

            /* Individual card */
            .cpI-card{width:clamp(140px,22vw,220px);border-radius:clamp(12px,2vw,20px) clamp(12px,2vw,20px) 8px 8px;overflow:hidden;position:relative;
              background:linear-gradient(180deg,rgba(255,248,230,.95) 0%,rgba(255,240,210,.98) 100%);
              box-shadow:0 8px 32px rgba(120,80,40,.25),0 2px 8px rgba(0,0,0,.15),inset 0 1px 0 rgba(255,255,255,.8);
              border:2px solid rgba(200,170,100,.5);}
            .cpI-card:nth-child(1){animation:cpICardIn1 .7s .3s cubic-bezier(.34,1.2,.64,1) both;}
            .cpI-card:nth-child(2){animation:cpICardIn2 .7s .45s cubic-bezier(.34,1.2,.64,1) both;}
            .cpI-card:nth-child(3){animation:cpICardIn3 .7s .6s cubic-bezier(.34,1.2,.64,1) both;}

            /* Card arch top (image area) */
            .cpI-card-img{position:relative;width:100%;aspect-ratio:1/.75;
              border-radius:clamp(10px,1.8vw,18px) clamp(10px,1.8vw,18px) 0 0;overflow:hidden;
              background:linear-gradient(135deg,#c8d8f0,#e8d8f0,#d0d0f0);
              border-bottom:2px solid rgba(200,170,100,.35);}

            /* Golden arch border overlay */
            .cpI-card-arch{position:absolute;inset:-1px;border-radius:inherit;pointer-events:none;z-index:3;
              border:3px solid transparent;
              background:linear-gradient(180deg,rgba(220,190,120,.9),rgba(180,150,80,.7)) border-box;
              -webkit-mask:linear-gradient(#fff 0 0) padding-box,linear-gradient(#fff 0 0);
              -webkit-mask-composite:xor;mask-composite:exclude;
              border-radius:clamp(10px,1.8vw,18px) clamp(10px,1.8vw,18px) 0 0;}

            /* Corner ornaments */
            .cpI-card-corner{position:absolute;width:16px;height:16px;z-index:4;pointer-events:none;}
            .cpI-card-corner svg{width:100%;height:100%;}
            .cpI-cc-tl{top:3px;left:3px;}.cpI-cc-tr{top:3px;right:3px;transform:scaleX(-1);}
            .cpI-cc-bl{bottom:3px;left:3px;transform:scaleY(-1);}.cpI-cc-br{bottom:3px;right:3px;transform:scale(-1);}

            /* Card text area */
            .cpI-card-body{padding:clamp(8px,1.5vw,14px) clamp(8px,1.5vw,12px);text-align:center;
              background:linear-gradient(180deg,rgba(255,248,225,.98),rgba(255,240,200,.96));
              position:relative;}
            .cpI-card-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(.55rem,1.1vw,.78rem);font-weight:800;letter-spacing:.06em;
              color:#5a4020;text-transform:uppercase;margin-bottom:4px;
              text-shadow:0 1px 0 rgba(255,255,255,.6);}
            .cpI-card-desc{font-family:'Inter',sans-serif;font-size:clamp(.45rem,.9vw,.65rem);font-weight:500;line-height:1.35;
              color:#7a6848;font-style:italic;}

            /* CTA */
            .cpI-cta{position:absolute;z-index:10;bottom:clamp(8px,4vh,32px);left:50%;transform:translateX(-50%);animation:cpICtaIn .5s 1s ease both;}
            .cpI-cta-text{font-family:'Playfair Display',serif;font-size:clamp(1rem,2.8vw,1.6rem);font-weight:900;font-style:italic;
              color:#3a2840;text-shadow:0 2px 4px rgba(0,0,0,.08),0 0 20px rgba(255,255,255,.4);letter-spacing:.12em;
              animation:cpICtaPulse 2.5s 1.5s ease infinite;white-space:nowrap;}
          `}</style>

          {/* SKY BACKGROUND WITH 3D CLOUDS */}
          <div className="cpI-clouds">
            {/* Base cloud layers — large, soft, volumetric */}
            {[["-8%","52%",420,160,"rgba(255,255,255,.7)","cpICloudDrift 14s ease-in-out infinite alternate"],
              ["30%","44%",480,170,"rgba(250,248,255,.65)","cpICloudDrift2 18s ease-in-out infinite alternate"],
              ["58%","48%",400,140,"rgba(245,240,255,.6)","cpICloudDrift 20s ease-in-out infinite alternate"],
              ["82%","56%",360,130,"rgba(255,248,252,.55)","cpICloudDrift2 16s ease-in-out infinite alternate"],
            ].map(([l,t,w,h,bg,anim],i)=>(
              <div key={`b${i}`} className="cpI-cloud" style={{left:l,top:t,width:w,height:h,background:bg,animation:anim,filter:"blur(18px)"}}/>
            ))}
            {/* Mid cloud layer — more defined, 3D-like with stacked ellipses */}
            {[
              ["-5%","58%",320,100,"rgba(255,255,255,.75)",15,"blur(12px)"],
              ["15%","52%",280,90,"rgba(255,252,255,.7)",12,"blur(10px)"],
              ["40%","50%",360,110,"rgba(248,245,255,.7)",14,"blur(11px)"],
              ["65%","54%",300,95,"rgba(255,248,252,.65)",13,"blur(10px)"],
              ["85%","60%",260,85,"rgba(252,250,255,.6)",11,"blur(12px)"],
            ].map(([l,t,w,h,bg,_z,flt],i)=>(
              <div key={`m${i}`} className="cpI-cloud" style={{left:l,top:t,width:w,height:h,background:bg,filter:flt,animation:`cpICloudDrift${i%2===0?"":"2"} ${12+i*3}s ease-in-out infinite alternate`}}/>
            ))}
            {/* Top bright cloud puffs — sharper, more defined, 3D highlights */}
            {[
              ["0%","60%",200,70,"radial-gradient(ellipse at 40% 35%,rgba(255,255,255,.95),rgba(255,255,255,.5) 50%,transparent 70%)","cpICloudDrift 10s ease-in-out infinite alternate"],
              ["22%","54%",240,80,"radial-gradient(ellipse at 45% 30%,rgba(255,255,255,.9),rgba(255,250,255,.4) 55%,transparent 70%)","cpICloudDrift2 13s ease-in-out infinite alternate"],
              ["48%","52%",260,75,"radial-gradient(ellipse at 50% 35%,rgba(255,255,255,.92),rgba(255,252,255,.45) 50%,transparent 70%)","cpICloudDrift 15s ease-in-out infinite alternate"],
              ["72%","57%",220,72,"radial-gradient(ellipse at 42% 32%,rgba(255,255,255,.88),rgba(252,248,255,.4) 55%,transparent 70%)","cpICloudDrift2 11s ease-in-out infinite alternate"],
              ["90%","62%",180,65,"radial-gradient(ellipse at 40% 30%,rgba(255,255,255,.85),rgba(255,250,255,.35) 50%,transparent 70%)","cpICloudDrift 14s ease-in-out infinite alternate"],
            ].map(([l,t,w,h,bg,anim],i)=>(
              <div key={`t${i}`} style={{position:"absolute",left:l,top:t,width:w,height:h,background:bg,animation:anim,borderRadius:"50%",pointerEvents:"none"}}/>
            ))}
            {/* Secondary puffs — smaller, between main clouds */}
            {[
              ["8%","62%",140,55,"radial-gradient(ellipse,rgba(255,255,255,.85),transparent 65%)"],
              ["35%","56%",160,60,"radial-gradient(ellipse,rgba(255,252,255,.8),transparent 65%)"],
              ["60%","54%",180,58,"radial-gradient(ellipse,rgba(255,255,255,.82),transparent 65%)"],
              ["82%","63%",130,50,"radial-gradient(ellipse,rgba(252,250,255,.75),transparent 65%)"],
            ].map(([l,t,w,h,bg],i)=>(
              <div key={`p${i}`} style={{position:"absolute",left:l,top:t,width:w,height:h,background:bg,borderRadius:"50%",pointerEvents:"none",animation:`cpICloudDrift${i%2===0?"2":""} ${14+i*2}s ease-in-out infinite alternate`}}/>
            ))}
            {/* Bottom thick cloud bed — foreground */}
            <div style={{position:"absolute",bottom:0,left:"-5%",right:"-5%",height:"32%",
              background:"linear-gradient(180deg,transparent 0%,rgba(255,252,255,.3) 20%,rgba(255,255,255,.6) 45%,rgba(255,255,255,.85) 70%,rgba(255,255,255,.95) 100%)",
              pointerEvents:"none"}}/>
            {/* Cloud bed puffs at bottom */}
            {[
              ["-3%","72%",350,120,"radial-gradient(ellipse at 50% 30%,rgba(255,255,255,.9),rgba(255,255,255,.5) 50%,transparent 70%)"],
              ["20%","75%",300,110,"radial-gradient(ellipse at 50% 25%,rgba(255,255,255,.88),rgba(255,250,255,.45) 50%,transparent 70%)"],
              ["45%","70%",380,130,"radial-gradient(ellipse at 50% 30%,rgba(255,255,255,.92),rgba(255,255,255,.5) 50%,transparent 70%)"],
              ["70%","73%",320,115,"radial-gradient(ellipse at 50% 28%,rgba(255,255,255,.87),rgba(252,250,255,.4) 50%,transparent 70%)"],
              ["88%","76%",280,100,"radial-gradient(ellipse at 50% 30%,rgba(255,255,255,.85),rgba(255,252,255,.4) 50%,transparent 70%)"],
            ].map(([l,t,w,h,bg],i)=>(
              <div key={`bb${i}`} style={{position:"absolute",left:l,top:t,width:w,height:h,background:bg,borderRadius:"50%",pointerEvents:"none",animation:`cpICloudDrift${i%2===0?"":"2"} ${16+i*2}s ease-in-out infinite alternate`}}/>
            ))}
            {/* Warm pink undertones in clouds */}
            {[["15%","55%",240,90,"rgba(255,190,220,.12)"],["50%","58%",200,80,"rgba(230,200,255,.1)"],["75%","60%",180,70,"rgba(255,200,230,.1)"]].map(([l,t,w,h,bg],i)=>(
              <div key={`w${i}`} className="cpI-cloud" style={{left:l,top:t,width:w,height:h,background:bg,filter:"blur(25px)"}}/>
            ))}
            {/* Sparkle stars */}
            {Array.from({length:35},(_,i)=>{
              const x=3+((i*37+i%7*23)%94);const y=1+((i*29+i%5*19)%42);
              const s=1+i%3;const del=(i*0.6)%4;const dur=1.5+i%3*.8;
              return <div key={`s${i}`} className="cpI-star" style={{left:`${x}%`,top:`${y}%`,width:s,height:s,animation:`cpIStarTwinkle ${dur}s ${del}s ease infinite`,boxShadow:`0 0 ${s*3}px rgba(255,255,255,.7)`}}/>;
            })}
            {/* Sun glow — top center */}
            <div style={{position:"absolute",top:"-5%",left:"40%",width:"20%",height:"20%",background:"radial-gradient(circle,rgba(255,250,230,.4),transparent 70%)",pointerEvents:"none",filter:"blur(20px)"}}/>
          </div>

          {/* TITLE SECTION */}
          <div className="cpI-title-wrap">
            {/* Decorative rays behind title */}
            <div className="cpI-title-rays">
              <svg viewBox="0 0 200 200" width="200" height="200">
                {Array.from({length:24},(_,i)=>{
                  const angle=(i/24)*360;
                  return <line key={i} x1="100" y1="100" x2={100+Math.cos(angle*Math.PI/180)*100} y2={100+Math.sin(angle*Math.PI/180)*100} stroke="rgba(200,160,240,.4)" strokeWidth={i%2===0?"2":"1"}/>;
                })}
              </svg>
            </div>

            {/* Crown ornament */}
            <div className="cpI-crown">
              <svg viewBox="0 0 80 36" width="80" height="36">
                <defs>
                  <linearGradient id="cpICrG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e8c0f0"/><stop offset="50%" stopColor="#d098e0"/><stop offset="100%" stopColor="#b878d0"/></linearGradient>
                  <filter id="cpICrGl"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(200,140,240,.6)"/></filter>
                </defs>
                {/* Ornamental swirls */}
                <path d="M10,30 Q15,18 25,22 Q30,10 40,6 Q50,10 55,22 Q65,18 70,30" fill="none" stroke="url(#cpICrG)" strokeWidth="2" strokeLinecap="round" filter="url(#cpICrGl)"/>
                <path d="M20,28 Q25,20 32,22 Q36,14 40,10 Q44,14 48,22 Q55,20 60,28" fill="none" stroke="url(#cpICrG)" strokeWidth="1.5" strokeLinecap="round" opacity=".6"/>
                {/* Center jewel */}
                <circle cx="40" cy="8" r="4" fill="rgba(240,200,255,.9)" stroke="rgba(200,140,240,.6)" strokeWidth="1"/>
                <circle cx="40" cy="8" r="2" fill="#fff" opacity=".7"/>
                {/* Side jewels */}
                <circle cx="25" cy="20" r="2.5" fill="rgba(200,220,255,.8)" stroke="rgba(160,180,240,.5)" strokeWidth=".8"/>
                <circle cx="55" cy="20" r="2.5" fill="rgba(255,200,220,.8)" stroke="rgba(240,160,180,.5)" strokeWidth=".8"/>
                {/* Scrollwork */}
                <path d="M5,32 Q8,26 14,28" fill="none" stroke="rgba(200,160,240,.4)" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M75,32 Q72,26 66,28" fill="none" stroke="rgba(200,160,240,.4)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Main title */}
            <div style={{position:"relative",textAlign:"center"}}>
              <div className="cpI-title-outline">Cloud Princess</div>
              <div className="cpI-title-text">Cloud Princess</div>
            </div>

            {/* Volatility indicator */}
            <div className="cpI-volatility">
              <span>VOLATILITY</span>
              {[0,1,2,3,4].map(i=><span key={i} className="cpI-vol-icon">♦</span>)}
            </div>
          </div>

          {/* THREE FEATURE CARDS */}
          <div className="cpI-cards">

            {/* ── CARD 1: MULTIPLIER SYMBOLS ── */}
            <div className="cpI-card">
              <div className="cpI-card-img">
                {/* Golden arch border */}
                <div className="cpI-card-arch"/>
                {/* Corner ornaments */}
                {["cpI-cc-tl","cpI-cc-tr","cpI-cc-bl","cpI-cc-br"].map(cls=>(
                  <div key={cls} className={`cpI-card-corner ${cls}`}>
                    <svg viewBox="0 0 16 16"><path d="M2,14 Q2,2 14,2" fill="none" stroke="rgba(200,170,100,.7)" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="3" cy="13" r="2.5" fill="rgba(210,180,110,.8)" stroke="rgba(180,150,80,.5)" strokeWidth=".8"/></svg>
                  </div>
                ))}
                {/* Three multiplier symbols artwork — vibrant compass roses */}
                <svg viewBox="0 0 200 150" width="100%" height="100%" style={{position:"absolute",inset:0}}>
                  <defs>
                    <radialGradient id="cpIM1bg" cx="50%" cy="40%" r="75%"><stop offset="0%" stopColor="#d8e8f8"/><stop offset="50%" stopColor="#c8d0e8"/><stop offset="100%" stopColor="#b8c0d8"/></radialGradient>
                    <radialGradient id="cpIMcGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(255,200,255,.6)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
                    <linearGradient id="cpIMnormG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c8d8f0"/><stop offset="50%" stopColor="#8898c0"/><stop offset="100%" stopColor="#5868a0"/></linearGradient>
                    <linearGradient id="cpIMsupG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e0c0f0"/><stop offset="50%" stopColor="#9060c0"/><stop offset="100%" stopColor="#6040a0"/></linearGradient>
                    <linearGradient id="cpIMepicG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fff0f8"/><stop offset="30%" stopColor="#ffb0d0"/><stop offset="70%" stopColor="#e060a0"/><stop offset="100%" stopColor="#a04080"/></linearGradient>
                    <linearGradient id="cpIMepicStar" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#fffde0"/><stop offset="50%" stopColor="#ffe840"/><stop offset="100%" stopColor="#e0b000"/></linearGradient>
                    <filter id="cpIMgl"><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,.3)"/></filter>
                    <filter id="cpIMglow"><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(255,180,240,.6)"/></filter>
                    <filter id="cpIMstarGl"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(255,240,100,.8)"/></filter>
                  </defs>
                  <rect width="200" height="150" fill="url(#cpIM1bg)" rx="12"/>
                  {/* Center radiant glow */}
                  <ellipse cx="100" cy="72" rx="75" ry="55" fill="url(#cpIMcGlow)"/>

                  {/* RIGHT: Normal multiplier — blue/silver compass, smaller */}
                  <g transform="translate(160,78)" filter="url(#cpIMgl)">
                    <circle r="26" fill="rgba(120,140,180,.25)" opacity=".5"/>
                    <circle r="22" fill="url(#cpIMnormG)" stroke="rgba(100,130,200,.6)" strokeWidth="1.5"/>
                    <circle r="18" fill="none" stroke="rgba(180,200,240,.3)" strokeWidth=".8"/>
                    {/* 4-point compass star */}
                    <polygon points="0,-16 3,-4 0,-2 -3,-4" fill="rgba(200,220,255,.9)"/>
                    <polygon points="0,16 3,4 0,2 -3,4" fill="rgba(140,160,200,.8)"/>
                    <polygon points="-16,0 -4,-3 -2,0 -4,3" fill="rgba(160,180,220,.85)"/>
                    <polygon points="16,0 4,-3 2,0 4,3" fill="rgba(180,200,240,.85)"/>
                    {/* Diagonal smaller points */}
                    {[45,135,225,315].map(deg=>{
                      const a=deg*Math.PI/180;
                      return <line key={deg} x1={Math.cos(a)*4} y1={Math.sin(a)*4} x2={Math.cos(a)*12} y2={Math.sin(a)*12} stroke="rgba(160,180,220,.6)" strokeWidth="1.5" strokeLinecap="round"/>;
                    })}
                    <circle r="5" fill="rgba(200,220,255,.9)" stroke="rgba(160,180,220,.4)" strokeWidth=".8"/>
                    <circle r="2.5" fill="rgba(230,240,255,.95)"/>
                    <circle r="1" fill="#fff"/>
                    <circle r="20" fill="none" stroke="rgba(160,190,240,.2)" strokeWidth=".6" strokeDasharray="2 2"/>
                  </g>

                  {/* LEFT: Super multiplier — purple/violet ornate compass */}
                  <g transform="translate(40,72)" filter="url(#cpIMgl)">
                    <circle r="30" fill="rgba(160,100,220,.2)" opacity=".5"/>
                    <circle r="26" fill="url(#cpIMsupG)" stroke="rgba(160,100,240,.5)" strokeWidth="2"/>
                    <circle r="21" fill="none" stroke="rgba(220,180,255,.35)" strokeWidth="1"/>
                    {/* 8-point compass rose */}
                    {[0,45,90,135,180,225,270,315].map((deg,i)=>{
                      const a=deg*Math.PI/180;
                      const len=i%2===0?22:14;
                      const w2=i%2===0?3.5:2;
                      const pts=`0,${-len} ${w2},${-4} 0,0 ${-w2},${-4}`;
                      return <polygon key={deg} points={pts} fill={i%2===0?"rgba(220,180,255,.85)":"rgba(180,140,220,.7)"} stroke="rgba(140,100,200,.4)" strokeWidth=".5" transform={`rotate(${deg})`}/>;
                    })}
                    {/* Inner decorative ring */}
                    <circle r="10" fill="rgba(200,160,240,.8)" stroke="rgba(160,120,220,.4)" strokeWidth="1"/>
                    <circle r="6" fill="rgba(230,200,255,.9)"/>
                    {/* Center jewel */}
                    <circle r="3.5" fill="rgba(180,120,240,.9)" stroke="rgba(220,180,255,.6)" strokeWidth=".8"/>
                    <circle r="1.5" fill="rgba(240,220,255,.95)"/>
                    <circle r=".7" fill="#fff" opacity=".9"/>
                    {/* Orbital ring with dots */}
                    <circle r="24" fill="none" stroke="rgba(200,160,240,.25)" strokeWidth=".7" strokeDasharray="3 3"/>
                    {[0,60,120,180,240,300].map(deg=>(
                      <circle key={deg} cx={Math.cos(deg*Math.PI/180)*24} cy={Math.sin(deg*Math.PI/180)*24} r="1.5" fill="rgba(220,180,255,.5)"/>
                    ))}
                  </g>

                  {/* CENTER: Epic multiplier — largest, most ornate, golden star, rainbow glow */}
                  <g transform="translate(100,68)" filter="url(#cpIMglow)">
                    {/* Outer rainbow aura */}
                    <circle r="42" fill="rgba(255,200,240,.08)"/>
                    <circle r="38" fill="rgba(255,220,240,.1)"/>
                    {/* Main disc */}
                    <circle r="34" fill="url(#cpIMepicG)" stroke="rgba(220,100,160,.5)" strokeWidth="2.5"/>
                    <circle r="29" fill="none" stroke="rgba(255,200,230,.3)" strokeWidth="1.2"/>
                    {/* Elaborate 16-point compass rose */}
                    {Array.from({length:16},(_,i)=>{
                      const a=(i/16)*Math.PI*2;
                      const len=i%4===0?28:i%2===0?20:13;
                      const w2=i%4===0?4:i%2===0?2.5:1.5;
                      const col=i%4===0?"rgba(255,240,200,.9)":i%2===0?"rgba(255,200,220,.8)":"rgba(240,180,210,.6)";
                      const pts=`0,${-len} ${w2},${-5} 0,0 ${-w2},${-5}`;
                      return <polygon key={i} points={pts} fill={col} stroke="rgba(200,120,160,.3)" strokeWidth=".4" transform={`rotate(${(i/16)*360})`}/>;
                    })}
                    {/* Secondary ring */}
                    <circle r="16" fill="rgba(255,220,240,.7)" stroke="rgba(240,160,200,.4)" strokeWidth="1"/>
                    <circle r="12" fill="rgba(255,240,248,.85)"/>
                    {/* Golden center star */}
                    <g filter="url(#cpIMstarGl)">
                      <polygon points="0,-10 2.5,-3 10,-3 4,2 6,9 0,5 -6,9 -4,2 -10,-3 -2.5,-3" fill="url(#cpIMepicStar)" stroke="rgba(200,170,0,.5)" strokeWidth=".6"/>
                    </g>
                    <circle r="3" fill="rgba(255,250,220,.95)"/>
                    <circle r="1.2" fill="#fff"/>
                    {/* Orbiting sparkle dots */}
                    <circle r="32" fill="none" stroke="rgba(255,200,230,.2)" strokeWidth=".7" strokeDasharray="4 4"/>
                    {[0,45,90,135,180,225,270,315].map(deg=>(
                      <circle key={deg} cx={Math.cos(deg*Math.PI/180)*32} cy={Math.sin(deg*Math.PI/180)*32} r={deg%90===0?"2.5":"1.5"} fill={deg%90===0?"rgba(255,220,240,.7)":"rgba(240,200,230,.4)"}/>
                    ))}
                  </g>

                  {/* Sparkle effects across the card */}
                  {[[15,20],[85,25],[115,28],[185,22],[30,120],[170,115],[100,130]].map(([x,y],i)=>(
                    <g key={i} style={{animation:`cpISparkle ${1.4+i*.3}s ${i*.35}s ease infinite`}}>
                      <line x1={x-4} y1={y} x2={x+4} y2={y} stroke="rgba(255,255,255,.8)" strokeWidth="1.2" strokeLinecap="round"/>
                      <line x1={x} y1={y-4} x2={x} y2={y+4} stroke="rgba(255,255,255,.8)" strokeWidth="1.2" strokeLinecap="round"/>
                    </g>
                  ))}
                </svg>
              </div>
              <div className="cpI-card-body">
                <div className="cpI-card-title">Multiplier Symbols</div>
                <div className="cpI-card-desc">Reach for the skies with our increasing multipliers!</div>
              </div>
            </div>

            {/* ── CARD 2: CLOUD SURGE (Scatter) ── */}
            <div className="cpI-card">
              <div className="cpI-card-img">
                <div className="cpI-card-arch"/>
                {["cpI-cc-tl","cpI-cc-tr","cpI-cc-bl","cpI-cc-br"].map(cls=>(
                  <div key={cls} className={`cpI-card-corner ${cls}`}>
                    <svg viewBox="0 0 16 16"><path d="M2,14 Q2,2 14,2" fill="none" stroke="rgba(200,170,100,.7)" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="3" cy="13" r="2.5" fill="rgba(210,180,110,.8)" stroke="rgba(180,150,80,.5)" strokeWidth=".8"/></svg>
                  </div>
                ))}
                {/* Scatter — enhanced princess portrait matching Image 2 */}
                <svg viewBox="0 0 200 150" width="100%" height="100%" style={{position:"absolute",inset:0}}>
                  <defs>
                    <radialGradient id="cpIS1" cx="50%" cy="32%" r="68%"><stop offset="0%" stopColor="#1e3468"/><stop offset="55%" stopColor="#0e1c40"/><stop offset="100%" stopColor="#060e28"/></radialGradient>
                    <radialGradient id="cpIScSkin" cx="44%" cy="36%" r="52%"><stop offset="0%" stopColor="#ffeadb"/><stop offset="65%" stopColor="#f5cdb5"/><stop offset="100%" stopColor="#e8b898"/></radialGradient>
                    <linearGradient id="cpIScHair" x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stopColor="#ffffff"/><stop offset="18%" stopColor="#f2eeff"/><stop offset="45%" stopColor="#d8d0f0"/><stop offset="78%" stopColor="#b8b0d8"/><stop offset="100%" stopColor="#9890c0"/></linearGradient>
                    <linearGradient id="cpIScFrame" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6880b0"/><stop offset="30%" stopColor="#445088"/><stop offset="70%" stopColor="#364070"/><stop offset="100%" stopColor="#6880b0"/></linearGradient>
                    <linearGradient id="cpIScArm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c8e2fa"/><stop offset="50%" stopColor="#98b8e0"/><stop offset="100%" stopColor="#6080b8"/></linearGradient>
                    <filter id="cpISgl"><feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="rgba(0,0,0,.4)"/></filter>
                    <filter id="cpISglow"><feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="rgba(100,180,255,.55)"/></filter>
                    <filter id="cpIScMoon"><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(160,230,255,.95)"/></filter>
                    <filter id="cpIScEye"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(50,200,255,.95)"/></filter>
                    <clipPath id="cpIScClip"><rect x="42" y="12" width="116" height="116" rx="16"/></clipPath>
                  </defs>
                  {/* Background */}
                  <rect width="200" height="150" fill="url(#cpIS1)" rx="12"/>
                  <ellipse cx="100" cy="72" rx="85" ry="62" fill="rgba(80,150,240,.07)"/>

                  {/* Ornate frame */}
                  <g filter="url(#cpISgl)">
                    <rect x="38" y="8" width="124" height="124" rx="18" fill="url(#cpIScFrame)" stroke="rgba(130,180,255,.45)" strokeWidth="2.8"/>
                    <rect x="42" y="12" width="116" height="116" rx="15" fill="none" stroke="rgba(100,160,230,.3)" strokeWidth="1.2"/>
                    {/* Frame corner jewels */}
                    {[[46,16],[150,16],[46,120],[150,120]].map(([x,y],i)=>(
                      <g key={i}><circle cx={x} cy={y} r="5" fill="rgba(130,200,255,.55)" stroke="rgba(90,160,230,.45)" strokeWidth=".9"/>
                      <circle cx={x} cy={y} r="2.5" fill="rgba(200,238,255,.8)"/></g>
                    ))}
                    {/* Frame inner accent lines */}
                    <path d="M48,28 L48,18 Q48,14 52,14 L62,14" fill="none" stroke="rgba(160,210,255,.38)" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M138,14 L148,14 Q152,14 152,18 L152,28" fill="none" stroke="rgba(160,210,255,.38)" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M48,108 L48,118 Q48,122 52,122 L62,122" fill="none" stroke="rgba(160,210,255,.38)" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M138,122 L148,122 Q152,122 152,118 L152,108" fill="none" stroke="rgba(160,210,255,.38)" strokeWidth="1.6" strokeLinecap="round"/>
                    {/* Midpoint diamonds on frame */}
                    {[[100,12],[100,128],[38,68],[162,68]].map(([x,y],i)=>(
                      <polygon key={i} points={`${x},${y-4} ${x+3},${y} ${x},${y+4} ${x-3},${y}`} fill="rgba(180,220,255,.5)"/>
                    ))}
                  </g>

                  {/* Clipped princess portrait */}
                  <g clipPath="url(#cpIScClip)">
                    {/* Dark atmospheric bg */}
                    <rect x="42" y="12" width="116" height="116" fill="url(#cpIS1)"/>
                    <ellipse cx="100" cy="52" rx="55" ry="34" fill="rgba(60,120,220,.1)"/>
                    <ellipse cx="100" cy="80" rx="42" ry="35" fill="rgba(80,160,255,.05)"/>

                    {/* Hair — luxurious white/silver flowing locks */}
                    <path d="M55,58 Q52,32 60,20 Q72,8 100,12 Q128,8 140,20 Q148,32 145,58 Q148,74 145,96 L140,124 L130,110 Q122,100 114,106 L108,124 L100,124 L92,124 L86,106 Q78,100 70,110 L60,124 L55,96 Q52,74 55,58Z" fill="url(#cpIScHair)"/>
                    {/* Hair volume highlights */}
                    <path d="M72,24 Q76,42 72,62" stroke="rgba(255,255,255,.48)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <path d="M128,24 Q124,42 128,62" stroke="rgba(255,255,255,.40)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M62,36 Q66,54 62,72" stroke="rgba(255,255,255,.22)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M138,36 Q134,54 138,72" stroke="rgba(255,255,255,.22)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M84,14 Q86,20 84,28" stroke="rgba(255,255,255,.16)" strokeWidth="1.2" fill="none"/>
                    <path d="M116,14 Q114,20 116,28" stroke="rgba(255,255,255,.16)" strokeWidth="1.2" fill="none"/>
                    <path d="M92,13 Q93,18 92,24" stroke="rgba(255,255,255,.1)" strokeWidth=".9" fill="none"/>
                    <path d="M108,13 Q107,18 108,24" stroke="rgba(255,255,255,.1)" strokeWidth=".9" fill="none"/>

                    {/* Face */}
                    <ellipse cx="100" cy="66" rx="24.5" ry="28.5" fill="url(#cpIScSkin)"/>
                    <ellipse cx="100" cy="80" rx="20" ry="12" fill="rgba(210,170,150,.06)"/>
                    <ellipse cx="96" cy="58" rx="9" ry="5.5" fill="rgba(255,255,255,.06)" transform="rotate(-12,96,58)"/>
                    {/* Cheek blush */}
                    <ellipse cx="78" cy="72" rx="8.5" ry="5.5" fill="rgba(255,135,125,.13)"/>
                    <ellipse cx="122" cy="72" rx="8.5" ry="5.5" fill="rgba(255,135,125,.13)"/>

                    {/* ── LEFT EYE ── */}
                    <ellipse cx="86" cy="65" rx="9.5" ry="10.5" fill="rgba(10,22,42,.97)"/>
                    <ellipse cx="86" cy="66.8" rx="7.5" ry="8.8" fill="rgba(18,138,205,.95)" filter="url(#cpIScEye)"/>
                    <ellipse cx="86" cy="68.5" rx="5.5" ry="6.5" fill="rgba(55,202,255,.84)"/>
                    <ellipse cx="86" cy="69.5" rx="3.5" ry="4.2" fill="rgba(120,232,255,.6)"/>
                    <ellipse cx="86" cy="70.2" rx="1.9" ry="2.2" fill="rgba(195,248,255,.42)"/>
                    <circle cx="86" cy="65.5" r="4" fill="rgba(5,12,35,.97)"/>
                    <circle cx="90.5" cy="62.5" r="3.2" fill="#fff" opacity=".95"/>
                    <circle cx="83.5" cy="70.5" r="1.5" fill="#fff" opacity=".6"/>
                    <circle cx="89" cy="68.5" r=".95" fill="rgba(210,248,255,.7)"/>
                    {/* Left upper lash */}
                    <path d="M76,58 Q86,55 96,58.5" stroke="rgba(22,18,40,.93)" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                    <path d="M75.5,58.5 L73,56" stroke="rgba(22,18,40,.78)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                    <path d="M78,57.5 L76,55" stroke="rgba(22,18,40,.6)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                    <path d="M94.5,58 L96.5,55.5" stroke="rgba(22,18,40,.55)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
                    {/* Left lower lash */}
                    <path d="M78,75.5 Q86,77.5 94,75.5" stroke="rgba(22,18,40,.17)" strokeWidth=".9" fill="none"/>

                    {/* ── RIGHT EYE ── */}
                    <ellipse cx="114" cy="65" rx="9.5" ry="10.5" fill="rgba(10,22,42,.97)"/>
                    <ellipse cx="114" cy="66.8" rx="7.5" ry="8.8" fill="rgba(18,138,205,.95)" filter="url(#cpIScEye)"/>
                    <ellipse cx="114" cy="68.5" rx="5.5" ry="6.5" fill="rgba(55,202,255,.84)"/>
                    <ellipse cx="114" cy="69.5" rx="3.5" ry="4.2" fill="rgba(120,232,255,.6)"/>
                    <ellipse cx="114" cy="70.2" rx="1.9" ry="2.2" fill="rgba(195,248,255,.42)"/>
                    <circle cx="114" cy="65.5" r="4" fill="rgba(5,12,35,.97)"/>
                    <circle cx="118.5" cy="62.5" r="3.2" fill="#fff" opacity=".95"/>
                    <circle cx="111.5" cy="70.5" r="1.5" fill="#fff" opacity=".6"/>
                    <circle cx="117" cy="68.5" r=".95" fill="rgba(210,248,255,.7)"/>
                    {/* Right upper lash */}
                    <path d="M104,58.5 Q114,55 124,58" stroke="rgba(22,18,40,.93)" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
                    <path d="M124.5,58.5 L127,56" stroke="rgba(22,18,40,.78)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                    <path d="M122,57.5 L124,55" stroke="rgba(22,18,40,.6)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                    <path d="M105.5,58 L103.5,55.5" stroke="rgba(22,18,40,.55)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
                    {/* Right lower lash */}
                    <path d="M106,75.5 Q114,77.5 122,75.5" stroke="rgba(22,18,40,.17)" strokeWidth=".9" fill="none"/>

                    {/* Eyebrows */}
                    <path d="M76,54 Q86,51 95,54" stroke="rgba(195,185,215,.64)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                    <path d="M105,54 Q114,51 124,54" stroke="rgba(195,185,215,.64)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>

                    {/* Nose */}
                    <path d="M100,78 L98,81" stroke="rgba(195,155,135,.28)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

                    {/* Mouth */}
                    <path d="M88,86 Q100,93 112,86" stroke="rgba(215,110,110,.62)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <path d="M89.5,86.5 Q100,91.5 110.5,86.5" fill="rgba(238,155,155,.22)"/>
                    <path d="M93,87.5 L107,87.5" stroke="rgba(255,255,255,.26)" strokeWidth="1" strokeLinecap="round"/>

                    {/* Crystal earrings */}
                    <circle cx="60" cy="74" r="4.5" fill="rgba(130,215,255,.72)" stroke="rgba(80,180,245,.52)" strokeWidth=".9"/>
                    <circle cx="60" cy="74" r="2.2" fill="rgba(215,248,255,.88)"/>
                    <circle cx="140" cy="74" r="4.5" fill="rgba(130,215,255,.72)" stroke="rgba(80,180,245,.52)" strokeWidth=".9"/>
                    <circle cx="140" cy="74" r="2.2" fill="rgba(215,248,255,.88)"/>

                    {/* Neck & shoulders */}
                    <path d="M88,94 L84,104 Q70,112 54,118 L54,128 L146,128 L146,118 Q130,112 116,104 L112,94" fill="url(#cpIScSkin)"/>
                    {/* Armor collar */}
                    <path d="M76,106 Q88,100 100,102 Q112,100 124,106 Q112,112 100,110 Q88,112 76,106Z" fill="url(#cpIScArm)" stroke="rgba(160,210,250,.52)" strokeWidth="1.2" opacity=".9"/>
                    {/* Armor center gem */}
                    <path d="M94,102 L100,96 L106,102" fill="rgba(140,220,255,.82)" stroke="rgba(80,190,250,.52)" strokeWidth="1"/>
                    <circle cx="100" cy="100" r="2.8" fill="rgba(225,250,255,.92)"/>
                    {/* Crystal necklace chain */}
                    <path d="M78,108 Q90,105 100,106 Q110,105 122,108" fill="none" stroke="rgba(200,235,255,.55)" strokeWidth="1.5" strokeLinecap="round"/>
                    {/* Shoulder skin */}
                    <path d="M58,116 Q70,112 80,108" stroke="rgba(248,208,188,.28)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
                    <path d="M142,116 Q130,112 120,108" stroke="rgba(248,208,188,.28)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>

                    {/* Crystal moon forehead gem */}
                    <g filter="url(#cpIScMoon)">
                      <circle cx="100" cy="42" r="9.5" fill="rgba(140,228,255,.92)" stroke="rgba(100,208,255,.65)" strokeWidth="1"/>
                      <circle cx="104.5" cy="38.5" r="6.8" fill="rgba(12,32,68,.97)"/>
                      <ellipse cx="97.5" cy="41" rx="3.2" ry="2" fill="rgba(200,245,255,.72)" transform="rotate(-20,97.5,41)"/>
                      <circle cx="96" cy="39.5" r="1.1" fill="#fff" opacity=".6"/>
                    </g>

                    {/* Hair bangs */}
                    <path d="M76,46 Q82,32 88,38 Q94,26 100,32 Q106,25 112,38 Q118,32 124,46" fill="url(#cpIScHair)" opacity=".92"/>
                    <path d="M82,35 Q86,29 90,35" stroke="rgba(255,255,255,.24)" strokeWidth="1.3" fill="none"/>
                    <path d="M110,35 Q114,29 118,35" stroke="rgba(255,255,255,.18)" strokeWidth="1.1" fill="none"/>
                  </g>

                  {/* Sparkle effects around frame */}
                  {[[30,30],[170,25],[25,112],[175,106],[100,6],[100,138]].map(([x,y],i)=>(
                    <g key={i} style={{animation:`cpISparkle ${1.5+i*.3}s ${i*.4}s ease infinite`}}>
                      <line x1={x-5} y1={y} x2={x+5} y2={y} stroke="rgba(160,210,255,.85)" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1={x} y1={y-5} x2={x} y2={y+5} stroke="rgba(160,210,255,.85)" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx={x} cy={y} r="1" fill="rgba(200,238,255,.9)"/>
                    </g>
                  ))}
                </svg>
              </div>
              <div className="cpI-card-body">
                <div className="cpI-card-title">Cloud Surge</div>
                <div className="cpI-card-desc">Bonus game filled with even more and higher multipliers!</div>
              </div>
            </div>

            {/* ── CARD 3: DIVINE BOOST (Max Win) ── */}
            <div className="cpI-card">
              <div className="cpI-card-img">
                <div className="cpI-card-arch"/>
                {["cpI-cc-tl","cpI-cc-tr","cpI-cc-bl","cpI-cc-br"].map(cls=>(
                  <div key={cls} className={`cpI-card-corner ${cls}`}>
                    <svg viewBox="0 0 16 16"><path d="M2,14 Q2,2 14,2" fill="none" stroke="rgba(200,170,100,.7)" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="3" cy="13" r="2.5" fill="rgba(210,180,110,.8)" stroke="rgba(180,150,80,.5)" strokeWidth=".8"/></svg>
                  </div>
                ))}
                {/* 10,000x max win artwork */}
                <svg viewBox="0 0 200 150" width="100%" height="100%" style={{position:"absolute",inset:0}}>
                  <defs>
                    <radialGradient id="cpIDVbg" cx="50%" cy="50%" r="65%"><stop offset="0%" stopColor="#e0e8f8"/><stop offset="100%" stopColor="#c0c8e0"/></radialGradient>
                    <radialGradient id="cpIDVglow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(200,220,255,.6)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
                    <linearGradient id="cpIDVtxt" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#f8f4ff"/><stop offset="30%" stopColor="#e0d0f0"/><stop offset="70%" stopColor="#c0a8e0"/><stop offset="100%" stopColor="#9080c0"/></linearGradient>
                    <filter id="cpIDVf"><feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,.2)"/></filter>
                    <filter id="cpIDVgl"><feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="rgba(180,200,255,.6)"/></filter>
                  </defs>
                  <rect width="200" height="150" fill="url(#cpIDVbg)" rx="12"/>
                  {/* Glow behind number */}
                  <ellipse cx="100" cy="68" rx="70" ry="50" fill="url(#cpIDVglow)" filter="url(#cpIDVgl)"/>

                  {/* Ornate frame/wreath around the number */}
                  <ellipse cx="100" cy="68" rx="56" ry="48" fill="none" stroke="rgba(200,180,230,.35)" strokeWidth="2.5"/>
                  <ellipse cx="100" cy="68" rx="52" ry="44" fill="none" stroke="rgba(210,190,240,.25)" strokeWidth="1.5" strokeDasharray="4 4"/>
                  {/* Decorative dots on the wreath */}
                  {Array.from({length:16},(_,i)=>{
                    const a=(i/16)*Math.PI*2;
                    return <circle key={i} cx={100+Math.cos(a)*54} cy={68+Math.sin(a)*46} r={i%4===0?3:1.5} fill={i%4===0?"rgba(220,200,250,.6)":"rgba(200,190,230,.4)"}/>;
                  })}

                  {/* Main "10 000" number */}
                  <text x="100" y="60" textAnchor="middle" fontSize="32" fill="url(#cpIDVtxt)" fontWeight="900" fontFamily="'Space Grotesk','Playfair Display',serif" filter="url(#cpIDVf)" letterSpacing="-1">10 000</text>
                  {/* Stroke outline for depth */}
                  <text x="100" y="60" textAnchor="middle" fontSize="32" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1" fontWeight="900" fontFamily="'Space Grotesk','Playfair Display',serif" letterSpacing="-1">10 000</text>

                  {/* "x" with special styling */}
                  <text x="145" y="86" textAnchor="middle" fontSize="26" fill="url(#cpIDVtxt)" fontWeight="900" fontFamily="'Playfair Display',serif" fontStyle="italic" filter="url(#cpIDVf)">×</text>

                  {/* Subtle shine effect */}
                  <rect x="55" y="45" width="90" height="3" rx="1.5" fill="rgba(255,255,255,.15)" transform="rotate(-5,100,46)"/>

                  {/* Small sparkles around */}
                  {[[55,40],[145,45],[60,95],[140,100],[100,30],[100,110]].map(([x,y],i)=>(
                    <g key={i} style={{animation:`cpISparkle ${1.8+i*.25}s ${i*.35}s ease infinite`}}>
                      <line x1={x-3} y1={y} x2={x+3} y2={y} stroke="rgba(200,190,240,.6)" strokeWidth="1.2" strokeLinecap="round"/>
                      <line x1={x} y1={y-3} x2={x} y2={y+3} stroke="rgba(200,190,240,.6)" strokeWidth="1.2" strokeLinecap="round"/>
                    </g>
                  ))}

                  {/* Bottom decorative line */}
                  <line x1="60" y1="120" x2="140" y2="120" stroke="rgba(200,180,230,.3)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="100" cy="120" r="3" fill="rgba(220,200,250,.5)"/>
                  <circle cx="70" cy="120" r="2" fill="rgba(200,190,240,.4)"/>
                  <circle cx="130" cy="120" r="2" fill="rgba(200,190,240,.4)"/>
                </svg>
              </div>
              <div className="cpI-card-body">
                <div className="cpI-card-title">Divine Boost</div>
                <div className="cpI-card-desc">Super bonus with progressively increasing multipliers!</div>
              </div>
            </div>
          </div>

          {/* CLICK TO CONTINUE */}
          <div className="cpI-cta">
            <div className="cpI-cta-text">CLICK TO CONTINUE</div>
          </div>
        </div>
      )}

      {/* BONUS BUY MODAL */}
      {showBuyModal&&(
        <div style={{position:"absolute",inset:0,zIndex:70,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.72)",backdropFilter:"blur(6px)"}}
          onClick={e=>{if(e.target===e.currentTarget){sfx.click();setShowBuyModal(false);}}}>
          <style>{`@keyframes cpBuyIn{0%{opacity:0;transform:translateY(20px) scale(.97)}100%{opacity:1;transform:none}}`}</style>

          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1.1rem",fontWeight:900,color:"#f0ede0",letterSpacing:".18em",textTransform:"uppercase",marginBottom:14,textShadow:"0 2px 8px rgba(0,0,0,.8)",animation:"cpBuyIn .3s ease both"}}>BONUS BUY</div>

          <div style={{background:"#f0ede0",borderRadius:10,padding:"12px 28px",textAlign:"center",marginBottom:16,animation:"cpBuyIn .35s .05s ease both"}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".62rem",fontWeight:800,letterSpacing:".12em",color:"#888",textTransform:"uppercase",marginBottom:4}}>BET</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1.4rem",fontWeight:900,color:"#1a1a1a",marginBottom:8}}>€{bet.toFixed(2)}</div>
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button disabled={spinning} onClick={()=>{sfx.click();setBet(b=>{const bets=[0.10,0.20,0.40,0.60,0.80,1,2,3,4,5,10,20,50,100];const i=bets.indexOf(b);return i>0?bets[i-1]:b;});}}
                style={{width:34,height:34,borderRadius:8,border:"1.5px solid #ccc",background:"#fff",fontSize:"1.1rem",fontWeight:900,cursor:"pointer",color:"#333",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
              <button disabled={spinning} onClick={()=>{sfx.click();setBet(b=>{const bets=[0.10,0.20,0.40,0.60,0.80,1,2,3,4,5,10,20,50,100];const i=bets.indexOf(b);return i<bets.length-1?bets[i+1]:b;});}}
                style={{width:34,height:34,borderRadius:8,border:"1.5px solid #ccc",background:"#fff",fontSize:"1.1rem",fontWeight:900,cursor:"pointer",color:"#333",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,width:"min(780px,96vw)",animation:"cpBuyIn .4s .08s ease both",padding:"0 8px"}}>
            {(()=>{
              const CpBuyPrincess=({size=52,opa=1,sx={}})=>(
                <svg viewBox="0 0 52 52" width={size} height={size} style={{filter:"drop-shadow(0 2px 4px rgba(0,0,0,.3))",opacity:opa,...sx}}>
                  <defs>
                    <radialGradient id="cpBySc" cx="50%" cy="40%" r="70%"><stop offset="0%" stopColor="#1a2848"/><stop offset="100%" stopColor="#0a1428"/></radialGradient>
                    <linearGradient id="cpByHr" x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stopColor="#f4f0ff"/><stop offset="50%" stopColor="#d8c8e8"/><stop offset="100%" stopColor="#b0a0d0"/></linearGradient>
                    <linearGradient id="cpByFr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7888b0"/><stop offset="50%" stopColor="#4a5878"/><stop offset="100%" stopColor="#7888b0"/></linearGradient>
                    <clipPath id="cpByCl"><rect x="4" y="4" width="44" height="44" rx="7"/></clipPath>
                  </defs>
                  <rect x="1" y="1" width="50" height="50" rx="9" fill="url(#cpByFr)"/>
                  <rect x="1" y="1" width="50" height="50" rx="9" fill="none" stroke="rgba(130,160,210,.5)" strokeWidth="1.5"/>
                  <rect x="3" y="3" width="46" height="46" rx="8" fill="none" stroke="rgba(100,130,190,.25)" strokeWidth=".6"/>
                  {[[6,6],[46,6],[6,46],[46,46]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2" fill="rgba(120,170,230,.45)"/>)}
                  <g clipPath="url(#cpByCl)">
                    <rect x="4" y="4" width="44" height="44" fill="url(#cpBySc)"/>
                    <ellipse cx="26" cy="18" rx="20" ry="12" fill="rgba(50,90,160,.12)"/>
                    <path d="M12,22 Q10,12 16,8 Q22,3 26,5 Q30,3 36,8 Q42,12 40,22 Q42,30 40,38 L38,44 L34,40 Q30,36 28,40 L26,44 L24,40 Q22,36 18,40 L14,44 L12,38 Q10,30 12,22Z" fill="url(#cpByHr)"/>
                    <path d="M20,10 Q22,16 20,24" stroke="rgba(255,255,255,.25)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    <path d="M32,10 Q30,16 32,24" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <ellipse cx="26" cy="25" rx="11" ry="13" fill="rgba(255,232,215,.95)"/>
                    <ellipse cx="20" cy="28" rx="3.5" ry="2.5" fill="rgba(255,170,150,.15)"/>
                    <ellipse cx="32" cy="28" rx="3.5" ry="2.5" fill="rgba(255,170,150,.15)"/>
                    <ellipse cx="22" cy="25" rx="3.5" ry="4" fill="rgba(15,35,55,.95)"/>
                    <ellipse cx="30" cy="25" rx="3.5" ry="4" fill="rgba(15,35,55,.95)"/>
                    <ellipse cx="22" cy="25.8" rx="2.8" ry="3.2" fill="rgba(35,155,195,.92)"/>
                    <ellipse cx="30" cy="25.8" rx="2.8" ry="3.2" fill="rgba(35,155,195,.92)"/>
                    <ellipse cx="22" cy="26.5" rx="2" ry="2.3" fill="rgba(75,195,235,.7)"/>
                    <ellipse cx="30" cy="26.5" rx="2" ry="2.3" fill="rgba(75,195,235,.7)"/>
                    <circle cx="22" cy="25" r="1.3" fill="rgba(8,18,35,.95)"/>
                    <circle cx="30" cy="25" r="1.3" fill="rgba(8,18,35,.95)"/>
                    <circle cx="23.2" cy="24" r=".85" fill="#fff" opacity=".9"/>
                    <circle cx="31.2" cy="24" r=".85" fill="#fff" opacity=".9"/>
                    <circle cx="21.2" cy="26.8" r=".45" fill="#fff" opacity=".5"/>
                    <circle cx="29.2" cy="26.8" r=".45" fill="#fff" opacity=".5"/>
                    <path d="M19,22 Q22,21 25,22.5" stroke="rgba(35,25,45,.75)" strokeWidth=".7" fill="none" strokeLinecap="round"/>
                    <path d="M27,22.5 Q30,21 33,22" stroke="rgba(35,25,45,.75)" strokeWidth=".7" fill="none" strokeLinecap="round"/>
                    <path d="M20,20.5 Q22,19.5 24,20.5" stroke="rgba(175,165,195,.5)" strokeWidth=".7" fill="none"/>
                    <path d="M28,20.5 Q30,19.5 32,20.5" stroke="rgba(175,165,195,.5)" strokeWidth=".7" fill="none"/>
                    <path d="M26,28.5 L25.3,30" stroke="rgba(195,155,135,.35)" strokeWidth=".6" fill="none" strokeLinecap="round"/>
                    <path d="M23.5,31.5 Q26,34 28.5,31.5" stroke="rgba(215,115,115,.55)" strokeWidth=".8" fill="none" strokeLinecap="round"/>
                    <path d="M24,31.8 Q26,33 28,31.8" fill="rgba(235,155,155,.25)"/>
                    <path d="M22,36 L20,40 Q16,44 12,46 L12,52 L40,52 L40,46 Q36,44 32,40 L30,36" fill="rgba(255,232,215,.95)"/>
                    <path d="M19,40 Q22,38 26,39 Q30,38 33,40 Q30,42 26,41 Q22,42 19,40Z" fill="rgba(195,215,235,.75)" stroke="rgba(155,185,215,.45)" strokeWidth=".5"/>
                    <path d="M24,39 L26,37 L28,39" fill="rgba(255,210,0,.55)" stroke="rgba(195,165,0,.35)" strokeWidth=".4"/>
                    <circle cx="26" cy="17" r="3.5" fill="rgba(255,228,95,.92)"/>
                    <circle cx="28" cy="16" r="2.8" fill="url(#cpBySc)"/>
                    <circle cx="25" cy="16.5" r=".55" fill="#fff" opacity=".6"/>
                    <path d="M18,17 Q20,13 22,15 Q24,11 26,13 Q28,10 30,15 Q32,13 34,17" fill="url(#cpByHr)" opacity=".88"/>
                  </g>
                  <path d="M5,13 L5,6 Q5,4 7,4 L13,4" fill="none" stroke="rgba(155,195,250,.35)" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M39,4 L45,4 Q47,4 47,6 L47,13" fill="none" stroke="rgba(155,195,250,.35)" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M5,39 L5,46 Q5,48 7,48 L13,48" fill="none" stroke="rgba(155,195,250,.35)" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M39,48 L45,48 Q47,48 47,46 L47,39" fill="none" stroke="rgba(155,195,250,.35)" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              );
              return[
                {id:"bonushunt",title:"BONUSHUNT\nFEATURESPINS™",desc:cpFeatureMode==="bonushunt"?"🎯 ACTIVE — Every spin has ×5 scatter chance! Click to deactivate.":"Each spin is 5 times more likely to trigger a bonus game!",
                  icon:()=>(<div style={{position:"relative"}}><CpBuyPrincess size={56}/><div style={{position:"absolute",bottom:-3,right:-6,background:"#e8341a",color:"#fff",fontFamily:"'Space Grotesk'",fontSize:".6rem",fontWeight:900,padding:"2px 5px",borderRadius:4,boxShadow:"0 1px 4px rgba(0,0,0,.3)"}}>×5</div></div>),
                  volatility:"Very high",price:3,action:"activate",btnBg:"#e8341a",onBuy:()=>{sfx.click();setCpFeatureMode(m=>m==="bonushunt"?null:"bonushunt");setShowBuyModal(false);}},
                {id:"heavenly",title:"HEAVENLY\nFEATURESPINS™",desc:cpFeatureMode==="heavenly"?"✦ ACTIVE — Every spin guarantees a win + Multiplier! Click to deactivate.":"Each spin guarantees that at least one win and one Multiplier Symbol lands!",
                  icon:()=>(
                    <div style={{display:"flex",alignItems:"center",gap:2}}>
                      <svg viewBox="0 0 40 40" width="28" height="28"><circle cx="20" cy="20" r="16" fill="rgba(160,120,220,.8)" stroke="rgba(130,90,200,.5)" strokeWidth="1.5"/>
                      {[0,90,180,270].map(d=><polygon key={d} points="20,6 22,16 20,14 18,16" fill="rgba(210,180,250,.85)" transform={`rotate(${d},20,20)`}/>)}<circle cx="20" cy="20" r="4" fill="rgba(235,215,255,.9)"/></svg>
                      <svg viewBox="0 0 44 44" width="36" height="36"><circle cx="22" cy="22" r="19" fill="rgba(250,210,235,.8)" stroke="rgba(215,155,195,.5)" strokeWidth="2"/>
                      {Array.from({length:8},(_,i)=><polygon key={i} points="22,6 24,16 22,14 20,16" fill={i%2===0?"rgba(255,235,210,.9)":"rgba(245,200,225,.7)"} transform={`rotate(${i*45},22,22)`}/>)}<circle cx="22" cy="22" r="5" fill="rgba(255,240,245,.95)"/><polygon points="22,5 24,18 22,16 20,18" fill="rgba(255,240,150,.9)"/></svg>
                      <svg viewBox="0 0 40 40" width="28" height="28"><circle cx="20" cy="20" r="16" fill="rgba(140,180,230,.8)" stroke="rgba(110,150,210,.5)" strokeWidth="1.5"/>
                      {[0,90,180,270].map(d=><polygon key={d} points="20,6 22,16 20,14 18,16" fill="rgba(190,215,250,.85)" transform={`rotate(${d},20,20)`}/>)}<circle cx="20" cy="20" r="4" fill="rgba(215,235,255,.9)"/></svg>
                    </div>),
                  volatility:"Very high",price:50,action:"activate",btnBg:"#e8341a",onBuy:()=>{if(cpFeatureMode==="heavenly"){sfx.click();setCpFeatureMode(null);setShowBuyModal(false);return;}const cost=+(bet*50).toFixed(2);if(cost>balance)return;sfx.cash();setBalance(b=>+(b-cost).toFixed(2));setStats(s=>({...s,spins:s.spins+1,totalBet:+(s.totalBet+cost).toFixed(2)}));setCpFeatureMode("heavenly");setShowBuyModal(false);}},
                {id:"cloudsurge",title:"CLOUD SURGE",desc:"10 free spins packed with Multiplier Symbols!",
                  icon:()=>(<div style={{display:"flex",alignItems:"center"}}><CpBuyPrincess size={44} sx={{position:"relative",zIndex:2}}/><CpBuyPrincess size={44} opa={.9} sx={{marginLeft:-13,position:"relative",zIndex:1}}/><CpBuyPrincess size={44} opa={.8} sx={{marginLeft:-13,position:"relative",zIndex:0}}/></div>),
                  volatility:"High",price:100,action:"buy",btnBg:"#2a9a2a",onBuy:()=>{const cost=+(bet*100).toFixed(2);if(cost>balance)return;sfx.cash();setBalance(b=>+(b-cost).toFixed(2));setStats(s=>({...s,spins:s.spins+1,totalBet:+(s.totalBet+cost).toFixed(2)}));setShowBuyModal(false);doBuyBonusSpin("cloudsurge",10);}},
                {id:"divineboost",title:"DIVINE BOOST",desc:"10 free spins with progressively increasing multipliers!",
                  icon:()=>(<div style={{display:"flex",alignItems:"center"}}><CpBuyPrincess size={38} sx={{position:"relative",zIndex:3}}/><CpBuyPrincess size={38} opa={.92} sx={{marginLeft:-11,position:"relative",zIndex:2}}/><CpBuyPrincess size={38} opa={.84} sx={{marginLeft:-11,position:"relative",zIndex:1}}/><CpBuyPrincess size={38} opa={.76} sx={{marginLeft:-11,position:"relative",zIndex:0}}/></div>),
                  volatility:"High",price:200,action:"buy",btnBg:"#2a9a2a",onBuy:()=>{const cost=+(bet*200).toFixed(2);if(cost>balance)return;sfx.cash();setBalance(b=>+(b-cost).toFixed(2));setStats(s=>({...s,spins:s.spins+1,totalBet:+(s.totalBet+cost).toFixed(2)}));setShowBuyModal(false);doBuyBonusSpin("divineboost",10);}},
              ].map(card=>{
                const tooExpensive=(card.id==="bonushunt"?false:(+(bet*(card.price)).toFixed(2)>balance));
                const isActive=(card.id==="bonushunt"&&cpFeatureMode==="bonushunt")||(card.id==="heavenly"&&cpFeatureMode==="heavenly");
                return(
                  <div key={card.id} style={{background:isActive&&card.id==="bonushunt"?"linear-gradient(135deg,#fff5f3,#ffe8e4)":isActive&&card.id==="heavenly"?"linear-gradient(135deg,#fffde8,#fff8c0)":"#fff",borderRadius:14,overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:isActive?"0 4px 24px rgba(232,52,26,.3)":"0 4px 20px rgba(0,0,0,.25)",outline:isActive?"2.5px solid rgba(232,52,26,.6)":"none",opacity:tooExpensive?.4:1,cursor:tooExpensive?"not-allowed":"pointer"}}>
                    <div style={{padding:"14px 12px 8px",flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                      <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".62rem",fontWeight:900,color:"#1a1a1a",textAlign:"center",letterSpacing:".04em",whiteSpace:"pre-line",lineHeight:1.3}}>{card.title}</div>
                      <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".52rem",color:"#555",textAlign:"center",lineHeight:1.45,flex:1}}>{card.desc}</div>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:64,margin:"4px 0"}}>{card.icon()}</div>
                      <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".5rem",color:"#888",letterSpacing:".06em"}}>Volatility: {card.volatility}</div>
                      <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1rem",fontWeight:900,color:"#1a1a1a"}}>
                        {card.id==="bonushunt"?`€${(bet*3).toFixed(2)}`:`€${(bet*card.price).toFixed(2)}`}
                      </div>
                    </div>
                    <button disabled={tooExpensive} onClick={card.onBuy}
                      style={{padding:"13px",border:"none",cursor:tooExpensive?"not-allowed":"pointer",background:card.btnBg,color:"#fff",fontFamily:"'Space Grotesk',sans-serif",fontSize:".72rem",fontWeight:900,letterSpacing:".12em",textTransform:"uppercase"}}>
                      {card.action.toUpperCase()}
                    </button>
                  </div>
                );
              });
            })()}
          </div>

          <button onClick={()=>{sfx.click();setShowBuyModal(false);}}
            style={{position:"absolute",top:12,right:12,width:32,height:32,borderRadius:"50%",border:"2px solid rgba(255,255,255,.3)",background:"rgba(0,0,0,.5)",color:"#fff",fontSize:"1rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
      )}


      {/* BONUS TRIGGER OVERLAY */}
      {bonusPhase==="trigger"&&(
        <div className="cp-trigger-overlay">
          <div className="cp-trigger-title">{cpBonusType==="divine"?"✨ DIVINE BOOST ✨":"🌙 FREE SPINS 🌙"}</div>
          <div className="cp-trigger-sub">{freeSpins} Voľných Točení!{cpBonusType==="divine"?" — Progresívny Portál":""}</div>
        </div>
      )}

      {/* BONUS END */}
      {bonusPhase==="end"&&(
        <div className="cp-bonus-end" onClick={endBonus}>
          <div style={{fontSize:"1rem",color:"rgba(200,180,240,.6)",marginBottom:8,fontFamily:"'Space Grotesk',sans-serif"}}>BONUS UKONČENÝ</div>
          <div style={{fontSize:"2.4rem",fontWeight:900,color:"#ffd700",fontFamily:"'Space Grotesk',sans-serif",textShadow:"0 0 30px rgba(255,200,0,.5)"}}>
            ${bonusWin.toFixed(2)}
          </div>
          <div style={{fontSize:".7rem",color:"rgba(200,180,240,.4)",marginTop:16,animation:"bbsPulse 2s ease infinite"}}>Kliknite pre pokračovanie</div>
        </div>
      )}

      {/* TOP BAR */}
      <div className="cp-top">
        <button className="cp-back" onClick={()=>setPage("lobby")}>← Lobby</button>
        <div className="cp-title-bar">Cloud Princess</div>
        {isBonus&&<div className="cp-fs-badge">🌙 {freeSpinsLeft} / {freeSpins}</div>}
      </div>

      {/* MAIN AREA */}
      <div className="cp-main">
        {isBonus&&(
          <div className="cp-bonus-incoming">
            <span>🌙</span>BONUS<span>🌙</span>
          </div>
        )}
        <div className="cp-frame" style={{position:"relative"}}>
          {multDisplay>0&&(<div className="cp-mult-pool" key={multDisplay}>×{multDisplay}</div>)}
          {cpBonusType==="divine"&&isBonus&&divinePortal>0&&(<div className="cp-divine-portal" key={divinePortal}>✦ PORTAL ×{divinePortal}</div>)}
          {flashMult&&(<div className="cp-bolt-pop" key={flashMult.key}>×{flashMult.val}</div>)}
          {reTrigger&&(
            <div className="cp-retrigger-overlay in" key={reTrigger.key}>
              {["⭐","✨","🌟","💫","⭐"].map((s,i)=>(
                <span key={i} className="cp-retrigger-star" style={{
                  left:`${15+i*18}%`,top:`${20+i%2*30}%`,
                  animationDelay:`${i*.12}s`,animationDuration:".95s"
                }}>{s}</span>
              ))}
              <div className="cp-retrigger-title">🌙 RE-TRIGGER! 🌙</div>
              <div className="cp-retrigger-spins">+{reTrigger.spins} Free Spinov!</div>
            </div>
          )}
          <div className="cp-grid">
            {Array.from({length:CP_ROWS},(_,r)=>Array.from({length:CP_COLS},(_,c)=>{
              const sym=grid[r]?.[c];
              const pos=`${r}-${c}`;
              const isWin=winCells.has(pos);
              const isRem=removeCells.has(pos);
              const isScatter=sym==="scatter";
              const isMult=sym==="normal_mult"||sym==="super_mult"||sym==="epic_mult";
              return(
                <div key={cellKeys[r]?.[c]} className={`cp-cell${isWin&&isScatter?" scatter-trigger":isWin?" win":""}${isRem?" removing":""}${isMult?" mult-cell":""}`}>
                  {isScatter&&isWin&&(
                    <>
                      <div className="bbs-ripple" style={{"--scatter-glow":"rgba(255,224,130,.95)"}}/>
                      <div className="bbs-ripple" style={{"--scatter-glow":"rgba(255,224,130,.75)",animationDelay:".2s"}}/>
                      {[0,1,2,3].map(i=>(
                        <div key={i} style={{
                          position:"absolute",left:"50%",top:"50%",
                          width:7,height:7,borderRadius:"50%",
                          background:i%2===0?"#e0d0ff":"#fff8e0",
                          boxShadow:"0 0 10px rgba(180,120,255,1)",
                          animation:`cpScatterOrbit ${1.1+i*.22}s ${i*.28}s linear infinite`,
                          transformOrigin:"0 0",marginLeft:-3.5,marginTop:-3.5,
                        }}/>
                      ))}
                    </>
                  )}
                  <div className={`cp-sym cp-${cellDrop[r]?.[c]?.mode??"fall"}`} style={{"--fdrop":cellDrop[r]?.[c]?.drop??CP_ROWS+3,"--fdur":`${fallDur(cellDrop[r]?.[c]?.drop??CP_ROWS+3)}ms`,"--fdelay":`${cellDrop[r]?.[c]?.delay??0}ms`}}>
                    {cpSym(sym,r,c)}
                  </div>
                </div>
              );
            }))}
          </div>
        </div>

        {/* Win banner */}
        <div className={`cp-win-banner ${bannerPhase}`}>
          <span className="cp-wb-split-l">${spinRawWin.toFixed(2)}</span>
          <span className="cp-wb-split-r">×{spinAppliedMult}</span>
          <div className="cp-wb-final">
            <div className="cp-wb-total">${bannerFinal.toFixed(2)}</div>
            <div className="cp-wb-sub">{bannerFinal>0&&bet>0?`${+(bannerFinal/bet).toFixed(1)}× BET`:""}</div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="cp-bottom">
        <div className="cp-btm-left">
          <button className="cp-ic-btn" onClick={()=>{sfx.click();setShowStats(true);}}>☰</button>
          <button className="cp-ic-btn">ℹ</button>
          <button className="cp-ic-btn" onClick={()=>sfx.click()}>🔊</button>
          <button className="cp-ic-btn" disabled={spinning||isBonus} onClick={()=>{sfx.click();setShowBuyModal(true);}}
            style={{fontSize:".5rem",fontWeight:800,fontFamily:"'Space Grotesk',sans-serif",color:"rgba(255,200,100,.9)",border:"1px solid rgba(255,200,100,.3)",letterSpacing:".03em",padding:"0 6px",width:"auto"}}>
            BUY<br/>BONUS
          </button>
        </div>
        <div className="cp-btm-info">
          <div className="cp-btm-credits">
            <div style={{textAlign:"center"}}>
              <div className="cp-btm-lbl">Kredit</div>
              <div className="cp-btm-val">${balance.toFixed(2)}</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div className="cp-btm-lbl">Stávka</div>
              <div className="cp-btm-val">${(cpAnteBet?bet*1.25:bet).toFixed(2)}</div>
            </div>
          </div>
          {cpFeatureMode?(
            <div className={`cp-feature-badge ${cpFeatureMode}`} onClick={()=>{sfx.click();setCpFeatureMode(null);}}>
              {cpFeatureMode==="bonushunt"?"🎯 BONUSHUNT ACTIVE — klik pre zrušenie":"✦ HEAVENLY ACTIVE — klik pre zrušenie"}
            </div>
          ):(
            <div className="cp-btm-hint">Pre Turbo Točenie Podržte Medzerník</div>
          )}
        </div>
        <div className="cp-btm-right">
          <button className="cp-adj-btn" disabled={spinning||isBonus}
            onClick={()=>{sfx.tick();setBet(b=>{const bets=[0.10,0.20,0.40,0.60,0.80,1,2,3,4,5,10,20,50,100];const i=bets.indexOf(b);return i>0?bets[i-1]:b;});}}>−</button>
          {isBonus?(
            <button className="cp-big-spin bonus" disabled={spinning} onClick={()=>doSpin(true)}>
              {spinning
                ?<svg style={{animation:"sbSpin360 .8s linear infinite"}} viewBox="0 0 24 24" fill="none" stroke="#402000" strokeWidth="2.2"><path d="M12 2a10 10 0 1 0 10 10" strokeLinecap="round"/></svg>
                :<svg viewBox="0 0 24 24" fill="none" stroke="#402000" strokeWidth="2.2"><path d="M21 12a9 9 0 1 1-3.1-6.8M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              }
            </button>
          ):(
            <button
              className={`cp-big-spin${cpFeatureMode?" feature-"+cpFeatureMode:""}`}
              style={{position:"relative"}}
              disabled={spinning||!!bonusPhase||bet>balance}
              onClick={()=>{sfx.click();doSpin(false);}}>
              {spinning
                ?<svg style={{animation:"sbSpin360 .8s linear infinite"}} viewBox="0 0 24 24" fill="none" stroke={cpFeatureMode?"#402000":"#fff"} strokeWidth="2.2"><path d="M12 2a10 10 0 1 0 10 10" strokeLinecap="round"/></svg>
                :<svg viewBox="0 0 24 24" fill="none" stroke={cpFeatureMode?"#402000":"#fff"} strokeWidth="2.2"><path d="M21 12a9 9 0 1 1-3.1-6.8M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              }
            </button>
          )}
          <button className="cp-adj-btn" disabled={spinning||isBonus}
            onClick={()=>{sfx.tick();setBet(b=>{const bets=[0.10,0.20,0.40,0.60,0.80,1,2,3,4,5,10,20,50,100];const i=bets.indexOf(b);return i<bets.length-1?bets[i+1]:b;});}}>+</button>
        </div>
      </div>
    </div>
  );
}
export { CloudPrincessGame, CloudPrincessArt };

