

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

const skObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.sk-item');
      items.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('slide-in');
        }, i * 110);
      });
      skObs.unobserve(entry.target);
    }
  });
}, {threshold: 0.15});
const skList = document.getElementById('sk-list');
if (skList) skObs.observe(skList);

const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('vis')}),{threshold:.1});
document.querySelectorAll('.rev').forEach(el=>obs.observe(el));

(function(){
  var HERO_TEXT = "Specializing in full stack development, I help businesses build fast, scalable, and user-focused digital products that solve real problems, boost revenue, increase user engagement, foster innovation, and drive long-term business growth.";
  var ABOUT_TEXT = "Highly skilled IT professional with solid experience in building and maintaining desktop and web-based enterprise-level applications. Strong background in full-stack development, with hands-on experience supporting ERP systems and enhancing internal business application. Strong problem-solving skills and a passion for continuous learning.";

  function typeWriter(spanId, cursorId, text, speed, startDelay, onDone) {
    var span = document.getElementById(spanId);
    var cursor = document.getElementById(cursorId);
    var idx = 0;
    span.textContent = '';
    if(cursor) cursor.style.visibility = 'visible';
    setTimeout(function() {
      var timer = setInterval(function() {
        if(idx < text.length) {
          span.textContent += text.charAt(idx);
          idx++;
        } else {
          clearInterval(timer);
          if(onDone) onDone();
        }
      }, speed);
    }, startDelay);
  }
 // Hero: start typing after page animations settle
  window.addEventListener('load', function() {
    setTimeout(function() {
      typeWriter('hero-typed', 'hero-cursor', HERO_TEXT, 26, 200);
    }, 600);
  });

  // About: trigger when id-card scrolls into view
  var aboutDone = false;
  var aboutCursor = document.getElementById('about-cursor');
  var aboutCard = document.querySelector('.id-card');
  if(aboutCard) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if(entry.isIntersecting && !aboutDone) {
          aboutDone = true;
          if(aboutCursor) aboutCursor.style.visibility = 'visible';
          typeWriter('about-typed', 'about-cursor', ABOUT_TEXT, 20, 400);
        }
      });
    }, {threshold: 0.25});
    io.observe(aboutCard);
  }
})();

let isDark=true;


window.addEventListener('load',()=>{
  document.querySelectorAll('.sk-icon-img[src*="nextjs"],.proj-icons img[src*="nextjs"],.proj-icons img[src*="vercel"],.proj-icons img[src*="express"]').forEach(img=>{
    
    img.dataset.darkInvert='true';
  });
});

// PROJECT SCROLL CONTAINER
const projContainer = document.getElementById('proj-scroll-container');
const projWrap = document.getElementById('proj-scroll-wrap');
const projHint = document.getElementById('proj-scroll-hint');

if (projContainer) {
  // Set container height dynamically after load to fit exactly 2 rows
  function setProjContainerHeight() {
    const cards = projContainer.querySelectorAll('.proj-card');
    if (cards.length >= 2) {
      const cardH = cards[0].offsetHeight;
      const borderGap = 1;
      projContainer.style.maxHeight = (cardH * 2 + borderGap * 3) + 'px';
    }
  }
  window.addEventListener('load', setProjContainerHeight);
  window.addEventListener('resize', setProjContainerHeight);

  projContainer.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = projContainer;
    const atTop = scrollTop === 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
    projWrap.classList.toggle('at-top', atTop);
    projWrap.classList.toggle('at-bottom', atBottom);
    projWrap.classList.toggle('scrolled', !atTop);
    // hide hint once scrolled
    if (!atTop) projHint.classList.add('hidden');
  });
}

// SCROLL
window.addEventListener('scroll',()=>{
  const s=document.documentElement;
  document.getElementById('prog').style.width=(window.scrollY/(s.scrollHeight-s.clientHeight)*100)+'%';
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);
});

// CHAT
let chatOpen=false,busy=false;
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

