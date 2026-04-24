const CSS_SHARED=`
/* ── SHARED PANEL ── */
.gamepage{display:flex;flex-direction:column;flex:1;overflow:hidden;}
.bc{display:flex;align-items:center;gap:7px;font-size:.76rem;color:var(--tx3);padding:8px 14px;border-bottom:1px solid var(--bd);flex-shrink:0;background:rgba(11,9,22,.85);}
.bc a{color:var(--tx3);cursor:pointer;transition:color .12s;text-decoration:none;}
.bc a:hover{color:var(--tx2);}
.gamebody{display:flex;flex:1;overflow:hidden;}
.lp{width:232px;flex-shrink:0;background:rgba(11,9,22,.92);border-right:1px solid var(--bd);padding:12px;display:flex;flex-direction:column;gap:9px;overflow-y:auto;scrollbar-width:none;backdrop-filter:blur(24px);}
.lp::-webkit-scrollbar{display:none;}
.tabs{display:flex;background:var(--bg);border-radius:8px;padding:3px;gap:2px;}
.tab{flex:1;padding:7px 4px;border-radius:6px;border:none;background:transparent;color:var(--tx3);font-family:var(--f);font-size:.78rem;font-weight:600;cursor:pointer;transition:all .14s;text-align:center;}
.tab.on{background:var(--s4);color:var(--tx);box-shadow:0 1px 6px rgba(0,0,0,.4);}
.fld{display:flex;flex-direction:column;gap:5px;}
.flbl{font-size:.7rem;font-weight:600;color:var(--tx2);letter-spacing:.02em;display:flex;justify-content:space-between;}
.flbl span{color:var(--tx3);font-weight:400;font-size:.65rem;}
.fi-w{position:relative;}
.fi{width:100%;background:var(--bg);border:1px solid var(--bd);border-radius:8px;padding:10px 44px 10px 32px;color:var(--tx);font-family:var(--f);font-size:.92rem;font-weight:700;outline:none;transition:border-color .15s,box-shadow .15s;-moz-appearance:textfield;}
.fi::-webkit-outer-spin-button,.fi::-webkit-inner-spin-button{-webkit-appearance:none;}
.fi:focus{border-color:rgba(139,92,246,.42);box-shadow:0 0 0 3px rgba(124,58,237,.1);}
.fi:disabled{opacity:.3;cursor:not-allowed;}
.fi-pre{position:absolute;left:10px;top:50%;transform:translateY(-50%);pointer-events:none;font-size:.8rem;color:var(--tx3);}
.fi-suf{position:absolute;right:9px;top:50%;transform:translateY(-50%);color:var(--tx3);font-size:.63rem;font-weight:700;pointer-events:none;letter-spacing:.04em;}
.qb{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;}
.qbtn{background:var(--s3);border:1px solid var(--bd);border-radius:6px;padding:6px 2px;color:var(--tx2);font-size:.66rem;font-weight:600;cursor:pointer;transition:all .12s;text-align:center;font-family:var(--f);}
.qbtn:hover:not(:disabled){background:var(--s4);color:var(--tx);border-color:rgba(167,139,250,.2);}
.qbtn:disabled{opacity:.2;cursor:not-allowed;}
.msel{display:grid;grid-template-columns:repeat(5,1fr);gap:3px;}
.ms{padding:8px 2px;background:var(--bg);border:1px solid var(--bd);border-radius:6px;color:var(--tx2);font-size:.7rem;font-weight:600;cursor:pointer;text-align:center;transition:all .13s;font-family:var(--f);}
.ms:hover:not(:disabled){background:var(--s3);color:var(--tx);}
.ms.sel{background:rgba(124,58,237,.15);border-color:rgba(139,92,246,.38);color:var(--puLL);}
.ms:disabled{opacity:.2;cursor:not-allowed;}
.sr{display:flex;align-items:center;justify-content:space-between;padding:9px 11px;background:var(--bg);border-radius:8px;border:1px solid var(--bd);}
.sl{font-size:.7rem;color:var(--tx3);font-weight:500;}
.sv{font-size:.82rem;font-weight:700;font-variant-numeric:tabular-nums;}
.sep{height:1px;background:var(--bd);margin:1px 0;}
.pb-box{background:var(--bg);border:1px solid var(--bd3);border-radius:9px;padding:10px 12px;}
.pb-top{display:flex;justify-content:space-between;font-size:.67rem;color:var(--tx3);margin-bottom:7px;}
.pb-top b{color:var(--puLL);}
.pb-t{height:5px;border-radius:3px;background:var(--s4);overflow:visible;position:relative;}
.pb-f{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--pu),var(--puLL));transition:width .4s cubic-bezier(.34,1.2,.64,1);position:relative;}
.pb-f::after{content:'';position:absolute;right:-2px;top:-4px;width:13px;height:13px;border-radius:50%;background:var(--puLL);box-shadow:0 0 0 3px rgba(192,132,252,.2),0 0 10px var(--puL);transition:right .4s;}
.cta{width:100%;padding:13px;border-radius:9px;border:none;font-family:var(--f);font-size:.86rem;font-weight:700;cursor:pointer;transition:all .17s cubic-bezier(.34,1.2,.64,1);display:flex;align-items:center;justify-content:center;gap:7px;position:relative;overflow:hidden;}
.cta::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);transform:translateX(-100%);transition:transform .5s;}
.cta:hover:not(:disabled)::after{transform:translateX(100%);}
.cta:disabled{opacity:.28;cursor:not-allowed;transform:none;box-shadow:none;}
.cta.go{background:linear-gradient(135deg,var(--pu),var(--puLL));color:#fff;box-shadow:0 4px 20px rgba(124,58,237,.4);}
.cta.go:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 28px rgba(124,58,237,.55);}
.cta.cash{background:linear-gradient(135deg,#059669,#00ff88);color:#001a0a;box-shadow:0 4px 20px rgba(0,255,136,.22);}
.cta.cash:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 28px rgba(0,255,136,.38);}
.cta.replay{background:var(--s4);color:var(--tx);}
.cta.replay:hover{background:var(--s5);}
.hr{display:flex;align-items:center;justify-content:space-between;padding:6px 9px;background:var(--bg);border-radius:7px;border-left:2.5px solid transparent;}
.hr.w{border-left-color:var(--nG);}.hr.l{border-left-color:var(--rd);}.hr.c{border-left-color:var(--go);}
.hr-l{font-size:.67rem;color:var(--tx3);}
.hr-r{font-size:.7rem;font-weight:700;font-variant-numeric:tabular-nums;}
.hc-w{color:var(--nG);}.hc-l{color:var(--rd);}.hc-c{color:var(--go);}

/* ── MULTIPLIER CARD ── */
.mcard{width:100%;border-radius:14px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(20,16,48,1),rgba(26,22,56,1));border:1px solid rgba(167,139,250,.22);box-shadow:0 4px 24px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.05);}
.mcard::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(124,58,237,.1),transparent 60%);pointer-events:none;}
.mcard::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(192,132,252,.3),transparent);pointer-events:none;}
.mc-lbl{font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--tx3);margin-bottom:5px;}
@keyframes mPop{0%{transform:scale(1)}32%{transform:scale(1.3) translateY(-3px)}100%{transform:scale(1)}}
.mc-v{font-family:var(--fh);font-size:2.4rem;font-weight:800;line-height:1;color:var(--puLL);font-variant-numeric:tabular-nums;transition:color .3s;letter-spacing:-.02em;}
.mc-v.gn{color:var(--nG);text-shadow:0 0 24px rgba(0,255,136,.4),0 0 48px rgba(0,255,136,.12);}
.mc-v.rd{color:var(--rd);text-shadow:0 0 18px rgba(239,68,68,.35);}
.mc-x{font-size:1.2rem;opacity:.5;}
.mc-wl{font-size:.6rem;color:var(--tx3);font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:4px;}
.mc-w{font-size:1.1rem;font-weight:800;color:var(--go);font-variant-numeric:tabular-nums;text-shadow:0 0 12px rgba(245,196,0,.3);}
.mc-nx{font-size:.67rem;color:var(--tx3);margin-top:4px;}
.mc-nx b{color:var(--puLL);}
.streak-bar{display:flex;align-items:center;justify-content:center;gap:8px;padding:7px 16px;background:linear-gradient(135deg,rgba(124,58,237,.12),rgba(167,139,250,.06));border:1px solid rgba(167,139,250,.2);border-radius:9px;font-size:.72rem;color:var(--puLL);font-weight:700;position:relative;overflow:hidden;}
.streak-bar::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(192,132,252,.06),transparent);animation:streakShine 2s ease-in-out infinite;}
@keyframes streakShine{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@keyframes streakMilestone{0%{transform:scale(1)}20%{transform:scale(1.06)}50%{transform:scale(.97)}100%{transform:scale(1)}}
.streak-bar.milestone{animation:streakMilestone .45s cubic-bezier(.34,1.4,.64,1);}
.streak-bar.m5{background:linear-gradient(135deg,rgba(124,58,237,.15),rgba(167,139,250,.08));border-color:rgba(167,139,250,.35);}
.streak-bar.m10{background:linear-gradient(135deg,rgba(245,196,0,.12),rgba(245,196,0,.06));border-color:rgba(245,196,0,.45);color:var(--go);}
.streak-bar.m15{background:linear-gradient(135deg,rgba(0,212,255,.12),rgba(0,212,255,.06));border-color:rgba(0,212,255,.45);color:var(--nC);}
.streak-bar.m20{background:linear-gradient(135deg,rgba(239,68,68,.14),rgba(239,68,68,.07));border-color:rgba(239,68,68,.5);color:var(--rd);}
.streak-dot{width:8px;height:8px;border-radius:50%;background:var(--puLL);box-shadow:0 0 8px var(--puL),0 0 16px rgba(192,132,252,.3);}

/* Info pills */
.pills{display:flex;gap:7px;flex-wrap:wrap;justify-content:center;}
.pill{display:flex;align-items:center;gap:5px;padding:4px 12px;background:rgba(255,255,255,.04);border:1px solid var(--bd);border-radius:20px;font-size:.7rem;backdrop-filter:blur(8px);}
.pl-l{color:var(--tx3);}
.pl-v{font-weight:600;font-variant-numeric:tabular-nums;}
`;

export { CSS_SHARED };
