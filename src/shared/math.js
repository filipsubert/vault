// ── Game mathematics & RNG ────────────────────────────────────────────────────
/* ══════════════════════════════════════ MATH ═══════════════════════════════════════ */
const RANKS = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const SUITS = ["♠","♥","♦","♣"];
const RV = {A:1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,J:11,Q:12,K:13};
const RED = new Set(["♥","♦"]);
const randCard = () => ({rank:RANKS[Math.floor(Math.random()*13)],suit:SUITS[Math.floor(Math.random()*4)]});

// Higher or Same: P(next >= current) = (13 - v + 1) / 13
function pHiOrSame(rank){ return (14 - RV[rank]) / 13; }
// Lower or Same: P(next <= current) = v / 13
function pLoOrSame(rank){ return RV[rank] / 13; }
const RTP = 0.955; // 95.5% RTP — 4.5% house edge
function toMult(p){ if(p<=0)return 999; return Math.max(1.01,parseFloat((RTP/p).toFixed(3))); }

/* Mine math */
function seededRng(seed){let s=(seed^0xdeadbeef)>>>0;return()=>{s^=s<<13;s^=s>>17;s^=s<<5;return(s>>>0)/4294967296};}
function genMines(count,seed){const rng=seededRng(seed),a=Array.from({length:25},(_,i)=>i);for(let i=24;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return new Set(a.slice(0,count));}
function calcMult(mines,rev){if(rev===0)return 1.0;let p=1;for(let i=0;i<rev;i++)p*=(25-mines-i)/(25-i);return Math.max(1.0,parseFloat((0.955/p).toFixed(4)));}


export { RANKS, SUITS, RV, RED, randCard, pHiOrSame, pLoOrSame, RTP, toMult, seededRng, genMines, calcMult };
