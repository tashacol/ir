/**
 * app-shell.js - قاب مشترک اپ مؤسسه تعالی اندیشه و رشد
 * با رهگیری کلیک برای بارگذاری صفحات داخلی در اپ
 */
(function () {
  'use strict';

  var isApp =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    window.matchMedia('(display-mode: window-controls-overlay)').matches ||
    window.navigator.standalone === true;

  if (!isApp) return;
  if (window.__APP_SHELL__) return;
  window.__APP_SHELL__ = true;

  var CURRENT_PATH = window.location.pathname;
  var IS_HOME = CURRENT_PATH === '/' ||
                CURRENT_PATH.endsWith('/index.html') ||
                CURRENT_PATH === '/ir/' ||
                CURRENT_PATH === '/ir/index.html' ||
                CURRENT_PATH === '/index.html';

  var LOGO_WHITE = 'https://tashacol.ir/tasavir/asli/logo-white.png';
  var PHONE = 'tel:09136395562';

  /* ============ CSS ============ */
  var css = ''
    + '*{box-sizing:border-box;}'
    + 'html,body{-webkit-tap-highlight-color:transparent;overscroll-behavior-y:none;}'
    + 'body{padding-top:56px!important;padding-bottom:68px!important;background:#f3f3f3;}'
    + '.site-header,header.site-header,body>header:not(.app-header),'
    + '.mobile-nav-menu,.mobile-overlay,.site-footer,footer.site-footer,'
    + 'body>footer,.menu-toggle{display:none!important;}'
    + 'main{padding-top:0!important;}'
    + '.app-header{position:fixed;top:0;left:0;right:0;height:56px;'
    + 'background:linear-gradient(135deg,#0078d4 0%,#005a9e 100%);'
    + 'color:#fff;display:flex;align-items:center;justify-content:space-between;'
    + 'padding:0 12px;z-index:99999;box-shadow:0 2px 12px rgba(0,0,0,.15);}'
    + '.app-header-btn{background:rgba(255,255,255,.18);border:none;color:#fff;'
    + 'width:40px;height:40px;border-radius:10px;font-size:1rem;cursor:pointer;'
    + 'display:flex;align-items:center;justify-content:center;text-decoration:none;'
    + 'transition:background .2s;flex-shrink:0;}'
    + '.app-header-btn:active{background:rgba(255,255,255,.32);}'
    + '.app-header-title{display:flex;align-items:center;gap:8px;flex:1;'
    + 'justify-content:center;font-weight:800;font-size:.95rem;color:#fff;}'
    + '.app-header-title img{width:28px;height:28px;object-fit:contain;}'
    + '.app-bottom-nav{position:fixed;bottom:0;left:0;right:0;height:68px;'
    + 'background:#fff;border-top:1px solid #e5e7eb;display:flex;z-index:99999;'
    + 'box-shadow:0 -4px 20px rgba(0,0,0,.06);padding-bottom:env(safe-area-inset-bottom);}'
    + '.app-bottom-nav a{flex:1;display:flex;flex-direction:column;align-items:center;'
    + 'justify-content:center;gap:4px;text-decoration:none;color:#8a8a8a;'
    + 'font-size:.7rem;font-weight:600;position:relative;padding:8px 0;transition:color .2s;}'
    + '.app-bottom-nav a i{font-size:1.25rem;transition:transform .2s;}'
    + '.app-bottom-nav a.active{color:#0078d4;}'
    + '.app-bottom-nav a.active i{transform:translateY(-2px);}'
    + '.app-bottom-nav a.active::before{content:"";position:absolute;top:0;'
    + 'width:32px;height:3px;background:#0078d4;border-radius:0 0 4px 4px;}'
    + '.app-drawer-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);'
    + 'backdrop-filter:blur(2px);z-index:100000;opacity:0;visibility:hidden;'
    + 'transition:opacity .3s;}'
    + '.app-drawer-overlay.active{opacity:1;visibility:visible;}'
    + '.app-drawer{position:fixed;top:0;right:-320px;width:300px;height:100%;'
    + 'background:#fff;z-index:100001;transition:right .35s cubic-bezier(.4,0,.2,1);'
    + 'box-shadow:-8px 0 30px rgba(0,0,0,.15);overflow-y:auto;display:flex;'
    + 'flex-direction:column;}'
    + '.app-drawer.active{right:0;}'
    + '.app-drawer-head{background:linear-gradient(135deg,#0078d4 0%,#005a9e 100%);'
    + 'color:#fff;padding:24px 20px;text-align:center;}'
    + '.app-drawer-head img{width:60px;height:60px;object-fit:contain;'
    + 'margin-bottom:10px;filter:brightness(0) invert(1);}'
    + '.app-drawer-head h3{font-size:1rem;font-weight:800;margin:0 0 4px;}'
    + '.app-drawer-head p{font-size:.8rem;opacity:.85;margin:0;}'
    + '.app-drawer-nav{display:flex;flex-direction:column;padding:12px 10px;flex:1;}'
    + '.app-drawer-nav a{display:flex;align-items:center;gap:14px;padding:12px 16px;'
    + 'border-radius:12px;text-decoration:none;color:#242424;font-weight:600;'
    + 'font-size:.95rem;transition:all .2s;margin-bottom:4px;}'
    + '.app-drawer-nav a:active,.app-drawer-nav a:hover{background:#e6f2fb;color:#0078d4;}'
    + '.app-drawer-nav a i{width:24px;text-align:center;font-size:1.1rem;color:#0078d4;}'
    + '.app-drawer-foot{padding:16px;border-top:1px solid #eee;display:flex;'
    + 'flex-direction:column;gap:8px;}'
    + '.app-drawer-foot a{display:flex;align-items:center;gap:10px;padding:10px 14px;'
    + 'background:#f5f5f5;border-radius:10px;text-decoration:none;color:#242424;'
    + 'font-size:.85rem;font-weight:600;}'
    + '.app-drawer-foot a i{color:#0078d4;}'
    + '.app-page-loader{position:fixed;top:56px;left:0;right:0;bottom:68px;'
    + 'background:#f3f3f3;display:flex;align-items:center;justify-content:center;'
    + 'z-index:99998;}'
    + '.app-page-loader .spinner{width:44px;height:44px;border:4px solid #e5e7eb;'
    + 'border-top:4px solid #0078d4;border-radius:50%;animation:appSpin 1s linear infinite;}'
    + '@keyframes appSpin{100%{transform:rotate(360deg);}}';

  var styleEl = document.createElement('style');
  styleEl.id = 'app-shell-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ============ هدر ============ */
  var backBtn = IS_HOME
    ? '<button class="app-header-btn" id="appMenuBtn" aria-label="منو"><i class="fas fa-bars"></i></button>'
    : '<button class="app-header-btn" id="appBackBtn" aria-label="بازگشت"><i class="fas fa-arrow-right"></i></button>';

  var headerHTML = '<header class="app-header">'
    + backBtn
    + '<div class="app-header-title">'
    + '<img src="' + LOGO_WHITE + '" alt="مؤسسه تعالی">'
    + '<span>مؤسسه تعالی</span>'
    + '</div>'
    + '<a href="' + PHONE + '" class="app-header-btn" aria-label="تماس">'
    + '<i class="fas fa-phone-alt"></i></a>'
    + '</header>';

  /* ============ Drawer ============ */
  var drawerHTML = '<aside class="app-drawer" id="appDrawer">'
    + '<div class="app-drawer-head">'
    + '<img src="' + LOGO_WHITE + '" alt="لوگو">'
    + '<h3>مؤسسه تعالی اندیشه و رشد</h3>'
    + '<p>شماره ثبت: ۳۹۱</p>'
    + '</div>'
    + '<nav class="app-drawer-nav">'
    + '<a href="https://tashacol.ir/"><i class="fas fa-home"></i> خانه</a>'
    + '<a href="https://tashacol.ir/site-map/admin-panel.html"><i class="fas fa-user-gear"></i> ورود مدیران</a>'
    + '<a href="https://tashacol.ir/site-map/karbaran.html"><i class="fas fa-users"></i> ورود کاربران</a>'
    + '<a href="https://tashacol.ir/site-map/asatid-panel.html"><i class="fas fa-chalkboard-user"></i> ورود اساتید</a>'
    + '<a href="https://tashacol.ir/site-map/doreha.html"><i class="fas fa-laptop"></i> دوره‌های مجازی</a>'
    + '<a href="https://tashacol.ir/site-map/ketab-nashrie.html"><i class="fas fa-book"></i> کتابخانه و نشریات</a>'
    + '<a href="https://tashacol.ir/site-map/estelamat.html"><i class="fas fa-circle-info"></i> استعلامات</a>'
    + '<a href="https://tashacol.ir/site-map/marakez.html"><i class="fas fa-building"></i> مراکز وابسته</a>'
    + '<a href="https://tashacol.ir/site-map/abzarl-bazi.html"><i class="fas fa-puzzle-piece"></i> ابزار و بازی</a>'
    + '<a href="https://tashacol.ir/site-map/resane.html"><i class="fas fa-photo-film"></i> رسانه</a>'
    + '</nav>'
    + '<div class="app-drawer-foot">'
    + '<a href="' + PHONE + '"><i class="fas fa-phone-alt"></i> ۰۹۱۳۶۳۹۵۵۶۲</a>'
    + '<a href="mailto:irtashacol@gmail.com"><i class="fas fa-envelope"></i> irtashacol@gmail.com</a>'
    + '</div></aside>'
    + '<div class="app-drawer-overlay" id="appDrawerOverlay"></div>';

  /* ============ نوار پایین ============ */
  var items = [
    { href: '/',                                  icon: 'fa-home',         label: 'خانه',     id: 'home' },
    { href: '/site-map/doreha.html',              icon: 'fa-laptop',       label: 'دوره‌ها',   id: 'doreha' },
    { href: '/site-map/ketab-nashrie.html',       icon: 'fa-book',         label: 'کتابخانه', id: 'ketab' },
    { href: '/site-map/abzarl-bazi.html',         icon: 'fa-puzzle-piece', label: 'کاربردی',  id: 'abzar' },
    { href: '/site-map/resane.html',              icon: 'fa-photo-film',   label: 'رسانه',    id: 'resane' }
  ];

  // تعیین active
  function isActive(id) {
    if (id === 'home') return IS_HOME;
    if (id === 'doreha') return CURRENT_PATH.indexOf('doreha') > -1;
    if (id === 'ketab') return CURRENT_PATH.indexOf('ketab') > -1;
    if (id === 'abzar') return CURRENT_PATH.indexOf('abzar') > -1;
    if (id === 'resane') return CURRENT_PATH.indexOf('resane') > -1;
    return false;
  }

  var navHTML = '<nav class="app-bottom-nav">';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    var cls = isActive(it.id) ? ' class="active"' : '';
    navHTML += '<a href="https://tashacol.ir' + it.href + '"' + cls + '>'
      + '<i class="fas ' + it.icon + '"></i>'
      + '<span>' + it.label + '</span></a>';
  }
  navHTML += '</nav>';

  /* ============ تزریق به صفحه ============ */
  document.body.insertAdjacentHTML('afterbegin', headerHTML + drawerHTML);
  document.body.insertAdjacentHTML('beforeend', navHTML);

  /* ============ راه‌اندازی Drawer ============ */
  function setupDrawer() {
    var menuBtn = document.getElementById('appMenuBtn');
    var drawer = document.getElementById('appDrawer');
    var overlay = document.getElementById('appDrawerOverlay');

    if (menuBtn && drawer && overlay) {
      menuBtn.addEventListener('click', function () {
        drawer.classList.add('active');
        overlay.classList.add('active');
      });
      overlay.addEventListener('click', function () {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
      });
    }

    var backBtn = document.getElementById('appBackBtn');
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = 'https://tashacol.ir/';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDrawer);
  } else {
    setupDrawer();
  }

  /* ═══════════════════════════════════════════════════
     ★ رهگیری کلیک روی لینک‌های داخلی ★
     صفحات رو داخل اپ بارگذاری می‌کنه (نه در Chrome)
     ═══════════════════════════════════════════════════ */
  function isInternalLink(href) {
    if (!href) return false;
    if (href.indexOf('https://tashacol.ir/') === 0) return true;
    if (href.indexOf('http://tashacol.ir/') === 0) return true;
    if (href.charAt(0) === '/' && href.charAt(1) !== '/') return true;
    return false;
  }

  function toAbsoluteURL(href) {
    if (href.indexOf('http') === 0) return href;
    return 'https://tashacol.ir' + href;
  }

  function showLoader() {
    var existing = document.querySelector('.app-page-loader');
    if (existing) return;
    var loader = document.createElement('div');
    loader.className = 'app-page-loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
  }

  function hideLoader() {
    var loader = document.querySelector('.app-page-loader');
    if (loader) loader.remove();
  }

  function loadPageInApp(url) {
    showLoader();

    fetch(url, {
      credentials: 'include',
      headers: { 'Accept': 'text/html' }
    })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.text();
    })
    .then(function (html) {
      // اگر app-shell قبلاً هست، حذف کن تا دوباره تزریق بشه
      html = html.replace(/<script[^>]*app-shell\.js[^>]*><\/script>/gi, '');

      // تزریق app-shell قبل از </body>
      var injection = '<script src="https://tashacol.ir/app-shell.js" defer></script>';
      if (html.indexOf('</body>') !== -1) {
        html = html.replace('</body>', injection + '</body>');
      } else {
        html = html + injection;
      }

      // جایگزینی کل محتوای صفحه
      document.open();
      document.write(html);
      document.close();

      // بروزرسانی URL بدون رفرش
      try {
        window.history.pushState({ appShell: true }, '', url);
      } catch (e) {
        console.log('pushState error:', e);
      }
    })
    .catch(function (err) {
      console.error('خطا در بارگذاری صفحه:', err);
      hideLoader();
      // در صورت خطا، با روش معمول برو
      window.location.href = url;
    });
  }

  // رهگیری همه کلیک‌ها
  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a') : null;
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href) return;

    // لینک‌های خاص رو رد کن
    if (href.charAt(0) === '#' ||
        href.indexOf('tel:') === 0 ||
        href.indexOf('mailto:') === 0 ||
        href.indexOf('javascript:') === 0) return;

    // فقط لینک‌های داخلی
    if (!isInternalLink(href)) return;

    // جلوگیری از باز شدن پیش‌فرض
    e.preventDefault();
    e.stopPropagation();

    var absoluteURL = toAbsoluteURL(href);

    // اگر همون صفحه فعلیه، کاری نکن
    if (absoluteURL === window.location.href) return;

    loadPageInApp(absoluteURL);
  }, true);

  // مدیریت دکمه بازگشت مرورگر
  window.addEventListener('popstate', function () {
    // بارگذاری صفحه جدید
    var url = window.location.href;
    loadPageInApp(url);
  });

})();
