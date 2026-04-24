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

/* ═══ BASE ═══ */
.crash-wrap{
  width:100%;
  border-radius:20px;
  overflow:hidden;
  position:relative;
  background:linear-gradient(180deg,#03010a 0%,#060416 40%,#04020e 100%);
  border:1px solid rgba(124,58,237,.2);
  box-shadow:0 16px 64px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.04);
  transition:border-color .3s,box-shadow .3s;
  /* Prevent horizontal overflow on mobile */
  max-width:100%;
  box-sizing:border-box;
}
.crash-wrap.flying{border-color:rgba(0,255,136,.3);box-shadow:0 16px 64px rgba(0,0,0,.8),0 0 40px rgba(0,255,136,.06);}
.crash-wrap.crashed{border-color:rgba(239,68,68,.45);box-shadow:0 0 0 1px rgba(239,68,68,.08),0 16px 64px rgba(0,0,0,.8),0 0 60px rgba(239,68,68,.14);animation:crashShake .55s ease;}
.crash-wrap.cashed_out{border-color:rgba(0,255,136,.5);animation:crashCashedPulse 1s ease;}

.crash-canvas-wrap{position:relative;width:100%;}

/* ═══ OVERLAY ═══ */
.crash-overlay{
  position:absolute;
  inset:0;
  pointer-events:none;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
  padding-top:clamp(10px, 3.5vw, 22px);
  gap:clamp(4px, 1vw, 6px);
}

/* Fluid multiplier — scales smoothly 320 px → 1200 px */
.crash-mult-big{
  font-family:var(--fh);
  font-size:clamp(2rem, 7vw + .5rem, 4.8rem);
  font-weight:900;
  letter-spacing:-.05em;
  line-height:1;
  font-variant-numeric:tabular-nums;
  transition:color .25s,text-shadow .25s;
}
.crash-mult-big.fly{color:#00ff88;text-shadow:0 0 80px rgba(0,255,136,.45),0 0 160px rgba(0,255,136,.15);}
.crash-mult-big.done-crash{color:#ef4444;text-shadow:0 0 80px rgba(239,68,68,.6);}
.crash-mult-big.done-cash{color:#00ff88;text-shadow:0 0 80px rgba(0,255,136,.6);}
.crash-mult-big.idle{color:rgba(167,139,250,.35);}

/* Status tag — fluid padding & font */
.crash-status-tag{
  display:inline-flex;
  align-items:center;
  gap:clamp(3px, 1vw, 6px);
  padding:clamp(3px,1vw,4px) clamp(9px,2.5vw,14px);
  border-radius:20px;
  font-size:clamp(.56rem,.8vw + .3rem,.68rem);
  font-weight:800;
  letter-spacing:.08em;
  text-transform:uppercase;
  backdrop-filter:blur(8px);
}
.crash-status-tag.flying{background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.3);color:var(--nG);}
.crash-status-tag.crashed{background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.35);color:var(--rd);}
.crash-status-tag.cashed{background:rgba(0,255,136,.12);border:1px solid rgba(0,255,136,.35);color:var(--nG);}
.crash-status-tag.idle{background:rgba(167,139,250,.07);border:1px solid rgba(167,139,250,.2);color:var(--tx3);}
.crash-status-tag.countdown{background:rgba(245,196,0,.1);border:1px solid rgba(245,196,0,.3);color:var(--go);}

/* Fluid countdown */
.crash-countdown-big{
  font-family:var(--fh);
  font-size:clamp(2.2rem, 7.5vw + .5rem, 5rem);
  font-weight:900;
  color:var(--go);
  text-shadow:0 0 60px rgba(245,196,0,.7);
  animation:crashCountPop .4s cubic-bezier(.34,1.4,.64,1);
}

/* ═══ HISTORY ═══ */
.crash-history{
  display:flex;
  flex-wrap:wrap;
  gap:clamp(3px, 1vw, 5px);
  align-items:center;
  min-height:26px;
}
.ch-badge{
  padding:clamp(3px,.8vw,4px) clamp(7px,2vw,11px);
  border-radius:20px;
  font-size:clamp(.58rem,.5vw + .42rem,.7rem);
  font-weight:800;
  font-variant-numeric:tabular-nums;
  cursor:default;
  transition:transform .12s;
  /* Ensure badges never overflow */
  white-space:nowrap;
}
.ch-badge:hover{transform:scale(1.06);}
.ch-crash{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.28);color:var(--rd);}
.ch-low{background:rgba(0,255,136,.07);border:1px solid rgba(0,255,136,.2);color:var(--nG);}
.ch-mid{background:rgba(245,196,0,.08);border:1px solid rgba(245,196,0,.25);color:var(--go);}
.ch-high{background:rgba(192,132,252,.1);border:1px solid rgba(192,132,252,.3);color:var(--puLL);}

