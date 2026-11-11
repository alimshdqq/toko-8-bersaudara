/* =====================================================
   8 BERSAUDARA — skrip utama
   Ubah bagian CONFIG di bawah untuk memperbarui produk, harga, dan nomor WhatsApp.
   ===================================================== */

const CONFIG = {
  shopName: "8 Bersaudara",
  waNumber: "6282240176262", // format internasional, tanpa + dan tanpa 0 di depan

  // kategori yang tampil sebagai tombol filter (urutan = urutan tombol)
  categories: ["Semua", "Abon", "Keripik Pisang", "Gurih & Pedas"],

  flavors: [
    {
      id: "abon-ori", cat: "Abon",
      name: "Abon Ayam Spesial", price: 50000, unit: "/pouch",
      img: "img/abon-original.jpg", tag: "Original", leaf: true,
      desc: "Gurih dan lezat dengan cita rasa ayam autentik.",
      komposisi: "Daging ayam, bawang merah, dan rempah pilihan."
    },
    {
      id: "abon-pedas", cat: "Abon",
      name: "Abon Ayam Pedas Spesial", price: 50000, unit: "/pouch",
      img: "img/abon-pedas.jpg", tag: "Pedas",
      desc: "Perpaduan abon ayam gurih dengan sensasi pedas.",
      komposisi: "Daging ayam, bawang merah, rempah, dan cabai."
    },
    {
      id: "pisang-lumer", cat: "Keripik Pisang",
      name: "Keripik Pisang Cokelat Lumer", price: 25000, unit: "/pouch",
      img: "img/keripik-lumer.jpg", tag: "Cokelat",
      desc: "Keripik pisang renyah dengan balutan cokelat lezat.",
      komposisi: "Pisang, cokelat, minyak goreng, dan gula."
    },
    {
      id: "pisang-tabur", cat: "Keripik Pisang",
      name: "Keripik Pisang Cokelat Tabur", price: 35000, unit: "/kemasan",
      img: "img/keripik-pisang.jpeg", tag: "Cokelat",
      desc: "Keripik pisang renyah dengan taburan cokelat yang lezat. Cocok untuk menemani waktu santai bersama keluarga.",
      komposisi: "Pisang, minyak goreng, cokelat, gula, dan garam."
    },
    {
      id: "pisang-cheese", cat: "Keripik Pisang",
      name: "Keripik Pisang Cheesemilk", price: 35000, unit: "/kemasan",
      img: "img/keripik-pisang-cheesmilk.jpeg", tag: "Keju & Susu",
      desc: "Keripik pisang renyah dengan perpaduan rasa keju dan susu yang gurih, manis, serta creamy.",
      komposisi: "Pisang, minyak goreng, bumbu keju, susu bubuk, gula, dan garam."
    },
    {
      id: "pastel-abon", cat: "Gurih & Pedas",
      name: "Pastel Abon", price: 30000, unit: "/kemasan",
      img: "img/pastel-abon.jpg", tag: "Gurih",
      desc: "Pastel renyah dengan isian abon ayam yang gurih dan lezat. Pilihan camilan nikmat untuk menemani waktu santai.",
      komposisi: "Tepung terigu, abon ayam, telur, margarin, air, bawang putih, garam, dan bumbu pilihan."
    },
    {
      id: "cipeng-pedas", cat: "Gurih & Pedas",
      name: "Cipeng Pedas", price: 20000, unit: "/kemasan",
      img: "img/cipeng-pedas.jpeg", tag: "Pedas",
      desc: "Cipeng dengan cita rasa pedas yang menggugah selera. Cocok dinikmati sebagai camilan saat bersantai.",
      komposisi: "Tepung tapioka, tepung terigu, bawang putih, garam, penyedap rasa, cabai bubuk, dan minyak goreng."
    },
    {
      id: "cipeng-ori", cat: "Gurih & Pedas",
      name: "Cipeng Original", price: 20000, unit: "/kemasan",
      img: "img/cipeng-ori.jpg", tag: "Original", leaf: true,
      desc: "Cipeng dengan rasa original yang gurih dan nikmat, cocok untuk camilan sehari-hari.",
      komposisi: "Tepung tapioka, tepung terigu, bawang putih, garam, penyedap rasa, dan minyak goreng."
    },
    {
      id: "mustofa", cat: "Gurih & Pedas",
      name: "Kentang Mustofa", price: 35000, unit: "/kemasan",
      img: "img/kentang-mustofa.jpeg", tag: "Pedas Manis",
      desc: "Kentang diiris tipis dan digoreng renyah, lalu dibalut bumbu pedas manis yang gurih dan menggugah selera.",
      komposisi: "Kentang, cabai, gula merah, gula pasir, bawang merah, bawang putih, garam, dan minyak goreng."
    }
  ],

  // paket: items = [id produk, jumlah]. Harga paket = jumlah harga produk.
  // Mau kasih diskon? Tambahkan  discount: 5000  (potongan dalam rupiah) pada paketnya.
  bundles: [
    {
      name: "Paket Abon Duo", badge: "Favorit",
      desc: "Original dan pedas sekaligus. Pas untuk dicoba berdua atau dibagi di rumah.",
      items: [["abon-ori", 1], ["abon-pedas", 1]]
    },
    {
      name: "Paket Oleh-oleh Garut", badge: "Hantaran",
      desc: "Abon, keripik pisang, dan cipeng dalam satu paket. Lengkap untuk dibawa pulang.",
      items: [["abon-ori", 1], ["pisang-cheese", 1], ["cipeng-ori", 1]]
    },
    {
      name: "Paket Teman Santai", badge: "Camilan",
      desc: "Pedas, manis, dan gurih dalam satu meja. Cocok untuk nonton atau kumpul keluarga.",
      items: [["mustofa", 1], ["cipeng-pedas", 1], ["pisang-tabur", 1]]
    }
  ]
};

