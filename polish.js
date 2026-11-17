/* =====================================================
   ANIMASI HALUS (tambahan)
   - total harga menghitung naik/turun
   - kartu produk sedikit miring mengikuti kursor
   - remah abon pelan di belakang hero
   - meter pedas terisi saat kartu terlihat
   - cara pesan digambar seperti chat WhatsApp
   Hapus file ini + tag-nya di index.html untuk mematikan semuanya.
   ===================================================== */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- 1. total harga menghitung ---------- */
  function tween(el) {
    if (typeof rupiah !== "function") return;
    var last = parseInt(el.textContent.replace(/\D/g, ""), 10) || 0;
    var raf = 0, obs;
    obs = new MutationObserver(function () {
      var to = parseInt(el.textContent.replace(/\D/g, ""), 10) || 0;
      if (to === last) return;
      var from = last, t0 = performance.now();
      last = to;
      if (reduce) return;
      cancelAnimationFrame(raf);
      var step = function (now) {
        var p = Math.min(1, (now - t0) / 380), e = 1 - Math.pow(1 - p, 3);
        obs.disconnect();                       /* jangan amati tulisan kita sendiri */
        el.textContent = rupiah(Math.round(from + (to - from) * e));
        obs.observe(el, { childList: true, characterData: true, subtree: true });
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    obs.observe(el, { childList: true, characterData: true, subtree: true });
  }
  ["cb-total", "cart-total"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) tween(el);
  });

  /* ---------- 2. kartu produk miring halus ---------- */
  var flavors = document.getElementById("flavors");
  if (flavors && fine && !reduce) {
    flavors.addEventListener("pointermove", function (e) {
      var pic = e.target.closest(".pic");
      if (!pic) return;
      var r = pic.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      pic.style.setProperty("--ry", (x * 7).toFixed(2) + "deg");
      pic.style.setProperty("--rx", (-y * 7).toFixed(2) + "deg");
      pic.classList.add("tilt");
    });
    flavors.addEventListener("pointerout", function (e) {
      var pic = e.target.closest(".pic");
      if (!pic || pic.contains(e.relatedTarget)) return;
      pic.style.setProperty("--rx", "0deg");
      pic.style.setProperty("--ry", "0deg");
    });
  }

  /* ---------- 3. remah abon di hero ---------- */
  var art = $(".hero-art");
  if (art && !reduce) {
    var box = document.createElement("div");
    box.className = "hero-crumbs";
    box.setAttribute("aria-hidden", "true");
    [[10, 5, 11, 0], [24, 4, 13, 3], [38, 6, 12, 6], [55, 4, 14, 1], [70, 5, 10, 4], [86, 4, 13, 7]].forEach(function (c) {
      var i = document.createElement("i");
      i.style.cssText = "--x:" + c[0] + "%;--s:" + c[1] + "px;--t:" + c[2] + "s;--d:-" + c[3] + "s";
      box.appendChild(i);
    });
    art.insertBefore(box, art.firstChild);
  }

  /* ---------- 4. meter pedas ---------- */
  /* tingkat pedas per label produk (1-3). Ubah sesuai kenyataan. */
  var HEAT = { "Pedas": 2, "Pedas Manis": 1 };
  var CHILI = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18 3c-2 0-3 1-4 3-2 4-6 8-10 10 6 3 14 0 15-8 .3-2-.5-4-1-5z"/></svg>';
  var heatIO = "IntersectionObserver" in window && !reduce ? new IntersectionObserver(function (en) {
    en.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("on"); heatIO.unobserve(e.target); }
    });
  }, { threshold: 0.6 }) : null;

  function addHeat() {
    $$("#flavors .flavor").forEach(function (card) {
      if ($(".heat", card)) return;
      var tag = $(".tag", card), lvl = tag && HEAT[tag.textContent.trim()];
      if (!lvl) return;
      var h = document.createElement("span");
      h.className = "heat";
      h.setAttribute("role", "img");
      h.setAttribute("aria-label", "Tingkat pedas " + lvl + " dari 3");
      var s = "";
      for (var i = 1; i <= 3; i++) s += '<span class="' + (i <= lvl ? "hot" : "") + '" style="--k:' + i + '">' + CHILI + "</span>";
      h.innerHTML = s;
      $(".pic", card).appendChild(h);
      if (heatIO) heatIO.observe(h); else h.classList.add("on");
    });
  }
  if (flavors) {
    addHeat();
    new MutationObserver(addHeat).observe(flavors, { childList: true });
  }

  /* ---------- 5. cara pesan seperti chat ---------- */
  var steps = $$(".steps li");
  var LINES = [
    ["me", "Halo, saya mau pesan Abon Ayam Spesial."],
    ["shop", "Siap! Ini total belanja, ongkir, dan nomor rekeningnya."],
    ["me", "Sudah transfer ya, ini buktinya."]
  ];
  steps.forEach(function (li, i) {
    var l = LINES[i];
    if (!l) return;
    var d = document.createElement("div");
    d.className = "chat chat-" + l[0] + (reduce ? " sent go" : "");
    d.setAttribute("aria-hidden", "true");
    d.innerHTML = (l[0] === "shop" ? '<span class="dots"><i></i><i></i><i></i></span>' : "") + '<span class="msg">' + l[1] + "</span>";
    li.appendChild(d);
    if (reduce || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      io.disconnect();
      setTimeout(function () {
        d.classList.add("go");
        if (l[0] === "me") d.classList.add("sent");
        else setTimeout(function () { d.classList.add("sent"); }, 1100);
      }, 500 + i * 250);
    }, { threshold: 0.6 });
    io.observe(li);
  });
})();
