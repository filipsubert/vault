import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { StatsModal } from "../components/StatsModal.jsx";
import { CSS_DOGHOUSE } from "../shared/css_doghouse.js";
// ── Dog House slot ..────────────────────────────────────────────────────────────
/* ══════════════════════════════════════ DOG HOUSE SLOT ══════════════════════════════ */

// ── SVG Symbols ──
const DH_Scatter=React.memo(()=>(
  <svg viewBox="0 0 44 44" width="90%" height="90%">
    <defs>
      <radialGradient id="dhScBg" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="#ff9900"/><stop offset="100%" stopColor="#b35000"/></radialGradient>
    </defs>
    <ellipse cx="22" cy="22" rx="20" ry="20" fill="url(#dhScBg)" stroke="#ffcc44" strokeWidth="1.5"/>
    <ellipse cx="22" cy="22" rx="18" ry="18" fill="none" stroke="rgba(255,220,100,.4)" strokeWidth=".8"/>
    {/* Dog paw */}
    <ellipse cx="22" cy="25" rx="7" ry="6" fill="rgba(80,30,0,.7)"/>
    {[[16,19,3],[22,17,3],[28,19,3],[13,23,2.2],[31,23,2.2]].map(([cx,cy,r],i)=>
      <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r*.8} fill="rgba(60,20,0,.75)"/>
    )}
    <text x="22" y="39" textAnchor="middle" fontSize="5" fontFamily="'Space Grotesk',sans-serif" fontWeight="900" fill="#fff" letterSpacing=".5">FREE SPIN</text>
  </svg>
));
const DH_Wild=React.memo(({mult=2})=>(
  <svg viewBox="0 0 44 44" width="90%" height="90%">
    <defs>
      <linearGradient id="dhWBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff4444"/><stop offset="100%" stopColor="#880000"/></linearGradient>
    </defs>
    <rect x="2" y="2" width="40" height="40" rx="7" fill="url(#dhWBg)" stroke="#ff8888" strokeWidth="1.5"/>
    <rect x="4" y="4" width="36" height="36" rx="5" fill="none" stroke="rgba(255,180,180,.3)" strokeWidth=".8"/>
    <text x="22" y="21" textAnchor="middle" fontSize="10" fontFamily="'Rye',serif" fill="#ffe0e0" letterSpacing=".5">WILD</text>
    <text x="22" y="33" textAnchor="middle" fontSize="9" fontFamily="'Special Elite',serif" fontWeight="700" fill="#ffdd44">{`×${mult}`}</text>
  </svg>
));
const DH_Dog1=React.memo(()=>(// Rottweiler - highest premium
  <svg viewBox="0 0 44 44" width="88%" height="88%">
    <defs><radialGradient id="d1bg" cx="50%" cy="40%" r="65%"><stop offset="0%" stopColor="#4a3020"/><stop offset="100%" stopColor="#1a0e08"/></radialGradient></defs>
    <rect x="1" y="1" width="42" height="42" rx="8" fill="url(#d1bg)" stroke="rgba(180,120,60,.4)" strokeWidth="1"/>
    {/* Head */}
    <ellipse cx="22" cy="20" rx="13" ry="12" fill="#3d2510"/>
    {/* Ears */}
    <path d="M10 14 Q7 8 13 11" fill="#2a1808" stroke="#1a1008" strokeWidth=".5"/>
    <path d="M34 14 Q37 8 31 11" fill="#2a1808" stroke="#1a1008" strokeWidth=".5"/>
    {/* Snout */}
    <ellipse cx="22" cy="24" rx="7" ry="5" fill="#2a1808"/>
    <ellipse cx="22" cy="22" rx="4" ry="2.5" fill="#c87040"/>
    {/* Nose */}
    <ellipse cx="22" cy="20.5" rx="3" ry="2" fill="#111"/>
    <ellipse cx="21" cy="19.8" rx=".8" ry=".5" fill="rgba(255,255,255,.3)"/>
    {/* Eyes */}
    <circle cx="17" cy="17" r="2.5" fill="#1a1008"/><circle cx="17" cy="17" r="1.5" fill="#8b5a20"/><circle cx="17.5" cy="16.5" r=".5" fill="#fff" opacity=".8"/>
    <circle cx="27" cy="17" r="2.5" fill="#1a1008"/><circle cx="27" cy="17" r="1.5" fill="#8b5a20"/><circle cx="27.5" cy="16.5" r=".5" fill="#fff" opacity=".8"/>
    {/* Teeth */}
    <path d="M19 27 Q22 29 25 27" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
    {/* Collar */}
    <path d="M11 28 Q22 32 33 28" fill="none" stroke="#cc2222" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="22" cy="31" r="1.5" fill="#ffcc00"/>
    <text x="22" y="43" textAnchor="middle" fontSize="4.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="800" fill="rgba(200,130,60,.8)">ROTTWEILER</text>
  </svg>
));
const DH_Dog2=React.memo(()=>(// Doberman - 2nd premium
  <svg viewBox="0 0 44 44" width="88%" height="88%">
    <defs><radialGradient id="d2bg" cx="50%" cy="40%" r="65%"><stop offset="0%" stopColor="#3a2818"/><stop offset="100%" stopColor="#150c06"/></radialGradient></defs>
    <rect x="1" y="1" width="42" height="42" rx="8" fill="url(#d2bg)" stroke="rgba(160,100,40,.35)" strokeWidth="1"/>
    <ellipse cx="22" cy="20" rx="11" ry="12" fill="#2d1c0e"/>
    {/* Pointed ears */}
    <polygon points="12,10 10,4 16,10" fill="#1e1208"/>
    <polygon points="32,10 34,4 28,10" fill="#1e1208"/>
    <polygon points="12.5,10 11,5.5 15.5,10" fill="#c87040" opacity=".4"/>
    <polygon points="31.5,10 33,5.5 28.5,10" fill="#c87040" opacity=".4"/>
    {/* Tan muzzle */}
    <ellipse cx="22" cy="24" rx="6.5" ry="5" fill="#c87840"/>
    {/* Nose */}
    <ellipse cx="22" cy="20.5" rx="2.5" ry="1.8" fill="#111"/>
    <ellipse cx="21.2" cy="20" rx=".7" ry=".5" fill="rgba(255,255,255,.3)"/>
    {/* Eyes */}
    <circle cx="17.5" cy="17" r="2.2" fill="#1a0e06"/><circle cx="17.5" cy="17" r="1.3" fill="#8b6030"/><circle cx="18" cy="16.5" r=".45" fill="#fff" opacity=".8"/>
    <circle cx="26.5" cy="17" r="2.2" fill="#1a0e06"/><circle cx="26.5" cy="17" r="1.3" fill="#8b6030"/><circle cx="27" cy="16.5" r=".45" fill="#fff" opacity=".8"/>
    <path d="M19.5 26.5 Q22 28.5 24.5 26.5" fill="none" stroke="#fff" strokeWidth=".8"/>
    <path d="M11 27 Q22 31 33 27" fill="none" stroke="#4444cc" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="22" cy="30" r="1.5" fill="#aaaaff"/>
    <text x="22" y="43" textAnchor="middle" fontSize="4.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="800" fill="rgba(180,110,50,.8)">DOBERMAN</text>
  </svg>
));
const DH_Dog3=React.memo(()=>(// Pug - 3rd premium
  <svg viewBox="0 0 44 44" width="88%" height="88%">
    <defs><radialGradient id="d3bg" cx="50%" cy="40%" r="65%"><stop offset="0%" stopColor="#4a3828"/><stop offset="100%" stopColor="#1e1408"/></radialGradient></defs>
    <rect x="1" y="1" width="42" height="42" rx="8" fill="url(#d3bg)" stroke="rgba(150,110,70,.35)" strokeWidth="1"/>
    <ellipse cx="22" cy="21" rx="14" ry="12" fill="#b8906a"/>
    {/* Dark mask */}
    <ellipse cx="22" cy="23" rx="8" ry="7" fill="#3d2810"/>
    {/* Wrinkle lines */}
    <path d="M16 20 Q22 18 28 20" fill="none" stroke="rgba(50,25,10,.5)" strokeWidth=".8"/>
    <path d="M16 22 Q22 20 28 22" fill="none" stroke="rgba(50,25,10,.4)" strokeWidth=".6"/>
    {/* Flat nose */}
    <ellipse cx="22" cy="22" rx="4" ry="2.5" fill="#1a0e06"/>
    <ellipse cx="20.5" cy="21.2" rx="1.2" ry=".7" fill="#2a1810"/>
    <ellipse cx="23.5" cy="21.2" rx="1.2" ry=".7" fill="#2a1810"/>
    {/* Eyes - big round */}
    <circle cx="16.5" cy="17.5" r="3.5" fill="#1a0e06"/><circle cx="16.5" cy="17.5" r="2.2" fill="#4a3020"/><circle cx="17.2" cy="16.8" r=".7" fill="#fff" opacity=".85"/>
    <circle cx="27.5" cy="17.5" r="3.5" fill="#1a0e06"/><circle cx="27.5" cy="17.5" r="2.2" fill="#4a3020"/><circle cx="28.2" cy="16.8" r=".7" fill="#fff" opacity=".85"/>
    {/* Tongue */}
    <path d="M19 27 Q22 31 25 27" fill="#e06060" stroke="#c04040" strokeWidth=".5"/>
    <path d="M11 30 Q22 34 33 30" fill="none" stroke="#228822" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="22" cy="33" r="1.5" fill="#66ff66"/>
    <text x="22" y="43" textAnchor="middle" fontSize="4.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="800" fill="rgba(160,120,70,.8)">PUG</text>
  </svg>
));
const DH_Collar=React.memo(()=>(
  <svg viewBox="0 0 44 44" width="82%" height="82%">
    <defs><linearGradient id="colG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff6666"/><stop offset="100%" stopColor="#882222"/></linearGradient></defs>
    <rect x="1" y="1" width="42" height="42" rx="7" fill="rgba(20,8,4,.9)" stroke="rgba(200,60,60,.3)" strokeWidth="1"/>
    {/* Collar band */}
    <path d="M6 22 Q22 16 38 22 Q22 28 6 22Z" fill="url(#colG)" stroke="#ff8888" strokeWidth=".8"/>
    {/* Studs */}
    {[9,15,22,29,35].map(x=>(<circle key={x} cx={x} cy="22" r="2" fill="#ffcc44" stroke="#cc9900" strokeWidth=".5"/>))}
    {/* Tag */}
    <ellipse cx="22" cy="29" rx="5" ry="4.5" fill="#ffcc00" stroke="#cc9900" strokeWidth="1"/>
    <text x="22" y="31" textAnchor="middle" fontSize="5.5" fontFamily="'Rye',serif" fill="#884400">☺</text>
    {/* Chain link */}
    <path d="M22 26 L22 24.5" stroke="#888" strokeWidth="1.2"/>
    <text x="22" y="43" textAnchor="middle" fontSize="4.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="800" fill="rgba(200,80,80,.7)">COLLAR</text>
  </svg>
));
const DH_Bone=React.memo(()=>(
  <svg viewBox="0 0 44 44" width="82%" height="82%">
    <rect x="1" y="1" width="42" height="42" rx="7" fill="rgba(15,10,6,.9)" stroke="rgba(200,170,120,.25)" strokeWidth="1"/>
    {/* Bone */}
    <g transform="translate(22,22) rotate(-30)">
      <rect x="-11" y="-3.5" width="22" height="7" rx="3.5" fill="#e8d8b0" stroke="#c8b880" strokeWidth=".8"/>
      <circle cx="-11" cy="-5" r="4" fill="#e8d8b0" stroke="#c8b880" strokeWidth=".8"/>
      <circle cx="-11" cy="5" r="4" fill="#e8d8b0" stroke="#c8b880" strokeWidth=".8"/>
      <circle cx="11" cy="-5" r="4" fill="#e8d8b0" stroke="#c8b880" strokeWidth=".8"/>
      <circle cx="11" cy="5" r="4" fill="#e8d8b0" stroke="#c8b880" strokeWidth=".8"/>
      <rect x="-9" y="-2.5" width="18" height="5" rx="2.5" fill="#f0e4c0"/>
    </g>
    <text x="22" y="43" textAnchor="middle" fontSize="4.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="800" fill="rgba(180,150,80,.7)">BONE</text>
  </svg>
));
const DH_Royal=React.memo(({letter,color="#f5c400"})=>(
  <svg viewBox="0 0 44 44" width="85%" height="85%">
    <defs><linearGradient id={`dhRg${letter}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".85"/><stop offset="100%" stopColor={color} stopOpacity=".45"/></linearGradient></defs>
    <rect x="2" y="2" width="40" height="40" rx="6" fill="rgba(18,10,4,.95)" stroke={color} strokeWidth=".8" strokeOpacity=".3"/>
    {[[5,7],[39,7],[5,37],[39,37]].map(([cx,cy],i)=>(<circle key={i} cx={cx} cy={cy} r="1.8" fill={color} opacity=".25"/>))}
    <rect x="5" y="5" width="34" height="34" rx="4" fill="none" stroke={color} strokeWidth=".4" strokeOpacity=".15"/>
    <text x="22" y="30" textAnchor="middle" fontSize={letter==="A"||letter==="K"||letter==="Q"||letter==="J"?"22":"18"}
      fontFamily="'Rye',serif" fontWeight="700" fill={`url(#dhRg${letter})`}>{letter}</text>
  </svg>
));

// ── Dog House Game Constants ──
const DH_REELS=5, DH_ROWS=3;

// 20 paylines for 5x3 grid [row indices per reel, 0=top 1=mid 2=bot]
const DH_PAYLINES=[
  [1,1,1,1,1],[0,0,0,0,0],[2,2,2,2,2],
  [0,1,2,1,0],[2,1,0,1,2],
  [0,0,1,0,0],[2,2,1,2,2],
  [1,0,0,0,1],[1,2,2,2,1],
  [0,1,1,1,0],[2,1,1,1,2],
  [1,0,1,0,1],[1,2,1,2,1],
  [0,0,2,0,0],[2,2,0,2,2],
  [0,1,2,2,2],[2,1,0,0,0],
  [1,1,0,1,1],[1,1,2,1,1],
  [0,2,0,2,0],
];

// Symbol definitions with weights per reel
// Wilds only on reels 1,2,3 (index); Scatters only on reels 0,2,4
const DH_SYMS={
  dog1:  {name:"Rottweiler",render:()=><DH_Dog1/>},
  dog2:  {name:"Doberman", render:()=><DH_Dog2/>},
  dog3:  {name:"Pug",      render:()=><DH_Dog3/>},
  collar:{name:"Collar",   render:()=><DH_Collar/>},
  bone:  {name:"Bone",     render:()=><DH_Bone/>},
  A:     {name:"Ace",      render:()=><DH_Royal letter="A" color="#f5c400"/>},
  K:     {name:"King",     render:()=><DH_Royal letter="K" color="#e8a030"/>},
  Q:     {name:"Queen",    render:()=><DH_Royal letter="Q" color="#c080e0"/>},
  J:     {name:"Jack",     render:()=><DH_Royal letter="J" color="#6090cc"/>},
  wild:  {name:"Wild",     render:(m)=><DH_Wild mult={m||2}/>},
  scatter:{name:"Scatter", render:()=><DH_Scatter/>},
};

// Paytable: multipliers for 3,4,5-of-a-kind on a payline
const DH_PAY={
  dog1:  [0,0,15,40,200],
  dog2:  [0,0,10,25,100],
  dog3:  [0,0,8, 20,80 ],
  collar:[0,0,5, 15,50 ],
  bone:  [0,0,4, 10,40 ],
  A:     [0,0,2,  5,15 ],
  K:     [0,0,2,  5,12 ],
  Q:     [0,0,1,  4,10 ],
  J:     [0,0,1,  3,8  ],
};

// Weighted reel strips — different weight per reel for volatility
// Format: [sym, weight]
const DH_REEL_STRIPS=[
  // Reel 0 - no wild
  {dog1:2,dog2:3,dog3:4,collar:5,bone:6,A:7,K:8,Q:9,J:10,scatter:1},
  // Reel 1 - has wild
  {dog1:2,dog2:3,dog3:4,collar:5,bone:6,A:7,K:8,Q:9,J:10,wild:2},
  // Reel 2 - has wild+scatter
  {dog1:2,dog2:3,dog3:4,collar:5,bone:6,A:7,K:8,Q:9,J:10,wild:2,scatter:1},
  // Reel 3 - has wild
  {dog1:2,dog2:3,dog3:4,collar:5,bone:6,A:7,K:8,Q:9,J:10,wild:2},
  // Reel 4 - no wild
  {dog1:2,dog2:3,dog3:4,collar:5,bone:6,A:7,K:8,Q:9,J:10,scatter:1},
];

// Build weighted pools
const DH_POOLS=DH_REEL_STRIPS.map(strip=>{
  const pool=[];
  Object.entries(strip).forEach(([sym,w])=>{for(let i=0;i<w*10;i++)pool.push(sym);});
  return pool;
});

function dhSpin(stickyWilds=null, isBonus=false){
  // Returns [grid 3x5, wildMults 3x5]
  const grid=Array.from({length:DH_ROWS},()=>Array(DH_REELS).fill(null));
  const mults=Array.from({length:DH_ROWS},()=>Array(DH_REELS).fill(null));
  for(let c=0;c<DH_REELS;c++){
    for(let r=0;r<DH_ROWS;r++){
      // Sticky wilds in bonus
      if(stickyWilds&&stickyWilds[r][c]){
        grid[r][c]="wild";
        mults[r][c]=stickyWilds[r][c];
        continue;
      }
      let sym=DH_POOLS[c][Math.floor(Math.random()*DH_POOLS[c].length)];
      grid[r][c]=sym;
      if(sym==="wild") mults[r][c]=Math.random()<0.5?2:3;
    }
  }
  return{grid,mults};
}

function dhCalcWin(grid, mults, bet){
  let totalWin=0;
  const winLines=[];
  DH_PAYLINES.forEach((line,li)=>{
    const syms=line.map((row,col)=>grid[row][col]);
    const first=syms[0]==="wild"?syms.find(s=>s!=="wild")||"wild":syms[0];
    if(first==="scatter")return;
    let count=0;
    let lineMult=1;
    let allSame=true;
    for(let i=0;i<DH_REELS;i++){
      const s=syms[i];
      const row=line[i];
      if(s===first||s==="wild"){
        count++;
        if(s==="wild"&&mults[row][i]) lineMult*=mults[row][i];
      } else {allSame=false;break;}
    }
    if(count>=3){
      const basePay=(DH_PAY[first]?.[count]||0)*bet;
      const win=basePay*lineMult;
      if(win>0){totalWin+=win;winLines.push({line:li,sym:first,count,mult:lineMult,win});}
    }
  });
  return{totalWin,winLines};
}

function DogHouseGame({balance,setBalance,setPage}){
  const [grid,setGrid]=useState(()=>dhSpin().grid);
  const [mults,setMults]=useState(()=>Array.from({length:DH_ROWS},()=>Array(DH_REELS).fill(null)));
  const [bet,setBet]=useState(1.00);
  const [spinning,setSpinning]=useState(false);
  const [winLines,setWinLines]=useState([]);
  const [winAmt,setWinAmt]=useState(0);
  const [totalWin,setTotalWin]=useState(0);
  const [phase,setPhase]=useState("idle");
  // Bonus state
  const [bonusPhase,setBonusPhase]=useState(null); // null | "wheel" | "spins" | "end"
  const [freeSpins,setFreeSpins]=useState(0);
  const [freeSpinsLeft,setFreeSpinsLeft]=useState(0);
  const [bonusWin,setBonusWin]=useState(0);
  const [stickyWilds,setStickyWilds]=useState(null);
  // Wheel state
  const [wheels,setWheels]=useState(null); // 9 wheels each with result 1-3
  const [wheelPhase,setWheelPhase]=useState(null); // "spinning"|"done"
  const [spinKeys,setSpinKeys]=useState(()=>Array.from({length:DH_ROWS},()=>Array(DH_REELS).fill(0)));
  const [stats,setStats]=useState({spins:0,wins:0,biggest:0,totalWon:0,totalBet:0});
  const [dhStatsModal,setDhStatsModal]=useState({profit:0,wagered:0,wins:0,losses:0,history:[0]});
  const [showStats,setShowStats]=useState(false);

  const sleep=ms=>new Promise(r=>setTimeout(r,ms));

  const doSpin=useCallback(async(isBonus=false, curSticky=null)=>{
    if(spinning)return;
    const curBet=bet;
    if(!isBonus){
      if(curBet>balance)return;
      setBalance(b=>+(b-curBet).toFixed(2));
      setStats(s=>({...s,spins:s.spins+1,totalBet:+(s.totalBet+curBet).toFixed(2)}));
      setDhStatsModal(s=>({...s,profit:+(s.profit-curBet).toFixed(2),wagered:+(s.wagered+curBet).toFixed(2),history:[...s.history,+(s.profit-curBet).toFixed(2)]}));
    }
    setSpinning(true);setPhase("spinning");setWinLines([]);setWinAmt(0);

    // Animate spin
    setSpinKeys(prev=>prev.map(row=>row.map(()=>Math.random())));
    await sleep(600);

    const {grid:newGrid,mults:newMults}=dhSpin(curSticky,isBonus);
    setGrid(newGrid);setMults(newMults);
    setSpinKeys(prev=>prev.map(row=>row.map(()=>Math.random())));
    await sleep(300);

    // Check scatters (only on reels 0,2,4)
    const scatterCount=[0,2,4].filter(c=>newGrid.some(row=>row[c]==="scatter")).length;

    // Calculate win
    const{totalWin:win,winLines:wl}=dhCalcWin(newGrid,newMults,curBet);
    if(win>0){
      setWinLines(wl);setWinAmt(+(win).toFixed(2));
      if(!isBonus){
        setTotalWin(t=>+(t+win).toFixed(2));
        setBalance(b=>+(b+win).toFixed(2));
        setStats(s=>({...s,wins:s.wins+1,biggest:Math.max(s.biggest,win),totalWon:+(s.totalWon+win).toFixed(2)}));
        setDhStatsModal(s=>({...s,profit:+(s.profit+win).toFixed(2),wins:s.wins+1,history:[...s.history,+(s.profit+win).toFixed(2)]}));
      } else {
        setBonusWin(b=>+(b+win).toFixed(2));
        setBalance(b=>+(b+win).toFixed(2));
        setStats(s=>({...s,wins:s.wins+1,biggest:Math.max(s.biggest,win),totalWon:+(s.totalWon+win).toFixed(2)}));
      }
    } else if(!isBonus){
      setDhStatsModal(s=>({...s,losses:s.losses+1}));
    }
    await sleep(500);
    setWinLines([]);

    setSpinning(false);setPhase("idle");

    // Trigger bonus
    if(!isBonus&&scatterCount>=3){
      await sleep(300);
      // Spin 9 wheels
      const results=Array.from({length:9},()=>Math.ceil(Math.random()*3));
      const total=results.reduce((a,b)=>a+b,0);
      setWheels(results);setBonusPhase("wheel");setWheelPhase("spinning");
      await sleep(2200);
      setWheelPhase("done");
      await sleep(1500);
      setFreeSpins(total);setFreeSpinsLeft(total);setBonusWin(0);
      setStickyWilds(Array.from({length:DH_ROWS},()=>Array(DH_REELS).fill(null)));
      setBonusPhase("spins");setWheels(null);
    }
  },[bet,balance,spinning,setBalance]);

  const doBonusSpin=useCallback(async(stick)=>{
    if(spinning||freeSpinsLeft<=0)return;
    await doSpin(true,stick);
    // Update sticky wilds
    setStickyWilds(prev=>{
      const next=prev.map(row=>[...row]);
      grid.forEach((row,r)=>row.forEach((sym,c)=>{
        if(sym==="wild"&&mults[r][c]) next[r][c]=mults[r][c];
      }));
      return next;
    });
    setFreeSpinsLeft(fl=>{
      const next=fl-1;
      if(next<=0){
        setTimeout(()=>setBonusPhase("end"),600);
      }
      return next;
    });
  },[spinning,freeSpinsLeft,doSpin,grid,mults]);

  const endBonus=()=>{
    setBonusPhase(null);setStickyWilds(null);setFreeSpins(0);setFreeSpinsLeft(0);
    const bw=bonusWin;setBonusWin(0);
    if(bw>0) setTotalWin(t=>+(t+bw).toFixed(2));
  };

  const isWinCell=(r,c)=>winLines.some(wl=>DH_PAYLINES[wl.line][c]===r);
  const isStickyWild=(r,c)=>stickyWilds&&stickyWilds[r][c];

  const DH_CSS=`
  .dh-game{display:flex;flex-direction:column;flex:1;overflow:hidden;min-height:0;isolation:isolate;background:radial-gradient(ellipse at 50% -5%,#2a4a22 0%,#1a3016 35%,#0e1c0a 100%);position:relative;}
  .dh-game::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.012'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/svg%3E");pointer-events:none;z-index:0;}
  .dh-topbar{display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:rgba(8,16,4,.9);border-bottom:1px solid rgba(80,180,40,.18);backdrop-filter:blur(12px);flex-shrink:0;z-index:10;position:relative;}
  .dh-title{font-family:'Rye',serif;font-size:1.1rem;color:#88dd44;text-shadow:0 0 20px rgba(100,220,40,.55),0 2px 4px rgba(0,0,0,.9);letter-spacing:.06em;}
  .dh-main{display:flex;flex:1;overflow:hidden;position:relative;z-index:1;}
  .dh-ctrl{width:180px;flex-shrink:0;background:rgba(6,12,4,.94);border-right:1px solid rgba(80,160,30,.1);display:flex;flex-direction:column;gap:8px;padding:10px;overflow-y:auto;scrollbar-width:none;}
  .dh-ctrl::-webkit-scrollbar{display:none;}
  .dh-arena{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px;gap:8px;overflow:hidden;}
  .dh-grid-wrap{position:relative;border-radius:16px;overflow:hidden;box-shadow:0 12px 60px rgba(0,0,0,.85),0 0 0 3px rgba(80,160,30,.35),0 0 0 5px rgba(80,160,30,.1);width:100%;max-width:min(560px,calc((100vh - 200px)*1.78));aspect-ratio:5/3;flex-shrink:0;}
  .dh-grid-bg{position:absolute;inset:0;background:linear-gradient(180deg,#1a3010 0%,#0e2008 100%);}
  .dh-grid-bg::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% -10%,rgba(80,180,40,.08),transparent 55%);}
  .dh-grid{display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(3,1fr);gap:4px;padding:10px;position:relative;z-index:1;height:100%;width:100%;}
  .dh-cell{position:relative;will-change:transform,opacity;border-radius:10px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.015));border:1px solid rgba(255,255,255,.08);transition:all .15s;}
  .dh-cell::before{content:'';position:absolute;inset:0;background:linear-gradient(145deg,rgba(255,255,255,.05) 0%,transparent 55%);pointer-events:none;border-radius:9px;}
  .dh-cell.win{background:linear-gradient(145deg,rgba(80,60,0,.95),rgba(50,38,0,.98)) !important;border-color:rgba(245,196,0,.85) !important;box-shadow:inset 0 0 18px rgba(245,196,0,.45),0 0 12px rgba(245,196,0,.35);}
  .dh-cell.sticky-wild{background:linear-gradient(145deg,rgba(120,0,0,.95),rgba(70,0,0,.98)) !important;border-color:rgba(255,80,80,.8) !important;box-shadow:inset 0 0 18px rgba(255,60,60,.45),0 0 12px rgba(255,60,60,.35);}
  @keyframes dhSpin{0%{transform:translateY(-100%);opacity:0}60%{opacity:1}80%{transform:translateY(4%)}100%{transform:translateY(0);opacity:1}}
  .dh-cell.spinning{animation:dhSpin .4s cubic-bezier(.22,1,.36,1) both;}
  .dh-sym{width:100%;height:100%;display:flex;align-items:center;justify-content:center;border-radius:8px;}
  .dh-hud{display:flex;gap:6px;align-items:stretch;width:100%;max-width:560px;}
  .dh-hud-box{background:rgba(6,12,4,.88);border:1px solid rgba(80,160,30,.2);border-radius:10px;padding:6px 10px;display:flex;flex-direction:column;align-items:center;gap:2px;min-width:60px;flex:1;}
  .dh-hud-lbl{font-size:.52rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(100,200,50,.45);}
  .dh-hud-val{font-family:'Special Elite',serif;font-size:1rem;font-weight:700;color:#88dd44;text-shadow:0 0 10px rgba(100,200,40,.4);font-variant-numeric:tabular-nums;}
  .dh-hud-val.green{color:#44ff88;text-shadow:0 0 10px rgba(0,255,100,.5);}
  .dh-spin-btn{width:100%;padding:13px;border-radius:12px;border:none;font-family:'Rye',serif;font-size:.95rem;cursor:pointer;transition:all .18s cubic-bezier(.34,1.2,.64,1);display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#2d6e10,#4daa20,#7adc44);color:#0a1e04;box-shadow:0 4px 20px rgba(80,180,30,.4);}
  .dh-spin-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 32px rgba(80,200,30,.55);}
  .dh-spin-btn:disabled{background:linear-gradient(135deg,#374151,#4b5563);color:rgba(255,255,255,.4);cursor:not-allowed;box-shadow:none;}
  .dh-bonus-btn{width:100%;padding:13px;border-radius:12px;border:none;font-family:'Rye',serif;font-size:.95rem;cursor:pointer;background:linear-gradient(135deg,#c84000,#ff6820,#ffaa44);color:#1a0800;box-shadow:0 4px 20px rgba(200,100,0,.4);transition:all .18s;}
  .dh-bonus-btn:disabled{background:linear-gradient(135deg,#374151,#4b5563);color:rgba(255,255,255,.4);cursor:not-allowed;box-shadow:none;}
  .dh-sec{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(100,180,50,.5);padding:2px 0;}
  .dh-sep{height:1px;background:rgba(80,160,30,.12);margin:2px 0;}
  .dh-stat{display:flex;justify-content:space-between;align-items:center;padding:4px 8px;background:rgba(6,14,4,.7);border-radius:7px;border:1px solid rgba(80,160,30,.08);}
  .dh-stat-l{font-size:.59rem;color:rgba(100,180,50,.5);font-weight:600;}
  .dh-stat-v{font-size:.7rem;font-weight:700;font-variant-numeric:tabular-nums;}
  .dh-bet-input{width:100%;background:rgba(6,14,4,.9);border:1px solid rgba(80,160,30,.25);border-radius:8px;padding:8px 28px 8px 24px;color:#88dd44;font-family:'Special Elite',serif;font-size:.9rem;font-weight:700;outline:none;text-align:center;}
  .dh-bet-row{display:grid;grid-template-columns:1fr 1fr;gap:4px;}
  .dh-bet-btn{padding:5px 2px;border-radius:6px;border:1px solid rgba(80,160,30,.18);background:rgba(80,160,30,.07);color:rgba(100,200,50,.75);font-family:var(--f);font-size:.62rem;font-weight:700;cursor:pointer;text-align:center;transition:all .12s;}
  .dh-bet-btn:hover{background:rgba(80,160,30,.18);color:#88dd44;}
  .dh-bet-btn:disabled{opacity:.25;cursor:not-allowed;}
  .dh-pay-row{display:flex;align-items:center;gap:6px;padding:3px 0;}
  .dh-pay-sym{width:26px;height:26px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:5px;background:rgba(10,20,6,.8);border:1px solid rgba(80,160,30,.2);overflow:hidden;}
  .dh-pay-name{font-size:.58rem;color:rgba(150,200,100,.65);flex:1;}
  .dh-pay-val{font-size:.6rem;font-weight:700;color:#88dd44;}
  /* Wheel modal */
  .dh-wheel-modal{position:absolute;inset:0;background:rgba(0,0,0,.88);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:50;backdrop-filter:blur(8px);}
  .dh-wheel-title{font-family:'Rye',serif;font-size:1.5rem;color:#ff8844;text-shadow:0 0 24px rgba(255,120,40,.6);letter-spacing:.08em;}
  .dh-wheel-subtitle{font-size:.8rem;color:rgba(255,180,100,.6);letter-spacing:.05em;}
  .dh-wheels{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;max-width:380px;}
  .dh-wheel{width:38px;height:38px;border-radius:50%;border:2px solid rgba(255,160,40,.5);background:linear-gradient(145deg,#3a1a00,#1a0800);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
  @keyframes dhWheelSpin{0%{transform:rotate(0deg)}100%{transform:rotate(720deg)}}
  .dh-wheel.spinning{animation:dhWheelSpin 1.8s cubic-bezier(.2,0,.4,1) both;}
  .dh-wheel-num{font-family:'Rye',serif;font-size:.95rem;color:#ffaa44;}
  .dh-wheel.done{border-color:rgba(255,200,80,.85);box-shadow:0 0 14px rgba(255,160,0,.5);}
  .dh-wheel-total{font-family:'Special Elite',serif;font-size:1.8rem;color:#ffcc44;text-shadow:0 0 20px rgba(255,200,0,.7);}
  .dh-wheel-total-lbl{font-size:.7rem;color:rgba(255,180,60,.6);text-transform:uppercase;letter-spacing:.1em;}
  /* Bonus end */
  .dh-bonus-end{position:absolute;inset:0;background:rgba(0,0,0,.85);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;z-index:50;}
  `;

  return(
    <div className="dh-game">
      <style>{CSS_DOGHOUSE + DH_CSS}</style>
      {showStats&&<StatsModal gameName="The Dog House" onClose={()=>setShowStats(false)} stats={dhStatsModal}/>}
      {bonusPhase==="wheel"&&wheels&&(
        <div className="dh-wheel-modal">
          <div className="dh-wheel-title">🐾 Free Spins!</div>
          <div className="dh-wheel-subtitle">Spinning 9 wheels…</div>
          <div className="dh-wheels">
            {wheels.map((v,i)=>(
              <div key={i} className={`dh-wheel${wheelPhase==="spinning"?" spinning":""}${wheelPhase==="done"?" done":""}`}
                style={{animationDelay:`${i*0.12}s`}}>
                <div className="dh-wheel-num">{wheelPhase==="done"?v:"?"}</div>
              </div>
            ))}
          </div>
          {wheelPhase==="done"&&(
            <>
              <div className="dh-wheel-total-lbl">Total Free Spins</div>
              <div className="dh-wheel-total">{wheels.reduce((a,b)=>a+b,0)}</div>
            </>
          )}
        </div>
      )}

      {/* Bonus End */}
      {bonusPhase==="end"&&(
        <div className="dh-bonus-end">
          <div style={{fontFamily:"'Rye',serif",fontSize:"1.5rem",color:"#ff8844",textShadow:"0 0 24px rgba(255,120,40,.6)"}}>Free Spins Over!</div>
          <div style={{fontFamily:"'Special Elite',serif",fontSize:"2.5rem",color:"#ffcc44",textShadow:"0 0 20px rgba(255,200,0,.7)"}}>+${bonusWin.toFixed(2)}</div>
          <div style={{fontSize:".75rem",color:"rgba(255,180,60,.6)"}}>{freeSpins} spins played</div>
          <button className="dh-bonus-btn" style={{maxWidth:200,marginTop:8}} onClick={endBonus}>▶ Continue</button>
        </div>
      )}

      {/* Top bar */}
      <div className="dh-topbar">
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <a onClick={()=>setPage("lobby")} style={{fontSize:".7rem",color:"rgba(100,180,50,.5)",cursor:"pointer"}}>Home</a>
          <span style={{color:"rgba(100,180,50,.3)",fontSize:".6rem"}}>›</span>
          <span style={{fontSize:".7rem",color:"rgba(100,180,50,.7)"}}>Casino</span>
          <span style={{color:"rgba(100,180,50,.3)",fontSize:".6rem"}}>›</span>
          <span style={{fontSize:".7rem",color:"rgba(100,200,60,.9)"}}>The Dog House</span>
        </div>
        <div className="dh-title">🐾 The Dog House</div>
        <div className="dh-hud-box" style={{minWidth:"auto"}}>
          <div className="dh-hud-lbl">Balance</div>
          <div className="dh-hud-val">${balance.toFixed(2)}</div>
        </div>
      </div>

      <div className="dh-main">
        {/* Controls */}
        <div className="dh-ctrl">
          <div className="dh-sec">Bet</div>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",fontSize:".7rem",color:"rgba(100,180,50,.5)",pointerEvents:"none"}}>$</span>
            <input className="dh-bet-input" type="number" min={.1} max={100} step={.1}
              value={bet} disabled={spinning||bonusPhase==="spins"}
              onChange={e=>setBet(Math.max(.1,Math.min(100,parseFloat(e.target.value)||1)))}/>
          </div>
          <div className="dh-bet-row">
            {["½","2×","5×","MAX"].map(v=>(
              <button key={v} className="dh-bet-btn" disabled={spinning||bonusPhase==="spins"} onClick={()=>{
                if(v==="½")setBet(b=>Math.max(.1,+(b/2).toFixed(2)));
                else if(v==="2×")setBet(b=>Math.min(100,+(b*2).toFixed(2)));
                else if(v==="5×")setBet(b=>Math.min(100,+(b*5).toFixed(2)));
                else setBet(Math.min(100,Math.floor(balance*10)/10));
              }}>{v}</button>
            ))}
          </div>
          <div className="dh-sep"/>
          {bonusPhase==="spins"?(
            <>
              <div style={{textAlign:"center",padding:"4px 0"}}>
                <div style={{fontSize:".62rem",color:"#ff8844",fontWeight:700}}>FREE SPINS</div>
                <div style={{fontFamily:"'Special Elite',serif",fontSize:"2rem",color:"#ffaa44",lineHeight:1}}>{freeSpinsLeft}</div>
                <div style={{fontSize:".56rem",color:"rgba(255,180,60,.5)"}}>spins left</div>
                <div style={{fontSize:".6rem",color:"rgba(100,220,60,.7)",marginTop:4}}>Won: ${bonusWin.toFixed(2)}</div>
              </div>
              <button className="dh-bonus-btn" disabled={spinning} onClick={()=>doBonusSpin(stickyWilds)}>
                {spinning?"⟳":"▶ SPIN"}
              </button>
            </>
          ):(
            <button className="dh-spin-btn" disabled={spinning||!!bonusPhase||bet>balance}
              onClick={()=>doSpin(false,null)}>
              {spinning?"⟳":"▶ SPIN"}
            </button>
          )}
          <div className="dh-sep"/>
          <div className="dh-sec">Session</div>
          <div className="dh-stat"><span className="dh-stat-l">Spins</span><span className="dh-stat-v" style={{color:"rgba(100,200,50,.85)"}}>{stats.spins}</span></div>
          <div className="dh-stat"><span className="dh-stat-l">Win Rate</span><span className="dh-stat-v" style={{color:"#44ff88"}}>{stats.spins?`${Math.round(stats.wins/stats.spins*100)}%`:"—"}</span></div>
          <div className="dh-stat"><span className="dh-stat-l">Biggest</span><span className="dh-stat-v" style={{color:"#88dd44"}}>{stats.biggest?`$${stats.biggest.toFixed(2)}`:"—"}</span></div>
          <div className="dh-stat"><span className="dh-stat-l">Total Won</span><span className="dh-stat-v" style={{color:"#44ff88"}}>${stats.totalWon.toFixed(2)}</span></div>
          <button className="sm-btn" onClick={()=>setShowStats(true)} style={{width:"100%",justifyContent:"center",background:"rgba(80,160,30,.07)",borderColor:"rgba(80,160,30,.18)",color:"rgba(120,200,60,.65)",fontFamily:"var(--f)",fontSize:".7rem",padding:"8px",borderRadius:10,border:"1px solid",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            📊 Stats & History
          </button>
          <div className="dh-sep"/>
          <div className="dh-sec">Paytable</div>
          {[["dog1","×200"],["dog2","×100"],["dog3","×80"],["collar","×50"],["bone","×40"],["A","×15"],["K","×12"]].map(([s,pay])=>(
            <div key={s} className="dh-pay-row">
              <div className="dh-pay-sym">{DH_SYMS[s]?.render()}</div>
              <span className="dh-pay-name">{DH_SYMS[s]?.name}</span>
              <span className="dh-pay-val">{pay}</span>
            </div>
          ))}
          <div style={{fontSize:".52rem",color:"rgba(100,180,50,.4)",padding:"4px 0",lineHeight:1.5}}>
            Wild on reels 2-4 · ×2 or ×3<br/>
            Scatter on reels 1,3,5<br/>
            3 Scatters = Free Spins
          </div>
        </div>

        {/* Main Arena */}
        <div className="dh-arena">
          <div className="dh-grid-wrap">
            <div className="dh-grid-bg"/>
            <div className="dh-grid">
              {Array.from({length:DH_ROWS},(_,r)=>Array.from({length:DH_REELS},(_,c)=>{
                const sym=grid[r][c];
                const mult=mults[r][c];
                const win=isWinCell(r,c);
                const sticky=isStickyWild(r,c);
                return(
                  <div key={`${r}-${c}-${spinKeys[r][c]}`}
                    className={`dh-cell${win?" win":""}${sticky?" sticky-wild":""}${spinning?" spinning":""}`}
                    style={{animationDelay:`${c*0.08}s`}}>
                    <div className="dh-sym">
                      {sym==="wild"?DH_SYMS.wild.render(mult||2):DH_SYMS[sym]?.render()}
                    </div>
                  </div>
                );
              }))}
            </div>
          </div>

          {/* HUD */}
          <div className="dh-hud">
            <div className="dh-hud-box">
              <div className="dh-hud-lbl">Bet</div>
              <div className="dh-hud-val">${bet.toFixed(2)}</div>
            </div>
            <div className="dh-hud-box">
              <div className="dh-hud-lbl">Last Win</div>
              <div className={`dh-hud-val${winAmt>0?" green":""}`}>{winAmt>0?`$${winAmt.toFixed(2)}`:"—"}</div>
            </div>
            <div className="dh-hud-box">
              <div className="dh-hud-lbl">Total Win</div>
              <div className={`dh-hud-val${totalWin>0?" green":""}`}>{totalWin>0?`$${totalWin.toFixed(2)}`:"$0.00"}</div>
            </div>
            <div className="dh-hud-box" style={{flex:1}}>
              <div className="dh-hud-lbl">Lines</div>
              <div className="dh-hud-val" style={{fontSize:".75rem"}}>20 Fixed</div>
            </div>
            {bonusPhase==="spins"?(
              <button className="dh-bonus-btn" style={{maxWidth:110,fontSize:".82rem",padding:"8px 12px",flexShrink:0}}
                disabled={spinning} onClick={()=>doBonusSpin(stickyWilds)}>
                {spinning?"⟳":"▶ SPIN"}
              </button>
            ):(
              <button className="dh-spin-btn" style={{maxWidth:110,fontSize:".82rem",padding:"8px 12px",flexShrink:0}}
                disabled={spinning||!!bonusPhase||bet>balance} onClick={()=>doSpin(false,null)}>
                {spinning?"⟳":"▶ SPIN"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



export { DogHouseGame };

