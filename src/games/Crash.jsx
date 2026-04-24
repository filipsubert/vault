import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { StatsModal } from "../components/StatsModal.jsx";
import { CSS_CRASH } from "../shared/css_crash.js";
// ── Crash game ────────────────────────────────────────────────────────────────
/* ══════════════════════════════════════ CRASH ART ════════════════════════════════ */
function CrashArt(){
  return(
    <svg viewBox="0 0 240 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
      <defs>
        <radialGradient id="crBg" cx="38%" cy="32%" r="82%">
          <stop offset="0%" stopColor="#0c0425"/><stop offset="52%" stopColor="#060216"/><stop offset="100%" stopColor="#010008"/>
        </radialGradient>
        <radialGradient id="crNeb1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(124,58,237,.28)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="crNeb2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,212,255,.16)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <linearGradient id="crLine" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00ff88"/><stop offset="55%" stopColor="#00e5d4"/><stop offset="100%" stopColor="#00d4ff"/>
        </linearGradient>
        <linearGradient id="crFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,255,136,.25)"/><stop offset="55%" stopColor="rgba(0,212,255,.1)"/><stop offset="100%" stopColor="rgba(0,255,136,.01)"/>
        </linearGradient>
        <linearGradient id="crRocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ecdeff"/><stop offset="38%" stopColor="#c084fc"/><stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
        <linearGradient id="crRocketFin" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9d4edd"/><stop offset="100%" stopColor="#5b21b6"/>
        </linearGradient>
        <linearGradient id="crFlame1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff8d0"/><stop offset="28%" stopColor="#ffcc00"/><stop offset="62%" stopColor="#ff6600"/><stop offset="100%" stopColor="rgba(255,50,0,0)"/>
        </linearGradient>
        <linearGradient id="crFlame2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,200,0,.7)"/><stop offset="100%" stopColor="rgba(255,80,0,0)"/>
        </linearGradient>
        <radialGradient id="crFlameGlow" cx="50%" cy="15%" r="65%">
          <stop offset="0%" stopColor="rgba(255,160,0,.65)"/><stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <filter id="crGS"><feGaussianBlur stdDeviation="3"/></filter>
        <filter id="crGM"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="crGL"><feGaussianBlur stdDeviation="12"/></filter>
        <filter id="crSh"><feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,.9)"/></filter>
        <filter id="crFl"><feGaussianBlur stdDeviation="2.2"/></filter>
        <radialGradient id="crPlanet" cx="32%" cy="28%" r="72%">
          <stop offset="0%"   stopColor="#2e1a6e"/>
          <stop offset="35%"  stopColor="#1e3a8a"/>
          <stop offset="70%"  stopColor="#1e40af"/>
          <stop offset="100%" stopColor="#0f172a"/>
        </radialGradient>
        <radialGradient id="crPlanetShine" cx="28%" cy="22%" r="55%">
          <stop offset="0%"   stopColor="rgba(147,197,253,.35)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="crPlanetAtm" cx="50%" cy="50%" r="50%">
          <stop offset="72%"  stopColor="transparent"/>
          <stop offset="100%" stopColor="rgba(96,165,250,.22)"/>
        </radialGradient>
        <linearGradient id="crRingG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(147,197,253,0)"/>
          <stop offset="20%"  stopColor="rgba(147,197,253,.55)"/>
          <stop offset="45%"  stopColor="rgba(96,165,250,.85)"/>
          <stop offset="55%"  stopColor="rgba(186,230,253,.9)"/>
          <stop offset="80%"  stopColor="rgba(147,197,253,.55)"/>
          <stop offset="100%" stopColor="rgba(147,197,253,0)"/>
        </linearGradient>
        <filter id="crPlanetGlow"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>

      <rect width="240" height="320" fill="url(#crBg)"/>
      <ellipse cx="80"  cy="90"  rx="100" ry="75" fill="url(#crNeb1)" filter="url(#crGL)"/>
      <ellipse cx="185" cy="175" rx="70"  ry="58" fill="url(#crNeb2)" filter="url(#crGM)"/>

      {[
        [18,22,1.6],[48,14,1.0],[90,7,1.9],[138,16,1.2],[178,11,1.6],[214,24,1.0],
        [230,56,1.5],[222,95,1.1],[218,142,1.4],[226,192,1.0],[220,238,1.3],
        [10,68,1.2],[7,120,1.8],[13,178,1.2],[18,232,1.0],[9,282,1.5],
        [52,40,1.0],[162,36,1.3],[200,52,1.0],[58,295,1.1],[152,298,1.4],
        [105,28,2.2],[195,80,1.7],[28,136,1.3],[78,188,1.0],[165,68,1.0],
      ].map(([x,y,rv],i)=>(
        <circle key={i} cx={x} cy={y} r={rv}
          fill={`rgba(${i%3===0?"220,210,255":i%3===1?"180,230,255":"255,255,255"},${.5+i%4*.12})`}/>
      ))}
      {[[38,50,0],[192,30,1],[214,112,0]].map(([x,y,v],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r={1.5+v*.3} fill="rgba(255,255,255,.92)"/>
          <line x1={x} y1={y-6-v} x2={x} y2={y+6+v} stroke="rgba(255,255,255,.3)" strokeWidth=".8"/>
          <line x1={x-6-v} y1={y} x2={x+6+v} y2={y} stroke="rgba(255,255,255,.3)" strokeWidth=".8"/>
        </g>
      ))}

      {/* ── PLANET (upper-left center, enlarged, tilted 40°) ── */}
      <g transform="rotate(40 90 82)">
        {/* Outer atmospheric glow */}
        <circle cx="90" cy="82" r="51" fill="rgba(59,130,246,.12)" filter="url(#crPlanetGlow)"/>
        {/* Ring back half */}
        <ellipse cx="90" cy="82" rx="69" ry="15" fill="none"
          stroke="rgba(96,165,250,.28)" strokeWidth="5.5"/>
        <ellipse cx="90" cy="82" rx="69" ry="15" fill="none"
          stroke="rgba(147,197,253,.18)" strokeWidth="10"
          filter="url(#crGS)"/>
        {/* Planet body */}
        <circle cx="90" cy="82" r="36" fill="url(#crPlanet)" filter="url(#crSh)"/>
        {/* Atmospheric rim */}
        <circle cx="90" cy="82" r="36" fill="url(#crPlanetAtm)"/>
        {/* Surface band details */}
        <path d="M52 71 Q75 65 94 71 Q109 75 103 80" stroke="rgba(255,255,255,.07)" strokeWidth="2" fill="none"/>
        <path d="M54 84 Q73 90 94 87 Q106 83 100 92" stroke="rgba(255,255,255,.05)" strokeWidth="1.6" fill="none"/>
        {/* Shine */}
        <ellipse cx="70" cy="64" rx="12" ry="8" fill="rgba(255,255,255,.13)" transform="rotate(-22 70 64)"/>
        <circle cx="64" cy="61" r="4.2" fill="rgba(255,255,255,.1)"/>
        {/* Planet shine overlay */}
        <circle cx="90" cy="82" r="36" fill="url(#crPlanetShine)"/>
        {/* Ring front half — lower arc */}
        <ellipse cx="90" cy="82" rx="69" ry="15" fill="none"
          stroke="url(#crRingG)" strokeWidth="5"
          strokeDasharray="222 222" strokeDashoffset="111"/>
        <ellipse cx="90" cy="82" rx="69" ry="15" fill="none"
          stroke="rgba(186,230,253,.35)" strokeWidth="2.2"
          strokeDasharray="222 222" strokeDashoffset="111"/>
      </g>

      {/* CHART — fills more of the card */}
      {[0,1,2,3,4].map(i=>(<line key={i} x1="22" y1={248-i*44} x2="222" y2={248-i*44} stroke="rgba(255,255,255,.038)" strokeWidth="1"/>))}
      {[1,2,3,4].map(i=>(<line key={i} x1={22+i*40} y1="72" x2={22+i*40} y2="248" stroke="rgba(255,255,255,.038)" strokeWidth="1"/>))}
      <line x1="22" y1="248" x2="222" y2="248" stroke="rgba(255,255,255,.18)" strokeWidth="1.5"/>
      <line x1="22" y1="72"  x2="22"  y2="248" stroke="rgba(255,255,255,.18)" strokeWidth="1.5"/>

      {/* Curve: steeper, more dramatic hockey-stick */}
      <path d="M22 248 Q36 247 60 242 Q88 234 118 216 Q148 196 172 168 Q192 144 208 108" fill="none"/>
      <path d="M22 248 Q36 247 60 242 Q88 234 118 216 Q148 196 172 168 Q192 144 208 108 L208 248 Z" fill="url(#crFill)"/>
      <path d="M22 248 Q36 247 60 242 Q88 234 118 216 Q148 196 172 168 Q192 144 208 108" stroke="rgba(0,255,136,.12)" strokeWidth="22" fill="none" filter="url(#crGL)" strokeLinecap="round"/>
      <path d="M22 248 Q36 247 60 242 Q88 234 118 216 Q148 196 172 168 Q192 144 208 108" stroke="rgba(0,255,136,.32)" strokeWidth="7" fill="none" filter="url(#crGS)" strokeLinecap="round"/>
      <path d="M22 248 Q36 247 60 242 Q88 234 118 216 Q148 196 172 168 Q192 144 208 108" stroke="url(#crLine)" strokeWidth="3" fill="none" strokeLinecap="round"/>

      {/* Trail sparkle dots */}
      {[[62,242,1.4],[90,232,1.7],[118,216,2.0],[144,198,2.2],[168,172,2.4],[186,150,2.6]].map(([x,y,rv],i)=>(
        <circle key={i} cx={x} cy={y} r={rv} fill={`rgba(0,255,136,${.12+i*.06})`}/>
      ))}

      {/* ROCKET — bigger (S=1.9), sitting right on the curve tip at (208,108) */}
      {/* flame glow — centered on green curve at (173, 168), 1.7px offset */}
      <ellipse cx="173" cy="168" rx="20" ry="16" fill="rgba(255,130,0,.32)" filter="url(#crGM)"/>
      <ellipse cx="173" cy="168" rx="11" ry="9"  fill="rgba(255,210,0,.28)" filter="url(#crGS)"/>

      <g transform="translate(185,149) rotate(30)">
        {(() => {
          const S=1.2;
          return(
            <>
              <ellipse cx="0" cy={28*S} rx={14*S} ry={26*S} fill="url(#crFlameGlow)" filter="url(#crFl)"/>
              <ellipse cx="0" cy={34*S} rx={11*S} ry={22*S} fill="url(#crFlame2)" filter="url(#crFl)"/>
              <path d={`M${-6.5*S} ${14*S} Q${-3.5*S} ${30*S} 0 ${40*S} Q${3.5*S} ${30*S} ${6.5*S} ${14*S} Q${2.5*S} ${23*S} 0 ${21*S} Q${-2.5*S} ${23*S} ${-6.5*S} ${14*S}Z`} fill="url(#crFlame1)"/>
              <path d={`M${-9*S} ${6*S} L${-20*S} ${22*S} L${-8*S} ${15*S}Z`} fill="url(#crRocketFin)"/>
              <path d={`M${9*S} ${6*S} L${20*S} ${22*S} L${8*S} ${15*S}Z`} fill="url(#crRocketFin)"/>
              <path d={`M${-9*S} ${6*S} L${-14*S} ${14*S} L${-8*S} ${15*S}Z`} fill="rgba(210,160,255,.35)"/>
              <path d={`M${9*S} ${6*S} L${14*S} ${14*S} L${8*S} ${15*S}Z`} fill="rgba(210,160,255,.35)"/>
              <rect x={-7*S} y={10*S} width={14*S} height={8*S} rx={3*S} fill="rgba(8,4,24,.96)" stroke="rgba(200,140,255,.6)" strokeWidth="1.2"/>
              <rect x={-9*S} y={-20*S} width={18*S} height={32*S} rx={9*S} fill="url(#crRocketBody)" filter="url(#crSh)"/>
              <path d={`M${-9*S} ${-13*S} Q${-9*S} ${-30*S} 0 ${-39*S} Q${9*S} ${-30*S} ${9*S} ${-13*S}Z`} fill="url(#crRocketBody)"/>
              <path d={`M${-6*S} ${-13*S} Q${-5.5*S} ${-28*S} 0 ${-39*S} Q0 ${-33*S} 0 ${-13*S}Z`} fill="rgba(255,255,255,.17)"/>
              <rect x={-7.5*S} y={-18*S} width={5.5*S} height={26*S} rx={3*S} fill="rgba(255,255,255,.24)"/>
              <circle cx="0" cy={-5*S} r={6.5*S} fill="#0c4a6e" stroke="rgba(255,255,255,.75)" strokeWidth="1.6"/>
              <circle cx="0" cy={-5*S} r={4.5*S} fill="#0ea5e9"/>
              <circle cx="0" cy={-5*S} r={2.6*S} fill="#7dd3fc"/>
              <circle cx={-1.5*S} cy={-6.5*S} r={1.6*S} fill="rgba(255,255,255,.88)"/>
              <line x1={-9*S} y1={-1*S} x2={9*S} y2={-1*S} stroke="rgba(192,132,252,.24)" strokeWidth="1.2"/>
              <line x1={-9*S} y1={5*S}  x2={9*S} y2={5*S}  stroke="rgba(192,132,252,.18)" strokeWidth="1.2"/>
            </>
          );
        })()}
      </g>

      {/* Rocket body aura + nose tip sparkle at (208,108) */}
      <ellipse cx="185" cy="148" rx="26" ry="26" fill="rgba(167,139,250,.18)" filter="url(#crGL)"/>
      <circle cx="208" cy="108" r="3.2" fill="rgba(0,255,136,.95)"/>
      <circle cx="208" cy="108" r="7"   fill="rgba(0,255,136,.32)" filter="url(#crGS)"/>
      <circle cx="208" cy="108" r="14"  fill="rgba(0,255,136,.10)" filter="url(#crGM)"/>

      {/* Multiplier badge */}
      <rect x="52" y="260" width="136" height="48" rx="13" fill="rgba(0,255,136,.07)" stroke="rgba(0,255,136,.35)" strokeWidth="1.4" filter="url(#crGS)"/>
      <rect x="52" y="260" width="136" height="48" rx="13" fill="rgba(0,0,0,.18)"/>
      <text x="120" y="279" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontSize="8.5" fontWeight="800" fill="rgba(0,255,136,.52)" letterSpacing="3">MULTIPLIER</text>
      <text x="120" y="300" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontSize="24" fontWeight="900" fill="rgba(0,255,136,.97)" letterSpacing="-1"
        style={{filter:"drop-shadow(0 0 12px rgba(0,255,136,.7))"}}>204×</text>

      {[[198,272],[228,112],[18,204],[52,290]].map(([x,y],i)=>(
        <g key={i}>
          <line x1={x} y1={y-6} x2={x} y2={y+6} stroke="rgba(0,212,255,.55)" strokeWidth="1.3"/>
          <line x1={x-6} y1={y} x2={x+6} y2={y} stroke="rgba(0,212,255,.55)" strokeWidth="1.3"/>
          <circle cx={x} cy={y} r="1.3" fill="rgba(0,212,255,.85)"/>
        </g>
      ))}
      {[[168,62,2],[234,158,1.6],[230,248,2.2],[52,198,1.3]].map(([x,y,rv],i)=>(
        <g key={i} transform={`rotate(${i*38} ${x} ${y})`}>
          <rect x={x-rv} y={y-rv} width={rv*2} height={rv*2} rx=".6" fill={`rgba(${i%2===0?"0,255,136":"192,132,252"},.45)`}/>
        </g>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════ CRASH GAME ════════════════════════════════ */
function genCrashPoint(){
  const r=Math.random();
  if(r<0.045)return 1.00;
  return parseFloat(Math.min(1000, Math.max(1.00,0.955/r)).toFixed(2));
}

function CrashChart({phase,mult,cashoutMult}){
  const canvasRef=useRef(null);
  const starsRef=useRef(null);

  // Generate stable stars once
  useEffect(()=>{
    starsRef.current=Array.from({length:90},()=>({
      x:Math.random(),y:Math.random(),
      r:Math.random()*1.4+.3,
      op:Math.random()*.7+.15,
      phase:Math.random()*Math.PI*2
    }));
  },[]);

  useEffect(()=>{
    const cv=canvasRef.current; if(!cv)return;
    const ctx=cv.getContext("2d");
    const DPR=window.devicePixelRatio||1;
    const W=cv.width/DPR, H=cv.height/DPR;
    ctx.setTransform(DPR,0,0,DPR,0,0);
    const PL=58,PR=18,PT=20,PB=48;
    const pw=W-PL-PR, ph=H-PT-PB;
    ctx.clearRect(0,0,W,H);

    // ── Background ──
    const bgG=ctx.createLinearGradient(0,0,0,H);
    bgG.addColorStop(0,"#03010a");bgG.addColorStop(.5,"#060416");bgG.addColorStop(1,"#04020e");
    ctx.fillStyle=bgG; ctx.fillRect(0,0,W,H);

    // ── Nebula blobs ──
    const drawNebula=(x,y,r,col)=>{
      const ng=ctx.createRadialGradient(x,y,0,x,y,r);
      ng.addColorStop(0,col);ng.addColorStop(1,"transparent");
      ctx.fillStyle=ng;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
    };
    drawNebula(W*.2,H*.3,H*.35,"rgba(124,58,237,.04)");
    drawNebula(W*.8,H*.6,H*.28,"rgba(0,212,255,.03)");
    drawNebula(W*.5,H*.15,H*.2,"rgba(236,72,153,.025)");

    // ── Stars ──
    const t=Date.now()/1000;
    (starsRef.current||[]).forEach(s=>{
      const twinkle=s.op*(.7+.3*Math.sin(t*1.4+s.phase));
      ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(220,210,255,${twinkle})`;ctx.fill();
    });

    const crashed=phase==="crashed",flying=phase==="flying",cashed=phase==="cashed_out";
    const active=flying||crashed||cashed;

    // ── Grid ──
    const maxM=active?Math.max(mult*1.18,2.2):2.2;
    const gridCols=5,gridRows=4;
    ctx.strokeStyle="rgba(255,255,255,.04)";ctx.lineWidth=1;ctx.setLineDash([]);
    for(let i=0;i<=gridCols;i++){const x=PL+pw*(i/gridCols);ctx.beginPath();ctx.moveTo(x,PT);ctx.lineTo(x,PT+ph);ctx.stroke();}
    for(let i=0;i<=gridRows;i++){const y=PT+ph*(i/gridRows);ctx.beginPath();ctx.moveTo(PL,y);ctx.lineTo(PL+pw,y);ctx.stroke();}

    // ── Axes ──
    ctx.strokeStyle="rgba(255,255,255,.18)";ctx.lineWidth=1.5;ctx.setLineDash([]);
    ctx.beginPath();ctx.moveTo(PL,PT);ctx.lineTo(PL,PT+ph);ctx.lineTo(PL+pw,PT+ph);ctx.stroke();

    // ── Y-axis labels ──
    ctx.fillStyle="rgba(167,139,250,.45)";ctx.font=`bold 10px Inter,sans-serif`;ctx.textAlign="right";
    for(let i=0;i<=gridRows;i++){
      const v=1+(maxM-1)*(1-i/gridRows);
      const y=PT+ph*(i/gridRows);
      ctx.fillText(v.toFixed(v>=10?1:2)+"×",PL-7,y+4);
    }
    // ── X-axis labels ──
    ctx.textAlign="center";ctx.fillStyle="rgba(167,139,250,.3)";
    for(let i=0;i<=gridCols;i++){
      const x=PL+pw*(i/gridCols);
      ctx.fillText((i*5)+"s",x,PT+ph+16);
    }

    if(!active){
      // Draw a ghost curve as preview
      ctx.strokeStyle="rgba(124,58,237,.12)";ctx.lineWidth=2;ctx.setLineDash([8,5]);
      const gPts=[];
      for(let i=0;i<=100;i++){const t=i/100;gPts.push([PL+pw*t,PT+ph*(1-Math.pow(t,1.55))]);}
      ctx.beginPath();gPts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y));ctx.stroke();ctx.setLineDash([]);
      // Subtle fill
      ctx.beginPath();ctx.moveTo(gPts[0][0],PT+ph);gPts.forEach(([x,y])=>ctx.lineTo(x,y));ctx.lineTo(gPts[gPts.length-1][0],PT+ph);ctx.closePath();
      ctx.fillStyle="rgba(124,58,237,.04)";ctx.fill();
      // Label
      ctx.fillStyle="rgba(167,139,250,.22)";ctx.font="600 13px Inter,sans-serif";ctx.textAlign="center";
      ctx.fillText("Place a bet to start",PL+pw/2,PT+ph/2-8);
      ctx.font="500 11px Inter,sans-serif";ctx.fillStyle="rgba(167,139,250,.14)";
      ctx.fillText("Provably fair · 4.5% house edge",PL+pw/2,PT+ph/2+10);
      return;
    }

    // ── Curve points — exponential shape, clamped to plot area ──
    const steps=250;
    const pts=[];
    for(let i=0;i<=steps;i++){
      const frac=i/steps;
      // More dramatic: slight S-curve start then accelerating rise
      const m=1+(mult-1)*Math.pow(frac,1.55);
      const x=PL+pw*frac;
      const y=PT+ph*(1-(m-1)/(maxM-1));
      pts.push([x,Math.max(PT,Math.min(PT+ph,y))]);
    }

    const col=crashed?"#ef4444":"#00ff88";
    const colRGBA=crashed?"239,68,68":"0,255,136";

    // ── Gradient fill ──
    ctx.beginPath();
    ctx.moveTo(pts[0][0],PT+ph);
    pts.forEach(([x,y])=>ctx.lineTo(x,y));
    ctx.lineTo(pts[pts.length-1][0],PT+ph);
    ctx.closePath();
    const fillG=ctx.createLinearGradient(0,PT,0,PT+ph);
    fillG.addColorStop(0,`rgba(${colRGBA},.22)`);
    fillG.addColorStop(.5,`rgba(${colRGBA},.1)`);
    fillG.addColorStop(1,`rgba(${colRGBA},.01)`);
    ctx.fillStyle=fillG;ctx.fill();

    // ── Outer glow line ──
    ctx.beginPath();pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y));
    ctx.strokeStyle=`rgba(${colRGBA},.18)`;ctx.lineWidth=16;ctx.lineJoin="round";ctx.lineCap="round";ctx.stroke();
    // ── Mid glow ──
    ctx.beginPath();pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y));
    ctx.strokeStyle=`rgba(${colRGBA},.35)`;ctx.lineWidth=7;ctx.stroke();
    // ── Core line ──
    ctx.beginPath();pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y));
    ctx.strokeStyle=col;ctx.lineWidth=2.8;ctx.stroke();

    // ── Auto cashout dashed line ──
    if(cashoutMult&&cashoutMult>1&&cashoutMult<maxM*1.1){
      const cy=PT+ph*(1-(cashoutMult-1)/(maxM-1));
      if(cy>PT&&cy<PT+ph){
        ctx.strokeStyle="rgba(245,196,0,.5)";ctx.lineWidth=1.5;ctx.setLineDash([6,4]);
        ctx.beginPath();ctx.moveTo(PL,cy);ctx.lineTo(PL+pw,cy);ctx.stroke();ctx.setLineDash([]);
        ctx.fillStyle="rgba(245,196,0,.8)";ctx.font="bold 9px Inter";ctx.textAlign="left";
        ctx.fillText(cashoutMult.toFixed(2)+"× auto",PL+4,cy-4);
      }
    }

    // ── Rocket + trail at curve tip ──
    const tip=pts[pts.length-1];
    if(!crashed){
      // Compute tangent angle from last few points
      const prev=pts[Math.max(0,pts.length-12)];
      const angle=Math.atan2(tip[1]-prev[1], tip[0]-prev[0]);

      // Trail particles
      const trailLen=Math.min(pts.length,55);
      for(let i=pts.length-trailLen;i<pts.length-3;i++){
        const frac=(i-(pts.length-trailLen))/trailLen;
        const [px,py]=pts[i];
        ctx.beginPath();ctx.arc(px,py,3.5*frac,0,Math.PI*2);
        ctx.fillStyle=`rgba(${colRGBA},${frac*.35})`;ctx.fill();
        if(i%10===0&&frac>.5){
          ctx.beginPath();ctx.arc(px+((Math.random()-.5)*7),py+((Math.random()-.5)*7),1.8,0,Math.PI*2);
          ctx.fillStyle="rgba(255,220,80,.55)";ctx.fill();
        }
      }

      // Flame glow behind rocket
      const flameDir=angle+Math.PI; // opposite to travel direction
      const fx=tip[0]+Math.cos(flameDir)*14;
      const fy=tip[1]+Math.sin(flameDir)*14;
      const flameG=ctx.createRadialGradient(fx,fy,0,fx,fy,32);
      flameG.addColorStop(0,"rgba(255,200,0,.9)");
      flameG.addColorStop(.3,"rgba(255,80,0,.6)");
      flameG.addColorStop(.65,"rgba(239,68,68,.2)");
      flameG.addColorStop(1,"transparent");
      ctx.fillStyle=flameG;ctx.beginPath();ctx.arc(fx,fy,32,0,Math.PI*2);ctx.fill();

      // Draw rocket manually — rotated to follow curve
      ctx.save();
      ctx.translate(tip[0],tip[1]);
      ctx.rotate(angle+Math.PI/2); // nose points in travel direction

      const S=1.35; // scale

      // Outer flame
      ctx.beginPath();
      ctx.ellipse(0,22*S,9*S,20*S,0,0,Math.PI*2);
      const og=ctx.createLinearGradient(0,2*S,0,42*S);
      og.addColorStop(0,"rgba(255,220,0,.75)");og.addColorStop(.5,"rgba(255,80,0,.45)");og.addColorStop(1,"transparent");
      ctx.fillStyle=og;ctx.fill();
      // Core flame
      ctx.beginPath();
      ctx.moveTo(-5*S,14*S);
      ctx.bezierCurveTo(-3*S,24*S,0,30*S,0,36*S);
      ctx.bezierCurveTo(0,30*S,3*S,24*S,5*S,14*S);
      ctx.bezierCurveTo(2*S,20*S,0,18*S,-5*S,14*S);
      ctx.closePath();
      const cg=ctx.createLinearGradient(0,14*S,0,36*S);
      cg.addColorStop(0,"rgba(255,255,220,.95)");cg.addColorStop(.3,"rgba(255,200,0,.9)");cg.addColorStop(.7,"rgba(255,60,0,.7)");cg.addColorStop(1,"transparent");
      ctx.fillStyle=cg;ctx.fill();

      // Fins
      ctx.fillStyle="#6d28d9";
      ctx.beginPath();ctx.moveTo(-8*S,6*S);ctx.lineTo(-15*S,18*S);ctx.lineTo(-7*S,14*S);ctx.closePath();ctx.fill();
      ctx.beginPath();ctx.moveTo(8*S,6*S);ctx.lineTo(15*S,18*S);ctx.lineTo(7*S,14*S);ctx.closePath();ctx.fill();
      // Fin highlights
      ctx.fillStyle="rgba(192,132,252,.3)";
      ctx.beginPath();ctx.moveTo(-8*S,6*S);ctx.lineTo(-11*S,12*S);ctx.lineTo(-7*S,14*S);ctx.closePath();ctx.fill();

      // Nozzle
      ctx.fillStyle="#1e0c50";ctx.strokeStyle="rgba(192,132,252,.5)";ctx.lineWidth=1;
      ctx.beginPath();ctx.rect(-6*S,10*S,12*S,7*S);ctx.fill();ctx.stroke();

      // Body
      const bodyG=ctx.createLinearGradient(-8*S,0,8*S,0);
      bodyG.addColorStop(0,"#7c3aed");bodyG.addColorStop(.35,"#c084fc");bodyG.addColorStop(.65,"#a855f7");bodyG.addColorStop(1,"#5b21b6");
      ctx.fillStyle=bodyG;ctx.strokeStyle="rgba(255,255,255,.15)";ctx.lineWidth=1;
      ctx.beginPath();ctx.roundRect(-8*S,-18*S,16*S,30*S,8*S);ctx.fill();ctx.stroke();

      // Nose cone
      const noseG=ctx.createLinearGradient(-8*S,-12*S,8*S,-12*S);
      noseG.addColorStop(0,"#7c3aed");noseG.addColorStop(.35,"#d8b4fe");noseG.addColorStop(1,"#6d28d9");
      ctx.fillStyle=noseG;
      ctx.beginPath();ctx.moveTo(-8*S,-12*S);ctx.bezierCurveTo(-8*S,-24*S,0,-32*S,0,-32*S);ctx.bezierCurveTo(0,-32*S,8*S,-24*S,8*S,-12*S);ctx.closePath();ctx.fill();
      // Nose highlight
      ctx.fillStyle="rgba(255,255,255,.18)";
      ctx.beginPath();ctx.moveTo(-5*S,-12*S);ctx.bezierCurveTo(-5*S,-24*S,0,-30*S,0,-30*S);ctx.lineTo(0,-12*S);ctx.closePath();ctx.fill();

      // Body highlight
      ctx.fillStyle="rgba(255,255,255,.22)";
      ctx.beginPath();ctx.roundRect(-6*S,-16*S,4.5*S,24*S,3*S);ctx.fill();

      // Window
      ctx.beginPath();ctx.arc(0,-4*S,6*S,0,Math.PI*2);
      const wg=ctx.createRadialGradient(-1*S,-5*S,0,0,-4*S,6*S);
      wg.addColorStop(0,"rgba(255,255,255,.8)");wg.addColorStop(.2,"#7dd3fc");wg.addColorStop(.6,"#0ea5e9");wg.addColorStop(1,"#075985");
      ctx.fillStyle=wg;ctx.strokeStyle="rgba(255,255,255,.7)";ctx.lineWidth=1.2;ctx.fill();ctx.stroke();

      ctx.restore();

      // Tip glow dot
      ctx.beginPath();ctx.arc(tip[0],tip[1],5,0,Math.PI*2);
      ctx.fillStyle=col;ctx.fill();
      ctx.beginPath();ctx.arc(tip[0],tip[1],5,0,Math.PI*2);
      ctx.strokeStyle="rgba(0,0,0,.6)";ctx.lineWidth=1.5;ctx.stroke();
    } else {
      // Explosion at crash point
      const explG=ctx.createRadialGradient(tip[0],tip[1],0,tip[0],tip[1],70);
      explG.addColorStop(0,"rgba(255,200,0,.35)");explG.addColorStop(.4,"rgba(239,68,68,.25)");explG.addColorStop(1,"transparent");
      ctx.fillStyle=explG;ctx.beginPath();ctx.arc(tip[0],tip[1],70,0,Math.PI*2);ctx.fill();
      // Shockwave rings
      [20,36,54,72].forEach((r,i)=>{
        ctx.beginPath();ctx.arc(tip[0],tip[1],r,0,Math.PI*2);
        ctx.strokeStyle=`rgba(239,68,68,${.45-i*.09})`;ctx.lineWidth=3-i*.5;ctx.stroke();
      });
      // Debris lines
      for(let i=0;i<8;i++){
        const da=(i/8)*Math.PI*2;
        const dl=18+Math.random()*22;
        ctx.beginPath();ctx.moveTo(tip[0],tip[1]);
        ctx.lineTo(tip[0]+Math.cos(da)*dl,tip[1]+Math.sin(da)*dl);
        ctx.strokeStyle=`rgba(${i%2===0?"255,150,0":"239,68,68"},.6)`;ctx.lineWidth=1.5;ctx.stroke();
      }
      // Center dot
      ctx.beginPath();ctx.arc(tip[0],tip[1],7,0,Math.PI*2);
      ctx.fillStyle="#ef4444";ctx.fill();
    }
  },[phase,mult,cashoutMult]);

  return(
    <div style={{position:"relative",width:"100%",borderRadius:16,overflow:"hidden"}}>
      <canvas ref={canvasRef}
        width={900} height={440}
        style={{width:"100%",display:"block"}}/>
    </div>
  );
}

function CrashGame({balance,setBalance,setPage}){
  const [phase,setPhase]=useState("idle");
  const [bet,setBet]=useState(10);
  const [autoCashout,setAutoCashout]=useState(2.00);
  const [useAuto,setUseAuto]=useState(false);
  const [mult,setMult]=useState(1.00);
  const [crashAt,setCrashAt]=useState(null);
  const [countdown,setCountdown]=useState(3);
  const [history,setHistory]=useState([]);
  const [flash,setFlash]=useState(null);
  const [toast,setToast]=useState(null);
  const [betHistory,setBetHistory]=useState([]);

  const rafRef=useRef(null)
  const [showStats,setShowStats]=useState(false);
  const [crStats,setCrStats]=useState({profit:0,wagered:0,wins:0,losses:0,history:[0]});;
  const startTimeRef=useRef(null);
  const crashAtRef=useRef(null);
  const betRef=useRef(bet);
  const multRef=useRef(1.00);
  const autoCashoutRef=useRef(autoCashout);
  const useAutoRef=useRef(useAuto);
  const phaseRef=useRef("idle");
  const countdownRef=useRef(null);

  useEffect(()=>{betRef.current=bet;},[bet]);
  useEffect(()=>{autoCashoutRef.current=autoCashout;},[autoCashout]);
  useEffect(()=>{useAutoRef.current=useAuto;},[useAuto]);
  useEffect(()=>{phaseRef.current=phase;},[phase]);
  useEffect(()=>()=>{
    if(rafRef.current)cancelAnimationFrame(rafRef.current);
    if(countdownRef.current)clearInterval(countdownRef.current);
  },[]);

  const isFlying=phase==="flying";
  const isDone=phase==="crashed"||phase==="cashed_out";
  const isIdle=phase==="idle";
  const winAmt=+(bet*mult).toFixed(2);

  function startRound(){
    if(bet<=0||bet>balance)return;
    sfx.start();
    const cp=genCrashPoint();
    setCrashAt(cp); crashAtRef.current=cp;
    setBalance(b=>+(b-bet).toFixed(2));
    setMult(1.00); multRef.current=1.00;
    setPhase("countdown"); phaseRef.current="countdown";
    setCountdown(3);
    let cnt=3;
    countdownRef.current=setInterval(()=>{
      cnt--;
      setCountdown(cnt);
      sfx.tick();
      if(cnt<=0){
        clearInterval(countdownRef.current);
        setPhase("flying"); phaseRef.current="flying";
        startTimeRef.current=Date.now();
        rafRef.current=requestAnimationFrame(tick);
      }
    },1000);
  }

  function tick(){
    if(phaseRef.current!=="flying")return;
    const elapsed=(Date.now()-startTimeRef.current)/1000;
    const newMult=parseFloat(Math.max(1.00,Math.exp(0.08*elapsed)).toFixed(2));
    multRef.current=newMult;
    setMult(newMult);
    if(Math.random()<0.06)sfx.crashTick();
    if(useAutoRef.current&&newMult>=autoCashoutRef.current){doCashout(newMult);return;}
    if(newMult>=crashAtRef.current){docrash(crashAtRef.current);return;}
    rafRef.current=requestAnimationFrame(tick);
  }

  function doCashout(m=multRef.current){
    if(phaseRef.current!=="flying")return;
    cancelAnimationFrame(rafRef.current);
    const win=+(betRef.current*m).toFixed(2);
    setBalance(b=>+(b+win).toFixed(2));
    setPhase("cashed_out"); phaseRef.current="cashed_out";
    setFlash("g"); setTimeout(()=>setFlash(null),600);
    setToast(`+$${(win-betRef.current).toFixed(2)}`); setTimeout(()=>setToast(null),2400);
    sfx.cash();
    setBetHistory(h=>[{type:"c",mult:m,profit:+(win-betRef.current).toFixed(2)},...h.slice(0,7)]);
    setCrStats(s=>({profit:+(s.profit+(win-betRef.current)).toFixed(2),wagered:+(s.wagered+betRef.current).toFixed(2),wins:s.wins+1,losses:s.losses,history:[...s.history,+(s.profit+(win-betRef.current)).toFixed(2)]}));
    setHistory(h=>[{mult:m,crashed:false},...h.slice(0,11)]);
  }

  function docrash(m){
    cancelAnimationFrame(rafRef.current);
    setMult(m);
    setPhase("crashed"); phaseRef.current="crashed";
    setFlash("r"); setTimeout(()=>setFlash(null),700);
    sfx.crashBoom();
    setBetHistory(h=>[{type:"l",mult:m,profit:-betRef.current},...h.slice(0,7)]);
    setCrStats(s=>({profit:+(s.profit-betRef.current).toFixed(2),wagered:+(s.wagered+betRef.current).toFixed(2),wins:s.wins,losses:s.losses+1,history:[...s.history,+(s.profit-betRef.current).toFixed(2)]}));
    setHistory(h=>[{mult:m,crashed:true},...h.slice(0,11)]);
  }

  function reset(){sfx.click();setPhase("idle");phaseRef.current="idle";setMult(1.00);setCrashAt(null);}

  function getHistClass(m){if(m<2)return"ch-low";if(m<10)return"ch-mid";return"ch-high";}

  return(
    <div className="gamepage"><style>{CSS_CRASH}</style>
      {flash==="r"&&<div className="fl-r"/>}
      {flash==="g"&&<div className="fl-g"/>}
      {toast&&<div className="cashpop">{toast}</div>}
      <div className="bc">
        <a onClick={()=>setPage("lobby")}>Home</a><span style={{opacity:.35}}>›</span>
        <a onClick={()=>setPage("casino")}>Casino</a><span style={{opacity:.35}}>›</span>
        <span style={{color:"var(--tx2)",fontWeight:500}}>Crash</span>
      </div>
      <div className="gamebody">
        {/* LEFT PANEL */}
        <div className="lp">
          <div className="fld">
            <div className="flbl">Bet Amount <span>${balance.toFixed(2)}</span></div>
            <div className="fi-w">
              <span className="fi-pre">◈</span>
              <input className="fi" type="number" min={.1} step={.5} value={bet}
                onChange={e=>!isFlying&&setBet(Math.max(.1,+e.target.value))} disabled={!isIdle}/>
              <span className="fi-suf">USD</span>
            </div>
            <div className="qb">
              {["½","2×","5×","MAX"].map(v=>(
                <button key={v} className="qbtn" disabled={!isIdle} onClick={()=>{
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
            <div className="flbl" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span>Auto Cashout</span>
              <div onClick={()=>isIdle&&setUseAuto(v=>!v)} style={{width:36,height:20,borderRadius:10,background:useAuto?"var(--pu)":"var(--s4)",position:"relative",cursor:isIdle?"pointer":"not-allowed",transition:"background .2s",border:"1px solid rgba(255,255,255,.1)",flexShrink:0}}>
                <div style={{position:"absolute",top:3,left:useAuto?17:3,width:13,height:13,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.4)"}}/>
              </div>
            </div>
            {useAuto&&(
              <div className="fi-w">
                <span className="fi-pre" style={{color:"var(--go)"}}>×</span>
                <input className="fi" type="number" min={1.01} step={.1} value={autoCashout}
                  onChange={e=>setAutoCashout(Math.max(1.01,+e.target.value))} disabled={!isIdle}/>
              </div>
            )}
          </div>
          <div className="sep"/>
          <div className="sr"><span className="sl">Potential Win</span><span className="sv" style={{color:"var(--go)"}}>${winAmt.toFixed(2)}</span></div>
          <div className="sr"><span className="sl">Profit</span><span className="sv" style={{color:winAmt-bet>0?"var(--nG)":"var(--tx3)"}}>+${(winAmt-bet).toFixed(2)}</span></div>
          {phase==="crashed"&&crashAt&&<div className="sr"><span className="sl">Crashed at</span><span className="sv" style={{color:"var(--rd)"}}>{crashAt.toFixed(2)}×</span></div>}
          <div className="sep"/>
          <div style={{minHeight:46,flexShrink:0}}>
            {isIdle&&<button className="cta go" onClick={startRound} disabled={bet<=0||bet>balance}>🚀 Place Bet</button>}
            {phase==="countdown"&&<button className="cta go" disabled style={{opacity:.55,fontSize:".9rem"}}>Launching in {countdown}s...</button>}
            {isFlying&&<button className="crash-cashout-btn" onClick={()=>doCashout()}>💰 Cashout — {mult.toFixed(2)}× = ${winAmt.toFixed(2)}</button>}
            {isDone&&<button className="cta replay" onClick={reset}>↺ Next Round</button>}
          </div>
          <button className="sm-btn" onClick={()=>setShowStats(true)} style={{marginTop:6,width:"100%",justifyContent:"center"}}>
            📊 Stats & History
          </button>
        </div>
        {showStats&&<StatsModal gameName="Crash" onClose={()=>setShowStats(false)} stats={{profit:crStats.profit,wagered:crStats.wagered,wins:crStats.wins,losses:crStats.losses,history:crStats.history}}/>}

        {/* GAME AREA */}
        <div className="garea">
          <div className="gcent" style={{maxWidth:700,gap:11}}>

            {/* Main chart wrapper with overlay */}
            <div className={`crash-wrap ${phase}`} style={{position:"relative"}}>
              <CrashChart phase={phase} mult={mult} cashoutMult={useAuto?autoCashout:null}/>
              {/* Overlay: multiplier + status */}
              <div className="crash-overlay" style={{position:"absolute",inset:0,pointerEvents:"none",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:20,gap:7}}>
                {phase==="countdown"?(
                  <span className="crash-countdown-big" key={countdown}>{countdown}</span>
                ):(
                  <span className={`crash-mult-big ${phase==="flying"?"fly":phase==="crashed"?"done-crash":phase==="cashed_out"?"done-cash":"idle"}`}>
                    {mult.toFixed(2)}<span style={{fontSize:"2.2rem",opacity:.45,marginLeft:4}}>×</span>
                  </span>
                )}
                <div className={`crash-status-tag ${phase==="cashed_out"?"cashed":phase}`}>
                  {phase==="idle"&&<>⏳ Place your bet &amp; start</>}
                  {phase==="countdown"&&<>🟡 Launching...</>}
                  {isFlying&&<><div style={{width:7,height:7,borderRadius:"50%",background:"var(--nG)",boxShadow:"0 0 8px var(--nG)",animation:"liveDot 1s ease-in-out infinite"}}/>LIVE — Cashout anytime</>}
                  {phase==="crashed"&&<>💥 CRASHED at {crashAt?.toFixed(2)}×</>}
                  {phase==="cashed_out"&&<>✓ CASHED OUT — +${(bet*(mult-1)).toFixed(2)}</>}
                </div>
                {isFlying&&(
                  <div style={{display:"flex",gap:8,marginTop:2}}>
                    <div style={{padding:"3px 12px",borderRadius:20,background:"rgba(0,0,0,.45)",border:"1px solid rgba(0,255,136,.2)",fontSize:".65rem",fontWeight:700,color:"rgba(0,255,136,.8)",fontVariantNumeric:"tabular-nums",backdropFilter:"blur(8px)"}}>
                      Profit: +${(bet*(mult-1)).toFixed(2)}
                    </div>
                    {useAuto&&(
                      <div style={{padding:"3px 12px",borderRadius:20,background:"rgba(0,0,0,.45)",border:"1px solid rgba(245,196,0,.25)",fontSize:".65rem",fontWeight:700,color:"rgba(245,196,0,.8)",backdropFilter:"blur(8px)"}}>
                        Auto: {autoCashout.toFixed(2)}×
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Round history row */}
            <div style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"2px 0"}}>
              <span style={{fontSize:".6rem",color:"var(--tx3)",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",flexShrink:0}}>Last rounds</span>
              <div className="crash-history">
                {history.length===0&&<span style={{fontSize:".67rem",color:"var(--tx3)"}}>—</span>}
                {history.map((h,i)=>(
                  <div key={i} className={`ch-badge ${h.crashed?"ch-crash":getHistClass(h.mult)}`}>
                    {h.crashed?"✕ ":""}{h.mult.toFixed(2)}×
                  </div>
                ))}
              </div>
            </div>

            {/* Pills */}
            <div className="pills">
              <div className="pill"><span className="pl-l">House Edge</span><span className="pl-v" style={{color:"var(--tx2)"}}>4.5%</span></div>
              <div className="pill"><span className="pl-l">RTP</span><span className="pl-v" style={{color:"var(--nG)"}}>95.5%</span></div>
              <div className="pill"><span className="pl-l">Max Win</span><span className="pl-v" style={{color:"var(--puLL)"}}>∞</span></div>
              <div className="pill"><span className="pl-l">Provably Fair</span><span className="pl-v" style={{color:"var(--go)"}}>✓</span></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


export { CrashGame, CrashArt };

