// script.js - handles modal, form mock, and small UI interactions
document.addEventListener('DOMContentLoaded', function(){
  // DOM refs
  const openJoin = document.getElementById('openJoin');
  const openJoin2 = document.getElementById('openJoin2');
  const joinModal = document.getElementById('joinModal');
  const closeModal = document.getElementById('closeModal');
  const cancelJoin = document.getElementById('cancelJoin');
  const joinForm = document.getElementById('joinForm');
  const year = document.getElementById('year');

  year.textContent = new Date().getFullYear();

  function showModal(){ joinModal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function hideModal(){ joinModal.setAttribute('aria-hidden','true'); document.body.style.overflow='auto'; }

  [openJoin, openJoin2].forEach(btn=> btn && btn.addEventListener('click', showModal));
  closeModal.addEventListener('click', hideModal);
  cancelJoin.addEventListener('click', hideModal);

  // form submit - demo flow
  joinForm.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(joinForm);
    const name = data.get('name');
    const phone = data.get('phone');
    if(!name || !phone){ alert('Please fill name & phone'); return; }

    // Demo: store applicant in localStorage (so later we can display applicants)
    const applicants = JSON.parse(localStorage.getItem('gg_applicants') || '[]');
    applicants.push({ name, phone, city: data.get('city'), referrer: data.get('referrer'), time: Date.now() });
    localStorage.setItem('gg_applicants', JSON.stringify(applicants));

    // In real: redirect to payment gateway or call backend endpoint to create order
    alert('Demo: Join request saved (local). Integrate Razorpay/Stripe in production.');
    hideModal();
    joinForm.reset();
  });

  // simple nav toggle for mobile
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', ()=>{
    document.querySelector('.nav').classList.toggle('open');
  });

});
