// Tiny Talkies Studio: offline, deterministic creative helpers.
// No browser API, Google API, Facebook API, or paid service required.
export const CHARACTER = 'the same fictional little girl in the provided start image: shoulder-length blonde hair, big blue eyes, a small pink hair bow, peach knitted jumper, rosy cheeks, and the same cosy softly lit living room';

export const SCENARIOS = [
  {id:'blanket', category:'Funny', title:'The Blanket Got Promoted', hook:'MUM SAID CLEAN MY ROOM?!', punch:'THE BLANKET IS IN CHARGE!', line:'Mum said tidy my toys... so I put everything under the blanket! Now the blanket is in charge. You\'re welcome!', caption:'Mum said tidy the toys… so the blanket got promoted! 😂🧸❤️', question:'What is the funniest shortcut your little one has tried?', tags:['#TinyTalkies','#FunnyBaby','#ParentHumor','#BabyComedy']},
  {id:'remote', category:'Funny', title:'Dad Has a Remote Control', hook:'WHO CONTROLS DAD?!', punch:'I FOUND THE BUTTON!', line:'I found the TV remote! If I press pause... will Dad stop telling dad jokes? Oops! It only paused cartoons!', caption:'She found the remote… and immediately tried to pause Dad’s jokes! 😂📺', question:'What would you pause for five minutes?', tags:['#TinyTalkies','#FunnyToddler','#FamilyComedy','#FunnyReels']},
  {id:'cookies', category:'Funny', title:'Grandma Said Two Cookies', hook:'MUM SAID NO COOKIES?!', punch:'GRANDMA SAID TWO!', line:'Mum said no more cookies... so I asked Grandma! She gave me TWO! Shhh... don\'t tell Mum!', caption:'Mum said no cookies… Grandma said TWO! 😂🍪❤️', question:'Who is the biggest softie in your family?', tags:['#TinyTalkies','#FunnyBaby','#Grandma','#FamilyComedy']},
  {id:'teddy', category:'Funny', title:'Teddy Is Grounded', hook:'TEDDY GOT ME GROUNDED?!', punch:'HE IS NOT EVEN SORRY!', line:'Teddy said we could have cookies for breakfast. Mum said NO! Now we are both grounded… and Teddy is not even sorry!', caption:'Teddy got us both grounded… and he isn’t even sorry! 😂🧸', question:'Who do you believe — Teddy or the baby?', tags:['#TinyTalkies','#BabyComedy','#FunnyReels','#ParentHumor']},
  {id:'socks', category:'Funny', title:'The Missing Sock Mystery', hook:'WHO IS EATING MY SOCKS?!', punch:'IT WANTS MY OTHER SOCK!', line:'Mum says the washing machine eats socks... so I gave it a biscuit! Now it wants my OTHER sock! HELP!', caption:'She fed the washing machine a biscuit… now it wants more! 😂🧦', question:'Does your washing machine steal socks too?', tags:['#TinyTalkies','#FunnyBaby','#BabyComedy','#LaundryHumor']},
  {id:'alarm', category:'Funny', title:'First Job: Alarm Clock', hook:'I GOT MY FIRST JOB?!', punch:'NO SNOOZE BUTTON!', line:'I GOT A JOB! I am the family alarm clock! I wake everyone up at six by shouting BREAKFAST! You are welcome!', caption:'Her first job? The family alarm clock… with no snooze button! 😂⏰', question:'What is the funniest way you have been woken up?', tags:['#TinyTalkies','#ParentHumor','#FunnyBaby','#FamilyComedy']},
  {id:'peace', category:'Funny', title:'Five Minutes of Peace', hook:'DAD ASKED FOR PEACE?!', punch:'I SHOUTED PEACE!', line:'Dad asked for five minutes of peace... so I shouted PEACE for five minutes! You are welcome, Dad!', caption:'Dad wanted five minutes of peace… so she gave him five minutes of “PEACE!” 😂❤️', question:'Would this work in your house?', tags:['#TinyTalkies','#FunnyBaby','#DadHumor','#FunnyReels']},
  {id:'puppy', category:'Funny', title:'Mum Said No Puppy', hook:'MUM SAID NO PUPPY?!', punch:'WHERE IS MY TREAT?!', line:'Mum said I cannot have a puppy... so I decided to BE the puppy! Woof woof! Where is my treat?', caption:'Mum said no puppy… so she became one! 😂🐶', question:'Would you give this little puppy a treat?', tags:['#TinyTalkies','#FunnyBaby','#BabyComedy','#PuppyHumor']},
  {id:'halloween', category:'Seasonal', title:'One Halloween Treat', hook:'MOM SAID ONE TREAT?!', punch:'I PICKED THE WHOLE BOWL!', line:'Mom said I could have ONE Halloween treat… so I picked the WHOLE candy bowl! That is one bowl, right?', caption:'Mom said one Halloween treat… so she picked the whole bowl! 🎃😂', question:'What is your favourite Halloween candy?', tags:['#TinyTalkies','#HalloweenHumor','#FunnyBaby','#FamilyComedy']},
  {id:'smile', category:'Cute', title:'A Smile Just for You', hook:'A BIG SMILE JUST FOR YOU!', punch:'THANK YOU, FRIENDS!', line:'Hello, Tiny Talkies friends! I saved my biggest smile just for you! Ready? Ta-daaa! Thank you!', caption:'A little wave and the biggest smile just for you! 🥹❤️👶', question:'Hope this brightened your day!', tags:['#TinyTalkies','#BabySmiles','#CuteBaby','#Heartwarming']},
  {id:'cuddle', category:'Cute', title:'A Little Thank You', hook:'I HAVE A SURPRISE!', punch:'IT IS MY BIGGEST SMILE!', line:'Psst! Guess what? You are my favourite people to make smile! Ready for the biggest grin? Ta-daaa! Thank you!', caption:'Saving the sweetest little grin for our Tiny Talkies friends. 🥹💕', question:'Sending some sunshine your way!', tags:['#TinyTalkies','#CuteBaby','#HappyMoments','#BabySmiles']},
  {id:'million', category:'Milestone', title:'Our Big Little Dream', hook:'OUR BIG LITTLE DREAM!', punch:'ONE MILLION FOLLOWERS?!', line:'Psst! Tiny Talkies has a big dream... ONE MILLION FOLLOWERS! Can you help us get there? I will do my happy dance! YAY!', caption:'A big little dream — one million Tiny Talkies friends one day! 🥹❤️', question:'Thanks for being part of the journey!', tags:['#TinyTalkies','#BabyComedy','#BigDreams','#CuteBaby']},
  {id:'500', category:'Milestone', title:'500 Tiny Talkies Friends', hook:'500 FRIENDS AND COUNTING!', punch:'THANK YOU SO MUCH!', line:'Psst! We reached FIVE HUNDRED Tiny Talkies friends! I made my biggest smile to say thank you! Ta-daaa!', caption:'500 little reasons to smile. Thank you, Tiny Talkies family! 🥹❤️', question:'You make our days brighter!', tags:['#TinyTalkies','#500Followers','#BabySmiles','#ThankYou']},
  {id:'nap', category:'Funny', title:'Nap Time Negotiations', hook:'WHO NEEDS A NAP?!', punch:'DAD DOES!', line:'Mum said it is nap time. So I put Dad on the sofa with a blanket! He is already snoring. My work here is done!', caption:'She heard “nap time” and tucked Dad in instead! 😂💤', question:'Who needs a nap most in your house?', tags:['#TinyTalkies','#FunnyBaby','#DadHumor','#ParentHumor']},
];

