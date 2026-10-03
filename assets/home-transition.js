(() => {
  const cover = document.querySelector('[data-cover]');
  const identity = cover?.querySelector('.cover-inner');
  if (!identity) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-head');
  let pending = false;
  function update() {
    pending = false;
    const shift = Math.max(0, Math.min(scrollY, cover.offsetHeight + identity.offsetHeight));
    const start = identity.offsetTop - (header?.offsetHeight || 0);
    const fadeDistance = Math.max(80, identity.offsetHeight * .65);
    const opacity = reduced.matches ? 1 : Math.min(1, Math.max(0, 1 - (shift - start) / fadeDistance));
    cover.style.setProperty('--identity-shift', `${shift}px`);
    cover.style.setProperty('--identity-opacity', opacity.toFixed(3));
    identity.inert = opacity === 0;
    if (opacity === 0) identity.setAttribute('aria-hidden', 'true');
    else identity.removeAttribute('aria-hidden');
  }
  function schedule() {
    if (!pending) {pending = true;requestAnimationFrame(update);}
  }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  update();
})();
