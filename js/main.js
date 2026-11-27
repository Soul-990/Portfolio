const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, q = new URLSearchParams(location.search), DPR = devicePixelRatio || 1;
const get = u => fetch(u).then(r => { if (!r.ok) throw Error(u); return r.json() });
/* generated cinematic placeholder, used when an image file is missing */
const art = (t = '') => {
  const h = [...t].reduce((a, c) => a + c.charCodeAt(0), 0); let tr = '';
  for (let i = 0; i < 16; i++) { const x = (i * 53 + h * 7) % 800, s = 60 + (i * 37 + h) % 100; tr += `<path d="M${x} 450l${s / 2} -${s * 2.2}l${s / 2} ${s * 2.2}z" fill="#05060f" opacity=".${4 + i % 5}"/>` }
  return 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${180 + h % 70} 65% 15%)"/><stop offset="1" stop-color="#0B0C1B"/></linearGradient><radialGradient id="r" cx=".72" cy=".28"><stop offset="0" stop-color="#FF168B" stop-opacity=".4"/><stop offset="1" stop-color="#FF168B" stop-opacity="0"/></radialGradient></defs><rect width="800" height="450" fill="url(#g)"/><rect width="800" height="450" fill="url(#r)"/>${tr}</svg>`)
};
document.addEventListener('error', e => {
  const t = e.target; if (!t.dataset || t.dataset.f) return;
  if (t.tagName == 'IMG') { t.dataset.f = 1; t.src = art(t.alt || t.src) }
  if (t.tagName == 'VIDEO') { t.dataset.f = 1; t.outerHTML = `<div class="vf">Video not found.<br>Add the file at the path set in projects.json</div>` }
}, true);
const im = (s, t) => `<img src="${s}" alt="${t}" loading="lazy">`;
const chips = a => `<div class="tags">${(a || []).map(t => `<span>${t}</span>`).join('')}</div>`;

function reveal() { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .12 }); $$('.reveal:not(.in)').forEach(el => io.observe(el)) }

function bgParticles() {
  const c = $('#bg'); if (!c || RM) return; const x = c.getContext('2d'); let W, H; const rs = () => { W = c.width = innerWidth; H = c.height = innerHeight }; rs(); addEventListener('resize', rs);
  const n = innerWidth < 600 ? 25 : 55, P = [...Array(n)].map(() => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + .4, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, k: Math.random() > .5 }));
  (function f() { x.clearRect(0, 0, W, H); P.forEach(p => { p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H; x.fillStyle = p.k ? 'rgba(0,217,255,.55)' : 'rgba(255,22,139,.5)'; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fill() }); requestAnimationFrame(f) })()
}

function heroArt() {
  const c = $('#heroArt'); if (!c) return; const x = c.getContext('2d'); let W, H, mx = 0, my = 0, t = 0;
  const rs = () => { W = c.width = c.clientWidth * DPR; H = c.height = c.clientHeight * DPR }; rs(); addEventListener('resize', rs);
  c.parentElement.addEventListener('pointermove', e => { const b = c.getBoundingClientRect(); mx = (e.clientX - b.left) / b.width - .5; my = (e.clientY - b.top) / b.height - .5 });
  const P = [...Array(46)].map(() => ({ a: Math.random() * 6.28, r: .55 + Math.random() * .6, s: .2 + Math.random() * .6, z: Math.random() }));
  const V = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], E = [[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]];
  (function f() {
    if (!RM) t += .01; x.clearRect(0, 0, W, H); const cx = W / 2 + mx * W * .06, cy = H / 2 + my * H * .06, R = Math.min(W, H) * .34;
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, R); g.addColorStop(0, 'rgba(255,22,139,.55)'); g.addColorStop(.5, 'rgba(168,85,247,.2)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.fill();
    for (let i = 0; i < 4; i++) { x.save(); x.translate(cx, cy); x.rotate(t * (i % 2 ? -1 : 1) * (.5 + i * .2) + i); x.scale(1, .4 + .15 * i + my * .3); x.strokeStyle = i % 2 ? '#FF168B' : '#00D9FF'; x.shadowColor = x.strokeStyle; x.shadowBlur = 18; x.lineWidth = 2 * DPR; x.setLineDash(i ? [R * .4, R * .15] : []); x.beginPath(); x.arc(0, 0, R * (.6 + i * .18), 0, 7); x.stroke(); x.restore() }
    P.forEach(p => { const a = p.a + t * p.s, rr = R * p.r; x.fillStyle = p.z > .5 ? '#00D9FF' : '#fff'; x.globalAlpha = .3 + p.z * .7; x.beginPath(); x.arc(cx + Math.cos(a) * rr * 1.2, cy + Math.sin(a) * rr * .45 * (1 + p.z), (1 + p.z * 2) * DPR, 0, 7); x.fill() }); x.globalAlpha = 1;
    const a1 = t * 1.3 + mx * 3, a2 = t + my * 3, pr = V.map(([a, b, d]) => { const X = a * Math.cos(a1) + d * Math.sin(a1), Z = -a * Math.sin(a1) + d * Math.cos(a1); return [cx + X * R * .45, cy + (b * Math.cos(a2) - Z * Math.sin(a2)) * R * .45] });
    x.strokeStyle = '#fff'; x.shadowColor = '#00D9FF'; x.shadowBlur = 14; x.lineWidth = 1.5 * DPR; x.beginPath(); E.forEach(([a, b]) => { x.moveTo(...pr[a]); x.lineTo(...pr[b]) }); x.stroke(); x.shadowBlur = 0;
    requestAnimationFrame(f)
  })()
}

