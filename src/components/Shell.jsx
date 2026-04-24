import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ICO } from "../shared/icons.jsx";
import { sfx } from "../shared/sfx.js";
import { AMB_CSS, AMB_PTS, LIVE_FEED } from "../shared/data.js";
// ── Layout shell: Ambient, Sidebar, TopBar, Ticker ──────────────────────────
/* ══════════════════════════════════════ AMBIENT ═══════════════════════════════════════ */
function Ambient() {
  return (
    <div className="amb">
      <style>{AMB_CSS}</style>
      <div className="amb-orb" style={{width:520,height:520,background:"rgba(124,58,237,.08)",left:"-10%",top:"-12%"}}/>
      <div className="amb-orb" style={{width:380,height:380,background:"rgba(0,212,255,.05)",right:"4%",bottom:"18%"}}/>
      <div className="amb-orb" style={{width:280,height:280,background:"rgba(236,72,153,.04)",left:"38%",top:"28%"}}/>
      {AMB_PTS.map(p=>(
        <div key={p.id} style={{position:"absolute",borderRadius:"50%",left:p.l+"%",top:p.t+"%",width:+p.w,height:+p.w,background:p.bg,opacity:+p.op,animation:`pf${p.id} ${p.dur}s ease-in-out ${p.del}s infinite`}}/>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════ SHELL COMPONENTS ════════════════════════════ */
const NAV=[
  {id:"lobby",  label:"Casino",    ico:ICO.casino, sec:"CASINO"},
  {id:"casino", label:"All Games", ico:ICO.star},
  {id:"live",   label:"Live Casino",ico:ICO.live},
  {id:"sports", label:"Sports",    ico:ICO.sports, sec:"SPORTS", badge:"LIVE"},
  {id:"promo",  label:"Promotions",ico:ICO.promo,  sec:"MORE"},
  {id:"vip",    label:"VIP Club",  ico:ICO.vip},
  {id:"support",label:"Support",   ico:ICO.support},
];

function Sidebar({slim,setSlim,setPage,page}){
  const GAME_PAGES=["hilo","mines","dice","blackjack","crash","wheel","videopoker","keno","coinflip","gatesolympus","lebandit","doghouse","sweetbonanza","cloudprincess"];
  const activePage=GAME_PAGES.includes(page)?"casino":page;
  return(
    <div className={`sb${slim?" slim":""}`}>
      <div className="sb-logo" onClick={()=>{sfx.nav();setPage("lobby");}}>
        <div className="sb-mark">V</div><span className="sb-name">Vault</span>
      </div>
      <div className="sb-scroll">
        {NAV.map(item=>(
          <div key={item.id}>
            {item.sec&&<div className="sb-lbl">{item.sec}</div>}
            <div className={`sbi${activePage===item.id?" on":""}`}
              onClick={()=>{sfx.nav();setPage(item.id==="live"?"casino":item.id);}}>
              <span className="ico">{item.ico}</span>
              <span className="stxt">{item.label}</span>
              {item.badge&&<span className="sbdg">{item.badge}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopBar({balance,slim,setSlim,onDeposit}){
  const online=useMemo(()=>(Math.floor(Math.random()*3000)+8000).toLocaleString(),[]);
  return(
    <div className="tb">
      <button className="tb-tog" onClick={()=>{sfx.tick();setSlim(s=>!s);}}>{ICO.menu}</button>
      <div className="tb-srch">{ICO.search}<input placeholder="Search games..."/></div>
      <div className="sp"/>
      <div className="tb-live"><div className="ld"/><span className="cnt">{online}</span>&nbsp;online</div>
      <div className="tb-bal" onClick={onDeposit}><span className="coin">◈</span><span className="amt">${balance.toFixed(2)}</span></div>
      <button className="tb-dep" onClick={onDeposit}>{ICO.wallet}&nbsp;Wallet</button>
      <div className="tb-av">VG</div>
    </div>
  );
}

function Ticker(){
  const d=[...LIVE_FEED,...LIVE_FEED];
  return(
    <div className="ticker">
      <div className="t-lbl">🏆 LIVE WINS</div>
      <div className="t-sc">
        <div className="t-row">
          {d.map(([g,u,a,m],i)=>(
            <div key={i} className="t-item">
              <span className="ti-g">{g}</span><span className="ti-d"/><span className="ti-u">{u}</span>
              <span className="ti-d"/><span className="ti-a">{a}</span><span className="ti-m">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export { Ambient, Sidebar, TopBar, Ticker };

