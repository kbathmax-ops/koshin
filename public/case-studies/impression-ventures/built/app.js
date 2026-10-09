(() => {
'use strict';
document.documentElement.classList.add('js');
const header=document.querySelector('#site-header'),menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#primary-nav');
const closeMenu=(focus=false)=>{header.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');if(focus)menu.focus();};
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));header.classList.toggle('menu-open',open);if(open)nav.querySelector('a').focus();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&header.classList.contains('menu-open'))closeMenu(true);});
document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu();});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
window.addEventListener('resize',()=>closeMenu());
const word=document.querySelector('.wordmark'),mark=document.querySelector('.brand-mark'),panel=document.querySelector('.intro-panel'),field=document.querySelector('.intro-field'),surface=document.querySelector('.header-surface'),skip=document.querySelector('.skip-intro'),intro=document.querySelector('.intro-space');
const entranceMotion=matchMedia('(prefers-reduced-motion: reduce)'),navLinks=[...nav.querySelectorAll('a')];let geometry,pending=false;
const clamp=n=>Math.max(0,Math.min(1,n)),mix=(a,b,t)=>a+(b-a)*t;
const place=(el,x,y,s)=>el.style.transform=`translate3d(${x}px,${y}px,0) scale(${s})`;
function measureEntrance(){
 const w=document.documentElement.clientWidth,h=intro.offsetHeight||innerHeight,mobile=w<1100,pad=w<760?24:w*.05;
 const scale=Math.min((w<760?w*.59:w*.46)/word.offsetWidth,Math.min(innerHeight,900)*.20/word.offsetHeight);
 document.documentElement.style.setProperty('--intro-height',`${h}px`);
 const panelTop=88,panelBottom=w<760?14:20,navHeight=navLinks[0].offsetHeight*(w<480?.87:1.22),compositionHeight=100+word.offsetHeight*scale+20+42+navHeight;
 const centeredWordY=panelTop+(h-panelTop-panelBottom-compositionHeight)/2+100;
 const startWord={x:(w-word.offsetWidth*scale)/2,y:centeredWordY,s:scale};
 const endScale=(w<480?23:27)/100,markSize=w<480?31:42;
 const widths=navLinks.map(a=>a.offsetWidth),startScale=w<480?.87:1.22,gap=w<480?22:40,starts=[];
 [[0,1,2],[3,4]].forEach((ids,row)=>{let x=(w-ids.reduce((v,i)=>v+widths[i]*startScale,0)-gap*(ids.length-1))/2;ids.forEach(i=>{starts[i]={x,y:startWord.y+word.offsetHeight*scale+20+row*42,s:startScale};x+=widths[i]*startScale+gap;});});
 let x=w-pad-175-widths.reduce((v,n)=>v+n*(16/18),0)-28*4;
 const ends=widths.map(width=>{const e={x,y:38,s:16/18};x+=width*(16/18)+28;return e;});
 if(mobile)ends[0]={x:w-pad-(w<480?145:175),y:38,s:16/18};
 geometry={w,h,mobile,pad,startWord,endScale,markSize,starts,ends};renderEntrance();
}
function renderEntrance(){
 pending=false;if(!geometry)return;
 const {w,h,mobile,pad,startWord,endScale,markSize,starts,ends}=geometry,p=entranceMotion.matches?1:clamp(scrollY/(h*.8)),t=p*p*(3-2*p),open=header.classList.contains('menu-open');
 const brandX=mix(startWord.x,pad+markSize+12,t),brandY=mix(startWord.y,25,t),wordScale=mix(startWord.s,endScale,t),brand=document.querySelector('.brand');
 place(brand,brandX,brandY,1);brand.style.width=`${word.offsetWidth*wordScale}px`;brand.style.height=`${word.offsetHeight*wordScale}px`;
 place(word,0,0,wordScale);
 place(mark,mix((w-70)/2,pad,t)-brandX,mix(startWord.y-100,26,t)-brandY,mix(.7,markSize/100,t));
 field.style.opacity=1-t;panel.style.opacity=1-t;document.querySelector('.intro-art').style.opacity=1-t;panel.style.transform=`translateY(${-80*t}px) scaleY(${1-t*.95})`;surface.style.opacity=t;
 skip.style.opacity=1-t;skip.style.visibility=p>.9?'hidden':'visible';const investor=document.querySelector('.utility a:last-child');investor.style.visibility=mobile&&p>.7?'hidden':'visible';
 navLinks.forEach((a,i)=>{const hidden=mobile&&i>0&&p>.7&&!open;a.style.visibility=hidden?'hidden':'visible';a.tabIndex=hidden?-1:0;a.style.opacity=mobile&&i>0&&!open?1-clamp((p-.35)/.35):1;if(!open)place(a,mix(starts[i].x,ends[i].x,t),mix(starts[i].y,ends[i].y,t),mix(starts[i].s,ends[i].s,t));});
 menu.style.display=mobile&&p>.9?'block':'none';
 document.querySelector('.hero-art').style.opacity=clamp((p-.35)/.65);

}
window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(renderEntrance);}},{passive:true});
window.addEventListener('resize',measureEntrance);window.addEventListener('pageshow',measureEntrance);entranceMotion.addEventListener('change',measureEntrance);document.fonts.ready.then(measureEntrance);measureEntrance();
menu.addEventListener('click',renderEntrance);document.addEventListener('keydown',()=>requestAnimationFrame(renderEntrance));document.addEventListener('click',()=>requestAnimationFrame(renderEntrance));
document.querySelectorAll('a[href="#main"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();closeMenu();window.scrollTo({top:Math.max(0,document.querySelector('#main').offsetTop-100),behavior:'instant'});document.querySelector('#main').focus({preventScroll:true});renderEntrance();}));
const portfolio=document.querySelector('.portfolio'),track=document.querySelector('#portfolio-track'),group=track.querySelector('.portfolio-group'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const duplicate=group.cloneNode(true);duplicate.setAttribute('aria-hidden','true');duplicate.querySelectorAll('a').forEach(a=>a.tabIndex=-1);duplicate.querySelectorAll('img').forEach(i=>i.alt='');track.append(duplicate);
// Keep keyboard-focused portfolio links in view instead of in a moving track.
group.addEventListener('focusin',()=>{track.style.animation='none';});portfolio.addEventListener('focusout',e=>{if(!portfolio.contains(e.relatedTarget)){track.style.animation='';}});
const slides=[...document.querySelectorAll('.review')],count=document.querySelector('#review-count');let current=0;
function show(index){current=(index+slides.length)%slides.length;slides.forEach((slide,i)=>slide.hidden=i!==current);count.textContent=`${current+1} / ${slides.length}`;}
document.querySelector('#review-prev').addEventListener('click',()=>show(current-1));document.querySelector('#review-next').addEventListener('click',()=>show(current+1));show(0);
document.querySelector('.reviews').addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();show(current-1);}});
document.querySelector('.skip-link').addEventListener('click',()=>{document.querySelector('#main').focus({preventScroll:true});});
document.querySelector('#year').textContent=new Date().getFullYear();
})();