/* ---------- util ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
const rupiah = (n) => "Rp " + new Intl.NumberFormat("id-ID").format(n);
const waLink = (t) => "https://wa.me/" + CONFIG.waNumber + "?text=" + encodeURIComponent(t);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const byId = {};
CONFIG.flavors.forEach((f) => { byId[f.id] = f; });

/* ---------- nomor & tautan WhatsApp umum ---------- */
const n = CONFIG.waNumber;
const waText = $("#wa-text");
if (waText) waText.textContent = n.startsWith("62") ? "+62 " + n.slice(2, 5) + "-" + n.slice(5, 9) + "-" + n.slice(9) : "+" + n;

const general = waLink("Halo " + CONFIG.shopName + ", saya mau tanya / pesan camilan.\n\nProduk: \nJumlah: \nNama: \nAlamat: \n\nMohon info total, ongkir, dan nomor rekening untuk transfer. Terima kasih.");
$$("[data-wa]").forEach((a) => { a.href = general; });

const statEl = $("#stat-products");
if (statEl) statEl.textContent = CONFIG.flavors.length;

/* ---------- marquee ---------- */
(function () {
  const el = $("#marquee");
  if (!el) return;
  const one = CONFIG.flavors.map((f) => "<span>" + esc(f.name) + "</span>").join("");
  el.innerHTML = one + one;
})();

/* =====================================================
   PESANAN (keranjang) — tersimpan di browser
   ===================================================== */
const Cart = {
  items: {},
  key: "8bersaudara-cart",
  load() {
    try {
      const raw = JSON.parse(localStorage.getItem(this.key) || "{}");
      Object.keys(raw).forEach((id) => { if (byId[id] && raw[id] > 0) this.items[id] = Math.min(99, raw[id] | 0); });
    } catch (e) { /* abaikan */ }
  },
  save() { try { localStorage.setItem(this.key, JSON.stringify(this.items)); } catch (e) { /* abaikan */ } },
  add(id, q) { this.items[id] = Math.min(99, (this.items[id] || 0) + q); this.save(); render(); },
  set(id, q) { if (q <= 0) delete this.items[id]; else this.items[id] = Math.min(99, q); this.save(); render(); },
  clear() { this.items = {}; this.save(); render(); },
  count() { return Object.keys(this.items).reduce((s, id) => s + this.items[id], 0); },
  total() { return Object.keys(this.items).reduce((s, id) => s + byId[id].price * this.items[id], 0); }
};

