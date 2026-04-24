const CSS_HILO=`
/* ═══════════════════════ HI-LO SPECIFIC ═══════════════════════ */

/* Luxury felt table */
.card-table{width:100%;background:linear-gradient(160deg,#07150e 0%,#0a1f14 40%,#061510 70%,#040e09 100%);border-radius:18px;padding:22px 20px 20px;position:relative;overflow:hidden;border:1px solid rgba(0,180,90,.12);box-shadow:0 8px 40px rgba(0,0,0,.7),inset 0 1px 0 rgba(0,200,100,.06),inset 0 -1px 0 rgba(0,0,0,.5);}
/* Felt texture overlay */
.card-table::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;border-radius:18px;}
/* Felt vignette */
.card-table::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(0,0,0,.45) 100%);pointer-events:none;border-radius:18px;}
/* Gold border accent */
.felt-border{position:absolute;inset:8px;border-radius:12px;border:1px solid rgba(180,140,0,.1);pointer-events:none;z-index:0;}
.felt-inner{position:relative;z-index:1;}

/* Card history strip */
.card-strip{display:flex;gap:6px;justify-content:center;align-items:center;margin-bottom:20px;min-height:56px;}
.strip-card{width:40px;height:58px;border-radius:7px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;font-weight:800;font-size:.92rem;position:relative;border:1px solid rgba(255,255,255,.15);box-shadow:0 3px 10px rgba(0,0,0,.5);}
.strip-card.rc{background:linear-gradient(145deg,#fff8f8,#ffe8e8);color:#b91c1c;}
.strip-card.bc{background:linear-gradient(145deg,#f8f8ff,#ece8ff);color:#1e1060;}
.strip-card.faded{opacity:.35;transform:scale(.85);}
.sc-s{font-size:.58rem;opacity:.65;}

/* Main card stage */
.card-stage{display:flex;align-items:center;justify-content:center;gap:24px;}

/* 3D card slot */
.card-slot{width:108px;height:158px;border-radius:13px;position:relative;perspective:800px;}
@keyframes cardFlip{0%{transform:rotateY(0deg) scale(1)}25%{transform:rotateY(90deg) scale(.96)}50%{transform:rotateY(90deg) scale(.96)}75%{transform:rotateY(0deg) scale(1.04)}100%{transform:rotateY(0deg) scale(1)}}
@keyframes cardWin{0%{transform:scale(1) rotate(0deg)}30%{transform:scale(1.08) rotate(1.5deg)}60%{transform:scale(1.04) rotate(-1deg)}100%{transform:scale(1) rotate(0deg)}}
@keyframes cardLose{0%{transform:scale(1)}20%{transform:scale(1.05) rotate(-2deg)}40%{transform:scale(.95) rotate(1deg)}60%{transform:scale(1.02) rotate(-.5deg)}100%{transform:scale(1) rotate(0deg)}}
.card-inner{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform .5s cubic-bezier(.4,0,.2,1);}
.card-inner.flipping{animation:cardFlip .5s cubic-bezier(.4,0,.2,1);}
.card-inner.win-anim{animation:cardWin .4s ease;}
.card-inner.lose-anim{animation:cardLose .45s ease;}

/* Card back — luxury design */
.cback{position:absolute;inset:0;border-radius:12px;background:linear-gradient(145deg,#1e0a45,#2d1270,#1a0840);border:2px solid rgba(167,139,250,.35);box-shadow:0 6px 24px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.1);overflow:hidden;}
.cback::before{content:'';position:absolute;inset:6px;border-radius:8px;border:1px solid rgba(167,139,250,.2);background:repeating-linear-gradient(45deg,rgba(167,139,250,.06) 0,rgba(167,139,250,.06) 1.5px,transparent 1.5px,transparent 9px),repeating-linear-gradient(-45deg,rgba(167,139,250,.06) 0,rgba(167,139,250,.06) 1.5px,transparent 1.5px,transparent 9px);}
.cback-logo{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-size:1.8rem;font-weight:800;color:rgba(167,139,250,.25);letter-spacing:.05em;}
/* Deck piles */
.deck-pile{position:relative;width:108px;height:158px;}
.deck-layer{position:absolute;width:108px;height:158px;border-radius:12px;background:linear-gradient(145deg,#1e0a45,#2d1270);border:2px solid rgba(167,139,250,.2);}

/* Card face — premium paper */
.cface{position:absolute;inset:0;border-radius:12px;border:2px solid rgba(255,255,255,.85);overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.6),0 2px 8px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,1);}
.cface.rf{background:linear-gradient(145deg,#fffafa,#fff3f3,#ffe8e8);}
.cface.bf{background:linear-gradient(145deg,#f8f8ff,#f2f0ff,#ece8ff);}
/* Paper grain */
.cface::after{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");pointer-events:none;}
.cf-corner{position:absolute;line-height:1.2;user-select:none;}
.cf-tl{top:6px;left:8px;}
.cf-br{bottom:6px;right:8px;transform:rotate(180deg);}
.cf-rk{font-family:var(--fp);font-size:1.05rem;font-weight:700;display:block;line-height:1;}
.cf-sm{font-size:.72rem;display:block;text-align:center;line-height:1;}
.cf-center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}

/* Pip grid SVG */
.pip-svg{position:absolute;inset:0;}

/* Face card frame */
.fc-frame{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.fc-bg{position:absolute;inset:16px;border-radius:6px;opacity:.06;}

/* Result badge */
.rbadge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);padding:4px 14px;border-radius:20px;font-size:.7rem;font-weight:800;letter-spacing:.07em;white-space:nowrap;z-index:5;}
.rb-w{background:rgba(0,255,136,.15);border:1px solid rgba(0,255,136,.45);color:var(--nG);box-shadow:0 0 12px rgba(0,255,136,.2);}
.rb-l{background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.45);color:var(--rd);box-shadow:0 0 12px rgba(239,68,68,.2);}
.rb-c{background:rgba(245,196,0,.15);border:1px solid rgba(245,196,0,.45);color:var(--go);box-shadow:0 0 12px rgba(245,196,0,.2);}

/* VS divider */
.vs-div{display:flex;flex-direction:column;align-items:center;gap:6px;color:var(--tx3);font-size:.7rem;font-weight:700;letter-spacing:.08em;}
.vs-line{width:1px;height:32px;background:linear-gradient(to bottom,transparent,rgba(167,139,250,.2),transparent);}

/* Probability bar */
.prob-wrap{display:flex;gap:7px;align-items:center;padding:9px 13px;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.05);border-radius:10px;}
.prob-lbl{font-size:.65rem;font-weight:700;white-space:nowrap;font-variant-numeric:tabular-nums;}
.prob-track{flex:1;height:7px;border-radius:4px;background:rgba(255,255,255,.07);overflow:hidden;display:flex;gap:1px;}
.prob-hi{height:100%;background:linear-gradient(90deg,#059669,var(--nG));border-radius:4px 0 0 4px;transition:width .45s cubic-bezier(.34,1.2,.64,1);}
.prob-lo{height:100%;background:linear-gradient(90deg,rgba(239,68,68,.7),var(--rd));border-radius:0 4px 4px 0;transition:width .45s cubic-bezier(.34,1.2,.64,1);}

/* Rank ladder */
.rank-ladder{display:flex;gap:3px;align-items:flex-end;padding:10px 12px 8px;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.05);border-radius:10px;}
.rl-col{display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;}
.rl-bar-w{width:100%;position:relative;}
.rl-bar-bg{width:100%;border-radius:3px;background:rgba(255,255,255,.07);}
.rl-bar-fill{width:100%;border-radius:3px;transition:background .3s;}
.rl-bar-fill.cur{background:linear-gradient(to top,var(--pu),var(--puLL));box-shadow:0 0 10px var(--pu);}
.rl-bar-fill.done{background:rgba(167,139,250,.28);}
.rl-bar-fill.idle{background:rgba(255,255,255,.07);}
.rl-label{font-size:.56rem;color:var(--tx3);font-weight:600;}

/* HI/LO BUTTONS — the main action */
.hlbtns{display:flex;gap:10px;width:100%;}
.hlbtn{flex:1;border:none;border-radius:13px;padding:16px 10px 14px;cursor:pointer;font-family:var(--f);display:flex;flex-direction:column;align-items:center;gap:5px;transition:all .2s cubic-bezier(.34,1.2,.64,1);position:relative;overflow:hidden;}
.hlbtn::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.08) 0,transparent 50%);pointer-events:none;}
.hlbtn::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);transform:translateX(-100%);transition:transform .55s;}
.hlbtn:hover:not(:disabled)::after{transform:translateX(100%);}
.hlbtn:disabled{opacity:.22;cursor:not-allowed;transform:none;}
.hlbtn:active:not(:disabled){transform:scale(.93);}
.hlbtn.hi{background:linear-gradient(145deg,#062918,#0a3d22);border:1.5px solid rgba(0,255,136,.3);box-shadow:0 4px 22px rgba(0,180,80,.2),inset 0 1px 0 rgba(0,255,136,.12);}
.hlbtn.hi:hover:not(:disabled){background:linear-gradient(145deg,#0a3d22,#0f522c);border-color:rgba(0,255,136,.5);box-shadow:0 8px 32px rgba(0,180,80,.35),0 0 0 1px rgba(0,255,136,.15),inset 0 1px 0 rgba(0,255,136,.18);transform:translateY(-3px);}
.hlbtn.lo{background:linear-gradient(145deg,#2a0608,#3d0c10);border:1.5px solid rgba(239,68,68,.28);box-shadow:0 4px 22px rgba(180,30,40,.2),inset 0 1px 0 rgba(255,80,80,.1);}
.hlbtn.lo:hover:not(:disabled){background:linear-gradient(145deg,#3d0c10,#520f14);border-color:rgba(239,68,68,.5);box-shadow:0 8px 32px rgba(180,30,40,.35),0 0 0 1px rgba(239,68,68,.15),inset 0 1px 0 rgba(255,80,80,.15);transform:translateY(-3px);}
.hb-ico{display:flex;align-items:center;gap:6px;margin-bottom:2px;}
.hb-tag{font-size:.7rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;}
.hlbtn.hi .hb-tag{color:#00ff88;}
.hlbtn.lo .hb-tag{color:#ef4444;}
.hb-mult{font-family:var(--fh);font-size:1.55rem;font-weight:800;letter-spacing:-.02em;line-height:1;}
.hlbtn.hi .hb-mult{color:#00ff88;text-shadow:0 0 16px rgba(0,255,136,.35);}
.hlbtn.lo .hb-mult{color:#ef4444;text-shadow:0 0 16px rgba(239,68,68,.35);}
.hb-prob{font-size:.64rem;opacity:.6;font-weight:500;}

`;

export { CSS_HILO };
