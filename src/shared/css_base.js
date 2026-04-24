const CSS_BASE=`

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700;800&family=Playfair+Display:wght@700;900&family=Rye&family=Special+Elite&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#07050e;--s1:#0d0b1c;--s2:#111028;--s3:#181535;--s4:#1f1c40;--s5:#26224c;
  --pu:#7c3aed;--puL:#9d4edd;--puLL:#c084fc;--puDim:rgba(124,58,237,.07);
  --nG:#00ff88;--nC:#00d4ff;--go:#f5c400;--rd:#ef4444;--nP:#e040fb;
  --bd:rgba(255,255,255,.06);--bd2:rgba(255,255,255,.11);--bd3:rgba(167,139,250,.2);
  --tx:#f0eeff;--tx2:#a89cc8;--tx3:#5a5275;
  --f:'Inter',system-ui,sans-serif;--fh:'Space Grotesk',system-ui,sans-serif;--fp:'Playfair Display',serif;
}
html,body{height:100%;width:100%;overflow:hidden;background:var(--bg);color:var(--tx);font-family:var(--f);-webkit-font-smoothing:antialiased;}
#root{height:100%;width:100%;}
@keyframes sbCandyFloat{0%{transform:translateY(100vh) rotate(0deg)}100%{transform:translateY(-120px) rotate(360deg)}}
@keyframes sbSpin360{to{transform:rotate(360deg)}}

/* ── AMBIENT ── */
.amb{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
.amb-orb{position:absolute;border-radius:50%;filter:blur(100px);}

@keyframes bbsIn{0%{opacity:0;transform:scale(.6) translateY(20px)}55%{transform:scale(1.06) translateY(-4px)}80%{transform:scale(.97)}100%{opacity:1;transform:scale(1) translateY(0)}}
@keyframes bbsPulse{0%,100%{opacity:.85;transform:scale(1)}50%{opacity:1;transform:scale(1.04)}}
@keyframes bbsScatterLand{0%{transform:scale(0) rotate(-25deg);opacity:0}45%{transform:scale(1.45) rotate(6deg);opacity:1}70%{transform:scale(.9) rotate(-2deg)}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes bbsScatterGlow{0%,100%{box-shadow:0 0 12px 4px var(--scatter-glow,rgba(255,200,0,.6))}50%{box-shadow:0 0 32px 12px var(--scatter-glow,rgba(255,200,0,.9)),0 0 60px 20px var(--scatter-glow,rgba(255,200,0,.3))}}
@keyframes bbsRipple{0%{transform:translate(-50%,-50%) scale(0);opacity:.8}100%{transform:translate(-50%,-50%) scale(3.5);opacity:0}}
@keyframes bbsBar{from{width:0}to{width:100%}}
.bbs-overlay{position:absolute;inset:0;z-index:55;pointer-events:none;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:18px;gap:6px;}
.bbs-badge{display:inline-flex;align-items:center;gap:8px;padding:9px 22px;border-radius:28px;font-family:'Space Grotesk',sans-serif;font-size:.9rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase;animation:bbsIn .5s cubic-bezier(.34,1.4,.64,1) both,bbsPulse 1.6s 1s ease infinite;box-shadow:0 0 28px var(--bbs-glow,rgba(245,196,0,.6)),0 4px 18px rgba(0,0,0,.7);}
.bbs-scatter-cell-vfx{position:absolute;inset:0;z-index:18;pointer-events:none;}
.bbs-scatter-cell-vfx-inner{width:100%;height:100%;border-radius:inherit;animation:bbsScatterGlow 1.1s ease infinite;}
.bbs-scatter-sym{animation:bbsScatterLand .5s cubic-bezier(.34,1.4,.64,1) both !important;}
.bbs-ripple{position:absolute;left:50%;top:50%;width:60px;height:60px;border-radius:50%;border:2px solid var(--scatter-glow,rgba(255,200,0,.7));animation:bbsRipple .8s ease-out both;pointer-events:none;z-index:19;}

/* ── APP SHELL ── */
.app{display:flex;height:100vh;height:100dvh;overflow:hidden;position:relative;}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;z-index:1;}
.pg{flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:var(--s5) transparent;}
.pg::-webkit-scrollbar{width:3px;}
.pg::-webkit-scrollbar-thumb{background:var(--s5);border-radius:2px;}

/* ── SIDEBAR ── */
.sb{width:226px;flex-shrink:0;background:rgba(11,9,22,.98);border-right:1px solid var(--bd);display:flex;flex-direction:column;overflow:hidden;transition:width .2s cubic-bezier(.4,0,.2,1);z-index:20;position:relative;}
.sb::after{content:'';position:absolute;top:0;right:0;width:1px;height:100%;background:linear-gradient(180deg,transparent,rgba(167,139,250,.16) 25%,rgba(167,139,250,.16) 75%,transparent);pointer-events:none;}
.sb.slim{width:54px;}
.sb-logo{display:flex;align-items:center;gap:11px;padding:0 12px;height:54px;border-bottom:1px solid var(--bd);flex-shrink:0;cursor:pointer;user-select:none;}
.sb-mark{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,var(--pu),var(--puLL));display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-weight:800;font-size:1rem;color:#fff;flex-shrink:0;box-shadow:0 0 20px rgba(124,58,237,.5),0 4px 12px rgba(0,0,0,.4);}
.sb-name{font-family:var(--fh);font-weight:800;font-size:1.08rem;color:var(--tx);letter-spacing:-.02em;white-space:nowrap;transition:opacity .15s;}
.sb.slim .sb-name{opacity:0;width:0;}
.sb-scroll{flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;padding:4px 0 20px;}
.sb-scroll::-webkit-scrollbar{display:none;}
.sb-lbl{font-size:.59rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--tx3);padding:12px 13px 4px;white-space:nowrap;transition:opacity .15s;}
.sb.slim .sb-lbl{opacity:0;}
.sbi{display:flex;align-items:center;gap:10px;padding:8px 12px;cursor:pointer;border-radius:8px;margin:1px 4px;transition:background .12s,color .12s;color:var(--tx2);font-size:.82rem;font-weight:500;white-space:nowrap;user-select:none;position:relative;}
.sbi:hover{background:rgba(255,255,255,.05);color:var(--tx);}
.sbi.on{background:var(--puDim);color:var(--puLL);}
.sbi.on::before{content:'';position:absolute;left:0;top:15%;height:70%;width:3px;border-radius:0 2px 2px 0;background:linear-gradient(180deg,var(--pu),var(--puLL));box-shadow:0 0 10px var(--pu);}
.sbi .ico{width:18px;height:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;}
.sbi .stxt{overflow:hidden;white-space:nowrap;transition:opacity .14s;}
.sb.slim .sbi .stxt{opacity:0;width:0;}
.sbi .sbdg{font-size:.52rem;font-weight:800;padding:2px 7px;border-radius:20px;background:var(--nP);color:#fff;margin-left:auto;flex-shrink:0;}
.sb.slim .sbdg{display:none;}

/* ── TOPBAR ── */
.tb{height:54px;background:rgba(11,9,22,.98);border-bottom:1px solid var(--bd);display:flex;align-items:center;padding:0 14px;gap:9px;flex-shrink:0;z-index:15;backdrop-filter:blur(24px);}
.tb-tog{width:34px;height:34px;background:transparent;border:none;color:var(--tx2);cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:7px;transition:background .12s;}
.tb-tog:hover{background:rgba(255,255,255,.06);}
.tb-srch{display:flex;align-items:center;background:var(--s2);border:1px solid var(--bd);border-radius:8px;padding:0 11px;gap:7px;height:35px;flex:1;max-width:240px;transition:border-color .18s;}
.tb-srch:focus-within{border-color:rgba(139,92,246,.4);box-shadow:0 0 0 3px rgba(124,58,237,.1);}
.tb-srch input{background:none;border:none;outline:none;color:var(--tx2);font-size:.8rem;font-family:var(--f);width:100%;}
.tb-srch input::placeholder{color:var(--tx3);}
.sp{flex:1;}
@keyframes lp2{0%,100%{box-shadow:0 0 0 0 rgba(0,255,136,.5)}50%{box-shadow:0 0 0 4px rgba(0,255,136,.08)}}
.tb-live{display:flex;align-items:center;gap:7px;padding:0 11px;height:35px;background:var(--s2);border:1px solid var(--bd);border-radius:8px;font-size:.72rem;color:var(--tx3);}
.ld{width:7px;height:7px;border-radius:50%;background:var(--nG);animation:lp2 2.2s ease infinite;flex-shrink:0;}
.tb-live .cnt{color:var(--nG);font-weight:700;}
.tb-bal{display:flex;align-items:center;gap:7px;background:var(--s2);border:1px solid var(--bd3);border-radius:8px;padding:0 13px;height:35px;cursor:pointer;transition:border-color .15s;}
.tb-bal:hover{border-color:rgba(167,139,250,.38);}
.tb-bal .coin{font-size:.85rem;color:var(--go);}
.tb-bal .amt{font-size:.86rem;font-weight:700;color:var(--go);font-variant-numeric:tabular-nums;}
.tb-dep{display:flex;align-items:center;gap:6px;background:linear-gradient(135deg,var(--pu),var(--puLL));border:none;border-radius:8px;padding:0 16px;height:35px;cursor:pointer;font-family:var(--f);font-size:.8rem;font-weight:700;color:#fff;flex-shrink:0;transition:transform .14s,box-shadow .15s;box-shadow:0 4px 18px rgba(124,58,237,.38);}
.tb-dep:hover{transform:translateY(-1px);box-shadow:0 7px 26px rgba(124,58,237,.55);}
.tb-av{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#4c1d95,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:.64rem;font-weight:800;color:rgba(255,255,255,.9);flex-shrink:0;cursor:pointer;border:2px solid transparent;transition:border-color .15s;}
.tb-av:hover{border-color:var(--puLL);}

/* ── TICKER ── */
.ticker{height:36px;background:var(--s1);border-top:1px solid var(--bd);display:flex;overflow:hidden;flex-shrink:0;}
.t-lbl{padding:0 13px;display:flex;align-items:center;gap:6px;font-size:.61rem;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--pu),var(--puLL));white-space:nowrap;flex-shrink:0;letter-spacing:.07em;}
.t-sc{flex:1;overflow:hidden;}
@keyframes tck{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.t-row{display:flex;gap:28px;animation:tck 42s linear infinite;align-items:center;height:36px;padding:0 16px;white-space:nowrap;}
.t-item{display:flex;align-items:center;gap:7px;font-size:.71rem;flex-shrink:0;}
.ti-g{color:var(--tx2);font-weight:500;}.ti-u{color:var(--tx3);}.ti-d{width:2px;height:2px;border-radius:50%;background:var(--tx3);flex-shrink:0;}.ti-a{color:var(--nG);font-weight:700;font-variant-numeric:tabular-nums;}.ti-m{color:var(--puLL);font-size:.64rem;font-weight:600;}

`;

export { CSS_BASE };
