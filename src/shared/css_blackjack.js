const CSS_BLACKJACK=`
/* ═══════════════════════ BLACKJACK ═══════════════════════ */
@keyframes bjDeal{0%{transform:translate(-60px,-40px) rotate(-8deg) scale(.7);opacity:0}70%{transform:translate(2px,2px) rotate(.5deg) scale(1.03)}100%{transform:translate(0,0) rotate(0) scale(1);opacity:1}}
@keyframes bjFlip{0%{transform:rotateY(-90deg) scale(.92);opacity:0}55%{transform:rotateY(10deg) scale(1.05)}80%{transform:rotateY(-4deg)}100%{transform:rotateY(0) scale(1);opacity:1}}
@keyframes bjBust{0%,100%{transform:translateX(0)}15%{transform:translateX(-8px) rotate(-1deg)}30%{transform:translateX(8px) rotate(1deg)}45%{transform:translateX(-6px)}60%{transform:translateX(6px)}75%{transform:translateX(-3px)}}
@keyframes bjWin{0%{transform:scale(1)}35%{transform:scale(1.06) translateY(-3px)}70%{transform:scale(.98)}100%{transform:scale(1)}}
@keyframes bjPop{0%{transform:scale(0) rotate(-15deg);opacity:0}55%{transform:scale(1.18) rotate(3deg)}80%{transform:scale(.95) rotate(-1deg)}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes chipBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}

/* Table */
.bj-table{width:100%;background:linear-gradient(160deg,#071008 0%,#0c1e0a 35%,#071510 65%,#050e08 100%);border-radius:20px;padding:20px 18px 18px;position:relative;overflow:hidden;border:1px solid rgba(0,160,70,.15);box-shadow:0 10px 50px rgba(0,0,0,.8),inset 0 1px 0 rgba(0,180,70,.08),inset 0 -1px 0 rgba(0,0,0,.6);}
.bj-table::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");border-radius:20px;pointer-events:none;}
.bj-table::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 38%,rgba(0,0,0,.5) 100%);border-radius:20px;pointer-events:none;}
.bj-felt-border{position:absolute;inset:9px;border-radius:13px;border:1px solid rgba(160,120,0,.1);pointer-events:none;z-index:0;}
.bj-inner{position:relative;z-index:1;}

/* Hand layout */
.bj-hand-area{display:flex;flex-direction:column;gap:14px;}
.bj-hand-label{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
.bj-hl-name{font-size:.62rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--tx3);}
.bj-score-badge{display:flex;align-items:center;gap:5px;padding:4px 11px;border-radius:10px;font-family:var(--fh);font-size:.85rem;font-weight:800;font-variant-numeric:tabular-nums;backdrop-filter:blur(8px);}
.bj-score-badge.neutral{background:rgba(255,255,255,.06);color:var(--tx2);border:1px solid rgba(255,255,255,.1);}
.bj-score-badge.good{background:rgba(0,255,136,.1);color:var(--nG);border:1px solid rgba(0,255,136,.25);}
.bj-score-badge.danger{background:rgba(239,68,68,.1);color:var(--rd);border:1px solid rgba(239,68,68,.25);}
.bj-score-badge.bust{background:rgba(239,68,68,.18);color:var(--rd);border:1px solid rgba(239,68,68,.4);}
.bj-score-badge.bj{background:rgba(245,196,0,.14);color:var(--go);border:1px solid rgba(245,196,0,.35);}

/* Card hand */
.bj-cards{display:flex;gap:8px;flex-wrap:wrap;min-height:110px;align-items:flex-start;}
.bj-card{width:70px;height:100px;border-radius:9px;flex-shrink:0;position:relative;animation:bjDeal .32s cubic-bezier(.34,1.2,.64,1) both;}
.bj-card-face{position:absolute;inset:0;border-radius:9px;overflow:hidden;border:1.5px solid rgba(255,255,255,.85);box-shadow:0 6px 22px rgba(0,0,0,.65),0 2px 6px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.9);}
.bj-card-face.rf{background:linear-gradient(145deg,#fffafa,#fff3f3,#ffe8e8);}
.bj-card-face.bf{background:linear-gradient(145deg,#f8f8ff,#f2f0ff,#ece8ff);}
.bj-card-back{position:absolute;inset:0;border-radius:9px;background:linear-gradient(145deg,#1e0a45,#2d1270,#1a0840);border:1.5px solid rgba(167,139,250,.4);box-shadow:0 6px 22px rgba(0,0,0,.65);overflow:hidden;}
.bj-card-back::before{content:'';position:absolute;inset:5px;border-radius:5px;border:1px solid rgba(167,139,250,.2);background:repeating-linear-gradient(45deg,rgba(167,139,250,.06) 0,rgba(167,139,250,.06) 1.5px,transparent 1.5px,transparent 8px),repeating-linear-gradient(-45deg,rgba(167,139,250,.06) 0,rgba(167,139,250,.06) 1.5px,transparent 1.5px,transparent 8px);}
.bj-card-back-logo{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-size:1.4rem;font-weight:800;color:rgba(167,139,250,.2);}
.bj-corner{position:absolute;line-height:1.2;}
.bj-corner.tl{top:5px;left:6px;}
.bj-corner.br{bottom:5px;right:6px;transform:rotate(180deg);}
.bj-crk{font-family:'Playfair Display',Georgia,serif;font-size:.88rem;font-weight:700;display:block;line-height:1;color:inherit;}
.bj-csm{font-size:.6rem;display:block;text-align:center;line-height:1;color:inherit;}
.bj-center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}
.bj-card.new{animation:bjFlip .35s cubic-bezier(.34,1.2,.64,1);}
.bj-card.bust-anim{animation:bjBust .4s ease;}
.bj-card.win-anim{animation:bjWin .35s ease;}

/* Divider */
.bj-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent);margin:4px 0;}

/* Result overlay */
.bj-result{position:absolute;inset:0;border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;z-index:10;backdrop-filter:blur(6px);}
.bj-result.win{background:rgba(0,255,136,.06);}
.bj-result.lose{background:rgba(239,68,68,.06);}
.bj-result.push{background:rgba(245,196,0,.05);}
.bj-result-title{font-family:var(--fh);font-size:1.8rem;font-weight:800;animation:bjPop .4s cubic-bezier(.34,1.4,.64,1);}
.bj-result.win .bj-result-title{color:var(--nG);text-shadow:0 0 30px rgba(0,255,136,.55);}
.bj-result.lose .bj-result-title{color:var(--rd);text-shadow:0 0 24px rgba(239,68,68,.5);}
.bj-result.push .bj-result-title{color:var(--go);text-shadow:0 0 22px rgba(245,196,0,.45);}
.bj-result-sub{font-size:.8rem;color:rgba(255,255,255,.6);font-weight:600;}

/* Bet chips row */
.bj-chips{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;}
.bj-chip{width:46px;height:46px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-size:.72rem;font-weight:900;border:3px solid rgba(255,255,255,.2);transition:all .18s cubic-bezier(.34,1.4,.64,1);user-select:none;position:relative;box-shadow:0 4px 14px rgba(0,0,0,.5);}
.bj-chip:hover{transform:translateY(-4px) scale(1.12);box-shadow:0 8px 22px rgba(0,0,0,.55);}
.bj-chip:active{transform:scale(.9);}
.bj-chip.sel{animation:chipBounce .5s ease infinite;box-shadow:0 0 0 3px rgba(255,255,255,.25),0 8px 24px rgba(0,0,0,.5);}

/* Insurance bar */
.bj-insurance{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:rgba(245,196,0,.06);border:1px solid rgba(245,196,0,.22);border-radius:10px;animation:bjPop .3s ease;}

/* ═══════════════════════ RESPONSIVE ═══════════════════════ */

/* ── Tablet (≤ 640 px) ── */
@media(max-width:640px){
  .bj-table{padding:14px 12px 12px;border-radius:14px;}

  /* Cards smaller */
  .bj-card{width:58px;height:84px;border-radius:7px;}
  .bj-card-face{border-radius:7px;}
  .bj-card-back{border-radius:7px;}
  .bj-crk{font-size:.76rem;}
  .bj-csm{font-size:.52rem;}
  .bj-corner.tl{top:4px;left:5px;}
  .bj-corner.br{bottom:4px;right:5px;}

  /* Hand area */
  .bj-cards{gap:6px;min-height:88px;}
  .bj-hand-area{gap:10px;}
  .bj-hand-label{margin-bottom:5px;}

  /* Score badge */
  .bj-score-badge{font-size:.75rem;padding:3px 9px;}

  /* Chips */
  .bj-chip{width:40px;height:40px;font-size:.65rem;border-width:2.5px;}

  /* Result overlay */
  .bj-result-title{font-size:1.5rem;}
  .bj-result-sub{font-size:.72rem;}

  /* Insurance */
  .bj-insurance{padding:8px 11px;}
}

/* ── Standard phone (≤ 480 px) ── */
@media(max-width:480px){
  .bj-table{padding:10px 9px 10px;border-radius:11px;}

  /* Cards */
  .bj-card{width:48px;height:70px;border-radius:6px;}
  .bj-card-face{border-radius:6px;}
  .bj-card-back{border-radius:6px;}
  .bj-crk{font-size:.66rem;}
  .bj-csm{font-size:.46rem;}
  .bj-corner.tl{top:3px;left:4px;}
  .bj-corner.br{bottom:3px;right:4px;}

  /* Hand */
  .bj-cards{gap:5px;min-height:74px;}
  .bj-hl-name{font-size:.55rem;}
  .bj-score-badge{font-size:.68rem;padding:3px 8px;border-radius:8px;}

  /* Chips */
  .bj-chip{width:36px;height:36px;font-size:.58rem;border-width:2px;}
  .bj-chips{gap:6px;}

  /* Result */
  .bj-result-title{font-size:1.25rem;}
  .bj-result-sub{font-size:.65rem;}

  /* Divider spacing */
  .bj-divider{margin:8px 0 !important;}

  /* Insurance */
  .bj-insurance{padding:7px 10px;border-radius:8px;flex-wrap:wrap;gap:6px;}
}

/* ── Very small phone (≤ 360 px) ── */
@media(max-width:360px){
  .bj-card{width:42px;height:62px;}
  .bj-crk{font-size:.58rem;}
  .bj-chip{width:32px;height:32px;font-size:.52rem;}
  .bj-result-title{font-size:1.1rem;}
  .bj-cards{gap:4px;min-height:66px;}
}

`;

export { CSS_BLACKJACK };