function orderMessage() {
  const ids = Object.keys(Cart.items);
  const lines = ids.map((id, i) => (i + 1) + ". " + byId[id].name + " x" + Cart.items[id] + " = " + rupiah(byId[id].price * Cart.items[id]));
  const name = ($("#f-name").value || "").trim();
  const addr = ($("#f-addr").value || "").trim();
  return "Halo " + CONFIG.shopName + ", saya mau pesan:\n\n" + lines.join("\n") +
    "\n\nTotal produk: " + rupiah(Cart.total()) + " (belum termasuk ongkir)\n\nNama: " + name + "\nAlamat: " + addr +
    "\n\nMohon info total akhir, ongkir, dan nomor rekening untuk transfer. Terima kasih.";
}

/* ---------- laci pesanan ---------- */
const cartEl = $("#cart"), overlay = $("#overlay");
let lastFocus = null;
function openCart() {
  lastFocus = document.activeElement;
  cartEl.removeAttribute("inert");
  cartEl.setAttribute("aria-hidden", "false");
  overlay.hidden = false;
  requestAnimationFrame(() => { cartEl.classList.add("open"); overlay.classList.add("show"); });
  document.documentElement.classList.add("cart-locked");
  setTimeout(() => { $("#cart-close").focus(); }, 60);
}
function closeCart() {
  cartEl.classList.remove("open");
  overlay.classList.remove("show");
  cartEl.setAttribute("aria-hidden", "true");
  cartEl.setAttribute("inert", "");
  document.documentElement.classList.remove("cart-locked");
  setTimeout(() => { overlay.hidden = true; }, 300);
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
$("#cart-open").addEventListener("click", openCart);
$("#cartbar-open").addEventListener("click", openCart);
$("#cart-close").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && cartEl.classList.contains("open")) closeCart(); });
$("#cart-clear").addEventListener("click", () => Cart.clear());

$("#cart-body").addEventListener("click", (e) => {
  const b = e.target.closest("[data-act]");
  if (!b) return;
  const id = b.dataset.id;
  if (b.dataset.act === "inc") Cart.set(id, (Cart.items[id] || 0) + 1);
  if (b.dataset.act === "dec") Cart.set(id, (Cart.items[id] || 0) - 1);
  if (b.dataset.act === "del") Cart.set(id, 0);
});

$("#cart-send").addEventListener("click", (e) => {
  if (!Cart.count()) { e.preventDefault(); return; }
  e.currentTarget.href = waLink(orderMessage());
});

function renderCart() {
  const ids = Object.keys(Cart.items);
  const count = Cart.count();

  const badge = $("#cart-count");
  badge.textContent = count;
  badge.hidden = count === 0;

  const bar = $("#cartbar");
  bar.hidden = count === 0;
  $("#cb-count").textContent = count;
  $("#cb-items").textContent = count + " item";
  $("#cb-total").textContent = rupiah(Cart.total());

  $("#cart-total").textContent = rupiah(Cart.total());
  $("#cart-foot").hidden = ids.length === 0;

  $("#cart-body").innerHTML = ids.length ? ids.map((id) => {
    const f = byId[id], q = Cart.items[id];
    return '<div class="ci"><img src="' + f.img + '" alt="" width="64" height="64">' +
      '<div class="ci-info"><b>' + esc(f.name) + '</b><small>' + rupiah(f.price) + ' ' + esc(f.unit) + '</small>' +
      '<div class="qty qty-sm"><button type="button" data-act="dec" data-id="' + id + '" aria-label="Kurangi ' + esc(f.name) + '">&minus;</button>' +
      '<output>' + q + '</output>' +
      '<button type="button" data-act="inc" data-id="' + id + '" aria-label="Tambah ' + esc(f.name) + '">+</button></div></div>' +
      '<div class="ci-side"><b>' + rupiah(f.price * q) + '</b><button type="button" class="linkbtn" data-act="del" data-id="' + id + '">Hapus</button></div></div>';
  }).join("") :
    '<div class="cart-empty"><div class="ce-art" aria-hidden="true">🛍️</div><b>Pesananmu masih kosong</b><p>Pilih camilan favoritmu dulu, nanti muncul di sini.</p>' +
    '<button type="button" class="btn btn-primary" id="ce-go">Lihat produk</button></div>';

  const go = $("#ce-go");
  if (go) go.addEventListener("click", () => { closeCart(); location.hash = "#rasa"; });
}

