/* Signal — behavior for rachitjaiswal.com. Every module checks for its markup, so one file serves all pages. */
(function(){
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const STEP = 140;

/* Harmonograph geometry: two decaying rotary oscillations drawn against each other.
   x = e^(-dt) sin(f1 t) + e^(-1.3dt) sin(f2' t + ph)
   y = e^(-dt) sin(f1 t + pi/2) + e^(-1.3dt) sin(f2' t + ph + s*pi/2)
   s = -1: the pendulums turn in opposite directions (rosettes); s = +1: same direction (spirals). */
const PRESETS=[
  {f1:1,f2:2,s:-1,label:'1 : 2, opposed'},
  {f1:1,f2:3,s:-1,label:'1 : 3, opposed'},
  {f1:2,f2:3,s:-1,label:'2 : 3, opposed'},
  {f1:2,f2:5,s:-1,label:'2 : 5, opposed'},
  {f1:3,f2:4,s:-1,label:'3 : 4, opposed'},
  {f1:2,f2:3,s:1, label:'2 : 3, same direction'}
];
function harmo(p,size,{n=6000,T=260,d=.0045,det=.006,ph=.8,damp=true}={}){
  const out=[], c=size/2, k=size/4.15;
  for(let i=0;i<n;i++){
    const t=T*i/(n-1), e=damp?Math.exp(-d*t):1, e2=damp?Math.exp(-d*1.3*t):1, f2=p.f2+(damp?det:0);
    const x=e*Math.sin(p.f1*t)+e2*Math.sin(f2*t+ph);
    const y=e*Math.sin(p.f1*t+Math.PI/2)+e2*Math.sin(f2*t+ph+p.s*Math.PI/2);
    out.push([c+x*k,c+y*k]);
  }
  return out;
}
const toD=p=>'M'+p.map(q=>q.map(v=>v.toFixed(2)).join(' ')).join('L');
const easeIO=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;

/* 1. Hero figure: the line draws itself with a signal head; arrows step through ratios */
const fig=document.querySelector('[data-harmonograph]');
if(fig){
  const path=fig.querySelector('.curve-path'), heads=fig.querySelectorAll('.curve-head,.curve-halo');
  const prev=fig.querySelector('[data-prev]'), next=fig.querySelector('[data-next]'), out=fig.querySelector('output');
  let idx=Math.max(0,Math.min(PRESETS.length-1,+fig.dataset.harmonograph||0)), raf=0;
  const draw=animate=>{
    cancelAnimationFrame(raf);
    const P=PRESETS[idx];
    path.setAttribute('d',toD(harmo(P,512)));
    const L=path.getTotalLength(); path.style.strokeDasharray=L;
    out.textContent=`ratio ${P.label}`;
    const place=f=>{path.style.strokeDashoffset=L*(1-f);const q=path.getPointAtLength(L*f);heads.forEach(c=>{c.setAttribute('cx',q.x);c.setAttribute('cy',q.y)})};
    if(!animate||reduce){place(1);return}
    const t0=performance.now(), dur=2800;
    const step=now=>{const t=Math.min(1,(now-t0)/dur);place(easeIO(t));if(t<1)raf=requestAnimationFrame(step)};
    raf=requestAnimationFrame(step);
  };
  prev.onclick=()=>{idx=(idx-1+PRESETS.length)%PRESETS.length;draw(true)};
  next.onclick=()=>{idx=(idx+1)%PRESETS.length;draw(true)};
  draw(true);
}

/* 2. Scroll tracker: the undamped 2:3 figure (same as the logo) fills as the page scrolls */
const tr=document.querySelector('.tracker');
if(tr){
  const base=tr.querySelector('.base'), done=tr.querySelector('.done'), dot=tr.querySelector('circle');
  const d=toD(harmo(PRESETS[2],32,{n:240,T:2*Math.PI,damp:false})); base.setAttribute('d',d); done.setAttribute('d',d);
  const L=base.getTotalLength(); done.style.strokeDasharray=L;
  let ticking=false;
  const upd=()=>{ticking=false;const max=document.documentElement.scrollHeight-innerHeight;const f=max>0?Math.min(1,Math.max(0,scrollY/max)):0;
    const q=base.getPointAtLength(f*L);dot.setAttribute('cx',q.x);dot.setAttribute('cy',q.y);done.style.strokeDashoffset=L*(1-f)};
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(upd)}},{passive:true});
  addEventListener('resize',upd); upd();
}

