'use strict';
const KEY='fmc_play_v2';
let state={points:0,xp:0,best:0,lastDaily:''};
try{state={...state,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(e){}
let running=false,taps=0,timer=null;
const $=id=>document.getElementById(id);
function save(){localStorage.setItem(KEY,JSON.stringify(state));render()}
function render(){$('points').textContent=state.points;$('xp').textContent=state.xp;$('best').textContent=state.best;$('level').textContent=1+Math.floor(state.xp/100)}
function openGame(){$('panel').hidden=false;$('panelTitle').textContent='⚡ Tap Rush';$('panelText').textContent='Tap the cheese as many times as possible in 10 seconds.';$('coin').style.display='block';$('start').style.display='block';$('bar').style.width='0';$('panel').scrollIntoView({behavior:'smooth'})}
function begin(){if(running)return;running=true;taps=0;let ticks=50;$('panelText').textContent='GO! 0 taps';$('bar').style.width='100%';timer=setInterval(()=>{ticks--;$('bar').style.width=(ticks*2)+'%';if(ticks<=0){clearInterval(timer);timer=null;running=false;state.points+=taps;state.xp+=Math.min(taps,100);state.best=Math.max(state.best,taps);save();$('panelText').textContent=`Round finished! ${taps} taps — +${taps} points.`}},200)}
function tap(){if(running){taps++;$('panelText').textContent=`GO! ${taps} taps`}}
function daily(){const today=new Date().toISOString().slice(0,10);if(state.lastDaily===today){alert("You've already claimed today's bonus.");return}state.lastDaily=today;state.points+=25;state.xp+=10;save();alert('Daily bonus claimed: +25 points and +10 XP.')}
function showRewards(){$('panel').hidden=false;$('panelTitle').textContent='💰 Rewards';$('panelText').textContent=`You have ${state.points} game points. Real-money withdrawals are locked until the secure payout backend is connected and your gameplay is verified.`;$('coin').style.display='none';$('start').style.display='none';$('bar').style.width='0';$('panel').scrollIntoView({behavior:'smooth'})}
function closePanel(){if(timer)clearInterval(timer);timer=null;running=false;$('panel').hidden=true}
render();
