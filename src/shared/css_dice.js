const CSS_DICE=`
/* ═══════════════════════ DICE SPECIFIC ═══════════════════════ */

/* Under / Over toggle */
.dice-toggle{display:flex;gap:0;background:var(--bg);border-radius:9px;padding:3px;border:1px solid var(--bd);}
.dt-btn{flex:1;padding:9px 8px;border-radius:7px;border:1.5px solid transparent;background:transparent;color:var(--tx3);font-family:var(--f);font-size:.8rem;font-weight:700;cursor:pointer;transition:all .18s cubic-bezier(.34,1.2,.64,1);letter-spacing:.01em;}
.dt-btn:hover:not(:disabled){color:var(--tx);}
.dt-btn:disabled{opacity:.3;cursor:not-allowed;}
.dt-btn.on-lo{background:rgba(239,68,68,.13);color:var(--rd);border-color:rgba(239,68,68,.32);}
.dt-btn.on-hi{background:rgba(0,255,136,.1);color:var(--nG);border-color:rgba(0,255,136,.28);}
.dice-stats{display:flex;flex-direction:column;gap:4px;}
.ds-item{display:flex;justify-content:space-between;align-items:center;padding:7px 10px;background:var(--bg);border:1px solid var(--bd);border-radius:8px;}

/* ── STAKE RESULT BOX ── */
@keyframes resNumIn{0%{transform:scale(.7) translateY(-8px);opacity:0}60%{transform:scale(1.1) translateY(2px)}100%{transform:scale(1) translateY(0);opacity:1}}
@keyframes resultSlide{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:translateX(0)}}
@keyframes wonPulseBar{0%,100%{box-shadow:0 0 0 0 rgba(0,255,136,.0)}50%{box-shadow:0 0 32px 6px rgba(0,255,136,.18)}}
@keyframes lostPulseBar{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.0)}50%{box-shadow:0 0 24px 4px rgba(239,68,68,.14)}}
@keyframes markerLand{0%{transform:translateX(-50%) scale(0) rotate(-12deg);opacity:0}55%{transform:translateX(-50%) scale(1.35) rotate(4deg)}75%{transform:translateX(-50%) scale(.88) rotate(-2deg)}100%{transform:translateX(-50%) scale(1) rotate(0);opacity:1}}
@keyframes markerBounce{0%,100%{transform:translateX(-50%) translateY(0)}40%{transform:translateX(-50%) translateY(-6px)}70%{transform:translateX(-50%) translateY(-2px)}}
@keyframes rollFlicker{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes handlePop{0%{transform:translateX(-50%) scale(1)}40%{transform:translateX(-50%) scale(1.35)}100%{transform:translateX(-50%) scale(1)}}
@keyframes barGlow{from{opacity:0}to{opacity:1}}

.dice-result-display{width:100%;display:flex;justify-content:center;padding:8px 0 4px;}
.dice-num-box{min-width:180px;background:linear-gradient(145deg,#0c0920,#100e2a,#0e0c24);border:1.5px solid rgba(167,139,250,.22);border-radius:18px;padding:20px 32px 16px;display:flex;flex-direction:column;align-items:center;gap:4px;position:relative;overflow:hidden;box-shadow:0 12px 48px rgba(0,0,0,.65),inset 0 1px 0 rgba(255,255,255,.05);}
.dice-num-box::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(124,58,237,.1),transparent 60%);pointer-events:none;}
.dice-num-box::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(192,132,252,.3),transparent);pointer-events:none;}
.dice-num-box.idle{border-color:rgba(167,139,250,.22);}
.dice-num-box.rolling{border-color:rgba(124,58,237,.6);box-shadow:0 0 0 1px rgba(124,58,237,.22),0 12px 48px rgba(0,0,0,.65),0 0 56px rgba(124,58,237,.28);}
.dice-num-box.won{border-color:rgba(0,255,136,.6);box-shadow:0 0 0 1px rgba(0,255,136,.18),0 12px 48px rgba(0,0,0,.65),0 0 64px rgba(0,255,136,.22);animation:wonPulseBar .7s ease;}
.dice-num-box.lost{border-color:rgba(239,68,68,.5);box-shadow:0 0 0 1px rgba(239,68,68,.14),0 12px 48px rgba(0,0,0,.65),0 0 44px rgba(239,68,68,.16);animation:lostPulseBar .7s ease;}
.dnb-label{font-size:.56rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--tx3);}
.dnb-val{font-family:var(--fh);font-size:4.2rem;font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:-.05em;line-height:1.05;color:var(--tx);transition:color .2s;}
.dice-num-box.rolling .dnb-val{color:var(--puLL);animation:rollFlicker .15s ease-in-out infinite;}
.dice-num-box.won .dnb-val{color:var(--nG);text-shadow:0 0 32px rgba(0,255,136,.5);}
.dice-num-box.lost .dnb-val{color:var(--rd);text-shadow:0 0 24px rgba(239,68,68,.45);}
.dnb-sub{font-size:.68rem;font-weight:600;color:var(--tx3);letter-spacing:.03em;min-height:1.2em;text-align:center;}
.dice-num-box.won .dnb-sub{color:var(--nG);}
.dice-num-box.lost .dnb-sub{color:var(--rd);}

/* ── STAKE BAR ── */
.stake-bar-wrap{width:100%;padding:0 0 44px;position:relative;}
.stake-bar{width:100%;height:12px;border-radius:8px;position:relative;overflow:visible;cursor:pointer;}
.stake-bar-bg{position:absolute;inset:0;border-radius:8px;overflow:hidden;display:flex;}
.sb-red{height:100%;transition:width .32s cubic-bezier(.34,1.2,.64,1);}
.sb-green{height:100%;transition:width .32s cubic-bezier(.34,1.2,.64,1);}
/* Gradient fills */
.sb-red-fill{background:linear-gradient(90deg,#3d0508,#7c0c12,#c21018,rgba(239,68,68,.75));}
.sb-green-fill{background:linear-gradient(90deg,rgba(0,180,70,.75),#00c858,#00e870,#00ff88);}
/* Reversed for under mode */
.sb-green-rev{background:linear-gradient(90deg,#00ff88,#00e870,#00c858,rgba(0,180,70,.75));}
.sb-red-rev{background:linear-gradient(90deg,rgba(239,68,68,.75),#c21018,#7c0c12,#3d0508);}

/* Handle (draggable target) */
.stake-handle{position:absolute;top:50%;transform:translateX(-50%) translateY(-50%);width:26px;height:26px;border-radius:8px;background:linear-gradient(145deg,#fff,#e8e0ff);border:2px solid rgba(255,255,255,.9);box-shadow:0 2px 12px rgba(0,0,0,.7),0 0 0 3px rgba(124,58,237,.3),0 0 18px rgba(124,58,237,.25);cursor:grab;z-index:10;display:flex;align-items:center;justify-content:center;transition:box-shadow .15s,transform .1s;user-select:none;}
.stake-handle:hover{box-shadow:0 2px 16px rgba(0,0,0,.8),0 0 0 4px rgba(124,58,237,.45),0 0 28px rgba(124,58,237,.35);}
.stake-handle:active{cursor:grabbing;transform:translateX(-50%) translateY(-50%) scale(1.18);}
.stake-handle.popped{animation:handlePop .32s cubic-bezier(.34,1.4,.64,1);}
.stake-handle-inner{width:8px;height:8px;border-radius:50%;background:var(--pu);}

/* Handle label */
.stake-handle-label{position:absolute;top:-28px;left:50%;transform:translateX(-50%);background:rgba(13,11,28,.95);border:1px solid rgba(167,139,250,.3);border-radius:6px;padding:3px 8px;font-size:.62rem;font-weight:800;color:var(--puLL);white-space:nowrap;pointer-events:none;}
.stake-handle-label::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:rgba(167,139,250,.3);}

/* Tick marks */
.stake-ticks{position:absolute;top:18px;left:0;right:0;display:flex;justify-content:space-between;pointer-events:none;}
.stake-tick{display:flex;flex-direction:column;align-items:center;gap:2px;}
.stake-tick-line{width:1px;height:5px;background:rgba(255,255,255,.1);}
.stake-tick-val{font-size:.54rem;color:rgba(255,255,255,.18);font-weight:500;}

.stake-marker{position:absolute;top:50%;transform:translateX(-50%) translateY(-50%);z-index:20;pointer-events:none;transition:left .55s cubic-bezier(.25,.1,.25,1);}
.stake-marker-inner{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:900;border:2.5px solid rgba(255,255,255,.25);box-shadow:0 0 0 3px rgba(0,0,0,.4),0 4px 16px rgba(0,0,0,.6);}
.stake-marker-inner.win-m{background:linear-gradient(145deg,#00e570,var(--nG));color:#001a0a;box-shadow:0 0 0 3px rgba(0,255,136,.25),0 0 22px rgba(0,255,136,.45),0 4px 16px rgba(0,0,0,.5);}
.stake-marker-inner.lose-m{background:linear-gradient(145deg,#d43030,var(--rd));color:#fff;box-shadow:0 0 0 3px rgba(239,68,68,.22),0 0 18px rgba(239,68,68,.38),0 4px 16px rgba(0,0,0,.5);}
.stake-marker-val{position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);font-size:.62rem;font-weight:800;white-space:nowrap;}

/* Bar edge labels */
.stake-bar-labels{display:flex;justify-content:space-between;margin-top:4px;}
.sbl-item{font-size:.62rem;color:rgba(255,255,255,.2);font-weight:600;}

/* Editable stat boxes — Stake style */
.dice-stat-boxes{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;}
.dsb{background:var(--bg);border:1.5px solid var(--bd);border-radius:11px;padding:10px 13px;display:flex;flex-direction:column;gap:3px;transition:border-color .14s;}
.dsb:focus-within{border-color:rgba(139,92,246,.4);}
.dsb-label{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);}
.dsb-input{background:none;border:none;outline:none;font-family:var(--fh);font-size:1.08rem;font-weight:800;color:var(--tx);font-variant-numeric:tabular-nums;width:100%;padding:0;-moz-appearance:textfield;}
.dsb-input::-webkit-outer-spin-button,.dsb-input::-webkit-inner-spin-button{-webkit-appearance:none;}
.dsb-input:disabled{opacity:.6;cursor:not-allowed;}
.dsb-unit{font-size:.6rem;color:var(--tx3);font-weight:600;}
`;

export { CSS_DICE };
