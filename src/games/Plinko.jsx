import React, { useState, useCallback, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { StatsModal } from "../components/StatsModal.jsx";
import { HiLoArt, MinesArt, DiceArt, BlackjackArt } from "../Lobby.jsx";
import { CrashArt } from "./Crash.jsx";
import { WheelArt } from "./Wheel.jsx";
import { VideoPokerArt } from "./VideoPoker.jsx";
import { KenoArt } from "./Keno.jsx";
import { CoinflipArt } from "./Coinflip.jsx";
import { GatesOfOlympusArt } from "./GatesOfOlympus.jsx";
import { LeBanditArt, DogHouseArt } from "./LeBandit.jsx";
import { SweetBonanzaArt } from "./SweetBonanza.jsx";
import { CloudPrincessArt } from "./CloudPrincess.jsx";

/* ══════════════════════════════════════ PLINKO ART ════════════════════════════════════════ */
function PlinkoArt(){
  return(
    <svg viewBox="0 0 240 180" width="100%" height="100%">
      <defs>
        <radialGradient id="plBg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#0a0520"/>
          <stop offset="100%" stopColor="#030210"/>
        </radialGradient>
        <radialGradient id="plBall" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#a78bfa"/>
          <stop offset="50%" stopColor="#7c3aed"/>
          <stop offset="100%" stopColor="#4c1d95"/>
        </radialGradient>
      </defs>
      <rect width="240" height="180" fill="url(#plBg)"/>
      {Array.from({length:6},(_,row)=>Array.from({length:row+3},(_,col)=>{
        const x=120-(row+2)*14+col*28;
        const y=22+row*22;
        return <circle key={`${row}-${col}`} cx={x} cy={y} r="4" fill="#7c3aed" opacity=".85" filter="url(#plGlow)"/>;
      }))}
      <circle cx="120" cy="12" r="8" fill="url(#plBall)" filter="url(#plGlow)"/>
      <circle cx="118" cy="10" r="3" fill="rgba(255,255,255,.5)"/>
      {[0,0.15,0.55,2.0,5.5,2.0,0.55,0.15,0].map((v,i)=>{
        const colors=["#ef4444","#f97316","#eab308","#22c55e","#7c3aed","#22c55e","#eab308","#f97316","#ef4444"];
        const x=14+i*24;
        return(
          <g key={i}>
            <rect x={x} y={148} width={20} height={24} rx="3" fill={colors[i]} opacity=".85"/>
            <text x={x+10} y={163} textAnchor="middle" fontSize="6.5" fill="#fff" fontWeight="900" fontFamily="sans-serif">{v>=1?`${v}×`:`${v}×`}</text>
          </g>
        );
      })}
      <defs>
        <filter id="plGlow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <text x="120" y="178" textAnchor="middle" fontSize="9" fontWeight="900" fill="rgba(167,139,250,.6)" fontFamily="sans-serif" letterSpacing="3">PLINKO</text>
    </svg>
  );
}

/* ── Plinko constants ── */
const PLINKO_ROWS={8:8,10:10,12:12,14:14,16:16};

const PLINKO_MULTS={
  low:{
    8:  [5.6,2.1,1.1,1.0,0.5,1.0,1.1,2.1,5.6],
    10: [8.9,3.0,1.4,1.1,1.0,0.5,1.0,1.1,1.4,3.0,8.9],
    12: [10,4.0,1.7,1.2,1.1,1.0,0.5,1.0,1.1,1.2,1.7,4.0,10],
    14: [18,5.0,2.0,1.4,1.2,1.1,1.0,0.5,1.0,1.1,1.2,1.4,2.0,5.0,18],
    16: [16,9.0,2.0,1.4,1.4,1.2,1.1,1.0,0.5,1.0,1.1,1.2,1.4,1.4,2.0,9.0,16],
  },
  medium:{
    8:  [13,3.0,1.3,0.7,0.4,0.7,1.3,3.0,13],
    10: [22,5.0,2.0,1.4,0.6,0.4,0.6,1.4,2.0,5.0,22],
    12: [33,11,4.0,2.0,1.1,0.6,0.3,0.6,1.1,2.0,4.0,11,33],
    14: [58,15,7.0,3.0,1.5,1.0,0.5,0.2,0.5,1.0,1.5,3.0,7.0,15,58],
    16: [110,41,10,5.0,3.0,1.5,1.0,0.5,0.3,0.5,1.0,1.5,3.0,5.0,10,41,110],
  },
  high:{
    8:  [29,4.0,1.5,0.3,0.2,0.3,1.5,4.0,29],
    10: [76,10,3.0,0.9,0.3,0.2,0.3,0.9,3.0,10,76],
    12: [170,24,8.1,2.0,0.7,0.2,0.2,0.2,0.7,2.0,8.1,24,170],
    14: [420,56,18,5.0,1.9,0.3,0.2,0.2,0.3,1.9,5.0,18,56,420],
    16: [1000,130,26,9.0,4.0,2.0,0.2,0.2,0.2,0.2,2.0,4.0,9.0,26,130,1000],
  },
};

function plinkoBucketColor(v){
  if(v>=100)return"#f5c400";
  if(v>=20)return"#ff6b35";
  if(v>=5)return"#22c55e";
  if(v>=2)return"#06b6d4";
  if(v>=1)return"#7c3aed";
  if(v>=0.5)return"#ec4899";
  return"#ef4444";
}

function plinkoDrop(rows){
  const path=[];
  let bucketIdx=0;
  for(let r=0;r<rows;r++){
    const dir=Math.random()<0.5?0:1;
    bucketIdx+=dir;
    path.push(dir);
  }
  return{path,bucketIdx};
}

/* ── CSS ── */
const PLINKO_CSS=`
  @keyframes plBallLand{0%{transform:scale(1.4)}60%{transform:scale(.85)}100%{transform:scale(1)}}
  @keyframes plBucketHit{0%{transform:scaleY(1) scaleX(1);filter:brightness(1)}25%{transform:scaleY(.82) scaleX(1.08);filter:brightness(2)}70%{transform:scaleY(1.06) scaleX(.97);filter:brightness(1.2)}100%{transform:scaleY(1) scaleX(1);filter:brightness(1)}}
  @keyframes plWinPop{0%{opacity:0;transform:translateY(0) scale(.6)}40%{opacity:1;transform:translateY(-20px) scale(1.15)}80%{opacity:.9;transform:translateY(-44px) scale(1)}100%{opacity:0;transform:translateY(-62px) scale(.85)}}
  .pl-game{display:flex;flex-direction:column;flex:1;overflow:hidden;background:radial-gradient(ellipse at 50% 0%,#120a2e 0%,#070414 50%,#030210 100%);position:relative;}
  .pl-main{display:flex;flex:1;overflow:hidden;position:relative;z-index:1;}
  .pl-ctrl{width:195px;flex-shrink:0;background:rgba(5,2,18,.96);border-right:1px solid rgba(124,58,237,.12);display:flex;flex-direction:column;padding:12px 10px;overflow-y:auto;scrollbar-width:none;}
  .pl-ctrl::-webkit-scrollbar{display:none;}
  .pl-arena{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px 12px 8px;gap:0;overflow:hidden;position:relative;}
  .pl-board{position:relative;background:rgba(124,58,237,.04);border:1.5px solid rgba(124,58,237,.18);border-radius:18px 18px 0 0;padding:12px 10px 4px;box-shadow:0 0 80px rgba(124,58,237,.12),inset 0 0 60px rgba(0,0,20,.7);border-bottom:none;}
  .pl-board::before{content:'';position:absolute;inset:-2px;bottom:0;border-radius:20px 20px 0 0;background:linear-gradient(135deg,rgba(139,92,246,.2),rgba(124,58,237,.08),rgba(192,132,252,.12));z-index:-1;filter:blur(1px);}
  .pl-buckets{display:flex;gap:2px;padding:4px 10px 8px;background:rgba(124,58,237,.04);border:1.5px solid rgba(124,58,237,.18);border-top:none;border-radius:0 0 18px 18px;box-shadow:0 8px 40px rgba(124,58,237,.1);}
  .pl-bucket{flex:1;border-radius:0 0 7px 7px;padding:5px 2px;text-align:center;cursor:default;position:relative;overflow:hidden;transition:box-shadow .12s;}
  .pl-top-bar{display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:rgba(5,2,18,.98);border-bottom:1px solid rgba(124,58,237,.2);backdrop-filter:blur(20px);flex-shrink:0;z-index:10;position:relative;}
  .pl-top-bar::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(124,58,237,.6),rgba(167,139,250,.7),rgba(124,58,237,.6),transparent);pointer-events:none;}
  .pl-title{font-family:'Space Grotesk',sans-serif;font-size:1.15rem;font-weight:800;color:#c084fc;text-shadow:0 0 24px rgba(192,132,252,.7),0 2px 4px rgba(0,0,0,.9);letter-spacing:.05em;}
  .pl-hud{display:flex;gap:6px;width:100%;max-width:680px;}
  .pl-hud-box{background:linear-gradient(145deg,rgba(8,4,28,.95),rgba(4,2,18,.98));border:1px solid rgba(124,58,237,.2);border-radius:11px;padding:7px 12px;display:flex;flex-direction:column;align-items:center;gap:2px;flex:1;box-shadow:inset 0 1px 0 rgba(255,255,255,.04);}
  .pl-hud-lbl{font-size:.5rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(167,139,250,.4);}
  .pl-hud-val{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:700;color:#c084fc;font-variant-numeric:tabular-nums;}
  .pl-hud-val.green{color:#00ff88;text-shadow:0 0 12px rgba(0,255,136,.5);}
  .pl-hud-val.red{color:#ef4444;}
  .pl-risk-row{display:flex;gap:4px;margin-bottom:2px;}
  .pl-risk-btn{flex:1;padding:6px 2px;border-radius:8px;border:1px solid rgba(124,58,237,.18);background:rgba(124,58,237,.06);color:rgba(167,139,250,.6);font-family:var(--f);font-size:.62rem;font-weight:700;cursor:pointer;transition:all .14s;text-align:center;}
  .pl-risk-btn.on{background:rgba(124,58,237,.22);border-color:rgba(167,139,250,.5);color:#c084fc;box-shadow:0 0 10px rgba(124,58,237,.2);}
  .pl-risk-btn:hover:not(.on){background:rgba(124,58,237,.12);color:#a78bfa;}
  .pl-rows-row{display:grid;grid-template-columns:repeat(5,1fr);gap:3px;}
  .pl-row-btn{padding:5px 2px;border-radius:7px;border:1px solid rgba(124,58,237,.15);background:rgba(124,58,237,.05);color:rgba(167,139,250,.55);font-family:var(--f);font-size:.6rem;font-weight:700;cursor:pointer;transition:all .12s;text-align:center;}
  .pl-row-btn.on{background:rgba(124,58,237,.2);border-color:rgba(167,139,250,.45);color:#c084fc;}
  .pl-row-btn:hover:not(.on){background:rgba(124,58,237,.1);color:#a78bfa;}
  .pl-spin-btn{width:100%;padding:15px;border-radius:50px;border:none;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;font-weight:800;cursor:pointer;letter-spacing:.06em;background:linear-gradient(135deg,#5b21b6,#7c3aed,#8b5cf6,#a78bfa);color:#fff;box-shadow:0 6px 32px rgba(124,58,237,.55),0 2px 0 rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.22);transition:all .2s cubic-bezier(.34,1.2,.64,1);position:relative;overflow:hidden;}
  .pl-spin-btn::before{content:'';position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(to bottom,rgba(255,255,255,.12),transparent);border-radius:50px 50px 0 0;pointer-events:none;}
  .pl-spin-btn:hover:not(:disabled){transform:translateY(-2px) scale(1.03);box-shadow:0 10px 42px rgba(124,58,237,.72);}
  .pl-spin-btn:active:not(:disabled){transform:scale(.97) translateY(1px);}
  .pl-spin-btn:disabled{background:linear-gradient(135deg,#1f2937,#374151);color:rgba(255,255,255,.25);cursor:not-allowed;box-shadow:none;}
  .pl-auto-btn{width:100%;padding:9px;border-radius:10px;border:1.5px solid rgba(124,58,237,.22);background:rgba(124,58,237,.07);color:rgba(167,139,250,.7);font-family:var(--f);font-size:.72rem;font-weight:700;cursor:pointer;transition:all .15s;display:flex;justify-content:space-between;align-items:center;}
  .pl-auto-btn.on{border-color:rgba(167,139,250,.5);background:rgba(124,58,237,.18);color:#c084fc;box-shadow:0 0 14px rgba(124,58,237,.2);}
`;

/* ── Physics constants (never change) ── */
const GRAVITY = 1400;
const BALL_R   = 6;
const SEG_T    = 0.30;

/* ── Ball color data (outside component — never recreated) ── */
const BALL_COLORS_DATA = [
  ["#a78bfa","#7c3aed","#3b0764"],
  ["#f9a8d4","#ec4899","#831843"],
  ["#6ee7b7","#10b981","#064e3b"],
  ["#fde68a","#f59e0b","#78350f"],
  ["#7dd3fc","#0ea5e9","#0c4a6e"],
  ["#fca5a5","#ef4444","#7f1d1d"],
  ["#c4b5fd","#8b5cf6","#2e1065"],
  ["#86efac","#22c55e","#14532d"],
];

/* ── Pre-rendered ball sprites (created once, reused every frame via drawImage) ── */
let _ballSprites = null;
function getBallSprites() {
  if (_ballSprites) return _ballSprites;
  _ballSprites = BALL_COLORS_DATA.map(([c0, c1, c2]) => {
    const oc = document.createElement("canvas");
    oc.width = 22; oc.height = 22;
    const ctx = oc.getContext("2d");
    // outer glow halo
    ctx.beginPath(); ctx.arc(11, 11, 9, 0, Math.PI * 2);
    ctx.fillStyle = c1 + "28"; ctx.fill();
    // main ball with radial gradient
    const rg = ctx.createRadialGradient(9, 9.2, 0, 11, 11, 9);
    rg.addColorStop(0, c0); rg.addColorStop(0.6, c1); rg.addColorStop(1, c2);
    ctx.beginPath(); ctx.arc(11, 11, 6, 0, Math.PI * 2);
    ctx.fillStyle = rg; ctx.fill();
    // specular highlight
    ctx.beginPath(); ctx.arc(9.5, 9.5, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.72)"; ctx.fill();
    return oc;
  });
  return _ballSprites;
}

/* ── Memoized static pegs SVG — only re-renders when rows/geometry changes ── */
const PlinkoPegs = React.memo(function PlinkoPegs({ rows, BOARD_W, PEG_SPACING_X, PEG_SPACING_Y, PEG_R }) {
  const pegs = [];
  for (let row = 0; row < rows; row++) {
    const startX = (BOARD_W - (row + 1) * PEG_SPACING_X) / 2;
    for (let col = 0; col <= row + 1; col++) {
      const x = startX + col * PEG_SPACING_X;
      const y = 20 + row * PEG_SPACING_Y;
      pegs.push(
        <g key={`${row}-${col}`}>
          <circle cx={x} cy={y} r={PEG_R + 4} fill="rgba(124,58,237,.08)" />
          <circle cx={x} cy={y} r={PEG_R} fill="#4c1d95" stroke="rgba(167,139,250,.55)" strokeWidth="1.5" />
          <circle cx={x - 1.5} cy={y - 1.5} r={PEG_R * 0.35} fill="rgba(255,255,255,.45)" />
        </g>
      );
    }
  }
  return <>{pegs}</>;
});

/* ══════════════════════════════════════ PLINKO GAME ════════════════════════════════════════ */
function PlinkoGame({ balance, setBalance, setPage }) {
  const [bet, setBet]           = useState(1.00);
  const [risk, setRisk]         = useState("medium");
  const [rows, setRows]         = useState(16);
  const [lastWin, setLastWin]   = useState(null);
  const [totalWin, setTotalWin] = useState(0);
  const [autoMode, setAutoMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [plStats, setPlStats]   = useState({ profit: 0, wagered: 0, wins: 0, losses: 0, history: [0] });

  // ── Stable refs ──
  const autoRef       = useRef(false);
  const ballIdRef     = useRef(0);
  const betRef        = useRef(bet);
  const balanceRef    = useRef(balance);

  // ── Canvas / DOM refs (zero React re-renders for animation) ──
  const canvasRef           = useRef(null);
  const winPopContainerRef  = useRef(null);
  const ballsCountElRef     = useRef(null);
  const bucketElsRef        = useRef([]);

  // ── Mutable physics state (NOT React state) ──
  const ballsRef    = useRef([]);
  const pegHitsRef  = useRef([]);
  const rafRef      = useRef(null);
  const lastTsRef   = useRef(null);

  // ── Geometry ref — always current, avoids stale closures in stable RAF loop ──
  const geomRef = useRef({});

  useEffect(() => { betRef.current = bet; },         [bet]);
  useEffect(() => { balanceRef.current = balance; }, [balance]);

  // ── Board geometry ──
  const mults         = PLINKO_MULTS[risk][rows];
  const numBuckets    = mults.length;
  const BOARD_W       = Math.min(500, numBuckets * 36 + 20);
  const PEG_SPACING_X = BOARD_W / numBuckets;
  const PEG_SPACING_Y = 28;
  const PEG_R         = 5;
  const BOARD_H       = rows * PEG_SPACING_Y + 24;

  // Update geometry ref synchronously every render (refs are mutable)
  geomRef.current = { BOARD_W, BOARD_H, numBuckets, PEG_SPACING_X, PEG_SPACING_Y };

  // ── Helpers (inline — called only at dropBall time, not in hot loop) ──
  function pegPos(row, col) {
    const { BOARD_W: W, PEG_SPACING_X: SX, PEG_SPACING_Y: SY } = geomRef.current;
    return { x: (W - (row + 1) * SX) / 2 + col * SX, y: 20 + row * SY };
  }

  function buildPegSequence(path) {
    let col = 0;
    return path.map((dir, row) => {
      const pos = pegPos(row, col);
      const entry = { row, col, x: pos.x, y: pos.y, dir };
      col += dir;
      return entry;
    });
  }

  // ── Canvas draw — called from RAF loop, NO React state ──
  const draw = useCallback((ts) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Peg hit rings + burst flash
    const hits = pegHitsRef.current;
    for (let i = 0; i < hits.length; i++) {
      const hit = hits[i];
      const prog = Math.min((ts - hit.startTs) / 320, 1);
      // expanding ring
      ctx.beginPath();
      ctx.arc(hit.x, hit.y, 7 + prog * 15, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(192,132,252,${(0.9 * (1 - prog)).toFixed(2)})`;
      ctx.lineWidth = Math.max(0.3, 2.5 - prog * 2);
      ctx.stroke();
      // initial bright burst
      if (prog < 0.3) {
        const fp = prog / 0.3;
        ctx.beginPath();
        ctx.arc(hit.x, hit.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${(0.85 * (1 - fp)).toFixed(2)})`;
        ctx.fill();
      }
    }

    // Balls — fast drawImage from pre-rendered sprites
    const sprites = getBallSprites();
    const balls = ballsRef.current;
    for (let i = 0; i < balls.length; i++) {
      const b = balls[i];
      ctx.drawImage(sprites[b.id % 8], b.x - 11, b.y - 11, 22, 22);
    }

    // Update ball count display (direct DOM — no setState)
    const countEl = ballsCountElRef.current;
    if (countEl) {
      const n = balls.length;
      countEl.textContent = n;
      countEl.style.color = n > 5 ? "#f5c400" : "#c084fc";
    }
  }, []); // stable — uses only refs

  // ── Bucket flash — imperative DOM, no React state ──
  const flashBucket = useCallback((idx) => {
    const el = bucketElsRef.current[idx];
    if (!el) return;
    const col = el.dataset.col;
    el.style.background = col;
    el.style.boxShadow = `0 0 22px ${col},0 0 44px ${col}66,inset 0 0 10px ${col}44`;
    el.style.animation = "none";
    void el.offsetHeight; // force reflow to restart animation
    el.style.animation = "plBucketHit .4s ease both";
    setTimeout(() => {
      if (el) {
        el.style.background = `${col}bb`;
        el.style.boxShadow = "0 2px 6px rgba(0,0,0,.6)";
        el.style.animation = "";
      }
    }, 500);
  }, []); // stable

  // ── Win pop — imperative DOM, no React state ──
  const spawnWinPop = useCallback((x, val, win) => {
    const container = winPopContainerRef.current;
    if (!container) return;
    const div = document.createElement("div");
    div.style.cssText = `position:absolute;bottom:0;left:${x - 22}px;width:44px;text-align:center;`
      + `font-family:'Space Grotesk',sans-serif;font-weight:900;`
      + `font-size:${val >= 10 ? ".92rem" : ".78rem"};`
      + `color:${val >= 10 ? "#f5c400" : val >= 1 ? "#00ff88" : "#a78bfa"};`
      + `text-shadow:0 0 14px ${val >= 10 ? "rgba(245,196,0,.9)" : val >= 1 ? "rgba(0,255,136,.8)" : "rgba(167,139,250,.8)"};`
      + `animation:plWinPop .95s ease forwards;pointer-events:none;z-index:20;`;
    div.textContent = val >= 1 ? `+$${win.toFixed(2)}` : val + "×";
    container.appendChild(div);
    setTimeout(() => { try { div.remove(); } catch (e) {} }, 1000);
  }, []); // stable

  // ── Main RAF loop — stable, uses geomRef for always-current geometry ──
  const startLoop = useCallback(() => {
    if (rafRef.current) return;
    lastTsRef.current = null;

    const loop = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.033);
      lastTsRef.current = ts;

      const { BOARD_W: W, BOARD_H: H, numBuckets: NB } = geomRef.current;
      let anyActive = false;
      const balls = ballsRef.current;

      // ── Physics: mutate in-place (no object spreading, no array creation) ──
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        if (ball.settled) continue;
        anyActive = true;

        ball.vy += GRAVITY * dt;
        ball.x  += ball.vx * dt;
        ball.y  += ball.vy * dt;

        if (ball.currentPeg < ball.pegSeq.length) {
          const pg = ball.pegSeq[ball.currentPeg];
          if (ball.y >= pg.y - BALL_R * 0.5) {
            ball.x = pg.x + (Math.random() - 0.5) * 8;
            ball.y = pg.y - BALL_R;
            // Register peg hit for canvas ring effect
            pegHitsRef.current.push({ x: pg.x, y: pg.y, startTs: ts, expire: ts + 320 });
            ball.currentPeg++;
            if (ball.currentPeg < ball.pegSeq.length) {
              const nxt = ball.pegSeq[ball.currentPeg];
              const T   = ball.segTimes[ball.currentPeg];
              ball.vx   = (nxt.x - ball.x) / T;
              ball.vy   = (nxt.y - ball.y - 0.5 * GRAVITY * T * T) / T + (Math.random() - 0.5) * 55;
            } else {
              const bx = (W / NB) * (ball.bucketIdx + 0.5);
              const T  = ball.finalT;
              ball.vx  = (bx - ball.x) / T;
              ball.vy  = (H + BALL_R * 2 - ball.y - 0.5 * GRAVITY * T * T) / T;
            }
          }
        }

        // Ball landed
        if (ball.y > H + BALL_R) {
          ball.settled = true;
          ball.done    = true;
          ball.doneAt  = ts;
          ball.y       = H + 3;
          ball.vx      = 0;
          ball.vy      = 0;

          const { bucketIdx, bet: curBet, mult, win } = ball;
          // All side-effects: DOM only, except React state updates for HUD
          flashBucket(bucketIdx);
          spawnWinPop((W / NB) * (bucketIdx + 0.5), mult, win);
          if (win > 0) setBalance(b => +(b + win).toFixed(2));
          setLastWin({ mult, win });
          setTotalWin(t => +(t + win).toFixed(2));
          setPlStats(s => ({
            ...s,
            profit: +(s.profit + win - curBet).toFixed(2),
            [mult >= 1 ? "wins" : "losses"]: s[mult >= 1 ? "wins" : "losses"] + 1,
            history: [...s.history, +(s.profit + win - curBet).toFixed(2)],
          }));
          sfx.ballDrop(mult >= 1);
        }
      }

      // ── Cleanup (filter only when needed) ──
      if (pegHitsRef.current.length > 0) {
        pegHitsRef.current = pegHitsRef.current.filter(p => p.expire > ts);
      }
      // Remove fully faded balls
      let needsClean = false;
      for (let i = 0; i < balls.length; i++) {
        if (balls[i].settled && ts - balls[i].doneAt >= 650) { needsClean = true; break; }
      }
      if (needsClean) {
        ballsRef.current = balls.filter(b => !b.settled || (ts - b.doneAt) < 650);
      }

      // ── Draw everything on canvas — zero React state ──
      draw(ts);

      if (anyActive || ballsRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = null;
        lastTsRef.current = null;
        // Reset count display
        if (ballsCountElRef.current) {
          ballsCountElRef.current.textContent = "0";
          ballsCountElRef.current.style.color = "#c084fc";
        }
      }
    };

    rafRef.current = requestAnimationFrame(loop);
  }, [draw, flashBucket, spawnWinPop, setBalance]); // all stable

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  // ── Drop a ball ──
  function dropBall() {
    const curBet = betRef.current;
    if (curBet > balanceRef.current) return;
    setBalance(b => +(b - curBet).toFixed(2));
    setPlStats(s => ({ ...s, wagered: +(s.wagered + curBet).toFixed(2), history: [...s.history, +(s.profit - curBet).toFixed(2)] }));

    const { BOARD_W: W } = geomRef.current;
    const { path, bucketIdx } = plinkoDrop(rows);
    const mult    = mults[bucketIdx];
    const win     = +(curBet * mult).toFixed(2);
    const ballId  = ++ballIdRef.current;
    const pegSeq  = buildPegSequence(path);
    const segTimes = Array.from({ length: pegSeq.length + 1 }, () => SEG_T * (0.82 + Math.random() * 0.36));
    const finalT  = SEG_T * (0.82 + Math.random() * 0.36);
    const startX  = W / 2 + (Math.random() - 0.5) * 8;
    const startY  = -BALL_R * 3;
    const fp      = pegSeq[0];
    const T0      = segTimes[0];
    const vx0     = (fp.x - startX) / T0;
    const vy0     = (fp.y - startY - 0.5 * GRAVITY * T0 * T0) / T0;

    ballsRef.current.push({
      id: ballId, path, bucketIdx, mult, win, bet: curBet,
      x: startX, y: startY, vx: vx0, vy: vy0,
      pegSeq, segTimes, finalT, currentPeg: 0,
      settled: false, done: false, doneAt: null,
    });
    startLoop();
  }

  useEffect(() => {
    if (!autoMode) return;
    autoRef.current = true;
    const iv = setInterval(() => {
      if (!autoRef.current || betRef.current > balanceRef.current) {
        clearInterval(iv); autoRef.current = false; setAutoMode(false); return;
      }
      dropBall();
    }, 160);
    return () => { clearInterval(iv); autoRef.current = false; };
  }, [autoMode, risk, rows]);

  /* ── Render ── */
  return (
    <div className="pl-game">
      <style>{PLINKO_CSS}</style>
      {showStats && <StatsModal gameName="Plinko" onClose={() => setShowStats(false)} stats={plStats} />}

      {/* Top bar */}
      <div className="pl-top-bar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a onClick={() => setPage("lobby")} style={{ fontSize: ".7rem", color: "rgba(167,139,250,.5)", cursor: "pointer" }}>Home</a>
          <span style={{ color: "rgba(124,58,237,.3)", fontSize: ".6rem" }}>›</span>
          <a onClick={() => setPage("casino")} style={{ fontSize: ".7rem", color: "rgba(167,139,250,.5)", cursor: "pointer" }}>Casino</a>
          <span style={{ color: "rgba(124,58,237,.3)", fontSize: ".6rem" }}>›</span>
          <span style={{ fontSize: ".7rem", color: "rgba(192,132,252,.9)" }}>Plinko</span>
        </div>
        <div className="pl-title">🔮 Plinko</div>
        <div style={{ background: "linear-gradient(145deg,rgba(8,4,28,.95),rgba(4,2,18,.98))", border: "1px solid rgba(124,58,237,.22)", borderRadius: 10, padding: "6px 14px", textAlign: "center" }}>
          <div style={{ fontSize: ".48rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(167,139,250,.4)" }}>Balance</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: ".92rem", fontWeight: 700, color: "#c084fc" }}>${balance.toFixed(2)}</div>
        </div>
      </div>

      <div className="pl-main">
        {/* ── Controls ── */}
        <div className="pl-ctrl">
          <div style={{ display: "flex", flexDirection: "column", gap: 9, height: "100%" }}>
            {/* Bet */}
            <div style={{ padding: "12px 10px 8px", background: "linear-gradient(160deg,rgba(20,8,50,.6),rgba(8,4,22,.5))", borderRadius: 14, border: "1px solid rgba(124,58,237,.15)" }}>
              <div style={{ fontSize: ".52rem", fontWeight: 700, letterSpacing: ".16em", color: "rgba(167,139,250,.45)", textTransform: "uppercase", marginBottom: 8 }}>Bet Amount</div>
              <div style={{ position: "relative", marginBottom: 8 }}>
                <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", fontSize: ".75rem", color: "rgba(167,139,250,.5)", pointerEvents: "none" }}>$</span>
                <input type="number" min={.1} max={100} step={.1} value={bet}
                  onChange={e => setBet(Math.max(.1, Math.min(100, parseFloat(e.target.value) || 1)))}
                  style={{ width: "100%", background: "rgba(5,2,20,.92)", border: "1px solid rgba(124,58,237,.25)", borderRadius: 9, padding: "9px 28px 9px 22px", color: "#c084fc", fontFamily: "'Space Grotesk',sans-serif", fontSize: ".92rem", fontWeight: 700, outline: "none", textAlign: "center", MozAppearance: "textfield" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                {["½", "2×", "5×", "MAX"].map(v => (
                  <button key={v} className="pl-row-btn" onClick={() => {
                    sfx.tick();
                    if (v === "½") setBet(b => Math.max(.1, +(b / 2).toFixed(2)));
                    else if (v === "2×") setBet(b => Math.min(100, +(b * 2).toFixed(2)));
                    else if (v === "5×") setBet(b => Math.min(100, +(b * 5).toFixed(2)));
                    else setBet(Math.min(100, Math.floor(balance * 10) / 10));
                  }}>{v}</button>
                ))}
              </div>
            </div>
            {/* Risk */}
            <div>
              <div style={{ fontSize: ".52rem", fontWeight: 700, letterSpacing: ".14em", color: "rgba(167,139,250,.45)", textTransform: "uppercase", marginBottom: 6 }}>Risk</div>
              <div className="pl-risk-row">
                {["low", "medium", "high"].map(r => (
                  <button key={r} className={`pl-risk-btn${risk === r ? " on" : ""}`} onClick={() => { sfx.tick(); setRisk(r); }} style={{ textTransform: "capitalize" }}>{r}</button>
                ))}
              </div>
            </div>
            {/* Rows */}
            <div>
              <div style={{ fontSize: ".52rem", fontWeight: 700, letterSpacing: ".14em", color: "rgba(167,139,250,.45)", textTransform: "uppercase", marginBottom: 6 }}>Rows</div>
              <div className="pl-rows-row">
                {[8, 10, 12, 14, 16].map(r => (
                  <button key={r} className={`pl-row-btn${rows === r ? " on" : ""}`} onClick={() => { sfx.tick(); setRows(r); }}>{r}</button>
                ))}
              </div>
            </div>
            {/* Stats row */}
            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ flex: 1, background: "rgba(5,2,20,.75)", border: "1px solid rgba(124,58,237,.1)", borderRadius: 10, padding: "7px 8px", textAlign: "center" }}>
                <div style={{ fontSize: ".48rem", color: "rgba(167,139,250,.4)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>Max Win</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: ".88rem", fontWeight: 700, color: "#f5c400", marginTop: 1 }}>{Math.max(...mults)}×</div>
              </div>
              <div style={{ flex: 1, background: "rgba(5,2,20,.75)", border: "1px solid rgba(124,58,237,.1)", borderRadius: 10, padding: "7px 8px", textAlign: "center" }}>
                <div style={{ fontSize: ".48rem", color: "rgba(167,139,250,.4)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>Balls</div>
                {/* Direct DOM ref for count — no React re-render */}
                <div ref={ballsCountElRef} style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: ".88rem", fontWeight: 700, color: "#c084fc", marginTop: 1 }}>0</div>
              </div>
            </div>
            <div style={{ flex: 1 }} />
            <button className={`pl-auto-btn${autoMode ? " on" : ""}`} onClick={() => {
              if (autoMode) { autoRef.current = false; setAutoMode(false); }
              else { sfx.click(); setAutoMode(true); }
            }}>
              <span>{autoMode ? "⏹ Stop Auto" : "▶▶ Auto Drop"}</span>
              <span style={{ fontSize: ".6rem", opacity: .6 }}>{autoMode ? "running" : "off"}</span>
            </button>
            <button className="pl-spin-btn" disabled={bet > balance || autoMode} onClick={() => { sfx.click(); dropBall(); }}>▼  DROP</button>
            <button className="sm-btn" onClick={() => setShowStats(true)} style={{ width: "100%", justifyContent: "center", background: "rgba(124,58,237,.07)", borderColor: "rgba(124,58,237,.18)", color: "rgba(167,139,200,.65)", fontFamily: "var(--f)", fontSize: ".7rem", padding: "8px", borderRadius: 10 }}>📊 Stats &amp; History</button>
          </div>
        </div>

        {/* ── Arena ── */}
        <div className="pl-arena">
          {/* Board: SVG (static pegs) + Canvas overlay (balls + effects) */}
          <div
            className="pl-board"
            ref={winPopContainerRef}
            style={{ width: BOARD_W, position: "relative" }}
          >
            <svg width={BOARD_W} height={BOARD_H} style={{ display: "block", overflow: "visible" }}>
              <PlinkoPegs
                rows={rows}
                BOARD_W={BOARD_W}
                PEG_SPACING_X={PEG_SPACING_X}
                PEG_SPACING_Y={PEG_SPACING_Y}
                PEG_R={PEG_R}
              />
            </svg>
            {/*
              Canvas is absolutely positioned to overlay the SVG exactly.
              .pl-board has padding: 12px 10px 4px, so SVG content starts at (10px, 12px).
              Canvas matches that offset so coordinates align perfectly.
            */}
            <canvas
              ref={canvasRef}
              width={BOARD_W}
              height={BOARD_H}
              style={{ position: "absolute", top: "12px", left: "10px", pointerEvents: "none", overflow: "visible" }}
            />
          </div>

          {/* Buckets — refs stored for imperative flash, no hitBuckets state */}
          <div className="pl-buckets" style={{ width: BOARD_W }}>
            {mults.map((m, i) => {
              const col = plinkoBucketColor(m);
              return (
                <div
                  key={i}
                  ref={el => bucketElsRef.current[i] = el}
                  data-col={col}
                  className="pl-bucket"
                  style={{ background: `${col}bb`, boxShadow: "0 2px 6px rgba(0,0,0,.6)", border: `1px solid ${col}` }}
                >
                  <div style={{ fontSize: m >= 100 ? ".5rem" : m >= 10 ? ".58rem" : ".65rem", fontWeight: 900, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,.7)", lineHeight: 1.2, fontFamily: "'Space Grotesk',sans-serif" }}>{m}×</div>
                </div>
              );
            })}
          </div>

          {/* HUD */}
          <div className="pl-hud" style={{ maxWidth: BOARD_W + 20, width: "100%", marginTop: 8 }}>
            <div className="pl-hud-box"><div className="pl-hud-lbl">Bet</div><div className="pl-hud-val">${bet.toFixed(2)}</div></div>
            <div className="pl-hud-box"><div className="pl-hud-lbl">Last Win</div><div className={`pl-hud-val${lastWin ? lastWin.mult >= 1 ? " green" : " red" : ""}`}>{lastWin ? `${lastWin.mult}× ($${lastWin.win.toFixed(2)})` : "—"}</div></div>
            <div className="pl-hud-box"><div className="pl-hud-lbl">Total Win</div><div className={`pl-hud-val${totalWin > 0 ? " green" : ""}`}>{totalWin > 0 ? `$${totalWin.toFixed(2)}` : "$0.00"}</div></div>
            <div className="pl-hud-box"><div className="pl-hud-lbl">Risk / Rows</div><div className="pl-hud-val" style={{ fontSize: ".75rem", textTransform: "capitalize" }}>{risk} / {rows}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════ GAME DEFS ════════════════════════════════════════ */
const GAME_DEFS=[
  {id:"plinko",name:"Plinko",tags:[{t:"ORIGINALS",c:"rgba(220,38,38,.8)"},{t:"HOT",c:"rgba(245,196,0,.85)"}],rtp:97.0,hot:true,Art:PlinkoArt,desc:"Drop the ball, win big",players:"9,440"},
  {id:"hilo",name:"Hi-Lo",tags:[{t:"ORIGINALS",c:"rgba(220,38,38,.8)"},{t:"CARDS",c:"rgba(124,58,237,.85)"}],rtp:95.5,hot:true,Art:HiLoArt,desc:"Predict higher or lower",players:"2,841"},
  {id:"mines",name:"Mines",tags:[{t:"ORIGINALS",c:"rgba(220,38,38,.8)"}],rtp:95.5,hot:false,Art:MinesArt,desc:"Avoid bombs, collect gems",players:"5,120"},
  {id:"dice",name:"Dice",tags:[{t:"ORIGINALS",c:"rgba(220,38,38,.8)"}],rtp:95.5,hot:false,Art:DiceArt,desc:"Classic crypto dice game",players:"3,390"},
  {id:"blackjack",name:"Blackjack",tags:[{t:"ORIGINALS",c:"rgba(220,38,38,.8)"},{t:"CARDS",c:"rgba(124,58,237,.85)"}],rtp:95.5,hot:false,Art:BlackjackArt,desc:"Beat the dealer to 21",players:"1,940"},
  {id:"crash",name:"Crash",tags:[{t:"ORIGINALS",c:"rgba(220,38,38,.8)"}],rtp:95.5,hot:true,Art:CrashArt,desc:"Cash out before it crashes",players:"4,210"},
  {id:"wheel",name:"Wheel",tags:[{t:"ORIGINALS",c:"rgba(220,38,38,.8)"}],rtp:95.5,hot:false,Art:WheelArt,desc:"Spin the wheel of fortune",players:"2,680"},
  {id:"videopoker",name:"Video Poker",tags:[{t:"ORIGINALS",c:"rgba(220,38,38,.8)"},{t:"CARDS",c:"rgba(124,58,237,.85)"}],rtp:95.5,hot:true,Art:VideoPokerArt,desc:"Jacks or Better",players:"1,380"},
  {id:"keno",name:"Keno",tags:[{t:"ORIGINALS",c:"rgba(220,38,38,.8)"}],rtp:95.5,hot:true,Art:KenoArt,desc:"Pick numbers, win big",players:"2,940"},
  {id:"coinflip",name:"Coinflip",tags:[{t:"ORIGINALS",c:"rgba(220,38,38,.8)"},{t:"HOT",c:"rgba(245,196,0,.85)"}],rtp:97.0,hot:true,Art:CoinflipArt,desc:"Heads or tails, double up",players:"3,820"},
  {id:"gatesolympus",name:"Gates of Olympus",tags:[{t:"SLOTS",c:"rgba(100,60,220,.85)"},{t:"HOT",c:"rgba(245,196,0,.85)"}],rtp:96.5,hot:true,Art:GatesOfOlympusArt,desc:"6×5 · Cluster Pays · Persistent Multiplier",players:"11,240",bonusBuy:"100×"},
  {id:"lebandit",name:"Le Bandit",tags:[{t:"ORIGINALS",c:"rgba(220,38,38,.8)"},{t:"HOT",c:"rgba(245,196,0,.85)"}],rtp:96.34,hot:true,Art:LeBanditArt,desc:"Cluster pays · Golden Squares",players:"6,140"},
  {id:"doghouse",name:"The Dog House",tags:[{t:"SLOTS",c:"rgba(34,120,34,.85)"},{t:"HOT",c:"rgba(245,196,0,.85)"}],rtp:96.51,hot:true,Art:DogHouseArt,desc:"5×3 · Sticky Wilds · Free Spins",players:"4,870",bonusBuy:"100×"},
  {id:"sweetbonanza",name:"Sweet Bonanza",tags:[{t:"SLOTS",c:"rgba(233,30,140,.85)"},{t:"HOT",c:"rgba(245,196,0,.85)"}],rtp:96.51,hot:true,Art:SweetBonanzaArt,desc:"6×5 · Cluster Pays · Tumble",players:"8,320",bonusBuy:"100×"},
  {id:"cloudprincess",name:"Cloud Princess",tags:[{t:"SLOTS",c:"rgba(180,100,255,.85)"},{t:"NEW",c:"rgba(0,200,150,.85)"}],rtp:96.48,hot:true,Art:CloudPrincessArt,desc:"6×5 · Scatter Pays · Cascading Multipliers",players:"7,650",bonusBuy:"100×"},
];

const LIVE_WINNERS=[
  {game:"Crash",user:"vaultmax",bet:500,mult:31.2,color:"#00d4ff"},
  {game:"Hi-Lo",user:"ghost_x",bet:50,mult:8.4,color:"#7c3aed"},
  {game:"Keno",user:"astro_k",bet:200,mult:22,color:"#00ff88"},
  {game:"Mines",user:"neon_wolf",bet:100,mult:5.5,color:"#dc2626"},
  {game:"Wheel",user:"spin_ace",bet:200,mult:2.73,color:"#f5c400"},
  {game:"Dice",user:"vaultmax",bet:200,mult:12.2,color:"#0ea5e9"},
  {game:"Keno",user:"whale_01",bet:500,mult:110,color:"#00ff88"},
  {game:"Hi-Lo",user:"ultra_v",bet:500,mult:22,color:"#7c3aed"},
  {game:"Crash",user:"whale_01",bet:1000,mult:204,color:"#00d4ff"},
  {game:"Mines",user:"shadow99",bet:75,mult:44.2,color:"#dc2626"},
];

/* ══════════════════════════════════════ SCROLLABLE GAME ROW ═════════════════════ */
function GameRow({ title, games, setPage, badge, emoji }){
  const scrollRef = useRef(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(true);

  const checkScroll = useCallback(()=>{
    const el = scrollRef.current;
    if(!el) return;
    setCanL(el.scrollLeft > 4);
    setCanR(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  },[]);

  useEffect(()=>{ checkScroll(); },[checkScroll]);

  const scroll = (dir)=>{
    const el = scrollRef.current;
    if(!el) return;
    sfx.tick();
    el.scrollBy({ left: dir * 320, behavior:"smooth" });
    setTimeout(checkScroll, 350);
  };

  return(
    <div className="vl-section">
      <div className="vl-sec-head">
        <div className="vl-sec-title">
          {emoji&&<span className="vl-sec-emoji">{emoji}</span>}
          {title}
          {badge&&<span className="vl-sec-badge">{badge}</span>}
        </div>
        <div className="vl-sec-right">
          <button className="vl-view-all" onClick={()=>{sfx.nav();setPage("casino");}}>View All</button>
          <button className="vl-arrow" disabled={!canL} onClick={()=>scroll(-1)}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" width="14" height="14"><path d="M12 4l-6 6 6 6"/></svg>
          </button>
          <button className="vl-arrow" disabled={!canR} onClick={()=>scroll(1)}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" width="14" height="14"><path d="M8 4l6 6-6 6"/></svg>
          </button>
        </div>
      </div>
      <div className="vl-scroll-wrap">
        {canL && <div className="vl-fade vl-fade-l"/>}
        {canR && <div className="vl-fade vl-fade-r"/>}
        <div className="vl-scroll" ref={scrollRef} onScroll={checkScroll}>
          {games.map(g=>(
            <div key={g.id} className="vl-card" onClick={()=>{sfx.nav();setPage(g.id);}}>
              <div className="vl-card-art"><g.Art/></div>
              <div className="vl-card-bottom">
                <div className="vl-card-name">{g.name}</div>
                <div className="vl-card-pub">VAULT</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════ LOBBY ════════════════════════════════════ */
function Lobby({setPage}){
  const [tab, setTab] = useState("lobby");
  const [search, setSearch] = useState("");

  const ORIGINALS = GAME_DEFS.filter(g=> g.tags.some(t=>t.t==="ORIGINALS"));
  const SLOTS = GAME_DEFS.filter(g=> g.tags.some(t=>t.t==="SLOTS"));
  const HOT = GAME_DEFS.filter(g=> g.hot);

  const TABS = [
    {id:"lobby",label:"Lobby",ico:"🎰"},
    {id:"vault",label:"Vault Games",ico:"⚡"},
    {id:"slots",label:"Slots",ico:"🎲"},
    {id:"popular",label:"Popular Games",ico:"🔥"},
  ];

  const filtered = search.trim()
    ? GAME_DEFS.filter(g=> g.name.toLowerCase().includes(search.toLowerCase()))
    : null;

  const randomGame = ()=>{
    sfx.click();
    const g = GAME_DEFS[Math.floor(Math.random()*GAME_DEFS.length)];
    setPage(g.id);
  };

  return(
    <div className="vl-lobby">

      {/* ══ HERO BANNERS ══ */}
      <div className="vl-heroes">
        <div className="vl-hero" onClick={()=>{sfx.nav();setPage("vip");}}>
          <div className="vl-hero-bg" style={{background:"linear-gradient(135deg,#080020 0%,#1e0060 50%,#280880 100%)"}}/>
          <div className="vl-hero-overlay"/>
          <div className="vl-hero-art">
            <svg viewBox="0 0 200 190" fill="none" style={{width:"100%",height:"100%"}}>
              <defs>
                <radialGradient id="vlGlow1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(245,196,0,.35)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
                <radialGradient id="vlCoinG" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#ffe566"/><stop offset="100%" stopColor="#c97d00"/></radialGradient>
                <filter id="vlBlur1"><feGaussianBlur stdDeviation="7"/></filter>
                <filter id="vlSh1"><feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="rgba(0,0,0,.8)"/></filter>
              </defs>
              <ellipse cx="100" cy="95" rx="75" ry="65" fill="url(#vlGlow1)" filter="url(#vlBlur1)"/>
              <path d="M55 105 L55 75 L75 90 L100 55 L125 90 L145 75 L145 105 Z" fill="url(#vlCoinG)" opacity=".92" filter="url(#vlSh1)"/>
              <rect x="50" y="103" width="100" height="16" rx="4" fill="url(#vlCoinG)" opacity=".9"/>
              <circle cx="100" cy="62" r="6" fill="#e040fb" opacity=".95"/>
              <circle cx="75" cy="88" r="4.5" fill="#00d4ff" opacity=".9"/>
              <circle cx="125" cy="88" r="4.5" fill="#00ff88" opacity=".9"/>
              {[0,1,2,3].map(n=>(<ellipse key={n} cx="35" cy={148-n*7} rx="16" ry="6" fill={`hsl(42,85%,${48+n*4}%)`} opacity=".88"/>))}
              <ellipse cx="35" cy="120" rx="16" ry="6" fill="#ffe566" opacity=".95"/>
              <polygon points="100,135 114,148 100,162 86,148" fill="#c084fc" opacity=".7"/>
            </svg>
          </div>
          <div className="vl-hero-content">
            <div className="vl-hero-timer">🕐 28d 3h</div>
            <div className="vl-hero-title">VIP Transfers Now Live</div>
            <div className="vl-hero-sub">Instant status transfer. Unlock perks from day one.</div>
            <button className="vl-hero-cta" style={{background:"linear-gradient(135deg,#a855f7,#c084fc)",color:"#fff",boxShadow:"0 4px 22px rgba(168,85,247,.5)"}}>
              Claim Now
            </button>
          </div>
        </div>

        <div className="vl-hero" onClick={()=>{sfx.nav();setPage("promo");}}>
          <div className="vl-hero-bg" style={{background:"linear-gradient(135deg,#000d20 0%,#002855 50%,#003060 100%)"}}/>
          <div className="vl-hero-overlay"/>
          <div className="vl-hero-art">
            <svg viewBox="0 0 200 190" fill="none" style={{width:"100%",height:"100%"}}>
              <defs>
                <radialGradient id="vlGlow2" cx="50%" cy="45%" r="55%"><stop offset="0%" stopColor="rgba(124,58,237,.32)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
                <radialGradient id="vlCrystal" cx="35%" cy="28%" r="65%"><stop offset="0%" stopColor="#e0c3fc"/><stop offset="45%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#5b21b6"/></radialGradient>
                <filter id="vlBlur2"><feGaussianBlur stdDeviation="8"/></filter>
                <filter id="vlSh2"><feDropShadow dx="2" dy="6" stdDeviation="12" floodColor="rgba(0,0,0,.85)"/></filter>
                <linearGradient id="vlCardB" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2d1270"/><stop offset="100%" stopColor="#0e0428"/></linearGradient>
                <linearGradient id="vlCardF" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fffafa"/><stop offset="100%" stopColor="#ffe8e8"/></linearGradient>
              </defs>
              <ellipse cx="105" cy="92" rx="78" ry="68" fill="url(#vlGlow2)" filter="url(#vlBlur2)"/>
              {[3,2,1].map(n=>(<rect key={n} x={48+n*6} y={32-n*5} width="68" height="96" rx="8" fill="url(#vlCardB)" stroke="rgba(167,139,250,.35)" strokeWidth="1.2" transform={`rotate(${-16+n*10} 82 80)`} opacity={.55+n*.15}/>))}
              <rect x="78" y="28" width="68" height="96" rx="8" fill="url(#vlCardF)" stroke="rgba(255,255,255,.9)" strokeWidth="1.5" transform="rotate(10 112 76)" filter="url(#vlSh2)"/>
              <text x="84" y="48" fontFamily="Georgia,serif" fontSize="13" fontWeight="700" fill="#9b1c1c" transform="rotate(10 112 76)">A</text>
              <text x="116" y="88" fontFamily="Georgia,serif" fontSize="30" fill="#9b1c1c" textAnchor="middle" transform="rotate(10 112 76)">♥</text>
              <ellipse cx="158" cy="52" rx="22" ry="22" fill="rgba(124,58,237,.25)"/>
              <polygon points="158,22 172,45 162,68 154,68 144,45" fill="url(#vlCrystal)" opacity=".92"/>
              <rect x="38" y="62" width="72" height="22" rx="7" fill="rgba(124,58,237,.85)"/>
              <text x="74" y="76" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontSize="9" fontWeight="800" fill="white" letterSpacing="1.5">FREE SPINS</text>
            </svg>
          </div>
          <div className="vl-hero-content">
            <div className="vl-hero-timer">🕐 3d 1h</div>
            <div className="vl-hero-title">$150,000 March Mayhem</div>
            <div className="vl-hero-sub">Total madness across four thrilling rounds!</div>
            <button className="vl-hero-cta" style={{background:"linear-gradient(135deg,#0ea5e9,#00d4ff)",color:"#001830",boxShadow:"0 4px 22px rgba(0,212,255,.4)"}}>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* ══ CATEGORY TABS ══ */}
      <div className="vl-tabs-row">
        {TABS.map(t=>(
          <button key={t.id} className={`vl-tab${tab===t.id?" on":""}`} onClick={()=>{sfx.tick();setTab(t.id);}}>
            <span className="vl-tab-ico">{t.ico}</span>{t.label}
          </button>
        ))}
      </div>

      {/* ══ SEARCH BAR ══ */}
      <div className="vl-search-row">
        <div className="vl-search-box">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" width="16" height="16"><circle cx="9" cy="9" r="5.5"/><path d="M13.5 13.5L17 17" strokeLinecap="round"/></svg>
          <input
            type="text" placeholder="Search games"
            value={search} onChange={e=>setSearch(e.target.value)}
          />
        </div>
        <button className="vl-random-btn" onClick={randomGame}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="14" height="14"><path d="M4 4l12 12M4 16L16 4" strokeLinecap="round"/></svg>
          Random
        </button>
      </div>

      {/* ══ SEARCH RESULTS ══ */}
      {filtered && (
        <div className="vl-section">
          <div className="vl-sec-head">
            <div className="vl-sec-title">Search Results</div>
          </div>
          <div className="vl-search-grid">
            {filtered.length===0 && <div style={{color:"var(--tx3)",fontSize:".82rem",padding:"20px 0"}}>No games found</div>}
            {filtered.map(g=>(
              <div key={g.id} className="vl-card" onClick={()=>{sfx.nav();setPage(g.id);}}>
                <div className="vl-card-art"><g.Art/></div>
                <div className="vl-card-bottom">
                  <div className="vl-card-name">{g.name}</div>
                  <div className="vl-card-pub">VAULT</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ GAME ROWS ══ */}
      {!filtered && <>
        <GameRow title="Vault Originals" emoji="⚡" games={ORIGINALS} setPage={setPage}/>
        <GameRow title="Popular Slots" emoji="🎰" badge="HOT" games={SLOTS} setPage={setPage}/>
        <GameRow title="Trending Now" emoji="🔥" games={HOT} setPage={setPage}/>

        {/* ══ LIVE WINS ══ */}
        <div className="vl-section">
          <div className="vl-sec-head">
            <div className="vl-sec-title">
              <span className="vl-sec-emoji">🏅</span>
              Live Wins
              <span className="vl-sec-badge vl-live-badge">LIVE</span>
            </div>
          </div>
          <div className="vl-feed">
            {LIVE_WINNERS.map((w,i)=>(
              <div key={i} className="vl-feed-item">
                <div className="vl-fi-avatar" style={{background:`${w.color}22`,border:`1px solid ${w.color}40`,color:w.color}}>
                  {w.user.slice(0,2).toUpperCase()}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div className="vl-fi-game">{w.game}</div>
                  <div className="vl-fi-user">{w.user}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div className="vl-fi-mult">{w.mult}×</div>
                  <div className="vl-fi-amt">+${(w.bet*w.mult).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>}

      <div style={{height:32}}/>
    </div>
  );
}

export { PlinkoGame, Lobby, GAME_DEFS }
