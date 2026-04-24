import React, { useState, Suspense, lazy } from "react";
import { sfx } from "./shared/sfx.js";
import { CSS } from "./shared/css.js";
import { Ambient, Sidebar, TopBar, Ticker } from "./components/Shell.jsx";
import { Lobby } from "./games/Plinko.jsx";
import { CasinoPage, SportsPage, PromoPage, VipPage, SupportPage, DepositModal } from "./SubPages.jsx";

// ── Lazy-loaded games (each gets its own chunk, loaded on demand) ─────────────
const HiLoGame = lazy(() => import("./games/HiLo.jsx").then(m => ({ default: m.HiLoGame })));
const MinesGame = lazy(() => import("./games/Mines.jsx").then(m => ({ default: m.MinesGame })));
const DiceGame = lazy(() => import("./games/Dice.jsx").then(m => ({ default: m.DiceGame })));
const BlackjackGame = lazy(() => import("./games/Blackjack.jsx").then(m => ({ default: m.BlackjackGame })));
const CrashGame = lazy(() => import("./games/Crash.jsx").then(m => ({ default: m.CrashGame })));
const WheelGame = lazy(() => import("./games/Wheel.jsx").then(m => ({ default: m.WheelGame })));
const VideoPokerGame = lazy(() => import("./games/VideoPoker.jsx").then(m => ({ default: m.VideoPokerGame })));
const KenGame = lazy(() => import("./games/Keno.jsx").then(m => ({ default: m.KenGame })));
const CoinflipGame = lazy(() => import("./games/Coinflip.jsx").then(m => ({ default: m.CoinflipGame })));
const LeBanditGame = lazy(() => import("./games/LeBandit.jsx").then(m => ({ default: m.LeBanditGame })));
const DogHouseGame = lazy(() => import("./games/DogHouse.jsx").then(m => ({ default: m.DogHouseGame })));
const GatesOfOlympusGame = lazy(() => import("./games/GatesOfOlympus.jsx").then(m => ({ default: m.GatesOfOlympusGame })));
const SweetBonanzaGame = lazy(() => import("./games/SweetBonanza.jsx").then(m => ({ default: m.SweetBonanzaGame })));
const PlinkoGame = lazy(() => import("./games/Plinko.jsx").then(m => ({ default: m.PlinkoGame })));
const CloudPrincessGame = lazy(() => import("./games/CloudPrincess.jsx").then(m => ({ default: m.CloudPrincessGame })));

// ── Loading spinner (casino-themed) ──────────────────────────────────────────
function GameLoader(){
  return(
    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:"transparent"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
        <div style={{
          width:44,height:44,borderRadius:"50%",
          border:"3px solid rgba(167,139,250,.15)",
          borderTopColor:"#a78bfa",
          animation:"sbSpin360 .7s linear infinite"
        }}/>
        <span style={{color:"rgba(167,139,250,.6)",fontSize:".78rem",fontWeight:600,letterSpacing:".06em"}}>Loading game…</span>
      </div>
    </div>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────
export default function App(){
  const [balance,setBalance]=useState(1000.00);
  const [slim,setSlim]=useState(false);
  const [dep,setDep]=useState(false);
  const [page,setPage]=useState("lobby");

  const nav=(p)=>{sfx.nav();setPage(p);};

  const GAME_PAGES=["hilo","mines","dice","blackjack","crash","wheel","videopoker","keno","coinflip","gatesolympus","lebandit","doghouse","sweetbonanza","plinko","cloudprincess"];
  const isGame=GAME_PAGES.includes(page);

  return(
    <div className="app">
      <style>{CSS}</style>
      <Ambient/>
      <Sidebar slim={slim} setSlim={setSlim} setPage={nav} page={page}/>
      <div className="main">
        <TopBar balance={balance} slim={slim} setSlim={setSlim} onDeposit={()=>{sfx.click();setDep(true);}}/>
        {!isGame&&(
          <div className="pg">
            {page==="lobby"   && <Lobby setPage={setPage}/>}
            {page==="casino"  && <CasinoPage setPage={setPage}/>}
            {page==="sports"  && <SportsPage setPage={setPage}/>}
            {page==="promo"   && <PromoPage setPage={setPage}/>}
            {page==="vip"     && <VipPage setPage={setPage}/>}
            {page==="support" && <SupportPage setPage={setPage}/>}
          </div>
        )}
        <Suspense fallback={<GameLoader/>}>
          {page==="hilo"      && <HiLoGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="mines"     && <MinesGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="dice"      && <DiceGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="blackjack" && <BlackjackGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="crash"     && <CrashGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="wheel"     && <WheelGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="videopoker" && <VideoPokerGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="keno"       && <KenGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="coinflip"   && <CoinflipGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="lebandit"   && <LeBanditGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="doghouse"   && <DogHouseGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="gatesolympus" && <GatesOfOlympusGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="sweetbonanza" && <SweetBonanzaGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="plinko"       && <PlinkoGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
          {page==="cloudprincess" && <CloudPrincessGame balance={balance} setBalance={setBalance} setPage={setPage}/>}
        </Suspense>
        {isGame && <Ticker/>}
      </div>
      {dep&&<DepositModal balance={balance} setBalance={setBalance} onClose={()=>setDep(false)}/>}
    </div>
  );
}
