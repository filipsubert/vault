import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "./shared/sfx.js";
import { ICO } from "./shared/icons.jsx";
import { GAME_DEFS } from "./games/Plinko.jsx";
// ── Sub-pages: Promo, VIP, Sports, Support, Casino ───────────────────────────
/* ══════════════════════════════════════ SUB PAGES ════════════════════════════════ */

function SubPageHeader({bc,title,sub}){
  return(
    <div className="sp-header">
      <div className="sp-bc">
        {bc.map((b,i)=>(
          <span key={i} style={{display:"flex",alignItems:"center",gap:7}}>
            {i>0&&<span style={{opacity:.35}}>›</span>}
            {b.onClick
              ? <a onClick={b.onClick}>{b.label}</a>
              : <span style={{color:"var(--tx2)"}}>{b.label}</span>}
          </span>
        ))}
      </div>
      <div className="sp-title">{title}</div>
      {sub&&<div className="sp-sub">{sub}</div>}
    </div>
  );
}

/* ── CASINO PAGE ── */
function CasinoPage({setPage}){
  const [filter,setFilter]=useState("all");
  const FILTERS=[["all","All Games"],["cards","Cards"],["originals","Originals"]];
  const filteredGames=GAME_DEFS.filter(g=>{
    if(filter==="all"||filter==="originals")return true;
    if(filter==="cards")return g.tags.some(tg=>tg.t==="CARDS");
    return false;
  });
  return(
    <div className="subpage">
      <SubPageHeader
        bc={[{label:"Home",onClick:()=>setPage("lobby")},{label:"Casino"}]}
        title="Casino Games"
        sub="Play our collection of original provably fair games. All games run at 95.5% RTP — 4.5% house edge."/>
      <div className="sp-body">
        <div className="casino-filters">
          {FILTERS.map(([id,lbl])=>(
            <button key={id} className={`cf-btn${filter===id?" on":""}`}
              onClick={()=>{sfx.tick();setFilter(id);}}>{lbl}</button>
          ))}
        </div>
        <div className="casino-grid">
          {filteredGames.map(g=>(
            <div key={g.id} className="game-card" onClick={()=>{sfx.nav();setPage(g.id);}}>
              <div style={{position:"absolute",inset:0}}><g.Art/></div>
              <div className="gc-gradient"/>
              <div className="gc-overlay"/>
              <div className="gc-play">
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>
              </div>
              {g.hot&&<div className="gc-hot-badge">🔥 HOT</div>}
              {g.bonusBuy&&<div className="gc-bonus-badge">BONUS BUY {g.bonusBuy}</div>}
              <div className="gc-live-badge">
                <div style={{width:5,height:5,borderRadius:"50%",background:"var(--nG)",animation:"liveDot 1.4s ease-in-out infinite"}}/>
                {g.players} playing
              </div>
              <div className="gc-info">
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{g.tags.map((tg,ti)=>(<div key={ti} className="gc-tag" style={{background:tg.c,color:"#fff"}}>{tg.t}</div>))}</div>
                <div className="gc-name">{g.name}</div>
                <div className="gc-rtp">RTP <span>{g.rtp}%</span> · {g.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lobby-footer"/>
    </div>
  );
}

/* ── SPORTS PAGE ── */
function SportsPage({setPage}){
  const SPORTS=[
    {ico:"⚽",name:"Football",desc:"Premier League, Champions League, LaLiga & more",live:true,events:"142 live events"},
    {ico:"🏀",name:"Basketball",desc:"NBA, EuroLeague, FIBA World Cup",live:true,events:"38 live events"},
    {ico:"🎾",name:"Tennis",desc:"ATP, WTA, Grand Slams",live:false,events:"Upcoming"},
    {ico:"🏒",name:"Hockey",desc:"NHL, KHL, World Championship",live:false,events:"Upcoming"},
    {ico:"🥊",name:"MMA / Boxing",desc:"UFC, Bellator, professional boxing",live:false,events:"Upcoming"},
    {ico:"🏎️",name:"Racing",desc:"F1, MotoGP, NASCAR",live:false,events:"Upcoming"},
    {ico:"🏈",name:"American Football",desc:"NFL, College Football",live:false,events:"Upcoming"},
    {ico:"⚾",name:"Baseball",desc:"MLB, KBO, NPB",live:false,events:"Upcoming"},
  ];
  return(
    <div className="subpage">
      <SubPageHeader
        bc={[{label:"Home",onClick:()=>setPage("lobby")},{label:"Sports"}]}
        title="Sports Betting"
        sub="Live odds on all major sports. Instant crypto payouts on every win."/>
      <div className="sp-body">
        <div className="sports-grid">
          {SPORTS.map((s,i)=>(
            <div key={i} className="sport-card" onClick={()=>sfx.click()}>
              <div className="sc-ico">{s.ico}</div>
              <div>
                <div className="sc-name">{s.name}</div>
                <div className="sc-desc">{s.desc}</div>
              </div>
              {s.live
                ? <div className="sc-live"><div style={{width:5,height:5,borderRadius:"50%",background:"var(--nG)",animation:"liveDot 1.4s infinite"}}/>  {s.events}</div>
                : <div style={{fontSize:".62rem",color:"var(--tx3)",fontWeight:600}}>{s.events}</div>}
            </div>
          ))}
        </div>
        <div style={{marginTop:24,padding:"20px",background:"linear-gradient(145deg,var(--s2),var(--s1))",border:"1px solid var(--bd)",borderRadius:14,textAlign:"center"}}>
          <div style={{fontSize:"1.5rem",marginBottom:8}}>📡</div>
          <div style={{fontFamily:"var(--fh)",fontWeight:700,color:"var(--tx)",marginBottom:6}}>Full Sports Platform Coming Soon</div>
          <div style={{fontSize:".76rem",color:"var(--tx3)"}}>We're building a world-class sports betting experience. Live now: Football & Basketball.</div>
        </div>
      </div>
      <div className="lobby-footer"/>
    </div>
  );
}

/* ── PROMOTIONS PAGE ── */
function PromoPage({setPage}){
  const PROMOS=[
    {stripe:"var(--pu)",eye:"🎁 WELCOME BONUS",title:"100% First Deposit Match",desc:"Deposit any amount and we'll match it 100% up to $1,000. No wagering requirement on first $50 withdrawal. Crypto deposits get an extra 10% boost.",btn:"Claim Now",btnStyle:{background:"linear-gradient(135deg,var(--pu),var(--puLL))",color:"#fff"}},
    {stripe:"var(--go)",eye:"🔄 WEEKLY RELOAD",title:"Every Monday: +50% Reload",desc:"Every Monday deposit $50+ and receive a 50% bonus up to $500. Keep playing, keep earning. Applies to crypto and fiat.",btn:"Learn More",btnStyle:{background:"linear-gradient(135deg,var(--go),#ff8c00)",color:"#1a0a00"}},
    {stripe:"var(--nG)",eye:"👥 REFER A FRIEND",title:"Lifetime USDC Commissions",desc:"Refer a friend and earn 25% of the house edge on every bet they place — for life. No cap on earnings. Withdraw any time.",btn:"Get Link",btnStyle:{background:"linear-gradient(135deg,#059669,var(--nG))",color:"#001a0a"}},
    {stripe:"var(--nC)",eye:"🏆 VIP RAKEBACK",title:"Up to 20% Weekly Rakeback",desc:"VIP members receive weekly rakeback based on total wager volume. Bronze starts at 5%, Diamond members earn 20% every week.",btn:"View VIP",btnStyle:{background:"linear-gradient(135deg,#0ea5e9,var(--nC))",color:"#001830"},onClick:()=>setPage("vip")},
    {stripe:"var(--nP)",eye:"🎰 FREE BETS",title:"Daily Free Bet Challenge",desc:"Complete today's challenge — place 10 bets on any game — and unlock a free $5 bet. New challenge every 24 hours.",btn:"See Challenge",btnStyle:{background:"linear-gradient(135deg,#c026d3,var(--nP))",color:"#fff"}},
  ];
  return(
    <div className="subpage">
      <SubPageHeader
        bc={[{label:"Home",onClick:()=>setPage("lobby")},{label:"Promotions"}]}
        title="Promotions"
        sub="Exclusive bonuses, reload offers and lifetime rewards for every player."/>
      <div className="sp-body">
        <div className="promo-grid">
          {PROMOS.map((p,i)=>(
            <div key={i} className="promo-card" onClick={()=>{sfx.click();p.onClick&&p.onClick();}}>
              <div className="promo-card-stripe" style={{background:p.stripe}}/>
              <div className="promo-card-body">
                <div className="pc-eyebrow" style={{color:p.stripe}}>{p.eye}</div>
                <div className="pc-title">{p.title}</div>
                <div className="pc-desc">{p.desc}</div>
                <button className="pc-btn" style={{...p.btnStyle,boxShadow:"0 4px 16px rgba(0,0,0,.3)"}}
                  onClick={e=>{e.stopPropagation();sfx.click();p.onClick&&p.onClick();}}>
                  {p.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lobby-footer"/>
    </div>
  );
}

/* ── VIP PAGE ── */
function VipPage({setPage}){
  const TIERS=[
    {name:"🥉 Bronze",col:"#cd7f32",req:"$1,000 wagered",perks:["5% weekly rakeback","Priority support","Exclusive bronze badge"],active:true},
    {name:"🥈 Silver",col:"#c0c0c0",req:"$10,000 wagered",perks:["8% weekly rakeback","Personal account manager","Higher withdrawal limits"]},
    {name:"🥇 Gold",col:"#f5c400",req:"$50,000 wagered",perks:["12% weekly rakeback","Dedicated VIP host","Custom deposit limits"]},
    {name:"💎 Diamond",col:"var(--nC)",req:"$250,000 wagered",perks:["20% weekly rakeback","Direct CEO line","Luxury gifts & events"]},
  ];
  return(
    <div className="subpage">
      <SubPageHeader
        bc={[{label:"Home",onClick:()=>setPage("lobby")},{label:"VIP Club"}]}
        title="VIP Club"
        sub="Earn points, unlock tiers, and enjoy exclusive benefits as you play."/>
      <div className="sp-body">
        {/* Progress */}
        <div style={{padding:"18px 20px",background:"linear-gradient(145deg,var(--s2),var(--s1))",border:"1px solid var(--bd3)",borderRadius:14,marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:".72rem",color:"var(--tx3)",marginBottom:8}}>
            <span>Your Progress</span><span style={{color:"var(--puLL)",fontWeight:700}}>Bronze → Silver</span>
          </div>
          <div style={{height:8,borderRadius:4,background:"var(--s4)",marginBottom:8,overflow:"hidden"}}>
            <div style={{width:"23%",height:"100%",borderRadius:4,background:"linear-gradient(90deg,#cd7f32,var(--puLL))",transition:"width .5s"}}/>
          </div>
          <div style={{fontSize:".68rem",color:"var(--tx3)"}}>$2,300 / $10,000 wagered to reach Silver</div>
        </div>
        <div className="vip-tiers">
          {TIERS.map((t,i)=>(
            <div key={i} className={`vip-tier${t.active?" active":""}`}>
              {t.active&&<div style={{position:"absolute",top:12,right:12,fontSize:".58rem",fontWeight:800,padding:"3px 8px",borderRadius:10,background:"rgba(245,196,0,.15)",color:"var(--go)",border:"1px solid rgba(245,196,0,.25)"}}>CURRENT</div>}
              <div className="vt-name" style={{color:t.col}}>{t.name}</div>
              <div className="vt-req">{t.req}</div>
              <div className="vt-perks">
                {t.perks.map((p,j)=>(
                  <div key={j} className="vt-perk"><span style={{color:t.col}}>✓</span>{p}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{padding:"18px 20px",background:"linear-gradient(145deg,#1a1200,#2a1e00)",border:"1px solid rgba(245,196,0,.18)",borderRadius:14,textAlign:"center"}}>
          <div style={{fontSize:"1.4rem",marginBottom:8}}>👑</div>
          <div style={{fontFamily:"var(--fh)",fontWeight:700,color:"var(--go)",marginBottom:6}}>Private Diamond Table</div>
          <div style={{fontSize:".76rem",color:"rgba(245,196,0,.6)"}}>Reach Diamond tier to unlock exclusive high-stakes tables with no limits.</div>
        </div>
      </div>
      <div className="lobby-footer"/>
    </div>
  );
}

/* ── SUPPORT PAGE ── */
function SupportPage({setPage}){
  const CARDS=[
    {ico:"💬",title:"Live Chat",desc:"Talk to a real agent 24/7. Average response time under 1 minute."},
    {ico:"📧",title:"Email Support",desc:"Send us a detailed message. We reply within 2 hours on business days."},
    {ico:"📚",title:"Help Center",desc:"Browse our knowledge base with 200+ articles covering all topics."},
    {ico:"📣",title:"Community",desc:"Join our Discord server with 50,000+ members. Community-driven support."},
    {ico:"🐛",title:"Report a Bug",desc:"Found an issue? Submit a bug report and earn bonus credits as a reward."},
    {ico:"🔒",title:"Responsible Gaming",desc:"Set deposit limits, cooling-off periods, or self-exclude at any time."},
  ];
  return(
    <div className="subpage">
      <SubPageHeader
        bc={[{label:"Home",onClick:()=>setPage("lobby")},{label:"Support"}]}
        title="Support Center"
        sub="We're here to help 24 hours a day, 7 days a week."/>
      <div className="sp-body">
        <div className="support-grid">
          {CARDS.map((c,i)=>(
            <div key={i} className="support-card" onClick={()=>sfx.click()}>
              <div className="sc2-ico">{c.ico}</div>
              <div className="sc2-title">{c.title}</div>
              <div className="sc2-desc">{c.desc}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:20,padding:"20px",background:"linear-gradient(145deg,var(--s2),var(--s1))",border:"1px solid rgba(0,255,136,.15)",borderRadius:14,display:"flex",alignItems:"center",gap:16}}>
          <div style={{fontSize:"2rem"}}>🟢</div>
          <div>
            <div style={{fontFamily:"var(--fh)",fontWeight:700,color:"var(--nG)",marginBottom:4}}>All Systems Operational</div>
            <div style={{fontSize:".72rem",color:"var(--tx3)"}}>99.98% uptime this month · Last incident: 47 days ago</div>
          </div>
        </div>
      </div>
      <div className="lobby-footer"/>
    </div>
  );
}

function DepositModal({balance,setBalance,onClose}){
  const [amt,setAmt]=useState(500);
  return(
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h2>Wallet <button className="mx" onClick={onClose}>✕</button></h2>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 13px",background:"var(--bg)",border:"1px solid var(--bd)",borderRadius:9,marginBottom:14}}>
          <span style={{fontSize:".76rem",color:"var(--tx2)"}}>Balance</span>
          <span style={{fontWeight:800,color:"var(--go)",fontVariantNumeric:"tabular-nums"}}>◈ ${balance.toFixed(2)}</span>
        </div>
        <div className="m-opts">
          {[100,500,1000,5000,10000,50000].map(v=>(
            <div key={v} className="m-opt" onClick={()=>setAmt(v)}>${v>=1000?`${v/1000}k`:v}</div>
          ))}
        </div>
        <div className="m-ci"><span>$</span><input type="number" value={amt} onChange={e=>setAmt(Math.max(1,+e.target.value))} min={1}/></div>
        <button className="m-add" onClick={()=>{sfx.cash();setBalance(b=>+(b+amt).toFixed(2));onClose();}}>+ Add ${amt.toLocaleString()}</button>
      </div>
    </div>
  );
}


export { CasinoPage, SportsPage, PromoPage, VipPage, SupportPage, DepositModal };

