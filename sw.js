// ═══════════════════════════════════════════════════════
// Service Worker - مؤسسه تعالی اندیشه و رشد
// تزریق خودکار app-shell.js به همه صفحات
// ═══════════════════════════════════════════════════════
const CACHE_NAME = 'tashacol-v2';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // فقط GET
  if (req.method !== 'GET') return;

  // فقط دامنه خودمون
  if (url.origin !== self.location.origin) return;

  // فقط درخواست‌های HTML
  const accept = req.headers.get('accept') || '';
  if (!accept.includes('text/html')) return;

  event.respondWith(
    fetch(req).then(response => {
      const ct = response.headers.get('content-type') || '';
      if (!ct.includes('text/html')) return response;

      return response.text().then(html => {
        // اگر app-shell قبلاً هست، دوباره اضافه نکن
        if (html.indexOf('app-shell.js') !== -1) {
          return new Response(html, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
        }

        // تزریق اسکریپت
        const injection = '<script src="https://tashacol.ir/app-shell.js" defer></script>';
        let newHTML;

        if (html.indexOf('</body>') !== -1) {
          newHTML = html.replace('</body>', injection + '</body>');
        } else if (html.indexOf('</html>') !== -1) {
          newHTML = html.replace('</html>', injection + '</html>');
        } else {
          newHTML = html + injection;
        }

        // هدرها رو بازسازی کن (چون طول تغییر کرده)
        const headers = new Headers(response.headers);
        headers.delete('content-length');
        headers.delete('content-encoding');

        return new Response(newHTML, {
          status: response.status,
          statusText: response.statusText,
          headers: headers
        });
      });
    }).catch(() => {
      return new Response(
        '<!DOCTYPE html><html dir="rtl"><body style="font-family:sans-serif;text-align:center;padding:50px;"><h2>اتصال اینترنت برقرار نیست</h2><p>لطفاً اتصال خود را بررسی کنید.</p></body></html>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    })
  );
});
