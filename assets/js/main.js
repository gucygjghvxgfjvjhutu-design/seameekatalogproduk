/* SeaMee: interaksi bersama semua halaman (menu, galeri, FAQ, pesanan, animasi). */
(function () {
  var C = window.SEAMEE || {};
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var rp = function (n) { return 'Rp' + n.toLocaleString('id-ID'); };
  var ic = window.SEAMEE_ICON || function () { return ''; };
  var DEF = 'Halo SeaMee, saya ingin mengetahui informasi produk dan cara pemesanannya.';

  function waUrl(m) {
    return C.WANUM ? 'https://wa.me/' + C.WANUM + '?text=' + encodeURIComponent(m) : C.WA;
  }

  /* Tautan kontak dari config.js */
  $$('[data-wa]').forEach(function (a) { a.href = waUrl(a.dataset.msg || DEF); });
  $$('[data-ig]').forEach(function (a) { a.href = C.IG; });

  function toast(t) {
    var e = $('#ts'); if (!e) return;
    e.textContent = t; e.style.opacity = 1;
    setTimeout(function () { e.style.opacity = 0; }, 2600);
  }

  /* Galeri produk (hanya di produk.html) */
  var thumbs = $$('.th'), gi = $('#gi'), gal = { i: 0 };
  var GAL = thumbs.map(function (t) { var im = t.querySelector('img'); return { s: im.src, c: im.alt }; });
  function showG(i) {
    if (!gi || !GAL.length) return;
    gal.i = (i + GAL.length) % GAL.length;
    var g = GAL[gal.i];
    gi.style.opacity = 0.3;
    setTimeout(function () {
      gi.src = g.s; gi.alt = g.c;
      gi.className = gi.className.replace(/object-(cover|contain)/, gal.i === 3 ? 'object-cover' : 'object-contain');
      gi.style.opacity = 1;
    }, 120);
    $('#gc').textContent = '0' + (gal.i + 1) + ' / 0' + GAL.length;
    $('#gcap').textContent = g.c;
    thumbs.forEach(function (t, k) { t.classList.toggle('ring-2', k === gal.i); t.classList.toggle('ring-dark', k === gal.i); });
  }

  /* Pesanan (hanya di produk.html) */
  var Q = 1;
  function msg() { return 'Halo SeaMee, saya ingin memesan SeaMee Mie Rumput Laut Sambal Matah (75 gram) sebanyak ' + Q + ' bungkus. Mohon info ketersediaan dan cara pembayarannya.'; }
  function ord() {
    var o = $('#ob'); if (!o) return;
    o.href = waUrl(msg());
    o.innerHTML = ic('shopping_bag') + 'Pesan ' + Q + ' bungkus, ' + rp((C.PRICE || 13000) * Q);
    var v = $('#qv'); if (v) v.textContent = Q;
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-a]'); if (!t) return;
    var a = t.dataset.a;
    if (a === 'acc') {
      var c = document.getElementById(t.getAttribute('aria-controls')), o = t.getAttribute('aria-expanded') === 'true';
      t.setAttribute('aria-expanded', String(!o)); c.classList.toggle('hidden', o);
      t.lastElementChild.innerHTML = ic(o ? 'add' : 'remove');
    } else if (a === 'mm') { $('#mm').classList.toggle('hidden'); }
    else if (a === 'gt') showG(+t.dataset.i);
    else if (a === 'gp') showG(gal.i - 1);
    else if (a === 'gn') showG(gal.i + 1);
    else if (a === 'zo') { $('#gzi').src = GAL[gal.i].s; $('#gz').classList.replace('hidden', 'flex'); }
    else if (a === 'zc') { if (e.target.id === 'gzi') return; $('#gz').classList.replace('flex', 'hidden'); }
    else if (a === 'qp') { Q++; ord(); }
    else if (a === 'qm') { Q = Math.max(1, Q - 1); ord(); }
    else if (a === 'order') {
      try { navigator.clipboard.writeText(msg()); toast('Teks pesanan disalin. Tempel di WhatsApp.'); } catch (x) {}
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var z = $('#gz'); if (z) z.classList.replace('flex', 'hidden');
      var m = $('#mm'); if (m) m.classList.add('hidden');
    }
  });

  /* Tombol WhatsApp melayang dan bayangan header */
  var fw = $('#fw'), hd = $('#hd');
  function onScroll() {
    var s = window.scrollY > 500;
    if (fw) {
      fw.classList.toggle('translate-y-24', !s);
      fw.classList.toggle('opacity-0', !s);
      fw.classList.toggle('pointer-events-none', !s);
    }
    if (hd) hd.classList.toggle('shadow-lg', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Animasi muncul saat gulir */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    rv.forEach(function (e) { io.observe(e); });
    setTimeout(function () { rv.forEach(function (e) { e.classList.add('on'); }); }, 2500);
  } else { rv.forEach(function (e) { e.classList.add('on'); }); }

  showG(0); ord();
})();
