const CSS_COINFLIP=`
/* ═══════════════════════ COINFLIP ═══════════════════════ */
@keyframes cfLand{0%{transform:scale(1)}30%{transform:scale(1.16) translateY(-8px)}65%{transform:scale(.94)}85%{transform:scale(1.05)}100%{transform:scale(1)}}
@keyframes cfStreakPop{0%{transform:scale(1)}35%{transform:scale(1.22)}70%{transform:scale(.94)}100%{transform:scale(1)}}
@keyframes cfBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes cfWinFlash{0%{background:rgba(0,255,136,.18)}100%{background:transparent}}
@keyframes cfLoseFlash{0%{background:rgba(239,68,68,.18)}100%{background:transparent}}
@keyframes cfEaseIn{from{opacity:0;transform:translateY(22px) scale(.93)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes cfRimSpin{from{stroke-dashoffset:0}to{stroke-dashoffset:-440}}
@keyframes cfPulseRing{0%,100%{opacity:.25}50%{opacity:.7}}

.cf-coin-wrap{position:relative;display:flex;align-items:center;justify-content:center;width:220px;height:220px;flex-shrink:0;}
.cf-orbit-ring{position:absolute;inset:0;pointer-events:none;}
.cf-coin{width:168px;height:168px;position:relative;cursor:default;perspective:1100px;}
/* Coin: outer wrapper handles bounce, inner handles rotation — never conflict */
.cf-coin{width:168px;height:168px;position:relative;cursor:default;perspective:1100px;}
.cf-coin-bounce{width:100%;height:100%;}
.cf-coin-bounce.idle{animation:cfBounce 3.4s ease-in-out infinite;}
.cf-coin-bounce.landing{animation:cfLand .5s cubic-bezier(.34,1.4,.64,1);}
/* Rotation ONLY lives here — transition always active, never overridden */
.cf-coin-inner{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform 1.8s cubic-bezier(0.10,0,0.20,1);}
.cf-face{position:absolute;inset:0;border-radius:50%;backface-visibility:hidden;overflow:hidden;}
.cf-face-t{transform:rotateY(180deg);}
.cf-glow{position:absolute;inset:-28px;border-radius:50%;pointer-events:none;transition:opacity .45s;}
.cf-glow-h{background:radial-gradient(circle,rgba(245,196,0,.42),transparent 62%);}
.cf-glow-s{background:radial-gradient(circle,rgba(124,58,237,.55),rgba(167,139,250,.2) 45%,transparent 65%);}
.cf-choice-row{display:flex;gap:12px;width:100%;max-width:340px;animation:cfEaseIn .38s ease both;}
.cf-choice-btn{flex:1;padding:14px 8px;border-radius:14px;border:2px solid transparent;cursor:pointer;font-family:var(--fh);font-size:.9rem;font-weight:800;display:flex;flex-direction:column;align-items:center;gap:6px;transition:all .18s cubic-bezier(.34,1.2,.64,1);position:relative;overflow:hidden;}
.cf-choice-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.07),transparent 55%);pointer-events:none;}
.cf-choice-btn.heads{background:linear-gradient(145deg,rgba(38,28,4,.95),rgba(24,18,2,.98));border-color:rgba(245,196,0,.28);color:var(--go);}
.cf-choice-btn.tails{background:linear-gradient(145deg,rgba(22,10,50,.95),rgba(14,6,34,.98));border-color:rgba(167,139,250,.28);color:var(--puLL);}
.cf-choice-btn:hover:not(:disabled){transform:translateY(-3px) scale(1.03);}
.cf-choice-btn.heads:hover:not(:disabled){border-color:rgba(245,196,0,.65);box-shadow:0 10px 32px rgba(0,0,0,.55),0 0 24px rgba(245,196,0,.18);}
.cf-choice-btn.tails:hover:not(:disabled){border-color:rgba(167,139,250,.65);box-shadow:0 10px 32px rgba(0,0,0,.55),0 0 24px rgba(124,58,237,.22);}
.cf-choice-btn:disabled{opacity:.3;cursor:not-allowed;transform:none;}
.cf-choice-lbl{font-size:.8rem;letter-spacing:.07em;opacity:.92;}
.cf-choice-odds{font-size:.6rem;opacity:.45;font-weight:600;}
.cf-streak-display{display:flex;flex-direction:column;align-items:center;gap:6px;animation:cfEaseIn .3s ease both;}
.cf-streak-num{font-family:var(--fh);font-size:4rem;font-weight:900;line-height:1;letter-spacing:-.04em;font-variant-numeric:tabular-nums;transition:color .3s,text-shadow .3s;}
.cf-streak-num.streak-h{color:var(--go);text-shadow:0 0 40px rgba(245,196,0,.55),0 0 80px rgba(245,196,0,.18);}
.cf-streak-num.streak-s{color:var(--puLL);text-shadow:0 0 40px rgba(124,58,237,.6),0 0 80px rgba(167,139,250,.2);}
.cf-streak-num.streak-0{color:rgba(255,255,255,.1);}
.cf-mult-badge{display:inline-flex;align-items:center;gap:5px;padding:5px 14px;border-radius:20px;font-size:.78rem;font-weight:800;}
.cf-mult-h{background:rgba(245,196,0,.1);border:1px solid rgba(245,196,0,.28);color:var(--go);}
.cf-mult-s{background:rgba(124,58,237,.1);border:1px solid rgba(167,139,250,.28);color:var(--puLL);}
.cf-mult-0{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);color:var(--tx3);}
.cf-hist-row{display:flex;gap:5px;flex-wrap:wrap;justify-content:center;max-width:340px;}
.cf-hist-dot{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.58rem;font-weight:800;flex-shrink:0;}
.cf-result-banner{width:100%;max-width:340px;padding:14px 20px;border-radius:14px;text-align:center;font-family:var(--fh);font-weight:800;display:flex;flex-direction:column;gap:3px;animation:cfEaseIn .3s ease both;}
.cf-banner-win{background:linear-gradient(145deg,rgba(0,255,136,.08),rgba(0,200,100,.04));border:1px solid rgba(0,255,136,.3);}
.cf-banner-lose{background:linear-gradient(145deg,rgba(239,68,68,.08),rgba(200,40,40,.04));border:1px solid rgba(239,68,68,.3);}
.cf-banner-title{font-size:.95rem;color:var(--tx);}
.cf-banner-val{font-size:1.55rem;}
.cf-banner-win .cf-banner-val{color:var(--nG);}
.cf-banner-lose .cf-banner-val{color:var(--rd);}
.cf-cashout-btn{width:100%;max-width:340px;padding:15px;border-radius:12px;border:none;font-family:var(--fh);font-size:1rem;font-weight:800;cursor:pointer;background:linear-gradient(135deg,#059669,#00e676,#00ff88);color:#001a0a;transition:all .15s cubic-bezier(.34,1.2,.64,1);display:flex;align-items:center;justify-content:center;gap:8px;animation:cashoutPulse 1.2s ease-in-out infinite;}
.cf-cashout-btn:hover{transform:translateY(-2px) scale(1.015);filter:brightness(1.08);}
.cf-cashout-btn:active{transform:scale(.97);animation:none;}
`;

export { CSS_COINFLIP };
