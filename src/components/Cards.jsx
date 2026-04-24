import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { RANKS } from "../shared/math.js";
const RED = new Set(["♥", "♦"]);
// ── Card face rendering + Rank Ladder ────────────────────────────────────────
/* ══════════════════════════════════════ CARD RENDERING ════════════════════════════ */
const PIP_POS={
  "2":[[50,26],[50,74]],
  "3":[[50,22],[50,50],[50,78]],
  "4":[[28,25],[72,25],[28,75],[72,75]],
  "5":[[28,24],[72,24],[50,50],[28,76],[72,76]],
  "6":[[28,20],[72,20],[28,50],[72,50],[28,80],[72,80]],
  "7":[[28,20],[72,20],[50,33],[28,50],[72,50],[28,80],[72,80]],
  "8":[[28,17],[72,17],[50,31],[28,49],[72,49],[50,67],[28,83],[72,83]],
  "9":[[28,17],[72,17],[28,37],[72,37],[50,50],[28,63],[72,63],[28,83],[72,83]],
  "10":[[28,14],[72,14],[50,27],[28,38],[72,38],[28,62],[72,62],[50,73],[28,86],[72,86]],
};

function FaceSVG({rank,isRed}){
  const c=isRed?"#9b1c1c":"#1e1060";
  const c2=isRed?"rgba(155,28,28,.12)":"rgba(30,16,96,.12)";
  if(rank==="K") return(
    <svg width="76" height="110" viewBox="0 0 76 110" fill="none">
      <rect x="8" y="8" width="60" height="94" rx="5" fill={c2}/>
      <path d="M20 44 L20 30 Q38 20 56 30 L56 44" fill={c} opacity=".7" stroke={c} strokeWidth=".5"/>
      <path d="M26 30 L38 20 L50 30" fill={c} opacity=".5"/>
      <circle cx="38" cy="20" r="4" fill={c} opacity=".9"/>
      <circle cx="20" cy="30" r="3" fill={c} opacity=".7"/>
      <circle cx="56" cy="30" r="3" fill={c} opacity=".7"/>
      <rect x="28" y="44" width="20" height="28" rx="3" fill={c} opacity=".14"/>
      <line x1="38" y1="46" x2="38" y2="72" stroke={c} strokeWidth="1" opacity=".3"/>
      <line x1="28" y1="57" x2="48" y2="57" stroke={c} strokeWidth="1" opacity=".3"/>
      <path d="M24 72 L28 86 L38 82 L48 86 L52 72" fill={c} opacity=".1" stroke={c} strokeWidth=".6"/>
    </svg>
  );
  if(rank==="Q") return(
    <svg width="76" height="110" viewBox="0 0 76 110" fill="none">
      <rect x="8" y="8" width="60" height="94" rx="5" fill={c2}/>
      <ellipse cx="38" cy="32" rx="16" ry="18" fill={c} opacity=".1" stroke={c} strokeWidth=".8" strokeOpacity=".3"/>
      <path d="M22 22 Q22 8 38 6 Q54 8 54 22" fill={c} opacity=".22"/>
      <circle cx="38" cy="7" r="4" fill={c} opacity=".7"/>
      <circle cx="23" cy="16" r="2.5" fill={c} opacity=".55"/>
      <circle cx="53" cy="16" r="2.5" fill={c} opacity=".55"/>
      <path d="M22 42 Q20 60 24 68 L38 66 L52 68 Q56 60 54 42 Q48 50 38 50 Q28 50 22 42Z" fill={c} opacity=".14"/>
      <line x1="38" y1="42" x2="38" y2="66" stroke={c} strokeWidth=".8" opacity=".25"/>
    </svg>
  );
  return(
    <svg width="76" height="110" viewBox="0 0 76 110" fill="none">
      <rect x="8" y="8" width="60" height="94" rx="5" fill={c2}/>
      <path d="M26 26 L26 16 Q38 10 50 16 L50 26" fill={c} opacity=".3"/>
      <line x1="22" y1="26" x2="54" y2="26" stroke={c} strokeWidth="2" opacity=".4"/>
      <path d="M46 16 Q56 8 52 20" fill="none" stroke={c} strokeWidth="1.2" opacity=".45"/>
      <rect x="28" y="36" width="20" height="24" rx="3" fill={c} opacity=".13"/>
      <line x1="38" y1="36" x2="38" y2="60" stroke={c} strokeWidth=".8" opacity=".3"/>
      <line x1="44" y1="34" x2="34" y2="62" stroke={c} strokeWidth="1.5" opacity=".4"/>
      <path d="M43 34 L48 30 L46 36Z" fill={c} opacity=".55"/>
    </svg>
  );
}

function CardFace({rank,suit}){
  const isRed=RED.has(suit);
  const isFace=["J","Q","K"].includes(rank);
  const textCol=isRed?"#9b1c1c":"#1e1060";
  const pips=PIP_POS[rank]||[];
  const isAce=rank==="A";
  const fs=pips.length>8?"10":pips.length>5?"12":"14";
  return(
    <div className={`cface ${isRed?"rf":"bf"}`}>
      <div className="cf-corner cf-tl" style={{color:textCol}}>
        <span className="cf-rk">{rank}</span>
        <span className="cf-sm">{suit}</span>
      </div>
      <div className="cf-corner cf-br" style={{color:textCol}}>
        <span className="cf-rk">{rank}</span>
        <span className="cf-sm">{suit}</span>
      </div>
      {isFace?(
        <div className="cf-center"><FaceSVG rank={rank} isRed={isRed}/></div>
      ):isAce?(
        <div className="cf-center">
          <span style={{fontSize:"4rem",color:textCol,filter:`drop-shadow(0 3px 8px ${isRed?"rgba(155,28,28,.25)":"rgba(30,16,96,.25)"})`}}>{suit}</span>
        </div>
      ):(
        <svg className="pip-svg" viewBox="0 0 100 100">
          {pips.map(([x,y],i)=>(
            <text key={i} x={x} y={y+4} textAnchor="middle" dominantBaseline="middle"
              fontSize={fs} fill={textCol}>{suit}</text>
          ))}
        </svg>
      )}
    </div>
  );
}

function CardBack(){
  return(
    <div className="cback">
      <div className="cback-logo">V</div>
    </div>
  );
}

/* ══════════════════════════════════════ RANK LADDER ════════════════════════════════ */
const HEIGHTS=[14,16,18,21,25,30,36,30,25,21,18,16,14];
function RankLadder({curRank,history}){
  return(
    <div className="rank-ladder">
      {RANKS.map((r,i)=>{
        const isCur=r===curRank;
        const done=history.some(h=>h.rank===r);
        return(
          <div key={r} className="rl-col">
            <div className="rl-bar-w" style={{height:HEIGHTS[i]+4}}>
              <div className={`rl-bar-fill${isCur?" cur":done?" done":" idle"}`} style={{height:HEIGHTS[i]}}/>
            </div>
            <span className="rl-label">{r}</span>
          </div>
        );
      })}
    </div>
  );
}


export { PIP_POS, FaceSVG, CardFace, CardBack, RankLadder, HEIGHTS };

