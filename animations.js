/* =====================================================
   ANIMASI: pengendali
   - Hero masuk bergantian setelah loading screen selesai.
   - Elemen lain muncul saat di-scroll (IntersectionObserver).
   - Bilah progres scroll dan tombol kembali ke atas.
   Dimuat paling akhir, setelah extra.js, supaya kartu paket dan
   testimoni yang dibuat lewat JS sudah ada di halaman.
   ===================================================== */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----- daftar elemen yang dianimasikan: [selector, kelas tambahan] ----- */
  var TARGETS = [
    [".section > .wrap > .eyebrow, .section > .wrap > h2, .section > .wrap > .sub", ""],
    [".points li", ""],
    [".ship li", ""],
    [".bundle", ""],
    [".why figure", "from-left"],
    [".why .wrap > div", "from-right"],
    [".reasons li", ""],
    [".story-copy", "from-left"],
    [".facts li", ""],
    [".steps li", ""],
    [".faq-item", ""],
    [".foot-grid > *", ""]
  ];

  function indexIn(el) {
    var i = 0;
    while ((el = el.previousElementSibling)) i++;
    return i;
  }

  function setup() {
    /* hero */
    var heroEls = document.querySelectorAll(
      ".hero .eyebrow, .hero h1, .hero .lead, .hero .cta, .hero-badges, .hero-art .pic, .sticker"
    );
    Array.prototype.forEach.call(heroEls, function (el, i) {
      el.classList.add("hero-in");
      el.style.setProperty("--i", i);
    });
    root.classList.add("is-ready");

    if (reduce || !("IntersectionObserver" in window)) return;

    /* scroll reveal */
    var seen = [];
    TARGETS.forEach(function (t) {
      Array.prototype.forEach.call(document.querySelectorAll(t[0]), function (el) {
        if (seen.indexOf(el) > -1) return;
        seen.push(el);
        el.classList.add("reveal");
        if (t[1]) el.classList.add(t[1]);
        /* jeda bertahap antar saudara (maks. 5 langkah supaya tidak kelamaan) */
        el.style.setProperty("--i", Math.min(indexIn(el), 5));
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in-view");
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    seen.forEach(function (el) { io.observe(el); });
  }

  /* ----- bilah progres + tombol ke atas ----- */
  function chrome() {
    if (reduce) return;
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    var top = document.createElement("button");
    top.type = "button";
    top.className = "to-top";
    top.setAttribute("aria-label", "Kembali ke atas");
    top.textContent = "↑";
    top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.appendChild(top);

    var ticking = false;
    function update() {
      ticking = false;
      var max = root.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = "scaleX(" + Math.min(1, Math.max(0, p)) + ")";
      top.classList.toggle("show", window.scrollY > 600);
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ----- tunggu loading screen hilang, baru mulai ----- */
  var started = false;
  function start() {
    if (started) return;
    started = true;
    setup();
    chrome();
  }

  var loader = document.getElementById("loader");
  if (!loader) {
    start();
  } else {
    /* mulai begitu loader mulai memudar, tidak perlu menunggu dihapus */
    var mo = new MutationObserver(function () {
      var el = document.getElementById("loader");
      if (!el || el.classList.contains("is-hiding")) { mo.disconnect(); start(); }
    });
    mo.observe(loader, { attributes: true, attributeFilter: ["class"] });
    mo.observe(document.body, { childList: true });
    /* pengaman: loader.js sendiri maksimal 6 detik + transisi */
    setTimeout(start, 7500);
  }
})();
