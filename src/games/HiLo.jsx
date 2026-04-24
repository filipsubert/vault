import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { RTP, RANKS, SUITS, RV, RED, randCard, pHiOrSame, pLoOrSame, toMult, seededRng, genMines, calcMult } from "../shared/math.js";
import { CardFace, CardBack, RankLadder } from "../components/Cards.jsx";
import { ICO } from "../shared/icons.jsx";
import { StatsModal } from "../components/StatsModal.jsx";
import { CSS_HILO } from "../shared/css_hilo.js";

// ── Juice CSS — pridané animácie, layout sa NEDOTÝKA (ten je v CSS_HILO) ──────
const JUICE_CSS = `
/* ── Card 3D flip ── */
.card-inner.flipping {
  animation: cardFlip3D .46s cubic-bezier(.4,0,.2,1) !important;
}
@keyframes cardFlip3D {
  0%   { transform: rotateY(0deg)   scale(1); }
  40%  { transform: rotateY(90deg)  scale(.93); }
  60%  { transform: rotateY(90deg)  scale(.93); }
  100% { transform: rotateY(360deg) scale(1); }
}

/* ── Win / lose card animations ── */
.card-inner.win-anim {
  animation: cardWin .38s cubic-bezier(.34,1.56,.64,1) !important;
}
@keyframes cardWin {
  0%   { transform: scale(.88) translateY(6px); opacity: .7; }
  55%  { transform: scale(1.06) translateY(-3px); }
  100% { transform: scale(1)   translateY(0);    opacity: 1; }
}
.card-inner.lose-anim {
  animation: cardLose .42s ease !important;
}
@keyframes cardLose {
  0%,100% { transform: translateX(0)   rotate(0deg); }
  20%     { transform: translateX(-5px) rotate(-2deg); }
  40%     { transform: translateX(5px)  rotate(2deg); }
  60%     { transform: translateX(-3px) rotate(-1deg); }
  80%     { transform: translateX(3px)  rotate(1deg); }
}

/* ── Hi/Lo button hover glow ── */
.hlbtn.hi:hover:not(:disabled) {
  background: rgba(16,185,129,.14) !important;
  border-color: rgba(52,211,153,.55) !important;
  box-shadow: 0 0 22px rgba(16,185,129,.28), 0 4px 16px rgba(0,0,0,.3) !important;
  transform: translateY(-2px) !important;
  transition: all .16s cubic-bezier(.34,1.56,.64,1) !important;
}
.hlbtn.lo:hover:not(:disabled) {
  background: rgba(239,68,68,.14) !important;
  border-color: rgba(248,113,113,.55) !important;
  box-shadow: 0 0 22px rgba(239,68,68,.28), 0 4px 16px rgba(0,0,0,.3) !important;
  transform: translateY(-2px) !important;
  transition: all .16s cubic-bezier(.34,1.56,.64,1) !important;
}
.hlbtn:active:not(:disabled) {
  transform: scale(.97) translateY(0) !important;
}

/* ── Multiplier pop ── */
@keyframes mPop {
  0%   { transform: scale(.78) translateY(5px); opacity: .45; }
  55%  { transform: scale(1.15) translateY(-2px); }
  80%  { transform: scale(.97); }
  100% { transform: scale(1)   translateY(0);    opacity: 1; }
}

/* ── Cashout button pulse ── */
.cta.cash { animation: cashPulse 1.7s ease-in-out infinite !important; }
.cta.cash:hover { animation: none !important; transform: translateY(-2px) !important; }
@keyframes cashPulse {
  0%,100% { box-shadow: 0 4px 18px rgba(245,158,11,.28), 0 0 0 0 rgba(245,158,11,.38); }
  50%     { box-shadow: 0 4px 18px rgba(245,158,11,.28), 0 0 0 8px rgba(245,158,11,0); }
}

/* ── Result badge pop ── */
.rbadge { animation: badgePop .3s cubic-bezier(.34,1.56,.64,1) !important; }
@keyframes badgePop {
  from { transform: translateX(-50%) scale(.6); opacity: 0; }
  to   { transform: translateX(-50%) scale(1);  opacity: 1; }
}

/* ── Streak bar milestone pop ── */
.streak-bar.milestone { animation: streakPop .4s cubic-bezier(.34,1.56,.64,1) !important; }
@keyframes streakPop {
  from { transform: scale(.88); opacity: .4; }
  to   { transform: scale(1);   opacity: 1; }
}

/* ── Streak dot blink ── */
.streak-dot { animation: streakBlink .75s ease-in-out infinite !important; }
@keyframes streakBlink {
  0%,100% { opacity: 1;  transform: scale(1); }
  50%     { opacity: .2; transform: scale(.65); }
}

/* ── Probability bar smooth transition ── */
.prob-hi, .prob-lo {
  transition: width .4s cubic-bezier(.34,1.56,.64,1) !important;
}

/* ── Flash overlays ── */
.fl-r, .fl-g { animation: flFlash .6s ease forwards !important; }
@keyframes flFlash { 0% { opacity: 1; } 100% { opacity: 0; } }

/* ── Toast ── */
.cashpop { animation: toastIn 2.3s ease forwards !important; }
@keyframes toastIn {
  0%   { opacity: 0; transform: translateX(-50%) translateY(-18px) scale(.82); }
  11%  { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1.04); }
  17%  {             transform: translateX(-50%) translateY(0)     scale(1); }
  76%  { opacity: 1; }
  100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
}
`;

