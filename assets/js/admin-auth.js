/* =====================================================
   Desa Pagerkidul - Admin Auth (Frontend Demo)

   Implements basic login/logout behavior for admin UI
   using browser localStorage.

   - Login sets localStorage key: admin_auth = '1'
   - Logout clears it
   - admin.html reads it and redirects to index.html if not logged in

   Note: This is frontend-only (no backend).
===================================================== */

(function () {
  const AUTH_KEY = 'admin_auth';
  const LOGIN_URL = 'index.html';

  function isAuthed() {
    return window.localStorage.getItem(AUTH_KEY) === '1';
  }

  function setAuthed(val) {
    if (val) window.localStorage.setItem(AUTH_KEY, '1');
    else window.localStorage.removeItem(AUTH_KEY);
  }

  function showBlockedUI() {
    // Optional: show a simple overlay message and prevent interactions.
    // In this UI codebase we simply redirect to login page.
  }

  function initAuthGuard() {
    const logoutEl = document.querySelector('[data-action="logout"], #logout');

    // Attach logout handler (real navigation)
    if (logoutEl) {
      logoutEl.addEventListener('click', (e) => {
        e.preventDefault();
        setAuthed(false);
        window.location.href = LOGIN_URL;
      });
    }

    // Replace #logout links in admin.html that currently use onclick="return false;"
    // by capturing click on any anchor whose href is #logout.
    document.querySelectorAll('a[href="#logout"], #logout').forEach((el) => {
      el.addEventListener('click', (e) => {
        // If there's inline onclick="return false" it should still prevent navigation.
        // We override by performing logout + redirect.
        e.preventDefault();
        setAuthed(false);
        window.location.href = LOGIN_URL;
      });
    });

    // Guard admin page
    // Requirement: flow should be main page -> login -> admin dashboard.
    // So if not authed, redirect back.
    if (!isAuthed()) {
      window.location.href = LOGIN_URL;
    }

  }

  function initInlineLoginButton() {
    // Login Admin button (demo) => set auth and navigate to admin.html.
    // If auth is not set, the guard on admin.html will redirect back to index.html,
    // which looks like "login failed".
    document.querySelectorAll('[data-action="login"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // Prevent default href navigation to ensure auth is set first.
        e.preventDefault();
        setAuthed(true);
        window.location.href = 'admin.html';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    // If we're on admin.html, enforce auth
    if (window.location.pathname.toLowerCase().endsWith('admin.html')) {
      initAuthGuard();
    }

    // If we're on index.html, allow login with a demo prompt when a login trigger exists.
    initInlineLoginButton();
  });
})();

