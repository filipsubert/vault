const CSS_WHEEL=`
/* ═══════════════════════ WHEEL ═══════════════════════ */
@keyframes wheelResultIn{0%{transform:scale(.7) translateY(-4px);opacity:0}70%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}
@keyframes wheelWinPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,255,136,0),0 4px 20px rgba(0,0,0,.4)}50%{box-shadow:0 0 0 6px rgba(0,255,136,.07),0 4px 20px rgba(0,0,0,.4)}}
@keyframes wheelSpinGlow{0%,100%{opacity:.4}50%{opacity:.9}}

.wheel-arena{display:flex;flex-direction:column;align-items:center;gap:18px;width:100%;}
.wheel-result-pill{min-height:44px;padding:10px 28px;border-radius:14px;background:linear-gradient(145deg,var(--s2),var(--s1));border:1px solid var(--bd);font-family:var(--fh);font-size:1rem;font-weight:700;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .3s;min-width:260px;text-align:center;}
.wheel-result-pill.visible.win{border-color:rgba(0,255,136,.35);background:linear-gradient(145deg,rgba(0,255,136,.06),var(--s1));animation:wheelWinPulse 1.2s ease infinite;}
.wheel-result-pill.visible.lose{border-color:rgba(239,68,68,.3);background:linear-gradient(145deg,rgba(239,68,68,.06),var(--s1));}
.wheel-result-pill.visible.push{border-color:rgba(167,139,250,.3);background:linear-gradient(145deg,rgba(124,58,237,.06),var(--s1));}
.wheel-svg-wrap{position:relative;filter:drop-shadow(0 16px 48px rgba(0,0,0,.75)) drop-shadow(0 0 30px rgba(124,58,237,.12));}
.wheel-legend{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:340px;}
.wl-chip{display:flex;align-items:center;gap:5px;padding:4px 12px;border-radius:20px;font-size:.72rem;font-weight:700;transition:transform .12s;}
.wl-chip:hover{transform:scale(1.06);}
.wl-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.wheel-risk-btn{flex:1;padding:8px 4px;border-radius:7px;border:none;background:transparent;color:var(--tx3);font-family:var(--f);font-size:.76rem;font-weight:700;cursor:pointer;transition:all .14s;text-align:center;}
.wheel-risk-btn.on{background:var(--s4);color:var(--tx);box-shadow:0 1px 6px rgba(0,0,0,.4);}
.wheel-risk-btn:disabled{opacity:.3;cursor:not-allowed;}
`;

export { CSS_WHEEL };
