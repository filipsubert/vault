const CSS_STATS=`
/* ═══════════════════════ STATS MODAL ═══════════════════════ */
@keyframes statsUp{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.stats-modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(10px);}
.stats-modal{background:linear-gradient(145deg,var(--s2),var(--s1));border:1px solid var(--bd3);border-radius:20px;padding:24px;width:360px;max-width:100%;animation:statsUp .22s cubic-bezier(.34,1.2,.64,1);box-shadow:0 28px 80px rgba(0,0,0,.8),0 0 0 1px rgba(167,139,250,.06);}
.sm-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
.sm-title{font-family:var(--fh);font-size:1.05rem;font-weight:700;color:var(--tx);}
.sm-close{background:var(--s4);border:none;color:var(--tx2);cursor:pointer;width:28px;height:28px;border-radius:7px;font-size:.9rem;display:flex;align-items:center;justify-content:center;transition:all .12s;}
.sm-close:hover{background:var(--s5);color:var(--tx);}
.sm-grid{display:grid;grid-template-columns:1fr;gap:8px;margin-bottom:16px;}
.sm-stat{background:var(--bg);border:1px solid var(--bd);border-radius:12px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;}
.sm-sl{font-size:.66rem;font-weight:600;color:var(--tx3);letter-spacing:.04em;text-transform:uppercase;flex-shrink:0;}
.sm-sv{font-family:var(--fh);font-size:1.15rem;font-weight:800;font-variant-numeric:tabular-nums;line-height:1;word-break:break-all;text-align:right;}
.sm-sv.pos{color:var(--nG)}.sm-sv.neg{color:var(--rd)}.sm-sv.neu{color:var(--tx2)}
.sm-chart{width:100%;height:72px;border-radius:10px;background:var(--bg);border:1px solid var(--bd);overflow:hidden;}
.sm-btn{display:flex;align-items:center;gap:5px;padding:7px 12px;border-radius:8px;border:1px solid var(--bd);background:var(--s3);color:var(--tx2);font-family:var(--f);font-size:.75rem;font-weight:600;cursor:pointer;transition:all .13s;white-space:nowrap;}
.sm-btn:hover{background:var(--s4);border-color:rgba(167,139,250,.28);color:var(--tx);}
`;

export { CSS_STATS };
