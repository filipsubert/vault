import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { RTP, RANKS, SUITS, RV, RED, randCard, pHiOrSame, pLoOrSame, toMult, seededRng, genMines, calcMult } from "../shared/math.js";
import { StatsModal } from "../components/StatsModal.jsx";
import { CSS_MINES } from "../shared/css_mines.js";

// ── Juice CSS — pridané animácie, layout sa NEDOTÝKA (ten je v CSS_MINES) ─────
const JUICE_CSS = `
/* Tile hover */
.tile:not(.dis):hover {
  transform: scale(1.07) !important;
  border-color: rgba(167,139,250,.55) !important;
  box-shadow: 0 0 18px rgba(167,139,250,.28), inset 0 0 10px rgba(167,139,250,.06) !important;
  transition: transform .13s cubic-bezier(.34,1.56,.64,1), box-shadow .13s, border-color .13s !important;
}
.tile:not(.dis):active { transform: scale(.96) !important; }

/* Idle dot */
.idle-dot { animation: idlePulse 2.4s ease-in-out infinite !important; }
@keyframes idlePulse {
  0%,100% { transform: scale(1);    opacity: .28; }
  50%      { transform: scale(1.55); opacity: .65; }
}

/* Gem tile */
.tile.safe {
  background: radial-gradient(circle at 50% 40%, rgba(0,255,136,.1), rgba(0,30,15,.35)) !important;
  border-color: rgba(0,255,136,.5) !important;
  box-shadow: 0 0 18px rgba(0,255,136,.25), inset 0 0 10px rgba(0,255,136,.07) !important;
  animation: gemReveal .28s cubic-bezier(.34,1.56,.64,1) !important;
}
@keyframes gemReveal {
  0%   { transform: scale(0) rotate(-12deg); opacity: 0; }
  60%  { transform: scale(1.1) rotate(2deg); }
  100% { transform: scale(1) rotate(0);      opacity: 1; }
}

/* Mine tile */
.tile.mine {
  background: radial-gradient(circle at 50% 40%, rgba(239,68,68,.18), rgba(40,0,0,.4)) !important;
  border-color: rgba(239,68,68,.7) !important;
  box-shadow: 0 0 26px rgba(239,68,68,.5), inset 0 0 12px rgba(239,68,68,.1) !important;
  animation: mineExplode .38s ease !important;
}
@keyframes mineExplode {
  0%   { transform: scale(1); }
  28%  { transform: scale(1.26) rotate(4deg); }
  55%  { transform: scale(.91) rotate(-3deg); }
  78%  { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Hint tiles */
.tile.hint, .tile.hint-co {
  background: rgba(239,68,68,.05) !important;
  border-color: rgba(239,68,68,.25) !important;
  animation: hintReveal .3s ease both !important;
}
@keyframes hintReveal {
  from { opacity: 0; transform: scale(.76); }
  to   { opacity: 1; transform: scale(1); }
}

/* Grid shake */
.mgrid.sh { animation: gridShake .45s ease !important; }
@keyframes gridShake {
  0%,100% { transform: translateX(0) rotate(0); }
  15%     { transform: translateX(-7px) rotate(-.5deg); }
  30%     { transform: translateX(7px)  rotate(.5deg); }
  48%     { transform: translateX(-5px) rotate(-.3deg); }
  65%     { transform: translateX(4px)  rotate(.2deg); }
  80%     { transform: translateX(-2px); }
}

/* Multiplier pop */
@keyframes mPop {
  0%   { transform: scale(.78) translateY(5px); opacity: .45; }
  55%  { transform: scale(1.15) translateY(-2px); }
  80%  { transform: scale(.97); }
  100% { transform: scale(1) translateY(0);      opacity: 1; }
}

/* Cashout button pulse */
.cta.cash { animation: cashPulse 1.7s ease-in-out infinite !important; }
.cta.cash:hover { animation: none !important; transform: translateY(-2px) !important; }
@keyframes cashPulse {
  0%,100% { box-shadow: 0 4px 18px rgba(245,158,11,.28), 0 0 0 0 rgba(245,158,11,.38); }
  50%     { box-shadow: 0 4px 18px rgba(245,158,11,.28), 0 0 0 8px rgba(245,158,11,0); }
}

/* Progress bar glow */
.pb-f {
  box-shadow: 0 0 8px rgba(52,211,153,.7) !important;
  transition: width .35s cubic-bezier(.34,1.56,.64,1) !important;
}

/* Burst particles */
.tile-burst { position: absolute; inset: 0; pointer-events: none; z-index: 10; }
.burst-p {
  position: absolute; top: 50%; left: 50%;
  border-radius: 50%;
  animation: burstFly .55s ease-out forwards;
}
@keyframes burstFly {
  0%   { transform: translate(-50%,-50%) rotate(var(--a,0deg)) translateX(0);    opacity: 1; }
  100% { transform: translate(-50%,-50%) rotate(var(--a,0deg)) translateX(28px); opacity: 0; }
}

/* Flash */
.fl-r, .fl-g { animation: flFlash .6s ease forwards !important; }
@keyframes flFlash { 0% { opacity: 1; } 100% { opacity: 0; } }

/* Toast */
.cashpop { animation: toastIn 2.3s ease forwards !important; }
@keyframes toastIn {
  0%   { opacity: 0; transform: translateX(-50%) translateY(-18px) scale(.82); }
  11%  { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1.04); }
  17%  {             transform: translateX(-50%) translateY(0)     scale(1); }
  76%  { opacity: 1; }
  100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
}

/* Streak dot */
.streak-dot { animation: streakBlink .75s ease-in-out infinite !important; }
@keyframes streakBlink {
  0%,100% { opacity: 1;  transform: scale(1); }
  50%     { opacity: .2; transform: scale(.65); }
}

/* Grid overlay */
.gov { animation: ovIn .3s cubic-bezier(.34,1.56,.64,1) !important; }
@keyframes ovIn {
  from { opacity: 0; transform: scale(.91); }
  to   { opacity: 1; transform: scale(1); }
}
`;

