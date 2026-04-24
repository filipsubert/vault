import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
// ── Stats / profit chart modal ───────────────────────────────────────────────
/* ══════════════════════════════════════ STATS MODAL ════════════════════════════════ */
function StatsModal({onClose,gameName,stats}){
  const {profit,wagered,wins,losses,history}=stats;
  const canvasRef=useRef(null);
  useEffect(()=>{
    const cv=canvasRef.current; if(!cv||history.length<2)return;
    const ctx=cv.getContext("2d");
    const W=cv.width,H=cv.height;
    ctx.clearRect(0,0,W,H);
    const pts=history.map((v,i)=>[W*(i/(history.length-1)),H/2-v*(H*.38)/Math.max(1,Math.max(...history.map(Math.abs)))]);
    const col=profit>=0?"#00ff88":"#ef4444";
    const colRGBA=profit>=0?"0,255,136":"239,68,68";
    // Fill
    ctx.beginPath();ctx.moveTo(pts[0][0],H);pts.forEach(([x,y])=>ctx.lineTo(x,y));ctx.lineTo(pts[pts.length-1][0],H);ctx.closePath();
    const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,`rgba(${colRGBA},.2)`);g.addColorStop(1,`rgba(${colRGBA},.01)`);
    ctx.fillStyle=g;ctx.fill();
    // Glow
    ctx.beginPath();pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y));
    ctx.strokeStyle=`rgba(${colRGBA},.3)`;ctx.lineWidth=5;ctx.lineJoin="round";ctx.stroke();
    // Line
    ctx.beginPath();pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y));
    ctx.strokeStyle=col;ctx.lineWidth=2;ctx.stroke();
    // Zero line
    ctx.strokeStyle="rgba(255,255,255,.08)";ctx.lineWidth=1;ctx.setLineDash([4,4]);
    ctx.beginPath();ctx.moveTo(0,H/2);ctx.lineTo(W,H/2);ctx.stroke();ctx.setLineDash([]);
  },[history,profit]);
  return(
    <div className="stats-modal-bg" onClick={onClose}>
      <div className="stats-modal" onClick={e=>e.stopPropagation()}>
        <div className="sm-header">
          <div className="sm-title">📊 {gameName} — Stats</div>
          <button className="sm-close" onClick={onClose}>✕</button>
        </div>
        <div className="sm-grid">
          <div className="sm-stat">
            <div className="sm-sl">Profit</div>
            <div className={`sm-sv ${profit>0?"pos":profit<0?"neg":"neu"}`}>{profit>=0?"+":""}{profit.toFixed(2)}</div>
          </div>
          <div className="sm-stat">
            <div className="sm-sl">Wagered</div>
            <div className="sm-sv neu">${wagered.toFixed(2)}</div>
          </div>
          <div className="sm-stat">
            <div className="sm-sl">Wins</div>
            <div className="sm-sv pos">{wins}</div>
          </div>
          <div className="sm-stat">
            <div className="sm-sl">Losses</div>
            <div className="sm-sv neg">{losses}</div>
          </div>
        </div>
        <div style={{marginBottom:8,fontSize:".68rem",color:"var(--tx3)",fontWeight:600,letterSpacing:".04em",textTransform:"uppercase"}}>Profit Chart</div>
        <div className="sm-chart">
          <canvas ref={canvasRef} width={360} height={72} style={{width:"100%",display:"block"}}/>
        </div>
        {history.length<2&&<div style={{textAlign:"center",padding:"12px 0",fontSize:".75rem",color:"var(--tx3)"}}>Play a few rounds to see your chart</div>}
      </div>
    </div>
  );
}


export { StatsModal };

