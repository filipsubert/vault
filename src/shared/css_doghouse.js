const CSS_DOGHOUSE=`
/* ═══════════════════════ DOG HOUSE SLOT ═══════════════════════ */
.dh-game{display:flex;flex-direction:column;flex:1;overflow:hidden;min-height:0;isolation:isolate;background:radial-gradient(ellipse at 50% 0%,#0a1e3a 0%,#050e20 50%,#020510 100%);position:relative;}
.dh-reels-wrap{position:relative;border-radius:16px;overflow:visible;box-shadow:0 12px 60px rgba(0,0,0,.9),0 0 0 2px rgba(80,160,255,.22),0 0 0 4px rgba(80,160,255,.05);width:100%;max-width:min(480px,calc((100vh - 210px)*1.67));aspect-ratio:5/3;flex-shrink:0;}
.dh-reels-bg{position:absolute;inset:0;border-radius:15px;background:linear-gradient(160deg,#0e1e38 0%,#080e20 100%);}
.dh-reels-bg::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% -10%,rgba(80,160,255,.07),transparent 55%);}
.dh-reels-bg::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(80,160,255,.5) 50%,transparent);border-radius:15px 15px 0 0;}
.dh-grid{display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(3,1fr);gap:4px;padding:8px;position:relative;z-index:1;height:100%;width:100%;}
.dh-cell{position:relative;will-change:transform,opacity;border-radius:10px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(145deg,rgba(255,255,255,.03),rgba(255,255,255,.015));border:1px solid rgba(255,255,255,.07);transition:all .15s;}
.dh-cell::before{content:'';position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,255,255,.04) 0%,transparent 55%);pointer-events:none;border-radius:9px;}
.dh-cell.dh-lit{background:linear-gradient(145deg,rgba(0,80,160,.5),rgba(0,40,100,.6)) !important;border-color:rgba(80,160,255,.8) !important;box-shadow:inset 0 0 16px rgba(80,160,255,.3),0 0 12px rgba(80,160,255,.25);animation:dhLitPulse .5s ease infinite;}
@keyframes dhLitPulse{0%,100%{border-color:rgba(80,160,255,.7);}50%{border-color:rgba(140,200,255,1);box-shadow:inset 0 0 24px rgba(80,160,255,.5),0 0 20px rgba(80,160,255,.4);}}
.dh-cell.dh-sticky{border-color:rgba(255,200,50,.7) !important;box-shadow:inset 0 0 12px rgba(255,180,30,.3),0 0 10px rgba(255,180,30,.3);animation:dhStickyGlow 1.5s ease infinite;}
@keyframes dhStickyGlow{0%,100%{box-shadow:inset 0 0 12px rgba(255,180,30,.3),0 0 10px rgba(255,180,30,.2);}50%{box-shadow:inset 0 0 22px rgba(255,180,30,.6),0 0 20px rgba(255,180,30,.5);}}
.dh-wild-mult{position:absolute;bottom:2px;right:3px;font-size:.5rem;font-weight:900;color:#ffe040;text-shadow:0 0 8px rgba(255,200,0,.9);font-family:'Special Elite',serif;background:rgba(0,0,0,.6);padding:1px 3px;border-radius:3px;}
.dh-sticky-badge{position:absolute;top:1px;left:50%;transform:translateX(-50%);font-size:.38rem;font-weight:900;color:#fff;background:rgba(200,140,0,.9);padding:1px 4px;border-radius:3px;letter-spacing:.05em;white-space:nowrap;}
.dh-payline-label{position:absolute;top:-30px;left:50%;transform:translateX(-50%);background:rgba(0,40,100,.95);border:1px solid rgba(80,160,255,.5);border-radius:10px;padding:4px 14px;font-size:.65rem;font-weight:700;color:#60c0ff;white-space:nowrap;z-index:20;animation:lbScatterAlertIn .2s ease both;}
/* Wheel picker */
.dh-wheel-overlay{width:100%;max-width:520px;background:linear-gradient(135deg,rgba(5,15,40,.98),rgba(2,8,25,.99));border:1.5px solid rgba(80,160,255,.4);border-radius:16px;padding:20px 16px;display:flex;flex-direction:column;align-items:center;gap:12px;}
.dh-wheel-title{font-family:'Rye',serif;font-size:1.3rem;color:#60c0ff;text-shadow:0 0 20px rgba(80,160,255,.6);letter-spacing:.1em;}
.dh-wheel-subtitle{font-size:.65rem;color:rgba(100,180,255,.55);}
.dh-wheels{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%;}
.dh-barrel{aspect-ratio:1;background:linear-gradient(145deg,#3a2010,#5a3318);border:2px solid #c87830;border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;font-size:1.8rem;position:relative;overflow:hidden;box-shadow:inset 0 2px 0 rgba(255,200,100,.2),0 4px 12px rgba(0,0,0,.6);}
.dh-barrel:hover:not(.open){transform:scale(1.05);border-color:#f5a000;box-shadow:inset 0 2px 0 rgba(255,200,100,.3),0 6px 16px rgba(0,0,0,.6),0 0 16px rgba(200,120,0,.3);}
.dh-barrel.open{background:linear-gradient(145deg,#082040,#0c3060);border-color:#60b0ff;cursor:default;animation:dhBarrelOpen .4s cubic-bezier(.34,1.4,.64,1) both;}
@keyframes dhBarrelOpen{0%{transform:scale(.8) rotateY(90deg);filter:brightness(2);}100%{transform:scale(1) rotateY(0);}}
.dh-barrel-num{font-family:'Special Elite',serif;font-size:2.2rem;font-weight:700;color:#60c0ff;text-shadow:0 0 16px rgba(80,160,255,.8);}
.dh-barrel-icon{filter:drop-shadow(0 2px 4px rgba(0,0,0,.8));}
.dh-wheel-total{font-family:'Special Elite',serif;font-size:1.1rem;color:#f5c400;text-shadow:0 0 12px rgba(245,196,0,.5);}
.dh-wheel-total strong{font-size:1.4rem;}
`;

export { CSS_DOGHOUSE };
