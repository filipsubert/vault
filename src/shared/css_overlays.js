const CSS_OVERLAYS=`
.gov{position:absolute;inset:0;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;z-index:10;backdrop-filter:blur(5px);}
.gov.w{background:rgba(0,255,136,.07);}
.gov.l{background:rgba(239,68,68,.07);}
.ov-t{font-family:var(--fh);font-size:1.5rem;font-weight:800;}
.gov.w .ov-t{color:var(--nG);text-shadow:0 0 26px rgba(0,255,136,.5);}
.gov.l .ov-t{color:var(--rd);text-shadow:0 0 26px rgba(239,68,68,.5);}
.ov-s{font-size:.77rem;color:var(--tx2);}

/* ── OVERLAYS ── */
@keyframes fl-r{0%{opacity:1}100%{opacity:0}}
@keyframes fl-g{0%{opacity:1}100%{opacity:0}}
@keyframes cashPop{0%{opacity:1;transform:translate(-50%,-50%) scale(.7)}20%{opacity:1;transform:translate(-50%,-72%) scale(1.12)}85%{opacity:.85;transform:translate(-50%,-145%) scale(1)}100%{opacity:0;transform:translate(-50%,-175%) scale(.88)}}
.fl-r{position:fixed;inset:0;background:rgba(239,68,68,.2);pointer-events:none;z-index:999;animation:fl-r .55s ease forwards;}
.fl-g{position:fixed;inset:0;background:rgba(0,255,136,.09);pointer-events:none;z-index:999;animation:fl-g .5s ease forwards;}
.cashpop{position:fixed;top:50%;left:50%;pointer-events:none;z-index:1000;animation:cashPop 1.9s cubic-bezier(.22,1,.36,1) forwards;font-family:var(--fh);font-size:2.3rem;font-weight:800;color:var(--nG);text-shadow:0 0 32px rgba(0,255,136,.6),0 0 64px rgba(0,255,136,.2);white-space:nowrap;}

/* ── DEPOSIT MODAL ── */
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:100;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(8px);}
@keyframes sUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.modal{background:var(--s1);border:1px solid var(--bd3);border-radius:16px;padding:22px;width:340px;max-width:100%;animation:sUp .2s ease;box-shadow:0 24px 64px rgba(0,0,0,.7),0 0 0 1px rgba(167,139,250,.06);}
.modal h2{font-family:var(--fh);font-size:1.05rem;font-weight:700;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;}
.mx{background:transparent;border:none;color:var(--tx2);cursor:pointer;font-size:1rem;transition:color .12s;}
.mx:hover{color:var(--tx);}
.m-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:8px;}
.m-opt{padding:11px 5px;background:var(--bg);border:1.5px solid var(--bd);border-radius:9px;text-align:center;cursor:pointer;transition:all .14s;font-weight:700;font-size:.84rem;color:var(--tx2);}
.m-opt:hover{background:var(--s3);border-color:rgba(139,92,246,.38);color:var(--puLL);}
.m-ci{display:flex;align-items:center;background:var(--bg);border:1.5px solid var(--bd);border-radius:9px;padding:9px 12px;gap:5px;margin-bottom:14px;transition:border-color .15s;}
.m-ci:focus-within{border-color:rgba(139,92,246,.4);}
.m-ci span{color:var(--tx3);font-size:.8rem;}
.m-ci input{background:none;border:none;outline:none;color:var(--tx);font-weight:700;font-size:.9rem;font-family:var(--f);width:100%;}
.m-add{width:100%;padding:12px;background:linear-gradient(135deg,var(--pu),var(--puLL));border:none;border-radius:9px;color:#fff;font-family:var(--f);font-size:.88rem;font-weight:700;cursor:pointer;box-shadow:0 4px 18px rgba(124,58,237,.35);transition:all .15s;}
.m-add:hover{transform:translateY(-1px);box-shadow:0 7px 26px rgba(124,58,237,.52);}
.garea{flex:1;display:flex;align-items:center;justify-content:center;padding:16px;overflow:auto;}
.gcent{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;max-width:480px;}

@media(max-width:700px){.lp{width:192px;padding:10px;}.tile{width:60px;height:60px;}}
@media(max-width:520px){.lp{width:170px;padding:9px;}.tile{width:54px;height:54px;}.mgrid{gap:5px;}.tb-srch,.tb-live{display:none;}}
@media(max-width:400px){.tile{width:48px;height:48px;}.gshell{padding:9px;}}
`;

export { CSS_OVERLAYS };