function typing(a) {
  const el = $('#typ'); if (!el) return; if (RM) { el.textContent = a[0]; return } let i = 0, j = 0, d = 0;
  (function s() { const w = a[i]; j += d ? -1 : 1; el.textContent = w.slice(0, j); let ms = d ? 35 : 80; if (!d && j == w.length) { d = 1; ms = 1400 } else if (d && !j) { d = 0; i = (i + 1) % a.length; ms = 300 } setTimeout(s, ms) })()
}

function common(S) {
  document.title = S.name + ' · Portfolio'; $$('.nm').forEach(e => e.textContent = S.name); $('#yr').textContent = new Date().getFullYear();
  const so = S.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}" title="${s.name}"><i class="bi ${s.icon}"></i></a>`).join('');
  ['#soc', '#socF'].forEach(k => $(k) && ($(k).innerHTML = so));
  $$('[data-art]').forEach(e => e.style.backgroundImage = `url("${art(e.dataset.art)}")`);
  const pg = document.body.dataset.page, setA = n => $$('.nav-link').forEach(a => a.classList.toggle('active', a.dataset.n == n));
  setA({ home: 'home', about: 'about', skills: 'skills', contact: 'contact' }[pg] || 'portfolio');
  $$('.nav-link').forEach(a => a.addEventListener('click', () => $('#m').classList.remove('show')))
}

