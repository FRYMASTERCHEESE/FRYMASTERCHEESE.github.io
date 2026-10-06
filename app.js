const C=window.FMC_CONFIG||{},cloud=!!(C.SUPABASE_URL&&C.SUPABASE_ANON_KEY),sb=cloud?supabase.createClient(C.SUPABASE_URL,C.SUPABASE_ANON_KEY):null;const KEY='fmc_v2_local';let state=JSON.parse(localStorage.getItem(KEY)||'null')||{points:0,xp:0,best:0,lastDaily:''},user=null,running=false,taps=0,timer=null;const $=id=>document.getElementById(id);function toast(m){$('toast').textContent=m;$('toast').style.display='block';setTimeout(()=>$('toast').style.display='none',2800)}function render(){localStorage.setItem(KEY,JSON.stringify(state));$('points').textContent=state.points||0;$('xp').textContent=state.xp||0;$('best').textContent=state.best||0;$('level').textContent=1+Math.floor((state.xp||0)/100)}function show(id){document.querySelectorAll('.view').forEach(x=>x.hidden=x.id!==id);$(id)?.scrollIntoView({behavior:'smooth'})}function openTap(){show('games');$('gamePanel').hidden=false}function begin(){if(running)return;running=true;taps=0;let left=100;$('gameText').textContent='GO! 0 taps';timer=setInterval(async()=>{left-=2;$('bar').style.width=Math.max(0,left)+'%';if(left<=0){clearInterval(timer);running=false;state.points+=taps;state.xp+=Math.min(taps,100);state.best=Math.max(state.best,taps);render();$('gameText').textContent=`Finished! ${taps} taps — +${taps} points.`;window.FMC_LAST_SCORE=taps;updateShareCard(taps);await saveProfile()}},200)}function tap(){if(running){taps++;$('gameText').textContent=`GO! ${taps} taps`}}async function daily(){let d=new Date().toISOString().slice(0,10);if(state.lastDaily===d)return toast("Today's bonus is already claimed.");state.lastDaily=d;state.points+=25;state.xp+=10;render();await saveProfile();toast('+25 points and +10 XP')}async function signup(e){e.preventDefault();if(!cloud)return toast('Connect Supabase first.');let email=$('signupEmail').value.trim(),password=$('signupPassword').value,ref=$('signupReferral').value.trim().toUpperCase();let{error}=await sb.auth.signUp({email,password,options:{data:{referred_by_code:ref||null},emailRedirectTo:location.origin}});toast(error?error.message:'Account created. Check your email if verification is enabled.')}async function login(e){e.preventDefault();if(!cloud)return toast('Connect Supabase first.');let{data,error}=await sb.auth.signInWithPassword({email:$('loginEmail').value.trim(),password:$('loginPassword').value});if(error)return toast(error.message);await setUser(data.user);toast('Logged in.')}async function logout(){if(sb)await sb.auth.signOut();user=null;$('accountPanel').hidden=true;toast('Logged out.')}async function resetPassword(){let email=$('loginEmail').value.trim();if(!email)return toast('Enter your email first.');let{error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:location.origin});toast(error?error.message:'Password reset email sent.')}async function setUser(u){user=u;if(!u)return;$('accountPanel').hidden=false;$('accountEmail').textContent=u.email;await loadProfile();await loadReferrals()}async function loadProfile(){let{data,error}=await sb.from('profiles').select('points,xp,best,last_daily,referral_code,pending_usd,verified_usd,paid_usd').eq('id',user.id).single();if(error)return toast('Could not load cloud profile.');state={points:data.points||0,xp:data.xp||0,best:data.best||0,lastDaily:data.last_daily||''};render();$('refLink').value=location.origin+location.pathname+'?ref='+data.referral_code;$('pendingMoney').textContent='$'+Number(data.pending_usd||0).toFixed(2);$('verifiedMoney').textContent='$'+Number(data.verified_usd||0).toFixed(2);$('paidMoney').textContent='$'+Number(data.paid_usd||0).toFixed(2)}async function saveProfile(){if(!cloud||!user)return;let{error}=await sb.rpc('save_game_progress',{p_points:state.points,p_xp:state.xp,p_best:state.best,p_last_daily:state.lastDaily||null});if(error)toast('Cloud save failed: '+error.message)}async function loadReferrals(){if(!user)return;let{data,error}=await sb.from('referrals').select('status').eq('referrer_id',user.id);if(error)return;data=data||[];$('refCount').textContent=data.filter(x=>x.status==='verified').length;$('refPending').textContent=data.filter(x=>x.status==='pending').length}async function copyReferral(){if(!user)return toast('Login first.');try{await navigator.clipboard.writeText($('refLink').value);toast('Referral link copied.')}catch{toast('Copy the link manually.')}}async function requestWithdrawal(e){e.preventDefault();if(!cloud||!user)return toast('Login is required.');let{error}=await sb.rpc('request_withdrawal',{p_method:$('withdrawMethod').value.toLowerCase(),p_destination:$('withdrawDestination').value.trim(),p_amount_usd:Number($('withdrawAmount').value)});if(error)return toast(error.message);toast('Withdrawal request recorded for verification.');await loadProfile()}(async()=>{render();let ref=new URLSearchParams(location.search).get('ref');if(ref)localStorage.setItem('fmc_ref',ref.toUpperCase());let saved=localStorage.getItem('fmc_ref');if(saved)$('signupReferral').value=saved;if(!cloud)return;$('configWarning').hidden=true;let{data}=await sb.auth.getSession();if(data.session)await setUser(data.session.user);sb.auth.onAuthStateChange((_e,s)=>{if(s?.user)setUser(s.user);else user=null})})();

function challengeUrl(){
  const u=new URL(location.origin+location.pathname);
  u.searchParams.set('challenge','tap-rush');
  return u.toString();
}
function scoreMessage(score){
  return `🧀 I scored ${score} taps in 10 seconds on Tap Rush. Can you beat my score?`;
}
function updateShareCard(score){
  const box=$('shareScoreBox'),scoreEl=$('shareScoreValue');
  if(!box||!scoreEl)return;
  scoreEl.textContent=score;
  box.hidden=false;
}
async function shareScore(){
  const score=Number(window.FMC_LAST_SCORE||state.best||0);
  const data={title:'Tap Rush Challenge',text:scoreMessage(score),url:challengeUrl()};
  try{
    if(navigator.share){await navigator.share(data);return;}
    await navigator.clipboard.writeText(`${data.text} ${data.url}`);
    toast('Challenge copied — share it with a friend!');
  }catch(e){
    if(e?.name!=='AbortError') toast('Could not open sharing. Try Copy challenge link.');
  }
}
async function copyChallenge(){
  const score=Number(window.FMC_LAST_SCORE||state.best||0);
  try{
    await navigator.clipboard.writeText(`${scoreMessage(score)} ${challengeUrl()}`);
    toast('Challenge link copied!');
  }catch{toast('Copy failed — use your browser Share option.')}
}
function shareFacebook(){
  const u=encodeURIComponent(challengeUrl());
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`,'_blank','noopener,noreferrer');
}
function shareWhatsApp(){
  const score=Number(window.FMC_LAST_SCORE||state.best||0);
  const text=encodeURIComponent(`${scoreMessage(score)} ${challengeUrl()}`);
  window.open(`https://wa.me/?text=${text}`,'_blank','noopener,noreferrer');
}