/* 2b. Cover (home only): a Peter de Jong attractor that morphs along a closed loop in parameter space.
   x' = sin(a y) - cos(b x),  y' = sin(c x) - cos(d y)   (each point comes from the previous one)
   The loop below was searched offline so the map stays chaotic almost everywhere along it; the rare
   collapses are skipped by speeding up. Ink/dust density decays slowly; regions that are newly forming
   glow violet. As the page scrolls, the white sheet slides up over the cover. */
const cover=document.querySelector('[data-cover]');
if(cover){
  const cv=cover.querySelector('canvas'), ctx=cv.getContext('2d',{alpha:false});
  const head=document.querySelector('.site-head'), trk=document.querySelector('.tracker');
  const eq=cover.querySelector('[data-eq]'), pauseBtn=cover.querySelector('[data-pause]');
  const CEN=[2.017,-2.324,1.049,-2.277], AMP=[0.342,0.336,0.346,0.574], PH=[2.213,0.114,0.693,4.708];
  const params=t=>CEN.map((c,i)=>c+AMP[i]*Math.sin(2*Math.PI*t+PH[i]));
  const PERIOD=110; // seconds per loop
  const INK=[23,24,31], DUST=[228,230,238], VIO=[185,166,255];
  let S=0,img,u32,body,fresh,stamp,stampId=1,N=36000,K1=.1;
  let x=.1,y=.1,t=Math.random(),last=0,raf=0,paused=reduce,visible=true,slowFrames=0,eqT=0;
  function setup(){
    const r=cv.getBoundingClientRect(); const cap=innerWidth<700?560:900;
    const s=Math.max(240,Math.min(Math.round(r.width*Math.min(devicePixelRatio||1,2)),cap));
    if(s===S)return; S=s; cv.width=cv.height=S;
    img=ctx.createImageData(S,S); u32=new Uint32Array(img.data.buffer);
    body=new Float32Array(S*S); fresh=new Float32Array(S*S); stamp=new Uint32Array(S*S);
    N=Math.round(36000*(S*S)/(860*860)); K1=.1*(36000/(860*860))/(N/(S*S));
  }
  function iterate(n,[a,b,c,d]){
    const k=S/4.4; let distinct=0; stampId++;
    for(let i=0;i<n;i++){
      const nx=Math.sin(a*y)-Math.cos(b*x), ny=Math.sin(c*x)-Math.cos(d*y); x=nx; y=ny;
      const px=((x+2.2)*k)|0, py=((y+2.2)*k)|0;
      if(px<0||py<0||px>=S||py>=S)continue;
      const j=py*S+px; body[j]+=1; fresh[j]+=1;
      if(stamp[j]!==stampId){stamp[j]=stampId;distinct++}
    }
    return distinct;
  }
  function paint(decayBody,decayFresh){
    const n=S*S;
    for(let j=0;j<n;j++){
      const v=body[j];
      if(v<.002){u32[j]=0xff1f1817;body[j]=0;fresh[j]=0;continue} // ink #17181f, little-endian ABGR
      const f=fresh[j], a1=v*K1/(1+v*K1);
      let r=INK[0]+(DUST[0]-INK[0])*a1, g=INK[1]+(DUST[1]-INK[1])*a1, bl=INK[2]+(DUST[2]-INK[2])*a1;
      let nn=(f/v-.3)*2.2, nd=(a1-.6)*2.4; nn=nn<0?0:nn>1?1:nn; nd=nd<0?0:nd>1?1:nd;
      const nw=(nn>nd*.85?nn:nd*.85)*a1;
      r+=(VIO[0]-r)*nw; g+=(VIO[1]-g)*nw; bl+=(VIO[2]-bl)*nw;
      u32[j]=0xff000000|((bl|0)<<16)|((g|0)<<8)|(r|0);
      body[j]=v*decayBody; fresh[j]=f*decayFresh;
    }
    ctx.putImageData(img,0,0);
  }
  function showEq(p){
    if(!eq)return; const f=v=>(v<0?'−':'')+Math.abs(v).toFixed(2);
    eq.textContent=`a ${f(p[0])}   b ${f(p[1])}   c ${f(p[2])}   d ${f(p[3])}`;
  }
  function frame(now){
    raf=0; if(paused||!visible)return;
    const dt=last?Math.min(.05,(now-last)/1000):.016; last=now;
    const p=params(t), t0=performance.now();
    const distinct=iterate(N,p);
    t=(t+dt/PERIOD*(distinct<S*S*.003?8:1))%1;
    paint(.965,.84);
    if(now-eqT>200){eqT=now;showEq(p)}
    // adapt to slow devices: fewer points per frame
    if(performance.now()-t0>22){if(++slowFrames>20&&N>8000){N=Math.round(N*.75);slowFrames=0}}else slowFrames=0;
    raf=requestAnimationFrame(frame);
  }
  function start(){if(!raf&&!paused&&visible){last=0;raf=requestAnimationFrame(frame)}}
  function still(){ // reduced motion or paused-at-load: one fully developed frame
    const p=params(t); for(let k=0;k<30;k++)iterate(N,p); paint(1,0); showEq(p);
  }
  setup();
  if(reduce)still(); else start();
  if(pauseBtn){
    if(reduce)pauseBtn.hidden=true;
    pauseBtn.addEventListener('click',()=>{paused=!paused;pauseBtn.setAttribute('aria-pressed',paused);
      pauseBtn.setAttribute('aria-label',paused?'Play background animation':'Pause background animation');
      pauseBtn.querySelector('span').textContent=paused?'Play':'Pause'; if(!paused)start()});
  }
  let rt; addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{const old=S;setup();if(S!==old&&(paused||reduce))still()},150)});
  // scroll: sheet slides over the cover; header and tracker switch modes
  let tk=false;
  const onScroll=()=>{tk=false;const h=cover.offsetHeight, p=Math.min(1,Math.max(0,scrollY/h));
    if(!reduce)cover.style.setProperty('--p',p.toFixed(3));
    const on=scrollY<h-(head?head.offsetHeight:0); if(head)head.classList.toggle('on-cover',on); if(trk)trk.classList.toggle('off',on);
    const vis=p<1; if(vis!==visible){visible=vis; if(vis)start()}};
  addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(onScroll)}},{passive:true}); onScroll();
}