/* ══════════════════════════════════════ MINES GAME ════════════════════════════════ */
function GemSVG({size=44}){
  return(
    <svg width={size} height={size} viewBox="0 0 44 44" className="gico" fill="none">
      <defs>
        <radialGradient id="gemG" cx="32%" cy="25%" r="65%">
          <stop offset="0%" stopColor="rgba(140,255,200,.95)"/>
          <stop offset="40%" stopColor="rgba(0,255,136,.85)"/>
          <stop offset="100%" stopColor="rgba(0,110,55,.5)"/>
        </radialGradient>
        <filter id="gemGlow"><feGaussianBlur stdDeviation="2.5"/></filter>
      </defs>
      <polygon points="22,3 38,14 38,30 22,41 6,30 6,14" fill="rgba(0,255,136,.2)" filter="url(#gemGlow)"/>
      <polygon points="22,4 37,14.5 37,29.5 22,40 7,29.5 7,14.5" fill="url(#gemG)" stroke="rgba(0,255,136,.65)" strokeWidth="1"/>
      <polygon points="22,4 37,14.5 22,21 7,14.5" fill="rgba(180,255,220,.6)"/>
      <polygon points="22,21 37,14.5 37,29.5 22,40" fill="rgba(0,180,90,.25)"/>
      <polygon points="22,21 7,14.5 7,29.5 22,40" fill="rgba(0,255,136,.38)"/>
      <line x1="7" y1="14.5" x2="22" y2="21" stroke="rgba(0,255,136,.4)" strokeWidth=".6"/>
      <line x1="37" y1="14.5" x2="22" y2="21" stroke="rgba(255,255,255,.2)" strokeWidth=".6"/>
      <circle cx="15" cy="10" r="2.8" fill="rgba(255,255,255,.75)"/>
      <circle cx="25" cy="7" r="1.4" fill="rgba(255,255,255,.5)"/>
      <circle cx="29" cy="33" r="1" fill="rgba(0,255,136,.45)"/>
    </svg>
  );
}

