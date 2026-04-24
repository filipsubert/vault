import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { StatsModal } from "../components/StatsModal.jsx";
import { CSS_KENO } from "../shared/css_keno.js";
// ── Keno game ─────────────────────────────────────────────────────────────────
/* ══════════════════════════════════════ KENO ART ════════════════════════════════════ */
function KenoArt(){
  // 40-tile grid, 8 cols × 5 rows. tileW=24 tileH=18 gapX=3 gapY=3 → stepX=27 stepY=21
  // Grid starts at ox=8, oy=26. Total W=8*27-3=213, H=5*21-3=102 → ends y=128
  const ox=8, oy=26, tw=24, th=18, sx=27, sy=21;
  // Which tiles: selected(purple) and which are hit(green)
  const selSet=new Set([2,5,8,11,14,17,22,25,28,31,34,37]);// 12 picks shown
  const hitSet=new Set([5,11,17,25,31,37]); // 6 hits
  const drawnNotSel=new Set([3,7,13,19,24,33,36,38,40,16,20,29,35]); // drawn but not selected
  return(
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
      <defs>
        {/* Background — deep indigo like other covers */}
        <radialGradient id="knaBg" cx="50%" cy="35%" r="68%">
          <stop offset="0%" stopColor="#0f0830"/><stop offset="55%" stopColor="#06041a"/><stop offset="100%" stopColor="#020009"/>
        </radialGradient>
        {/* Center glow — green tinted (gem glow) */}
        <radialGradient id="knaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,200,80,.3)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        {/* Purple ambient */}
        <radialGradient id="knaPurp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(124,58,237,.22)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        {/* Tile states */}
        <linearGradient id="knaHit" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#062818"/><stop offset="100%" stopColor="#031510"/>
        </linearGradient>
        <linearGradient id="knaSel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a1868"/><stop offset="100%" stopColor="#160e3a"/>
        </linearGradient>
        <linearGradient id="knaIdle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#18163a"/><stop offset="100%" stopColor="#0c0a22"/>
        </linearGradient>
        <linearGradient id="knaDrw" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0c1830"/><stop offset="100%" stopColor="#060e1e"/>
        </linearGradient>
        {/* GEM gradients */}
        <radialGradient id="knaGemMain" cx="30%" cy="22%" r="68%">
          <stop offset="0%" stopColor="#44ff98"/><stop offset="28%" stopColor="#00dd60"/><stop offset="65%" stopColor="#00aa44"/><stop offset="100%" stopColor="#006028"/>
        </radialGradient>
        <radialGradient id="knaGemShine" cx="25%" cy="18%" r="55%">
          <stop offset="0%" stopColor="rgba(200,255,230,.65)"/><stop offset="55%" stopColor="rgba(80,255,160,.18)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <linearGradient id="knaGemTop" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#55ff99"/><stop offset="100%" stopColor="#009944"/>
        </linearGradient>
        <linearGradient id="knaGemRight" x1="0%" y1="30%" x2="100%" y2="70%">
          <stop offset="0%" stopColor="#006633"/><stop offset="100%" stopColor="#003318"/>
        </linearGradient>
        <linearGradient id="knaGemBot" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#004420"/><stop offset="100%" stopColor="#001e0a"/>
        </linearGradient>
        {/* Ball gradient */}
        <radialGradient id="knaGreenBall" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#55ff99"/><stop offset="55%" stopColor="#00bb55"/><stop offset="100%" stopColor="#005522"/>
        </radialGradient>
        <radialGradient id="knaBlueBall" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#60c0ff"/><stop offset="55%" stopColor="#0080cc"/><stop offset="100%" stopColor="#003366"/>
        </radialGradient>
        <filter id="knaGlowG"><feGaussianBlur stdDeviation="5"/></filter>
        <filter id="knaGlowP"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="knaGL"><feGaussianBlur stdDeviation="10"/></filter>
        <filter id="knaSh"><feDropShadow dx="0" dy="5" stdDeviation="10" floodColor="rgba(0,0,0,.88)"/></filter>
        <filter id="knaGemSh"><feDropShadow dx="0" dy="10" stdDeviation="18" floodColor="rgba(0,180,70,.3)"/></filter>
        <clipPath id="knaGridClip"><rect x="0" y="20" width="240" height="116" rx="0"/></clipPath>
      </defs>

      {/* ── BACKGROUND ── */}
      <rect width="240" height="320" fill="url(#knaBg)"/>
      {/* Ambient blobs */}
      <ellipse cx="120" cy="100" rx="105" ry="80" fill="url(#knaPurp)" filter="url(#knaGL)"/>
      <ellipse cx="120" cy="185" rx="88" ry="72" fill="url(#knaGlow)" filter="url(#knaGL)"/>

      {/* Stars */}
      {[[14,14,1.1],[55,8,.8],[112,5,1.4],[172,10,.9],[218,20,1.2],[230,60,.8],[228,118,1.0],[222,185,.7],[12,58,.9],[8,125,1.2],[14,198,.8],[20,268,1.0],[62,300,.8],[158,307,1.1],[200,292,.7],[90,16,1.0]].map(([x,y,rv],i)=>(
        <circle key={i} cx={x} cy={y} r={rv} fill={`rgba(${i%2===0?"210,200,255":"255,255,255"},${.3+i%4*.12})`}/>
      ))}

      {/* ── KENO NUMBER GRID (40 tiles, 8×5) ── */}
      {/* Grid panel bg */}
      <rect x="5" y="20" width="230" height="112" rx="10" fill="rgba(8,6,20,.7)" stroke="rgba(167,139,250,.1)" strokeWidth="1"/>
      <rect x="5" y="20" width="230" height="1" fill="rgba(167,139,250,.18)"/>

      {/* Tiles 1-40 */}
      {Array.from({length:40},(_,i)=>{
        const n=i+1;
        const col=i%8, row=Math.floor(i/8);
        const x=ox+col*sx, y=oy+row*sy;
        const isHit=hitSet.has(n);
        const isSel=selSet.has(n);
        const isDrn=drawnNotSel.has(n);
        let fill="url(#knaIdle)", stroke="rgba(167,139,250,.1)", tc="rgba(90,82,117,.8)";
        if(isHit){fill="url(#knaHit)";stroke="rgba(0,255,136,.72)";tc="rgba(0,255,136,.95)";}
        else if(isSel){fill="url(#knaSel)";stroke="rgba(167,139,250,.55)";tc="rgba(192,160,255,.9)";}
        else if(isDrn){fill="url(#knaDrw)";stroke="rgba(0,180,255,.38)";tc="rgba(0,180,255,.75)";}
        return(
          <g key={n}>
            {isHit&&<rect x={x-2} y={y-2} width={tw+4} height={th+4} rx="6" fill="rgba(0,255,136,.16)" filter="url(#knaGlowG)"/>}
            {isSel&&!isHit&&<rect x={x-2} y={y-2} width={tw+4} height={th+4} rx="6" fill="rgba(124,58,237,.18)" filter="url(#knaGlowP)"/>}
            <rect x={x} y={y} width={tw} height={th} rx="4.5" fill={fill} stroke={stroke} strokeWidth={isHit||isSel?".9":".6"}/>
            {/* Top shine */}
            <rect x={x+2} y={y+2} width={tw-4} height={4} rx="2" fill={isHit?"rgba(0,255,136,.1)":isSel?"rgba(192,132,252,.1)":"rgba(255,255,255,.04)"}/>
            <text x={x+tw/2} y={y+th/2+3.5} textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontSize="6.5" fontWeight="800" fill={tc}>{n}</text>
          </g>
        );
      })}

      {/* ── EMERALD GEM — centered, overlapping lower grid ── */}
      {/* Gem shadow + glow behind */}
      <ellipse cx="120" cy="196" rx="72" ry="20" fill="rgba(0,0,0,.55)" filter="url(#knaGlowG)"/>
      <ellipse cx="120" cy="168" rx="66" ry="58" fill="rgba(0,200,70,.2)" filter="url(#knaGL)"/>

      {/*
        Emerald cut octagon:
        outer girdle: top=148,bot=196, left=80,right=160, corners cut 16px
        Points: 96,148  144,148  160,164  160,188  144,204  96,204  80,188  80,164
        table (inner flat): 96,160  130,152  144,160  148,188  130,200  96,196  80,188  88,160
        Actually let me use simpler emerald-cut rectangle with 4 corner clips:
        outer: 80,148 → 160,148 → 160,196 → 80,196, with corners at 14px
        = points: 94,148  146,148  160,162  160,182  146,196  94,196  80,182  80,162
        table: 98,158  138,158  148,170  148,174  138,186  98,186  88,174  88,170
      */}

      {/* ── OUTER GIRDLE (darkest base) ── */}
      <polygon points="94,144 146,144 162,160 162,184 146,200 94,200 78,184 78,160"
        fill="#021a09" filter="url(#knaGemSh)"/>
      {/* Girdle rim */}
      <polygon points="94,144 146,144 162,160 162,184 146,200 94,200 78,184 78,160"
        fill="none" stroke="rgba(0,200,70,.3)" strokeWidth=".8"/>

      {/* ── BEZEL FACETS (8 faces between girdle and table) ── */}
      {/* Top bezel — brightest, light from above-left */}
      <polygon points="94,144 146,144 138,156 102,156" fill="url(#knaGemTop)" opacity=".95"/>
      {/* Top-left corner — super bright highlight */}
      <polygon points="78,160 94,144 102,156 88,168" fill="#44ff99" opacity=".88"/>
      {/* Left bezel — medium light */}
      <polygon points="78,160 78,184 88,172 88,168" fill="#00bb55" opacity=".85"/>
      {/* Bottom-left corner */}
      <polygon points="78,184 94,200 102,188 88,172" fill="#007733" opacity=".88"/>
      {/* Bottom bezel — darkest shadow */}
      <polygon points="94,200 146,200 138,188 102,188" fill="url(#knaGemBot)" opacity=".95"/>
      {/* Bottom-right corner */}
      <polygon points="146,200 162,184 148,172 138,188" fill="#004422" opacity=".88"/>
      {/* Right bezel — dark shadow side */}
      <polygon points="162,160 162,184 148,172 148,164" fill="url(#knaGemRight)" opacity=".9"/>
      {/* Top-right corner */}
      <polygon points="146,144 162,160 148,164 138,156" fill="#00aa44" opacity=".88"/>

      {/* ── INNER BEZEL LINES (depth lines from table corners to girdle) ── */}
      <line x1="102" y1="156" x2="78"  y2="160" stroke="rgba(0,255,80,.12)" strokeWidth=".8"/>
      <line x1="138" y1="156" x2="162" y2="160" stroke="rgba(0,0,0,.25)" strokeWidth=".8"/>
      <line x1="102" y1="188" x2="78"  y2="184" stroke="rgba(0,0,0,.2)"  strokeWidth=".8"/>
      <line x1="138" y1="188" x2="162" y2="184" stroke="rgba(0,0,0,.3)"  strokeWidth=".8"/>
      <line x1="88"  y1="168" x2="88"  y2="172" stroke="rgba(0,255,80,.1)"  strokeWidth=".7"/>
      <line x1="148" y1="164" x2="148" y2="172" stroke="rgba(0,0,0,.22)" strokeWidth=".7"/>

      {/* ── TABLE FACE (center flat top face) ── */}
      <polygon points="102,156 138,156 148,164 148,180 138,188 102,188 88,180 88,164"
        fill="url(#knaGemMain)"/>
      {/* Table shine overlay */}
      <polygon points="102,156 138,156 148,164 148,180 138,188 102,188 88,180 88,164"
        fill="url(#knaGemShine)"/>

      {/* Inner table step lines (emerald-cut characteristic) */}
      <polygon points="108,162 132,162 140,168 140,176 132,182 108,182 96,176 96,168"
        fill="none" stroke="rgba(0,255,100,.12)" strokeWidth=".8"/>
      <polygon points="112,165 128,165 135,170 135,174 128,179 112,179 105,174 105,170"
        fill="none" stroke="rgba(0,255,100,.08)" strokeWidth=".6"/>

      {/* ── TOP-LEFT SPARKLE HIGHLIGHT ── */}
      <ellipse cx="97" cy="160" rx="14" ry="8" fill="rgba(200,255,230,.38)" transform="rotate(-20 97 160)" filter="url(#knaGlowG)"/>
      <ellipse cx="94" cy="158" rx="7"  ry="4"  fill="rgba(255,255,255,.65)" transform="rotate(-20 94 158)"/>
      <ellipse cx="91" cy="156" rx="3"  ry="1.8" fill="rgba(255,255,255,.92)" transform="rotate(-20 91 156)"/>

      {/* ── OUTER EDGE HIGHLIGHTS ── */}
      <line x1="78" y1="160" x2="94" y2="144" stroke="rgba(100,255,160,.5)" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="96" y1="144" x2="144" y2="144" stroke="rgba(80,255,140,.35)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="162" y1="182" x2="148" y2="200" stroke="rgba(0,0,0,.4)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="96" y1="200" x2="144" y2="200" stroke="rgba(0,0,0,.3)" strokeWidth="1.1" strokeLinecap="round"/>

      {/* ── DRAWN BALLS STRIP ── */}
      <rect x="10" y="213" width="220" height="32" rx="8" fill="rgba(8,6,20,.72)" stroke="rgba(167,139,250,.12)" strokeWidth="1"/>
      <text x="18" y="224" fontFamily="'Space Grotesk',sans-serif" fontSize="5.5" fontWeight="700" fill="rgba(120,110,155,.6)" letterSpacing="1">DRAWN</text>
      {/* 11 drawn balls */}
      {[5,11,16,17,19,24,25,29,31,33,37].map((n,i)=>{
        const bx=18+i*19, by=232;
        const isH=hitSet.has(n);
        return(
          <g key={n}>
            <circle cx={bx} cy={by} r={7.5} fill={isH?"url(#knaGreenBall)":"url(#knaBlueBall)"} filter={isH?"url(#knaGlowG)":"none"}/>
            <circle cx={bx} cy={by} r={7.5} fill="none" stroke={isH?"rgba(0,255,136,.55)":"rgba(0,180,255,.35)"} strokeWidth=".8"/>
            {/* Ball shine */}
            <ellipse cx={bx-2} cy={by-3} rx="3" ry="2" fill="rgba(255,255,255,.35)" transform={`rotate(-25 ${bx-2} ${by-3})`}/>
            <text x={bx} y={by+2.8} textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontSize={n>=10?"5.5":"6"} fontWeight="800" fill="rgba(255,255,255,.92)">{n}</text>
          </g>
        );
      })}

      {/* ── MULTIPLIER BADGE ── */}
      <rect x="50" y="256" width="140" height="50" rx="11"
        fill="rgba(0,255,136,.07)" stroke="rgba(0,255,136,.3)" strokeWidth="1.2" filter="url(#knaGlowG)"/>
      <rect x="50" y="256" width="140" height="50" rx="11" fill="rgba(0,0,0,.2)"/>
      <text x="120" y="272" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="8" fontWeight="700" fill="rgba(0,255,136,.55)" letterSpacing="3">KENO</text>
      <text x="120" y="297" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"
        fontSize="22" fontWeight="900" fill="rgba(0,255,136,.95)" letterSpacing="-0.5"
        style={{filter:"drop-shadow(0 0 10px rgba(0,255,136,.7))"}}>6 HITS · 110×</text>

      {/* Corner sparkles */}
      {[[22,312],[218,308],[228,38],[14,36]].map(([x,y],i)=>(
        <g key={i}>
          <line x1={x} y1={y-5} x2={x} y2={y+5} stroke="rgba(192,132,252,.55)" strokeWidth="1.3"/>
          <line x1={x-5} y1={y} x2={x+5} y2={y} stroke="rgba(192,132,252,.55)" strokeWidth="1.3"/>
          <circle cx={x} cy={y} r="1.2" fill="rgba(192,132,252,.8)"/>
        </g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════ KENO MATH ══════════════════════════════════ */
/*
  40 balls, 15 drawn (P_hit = 0.375 per ball).
  Target win rate ~58% (≈24:17). Min payout 0.95x for 10 picks, scaled for others.
  Lower minimums = fewer "free money" rounds; reduced multipliers = lower RTP ~93%.
*/
const KENO_PAYOUTS={
  1:  {1: 2.10},
  2:  {2: 4.80},
  3:  {3: 14.0},
  4:  {2: 0.95, 3: 5.5,  4: 55.0},
  5:  {3: 0.95, 4: 11.0, 5: 250.0},
  6:  {3: 0.95, 4: 4.5,  5: 25.0,  6: 380.0},
  7:  {3: 0.95, 4: 2.5,  5: 16.0,  6: 110.0, 7: 600.0},
  8:  {4: 0.95, 5: 5.5,  6: 34.0,  7: 210.0, 8: 850.0},
  9:  {4: 0.95, 5: 2.8,  6: 16.0,  7: 85.0,  8: 450.0, 9: 850.0},
  10: {4: 0.95, 5: 1.8,  6: 8.5,   7: 35.0,  8: 140.0, 9: 500.0, 10: 850.0},
};
function kenoMult(picks,hits){const t=KENO_PAYOUTS[picks];return t&&t[hits]?t[hits]:0;}
function kenoMaxMult(picks){const t=KENO_PAYOUTS[picks];if(!t)return 0;return Math.max(...Object.values(t));}
// 40 balls, draw 15
function kenoDraw(){const p=Array.from({length:40},(_,i)=>i+1);for(let i=39;i>0;i--){const j=Math.floor(Math.random()*(i+1));[p[i],p[j]]=[p[j],p[i]];}return p.slice(0,15);}

/* ══════════════════════════════════════ KENO GAME ══════════════════════════════════ */
function KenGame({balance,setBalance,setPage}){
  const [bet,setBet]=useState(5);
  const [selected,setSelected]=useState(new Set());
  const [drawn,setDrawn]=useState(new Set());
  const [drawnArr,setDrawnArr]=useState([]);
  const [phase,setPhase]=useState("idle"); // idle | drawing | done
  const [result,setResult]=useState(null);
  const [flash,setFlash]=useState(null);
  const [toast,setToast]=useState(null);
  const [drops,setDrops]=useState({});
  const [kHistory,setKHistory]=useState([]);
  const [showStats,setShowStats]=useState(false);
  const [knStats,setKnStats]=useState({profit:0,wagered:0,wins:0,losses:0,history:[0]});
  const MAX_PICKS=10;
  const pc=selected.size;
  const isRunning=phase==="drawing";

  const handleTile=useCallback((n)=>{
    if(phase!=="idle")return;
    setSelected(prev=>{
      const nx=new Set(prev);
      if(nx.has(n)){nx.delete(n);sfx.unpick();}
      else if(nx.size<MAX_PICKS){nx.add(n);sfx.pick();}
      return nx;
    });
  },[phase]);

  const autoPick=useCallback(()=>{
    if(phase!=="idle")return; sfx.click();
    const pool=Array.from({length:40},(_,i)=>i+1);
    for(let i=39;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
    setSelected(new Set(pool.slice(0,MAX_PICKS)));
  },[phase]);

  const placeBet=useCallback(async()=>{
    if(phase!=="idle"||pc===0||bet<=0||bet>balance)return;
    sfx.start(); setBalance(b=>+(b-bet).toFixed(2));
    setPhase("drawing"); setDrawn(new Set()); setDrawnArr([]); setResult(null); setDrops({});
    const da=kenoDraw(); const ds=new Set(da);
    for(let i=0;i<da.length;i++){
      await new Promise(r=>setTimeout(r,120));
      const n=da[i]; const isHit=selected.has(n);
      sfx.ballDrop?sfx.ballDrop(isHit):(isHit?sfx.gem(1):sfx.tick());
      setDrawn(prev=>new Set([...prev,n]));
      setDrawnArr(prev=>[...prev,n]);
      setDrops(prev=>({...prev,[n]:isHit?"hit":"norm"}));
      setTimeout(()=>setDrops(prev=>{const nx={...prev};delete nx[n];return nx;}),500);
    }
    const hits=[...selected].filter(n=>ds.has(n)).length;
    const mult=kenoMult(pc,hits); const win=+(mult*bet).toFixed(2);
    setResult({hits,mult,win}); setDrawn(ds);
    if(win>0){
      setBalance(b=>+(b+win).toFixed(2)); setFlash("g");
      if(win>=bet*10){sfx.cash();setToast(`+$${win.toLocaleString()}`);}else sfx.win(mult);
      setKHistory(h=>[{w:true,mult,win},...h.slice(0,29)]);
      setKnStats(s=>({profit:+(s.profit+(win-bet)).toFixed(2),wagered:+(s.wagered+bet).toFixed(2),wins:s.wins+1,losses:s.losses,history:[...s.history,+(s.profit+(win-bet)).toFixed(2)]}));
    } else {
      setFlash("r"); sfx.lose();
      setKHistory(h=>[{w:false},...h.slice(0,29)]);
      setKnStats(s=>({profit:+(s.profit-bet).toFixed(2),wagered:+(s.wagered+bet).toFixed(2),wins:s.wins,losses:s.losses+1,history:[...s.history,+(s.profit-bet).toFixed(2)]}));
    }
    setTimeout(()=>setFlash(null),700); setTimeout(()=>setToast(null),2200);
    setPhase("done");
  },[phase,pc,bet,balance,selected,setBalance]);

  const replay=useCallback(()=>{sfx.click();setPhase("idle");setDrawn(new Set());setDrawnArr([]);setResult(null);setDrops({});},[]);

  const getTileState=(n)=>{
    if(phase==="idle")return selected.has(n)?"k-sel":"k-idle";
    const isSel=selected.has(n),isDrn=drawn.has(n);
    if(isSel&&isDrn)return "k-hit";
    if(isSel&&!isDrn)return drawn.size===10?"k-miss":"k-sel";
    if(!isSel&&isDrn)return "k-drawn";
    return "k-idle";
  };
  const payoutRows=pc>0?Object.entries(KENO_PAYOUTS[pc]||{}).map(([h,m])=>({hits:+h,mult:m})):[];

  return(
    <div className="gamepage"><style>{CSS_KENO}</style>
      {flash==="r"&&<div className="fl-r"/>}
      {flash==="g"&&<div className="fl-g"/>}
      {toast&&<div className="cashpop">{toast}</div>}
      <div className="bc">
        <a onClick={()=>setPage("lobby")}>Home</a><span style={{opacity:.35}}>›</span>
        <a onClick={()=>setPage("casino")}>Casino</a><span style={{opacity:.35}}>›</span>
        <span style={{color:"var(--tx2)",fontWeight:500}}>Keno</span>
      </div>
      <div className="gamebody">
        {/* LEFT PANEL */}
        <div className="lp">
          <div className="fld">
            <div className="flbl">Bet Amount <span>${balance.toFixed(2)}</span></div>
            <div className="fi-w">
              <span className="fi-pre">◈</span>
              <input className="fi" type="number" min={.1} step={1} value={bet}
                onChange={e=>!isRunning&&setBet(Math.max(.1,+e.target.value))} disabled={isRunning}/>
              <span className="fi-suf">USD</span>
            </div>
            <div className="qb">
              {["½","2×","5×","MAX"].map(v=>(
                <button key={v} className="qbtn" disabled={isRunning} onClick={()=>{
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
          <div className="sr"><span className="sl">Picks selected</span><span className="sv" style={{color:"var(--puLL)"}}>{pc} / {MAX_PICKS}</span></div>
          <div className="sr"><span className="sl">Multiplier</span><span className="sv" style={{color:"var(--puLL)"}}>{result?`${result.mult}×`:"—"}</span></div>
          <div className="sr"><span className="sl">Max payout</span><span className="sv" style={{color:"var(--go)"}}>{pc>0?`$${(kenoMaxMult(pc)*bet).toFixed(2)}`:"—"}</span></div>
          {result&&<div className="sr"><span className="sl">Hits</span><span className="sv" style={{color:result.hits>0?"var(--nG)":"var(--tx3)"}}>{result.hits} hits</span></div>}
          <div className="sep"/>
          {pc>0&&(
            <>
              <div className="k-ptable">
                <div className="k-pt-head"><span>Hits</span><span>Multiplier</span></div>
                {payoutRows.map(({hits:h,mult:m})=>(
                  <div key={h} className={`k-pt-row${result&&result.hits===h?" kp-active":""}`}>
                    <span className="k-pt-hits">{h} of {pc}</span>
                    <span className="k-pt-mult">{m}×</span>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="sep"/>
          <button className="cta go" style={{background:"linear-gradient(135deg,rgba(0,212,255,.18),rgba(0,212,255,.1))",border:"1px solid rgba(0,212,255,.28)",color:"var(--nC)",boxShadow:"none"}}
            onClick={autoPick} disabled={isRunning}>🎲 Auto Pick</button>
          <button className="cta replay" onClick={()=>{if(!isRunning){sfx.click();setSelected(new Set());}}} disabled={isRunning||pc===0}>Clear Picks</button>
          <div className="sep"/>
          {kHistory.length>0&&(
            <>
              <div className="flbl">Recent Results</div>
              <div className="khist">
                {kHistory.slice(0,20).map((h,i)=>(
                  <div key={i} className={`kh-dot ${h.w?"kh-w":"kh-l"}`} title={h.w?`${h.mult}× +$${h.win}`:"Lost"}/>
                ))}
              </div>
            </>
          )}
          <button className="sm-btn" onClick={()=>setShowStats(true)} style={{marginTop:6,width:"100%",justifyContent:"center"}}>
            📊 Stats & History
          </button>
        </div>
        {showStats&&<StatsModal gameName="Keno" onClose={()=>setShowStats(false)} stats={{profit:knStats.profit,wagered:knStats.wagered,wins:knStats.wins,losses:knStats.losses,history:knStats.history}}/>}

        {/* GAME AREA */}
        <div className="garea" style={{alignItems:"stretch",padding:"12px 16px"}}>
          <div className="keno-layout" style={{maxWidth:580,margin:"0 auto",width:"100%"}}>

            {/* SCROLLABLE TOP — result card + grid */}
            <div className="keno-scroll">
              {result&&(
                <div className={`k-result ${result.win>0?"kr-won":"kr-lost"}`}>
                  <div className="kr-block">
                    <div className="kr-lbl">Hits</div>
                    <div className={`kr-val ${result.win>0?"kr-hits-w":"kr-hits-l"}`}>{result.hits} / {pc}</div>
                  </div>
                  <div className="kr-block" style={{textAlign:"center"}}>
                    <div className="kr-lbl">Multiplier</div>
                    <div className="kr-val kr-mult-v">{result.mult>0?`${result.mult}×`:"0×"}</div>
                  </div>
                  <div className="kr-block" style={{textAlign:"right"}}>
                    <div className="kr-lbl">{result.win>0?"Won":"—"}</div>
                    <div className={`kr-val ${result.win>0?"kr-win-v":"kr-zero"}`}>{result.win>0?`$${result.win.toFixed(2)}`:"$0.00"}</div>
                  </div>
                </div>
              )}

              <div className="kgrid-wrap">
                <div className="kgrid-header">
                  <div className="kgh-title">💎 Keno</div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    {pc>0&&<div className={`kgh-badge${pc===MAX_PICKS?" kfull":""}`}>{pc}/{MAX_PICKS} picks</div>}
                    {phase==="drawing"&&<div className="kgh-info" style={{color:"var(--nC)"}}>Drawing... {drawn.size}/10</div>}
                    {phase==="done"&&<div className="kgh-info">{drawn.size} drawn</div>}
                  </div>
                </div>
                <div className="kgrid">
                  {Array.from({length:40},(_,i)=>{
                    const n=i+1;
                    const state=getTileState(n);
                    const drop=drops[n];
                    const canClick=phase==="idle"&&(selected.has(n)||selected.size<MAX_PICKS);
                    return(
                      <div key={n} className={`ktile ${state}${!canClick&&phase==="idle"?" k-dis":""}`} onClick={()=>handleTile(n)}>
                        {drop&&<div className={`k-drop-ring ${drop==="hit"?"k-drop-hit":"k-drop-norm"}`}/>}
                        {state==="k-hit"&&<span className="k-tile-gem">✦</span>}
                        <span style={{position:"relative",zIndex:1}}>{n}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FIXED FOOTER — balls zone + CTA always visible */}
            <div className="keno-footer">
              {/* Drawn balls — fixed reserved zone, always takes space */}
              <div className="keno-balls-zone">
                {(phase==="drawing"||phase==="done")&&drawnArr.length>0?(
                  <>
                    <div className="kballs-lbl">Drawn Numbers</div>
                    <div className="kballs-track">
                      {[...drawn].sort((a,b)=>a-b).map((n,i)=>{
                        const isHit=selected.has(n);
                        return(
                          <div key={n} className={`kball ${isHit?"kb-hit":"kb-norm"}`} style={{animationDelay:`${i*.035}s`}}>{n}</div>
                        );
                      })}
                    </div>
                  </>
                ):(
                  phase==="idle"&&pc>0?(
                    <div className="keno-payout-preview">
                      <div className="kpp-label">Payout preview</div>
                      <div className="kpp-track">
                        {payoutRows.map(({hits:h,mult:m})=>(
                          <div key={h} className="kpp-pill">
                            <span className="kpp-h">{h} hit{h>1?"s":""}</span>
                            <span className="kpp-m">{m}×</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ):(
                    <div style={{height:44}}/>
                  )
                )}
              </div>

              {/* CTA — always at bottom, never pushed out */}
              {phase==="idle"&&(
                <button className="cta go" style={{width:"100%"}} onClick={placeBet}
                  disabled={pc===0||bet<=0||bet>balance}>
                  {pc===0?"Select numbers to play":bet>balance?"Insufficient balance":`▶ Place Bet — $${bet.toFixed(2)}`}
                </button>
              )}
              {phase==="drawing"&&<button className="cta go" style={{width:"100%"}} disabled>Drawing balls...</button>}
              {phase==="done"&&<button className="cta replay" style={{width:"100%"}} onClick={replay}>{result?.win>0?"🎉 Play Again":"↩ Play Again"}</button>}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


export { KenGame, KenoArt };
