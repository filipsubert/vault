import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { StatsModal } from "../components/StatsModal.jsx";
// !! Importuj IMG_ premenné zo svojho textures.js:
import { IMG_SCATTER, IMG_CROWN, IMG_GRID, IMG_HOURGLASS, IMG_KALICH, IMG_RING, IMG_BLUE_G, IMG_GREEN_G, IMG_PURPLE_G, IMG_RED_G, IMG_YELLOW_G, IMG_OLIMPUS_IDLE } from "../simbols/GoO_Simbols.jsx";
import GIF_OLIMPUS_MULTI from "../simbols/Zeus-gif.gif";
// ── Gates of Olympus slot ─────────────────────────────────────────────────────
/* ══════════════════════════════════════ GATES OF OLYMPUS ════════════════════════════ */

function GatesOfOlympusArt(){
  return(
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
      <defs>
        <radialGradient id="goABg" cx="50%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#1a0550"/><stop offset="50%" stopColor="#08021e"/><stop offset="100%" stopColor="#020108"/>
        </radialGradient>
        <radialGradient id="goAGlow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="rgba(100,80,255,.6)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="goABolt" cx="40%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#fff9c4"/><stop offset="30%" stopColor="#ffe066"/><stop offset="70%" stopColor="#f5c400"/><stop offset="100%" stopColor="#7a5000"/>
        </radialGradient>
        <radialGradient id="goAVig" cx="50%" cy="50%" r="70%">
          <stop offset="45%" stopColor="transparent"/><stop offset="100%" stopColor="rgba(0,0,0,.82)"/>
        </radialGradient>
        <filter id="goAGF"><feGaussianBlur stdDeviation="10"/></filter>
        <filter id="goAGFS"><feGaussianBlur stdDeviation="2.5"/></filter>
        <filter id="goADrop"><feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,.9)"/></filter>
        <filter id="goABoltGlow"><feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ffe066" floodOpacity=".9"/></filter>
        <filter id="goAZeusGlow"><feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="rgba(100,80,255,.8)" floodOpacity=".8"/></filter>
      </defs>
      <rect width="240" height="320" fill="url(#goABg)"/>
      {/* Stars */}
      {Array.from({length:55},(_,i)=><circle key={i} cx={(i*47+i%9*21)%240} cy={(i*33+i%7*19)%240} r={.4+i%4*.35} fill="rgba(200,180,255,.9)" opacity={.25+i%5*.14}/>)}
      {/* Cloud / atmospheric glow */}
      <ellipse cx="120" cy="130" rx="130" ry="80" fill="url(#goAGlow)" filter="url(#goAGF)" opacity="1"/>
      {/* Columns */}
      {[[22,100],[62,90],[178,90],[218,100]].map(([x,topY],i)=>(
        <g key={i}>
          <rect x={x-10} y={topY} width="20" height="160" fill={`rgba(${30+i*4},${18+i*3},${65+i*5},.85)`} stroke="rgba(150,120,255,.25)" strokeWidth="1"/>
          <rect x={x-12} y={topY-8} width="24" height="10" rx="2" fill={`rgba(40,25,80,.9)`} stroke="rgba(150,120,255,.3)" strokeWidth="1"/>
          <rect x={x-8} y={topY+2} width="16" height="148" fill="rgba(255,255,255,.03)"/>
        </g>
      ))}
      {/* Temple architrave */}
      <rect x="10" y="88" width="220" height="16" rx="3" fill="rgba(35,20,75,.92)" stroke="rgba(150,120,255,.3)" strokeWidth="1.2"/>
      {/* Pediment triangle */}
      <polygon points="120,55 10,88 230,88" fill="rgba(28,15,65,.9)" stroke="rgba(150,120,255,.28)" strokeWidth="1"/>
      {/* Zeus — simplified, majestic */}
      <g transform="translate(80,90)" filter="url(#goAZeusGlow)">
        {/* Robe */}
        <path d="M30,40 Q10,50 8,90 L52,90 Q50,50 30,40Z" fill="rgba(220,215,255,.85)" stroke="rgba(200,180,255,.4)" strokeWidth="1"/>
        <path d="M18,55 L30,48 L42,55 L38,90 L22,90Z" fill="rgba(255,255,255,.25)"/>
        {/* Head */}
        <circle cx="30" cy="28" r="16" fill="rgba(220,210,190,.9)"/>
        {/* Beard */}
        <path d="M18,30 Q16,40 22,46 Q30,50 38,46 Q44,40 42,30" fill="rgba(200,190,170,.85)"/>
        <path d="M22,35 Q25,44 30,46 Q35,44 38,35" fill="rgba(180,170,150,.6)"/>
        {/* Eyes */}
        <ellipse cx="25" cy="26" rx="3" ry="2.5" fill="rgba(80,60,200,.9)"/>
        <ellipse cx="35" cy="26" rx="3" ry="2.5" fill="rgba(80,60,200,.9)"/>
        <circle cx="25" cy="26" r="1.2" fill="#fff" opacity=".6"/>
        <circle cx="35" cy="26" r="1.2" fill="#fff" opacity=".6"/>
        {/* Crown/laurel */}
        <path d="M16,20 Q20,14 24,18 Q28,12 30,16 Q32,12 36,18 Q40,14 44,20" fill="none" stroke="rgba(245,196,0,.7)" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Arm raising bolt */}
        <path d="M48,50 Q58,38 62,30" stroke="rgba(220,215,255,.8)" strokeWidth="8" strokeLinecap="round" fill="none"/>
      </g>
      {/* Giant lightning bolt */}
      <g transform="translate(115,30)" filter="url(#goABoltGlow)">
        <polygon points="18,0 8,35 16,35 2,75 28,28 18,28 32,0" fill="url(#goABolt)"/>
        <polygon points="18,0 8,35 16,35 2,75 28,28 18,28 32,0" fill="none" stroke="rgba(255,240,120,.6)" strokeWidth="1"/>
      </g>
      {/* Multiplier orbs floating */}
      {[[30,178,18,"×25"],[195,165,16,"×10"],[45,228,14,"×5"],[198,230,15,"×50"]].map(([x,y,r,t],i)=>(
        <g key={i} filter="url(#goADrop)">
          <circle cx={x} cy={y} r={r+4} fill="rgba(100,80,255,.18)" filter="url(#goAGFS)"/>
          <circle cx={x} cy={y} r={r} fill={`rgba(${50+i*12},${30+i*8},${180+i*15},.9)`} stroke="rgba(180,160,255,.6)" strokeWidth="1.5"/>
          <circle cx={x} cy={y} r={r} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="2.5" filter="url(#goAGFS)"/>
          <text x={x} y={y+4} textAnchor="middle" fontSize={r*.65} fill="#fff" fontWeight="900" fontFamily="'Space Grotesk',sans-serif">{t}</text>
          <ellipse cx={x-r*.35} cy={y-r*.35} rx={r*.3} ry={r*.2} fill="rgba(255,255,255,.3)" transform={`rotate(-30,${x-r*.35},${y-r*.35})`}/>
        </g>
      ))}
      {/* Lightning sparks */}
      {[[28,135],[215,128],[38,258],[202,255],[120,22]].map(([x,y],i)=>(
        <g key={i} transform={`translate(${x},${y})`} opacity={.4+i*.06}>
          <line x1="0" y1="-7" x2="0" y2="7" stroke="#ffe066" strokeWidth="1.4"/>
          <line x1="-7" y1="0" x2="7" y2="0" stroke="#ffe066" strokeWidth="1.4"/>
          <line x1="-5" y1="-5" x2="5" y2="5" stroke="rgba(255,200,50,.35)" strokeWidth=".9"/>
          <line x1="5" y1="-5" x2="-5" y2="5" stroke="rgba(255,200,50,.35)" strokeWidth=".9"/>
        </g>
      ))}
      {/* Label */}
      <rect x="10" y="278" width="220" height="36" rx="10" fill="rgba(4,2,14,.92)" stroke="rgba(130,100,255,.3)" strokeWidth="1.4"/>
      <rect x="16" y="284" width="56" height="14" rx="3.5" fill="rgba(100,60,220,.88)"/>
      <text x="44" y="294.5" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#fff" fontFamily="'Space Grotesk',sans-serif" letterSpacing=".8">ORIGINALS</text>
      <text x="16" y="308" fontFamily="'Space Grotesk',sans-serif" fontSize="13" fontWeight="800" fill="#c4b5fd" letterSpacing=".04em">Gates of Olympus</text>
      <rect width="240" height="320" fill="url(#goAVig)"/>
    </svg>
  );
}

/* ── Gates of Olympus constants ── */
const GO_ROWS=5,GO_COLS=6;
const GO_SYMS={
  // ── HIGH value — paytable from real Gates of Olympus ──────────────────────
  // Each ~7% of paying symbols. In bonus, bolt takes ~24% of grid so paying syms share ~76%.
  crown:   {name:"Crown",    w:{base:.070, bonus:.070},
    // 8-9=10x, 10-11=25x, 12+=50x (real GO paytable)
    pay:[[8,10],[10,25],[12,50]]},
  hglass:  {name:"Hourglass",w:{base:.070, bonus:.070},
    pay:[[8,2.5],[10,10],[12,25]]},
  ring:    {name:"Ring",     w:{base:.070, bonus:.070},
    pay:[[8,2],[10,5],[12,15]]},
  chalice: {name:"Chalice",  w:{base:.070, bonus:.070},
    pay:[[8,1.5],[10,2],[12,12]]},
  // ── LOW gems — 5 symbols, each ~13.5% of paying syms ─────────────────────
  // ruby=highest low, sapphire=lowest low (real GO ordering)
  ruby:    {name:"Ruby",     w:{base:.135, bonus:.135},
    pay:[[8,1],[10,1.5],[12,10]]},
  amethyst:{name:"Amethyst", w:{base:.135, bonus:.135},
    pay:[[8,0.8],[10,1.2],[12,8]]},
  topaz:   {name:"Topaz",    w:{base:.135, bonus:.135},
    pay:[[8,0.5],[10,1],[12,5]]},
  emerald: {name:"Emerald",  w:{base:.135, bonus:.135},
    pay:[[8,0.4],[10,0.9],[12,4]]},
  sapphire:{name:"Sapphire", w:{base:.135, bonus:.135},
    pay:[[8,0.25],[10,0.75],[12,2]]},
  // ── Special ───────────────────────────────────────────────────────────────
  scatter: {name:"Zeus",     w:{base:.020, bonus:.015}, pay:[]},
  bolt:    {name:"Lightning",w:{base:.0044, bonus:.013}, pay:[]},
};
// Multiplier distribution — lower ceiling, more small values (20x pool feels powerful)
const GO_MULTS=[2,3,5,8,10,15,25,50,100];
const GO_MULT_W=[35,28,18,8,5,3,2,1,.5]; // heavily skewed to small values

/* ── Validate grid: ensure max 1 scatter per column ── */
function goFixScatterCols(grid){
  const colHasScatter=Array(GO_COLS).fill(false);
  return grid.map(row=>row.map((s,c)=>{
    if(s!=="scatter")return s;
    if(colHasScatter[c]){
      // Duplicate scatter in this column — replace with a random non-scatter sym
      let rep;do{rep=goRandSym(false,false);}while(rep==="scatter"||rep==="bolt");
      return rep;
    }
    colHasScatter[c]=true;
    return s;
  }));
}

// Precompute cumulative weight tables for O(log n) symbol selection
const _goSymEntries=Object.entries(GO_SYMS);
function _buildCumTable(mode,anteBet=false){
  const entries=[];let sum=0;
  for(const[k,v]of _goSymEntries){
    const w=anteBet&&k==="scatter"?v.w[mode]*2:v.w[mode];
    sum+=w;entries.push({sym:k,cum:sum});
  }
  return{entries,total:sum};
}
const _goTableBase=_buildCumTable("base",false);
const _goTableBaseAnte=_buildCumTable("base",true);
const _goTableBonus=_buildCumTable("bonus",false);

function goRandSym(isBonus=false,anteBet=false){
  const table=isBonus?_goTableBonus:anteBet?_goTableBaseAnte:_goTableBase;
  const r=Math.random()*table.total;
  for(const e of table.entries){if(r<=e.cum)return e.sym;}
  return table.entries[table.entries.length-1].sym;
}
const _goMultCum=[];{let s=0;for(let i=0;i<GO_MULTS.length;i++){s+=GO_MULT_W[i];_goMultCum.push(s);}}
const _goMultTotal=_goMultCum[_goMultCum.length-1];
function goRandMult(){
  let r=Math.random()*_goMultTotal;
  for(let i=0;i<GO_MULTS.length;i++){if(r<=_goMultCum[i])return GO_MULTS[i];}
  return GO_MULTS[0];
}

/* ── Frustration mechanic: bolt mult values biased by win size ──
 * Small win (< 2× bet): heavy 2/3 bias  → player sees "missed connection" feel
 * Medium win (2–5× bet): standard distribution
 * Big win (≥ 5× bet): slight lean toward higher values (the rare "perfect board" hits)
 * Lucky 5% override: always allows higher values regardless of win size
 */
function goRandMultBiased(rawWinPerBet){
  const lucky=Math.random()<0.05;
  if(lucky){
    // Lucky bolt — ignore win size, allow full range
    const r=Math.random();
    if(r<.20)return 2; if(r<.38)return 3; if(r<.54)return 5;
    if(r<.66)return 8; if(r<.76)return 10; if(r<.84)return 15;
    if(r<.91)return 25; if(r<.96)return 50; return 100;
  }
  const r=Math.random();
  if(rawWinPerBet<2){
    // Frustration bias: mostly 2 and 3 → player sees bolt but mult is tiny
    if(r<.48)return 2; if(r<.76)return 3; if(r<.89)return 5;
    if(r<.94)return 8; if(r<.97)return 10; if(r<.99)return 15;
    return 25;
  }
  if(rawWinPerBet>=5){
    // Big win: slightly better chance of nice multiplier (the hype moment)
    if(r<.22)return 2; if(r<.44)return 3; if(r<.60)return 5;
    if(r<.72)return 8; if(r<.82)return 10; if(r<.89)return 15;
    if(r<.94)return 25; if(r<.97)return 50; return 100;
  }
  // Medium win: standard
  return goRandMult();
}
function goGenGrid(isBonus=false,anteBet=false){
  const colHasScatter=Array(GO_COLS).fill(false);
  const g=Array.from({length:GO_ROWS},()=>Array.from({length:GO_COLS},(_,c)=>{
    let sym=goRandSym(isBonus,anteBet);
    if(sym==="scatter"){
      if(colHasScatter[c]){do{sym=goRandSym(isBonus,anteBet);}while(sym==="scatter");}
      else{colHasScatter[c]=true;}
    }
    return sym;
  }));
  return goFixScatterCols(g); // final safety pass
}
function goSymPay(sym,count){
  const t=GO_SYMS[sym]?.pay;
  if(!t||!t.length)return 0;
  let p=0;
  for(const[min,mult]of t){if(count>=min)p=mult;}
  return p;
}
function goFindWinners(grid){
  const counts={};
  const special=new Set(["scatter","bolt"]);
  grid.forEach(row=>row.forEach(s=>{if(s&&!special.has(s))counts[s]=(counts[s]||0)+1;}));
  return Object.entries(counts).filter(([,c])=>c>=8).map(([s])=>s);
}
function goGravity(grid){
  const ng=Array.from({length:GO_ROWS},()=>Array(GO_COLS).fill(null));
  const dd=Array.from({length:GO_ROWS},()=>Array(GO_COLS).fill(0));
  for(let c=0;c<GO_COLS;c++){
    const col=[];
    for(let r=0;r<GO_ROWS;r++){if(grid[r][c]!==null)col.push({s:grid[r][c],or:r});}
    const sr=GO_ROWS-col.length;
    for(let i=0;i<col.length;i++){const nr=sr+i;ng[nr][c]=col[i].s;dd[nr][c]=nr-col[i].or;}
  }
  return{ng,dd};
}
function goFill(grid,isBonus,anteBet=false){
  const colHasScatter=Array(GO_COLS).fill(false);
  grid.forEach(row=>row.forEach((s,c)=>{if(s==="scatter")colHasScatter[c]=true;}));
  const result=grid.map(row=>row.map((s,c)=>{
    if(s!==null)return s;
    let sym=goRandSym(isBonus,anteBet);
    if(sym==="scatter"){
      if(colHasScatter[c]){do{sym=goRandSym(isBonus,anteBet);}while(sym==="scatter");}
      else{colHasScatter[c]=true;}
    }
    return sym;
  }));
  return goFixScatterCols(result); // final safety pass
}

/* ── Outcome pre-roll — determines cascade depth BEFORE grid is generated ──
 * Base:  40% dead | 35% single | 12% ×2 | 6% ×3 | 3.5% ×4 | 2% ×5 | 1% ×6 | 0.5% mega
 * Bonus: 22% dead | 30% single | 18% ×2 | 12% ×3 | 8% ×4  | 5% ×5 | 3% ×6 | 2% mega
 * "mega" = 10 → cascade loop runs freely until no more wins
 */
function goRollCascadeDepth(isBonus){
  const r=Math.random();
  if(!isBonus){
    // ── Base game cascade distribution ──
    // 0-2 tumbles: very common (total ~84%)
    // 3+ tumbles: rare (total ~16%), 3-5 not crazy rare though
    if(r<0.30)return 0;   // 30% dead spin   — still common, just not dominant
    if(r<0.55)return 1;   // 25% ×1 tumble
    if(r<0.84)return 2;   // 29% ×2 tumbles  — MOST COMMON WIN TIER
    if(r<0.91)return 3;   //  7% ×3 tumbles  — rare starts here
    if(r<0.95)return 4;   //  4% ×4 tumbles
    if(r<0.972)return 5;  // 2.2% ×5 tumbles
    if(r<0.986)return 6;  // 1.4% ×6 tumbles
    if(r<0.994)return 7;  // 0.8% ×7 tumbles
    return 10;             // 0.6% mega free-run
  }else{
    if(r<0.22)return 0;
    if(r<0.52)return 1;
    if(r<0.70)return 2;
    if(r<0.82)return 3;
    if(r<0.90)return 4;
    if(r<0.95)return 5;
    if(r<0.98)return 6;
    return 10;
  }
}

/* ── Capped fill — replaces nulls but caps any symbol at maxPerSym
 * Used as the FINAL refill so no further cascade can start.
 * Also caps bolts at maxBolts to prevent post-cascade bolt flood.
 * BUG FIX: without bolt cap, a capped refill on high-bolt-weight bonus
 * could fill most remaining cells with bolts, creating inflated multipliers.
 */
function goFillCapped(grid,isBonus,maxPerSym=7,maxBolts=2){
  const counts={};
  let boltCount=0;
  const colHasScatter=Array(GO_COLS).fill(false);
  // Tally every non-null symbol already on the grid
  grid.forEach(row=>row.forEach((s,c)=>{
    if(s===null)return;
    if(s==="scatter"){colHasScatter[c]=true;return;}
    if(s==="bolt"){boltCount++;return;}
    counts[s]=(counts[s]||0)+1;
  }));
  const filled=grid.map(row=>row.map((s,c)=>{
    if(s!==null)return s;
    let sym,tries=0;
    do{
      sym=goRandSym(isBonus);
      tries++;
      if(sym==="scatter"&&colHasScatter[c])continue;
      if(sym==="bolt"&&boltCount>=maxBolts)continue;
      if(sym!=="bolt"&&sym!=="scatter"&&(counts[sym]||0)>=maxPerSym)continue;
      break;
    }while(tries<50);
    if(sym==="scatter")colHasScatter[c]=true;
    else if(sym==="bolt")boltCount++;
    else counts[sym]=(counts[sym]||0)+1;
    return sym;
  }));
  return goFixScatterCols(filled); // final safety pass
}

/* ── Force first-win grid — pick a random low gem and seat ≥8 of it ── */
function goForceFirstWin(isBonus){
  const lowSyms=["amethyst","ruby","sapphire","emerald","topaz"];
  const forceSym=lowSyms[Math.floor(Math.random()*lowSyms.length)];
  const forceCount=8+Math.floor(Math.random()*3); // 8-10
  // Build position list and shuffle
  const pos=[];
  for(let r=0;r<GO_ROWS;r++)for(let c=0;c<GO_COLS;c++)pos.push([r,c]);
  for(let i=pos.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pos[i],pos[j]]=[pos[j],pos[i]];}
  const g=Array.from({length:GO_ROWS},()=>Array(GO_COLS).fill(null));
  // Place forced gem
  for(let i=0;i<forceCount;i++)g[pos[i][0]][pos[i][1]]=forceSym;
  // Fill remainder — avoid same sym to keep it natural, max 1 scatter per column
  const colHasScatter=Array(GO_COLS).fill(false);
  g.forEach(row=>row.forEach((s,c)=>{if(s==="scatter")colHasScatter[c]=true;}));
  for(let i=forceCount;i<pos.length;i++){
    const[r,c]=pos[i];
    let sym,tries=0;
    do{sym=goRandSym(isBonus);tries++;}while(tries<30&&(sym===forceSym||(sym==="scatter"&&colHasScatter[c])));
    if(sym==="scatter")colHasScatter[c]=true;
    g[r][c]=sym;
  }
  return goFixScatterCols(g); // final safety pass
}

/* ── Grid generation controlled by cascade depth ──
 * depth=0 → guarantee NO winner on initial grid (rejection sample, fallback to capped)
 * depth≥1 → guarantee AT LEAST ONE winner on initial grid (rejection sample, fallback to forced)
 */
function goGenGridForDepth(isBonus,depth,anteBet=false){
  if(depth===0){
    for(let i=0;i<50;i++){
      const g=goGenGrid(isBonus,anteBet);
      if(goFindWinners(g).length===0)return g;
    }
    return goFillCapped(Array.from({length:GO_ROWS},()=>Array(GO_COLS).fill(null)),isBonus,7);
  }
  for(let i=0;i<50;i++){
    const g=goGenGrid(isBonus,anteBet);
    if(goFindWinners(g).length>0)return g;
  }
  return goForceFirstWin(isBonus);
}