/* =====================================================
   PRODUK: filter + kartu
   ===================================================== */
const state = { cat: "Semua", qty: {} };
CONFIG.flavors.forEach((f) => { state.qty[f.id] = 1; });

function renderFilters() {
  $("#filters").innerHTML = CONFIG.categories.map((c) => {
    const num = c === "Semua" ? CONFIG.flavors.length : CONFIG.flavors.filter((f) => f.cat === c).length;
    return '<button type="button" class="chip' + (c === state.cat ? " on" : "") + '" data-cat="' + esc(c) + '" aria-pressed="' + (c === state.cat) + '">' + esc(c) + ' <span>' + num + "</span></button>";
  }).join("");
}

function renderFlavors(animate) {
  const list = state.cat === "Semua" ? CONFIG.flavors : CONFIG.flavors.filter((f) => f.cat === state.cat);
  $("#flavors").innerHTML = list.map((f, i) =>
    '<article class="flavor' + (animate ? " pop" : "") + '" style="--i:' + Math.min(i, 8) + '" data-id="' + f.id + '">' +
    '<div class="pic"><img src="' + f.img + '" alt="Kemasan ' + esc(f.name) + '" loading="lazy">' +
    '<span class="tag ' + (f.leaf ? "leaf" : "") + '">' + esc(f.tag) + "</span></div>" +
    '<div class="in"><h3>' + esc(f.name) + "</h3><p>" + esc(f.desc) + "</p>" +
    '<details class="komp"><summary>Komposisi</summary><p>' + esc(f.komposisi) + "</p></details>" +
    '<div class="buy"><div class="price">' + rupiah(f.price) + "<small>" + esc(f.unit) + "</small></div>" +
    '<div class="buy-row"><div class="qty"><button type="button" data-q="-1" aria-label="Kurangi jumlah">&minus;</button><output aria-live="polite">' + state.qty[f.id] + '</output><button type="button" data-q="1" aria-label="Tambah jumlah">+</button></div>' +
    '<button type="button" class="btn btn-primary add" data-add>Tambah</button></div></div></div></article>'
  ).join("");
}

$("#filters").addEventListener("click", (e) => {
  const b = e.target.closest(".chip");
  if (!b) return;
  state.cat = b.dataset.cat;
  renderFilters();
  renderFlavors(true);
});

$("#flavors").addEventListener("click", (e) => {
  const card = e.target.closest(".flavor");
  if (!card) return;
  const id = card.dataset.id;
  const q = e.target.closest("[data-q]");
  if (q) {
    state.qty[id] = Math.max(1, Math.min(99, state.qty[id] + Number(q.dataset.q)));
    $("output", card).textContent = state.qty[id];
    return;
  }
  const add = e.target.closest("[data-add]");
  if (add) {
    Cart.add(id, state.qty[id]);
    state.qty[id] = 1;
    $("output", card).textContent = 1;
    add.classList.add("added");
    add.textContent = "Ditambahkan ✓";
    setTimeout(() => { add.classList.remove("added"); add.textContent = "Tambah"; }, 1200);
    toast(byId[id].name + " masuk ke pesananmu");
  }
});