/* 3. Flow diagrams (project pages only): stages are tabs; selection propagates stage by stage */
document.querySelectorAll('[data-flow]').forEach(box=>{
  const S=JSON.parse(document.getElementById(box.dataset.flow).textContent);
  const id=box.dataset.flow, ol=box.querySelector('.stages'), note=box.querySelector('.note');
  ol.innerHTML=S.map((s,i)=>`<li role="presentation">${i?'<span class="wire" aria-hidden="true"></span>':''}<button class="stage" type="button" role="tab" id="${id}-s${i}" aria-selected="false" tabindex="-1" aria-controls="${id}-n"><span class="k">${s.k}</span><span class="v">${s.v}</span></button></li>`).join('');
  note.id=id+'-n';
  const tabs=[...ol.querySelectorAll('.stage')], wires=[...ol.querySelectorAll('.wire')];
  let cur=-1, timers=[];
  const stop=()=>{timers.forEach(clearTimeout);timers=[]};
  function sel(i,{focus=false,quiet=false}={}){
    const prev=cur<0?0:cur, fwd=i>=prev;
    tabs.forEach((t,j)=>{
      const was=t.classList.contains('passed')||t.getAttribute('aria-selected')==='true';
      const will=j<=i;
      const delay=reduce?0:(fwd?Math.max(0,j-prev):Math.max(0,prev-j))*STEP;
      t.style.setProperty('--d',was!==will?delay+'ms':'0ms');
      t.setAttribute('aria-selected',j===i); t.tabIndex=j===i?0:-1; t.classList.toggle('passed',j<i);
    });
    wires.forEach((w,j)=>{const delay=reduce?0:(fwd?Math.max(0,j-prev):Math.max(0,prev-j-1))*STEP;w.style.setProperty('--d',delay+'ms');w.classList.toggle('lit',j<i)});
    cur=i; note.setAttribute('aria-labelledby',tabs[i].id);
    note.innerHTML=`<p>${S[i].t}</p>${S[i].tools?`<p class="tools">${S[i].tools}</p>`:''}`;
    if(!quiet&&!reduce){note.classList.remove('swap');void note.offsetWidth;note.classList.add('swap')}
    if(focus)tabs[i].focus();
  }
  function sweep(){ // the signal passes through every stage once, then rests on the first
    stop(); sel(0,{quiet:true}); if(reduce)return;
    timers.push(setTimeout(()=>sel(S.length-1),250));
    timers.push(setTimeout(()=>sel(0),250+S.length*STEP+1100));
  }
  tabs.forEach((t,i)=>{
    t.addEventListener('click',()=>{stop();sel(i)});
    t.addEventListener('keydown',e=>{
      const m={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];
      if(m){e.preventDefault();stop();sel((i+m+tabs.length)%tabs.length,{focus:true})}
      if(e.key==='Home'){e.preventDefault();stop();sel(0,{focus:true})}
      if(e.key==='End'){e.preventDefault();stop();sel(tabs.length-1,{focus:true})}
    });
  });
  const rp=box.querySelector('.replay'); if(rp)rp.onclick=sweep;
  sel(0,{quiet:true});
  if(!reduce&&'IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();sweep()}},{threshold:.5});
    io.observe(box);
  }
});

