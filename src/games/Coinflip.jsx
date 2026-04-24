import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { StatsModal } from "../components/StatsModal.jsx";
import { CSS_COINFLIP } from "../shared/css_coinflip.js";
import { CSS_KENO } from "../shared/css_keno.js";
// ── Coinflip game ─────────────────────────────────────────────────────────────
/* ══════════════════════════════════════ COINFLIP ART ════════════════════════════════ */
function CoinflipArt(){
  return(
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
      <defs>
        <radialGradient id="cfBg" cx="42%" cy="38%" r="78%">
          <stop offset="0%" stopColor="#120828"/><stop offset="55%" stopColor="#080418"/><stop offset="100%" stopColor="#02010a"/>
        </radialGradient>
        <radialGradient id="cfAG" cx="32%" cy="26%" r="72%">
          <stop offset="0%" stopColor="#fff8c0"/><stop offset="22%" stopColor="#fde047"/><stop offset="52%" stopColor="#f5c400"/><stop offset="78%" stopColor="#b45e00"/><stop offset="100%" stopColor="#5c2d00"/>
        </radialGradient>
        <radialGradient id="cfAP" cx="32%" cy="26%" r="72%">
          <stop offset="0%" stopColor="#f0e8ff"/><stop offset="22%" stopColor="#c084fc"/><stop offset="52%" stopColor="#7c3aed"/><stop offset="78%" stopColor="#4c1d95"/><stop offset="100%" stopColor="#1a0840"/>
        </radialGradient>
        <radialGradient id="cfNeb1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(124,58,237,.45)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="cfNeb2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(245,196,0,.35)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <linearGradient id="cfRimG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,240,120,.7)"/><stop offset="50%" stopColor="rgba(245,196,0,.35)"/><stop offset="100%" stopColor="rgba(255,240,120,.7)"/>
        </linearGradient>
        <linearGradient id="cfRimP" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(210,160,255,.75)"/><stop offset="50%" stopColor="rgba(124,58,237,.35)"/><stop offset="100%" stopColor="rgba(210,160,255,.75)"/>
        </linearGradient>
        <radialGradient id="cfShineG" cx="30%" cy="25%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,240,.45)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="cfShineP" cx="30%" cy="25%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,.38)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <filter id="cfGlowF"><feGaussianBlur stdDeviation="7"/></filter>
        <filter id="cfGlowS"><feGaussianBlur stdDeviation="3.5"/></filter>
        <filter id="cfDropG"><feDropShadow dx="0" dy="5" stdDeviation="9" floodColor="rgba(180,120,0,.45)"/></filter>
        <filter id="cfDropP"><feDropShadow dx="0" dy="5" stdDeviation="9" floodColor="rgba(100,40,200,.45)"/></filter>
        <filter id="cfBlurL"><feGaussianBlur stdDeviation="12"/></filter>
      </defs>

      <rect width="240" height="320" fill="url(#cfBg)"/>

      {/* Nebula */}
      <ellipse cx="72" cy="130" rx="88" ry="70" fill="url(#cfNeb1)" filter="url(#cfBlurL)" opacity=".72"/>
      <ellipse cx="178" cy="155" rx="70" ry="55" fill="url(#cfNeb2)" filter="url(#cfBlurL)" opacity=".55"/>

      {/* Stars */}
      {[[14,18,1.3],[48,12,0.9],[95,8,1.5],[148,15,1.1],[188,9,1.4],[220,28,1.0],[232,70,1.3],[226,130,1.0],[222,200,1.4],[228,260,1.1],[16,80,1.2],[10,148,1.6],[18,218,1.0],[22,288,1.3],[56,298,0.9],[180,302,1.2],[116,296,1.5]].map(([x,y,r],i)=>(
        <circle key={i} cx={x} cy={y} r={r} fill={`rgba(${i%3===0?"220,200,255":i%3===1?"200,230,255":"255,255,255"},${.45+i%4*.12})`}/>
      ))}
      {[[36,46],[196,32],[210,122]].map(([x,y],i)=>(
        <g key={i}>
          <line x1={x} y1={y-5} x2={x} y2={y+5} stroke="rgba(200,180,255,.45)" strokeWidth=".9"/>
          <line x1={x-5} y1={y} x2={x+5} y2={y} stroke="rgba(200,180,255,.45)" strokeWidth=".9"/>
          <circle cx={x} cy={y} r="1.2" fill="rgba(220,200,255,.85)"/>
        </g>
      ))}

      {/* Purple coin — tails, behind, tilted */}
      <g transform="translate(158,148) rotate(-15)">
        <circle cx="0" cy="0" r="52" fill="url(#cfNeb1)" filter="url(#cfBlurL)"/>
        <circle cx="0" cy="0" r="42" fill="url(#cfAP)" filter="url(#cfDropP)"/>
        <circle cx="0" cy="0" r="42" fill="none" stroke="url(#cfRimP)" strokeWidth="3"/>
        <circle cx="0" cy="0" r="36" fill="none" stroke="rgba(192,132,252,.2)" strokeWidth="1"/>
        <polygon points="0,-22 18,0 0,22 -18,0" fill="none" stroke="rgba(0,212,255,.65)" strokeWidth="2.2"/>
        <polygon points="0,-14 12,0 0,14 -12,0" fill="rgba(167,139,250,.18)" stroke="rgba(192,132,252,.5)" strokeWidth="1.5"/>
        <circle cx="0" cy="0" r="7" fill="rgba(0,212,255,.8)" stroke="rgba(255,255,255,.5)" strokeWidth="1.5"/>
        <circle cx="0" cy="0" r="3.5" fill="rgba(255,255,255,.95)"/>
        {[[0,-32],[32,0],[0,32],[-32,0]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.8" fill="rgba(192,132,252,.6)" stroke="rgba(255,255,255,.2)" strokeWidth=".8"/>
        ))}
        <circle cx="0" cy="0" r="42" fill="url(#cfShineP)"/>
      </g>

      {/* Gold coin — heads, front, dominant */}
      <g transform="translate(88,158)">
        <circle cx="0" cy="0" r="62" fill="url(#cfNeb2)" filter="url(#cfBlurL)"/>
        <circle cx="0" cy="0" r="44" fill="rgba(245,196,0,.22)" filter="url(#cfGlowS)"/>
        <circle cx="0" cy="0" r="52" fill="url(#cfAG)" filter="url(#cfDropG)"/>
        <circle cx="0" cy="0" r="52" fill="none" stroke="url(#cfRimG)" strokeWidth="3.5"/>
        <circle cx="0" cy="0" r="45" fill="none" stroke="rgba(255,220,60,.2)" strokeWidth="1.2"/>
        <g>
          <rect x="-20" y="8" width="40" height="6" rx="2" fill="rgba(100,55,0,.7)" stroke="rgba(255,200,50,.35)" strokeWidth="1"/>
          <path d="M-18,8 L-18,-8 L-8,-2 L0,-14 L8,-2 L18,-8 L18,8 Z" fill="rgba(100,55,0,.75)" stroke="rgba(255,210,60,.45)" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M-18,8 L-18,-8 L-8,-2 L0,-14 L8,-2 L18,-8 L18,8" fill="none" stroke="rgba(255,245,120,.55)" strokeWidth="1.5" strokeLinejoin="round"/>
          <circle cx="0" cy="-10" r="4" fill="rgba(239,68,68,.9)" stroke="rgba(255,200,200,.5)" strokeWidth="1"/>
          <circle cx="-14" cy="-5" r="3" fill="rgba(59,130,246,.9)" stroke="rgba(200,230,255,.5)" strokeWidth="1"/>
          <circle cx="14" cy="-5" r="3" fill="rgba(124,58,237,.9)" stroke="rgba(210,180,255,.5)" strokeWidth="1"/>
        </g>
        <ellipse cx="-16" cy="-18" rx="18" ry="11" fill="rgba(255,255,255,.22)" transform="rotate(-22 -16 -18)"/>
        <circle cx="-22" cy="-22" r="5.5" fill="rgba(255,255,255,.16)"/>
        <circle cx="0" cy="0" r="52" fill="url(#cfShineG)"/>
        <circle cx="0" cy="0" r="50" fill="none" stroke="rgba(255,255,200,.1)" strokeWidth="1.5"/>
      </g>

      {/* VS badge */}
      <rect x="114" y="150" width="26" height="16" rx="5" fill="rgba(5,3,14,.92)" stroke="rgba(167,139,250,.3)" strokeWidth="1"/>
      <text x="127" y="162" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="rgba(167,139,250,.85)" fontFamily="'Space Grotesk',sans-serif" letterSpacing="1.5">VS</text>

      {/* Bottom card */}
      <rect x="18" y="258" width="204" height="50" rx="14" fill="rgba(124,58,237,.15)" filter="url(#cfGlowS)"/>
      <rect x="18" y="258" width="204" height="50" rx="14" fill="rgba(8,4,20,.88)" stroke="rgba(167,139,250,.22)" strokeWidth="1.2"/>
      <line x1="32" y1="259" x2="210" y2="259" stroke="rgba(192,132,252,.18)" strokeWidth="1"/>
      <rect x="28" y="266" width="52" height="14" rx="4" fill="rgba(220,38,38,.75)"/>
      <text x="54" y="276.5" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontFamily="'Space Grotesk',sans-serif" letterSpacing="1">ORIGINALS</text>
      <text x="28" y="298" fontFamily="'Space Grotesk',sans-serif" fontSize="17" fontWeight="900" fill="#f0eeff" letterSpacing="-.3">Coinflip</text>
      <rect x="154" y="268" width="56" height="22" rx="6" fill="rgba(245,196,0,.1)" stroke="rgba(245,196,0,.35)" strokeWidth="1"/>
      <text x="182" y="283.5" textAnchor="middle" fontSize="11" fontWeight="900" fill="rgba(245,196,0,.95)" fontFamily="'Space Grotesk',sans-serif">1.9× /hit</text>

      {[[200,248,1.8],[22,252,1.4],[210,278,1.2],[32,285,1.0]].map(([x,y,r],i)=>(
        <g key={i}>
          <line x1={x} y1={y-r*3} x2={x} y2={y+r*3} stroke={i%2===0?"rgba(245,196,0,.5)":"rgba(192,132,252,.5)"} strokeWidth=".9"/>
          <line x1={x-r*3} y1={y} x2={x+r*3} y2={y} stroke={i%2===0?"rgba(245,196,0,.5)":"rgba(192,132,252,.5)"} strokeWidth=".9"/>
          <circle cx={x} cy={y} r={r} fill={i%2===0?"rgba(245,196,0,.8)":"rgba(192,132,252,.8)"}/>
        </g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════ COINFLIP GAME ════════════════════════════════ */
// Beautiful SVG coin faces matching site theme
function CoinHeads(){
  return(
    <svg viewBox="0 0 168 168" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",borderRadius:"50%"}}>
      <defs>
        <radialGradient id="hG" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#fff8c8"/><stop offset="25%" stopColor="#fde047"/><stop offset="55%" stopColor="#f5c400"/><stop offset="80%" stopColor="#ca8a04"/><stop offset="100%" stopColor="#78450a"/>
        </radialGradient>
        <radialGradient id="hRim" cx="50%" cy="50%" r="50%">
          <stop offset="78%" stopColor="transparent"/><stop offset="100%" stopColor="rgba(180,120,0,.5)"/>
        </radialGradient>
        <radialGradient id="hShine" cx="32%" cy="25%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,240,.5)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <filter id="hGlow"><feGaussianBlur stdDeviation="3.5"/></filter>
        <filter id="hSh"><feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="rgba(0,0,0,.8)"/></filter>
      </defs>
      {/* Base */}
      <circle cx="84" cy="84" r="84" fill="url(#hG)"/>
      {/* Rim */}
      <circle cx="84" cy="84" r="84" fill="url(#hRim)"/>
      <circle cx="84" cy="84" r="84" fill="none" stroke="rgba(255,220,60,.55)" strokeWidth="3.5"/>
      {/* Inner ring */}
      <circle cx="84" cy="84" r="72" fill="none" stroke="rgba(255,200,30,.25)" strokeWidth="1.2"/>
      {/* Crown / "V" vault symbol — matching site logo */}
      <g filter="url(#hSh)">
        {/* Crown base */}
        <path d="M50 102 L62 62 L84 88 L106 62 L118 102 Z" fill="rgba(120,70,0,.85)" stroke="rgba(180,130,10,.4)" strokeWidth="1.5" strokeLinejoin="round"/>
        {/* Crown highlights */}
        <path d="M50 102 L62 62 L84 88 L106 62 L118 102" fill="none" stroke="rgba(255,240,100,.55)" strokeWidth="2" strokeLinejoin="round"/>
        {/* Crown jewels */}
        <circle cx="84" cy="74" r="5.5" fill="rgba(255,80,80,.9)" stroke="rgba(255,200,200,.5)" strokeWidth="1"/>
        <circle cx="62" cy="62" r="4" fill="rgba(80,180,255,.9)" stroke="rgba(200,240,255,.5)" strokeWidth="1"/>
        <circle cx="106" cy="62" r="4" fill="rgba(180,80,255,.9)" stroke="rgba(220,200,255,.5)" strokeWidth="1"/>
      </g>
      {/* Shine overlay */}
      <ellipse cx="68" cy="58" rx="22" ry="13" fill="rgba(255,255,255,.22)" transform="rotate(-22 68 58)"/>
      <circle cx="56" cy="52" r="7" fill="rgba(255,255,255,.16)"/>
      <circle cx="84" cy="84" r="84" fill="url(#hShine)"/>
      {/* Edge bevel */}
      <circle cx="84" cy="84" r="82" fill="none" stroke="rgba(255,255,200,.12)" strokeWidth="1.5"/>
    </svg>
  );
}
function CoinTails(){
  return(
    <svg viewBox="0 0 168 168" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",borderRadius:"50%"}}>
      <defs>
        <radialGradient id="tG" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#e8d8ff"/><stop offset="20%" stopColor="#c084fc"/><stop offset="50%" stopColor="#7c3aed"/><stop offset="78%" stopColor="#4c1d95"/><stop offset="100%" stopColor="#1a0840"/>
        </radialGradient>
        <radialGradient id="tRim" cx="50%" cy="50%" r="50%">
          <stop offset="78%" stopColor="transparent"/><stop offset="100%" stopColor="rgba(80,30,150,.6)"/>
        </radialGradient>
        <radialGradient id="tShine" cx="32%" cy="25%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,.38)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="tOrb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,212,255,.7)"/><stop offset="55%" stopColor="rgba(0,180,220,.35)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <filter id="tGlow"><feGaussianBlur stdDeviation="4"/></filter>
        <filter id="tSh"><feDropShadow dx="0" dy="3" stdDeviation="7" floodColor="rgba(0,0,0,.9)"/></filter>
      </defs>
      {/* Base */}
      <circle cx="84" cy="84" r="84" fill="url(#tG)"/>
      <circle cx="84" cy="84" r="84" fill="url(#tRim)"/>
      <circle cx="84" cy="84" r="84" fill="none" stroke="rgba(167,139,250,.55)" strokeWidth="3.5"/>
      {/* Inner ring */}
      <circle cx="84" cy="84" r="72" fill="none" stroke="rgba(167,139,250,.22)" strokeWidth="1.2"/>
      {/* Star / Diamond pattern */}
      <g filter="url(#tSh)">
        {/* Outer star points */}
        {[0,45,90,135,180,225,270,315].map((deg,i)=>{
          const r1=36, r2=22;
          const a1=(deg-90)*Math.PI/180, a2=(deg-90+22.5)*Math.PI/180;
          const x1=84+r1*Math.cos(a1), y1=84+r1*Math.sin(a1);
          const x2=84+r2*Math.cos(a2), y2=84+r2*Math.sin(a2);
          return <line key={i} x1="84" y1="84" x2={x1} y2={y1} stroke="rgba(200,160,255,.55)" strokeWidth="1.8"/>;
        })}
        {/* Diamond center */}
        <polygon points="84,50 110,84 84,118 58,84" fill="rgba(0,212,255,.12)" stroke="rgba(0,212,255,.6)" strokeWidth="1.8"/>
        <polygon points="84,58 104,84 84,110 64,84" fill="rgba(167,139,250,.15)" stroke="rgba(192,132,252,.55)" strokeWidth="1.5"/>
        {/* Center gem */}
        <circle cx="84" cy="84" r="14" fill="url(#tOrb)" filter="url(#tGlow)"/>
        <circle cx="84" cy="84" r="9" fill="rgba(0,212,255,.8)" stroke="rgba(255,255,255,.5)" strokeWidth="1.5"/>
        <circle cx="84" cy="84" r="5" fill="rgba(255,255,255,.9)"/>
        <circle cx="80" cy="80" r="2.5" fill="rgba(255,255,255,.8)"/>
      </g>
      {/* Corner dots */}
      {[[42,42],[126,42],[42,126],[126,126]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3.5" fill="rgba(192,132,252,.6)" stroke="rgba(255,255,255,.2)" strokeWidth="1"/>
      ))}
      {/* Shine */}
      <ellipse cx="64" cy="55" rx="22" ry="12" fill="rgba(255,255,255,.18)" transform="rotate(-22 64 55)"/>
      <circle cx="54" cy="50" r="7" fill="rgba(255,255,255,.13)"/>
      <circle cx="84" cy="84" r="84" fill="url(#tShine)"/>
      <circle cx="84" cy="84" r="82" fill="none" stroke="rgba(200,180,255,.12)" strokeWidth="1.5"/>
    </svg>
  );
}

function CoinflipGame({balance,setBalance,setPage}){
  const [bet,setBet]=useState(10);
  const [phase,setPhase]=useState("idle");
  const [streak,setStreak]=useState(0);
  const [result,setResult]=useState(null);
  const [flash,setFlash]=useState(null);
  const [toast,setToast]=useState(null);
  const [bounceClass,setBounceClass]=useState("idle");
  const [hist,setHist]=useState([]);
  const [showStats,setShowStats]=useState(false);
  const [cfStats,setCfStats]=useState({profit:0,wagered:0,wins:0,losses:0,history:[0]});
  const coinInnerRef=useRef(null); // direct DOM ref for rotation
  const totalRotRef=useRef(0);    // accumulated rotation (not state — no re-render needed)

  const mult=streak===0?1:parseFloat(Math.pow(1.9,streak).toFixed(2));
  const profitIfCashout=+(bet*(mult-1)).toFixed(2);

  const flip=useCallback(async(side)=>{
    if(phase!=="idle"&&phase!=="won")return;
    if(phase==="idle"){
      setBalance(b=>+(b-bet).toFixed(2));
      setCfStats(s=>({...s,wagered:+(s.wagered+bet).toFixed(2)}));
    }
    setPhase("flipping");
    setBounceClass(""); // stop idle bounce

    // Decide outcome NOW before animation
    const outcome=Math.random()<0.5?"heads":"tails";
    const won=outcome===side;

    // Calculate exact rotation that lands on correct face
    // heads = 0° face, tails = 180° face
    const faceAngle = outcome==="heads" ? 0 : 180;
    const currentMod = ((totalRotRef.current % 360) + 360) % 360;
    const spins = 6 * 360; // 6 full spins for dramatic ease-in
    let delta = spins + faceAngle - currentMod;
    // Ensure we always spin forward at least 5 full rotations
    while(delta < 5*360) delta += 360;
    totalRotRef.current += delta;

    // Apply directly via DOM ref — bypasses React batching issues entirely
    if(coinInnerRef.current){
      coinInnerRef.current.style.transition = "transform 1.85s cubic-bezier(0.08,0,0.18,1)";
      coinInnerRef.current.style.transform = `rotateY(${totalRotRef.current}deg)`;
    }

    sfx.flip();
    await new Promise(r=>setTimeout(r,1900));

    setResult(outcome);
    setBounceClass("landing");
    setTimeout(()=>setBounceClass("idle"),550);

    if(won){
      sfx.gem(streak+1);
      setStreak(s=>s+1);
      setHist(h=>[{side,outcome,won:true},...h.slice(0,19)]);
      setFlash("g");
      setPhase("won");
    } else {
      sfx.lose();
      setStreak(0);
      setHist(h=>[{side,outcome,won:false},...h.slice(0,19)]);
      setFlash("r");
      setPhase("lost");
      setCfStats(s=>({...s,profit:+(s.profit-bet).toFixed(2),losses:s.losses+1,history:[...s.history,+(s.profit-bet).toFixed(2)]}));
    }
    setTimeout(()=>setFlash(null),500);
  },[phase,bet,balance,streak,setBalance]);

  const cashout=useCallback(()=>{
    if(phase!=="won")return;
    sfx.cash();
    const gain=+(bet*mult).toFixed(2);
    setBalance(b=>+(b+gain).toFixed(2));
    setToast(`+$${gain.toFixed(2)}`);
    setCfStats(s=>({...s,profit:+(s.profit+(gain-bet)).toFixed(2),wins:s.wins+1,history:[...s.history,+(s.profit+(gain-bet)).toFixed(2)]}));
    setPhase("cashed");
    setFlash("g");
    setTimeout(()=>setFlash(null),500);
    setTimeout(()=>setToast(null),2200);
  },[phase,bet,mult,setBalance]);

  const reset=useCallback(()=>{
    setPhase("idle");
    setStreak(0);
    setResult(null);
    setBounceClass("idle");
  },[]);

  const isHeadsUp = result==="heads" || (!result && true);
  const glowColor = result==="heads" ? "cf-glow-h" : result==="tails" ? "cf-glow-s" : "cf-glow-h";

  return(
    <div className="gamepage"><style>{CSS_COINFLIP + CSS_KENO}</style>
      {flash==="r"&&<div className="fl-r"/>}
      {flash==="g"&&<div className="fl-g"/>}
      {toast&&<div className="cashpop">{toast}</div>}
      <div className="bc">
        <a onClick={()=>setPage("lobby")}>Home</a><span style={{opacity:.35}}>›</span>
        <a onClick={()=>setPage("casino")}>Casino</a><span style={{opacity:.35}}>›</span>
        <span style={{color:"var(--tx2)",fontWeight:500}}>Coinflip</span>
      </div>
      <div className="gamebody">
        {/* LEFT PANEL */}
        <div className="lp">
          <div className="fld">
            <div className="flbl">Bet Amount <span>${balance.toFixed(2)}</span></div>
            <div className="fi-w">
              <span className="fi-pre">◈</span>
              <input className="fi" type="number" min={.1} step={.5} value={bet}
                onChange={e=>phase==="idle"&&setBet(Math.max(.1,+e.target.value))} disabled={phase!=="idle"}/>
              <span className="fi-suf">USD</span>
            </div>
            <div className="qb">
              {["½","2×","5×","MAX"].map(v=>(
                <button key={v} className="qbtn" disabled={phase!=="idle"} onClick={()=>{
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
          <div className="sr"><span className="sl">Streak</span><span className="sv" style={{color:"var(--nG)"}}>{streak} win{streak!==1?"s":""}</span></div>
          <div className="sr"><span className="sl">Current mult</span><span className="sv" style={{color:"var(--puLL)"}}>{mult}×</span></div>
          <div className="sr"><span className="sl">Next mult</span><span className="sv" style={{color:"var(--tx2)"}}>{parseFloat((mult*1.9).toFixed(2))}×</span></div>
          {streak>0&&<div className="sr"><span className="sl">Profit if cashout</span><span className="sv" style={{color:"var(--nG)"}}>+${profitIfCashout.toFixed(2)}</span></div>}
          <div className="sep"/>
          <div className="pb-box">
            <div className="pb-top"><span>Multiplier chain</span><b>{mult}×</b></div>
            <div className="pb-t"><div className="pb-f" style={{width:`${Math.min(100,streak/10*100)}%`}}/></div>
          </div>
          <div className="sep"/>
          {hist.length>0&&(
            <>
              <div className="flbl">Recent Flips</div>
              <div className="khist">
                {hist.slice(0,12).map((h,i)=>(
                  <div key={i} className={`kh-dot ${h.won?"kh-w":"kh-l"}`}
                    title={`${h.side==="heads"?"H":"T"} chose, ${h.outcome} landed — ${h.won?"Win":"Lose"}`}
                    style={{fontSize:".55rem",fontWeight:800}}>
                    {h.outcome==="heads"?"H":"T"}
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="sep"/>
          <button className="sm-btn" onClick={()=>setShowStats(true)} style={{marginTop:6,width:"100%",justifyContent:"center"}}>
            📊 Stats & History
          </button>
        </div>
        {showStats&&<StatsModal gameName="Coinflip" onClose={()=>setShowStats(false)} stats={cfStats}/>}

        {/* GAME AREA */}
        <div className="garea" style={{alignItems:"stretch",padding:"12px 16px"}}>
          <div className="keno-layout" style={{maxWidth:440,margin:"0 auto",width:"100%"}}>

            {/* SCROLLABLE — streak display + coin + result banner + history */}
            <div className="keno-scroll" style={{alignItems:"center"}}>

              {/* Streak / multiplier display */}
              <div className="cf-streak-display">
                <div className={`cf-streak-num ${streak>0?(result==="heads"?"streak-h":"streak-s"):"streak-0"}`}>
                  {streak===0?"—":`${mult}×`}
                </div>
                <div className={`cf-mult-badge ${streak===0?"cf-mult-0":result==="heads"?"cf-mult-h":"cf-mult-s"}`}>
                  {streak===0?"Choose heads or tails"
                    :phase==="won"?`${streak} in a row — continue for ${parseFloat((mult*1.9).toFixed(2))}×`
                    :`${streak} streak`}
                </div>
              </div>

              {/* Coin */}
              <div className="cf-coin-wrap">
                {streak>0&&(
                  <svg className="cf-orbit-ring" viewBox="0 0 220 220">
                    <circle cx="110" cy="110" r="102" fill="none"
                      stroke={result==="heads"?"rgba(245,196,0,.14)":"rgba(124,58,237,.16)"}
                      strokeWidth="1.5" strokeDasharray="8 10"/>
                    {[0,72,144,216,288].map((deg,i)=>{
                      const a=deg*Math.PI/180;
                      return <circle key={i} cx={110+102*Math.cos(a)} cy={110+102*Math.sin(a)}
                        r="3" fill={result==="heads"?"rgba(245,196,0,.55)":"rgba(167,139,250,.6)"}/>;
                    })}
                  </svg>
                )}
                <div className={`cf-glow ${glowColor}`}
                  style={{opacity:phase==="flipping"?0:streak>0?Math.min(0.95,streak*.18+.35):result?0.2:0}}/>
                <div className="cf-coin">
                  <div className={`cf-coin-bounce${bounceClass?" "+bounceClass:""}`}>
                    <div ref={coinInnerRef} className="cf-coin-inner">
                      <div className="cf-face cf-face-h"><CoinHeads/></div>
                      <div className="cf-face cf-face-t"><CoinTails/></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result banner */}
              {(phase==="won"||phase==="lost"||phase==="cashed")&&(
                <div className={`cf-result-banner ${phase==="lost"?"cf-banner-lose":"cf-banner-win"}`} style={{width:"100%"}}>
                  <div className="cf-banner-title">
                    {phase==="lost"
                      ?`❌ ${result==="heads"?"Heads":"Tails"} landed — wrong side`
                      :phase==="cashed"?"✅ Cashed out!"
                      :`✅ ${result==="heads"?"Heads":"Tails"}! Streak: ${streak}`}
                  </div>
                  <div className="cf-banner-val">
                    {phase==="lost"?`-$${bet.toFixed(2)}`
                      :phase==="cashed"?`+$${profitIfCashout.toFixed(2)}`
                      :`Cashout $${(bet*mult).toFixed(2)} or risk it`}
                  </div>
                </div>
              )}

              {/* History dots */}
              {hist.length>0&&(
                <div className="cf-hist-row">
                  {hist.slice(0,10).map((h,i)=>(
                    <div key={i} className="cf-hist-dot"
                      style={{
                        background:h.won?"rgba(0,255,136,.12)":"rgba(239,68,68,.12)",
                        border:`1px solid ${h.won?"rgba(0,255,136,.35)":"rgba(239,68,68,.35)"}`,
                        color:h.won?"var(--nG)":"var(--rd)"
                      }}>
                      {h.outcome==="heads"?"H":"T"}
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* FIXED FOOTER — buttons always visible */}
            <div className="keno-footer">

              {/* Cashout while on streak */}
              {phase==="won"&&streak>0&&(
                <button className="cf-cashout-btn" style={{maxWidth:"100%"}} onClick={cashout}>
                  💰 Cashout — ${(bet*mult).toFixed(2)}
                </button>
              )}

              {/* Flip choice buttons */}
              {(phase==="idle"||phase==="won")&&(
                <div className="cf-choice-row" style={{maxWidth:"100%"}}>
                  <button className="cf-choice-btn heads" onClick={()=>flip("heads")}
                    disabled={phase==="flipping"||bet<=0||bet>balance}>
                    <svg width="34" height="34" viewBox="0 0 168 168" style={{borderRadius:"50%"}}><defs><radialGradient id="btnH" cx="38%" cy="30%" r="72%"><stop offset="0%" stopColor="#fff8c8"/><stop offset="40%" stopColor="#f5c400"/><stop offset="100%" stopColor="#78450a"/></radialGradient></defs><circle cx="84" cy="84" r="84" fill="url(#btnH)"/><circle cx="84" cy="84" r="84" fill="none" stroke="rgba(255,220,60,.5)" strokeWidth="4"/><text x="84" y="98" textAnchor="middle" fontSize="48" fontWeight="900" fill="rgba(120,70,0,.85)" fontFamily="serif">H</text><ellipse cx="64" cy="56" rx="18" ry="10" fill="rgba(255,255,255,.2)" transform="rotate(-22 64 56)"/></svg>
                    <span className="cf-choice-lbl">HEADS</span>
                    <span className="cf-choice-odds">50% · 1.9× per hit</span>
                  </button>
                  <button className="cf-choice-btn tails" onClick={()=>flip("tails")}
                    disabled={phase==="flipping"||bet<=0||bet>balance}>
                    <svg width="34" height="34" viewBox="0 0 168 168" style={{borderRadius:"50%"}}><defs><radialGradient id="btnT" cx="38%" cy="30%" r="72%"><stop offset="0%" stopColor="#e8d8ff"/><stop offset="40%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#1a0840"/></radialGradient></defs><circle cx="84" cy="84" r="84" fill="url(#btnT)"/><circle cx="84" cy="84" r="84" fill="none" stroke="rgba(167,139,250,.5)" strokeWidth="4"/><polygon points="84,48 112,84 84,120 56,84" fill="none" stroke="rgba(0,212,255,.8)" strokeWidth="3"/><circle cx="84" cy="84" r="10" fill="rgba(0,212,255,.9)"/><circle cx="84" cy="84" r="5" fill="rgba(255,255,255,.95)"/><ellipse cx="64" cy="56" rx="18" ry="10" fill="rgba(255,255,255,.18)" transform="rotate(-22 64 56)"/></svg>
                    <span className="cf-choice-lbl">TAILS</span>
                    <span className="cf-choice-odds">50% · 1.9× per hit</span>
                  </button>
                </div>
              )}

              {/* Flipping */}
              {phase==="flipping"&&(
                <button className="cta go" style={{width:"100%"}} disabled>🪙 Flipping…</button>
              )}

              {/* Game over / cashed */}
              {(phase==="lost"||phase==="cashed")&&(
                <button className="cta replay" style={{width:"100%"}} onClick={reset}>↺ New Game</button>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export { CoinflipGame, CoinflipArt };