/* =====================================================
   PAKET
   ===================================================== */
function bundlePrice(b) {
  const sum = b.items.reduce((s, it) => s + byId[it[0]].price * it[1], 0);
  return { sum: sum, final: sum - (b.discount || 0) };
}
$("#bundles").innerHTML = CONFIG.bundles.map((b, i) => {
  const p = bundlePrice(b);
  return '<article class="bundle" data-i="' + i + '">' +
    '<div class="b-thumbs">' + b.items.map((it) => '<img src="' + byId[it[0]].img + '" alt="' + esc(byId[it[0]].name) + '" loading="lazy">').join("") + "</div>" +
    '<div class="b-in"><span class="tag">' + esc(b.badge) + "</span><h3>" + esc(b.name) + "</h3><p>" + esc(b.desc) + "</p>" +
    '<ul class="b-list">' + b.items.map((it) => "<li>" + (it[1] > 1 ? it[1] + "× " : "") + esc(byId[it[0]].name) + "</li>").join("") + "</ul>" +
    '<div class="b-buy"><div class="price">' + rupiah(p.final) + (b.discount ? "<s>" + rupiah(p.sum) + "</s>" : "") + "</div>" +
    '<button type="button" class="btn btn-primary" data-bundle="' + i + '">Tambah paket</button></div></div></article>';
}).join("");

$("#bundles").addEventListener("click", (e) => {
  const b = e.target.closest("[data-bundle]");
  if (!b) return;
  const bd = CONFIG.bundles[Number(b.dataset.bundle)];
  bd.items.forEach((it) => { Cart.items[it[0]] = Math.min(99, (Cart.items[it[0]] || 0) + it[1]); });
  Cart.save(); render();
  toast(bd.name + " masuk ke pesananmu");
  b.classList.add("added"); b.textContent = "Ditambahkan ✓";
  setTimeout(() => { b.classList.remove("added"); b.textContent = "Tambah paket"; }, 1200);
});

/* ---------- toast ---------- */
let toastT;
function toast(msg) {
  let t = $("#toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status");
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove("show"), 2200);
}

/* =====================================================
   FAQ: cari, filter kategori, buka semua
   ===================================================== */
(function () {
  const q = $("#faq-q"), chips = $$("#faq-chips .chip"), items = $$(".faq-item"),
        count = $("#faq-count"), toggle = $("#faq-toggle"), empty = $("#faq-empty");
  let cat = "Semua";

  function apply() {
    const term = q.value.trim().toLowerCase();
    let shown = 0;
    items.forEach((it) => {
      const ok = (cat === "Semua" || it.dataset.cat === cat) &&
                 (!term || it.textContent.toLowerCase().indexOf(term) > -1);
      it.hidden = !ok;
      if (ok) shown++;
    });
    count.textContent = shown + " pertanyaan";
    empty.hidden = shown !== 0;
    const visible = items.filter((it) => !it.hidden);
    const allOpen = visible.length > 0 && visible.every((it) => it.open);
    toggle.textContent = allOpen ? "Tutup semua" : "Buka semua";
    toggle.hidden = visible.length === 0;
  }

  q.addEventListener("input", apply);
  chips.forEach((c) => c.addEventListener("click", () => {
    cat = c.dataset.cat;
    chips.forEach((x) => { const on = x === c; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); });
    apply();
  }));
  toggle.addEventListener("click", () => {
    const visible = items.filter((it) => !it.hidden);
    const open = !visible.every((it) => it.open);
    visible.forEach((it) => { it.open = open; });
    apply();
  });
  items.forEach((it) => it.addEventListener("toggle", apply));
  apply();
})();

/* ---------- header: bayangan saat scroll ---------- */
(function () {
  const top = $(".top");
  const on = () => top.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", on, { passive: true });
  on();
})();

/* ---------- mulai ---------- */
function render() { renderCart(); }
Cart.load();
renderFilters();
renderFlavors(false);
render();