/* ── Zeus Scatter symbol — detailed face matching real GOO reference ── */
const GoZeusSym=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="88%" height="88%">
    <defs>
      <radialGradient id="goZBg" cx="50%" cy="40%" r="65%"><stop offset="0%" stopColor="#2a1060"/><stop offset="60%" stopColor="#14065a"/><stop offset="100%" stopColor="#060220"/></radialGradient>
      <radialGradient id="goZFace" cx="45%" cy="35%" r="60%"><stop offset="0%" stopColor="#ffe8cc"/><stop offset="50%" stopColor="#e8c8a0"/><stop offset="100%" stopColor="#c89868"/></radialGradient>
      <radialGradient id="goZBeard" cx="50%" cy="30%" r="60%"><stop offset="0%" stopColor="#f8f8f8"/><stop offset="60%" stopColor="#d8d8d8"/><stop offset="100%" stopColor="#b0b0b0"/></radialGradient>
      <linearGradient id="goZFrame" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#ffe566"/><stop offset="50%" stopColor="#f5c400"/><stop offset="100%" stopColor="#a06000"/></linearGradient>
      <filter id="goZGlow"><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#f5c400" floodOpacity=".7"/></filter>
      <filter id="goZFaceGl"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#c07030" floodOpacity=".4"/></filter>
      <filter id="goZInner"><feGaussianBlur stdDeviation="5"/></filter>
      <clipPath id="goZCircClip"><circle cx="26" cy="25" r="20"/></clipPath>
    </defs>
    {/* Outer golden ring */}
    <circle cx="26" cy="25" r="24" fill="url(#goZBg)" filter="url(#goZGlow)"/>
    <circle cx="26" cy="25" r="24" fill="none" stroke="url(#goZFrame)" strokeWidth="2.5"/>
    <circle cx="26" cy="25" r="21" fill="none" stroke="rgba(245,196,0,.3)" strokeWidth=".7"/>
    {/* Inner purple background */}
    <circle cx="26" cy="25" r="20" fill="url(#goZBg)"/>
    {/* Ambient inner glow */}
    <circle cx="26" cy="20" r="15" fill="rgba(160,100,255,.15)" filter="url(#goZInner)"/>
    {/* ─── Face ─── */}
    <g clipPath="url(#goZCircClip)">
      {/* Neck / shoulders */}
      <path d="M14,46 Q16,38 20,36 Q23,35 26,35 Q29,35 32,36 Q36,38 38,46 Z" fill="rgba(200,160,100,.7)"/>
      {/* White robe hint */}
      <path d="M10,48 Q14,40 20,37 Q26,35 32,37 Q38,40 42,48 Z" fill="rgba(240,240,250,.55)"/>
      {/* Main head shape */}
      <ellipse cx="26" cy="24" rx="11" ry="13" fill="url(#goZFace)" filter="url(#goZFaceGl)"/>
      {/* Forehead shading */}
      <ellipse cx="25" cy="17" rx="7" ry="4" fill="rgba(255,220,180,.4)"/>
      {/* ─── Hair ─── */}
      {/* Top hair — white/grey wavy */}
      <path d="M15,18 Q16,10 20,9 Q23,8 26,9 Q29,8 32,9 Q36,10 37,18" fill="url(#goZBeard)" opacity=".95"/>
      <path d="M15,18 Q17,12 21,11 Q24,10 26,11 Q28,10 31,11 Q35,12 37,18" fill="rgba(255,255,255,.5)"/>
      {/* Side hair flowing */}
      <path d="M15,18 Q12,22 13,28 Q14,32 16,34" fill="none" stroke="rgba(220,220,220,.8)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M37,18 Q40,22 39,28 Q38,32 36,34" fill="none" stroke="rgba(220,220,220,.8)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M14,20 Q11,24 12,30" fill="none" stroke="rgba(200,200,200,.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M38,20 Q41,24 40,30" fill="none" stroke="rgba(200,200,200,.5)" strokeWidth="1.5" strokeLinecap="round"/>
      {/* ─── Eyebrows ─── */}
      <path d="M18,20 Q21,18 24,19.5" fill="none" stroke="rgba(120,80,40,.85)" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M28,19.5 Q31,18 34,20" fill="none" stroke="rgba(120,80,40,.85)" strokeWidth="1.6" strokeLinecap="round"/>
      {/* ─── Eyes ─── */}
      <ellipse cx="21.5" cy="22" rx="2.5" ry="2" fill="rgba(40,25,10,.9)"/>
      <ellipse cx="30.5" cy="22" rx="2.5" ry="2" fill="rgba(40,25,10,.9)"/>
      {/* Eye iris — blue/grey like Zeus */}
      <ellipse cx="21.5" cy="22" rx="1.5" ry="1.5" fill="rgba(80,100,180,.85)"/>
      <ellipse cx="30.5" cy="22" rx="1.5" ry="1.5" fill="rgba(80,100,180,.85)"/>
      <circle cx="22" cy="21.5" r=".55" fill="rgba(255,255,255,.7)"/>
      <circle cx="31" cy="21.5" r=".55" fill="rgba(255,255,255,.7)"/>
      {/* ─── Nose ─── */}
      <path d="M25,22 Q24.5,26 25,27 Q26,28 27,27 Q27.5,26 27,22" fill="rgba(180,130,90,.35)"/>
      <path d="M23,27 Q25,28.5 29,27" fill="none" stroke="rgba(150,100,60,.4)" strokeWidth=".8" strokeLinecap="round"/>
      {/* ─── Mouth ─── */}
      <path d="M22,30 Q26,32.5 30,30" fill="none" stroke="rgba(160,100,60,.7)" strokeWidth="1.2" strokeLinecap="round"/>
      {/* ─── Beard ─── */}
      <path d="M16,27 Q15,35 18,40 Q22,44 26,44 Q30,44 34,40 Q37,35 36,27" fill="url(#goZBeard)" opacity=".92"/>
      {/* Beard texture lines */}
      <path d="M18,29 Q17,35 19,40" fill="none" stroke="rgba(180,180,180,.5)" strokeWidth=".9" strokeLinecap="round"/>
      <path d="M21,30 Q20,37 22,42" fill="none" stroke="rgba(180,180,180,.4)" strokeWidth=".8" strokeLinecap="round"/>
      <path d="M26,31 Q26,38 26,43" fill="none" stroke="rgba(180,180,180,.4)" strokeWidth=".8" strokeLinecap="round"/>
      <path d="M31,30 Q32,37 30,42" fill="none" stroke="rgba(180,180,180,.4)" strokeWidth=".8" strokeLinecap="round"/>
      <path d="M34,29 Q35,35 33,40" fill="none" stroke="rgba(180,180,180,.5)" strokeWidth=".9" strokeLinecap="round"/>
      {/* Moustache */}
      <path d="M20,29 Q23,31 26,30 Q29,31 32,29" fill="rgba(200,200,200,.8)" stroke="rgba(180,180,180,.5)" strokeWidth=".5"/>
    </g>
    {/* SCATTER label */}
    <rect x="8" y="43" width="36" height="8" rx="4" fill="rgba(10,4,40,.85)" stroke="rgba(245,196,0,.6)" strokeWidth=".8"/>
    <text x="26" y="49.5" textAnchor="middle" fontSize="5.2" fontFamily="'Space Grotesk',sans-serif" fontWeight="900" fill="#f5c400" letterSpacing=".5">SCATTER</text>
    {/* Corner stars */}
    {[[5,5],[47,5]].map(([x,y],i)=>(
      <g key={i} transform={`translate(${x},${y})`}>
        <polygon points="0,-3 .9,-1 3,-1 1.5,1 2.2,3 0,2 -2.2,3 -1.5,1 -3,-1 -.9,-1" fill="#f5c400" opacity=".8"/>
      </g>
    ))}
  </svg>
));

/* ── Lightning Bolt symbol ── */
const GoBoltSym=React.memo(({val})=>(
  <svg viewBox="0 0 52 52" width="88%" height="88%">
    <defs>
      <radialGradient id="goBBg" cx="40%" cy="30%" r="70%"><stop offset="0%" stopColor="#fff9c4"/><stop offset="35%" stopColor="#ffe066"/><stop offset="70%" stopColor="#f5c400"/><stop offset="100%" stopColor="#6a3000"/></radialGradient>
      <filter id="goBGl"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>
    <circle cx="26" cy="26" r="23" fill="rgba(30,15,80,.85)" stroke="rgba(245,196,0,.55)" strokeWidth="1.8"/>
    {/* Glow */}
    <circle cx="26" cy="26" r="20" fill="rgba(245,196,0,.12)" filter="url(#goBGl)"/>
    {/* Bolt */}
    <polygon points="28,8 16,28 24,28 18,46 36,22 26,22 34,8" fill="url(#goBBg)"/>
    <polygon points="28,8 16,28 24,28 18,46 36,22 26,22 34,8" fill="none" stroke="rgba(255,240,120,.6)" strokeWidth=".8"/>
    {val&&<text x="26" y="50" textAnchor="middle" fontSize="6" fontFamily="'Space Grotesk',sans-serif" fontWeight="900" fill="rgba(245,196,0,.9)">×{val}</text>}
  </svg>
));

