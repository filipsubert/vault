const CSS_LEBANDIT=`
/* ═══════════════════════ LE BANDIT SLOT ═══════════════════════ */
/* ═══════════════════════ LE BANDIT SLOT ═══════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Rye&family=Special+Elite&display=swap');
@keyframes lbDrop{from{transform:translateY(var(--drop-dist,-100%));opacity:0}60%{opacity:1}to{transform:translateY(0);opacity:1}}
/* ── FALL OUT: clean gravity drop, column-staggered ── */
@keyframes lbFallOut{
  0%  {transform:translateY(0);opacity:1;}
  8%  {transform:translateY(-3%);opacity:1;}
  100%{transform:translateY(var(--exit-dist,320px));opacity:0;}
}
/* ── DROP IN: gravity fall from above, light bounce on landing ── */
@keyframes lbDropIn{
  0%  {transform:translateY(var(--drop-from,-280px));opacity:0;}
  8%  {opacity:1;}
  72% {transform:translateY(5%);opacity:1;}
  82% {transform:translateY(-2.5%);}
  90% {transform:translateY(1.2%);}
  95% {transform:translateY(0);}
  100%{transform:translateY(0);opacity:1;}
}
@keyframes lbRemove{0%{transform:scale(1);opacity:1}20%{transform:scale(1.18);filter:brightness(1.8)}60%{transform:scale(0.7);opacity:.4}100%{transform:scale(0);opacity:0}}
@keyframes lbPop{0%{transform:scale(1)}40%{transform:scale(1.35)}70%{transform:scale(.88)}100%{transform:scale(1)}}
@keyframes lbGold{0%,100%{box-shadow:0 0 0 0 rgba(245,196,0,0)}50%{box-shadow:0 0 14px 4px rgba(245,196,0,.55)}}
@keyframes lbRainbow{0%{filter:hue-rotate(0deg) brightness(1.2)}100%{filter:hue-rotate(360deg) brightness(1.2)}}
@keyframes lbShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
@keyframes lbCoinFlip{0%{transform:scale(1) rotateY(0deg);filter:brightness(1);}25%{transform:scale(1.18) rotateY(90deg);filter:brightness(2.5);}26%{transform:scale(1.18) rotateY(-90deg);filter:brightness(2.5);}70%{transform:scale(1.1) rotateY(-8deg);filter:brightness(1.4);}100%{transform:scale(1) rotateY(0deg);filter:brightness(1);}}
@keyframes lbCoinValuePop{0%{transform:scale(0) translateY(4px);opacity:0;}60%{transform:scale(1.3) translateY(-2px);opacity:1;}80%{transform:scale(0.9);}100%{transform:scale(1) translateY(0);opacity:1;}}
@keyframes lbRainbowSweep{0%{transform:translateX(-110%);opacity:0;}15%{opacity:1;}85%{opacity:1;}100%{transform:translateX(110%);opacity:0;}}
@keyframes lbRevealPulse{0%,100%{border-color:transparent;background:transparent;}50%{border-color:transparent;background:transparent;}}
@keyframes lbTallyCount{0%{transform:scale(0.6) translateY(8px);opacity:0;}60%{transform:scale(1.12) translateY(-2px);}100%{transform:scale(1) translateY(0);opacity:1;}}
@keyframes lbCoinShineSwipe{0%{transform:translateX(-120%);}100%{transform:translateX(120%);}}
@keyframes lbCoinReveal{0%{transform:scale(0) rotateY(90deg);opacity:0}60%{transform:scale(1.2) rotateY(-10deg)}100%{transform:scale(1) rotateY(0);opacity:1}}
@keyframes lbWinLine{0%,100%{opacity:.7}50%{opacity:1;filter:brightness(1.4)}}
@keyframes lbScatterPulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0),inset 0 0 0 0 rgba(239,68,68,0);}50%{box-shadow:0 0 32px 8px rgba(239,68,68,.35),inset 0 0 16px 4px rgba(239,68,68,.15);}}
@keyframes lbScatterVibe{0%,100%{transform:scale(1);}15%{transform:scale(1.05);}35%{transform:scale(.97);}55%{transform:scale(1.03);}75%{transform:scale(.99);}}
@keyframes lbScatterAlertIn{0%{opacity:0;transform:translateX(-50%) translateY(-22px) scale(.55);}55%{transform:translateX(-50%) translateY(4px) scale(1.1);}75%{transform:translateX(-50%) translateY(-2px) scale(.97);}100%{opacity:1;transform:translateX(-50%) translateY(0) scale(1);}}
@keyframes lbScatterAlertPulse{0%,100%{box-shadow:0 0 40px rgba(255,30,30,.7),0 0 90px rgba(255,0,0,.25),0 5px 18px rgba(0,0,0,.9);}50%{box-shadow:0 0 70px rgba(255,50,50,1),0 0 140px rgba(255,20,20,.4),0 5px 18px rgba(0,0,0,.9);}}
@keyframes lbScatterCounterPop{0%{transform:scale(0) rotate(-20deg);opacity:0;}50%{transform:scale(1.6) rotate(5deg);opacity:1;}72%{transform:scale(.85) rotate(-2deg);}100%{transform:scale(1) rotate(0);opacity:1;}}
@keyframes lbScatterDotPulse{0%,100%{box-shadow:0 0 12px rgba(255,60,60,.9),0 0 24px rgba(255,0,0,.45);}50%{box-shadow:0 0 26px rgba(255,70,70,1),0 0 50px rgba(255,10,10,.7);}}
@keyframes lbBorderGlow{0%,100%{border-color:rgba(239,68,68,.4);}50%{border-color:rgba(239,68,68,.95);}}
@keyframes lbScatterHeartbeat{0%,100%{transform:scale(1);}8%{transform:scale(1.12);}16%{transform:scale(1);}24%{transform:scale(1.07);}32%{transform:scale(1);}}
@keyframes lbScatterTextFlash{0%,100%{opacity:1;}50%{opacity:.7;}}
.lb-grid-wrap.scatter-alert-1{box-shadow:0 16px 72px rgba(0,0,0,.9),0 0 0 3px rgba(239,68,68,.55),0 0 0 6px rgba(239,68,68,.12),0 0 50px rgba(239,68,68,.2);}
.lb-grid-wrap.scatter-alert-2{animation:lbScatterPulse .5s ease infinite;box-shadow:0 16px 72px rgba(0,0,0,.9),0 0 0 3px rgba(255,40,40,.95),0 0 0 8px rgba(239,68,68,.22),0 0 80px rgba(239,68,68,.5) !important;}
.lb-scatter-alert{position:absolute;top:-62px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,rgba(185,8,8,.99),rgba(95,2,2,1));border:2.5px solid rgba(255,80,80,.9);border-radius:30px;padding:10px 28px 10px 20px;white-space:nowrap;display:flex;align-items:center;gap:13px;pointer-events:none;box-shadow:0 0 40px rgba(255,30,30,.7),0 0 90px rgba(255,0,0,.25),0 5px 18px rgba(0,0,0,.9);z-index:20;animation:lbScatterAlertIn .35s cubic-bezier(.34,1.4,.64,1) both,lbScatterAlertPulse 1.1s .5s ease infinite;}
.lb-scatter-dots{display:flex;gap:7px;align-items:center;}
.lb-scatter-dot{width:14px;height:14px;border-radius:50%;border:2px solid rgba(255,80,80,.35);background:rgba(90,8,8,.95);transition:all .22s;}
.lb-scatter-dot.lit{background:radial-gradient(circle at 35% 35%,#ff7070,#cc0000);border-color:#ff6060;box-shadow:0 0 14px rgba(255,50,50,.9),0 0 30px rgba(255,0,0,.5);animation:lbScatterCounterPop .38s cubic-bezier(.34,1.6,.64,1) both,lbScatterDotPulse 1s .4s ease infinite;}
.lb-scatter-text{font-family:'Rye',serif;font-size:.88rem;color:#fff;letter-spacing:.09em;text-shadow:0 0 18px rgba(255,80,80,.95),0 0 36px rgba(255,0,0,.5);animation:lbScatterTextFlash 1s ease infinite;}
.lb-scatter-need{font-size:.62rem;color:rgba(255,180,180,.8);margin-left:2px;}
.lb-cell.sym-scatter-lit{animation:lbScatterHeartbeat .55s ease infinite;}
.lb-cell.sym-scatter-lit .lb-sym.sym-scatter{box-shadow:0 0 30px rgba(239,68,68,.95),0 0 60px rgba(239,68,68,.45);border-color:rgba(255,80,80,.95) !important;}
@keyframes lbCascade{0%{transform:translateY(var(--fall-dist,-60px));opacity:0}15%{opacity:1}72%{transform:translateY(4%);opacity:1}82%{transform:translateY(-2%)}91%{transform:translateY(1%)}100%{transform:translateY(0);opacity:1}}
.lb-cell.fall-out{animation:lbFallOut var(--fallout-dur,.34s) cubic-bezier(.4,0,1,1) var(--fallout-delay,0s) both;pointer-events:none;}
.lb-cell.dropping{animation:lbCascade var(--fall-dur,.38s) cubic-bezier(.22,1,.36,1) var(--fall-delay,0s) both;}
.lb-cell.removing{animation:lbRemove .3s ease forwards;pointer-events:none;}
.lb-cell.new-drop{animation:lbDropIn var(--fall-dur,.44s) cubic-bezier(.25,.46,.45,.94) var(--fall-delay,0s) both;}
@keyframes lbSquareGlow{0%,100%{box-shadow:inset 0 0 12px rgba(245,196,0,.3),0 0 8px rgba(245,196,0,.2)}50%{box-shadow:inset 0 0 22px rgba(245,196,0,.6),0 0 16px rgba(245,196,0,.45)}}
@keyframes lbBonusIn{0%{opacity:0;transform:scale(.7) translateY(30px)}60%{transform:scale(1.06)}100%{opacity:1;transform:scale(1) translateY(0)}}
@keyframes lbCloverSpin{0%{transform:rotate(0deg) scale(1)}50%{transform:rotate(180deg) scale(1.2)}100%{transform:rotate(360deg) scale(1)}}
@keyframes lbPotCollect{0%{transform:scale(1)}30%{transform:scale(1.3)}100%{transform:scale(0.8) translateY(-8px);opacity:.6}}
@keyframes lbPotFly{0%{transform:scale(1);opacity:1;}40%{transform:scale(1.15);opacity:.9;}100%{transform:scale(0.3) translateY(-20px);opacity:0;}}
@keyframes lbPotTotal{0%{transform:scale(0) rotate(-8deg);opacity:0;}50%{transform:scale(1.18) rotate(2deg);}80%{transform:scale(.94);}100%{transform:scale(1) rotate(0);opacity:1;}}
@keyframes lbBigWinBg{0%,100%{opacity:.65;}50%{opacity:1;}}
@keyframes lbBigWinTitle{0%{transform:scale(.4) translateY(30px);opacity:0;filter:blur(8px);}60%{transform:scale(1.1) translateY(-6px);filter:blur(0);}80%{transform:scale(.96);}100%{transform:scale(1) translateY(0);opacity:1;}}
@keyframes lbBwFadeOut{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.04)}}
@keyframes lbRainbowShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes lbSuperPulse{0%,100%{box-shadow:0 0 24px rgba(255,220,50,.75),0 0 48px rgba(255,200,0,.25),0 4px 12px rgba(0,0,0,.7)}50%{box-shadow:0 0 38px rgba(255,230,80,1),0 0 72px rgba(255,200,0,.5),0 4px 12px rgba(0,0,0,.7)}}
@keyframes sbSpin360{to{transform:rotate(360deg)}}
@keyframes lbBigWinCount{0%{transform:scale(.8);opacity:.5;}100%{transform:scale(1);opacity:1;}}
@keyframes lbBigWinPulse{0%,100%{text-shadow:0 0 20px rgba(245,196,0,.6),0 0 40px rgba(245,196,0,.2);}50%{text-shadow:0 0 40px rgba(245,196,0,1),0 0 80px rgba(245,196,0,.5),0 0 120px rgba(245,196,0,.2);}}
@keyframes lbBigWinParticle{0%{transform:translate(0,0) scale(1);opacity:1;}100%{transform:translate(var(--px),var(--py)) scale(0);opacity:0;}}
.lb-coin.pot-flying{animation:lbPotFly .5s ease forwards;}
.lb-coin.pot-total{animation:lbPotTotal .5s cubic-bezier(.34,1.4,.64,1) both;}
.lb-pot-counter{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:10px;background:linear-gradient(145deg,#2a1200,#4a2000,#7a3800);border:2px solid rgba(255,165,0,.85);box-shadow:0 0 20px rgba(255,140,0,.6),0 0 40px rgba(255,120,0,.25),inset 0 1px 0 rgba(255,200,100,.3);z-index:5;}
.lb-pot-counter-val{font-family:'Special Elite',serif;font-size:clamp(.55rem,.9vw,.72rem);color:#ffe040;text-shadow:0 0 10px rgba(255,200,0,.9);font-weight:700;line-height:1.1;text-align:center;padding:0 2px;}
.lb-pot-counter-lbl{font-size:.38rem;color:rgba(255,160,40,.7);text-transform:uppercase;letter-spacing:.08em;}

/* Big Win Overlay */
.lb-bigwin-overlay{position:fixed;inset:0;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;pointer-events:none;}
.lb-bigwin-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(10,6,2,.97) 0%,rgba(4,2,1,.92) 60%,rgba(2,1,0,.85) 100%);animation:lbBigWinBg 1.5s ease infinite;}
.lb-bigwin-rays{position:absolute;inset:0;background:conic-gradient(from 0deg at 50% 50%,transparent 0deg,rgba(245,196,0,.04) 10deg,transparent 20deg,rgba(245,196,0,.04) 30deg,transparent 40deg,rgba(245,196,0,.04) 50deg,transparent 60deg,rgba(245,196,0,.04) 70deg,transparent 80deg,rgba(245,196,0,.04) 90deg,transparent 100deg,rgba(245,196,0,.04) 110deg,transparent 120deg,rgba(245,196,0,.04) 130deg,transparent 140deg,rgba(245,196,0,.04) 150deg,transparent 160deg,rgba(245,196,0,.04) 170deg,transparent 180deg,rgba(245,196,0,.04) 190deg,transparent 200deg,rgba(245,196,0,.04) 210deg,transparent 220deg,rgba(245,196,0,.04) 230deg,transparent 240deg,rgba(245,196,0,.04) 250deg,transparent 260deg,rgba(245,196,0,.04) 270deg,transparent 280deg,rgba(245,196,0,.04) 290deg,transparent 300deg,rgba(245,196,0,.04) 310deg,transparent 320deg,rgba(245,196,0,.04) 330deg,transparent 340deg,rgba(245,196,0,.04) 350deg,transparent 360deg);animation:lbBigWinBg 3s linear infinite;}
.lb-bigwin-title{position:relative;z-index:1;font-family:'Rye',serif;font-size:clamp(1.4rem,4vw,2.2rem);color:#f5c400;letter-spacing:.12em;text-transform:uppercase;animation:lbBigWinTitle .55s cubic-bezier(.34,1.4,.64,1) both;}
.lb-bigwin-amount{position:relative;z-index:1;font-family:'Special Elite',serif;font-size:clamp(2.8rem,8vw,5rem);font-weight:700;color:#ffe040;line-height:1;animation:lbBigWinPulse 1.2s ease infinite;letter-spacing:-.01em;}
.lb-bigwin-mult{position:relative;z-index:1;font-family:'Rye',serif;font-size:clamp(.9rem,2.5vw,1.4rem);color:rgba(245,196,0,.7);letter-spacing:.08em;animation:lbBigWinTitle .7s cubic-bezier(.34,1.2,.64,1) .2s both;}
@keyframes lbCoinFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes lbStarTwinkle{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.1)}}
@keyframes lbBonusPulse{0%,100%{box-shadow:0 0 0 0 rgba(245,196,0,.4),0 8px 32px rgba(0,0,0,.6)}50%{box-shadow:0 0 0 6px rgba(245,196,0,.08),0 8px 32px rgba(0,0,0,.6)}}

/* Le Bandit Layout */
.lb-game{display:flex;flex-direction:column;flex:1;overflow:hidden;min-height:0;position:relative;isolation:isolate;}
/* Atmospheric overlay — wood grain + dust */
.lb-game::before{display:none;}
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"),
    radial-gradient(ellipse at 50% 0%,rgba(245,196,0,.06) 0%,transparent 60%);
  mix-blend-mode:overlay;}
/* Animated dust motes */
.lb-game::after{content:'';position:absolute;bottom:0;left:0;right:0;height:40%;background:transparent;pointer-events:none;z-index:0;}
  background:radial-gradient(ellipse at 30% 70%,rgba(245,196,0,.04) 0%,transparent 45%),
    radial-gradient(ellipse at 75% 20%,rgba(200,120,0,.05) 0%,transparent 40%);
  animation:lbAtmosPulse 8s ease-in-out infinite;}
@keyframes lbAtmosPulse{0%,100%{opacity:.7}50%{opacity:1;}}
.lb-game::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.014'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");pointer-events:none;z-index:0;}
.lb-game::after{content:'';position:absolute;bottom:0;left:0;right:0;height:40%;background:transparent;pointer-events:none;z-index:0;}
.lb-top-bar{display:none;}
.lb-title{display:none;}
.lb-bc{display:none;}
.lb-main{display:flex;flex:1;overflow:hidden;position:relative;z-index:1;flex-direction:column;}
.lb-controls{display:none;}
.lb-arena{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;gap:0;overflow:hidden;min-height:0;position:relative;z-index:1;}

/* Grid — size constrained to fit viewport */
.lb-grid-wrap{position:relative;transform:translateZ(0);border-radius:18px;overflow:visible;
  box-shadow:0 20px 80px rgba(0,0,0,.95),inset 0 0 0 1px rgba(255,255,255,.04);
  width:100%;max-width:min(500px,calc(100vh - 230px));aspect-ratio:6/5;flex-shrink:0;transition:box-shadow .3s;}
.lb-grid-wrap::before{content:'';position:absolute;inset:-1px;border-radius:19px;background:transparent;pointer-events:none;z-index:0;}
/* Corner ornaments */
.lb-grid-wrap::after{display:none;}
  font-size:1rem;color:#f5c400;text-shadow:0 0 12px rgba(245,196,0,.8);z-index:5;pointer-events:none;}
.lb-grid-bg{position:absolute;inset:0;border-radius:17px;overflow:hidden;
  background:linear-gradient(160deg,#1c1200 0%,#110c00 50%,#080500 100%);}
.lb-grid-bg::before{content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse at 50% -10%,rgba(245,196,0,.12),transparent 55%),
    radial-gradient(ellipse at 15% 110%,rgba(180,90,0,.08),transparent 45%),
    radial-gradient(ellipse at 85% 110%,rgba(180,90,0,.08),transparent 45%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");}
.lb-grid-bg::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,rgba(245,196,0,.4) 30%,rgba(245,196,0,.7) 50%,rgba(245,196,0,.4) 70%,transparent);}
.lb-grid{display:grid;contain:layout style paint;touch-action:none;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(5,1fr);gap: 7% 3.8%;padding:0;position:relative;z-index:1;height:100%;width:100%;}
.lb-cell{position:relative;border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:default;overflow:hidden;
  background:transparent;
  border:1px solid transparent;transition:border-color .15s,background .15s,box-shadow .15s;}
.lb-cell::before{content:'';position:absolute;inset:0;background:transparent;pointer-events:none;border-radius:9px;}
@keyframes lbWinPulse{0%,100%{border-color:transparent;box-shadow:inset 0 0 14px rgba(245,196,0,.4),0 0 10px rgba(245,196,0,.3);}50%{border-color:transparent;box-shadow:inset 0 0 28px rgba(245,196,0,.75),0 0 24px rgba(245,196,0,.65);}}
.lb-cell.win-flash{background:transparent !important;border-color:transparent !important;box-shadow:inset 0 0 18px rgba(245,196,0,.45),0 0 12px rgba(245,196,0,.35);animation:lbWinPulse .45s ease infinite;}
.lb-cell.spin-hit{background:transparent;border-color:transparent;}
.lb-cell.golden{background:linear-gradient(145deg,rgba(30,22,4,.9),rgba(22,16,2,.95));border-color:rgba(245,196,0,.55);animation:lbSquareGlow 2s ease-in-out infinite;box-shadow:inset 0 0 12px rgba(245,196,0,.25),0 0 8px rgba(245,196,0,.15);}
.lb-cell.golden::after{content:'';position:absolute;inset:0;border-radius:8px;background:linear-gradient(145deg,rgba(245,196,0,.08),transparent);pointer-events:none;}

/* Symbols */
.lb-sym{width:100%;height:100%;display:flex;align-items:center;justify-content:center;border-radius:8px;position:relative;user-select:none;transition:transform .15s,box-shadow .15s;will-change:transform;}
.lb-sym svg{display:block;overflow:visible;}
/* Premium symbols */
.lb-sym.sym-hat{background:transparent;border:1px solid transparent;}
.lb-sym.sym-bag{background:transparent;border:1px solid transparent;}
.lb-sym.sym-cheese{background:transparent;border:1px solid transparent;}
.lb-sym.sym-beer{background:transparent;border:1px solid transparent;}
.lb-sym.sym-trap{background:transparent;border:1px solid transparent;}
/* Royals */
.lb-sym.sym-royal{background:transparent;border:1px solid transparent;}
.lb-sym.sym-a{border-color:transparent;}
.lb-sym.sym-k{border-color:transparent;}
.lb-sym.sym-q{border-color:transparent;}
.lb-sym.sym-j{border-color:transparent;}
.lb-sym.sym-10{border-color:transparent;}
/* Special */
.lb-sym.sym-wild{background:transparent;border:1px solid transparent;}
.lb-sym.sym-rainbow{background:transparent;border:1px solid transparent;}
.lb-sym.sym-scatter{background:transparent;border:1px solid transparent;}
.lb-sym.hit{animation:lbPop .35s cubic-bezier(.34,1.6,.64,1);}

/* Coins */
.lb-cell.coin-revealing{animation:lbRevealPulse .38s ease-in-out infinite;border-color:transparent !important;}
.lb-reveal-tally{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,rgba(10,6,0,.96),rgba(25,16,0,.99));border:1.5px solid rgba(245,196,0,.65);border-radius:14px;padding:7px 22px;display:flex;flex-direction:column;align-items:center;gap:1px;pointer-events:none;box-shadow:0 0 24px rgba(245,196,0,.35),0 4px 20px rgba(0,0,0,.85);z-index:10;}
.lb-reveal-tally.hidden{display:none;}
.lb-tally-lbl{font-size:.5rem;letter-spacing:.13em;text-transform:uppercase;color:rgba(245,196,0,.55);font-family:'Special Elite',serif;white-space:nowrap;}
.lb-tally-val{font-family:'Special Elite',serif;font-size:1.5rem;font-weight:700;color:#ffe040;text-shadow:0 0 18px rgba(255,205,0,.85),0 0 36px rgba(255,200,0,.35);line-height:1;animation:lbTallyCount .22s cubic-bezier(.34,1.6,.64,1);}
.lb-coin{width:112%;height:112%;margin:-6%;border-radius:9px;display:flex;align-items:center;justify-content:center;will-change:transform,opacity;font-family:'Special Elite',serif;cursor:default;position:relative;overflow:visible;animation:lbCoinFlip var(--flip-dur,.7s) cubic-bezier(.4,0,.2,1) var(--flip-delay,0s) both;}
/* Top-left gloss */
.lb-coin::before{content:'';position:absolute;top:0;left:0;right:0;height:45%;background:linear-gradient(180deg,rgba(255,255,255,.18) 0%,rgba(255,255,255,.04) 100%);pointer-events:none;border-radius:9px 9px 50% 50%;}
/* Shine sweep */
.lb-coin::after{content:'';position:absolute;top:-20%;left:-80%;width:55%;height:140%;background:linear-gradient(105deg,transparent,rgba(255,255,255,.28),transparent);animation:lbCoinShineSwipe .65s ease var(--flip-delay,0s) both;pointer-events:none;}
/* Inner rim ring */
.lb-coin-rim{position:absolute;inset:3px;border-radius:6px;border:1px solid rgba(255,255,255,.08);pointer-events:none;}
.lb-coin.bronze{background:radial-gradient(ellipse at 40% 30%,#c07040,#8b4820,#5c2a08);border:2px solid #c8823a;box-shadow:0 0 14px rgba(180,90,30,.45),0 3px 8px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,190,100,.3),inset 0 -1px 0 rgba(0,0,0,.4);}
.lb-coin.silver{background:radial-gradient(ellipse at 40% 30%,#8090b8,#404878,#202848);border:2px solid #7090d0;box-shadow:0 0 18px rgba(100,140,230,.5),0 3px 8px rgba(0,0,0,.7),inset 0 1px 0 rgba(200,225,255,.3),inset 0 -1px 0 rgba(0,0,0,.4);}
.lb-coin.gold{background:radial-gradient(ellipse at 38% 28%,#ffe880,#d4900a,#7a4800);border:2px solid #f5c400;box-shadow:0 0 28px rgba(245,196,0,.7),0 0 56px rgba(245,196,0,.25),0 3px 10px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,250,150,.4),inset 0 -1px 0 rgba(100,50,0,.5);}
.lb-coin.clover-sym{background:radial-gradient(ellipse at 40% 30%,#30a858,#186830,#083818);border:2px solid #22d060;box-shadow:0 0 18px rgba(30,200,80,.5),0 3px 8px rgba(0,0,0,.7),inset 0 1px 0 rgba(150,255,150,.25),inset 0 -1px 0 rgba(0,0,0,.4);}
.lb-coin.pot-sym{background:transparent;border:none;box-shadow:none;}
.lb-coin.pot-sym::before,.lb-coin.pot-sym::after{display:none;}
.lb-coin.pot-sym img{mix-blend-mode:screen;}
.lb-coin.pot-persistent{border-color:#ffe066!important;box-shadow:0 0 32px rgba(245,196,0,.85),0 0 60px rgba(245,196,0,.3),0 3px 8px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,240,150,.35)!important;animation:lbPotPersistPulse 1.8s ease infinite!important;}
@keyframes lbPotPersistPulse{0%,100%{box-shadow:0 0 28px rgba(245,196,0,.7),0 0 50px rgba(245,196,0,.25),0 3px 8px rgba(0,0,0,.7)}50%{box-shadow:0 0 50px rgba(245,196,0,1),0 0 90px rgba(245,196,0,.45),0 3px 8px rgba(0,0,0,.7)}}
.lbc-icon{font-size:clamp(1rem,2vw,1.4rem);line-height:1;filter:drop-shadow(0 1px 4px rgba(0,0,0,.8)) drop-shadow(0 0 6px rgba(0,0,0,.4));}
.lbc-val{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:clamp(1rem,1.8vw,1.3rem);font-weight:900;letter-spacing:.02em;line-height:1;z-index:3;animation:lbCoinValuePop .42s cubic-bezier(.34,1.6,.64,1) calc(var(--flip-delay,0s) + .36s) both;text-align:center;pointer-events:none;white-space:nowrap;}
.lb-coin.bronze .lbc-val{color:#ffcc88;text-shadow:0 0 10px rgba(255,160,60,.8),0 1px 2px rgba(0,0,0,.9);}
.lb-coin.silver .lbc-val{color:#d8eaff;text-shadow:0 0 10px rgba(160,200,255,.8),0 1px 2px rgba(0,0,0,.9);}
.lb-coin.gold .lbc-val{color:#fff0a0;text-shadow:0 0 14px rgba(255,220,0,1),0 0 28px rgba(255,200,0,.5),0 1px 2px rgba(0,0,0,.9);}
.lb-coin.clover-sym .lbc-val{color:#80ffb0;text-shadow:0 0 10px rgba(0,255,120,.8),0 1px 2px rgba(0,0,0,.9);}
.lb-coin.pot-sym .lbc-val{color:#ffe090;text-shadow:0 0 12px rgba(255,200,0,.9),0 1px 2px rgba(0,0,0,.9);}
.lb-coin.has-mult::after{content:attr(data-mult);position:absolute;top:-4px;right:-4px;background:linear-gradient(135deg,#166534,#14532d);color:#86efac;font-size:.44rem;font-weight:900;padding:2px 5px;border-radius:5px;border:1px solid rgba(34,197,94,.5);box-shadow:0 0 10px rgba(34,197,94,.55),0 2px 4px rgba(0,0,0,.6);}
@keyframes lbCloverBoost{
  0%  {transform:scale(1);filter:brightness(1);}
  15% {transform:scale(1.22);filter:brightness(2.2) hue-rotate(80deg);}
  35% {transform:scale(0.92);filter:brightness(1.6);}
  55% {transform:scale(1.1);filter:brightness(1.3);}
  100%{transform:scale(1);filter:brightness(1);}
}
@keyframes lbCloverMultPop{
  0%  {transform:scale(0) rotate(-20deg);opacity:0;}
  50% {transform:scale(1.4) rotate(5deg);opacity:1;}
  70% {transform:scale(0.9) rotate(-2deg);}
  100%{transform:scale(1) rotate(0);opacity:1;}
}
@keyframes lbCloverRay{
  0%  {opacity:0;transform:scale(0.4);}
  40% {opacity:0.7;transform:scale(1.15);}
  100%{opacity:0;transform:scale(1.4);}
}
.lb-coin.clover-boosted{animation:lbCloverBoost .55s cubic-bezier(.34,1.4,.64,1) both;}
.lb-coin.clover-boosted .lbc-val{animation:lbCoinValuePop .35s cubic-bezier(.34,1.6,.64,1) .18s both;}
.lb-coin.has-mult.clover-boosted::after{animation:lbCloverMultPop .4s cubic-bezier(.34,1.6,.64,1) .22s both;}
.lb-clover-ray{position:absolute;inset:-4px;border-radius:11px;border:2px solid rgba(0,255,100,.7);pointer-events:none;animation:lbCloverRay .6s ease both;}
.lb-coin.coin-boost-flip{animation:lbCoinFlip .52s cubic-bezier(.25,1,.5,1) both;}
.lb-coin.coin-boost-flip .lbc-val{animation:lbCoinValuePop .38s cubic-bezier(.34,1.6,.64,1) .22s both;}

/* HUD right side */
.lb-hud{display:flex;gap:6px;align-items:stretch;flex-shrink:0;width:100%;max-width:min(500px,calc(100vh - 230px));}
.lb-hud-box{background:linear-gradient(145deg,rgba(20,10,0,.92),rgba(10,5,0,.96));
  border:1px solid rgba(245,196,0,.18);border-radius:11px;padding:6px 12px;
  display:flex;flex-direction:column;align-items:center;gap:2px;min-width:64px;
  box-shadow:inset 0 1px 0 rgba(245,196,0,.06),0 2px 8px rgba(0,0,0,.5);}
.lb-hud-lbl{font-size:.52rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(245,196,0,.4);}
.lb-hud-val{font-family:'Special Elite',serif;font-size:1.05rem;font-weight:700;color:#f5c400;text-shadow:0 0 14px rgba(245,196,0,.45);font-variant-numeric:tabular-nums;}
.lb-hud-val.big{font-size:1.3rem;}
.lb-hud-val.green{color:var(--nG);text-shadow:0 0 14px rgba(0,255,136,.45);}

/* Bet controls */
.lb-bet-row{display:grid;grid-template-columns:1fr 1fr;gap:4px;}
.lb-bet-btn{padding:6px 2px;border-radius:7px;border:1px solid rgba(245,196,0,.15);background:rgba(245,196,0,.06);color:rgba(245,196,0,.7);font-family:var(--f);font-size:.62rem;font-weight:700;cursor:pointer;text-align:center;transition:all .12s;}
.lb-bet-btn:hover{background:rgba(245,196,0,.16);border-color:rgba(245,196,0,.38);color:#f5c400;transform:translateY(-1px);}
.lb-bet-btn:disabled{opacity:.25;cursor:not-allowed;}
.lb-bet-input{width:100%;background:rgba(8,4,0,.92);border:1px solid rgba(245,196,0,.22);border-radius:9px;padding:9px 36px 9px 28px;color:#f5c400;font-family:'Special Elite',serif;font-size:.95rem;font-weight:700;outline:none;text-align:center;transition:border-color .15s,box-shadow .15s;}
.lb-bet-input:focus{border-color:rgba(245,196,0,.55);box-shadow:0 0 0 3px rgba(245,196,0,.1);}
.lb-bet-pre{position:absolute;left:9px;top:50%;transform:translateY(-50%);font-size:.7rem;color:rgba(245,196,0,.5);pointer-events:none;}

/* Stats strip */
.lb-stat{display:flex;justify-content:space-between;align-items:center;padding:5px 8px;background:rgba(8,4,20,.7);border-radius:7px;border:1px solid rgba(245,196,0,.08);}
.lb-stat-l{font-size:.6rem;color:rgba(245,196,0,.45);font-weight:600;letter-spacing:.04em;}
.lb-stat-v{font-size:.72rem;font-weight:700;font-variant-numeric:tabular-nums;}
.lb-dog-promo{width:100%;padding:10px 12px;border-radius:10px;border:1px solid rgba(245,196,0,.25);background:linear-gradient(135deg,rgba(60,30,0,.8),rgba(30,15,0,.9));color:var(--tx);cursor:pointer;display:flex;align-items:center;gap:10px;text-align:left;transition:all .15s;}
.lb-dog-promo:hover{border-color:rgba(245,196,0,.55);background:linear-gradient(135deg,rgba(80,40,0,.9),rgba(45,22,0,.95));}
.lb-sec-lbl{font-size:.56rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:rgba(245,196,0,.35);padding:2px 0;}

/* Win display */
.lb-win-banner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);z-index:50;text-align:center;pointer-events:none;transition:transform .3s cubic-bezier(.34,1.4,.64,1);}
.lb-win-banner.show{transform:translate(-50%,-50%) scale(1);}
.sb-win-banner{text-align:center;pointer-events:none;transform:scale(0);transition:transform .3s cubic-bezier(.34,1.4,.64,1);height:0;overflow:visible;}
.sb-win-banner.show{transform:scale(1);}
.lb-win-amt{font-family:'Rye',serif;font-size:2.8rem;color:#fde047;text-shadow:0 0 30px rgba(245,196,0,.8),0 0 60px rgba(245,196,0,.4),0 4px 0 rgba(0,0,0,.9);letter-spacing:.04em;}
.lb-win-sub{font-size:.75rem;color:rgba(245,196,0,.7);font-weight:700;letter-spacing:.1em;margin-top:4px;}

/* Bonus overlay */
.lb-bonus-overlay{position:absolute;inset:0;background:rgba(4,2,16,.92);z-index:40;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;backdrop-filter:blur(8px);}
.lb-bonus-title{font-family:'Rye',serif;font-size:1.8rem;color:#fde047;text-shadow:0 0 30px rgba(245,196,0,.7),0 4px 0 rgba(0,0,0,.9);text-align:center;animation:lbBonusIn .5s cubic-bezier(.34,1.4,.64,1);}
.lb-bonus-sub{font-size:.82rem;color:rgba(245,196,0,.7);font-weight:600;text-align:center;letter-spacing:.04em;}
.lb-fs-counter{display:flex;align-items:center;gap:10px;padding:10px 24px;background:rgba(245,196,0,.08);border:1px solid rgba(245,196,0,.25);border-radius:12px;animation:lbBonusPulse 1.5s ease infinite;}
.lb-fs-num{font-family:'Rye',serif;font-size:2.2rem;color:#fde047;min-width:40px;text-align:center;}
.lb-fs-lbl{font-size:.68rem;color:rgba(245,196,0,.6);font-weight:700;letter-spacing:.1em;text-transform:uppercase;}

/* Paytable panel */
.lb-pay-row{display:flex;justify-content:space-between;align-items:center;padding:3px 6px;border-radius:5px;}
.lb-pay-row:nth-child(odd){background:rgba(245,196,0,.04);}
.lb-pay-sym{font-size:.75rem;}
.lb-pay-sym-wrap{width:22px;height:22px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:4px;background:rgba(10,6,2,.8);border:1px solid rgba(120,80,20,.25);overflow:hidden;}
.lb-pay-name{font-size:.6rem;color:rgba(245,196,0,.55);flex:1;margin-left:5px;}
.lb-pay-val{font-size:.6rem;color:#f5c400;font-weight:700;}

/* Recent wins */
.lb-recents{display:flex;flex-direction:column;gap:3px;}
.lb-rec{display:flex;justify-content:space-between;align-items:center;padding:3px 8px;background:rgba(8,4,20,.6);border-radius:6px;border-left:2px solid rgba(245,196,0,.3);}
.lb-rec.big{border-left-color:var(--nG);}
.lb-rec-type{font-size:.58rem;color:rgba(245,196,0,.5);}
.lb-rec-val{font-size:.65rem;font-weight:700;color:#f5c400;}
.lb-rec.big .lb-rec-val{color:var(--nG);}
`;

export { CSS_LEBANDIT };