function BombSVG({size=44}){
  return(
    <svg width={size} height={size} viewBox="0 0 44 44" className="bico" fill="none">
      <defs>
        <radialGradient id="bombG" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="rgba(255,100,100,.95)"/>
          <stop offset="50%" stopColor="rgba(239,68,68,.85)"/>
          <stop offset="100%" stopColor="rgba(140,10,10,.7)"/>
        </radialGradient>
        <filter id="bombGlow"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      <circle cx="23" cy="27" r="15" fill="rgba(239,68,68,.18)" filter="url(#bombGlow)"/>
      <circle cx="23" cy="27" r="13" fill="rgba(239,68,68,.12)" stroke="rgba(239,68,68,.4)" strokeWidth="1.2"/>
      <circle cx="23" cy="27" r="10" fill="url(#bombG)"/>
      <circle cx="23" cy="27" r="6" fill="rgba(180,0,0,.5)"/>
      <circle cx="18" cy="22" r="2.8" fill="rgba(255,255,255,.32)"/>
      <circle cx="20" cy="20" r="1.2" fill="rgba(255,255,255,.5)"/>
      <path d="M23 14 Q31 6 39 9" stroke="#f5c400" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <circle cx="39.5" cy="8.5" r="3.5" fill="#f5c400" opacity=".92"/>
      <circle cx="39.5" cy="8.5" r="2" fill="#fff8c0"/>
      <line x1="13" y1="20" x2="17" y2="23" stroke="rgba(255,255,255,.2)" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="10" y1="27" x2="14" y2="27" stroke="rgba(255,255,255,.15)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="35" x2="17" y2="32" stroke="rgba(255,255,255,.15)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function MinesGame({balance,setBalance,setPage}){
  const [tab,setTab]=useState("manual");
  const [bet,setBet]=useState(10);
  const [mines,setMines]=useState(3);
  const [status,setStatus]=useState("idle");
  const [tiles,setTiles]=useState(Array(25).fill("idle"));
  const [mineSet,setMineSet]=useState(new Set());
  const [rev,setRev]=useState(0);
  const [mult,setMult]=useState(1.0);
  const [multKey,setMultKey]=useState(0);
  const [seed,setSeed]=useState(null);
  const [flash,setFlash]=useState(null);
  const [toast,setToast]=useState(null);
  const [shaking,setShaking]=useState(false);
  const [history,setHistory]=useState([]);
  const [showStats,setShowStats]=useState(false);
  const [mnStats,setMnStats]=useState({profit:0,wagered:0,wins:0,losses:0,history:[0]});
  const [burstTile,setBurstTile]=useState(null); // ← juice only

  const MOPTS=[1,2,3,5,7,10,15,20,24];
  const isP=status==="playing",isDone=status==="bust"||status==="cashout";
  const winAmt=+(bet*mult).toFixed(2),nextMult=calcMult(mines,rev+1),profit=+(winAmt-bet).toFixed(2);
  const pct=Math.min((rev/Math.max(25-mines,1))*100,100);

  function start(){
    if(bet<=0||bet>balance)return; sfx.start();
    const s=(Date.now()^(Math.random()*0xffff|0))>>>0;
    setSeed(s); setMineSet(genMines(mines,s));
    setTiles(Array(25).fill("idle")); setRev(0); setMult(1.0); setMultKey(0); setStatus("playing");
    setBalance(b=>+(b-bet).toFixed(2)); setBurstTile(null);
  }

  const cashout=useCallback((fm)=>{
    if(status!=="playing")return; sfx.cash();
    const win=+(bet*fm).toFixed(2);
    setBalance(b=>+(b+win).toFixed(2)); setStatus("cashout");
    setTimeout(()=>{
      setTiles(t=>t.map((v,idx)=>mineSet.has(idx)&&v!=="safe"?"hint-co":v));
    },320);
    setFlash("g"); setTimeout(()=>setFlash(null),600);
    setToast(`+$${win.toFixed(2)}`); setTimeout(()=>setToast(null),2200);
    setHistory(h=>[{type:"c",mult:fm,profit:+(win-bet).toFixed(2),bet},...h.slice(0,8)]);
    setMnStats(s=>({profit:+(s.profit+(win-bet)).toFixed(2),wagered:+(s.wagered+bet).toFixed(2),wins:s.wins+1,losses:s.losses,history:[...s.history,+(s.profit+(win-bet)).toFixed(2)]}));
  },[status,bet,setBalance,mineSet]);

  function clickTile(i){
    if(status!=="playing"||tiles[i]!=="idle")return;
    if(mineSet.has(i)){
      sfx.boom(); setTiles(t=>t.map((v,idx)=>idx===i?"mine":mineSet.has(idx)?"hint":v));
      setStatus("bust"); setFlash("r"); setTimeout(()=>setFlash(null),700);
      setShaking(true); setTimeout(()=>setShaking(false),500);
      setHistory(h=>[{type:"l",mult,profit:-bet,bet},...h.slice(0,8)]);
      setMnStats(s=>({profit:+(s.profit-bet).toFixed(2),wagered:+(s.wagered+bet).toFixed(2),wins:s.wins,losses:s.losses+1,history:[...s.history,+(s.profit-bet).toFixed(2)]}));
    }else{
      sfx.gem(rev+1); const n=[...tiles]; n[i]="safe"; setTiles(n);
      setBurstTile(i); setTimeout(()=>setBurstTile(null),600); // ← juice
      const r=rev+1; setRev(r); const m=calcMult(mines,r); setMult(m); setMultKey(k=>k+1);
      if(r===25-mines)setTimeout(()=>cashout(m),180);
    }
  }
  function reset(){sfx.click();setStatus("idle");setTiles(Array(25).fill("idle"));setRev(0);setMult(1.0);setMineSet(new Set());setSeed(null);setBurstTile(null);}

  const BURST_ANGLES=[0,60,120,180,240,300];
  const BURST_COLORS=["#00ff88","#34d399","#6ee7b7","#a7f3d0","#ffffff","#00ff88"];

  return(
    <div className="gamepage">
      <style>{CSS_MINES}</style>
      <style>{JUICE_CSS}</style>
      {flash==="r"&&<div className="fl-r"/>}
      {flash==="g"&&<div className="fl-g"/>}
      {toast&&<div className="cashpop">{toast}</div>}
      <div className="bc">
        <a onClick={()=>setPage("lobby")}>Home</a><span style={{opacity:.35}}>›</span>
        <a onClick={()=>setPage("casino")}>Casino</a><span style={{opacity:.35}}>›</span>
        <span style={{color:"var(--tx2)",fontWeight:500}}>Mines</span>
      </div>
      <div className="gamebody">
        <div className="lp">
          <div className="tabs">
            <button className={`tab${tab==="manual"?" on":""}`} onClick={()=>{sfx.tick();setTab("manual");}}>Manual</button>
            <button className={`tab${tab==="auto"?" on":""}`} onClick={()=>{sfx.tick();setTab("auto");}}>Auto</button>
          </div>
          <div className="fld">
            <div className="flbl">Bet Amount <span>${balance.toFixed(2)}</span></div>
            <div className="fi-w">
              <span className="fi-pre">◈</span>
              <input className="fi" type="number" min={.1} step={.5} value={bet}
                onChange={e=>!isP&&setBet(Math.max(.1,+e.target.value))} disabled={isP}/>
              <span className="fi-suf">USD</span>
            </div>
            <div className="qb">
              {["½","2×","5×","MAX"].map(v=>(
                <button key={v} className="qbtn" disabled={isP} onClick={()=>{
                  sfx.tick();
                  if(v==="½")setBet(b=>Math.max(.1,+(b/2).toFixed(2)));
                  else if(v==="2×")setBet(b=>+(b*2).toFixed(2));
                  else if(v==="5×")setBet(b=>+(b*5).toFixed(2));
                  else setBet(Math.floor(balance*100)/100);
                }}>{v}</button>
              ))}
            </div>
          </div>
          <div className="fld">
            <div className="flbl">Mines Count</div>
            <div className="msel">{MOPTS.map(n=><button key={n} className={`ms${mines===n?" sel":""}`} disabled={isP} onClick={()=>{sfx.tick();setMines(n);}}>{n}</button>)}</div>
          </div>
          <div className="pb-box">
            <div className="pb-top"><span>Progress</span><b>{rev}/{25-mines}</b></div>
            <div className="pb-t"><div className="pb-f" style={{width:`${pct}%`}}/></div>
          </div>
          <div className="sep"/>
          <div className="sr"><span className="sl">Multiplier</span><span className="sv" style={{color:"var(--puLL)"}}>{mult.toFixed(2)}×</span></div>
          <div className="sr"><span className="sl">Next gem</span><span className="sv" style={{color:"var(--nG)"}}>{nextMult.toFixed(2)}×</span></div>
          <div className="sr"><span className="sl">Total profit</span><span className="sv" style={{color:profit>=0?"var(--go)":"var(--rd)"}}>{profit>=0?"+":""}{profit.toFixed(2)}</span></div>
          <div className="sep"/>
          {!isP&&!isDone&&<button className="cta go" onClick={start} disabled={bet<=0||bet>balance}>▶ Start Game</button>}
          {isP&&rev===0&&<button className="cta go" disabled>Pick a tile...</button>}
          {isP&&rev>0&&<button className="cta cash" onClick={()=>cashout(mult)}>💰 Cashout ${winAmt.toFixed(2)}</button>}
          {isDone&&<button className="cta replay" onClick={reset}>↺ New Game</button>}
          <button className="sm-btn" onClick={()=>setShowStats(true)} style={{marginTop:6,width:"100%",justifyContent:"center"}}>
            📊 Stats & History
          </button>
          {seed&&<div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 9px",background:"var(--bg)",border:"1px solid var(--bd)",borderRadius:6,fontSize:".61rem",color:"var(--tx3)"}}>🔒 <code style={{color:"var(--puLL)",fontSize:".58rem",fontFamily:"monospace"}}>{seed.toString(16).toUpperCase().padStart(8,"0")}</code></div>}
        </div>
        {showStats&&<StatsModal gameName="Mines" onClose={()=>setShowStats(false)} stats={{profit:mnStats.profit,wagered:mnStats.wagered,wins:mnStats.wins,losses:mnStats.losses,history:mnStats.history}}/>}
        {/* GRID */}
        <div className="garea">
          <div className="gcent">
            <div className="mcard">
              <div>
                <div className="mc-lbl">Multiplier</div>
                <div key={multKey} className={`mc-v${status==="bust"?" rd":rev>0?" gn":""}`}
                  style={{animation:multKey>0&&isP?"mPop .3s cubic-bezier(.34,1.56,.64,1)":"none"}}>
                  {mult.toFixed(2)}<span className="mc-x">×</span>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div className="mc-wl">Total Win</div>
                <div className="mc-w">${winAmt.toFixed(2)}</div>
                {isP&&<div className="mc-nx">Next: <b>{nextMult.toFixed(2)}×</b></div>}
              </div>
            </div>
            {isP&&rev>=2&&(
              <div className="streak-bar"><div className="streak-dot"/>{rev} gems found — keep going?</div>
            )}
            <div className="gshell">
              <div className={`mgrid${shaking?" sh":""}`}>
                {tiles.map((t,i)=>(
                  <div key={i} className={`tile ${t}${(!isP||t!=="idle")?" dis":""}`}
                    style={(t==="hint"||t==="hint-co")?{animationDelay:`${(i%5+Math.floor(i/5))*.04}s`}:{}}
                    onClick={()=>clickTile(i)}>
                    {t==="safe"&&(
                      <>
                        <GemSVG/>
                        {burstTile===i&&(
                          <div className="tile-burst">
                            {BURST_ANGLES.map((angle,n)=>(
                              <span key={n} className="burst-p" style={{
                                "--a":`${angle}deg`,
                                width:n%2===0?"4px":"3px",
                                height:n%2===0?"4px":"3px",
                                background:BURST_COLORS[n],
                                animationDelay:`${n*.03}s`,
                              }}/>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                    {(t==="mine"||t==="hint"||t==="hint-co")&&<BombSVG size={t==="hint"||t==="hint-co"?32:44}/>}
                    {t==="idle"&&isP&&<div className="idle-dot"/>}
                  </div>
                ))}
              </div>
              {status==="cashout"&&<div className="gov w"><div className="ov-t">Cashed Out!</div><div className="ov-s">+${profit.toFixed(2)} · {mult.toFixed(2)}×</div></div>}
              {status==="bust"&&<div className="gov l"><div className="ov-t">Boom! 💥</div><div className="ov-s">Hit a mine · Lost ${bet.toFixed(2)}</div></div>}
            </div>
            <div className="pills">
              <div className="pill"><span className="pl-l">Bet</span><span className="pl-v" style={{color:"var(--go)"}}>${bet.toFixed(2)}</span></div>
              <div className="pill"><span className="pl-l">💣</span><span className="pl-v" style={{color:"var(--rd)"}}>{mines}</span></div>
              {isP&&<div className="pill"><span className="pl-l">Found</span><span className="pl-v" style={{color:"var(--nG)"}}>{rev} 💎</span></div>}
              {isP&&<div className="pill"><span className="pl-l">Safe left</span><span className="pl-v" style={{color:"var(--puLL)"}}>{25-mines-rev}</span></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export { MinesGame };
