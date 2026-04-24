// ── Sound engine ──────────────────────────────────────────────────────────────
/* ══════════════════════════════════════ SOUND ═══════════════════════════════════════ */
class SFX {
  constructor() { this._c = null; }
  get ctx() {
    if (!this._c) this._c = new (window.AudioContext || window.webkitAudioContext)();
    if (this._c.state === "suspended") this._c.resume();
    return this._c;
  }
  _o(f,tp,d,v,dl=0){try{const c=this.ctx,t=c.currentTime+dl,o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type=tp;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.001,t+d);o.start(t);o.stop(t+d+.05);}catch{}}
  _n(d,v,lo=150,hi=900){try{const c=this.ctx,n=c.sampleRate*d,b=c.createBuffer(1,n,c.sampleRate),dt=b.getChannelData(0);for(let i=0;i<n;i++)dt[i]=(Math.random()*2-1)*Math.pow(1-i/n,1.5);const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type="bandpass";f.frequency.setValueAtTime(hi,c.currentTime);f.frequency.exponentialRampToValueAtTime(lo,c.currentTime+d);const g=c.createGain();g.gain.setValueAtTime(v,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+d);s.connect(f);f.connect(g);g.connect(c.destination);s.start();s.stop(c.currentTime+d);}catch{}}
  flip(){this._o(900,"sine",.055,.08);this._o(650,"sine",.08,.06,.028);this._o(400,"sine",.1,.04,.058);}
  win(s=1){const b=420+Math.min(s*65,380);[b,b*1.26,b*1.58,b*2].forEach((f,i)=>this._o(f,"sine",.3,.13,i*.042));}
  lose(){this._n(.65,1.6,55,800);this._o(48,"sawtooth",.48,.65);this._o(32,"sine",.42,.42,.07);}
  cash(){[392,523,659,784,1047,1319,1568].forEach((f,i)=>this._o(f,"sine",.42,.15,i*.056));}
  gem(s=1){const b=420+Math.min(s*52,340);[b,b*1.26,b*1.5,b*2].forEach((f,i)=>this._o(f,"sine",.28,.12,i*.038));}
  boom(){this._n(.72,1.8,55,1100);this._o(44,"sawtooth",.52,.7);this._o(30,"sine",.46,.44,.08);}
  click(){this._o(680,"triangle",.07,.1);}
  nav(){this._o(660,"sine",.08,.07);}
  tick(){this._o(480,"sine",.05,.08);}
  hover(){this._o(520,"sine",.04,.04);}
  start(){[220,330,440,660].forEach((f,i)=>this._o(f,"triangle",.22,.08,i*.05));}
  diceRoll(){this._o(420+Math.random()*360,"square",.033,.075);}
  diceLand(won){if(won){this._o(260,"sine",.2,.55);this._o(390,"sine",.25,.4,.07);this._o(520,"sine",.22,.3,.14);}else{this._n(.1,.95,90,420);this._o(110,"sawtooth",.2,.42);}}
  deal(){this._o(340,"sine",.09,.12);this._o(500,"sine",.07,.08,.04);}
  pick(){this._o(520,"sine",.06,.09);this._o(780,"sine",.05,.05,.03);}
  unpick(){this._o(340,"sine",.07,.08);}
  ballDrop(isHit){if(isHit){this._o(500+Math.random()*120,"sine",.12,.14);this._o(720,"sine",.1,.08,.04);}else{this._o(260+Math.random()*80,"triangle",.09,.07);}}
  bjWin(){[523,659,784,1047,1319].forEach((f,i)=>this._o(f,"sine",.35,.14,i*.055));}
  bjBust(){this._n(.4,1.2,60,600);this._o(55,"sawtooth",.35,.5);this._o(38,"sine",.3,.35,.06);}
  bjBlackjack(){[523,659,784,1047,1319,1568,2093].forEach((f,i)=>this._o(f,"sine",.4,.15,i*.048));}
  bjPush(){this._o(440,"sine",.25,.12);this._o(440,"sine",.2,.08,.1);}
  crashTick(){this._o(440+Math.random()*120,"sine",.04,.05);}
  crashBoom(){this._n(.85,2.2,40,1000);this._o(36,"sawtooth",.65,.85);this._o(24,"sine",.55,.55,.1);}
  wheelSpin(){this._o(280+Math.random()*180,"triangle",.03,.05);}
  wheelLand(mult){if(mult>1.5){[523,659,784,1047].forEach((f,i)=>this._o(f,"sine",.32,.13,i*.04));}else if(mult>0){this._o(440,"sine",.18,.1);}else{this._n(.32,.9,55,550);this._o(100,"sawtooth",.22,.42);}}
  // ── TUMBLE — cascade/gravity drop sound (plays each time symbols fall after a win) ──
  tumble(){
    try{
      const c=this.ctx,t=c.currentTime;
      // Whoosh noise — filtered, high-to-low sweep
      const n=c.sampleRate*.22,buf=c.createBuffer(1,n,c.sampleRate),dt=buf.getChannelData(0);
      for(let i=0;i<n;i++)dt[i]=(Math.random()*2-1)*Math.pow(1-i/n,0.7);
      const src=c.createBufferSource();src.buffer=buf;
      const flt=c.createBiquadFilter();flt.type="bandpass";
      flt.frequency.setValueAtTime(2200,t);flt.frequency.exponentialRampToValueAtTime(280,t+.2);
      flt.Q.value=0.9;
      const gg=c.createGain();gg.gain.setValueAtTime(.5,t);gg.gain.exponentialRampToValueAtTime(.001,t+.22);
      src.connect(flt);flt.connect(gg);gg.connect(c.destination);src.start(t);src.stop(t+.26);
      // Crystalline impact at the bottom
      this._o(720,"sine",.09,.07,.16);
      this._o(1080,"sine",.07,.04,.19);
    }catch{}
  }

  // ── SCATTER PING — each scatter landing has a rising mystical chime ──
  // Authentic GOO feel: divine, temple-bell, rising portamento
  scatterPing(idx=0){
    try{
      const c=this.ctx,t=c.currentTime+idx*.14;
      // Each successive scatter lands on a higher note
      const baseFreqs=[622,784,932,1109,1397];
      const f=baseFreqs[idx%baseFreqs.length];
      // Main rising chime
      const o=c.createOscillator(),g=c.createGain();
      o.type="sine";
      o.frequency.setValueAtTime(f*.58,t);
      o.frequency.exponentialRampToValueAtTime(f,t+.11);
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.26,t+.016);g.gain.exponentialRampToValueAtTime(.001,t+.62);
      o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.66);
      // Octave shimmer layer
      const o2=c.createOscillator(),g2=c.createGain();
      o2.type="sine";o2.frequency.value=f*2;
      g2.gain.setValueAtTime(0,t+.08);g2.gain.linearRampToValueAtTime(.1,t+.1);g2.gain.exponentialRampToValueAtTime(.001,t+.38);
      o2.connect(g2);g2.connect(c.destination);o2.start(t+.08);o2.stop(t+.42);
      // High sparkle ping
      const o3=c.createOscillator(),g3=c.createGain();
      o3.type="sine";o3.frequency.value=f*3.2;
      g3.gain.setValueAtTime(0,t+.06);g3.gain.linearRampToValueAtTime(.065,t+.075);g3.gain.exponentialRampToValueAtTime(.001,t+.24);
      o3.connect(g3);g3.connect(c.destination);o3.start(t+.06);o3.stop(t+.27);
      // Soft noise shimmer (bell body)
      const nb=c.sampleRate*.12,nbuf=c.createBuffer(1,nb,c.sampleRate),ndt=nbuf.getChannelData(0);
      for(let i=0;i<nb;i++)ndt[i]=(Math.random()*2-1)*Math.pow(1-i/nb,2);
      const ns=c.createBufferSource();ns.buffer=nbuf;
      const nf=c.createBiquadFilter();nf.type="bandpass";nf.frequency.value=f*1.5;nf.Q.value=6;
      const ng2=c.createGain();ng2.gain.setValueAtTime(.12,t);ng2.gain.exponentialRampToValueAtTime(.001,t+.12);
      ns.connect(nf);nf.connect(ng2);ng2.connect(c.destination);ns.start(t);ns.stop(t+.15);
    }catch{}
  }

  // ── BONUS LAND — epic GOO-style divine trigger fanfare ──
  // Thunder crack → ascending Zeus melody → choir swell → shimmer sparkle tail
  bonusLand(){
    try{
      const c=this.ctx,t=c.currentTime;

      // 1. THUNDERCLAP — Zeus strikes
      this._n(.7,2.8,28,900);
      const sub=c.createOscillator(),subG=c.createGain();
      sub.type="sine";sub.frequency.setValueAtTime(65,t);sub.frequency.exponentialRampToValueAtTime(22,t+.8);
      subG.gain.setValueAtTime(0,t);subG.gain.linearRampToValueAtTime(.9,t+.028);subG.gain.exponentialRampToValueAtTime(.001,t+.85);
      sub.connect(subG);subG.connect(c.destination);sub.start(t);sub.stop(t+.9);
      // Lightning sawtooth crack
      const lc=c.createOscillator(),lcG=c.createGain();
      lc.type="sawtooth";lc.frequency.setValueAtTime(200,t+.04);lc.frequency.exponentialRampToValueAtTime(42,t+.35);
      lcG.gain.setValueAtTime(0,t+.04);lcG.gain.linearRampToValueAtTime(.6,t+.058);lcG.gain.exponentialRampToValueAtTime(.001,t+.42);
      lc.connect(lcG);lcG.connect(c.destination);lc.start(t+.04);lc.stop(t+.45);

      // 2. ASCENDING DIVINE MELODY — like hearing the gates of Olympus open
      [[.22,.28,220],[.32,.34,277],[.43,.32,330],[.53,.4,415],[.63,.44,523],[.73,.42,659],[.84,.46,830],[.95,.44,1047],[1.06,.42,1319],[1.17,.4,1568],[1.28,.36,2093]].forEach(([dl,v,f])=>{
        const o=c.createOscillator(),g=c.createGain();
        o.type="sine";o.frequency.value=f;
        g.gain.setValueAtTime(0,t+dl);g.gain.linearRampToValueAtTime(v*.52,t+dl+.024);g.gain.exponentialRampToValueAtTime(.001,t+dl+.75);
        o.connect(g);g.connect(c.destination);o.start(t+dl);o.stop(t+dl+.8);
      });

      // 3. CHOIR SWELL — divine harmonic voices (slightly detuned for richness)
      [[440,0],[554,4],[659,-4],[880,7],[1047,-3]].forEach(([f,dt2],i)=>{
        [-5,0,5].forEach(det=>{
          const o=c.createOscillator(),g=c.createGain();
          o.type="sine";o.frequency.value=f;o.detune.value=det+dt2;
          const dl=.52+i*.065;
          g.gain.setValueAtTime(0,t+dl);g.gain.linearRampToValueAtTime(.11,t+dl+.14);g.gain.linearRampToValueAtTime(.13,t+dl+.45);g.gain.exponentialRampToValueAtTime(.001,t+dl+1.4);
          o.connect(g);g.connect(c.destination);o.start(t+dl);o.stop(t+dl+1.45);
        });
      });

      // 4. SHIMMER SPARKLE TAIL — crystalline high register
      [0,.065,.13,.2,.27,.35].forEach((dl,i)=>{
        const o=c.createOscillator(),g=c.createGain();
        o.type="sine";o.frequency.value=2100+i*380;
        g.gain.setValueAtTime(0,t+1.2+dl);g.gain.linearRampToValueAtTime(.072,t+1.2+dl+.018);g.gain.exponentialRampToValueAtTime(.001,t+1.2+dl+.42);
        o.connect(g);g.connect(c.destination);o.start(t+1.2+dl);o.stop(t+1.2+dl+.46);
      });

      // 5. FINAL RESOLUTION CHORD — major triad landing
      [[1.55,.32,523],[1.55,.28,659],[1.55,.36,784],[1.55,.22,1047]].forEach(([dl,v,f])=>{
        const o=c.createOscillator(),g=c.createGain();
        o.type="sine";o.frequency.value=f;
        g.gain.setValueAtTime(0,t+dl);g.gain.linearRampToValueAtTime(v,t+dl+.035);g.gain.exponentialRampToValueAtTime(.001,t+dl+1.0);
        o.connect(g);g.connect(c.destination);o.start(t+dl);o.stop(t+dl+1.05);
      });
    }catch{}
  }
}
const sfx = new SFX();


export { sfx };
