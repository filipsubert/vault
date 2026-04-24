const CSS_VIDEOPOKER=`
/* ═══════════════════════ VIDEO POKER ═══════════════════════ */
@keyframes vpDeal{0%{transform:translateY(-60px) rotate(-6deg) scale(.75);opacity:0}65%{transform:translateY(3px) rotate(.5deg) scale(1.04)}100%{transform:translateY(0) rotate(0) scale(1);opacity:1}}
@keyframes vpHoldPop{0%{transform:scale(0) rotate(-15deg);opacity:0}55%{transform:scale(1.2) rotate(3deg)}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes vpWin{0%{transform:scale(1)}30%{transform:scale(1.04) translateY(-2px)}65%{transform:scale(.98)}100%{transform:scale(1)}}
@keyframes vpResultIn{0%{opacity:0;transform:translateY(-8px) scale(.95)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes vpTableShine{0%{background-position:200% center}100%{background-position:-200% center}}
.vp-table{width:100%;border-radius:20px;padding:20px 16px 16px;background:linear-gradient(160deg,#07120a 0%,#0b1c0f 35%,#081510 65%,#050e07 100%);border:1px solid rgba(0,180,80,.13);box-shadow:0 10px 50px rgba(0,0,0,.8),inset 0 1px 0 rgba(0,200,80,.06),inset 0 -1px 0 rgba(0,0,0,.5);position:relative;overflow:hidden;}
.vp-table::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E");border-radius:20px;pointer-events:none;}
.vp-table::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(0,0,0,.45) 100%);pointer-events:none;}
.vp-inner{position:relative;z-index:1;}
.vp-paytable{width:100%;border-collapse:collapse;margin-bottom:14px;}
.vp-paytable tr{border-bottom:1px solid rgba(255,255,255,.05);transition:background .12s;}
.vp-paytable tr:hover{background:rgba(255,255,255,.03);}
.vp-paytable tr.vp-winner{background:rgba(0,255,136,.08)!important;animation:vpWin .4s ease;}
.vp-paytable td{padding:5px 8px;font-size:.72rem;white-space:nowrap;}
.vp-pt-name{color:var(--tx2);font-weight:600;letter-spacing:.02em;}
.vp-pt-name.highlighted{color:var(--tx);font-weight:700;}
.vp-pt-mult{color:var(--puLL);font-weight:800;text-align:center;font-family:var(--fh);font-variant-numeric:tabular-nums;}
.vp-pt-win{color:var(--go);font-weight:700;text-align:right;font-family:var(--fh);font-variant-numeric:tabular-nums;}
.vp-cards{display:flex;gap:8px;justify-content:center;margin:8px 0;}
.vp-card-wrap{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;user-select:none;flex:1;max-width:92px;}
.vp-card{width:100%;aspect-ratio:.71;border-radius:10px;position:relative;transition:transform .18s cubic-bezier(.34,1.2,.64,1),box-shadow .18s;overflow:hidden;}
.vp-card:hover:not(.vp-card-idle){transform:translateY(-6px);}
.vp-card.vp-card-deal{animation:vpDeal .38s cubic-bezier(.34,1.2,.64,1) backwards;}
.vp-card-face{position:absolute;inset:0;border-radius:10px;border:2px solid rgba(255,255,255,.88);}
.vp-card-face.vp-rf{background:linear-gradient(145deg,#fffafa,#fff3f3,#ffe8e8);}
.vp-card-face.vp-bf{background:linear-gradient(145deg,#f8f8ff,#f2f0ff,#ece8ff);}
.vp-card-face::after{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.022'/%3E%3C/svg%3E");pointer-events:none;}
.vp-card-back{position:absolute;inset:0;border-radius:10px;background:linear-gradient(145deg,#1e0a45,#2d1270,#1a0840);border:2px solid rgba(167,139,250,.35);}
.vp-card-back::before{content:'';position:absolute;inset:6px;border-radius:6px;border:1px solid rgba(167,139,250,.2);background:repeating-linear-gradient(45deg,rgba(167,139,250,.055) 0,rgba(167,139,250,.055) 1.5px,transparent 1.5px,transparent 9px),repeating-linear-gradient(-45deg,rgba(167,139,250,.055) 0,rgba(167,139,250,.055) 1.5px,transparent 1.5px,transparent 9px);}
.vp-corner{position:absolute;line-height:1.2;user-select:none;}
.vp-tl{top:5px;left:7px;}.vp-br{bottom:5px;right:7px;transform:rotate(180deg);}
.vp-crk{font-family:var(--fp);font-size:1rem;font-weight:700;display:block;line-height:1;}
.vp-csm{font-size:.68rem;display:block;text-align:center;line-height:1;}
.vp-center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}
.vp-held{position:absolute;top:-1px;left:0;right:0;display:flex;justify-content:center;}
.vp-hold-tag{background:linear-gradient(135deg,var(--pu),var(--puLL));color:#fff;font-size:.56rem;font-weight:900;letter-spacing:.1em;padding:3px 10px;border-radius:0 0 8px 8px;animation:vpHoldPop .25s cubic-bezier(.34,1.4,.64,1);}
.vp-held-ring{position:absolute;inset:-3px;border-radius:13px;border:2.5px solid rgba(167,139,250,.7);box-shadow:0 0 12px rgba(124,58,237,.45),inset 0 0 12px rgba(124,58,237,.1);pointer-events:none;}
.vp-result-bar{width:100%;padding:10px 16px;border-radius:12px;background:linear-gradient(145deg,rgba(0,255,136,.07),rgba(0,255,136,.03));border:1px solid rgba(0,255,136,.28);display:flex;align-items:center;justify-content:space-between;animation:vpResultIn .3s ease;min-height:44px;}
.vp-result-bar.lose{background:linear-gradient(145deg,rgba(239,68,68,.07),rgba(239,68,68,.02));border-color:rgba(239,68,68,.28);}
.vp-result-bar.push{background:linear-gradient(145deg,rgba(245,196,0,.06),rgba(245,196,0,.02));border-color:rgba(245,196,0,.25);}
.vp-result-name{font-family:var(--fh);font-size:.95rem;font-weight:800;color:var(--nG);}
.vp-result-bar.lose .vp-result-name{color:var(--rd);}
.vp-result-bar.push .vp-result-name{color:var(--go);}
.vp-result-amt{font-family:var(--fh);font-size:1.1rem;font-weight:800;color:var(--nG);font-variant-numeric:tabular-nums;}
.vp-result-bar.lose .vp-result-amt{color:var(--rd);}
.vp-result-bar.push .vp-result-amt{color:var(--go);}
.vp-deal-btn{width:100%;padding:14px;border-radius:12px;border:none;font-family:var(--fh);font-size:.95rem;font-weight:800;cursor:pointer;background:linear-gradient(135deg,#059669,#00ff88);color:#001a0a;box-shadow:0 4px 20px rgba(0,255,136,.3);transition:all .16s cubic-bezier(.34,1.2,.64,1);letter-spacing:.02em;}
.vp-deal-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,255,136,.45);}
.vp-deal-btn:disabled{opacity:.3;cursor:not-allowed;transform:none;}
.vp-draw-btn{width:100%;padding:14px;border-radius:12px;border:none;font-family:var(--fh);font-size:.95rem;font-weight:800;cursor:pointer;background:linear-gradient(135deg,var(--pu),var(--puLL));color:#fff;box-shadow:0 4px 20px rgba(124,58,237,.35);transition:all .16s cubic-bezier(.34,1.2,.64,1);letter-spacing:.02em;}
.vp-draw-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(124,58,237,.55);}
`;

export { CSS_VIDEOPOKER };
