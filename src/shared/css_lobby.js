const CSS_LOBBY=`
/* ═══════════════════════ VAULT LOBBY — ROOBET LAYOUT ═══════════════════════ */

.vl-lobby{display:flex;flex-direction:column;gap:0;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:var(--s5) transparent;}
.vl-lobby::-webkit-scrollbar{width:3px;}
.vl-lobby::-webkit-scrollbar-thumb{background:var(--s5);border-radius:2px;}

/* ── HERO BANNERS ── */
.vl-heroes{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:16px 18px 0;}
.vl-hero{border-radius:16px;overflow:hidden;position:relative;min-height:180px;cursor:pointer;border:1px solid rgba(255,255,255,.07);transition:transform .2s cubic-bezier(.34,1.2,.64,1),box-shadow .2s;}
.vl-hero:hover{transform:translateY(-3px);box-shadow:0 18px 50px rgba(0,0,0,.6);}
.vl-hero-bg{position:absolute;inset:0;}
.vl-hero-overlay{position:absolute;inset:0;background:linear-gradient(110deg,rgba(0,0,0,.55) 45%,transparent 100%);}
.vl-hero-art{position:absolute;right:0;top:0;bottom:0;width:52%;pointer-events:none;display:flex;align-items:center;justify-content:center;transition:transform .3s ease;}
.vl-hero:hover .vl-hero-art{transform:scale(1.04) translateX(5px);}
.vl-hero-content{position:relative;z-index:2;padding:20px 22px;height:100%;display:flex;flex-direction:column;justify-content:center;gap:8px;max-width:55%;}
.vl-hero-timer{display:inline-flex;align-items:center;gap:5px;font-size:.68rem;font-weight:700;color:rgba(255,255,255,.75);background:rgba(255,255,255,.1);border-radius:20px;padding:4px 12px;width:fit-content;backdrop-filter:blur(4px);}
.vl-hero-title{font-family:var(--fh);font-size:1.2rem;font-weight:800;color:#fff;line-height:1.2;text-shadow:0 2px 12px rgba(0,0,0,.6);}
.vl-hero-sub{font-size:.72rem;color:rgba(255,255,255,.55);line-height:1.4;}
.vl-hero-cta{display:inline-flex;align-items:center;padding:9px 20px;border-radius:10px;font-size:.78rem;font-weight:800;border:none;cursor:pointer;transition:all .18s;width:fit-content;letter-spacing:.02em;}
.vl-hero-cta:hover{transform:translateY(-2px);filter:brightness(1.1);}

/* ── CATEGORY TABS ── */
.vl-tabs-row{display:flex;gap:8px;padding:18px 18px 0;overflow-x:auto;scrollbar-width:none;}
.vl-tabs-row::-webkit-scrollbar{display:none;}
.vl-tab{display:flex;align-items:center;gap:6px;padding:10px 18px;border-radius:24px;border:none;background:rgba(255,255,255,.05);color:var(--tx2);font-family:var(--f);font-size:.8rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:all .15s;flex-shrink:0;}
.vl-tab:hover{background:rgba(255,255,255,.09);color:var(--tx);}
.vl-tab.on{background:linear-gradient(135deg,var(--pu),var(--puLL));color:#fff;box-shadow:0 4px 16px rgba(124,58,237,.4);}
.vl-tab-ico{font-size:.9rem;}

/* ── SEARCH BAR ── */
.vl-search-row{display:flex;gap:10px;padding:14px 18px 0;align-items:center;}
.vl-search-box{flex:1;display:flex;align-items:center;gap:10px;background:var(--s2);border:1px solid var(--bd);border-radius:10px;padding:0 14px;height:44px;transition:border-color .18s;}
.vl-search-box:focus-within{border-color:rgba(139,92,246,.4);box-shadow:0 0 0 3px rgba(124,58,237,.1);}
.vl-search-box svg{color:var(--tx3);flex-shrink:0;}
.vl-search-box input{background:none;border:none;outline:none;color:var(--tx2);font-size:.84rem;font-family:var(--f);width:100%;}
.vl-search-box input::placeholder{color:var(--tx3);}
.vl-random-btn{display:flex;align-items:center;gap:6px;padding:0 18px;height:44px;border-radius:10px;border:1px solid var(--bd);background:rgba(255,255,255,.04);color:var(--tx2);font-family:var(--f);font-size:.8rem;font-weight:600;cursor:pointer;transition:all .15s;white-space:nowrap;flex-shrink:0;}
.vl-random-btn:hover{background:rgba(255,255,255,.08);color:var(--tx);border-color:rgba(167,139,250,.25);}

/* ── SECTION ── */
.vl-section{padding:22px 18px 0;}
.vl-sec-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.vl-sec-title{font-family:var(--fh);font-size:1.1rem;font-weight:800;color:var(--tx);display:flex;align-items:center;gap:8px;}
.vl-sec-emoji{font-size:1rem;}
.vl-sec-badge{font-size:.56rem;font-weight:800;padding:3px 9px;border-radius:10px;letter-spacing:.08em;text-transform:uppercase;background:rgba(239,68,68,.15);color:var(--rd);border:1px solid rgba(239,68,68,.25);}
.vl-sec-badge.vl-live-badge{background:rgba(0,255,136,.12);color:var(--nG);border-color:rgba(0,255,136,.25);}
.vl-sec-right{display:flex;align-items:center;gap:6px;}
.vl-view-all{padding:7px 16px;border-radius:8px;border:1px solid var(--bd);background:rgba(255,255,255,.04);color:var(--tx2);font-family:var(--f);font-size:.76rem;font-weight:600;cursor:pointer;transition:all .15s;}
.vl-view-all:hover{background:rgba(255,255,255,.08);color:var(--tx);border-color:rgba(167,139,250,.25);}
.vl-arrow{width:36px;height:36px;border-radius:8px;border:1px solid var(--bd);background:rgba(255,255,255,.04);color:var(--tx2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;}
.vl-arrow:hover:not(:disabled){background:rgba(255,255,255,.08);color:var(--tx);border-color:rgba(167,139,250,.25);}
.vl-arrow:disabled{opacity:.25;cursor:not-allowed;}

/* ── SCROLLABLE GAME ROW ── */
.vl-scroll-wrap{position:relative;}
.vl-scroll{display:flex;gap:12px;overflow-x:auto;scroll-behavior:smooth;scrollbar-width:none;padding-bottom:4px;}
.vl-scroll::-webkit-scrollbar{display:none;}
.vl-fade{position:absolute;top:0;bottom:4px;width:48px;z-index:2;pointer-events:none;}
.vl-fade-l{left:0;background:linear-gradient(90deg,var(--bg),transparent);}
.vl-fade-r{right:0;background:linear-gradient(270deg,var(--bg),transparent);}

/* ── GAME CARD ── */
.vl-card{width:172px;flex-shrink:0;border-radius:14px;overflow:hidden;cursor:pointer;position:relative;background:var(--s2);border:1px solid rgba(255,255,255,.07);transition:transform .18s cubic-bezier(.34,1.2,.64,1),box-shadow .18s,border-color .18s;display:flex;flex-direction:column;}
.vl-card:hover{transform:translateY(-5px) scale(1.025);box-shadow:0 16px 44px rgba(0,0,0,.65),0 0 0 1px rgba(167,139,250,.2);border-color:rgba(167,139,250,.3);}
.vl-card-art{width:100%;aspect-ratio:1;position:relative;overflow:hidden;}
.vl-card-art>*{position:absolute;inset:0;width:100%;height:100%;}
.vl-card-bottom{padding:10px 10px 12px;text-align:center;}
.vl-card-name{font-family:var(--fh);font-size:.88rem;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:.04em;line-height:1.2;}
.vl-card-pub{font-size:.56rem;font-weight:700;color:var(--tx3);letter-spacing:.12em;margin-top:2px;text-transform:uppercase;}

/* ── SEARCH GRID ── */
.vl-search-grid{display:flex;gap:12px;flex-wrap:wrap;}

/* ── LIVE WINS FEED ── */
.vl-feed{display:flex;flex-direction:column;gap:5px;}
.vl-feed-item{display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--s1);border:1px solid var(--bd);border-radius:10px;transition:background .12s;}
.vl-feed-item:hover{background:var(--s2);}
.vl-fi-avatar{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:800;flex-shrink:0;}
.vl-fi-game{font-size:.72rem;font-weight:700;color:var(--tx);}
.vl-fi-user{font-size:.63rem;color:var(--tx3);}
.vl-fi-mult{font-size:.7rem;font-weight:700;color:var(--go);}
.vl-fi-amt{font-size:.78rem;font-weight:800;color:var(--nG);font-variant-numeric:tabular-nums;}

/* ── RESPONSIVE ── */
@media(max-width:900px){.vl-heroes{grid-template-columns:1fr;}.vl-card{width:148px;}}
@media(max-width:520px){.vl-card{width:132px;}.vl-hero-title{font-size:1rem;}.vl-hero-sub{display:none;}}

/* ══ SUB PAGES ══ */
.subpage{display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:var(--s5) transparent;}
.subpage::-webkit-scrollbar{width:3px;}.subpage::-webkit-scrollbar-thumb{background:var(--s5);}
.sp-header{padding:24px 20px 0;}
.sp-bc{display:flex;align-items:center;gap:7px;font-size:.76rem;color:var(--tx3);margin-bottom:16px;}
.sp-bc a{color:var(--tx3);cursor:pointer;transition:color .12s;}.sp-bc a:hover{color:var(--tx2);}
.sp-title{font-family:var(--fh);font-size:1.6rem;font-weight:800;color:var(--tx);margin-bottom:6px;letter-spacing:-.02em;}
.sp-sub{font-size:.8rem;color:var(--tx3);margin-bottom:4px;line-height:1.5;}
.sp-body{padding:20px;}
.casino-filters{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:18px;}
.cf-btn{padding:7px 16px;border-radius:20px;border:1.5px solid var(--bd);background:transparent;color:var(--tx3);font-family:var(--f);font-size:.76rem;font-weight:600;cursor:pointer;transition:all .15s;}
.cf-btn:hover{border-color:rgba(167,139,250,.3);color:var(--tx);}
.cf-btn.on{background:rgba(124,58,237,.15);border-color:rgba(139,92,246,.4);color:var(--puLL);}
.casino-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.coming-soon-card{border-radius:16px;overflow:hidden;position:relative;aspect-ratio:3/4;border:1px dashed rgba(255,255,255,.08);background:linear-gradient(145deg,var(--s2),var(--s1));}
.cs-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;}
.cs-ico{font-size:2.5rem;opacity:.25;}
.cs-name{font-family:var(--fh);font-size:.88rem;font-weight:700;color:var(--tx3);}
.cs-badge{font-size:.58rem;font-weight:700;padding:3px 9px;border-radius:10px;background:rgba(124,58,237,.12);border:1px solid rgba(124,58,237,.25);color:var(--puLL);}
.promo-grid{display:flex;flex-direction:column;gap:12px;}
.promo-card{border-radius:16px;overflow:hidden;border:1px solid var(--bd);background:linear-gradient(145deg,var(--s2),var(--s1));display:flex;transition:transform .18s,box-shadow .18s;cursor:pointer;}
.promo-card:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,0,0,.4);}
.promo-card-stripe{width:5px;flex-shrink:0;}
.promo-card-body{padding:18px 20px;flex:1;}
.pc-eyebrow{font-size:.6rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px;}
.pc-title{font-family:var(--fh);font-size:1.1rem;font-weight:800;color:var(--tx);margin-bottom:6px;}
.pc-desc{font-size:.76rem;color:var(--tx3);line-height:1.5;margin-bottom:14px;}
.pc-btn{display:inline-flex;padding:9px 20px;border-radius:9px;border:none;font-family:var(--f);font-size:.78rem;font-weight:700;cursor:pointer;transition:all .15s;}
.vip-tiers{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px;}
.vip-tier{border-radius:14px;padding:20px;border:1px solid var(--bd);background:linear-gradient(145deg,var(--s2),var(--s1));position:relative;overflow:hidden;}
.vip-tier.active{border-color:rgba(245,196,0,.3);background:linear-gradient(145deg,#1a1200,#2a1e00);}
.vt-name{font-family:var(--fh);font-size:1rem;font-weight:800;margin-bottom:4px;}
.vt-req{font-size:.68rem;color:var(--tx3);margin-bottom:12px;}
.vt-perks{display:flex;flex-direction:column;gap:5px;}
.vt-perk{font-size:.72rem;color:var(--tx2);display:flex;align-items:center;gap:6px;}
.sports-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;}
.sport-card{border-radius:14px;padding:18px;border:1px solid var(--bd);background:linear-gradient(145deg,var(--s2),var(--s1));cursor:pointer;transition:all .18s;display:flex;flex-direction:column;gap:10px;}
.sport-card:hover{transform:translateY(-2px);border-color:rgba(167,139,250,.2);box-shadow:0 8px 28px rgba(0,0,0,.4);}
.sc-ico{font-size:2rem;}.sc-name{font-family:var(--fh);font-size:.95rem;font-weight:700;color:var(--tx);}
.sc-desc{font-size:.7rem;color:var(--tx3);}
.sc-live{display:inline-flex;align-items:center;gap:5px;font-size:.62rem;font-weight:700;color:var(--nG);background:rgba(0,255,136,.08);border:1px solid rgba(0,255,136,.18);padding:3px 9px;border-radius:10px;width:fit-content;}
.support-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
.support-card{border-radius:14px;padding:20px;border:1px solid var(--bd);background:linear-gradient(145deg,var(--s2),var(--s1));cursor:pointer;transition:all .18s;}
.support-card:hover{transform:translateY(-2px);border-color:rgba(167,139,250,.2);}
.sc2-ico{font-size:1.8rem;margin-bottom:10px;}.sc2-title{font-family:var(--fh);font-size:.9rem;font-weight:700;color:var(--tx);margin-bottom:5px;}
.sc2-desc{font-size:.7rem;color:var(--tx3);line-height:1.45;}
@media(max-width:700px){.casino-grid{grid-template-columns:repeat(2,1fr)}.vip-tiers{grid-template-columns:1fr}.sports-grid{grid-template-columns:1fr}.support-grid{grid-template-columns:1fr}}
`;

export { CSS_LOBBY };