/* ── High value symbols — detailed SVG art matching real GOO paytable ── */
const GoCrownSym=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="88%" height="88%">
    <defs>
      <linearGradient id="goCrBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#1a0e00"/><stop offset="100%" stopColor="#0d0800"/></linearGradient>
      <linearGradient id="goCrGold" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#fffde7"/><stop offset="30%" stopColor="#ffe066"/><stop offset="70%" stopColor="#f5a623"/><stop offset="100%" stopColor="#c77d00"/></linearGradient>
      <linearGradient id="goCrGold2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#ffe566"/><stop offset="100%" stopColor="#b86000"/></linearGradient>
      <filter id="goCrGl"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f5c400" floodOpacity=".9"/></filter>
      <filter id="goCrGem"><feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#e040fb" floodOpacity=".9"/></filter>
    </defs>
    <rect x="2" y="2" width="48" height="48" rx="10" fill="url(#goCrBg)" stroke="rgba(245,196,0,.7)" strokeWidth="1.8"/>
    {/* Crown base band */}
    <rect x="9" y="34" width="34" height="9" rx="2.5" fill="url(#goCrGold)" filter="url(#goCrGl)"/>
    <rect x="11" y="35.5" width="30" height="6" rx="1.5" fill="none" stroke="rgba(255,240,180,.4)" strokeWidth=".7"/>
    {/* Crown body */}
    <path d="M9,34 L9,24 L16,30 L26,16 L36,30 L43,24 L43,34 Z" fill="url(#goCrGold)" filter="url(#goCrGl)"/>
    <path d="M9,34 L9,24 L16,30 L26,16 L36,30 L43,24 L43,34 Z" fill="none" stroke="rgba(255,240,180,.35)" strokeWidth=".8"/>
    {/* Crown peak gems */}
    <circle cx="26" cy="15" r="3.5" fill="#e040fb" filter="url(#goCrGem)" opacity=".95"/>
    <circle cx="26" cy="15" r="2" fill="#f8a8ff" opacity=".8"/>
    <circle cx="9" cy="23" r="2.5" fill="#c084fc" filter="url(#goCrGem)" opacity=".85"/>
    <circle cx="43" cy="23" r="2.5" fill="#c084fc" filter="url(#goCrGem)" opacity=".85"/>
    {/* Band gems */}
    <circle cx="18" cy="38.5" r="2.8" fill="#e040fb" filter="url(#goCrGem)" opacity=".9"/>
    <circle cx="26" cy="38.5" r="2.8" fill="#60a5fa" filter="url(#goCrGem)" opacity=".9"/>
    <circle cx="34" cy="38.5" r="2.8" fill="#e040fb" filter="url(#goCrGem)" opacity=".9"/>
    {/* Shine */}
    <path d="M11,26 Q14,22 17,25" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
));
const GoHglassSym=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="88%" height="88%">
    <defs>
      <linearGradient id="goHgBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#060515"/><stop offset="100%" stopColor="#0a0820"/></linearGradient>
      <linearGradient id="goHgFrame" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#fffde7"/><stop offset="40%" stopColor="#ffe066"/><stop offset="100%" stopColor="#b86000"/></linearGradient>
      <linearGradient id="goHgSand" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#00e5ff"/><stop offset="100%" stopColor="#0077b6"/></linearGradient>
      <filter id="goHgGl"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00d4ff" floodOpacity=".8"/></filter>
      <filter id="goHgFrGl"><feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#ffe066" floodOpacity=".7"/></filter>
    </defs>
    <rect x="2" y="2" width="48" height="48" rx="10" fill="url(#goHgBg)" stroke="rgba(0,200,255,.55)" strokeWidth="1.6"/>
    {/* Top/bottom caps */}
    <rect x="10" y="8" width="32" height="5" rx="2" fill="url(#goHgFrame)" filter="url(#goHgFrGl)"/>
    <rect x="10" y="39" width="32" height="5" rx="2" fill="url(#goHgFrame)" filter="url(#goHgFrGl)"/>
    {/* Hourglass shape upper */}
    <path d="M12,13 Q26,26 40,13" fill="url(#goHgSand)" filter="url(#goHgGl)" opacity=".9"/>
    {/* Sand upper half */}
    <path d="M13,13 L24,24 L28,24 L39,13 Z" fill="url(#goHgSand)" opacity=".7"/>
    {/* Waist */}
    <rect x="23.5" y="24" width="5" height="4" rx="1" fill="url(#goHgSand)" filter="url(#goHgGl)"/>
    {/* Sand lower half (filled ~60%) */}
    <path d="M14,39 Q26,30 38,39 Z" fill="url(#goHgSand)" opacity=".85"/>
    {/* Hourglass frame outline */}
    <path d="M12,13 L26,26.5 L40,13" fill="none" stroke="url(#goHgFrame)" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M12,39 L26,26.5 L40,39" fill="none" stroke="url(#goHgFrame)" strokeWidth="2" strokeLinejoin="round"/>
    {/* Gems on caps */}
    <circle cx="26" cy="10.5" r="2.2" fill="#00e5ff" filter="url(#goHgGl)" opacity=".95"/>
    <circle cx="26" cy="41.5" r="2.2" fill="#00e5ff" filter="url(#goHgGl)" opacity=".95"/>
    {/* Shine */}
    <path d="M15,15 Q18,13 20,16" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
));
const GoRingSym=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="88%" height="88%">
    <defs>
      <linearGradient id="goRnBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#04100a"/><stop offset="100%" stopColor="#021208"/></linearGradient>
      <linearGradient id="goRnGold" x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stopColor="#fffde7"/><stop offset="35%" stopColor="#ffe566"/><stop offset="70%" stopColor="#f5a623"/><stop offset="100%" stopColor="#8b5e00"/></linearGradient>
      <linearGradient id="goRnGem" x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stopColor="#a7f3d0"/><stop offset="50%" stopColor="#34d399"/><stop offset="100%" stopColor="#064e3b"/></linearGradient>
      <filter id="goRnGl"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f5c400" floodOpacity=".8"/></filter>
      <filter id="goRnGemGl"><feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#34d399" floodOpacity=".9"/></filter>
    </defs>
    <rect x="2" y="2" width="48" height="48" rx="10" fill="url(#goRnBg)" stroke="rgba(52,211,153,.5)" strokeWidth="1.6"/>
    {/* Ring band */}
    <circle cx="26" cy="30" r="13" fill="none" stroke="url(#goRnGold)" strokeWidth="6" filter="url(#goRnGl)"/>
    <circle cx="26" cy="30" r="13" fill="none" stroke="rgba(255,240,180,.25)" strokeWidth="1.5"/>
    {/* Gem setting */}
    <polygon points="26,8 32,15 26,22 20,15" fill="url(#goRnGold)" filter="url(#goRnGl)"/>
    {/* Main gem */}
    <polygon points="26,10 31,15.5 26,20.5 21,15.5" fill="url(#goRnGem)" filter="url(#goRnGemGl)" opacity=".97"/>
    <polygon points="26,10 31,15.5 26,20.5 21,15.5" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth=".7"/>
    {/* Gem facets */}
    <line x1="26" y1="10" x2="26" y2="20.5" stroke="rgba(255,255,255,.2)" strokeWidth=".6"/>
    <line x1="21" y1="15.5" x2="31" y2="15.5" stroke="rgba(255,255,255,.2)" strokeWidth=".6"/>
    {/* Gem highlight */}
    <ellipse cx="24" cy="13" rx="2.5" ry="1.5" fill="rgba(255,255,255,.5)" transform="rotate(-20,24,13)"/>
    {/* Band shine */}
    <path d="M16,24 Q14,30 17,36" fill="none" stroke="rgba(255,240,150,.4)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
));
const GoChaliceSym=React.memo(()=>(
  <svg viewBox="0 0 52 52" width="88%" height="88%">
    <defs>
      <linearGradient id="goChBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#0d0220"/><stop offset="100%" stopColor="#060114"/></linearGradient>
      <linearGradient id="goChGold" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#fffde7"/><stop offset="30%" stopColor="#ffe566"/><stop offset="70%" stopColor="#f5a623"/><stop offset="100%" stopColor="#8b5200"/></linearGradient>
      <linearGradient id="goChPurp" x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stopColor="#f0abfc"/><stop offset="50%" stopColor="#c026d3"/><stop offset="100%" stopColor="#4a044e"/></linearGradient>
      <filter id="goChGl"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f5c400" floodOpacity=".8"/></filter>
      <filter id="goChPGl"><feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#e040fb" floodOpacity=".8"/></filter>
    </defs>
    <rect x="2" y="2" width="48" height="48" rx="10" fill="url(#goChBg)" stroke="rgba(192,132,252,.55)" strokeWidth="1.6"/>
    {/* Base */}
    <rect x="14" y="42" width="24" height="4" rx="2" fill="url(#goChGold)" filter="url(#goChGl)"/>
    {/* Stem */}
    <rect x="23.5" y="32" width="5" height="11" rx="1.5" fill="url(#goChGold)" filter="url(#goChGl)"/>
    <ellipse cx="26" cy="33" rx="4.5" ry="2.5" fill="url(#goChGold)" filter="url(#goChGl)"/>
    {/* Cup */}
    <path d="M13,12 Q10,24 15,32 Q20,36 26,36 Q32,36 37,32 Q42,24 39,12 Z" fill="url(#goChGold)" filter="url(#goChGl)"/>
    {/* Wine/liquid inside */}
    <path d="M16,17 Q14,26 17,32 Q21,35 26,35 Q31,35 35,32 Q38,26 36,17 Z" fill="url(#goChPurp)" filter="url(#goChPGl)" opacity=".9"/>
    {/* Rim highlight */}
    <path d="M13,12 Q26,8 39,12" fill="none" stroke="rgba(255,240,180,.5)" strokeWidth="2" strokeLinecap="round"/>
    {/* Cup shine */}
    <path d="M15,15 Q14,22 16,27" fill="none" stroke="rgba(255,240,180,.5)" strokeWidth="1.4" strokeLinecap="round"/>
    {/* Side gems */}
    <circle cx="20" cy="22" r="2.2" fill="#e040fb" filter="url(#goChPGl)" opacity=".85"/>
    <circle cx="32" cy="22" r="2.2" fill="#e040fb" filter="url(#goChPGl)" opacity=".85"/>
  </svg>
));
const GoHighSym=({sym})=>{
  if(sym==="crown")return <GoCrownSym/>;
  if(sym==="hglass")return <GoHglassSym/>;
  if(sym==="ring")return <GoRingSym/>;
  if(sym==="chalice")return <GoChaliceSym/>;
  return <GoCrownSym/>;
};
/* ── Gem symbols — detailed faceted art matching real GOO paytable ── */
const GoGemSym=({sym})=>{
  const gid=`goGem${sym}`;
  // Ruby: red pentagon — matches GOO reference (hexagonal red gem)
  if(sym==="ruby") return(
    <svg viewBox="0 0 52 52" width="88%" height="88%">
      <defs>
        <radialGradient id={`${gid}bg`} cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#4a0010"/><stop offset="100%" stopColor="#1a0006"/></radialGradient>
        <linearGradient id={`${gid}g`} x1="15%" y1="0%" x2="85%" y2="100%"><stop offset="0%" stopColor="#ffd0d8"/><stop offset="25%" stopColor="#ff4d6a"/><stop offset="60%" stopColor="#cc0020"/><stop offset="100%" stopColor="#7f0010"/></linearGradient>
        <linearGradient id={`${gid}g2`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ff8099"/><stop offset="100%" stopColor="#990018"/></linearGradient>
        <filter id={`${gid}gl`}><feGaussianBlur stdDeviation="5" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
        <filter id={`${gid}glow`}><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ff2244" floodOpacity=".9"/></filter>
        <filter id={`${gid}inner`}><feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#ff6080" floodOpacity=".6"/></filter>
      </defs>
      {/* Card bg with red tint */}
      <rect x="1" y="1" width="50" height="50" rx="10" fill={`url(#${gid}bg)`}/>
      <rect x="1" y="1" width="50" height="50" rx="10" fill="none" stroke="rgba(255,60,90,.6)" strokeWidth="1.8"/>
      {/* Outer glow halo */}
      <polygon points="26,6 43,17 43,35 26,46 9,35 9,17" fill="rgba(220,0,40,.18)" filter={`url(#${gid}gl)`}/>
      {/* Main gem — hexagon */}
      <polygon points="26,7 43,17 43,35 26,45 9,35 9,17" fill={`url(#${gid}g)`} filter={`url(#${gid}glow)`}/>
      {/* Dark outline */}
      <polygon points="26,7 43,17 43,35 26,45 9,35 9,17" fill="none" stroke="rgba(255,180,190,.35)" strokeWidth=".8"/>
      {/* Top facet (light) */}
      <polygon points="26,7 43,17 36,26 16,26 9,17" fill="rgba(255,160,175,.22)"/>
      {/* Bottom facet (dark) */}
      <polygon points="16,26 36,26 43,35 26,45 9,35" fill="rgba(0,0,0,.28)"/>
      {/* Left facet */}
      <polygon points="9,17 16,26 9,35" fill="rgba(0,0,0,.18)"/>
      {/* Right facet */}
      <polygon points="43,17 43,35 36,26" fill="rgba(255,100,120,.2)"/>
      {/* Center dividing line */}
      <line x1="16" y1="26" x2="36" y2="26" stroke="rgba(255,255,255,.18)" strokeWidth=".7"/>
      <line x1="26" y1="7" x2="26" y2="45" stroke="rgba(255,255,255,.1)" strokeWidth=".6"/>
      {/* Top highlight */}
      <ellipse cx="23" cy="15" rx="7" ry="4" fill="rgba(255,255,255,.38)" transform="rotate(-20,23,15)"/>
      <ellipse cx="22" cy="14" rx="3" ry="1.8" fill="rgba(255,255,255,.65)" transform="rotate(-20,22,14)"/>
      {/* Inner star sparkle */}
      <circle cx="26" cy="26" r="2.5" fill="rgba(255,200,210,.5)"/>
    </svg>
  );
  // Amethyst: upward triangle — matches GOO reference (pink/magenta triangle)
  if(sym==="amethyst") return(
    <svg viewBox="0 0 52 52" width="88%" height="88%">
      <defs>
        <radialGradient id={`${gid}bg`} cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#2d0045"/><stop offset="100%" stopColor="#120018"/></radialGradient>
        <linearGradient id={`${gid}g`} x1="15%" y1="0%" x2="85%" y2="100%"><stop offset="0%" stopColor="#ffd6ff"/><stop offset="25%" stopColor="#e040fb"/><stop offset="65%" stopColor="#9c00cc"/><stop offset="100%" stopColor="#4a0060"/></linearGradient>
        <filter id={`${gid}glow`}><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#dd00ff" floodOpacity=".9"/></filter>
        <filter id={`${gid}gl`}><feGaussianBlur stdDeviation="6"/></filter>
      </defs>
      <rect x="1" y="1" width="50" height="50" rx="10" fill={`url(#${gid}bg)`}/>
      <rect x="1" y="1" width="50" height="50" rx="10" fill="none" stroke="rgba(220,50,255,.6)" strokeWidth="1.8"/>
      {/* Glow halo */}
      <polygon points="26,5 47,44 5,44" fill="rgba(180,0,220,.2)" filter={`url(#${gid}gl)`}/>
      {/* Main gem */}
      <polygon points="26,6 46,44 6,44" fill={`url(#${gid}g)`} filter={`url(#${gid}glow)`}/>
      <polygon points="26,6 46,44 6,44" fill="none" stroke="rgba(255,180,255,.3)" strokeWidth=".8"/>
      {/* Left face (darker) */}
      <polygon points="26,6 6,44 26,28" fill="rgba(0,0,0,.22)"/>
      {/* Right face (lighter) */}
      <polygon points="26,6 46,44 26,28" fill="rgba(255,150,255,.15)"/>
      {/* Bottom girdle */}
      <polygon points="6,44 46,44 26,28" fill="rgba(0,0,0,.3)"/>
      {/* Facet lines */}
      <line x1="26" y1="6" x2="26" y2="44" stroke="rgba(255,255,255,.15)" strokeWidth=".7"/>
      <line x1="6" y1="44" x2="46" y2="44" stroke="rgba(255,255,255,.18)" strokeWidth=".7"/>
      <line x1="26" y1="6" x2="16" y2="36" stroke="rgba(255,200,255,.12)" strokeWidth=".5"/>
      <line x1="26" y1="6" x2="36" y2="36" stroke="rgba(255,200,255,.12)" strokeWidth=".5"/>
      {/* Highlight */}
      <ellipse cx="24" cy="18" rx="6" ry="3.5" fill="rgba(255,255,255,.4)" transform="rotate(-15,24,18)"/>
      <ellipse cx="23" cy="17" rx="2.5" ry="1.5" fill="rgba(255,255,255,.7)" transform="rotate(-15,23,17)"/>
      <circle cx="26" cy="30" r="2" fill="rgba(255,200,255,.45)"/>
    </svg>
  );
  // Topaz: octagon — matches GOO reference (golden octagon gem)
  if(sym==="topaz") return(
    <svg viewBox="0 0 52 52" width="88%" height="88%">
      <defs>
        <radialGradient id={`${gid}bg`} cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#3a2000"/><stop offset="100%" stopColor="#1a0e00"/></radialGradient>
        <linearGradient id={`${gid}g`} x1="15%" y1="0%" x2="85%" y2="100%"><stop offset="0%" stopColor="#fffde7"/><stop offset="25%" stopColor="#ffe066"/><stop offset="60%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#92400e"/></linearGradient>
        <filter id={`${gid}glow`}><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#f5c400" floodOpacity=".9"/></filter>
        <filter id={`${gid}gl`}><feGaussianBlur stdDeviation="6"/></filter>
      </defs>
      <rect x="1" y="1" width="50" height="50" rx="10" fill={`url(#${gid}bg)`}/>
      <rect x="1" y="1" width="50" height="50" rx="10" fill="none" stroke="rgba(245,180,30,.6)" strokeWidth="1.8"/>
      {/* Glow halo */}
      <polygon points="18,5 34,5 46,17 46,35 34,47 18,47 6,35 6,17" fill="rgba(200,140,0,.2)" filter={`url(#${gid}gl)`}/>
      {/* Main gem — octagon */}
      <polygon points="18,6 34,6 45,17 45,35 34,46 18,46 7,35 7,17" fill={`url(#${gid}g)`} filter={`url(#${gid}glow)`}/>
      <polygon points="18,6 34,6 45,17 45,35 34,46 18,46 7,35 7,17" fill="none" stroke="rgba(255,240,150,.35)" strokeWidth=".8"/>
      {/* Top crown facets */}
      <polygon points="18,6 34,6 40,13 26,17 12,13" fill="rgba(255,255,255,.22)"/>
      {/* Bottom pavilion */}
      <polygon points="12,39 40,39 34,46 18,46" fill="rgba(0,0,0,.3)"/>
      {/* Left side */}
      <polygon points="7,17 12,13 12,39 7,35" fill="rgba(0,0,0,.18)"/>
      {/* Right side */}
      <polygon points="45,17 40,13 40,39 45,35" fill="rgba(255,220,100,.18)"/>
      {/* Table facet lines */}
      <polygon points="12,13 40,13 40,39 12,39" fill="rgba(255,200,50,.08)"/>
      <line x1="26" y1="6" x2="26" y2="46" stroke="rgba(255,255,255,.12)" strokeWidth=".6"/>
      <line x1="7" y1="26" x2="45" y2="26" stroke="rgba(255,255,255,.12)" strokeWidth=".6"/>
      <line x1="12" y1="13" x2="40" y2="39" stroke="rgba(255,255,255,.08)" strokeWidth=".5"/>
      <line x1="40" y1="13" x2="12" y2="39" stroke="rgba(255,255,255,.08)" strokeWidth=".5"/>
      {/* Highlight */}
      <ellipse cx="22" cy="17" rx="8" ry="4.5" fill="rgba(255,255,255,.4)" transform="rotate(-15,22,17)"/>
      <ellipse cx="21" cy="16" rx="3.5" ry="2" fill="rgba(255,255,255,.7)" transform="rotate(-15,21,16)"/>
      <circle cx="26" cy="26" r="2.8" fill="rgba(255,240,180,.4)"/>
    </svg>
  );
  // Emerald: upward triangle — matches GOO reference (bright green triangle)
  if(sym==="emerald") return(
    <svg viewBox="0 0 52 52" width="88%" height="88%">
      <defs>
        <radialGradient id={`${gid}bg`} cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#003018"/><stop offset="100%" stopColor="#001208"/></radialGradient>
        <linearGradient id={`${gid}g`} x1="15%" y1="0%" x2="85%" y2="100%"><stop offset="0%" stopColor="#d1fae5"/><stop offset="25%" stopColor="#34d399"/><stop offset="60%" stopColor="#059669"/><stop offset="100%" stopColor="#064e3b"/></linearGradient>
        <filter id={`${gid}glow`}><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00e890" floodOpacity=".9"/></filter>
        <filter id={`${gid}gl`}><feGaussianBlur stdDeviation="6"/></filter>
      </defs>
      <rect x="1" y="1" width="50" height="50" rx="10" fill={`url(#${gid}bg)`}/>
      <rect x="1" y="1" width="50" height="50" rx="10" fill="none" stroke="rgba(52,211,120,.6)" strokeWidth="1.8"/>
      {/* Glow halo */}
      <polygon points="26,5 47,43 5,43" fill="rgba(0,180,100,.2)" filter={`url(#${gid}gl)`}/>
      {/* Main gem — triangle */}
      <polygon points="26,6 46,43 6,43" fill={`url(#${gid}g)`} filter={`url(#${gid}glow)`}/>
      <polygon points="26,6 46,43 6,43" fill="none" stroke="rgba(180,255,200,.3)" strokeWidth=".8"/>
      {/* Left face (darker) */}
      <polygon points="26,6 6,43 26,28" fill="rgba(0,0,0,.2)"/>
      {/* Right face (lighter) */}
      <polygon points="26,6 46,43 26,28" fill="rgba(100,255,160,.15)"/>
      {/* Bottom */}
      <polygon points="6,43 46,43 26,28" fill="rgba(0,0,0,.28)"/>
      {/* Facet lines */}
      <line x1="26" y1="6" x2="26" y2="43" stroke="rgba(255,255,255,.15)" strokeWidth=".7"/>
      <line x1="6" y1="43" x2="46" y2="43" stroke="rgba(255,255,255,.18)" strokeWidth=".7"/>
      <line x1="26" y1="6" x2="16" y2="36" stroke="rgba(180,255,200,.12)" strokeWidth=".5"/>
      <line x1="26" y1="6" x2="36" y2="36" stroke="rgba(180,255,200,.12)" strokeWidth=".5"/>
      {/* Highlight */}
      <ellipse cx="24" cy="18" rx="6" ry="3.5" fill="rgba(255,255,255,.42)" transform="rotate(-15,24,18)"/>
      <ellipse cx="23" cy="17" rx="2.5" ry="1.5" fill="rgba(255,255,255,.72)" transform="rotate(-15,23,17)"/>
      <circle cx="26" cy="30" r="2" fill="rgba(180,255,210,.45)"/>
    </svg>
  );
  // Sapphire: diamond/rhombus — matches GOO reference (cyan-blue diamond)
  return(
    <svg viewBox="0 0 52 52" width="88%" height="88%">
      <defs>
        <radialGradient id={`${gid}bg`} cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#001535"/><stop offset="100%" stopColor="#000818"/></radialGradient>
        <linearGradient id={`${gid}g`} x1="15%" y1="0%" x2="85%" y2="100%"><stop offset="0%" stopColor="#e0f2fe"/><stop offset="25%" stopColor="#38bdf8"/><stop offset="60%" stopColor="#0284c7"/><stop offset="100%" stopColor="#0c4a6e"/></linearGradient>
        <filter id={`${gid}glow`}><feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00aaff" floodOpacity=".9"/></filter>
        <filter id={`${gid}gl`}><feGaussianBlur stdDeviation="6"/></filter>
      </defs>
      <rect x="1" y="1" width="50" height="50" rx="10" fill={`url(#${gid}bg)`}/>
      <rect x="1" y="1" width="50" height="50" rx="10" fill="none" stroke="rgba(56,190,240,.6)" strokeWidth="1.8"/>
      {/* Glow halo */}
      <polygon points="26,5 47,26 26,47 5,26" fill="rgba(0,150,220,.2)" filter={`url(#${gid}gl)`}/>
      {/* Main gem — diamond */}
      <polygon points="26,6 46,26 26,46 6,26" fill={`url(#${gid}g)`} filter={`url(#${gid}glow)`}/>
      <polygon points="26,6 46,26 26,46 6,26" fill="none" stroke="rgba(180,230,255,.3)" strokeWidth=".8"/>
      {/* Top facet (bright) */}
      <polygon points="26,6 46,26 26,26" fill="rgba(255,255,255,.18)"/>
      {/* Bottom facet (dark) */}
      <polygon points="6,26 26,26 26,46" fill="rgba(0,0,0,.28)"/>
      {/* Left facet */}
      <polygon points="26,6 6,26 26,26" fill="rgba(0,0,0,.15)"/>
      {/* Right facet */}
      <polygon points="46,26 26,26 26,46" fill="rgba(100,200,255,.12)"/>
      {/* Facet lines */}
      <line x1="26" y1="6" x2="26" y2="46" stroke="rgba(255,255,255,.18)" strokeWidth=".8"/>
      <line x1="6" y1="26" x2="46" y2="26" stroke="rgba(255,255,255,.18)" strokeWidth=".8"/>
      <line x1="26" y1="6" x2="6" y2="26" stroke="rgba(180,230,255,.1)" strokeWidth=".5"/>
      <line x1="26" y1="6" x2="46" y2="26" stroke="rgba(180,230,255,.1)" strokeWidth=".5"/>
      {/* Highlight */}
      <ellipse cx="22" cy="17" rx="6.5" ry="3.5" fill="rgba(255,255,255,.42)" transform="rotate(-30,22,17)"/>
      <ellipse cx="21" cy="16" rx="2.8" ry="1.5" fill="rgba(255,255,255,.72)" transform="rotate(-30,21,16)"/>
      <circle cx="26" cy="26" r="2.5" fill="rgba(180,230,255,.45)"/>
    </svg>
  );
};

/* ── PNG symbol renderer — uses custom uploaded images ── */
const GoPngSym=({src,alt})=>(
  <img src={src} alt={alt}
    style={{width:"92%",height:"92%",objectFit:"contain",imageRendering:"auto"}}
    draggable={false}/>
);

const GO_SYM_RENDER={
  crown:  ()=><GoPngSym src={IMG_CROWN}     alt="crown"/>,
  hglass: ()=><GoPngSym src={IMG_HOURGLASS} alt="hourglass"/>,
  ring:   ()=><GoPngSym src={IMG_RING}      alt="ring"/>,
  chalice:()=><GoPngSym src={IMG_KALICH}    alt="chalice"/>,
  ruby:   ()=><GoPngSym src={IMG_RED_G}     alt="ruby"/>,
  amethyst:()=><GoPngSym src={IMG_PURPLE_G} alt="amethyst"/>,
  topaz:  ()=><GoPngSym src={IMG_YELLOW_G}  alt="topaz"/>,
  emerald:()=><GoPngSym src={IMG_GREEN_G}   alt="emerald"/>,
  sapphire:()=><GoPngSym src={IMG_BLUE_G}   alt="sapphire"/>,
  scatter:()=><GoPngSym src={IMG_SCATTER}   alt="scatter"/>,
  bolt:(val)=><GoBoltSym val={val}/>,
};

/* ── Gates of Olympus Big Win Overlay ── */
const GO_BW_CSS=`
@keyframes goBwFlash{0%{opacity:1}100%{opacity:0}}
@keyframes goBwBgIn{0%{opacity:0;transform:scale(1.12)}100%{opacity:1;transform:scale(1)}}
@keyframes goBwRays{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes goBwRaysRev{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
@keyframes goBwTitleIn{0%{opacity:0;transform:scale(.15) translateY(40px);filter:blur(18px)}55%{opacity:1;transform:scale(1.12) translateY(-6px);filter:blur(0)}75%{transform:scale(.96) translateY(2px)}100%{transform:scale(1) translateY(0)}}
@keyframes goBwTitleGlow{0%,100%{text-shadow:inherit}50%{filter:brightness(1.35)}}
@keyframes goBwCountIn{0%{opacity:0;transform:scale(.2) translateY(30px)}55%{transform:scale(1.07) translateY(-4px);opacity:1}80%{transform:scale(.97)}100%{transform:scale(1) translateY(0);opacity:1}}
@keyframes goBwCountPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}
@keyframes goBwSubIn{0%{opacity:0;transform:translateY(12px) scale(.8)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes goBwRing{0%{transform:translate(-50%,-50%) scale(.3);opacity:.9}100%{transform:translate(-50%,-50%) scale(2.8);opacity:0}}
@keyframes goBwRing2{0%{transform:translate(-50%,-50%) scale(.1);opacity:1}100%{transform:translate(-50%,-50%) scale(3.5);opacity:0}}
@keyframes goBwParticle{0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:1}100%{transform:translate(var(--px),var(--py)) rotate(var(--pr)) scale(0);opacity:0}}
@keyframes goBwStar{0%,100%{transform:scale(1) rotate(0deg);opacity:.8}50%{transform:scale(1.4) rotate(180deg);opacity:1}}
@keyframes goBwLightning{0%,100%{opacity:0}20%,80%{opacity:1}40%{opacity:.5}60%{opacity:.9}}
@keyframes goBwBolt{0%{stroke-dashoffset:400;opacity:0}30%{opacity:1}100%{stroke-dashoffset:0;opacity:.7}}
@keyframes goBwOrb{0%{transform:translate(-50%,-50%) scale(0);opacity:0}30%{opacity:.7}100%{transform:translate(-50%,-50%) scale(1);opacity:.2}}
@keyframes goBwPillar{0%{transform:scaleY(0) translateX(-50%);opacity:0}40%{opacity:.9}100%{transform:scaleY(1) translateX(-50%);opacity:.25}}
@keyframes goBwShake{0%,100%{transform:translateX(0)}15%{transform:translateX(-7px)}30%{transform:translateX(7px)}45%{transform:translateX(-4px)}60%{transform:translateX(4px)}75%{transform:translateX(-2px)}}
@keyframes goBwHint{0%,100%{opacity:.25}50%{opacity:.55}}
@keyframes goBwOut{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.08)}}
@keyframes goBwSparkle{0%{transform:scale(0) rotate(0deg);opacity:1}100%{transform:scale(1) rotate(120deg);opacity:0}}
@keyframes goBwFloatUp{0%{opacity:0;transform:translateY(0) scale(.6)}20%{opacity:1}100%{opacity:0;transform:translateY(-120px) scale(1.2)}}
`;

const _bwRng=(seed)=>{let s=seed^0xabcdef;return()=>{s^=s<<13;s^=s>>7;s^=s<<5;return(s>>>0)/4294967296;};};
const _bwR=_bwRng(42);
const GO_BW_PARTICLES=Array.from({length:110},(_,i)=>{
  const angle=_bwR()*Math.PI*2;
  const dist=80+_bwR()*220;
  return{
    id:i,
    x:50+Math.cos(angle)*dist*0.6,
    y:50+Math.sin(angle)*dist*0.4,
    px:`${(Math.cos(angle)*dist*(0.8+_bwR()*0.8)).toFixed(0)}px`,
    py:`${(Math.sin(angle)*dist*(0.8+_bwR()*0.8)-30).toFixed(0)}px`,
    pr:`${((_bwR()-.5)*720).toFixed(0)}deg`,
    size:3+_bwR()*8,
    dur:.9+_bwR()*1.8,
    del:_bwR()*2.2,
    color:["#ffe066","#c4b5fd","#f0abfc","#34d399","#f5c400","#a78bfa","#60a5fa","#ff6b6b","#fff","#ffd700"][i%10],
    shape:i%5===0?"diamond":i%5===1?"circle":i%5===2?"square":"star",
  };
});

const STARS_BW=Array.from({length:28},(_,i)=>({id:i,x:_bwR()*100,y:_bwR()*80,s:.5+_bwR()*.9,dur:1.2+_bwR()*2,del:_bwR()*3}));
const FLOATERS_BW=Array.from({length:18},(_,i)=>({id:i,x:_bwR()*100,sym:["⚡","✨","💎","⭐","🔥"][i%5],del:_bwR()*3,dur:2+_bwR()*2}));

function GoBigWinLightning({color,opacity=.7}){
  return(
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1}} viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
      {[[80,0,60,120,100,140,45,280,90,290,20,420],[720,0,740,110,700,130,755,270,710,285,780,400]].map(([x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6],i)=>(
        <polyline key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4} ${x5},${y5} ${x6},${y6}`} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={{strokeDasharray:400,animation:`goBwBolt 1.2s ${i*.1}s ease both`,opacity}}/>
      ))}
      <polyline points="400,0 420,80 390,95 430,180 405,195 440,290" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" style={{strokeDasharray:400,animation:"goBwBolt 1s 0s ease both",opacity:opacity*.9}}/>
      {[[150,50],[650,60],[220,200],[580,180],[100,300],[700,280]].map(([x,y],i)=>(
        <g key={i} style={{animation:`goBwLightning ${.8+i*.3}s ${i*.2}s ease-in-out infinite`,opacity}}>
          <line x1={x} y1={y} x2={x+14} y2={y+9} stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
          <line x1={x+14} y1={y+9} x2={x+6} y2={y+22} stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        </g>
      ))}
    </svg>
  );
}

// ── New cinematic Big Win CSS ──
const GO_BW_EPIC_CSS=`
@keyframes goBwEpicBgIn{0%{opacity:0}100%{opacity:1}}
@keyframes goBwEpicFlash{0%{opacity:1}100%{opacity:0}}
@keyframes goBwEpicTitleReveal{
  0%  {opacity:0;transform:translateY(-60px) scale(.5);filter:blur(24px);}
  45% {opacity:1;transform:translateY(8px) scale(1.08);filter:blur(0);}
  65% {transform:translateY(-4px) scale(.97);}
  80% {transform:translateY(2px) scale(1.01);}
  100%{transform:translateY(0) scale(1);}
}
@keyframes goBwEpicCountIn{
  0%  {opacity:0;transform:scale(.18);filter:blur(20px);}
  55% {opacity:1;transform:scale(1.1);filter:blur(0);}
  75% {transform:scale(.96);}
  100%{transform:scale(1);}
}
@keyframes goBwEpicPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
@keyframes goBwEpicShake{0%,100%{transform:translateX(0)}15%{transform:translateX(-8px)}30%{transform:translateX(8px)}45%{transform:translateX(-4px)}60%{transform:translateX(4px)}}
@keyframes goBwEpicOut{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.1)}}
@keyframes goBwEpicRays{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes goBwEpicRaysRev{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
@keyframes goBwEpicRing{0%{transform:translate(-50%,-50%) scale(.2);opacity:1}100%{transform:translate(-50%,-50%) scale(3.2);opacity:0}}
@keyframes goBwEpicCoin{
  0%  {transform:translateY(-120px) rotate(0deg) scale(0);opacity:1;}
  60% {opacity:1;}
  100%{transform:translateY(var(--cy,400px)) rotate(var(--cr,360deg)) scale(var(--cs,1));opacity:0;}
}
@keyframes goBwEpicStar{0%,100%{transform:scale(1) rotate(0deg);opacity:.7}50%{transform:scale(1.6) rotate(180deg);opacity:1}}
@keyframes goBwEpicFloat{0%{opacity:0;transform:translateY(0)}20%{opacity:1}100%{opacity:0;transform:translateY(-150px) scale(.6)}}
@keyframes goBwEpicShimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}
@keyframes goBwEpicPillar{0%{transform:scaleY(0);opacity:0}30%{opacity:.8}100%{transform:scaleY(1);opacity:.18}}
@keyframes goBwEpicHint{0%,100%{opacity:.2}50%{opacity:.5}}
@keyframes goBwEpicBoltCorner{0%,85%,100%{opacity:.3;transform:scale(1)}40%,55%{opacity:1;transform:scale(1.25)}}
@keyframes goBwEpicLaurel{0%,100%{transform:rotate(-3deg) scale(1)}50%{transform:rotate(3deg) scale(1.04)}}
@keyframes goBwEpicGlowPulse{0%,100%{opacity:.55}50%{opacity:1}}
`;

// Precomputed coin positions (deterministic)
const _coinRng=(()=>{let s=0xdeadcafe;return()=>{s^=s<<13;s^=s>>17;s^=s<<5;return(s>>>0)/4294967296;}})();
const GO_BW_COINS=Array.from({length:40},(_,i)=>({
  id:i,
  x:2+_coinRng()*96,
  del:_coinRng()*3.5,
  dur:.9+_coinRng()*2.2,
  cy:200+_coinRng()*350,
  cr:(_coinRng()-.5)*720,
  cs:.4+_coinRng()*.8,
  size:.55+_coinRng()*.65,
  color:["#f5c400","#ffe066","#c8a000","#fff8c0","#ffd700"][Math.floor(_coinRng()*5)],
}));
const GO_BW_STARS=Array.from({length:30},(_,i)=>({
  id:i,x:_coinRng()*100,y:_coinRng()*85,
  s:.5+_coinRng()*.9,dur:1.2+_coinRng()*2.2,del:_coinRng()*3,
}));
const GO_BW_FLOATERS=Array.from({length:16},(_,i)=>({
  id:i,x:_coinRng()*100,sym:["⚡","✨","⭐","💫","🌟","⚡","✨","💎"][i%8],
  del:_coinRng()*3.5,dur:1.8+_coinRng()*2.2,
}));

function GoBigWinOverlay({mult,target,bet,onDone}){
  const [displayed,setDisplayed]=useState(0);
  const [phase,setPhase]=useState("flash"); // flash|enter|shake|count|pulse|out

  // Tier thresholds
  const tier=mult>=500?"divine":mult>=200?"epic":mult>=100?"mega":mult>=50?"super":"big";
  const label=tier==="divine"?"⚡ DIVINE WIN ⚡":tier==="epic"?"⚡ EPIC WIN ⚡":tier==="mega"?"⚡ MEGA WIN ⚡":tier==="super"?"🏆 SUPER WIN!":"⭐ BIG WIN!";

  // Color palette per tier
  const pal={
    divine:{main:"#fff8c0",glow:"255,248,192",bg:"rgba(60,40,0,.99)",ray:"245,196,0",accent:"#f5c400"},
    epic:  {main:"#ff8c42",glow:"255,140,66",bg:"rgba(55,12,0,.99)",ray:"255,120,50",accent:"#ff6b35"},
    mega:  {main:"#ff5555",glow:"255,85,85",bg:"rgba(45,2,2,.99)",ray:"255,80,80",accent:"#ff4444"},
    super: {main:"#ffe066",glow:"245,196,0",bg:"rgba(40,22,0,.99)",ray:"245,196,0",accent:"#f5c400"},
    big:   {main:"#c4b5fd",glow:"160,120,255",bg:"rgba(18,6,60,.99)",ray:"150,100,255",accent:"#a78bfa"},
  }[tier];

  // Phase sequence
  useEffect(()=>{
    const t1=setTimeout(()=>setPhase("enter"),160);
    const t2=setTimeout(()=>setPhase("shake"),820);
    const t3=setTimeout(()=>setPhase("count"),1050);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[]);

  // Counting animation
  useEffect(()=>{
    if(phase!=="count")return;
    const dur=tier==="divine"?3200:tier==="epic"?2800:tier==="mega"?2600:2400;
    const steps=110;const interval=dur/steps;let step=0;
    const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    const timer=setInterval(()=>{
      step++;
      const p=ease(Math.min(step/steps,1));
      setDisplayed(+(target*p).toFixed(2));
      if(step>=steps){
        clearInterval(timer);setDisplayed(target);setPhase("pulse");
        setTimeout(()=>setPhase("out"),tier==="divine"?4500:tier==="epic"?3800:tier==="mega"?3200:2800);
        setTimeout(onDone,tier==="divine"?5100:tier==="epic"?4400:tier==="mega"?3800:3400);
      }
    },interval);
    return()=>clearInterval(timer);
  },[phase,target,tier,onDone]);

  const gRGB=pal.glow;
  const isOut=phase==="out";

  // Conic ray gradients
  const ray1=`conic-gradient(from 0deg at 50% 50%,${Array.from({length:36},(_,i)=>`transparent ${i*10}deg,rgba(${gRGB},.065) ${i*10+4}deg,transparent ${i*10+8}deg`).join(",")})`;
  const ray2=`conic-gradient(from 0deg at 50% 50%,${Array.from({length:22},(_,i)=>`transparent ${i*16.4}deg,rgba(${gRGB},.04) ${i*16.4+7}deg,transparent ${i*16.4+13}deg`).join(",")})`;

  return(
    <div style={{position:"absolute",inset:0,zIndex:80,overflow:"hidden",cursor:"pointer",
      animation:isOut?"goBwEpicOut .7s ease forwards":"goBwEpicBgIn .35s ease both"}}
      onClick={onDone}>
      <style>{GO_BW_CSS}{GO_BW_EPIC_CSS}</style>

      {/* ── White entry flash ── */}
      {phase==="flash"&&<div style={{position:"absolute",inset:0,background:"#fff",animation:"goBwEpicFlash .18s ease forwards",zIndex:50}}/>}

      {/* ── Radial dark background ── */}
      <div style={{position:"absolute",inset:0,
        background:`radial-gradient(ellipse 90% 70% at 50% 40%,${pal.bg} 0%,rgba(4,1,12,.99) 100%)`,
      }}/>

      {/* ── Olympus temple silhouette (faint) ── */}
      <svg style={{position:"absolute",bottom:0,left:0,right:0,width:"100%",opacity:.12,pointerEvents:"none"}} viewBox="0 0 800 180" preserveAspectRatio="xMidYMax meet">
        <rect x="160" y="130" width="480" height="50" fill={`rgba(${gRGB},1)`}/>
        <path d={`M140 130 L400 55 L660 130 Z`} fill={`rgba(${gRGB},1)`}/>
        {[200,245,290,335,380,425,470,515,560].map((x,i)=>(
          <rect key={i} x={x} y="80" width="16" height="52" rx="4" fill={`rgba(${gRGB},1)`}/>
        ))}
      </svg>

      {/* ── Rotating ray layers ── */}
      <div style={{position:"absolute",inset:"-30%",animation:"goBwEpicRays 12s linear infinite",background:ray1,opacity:.9,transformOrigin:"center",willChange:"transform"}}/>
      <div style={{position:"absolute",inset:"-35%",animation:"goBwEpicRaysRev 7s linear infinite",background:ray2,opacity:.65,transformOrigin:"center",willChange:"transform"}}/>

      {/* ── Central glow orb ── */}
      <div style={{position:"absolute",left:"50%",top:"42%",
        width:"85vmin",height:"85vmin",borderRadius:"50%",
        background:`radial-gradient(circle,rgba(${gRGB},.28) 0%,rgba(${gRGB},.1) 38%,transparent 68%)`,
        transform:"translate(-50%,-50%)",animation:"goBwEpicGlowPulse 1.8s ease-in-out infinite",
        pointerEvents:"none"}}/>

      {/* ── Shockwave rings ── */}
      {[0,.5,1,1.5,2].map((del,i)=>(
        <div key={i} style={{position:"absolute",left:"50%",top:"42%",
          width:`${85+i*5}vmin`,height:`${85+i*5}vmin`,borderRadius:"50%",
          border:`${1.8-i*.2}px solid rgba(${gRGB},${.75-i*.1})`,
          animation:`goBwEpicRing ${1.6+i*.25}s ${del}s ease-out infinite`,
          pointerEvents:"none"}}/>
      ))}

      {/* ── Lightning overlay ── */}
      <GoBigWinLightning color={`rgba(${gRGB},1)`} opacity={.8}/>

      {/* ── Vertical light pillars ── */}
      {[-38,-20,0,20,38].map((off,i)=>(
        <div key={i} style={{position:"absolute",left:`calc(50% + ${off}%)`,top:0,
          width:"2px",height:"100%",
          background:`linear-gradient(to bottom,transparent,rgba(${gRGB},.${5+i%2}) 40%,transparent)`,
          transform:"translateX(-50%)",
          animation:`goBwEpicPillar ${1.4+i*.1}s ${i*.14}s ease both`,
          transformOrigin:"top center",
        }}/>
      ))}

      {/* ── Coin shower ── */}
      {GO_BW_COINS.map(c=>(
        <div key={c.id} style={{
          position:"absolute",left:`${c.x}%`,top:0,
          fontSize:`${c.size}rem`,
          "--cy":`${c.cy}px`,"--cr":`${c.cr}deg`,"--cs":c.cs,
          color:c.color,
          filter:`drop-shadow(0 0 ${c.size*4}px ${c.color})`,
          animation:`goBwEpicCoin ${c.dur}s ${c.del}s ease-in both`,
          zIndex:2,
        }}>🪙</div>
      ))}

      {/* ── Floating emoji sparks ── */}
      {GO_BW_FLOATERS.map(f=>(
        <div key={f.id} style={{position:"absolute",left:`${f.x}%`,bottom:"-5px",
          fontSize:".95rem",
          animation:`goBwEpicFloat ${f.dur}s ${f.del}s ease-in-out infinite`}}>{f.sym}</div>
      ))}

      {/* ── Ambient stars ── */}
      {GO_BW_STARS.map(s=>(
        <div key={s.id} style={{position:"absolute",left:`${s.x}%`,top:`${s.y}%`,
          fontSize:`${s.s*.85}rem`,color:`rgba(${gRGB},1)`,
          filter:`drop-shadow(0 0 8px rgba(${gRGB},.9))`,
          animation:`goBwEpicStar ${s.dur}s ${s.del}s ease-in-out infinite`,opacity:.7}}>✦</div>
      ))}

      {/* ── Corner bolt decorations ── */}
      {[{l:"4%",t:"5%",s:3.2,d:"0s"},{r:"5%",t:"6%",s:2.6,d:".22s"},{l:"3%",b:"12%",s:2.2,d:".38s"},{r:"4%",b:"10%",s:2.8,d:".14s"},{l:"44%",t:"1%",s:3.6,d:".06s"}].map((b,i)=>(
        <div key={i} style={{
          position:"absolute",...b,
          fontSize:`${b.s}rem`,
          filter:`drop-shadow(0 0 18px rgba(${gRGB},.95)) drop-shadow(0 0 40px rgba(${gRGB},.5))`,
          animation:`goBwEpicBoltCorner ${1.1+i*.22}s ${b.d} ease infinite`,
          zIndex:3,
        }}>⚡</div>
      ))}

      {/* ════════ MAIN CONTENT ════════ */}
      <div style={{
        position:"absolute",inset:0,display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",gap:10,zIndex:8,
        animation:isOut?"goBwEpicOut .7s ease forwards":phase==="shake"?"goBwEpicShake .28s ease both":"none",
      }}>

        {/* Laurel wreaths */}
        {(phase==="enter"||phase==="shake"||phase==="count"||phase==="pulse")&&(
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:4,animation:"goBwEpicLaurel 4s ease-in-out infinite"}}>
            <svg viewBox="0 0 80 30" width="80" height="30">
              {[0,1,2,3,4].map(i=>(
                <ellipse key={i} cx={62-i*12} cy={15-Math.abs(i-2)*2} rx="7" ry="4"
                  fill={i%2===0?"#c8a000":"#f5c400"} opacity={.5+i*.08}
                  transform={`rotate(${-30+i*12},${62-i*12},${15-Math.abs(i-2)*2})`}/>
              ))}
            </svg>
            <div style={{width:6,height:6,borderRadius:"50%",background:`rgba(${gRGB},1)`,boxShadow:`0 0 12px rgba(${gRGB},1)`}}/>
            <svg viewBox="0 0 80 30" width="80" height="30" style={{transform:"scaleX(-1)"}}>
              {[0,1,2,3,4].map(i=>(
                <ellipse key={i} cx={62-i*12} cy={15-Math.abs(i-2)*2} rx="7" ry="4"
                  fill={i%2===0?"#c8a000":"#f5c400"} opacity={.5+i*.08}
                  transform={`rotate(${-30+i*12},${62-i*12},${15-Math.abs(i-2)*2})`}/>
              ))}
            </svg>
          </div>
        )}

        {/* WIN TYPE label */}
        <div style={{
          fontFamily:"'Rye',serif",
          fontSize:"clamp(2rem,5.5vw,4rem)",
          fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",
          background:`linear-gradient(180deg,#fff8e0 0%,${pal.main} 40%,${pal.accent} 80%,rgba(${gRGB},.7) 100%)`,
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
          filter:`drop-shadow(0 0 22px rgba(${gRGB},.95)) drop-shadow(0 4px 8px rgba(0,0,0,.9))`,
          animation:phase==="enter"||phase==="shake"||phase==="count"||phase==="pulse"
            ?"goBwEpicTitleReveal .75s cubic-bezier(.34,1.4,.64,1) both":"none",
          textAlign:"center",lineHeight:1.1,
        }}>{label}</div>

        {/* Decorative divider */}
        <div style={{display:"flex",alignItems:"center",gap:10,width:"min(440px,80%)",opacity:.9}}>
          <div style={{flex:1,height:1.5,background:`linear-gradient(to right,transparent,rgba(${gRGB},.8),rgba(${gRGB},.95))`}}/>
          <div style={{fontSize:"1.2rem",filter:`drop-shadow(0 0 14px rgba(${gRGB},1))`}}>⚡</div>
          <div style={{flex:1,height:1.5,background:`linear-gradient(to left,transparent,rgba(${gRGB},.8),rgba(${gRGB},.95))`}}/>
        </div>

        {/* Win amount counter */}
        <div style={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontSize:"clamp(4rem,13vw,9rem)",
          fontWeight:900,lineHeight:.88,
          background:`linear-gradient(180deg,#ffffff 0%,${pal.main} 45%,${pal.accent} 100%)`,
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
          filter:`drop-shadow(0 0 32px rgba(${gRGB},1)) drop-shadow(0 0 70px rgba(${gRGB},.55)) drop-shadow(0 8px 2px rgba(0,0,0,.95))`,
          animation:phase==="count"?"goBwEpicCountIn .6s cubic-bezier(.34,1.3,.64,1) both":
                    phase==="pulse"?"goBwEpicPulse 1.3s ease infinite":"none",
          letterSpacing:"-.03em",padding:"10px 0",
          textShadow:"none",
        }}>${displayed.toFixed(2)}</div>

        {/* Multiplier badge */}
        <div style={{
          display:"flex",alignItems:"center",gap:10,
          background:`linear-gradient(135deg,rgba(${gRGB},.1),rgba(${gRGB},.05))`,
          border:`1.5px solid rgba(${gRGB},.45)`,
          borderRadius:28,padding:"9px 28px",
          backdropFilter:"blur(16px)",
          animation:phase==="count"||phase==="pulse"?"goBwSubIn .55s .4s ease both":"none",
          boxShadow:`0 0 24px rgba(${gRGB},.2),inset 0 1px 0 rgba(255,255,255,.1)`,
        }}>
          <span style={{fontSize:"1.4rem",filter:`drop-shadow(0 0 12px rgba(${gRGB},1))`}}>⚡</span>
          <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1.25rem",fontWeight:900,
            color:"rgba(255,255,255,.92)",letterSpacing:".04em",
            textShadow:`0 0 18px rgba(${gRGB},.9)`}}>
            {mult.toFixed(1)}× BET
          </span>
          <span style={{fontSize:"1.4rem",filter:`drop-shadow(0 0 12px rgba(${gRGB},1))`}}>⚡</span>
        </div>

        {/* Tier subtitle */}
        {tier==="divine"&&<div style={{fontFamily:"'Rye',serif",fontSize:"1.1rem",color:`rgba(${gRGB},1)`,
          letterSpacing:".28em",textTransform:"uppercase",textShadow:`0 0 20px rgba(${gRGB},.9)`,
          animation:"goBwSubIn .5s .65s ease both"}}>THE GODS SMILE UPON YOU</div>}
        {tier==="epic"&&<div style={{fontFamily:"'Rye',serif",fontSize:"1rem",color:`rgba(${gRGB},.9)`,
          letterSpacing:".22em",textTransform:"uppercase",animation:"goBwSubIn .5s .6s ease both"}}>LEGENDARY</div>}
        {tier==="mega"&&<div style={{fontFamily:"'Rye',serif",fontSize:".95rem",color:`rgba(${gRGB},.85)`,
          letterSpacing:".2em",textTransform:"uppercase",animation:"goBwSubIn .5s .55s ease both"}}>INCREDIBLE</div>}

        {/* Click hint */}
        <div style={{marginTop:14,fontSize:".64rem",color:`rgba(${gRGB},.25)`,letterSpacing:".14em",
          textTransform:"uppercase",animation:"goBwEpicHint 2.5s 2.5s ease infinite"}}>
          Click anywhere to continue
        </div>
      </div>
    </div>
  );
}