Keep responses concise (2-3 sentences). Use technical phrasing. Occasionally prefix key phrases with "> " for terminal feel.`;

const hist=[];
function toggleChat(){chatOpen=!chatOpen;document.getElementById('chat-panel').classList.toggle('open',chatOpen);if(chatOpen){document.querySelector('.chat-notif').style.display='none';setTimeout(()=>document.getElementById('c-inp').focus(),300)}}
function aResize(t){t.style.height='auto';t.style.height=Math.min(t.scrollHeight,110)+'px'}
function hKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg()}}
function sendSugg(btn){document.getElementById('c-inp').value=btn.textContent;document.getElementById('suggs').style.display='none';sendMsg()}
function now(){return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
function addMsg(text,role){
  const w=document.getElementById('c-msgs'),d=document.createElement('div');
  d.className='msg '+role;
  d.innerHTML=`<div class="msg-av">${role==='bot'?'A':'YOU'}</div><div><div class="msg-bub">${text}</div><div class="msg-lbl">${now()}</div></div>`;
  w.appendChild(d);w.scrollTop=w.scrollHeight;
}
function showTyping(){
  const w=document.getElementById('c-msgs'),d=document.createElement('div');
  d.className='msg bot';d.id='typing';
  d.innerHTML=`<div class="msg-av">A</div><div><div class="msg-bub"><div class="typing-bub"><span></span><span></span><span></span></div></div></div>`;
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
    // NOTE: Replace 'YOUR_ANTHROPIC_API_KEY' with your actual key.
    // For production, proxy this through a backend to keep the key secure.
    const ANTHROPIC_KEY = 'YOUR_ANTHROPIC_API_KEY';
    if(ANTHROPIC_KEY === 'YOUR_ANTHROPIC_API_KEY'){
      // Demo mode: simulate a response when no API key is set
      throw new Error('no_key');
    }
    const res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version':'2026-01-01',
        'anthropic-dangerous-direct-browser-access':'true'
      },
      body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:SYS,messages:hist})
    });
    if(!res.ok){const err=await res.json();throw new Error(err.error?.message||'API error '+res.status);}
    const data=await res.json();rmTyping();
    const reply=data.content?.[0]?.text||'Error retrieving response. Try again.';
    hist.push({role:'assistant',content:reply});
    addMsg(reply,'bot');
  }catch(e){
    rmTyping();
    if(e.message==='no_key'){
      // Provide simulated demo responses based on keywords
      const q=txt.toLowerCase();
      let demo='> System ready. Configure ANTHROPIC_API_KEY in the script to enable full AI responses.';
      if(q.includes('stack')||q.includes('tech')||q.includes('skill'))demo='> Tech stack: React, Next.js, Vue.js, Node.js, Laravel, Python, FastAPI, MySQL, PostgreSQL, MongoDB, Docker, AWS. Full-stack specialist with 3+ years.';
      else if(q.includes('project'))demo='> Active projects: E-Commerce Platform, HR Management System, Real-Time Chat App, AI Document Analyzer. All production-grade builds.';
      else if(q.includes('hire')||q.includes('available')||q.includes('freelance'))demo='> Status: AVAILABLE. Open to full-time and freelance opportunities. Direct contact: ronelguimbaoxdev@gmail.com';
      else if(q.includes('contact')||q.includes('email'))demo='> Contact node: ronelguimbaoxdev@gmail.com // Location: Cebu City, Philippines (GMT+8)';
      else if(q.includes('experience'))demo='> 3+ years experience. Current: Software Developer (2023–present). Prior: Junior Web Dev, Freelance. Location: Cebu, Philippines.';
      else if(q.includes('gwapo?'))demo='> Yes of course! Ronel is very gwapo. 😎';
      else if(q.includes('description'))demo='> Average height and build, dark complexion, rugged with a well-kept style appearance.';
      hist.push({role:'assistant',content:demo});
      addMsg(demo,'bot');
    } else {
      addMsg('> Connection error: '+e.message+'. Please try again.','bot');
    }
  }
  finally{busy=false;document.getElementById('c-send').disabled=false;}
}

const PROJECTS = [
  {
    title: 'E-Commerce Platform',
    images: [
      { src: 'assets/img/proj/proj1-img1.png', caption: 'Product Catalog — Homepage' },
      { src: 'assets/img/proj/proj1-img2.png', caption: 'Shopping Cart & Ordering' },
      { src: 'assets/img/proj/proj1-img4.png', caption: 'Frame Builder' },
    ],
    
  },
  {
    title: 'Enterprise Resource Planning (ERP) System',
    images: [
      { src: 'assets/img/proj/proj2-img1.png', caption: 'Dashboard' },
      { src: 'assets/img/proj/proj2-img2.png', caption: 'Customer Management' },
      { src: 'assets/img/proj/proj2-img3.png', caption: 'Production Management' },
      { src: 'assets/img/proj/proj2-img4.png', caption: 'Automated Price Calculation' },
    ],
    
  },
  {
    title: 'Plastic Injection Monitoring Dashboard',
    images: [
     { src: 'assets/img/proj/proj3-img1.jpg', caption: 'Robotics Machine Overview' },
      { src: 'assets/img/proj/proj3-img2.jpg', caption: 'Production Line Monitoring' },
    ],
   
  },
  {
    title: 'Floww Cash and Budgeting App',
    images: [
      { src: 'assets/img/proj/proj4-img1.png', caption: 'Landing Page' },
      { src: 'assets/img/proj/proj4-img2.png', caption: 'Dashboard' },
      { src: 'assets/img/proj/proj4-img3.png', caption: 'Settings' },
    ],
  },
  {
    title: 'EMR Healthcare Software',
    images: [
      { src: 'assets/img/proj/proj5-img1.webp', caption: 'Landing Page' },
      { src: 'assets/img/proj/proj5-img2.webp', caption: 'Dashboard' },
      { src: 'assets/img/proj/proj5-img3.webp', caption: 'Settings' },
    ],
  },
  {
    title: 'Stocks Trading Forum Platform',
    images: [
      { src: 'assets/img/proj/proj6-img1.png', caption: 'Landing Page' },
      { src: 'assets/img/proj/proj6-img2.png', caption: 'Dashboard' },
      { src: 'assets/img/proj/proj6-img3.png', caption: 'Settings' },
    ],
  }

];

let activeProj = 0;
let slideIdx   = 0;
let activeTab  = 'img';

function openModal(projIdx) {
  activeProj = projIdx;
  slideIdx   = 0;
  const proj = PROJECTS[projIdx];

  // Set title
  document.getElementById('modal-proj-title').textContent = proj.title;

  // Build image slider
  buildSlider(proj.images);



  // Open
  document.getElementById('proj-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('proj-modal').classList.remove('open');
  document.body.style.overflow = '';
  
}

function buildSlider(images) {
  const track = document.getElementById('img-slider-track');
  const dots  = document.getElementById('slide-dots');
  const strip = document.getElementById('thumb-strip');

  track.innerHTML = images.map((img, i) =>
    `<div class="slide">
      <img src="${img.src}" alt="${img.caption}" loading="lazy"/>
      <div class="slide-overlay">${img.caption}</div>
    </div>`
  ).join('');

  dots.innerHTML = images.map((_, i) =>
    `<div class="sl-dot${i===0?' active':''}" onclick="goSlide(${i})"></div>`
  ).join('');

  strip.innerHTML = images.map((img, i) =>
    `<img class="thumb${i===0?' active':''}" src="${img.src}" alt="${img.caption}" onclick="goSlide(${i})" loading="lazy"/>`
  ).join('');

  updateCounter(images.length);
  updateSlider();
}

function buildVideosHTML(videos) {
  return `<div class="vid-grid">${videos.map(v =>
    `<div class="vid-card">
      <div class="vid-thumb-wrap">
        <img class="vid-thumb-img" src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg" alt="${v.title}"/>
        <div class="vid-placeholder" id="vph-${v.id}" onclick="playVideo(this,'${v.id}')">
          <div class="vid-play-btn">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      </div>
      <div class="vid-info">
        <div class="vid-title">${v.title}</div>
        <div class="vid-meta">${v.meta}</div>
      </div>
    </div>`
  ).join('')}</div>`;
}

function buildVideos(videos) {
  document.getElementById('modal-video-pane').innerHTML = buildVideosHTML(videos);
}

function playVideo(placeholder, videoId) {
  const wrap = placeholder.parentElement;
  placeholder.classList.add('hidden');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none';
  wrap.appendChild(iframe);
}

function slideMove(dir) {
  const total = PROJECTS[activeProj].images.length;
  slideIdx = (slideIdx + dir + total) % total;
  updateSlider();
}

function goSlide(idx) {
  slideIdx = idx;
  updateSlider();
}

function updateSlider() {
  document.getElementById('img-slider-track').style.transform = `translateX(-${slideIdx * 100}%)`;
  // Dots
  document.querySelectorAll('.sl-dot').forEach((d,i) => d.classList.toggle('active', i===slideIdx));
  // Thumbs
  document.querySelectorAll('.thumb').forEach((t,i) => t.classList.toggle('active', i===slideIdx));
  // Counter
  updateCounter(PROJECTS[activeProj].images.length);
}

function updateCounter(total) {
  document.getElementById('slide-counter').textContent = `${slideIdx+1} / ${total}`;
}

function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.modal-pane').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  if (tab === 'img') {
    document.getElementById('modal-img-pane').classList.add('active');
  } else {
    document.getElementById('modal-video-pane').classList.add('active');
  }
}

// Close on backdrop click
document.getElementById('proj-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft'  && document.getElementById('proj-modal').classList.contains('open')) slideMove(-1);
  if (e.key === 'ArrowRight' && document.getElementById('proj-modal').classList.contains('open')) slideMove(1);
});

// ══ HERO FLOATING CODE ELEMENTS ══
(function(){
  const layer = document.getElementById('hero-float-layer');
  if(!layer) return;

  const tokens = [
    'const','let','var','function()','return','if (x)','else','for (i)','while','class',
    'import','export default','async','await','try {}','catch (e)','new','this','super','null',
    'true','false','undefined','typeof x','=>','{ }','[ ]','( )','++','--','===','!==',
    '&&','||','??','?.','npm i','git push','git pull','fetch()','render()','useState()',
    'useEffect()','props','state','REST API','JSON.parse','SQL','SELECT *','WHERE id',
    'Promise','resolve','reject','.map()','filter()','reduce()','.then()','console.log()',
    'require()','module.exports','async/await','@keyframes','z-index','display:flex',
    'npm run dev','git commit','docker run','localhost:3000','200 OK','404','POST /api',
    'schema.prisma','migrate','seed','BUILD OK','LINTING...','COMPILED','PORT 8080',
    '0xFF','0b1010','Math.random()','Array.from','Object.keys','JSON.stringify',
    '<App />','<div>','</div>','<React.Fragment>','styled.div','tailwind','@apply',
  ];

  const hero = document.getElementById('home');
  const W = () => hero.offsetWidth;
  const H = () => hero.offsetHeight;

  // Safe zones to avoid central text cluster
  function getPos(){
    const zones = [
      // left strip
      {xl:0.02, xr:0.22, yt:0.04, yb:0.96},
      // right strip
      {xl:0.78, xr:0.98, yt:0.04, yb:0.96},
      // top band
      {xl:0.22, xr:0.78, yt:0.03, yb:0.18},
      // bottom band
      {xl:0.22, xr:0.78, yt:0.82, yb:0.97},
    ];
    const z = zones[Math.floor(Math.random() * zones.length)];
    return {
      x: (z.xl + Math.random() * (z.xr - z.xl)) * W(),
      y: (z.yt + Math.random() * (z.yb - z.yt)) * H(),
    };
  }

  function spawn(){
    const el = document.createElement('div');
    el.className = 'hfc';
    el.textContent = tokens[Math.floor(Math.random() * tokens.length)];

    const pos = getPos();
    const dur = 5 + Math.random() * 9;
    const delay = Math.random() * 3;
    const peak = (0.18 + Math.random() * 0.32).toFixed(2);

    el.style.cssText = `
      left:${pos.x}px;top:${pos.y}px;
      --dur:${dur.toFixed(1)}s;--delay:${delay.toFixed(2)}s;--peak:${peak};
      font-size:${(.62 + Math.random()*.24).toFixed(2)}rem;
    `;

    layer.appendChild(el);

    // clean up after 2 full cycles
    setTimeout(() => el.remove(), (dur * 2 + delay) * 1000 + 2000);
  }

  // Initial burst — staggered over 4s
  for(let i = 0; i < 42; i++){
    setTimeout(spawn, Math.random() * 6000);
  }

  // Continuous drip — add a new token every 600-1400ms
  setInterval(spawn, 800 + Math.random() * 1200);
})();

