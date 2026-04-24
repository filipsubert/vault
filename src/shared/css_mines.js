const CSS_MINES=`
.gshell{width:100%;border-radius:18px;padding:16px;position:relative;box-shadow:0 12px 48px rgba(0,0,0,.65),inset 0 1px 0 rgba(255,255,255,.04);background:linear-gradient(145deg,#0c0920,#100e2a,#0e0c24);border:1px solid rgba(167,139,250,.2);overflow:hidden;}
.gshell::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(124,58,237,.1),transparent 60%);pointer-events:none;}
.gshell::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(192,132,252,.3),transparent);pointer-events:none;}
@keyframes gShake{0%,100%{transform:translateX(0)}18%{transform:translateX(-9px) rotate(-.5deg)}36%{transform:translateX(9px) rotate(.5deg)}55%{transform:translateX(-6px)}72%{transform:translateX(6px)}88%{transform:translateX(-3px)}}
.mgrid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;position:relative;z-index:1;}
.mgrid.sh{animation:gShake .48s ease;}
@keyframes gemRev{0%{transform:rotateY(-90deg) scale(.4);opacity:0}55%{transform:rotateY(12deg) scale(1.08)}78%{transform:rotateY(-5deg)}100%{transform:rotateY(0) scale(1);opacity:1}}
@keyframes bombRev{0%{transform:scale(.12);opacity:0}35%{transform:scale(1.6)}58%{transform:scale(.84)}78%{transform:scale(1.12)}100%{transform:scale(1);opacity:1}}
@keyframes hintApp{from{opacity:0;transform:scale(.3)}to{opacity:.45;transform:scale(1)}}
@keyframes bombPopCo{0%{transform:scale(0) rotate(-20deg);opacity:0}30%{transform:scale(1.45) rotate(6deg);opacity:1}55%{transform:scale(.88) rotate(-3deg)}75%{transform:scale(1.1) rotate(1deg)}100%{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes bombGlowCo{0%,100%{box-shadow:0 0 0px rgba(0,255,136,0)}50%{box-shadow:0 0 16px rgba(0,255,136,.18),0 0 32px rgba(0,255,136,.06)}}

/* Mine tile — premium surface */
.tile{width:72px;height:72px;border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;transition:transform .15s cubic-bezier(.34,1.2,.64,1),box-shadow .15s,border-color .15s;user-select:none;border:1px solid rgba(167,139,250,.12);}
.tile.idle{background:linear-gradient(145deg,#1a1640,#201c4a,#1e1a46);}
.tile.idle::before{content:'';position:absolute;inset:0;background:linear-gradient(145deg,rgba(255,255,255,.08) 0,transparent 50%);pointer-events:none;border-radius:11px;}
.tile.idle::after{content:'';position:absolute;bottom:0;left:0;right:0;height:35%;background:linear-gradient(to top,rgba(0,0,0,.3),transparent);pointer-events:none;border-radius:0 0 11px 11px;}
.tile.idle:hover{background:linear-gradient(145deg,#26205a,#2c2668);border-color:rgba(167,139,250,.4);transform:scale(1.1) translateY(-4px);box-shadow:0 10px 28px rgba(0,0,0,.65),0 0 0 1px rgba(139,92,246,.28),0 0 22px rgba(124,58,237,.15);}
.tile.idle:active{transform:scale(.86);}
.tile.safe{background:linear-gradient(145deg,#031510,#05281a,#062014);border-color:rgba(0,255,136,.45);box-shadow:0 0 20px rgba(0,255,136,.25),0 0 40px rgba(0,255,136,.08),inset 0 0 24px rgba(0,255,136,.08);animation:gemRev .38s cubic-bezier(.34,1.2,.64,1);cursor:default;}
.tile.safe::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,255,136,.1) 0,transparent 55%);pointer-events:none;}
.tile.mine{background:linear-gradient(145deg,#1e0204,#380608,#2e0506);border-color:rgba(239,68,68,.55);box-shadow:0 0 24px rgba(239,68,68,.45),0 0 48px rgba(239,68,68,.12),inset 0 0 28px rgba(239,68,68,.1);animation:bombRev .46s ease;cursor:default;}
.tile.hint{background:linear-gradient(145deg,#130204,#220507);border-color:rgba(239,68,68,.14);opacity:.45;cursor:default;animation:hintApp .3s ease backwards;}
.tile.hint-co{background:linear-gradient(145deg,#031510,#062818);border-color:rgba(0,255,136,.22);opacity:.78;cursor:default;animation:bombPopCo .5s cubic-bezier(.34,1.4,.64,1) backwards,bombGlowCo 2s ease 0.5s infinite;}
.tile.dis{cursor:default;pointer-events:none;}
.gico{filter:drop-shadow(0 0 10px rgba(0,255,136,.7)) drop-shadow(0 0 20px rgba(0,255,136,.3));}
.bico{filter:drop-shadow(0 0 10px rgba(239,68,68,.7)) drop-shadow(0 0 20px rgba(239,68,68,.25));}
/* Idle dot */
.idle-dot{width:12px;height:12px;border-radius:50%;border:1.5px solid rgba(167,139,250,.2);background:radial-gradient(circle at 35% 35%,rgba(167,139,250,.12),rgba(0,0,0,.2));}
/* Grid overlay */
`;

export { CSS_MINES };
