import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { RTP } from "../shared/math.js";
// ICO defined inline — icons.jsx neexportuje ICO správne
const ICO = {
  chevR: <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} style={{opacity:.4}}><path d="M9 6l6 6-6 6"/></svg>,
  up:    <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor"><path d="M12 4 20 15H4z"/></svg>,
  down:  <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor"><path d="M12 20 4 9h16z"/></svg>,
};
import { StatsModal } from "../components/StatsModal.jsx";
import { CSS_DICE } from "../shared/css_dice.js";

// ── Juice CSS — animácie len, layout v CSS_DICE ────────────────────────────────
const JUICE_CSS = `

/* ── Roll button pulse while rolling ── */
.cta.go:not(:disabled):active {
  transform: scale(.97) !important;
}
@keyframes rollFlicker {
  0%,100% { opacity: 1; }
  50%      { opacity: .55; }
}

/* ── Result number box entrance ── */
.dice-num-box {
  transition: box-shadow .25s, border-color .25s !important;
}
.dice-num-box.won {
  animation: boxWin .42s cubic-bezier(.34,1.56,.64,1) !important;
  border-color: rgba(52,211,153,.6) !important;
  box-shadow: 0 0 32px rgba(16,185,129,.3), inset 0 0 18px rgba(16,185,129,.06) !important;
}
.dice-num-box.lost {
  animation: boxLost .38s ease !important;
  border-color: rgba(239,68,68,.55) !important;
  box-shadow: 0 0 28px rgba(239,68,68,.28), inset 0 0 14px rgba(239,68,68,.05) !important;
}
@keyframes boxWin {
  0%   { transform: scale(.94); opacity: .6; }
  55%  { transform: scale(1.04); }
  100% { transform: scale(1);   opacity: 1; }
}
@keyframes boxLost {
  0%,100% { transform: translateX(0); }
  20%     { transform: translateX(-5px); }
  40%     { transform: translateX(5px); }
  60%     { transform: translateX(-3px); }
  80%     { transform: translateX(3px); }
}

/* ── Result number pop ── */
.dnb-val {
  transition: color .2s !important;
}

/* ── Marker slide smooth ── */
.stake-marker {
  transition: left .62s cubic-bezier(.25,.1,.25,1) !important;
}

/* ── Marker inner win/lose glow ── */
.stake-marker-inner.win-m {
  animation: markerWin .35s cubic-bezier(.34,1.56,.64,1) !important;
  box-shadow: 0 0 14px rgba(52,211,153,.7), 0 0 0 3px rgba(52,211,153,.3) !important;
}
.stake-marker-inner.lose-m {
  animation: markerLose .35s ease !important;
  box-shadow: 0 0 14px rgba(239,68,68,.65), 0 0 0 3px rgba(239,68,68,.3) !important;
}
@keyframes markerWin {
  0%   { transform: scale(.7) translateY(-4px); opacity: .4; }
  60%  { transform: scale(1.18) translateY(-2px); }
  100% { transform: scale(1)  translateY(0);    opacity: 1; }
}
@keyframes markerLose {
  0%   { transform: scale(.7); opacity: .4; }
  60%  { transform: scale(1.1); }
  100% { transform: scale(1);  opacity: 1; }
}

/* ── Stake handle hover/drag ── */
.stake-handle {
  transition: transform .14s cubic-bezier(.34,1.56,.64,1) !important;
}
.stake-handle:hover,
.stake-handle.popped {
  transform: translateX(-50%) scale(1.18) !important;
}
.stake-handle-inner {
  transition: box-shadow .14s !important;
}
.stake-handle:hover .stake-handle-inner {
  box-shadow: 0 0 0 4px rgba(167,139,250,.35), 0 4px 16px rgba(0,0,0,.5) !important;
}

/* ── Bar track glow on sides ── */
.sb-green-fill, .sb-green-rev {
  box-shadow: inset 0 0 12px rgba(16,185,129,.22) !important;
}
.sb-red-fill, .sb-red-rev {
  box-shadow: inset 0 0 12px rgba(239,68,68,.18) !important;
}

/* ── Mode toggle button active glow ── */
.dt-btn.on-hi {
  box-shadow: 0 0 16px rgba(52,211,153,.28) !important;
  transition: box-shadow .2s !important;
}
.dt-btn.on-lo {
  box-shadow: 0 0 16px rgba(239,68,68,.28) !important;
  transition: box-shadow .2s !important;
}
.dt-btn:hover:not(:disabled) {
  transform: translateY(-1px) !important;
  transition: transform .14s cubic-bezier(.34,1.56,.64,1) !important;
}

/* ── History dot entrance ── */
.hist-dot {
  animation: histPop .22s cubic-bezier(.34,1.56,.64,1) !important;
}
@keyframes histPop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

/* ── Flash overlays ── */
.fl-r, .fl-g { animation: flFlash .6s ease forwards !important; }
@keyframes flFlash { 0% { opacity: 1; } 100% { opacity: 0; } }

/* ── Win confetti burst (CSS only, no JS) ── */
.dice-num-box.won::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(ellipse at 50% 0%, rgba(52,211,153,.18), transparent 70%);
  animation: wonShine .6s ease forwards;
  pointer-events: none;
}
@keyframes wonShine {
  0%   { opacity: 0; transform: scaleY(.5); }
  40%  { opacity: 1; }
  100% { opacity: 0; transform: scaleY(1.2); }
}
`;

