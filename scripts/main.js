// main.js — client logic for Ryazhenka site
// Fetches releases, contributors from Dimasick-git/Ryzhenka, handles UI, gallery, crew, to-do, themes.
// Designed to be robust: uses localStorage cache and graceful fallback.

(() => {
  const owner = 'Dimasick-git';
  const repo = 'Ryzhenka';
  const releasesApi = `https://api.github.com/repos/${owner}/${repo}/releases?per_page=100`;
  const contributorsApi = `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`;

  // Elements
  const releasesListEl = document.getElementById('releasesList');
  const galleryGridEl = document.getElementById('galleryGrid');
  const crewGridEl = document.getElementById('crewGrid');
  const crewMiniEl = document.getElementById('crewMini');
  const releasesCountEl = document.getElementById('releasesCount');
  const downloadsCountEl = document.getElementById('downloadsCount');
  const modalEl = document.getElementById('modal');

  // Controls
  const searchInput = document.getElementById('searchReleases');
  const filterType = document.getElementById('filterType');
  const sortBy = document.getElementById('sortBy');
  const themePicker = document.getElementById('themePicker');
  const bgMode = document.getElementById('bgMode');
  const textMode = document.getElementById('textMode');
  const refreshBtn = document.getElementById('refreshAll');

  // Manual crew fallback
  const defaultManualCrew = [
    { login: 'Dimasick-git', name: 'Dimasick-git', role: 'Основатель — lead' },
    { login: 'Ryazhenka-Helper-1', name: 'Ryazhenka-Helper-1', role: 'Создатель модулей' },
    { login: 'Ryazhenka-Helper-01', name: 'Ryazhenka-Helper-01', role: 'Помощник, видео, тесты' }
  ];

  // Local storage keys
  const CACHE_KEY = 'rz_cache_v1';
  const CREW_KEY = 'rz_manual_crew';
  const TODO_KEY = 'rz_todos_v2';
  const THEME_KEY = 'rz_theme_settings';

  // State
  let releases = [];
  let contributors = [];

  // ---------- Theme / settings ----------
  function loadSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem(THEME_KEY) || '{}');
      const theme = settings.theme || 'glow';
      const bg = settings.bg || 'dark';
      const text = settings.text || 'default';
      document.documentElement.dataset.theme = theme;
      document.documentElement.dataset.bg = bg;
      document.documentElement.dataset.text = text;
      if (themePicker) themePicker.value = theme;
      if (bgMode) bgMode.value = bg;
      if (textMode) textMode.value = text;
    } catch (e) { /* ignore */ }
  }
  function saveSettings() {
    const settings = { theme: themePicker.value, bg: bgMode.value, text: textMode.value };
    localStorage.setItem(THEME_KEY, JSON.stringify(settings));
    loadSettings();
  }
  if (themePicker) themePicker.addEventListener('change', saveSettings);
  if (bgMode) bgMode.addEventListener('change', saveSettings);
  if (textMode) textMode.addEventListener('change', saveSettings);
  loadSettings();

  // ---------- Utils ----------
  function fmtDate(iso) { if (!iso) return ''; try { return new Date(iso).toLocaleDateString(); } catch (e) { return iso; } }
  function bbootLogoUrl(tag) { return `https://github.com/${owner}/${repo}/releases/download/${encodeURIComponent(tag)}/bbootlogo.png`; }
  function el(tag, attrs = {}, ...children) {
    const e = document.createElement(tag);
    for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    children.forEach(c => { if (typeof c === 'string') e.appendChild(document.createTextNode(c)); else if (c) e.appendChild(c); });
    return e;
  }

  // ---------- Releases ----------
  async function fetchReleasesFresh() {
    const res = await fetch(releasesApi);
    if (!res.ok) throw new Error('releases fetch failed');
    return res.json();
  }

  async function loadReleases() {
    releasesListEl.innerHTML = '';
    galleryGridEl.innerHTML = '';
    releases = [];
    // try cache first
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.ts < 1000 * 60 * 5 && parsed.data) {
          releases = parsed.data;
          renderReleases();
          renderGallery();
          computeStats();
          return;
        }
      }
    } catch (e) { /* ignore cache */ }

    try {
      const data = await fetchReleasesFresh();
      if (Array.isArray(data)) {
        releases = data.sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at));
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: releases })); } catch (e) { /* ignore */ }
      }
    } catch (err) {
      console.warn('releases failed', err);
      // leave releases empty
    }
    renderReleases();
    renderGallery();
    computeStats();
  }

  function matchesFilter(r, q, type) {
    const ver = (r.tag_name || r.name || '').toLowerCase();
    const title = (r.name || '').toLowerCase();
    const body = (r.body || '').toLowerCase();
    const combined = [ver, title, body].join(' ');
    const qOk = !q || combined.includes(q.toLowerCase());
    let tOk = true;
    if (type && type !== 'all') tOk = (r.assets || []).some(a => a.name && a.name.toLowerCase().includes(type.toLowerCase()));
    return qOk && tOk;
  }

  function mkReleaseCard(r) {
    const ver = r.tag_name || r.name || '';
    const basset = (r.assets || []).find(a => /bbootlogo/i.test(a.name));
    const src = basset ? basset.browser_download_url : ((r.assets && r.assets[0] && r.assets[0].browser_download_url) || bbootLogoUrl(ver));
    const img = el('img', { src, alt: ver });
    img.className = 'thumb';
    const h3 = el('h3', {}, r.name || ver);
    const meta = el('div', { class: 'meta' },
      el('span', {}, fmtDate(r.published_at || r.created_at)),
      el('span', {}, ver)
    );
    const p = r.body ? el('p', {}, r.body.length > 260 ? r.body.slice(0, 260) + '…' : r.body) : null;
    const card = el('article', { class: 'release-card' }, img, h3, meta, p || '');
    if (r.html_url) {
      const open = el('a', { class: 'btn', href: r.html_url, target: '_blank' }, 'Открыть');
      card.appendChild(open);
    }
    return card;
  }

  function renderReleases() {
    const q = (searchInput || {}).value || '';
    const type = (filterType || {}).value || 'all';
    const sort = (sortBy || {}).value || 'date_desc';
    let filtered = (releases || []).filter(r => matchesFilter(r, q, type));
    if (sort === 'date_desc') filtered.sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at));
    if (sort === 'date_asc') filtered.sort((a, b) => new Date(a.published_at || a.created_at) - new Date(b.published_at || b.created_at));
    if (sort === 'downloads_desc') filtered.sort((a, b) => {
      const sa = (a.assets || []).reduce((s, x) => s + (x.download_count || 0), 0);
      const sb = (b.assets || []).reduce((s, x) => s + (x.download_count || 0), 0);
      return sb - sa;
    });
    releasesCountEl.textContent = filtered.length;
    releasesListEl.innerHTML = '';
    filtered.forEach(r => releasesListEl.appendChild(mkReleaseCard(r)));
  }

  function renderGallery() {
    galleryGridEl.innerHTML = '';
    (releases || []).forEach(r => {
      const ver = r.tag_name || r.name || '';
      const assets = r.assets || [];
      const chosen = assets.find(a => /\.(gif|webp|png|jpe?g)$/i.test(a.name || '')) || assets[0];
      const src = chosen ? chosen.browser_download_url : bbootLogoUrl(ver);
      const img = el('img', { src, alt: ver });
      img.addEventListener('click', () => openModal(`<img src="${src}" style="width:100%;height:auto;border-radius:8px" />`));
      galleryGridEl.appendChild(img);
    });
  }

  function computeStats() {
    let total = 0;
    (releases || []).forEach(r => (r.assets || []).forEach(a => { if (typeof a.download_count === 'number') total += a.download_count; }));
    downloadsCountEl.textContent = total;
  }

  // ---------- Crew ----------
  function getStoredManualCrew() {
    try { return JSON.parse(localStorage.getItem(CREW_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveStoredManualCrew(arr) { localStorage.setItem(CREW_KEY, JSON.stringify(arr)); }

  function makeCrewCard(p) {
    const avatar = p.avatar || `https://github.com/${p.login}.png`;
    const img = el('img', { src: avatar, alt: p.login });
    img.width = 64; img.height = 64;
    const nameLink = el('a', { href: `https://github.com/${p.login}`, target: '_blank' }, p.login);
    nameLink.style.fontWeight = '700';
    const name = el('div', {}, nameLink);
    if (p.name && p.name !== p.login) name.appendChild(document.createTextNode(' — ' + p.name));
    const role = p.role ? el('div', { class: 'muted' }, p.role) : null;
    const contrib = el('div', { class: 'muted' }, `Commits: ${p.contributions || 0}`);
    const info = el('div', {}, name, role || '', contrib);
    const card = el('div', { class: 'crew-card' }, img, info);
    return card;
  }

  async function loadCrew() {
    crewGridEl.innerHTML = '';
    crewMiniEl.innerHTML = '';
    const stored = getStoredManualCrew();
    const manual = (stored || []).concat(defaultManualCrew);
    manual.slice(0, 6).forEach(m => crewMiniEl.appendChild(makeCrewCard(m)));
    // build main grid: stored manual first, then default manual, then contributors
    manual.forEach(m => crewGridEl.appendChild(makeCrewCard(m)));
    try {
      const res = await fetch(contributorsApi);
      if (res.ok) {
        const list = await res.json();
        const set = new Set(manual.map(x => x.login.toLowerCase()));
        list.forEach(c => { if (!set.has(c.login.toLowerCase())) crewGridEl.appendChild(makeCrewCard({ login: c.login, avatar: c.avatar_url, contributions: c.contributions })); });
      }
    } catch (e) {
      console.warn('contributors fetch failed', e);
    }
  }

  // UI add crew modal
  function openModal(html) {
    modalEl.innerHTML = html;
    modalEl.setAttribute('aria-hidden', 'false');
    modalEl.style.display = 'flex';
    modalEl.addEventListener('click', modalClick);
  }
  function closeModal() {
    modalEl.innerHTML = '';
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.style.display = 'none';
    modalEl.removeEventListener('click', modalClick);
  }
  function modalClick(e) { if (e.target === modalEl) closeModal(); }

  document.getElementById('addCrewBtn').addEventListener('click', () => {
    openModal(`<div>
      <h3>Добавить участника</h3>
      <div style="display:grid;gap:8px;margin-top:8px">
        <input id="mc_login" placeholder="github login" />
        <input id="mc_name" placeholder="имя (опционально)" />
        <input id="mc_role" placeholder="роль (опционально)" />
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">
          <button id="mc_cancel" class="btn">Отмена</button>
          <button id="mc_save" class="btn primary">Сохранить</button>
        </div>
      </div>
    </div>`);
    document.getElementById('mc_cancel').addEventListener('click', closeModal);
    document.getElementById('mc_save').addEventListener('click', () => {
      const login = (document.getElementById('mc_login') || {}).value || '';
      const name = (document.getElementById('mc_name') || {}).value || '';
      const role = (document.getElementById('mc_role') || {}).value || '';
      if (!login.trim()) { alert('Введите login'); return; }
      const arr = getStoredManualCrew();
      arr.unshift({ login: login.trim(), name: name.trim() || login.trim(), role: role.trim() });
      saveStoredManualCrew(arr);
      closeModal();
      loadCrew();
    });
  });

  document.getElementById('exportCrewBtn').addEventListener('click', () => {
    const data = JSON.stringify(getStoredManualCrew(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'ryazhenka-crew.json'; a.click(); URL.revokeObjectURL(url);
  });

  // ---------- To-Do ----------
  const todoInput = document.getElementById('todoInput');
  const todoPriority = document.getElementById('todoPriority');
  const todoDue = document.getElementById('todoDue');
  const todoListEl = document.getElementById('todoList');
  const todoFilter = document.getElementById('todoFilter');
  const todoSort = document.getElementById('todoSort');

  function loadTodos() {
    try { const raw = localStorage.getItem(TODO_KEY); return raw ? JSON.parse(raw) : []; } catch (e) { return []; }
  }
  function saveTodos(t) { localStorage.setItem(TODO_KEY, JSON.stringify(t)); renderTodos(); }
  function uid() { return 't_' + Math.random().toString(36).slice(2, 9); }

  let todos = loadTodos();

  function renderTodos() {
    todoListEl.innerHTML = '';
    const filter = (todoFilter || {}).value || '';
    const sort = (todoSort || {}).value || 'new';
    let list = todos.slice();
    if (filter) list = list.filter(it => (it.text || '').toLowerCase().includes(filter.toLowerCase()));
    if (sort === 'new') list.sort((a, b) => b.ts - a.ts);
    if (sort === 'old') list.sort((a, b) => a.ts - b.ts);
    if (sort === 'prio') { const map = { high: 2, normal: 1, low: 0 }; list.sort((a, b) => (map[b.priority] || 0) - (map[a.priority] || 0)); }
    if (sort === 'due') list.sort((a, b) => ((a.due ? new Date(a.due).getTime() : 1e14) - (b.due ? new Date(b.due).getTime() : 1e14)));

    list.forEach(item => {
      const chk = el('input'); chk.type = 'checkbox'; chk.checked = !!item.done;
      chk.addEventListener('change', () => { item.done = chk.checked; saveTodos(todos); });
      const title = el('div', { class: 'todo-title' }, item.text);
      const meta = el('div', { class: 'meta' }, `${item.priority}${item.due ? ' • ' + item.due : ''}`);
      const editBtn = el('button', { class: 'btn' }, '✎');
      editBtn.addEventListener('click', () => editTodo(item.id));
      const delBtn = el('button', { class: 'btn' }, '✕');
      delBtn.addEventListener('click', () => { todos = todos.filter(t => t.id !== item.id); saveTodos(todos); });
      const li = el('li', { class: 'todo-item' }, chk, el('div', {}, title, meta), el('div', {}, editBtn, delBtn));
      if (item.done) li.classList.add('completed');
      todoListEl.appendChild(li);
    });
  }

  function addTodo() {
    const text = (todoInput || {}).value || '';
    if (!text.trim()) return;
    const p = (todoPriority || {}).value || 'normal';
    const due = (todoDue || {}).value || '';
    const newTodo = { id: uid(), text: text.trim(), priority: p, due, done: false, ts: Date.now() };
    todos.unshift(newTodo);
    saveTodos(todos);
    todoInput.value = '';
    todoDue.value = '';
  }

  function editTodo(id) {
    const t = todos.find(x => x.id === id);
    if (!t) return;
    openModal(`<div>
      <h3>Редактировать задачу</h3>
      <div style="display:grid;gap:8px">
        <input id="edt_text" value="${escapeHtml(t.text)}" />
        <select id="edt_prio"><option value="high">High</option><option value="normal">Normal</option><option value="low">Low</option></select>
        <input id="edt_due" type="date" value="${t.due || ''}" />
        <div style="display:flex;gap:8px;justify-content:flex-end">
          <button id="edt_cancel" class="btn">Отмена</button>
          <button id="edt_save" class="btn primary">Сохранить</button>
        </div>
      </div>
    </div>`);
    document.getElementById('edt_prio').value = t.priority || 'normal';
    document.getElementById('edt_cancel').addEventListener('click', closeModal);
    document.getElementById('edt_save').addEventListener('click', () => {
      t.text = document.getElementById('edt_text').value.trim() || t.text;
      t.priority = document.getElementById('edt_prio').value;
      t.due = document.getElementById('edt_due').value || '';
      saveTodos(todos);
      closeModal();
    });
  }

  document.getElementById('todoAdd').addEventListener('click', addTodo);
  document.getElementById('todoFilter').addEventListener('input', renderTodos);
  document.getElementById('todoSort').addEventListener('change', renderTodos);
  document.getElementById('exportTodos').addEventListener('click', () => {
    const data = JSON.stringify(todos, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'ryazhenka-todos.json'; a.click(); URL.revokeObjectURL(url);
  });
  document.getElementById('importTodosBtn').addEventListener('click', () => document.getElementById('importFile').click());
  document.getElementById('importFile').addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader(); r.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data)) {
          const existingIds = new Set(todos.map(x => x.id));
          data.forEach(it => { if (!it.id) it.id = uid(); if (!existingIds.has(it.id)) todos.push(it); });
          saveTodos(todos);
          alert('Импорт завершён');
        } else alert('Неверный формат');
      } catch (err) { alert('Ошибка импорта'); }
    }; r.readAsText(f);
    e.target.value = '';
  });

  document.getElementById('clearCompleted').addEventListener('click', () => { todos = todos.filter(t => !t.done); saveTodos(todos); });
  document.getElementById('clearAll').addEventListener('click', () => { if (confirm('Удалить все задачи?')) { todos = []; saveTodos(todos); } });
  document.getElementById('bulkComplete').addEventListener('click', () => { todos.forEach(t => t.done = true); saveTodos(todos); });

  // ---------- helpers ----------
  function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  // ---------- events ----------
  if (searchInput) searchInput.addEventListener('input', renderReleases);
  if (filterType) filterType.addEventListener('change', renderReleases);
  if (sortBy) sortBy.addEventListener('change', renderReleases);
  if (refreshBtn) refreshBtn.addEventListener('click', () => { localStorage.removeItem(CACHE_KEY); loadAll(); });

  // initial load
  function loadAll() {
    loadSettings();
    loadReleases();
    loadCrew();
    todos = loadTodos();
    renderTodos();
  }
  loadAll();

})();