export const CATEGORIES=['All','Funny','Cute','Seasonal','Milestone'];
export function storyById(id){return SCENARIOS.find(x=>x.id===id)||SCENARIOS[0];}
export function chooseStory(category='All', avoid=''){
  const pool=SCENARIOS.filter(s=>(category==='All'||s.category===category)&&s.id!==avoid);
  const available=pool.length?pool:SCENARIOS.filter(s=>category==='All'||s.category===category);
  return available[Math.floor(Math.random()*available.length)] || SCENARIOS[0];
}
export function makePrompt(story, customLine=story.line){
  return `Create ONE heartwarming, photorealistic, family-friendly, funny 10-second vertical video using the uploaded starting image.\n\nKeep exactly ${CHARACTER}. Do not change her face, clothing, bow or background.\n\nShe looks directly into the camera with a cheeky, expressive smile. In a cute natural toddler girl's voice, she says:\n\n"${customLine.trim()}"\n\nShe reacts with a playful raised eyebrow, then gives a delightful, authentic little giggle and smile. Clear English dialogue, realistic lip-sync, warm lighting, stationary camera and gentle natural movements.\n\nOne continuous scene, 10 seconds, 9:16 portrait, with original sound. Only the little girl speaks. No additional characters, background music, subtitles, text, logos or added watermarks.`;
}
export function makeCaption(story, mode='short'){
  const base = `${story.caption}\n\n${story.question}`;
  return mode==='extra-short' ? `${story.caption}\n\n${story.tags.slice(0,3).join(' ')}` : `${base}\n\n${story.tags.join(' ')}`;
}
export function makePinned(story){
  return `😂❤️ ${story.question}\n\nTiny voices, BIG laughs! 🍼💕`;
}
export function makeReplySuggestions(){
  return [
    'Awww, thank you for watching! 🥹❤️',
    '😂 That little expression gets us every time! Thanks for being here! 💕',
    'Sending a big Tiny Talkies smile your way! 👶❤️',
    'Haha! We love that you enjoyed this one! 😂🍼',
    'Your lovely comment made our day. Thank you! ❤️'
  ];
}
export function buildPost(story, opts={}){
  const line=(opts.line||story.line).trim();
  if(line.length<8) throw new Error('Dialogue is too short.');
  return {id:story.id,title:story.title,category:story.category,hook:story.hook,punch:story.punch,line,
    prompt:makePrompt(story,line),caption:makeCaption(story,opts.mode),pinned:makePinned(story),
    meta:{brand:'Tiny Talkies',createdAt:opts.createdAt||new Date().toISOString(),videoSeconds:10,aspectRatio:'9:16',aiGenerated:true,disclosureRequired:true,workflow:'Facebook Page draft'}};
}
export function words(text){return (String(text).trim().match(/\S+/g)||[]).length;}
export function safeFilename(value){return String(value).toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').slice(0,75)||'tiny-talkies';}
export function escapeHtml(input){return String(input).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}