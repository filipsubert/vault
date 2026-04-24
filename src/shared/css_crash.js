const CSS_CRASH=`
/* ═══════════════════════ CRASH ═══════════════════════ */
@keyframes crashFlyAnim{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes crashShake{0%,100%{transform:translateX(0) rotate(0)}10%{transform:translateX(-12px) rotate(-.8deg)}22%{transform:translateX(12px) rotate(.8deg)}34%{transform:translateX(-8px) rotate(-.4deg)}46%{transform:translateX(8px) rotate(.4deg)}60%{transform:translateX(-4px)}75%{transform:translateX(4px)}88%{transform:translateX(-2px)}}
@keyframes crashCountPop{0%{transform:scale(2.2);opacity:0}60%{transform:scale(.92)}100%{transform:scale(1);opacity:1}}
@keyframes crashMultIn{0%{transform:scale(1.35) translateY(-4px);opacity:0}100%{transform:scale(1) translateY(0);opacity:1}}
@keyframes crashCashedPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,255,136,0),0 16px 60px rgba(0,0,0,.7)}50%{box-shadow:0 0 0 8px rgba(0,255,136,.06),0 16px 60px rgba(0,0,0,.7)}}
@keyframes crashExplosion{0%{transform:scale(0) rotate(0);opacity:1}50%{transform:scale(1.8) rotate(15deg);opacity:.7}100%{transform:scale(3) rotate(25deg);opacity:0}}
@keyframes crashOrbit{from{transform:rotate(0deg) translateX(18px) rotate(0deg)}to{transform:rotate(360deg) translateX(18px) rotate(-360deg)}}
@keyframes crashFlame{0%,100%{transform:scaleY(1) scaleX(1)}50%{transform:scaleY(1.35) scaleX(.82)}}
@keyframes crashGlow{0%,100%{opacity:.4}50%{opacity:.9}}
@keyframes crashStarTwinkle{0%,100%{opacity:.2}50%{opacity:.9}}

.crash-wrap{width:100%;border-radius:20px;overflow:hidden;position:relative;background:linear-gradient(180deg,#03010a 0%,#060416 40%,#04020e 100%);border:1px solid rgba(124,58,237,.2);box-shadow:0 16px 64px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.04);transition:border-color .3s,box-shadow .3s;}
.crash-wrap.flying{border-color:rgba(0,255,136,.3);box-shadow:0 16px 64px rgba(0,0,0,.8),0 0 40px rgba(0,255,136,.06);}
.crash-wrap.crashed{border-color:rgba(239,68,68,.45);box-shadow:0 0 0 1px rgba(239,68,68,.08),0 16px 64px rgba(0,0,0,.8),0 0 60px rgba(239,68,68,.14);animation:crashShake .55s ease;}
.crash-wrap.cashed_out{border-color:rgba(0,255,136,.5);animation:crashCashedPulse 1s ease;}
.crash-canvas-wrap{position:relative;width:100%;}
.crash-overlay{position:absolute;inset:0;pointer-events:none;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:22px;gap:6px;}
.crash-mult-big{font-family:var(--fh);font-size:4.8rem;font-weight:900;letter-spacing:-.05em;line-height:1;font-variant-numeric:tabular-nums;transition:color .25s,text-shadow .25s;}
.crash-mult-big.fly{color:#00ff88;text-shadow:0 0 80px rgba(0,255,136,.45),0 0 160px rgba(0,255,136,.15);}
.crash-mult-big.done-crash{color:#ef4444;text-shadow:0 0 80px rgba(239,68,68,.6);}
.crash-mult-big.done-cash{color:#00ff88;text-shadow:0 0 80px rgba(0,255,136,.6);}
.crash-mult-big.idle{color:rgba(167,139,250,.35);}
.crash-status-tag{display:inline-flex;align-items:center;gap:6px;padding:4px 14px;border-radius:20px;font-size:.68rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(8px);}
.crash-status-tag.flying{background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.3);color:var(--nG);}
.crash-status-tag.crashed{background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.35);color:var(--rd);}
.crash-status-tag.cashed{background:rgba(0,255,136,.12);border:1px solid rgba(0,255,136,.35);color:var(--nG);}
.crash-status-tag.idle{background:rgba(167,139,250,.07);border:1px solid rgba(167,139,250,.2);color:var(--tx3);}
.crash-status-tag.countdown{background:rgba(245,196,0,.1);border:1px solid rgba(245,196,0,.3);color:var(--go);}
.crash-countdown-big{font-family:var(--fh);font-size:5rem;font-weight:900;color:var(--go);text-shadow:0 0 60px rgba(245,196,0,.7);animation:crashCountPop .4s cubic-bezier(.34,1.4,.64,1);}
.crash-history{display:flex;flex-wrap:wrap;gap:5px;align-items:center;min-height:26px;}
.ch-badge{padding:4px 11px;border-radius:20px;font-size:.7rem;font-weight:800;font-variant-numeric:tabular-nums;cursor:default;transition:transform .12s;}
.ch-badge:hover{transform:scale(1.06);}
.ch-crash{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.28);color:var(--rd);}
.ch-low{background:rgba(0,255,136,.07);border:1px solid rgba(0,255,136,.2);color:var(--nG);}
.ch-mid{background:rgba(245,196,0,.08);border:1px solid rgba(245,196,0,.25);color:var(--go);}
.ch-high{background:rgba(192,132,252,.1);border:1px solid rgba(192,132,252,.3);color:var(--puLL);}
@keyframes cashoutPulse{0%,100%{box-shadow:0 4px 24px rgba(0,255,136,.35),0 0 0 0 rgba(0,255,136,.4)}50%{box-shadow:0 8px 40px rgba(0,255,136,.55),0 0 0 6px rgba(0,255,136,.08)}}
.crash-cashout-btn{width:100%;padding:16px;border-radius:12px;border:none;font-family:var(--fh);font-size:1rem;font-weight:800;cursor:pointer;background:linear-gradient(135deg,#059669,#00e676,#00ff88);color:#001a0a;transition:all .15s cubic-bezier(.34,1.2,.64,1);display:flex;align-items:center;justify-content:center;gap:8px;letter-spacing:.01em;animation:cashoutPulse 1.2s ease-in-out infinite;}
.crash-cashout-btn:hover{transform:translateY(-2px) scale(1.015);filter:brightness(1.08);}
.crash-cashout-btn:active{transform:scale(.97);animation:none;}
.crash-cashout-btn:disabled{opacity:.28;cursor:not-allowed;transform:none;animation:none;}

/* ═══════════════════════ RESPONSIVE ═══════════════════════ */

/* ── Tablet (≤ 640 px) ── */
@media(max-width:640px){
  .crash-wrap{border-radius:14px;}

  /* Overlay multiplier */
  .crash-mult-big{font-size:3.4rem;}
  .crash-countdown-big{font-size:3.6rem;}
  .crash-status-tag{font-size:.6rem;padding:3px 10px;}
  .crash-overlay{padding-top:14px;gap:5px;}

  /* History */
  .crash-history{gap:4px;}
  .ch-badge{font-size:.62rem;padding:3px 8px;}

  /* Cashout button */
  .crash-cashout-btn{padding:13px;font-size:.9rem;}
}

/* ── Standard phone (≤ 480 px) ── */
@media(max-width:480px){
  .crash-wrap{border-radius:11px;}

  /* Overlay */
  .crash-mult-big{font-size:2.6rem;}
  .crash-countdown-big{font-size:2.8rem;}
  .crash-status-tag{font-size:.55rem;padding:3px 8px;gap:4px;}
  .crash-overlay{padding-top:10px;gap:4px;}

  /* History badges — wrap tightly */
  .crash-history{gap:3px;flex-wrap:wrap;}
  .ch-badge{font-size:.56rem;padding:2px 6px;border-radius:14px;}

  /* Cashout */
  .crash-cashout-btn{padding:11px;font-size:.82rem;border-radius:10px;gap:6px;}
}

/* ── Very small phone (≤ 360 px) ── */
@media(max-width:360px){
  .crash-mult-big{font-size:2.1rem;}
  .crash-countdown-big{font-size:2.3rem;}
  .crash-cashout-btn{padding:9px;font-size:.74rem;}
}

`;

export { CSS_CRASH };