/* 4. Notebook: filters, year index, progress spine */
const nb=document.querySelector('[data-notebook]');
if(nb){
  const entries=[...nb.querySelectorAll('.entry')], groups=[...nb.querySelectorAll('.yr-group')];
  const btns=[...document.querySelectorAll('.filters button')], count=document.querySelector('.count');
  const yearLinks=[...document.querySelectorAll('.years a')], log=nb.querySelector('.log');
  const empty=nb.querySelector('.empty-msg');
  function apply(kind){
    btns.forEach(b=>b.setAttribute('aria-pressed',b.dataset.kind===kind));
    let n=0;
    entries.forEach(e=>{const show=kind==='all'||e.dataset.kind.split(' ').includes(kind);e.hidden=!show;if(show)n++});
    groups.forEach(g=>{const any=[...g.querySelectorAll('.entry')].some(e=>!e.hidden);g.hidden=!any;
      const link=yearLinks.find(a=>a.getAttribute('href')==='#'+g.id); if(link)link.parentElement.hidden=!any});
    count.textContent=`${n} ${n===1?'entry':'entries'}`;
    if(empty)empty.hidden=n>0;
    if(!reduce)entries.filter(e=>!e.hidden).forEach((e,i)=>{e.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:320,delay:Math.min(i,8)*30,easing:'cubic-bezier(.22,.7,.2,1)',fill:'backwards'})});
    const u=new URL(location); if(kind==='all')u.searchParams.delete('filter'); else u.searchParams.set('filter',kind); history.replaceState(null,'',u);
    spine();
  }
  btns.forEach(b=>b.addEventListener('click',()=>apply(b.dataset.kind)));
  const start=new URL(location).searchParams.get('filter');
  apply(btns.some(b=>b.dataset.kind===start)?start:'all');

  function spine(){const r=log.getBoundingClientRect();const p=Math.min(1,Math.max(0,(innerHeight*.5-r.top)/r.height));log.style.setProperty('--p',p.toFixed(4))}
  let tk=false; addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(()=>{tk=false;spine()})}},{passive:true}); spine();

  const yio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){yearLinks.forEach(a=>a.setAttribute('aria-current',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-30% 0px -60% 0px'});
  groups.forEach(g=>yio.observe(g));
}
})();
