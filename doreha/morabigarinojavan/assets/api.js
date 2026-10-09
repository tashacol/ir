/************************************************************
 * api.js — لایه ارتباط با سرور
 ************************************************************/

// ⚠️ این را بعد از Deploy پر کن
const API_URL = 'https://script.google.com/macros/s/AKfycbwZ4ZIRa__VnKcr1_6NSAQYHjI5fIUIkjy63syDN9_eU0hAqPUdBsBCjsg2k6d8yIzW/exec';

function getToken() { return sessionStorage.getItem('tok') || null; }
function setToken(t) { sessionStorage.setItem('tok', t); }
function clearToken() { sessionStorage.removeItem('tok'); }

async function api(action, payload) {
  const body = JSON.stringify({
    action: action,
    payload: payload || {},
    token: getToken()
  });

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: body,
    redirect: 'follow'
  });

  const data = await res.json();

  if (!data.ok) {
    if (data.error === 'AUTH_REQUIRED') {
      clearToken();
      location.href = 'index.html';
      return;
    }
    throw new Error(data.error);
  }
  return data;
}