/* ── Bolt Strike VFX — lightning bolt falling from above onto a bolt cell ── */
function goLightningPath(seed,w=56,topY=-320,botY=0){
  // deterministic jagged path using seed
  let s=((seed+1)*0x9e3779b9)>>>0;
  const rng=()=>{s^=s<<13;s^=s>>17;s^=s<<5;return(s>>>0)/4294967296;};
  const steps=9;
  let d=`M ${w/2} ${topY}`;
  for(let i=1;i<steps;i++){
    const t=i/steps;
    const jitter=(rng()-.5)*(w*.7)*(1-t*.4);
    const x=(w/2)+jitter;
    const y=topY+(botY-topY)*t;
    d+=` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  d+=` L ${w/2} ${botY}`;
  return d;
}
function GoBoltStrikeVFX({posKey,val=2}){
  // Color tier based on multiplier value
  // Low: ≤3  → gold/yellow   Mid: 4–14  → cyan/blue   High: ≥15 → pink/purple electric
  const tier=val>=15?"high":val>=4?"mid":"low";
  const colors={
    low: {outer:"rgba(245,196,0,.22)",mid:"rgba(255,230,80,.55)",core:"#fffde7",spark:"#ffe066",floodColor:"rgba(245,196,0,.8)"},
    mid: {outer:"rgba(0,212,255,.22)",mid:"rgba(100,220,255,.55)",core:"#e0f7ff",spark:"#00d4ff",floodColor:"rgba(0,200,255,.8)"},
    high:{outer:"rgba(220,80,255,.28)",mid:"rgba(200,100,255,.65)",core:"#f8e0ff",spark:"#e040fb",floodColor:"rgba(180,60,255,.9)"},
  }[tier];

  const seed=posKey.split("-").reduce((a,v,i)=>a+(+v+1)*(i?17:7),0);
  const w=56,topY=-300,botY=4;
  const path=goLightningPath(seed,w,topY,botY);
  const pathLen=500;
  const gId=`gBSglow${seed}`;
  // Duration: high mult = faster/more intense
  const dur=tier==="high"?.22:tier==="mid"?.28:.32;
  // Width: high = wider bolts
  const outerW=tier==="high"?20:tier==="mid"?16:14;
  const midW=tier==="high"?9:tier==="mid"?7:6;
  return(
    <div style={{
      position:"absolute",left:0,right:0,bottom:0,
      height:`${Math.abs(topY)+10}px`,
      pointerEvents:"none",zIndex:25,overflow:"visible",
    }}>
      <svg width={w} height={Math.abs(topY)+10}
        viewBox={`0 ${topY} ${w} ${Math.abs(topY)+10}`}
        style={{position:"absolute",left:"50%",transform:"translateX(-50%)",bottom:0,overflow:"visible"}}>
        <defs>
          <filter id={gId} x="-80%" y="-20%" width="260%" height="140%">
            <feGaussianBlur stdDeviation={tier==="high"?6:4} result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Outer glow */}
        <path d={path} fill="none" stroke={colors.outer} strokeWidth={outerW}
          strokeLinecap="round" strokeLinejoin="round"
          style={{strokeDasharray:pathLen,animation:`goBoltDraw ${dur+.1}s ease-out both`}}/>
        {/* Mid glow */}
        <path d={path} fill="none" stroke={colors.mid} strokeWidth={midW}
          strokeLinecap="round" strokeLinejoin="round"
          style={{strokeDasharray:pathLen,animation:`goBoltDraw ${dur+.06}s ease-out both`}}/>
        {/* Core bolt */}
        <path d={path} fill="none" stroke={colors.core} strokeWidth={tier==="high"?3:2.2}
          strokeLinecap="round" strokeLinejoin="round"
          filter={`url(#${gId})`}
          style={{strokeDasharray:pathLen,animation:`goBoltDraw ${dur}s ease-out both`}}/>
        {/* Extra forked branch for high mult */}
        {tier==="high"&&(
          <path d={goLightningPath(seed+99,w*.7,topY*.6,botY)} fill="none" stroke={colors.mid}
            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            style={{strokeDasharray:400,animation:`goBoltDraw ${dur+.04}s .05s ease-out both`,opacity:.55}}/>
        )}
        {/* Impact sparks */}
        {[0,60,120,180,240,300].map((a,i)=>{
          const rad=a*(Math.PI/180);
          const r=(tier==="high"?12:tier==="mid"?9:7)+i%3*3;
          const x2=(w/2+Math.cos(rad)*r).toFixed(1);
          const y2=(botY+Math.sin(rad)*r*0.5).toFixed(1);
          return <line key={i} x1={w/2} y1={botY} x2={x2} y2={y2}
            stroke={i%2===0?colors.spark:"rgba(255,255,255,.85)"} strokeWidth={tier==="high"?2:1.5} strokeLinecap="round"
            style={{animation:`goBoltSpark .35s ${.22+i*.025}s ease-out both`}}/>;
        })}
      </svg>
    </div>
  );
}

/* ── Bolt reveal overlay showing individual multiplier value ── */
function GoBoltRevealVal({val,idx,total}){
  const tier=val>=15?"high":val>=4?"mid":"low";
  const color=tier==="high"?"#f0a0ff":tier==="mid"?"#00e5ff":"#ffe066";
  const shadow=tier==="high"
    ?"0 0 14px rgba(220,80,255,1),0 0 30px rgba(180,60,255,.6),0 2px 0 rgba(0,0,0,.9)"
    :tier==="mid"
    ?"0 0 14px rgba(0,212,255,1),0 0 30px rgba(0,180,255,.6),0 2px 0 rgba(0,0,0,.9)"
    :"0 0 14px rgba(245,196,0,1),0 0 30px rgba(245,196,0,.6),0 2px 0 rgba(0,0,0,.9)";
  const burstColor=tier==="high"?"rgba(200,80,255,.32)":tier==="mid"?"rgba(0,200,255,.28)":"rgba(245,196,0,.28)";
  return(
    <div style={{position:"absolute",inset:0,zIndex:22,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
      <div style={{
        position:"absolute",inset:"-20%",borderRadius:"50%",
        background:`radial-gradient(circle,${burstColor} 0%,transparent 70%)`,
        animation:`goBoltRevealBurst .5s ${idx*90}ms cubic-bezier(.34,1.4,.64,1) both`,
      }}/>
      <div style={{
        fontFamily:"'Space Grotesk',sans-serif",
        fontSize:"clamp(.9rem,3vw,1.3rem)",
        fontWeight:900,color,textShadow:shadow,
        letterSpacing:"-.02em",
        animation:`goBoltRevealNum .45s ${idx*90}ms cubic-bezier(.34,1.5,.64,1) both`,
        willChange:"transform",
      }}>×{val}</div>
    </div>
  );
}

/* ── Main Game Component ── */
// Emoji for tumble history display
function goSymEmoji(sym){
  const map={scatter:"⚡",bolt:"🔱",hglass:"⏳",ring:"💍",chalice:"🏆",crown:"👑",ruby:"🔴",amethyst:"💜",topaz:"🟡",emerald:"💚",sapphire:"💙"};
  return map[sym]||"✦";
}

function GatesOfOlympusGame({balance,setBalance,setPage}){
  const [showIntro,setShowIntro]=useState(true);

  // Convert data URI → Blob URL so ad blockers can't block it
  // Strips whitespace from base64 (text editors sometimes insert newlines)
  const [gifBlobUrl,setGifBlobUrl]=useState(null);
  const [idleBlobUrl,setIdleBlobUrl]=useState(null);
  const [gifKey,setGifKey]=useState(0); // increment to restart GIF animation
  const [olimpusFlashKey,setOlimpusFlashKey]=useState(0); // increment to trigger lightning transition
  useEffect(()=>{
    function toBlobUrl(src){
      if(!src)return null;
      if(!src.startsWith('data:'))return src; // already a URL
      try{
        const comma=src.indexOf(',');
        const meta=src.slice(0,comma);
        const mime=meta.match(/:(.*?);/)[1];
        const b64=src.slice(comma+1).replace(/[\s]/g,''); // strip any whitespace
        const bin=atob(b64);
        const arr=new Uint8Array(bin.length);
        for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);
        return URL.createObjectURL(new Blob([arr],{type:mime}));
      }catch(e){
        console.warn('[Olimpus] blob convert failed:',e.message);
        return src; // fallback: use raw data URI
      }
    }
    const gifUrl=toBlobUrl(GIF_OLIMPUS_MULTI);
    const idleUrl=toBlobUrl(IMG_OLIMPUS_IDLE);
    if(gifUrl)setGifBlobUrl(gifUrl);
    if(idleUrl)setIdleBlobUrl(idleUrl);
    return()=>{
      if(gifUrl&&gifUrl.startsWith('blob:'))URL.revokeObjectURL(gifUrl);
      if(idleUrl&&idleUrl.startsWith('blob:'))URL.revokeObjectURL(idleUrl);
    };
  },[]);

  const [grid,setGrid]=useState(()=>goGenGrid(false));
  const [bet,setBet]=useState(1.00);
  const [spinning,setSpinning]=useState(false);
  const [winCells,setWinCells]=useState(new Set());
  const [removeCells,setRemoveCells]=useState(new Set());
  const [winAmt,setWinAmt]=useState(0);
  const [totalWin,setTotalWin]=useState(0);
  const [cascade,setCascade]=useState(0);
  const [bonusPhase,setBonusPhase]=useState(null); // null|"trigger"|"spins"|"end"
  const [freeSpins,setFreeSpins]=useState(0);
  const [freeSpinsLeft,setFreeSpinsLeft]=useState(0);
  const [bonusWin,setBonusWin]=useState(0);
  const [multPool,setMultPool]=useState(0); // persistent multiplier pool
  const [multPoolDisplay,setMultPoolDisplay]=useState(0);
  const [flashMult,setFlashMult]=useState(null); // {val,key} bolt collected
  const [boltCells,setBoltCells]=useState(new Set());
  const [boltStrikeSet,setBoltStrikeSet]=useState(new Set()); // cells being struck by lightning
  const [boltRevealMap,setBoltRevealMap]=useState({}); // {r-c: val} during reveal phase
  const [scatterCount,setScatterCount]=useState(0);
  const [flashG,setFlashG]=useState(false);
  const [flashR,setFlashR]=useState(false);
  const [showWin,setShowWin]=useState(false);
  const [bigWin,setBigWin]=useState(null);
  const [cellKeys,setCellKeys]=useState(()=>Array.from({length:GO_ROWS},(_,r)=>Array.from({length:GO_COLS},(_,c)=>`${r}${c}0`)));
  const [cellDrop,setCellDrop]=useState(()=>Array.from({length:GO_ROWS},()=>Array(GO_COLS).fill({drop:GO_ROWS+3,delay:0})));
  // isTumbleFall removed — mode is stored per-cell in cellDrop
  const [tumbleHistory,setTumbleHistory]=useState([]); // [{sym, win, cascN}] — current spin tumble log
  const [stats,setStats]=useState({spins:0,wins:0,biggest:0,totalWon:0,totalBet:0});
  const [goStats,setGoStats]=useState({profit:0,wagered:0,wins:0,losses:0,history:[0]});
  const [showStats,setShowStats]=useState(false);
  const [spinRawWin,setSpinRawWin]=useState(0);
  const [spinAppliedMult,setSpinAppliedMult]=useState(0);
  const [bannerPhase,setBannerPhase]=useState("hidden"); // hidden|split|merge|final|out
  const [bannerFinal,setBannerFinal]=useState(0);
  const bannerTimers=useRef([]);
  const spinRef=useRef(false);
  const freeSpinsRef=useRef(0);
  const multPoolRef=useRef(0);
  const [showBuyModal,setShowBuyModal]=useState(false);
  const [showRetrigger,setShowRetrigger]=useState(false);
  const [buyBonusActive,setBuyBonusActive]=useState(false);
  const [goAnteBet,setGoAnteBet]=useState(false); // +25% cost, 2× scatter chance
  // Bonus Hunt
  const [showBonusHunt,setShowBonusHunt]=useState(false);
  const [huntSlots,setHuntSlots]=useState([]); // [{bet, cost, id}]
  const [huntRunning,setHuntRunning]=useState(false);
  const [huntCurrent,setHuntCurrent]=useState(null); // index currently playing
  const [huntResults,setHuntResults]=useState([]); // [{bet,cost,win}]

  // Space bar → spin (mirrors the spin button logic exactly)
  useEffect(()=>{
    const onKey=(e)=>{
      if(e.code!=="Space"||e.repeat)return;
      // Don't fire if user is typing in an input/textarea
      const tag=document.activeElement?.tagName;
      if(tag==="INPUT"||tag==="TEXTAREA"||tag==="SELECT")return;
      e.preventDefault();
      if(spinning||(bonusPhase&&bonusPhase!=="spins"))return;
      if(isBonus){doSpin(true);}
      else if(bet<=balance){sfx.click();doSpin(false);}
    };
    window.addEventListener("keydown",onKey);
    return()=>window.removeEventListener("keydown",onKey);
  },[spinning,bonusPhase,bet,balance]);

  function clearBannerTimers(){bannerTimers.current.forEach(clearTimeout);bannerTimers.current=[];}
  function bt(fn,ms){const id=setTimeout(fn,ms);bannerTimers.current.push(id);return id;}

  // Split-merge win animation
  // With multiplier:  raw ← — — → ×mult  … slide to center … flash → TOTAL / xBET
  // Without:          total counts up from center
  function showWinBanner(raw,mult,final){
    clearBannerTimers();
    setBannerPhase("hidden");
    if(final<=0)return;
    setBannerFinal(final);
    setSpinRawWin(raw);
    setSpinAppliedMult(mult);
    if(mult>1){
      bt(()=>setBannerPhase("split"),40);
      bt(()=>setBannerPhase("merge"),650);
      bt(()=>setBannerPhase("final"),1050);
      bt(()=>setBannerPhase("out"),2200);
      bt(()=>setBannerPhase("hidden"),2600);
    } else {
      bt(()=>setBannerPhase("final"),40);
      bt(()=>setBannerPhase("out"),1600);
      bt(()=>setBannerPhase("hidden"),2000);
    }
  }

  const boltIdxMap=useMemo(()=>{
    const m={};const sorted=Array.from(boltCells).sort();
    sorted.forEach((pos,i)=>{m[pos]=i;});
    return m;
  },[boltCells]);

  const isBonus=bonusPhase==="spins";
  const sleep=ms=>new Promise(res=>setTimeout(res,ms));
  const raf=()=>new Promise(res=>requestAnimationFrame(()=>requestAnimationFrame(res)));
  const fallDur=drop=>drop>=(GO_ROWS+2)?500:Math.max(170,drop*65+135);
  const initDelay=(r,c)=>c*80+(GO_ROWS-1-r)*18; // GOO-style: strong column stagger, slight row stagger

  async function doSpin(isFS=false){
    if(spinRef.current)return;
    spinRef.current=true;
    // ── Kill any pending banner timers from previous spin FIRST ──
    // This prevents stale timers from setting bannerPhase after bannerFinal is reset to 0
    clearBannerTimers();
    setSpinning(true);
    setWinCells(new Set());setRemoveCells(new Set());setTotalWin(0);setCascade(0);setWinAmt(0);setBoltCells(new Set());setBoltRevealMap({});setBoltStrikeSet(new Set());setShowWin(false);setSpinRawWin(0);setSpinAppliedMult(0);setBannerPhase("hidden");setBannerFinal(0);
    setTumbleHistory([]);

    const goCost=isFS?0:goAnteBet?+(bet*1.25).toFixed(2):bet;
    const cost=goCost;
    if(!isFS){setBalance(b=>+(b-cost).toFixed(2));setStats(s=>({...s,spins:s.spins+1,totalBet:+(s.totalBet+cost).toFixed(2)}));
      setGoStats(s=>({...s,profit:+(s.profit-cost).toFixed(2),wagered:+(s.wagered+cost).toFixed(2),history:[...s.history,+(s.profit-cost).toFixed(2)]}));
    }

    const maxCascade=goRollCascadeDepth(isFS);
    let g=goGenGridForDepth(isFS,maxCascade,goAnteBet&&!isFS);

    const EXIT_STAGGER=70;
    const EXIT_DUR=220;
    const COL_STAGGER=55;
    const ROW_STAGGER=15;
    const ENTRY_LEAD=60;

    for(let c=0;c<GO_COLS;c++){
      const col=c;
      setCellDrop(prev=>{const n=prev.map(r=>[...r]);for(let r=0;r<GO_ROWS;r++)n[r][col]={mode:"exit",delay:0,dur:EXIT_DUR};return n;});
      await sleep(EXIT_STAGGER);
    }

    await sleep(ENTRY_LEAD + EXIT_DUR - EXIT_STAGGER);

    // ENTRY: await medzi stĺpcami → React commitne + browser vykreslí každý stĺpec pred ďalším
    for(let c=0;c<GO_COLS;c++){
      const col=c;
      const ts=Date.now();
      setGrid(prev=>{const n=prev.map(r=>[...r]);for(let r=0;r<GO_ROWS;r++)n[r][col]=g[r][col];return n;});
      setCellKeys(prev=>{const n=prev.map(r=>[...r]);for(let r=0;r<GO_ROWS;r++)n[r][col]=`${r}${col}${ts}`;return n;});
      setCellDrop(prev=>{const n=prev.map(r=>[...r]);for(let r=0;r<GO_ROWS;r++)n[r][col]={mode:"fall",delay:r*ROW_STAGGER,drop:GO_ROWS+3,dur:fallDur(GO_ROWS+3)};return n;});
      if(c<GO_COLS-1) await sleep(COL_STAGGER);
    }

    // Počkaj kým posledný stĺpec + posledný riadok dobehne animáciu pádu
    await sleep((GO_ROWS-1)*ROW_STAGGER+fallDur(GO_ROWS+3)+180);
    setCellDrop(Array.from({length:GO_ROWS},()=>Array.from({length:GO_COLS},()=>({mode:"still"}))));
    await raf();
    // Scatter check on initial grid — requires 4+ scatters for bonus
    if(!isFS){
      const sc=g.flat().filter(s=>s==="scatter").length;
      if(sc>=4){
        setScatterCount(sc);
        const spinsAward=15+Math.max(0,(sc-4)*5);
        // Set free spins count FIRST so trigger overlay shows correct number immediately
        freeSpinsRef.current=spinsAward;
        setFreeSpins(spinsAward);setFreeSpinsLeft(spinsAward);setBonusWin(0);
        setMultPool(0);setMultPoolDisplay(0);multPoolRef.current=0;
        // Ping each scatter as it lights up, then fire epic bonusLand fanfare
        const scPos=[];g.forEach((row,r)=>row.forEach((s,c)=>{if(s==="scatter")scPos.push([r,c]);}));
        const scCells=new Set(scPos.map(([r,c])=>`${r}-${c}`));
        setWinCells(scCells);
        scPos.forEach((_,i)=>sfx.scatterPing(i));
        await sleep(680);
        sfx.bonusLand();
        setBonusPhase("trigger");
        await sleep(2600);
        setBonusPhase("spins");spinRef.current=false;setSpinning(false);return;
      }
    }

    let spinTotal=0,cascN=0;
    // ── Same tumble speed for base AND bonus (base game feel in bonus) ──
    const cascWait=660;
    const removeWait=320;

    // ── MAIN CASCADE LOOP ──
    // Bolts stay on the grid throughout ALL cascades.
    // They are NEVER removed mid-spin — only collected after the last cascade.
    while(true){
      // Check for wins — goFindWinners already ignores "bolt" and "scatter"
      const winners=goFindWinners(g);
      if(winners.length===0)break; // no win → exit, bolts still on grid

      const counts={};const wCells=new Set();
      g.forEach((row,r)=>row.forEach((s,c)=>{if(s&&winners.includes(s)){wCells.add(`${r}-${c}`);counts[s]=(counts[s]||0)+1;}}));
      setWinCells(wCells);

      let roundWin=0;
      for(const sym of winners)roundWin+=goSymPay(sym,counts[sym])*bet;
      spinTotal=+(spinTotal+roundWin).toFixed(2);
      cascN++;setCascade(cascN);setWinAmt(roundWin);
      // Record tumble history: best winning symbol this cascade
      const bestSym=winners.sort((a,b)=>goSymPay(b,counts[b])-goSymPay(a,counts[a]))[0];
      setTumbleHistory(prev=>[...prev,{sym:bestSym,win:roundWin,cascN}]);
      if(roundWin>0)sfx.gem(Math.min(roundWin/bet,3));
      await sleep(cascWait);

      // Remove winning symbols (bolts are NOT in wCells so they survive)
      setRemoveCells(wCells);await sleep(removeWait);
      for(let r=0;r<GO_ROWS;r++)for(let c=0;c<GO_COLS;c++){if(wCells.has(`${r}-${c}`))g[r][c]=null;}

      // Gravity — bolts fall down naturally as nulls below them are filled
      const{ng,dd}=goGravity(g);g=ng;
      const nullPos=new Set();
      for(let r=0;r<GO_ROWS;r++)for(let c=0;c<GO_COLS;c++){if(g[r][c]===null)nullPos.add(`${r}-${c}`);}
      const hitLimit=(maxCascade<10&&cascN>=maxCascade);
      g=hitLimit?goFillCapped(g,isFS,7):goFill(g,isFS);

      // Build per-cell drop data with explicit mode
      // New cells from top: mode:"tumble" + new key
      // Gravity cells (shift down): mode:"gravity" + new key (so animation fires)
      // Stationary: mode:"still" (keep old key, no animation)
      const cascDrop=Array.from({length:GO_ROWS},(_,r)=>Array.from({length:GO_COLS},(_,c)=>{
        if(nullPos.has(`${r}-${c}`))return{drop:GO_ROWS+3,delay:c*26,mode:"tumble"};
        if(dd[r][c]>0)return{drop:dd[r][c],delay:Math.max(10,c*14),dur:fallDur(dd[r][c]),mode:"gravity"};
        return{drop:0,delay:0,mode:"still"};
      }));
      setCellDrop(cascDrop);
      // New key for: nullPos (new symbol) + gravity (needs animation trigger)
      // Stationary cells KEEP their old key → no remount → no animation restart
      setCellKeys(prev=>prev.map((row,r)=>row.map((k,c)=>{
        if(nullPos.has(`${r}-${c}`)||dd[r][c]>0)return`${r}${c}${Date.now()}c${cascN}`;
        return k;
      })));
      setRemoveCells(new Set());setWinCells(new Set());setGrid(g.map(row=>[...row]));
      sfx.tumble();
      await sleep((GO_COLS-1)*26+fallDur(GO_ROWS+3)+180);
      setCellDrop(Array.from({length:GO_ROWS},()=>Array.from({length:GO_COLS},()=>({mode:"still"}))));
      await raf();
    }

    // ── BOLT COLLECTION — happens AFTER all cascades are done ──
    // Collect every bolt still on the grid, assign multiplier values now.
    // rawWin/bet ratio drives the frustration bias on each bolt's multiplier value.
    const rawWinForBias=spinTotal/Math.max(bet,0.01);
    const boltPositions=[];
    for(let r=0;r<GO_ROWS;r++)for(let c=0;c<GO_COLS;c++){
      if(g[r][c]==="bolt")boltPositions.push({r,c,val:goRandMultBiased(rawWinForBias)});
    }
    const boltTotal=boltPositions.reduce((s,b)=>s+b.val,0);

    // ── Bolt activation: ONLY when win also happened this spin ──
    // Dead spin → bolt stays on grid untouched (nothing removed, nothing refilled)
    const boltActivated=boltTotal>0&&spinTotal>0;

    if(boltActivated){
      // ── Phase 1: Lightning strikes down into each bolt cell ──
      const bSet=new Set(boltPositions.map(b=>`${b.r}-${b.c}`));
      setGifKey(k=>k+1); // restart GIF animation from frame 1
      setOlimpusFlashKey(k=>k+1); // lightning transition
      setBoltCells(bSet);
      setBoltStrikeSet(bSet);
      sfx.win(1.5);
      await sleep(520);
      setBoltStrikeSet(new Set());

      // ── Phase 2: Reveal individual multiplier values on each cell ──
      const revMap={};
      boltPositions.forEach(b=>{revMap[`${b.r}-${b.c}`]=b.val;});
      setBoltRevealMap(revMap);
      // Stagger audio ticks per bolt
      boltPositions.forEach((_,i)=>setTimeout(()=>sfx.tick(),i*90));
      await sleep(140+boltPositions.length*90+420);

      // ── Phase 3: Collect — pool update + total flash ──
      // Keep boltRevealMap visible! Don't clear it yet.
      if(isFS){
        multPoolRef.current+=boltTotal;
        const newPool=multPoolRef.current;
        setMultPool(newPool);
        setMultPoolDisplay(newPool);
      }
      setFlashMult({val:boltTotal,key:Date.now()});
      sfx.win(2);
      await sleep(680);
      setFlashMult(null);
      // Bolts stay visible on grid — boltCells + boltRevealMap remain set
    }
    // Dead spin with bolt → grid stays exactly as-is, bolt symbol remains visible

    // ── Apply multiplier ONLY when bolt fell this spin ──
    const rawWin=spinTotal;
    let appliedMult=0;
    if(spinTotal>0&&boltActivated){
      if(isFS){
        appliedMult=multPoolRef.current;
        spinTotal=+(spinTotal*multPoolRef.current).toFixed(2);
      } else {
        appliedMult=boltTotal;
        spinTotal=+(spinTotal*boltTotal).toFixed(2);
      }
    }
    setSpinRawWin(rawWin);
    setSpinAppliedMult(appliedMult);

   // Scatter check after all cascades for bonus trigger or retrigger
    const sc=g.flat().filter(s=>s==="scatter").length;
    if(!isFS){
      if(sc>=4){
        const spinsAward=15+Math.max(0,(sc-4)*5);
        if(spinTotal>0){setTotalWin(+spinTotal.toFixed(2));setBalance(b=>+(b+spinTotal).toFixed(2));}
        // Set free spins FIRST so trigger overlay shows correct number immediately
        freeSpinsRef.current=spinsAward;
        setFreeSpins(spinsAward);setFreeSpinsLeft(spinsAward);setBonusWin(0);
        setMultPool(0);setMultPoolDisplay(0);multPoolRef.current=0;
        // Ping each scatter then fire bonusLand fanfare
        const scPos2=[];g.forEach((row,r)=>row.forEach((s,c)=>{if(s==="scatter")scPos2.push([r,c]);}));
        const scCells2=new Set(scPos2.map(([r,c])=>`${r}-${c}`));
        setWinCells(scCells2);
        scPos2.forEach((_,i)=>sfx.scatterPing(i));
        await sleep(680);
        sfx.bonusLand();
        setScatterCount(sc);setBonusPhase("trigger");
        await sleep(2600);
        setBonusPhase("spins");spinRef.current=false;setSpinning(false);return;
      }
    } else {
      // RETRIGGER CHECK: 3 a viac scatterov dáva +5 spinov
      if(sc>=3){
        const bonus=5;
        // Zvýrazní scatter symboly na mriežke
        const scPos2=[];g.forEach((row,r)=>row.forEach((s,c)=>{if(s==="scatter")scPos2.push([r,c]);}));
        const scCells2=new Set(scPos2.map(([r,c])=>`${r}-${c}`));
        setWinCells(scCells2);
        scPos2.forEach((_,i)=>sfx.scatterPing(i));
        await sleep(680);
        sfx.bonusLand(); // Zvuk pri získaní re-triggeru
        setShowRetrigger(true);
        setFreeSpinsLeft(p=>p+bonus);
        setFreeSpins(p=>{const n=p+bonus;freeSpinsRef.current=n;return n;});
        await sleep(2600); // Počká kým dobehne UI animácia
        setShowRetrigger(false);
        setWinCells(new Set()); // Vyčistí highlight
      }
    }

    const finalWin=+spinTotal.toFixed(2);
    if(finalWin>0){
      setTotalWin(finalWin);setBalance(b=>+(b+finalWin).toFixed(2));
      setFlashG(true);setTimeout(()=>setFlashG(false),500);
      sfx.win(Math.min(finalWin/bet,5));
      setStats(s=>({...s,wins:s.wins+1,biggest:Math.max(s.biggest,finalWin),totalWon:+(s.totalWon+finalWin).toFixed(2)}));
      setGoStats(s=>({...s,profit:+(s.profit+finalWin).toFixed(2),wins:s.wins+1,history:[...s.history,+(s.profit+finalWin).toFixed(2)]}));
      if(isFS)setBonusWin(p=>+(p+finalWin).toFixed(2));
      const wm=finalWin/bet;
      // Always show the split-merge banner animation first
      showWinBanner(rawWin,appliedMult,finalWin);
      if(wm>=30){
        // After the banner animation finishes, trigger the big win overlay
        const bannerDelay=appliedMult>1?2700:2100;
        setTimeout(()=>setBigWin({target:finalWin,mult:+wm.toFixed(1)}),bannerDelay);
      }
    }else if(!isFS){
      setFlashR(true);setTimeout(()=>setFlashR(false),500);sfx.lose();
      setGoStats(s=>({...s,profit:s.profit,losses:s.losses+1,history:[...s.history,s.profit]}));
    }

    if(isFS){
      setFreeSpinsLeft(p=>{
        const next=p-1;
        if(next<=0){
          setTimeout(()=>{
            const bw=+(bonusWin+(finalWin>0?finalWin:0)).toFixed(2);
            if(bw/bet>=30)setBigWin({target:bw,mult:+(bw/bet).toFixed(1)});
            setBonusPhase("end");
          },800);
        }
        return Math.max(0,next);
      });
    }
    spinRef.current=false;setSpinning(false);
  }

  // Forces a scatter-filled spin when buy bonus is used — GO version
  async function doBuyBonusSpin(numSpins){
    if(spinRef.current)return;
    spinRef.current=true;
    setSpinning(true);
    setBuyBonusActive(true);
    clearBannerTimers();setBannerPhase("hidden");
    setWinCells(new Set());setRemoveCells(new Set());setTotalWin(0);setCascade(0);setWinAmt(0);setBoltCells(new Set());setBoltStrikeSet(new Set());setBoltRevealMap({});

    // Build grid with 4 scatters spread nicely + random fill
    const picks=[[0,1],[1,4],[2,0],[3,3]];
    const scSet=new Set(picks.map(([r,c])=>`${r}-${c}`));
    const g=Array.from({length:GO_ROWS},(_,r)=>Array.from({length:GO_COLS},(_,c)=>{
  if(scSet.has(`${r}-${c}`))return"scatter";
  let sym,tries=0;
  do{sym=goRandSym(false);tries++;}while(tries<40&&(sym==="scatter"||sym==="bolt"));
  return sym;
  }));

    // ── GOO-STYLE BUY-BONUS DROP — await pattern (rovnaký ako doSpin) ──
    const BB_EXIT_STAGGER=90,BB_EXIT_DUR=250;
    const BB_COL_STAGGER=85,BB_ROW_STAGGER=18,BB_ENTRY_LEAD=80;

    for(let c=0;c<GO_COLS;c++){
      const col=c;
      setCellDrop(prev=>{const n=prev.map(r=>[...r]);for(let r=0;r<GO_ROWS;r++)n[r][col]={mode:"exit",delay:0,dur:BB_EXIT_DUR};return n;});
      await sleep(BB_EXIT_STAGGER);
    }
    await sleep(BB_ENTRY_LEAD + BB_EXIT_DUR - BB_EXIT_STAGGER);

    for(let c=0;c<GO_COLS;c++){
      const col=c;
      const bbTs=Date.now();
      setGrid(prev=>{const n=prev.map(r=>[...r]);for(let r=0;r<GO_ROWS;r++)n[r][col]=g[r][col];return n;});
      setCellKeys(prev=>{const n=prev.map(r=>[...r]);for(let r=0;r<GO_ROWS;r++)n[r][col]=`${r}${col}bb${bbTs}`;return n;});
      setCellDrop(prev=>{const n=prev.map(r=>[...r]);for(let r=0;r<GO_ROWS;r++)n[r][col]={mode:"fall",delay:r*BB_ROW_STAGGER,drop:GO_ROWS+3,dur:fallDur(GO_ROWS+3)};return n;});
      if(c<GO_COLS-1) await sleep(BB_COL_STAGGER);
    }
    await sleep((GO_ROWS-1)*BB_ROW_STAGGER+fallDur(GO_ROWS+3)+200);
    setCellDrop(Array.from({length:GO_ROWS},()=>Array.from({length:GO_COLS},()=>({mode:"still"}))));
    await raf();
    // Ping each scatter cell + glow
    const scatterCells=new Set(picks.map(([r,c])=>`${r}-${c}`));
    setWinCells(scatterCells);
    picks.forEach((_,i)=>sfx.scatterPing(i));
    await sleep(500);

    // Set free spins FIRST so trigger overlay shows correct number immediately
    freeSpinsRef.current=numSpins;
    setFreeSpins(numSpins);setFreeSpinsLeft(numSpins);setBonusWin(0);
    setMultPool(0);setMultPoolDisplay(0);multPoolRef.current=0;
    // bonusLand fanfare + trigger overlay
    sfx.bonusLand();
    setScatterCount(4);setBonusPhase("trigger");
    await sleep(2600);

    setWinCells(new Set());
    setBuyBonusActive(false);
    setBonusPhase("spins");
    spinRef.current=false;setSpinning(false);
  }

  function endBonus(){
    setBonusPhase(null);setMultPool(0);setMultPoolDisplay(0);multPoolRef.current=0;
    setFreeSpins(0);setFreeSpinsLeft(0);setBigWin(null);
    const eg=goGenGrid(false);setGrid(eg);
    setCellDrop(Array.from({length:GO_ROWS},()=>Array(GO_COLS).fill({drop:GO_ROWS+3,delay:0})));
    setCellKeys(Array.from({length:GO_ROWS},(_,r)=>Array.from({length:GO_COLS},(_,c)=>`${r}${c}end${Date.now()}`)));
  }

  // Auto-spin in bonus mode — spins start automatically without any input
  useEffect(()=>{
    if(!isBonus||spinning)return;
    const t=setTimeout(()=>{doSpin(true);},420);
    return()=>clearTimeout(t);
  },[isBonus,spinning]);

  const GO_CSS=`
    @keyframes goBoltDraw{0%{stroke-dashoffset:500;opacity:0}15%{opacity:1}100%{stroke-dashoffset:0;opacity:.9}}
    @keyframes goBoltSpark{0%{stroke-dashoffset:20;opacity:0}20%{opacity:1}100%{stroke-dashoffset:0;opacity:0}}
    @keyframes goBoltStrikeCell{0%{box-shadow:none;border-color:rgba(245,196,0,.14)}18%{box-shadow:inset 0 0 50px rgba(245,196,0,.95),0 0 60px rgba(245,196,0,.75);border-color:rgba(245,196,0,1);background:rgba(90,70,5,.98)}55%{box-shadow:inset 0 0 30px rgba(245,196,0,.55),0 0 30px rgba(245,196,0,.45)}100%{box-shadow:inset 0 0 22px rgba(245,196,0,.35),0 0 22px rgba(245,196,0,.3)}}
    @keyframes goBoltRevealBurst{0%{transform:scale(0);opacity:0}55%{transform:scale(1.3);opacity:1}100%{transform:scale(1);opacity:.7}}
    @keyframes goBoltRevealNum{0%{transform:scale(0) translateY(6px) rotate(-12deg);opacity:0}55%{transform:scale(1.22) translateY(-3px) rotate(3deg);opacity:1}75%{transform:scale(.94) translateY(1px)}100%{transform:scale(1) translateY(0) rotate(0);opacity:1}}
    /* ── SPIN fall — gravity drop z hornej časti, jemný odraz pri dopade ──
       cubic-bezier(0.22,1,0.36,1) = easeOutQuint: rýchly štart → plynulé brzdenie.
       Jediný odraz (78 %→90 %) sa deje v "plochej" časti krivky → vyzerá prirodzene
       a prehliadač ho stíha aj na 60 fps. ── */
    @keyframes goFall{
      0%   {transform:translateY(calc(var(--fdrop,8)*-105%)) scaleY(1.06);opacity:0;}
      16%  {opacity:1;}
      68%  {transform:translateY(4.5%) scaleY(0.88) scaleX(1.09);}
      82%  {transform:translateY(-1.8%) scaleY(1.07) scaleX(0.97);}
      92%  {transform:translateY(0.5%) scaleY(0.98) scaleX(1.01);}
      100% {transform:translateY(0) scaleY(1) scaleX(1);opacity:1;}
    }
    /* ── TUMBLE — cascade nové symboly, mierne kratší odraz ── */
    @keyframes goFallTumble{
      0%   {transform:translateY(calc(var(--fdrop,5)*-105%)) scaleY(1.05);opacity:0;}
      18%  {opacity:1;}
      66%  {transform:translateY(3.5%) scaleY(0.90) scaleX(1.08);}
      81%  {transform:translateY(-1.4%) scaleY(1.06) scaleX(0.97);}
      92%  {transform:translateY(0.4%) scaleY(0.99);}
      100% {transform:translateY(0) scaleY(1) scaleX(1);opacity:1;}
    }
    /* ── GRAVITY — existujúci symbol kĺže dole po odstránení, zostáva viditeľný ── */
    @keyframes goGravity{
      0%   {transform:translateY(calc(var(--fdrop,1)*-105%));opacity:1;}
      66%  {transform:translateY(2.8%) scaleY(0.93) scaleX(1.06);}
      82%  {transform:translateY(-1%) scaleY(1.04) scaleX(0.98);}
      92%  {transform:translateY(0.3%) scaleY(0.99);}
      100% {transform:translateY(0) scaleY(1) scaleX(1);opacity:1;}
    }
    @keyframes goWinPulse{0%,100%{filter:brightness(1)}50%{filter:brightness(1.25)}}
    /* ── Scatter bonus trigger animations ── */
    @keyframes goScatterLand{0%{transform:scale(0) rotate(-30deg);opacity:0}40%{transform:scale(1.5) rotate(8deg);opacity:1}65%{transform:scale(.88) rotate(-4deg)}82%{transform:scale(1.08) rotate(2deg)}100%{transform:scale(1) rotate(0);opacity:1}}
    @keyframes goScatterOrbit{from{transform:rotate(0deg) translateX(28px) rotate(0deg)}to{transform:rotate(360deg) translateX(28px) rotate(-360deg)}}
    @keyframes goScatterPulseGlow{0%,100%{box-shadow:0 0 18px 6px rgba(245,196,0,.7),0 0 40px 12px rgba(245,196,0,.35)}50%{box-shadow:0 0 36px 14px rgba(245,196,0,1),0 0 80px 24px rgba(245,196,0,.55),0 0 120px 36px rgba(245,196,0,.2)}}
    @keyframes goScatterSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes goScatterFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.06)}}
    .go-cell.scatter-trigger{animation:goScatterPulseGlow 0.7s ease-in-out infinite!important;overflow:visible!important;}
    .go-cell.scatter-trigger .go-sym{animation:goScatterFloat 1.4s ease-in-out infinite!important;}
    @keyframes goRemove{0%{opacity:1;transform:scale(1);filter:brightness(1)}25%{transform:scale(1.18);filter:brightness(1.8) saturate(1.4)}55%{transform:scale(.55) translateY(-18%);opacity:.45;filter:brightness(2)}100%{opacity:0;transform:scale(.08) translateY(-35%);filter:brightness(3)}}
    @keyframes goBoltPulse{0%,100%{filter:brightness(1) drop-shadow(0 0 8px rgba(245,196,0,.5))}50%{filter:brightness(1.1) drop-shadow(0 0 18px rgba(245,196,0,.9))}}
    @keyframes goMultPop{0%{opacity:0;transform:translate(-50%,-50%) scale(.2) rotate(-10deg)}55%{opacity:1;transform:translate(-50%,-80%) scale(1.3) rotate(3deg)}100%{opacity:0;transform:translate(-50%,-160%) scale(.9)}}
    @keyframes goMultPoolBounce{0%{transform:scale(.3);opacity:0}60%{transform:scale(1.28)}80%{transform:scale(.92)}100%{transform:scale(1);opacity:1}}
    @keyframes goAnnounce{0%{opacity:0;transform:translateX(-50%) translateY(-12px)}100%{opacity:1;transform:translateX(-50%) translateY(0)}}
    @keyframes goSpinBtnPulse{0%,100%{box-shadow:0 0 0 0 rgba(245,196,0,.55),0 4px 18px rgba(0,0,0,.7)}50%{box-shadow:0 0 0 8px rgba(245,196,0,0),0 4px 18px rgba(0,0,0,.7)}}
    @keyframes sbSpin360{to{transform:rotate(360deg)}}
    @keyframes goBuyPulse{0%,100%{box-shadow:0 0 0 0 rgba(245,196,0,.45)}60%{box-shadow:0 0 0 7px rgba(245,196,0,.0)}}
    @keyframes goModalIn{from{opacity:0;transform:scale(.88) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes goShimmerSlide{0%{background-position:200% center}100%{background-position:-200% center}}
    @keyframes goFlameFlick{0%,100%{transform:scaleY(1)}33%{transform:scaleY(1.15) scaleX(.9)}66%{transform:scaleY(.88) scaleX(1.1)}}
    @keyframes goZeusFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes goColumnGlow{0%,100%{opacity:.8}50%{opacity:1}}

    @keyframes goIntroSkyPulse{0%,100%{opacity:.7}50%{opacity:1}}
    @keyframes goIntroLightning{0%{opacity:0}3%{opacity:1}6%{opacity:0}9%{opacity:.8}12%,100%{opacity:0}}
    @keyframes goIntroStarTwinkle{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}
    @keyframes goIntroTitleIn{0%{opacity:0;transform:translateX(-50%) translateY(-30px) scale(.88)}100%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}
    @keyframes goIntroPanelIn{0%{opacity:0;transform:translateY(24px)}100%{opacity:1;transform:translateY(0)}}
    @keyframes goIntroCTC{0%,100%{opacity:1;transform:translateX(-50%) scale(1)}50%{opacity:.6;transform:translateX(-50%) scale(.97)}}
    @keyframes goIntroParticle{0%{transform:translateY(0) scale(1);opacity:.9}100%{transform:translateY(-120px) scale(.3);opacity:0}}
    @keyframes goIntroLaurelSway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
    @keyframes goIntroGoldShimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}
    @keyframes goIntroZeusGlow{0%,100%{filter:drop-shadow(0 0 18px rgba(245,196,0,.3))}50%{filter:drop-shadow(0 0 36px rgba(245,196,0,.7)) drop-shadow(0 0 60px rgba(100,60,255,.3))}}
    @keyframes goIntroCardFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
    @keyframes goIntroBoltFlash{0%,85%,100%{opacity:0}40%,55%{opacity:1}}
    @keyframes goIntroAuroraShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

    .go-game{display:flex;flex-direction:column;flex:1;overflow:hidden;position:relative;font-family:'Space Grotesk',sans-serif;background:#1a0545;}
    /* Olympus background SVG — full scene */
    .go-bg-scene{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;}
    /* Subtle animated shimmer on top of the scene */
    @keyframes goSceneShimmer{0%,100%{opacity:.7}50%{opacity:1}}
    .go-game::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:1;
      background:radial-gradient(ellipse 80% 40% at 50% 0%,rgba(255,200,150,.06) 0%,transparent 60%);
      animation:goSceneShimmer 8s ease-in-out infinite;}
    .go-game::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:1;
      background:radial-gradient(ellipse 100% 30% at 50% 100%,rgba(245,196,0,.08) 0%,transparent 55%);}

    /* ── INTRO SCREEN ── */
    .go-intro{position:absolute;inset:0;z-index:100;cursor:pointer;overflow:hidden;}

    .go-announce{position:absolute;top:0;left:50%;transform:translateX(-50%);background:linear-gradient(90deg,transparent,rgba(0,0,0,.75),rgba(0,0,0,.82),rgba(0,0,0,.75),transparent);color:#f5c400;font-size:.85rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;padding:7px 40px;white-space:nowrap;z-index:30;pointer-events:none;display:flex;align-items:center;gap:10px;animation:goAnnounce .3s ease both;text-shadow:0 0 14px rgba(245,196,0,.8);}
    .go-announce-icon{width:28px;height:28px;border-radius:50%;background:radial-gradient(circle,#ffe066,#c8a000);border:2px solid #8b6000;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:900;color:#1a0800;flex-shrink:0;}

    .go-main{display:flex;flex:1;overflow:hidden;position:relative;z-index:2;flex-direction:row;}
    .go-main::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;
      background:
        radial-gradient(ellipse 90% 50% at 50% 0%,rgba(0,0,0,.12) 0%,transparent 55%),
        radial-gradient(ellipse 60% 40% at 50% 100%,rgba(0,0,0,.25) 0%,transparent 60%);}

    .go-top-banner{position:absolute;top:0;left:50%;transform:translateX(-50%);z-index:15;pointer-events:none;white-space:nowrap;
      font-family:'Space Grotesk',sans-serif;font-size:.8rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;
      color:#f5c400;text-shadow:0 0 18px rgba(245,196,0,.9),0 2px 4px rgba(0,0,0,.9);
      padding:5px 28px 4px;
      background:linear-gradient(90deg,transparent,rgba(0,0,0,.55) 18%,rgba(0,0,0,.7) 50%,rgba(0,0,0,.55) 82%,transparent);}

    /* ── RESTORED SIDE-PANEL LAYOUT ── */
    .go-left{width:128px;flex-shrink:0;display:flex;flex-direction:column;gap:5px;padding:22px 6px 6px;align-items:stretch;position:relative;z-index:2;}
    .go-right{display:none;}
    .go-olimpus-wrap{
      position:absolute;
      right:0;
      top:50%;
      transform:translate(calc(100% + 10px),-50%);
      height:calc((5 * ((min(460px,calc(100vh - 200px)) - 36px) / 6) + 32px) * 1.1);
      aspect-ratio:11/16;
      pointer-events:none;
      z-index:10;
    }
    @keyframes goOlimpusFloat{
      0%,100%{transform:translateY(0px);}
      50%{transform:translateY(-12px);}
    }
    @keyframes goOlimpusBoltFlash{
      0%  {opacity:0;}
      8%  {opacity:1;}
      18% {opacity:.3;}
      28% {opacity:.95;}
      40% {opacity:.15;}
      52% {opacity:.8;}
      68% {opacity:0;}
      100%{opacity:0;}
    }
    @keyframes goOlimpusBoltLine{
      0%  {opacity:0;stroke-dashoffset:300;}
      10% {opacity:1;stroke-dashoffset:200;}
      35% {opacity:.7;stroke-dashoffset:80;}
      60% {opacity:0;stroke-dashoffset:0;}
      100%{opacity:0;}
    }
    .go-olimpus-img{
      position:absolute;inset:0;
      width:100%;height:100%;
      object-fit:contain;
      object-position:center bottom;
      display:block;
      filter:drop-shadow(0 0 18px rgba(180,100,255,.55)) drop-shadow(0 0 6px rgba(245,196,0,.35));
      transition:filter .3s;
      animation:goOlimpusFloat 3.6s ease-in-out infinite;
    }
    .go-olimpus-img.multi{animation:none;filter:drop-shadow(0 0 28px rgba(245,196,0,.9)) drop-shadow(0 0 14px rgba(255,200,50,.7)) drop-shadow(0 0 40px rgba(200,120,255,.5));}
    .go-arena{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;overflow:visible;position:relative;z-index:2;padding-top:22px;gap:0;}

    /* ── MAIN direction override ── */
    .go-main{flex-direction:row !important;}

    /* ── BUY FS button ── */
    .go-buy-fs-btn{width:100%;padding:7px 4px;border-radius:10px;cursor:pointer;
      background:linear-gradient(160deg,#0a8a18,#14c025,#0a8a18);
      border:2px solid rgba(40,220,70,.65);color:#fff;font-family:'Space Grotesk',sans-serif;font-size:.52rem;font-weight:900;
      text-align:center;letter-spacing:.04em;line-height:1.35;
      box-shadow:0 0 14px rgba(15,180,40,.5),0 3px 8px rgba(0,0,0,.6);transition:all .15s;}
    .go-buy-fs-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 0 22px rgba(15,180,40,.75),0 4px 12px rgba(0,0,0,.6);}
    .go-buy-fs-btn:disabled{opacity:.35;cursor:not-allowed;}

    /* ── ANTE panel (Double Chance) ── */
    .go-ante-panel{width:100%;padding:6px 7px;border-radius:9px;cursor:pointer;user-select:none;
      background:linear-gradient(145deg,rgba(80,40,0,.55),rgba(50,20,0,.65));
      border:1.5px solid rgba(245,196,0,.3);box-shadow:0 2px 8px rgba(0,0,0,.4);}
    .go-ante-panel.on{background:linear-gradient(145deg,rgba(140,80,0,.45),rgba(100,50,0,.55));border-color:rgba(245,196,0,.65);box-shadow:0 0 10px rgba(245,196,0,.18),0 2px 8px rgba(0,0,0,.4);}

    /* ── TUMBLE HISTORY panel — Greek mythology border ── */
    @keyframes goGreekShimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}
    .go-tumble-hist{
      width:100%;flex:1;display:flex;flex-direction:column;gap:2px;overflow:hidden;min-height:60px;
      position:relative;border-radius:9px;
      /* Greek meander/key border using box-shadow layers */
      border:2px solid transparent;
      background-clip:padding-box;
      box-shadow:
        0 0 0 2px rgba(245,196,0,.85),
        0 0 0 3px rgba(160,90,0,.6),
        0 0 0 4px rgba(245,196,0,.4),
        inset 0 0 14px rgba(0,0,0,.3);
      background:linear-gradient(145deg,rgba(12,4,30,.78),rgba(8,2,20,.82));
      padding:5px;
    }
    /* Greek meander corner ornaments via pseudo overlay */
    .go-tumble-hist::before{
      content:'';position:absolute;inset:0;border-radius:7px;pointer-events:none;
      background:
        linear-gradient(90deg,rgba(245,196,0,.18) 0%,transparent 15%,transparent 85%,rgba(245,196,0,.18) 100%),
        linear-gradient(180deg,rgba(245,196,0,.18) 0%,transparent 15%,transparent 85%,rgba(245,196,0,.18) 100%);
      z-index:0;
    }
    .go-tumble-hist::after{
      content:'⚜ TUMBLE ⚜';
      position:absolute;top:-10px;left:50%;transform:translateX(-50%);
      font-family:'Space Grotesk',sans-serif;font-size:.38rem;font-weight:900;
      letter-spacing:.15em;color:#f5c400;
      background:linear-gradient(135deg,rgba(8,2,20,.95),rgba(20,8,48,.98));
      border:1.5px solid rgba(245,196,0,.6);border-radius:4px;
      padding:1px 7px;white-space:nowrap;
      text-shadow:0 0 8px rgba(245,196,0,.7);
      box-shadow:0 0 10px rgba(245,196,0,.2);
      z-index:5;
    }
    @keyframes goTHIn{0%{opacity:0;transform:translateX(-6px)}100%{opacity:1;transform:translateX(0)}}
    .go-th-row{
      display:flex;align-items:center;padding:3px 6px;border-radius:5px;
      background:rgba(0,0,0,.5);
      border:1px solid rgba(245,196,0,.2);
      gap:3px;position:relative;z-index:1;
      animation:goTHIn .22s cubic-bezier(.34,1.4,.64,1) both;
    }
    .go-th-n{color:rgba(245,196,0,.5);font-size:.42rem;font-weight:700;flex-shrink:0;min-width:12px;}
    .go-th-sym{font-size:.8rem;flex-shrink:0;line-height:1;}
    .go-th-win{color:#ffe066;font-weight:700;font-variant-numeric:tabular-nums;font-size:.55rem;text-align:right;flex:1;}

    /* ── WIN display box ── */
    .go-info-square{background:linear-gradient(145deg,rgba(10,4,30,.92),rgba(5,2,15,.96));border:1.5px solid rgba(245,196,0,.22);border-radius:8px;width:100%;min-height:44px;display:flex;align-items:center;justify-content:center;}

    /* ── BONUS BAR ── */
    .go-bonus-bar{display:flex;flex-direction:column;align-items:center;gap:3px;background:linear-gradient(135deg,rgba(80,40,200,.14),rgba(245,196,0,.09));border-radius:10px;border:1px solid rgba(130,100,255,.22);padding:6px 7px;text-align:center;width:100%;}

    .go-frame{position:relative;padding:0;
      background:transparent;border:none;
      box-shadow:0 0 70px rgba(0,0,0,.8);}
    .go-frame-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;pointer-events:none;z-index:0;border-radius:0;}

    .go-grid{display:grid;touch-action:none;grid-template-columns:repeat(6,1fr);gap:4px;width:min(460px,calc(100vh - 200px));position:relative;z-index:1;padding:8px;overflow:hidden;}

    .go-cell{position:relative;border-radius:9px;
      background:transparent;border:none;
      display:flex;align-items:center;justify-content:center;overflow:hidden;aspect-ratio:1;min-width:0;
      transition:border-color .2s,box-shadow .2s;}
    .go-cell::after{content:'';position:absolute;inset:0;background:transparent;border-radius:7px;pointer-events:none;}
    .go-cell.win{border:2px solid rgba(245,196,0,.9)!important;box-shadow:inset 0 0 24px rgba(245,196,0,.45),0 0 22px rgba(245,196,0,.5),0 0 8px rgba(245,196,0,.7)!important;animation:goWinPulse .45s ease infinite;border-radius:9px;}
    .go-cell.removing{animation:goRemove .38s cubic-bezier(.55,.06,.68,.19) forwards!important;}
    .go-cell.bolt-cell{border:2px solid rgba(245,196,0,.7)!important;box-shadow:inset 0 0 20px rgba(245,196,0,.3),0 0 20px rgba(245,196,0,.28);animation:goBoltPulse 1.5s ease infinite;border-radius:9px;}
    .go-cell.bolt-striking{animation:goBoltStrikeCell .55s ease forwards!important;overflow:visible!important;}
    /* go-sym: NO default animation — must be applied explicitly via mode class */
    .go-sym{width:100%;height:100%;display:flex;align-items:center;justify-content:center;will-change:transform,opacity;backface-visibility:hidden;-webkit-backface-visibility:hidden;}
    /* Initial spin drop (all cells) — easeOutQuint: rýchly štart, plynulé brzdenie */
    .go-sym.go-fall{animation:goFall var(--fdur,500ms) cubic-bezier(0.28,0.84,0.42,1) both;animation-delay:var(--fdelay,0ms);}
    /* Cascade new cells from top */
    .go-sym.go-tumble{animation:goFallTumble var(--fdur,460ms) cubic-bezier(0.28,0.84,0.42,1) both;animation-delay:var(--fdelay,0ms);}
    /* Gravity shift (existing symbol moves down) — stays opaque */
    .go-sym.go-gravity{animation:goGravity var(--fdur,290ms) cubic-bezier(0.28,0.84,0.42,1) both;animation-delay:var(--fdelay,0ms);opacity:1!important;}
    /* Stationary — no animation at all, stays visible */
    .go-sym.go-still{animation:none!important;opacity:1!important;transform:none!important;}
    /* ── EXIT — symbol kĺže dole von z gridu, fade out ── */
    @keyframes goFallExit{
      0%   {transform:translateY(0);opacity:1;}
      18%  {opacity:1;}
      80%  {opacity:0;}
      100% {transform:translateY(110%);opacity:0;}
    }
    .go-sym.go-exit{animation:goFallExit var(--fdur,220ms) cubic-bezier(0.55,0,1,0.45) forwards;animation-delay:var(--fdelay,0ms);}

    .go-bottom{height:64px;flex-shrink:0;position:relative;z-index:10;
      background:linear-gradient(180deg,rgba(15,5,40,.99),rgba(8,2,22,1));
      border-top:1px solid rgba(180,100,255,.2);
      display:flex;align-items:center;gap:0;
      box-shadow:0 -6px 40px rgba(0,0,0,.95),0 -1px 0 rgba(245,196,0,.06);}
    .go-bottom::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent 0%,rgba(245,196,0,.45) 25%,rgba(255,224,102,.8) 50%,rgba(245,196,0,.45) 75%,transparent 100%);}

    .go-btm-left{display:flex;align-items:center;gap:0;padding:0 6px;flex-shrink:0;}
    .go-ic-btn{width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:none;border:none;color:rgba(180,155,255,.4);font-size:1.05rem;cursor:pointer;border-radius:6px;transition:color .14s,background .14s;}
    .go-ic-btn:hover{color:rgba(245,196,0,.9);background:rgba(245,196,0,.07);}

    .go-btm-info{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;overflow:hidden;}
    .go-btm-credits{display:flex;gap:24px;align-items:baseline;}
    .go-btm-lbl{font-size:.48rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(245,196,0,.65);}
    .go-btm-val{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:800;color:#ffe066;font-variant-numeric:tabular-nums;text-shadow:0 0 12px rgba(245,196,0,.4);}
    .go-btm-hint{font-size:.44rem;color:rgba(255,255,255,.18);letter-spacing:.08em;text-transform:uppercase;margin-top:1px;}

    .go-btm-right{display:flex;align-items:center;gap:6px;padding:0 8px;flex-shrink:0;}
    .go-adj-btn{width:30px;height:30px;border-radius:50%;border:1.5px solid rgba(245,196,0,.4);background:linear-gradient(145deg,rgba(25,10,65,.95),rgba(12,4,35,.98));color:#ffe066;font-size:1.1rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .14s;line-height:1;box-shadow:0 2px 8px rgba(0,0,0,.5);}
    .go-adj-btn:hover:not(:disabled){background:rgba(245,196,0,.12);border-color:#f5c400;box-shadow:0 0 14px rgba(245,196,0,.25);}
    .go-adj-btn:disabled{opacity:.28;cursor:not-allowed;}

    .go-big-spin{width:54px;height:54px;border-radius:50%;border:none;cursor:pointer;
      background:linear-gradient(145deg,#b45309,#f5c400,#ffe066,#f5c400,#b45309);
      box-shadow:0 0 24px rgba(245,196,0,.6),0 4px 14px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.3);
      display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .15s,box-shadow .15s;animation:goSpinBtnPulse 2s ease infinite;}
    .go-big-spin:hover:not(:disabled){transform:scale(1.07);box-shadow:0 0 36px rgba(245,196,0,.85),0 6px 18px rgba(0,0,0,.7);}
    .go-big-spin:active:not(:disabled){transform:scale(.96);}
    .go-big-spin:disabled{opacity:.35;cursor:not-allowed;animation:none;background:#3a2800;box-shadow:none;}
    .go-big-spin svg{width:26px;height:26px;}
    .go-big-spin.bonus{background:linear-gradient(145deg,#0a5010,#0f8020,#28d040,#0f8020,#0a5010)!important;box-shadow:0 0 22px rgba(40,200,60,.5),0 4px 14px rgba(0,0,0,.7)!important;}
    .go-big-spin.bonus svg{stroke:#004000;}

    .go-autoplay-btn{height:32px;padding:0 12px;border-radius:16px;border:1.5px solid rgba(245,196,0,.4);background:rgba(15,8,42,.9);color:rgba(245,196,0,.85);font-size:.52rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;white-space:nowrap;transition:all .14s;display:flex;align-items:center;gap:4px;}
    .go-autoplay-btn:hover{background:rgba(245,196,0,.12);border-color:rgba(245,196,0,.7);color:#ffe066;}

    .go-buy-fs-btn{width:100%;padding:7px 5px;border-radius:10px;cursor:pointer;
      background:linear-gradient(160deg,#0a8a18,#14c025,#0a8a18);
      border:2px solid rgba(40,220,70,.65);color:#fff;font-family:'Space Grotesk',sans-serif;font-size:.56rem;font-weight:900;
      text-align:center;letter-spacing:.04em;line-height:1.3;
      box-shadow:0 0 14px rgba(15,180,40,.5),0 3px 8px rgba(0,0,0,.6);transition:all .15s;}
    .go-buy-fs-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 0 22px rgba(15,180,40,.75),0 4px 12px rgba(0,0,0,.6);}
    .go-buy-fs-btn:disabled{opacity:.35;cursor:not-allowed;}

    .go-ante-panel{background:linear-gradient(155deg,rgba(215,190,125,.95),rgba(188,158,92,.97));border:2px solid rgba(155,118,50,.75);border-radius:10px;padding:7px 7px;width:100%;box-shadow:0 2px 10px rgba(0,0,0,.5);}

    /* go-info-square removed - using tumble-hist panel instead */

    .go-mult-pool{position:absolute;top:8px;right:8px;font-family:'Space Grotesk',sans-serif;font-size:1.4rem;font-weight:900;color:#ffe066;text-shadow:0 0 20px rgba(245,196,0,.9);background:rgba(0,0,0,.6);border-radius:10px;padding:3px 10px;border:1.5px solid rgba(245,196,0,.5);z-index:15;pointer-events:none;animation:goMultPoolBounce .4s cubic-bezier(.34,1.5,.64,1);}
    .go-bolt-pop{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:900;color:#ffe066;text-shadow:0 0 16px rgba(245,196,0,.9);z-index:20;pointer-events:none;animation:goMultPop .85s cubic-bezier(.22,1,.36,1) forwards;}

    .go-trigger-ov{position:absolute;inset:0;background:rgba(0,0,0,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:50;backdrop-filter:blur(14px);}
    .go-end-ov{position:absolute;inset:0;background:rgba(0,0,0,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:50;}
    .go-fs-counter{font-family:'Space Grotesk',sans-serif;font-size:3rem;font-weight:900;color:#c4b5fd;line-height:1;text-shadow:0 0 24px rgba(160,120,255,.7);}
    .go-pool-counter{font-family:'Space Grotesk',sans-serif;font-size:2rem;font-weight:900;color:#ffe066;text-shadow:0 0 20px rgba(245,196,0,.8);animation:goMultPoolBounce .5s cubic-bezier(.34,1.4,.64,1) both;}

    .go-win-banner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);height:0;overflow:visible;pointer-events:none;display:flex;align-items:center;justify-content:center;z-index:25;}
    @keyframes goWinSplitL{from{opacity:0;transform:translateX(-90px) scale(.7)}to{opacity:1;transform:translateX(-54px) scale(1)}}
    @keyframes goWinSplitR{from{opacity:0;transform:translateX(90px) scale(.7)}to{opacity:1;transform:translateX(54px) scale(1)}}
    @keyframes goWinMergeL{from{transform:translateX(-54px)}to{transform:translateX(0)}}
    @keyframes goWinMergeR{from{transform:translateX(54px)}to{transform:translateX(0)}}
    @keyframes goWinFinalPop{0%{opacity:0;transform:scale(.3) translateY(4px)}55%{transform:scale(1.18) translateY(-3px);opacity:1}80%{transform:scale(.94)}100%{transform:scale(1) translateY(0);opacity:1}}
    @keyframes goWinFinalOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.75) translateY(8px)}}
    @keyframes goWinSubIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    .go-wb-split-l{position:absolute;font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:800;color:rgba(196,181,253,.9);text-shadow:0 0 16px rgba(160,120,255,.6);white-space:nowrap;will-change:transform,opacity;}
    .go-wb-split-r{position:absolute;font-family:'Space Grotesk',sans-serif;font-size:1.7rem;font-weight:900;color:#ffe066;text-shadow:0 0 20px rgba(245,196,0,.8);white-space:nowrap;will-change:transform,opacity;}
    .go-wb-final{position:absolute;display:flex;flex-direction:column;align-items:center;gap:3px;white-space:nowrap;}
    .go-wb-total{font-family:'Space Grotesk',sans-serif;font-size:2.4rem;font-weight:900;color:#f5c400;text-shadow:0 0 22px rgba(245,196,0,.9),0 0 60px rgba(245,196,0,.4);line-height:1;}
    .go-wb-sub{font-family:'Space Grotesk',sans-serif;font-size:.84rem;font-weight:700;color:rgba(200,180,255,.6);letter-spacing:.03em;}
    .go-win-banner.split .go-wb-split-l{animation:goWinSplitL .38s cubic-bezier(.34,1.3,.64,1) both;}
    .go-win-banner.split .go-wb-split-r{animation:goWinSplitR .38s cubic-bezier(.34,1.3,.64,1) both;}
    .go-win-banner.split .go-wb-final{display:none;}
    .go-win-banner.merge .go-wb-split-l{animation:goWinMergeL .42s cubic-bezier(.6,0,.4,1) forwards;}
    .go-win-banner.merge .go-wb-split-r{animation:goWinMergeR .42s cubic-bezier(.6,0,.4,1) forwards;}
    .go-win-banner.merge .go-wb-final{display:none;}
    .go-win-banner.final .go-wb-split-l,.go-win-banner.final .go-wb-split-r{display:none;}
    .go-win-banner.final .go-wb-final{animation:goWinFinalPop .5s cubic-bezier(.34,1.3,.64,1) both;}
    .go-win-banner.final .go-wb-sub{animation:goWinSubIn .4s .25s ease both;}
    .go-win-banner.out .go-wb-split-l,.go-win-banner.out .go-wb-split-r{display:none;}
    .go-win-banner.out .go-wb-final{animation:goWinFinalOut .4s ease forwards;}
    .go-win-banner.hidden .go-wb-split-l,.go-win-banner.hidden .go-wb-split-r,.go-win-banner.hidden .go-wb-final{display:none;}

    .go-buy-modal-bg{position:absolute;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;background:rgba(3,1,14,.78);backdrop-filter:blur(6px);}
    .go-buy-modal{background:linear-gradient(160deg,rgba(18,8,50,.98),rgba(8,3,24,.99));border:1.5px solid rgba(245,196,0,.35);border-radius:22px;padding:28px 24px 22px;width:min(340px,90vw);display:flex;flex-direction:column;gap:18px;animation:goModalIn .4s cubic-bezier(.34,1.2,.64,1) both;box-shadow:0 0 60px rgba(245,196,0,.12),0 30px 80px rgba(0,0,0,.85);}
    .go-buy-modal-title{font-family:'Space Grotesk',sans-serif;font-size:1.4rem;font-weight:900;color:#ffe066;text-align:center;text-shadow:0 0 20px rgba(245,196,0,.7);letter-spacing:.04em;}
    .go-buy-modal-sub{font-size:.75rem;color:rgba(200,180,255,.55);text-align:center;margin-top:-10px;line-height:1.5;}
    .go-buy-option{border-radius:14px;border:1.5px solid rgba(130,100,255,.22);background:rgba(30,15,70,.5);padding:16px 18px;cursor:pointer;transition:all .18s cubic-bezier(.34,1.2,.64,1);display:flex;justify-content:space-between;align-items:center;gap:12px;}
    .go-buy-option:hover{border-color:rgba(245,196,0,.55);background:rgba(50,30,100,.7);transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.4);}
    .go-buy-option.selected{border-color:rgba(245,196,0,.9);background:rgba(60,35,10,.6);box-shadow:0 0 0 3px rgba(245,196,0,.18),0 0 30px rgba(245,196,0,.18);animation:goBuyPulse 2s ease infinite;}
    .go-buy-opt-name{font-family:'Space Grotesk',sans-serif;font-size:.92rem;font-weight:800;color:#c4b5fd;margin-bottom:3px;}
    .go-buy-opt-desc{font-size:.65rem;color:rgba(160,140,255,.55);line-height:1.4;}
    .go-buy-opt-price{font-family:'Space Grotesk',sans-serif;font-size:1.15rem;font-weight:900;color:#ffe066;white-space:nowrap;text-shadow:0 0 12px rgba(245,196,0,.5);}
    .go-buy-confirm{width:100%;padding:13px;border-radius:12px;border:none;background:linear-gradient(135deg,#b45309,#f5c400,#b45309);background-size:200% auto;animation:goShimmerSlide 3s linear infinite;color:#1a0800;font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:900;cursor:pointer;letter-spacing:.04em;transition:transform .15s,box-shadow .15s;box-shadow:0 4px 20px rgba(245,196,0,.4);}
    .go-buy-confirm:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 32px rgba(245,196,0,.6);}
    .go-buy-confirm:disabled{opacity:.35;cursor:not-allowed;animation:none;background:#3a2800;}
    .go-buy-cancel{width:100%;padding:9px;border-radius:10px;border:1px solid rgba(130,100,255,.2);background:transparent;color:rgba(160,140,255,.5);font-family:var(--f);font-size:.78rem;font-weight:600;cursor:pointer;transition:all .14s;margin-top:-6px;}
    .go-buy-cancel:hover{background:rgba(130,100,255,.08);color:rgba(160,140,255,.8);}

    .go-bonus-bar{display:flex;flex-direction:column;align-items:center;gap:4px;background:linear-gradient(135deg,rgba(80,40,200,.14),rgba(245,196,0,.09));border-radius:12px;border:1px solid rgba(130,100,255,.25);padding:6px 8px;text-align:center;width:100%;}
  `;


  const goSym=useCallback((sym)=>{
    if(!sym)return null;
    if(sym==="bolt")return GO_SYM_RENDER.bolt(null);
    return GO_SYM_RENDER[sym]?.();
  },[]);

  // ── Zeus figure SVG for right panel / intro ──
  const ZeusSVG=()=>(
    <svg viewBox="0 0 120 280" width="100%" height="100%" style={{filter:"drop-shadow(0 0 18px rgba(245,196,0,.25))"}}>
      {/* Robe */}
      <ellipse cx="60" cy="200" rx="38" ry="70" fill="#e8dcc8"/>
      <rect x="22" y="140" width="76" height="130" rx="14" fill="#e8dcc8"/>
      {/* Toga drape */}
      <path d="M22 155 Q18 200 24 270" stroke="#c8b898" strokeWidth="3" fill="none"/>
      <path d="M98 155 Q102 200 96 270" stroke="#c8b898" strokeWidth="3" fill="none"/>
      {/* Belt */}
      <rect x="20" y="170" width="80" height="8" rx="4" fill="#c8a000"/>
      {/* Chest / skin */}
      <ellipse cx="60" cy="130" rx="28" ry="32" fill="#d4a870"/>
      {/* Arms */}
      <path d="M32 140 Q10 160 8 185" stroke="#d4a870" strokeWidth="14" strokeLinecap="round" fill="none"/>
      <path d="M88 140 Q110 155 115 175" stroke="#d4a870" strokeWidth="14" strokeLinecap="round" fill="none"/>
      {/* Lightning bolt in right hand */}
      <path d="M108 170 L118 158 L112 160 L120 145 L106 158 L113 156 Z" fill="#f5c400" stroke="#c8a000" strokeWidth="1"/>
      {/* Gold bracers */}
      <rect x="4" y="178" width="10" height="10" rx="3" fill="#c8a000"/>
      <rect x="108" y="168" width="10" height="10" rx="3" fill="#c8a000"/>
      {/* Head */}
      <ellipse cx="60" cy="88" rx="24" ry="26" fill="#d4a870"/>
      {/* Crown / laurel */}
      <ellipse cx="60" cy="68" rx="26" ry="6" fill="#c8a000"/>
      {[44,50,56,62,68,72,76].map((x,i)=>(
        <ellipse key={i} cx={x} cy={64} rx={3} ry={5} fill="#f5c400" transform={`rotate(${(i-3)*8},${x},64)`}/>
      ))}
      {/* Eyes - glowing */}
      <ellipse cx="52" cy="88" rx="4" ry="3.5" fill="#1a0040"/>
      <ellipse cx="68" cy="88" rx="4" ry="3.5" fill="#1a0040"/>
      <ellipse cx="52" cy="87" rx="1.5" ry="1.5" fill="#60a0ff"/>
      <ellipse cx="68" cy="87" rx="1.5" ry="1.5" fill="#60a0ff"/>
      {/* Beard */}
      <path d="M42 100 Q45 116 50 120 Q60 125 70 120 Q75 116 78 100" fill="#c8c8c8" stroke="#aaa" strokeWidth="1"/>
      <path d="M46 102 Q48 114 52 118" stroke="#fff" strokeWidth="1.5" fill="none" opacity=".5"/>
      {/* Eyebrows */}
      <path d="M47 82 Q52 79 57 81" stroke="#888" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M63 81 Q68 79 73 82" stroke="#888" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Gold sandal straps at bottom */}
      <path d="M30 265 Q60 260 90 265" stroke="#c8a000" strokeWidth="3" fill="none"/>
      <path d="M35 258 Q60 254 85 258" stroke="#c8a000" strokeWidth="2" fill="none"/>
    </svg>
  );

  // ── Flame torch SVG ──
  const FlameSVG=({flip=false})=>(
    <svg viewBox="0 0 30 90" width="30" height="90" style={{transform:flip?"scaleX(-1)":"none"}}>
      {/* Pole */}
      <rect x="12" y="40" width="6" height="50" rx="3" fill="#8b6000"/>
      <rect x="13" y="38" width="4" height="52" rx="2" fill="#a07010"/>
      {/* Bowl */}
      <path d="M6 42 Q15 36 24 42 Q22 50 15 52 Q8 50 6 42Z" fill="#6b4800"/>
      <path d="M8 41 Q15 37 22 41" stroke="#8b6000" strokeWidth="2" fill="none"/>
      {/* Flames animated */}
      <g style={{transformOrigin:"15px 38px",animation:"goFlameFlick 0.8s ease-in-out infinite"}}>
        <ellipse cx="15" cy="30" rx="7" ry="12" fill="rgba(255,100,0,.9)"/>
        <ellipse cx="15" cy="26" rx="5" ry="9" fill="rgba(255,160,0,.85)"/>
        <ellipse cx="15" cy="22" rx="3.5" ry="6" fill="rgba(255,220,50,.8)"/>
        <ellipse cx="13" cy="32" rx="3" ry="7" fill="rgba(255,60,0,.7)" style={{animationDelay:".15s"}}/>
        <ellipse cx="17" cy="31" rx="3" ry="8" fill="rgba(255,80,0,.7)" style={{animationDelay:".3s"}}/>
      </g>
    </svg>
  );

  if(showIntro){
    // Particle data for golden sparks
    const introParts=Array.from({length:22},(_,i)=>({
      id:i,
      left:`${5+Math.random()*90}%`,
      bottom:`${8+Math.random()*55}%`,
      size:Math.random()*5+2,
      dur:`${3+Math.random()*4}s`,
      del:`${Math.random()*5}s`,
      opacity:Math.random()*.7+.3,
    }));
    return(
      <div className="go-game">
        <style>{GO_CSS}</style>
        <div className="go-intro" onClick={()=>{sfx.click();setShowIntro(false);}}>
          <style>{`
            @keyframes goIntroIn{0%{opacity:0;transform:scale(.96)}100%{opacity:1;transform:scale(1)}}
            @keyframes goIntroPanelIn{0%{opacity:0;transform:translateY(28px)}100%{opacity:1;transform:translateY(0)}}
            @keyframes goIntroTitleIn2{0%{opacity:0;transform:translateX(-50%) translateY(-24px) scale(.93)}100%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}
            @keyframes goIntroCtcPulse{0%,100%{opacity:.88;transform:translateX(-50%) scale(1)}50%{opacity:1;transform:translateX(-50%) scale(1.04)}}
            @keyframes goIntroBadgeSpin{0%{transform:rotate(-7deg) scale(1)}50%{transform:rotate(7deg) scale(1.06)}100%{transform:rotate(-7deg) scale(1)}}
            @keyframes goIntroPillarFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
            @keyframes goIntroMultFloat{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}}
            @keyframes goIntroScatterFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-7px) scale(1.06)}}
            @keyframes goIntroAuroraShift2{0%{opacity:.6}50%{opacity:1}100%{opacity:.6}}
          `}</style>

          {/* ── BACKGROUND: GOO-authentic purple twilight sky → golden horizon ── */}
          <div style={{position:"absolute",inset:0,
            background:"linear-gradient(180deg,#0a0418 0%,#1a0638 8%,#2d0c5a 18%,#481070 30%,#6b2080 42%,#a04018 58%,#d07020 72%,#e8a030 84%,#f5c400 100%)",
            animation:"goIntroIn .5s ease both",
          }}/>

          {/* Aurora shimmer */}
          <div style={{position:"absolute",inset:0,pointerEvents:"none",
            background:"radial-gradient(ellipse 120% 45% at 50% 0%,rgba(180,80,255,.18) 0%,transparent 55%),radial-gradient(ellipse 60% 30% at 20% 15%,rgba(100,40,220,.15) 0%,transparent 50%),radial-gradient(ellipse 60% 30% at 80% 15%,rgba(80,20,200,.12) 0%,transparent 50%),radial-gradient(ellipse 100% 40% at 50% 100%,rgba(245,196,0,.45) 0%,transparent 55%)",
            animation:"goIntroAuroraShift 8s ease-in-out infinite",
          }}/>

          {/* Clouds SVG */}
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="cBlur"><feGaussianBlur stdDeviation="10"/></filter>
              <filter id="cBlurSoft"><feGaussianBlur stdDeviation="5"/></filter>
            </defs>
            <ellipse cx="80" cy="200" rx="140" ry="65" fill="rgba(255,255,255,.82)" filter="url(#cBlur)" opacity=".85"/>
            <ellipse cx="50" cy="225" rx="95" ry="50" fill="rgba(255,255,255,.65)" filter="url(#cBlurSoft)"/>
            <ellipse cx="130" cy="190" rx="85" ry="45" fill="rgba(255,250,220,.7)" filter="url(#cBlurSoft)"/>
            <ellipse cx="720" cy="200" rx="140" ry="65" fill="rgba(255,255,255,.82)" filter="url(#cBlur)" opacity=".85"/>
            <ellipse cx="760" cy="225" rx="95" ry="50" fill="rgba(255,255,255,.65)" filter="url(#cBlurSoft)"/>
            <ellipse cx="670" cy="190" rx="85" ry="45" fill="rgba(255,250,220,.7)" filter="url(#cBlurSoft)"/>
            <ellipse cx="400" cy="370" rx="370" ry="75" fill="rgba(255,250,220,.4)" filter="url(#cBlur)" opacity=".75"/>
          </svg>

          {/* Temple scene */}
          <svg style={{position:"absolute",bottom:0,left:0,right:0,width:"100%",pointerEvents:"none"}} viewBox="0 0 800 260" preserveAspectRatio="xMidYMax meet">
            <defs>
              <linearGradient id="gi2GroundG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f5c400"/><stop offset="100%" stopColor="#7a4800"/></linearGradient>
              <linearGradient id="gi2ColG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ffe8a0"/><stop offset="30%" stopColor="#fff8e0"/><stop offset="70%" stopColor="#fff4d0"/><stop offset="100%" stopColor="#e8c060"/></linearGradient>
              <linearGradient id="gi2RoofG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fff4c0"/><stop offset="100%" stopColor="#d4a020"/></linearGradient>
              <filter id="gi2Glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <rect x="0" y="210" width="800" height="50" fill="url(#gi2GroundG)"/>
            <rect x="150" y="196" width="500" height="16" rx="2" fill="#f0c040" opacity=".95"/>
            <rect x="140" y="183" width="520" height="15" rx="2" fill="#e8b830" opacity=".9"/>
            <rect x="225" y="102" width="350" height="14" rx="2" fill="rgba(255,240,180,.92)" opacity=".95"/>
            <rect x="238" y="116" width="324" height="68" rx="2" fill="rgba(255,235,160,.75)" opacity=".85"/>
            <path d="M215 102 L400 52 L585 102 Z" fill="url(#gi2RoofG)" opacity=".95"/>
            <circle cx="400" cy="50" r="7" fill="#ffe060" filter="url(#gi2Glow)"/>
            {[0,1,2,3,4,5,6,7].map(i=>(
              <g key={i}>
                <rect x={245+i*43} y="116" width="13" height="68" rx="3" fill="url(#gi2ColG)" opacity=".9"/>
                <rect x={242+i*43} y="112" width="19" height="6" rx="2" fill="#fff4c0" opacity=".95"/>
              </g>
            ))}
          </svg>

          {/* ── BADGE top right (like LB) ── */}
          <div style={{position:"absolute",top:10,right:10,zIndex:10,animation:"goIntroBadgeSpin 3.5s ease-in-out infinite"}}>
            <svg width="88" height="88" viewBox="0 0 90 90">
              <defs>
                <radialGradient id="goBadgeG" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#fff8c0"/>
                  <stop offset="50%" stopColor="#f5c400"/>
                  <stop offset="100%" stopColor="#8b6000"/>
                </radialGradient>
              </defs>
              {[...Array(16)].map((_,i)=>{
                const a=i*(360/16)*Math.PI/180;
                return <line key={i} x1={45+Math.cos(a)*34} y1={45+Math.sin(a)*34} x2={45+Math.cos(a)*42} y2={45+Math.sin(a)*42} stroke="#f5c400" strokeWidth="3" opacity=".9"/>;
              })}
              <circle cx="45" cy="45" r="33" fill="url(#goBadgeG)" stroke="#8b6000" strokeWidth="2"/>
              <circle cx="45" cy="45" r="29" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1.2"/>
              <text x="45" y="30" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontSize="7" fontWeight="900" fill="#3a2000" letterSpacing=".08em">NESTÁLOSŤ</text>
              <text x="45" y="43" textAnchor="middle" fontFamily="'Rye',serif" fontSize="11" fill="#1a0800">VEĽMI</text>
              <text x="45" y="54" textAnchor="middle" fontFamily="'Rye',serif" fontSize="9" fill="#1a0800">VYSOKÁ</text>
              <text x="45" y="64" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontSize="8" fontWeight="900" fill="#3a2000">5000×</text>
              {[[22,18],[68,18],[45,12],[15,38],[75,38]].map(([x,y],i)=>(
                <text key={i} x={x} y={y} textAnchor="middle" fontSize="6" fill="#fff8c0" opacity=".9">✦</text>
              ))}
            </svg>
          </div>

          {/* ── TITLE centered at top ── */}
          <div style={{
            position:"absolute",top:"5%",left:"50%",transform:"translateX(-50%)",
            textAlign:"center",zIndex:5,width:"max-content",
            animation:"goIntroTitleIn2 .7s cubic-bezier(.34,1.2,.64,1) both",
          }}>
            {/* Laurel */}
            <div style={{display:"flex",justifyContent:"center",marginBottom:2}}>
              <svg viewBox="0 0 240 30" width="220" height="28">
                {[0,1,2,3,4,5,6].map(i=>{
                  const x=118-i*15,angle=-28+i*7;
                  return <ellipse key={i} cx={x} cy={15-Math.abs(i-3)*1.5} rx="8" ry="4.5"
                    fill={i%2===0?"#c8a000":"#f5c400"} opacity={.5+i*.06}
                    transform={`rotate(${angle},${x},${15-Math.abs(i-3)*1.5})`}/>;
                })}
                {[0,1,2,3,4,5,6].map(i=>{
                  const x=122+i*15,angle=28-i*7;
                  return <ellipse key={i} cx={x} cy={15-Math.abs(i-3)*1.5} rx="8" ry="4.5"
                    fill={i%2===0?"#c8a000":"#f5c400"} opacity={.5+i*.06}
                    transform={`rotate(${angle},${x},${15-Math.abs(i-3)*1.5})`}/>;
                })}
                <circle cx="120" cy="15" r="4.5" fill="#f5c400" stroke="#fff8c0" strokeWidth=".8"/>
              </svg>
            </div>
            <div style={{fontFamily:"'Rye',serif",fontSize:"clamp(.85rem,2.2vw,1.2rem)",color:"rgba(255,224,102,.9)",letterSpacing:".22em",textTransform:"uppercase",textShadow:"0 0 18px rgba(245,196,0,.6),0 2px 6px rgba(0,0,0,.8)"}}>Gates of</div>
            <div style={{fontFamily:"'Rye',serif",fontSize:"clamp(2.4rem,7vw,4.2rem)",fontWeight:900,
              background:"linear-gradient(180deg,#fff8c0 0%,#f5c400 45%,#c8a000 70%,#ffe066 100%)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
              filter:"drop-shadow(0 4px 12px rgba(0,0,0,.85)) drop-shadow(0 0 28px rgba(245,196,0,.6))",
              lineHeight:.9,letterSpacing:".04em",
            }}>OLYMPUS</div>
            <div style={{margin:"5px auto 0",width:"75%",height:2,background:"linear-gradient(90deg,transparent,rgba(245,196,0,.5),#ffe066,#fff8c0,#ffe066,rgba(245,196,0,.5),transparent)"}}/>
            {/* Volatility row */}
            <div style={{marginTop:10,display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"'Space Grotesk',sans-serif",fontSize:".58rem",fontWeight:900,color:"rgba(200,170,80,.8)",letterSpacing:".2em",textTransform:"uppercase"}}>
              <span>Nestálosť</span>
              <div style={{display:"flex",gap:3}}>
                {[1,1,1,1,1].map((op,i)=>(
                  <svg key={i} width="12" height="16" viewBox="0 0 14 18">
                    <polygon points="7,1 13,17 1,17" fill="none" stroke="rgba(245,196,0,.9)" strokeWidth="1.8"/>
                    <polygon points="7,4 11,15 3,15" fill="rgba(245,196,0,.55)"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* ── THREE PANELS — real GOO symbol components ── */}
          <div style={{
            position:"absolute",top:"34%",left:"50%",transform:"translateX(-50%)",
            width:"min(820px,94vw)",
            display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px",
            zIndex:5,
          }}>

            {/* ── PANEL 1: TUMBLE — bolt symbol + 4 premium symbols ── */}
            <div style={{animation:"goIntroPanelIn .62s .14s cubic-bezier(.34,1.2,.64,1) both"}}>
              <div style={{
                background:"linear-gradient(160deg,rgba(6,2,20,.98),rgba(18,8,38,.97))",
                border:"2px solid rgba(180,130,0,.45)",
                borderRadius:"16px 16px 10px 10px",
                padding:"0 0 14px",
                boxShadow:"0 12px 48px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,220,80,.07),0 0 0 1px rgba(100,60,0,.4)",
                overflow:"hidden",position:"relative",
              }}>
                <div style={{height:5,background:"linear-gradient(90deg,rgba(120,70,0,.5),rgba(245,196,0,.9),rgba(255,230,100,1),rgba(245,196,0,.9),rgba(120,70,0,.5))"}}/>
                <div style={{position:"absolute",top:5,left:8,color:"rgba(245,196,0,.55)",fontSize:"1rem",lineHeight:1}}>⚜</div>
                <div style={{position:"absolute",top:5,right:8,color:"rgba(245,196,0,.55)",fontSize:"1rem",lineHeight:1,transform:"scaleX(-1)"}}>⚜</div>
                {/* 2×3 grid of real game symbols — bolt center-top, 4 premiums around */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4,padding:"14px 10px 6px",height:120,alignItems:"center"}}>
                  {/* Row 1: crown, BOLT (highlighted win), hglass */}
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",opacity:.65,transform:"scale(.85)"}}><GoPngSym src={IMG_CROWN} alt="crown"/></div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                    <div style={{position:"absolute",inset:-4,borderRadius:8,background:"rgba(245,196,0,.2)",border:"1.5px solid rgba(245,196,0,.85)",boxShadow:"0 0 16px rgba(245,196,0,.6)",animation:"goWinPulse .6s ease infinite"}}/>
                    <GoBoltSym/>
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",opacity:.65,transform:"scale(.85)"}}><GoPngSym src={IMG_HOURGLASS} alt="hourglass"/></div>
                  {/* Row 2: ring, chalice, amethyst gem */}
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",opacity:.65,transform:"scale(.85)"}}><GoPngSym src={IMG_RING} alt="ring"/></div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",opacity:.65,transform:"scale(.85)"}}><GoPngSym src={IMG_KALICH} alt="chalice"/></div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",opacity:.65,transform:"scale(.85)"}}><GoPngSym src={IMG_PURPLE_G} alt="amethyst"/></div>
                </div>
                {/* Down-arrows showing cascade */}
                <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:4}}>
                  {[0,1,2].map(i=>(
                    <svg key={i} width="16" height="12" viewBox="0 0 16 12" style={{opacity:.7,animation:`goIntroBoltFlash 1.8s ${i*.35}s ease-in-out infinite`}}>
                      <polygon points="8,12 2,2 14,2" fill="rgba(245,196,0,.9)"/>
                    </svg>
                  ))}
                </div>
                <div style={{padding:"2px 16px 0",textAlign:"center"}}>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".78rem",fontWeight:900,color:"#ffe088",letterSpacing:".2em",textTransform:"uppercase",marginBottom:6,textShadow:"0 0 12px rgba(245,196,0,.5)"}}>Tumble</div>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".55rem",color:"rgba(220,195,140,.65)",lineHeight:1.55,fontWeight:500}}>Každá výhra spúšťa kaskádu — víťazné symboly zmiznú a nové padajú stĺpec po stĺpci!</div>
                </div>
                <div style={{height:3,background:"linear-gradient(90deg,transparent,rgba(245,196,0,.5),transparent)",margin:"10px 0 0"}}/>
              </div>
            </div>

            {/* ── PANEL 2: MULTIPLIKÁTORY — bolt symbols only ── */}
            <div style={{animation:"goIntroPanelIn .62s .27s cubic-bezier(.34,1.2,.64,1) both"}}>
              <div style={{
                background:"linear-gradient(160deg,rgba(6,2,20,.98),rgba(18,8,38,.97))",
                border:"2px solid rgba(180,130,0,.45)",
                borderRadius:"16px 16px 10px 10px",
                padding:"0 0 14px",
                boxShadow:"0 12px 48px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,220,80,.07),0 0 0 1px rgba(100,60,0,.4)",
                overflow:"hidden",position:"relative",
              }}>
                <div style={{height:5,background:"linear-gradient(90deg,rgba(120,70,0,.5),rgba(245,196,0,.9),rgba(255,230,100,1),rgba(245,196,0,.9),rgba(120,70,0,.5))"}}/>
                <div style={{position:"absolute",top:5,left:8,color:"rgba(245,196,0,.55)",fontSize:"1rem",lineHeight:1}}>⚜</div>
                <div style={{position:"absolute",top:5,right:8,color:"rgba(245,196,0,.55)",fontSize:"1rem",lineHeight:1,transform:"scaleX(-1)"}}>⚜</div>
                {/* 4 bolt symbols arranged around a large central bolt */}
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:126,paddingTop:12,position:"relative"}}>
                  {/* Large central bolt */}
                  <div style={{width:58,height:58,position:"relative",zIndex:2,filter:"drop-shadow(0 0 12px rgba(245,196,0,.8))"}}>
                    <GoBoltSym val={5}/>
                  </div>
                  {/* 4 corner bolts with multiplier values */}
                  {[{top:10,left:8,val:2},{top:10,right:8,val:10},{bottom:8,left:8,val:15},{bottom:8,right:8,val:5}].map((pos,i)=>(
                    <div key={i} style={{position:"absolute",...pos,width:42,height:42,opacity:.88,filter:"drop-shadow(0 0 8px rgba(245,196,0,.5))"}}>
                      <GoBoltSym val={[2,10,15,5][i]}/>
                    </div>
                  ))}
                </div>
                <div style={{padding:"0 16px 0",textAlign:"center"}}>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".78rem",fontWeight:900,color:"#ffe088",letterSpacing:".2em",textTransform:"uppercase",marginBottom:6,textShadow:"0 0 12px rgba(245,196,0,.5)"}}>Multiplikátory</div>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".55rem",color:"rgba(220,195,140,.65)",lineHeight:1.55,fontWeight:500}}>Zeus náhodne zasiahne mriežku — multiplikátory sa kumulujú a zvyšujú každú výhru v kaskáde!</div>
                </div>
                <div style={{height:3,background:"linear-gradient(90deg,transparent,rgba(245,196,0,.5),transparent)",margin:"10px 0 0"}}/>
              </div>
            </div>

            {/* ── PANEL 3: FREE SPINY — 4 scatter symbols ── */}
            <div style={{animation:"goIntroPanelIn .62s .41s cubic-bezier(.34,1.2,.64,1) both"}}>
              <div style={{
                background:"linear-gradient(160deg,rgba(6,2,20,.98),rgba(18,8,38,.97))",
                border:"2px solid rgba(180,130,0,.45)",
                borderRadius:"16px 16px 10px 10px",
                padding:"0 0 14px",
                boxShadow:"0 12px 48px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,220,80,.07),0 0 0 1px rgba(100,60,0,.4)",
                overflow:"hidden",position:"relative",
              }}>
                <div style={{height:5,background:"linear-gradient(90deg,rgba(120,70,0,.5),rgba(245,196,0,.9),rgba(255,230,100,1),rgba(245,196,0,.9),rgba(120,70,0,.5))"}}/>
                <div style={{position:"absolute",top:5,left:8,color:"rgba(245,196,0,.55)",fontSize:"1rem",lineHeight:1}}>⚜</div>
                <div style={{position:"absolute",top:5,right:8,color:"rgba(245,196,0,.55)",fontSize:"1rem",lineHeight:1,transform:"scaleX(-1)"}}>⚜</div>
                {/* Free Spins golden header badge */}
                <div style={{margin:"10px 14px 0",padding:"4px 8px",background:"linear-gradient(135deg,#6b3a00,#c88000,#ffe066,#c88000,#6b3a00)",borderRadius:8,textAlign:"center",boxShadow:"0 0 18px rgba(245,196,0,.5)",position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)",animation:"streakShine 2s linear infinite"}}/>
                  <span style={{fontFamily:"'Rye',serif",fontSize:".92rem",color:"#0a0400",letterSpacing:".06em",position:"relative"}}>Free Spins</span>
                </div>
                {/* 4 scatter symbols — 4 required! */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,padding:"8px 12px 2px",height:96,alignItems:"center"}}>
                  {[0,1,2,3].map(i=>(
                    <div key={i} style={{
                      display:"flex",alignItems:"center",justifyContent:"center",
                      animation:`goIntroScatterFloat ${3+i*.4}s ${i*.2}s ease-in-out infinite`,
                      filter:`drop-shadow(0 0 ${6+i*2}px rgba(245,196,0,.${5+i}))`,
                    }}>
                      <div style={{width:48,height:48}}><GoPngSym src={IMG_SCATTER} alt="scatter"/></div>
                    </div>
                  ))}
                </div>
                <div style={{padding:"0 14px 0",textAlign:"center"}}>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".62rem",fontWeight:900,color:"rgba(245,196,0,.6)",letterSpacing:".12em",marginBottom:3}}>4+ SCATTER</div>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".78rem",fontWeight:900,color:"#ffe088",letterSpacing:".2em",textTransform:"uppercase",marginBottom:5,textShadow:"0 0 12px rgba(245,196,0,.5)"}}>Max Win</div>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".55rem",color:"rgba(220,195,140,.65)",lineHeight:1.55,fontWeight:500}}>4+ Scatter spúšťajú 15 Free Spinov! Vyhraj až <strong style={{color:"#f5c400"}}>5 000×</strong> stávku!</div>
                </div>
                <div style={{height:3,background:"linear-gradient(90deg,transparent,rgba(245,196,0,.5),transparent)",margin:"8px 0 0"}}/>
              </div>
            </div>
          </div>

                    {/* ── CLICK TO CONTINUE ── */}
          <div style={{
            position:"absolute",bottom:"5%",left:"50%",
            animation:"goIntroCtcPulse 1.8s ease-in-out infinite",
            zIndex:5,
          }}>
            <div style={{
              fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(.88rem,2.4vw,1.2rem)",
              fontWeight:900,letterSpacing:".22em",textTransform:"uppercase",
              color:"#f5c400",
              textShadow:"0 0 20px rgba(245,196,0,.8),0 2px 4px rgba(0,0,0,.9)",
              padding:"12px 38px",
              background:"linear-gradient(135deg,rgba(20,10,0,.88),rgba(40,20,0,.92))",
              border:"2px solid rgba(245,196,0,.55)",
              borderRadius:30,
              boxShadow:"0 0 30px rgba(245,196,0,.22),0 8px 24px rgba(0,0,0,.65)",
              whiteSpace:"nowrap",
            }}>⚡ Hrať teraz</div>
          </div>

        </div>
      </div>
    );
  }

  return(
    <div className="go-game">
      <style>{GO_CSS}</style>

      {/* ═══════════════════════════════════════════
          GATES OF OLYMPUS — Full Olympus Background Scene
          Matching reference: pink-purple sky, golden columns,
          white temple, volumetric clouds, golden floor
          ═══════════════════════════════════════════ */}
      <div className="go-bg-scene">
        <img src="data:image/jpeg;base64,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"
          alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}} />
      </div>

      {flashG&&<div className="fl-g"/>}
      {flashR&&<div className="fl-r"/>}
      {showStats&&<StatsModal gameName="Gates of Olympus" onClose={()=>setShowStats(false)} stats={goStats}/>}

      {/* Bonus trigger overlay */}
      {bonusPhase==="trigger"&&(
        <div className="go-trigger-ov">
          <div style={{
            fontFamily:"'Rye',serif",fontSize:"2.4rem",fontWeight:900,
            background:"linear-gradient(180deg,#fff8c0,#f5c400,#c88000)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
            filter:"drop-shadow(0 0 20px rgba(245,196,0,.9))",
            letterSpacing:".06em",textAlign:"center",lineHeight:1.1,
          }}>GATES OF<br/>OLYMPUS</div>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1.2rem",fontWeight:900,
            color:"#ffe066",textShadow:"0 0 24px rgba(245,196,0,.8)",letterSpacing:".12em",
            textTransform:"uppercase",marginTop:8}}>
            ⚡ FREE SPINS ⚡
          </div>
          <div style={{
            display:"flex",flexDirection:"column",alignItems:"center",gap:4,
            background:"linear-gradient(135deg,rgba(40,20,80,.9),rgba(20,8,50,.95))",
            border:"2px solid rgba(245,196,0,.6)",borderRadius:16,
            padding:"16px 40px",marginTop:4,
            boxShadow:"0 0 30px rgba(245,196,0,.25),0 8px 32px rgba(0,0,0,.6)",
          }}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"4rem",fontWeight:900,
              color:"#f5c400",textShadow:"0 0 30px rgba(245,196,0,.9)",lineHeight:1}}>
              {freeSpins}
            </div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".75rem",fontWeight:700,
              color:"rgba(245,196,0,.7)",letterSpacing:".2em",textTransform:"uppercase"}}>
              Free Spins Awarded
            </div>
          </div>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".7rem",
            color:"rgba(200,180,255,.5)",marginTop:8,letterSpacing:".1em",
            animation:"goIntroCTC 1.5s ease-in-out infinite"}}>
            Starting soon...
          </div>
        </div>
      )}
      {bonusPhase==="end"&&(
        <div className="go-end-ov">
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1.6rem",fontWeight:900,color:"#ffe066"}}>🏆 Bonus Complete!</div>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1rem",color:"rgba(200,180,255,.8)"}}>Total Bonus Win</div>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"2.8rem",fontWeight:900,color:"#00ff88",textShadow:"0 0 30px rgba(0,255,136,.5)"}}>${bonusWin.toFixed(2)}</div>
          {multPoolDisplay>0&&<div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1.1rem",color:"#ffe066"}}>Final Multiplier: ×{multPoolDisplay}</div>}
          <button style={{marginTop:10,padding:"12px 32px",borderRadius:50,border:"none",background:"linear-gradient(135deg,#b45309,#f5c400)",color:"#1a0800",fontFamily:"'Space Grotesk',sans-serif",fontSize:"1rem",fontWeight:900,cursor:"pointer"}} onClick={endBonus}>▶ Continue</button>
</div>
      )}

      {/* Retrigger overlay */}
      {showRetrigger&&(
        <div className="go-trigger-ov">
          <div style={{
            fontFamily:"'Rye',serif",fontSize:"2.4rem",fontWeight:900,
            background:"linear-gradient(180deg,#fff8c0,#f5c400,#c88000)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
            filter:"drop-shadow(0 0 20px rgba(245,196,0,.9))",
            letterSpacing:".06em",textAlign:"center",lineHeight:1.1,
          }}>RETRIGGER</div>
          <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1.2rem",fontWeight:900,
            color:"#ffe066",textShadow:"0 0 24px rgba(245,196,0,.8)",letterSpacing:".12em",
            textTransform:"uppercase",marginTop:8}}>
            ⚡ +5 FREE SPINS ⚡
          </div>
          <div style={{
            display:"flex",flexDirection:"column",alignItems:"center",gap:4,
            background:"linear-gradient(135deg,rgba(40,20,80,.9),rgba(20,8,50,.95))",
            border:"2px solid rgba(245,196,0,.6)",borderRadius:16,
            padding:"16px 40px",marginTop:4,
            boxShadow:"0 0 30px rgba(245,196,0,.25),0 8px 32px rgba(0,0,0,.6)",
          }}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"4rem",fontWeight:900,
              color:"#f5c400",textShadow:"0 0 30px rgba(245,196,0,.9)",lineHeight:1}}>
              +5
            </div>
          </div>
        </div>
      )}

      {/* Buy Bonus Modal */}
      {showBuyModal&&(
        <div className="go-buy-modal-bg" onClick={e=>{if(e.target===e.currentTarget){sfx.click();setShowBuyModal(false);}}}>
          <div className="go-buy-modal">
            <div className="go-buy-modal-title">⚡ Buy Bonus</div>
            <div className="go-buy-modal-sub">Skip the base game and jump straight into Free Spins.</div>
            <div className="go-buy-option selected">
              <div><div className="go-buy-opt-name">⚡ Free Spins</div><div className="go-buy-opt-desc">15 free spins · Multipliers accumulate · Retrigger possible</div></div>
              <div className="go-buy-opt-price">${(bet*100).toFixed(2)}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7}}>
              {[["15","Free Spins"],["∞","Retriggers"],["5000×","Max Win"]].map(([v,l])=>(
                <div key={l} style={{textAlign:"center",background:"rgba(10,5,30,.7)",border:"1px solid rgba(130,100,255,.15)",borderRadius:10,padding:"9px 6px"}}>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"1.1rem",fontWeight:900,color:"#ffe066"}}>{v}</div>
                  <div style={{fontSize:".55rem",color:"rgba(160,140,255,.5)",marginTop:3,letterSpacing:".06em",textTransform:"uppercase"}}>{l}</div>
                </div>
              ))}
            </div>
            <button className="go-buy-confirm" disabled={spinning||bet*100>balance}
              onClick={()=>{if(spinning||bet*100>balance)return;sfx.cash();setBalance(b=>+(b-bet*100).toFixed(2));setGoStats(s=>({...s,profit:+(s.profit-bet*100).toFixed(2),wagered:+(s.wagered+bet*100).toFixed(2),history:[...s.history,+(s.profit-bet*100).toFixed(2)]}));setShowBuyModal(false);doBuyBonusSpin(15);}}>
              Confirm — ${(bet*100).toFixed(2)}
            </button>
            <button className="go-buy-cancel" onClick={()=>{sfx.click();setShowBuyModal(false);}}>Cancel</button>
          </div>
        </div>
      )}

      {/* ── Top gold banner ── */}
      <div className="go-top-banner">VYHRAJTE AŽ 5,000 × STÁVKY</div>

      {/* MAIN CONTENT */}
      <div className="go-main">

        {/* Flame torches */}
        <div style={{position:"absolute",left:0,top:0,zIndex:3,pointerEvents:"none"}}>
          <svg viewBox="0 0 24 80" width="24" height="80">
            <rect x="9" y="35" width="6" height="45" rx="3" fill="#6b4800"/>
            <path d="M4 36 Q12 30 20 36 Q18 44 12 46 Q6 44 4 36Z" fill="#5a3800"/>
            <g style={{transformOrigin:"12px 32px",animation:"goFlameFlick .9s ease-in-out infinite"}}>
              <ellipse cx="12" cy="26" rx="6" ry="10" fill="rgba(255,90,0,.9)"/>
              <ellipse cx="12" cy="22" rx="4" ry="7" fill="rgba(255,150,0,.85)"/>
              <ellipse cx="12" cy="18" rx="2.5" ry="5" fill="rgba(255,210,40,.8)"/>
            </g>
          </svg>
        </div>
        <div style={{position:"absolute",right:0,top:0,zIndex:3,pointerEvents:"none",transform:"scaleX(-1)"}}>
          <svg viewBox="0 0 24 80" width="24" height="80">
            <rect x="9" y="35" width="6" height="45" rx="3" fill="#6b4800"/>
            <path d="M4 36 Q12 30 20 36 Q18 44 12 46 Q6 44 4 36Z" fill="#5a3800"/>
            <g style={{transformOrigin:"12px 32px",animation:"goFlameFlick 1.1s .2s ease-in-out infinite"}}>
              <ellipse cx="12" cy="26" rx="6" ry="10" fill="rgba(255,90,0,.9)"/>
              <ellipse cx="12" cy="22" rx="4" ry="7" fill="rgba(255,150,0,.85)"/>
              <ellipse cx="12" cy="18" rx="2.5" ry="5" fill="rgba(255,210,40,.8)"/>
            </g>
          </svg>
        </div>

        {/* ── LEFT PANEL: Ante bet + Tumble history ── */}
        <div className="go-left">
          {/* BUY FREE SPINS */}
          {!isBonus&&(
            <button className="go-buy-fs-btn" disabled={spinning||bet*100>balance} onClick={()=>{sfx.click();setShowBuyModal(true);}}>
              <div style={{fontSize:".44rem",fontWeight:700,opacity:.85,textTransform:"uppercase",letterSpacing:".06em"}}>ZAKÚPIŤ</div>
              <div style={{fontSize:".88rem",fontWeight:900,color:"#fff"}}>FREE SPINS</div>
              <div style={{fontSize:".65rem",fontWeight:700,color:"rgba(255,255,255,.8)"}}>${(bet*100).toFixed(2)}</div>
            </button>
          )}

          {/* ANTE BET — Double Chance to Win Feature */}
          {!isBonus&&(
            <div className={`go-ante-panel${goAnteBet?" on":""}`} onClick={()=>{sfx.click();setGoAnteBet(a=>!a);}}>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".48rem",fontWeight:800,color:"rgba(245,196,0,.9)",letterSpacing:".06em",textAlign:"center",lineHeight:1.2}}>DVOJNÁSOBNÁ</div>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".44rem",fontWeight:700,color:"rgba(245,196,0,.65)",letterSpacing:".04em",textAlign:"center",lineHeight:1.2}}>ŠANCA NA BONUS</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:5}}>
                <div style={{width:32,height:16,borderRadius:8,position:"relative",background:goAnteBet?"#2a8f1a":"rgba(100,70,0,.5)",border:`1.5px solid ${goAnteBet?"#3db02a":"rgba(245,196,0,.3)"}`,transition:"all .2s",flexShrink:0,boxShadow:goAnteBet?"0 0 8px rgba(60,180,40,.5)":"none"}}>
                  <div style={{position:"absolute",top:2,left:goAnteBet?14:2,width:10,height:10,borderRadius:"50%",background:goAnteBet?"#fff":"rgba(245,196,0,.5)",transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.4)"}}/>
                </div>
                <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".52rem",fontWeight:900,color:goAnteBet?"#4ade80":"rgba(245,196,0,.45)"}}>{goAnteBet?"ON":"OFF"}</span>
              </div>
              {goAnteBet&&(
                <div style={{marginTop:4,fontFamily:"'Space Grotesk',sans-serif",fontSize:".42rem",color:"rgba(245,196,0,.55)",textAlign:"center",lineHeight:1.3}}>
                  Stávka: <strong style={{color:"#ffe066"}}>${(bet*1.25).toFixed(2)}</strong><br/>
                  <span style={{opacity:.7}}>Výhry na {bet.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          {/* BONUS BAR when in free spins */}
          {isBonus&&(
            <div className="go-bonus-bar">
              <div style={{fontSize:".46rem",fontWeight:700,letterSpacing:".12em",color:"rgba(160,140,255,.8)",textTransform:"uppercase"}}>⚡ Free Spins</div>
              <div className="go-fs-counter">{freeSpinsLeft}</div>
              <div style={{fontSize:".46rem",color:"rgba(160,140,255,.55)"}}>remaining</div>
              <div style={{fontSize:".56rem",color:"rgba(100,220,60,.9)",marginTop:2}}>Won: <strong style={{color:"#44ff88"}}>${bonusWin.toFixed(2)}</strong></div>
              {multPoolDisplay>0&&<div className="go-pool-counter" key={multPoolDisplay}>×{multPoolDisplay}</div>}
            </div>
          )}

          {/* TUMBLE HISTORY — with banner header like reference image */}
          <div className="go-tumble-hist">
            {/* Banner header */}
            <div style={{
              width:"100%",
              background:"linear-gradient(135deg,rgba(80,40,0,.85),rgba(160,100,0,.9),rgba(80,40,0,.85))",
              border:"1px solid rgba(245,196,0,.45)",
              borderRadius:8,
              padding:"4px 0",
              textAlign:"center",
              boxShadow:"0 0 10px rgba(245,196,0,.15),inset 0 1px 0 rgba(255,220,80,.12)",
              position:"relative",
              overflow:"hidden",
              flexShrink:0,
            }}>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent)",animation:"streakShine 2.5s linear infinite"}}/>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".5rem",fontWeight:900,letterSpacing:".18em",textTransform:"uppercase",color:"#ffe066",textShadow:"0 0 8px rgba(245,196,0,.6)",position:"relative"}}>Tumble</span>
            </div>
            {tumbleHistory.length===0&&(
              <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"center"}}>
                <div style={{color:"rgba(245,196,0,.18)",fontFamily:"'Space Grotesk',sans-serif",fontSize:".42rem",letterSpacing:".1em",textAlign:"center"}}>–</div>
              </div>
            )}
            {tumbleHistory.slice(-5).map((th,i)=>(
              <div key={i} className="go-th-row" style={{animationDelay:`${i*0.04}s`}}>
                <span className="go-th-n">#{th.cascN}</span>
                <span className="go-th-sym">{goSymEmoji(th.sym)}</span>
                <span className="go-th-win">${th.win.toFixed(2)}</span>
              </div>
            ))}
            {/* Current spin WIN at bottom — only when there's a win */}
            {winAmt>0&&(
              <div style={{
                marginTop:"auto",
                padding:"4px 6px",
                background:"linear-gradient(135deg,rgba(0,80,0,.7),rgba(0,140,60,.6))",
                border:"1px solid rgba(40,200,80,.4)",
                borderRadius:7,
                textAlign:"center",
                flexShrink:0,
                boxShadow:"0 0 8px rgba(0,200,80,.2)",
              }}>
                <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".4rem",fontWeight:700,color:"rgba(100,255,150,.6)",letterSpacing:".1em",textTransform:"uppercase"}}>Výhra</div>
                <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:".88rem",fontWeight:900,color:"#44ff88",textShadow:"0 0 10px rgba(0,255,100,.5)",fontVariantNumeric:"tabular-nums"}}>${winAmt.toFixed(2)}</div>
              </div>
            )}
          </div>
        </div>

        {/* CENTER ARENA */}
        <div className="go-arena">
          {buyBonusActive&&(
            <div style={{position:"absolute",top:6,left:"50%",transform:"translateX(-50%)",zIndex:20,background:"linear-gradient(90deg,rgba(80,40,200,.95),rgba(120,60,255,.92))",border:"2px solid rgba(200,170,255,.8)",borderRadius:20,padding:"5px 18px",color:"#e8d8ff",fontFamily:"'Space Grotesk',sans-serif",fontSize:".7rem",fontWeight:900,letterSpacing:".1em",display:"flex",alignItems:"center",gap:8,whiteSpace:"nowrap",boxShadow:"0 0 20px rgba(130,80,255,.7)"}}>
              <span>⚡</span>BONUS INCOMING<span>⚡</span>
            </div>
          )}
          <div className="go-frame" style={{position:"relative"}}>
            <img src={IMG_GRID} alt="" className="go-frame-bg"/>
            {isBonus&&multPoolDisplay>0&&(<div className="go-mult-pool" key={multPoolDisplay}>×{multPoolDisplay}</div>)}
            {flashMult&&(<div className="go-bolt-pop" key={flashMult.key}>+×{flashMult.val}</div>)}
            {/* Olympus character — both imgs always in DOM so GIF pre-loads */}
            <div className="go-olimpus-wrap">
              {/* Lightning transition flash — triggers on every image swap */}
              {olimpusFlashKey>0&&(
                <div key={olimpusFlashKey} style={{position:"absolute",inset:0,zIndex:20,pointerEvents:"none",borderRadius:"inherit",overflow:"hidden"}}>
                  {/* White flash */}
                  <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 40%,rgba(255,255,255,.92) 0%,rgba(245,196,0,.55) 35%,transparent 70%)",animation:"goOlimpusBoltFlash .55s ease-out forwards"}}/>
                  {/* SVG bolt lines */}
                  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",overflow:"visible"}} viewBox="0 0 100 160" preserveAspectRatio="xMidYMid slice">
                    <polyline points="50,0 44,38 52,38 38,85 56,85 30,160" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{strokeDasharray:300,animation:"goOlimpusBoltLine .5s ease-out forwards"}}/>
                    <polyline points="50,0 44,38 52,38 38,85 56,85 30,160" fill="none" stroke="#ffe066" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{strokeDasharray:300,animation:"goOlimpusBoltLine .5s .04s ease-out forwards"}}/>
                    <polyline points="62,10 68,45 60,45 74,90" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.8" strokeLinecap="round" style={{strokeDasharray:300,animation:"goOlimpusBoltLine .45s .06s ease-out forwards"}}/>
                    <polyline points="38,15 30,50 40,50 24,100" fill="none" stroke="rgba(255,220,80,.55)" strokeWidth="1.5" strokeLinecap="round" style={{strokeDasharray:300,animation:"goOlimpusBoltLine .45s .03s ease-out forwards"}}/>
                  </svg>
                </div>
              )}
              {/* IDLE — shown when no bolt collection */}
              <img
                src={idleBlobUrl||IMG_OLIMPUS_IDLE}
                alt=""
                className="go-olimpus-img"
                style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",display:boltCells.size>0?"none":"block"}}
                onError={e=>{if(IMG_OLIMPUS_IDLE&&e.currentTarget.src!==IMG_OLIMPUS_IDLE)e.currentTarget.src=IMG_OLIMPUS_IDLE;}}
              />
              {/* GIF — pre-loaded, shown + restarted when bolt collection fires */}
              <img
                key={gifKey}
                src={gifBlobUrl||GIF_OLIMPUS_MULTI||idleBlobUrl||IMG_OLIMPUS_IDLE}
                alt=""
                className="go-olimpus-img multi"
                style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",display:boltCells.size>0?"block":"none"}}
                onError={e=>{if(idleBlobUrl&&e.currentTarget.src!==idleBlobUrl)e.currentTarget.src=idleBlobUrl;}}
              />
            </div>
            <div className="go-grid">
              {Array.from({length:GO_ROWS},(_,r)=>Array.from({length:GO_COLS},(_,c)=>{
                const sym=grid[r]?.[c];
                const pos=`${r}-${c}`;
                const isWin=winCells.has(pos);
                const isRem=removeCells.has(pos);
                const isBolt=sym==="bolt";
                const isScatter=sym==="scatter";
                const isBoltCell=boltCells.has(pos);
                const isStriking=boltStrikeSet.has(pos);
                const revealVal=boltRevealMap[pos];
                const boltIdx=boltIdxMap[pos]??0;
                return(
                  <div key={cellKeys[r]?.[c]} className={`go-cell${isWin&&isScatter?" scatter-trigger":isWin?" win":""}${isRem?" removing":""}${isBolt||isBoltCell?" bolt-cell":""}${isStriking?" bolt-striking":""}`} style={{position:"relative",overflow:(isStriking||(isWin&&isScatter)||["exit","gravity","tumble","fall"].includes(cellDrop[r]?.[c]?.mode))?"visible":"hidden"}}>
                    {isStriking&&<GoBoltStrikeVFX posKey={pos} val={boltRevealMap[pos]??2}/>}
                    {revealVal!=null&&<GoBoltRevealVal val={revealVal} idx={Math.max(0,boltIdx)} total={boltCells.size}/>}
                    {isScatter&&isWin&&(
                      <>
                        {/* Ripple rings — always shown for triggered scatters */}
                        <div className="bbs-ripple" style={{"--scatter-glow":"rgba(245,196,0,.95)"}}/>
                        <div className="bbs-ripple" style={{"--scatter-glow":"rgba(245,196,0,.75)",animationDelay:".2s"}}/>
                        <div className="bbs-ripple" style={{"--scatter-glow":"rgba(255,224,100,.55)",animationDelay:".4s"}}/>
                        <div className="bbs-ripple" style={{"--scatter-glow":"rgba(245,196,0,.35)",animationDelay:".65s"}}/>
                        {/* Orbiting golden orbs */}
                        {[0,1,2,3].map(i=>(
                          <div key={i} style={{
                            position:"absolute",left:"50%",top:"50%",
                            width:7,height:7,borderRadius:"50%",
                            background:i%2===0?"#ffe066":"#fff8c0",
                            boxShadow:`0 0 10px rgba(245,196,0,1),0 0 20px rgba(245,196,0,.7)`,
                            animation:`goScatterOrbit ${1.1+i*.22}s ${i*.28}s linear infinite`,
                            transformOrigin:"0 0",
                            marginLeft:-3.5,marginTop:-3.5,
                          }}/>
                        ))}
                        {/* Inner glow burst */}
                        <div style={{
                          position:"absolute",inset:0,borderRadius:"inherit",
                          background:"radial-gradient(circle,rgba(245,196,0,.25) 0%,transparent 70%)",
                          animation:"goScatterPulseGlow .7s ease-in-out infinite",
                          pointerEvents:"none",zIndex:20,
                        }}/>
                      </>
                    )}
                    <div className={`go-sym go-${cellDrop[r]?.[c]?.mode??"fall"}`} style={{"--fdrop":cellDrop[r]?.[c]?.drop??GO_ROWS+3,"--fdur":cellDrop[r]?.[c]?.dur!=null?`${cellDrop[r][c].dur}ms`:`${fallDur(cellDrop[r]?.[c]?.drop??GO_ROWS+3)}ms`,"--fdelay":`${cellDrop[r]?.[c]?.delay??0}ms`}}>
                      {goSym(sym)}
                    </div>
                  </div>
                );
              }))}
            </div>
          </div>
          <div className={`go-win-banner ${bannerPhase}`}>
            <span className="go-wb-split-l">${spinRawWin.toFixed(2)}</span>
            <span className="go-wb-split-r">×{spinAppliedMult}</span>
            <div className="go-wb-final">
              <div className="go-wb-total">${bannerFinal.toFixed(2)}</div>
              <div className="go-wb-sub">{bannerFinal>0&&bet>0?`${+(bannerFinal/bet).toFixed(1)}× BET`:""}</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — hidden, Olympus anchored inside go-frame */}
        <div className="go-right"></div>
      </div>

      {/* BOTTOM BAR */}
      <div className="go-bottom">
        <div className="go-btm-left">
          <button className="go-ic-btn" onClick={()=>{sfx.click();setShowStats(true);}}>☰</button>
          <button className="go-ic-btn">ℹ</button>
          <button className="go-ic-btn" onClick={()=>sfx.click()}>🔊</button>
        </div>
        <div className="go-btm-info">
          <div className="go-btm-credits">
            <div style={{textAlign:"center"}}>
              <div className="go-btm-lbl">Kredit</div>
              <div className="go-btm-val">${balance.toFixed(2)}</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div className="go-btm-lbl">Stávka</div>
              <div className="go-btm-val">${(goAnteBet?bet*1.25:bet).toFixed(2)}</div>
            </div>
          </div>
          <div className="go-btm-hint">Pre Turbo Točenie Podržte Medzerník</div>
        </div>
        <div className="go-btm-right">
          <button className="go-adj-btn" disabled={spinning||isBonus}
            onClick={()=>{sfx.tick();setBet(b=>{const bets=[0.10,0.20,0.40,0.60,0.80,1,2,3,4,5,10,20,50,100];const i=bets.indexOf(b);return i>0?bets[i-1]:b;});}}>−</button>
          {isBonus?(
            <button className="go-big-spin bonus" disabled={spinning} onClick={()=>doSpin(true)}>
              {spinning
                ?<svg style={{animation:"sbSpin360 .8s linear infinite"}} viewBox="0 0 24 24" fill="none" stroke="#004000" strokeWidth="2.2"><path d="M12 2a10 10 0 1 0 10 10" strokeLinecap="round"/></svg>
                :<svg viewBox="0 0 24 24" fill="none" stroke="#004000" strokeWidth="2.2"><path d="M21 12a9 9 0 1 1-3.1-6.8M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              }
            </button>
          ):(
            <button className="go-big-spin" disabled={spinning||!!bonusPhase||bet>balance} onClick={()=>{sfx.click();doSpin(false);}}>
              {spinning
                ?<svg style={{animation:"sbSpin360 .8s linear infinite"}} viewBox="0 0 24 24" fill="none" stroke="#1a1a18" strokeWidth="2.2"><path d="M12 2a10 10 0 1 0 10 10" strokeLinecap="round"/></svg>
                :<svg viewBox="0 0 24 24" fill="none" stroke="#1a1a18" strokeWidth="2.2"><path d="M21 12a9 9 0 1 1-3.1-6.8M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              }
            </button>
          )}
          <button className="go-adj-btn" disabled={spinning||isBonus}
            onClick={()=>{sfx.tick();setBet(b=>{const bets=[0.10,0.20,0.40,0.60,0.80,1,2,3,4,5,10,20,50,100];const i=bets.indexOf(b);return i<bets.length-1?bets[i+1]:b;});}}>+</button>
          <button className="go-autoplay-btn" disabled={spinning||isBonus}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2"/><path d="M3.5 3.5L3.5 6.5L7 5Z" fill="currentColor"/></svg>
            Automatická Hra
          </button>
        </div>
      </div>
    </div>
  );
}



export { GatesOfOlympusGame, GatesOfOlympusArt };

