import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { sfx } from "../shared/sfx.js";
import { RANKS, SUITS, RED } from "../shared/math.js";
import { PIP_POS, FaceSVG } from "../components/Cards.jsx";
import { ICO } from "../shared/icons.jsx";
import { StatsModal } from "../components/StatsModal.jsx";
import { CSS_BLACKJACK } from "../shared/css_blackjack.js";
// ── Blackjack game ────────────────────────────────────────────────────────────
const BJ_VALS={A:11,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,J:10,Q:10,K:10};

function bjScore(hand){
  let total=hand.reduce((s,c)=>s+BJ_VALS[c.rank],0);
  let aces=hand.filter(c=>c.rank==="A").length;
  while(total>21&&aces>0){total-=10;aces--;}
  return total;
}
function bjIsBlackjack(hand){return hand.length===2&&bjScore(hand)===21;}
function newDeck(){
  const d=[];
  for(const r of RANKS) for(const s of SUITS) d.push({rank:r,suit:s});
  for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]];}
  return d;
}

function BJCard({card,hidden,delay=0,isNew=false,animClass=""}){
  const isRed=card&&RED.has(card.suit);
  const style={animationDelay:`${delay}s`};
  if(hidden) return(
    <div className={`bj-card${isNew?" new":""}`} style={style}>
      <div className="bj-card-back"><div className="bj-card-back-logo">V</div></div>
    </div>
  );
  const textCol=isRed?"#9b1c1c":"#1e1060";
  const isFace=["J","Q","K"].includes(card.rank);
  const isAce=card.rank==="A";
  const pips=PIP_POS[card.rank]||[];
  const fs=pips.length>8?"7":pips.length>5?"9":"11";
  return(
    <div className={`bj-card${isNew?" new":""}${animClass?" "+animClass:""}`} style={style}>
      <div className={`bj-card-face ${isRed?"rf":"bf"}`}>
        <div className="bj-corner tl" style={{color:textCol}}>
          <span className="bj-crk">{card.rank}</span>
          <span className="bj-csm">{card.suit}</span>
        </div>
        <div className="bj-corner br" style={{color:textCol}}>
          <span className="bj-crk">{card.rank}</span>
          <span className="bj-csm">{card.suit}</span>
        </div>
        {isFace?(
          <div className="bj-center">
            <FaceSVG rank={card.rank} isRed={isRed}/>
          </div>
        ):isAce?(
          <div className="bj-center">
            <span style={{fontSize:"2.6rem",color:textCol,lineHeight:1,filter:`drop-shadow(0 2px 6px ${isRed?"rgba(155,28,28,.25)":"rgba(30,16,96,.25)"})`}}>{card.suit}</span>
          </div>
        ):(
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 100 100">
            {pips.map(([x,y],i)=>(
              <text key={i} x={x} y={y+4} textAnchor="middle" dominantBaseline="middle"
                fontSize={fs} fill={textCol}>{card.suit}</text>
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}

function ScoreBadge({hand,hidden}){
  if(!hand.length)return null;
  if(hidden){
    const vis=hand.filter((_,i)=>i!==1);
    const s=bjScore(vis);
    return <span className="bj-score-badge neutral">{s}+?</span>;
  }
  const s=bjScore(hand);
  const isBJ=bjIsBlackjack(hand);
  const cls=isBJ?"bj":s>21?"bust":s>=18?"good":"neutral";
  return <span className={`bj-score-badge ${cls}`}>{isBJ?"BJ":s}{s>21?" BUST":""}</span>;
}

function BlackjackGame({balance,setBalance,setPage}){
  const [phase,setPhase]=useState("bet"); // bet|dealing|playing|dealer|result
  const [deckRef]=useState({d:newDeck()});
  const [player,setPlayer]=useState([]);
  const [dealer,setDealer]=useState([]);
  const [bet,setBet]=useState(10);
  const [result,setResult]=useState(null);
  const [resultMsg,setResultMsg]=useState("");
  const [revealDealer,setRevealDealer]=useState(false);
  const [flash,setFlash]=useState(null);
  const [canInsure,setCanInsure]=useState(false);
  const [insured,setInsured]=useState(false);
  const [doubled,setDoubled]=useState(false);
  const [betHistory,setBetHistory]=useState([]);
  const [dealingStep,setDealingStep]=useState(0)
  const [showStats,setShowStats]=useState(false);
  const [bjStats,setBjStats]=useState({profit:0,wagered:0,wins:0,losses:0,history:[0]});; // 0–4 cards dealt one by one
  const flashRef=useRef(null);
  const timerRef=useRef(null);

  function doFlash(type){
    if(flashRef.current)clearTimeout(flashRef.current);
    setFlash(type);flashRef.current=setTimeout(()=>setFlash(null),650);
  }

  function drawCard(){
    const card=deckRef.d[0];
    deckRef.d=deckRef.d.slice(1);
    if(deckRef.d.length<15)deckRef.d=newDeck();
    return card;
  }

  function startGame(){
    if(bet<1||bet>balance)return;
    sfx.deal();
    setBalance(b=>+(b-bet).toFixed(2));
    setResult(null);setResultMsg("");setDoubled(false);setInsured(false);
    setCanInsure(false);setRevealDealer(false);
    setPlayer([]);setDealer([]);setDealingStep(0);
    setPhase("dealing");

    // Draw all 4 cards upfront
    const p1=drawCard(),d1=drawCard(),p2=drawCard(),d2=drawCard();
    const cards=[p1,d1,p2,d2];

    // Deal one by one: p1(0ms) d1(320ms) p2(640ms) d2(960ms)
    const DELAY=320;
    timerRef.current=setTimeout(()=>{ sfx.flip(); setPlayer([p1]); setDealingStep(1); },0);
    timerRef.current=setTimeout(()=>{ sfx.flip(); setDealer([d1]); setDealingStep(2); },DELAY);
    timerRef.current=setTimeout(()=>{ sfx.flip(); setPlayer([p1,p2]); setDealingStep(3); },DELAY*2);
    timerRef.current=setTimeout(()=>{
      sfx.flip();
      setDealer([d1,d2]);
      setDealingStep(4);

      const newPlayer=[p1,p2];
      const newDealer=[d1,d2];
      const pBJ=bjIsBlackjack(newPlayer);
      const dBJ=bjIsBlackjack(newDealer);

      if(pBJ||dBJ){
        setRevealDealer(true);
        setTimeout(()=>{
          if(pBJ&&dBJ){sfx.bjPush();setPhase("result");setResult("push");setResultMsg("Both Blackjack — Push!");setBalance(b=>+(b+bet).toFixed(2));setBetHistory(h=>[{res:"push",bet,net:0},...h.slice(0,9)]);
          setBjStats(s=>({profit:s.profit,wagered:+(s.wagered+bet).toFixed(2),wins:s.wins,losses:s.losses,history:[...s.history,s.profit]}));}
          else if(pBJ){sfx.bjBlackjack();doFlash("g");setPhase("result");setResult("blackjack");setResultMsg("Blackjack! Pays 3:2");const win=+(bet*2.5).toFixed(2);setBalance(b=>+(b+win).toFixed(2));setBetHistory(h=>[{res:"blackjack",bet,net:+(bet*1.5).toFixed(2)},...h.slice(0,9)]);
          setBjStats(s=>({profit:+(s.profit+bet*1.5).toFixed(2),wagered:+(s.wagered+bet).toFixed(2),wins:s.wins+1,losses:s.losses,history:[...s.history,+(s.profit+bet*1.5).toFixed(2)]}));}
          else{sfx.lose();doFlash("r");setPhase("result");setResult("lose");setResultMsg("Dealer Blackjack");setBetHistory(h=>[{res:"lose",bet,net:-bet},...h.slice(0,9)]);
          setBjStats(s=>({profit:+(s.profit-bet).toFixed(2),wagered:+(s.wagered+bet).toFixed(2),wins:s.wins,losses:s.losses+1,history:[...s.history,+(s.profit-bet).toFixed(2)]}));}
        },700);
      } else {
        if(d1.rank==="A") setCanInsure(true);
        setPhase("playing");
      }
    },DELAY*3);
  }

  function hit(){
    if(phase!=="playing")return;
    sfx.flip();
    const card=drawCard();
    const newP=[...player,card];
    setPlayer(newP);
    const score=bjScore(newP);
    if(score>21){
      setTimeout(()=>{
        sfx.bjBust();doFlash("r");
        setPhase("result");setResult("lose");setResultMsg("Bust! Over 21");
        setBetHistory(h=>[{res:"lose",bet:doubled?bet*2:bet,net:-(doubled?bet*2:bet)},...h.slice(0,9)]);
        setBjStats(s=>{const b=doubled?bet*2:bet;return{profit:+(s.profit-b).toFixed(2),wagered:+(s.wagered+b).toFixed(2),wins:s.wins,losses:s.losses+1,history:[...s.history,+(s.profit-b).toFixed(2)]};});
      },380);
    } else if(score===21){
      setTimeout(()=>standInner(newP),320);
    }
    setCanInsure(false);
  }

  function standInner(pHand){
    setPhase("dealer");
    setRevealDealer(true);
    let d=[...dealer];
    const draw=()=>{
      const score=bjScore(d);
      if(score<17){
        const card=drawCard();
        d=[...d,card];
        sfx.flip();
        setDealer([...d]);
        setTimeout(draw,540);
      } else {
        const ps=bjScore(pHand||player);
        const ds=bjScore(d);
        const playerBet=doubled?+(bet*2).toFixed(2):bet;
        setTimeout(()=>{
          if(ds>21||ps>ds){
            sfx.bjWin();doFlash("g");
            setResult("win");setResultMsg(ds>21?"Dealer Busts!":ps+" beats "+ds+"!");
            setBalance(b=>+(b+playerBet*2).toFixed(2));
            setBetHistory(h=>[{res:"win",bet:playerBet,net:playerBet},...h.slice(0,9)]);
            setBjStats(s=>({profit:+(s.profit+playerBet).toFixed(2),wagered:+(s.wagered+playerBet).toFixed(2),wins:s.wins+1,losses:s.losses,history:[...s.history,+(s.profit+playerBet).toFixed(2)]}));
          } else if(ps===ds){
            sfx.bjPush();
            setResult("push");setResultMsg("Push — "+ps+" vs "+ds);
            setBalance(b=>+(b+playerBet).toFixed(2));
            setBetHistory(h=>[{res:"push",bet:playerBet,net:0},...h.slice(0,9)]);
          } else {
            sfx.bjBust();doFlash("r");
            setResult("lose");setResultMsg(ds+" beats "+ps);
            setBetHistory(h=>[{res:"lose",bet:playerBet,net:-playerBet},...h.slice(0,9)]);
            setBjStats(s=>({profit:+(s.profit-playerBet).toFixed(2),wagered:+(s.wagered+playerBet).toFixed(2),wins:s.wins,losses:s.losses+1,history:[...s.history,+(s.profit-playerBet).toFixed(2)]}));
          }
          setPhase("result");
        },300);
      }
    };
    setTimeout(draw,480);
  }

  function stand(){if(phase!=="playing")return;sfx.tick();setCanInsure(false);standInner(player);}

  function doubleDown(){
    if(phase!=="playing"||player.length!==2||balance<bet)return;
    sfx.flip();
    setBalance(b=>+(b-bet).toFixed(2));
    setDoubled(true);
    const card=drawCard();
    const newP=[...player,card];
    setPlayer(newP);setCanInsure(false);
    const score=bjScore(newP);
    if(score>21){
      setTimeout(()=>{sfx.bjBust();doFlash("r");setPhase("result");setResult("lose");setResultMsg("Double Bust!");setBetHistory(h=>[{res:"lose",bet:bet*2,net:-bet*2},...h.slice(0,9)]);},380);
    } else {
      setTimeout(()=>standInner(newP),420);
    }
  }

  function takeInsurance(){
    if(!canInsure||balance<bet/2)return;
    sfx.click();
    setBalance(b=>+(b-+(bet/2).toFixed(2)).toFixed(2));
    setInsured(true);setCanInsure(false);
  }

  function newRound(){
    sfx.click();
    setPlayer([]);setDealer([]);setResult(null);setResultMsg("");
    setDoubled(false);setInsured(false);setCanInsure(false);
    setRevealDealer(false);setDealingStep(0);setPhase("bet");
  }

  useEffect(()=>()=>{if(timerRef.current)clearTimeout(timerRef.current);},[]);

  const pScore=bjScore(player);
  const dScore=bjScore(dealer);
  const playerBet=doubled?+(bet*2).toFixed(2):bet;
  const isPlaying=phase==="playing"||phase==="dealer";
  const isBetting=phase==="bet";

  return(
    <div className="gamepage"><style>{CSS_BLACKJACK}</style>
      {flash==="g"&&<div className="fl-g"/>}
      {flash==="r"&&<div className="fl-r"/>}
      <div className="bc">
        <a onClick={()=>setPage("lobby")}>Home</a>
        {ICO.chevR}<a onClick={()=>setPage("casino")}>Casino</a>
        {ICO.chevR}<span style={{color:"var(--tx2)"}}>Blackjack</span>
      </div>

      <div className="gamebody">
        {/* ── LEFT PANEL ── */}
        <div className="lp">
          <div className="sr">
            <span className="sl">Bet</span>
            <span className="sv" style={{color:"var(--go)",fontFamily:"var(--fh)"}}>${playerBet.toFixed(2)}</span>
          </div>
          <div className="sr">
            <span className="sl">Balance</span>
            <span className="sv" style={{color:"var(--puLL)"}}>${balance.toFixed(2)}</span>
          </div>
          {insured&&<div className="sr"><span className="sl">Insurance</span><span className="sv" style={{color:"var(--go)"}}>+${(bet/2).toFixed(2)}</span></div>}
          <div className="sep"/>

          {/* ── CLASSIC BET UI ── */}
          {isBetting&&(
            <>
              <div className="fld">
                <div className="flbl">Bet Amount <span>${balance.toFixed(2)} avail</span></div>
                <div className="fi-w">
                  <span className="fi-pre">$</span>
                  <input className="fi" type="number" min={1} step={1} value={bet}
                    onChange={e=>setBet(Math.max(1,Math.min(balance,+e.target.value||1)))}/>
                  <span className="fi-suf">USD</span>
                </div>
              </div>
              <div className="qb">
                {["½","2×","5×","Max"].map((v,i)=>(
                  <button key={i} className="qbtn" onClick={()=>{
                    sfx.tick();
                    if(v==="½")setBet(b=>+Math.max(1,Math.floor(b/2)));
                    else if(v==="2×")setBet(b=>+Math.min(b*2,balance));
                    else if(v==="5×")setBet(b=>+Math.min(b*5,balance));
                    else setBet(Math.floor(balance));
                  }}>{v}</button>
                ))}
              </div>
              {/* Quick bet amounts */}
              <div className="flbl" style={{marginTop:6}}>Quick Bet</div>
              <div className="qb" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
                {[5,10,25,50,100,500].map(v=>(
                  <button key={v} className={`qbtn${bet===v?" sel":""}`}
                    style={bet===v?{background:"rgba(124,58,237,.2)",borderColor:"rgba(139,92,246,.4)",color:"var(--puLL)"}:{}}
                    disabled={v>balance}
                    onClick={()=>{sfx.click();setBet(v);}}>
                    ${v}
                  </button>
                ))}
              </div>
              <div className="sep"/>
              <button className="cta go" disabled={bet<1||bet>balance} onClick={startGame}>
                🃏 Deal Cards
              </button>
            </>
          )}

          {/* Playing actions */}
          {phase==="playing"&&(
            <>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                <button className="cta go" onClick={hit} style={{padding:"12px 8px",fontSize:".82rem"}}>
                  ➕ Hit
                </button>
                <button className="cta cash" onClick={stand} style={{padding:"12px 8px",fontSize:".82rem"}}>
                  ✋ Stand
                </button>
              </div>
              {player.length===2&&balance>=bet&&(
                <button className="cta replay" onClick={doubleDown} style={{marginBottom:8}}>
                  ⚡ Double Down +${bet.toFixed(2)}
                </button>
              )}
              {canInsure&&balance>=bet/2&&(
                <div className="bj-insurance">
                  <div>
                    <div style={{fontSize:".72rem",fontWeight:700,color:"var(--go)"}}>Insurance?</div>
                    <div style={{fontSize:".64rem",color:"var(--tx3)"}}>Costs ${(bet/2).toFixed(2)}</div>
                  </div>
                  <div style={{display:"flex",gap:5}}>
                    <button className="qbtn" style={{color:"var(--go)"}} onClick={takeInsurance}>Yes</button>
                    <button className="qbtn" onClick={()=>{sfx.tick();setCanInsure(false);}}>No</button>
                  </div>
                </div>
              )}
              {/* Live score hint */}
              <div className="sep"/>
              <div style={{display:"flex",gap:8}}>
                <div className="sr" style={{flex:1}}>
                  <span className="sl">Your</span>
                  <span className="sv" style={{color:pScore>21?"var(--rd)":pScore>=17?"var(--nG)":"var(--go)"}}>{pScore}</span>
                </div>
                <div className="sr" style={{flex:1}}>
                  <span className="sl">Dealer</span>
                  <span className="sv" style={{color:"var(--tx2)"}}>{dealer.length>0?BJ_VALS[dealer[0].rank]+"?":"—"}</span>
                </div>
              </div>
            </>
          )}

          {phase==="dealing"&&(
            <div style={{textAlign:"center",padding:"12px 0"}}>
              <div style={{fontSize:".78rem",color:"var(--puLL)",fontWeight:700,letterSpacing:".06em"}}>
                {["","Dealing...","Dealing...","Dealing...",""][dealingStep]||""}
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:10}}>
                {[0,1,2,3].map(i=>(
                  <div key={i} style={{width:8,height:8,borderRadius:"50%",
                    background:i<dealingStep?"var(--puLL)":"rgba(167,139,250,.2)",
                    transition:"background .3s",boxShadow:i<dealingStep?"0 0 8px var(--puL)":"none"}}/>
                ))}
              </div>
            </div>
          )}

          {phase==="dealer"&&(
            <div className="sr"><span className="sl" style={{color:"var(--puLL)"}}>Dealer drawing...</span></div>
          )}

          {phase==="result"&&(
            <>
              <button className="cta go" onClick={newRound} style={{marginBottom:8}}>🔄 New Round</button>
              <button className="cta replay"
                onClick={()=>{newRound();setTimeout(()=>setBet(Math.min(playerBet,balance)),60);}}>
                Repeat ${playerBet.toFixed(2)}
              </button>
            </>
          )}

          <button className="sm-btn" onClick={()=>setShowStats(true)} style={{marginTop:6,width:"100%",justifyContent:"center"}}>
            📊 Stats & History
          </button>
        </div>
        {showStats&&<StatsModal gameName="Blackjack" onClose={()=>setShowStats(false)} stats={{profit:bjStats.profit,wagered:bjStats.wagered,wins:bjStats.wins,losses:bjStats.losses,history:bjStats.history}}/>}

        {/* ── GAME AREA ── */}
        <div className="garea">
          <div className="gcent" style={{maxWidth:520,gap:14}}>

            {/* Stats card */}
            <div className="mcard">
              <div>
                <div className="mc-lbl">{doubled?"Double Down":"Bet"}</div>
                <div className={`mc-v${result==="win"||result==="blackjack"?" gn":result==="lose"?" rd":""}`}>
                  ${playerBet.toFixed(2)}
                </div>
                {result&&<div className="mc-nx">{resultMsg}</div>}
                {!result&&phase==="playing"&&<div className="mc-nx">
                  {pScore>=21?"Stand or wait":pScore>=17?"Consider standing":"Hit or stand"}
                </div>}
              </div>
              <div style={{textAlign:"right"}}>
                {result?(
                  <>
                    <div className="mc-wl">{result==="win"||result==="blackjack"?"Won":result==="push"?"Push":"Lost"}</div>
                    <div className="mc-w" style={{color:result==="lose"?"var(--rd)":result==="push"?"var(--go)":"var(--nG)"}}>
                      {result==="blackjack"?"+$"+(bet*1.5).toFixed(2):result==="win"?"+$"+playerBet.toFixed(2):result==="push"?"±$0":"-$"+playerBet.toFixed(2)}
                    </div>
                  </>
                ):(
                  <>
                    <div className="mc-wl">Score</div>
                    <div className="mc-w" style={{color:pScore>21?"var(--rd)":pScore>=18?"var(--nG)":"var(--go)"}}>
                      {player.length>0?pScore:"—"}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="bj-table" style={{width:"100%"}}>
              <div className="bj-felt-border"/>
              <div className="bj-inner">

                {/* Dealer hand */}
                <div className="bj-hand-area">
                  <div className="bj-hand-label">
                    <span className="bj-hl-name">Dealer</span>
                    <ScoreBadge hand={dealer} hidden={!revealDealer&&phase==="playing"}/>
                  </div>
                  <div className="bj-cards" style={{minHeight:108}}>
                    {dealer.map((c,i)=>(
                      <BJCard key={i} card={c}
                        hidden={!revealDealer&&i===1}
                        delay={0} isNew={i===dealer.length-1&&phase==="dealer"}/>
                    ))}
                    {isBetting&&(
                      <div style={{width:70,height:100,borderRadius:9,border:"1.5px dashed rgba(167,139,250,.12)",
                        display:"flex",alignItems:"center",justifyContent:"center",
                        color:"rgba(167,139,250,.18)",fontSize:"1.6rem"}}>?</div>
                    )}
                  </div>
                </div>

                <div className="bj-divider" style={{margin:"14px 0"}}/>

                {/* Player hand */}
                <div className="bj-hand-area">
                  <div className="bj-hand-label">
                    <span className="bj-hl-name">You</span>
                    <ScoreBadge hand={player} hidden={false}/>
                  </div>
                  <div className="bj-cards" style={{minHeight:108}}>
                    {player.map((c,i)=>(
                      <BJCard key={i} card={c} hidden={false} delay={0}
                        isNew={i===player.length-1&&(phase==="playing"||phase==="dealing")}/>
                    ))}
                    {isBetting&&(
                      <div style={{width:70,height:100,borderRadius:9,border:"1.5px dashed rgba(167,139,250,.12)",
                        display:"flex",alignItems:"center",justifyContent:"center",
                        color:"rgba(167,139,250,.18)",fontSize:"1.6rem"}}>?</div>
                    )}
                  </div>
                </div>

                {/* Result overlay */}
                {result&&(
                  <div className={`bj-result ${result==="blackjack"||result==="win"?"win":result==="push"?"push":"lose"}`}>
                    <div className="bj-result-title">
                      {result==="blackjack"?"BLACKJACK!":result==="win"?"YOU WIN":result==="push"?"PUSH":pScore>21?"BUST":"DEALER WINS"}
                    </div>
                    <div className="bj-result-sub">{resultMsg}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Info pills */}
            <div className="pills">
              <div className="pill"><span className="pl-l">Blackjack</span><span className="pl-v" style={{color:"var(--go)"}}>3:2</span></div>
              <div className="pill"><span className="pl-l">Dealer</span><span className="pl-v" style={{color:"var(--tx2)"}}>Stands 17</span></div>
              <div className="pill"><span className="pl-l">RTP</span><span className="pl-v" style={{color:"var(--nG)"}}>95.5%</span></div>
              <div className="pill"><span className="pl-l">Decks</span><span className="pl-v" style={{color:"var(--puLL)"}}>1</span></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}



export { BlackjackGame };