// ── Hi-Lo card game ───────────────────────────────────────────────────────────
/* ══════════════════════════════════════ HI-LO GAME ═══════════════════════════════════ */
function HiLoGame({balance,setBalance,setPage}){
  const [tab,setTab]=useState("manual");
  const [bet,setBet]=useState(10);
  const [status,setStatus]=useState("idle");
  const [curCard,setCurCard]=useState(null);
  const [animClass,setAnimClass]=useState("");
  const [flipping,setFlipping]=useState(false);
  const [history,setHistory]=useState([]);
  const [mult,setMult]=useState(1.0);
  const [multKey,setMultKey]=useState(0);
  const [streak,setStreak]=useState(0);
  const [flash,setFlash]=useState(null);
  const [toast,setToast]=useState(null);
  const [betHistory,setBetHistory]=useState([]);
  const [lastResult,setLastResult]=useState(null);
  const [showStats,setShowStats]=useState(false);
  const [hlStats,setHlStats]=useState({profit:0,wagered:0,wins:0,losses:0,history:[0]});

  const isP=status==="playing";
  const isDone=status==="bust"||status==="cashout";
  const winAmt=+(bet*mult).toFixed(2);
  const profit=+(winAmt-bet).toFixed(2);
  const pH=curCard?pHiOrSame(curCard.rank):0.5;
  const pL=curCard?pLoOrSame(curCard.rank):0.5;
  const streakBonus=Math.pow(1.018, streak);
  const mH=+(toMult(pH)*streakBonus).toFixed(2);
  const mL=+(toMult(pL)*streakBonus).toFixed(2);

  function startGame(){
    if(bet<=0||bet>balance)return;
    sfx.start();
    const c=randCard();
    setHistory([]); setMult(1.0); setMultKey(0); setStreak(0);
    setStatus("playing"); setLastResult(null); setAnimClass("");
    setBalance(b=>+(b-bet).toFixed(2));
    setCurCard(c);
  }

  const doCashout=useCallback(()=>{
    if(status!=="playing"||streak===0)return;
    sfx.cash();
    const win=+(bet*mult).toFixed(2);
    setBalance(b=>+(b+win).toFixed(2));
    setStatus("cashout");
    setLastResult("cashout");
    setAnimClass("win-anim"); setTimeout(()=>setAnimClass(""),450);
    setFlash("g"); setTimeout(()=>setFlash(null),600);
    setToast(`+$${win.toFixed(2)}`); setTimeout(()=>setToast(null),2200);
    setBetHistory(h=>[{type:"c",mult,profit:+(win-bet).toFixed(2),bet,streak},...h.slice(0,8)]);
    setHlStats(s=>({profit:+(s.profit+(win-bet)).toFixed(2),wagered:+(s.wagered+bet).toFixed(2),wins:s.wins+1,losses:s.losses,history:[...s.history,+(s.profit+(win-bet)).toFixed(2)]}));
  },[status,streak,bet,mult,setBalance]);

  function guess(dir){
    if(!isP||flipping)return;
    const drawn=randCard();
    const cv=RV[curCard.rank],dv=RV[drawn.rank];
    const correct=dir==="hi"?(dv>=cv):(dv<=cv);
    const chosenMult=dir==="hi"?mH:mL;

    sfx.flip(); setFlipping(true);
    setTimeout(()=>{
      setFlipping(false);
      if(correct){
        sfx.win(streak+1);
        const streakBonus=Math.pow(1.018, streak);
        const nm=+(mult*chosenMult*streakBonus).toFixed(3);
        setCurCard(drawn);
        setHistory(h=>[...h.slice(-6),{rank:drawn.rank,suit:drawn.suit}]);
        setMult(nm); setMultKey(k=>k+1); setStreak(s=>s+1);
        setLastResult("win"); setAnimClass("win-anim");
        setFlash("g"); setTimeout(()=>setFlash(null),400);
        setTimeout(()=>setAnimClass(""),450);
      }else{
        sfx.lose();
        setCurCard(drawn);
        setHistory(h=>[...h.slice(-6),{rank:drawn.rank,suit:drawn.suit}]);
        setStatus("bust"); setLastResult("lose"); setAnimClass("lose-anim");
        setFlash("r"); setTimeout(()=>setFlash(null),700);
        setBetHistory(h=>[{type:"l",mult,profit:-bet,bet,streak},...h.slice(0,8)]);
        setHlStats(s=>({profit:+(s.profit-bet).toFixed(2),wagered:+(s.wagered+bet).toFixed(2),wins:s.wins,losses:s.losses+1,history:[...s.history,+(s.profit-bet).toFixed(2)]}));
        setTimeout(()=>setAnimClass(""),500);
      }
    },460);
  }

  function reset(){sfx.click();setStatus("idle");setHistory([]);setMult(1.0);setStreak(0);setLastResult(null);setAnimClass("");}

  return(
    <div className="gamepage">
      <style>{CSS_HILO}</style>
      <style>{JUICE_CSS}</style>
      {flash==="r"&&<div className="fl-r"/>}
      {flash==="g"&&<div className="fl-g"/>}
      {toast&&<div className="cashpop">{toast}</div>}
      <div className="bc">
        <a onClick={()=>setPage("lobby")}>Home</a><span style={{opacity:.35}}>›</span>
        <a onClick={()=>setPage("casino")}>Casino</a><span style={{opacity:.35}}>›</span>
        <span style={{color:"var(--tx2)",fontWeight:500}}>Hi-Lo</span>
      </div>
      <div className="gamebody">
        {/* LEFT */}
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
          <div className="sep"/>
          <div className="sr"><span className="sl">Multiplier</span><span className="sv" style={{color:"var(--puLL)"}}>{mult.toFixed(3)}×</span></div>
          <div className="sr"><span className="sl">Streak</span><span className="sv" style={{color:"var(--nG)"}}>{streak} correct</span></div>
          <div className="sr"><span className="sl">Profit on cash</span><span className="sv" style={{color:profit>=0?"var(--go)":"var(--rd)"}}>{profit>=0?"+":""}{profit.toFixed(2)}</span></div>
          <div className="sep"/>
          {!isP&&!isDone&&<button className="cta go" onClick={startGame} disabled={bet<=0||bet>balance}>▶ Start Game</button>}
          {isP&&streak===0&&<button className="cta go" disabled>Pick Higher or Lower</button>}
          {isP&&streak>0&&<button className="cta cash" onClick={doCashout}>💰 Cashout ${winAmt.toFixed(2)}</button>}
          {isDone&&<button className="cta replay" onClick={reset}>↺ New Game</button>}
          <button className="sm-btn" onClick={()=>setShowStats(true)} style={{marginTop:6,width:"100%",justifyContent:"center"}}>
            📊 Stats & History
          </button>
        </div>
        {showStats&&<StatsModal gameName="Hi-Lo" onClose={()=>setShowStats(false)} stats={{profit:hlStats.profit,wagered:hlStats.wagered,wins:hlStats.wins,losses:hlStats.losses,history:hlStats.history}}/>}
        {/* GAME AREA */}
        <div className="garea">
          <div className="gcent">
            {/* Mult card */}
            <div className="mcard">
              <div>
                <div className="mc-lbl">Multiplier</div>
                <div key={multKey} className={`mc-v${status==="bust"?" rd":streak>0?" gn":""}`}
                  style={{animation:multKey>0&&isP?"mPop .3s cubic-bezier(.34,1.56,.64,1)":"none"}}>
                  {mult.toFixed(3)}<span className="mc-x">×</span>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div className="mc-wl">Total Win</div>
                <div className="mc-w">${winAmt.toFixed(2)}</div>
                {isP&&<div className="mc-nx">Streak: <b>{streak}</b></div>}
              </div>
            </div>
            {/* Milestone streak indicator — shows only at 5,10,15,20+ */}
            {(()=>{
              const show=isP&&[5,10,15,20].some(m=>streak===m)||(isP&&streak>20&&streak%5===0);
              const cls=streak>=20?"m20":streak>=15?"m15":streak>=10?"m10":"m5";
              const msgs={5:"🔥 5 in a row!",10:"⚡ 10 streak — insane!",15:"👑 15 correct!",20:"🚀 20 in a row!!"};
              const msg=streak>=20&&streak%5===0&&streak!==20?`🌟 ${streak} in a row!!!`:msgs[streak]||`🔥 ${streak} streak!`;
              return show?(
                <div key={streak} className={`streak-bar ${cls} milestone`} style={{flexShrink:0}}>
                  <div className="streak-dot"/>{msg}
                </div>
              ):null;
            })()}
            {/* Card table */}
            <div className="card-table">
              <div className="felt-border"/>
              <div className="felt-inner">
                {!curCard&&(
                  <div style={{height:50,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--tx3)",fontSize:".76rem",marginBottom:18}}>
                    Start a game to deal the first card
                  </div>
                )}
                {/* Stage */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:22,marginBottom:14}}>
                  {/* Deck */}
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:7}}>
                    <div className="deck-pile">
                      {[3,2,1,0].map(n=>(
                        <div key={n} className="deck-layer" style={{
                          position:"absolute",top:-n*2,left:n*2,zIndex:n,
                          opacity:.4+n*.15,
                          background:`linear-gradient(145deg,hsl(${260+n*5},68%,${20+n*3}%),hsl(${250+n*5},72%,${28+n*3}%))`,
                          border:"2px solid rgba(167,139,250,.2)",
                          boxShadow:n===0?"0 6px 20px rgba(0,0,0,.5)":"none",
                        }}/>
                      ))}
                      <div style={{position:"absolute",inset:0,zIndex:4}}>
                        <CardBack/>
                      </div>
                    </div>
                    <span style={{fontSize:".62rem",color:"var(--tx3)",fontWeight:700,letterSpacing:".06em",textTransform:"uppercase"}}>Deck</span>
                  </div>
                  {/* VS */}
                  <div className="vs-div">
                    <div className="vs-line"/>
                    <span>vs</span>
                    <div className="vs-line"/>
                  </div>
                  {/* Current card */}
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:7}}>
                    <div className="card-slot" style={{position:"relative"}}>
                      {lastResult&&(
                        <div className={`rbadge ${lastResult==="win"?"rb-w":lastResult==="cashout"?"rb-c":"rb-l"}`}>
                          {lastResult==="win"?"✓ CORRECT":lastResult==="cashout"?"💰 CASHED OUT":"✗ WRONG"}
                        </div>
                      )}
                      {curCard?(
                        <div className={`card-inner ${animClass}${flipping?" flipping":""}`}>
                          <CardFace rank={curCard.rank} suit={curCard.suit}/>
                        </div>
                      ):(
                        <div style={{width:108,height:158,borderRadius:13,background:"var(--s3)",border:"2px dashed rgba(167,139,250,.18)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <span style={{color:"var(--tx3)",fontSize:".7rem"}}>?</span>
                        </div>
                      )}
                    </div>
                    <span style={{fontSize:".62rem",color:"var(--tx3)",fontWeight:700,letterSpacing:".06em",textTransform:"uppercase"}}>Current</span>
                  </div>
                </div>
                {/* Probability bar */}
                {curCard&&(
                  <div className="prob-wrap" style={{marginBottom:10}}>
                    <span className="prob-lbl" style={{color:"var(--nG)",minWidth:36}}>{(pH*100).toFixed(0)}%</span>
                    <div className="prob-track">
                      <div className="prob-hi" style={{width:(pH*100)+"%"}}/>
                      <div className="prob-lo" style={{width:(pL*100)+"%"}}/>
                    </div>
                    <span className="prob-lbl" style={{color:"var(--rd)",minWidth:36,textAlign:"right"}}>{(pL*100).toFixed(0)}%</span>
                  </div>
                )}
                {/* Rank ladder */}
                {curCard&&<RankLadder curRank={curCard.rank} history={history}/>}
              </div>
            </div>
            {/* HIGHER OR SAME / LOWER OR SAME buttons */}
            <div className="hlbtns">
              <button className="hlbtn hi" disabled={!isP||flipping} onClick={()=>guess("hi")} onMouseEnter={()=>sfx.hover()}>
                <div className="hb-ico">
                  {ICO.up}
                  <span className="hb-tag">Higher or Same</span>
                </div>
                <span className="hb-mult">{mH.toFixed(2)}×</span>
                <span className="hb-prob">{(pH*100).toFixed(1)}% chance</span>
              </button>
              <button className="hlbtn lo" disabled={!isP||flipping} onClick={()=>guess("lo")} onMouseEnter={()=>sfx.hover()}>
                <div className="hb-ico">
                  {ICO.down}
                  <span className="hb-tag">Lower or Same</span>
                </div>
                <span className="hb-mult">{mL.toFixed(2)}×</span>
                <span className="hb-prob">{(pL*100).toFixed(1)}% chance</span>
              </button>
            </div>
            {/* Pills */}
            <div className="pills">
              <div className="pill"><span className="pl-l">Bet</span><span className="pl-v" style={{color:"var(--go)"}}>${bet.toFixed(2)}</span></div>
              {curCard&&<div className="pill"><span className="pl-l">Card</span><span className="pl-v" style={{color:RED.has(curCard.suit)?"var(--rd)":"var(--puLL)"}}>{curCard.rank}{curCard.suit}</span></div>}
              {isP&&<div className="pill"><span className="pl-l">Streak</span><span className="pl-v" style={{color:"var(--nG)"}}>{streak} ✓</span></div>}
              {status==="cashout"&&<div className="pill"><span className="pl-l">Won</span><span className="pl-v" style={{color:"var(--nG)"}}>+${profit.toFixed(2)}</span></div>}
              {status==="bust"&&<div className="pill"><span className="pl-l">Lost</span><span className="pl-v" style={{color:"var(--rd)"}}>-${bet.toFixed(2)}</span></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export { HiLoGame };