// ── Dice game ─────────────────────────────────────────────────────────────────
/* ══════════════════════════════════════ DICE GAME ════════════════════════════════ */
function DiceGame({ balance, setBalance, setPage }) {
  const [bet, setBet] = useState(10.00);
  const [target, setTarget] = useState(50.00);
  const [winChance, setWinChance] = useState(50);
  const [mode, setMode] = useState("over"); // "over" | "under"
  const [rolling, setRolling] = useState(false);
  const [displayNum, setDisplayNum] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showStats,setShowStats]=useState(false);
  const [dcStats,setDcStats]=useState({profit:0,wagered:0,wins:0,losses:0,history:[0]});
  const [flash, setFlash] = useState(null);
  const [markerPos, setMarkerPos] = useState(null);
  const [handlePopped, setHandlePopped] = useState(false);
  const rollRef = useRef(null);
  const flashRef = useRef(null);
  const barRef = useRef(null);
  const dragging = useRef(false);

  // Derived
  const mult = Math.max(1.0101, parseFloat((RTP / (winChance / 100)).toFixed(4)));
  const profitOnWin = parseFloat((bet * mult - bet).toFixed(2));
  const targetPct = target;

  function recalcFromWinChance(wc, m) {
    const clamped = Math.max(1, Math.min(98, wc));
    setWinChance(clamped);
    if (m === "over") setTarget(parseFloat((100 - clamped).toFixed(2)));
    else setTarget(parseFloat(clamped.toFixed(2)));
  }
  function recalcFromTarget(t, m) {
    const clamped = Math.max(2, Math.min(98, t));
    setTarget(parseFloat(clamped.toFixed(2)));
    if (m === "over") setWinChance(parseFloat((100 - clamped).toFixed(2)));
    else setWinChance(parseFloat(clamped.toFixed(2)));
  }
  function recalcFromMult(mv, m) {
    const clampedMult = Math.max(1.02, Math.min(99, mv));
    const wc = parseFloat((99 / clampedMult).toFixed(2));
    recalcFromWinChance(wc, m);
  }

  function doFlash(type) {
    if (flashRef.current) clearTimeout(flashRef.current);
    setFlash(type); flashRef.current = setTimeout(() => setFlash(null), 650);
  }

  function roll() {
    if (rolling || balance < bet) return;
    sfx.click();
    setRolling(true);
    setResult(null);
    setDisplayNum(null);
    setMarkerPos(null);
    setBalance(b => +(b - bet).toFixed(2));

    const finalValue = parseFloat((Math.random() * 99.99).toFixed(2));
    const won = mode === "over" ? finalValue > target : finalValue < target;
    const winAmt = parseFloat((bet * mult).toFixed(2));

    const startPos = mode === "over"
      ? (finalValue > target ? Math.min(target + 2, 99) : 1)
      : (finalValue < target ? Math.max(target - 2, 0) : 98);
    setMarkerPos(startPos);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMarkerPos(finalValue);
        rollRef.current = setTimeout(() => {
          setDisplayNum(finalValue);
          setResult({ value: finalValue, won, winAmt });
          setRolling(false);
          sfx.diceLand(won);
          if (won) { setTimeout(() => sfx.win(), 80); doFlash("g"); setBalance(b => +(b + winAmt).toFixed(2)); }
          else doFlash("r");
          setHistory(h => [{ value: finalValue, won, bet, mult: won ? mult : 1, mode, target }, ...h].slice(0, 10));
          const _dcP=won?+(winAmt-bet).toFixed(2):-(bet);
          setDcStats(s=>({profit:+(s.profit+_dcP).toFixed(2),wagered:+(s.wagered+bet).toFixed(2),wins:won?s.wins+1:s.wins,losses:won?s.losses:s.losses+1,history:[...s.history,+(s.profit+_dcP).toFixed(2)]}));
        }, 640);
      });
    });
  }

  useEffect(() => () => { if (rollRef.current) clearTimeout(rollRef.current); }, []);

  function getBarPct(e) {
    const bar = barRef.current;
    if (!bar) return null;
    const rect = bar.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    return pct;
  }
  function onBarMouseDown(e) {
    if (rolling) return;
    dragging.current = true;
    const pct = getBarPct(e);
    if (pct !== null) { recalcFromTarget(pct, mode); setHandlePopped(true); setTimeout(() => setHandlePopped(false), 350); }
  }
  function onBarMouseMove(e) {
    if (!dragging.current || rolling) return;
    const pct = getBarPct(e);
    if (pct !== null) recalcFromTarget(pct, mode);
  }
  function onBarMouseUp() { dragging.current = false; }
  useEffect(() => {
    window.addEventListener("mousemove", onBarMouseMove);
    window.addEventListener("mouseup", onBarMouseUp);
    window.addEventListener("touchmove", onBarMouseMove);
    window.addEventListener("touchend", onBarMouseUp);
    return () => {
      window.removeEventListener("mousemove", onBarMouseMove);
      window.removeEventListener("mouseup", onBarMouseUp);
      window.removeEventListener("touchmove", onBarMouseMove);
      window.removeEventListener("touchend", onBarMouseUp);
    };
  });

  const boxState = rolling ? "idle" : result ? result.won ? "won" : "lost" : "idle";
  const winColor = winChance > 60 ? "var(--nG)" : winChance > 30 ? "var(--puLL)" : "var(--rd)";

  return (
    <div className="gamepage">
      <style>{CSS_DICE}</style>
      <style>{JUICE_CSS}</style>
      {flash === "g" && <div className="fl-g"/>}
      {flash === "r" && <div className="fl-r"/>}

      <div className="bc">
        <a onClick={() => { sfx.nav(); setPage("lobby"); }}>Home</a>
        {ICO.chevR}<a onClick={() => setPage("casino")}>Casino</a>
        {ICO.chevR}<span style={{ color:"var(--tx2)" }}>Dice</span>
      </div>

      <div className="gamebody">
        {/* ── LEFT PANEL ── */}
        <div className="lp">
          <div className="fld">
            <div className="flbl">Bet Amount <span>${balance.toFixed(2)}</span></div>
            <div className="fi-w">
              <span className="fi-pre">$</span>
              <input className="fi" type="number" value={bet} min={0.01} step={0.01}
                disabled={rolling}
                onChange={e => setBet(Math.max(0.01, parseFloat(e.target.value) || 0.01))}/>
              <span className="fi-suf">USD</span>
            </div>
          </div>
          <div className="qb">
            {["½","2×","Max","Min"].map((v,i) => (
              <button key={i} className="qbtn" disabled={rolling} onClick={() => {
                sfx.click();
                if (v === "½") setBet(b => +Math.max(0.01, b/2).toFixed(2));
                else if (v === "2×") setBet(b => +(b*2).toFixed(2));
                else if (v === "Max") setBet(+balance.toFixed(2));
                else setBet(0.01);
              }}>{v}</button>
            ))}
          </div>

          <div className="sep"/>

          <div className="fld">
            <div className="flbl">Mode</div>
            <div className="dice-toggle">
              <button className={`dt-btn${mode === "under" ? " on-lo" : ""}`}
                disabled={rolling}
                onClick={() => { sfx.click(); setMode("under"); recalcFromTarget(target, "under"); }}>
                ▼ Roll Under
              </button>
              <button className={`dt-btn${mode === "over" ? " on-hi" : ""}`}
                disabled={rolling}
                onClick={() => { sfx.click(); setMode("over"); recalcFromTarget(target, "over"); }}>
                ▲ Roll Over
              </button>
            </div>
          </div>

          <div className="sep"/>

          {/* Stake-style editable stat boxes */}
          <div className="dice-stat-boxes">
            <div className="dsb">
              <div className="dsb-label">Win Chance</div>
              <input className="dsb-input" type="number" min={1} max={98} step={0.01}
                disabled={rolling} value={winChance}
                onChange={e => recalcFromWinChance(parseFloat(e.target.value)||1, mode)}/>
              <div className="dsb-unit">%</div>
            </div>
            <div className="dsb">
              <div className="dsb-label">Multiplier</div>
              <input className="dsb-input" type="number" min={1.02} max={99} step={0.0001}
                disabled={rolling} value={mult.toFixed(4)}
                onChange={e => recalcFromMult(parseFloat(e.target.value)||1.02, mode)}/>
              <div className="dsb-unit">×</div>
            </div>
            <div className="dsb">
              <div className="dsb-label">Profit</div>
              <input className="dsb-input" type="number" step={0.01} disabled
                value={profitOnWin.toFixed(2)}/>
              <div className="dsb-unit">USD</div>
            </div>
          </div>

          <div className="sep"/>

          <button className="cta go" disabled={rolling || balance < bet}
            onClick={() => { sfx.click(); roll(); }}>
            {rolling
              ? <span style={{animation:"rollFlicker .2s infinite"}}>⚄ Rolling...</span>
              : "⚄ Roll Dice"}
          </button>

          <button className="sm-btn" onClick={()=>setShowStats(true)} style={{marginTop:6,width:"100%",justifyContent:"center"}}>
            📊 Stats & History
          </button>
        </div>
        {showStats&&<StatsModal gameName="Dice" onClose={()=>setShowStats(false)} stats={{profit:dcStats.profit,wagered:dcStats.wagered,wins:dcStats.wins,losses:dcStats.losses,history:dcStats.history}}/>}

        {/* ── GAME AREA ── */}
        <div className="garea">
          <div className="gcent" style={{ gap:24, maxWidth:560 }}>

            {/* Big result number */}
            <div className="dice-result-display">
              <div className={`dice-num-box ${boxState}`}>
                <div className="dnb-label">
                  {mode === "over" ? "▲ ROLL OVER" : "▼ ROLL UNDER"} {target.toFixed(2)}
                </div>
                <div className="dnb-val">
                  {displayNum !== null ? displayNum.toFixed(2) : "—"}
                </div>
                <div className="dnb-sub">
                  {rolling ? "sliding..." : result
                    ? result.won ? `✓ WIN +$${result.winAmt.toFixed(2)}` : `✗ LOSS -$${bet.toFixed(2)}`
                    : `${winChance}% · ${mult.toFixed(4)}×`}
                </div>
              </div>
            </div>

            {/* ── STAKE BAR ── */}
            <div className="stake-bar-wrap"
              ref={barRef}
              onMouseDown={onBarMouseDown}
              onTouchStart={onBarMouseDown}>
              <div className="stake-bar" style={{ userSelect:"none" }}>

                {/* Color track */}
                <div className="stake-bar-bg">
                  {mode === "over" ? (
                    <>
                      <div className="sb-red sb-red-fill" style={{ width:`${targetPct}%` }}/>
                      <div className="sb-green sb-green-fill" style={{ width:`${100-targetPct}%` }}/>
                    </>
                  ) : (
                    <>
                      <div className="sb-green sb-green-rev" style={{ width:`${targetPct}%` }}/>
                      <div className="sb-red sb-red-rev" style={{ width:`${100-targetPct}%` }}/>
                    </>
                  )}
                </div>

                {/* Draggable handle */}
                <div className={`stake-handle${handlePopped ? " popped" : ""}`}
                  style={{ left:`${targetPct}%` }}>
                  <div className="stake-handle-label">{target.toFixed(2)}</div>
                  <div className="stake-handle-inner"/>
                </div>

                {/* Result marker */}
                {markerPos !== null && (
                  <div className="stake-marker" style={{ left:`${markerPos}%` }}>
                    <div className={`stake-marker-inner ${result ? result.won ? "win-m" : "lose-m" : "win-m"}`}
                      style={!result ? { background:"linear-gradient(145deg,#3a3060,#5b4fa0)", color:"#fff", boxShadow:"0 0 0 3px rgba(124,58,237,.3),0 4px 16px rgba(0,0,0,.5)" } : {}}>
                      {result ? markerPos.toFixed(0) : "⚄"}
                    </div>
                    {result && (
                      <div className="stake-marker-val" style={{ color: result.won ? "var(--nG)" : "var(--rd)" }}>
                        {markerPos.toFixed(2)}
                      </div>
                    )}
                  </div>
                )}

                {/* Tick marks */}
                <div className="stake-ticks" style={{ top:18 }}>
                  {[0,25,50,75,100].map(v => (
                    <div key={v} className="stake-tick">
                      <div className="stake-tick-line"/>
                      <div className="stake-tick-val">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edge labels */}
              <div className="stake-bar-labels" style={{ marginTop:38 }}>
                <span className="sbl-item">0.00</span>
                <span className="sbl-item">99.99</span>
              </div>
            </div>

            {/* Info pills */}
            <div className="pills">
              <div className="pill">
                <span className="pl-l">House Edge</span>
                <span className="pl-v" style={{color:"var(--tx2)"}}>4.5%</span>
              </div>
              <div className="pill">
                <span className="pl-l">Mode</span>
                <span className="pl-v" style={{color: mode==="over"?"var(--nG)":"var(--rd)"}}>
                  {mode === "over" ? "▲ Over" : "▼ Under"} {target.toFixed(2)}
                </span>
              </div>
              <div className="pill">
                <span className="pl-l">Win Zone</span>
                <span className="pl-v" style={{color:winColor}}>{winChance}%</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


export { DiceGame };
