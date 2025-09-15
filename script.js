// script.js — modal, nav toggle, smooth scroll, reveal animations, demo spin
document.addEventListener('DOMContentLoaded', () => {
  // elements
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const ctaTop = document.getElementById('ctaTop');
  const openJoin1 = document.getElementById('openJoin1');
  const openJoin2 = document.getElementById('openJoin2');
  const openJoinBtns = [ctaTop, openJoin1, openJoin2].filter(Boolean);
  const joinModal = document.getElementById('joinModal');
  const closeModal = document.getElementById('closeModal');
  const cancelJoin = document.getElementById('cancelJoin');
  const joinForm = document.getElementById('joinForm');
  const yearEl = document.getElementById('year');
  const spinBtn = document.getElementById('spinBtn');
  const spinDisplay = document.getElementById('spinDisplay');

  yearEl && (yearEl.textContent = new Date().getFullYear());

  // mobile nav toggle
  burger && burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.classList.toggle('open');
  });

  // open modal
  function showModal(){ joinModal && joinModal.setAttribute('aria-hidden', 'false'); document.body.style.overflow='hidden'; }
  function hideModal(){ joinModal && joinModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow='auto'; }

  openJoinBtns.forEach(b => b && b.addEventListener('click', (e) => { e.preventDefault(); showModal(); }));

  closeModal && closeModal.addEventListener('click', hideModal);
  cancelJoin && cancelJoin.addEventListener('click', hideModal);

  // demo join form
  joinForm && joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(joinForm);
    const name = fd.get('name'), phone = fd.get('phone');
    if(!name || !phone){ alert('Please fill name and phone'); return; }
    // store demo
    const apps = JSON.parse(localStorage.getItem('gg_apps')||'[]');
    apps.push({name,phone,city:fd.get('city'),ref:fd.get('referrer'),ts:Date.now()});
    localStorage.setItem('gg_apps', JSON.stringify(apps));
    alert('Join request saved locally (demo). Integrate payment gateway for real flow.');
    joinForm.reset(); hideModal();
  });

  // smooth scroll for nav links
  document.querySelectorAll('a.nav-link').forEach(a=>{
    a.addEventListener('click', (e)=>{
      // small mobile nav close
      if(nav.classList.contains('open')) { nav.classList.remove('open'); burger.classList.remove('open'); }
      // smooth scroll
      const id = a.getAttribute('href');
      if(id && id.startsWith('#')){
        e.preventDefault();
        document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // reveal on scroll (intersection observer)
  const revealEls = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){ ent.target.classList.add('revealed'); obs.unobserve(ent.target); }
      });
    }, {threshold:0.12});
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el=>el.classList.add('revealed'));
  }

  // demo spin logic (client-side random; for demo only)
  if(spinBtn && spinDisplay){
    spinBtn.addEventListener('click', ()=>{
      spinBtn.disabled = true;
      spinDisplay.textContent = 'Spinning...';
      let ticks = 0;
      const maxTicks = 30 + Math.floor(Math.random()*30);
      const interval = setInterval(()=>{
        ticks++;
        const val = (Math.floor(Math.random()*91)+10) * 1000; // 10k..100k
        spinDisplay.textContent = `₹${val.toLocaleString('en-IN')}`;
        if(ticks >= maxTicks){
          clearInterval(interval);
          spinBtn.disabled = false;
          alert('Demo spin complete — real spin must be server-driven for fairness.');
        }
      }, 60);
    });
  }

  // small keyboard accessibility: ESC to close modal
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){ hideModal(); }
  });
});
