/* =====================================================
   ANIMASI TAMBAHAN
   1. Foto produk "terbang" ke keranjang saat tombol Tambah ditekan.
   2. Kartu kolase di footer jatuh satu per satu, sekali saja.
   Dimuat setelah main.js dan animations.js. Hapus file ini
   dan tag-nya di index.html untuk mematikan keduanya.
   ===================================================== */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function visible(r) {
    return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
  }
  function bump(el) {
    if (!el) return;
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  }

  /* ----- 1. terbang ke keranjang ----- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-add]");
    if (!btn) return;
    var card = btn.closest("article");
    var img = card && card.querySelector("img");
    var cartBtn = document.getElementById("cart-open");
    var bar = document.getElementById("cartbar");
    var badge = document.getElementById("cart-count");

    /* tujuan: ikon keranjang di header, atau bilah pesanan kalau header di luar layar */
    var target = cartBtn && cartBtn.getBoundingClientRect();
    if (!target || !visible(target)) {
      var b = bar && !bar.hidden && bar.getBoundingClientRect();
      target = b && visible(b) ? b : null;
    }
    setTimeout(function () { bump(badge); bump(document.getElementById("cb-count")); }, reduce ? 0 : 560);
    if (reduce || !img || !target || !img.animate) return;

    var from = img.getBoundingClientRect();
    if (!visible(from)) return;
    var size = 72;
    var fly = document.createElement("img");
    fly.src = img.currentSrc || img.src;
    fly.alt = "";
    fly.setAttribute("aria-hidden", "true");
    fly.className = "fly-img";
    fly.style.left = from.left + from.width / 2 - size / 2 + "px";
    fly.style.top = from.top + from.height / 2 - size / 2 + "px";
    document.body.appendChild(fly);

    var dx = target.left + target.width / 2 - (from.left + from.width / 2);
    var dy = target.top + target.height / 2 - (from.top + from.height / 2);
    var a = fly.animate([
      { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1, offset: 0 },
      { transform: "translate(" + dx * 0.5 + "px," + (dy * 0.5 - 70) + "px) scale(.75) rotate(-10deg)", opacity: 1, offset: 0.5 },
      { transform: "translate(" + dx + "px," + dy + "px) scale(.15) rotate(8deg)", opacity: 0.4, offset: 1 }
    ], { duration: 650, easing: "cubic-bezier(.5,0,.75,.4)" });
    a.onfinish = a.oncancel = function () { if (fly.parentNode) fly.parentNode.removeChild(fly); };
  });

  /* ----- 2. kartu footer jatuh sekali ----- */
  var stack = document.querySelector(".pc-stack");
  if (stack && !reduce && "IntersectionObserver" in window) {
    Array.prototype.forEach.call(stack.children, function (c, i) { c.style.setProperty("--n", i); });
    stack.classList.add("pc-wait");
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      stack.classList.remove("pc-wait");
      stack.classList.add("pc-drop");
    }, { threshold: 0.35 });
    io.observe(stack);
  }
})();
