/* =====================================================
   Desa Pagerkidul - Admin Login UI (Frontend Demo)

   This file provides a simple login form UI *on index.html*
   by reusing the existing "Login Admin" trigger.

   Flow:
   1) Click Login Admin
   2) Show prompt (username/password) via modal overlay
   3) If credentials match demo, set localStorage admin_auth=1
   4) Redirect to admin.html

   NOTE:
   - index.html currently has only a link (no real login page).
   - We implement the login step client-side for demo.
===================================================== */

(function () {
  const AUTH_KEY = 'admin_auth';

  function setAuthed(val) {
    if (val) window.localStorage.setItem(AUTH_KEY, '1');
    else window.localStorage.removeItem(AUTH_KEY);
  }

  // Demo credentials
  const DEMO_USER = 'admin';
  const DEMO_PASS = 'admin';

  function ensureOverlay() {
    if (document.getElementById('adminLoginOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'adminLoginOverlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
      <div style="width:min(520px, 92vw); background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,.25);">
        <div style="padding:16px 20px; background:#f8fafc; border-bottom:1px solid #e5e7eb; display:flex; align-items:center; justify-content:space-between;">
          <div>
            <div style="font-weight:900; color:#166534;">Login Admin</div>
            <div style="font-size:12px; color:#6b7280; font-weight:700;">Demo: user=admin, password=admin</div>
          </div>
          <button type="button" id="adminLoginOverlayClose" style="border:none; background:transparent; font-size:18px; cursor:pointer;">×</button>
        </div>
        <div style="padding:18px 20px;">
          <div style="display:grid; grid-template-columns:1fr; gap:12px;">
            <label style="font-weight:800; color:#374151;">Username</label>
            <input id="adminLoginUsername" type="text" class="form-control" style="border:1px solid #d1d5db; border-radius:12px; padding:10px 12px;" placeholder="Masukkan username" />

            <label style="font-weight:800; color:#374151;">Password</label>
            <input id="adminLoginPassword" type="password" class="form-control" style="border:1px solid #d1d5db; border-radius:12px; padding:10px 12px;" placeholder="Masukkan password" />

            <div id="adminLoginError" style="display:none; padding:10px 12px; border-radius:12px; background:#fef2f2; color:#b91c1c; font-weight:800; border:1px solid #fecaca;">
              Username atau password salah.
            </div>

            <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:6px;">
              <button type="button" id="adminLoginCancel" style="padding:10px 14px; border-radius:12px; border:1px solid #d1d5db; background:#fff; font-weight:800; cursor:pointer;">Batal</button>
              <button type="button" id="adminLoginSubmit" style="padding:10px 14px; border-radius:12px; border:1px solid #166534; background:#166534; color:#fff; font-weight:900; cursor:pointer;">Masuk</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const closeBtn = document.getElementById('adminLoginOverlayClose');
    const cancelBtn = document.getElementById('adminLoginCancel');

    const hide = () => {
      overlay.style.display = 'none';
      const err = document.getElementById('adminLoginError');
      if (err) err.style.display = 'none';
    };

    closeBtn?.addEventListener('click', hide);
    cancelBtn?.addEventListener('click', hide);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) hide();
    });

    document.getElementById('adminLoginSubmit')?.addEventListener('click', () => {
      const username = (document.getElementById('adminLoginUsername')?.value || '').trim();
      const password = document.getElementById('adminLoginPassword')?.value || '';

      const err = document.getElementById('adminLoginError');

      if (username === DEMO_USER && password === DEMO_PASS) {
        setAuthed(true);
        hide();
        window.location.href = 'admin.html';
      } else {
        if (err) err.style.display = 'block';
      }
    });
  }

  function initLoginTrigger() {
    document.querySelectorAll('[data-action="login"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        ensureOverlay();
        const overlay = document.getElementById('adminLoginOverlay');
        overlay.style.display = 'flex';
        document.getElementById('adminLoginUsername')?.focus();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initLoginTrigger);
})();

