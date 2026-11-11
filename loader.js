/* =====================================================
   LOADING SCREEN: pengendali
   - Mengunci scroll selama loading.
   - Tampil minimal MIN_MS supaya animasinya terlihat utuh
     (tidak berkedip kalau halaman sudah cepat selesai).
   - Hilang setelah semua gambar dan font selesai dimuat.
   - MAX_MS: pengaman, loading screen pasti hilang walau ada
     gambar atau font yang gagal dimuat.
   Letakkan sebelum markup #loader (paling atas halaman).
   ===================================================== */
(function () {
  var MIN_MS = 1300;
  var MAX_MS = 6000;

  var root = document.documentElement;
  var startedAt = Date.now();
  var finished = false;

  root.classList.add("is-loading");

  function finish() {
    if (finished) return;
    finished = true;

    var wait = Math.max(0, MIN_MS - (Date.now() - startedAt));
    setTimeout(function () {
      var el = document.getElementById("loader");
      if (!el) { root.classList.remove("is-loading"); return; }

      // bilah progres langsung penuh
      var bar = el.querySelector(".loader-bar i");
      if (bar) {
        var current = getComputedStyle(bar).width;
        bar.style.animation = "none";
        bar.style.width = current;
        void bar.offsetWidth;
        bar.style.transition = "width .35s ease";
        bar.style.width = "100%";
      }

      setTimeout(function () {
        el.classList.add("is-hiding");
        root.classList.remove("is-loading");
        setTimeout(function () {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, 800);
      }, bar ? 380 : 0);
    }, wait);
  }

  if (document.readyState === "complete") {
    finish();
  } else {
    window.addEventListener("load", finish);
  }
  setTimeout(finish, MAX_MS);
})();
