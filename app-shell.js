   /* ============ رهگیری کلیک روی لینک‌های داخلی ============ */
document.addEventListener('click', function (e) {
  var link = e.target.closest ? e.target.closest('a') : null;
  if (!link) return;

  var href = link.getAttribute('href');
  if (!href) return;

  // فقط لینک‌های داخلی سایت
  var isInternal = href.indexOf('https://tashacol.ir/') === 0 ||
                   href.indexOf('http://tashacol.ir/') === 0 ||
                   (href.charAt(0) === '/' && href.charAt(1) !== '/');

  if (!isInternal) return;

  // اگر در اپ هستیم، از باز شدن در Chrome جلوگیری کن
  if (link.hasAttribute('target')) {
    e.preventDefault();
    if (href.indexOf('http') === 0) {
      window.location.href = href;
    } else {
      window.location.href = 'https://tashacol.ir' + href;
    }
  }
}, true);
