# Rencana Perbaikan Responsive Admin Dashboard

## Information Gathered
- `admin.html` memakai layout:
  - Wrapper `.admin-shell` (display flex) berisi sidebar `<aside class="admin-sidebar collapsed show">` dan `<main class="admin-main">`.
  - Di dalam `admin-content` terdapat grid Bootstrap `row` dengan kolom utama `.col-lg-8` dan panel kanan `.col-lg-4 admin-right`.
  - Topbar menggunakan `position: sticky`.
- `assets/css/admin.css` sudah punya media query untuk:
  - `max-width: 992px`: sidebar jadi fixed dan disembunyikan pakai transform translateX(-110%), dan `.admin-right` jadi `position: static`.
  - `max-width: 576px`: padding konten diperkecil dan ukuran angka stat card.
- Potensi masalah responsive yang perlu diperbaiki:
  - Saat lebar sangat kecil, elemen right panel dan topbar bisa tetap “ketat” karena padding/overflow.
  - Sidebar “collapsed show” tanpa kontrol class yang konsisten di mobile bisa memunculkan perilaku tidak diinginkan.
  - Perlu penyesuaian agar konten grid (main column vs right panel) wrap lebih rapi pada tablet/mobile.

## Plan
1. Update `assets/css/admin.css`:
   - Tambahkan aturan media query untuk `max-width: 768px` dan `max-width: 576px` agar:
     - `.admin-content` punya padding lebih kecil dan aman dari overflow.
     - `.admin-right` punya margin-top agar ketika berubah baris (stack) layout tetap rapi.
     - `table` tetap scroll horizontal lewat `.table-responsive` (Bootstrap sudah, tapi kita pastikan tidak ada CSS yang merusak).
     - Topbar search input dan tombol ikon punya ukuran/flex yang lebih pas pada mobile.
   - Pastikan `.admin-shell` ketika sidebar fixed tidak menyebabkan horizontal overflow (mis. gunakan `overflow-x: hidden` pada `.admin-shell` di breakpoint tertentu).
2. (Opsional ringan) Pastikan `#mobileSidebarOpen` dan `#mobileSidebarClose` benar-benar mengontrol class `show`.
   - Ini sudah ada di `assets/js/admin.js`.
3. Buat langkah verifikasi cepat:
   - Buka `admin.html` di viewport: 375px, 768px, 1024px, 1440px.
   - Cek: sidebar di mobile bisa dibuka/ditutup, right panel tidak menabrak konten, tabel tetap bisa di-scroll.

## Dependent Files to be edited
- `assets/css/admin.css`

## Followup steps
- Setelah edit, refresh browser dan tes beberapa ukuran layar.


