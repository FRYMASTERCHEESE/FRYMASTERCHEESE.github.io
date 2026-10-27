import {SCENARIOS, CATEGORIES, storyById, chooseStory, buildPost, makeReplySuggestions, words, safeFilename, escapeHtml} from './core.mjs';

const $=id=>document.getElementById(id);
const app={story:SCENARIOS[0],video:null,videoUrl:'',imageCaptured:null,package:null,toastId:null,ownerKey:'',lastStory:'',background:null};
const currentConfig=window.TINY_TALKIES_CONFIG||{API_BASE:''};
const safeStorage={get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,val){try{localStorage.setItem(key,val);return true}catch{return false}},remove(key){try{localStorage.removeItem(key)}catch{}}};

function toast(message){const el=$('toast');el.textContent=message;el.classList.add('visible');clearTimeout(app.toastId);app.toastId=setTimeout(()=>el.classList.remove('visible'),3300)}
async function copyText(text){
  try{await navigator.clipboard.writeText(text);toast('Copied! Ready to paste 💗')}catch{
    const input=document.createElement('textarea');input.value=text;input.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(input);input.select();try{document.execCommand('copy');toast('Copied! 💗')}catch{toast('Select the text and copy it manually.')}input.remove();
  }
}
function setStory(story){
 app.story=story;app.lastStory=story.id;
 $('storyCategory').textContent=story.category.toUpperCase()+' · TINY TALKIES';
 $('storyTitle').textContent=story.title;
 $('scriptInput').value=story.line;
 $('coverHeadline').value=story.hook;
 compose();
}
function compose(){
 try{app.package=buildPost(app.story,{line:$('scriptInput').value,mode:$('captionMode').value});
 $('flowPrompt').value=app.package.prompt;
 $('captionInput').value=app.package.caption;
 $('pinnedInput').value=app.package.pinned;
 $('lineLength').textContent=words(app.package.line)+' words';
 $('captionLength').textContent=app.package.caption.length+' characters';
 makeCover();showOverlay();
 }catch(e){toast(e.message)}
}
function chooseNext(){const story=chooseStory($('categorySelect').value,app.lastStory);setStory(story);toast('Fresh Tiny Talkies joke ready! ✨')}
function wrap(ctx,text,maxWidth,font){ctx.font=font;const words=text.split(' ');let line='',lines=[];for(const w of words){const trial=line?line+' '+w:w;if(ctx.measureText(trial).width>maxWidth&&line){lines.push(line);line=w;}else line=trial;}if(line)lines.push(line);return lines;}
function makeCover(){
 const canvas=$('coverCanvas'),ctx=canvas.getContext('2d');const w=canvas.width,h=canvas.height;
 ctx.clearRect(0,0,w,h);ctx.fillStyle='#e8bdb2';ctx.fillRect(0,0,w,h);
 if(app.background){const image=app.background;const ratio=Math.max(w/image.width,h/image.height);const iw=image.width*ratio,ih=image.height*ratio;ctx.drawImage(image,(w-iw)/2,(h-ih)/2,iw,ih)}else{
  const g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,'#fcd5de');g.addColorStop(.52,'#fceab7');g.addColorStop(1,'#f6a2b5');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  for(let i=0;i<21;i++){ctx.beginPath();ctx.arc((i*97)%w,(i*173)%h,10+(i%4)*7,0,2*Math.PI);ctx.fillStyle=i%2?'#ffffff55':'#ffcb4277';ctx.fill()}
  ctx.font='155px system-ui';ctx.textAlign='center';ctx.fillText('👶🏼',w/2,h*.60);
 }
 const over=ctx.createLinearGradient(0,0,0,300);over.addColorStop(0,'rgba(255,243,247,.98)');over.addColorStop(.8,'rgba(255,244,244,.83)');over.addColorStop(1,'rgba(255,244,244,0)');ctx.fillStyle=over;ctx.fillRect(0,0,w,290);
 // brand signature in top margin
 ctx.textAlign='center';ctx.font='900 35px system-ui, sans-serif';ctx.lineWidth=6;ctx.strokeStyle='#fff';ctx.strokeText('Tiny Talkies',w/2,56);ctx.fillStyle='#ec4a86';ctx.fillText('Tiny Talkies',w/2,56);
 ctx.font='bold 15px system-ui';ctx.fillStyle='#303455';ctx.fillText('tiny voices, BIG laughs!',w/2,81);
 const title=($('coverHeadline')?.value||app.story.hook).toUpperCase();let fontSize=42,lines=[];while(fontSize>26){lines=wrap(ctx,title,470,`900 ${fontSize}px system-ui`);if(lines.length<=3)break;fontSize-=3;}
 const top=Math.max(135,215-lines.length*23);ctx.textAlign='center';ctx.font=`900 ${fontSize}px system-ui`;ctx.lineWidth=5;ctx.strokeStyle='#fff';lines.forEach((line,i)=>{const y=top+i*(fontSize+5);ctx.strokeText(line,w/2,y);ctx.fillStyle=i===0?'#252b4e':'#e94182';ctx.fillText(line,w/2,y)});
 ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(17,h-71,w-34,45,19);ctx.fill();ctx.fillStyle='#ef4e8c';ctx.font='800 21px system-ui';ctx.textAlign='center';ctx.fillText('Tiny Talkies  ♡',w/2,h-43);
}
function showOverlay(){
 const v=$('videoPreview'),el=$('textPreview');if(!app.video||!v.duration){el.hidden=true;return;}
 const t=v.currentTime,txt=t<3?app.story.hook:(t>=5&&t<8.5?app.story.punch:'');el.textContent=txt;el.hidden=!txt;
}
async function captureFrame(){const v=$('videoPreview');if(!app.video||!v.videoWidth){toast('Choose a video first. You can still download the sample cover.');return;}
 const canvas=document.createElement('canvas');canvas.width=v.videoWidth;canvas.height=v.videoHeight;canvas.getContext('2d').drawImage(v,0,0);const img=new Image();img.onload=()=>{app.background=img;makeCover();toast('Video frame added to cover!')};img.src=canvas.toDataURL('image/jpeg',.9);
}
function downloadCanvas(){makeCover();$('coverCanvas').toBlob(blob=>{if(!blob){toast('Could not create JPG.');return}downloadBlob(blob,`tiny-talkies-${safeFilename(app.story.title)}-cover.jpg`)},'image/jpeg',.92)}
function downloadBlob(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000)}
function exportPost(){const post={...app.package,line:$('scriptInput').value,prompt:$('flowPrompt').value,caption:$('captionInput').value,pinned:$('pinnedInput').value,coverHeadline:$('coverHeadline').value,videoFilename:app.video?.name||null,facebookStatus:'NOT_PUBLISHED',metaAiDisclosureRequired:$('aiDisclosure').checked};downloadBlob(new Blob([JSON.stringify(post,null,2)],{type:'application/json'}),`tiny-talkies-${safeFilename(app.story.title)}-post.json`);toast('Post details saved as JSON!')}
function getDrafts(){try{return JSON.parse(safeStorage.get('tt_drafts_v1')||'[]')}catch{return []}}
function saveDraft(){const drafts=getDrafts();const id=Date.now().toString();const draft={id,storyId:app.story.id,line:$('scriptInput').value,caption:$('captionInput').value,pinned:$('pinnedInput').value,prompt:$('flowPrompt').value,headline:$('coverHeadline').value,mode:$('captionMode').value,videoName:app.video?.name||'',savedAt:new Date().toISOString()};drafts.unshift(draft);drafts.splice(15);if(safeStorage.set('tt_drafts_v1',JSON.stringify(drafts))){renderDrafts();toast('Draft saved on this device! ❤️')}else toast('Browser storage unavailable. Export your post details instead.')}
function renderDrafts(){const drafts=getDrafts(),target=$('draftList');target.replaceChildren();if(!drafts.length){const p=document.createElement('p');p.className='empty';p.textContent='Your saved drafts will appear here.';target.append(p);return}
 for(const d of drafts){const card=document.createElement('div');card.className='draft-card';const content=document.createElement('div');const bold=document.createElement('b');bold.textContent=storyById(d.storyId).title;bold.style.fontSize='12px';const info=document.createElement('span');info.textContent=`Saved ${new Date(d.savedAt).toLocaleDateString()} · ${d.videoName?'Video selected earlier — reselect to preview':'No video selected'}`;content.append(bold,document.createElement('br'),info);const btn=document.createElement('button');btn.type='button';btn.textContent='Open';btn.addEventListener('click',()=>{setStory(storyById(d.storyId));$('scriptInput').value=d.line;$('captionInput').value=d.caption;$('pinnedInput').value=d.pinned;$('flowPrompt').value=d.prompt;$('coverHeadline').value=d.headline;app.package=buildPost(app.story,{line:d.line});makeCover();$('captionLength').textContent=d.caption.length+' characters';$('lineLength').textContent=words(d.line)+' words';document.querySelector('#create').scrollIntoView({behavior:'smooth'});toast('Draft loaded. Please choose its video again if needed.')});card.append(content,btn);target.append(card)}
}
async function connectPage(){
 const api=String(currentConfig.API_BASE||'').replace(/\/$/,'');if(!api){toast('Secure Facebook backend has not been configured.');return}
 const secret=$('ownerKey').value.trim();if(!secret){toast('Enter the studio owner access key from your secure backend.');return}
 const button=$('connectFacebook');button.disabled=true;button.textContent='Connecting…';
 try{const r=await fetch(api+'/api/oauth/start',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+secret},body:'{}'});const data=await r.json();if(!r.ok||!data.url)throw Error(data.error||'Meta connection was not started');window.location.href=data.url;}catch(e){toast('Facebook connection unavailable: '+e.message)}finally{button.disabled=false;button.textContent='Connect Facebook securely'}
}
function init(){
 const api=String(currentConfig.API_BASE||'').trim();if(api){$('connectFacebook').disabled=false;$('connectFacebook').textContent='Connect Facebook securely';$('advancedMessage').textContent='Secure Worker configured. Publishing still requires permissions and a verified AI-disclosure workflow.'}
 setStory(SCENARIOS[0]);renderDrafts();
 $('newIdea').addEventListener('click',chooseNext);$('surpriseTop').addEventListener('click',()=>{chooseNext();document.querySelector('#create').scrollIntoView({behavior:'smooth'})});$('makePackage').addEventListener('click',()=>{compose();toast('Prompt, caption & comment prepared! ❤️')});$('categorySelect').addEventListener('change',chooseNext);$('captionMode').addEventListener('change',compose);
 $('scriptInput').addEventListener('input',()=>{$('lineLength').textContent=words($('scriptInput').value)+' words'});$('coverHeadline').addEventListener('input',makeCover);
 $('copyLine').addEventListener('click',()=>copyText($('scriptInput').value));$('copyPrompt').addEventListener('click',()=>copyText($('flowPrompt').value));
 document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copyText($(b.dataset.copy).value)));
 $('captionInput').addEventListener('input',()=>{$('captionLength').textContent=$('captionInput').value.length+' characters'});
 $('captureFrame').addEventListener('click',captureFrame);$('downloadCover').addEventListener('click',downloadCanvas);$('saveDraft').addEventListener('click',saveDraft);$('exportPost').addEventListener('click',exportPost);$('connectFacebook').addEventListener('click',connectPage);
 $('clearDrafts').addEventListener('click',()=>{if(!getDrafts().length)return;if(confirm('Clear the saved Tiny Talkies drafts from this device?')){safeStorage.remove('tt_drafts_v1');renderDrafts();toast('Saved drafts cleared.')}});
 $('videoFile').addEventListener('change',e=>{const file=e.target.files?.[0];if(!file)return;if(!file.type.startsWith('video/')){toast('Please choose a video file.');return}if(file.size>250*1024*1024){toast('Choose a video smaller than 250 MB.');return}if(app.videoUrl)URL.revokeObjectURL(app.videoUrl);app.video=file;app.videoUrl=URL.createObjectURL(file);app.background=null;const v=$('videoPreview');v.src=app.videoUrl;v.hidden=false;$('videoPlaceholder').hidden=true;v.load();$('videoInfo').textContent=file.name+' · '+(file.size/1024/1024).toFixed(1)+' MB · stored on your device';toast('Video loaded! You can pick a cover frame.');});
 const v=$('videoPreview');v.addEventListener('loadedmetadata',()=>{const secs=Math.round(v.duration);$('videoInfo').textContent=`${app.video.name} · ${v.videoWidth}×${v.videoHeight} · ${secs}s · local preview`;showOverlay()});v.addEventListener('loadeddata',()=>{if(v.videoWidth)captureFrame()});v.addEventListener('timeupdate',showOverlay);v.addEventListener('ended',showOverlay);
 for(const reply of makeReplySuggestions().slice(0,3)){const btn=document.createElement('button');btn.type='button';btn.textContent=reply;btn.addEventListener('click',()=>copyText(reply));$('quickReplies').append(btn)}
 document.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('.nav-link').forEach(x=>x.classList.toggle('active',x===a))}));
 if(new URLSearchParams(location.search).get('facebook')==='connected'){$('connectionState').textContent='Facebook authorization completed — check secure backend';toast('Facebook returned successfully! Verify your Page connection in the backend.')}
}
init();