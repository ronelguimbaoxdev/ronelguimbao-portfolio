

const cur=document.getElementById('cur'),curR=document.getElementById('cur-r');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function a(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;cur.style.cssText=`left:${mx}px;top:${my}px;transform:translate(-50%,-50%)`;curR.style.cssText=`left:${rx}px;top:${ry}px;transform:translate(-50%,-50%)`;requestAnimationFrame(a)})();
document.querySelectorAll('a,button,.sk-card,.proj-card,.sugg,.exp-item').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(3)';curR.style.transform='translate(-50%,-50%) scale(1.5)'});
  el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';curR.style.transform='translate(-50%,-50%) scale(1)'});
});

window.addEventListener('scroll',()=>{
  const s=document.documentElement;
  document.getElementById('prog').style.width=(window.scrollY/(s.scrollHeight-s.clientHeight)*100)+'%';
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);
  
  const sections=['home','about','experience','skills','projects','contact'];
  let cur='home';
  sections.forEach(id=>{const el=document.getElementById(id);if(el&&window.scrollY>=el.offsetTop-250)cur=id});
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')==='#'+cur);
  });
});


const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('vis')}),{threshold:.1});
document.querySelectorAll('.rev').forEach(el=>obs.observe(el));



let isDark=true;


window.addEventListener('load',()=>{
  document.querySelectorAll('.sk-icon-img[src*="nextjs"],.proj-icons img[src*="nextjs"],.proj-icons img[src*="vercel"],.proj-icons img[src*="express"]').forEach(img=>{
    
    img.dataset.darkInvert='true';
  });
});


let open=false,busy=false;
const SYS=`You are an AI assistant for Ronel Guimbao's portfolio website. Answer questions about Ronel concisely and professionally with a slightly technical, terminal-like tone.

Facts about Ronel:
- Full Name: Ronel Guimbao
- Role: Software Developer (Full Stack)
- Location: Cebu City, Philippines (GMT+8)
- Experience: 3+ years
- Skills: JavaScript, TypeScript, React, Vue.js, Next.js, Node.js, PHP, Laravel, Python, FastAPI, MySQL, PostgreSQL, MongoDB, Redis, Docker, AWS, React Native, Git, Claude API
- Projects: E-Commerce Platform (React/Node/MySQL/Stripe), HR Management System (Laravel/Vue/PostgreSQL), Real-Time Chat App (React/Socket.io/MongoDB), AI Document Analyzer (Next.js/Claude API)
- Work history: Software Developer 2023-present, Junior Web Developer 2022-2023, Freelance Developer 2021-2022
- Available: Yes, open to full-time and freelance opportunities
- Contact: ronel.guimbao@email.com
- Philosophy: System precision, performance-first, security-native

Keep responses concise (2-3 sentences). Use technical phrasing. Occasionally prefix key info with "> " for terminal feel.`;

const hist=[];
function toggleChat(){
  open=!open;
  document.getElementById('chat-panel').classList.toggle('open',open);
  if(open){document.querySelector('.chat-notif').style.display='none';setTimeout(()=>document.getElementById('c-inp').focus(),300)}
}
function aResize(t){t.style.height='auto';t.style.height=Math.min(t.scrollHeight,108)+'px'}
function hKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg()}}
function sendSugg(btn){document.getElementById('c-inp').value=btn.textContent;document.getElementById('suggs').style.display='none';sendMsg()}
function nowT(){return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
function addMsg(text,role){
  const w=document.getElementById('c-msgs'),d=document.createElement('div');
  d.className='msg '+role;
  d.innerHTML=`<div class="msg-av">${role==='bot'?'AI':'YOU'}</div><div><div class="msg-bub">${text}</div><div class="msg-lbl">${nowT()}</div></div>`;
  w.appendChild(d);w.scrollTop=w.scrollHeight;
}
function showTyping(){
  const w=document.getElementById('c-msgs'),d=document.createElement('div');
  d.className='msg bot';d.id='typing';
  d.innerHTML=`<div class="msg-av">AI</div><div><div class="msg-bub"><div class="typing-bub"><span></span><span></span><span></span></div></div></div>`;
  w.appendChild(d);w.scrollTop=w.scrollHeight;
}
function rmTyping(){const t=document.getElementById('typing');if(t)t.remove()}
async function sendMsg(){
  if(busy)return;
  const inp=document.getElementById('c-inp'),txt=inp.value.trim();
  if(!txt)return;
  inp.value='';inp.style.height='auto';
  document.getElementById('c-send').disabled=true;
  busy=true;hist.push({role:'user',content:txt});
  addMsg(txt,'user');showTyping();
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:SYS,messages:hist})
    });
    const data=await res.json();rmTyping();
    const reply=data.content?.[0]?.text||'Error retrieving response. Try again.';
    hist.push({role:'assistant',content:reply});addMsg(reply,'bot');
  }catch(e){rmTyping();addMsg('> Connection error. Please retry.','bot')}
  busy=false;document.getElementById('c-send').disabled=false;
}