/* ═══ CASHOUT BUTTON ═══ */
@keyframes cashoutPulse{
  0%,100%{box-shadow:0 4px 24px rgba(0,255,136,.35),0 0 0 0 rgba(0,255,136,.4)}
  50%{box-shadow:0 8px 40px rgba(0,255,136,.55),0 0 0 6px rgba(0,255,136,.08)}
}
.crash-cashout-btn{
  width:100%;
  /* Min 52px tall — comfortable thumb target */
  min-height:52px;
  padding:clamp(13px,3.5vw,16px) clamp(14px,3vw,16px);
  border-radius:12px;
  border:none;
  font-family:var(--fh);
  font-size:clamp(.88rem,1.5vw + .55rem,1rem);
  font-weight:800;
  cursor:pointer;
  background:linear-gradient(135deg,#059669,#00e676,#00ff88);
  color:#001a0a;
  transition:all .15s cubic-bezier(.34,1.2,.64,1);
  display:flex;
  align-items:center;
  justify-content:center;
  gap:clamp(6px,1.5vw,8px);
  letter-spacing:.01em;
  animation:cashoutPulse 1.2s ease-in-out infinite;
  /* Prevent text from wrapping on very small screens */
  white-space:nowrap;
  /* Tap highlight suppression for mobile */
  -webkit-tap-highlight-color:transparent;
  touch-action:manipulation;
}
.crash-cashout-btn:hover{transform:translateY(-2px) scale(1.015);filter:brightness(1.08);}
.crash-cashout-btn:active{transform:scale(.97);animation:none;}
.crash-cashout-btn:disabled{opacity:.28;cursor:not-allowed;transform:none;animation:none;}

/* ═══════════════════════ RESPONSIVE ═══════════════════════ */

/*
  Väčšina hodnôt je fluid cez clamp() vyššie.
  Breakpointy riešia len to, čo clamp() nevie — layout a
  vizuálne detaily špecifické pre dané zariadenie.
*/

/* ── Tablet (≤ 640 px) ── */
@media(max-width:640px){
  .crash-wrap{border-radius:14px;}

  /* História — menej riadkov naraz, scrollovateľná na šírku */
  .crash-history{
    flex-wrap:nowrap;
    overflow-x:auto;
    -webkit-overflow-scrolling:touch;
    scrollbar-width:none;
    /* Skry scrollbar na WebKit */
    padding-bottom:2px;
  }
  .crash-history::-webkit-scrollbar{display:none;}
}

/* ── Standard phone (≤ 480 px) ── */
@media(max-width:480px){
  .crash-wrap{border-radius:11px;}

  /* Overlay — trochu menej priestoru hore */
  .crash-overlay{padding-top:8px;gap:3px;}

  /* Cashout — väčší tap target, celá šírka s dostatočnou výškou */
  .crash-cashout-btn{
    min-height:56px;
    border-radius:10px;
  }

  /* História — kompaktnejšie odznaky, ale stále čitateľné */
  .ch-badge{border-radius:12px;}
}

/* ── Veľmi malý telefón (≤ 360 px) ── */
@media(max-width:360px){
  /* Na najmenších obrazovkách trochu zúžime glows aby shader bol rýchlejší */
  .crash-mult-big.fly{text-shadow:0 0 40px rgba(0,255,136,.5);}
  .crash-mult-big.done-crash{text-shadow:0 0 40px rgba(239,68,68,.65);}
  .crash-mult-big.done-cash{text-shadow:0 0 40px rgba(0,255,136,.65);}
  .crash-countdown-big{text-shadow:0 0 30px rgba(245,196,0,.8);}

  /* Cashout — maximálny tap target */
  .crash-cashout-btn{
    min-height:60px;
    font-size:.8rem;
  }
}

/* ── Landscape telefón (nízka výška) ── */
@media(max-height:500px) and (orientation:landscape){
  .crash-overlay{padding-top:6px;gap:2px;}
  .crash-mult-big{font-size:clamp(1.5rem,8vh,2.8rem);}
  .crash-countdown-big{font-size:clamp(1.6rem,8.5vh,3rem);}
  .crash-cashout-btn{min-height:44px;padding:10px 14px;}
}

`;

export { CSS_CRASH };