const tl = a => `<div class="tl">${a.map(x => `<div class="reveal"><small>${x.y}</small><h4>${x.t}</h4><p>${x.d}</p></div>`).join('')}</div>`;
const cards = (a, c = 'col-md-6 col-lg-3') => a.map((s, k) => `<div class="${c} reveal" style="transition-delay:${k * .1}s"><div class="gc h-100">${s.i ? `<i class="bi ${s.i}"></i>` : `<span class="num">0${k + 1}</span>`}<h4>${s.t}</h4><p>${s.d}</p></div></div>`).join('');
const stats = S => $('#stats').innerHTML = S.stats.map(s => `<div class="col-md-4 reveal"><div class="gc stat"><b>${s.v}</b><span>${s.l}</span></div></div>`).join('');
const pills = a => a.map(t => `<span>${t}</span>`).join('');
function home(S, P) { $('#intro').textContent = S.intro; $('#cv').href = S.cv; typing(S.titles); heroArt(); stats(S); $('#feat').innerHTML = [...P.webDesigning, ...P.fullStack].slice(0, 3).map(card).join('') }
function aboutP(S) {
  const a = S.about; heroArt(); stats(S); $('#abL').innerHTML = `<p>${a.intro}</p><p>${a.journey}</p>`;
  $('#svc').innerHTML = cards(S.services); $('#jr').innerHTML = tl(S.journey); $('#edu').innerHTML = tl(S.edu);
  $('#int').innerHTML = [['bi-compass', 'Career Interests', a.interests], ['bi-bullseye', 'Development Goals', a.goals]].map(([i, t, x]) => `<div class="gc reveal"><i class="bi ${i}"></i><h4>${t}</h4><p>${x}</p></div>`).join('');
  $('#tech').innerHTML = pills(a.tech)
}
function skillsP(S) {
  $('#skillsBox').innerHTML = S.skills.map(c => `<div class="sk"><h3 class="reveal">${c.cat}</h3><div class="row g-3">${c.items.map(s => `<div class="col-6 col-lg-3 reveal"><div class="gc h-100"><div class="t"><i class="bi ${s.i} ic"></i><small>${s.v}%</small></div><h4>${s.n}</h4><div class="bar"><i style="--w:${s.v}%"></i></div></div></div>`).join('')}</div></div>`).join('');
  $('#learn').innerHTML = pills(S.learning); $('#str').innerHTML = cards(S.strengths, 'col-md-4'); $('#proc').innerHTML = cards(S.process)
}
function contactP(S) {
  $('#avail').textContent = S.availability;
  $('#faq').innerHTML = S.faq.map((f, k) => `<div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button ${k ? 'collapsed' : ''}" data-bs-toggle="collapse" data-bs-target="#q${k}">${f.q}</button></h3><div id="q${k}" class="accordion-collapse collapse ${k ? '' : 'show'}" data-bs-parent="#faq"><div class="accordion-body">${f.a}</div></div></div>`).join('');
  const dl = [['bi-envelope', 'Email', S.email, 'mailto:' + S.email], ...S.socials.filter(s => ['WhatsApp', 'LinkedIn', 'GitHub'].includes(s.name)).map(s => [s.icon, s.name, s.url.replace(/^https?:\/\//, ''), s.url])];
  $('#direct').innerHTML = dl.map(([i, n, t, u]) => `<a class="dl reveal" href="${u}" ${u.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}><i class="bi ${i}"></i><span><b>${n}</b><br><small class="text-secondary">${t}</small></span></a>`).join('');
  const f = $('#cf'), st = $('#cfs'); f.addEventListener('submit', async e => {
    e.preventDefault(); f.classList.add('was-validated'); if (!f.checkValidity()) return; const d = Object.fromEntries(new FormData(f));
    if (S.formspreeId) { try { const r = await fetch('https://formspree.io/f/' + S.formspreeId, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(d) }); if (!r.ok) throw 0; st.textContent = 'Message sent. Thank you!'; f.reset(); f.classList.remove('was-validated'); return } catch { st.textContent = 'Service unavailable, opening your email app…' } }
    location.href = `mailto:${S.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(d.message + '\n\n— ' + d.name + ' (' + d.email + ')')}`; st.textContent = 'Opening your email app…'
  })
}

const card = (p, i) => `<a class="pc reveal" href="project.html?id=${p.id}" style="transition-delay:${(i % 3) * .1}s">${im(p.cover, p.title)}<div class="pi"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${p.title}</h3><p>${p.short || p.description}</p>${chips(p.technologies)}<span class="go">VIEW PROJECT →</span></div></a>`;
function port(S, P) { $('#gWeb').innerHTML = P.webDesigning.map(card).join(''); $('#gFull').innerHTML = P.fullStack.map(card).join('') }
const find = P => { const id = q.get('id'), w = P.webDesigning.find(p => p.id == id), f = P.fullStack.find(p => p.id == id); return { p: w || f, cat: w ? 'web' : 'full' } };
const nf = () => { $('main').innerHTML = '<div class="container py-5 mt-5"><h2>Project not found</h2><a href="portfolio.html">← Back to portfolio</a></div>' };

function lb(list, i, t) {
  const o = document.createElement('div'); o.className = 'lb'; o.innerHTML = '<button class="x" aria-label="Close">×</button><button class="pv" aria-label="Previous">‹</button><img alt=""><button class="nx" aria-label="Next">›</button><span class="ct"></span>'; document.body.append(o);
  const img = $('img', o), go = n => { i = (n + list.length) % list.length; img.classList.remove('sh'); void img.offsetWidth; img.alt = t + ' ' + (i + 1); img.src = list[i]; img.classList.add('sh'); $('.ct', o).textContent = `${i + 1} / ${list.length}` },
    kd = e => { e.key == 'Escape' ? cl() : e.key == 'ArrowRight' ? go(i + 1) : e.key == 'ArrowLeft' && go(i - 1) }, cl = () => { o.remove(); removeEventListener('keydown', kd) };
  $('.x', o).onclick = cl; $('.pv', o).onclick = () => go(i - 1); $('.nx', o).onclick = () => go(i + 1); o.onclick = e => e.target == o && cl(); addEventListener('keydown', kd);
  let sx = 0; o.addEventListener('touchstart', e => sx = e.touches[0].clientX); o.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) go(i + (d < 0 ? 1 : -1)) }); go(i)
}

