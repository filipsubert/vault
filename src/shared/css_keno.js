const CSS_KENO=`
/* ═══════════════════════ KENO SPECIFIC ═══════════════════════ */
@keyframes kTileHit{0%{transform:scale(1)}18%{transform:scale(1.32) translateY(-5px)}45%{transform:scale(.9)}70%{transform:scale(1.1)}100%{transform:scale(1)}}
@keyframes kTileDraw{0%{transform:scale(.4) rotateY(-90deg);opacity:0}55%{transform:scale(1.08) rotateY(6deg)}80%{transform:scale(.96)}100%{transform:scale(1) rotateY(0);opacity:1}}
@keyframes kTileMiss{0%{transform:scale(1)}20%{transform:scale(.88)}50%{transform:scale(1.04)}100%{transform:scale(1)}}
@keyframes kTilePulse{0%,100%{box-shadow:0 0 0 0 rgba(124,58,237,0)}50%{box-shadow:0 0 0 4px rgba(124,58,237,.15)}}
@keyframes kDropFlash{0%{opacity:.7;transform:scale(1.3)}100%{opacity:0;transform:scale(2)}}
@keyframes kBallIn{0%{opacity:0;transform:scale(.1) translateY(-10px)}55%{transform:scale(1.22) translateY(2px)}78%{transform:scale(.9)}100%{opacity:1;transform:scale(1)}}
@keyframes kResIn{0%{opacity:0;transform:translateY(-10px) scale(.95)}100%{opacity:1;transform:translateY(0) scale(1)}}

.kgrid-wrap{width:100%;background:linear-gradient(160deg,#09071a 0%,#0c0a22 50%,#080618 100%);border-radius:20px;padding:18px;position:relative;overflow:hidden;border:1px solid rgba(167,139,250,.14);box-shadow:0 12px 50px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.04);}
.kgrid-wrap::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(124,58,237,.1),transparent 55%);pointer-events:none;}
.kgrid-wrap::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(192,132,252,.25),transparent);pointer-events:none;}
.kgrid-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;position:relative;z-index:1;}
.kgh-title{font-family:var(--fh);font-size:.95rem;font-weight:800;color:var(--tx);display:flex;align-items:center;gap:8px;}
.kgh-badge{padding:3px 10px;border-radius:20px;font-size:.64rem;font-weight:700;background:rgba(124,58,237,.18);border:1px solid rgba(167,139,250,.3);color:var(--puLL);}
.kgh-badge.kfull{background:rgba(245,196,0,.14);border-color:rgba(245,196,0,.4);color:var(--go);}
.kgh-info{font-size:.68rem;color:var(--tx3);}
.kgrid{display:grid;grid-template-columns:repeat(8,1fr);gap:6px;position:relative;z-index:1;}
.ktile{aspect-ratio:1;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-size:.82rem;font-weight:700;cursor:pointer;position:relative;overflow:hidden;transition:transform .13s cubic-bezier(.34,1.2,.64,1),border-color .13s,box-shadow .13s;user-select:none;border:1px solid rgba(167,139,250,.1);background:linear-gradient(145deg,#1a1640,#201c4a,#1e1a46);color:var(--tx3);}
.ktile::before{content:'';position:absolute;inset:0;background:linear-gradient(145deg,rgba(255,255,255,.07) 0,transparent 55%);pointer-events:none;border-radius:9px;}
.ktile.k-idle:hover{background:linear-gradient(145deg,#24206a,#2a257a);border-color:rgba(167,139,250,.35);transform:scale(1.08) translateY(-3px);box-shadow:0 8px 22px rgba(0,0,0,.6),0 0 16px rgba(124,58,237,.12);color:var(--tx);}
.ktile.k-idle:active{transform:scale(.9);}
.ktile.k-sel{background:linear-gradient(145deg,#2d1d72,#3d2898,#341f88);border-color:rgba(167,139,250,.65);color:#fff;box-shadow:0 0 18px rgba(124,58,237,.35),0 4px 16px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.1);animation:kTilePulse 2.2s ease infinite;}
.ktile.k-sel::after{content:'';position:absolute;top:0;left:0;right:0;height:40%;background:linear-gradient(to bottom,rgba(192,132,252,.18),transparent);border-radius:9px 9px 0 0;}
.ktile.k-drawn{background:linear-gradient(145deg,#0c1830,#112444,#0e1f3a);border-color:rgba(0,212,255,.42);color:var(--nC);box-shadow:0 0 14px rgba(0,212,255,.2),0 4px 14px rgba(0,0,0,.5);cursor:default;animation:kTileDraw .32s cubic-bezier(.34,1.2,.64,1);}
.ktile.k-hit{background:linear-gradient(145deg,#03160f,#062818,#041f12);border-color:rgba(0,255,136,.72);color:var(--nG);box-shadow:0 0 24px rgba(0,255,136,.45),0 0 48px rgba(0,255,136,.1),0 4px 16px rgba(0,0,0,.6),inset 0 0 20px rgba(0,255,136,.08);cursor:default;animation:kTileHit .45s cubic-bezier(.34,1.4,.64,1);}
.ktile.k-hit::before{background:linear-gradient(145deg,rgba(0,255,136,.15) 0,transparent 55%);}
.ktile.k-miss{background:linear-gradient(145deg,#1a0305,#2a0508,#220406);border-color:rgba(239,68,68,.35);color:rgba(239,68,68,.65);cursor:default;animation:kTileMiss .3s ease;}
.ktile.k-dis{cursor:default;pointer-events:none;}
.k-tile-gem{position:absolute;top:2px;right:3px;font-size:.5rem;opacity:.8;}
.k-drop-ring{position:absolute;inset:0;border-radius:9px;pointer-events:none;animation:kDropFlash .45s ease forwards;}
.k-drop-hit{background:rgba(0,255,136,.25);}.k-drop-norm{background:rgba(0,212,255,.15);}
.kballs-wrap{width:100%;display:flex;flex-direction:column;gap:7px;}
.kballs-lbl{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);display:flex;align-items:center;gap:8px;}
.kballs-lbl::after{content:'';flex:1;height:1px;background:var(--bd);}
.kballs-track{display:flex;flex-wrap:wrap;gap:4px;}
/* Fixed keno layout — grid scrolls, footer stays pinned */
.keno-layout{display:flex;flex-direction:column;width:100%;height:100%;gap:0;}
.keno-scroll{flex:1;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;gap:12px;padding-bottom:4px;scrollbar-width:thin;scrollbar-color:var(--s5) transparent;}
.keno-scroll::-webkit-scrollbar{width:3px;}
.keno-scroll::-webkit-scrollbar-thumb{background:var(--s5);}
.keno-footer{flex-shrink:0;display:flex;flex-direction:column;gap:8px;padding-top:8px;border-top:1px solid var(--bd);}
.keno-balls-zone{min-height:56px;display:flex;flex-direction:column;gap:6px;}
/* Payout preview strip */
.keno-payout-preview{display:flex;flex-direction:column;gap:6px;}
.kpp-label{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);display:flex;align-items:center;gap:8px;}
.kpp-label::after{content:'';flex:1;height:1px;background:var(--bd);}
.kpp-track{display:flex;flex-wrap:wrap;gap:5px;}
.kpp-pill{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;background:rgba(124,58,237,.1);border:1px solid rgba(167,139,250,.18);cursor:default;}
.kpp-h{font-size:.65rem;font-weight:600;color:var(--tx3);}
.kpp-m{font-size:.72rem;font-weight:800;color:var(--puLL);font-variant-numeric:tabular-nums;}
.kball{width:27px;height:27px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-size:.63rem;font-weight:800;border:1.5px solid;position:relative;animation:kBallIn .32s cubic-bezier(.34,1.4,.64,1) backwards;}
.kball.kb-hit{background:linear-gradient(145deg,#052212,#093d1e);border-color:rgba(0,255,136,.65);color:var(--nG);box-shadow:0 0 10px rgba(0,255,136,.4),0 2px 8px rgba(0,0,0,.5);}
.kball.kb-norm{background:linear-gradient(145deg,#08111f,#0d1f38);border-color:rgba(0,212,255,.42);color:var(--nC);box-shadow:0 2px 8px rgba(0,0,0,.4);}
.k-result{width:100%;background:linear-gradient(145deg,var(--s2),var(--s1));border-radius:14px;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;border:1px solid rgba(167,139,250,.22);animation:kResIn .28s cubic-bezier(.34,1.2,.64,1);}
.k-result.kr-won{border-color:rgba(0,255,136,.5);box-shadow:0 0 32px rgba(0,255,136,.12);}
.k-result.kr-lost{border-color:rgba(239,68,68,.4);}
.kr-block{display:flex;flex-direction:column;gap:3px;}
.kr-lbl{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);}
.kr-val{font-family:var(--fh);font-size:1.55rem;font-weight:800;font-variant-numeric:tabular-nums;}
.kr-hits-w{color:var(--nG);text-shadow:0 0 20px rgba(0,255,136,.5);}
.kr-hits-l{color:var(--rd);}
.kr-mult-v{color:var(--puLL);}
.kr-win-v{color:var(--go);}
.kr-zero{color:var(--tx3);font-size:1rem;}
.k-ptable{background:var(--bg);border:1px solid var(--bd);border-radius:9px;overflow:hidden;}
.k-pt-head{display:grid;grid-template-columns:1fr 1fr;padding:6px 10px;background:var(--s2);border-bottom:1px solid var(--bd);}
.k-pt-head span{font-size:.58rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--tx3);}
.k-pt-row{display:grid;grid-template-columns:1fr 1fr;padding:5px 10px;border-bottom:1px solid rgba(255,255,255,.03);transition:background .12s;}
.k-pt-row:last-child{border-bottom:none;}
.k-pt-row.kp-active{background:rgba(0,255,136,.07);}
.k-pt-hits{font-size:.7rem;color:var(--tx2);}.k-pt-mult{font-size:.7rem;font-weight:700;color:var(--puLL);}
.k-pt-row.kp-active .k-pt-hits,.k-pt-row.kp-active .k-pt-mult{color:var(--nG);}
.khist{display:flex;gap:5px;flex-wrap:wrap;}
.kh-dot{width:9px;height:9px;border-radius:50%;}.kh-dot.kh-w{background:var(--nG);box-shadow:0 0 6px rgba(0,255,136,.5);}.kh-dot.kh-l{background:var(--rd);}
@media(max-width:700px){.kgrid{gap:4px;}.ktile{font-size:.74rem;border-radius:8px;}}
`;

export { CSS_KENO };
