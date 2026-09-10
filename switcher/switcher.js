/* mindx-arena route switcher: one site, many entrances. No dependencies. */
(function () {
  'use strict';
  function start() {
    if (document.getElementById('arena-sw')) return;
    fetch('/routes.json', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(build, function () { build(null); });
  }
  function urlOf(r, def) { return r.slug === def ? '/' : '/r/' + r.slug + '/'; }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function build(data) {
    var def = (data && data.default) || 'shader-flight';
    var routes = (data && data.routes) || [
      { slug: 'shader-flight', no: '01', name: 'Shader Flight', sub: '3D' },
      { slug: 'logo-lab', no: '04', name: 'Logo Lab', sub: 'play', playground: true }
    ];
    var path = location.pathname;
    var cur = null;
    routes.forEach(function (r) {
      var u = urlOf(r, def);
      if (path === u || path === u + 'index.html') cur = r;
      else if (r.slug && path.indexOf('/r/' + r.slug + '/') === 0) cur = r;
    });
    var root = document.createElement('div');
    root.id = 'arena-sw';
    var btn = document.createElement('button');
    btn.id = 'arena-sw-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', '入口を切り替え');
    btn.textContent = '◉ 入口';
    var panel = document.createElement('div');
    panel.id = 'arena-sw-panel';
    panel.hidden = true;
    var html = '<div class="asw-head">ENTRANCES · 入口切替</div>';
    routes.forEach(function (r) {
      var cls = 'asw-item' + (cur && cur.slug === r.slug ? ' on' : '');
      var badge = r.playground
        ? '<span class="asw-bg">◇ PLAYGROUND</span>'
        : '<span class="asw-bg live">● LIVE</span>';
      var star = r.slug === def ? '<span class="asw-def">★ DEFAULT</span>' : '';
      html += '<a class="' + cls + '" href="' + urlOf(r, def) + '"><span class="asw-no">' + esc(r.no) + '</span>' +
        '<span class="asw-nm">' + esc(r.name) + '<small>' + esc(r.sub) + '</small></span>' + badge + star + '</a>';
    });
    html += '<a class="asw-item all" href="/directory/"><span class="asw-no">※</span>' +
      '<span class="asw-nm">All entrances<small>一覧で見る</small></span></a>';
    panel.innerHTML = html;
    btn.addEventListener('click', function (e) { e.stopPropagation(); panel.hidden = !panel.hidden; });
    document.addEventListener('click', function (e) { if (!root.contains(e.target)) panel.hidden = true; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') panel.hidden = true; });
    root.appendChild(panel);
    root.appendChild(btn);
    document.body.appendChild(root);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