function proj(S, P) {
  const { p, cat } = find(P); if (!p) return nf(); document.title = p.title + ' · Portfolio';
  $('#pImg').src = p.cover; $('#pImg').alt = p.title; $('#pCat').textContent = cat == 'web' ? 'WEB DESIGN' : 'FULL STACK DEVELOPMENT'; $('#pT').textContent = p.title;
  const L = (h, a) => a?.length ? `<div class="blk reveal"><h3>${h}</h3><ul>${a.map(x => `<li>${x}</li>`).join('')}</ul></div>` : '';
  const gh = p.githubUrl ? `<a class="btn-o" target="_blank" rel="noopener" href="${p.githubUrl}"><i class="bi bi-github"></i> GitHub Repository</a>` : '';
  const live = p.liveUrl ? `<a class="btn-n" target="_blank" rel="noopener" href="${p.liveUrl}">Visit Live Project <i class="bi bi-box-arrow-up-right"></i></a>` : '';
  const view = cat == 'full' ? `<a class="btn-n" href="gallery.html?id=${p.id}">View Project <i class="bi bi-images"></i></a>` : '';
  $('#pB').innerHTML = `<div class="row g-5"><div class="col-lg-8"><div class="blk reveal"><h3>Overview</h3><p>${p.description}</p></div>${L('Objectives', p.objectives)}${L('Main Features', p.features)}${L('Implementation Details', p.details)}</div>
 <div class="col-lg-4"><div class="blk reveal"><h3>Technologies</h3><div class="chips">${p.technologies.map(t => `<span>${t}</span>`).join('')}</div></div><div class="d-grid gap-3 reveal">${cat == 'web' ? live + gh : view + live + gh}</div></div></div>
 <div class="blk reveal mt-4"><h3>Screenshots</h3><div class="shots">${(p.screenshots || []).map(s => im(s, p.title)).join('')}</div></div>`;
  $$('.shots img').forEach((m, i) => m.onclick = () => lb(p.screenshots, i, p.title))
}

function gal(S, P) {
  const { p } = find(P); if (!p) return nf(); document.title = p.title + ' · Gallery'; $('#pImg').src = p.cover; $('#pImg').alt = p.title; $('#pT').textContent = p.title; $('#bk').href = 'project.html?id=' + p.id;
  const v = p.videos || [], s = p.screenshots || [];
  $('#gM').innerHTML = (v.length ? `<div class="blk reveal"><h3>Demonstration videos</h3><div class="shots" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr))">${v.map(u => `<video controls preload="metadata" playsinline src="${u}"></video>`).join('')}</div></div>` : '') +
    `<div class="blk reveal"><h3>Screenshots</h3><div class="shots">${s.map(u => im(u, p.title)).join('')}</div></div>`;
  $$('.shots img').forEach((m, i) => m.onclick = () => lb(s, i, p.title))
}

/* fade/slide page transitions between pages */
const np = p => p.replace(/index\.html$/, '');
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]'); if (!a || a.target || a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey) return; const u = new URL(a.href, location);
  if (u.origin != location.origin || !/(\.html|\/)$/.test(u.pathname) || (np(u.pathname) == np(location.pathname) && u.search == location.search)) return;
  e.preventDefault(); document.body.classList.add('out'); setTimeout(() => location.href = a.href, RM ? 0 : 300)
});
addEventListener('pageshow', () => document.body.classList.remove('out'));
if (!RM) addEventListener('pointermove', e => { const c = $('#cur'); if (c) c.style.transform = `translate(${e.clientX}px,${e.clientY}px)` }, { passive: true });

(async () => {
  bgParticles();
  try { const [S, P] = await Promise.all([get('data/site.json'), get('data/projects.json')]); common(S); ({ home, about: aboutP, skills: skillsP, contact: contactP, portfolio: port, project: proj, gallery: gal })[document.body.dataset.page]?.(S, P); reveal() }
  catch (err) { console.error(err); $('main').insertAdjacentHTML('afterbegin', '<div class="container pt-5 mt-5 text-warning">Could not load data/*.json. Serve the folder over HTTP (see README) instead of opening the file directly.</div>') }
})();
