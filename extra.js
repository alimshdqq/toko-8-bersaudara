/* Paket dan testimoni. Dimuat setelah script inline (memakai CONFIG, rupiah, waLink). */
(function () {
  var esc = function (t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  /* ===== PAKET =====
     Harga paket = jumlah harga produk di CONFIG.flavors.
     Mau kasih potongan? Isi "discount" (rupiah). Kosongkan kalau tidak ada. */
  var BUNDLES = [
    { name: "Paket Gurih", note: "Duo abon ayam untuk keluarga.", items: ["Abon Ayam Spesial", "Abon Ayam Pedas Spesial"], discount: 0 },
    { name: "Paket Ngemil", note: "Camilan renyah untuk menemani santai.", items: ["Keripik Pisang Cokelat Lumer", "Cipeng Original", "Cipeng Pedas"], discount: 0 },
    { name: "Paket Oleh-oleh Garut", note: "Campuran favorit untuk hantaran.", items: ["Abon Ayam Spesial", "Keripik Pisang Cheesemilk", "Kentang Mustofa"], discount: 0 }
  ];

  var bundleBox = document.getElementById("bundles");
  if (bundleBox && typeof CONFIG !== "undefined") {
    bundleBox.innerHTML = BUNDLES.map(function (b) {
      var rows = b.items.map(function (nm) {
        return CONFIG.flavors.filter(function (f) { return f.name === nm; })[0];
      }).filter(Boolean);
      if (!rows.length) return "";
      var sum = rows.reduce(function (a, f) { return a + f.price; }, 0);
      var total = sum - (b.discount || 0);
      var text = "Halo " + CONFIG.shopName + ", saya mau pesan " + b.name + " (" +
        rows.map(function (f) { return f.name; }).join(", ") +
        ").\n\nJumlah paket: \nNama: \nAlamat: \n\nMohon info total, ongkir, dan nomor rekening untuk transfer. Terima kasih.";
      return '<article class="bundle"><h3>' + esc(b.name) + '</h3><p class="note">' + esc(b.note) + "</p><ul>" +
        rows.map(function (f) { return "<li><span>" + esc(f.name) + "</span><span>" + rupiah(f.price) + "</span></li>"; }).join("") +
        '</ul><div class="buy"><div class="price">' + rupiah(total) + "</div>" +
        '<a class="btn btn-wa" href="' + waLink(text) + '" target="_blank" rel="noopener">Pesan paket via WhatsApp</a></div></article>';
    }).join("");
  }

  /* ===== TESTIMONI =====
     Isi dengan ulasan ASLI dari pelanggan (minta izin dulu).
     Kalau array kosong, seluruh section otomatis disembunyikan.
     Untuk tangkapan layar chat: { img: "img/testi-1.jpg", name: "Nama", city: "Kota" } */
  var QUOTES = [
    // { text: "Abonnya gurih, tidak terlalu manis.", name: "Nama pembeli", city: "Kota" },
  ];

  var quoteBox = document.getElementById("quotes");
  var proof = document.getElementById("testimoni");
  if (quoteBox) {
    if (!QUOTES.length) {
      if (proof) proof.hidden = true;
    } else {
      quoteBox.innerHTML = QUOTES.map(function (q) {
        return '<figure class="quote">' +
          (q.img ? '<img src="' + esc(q.img) + '" alt="Chat pelanggan ' + esc(q.name) + '" loading="lazy">' : "<blockquote>" + esc(q.text) + "</blockquote>") +
          "<figcaption><b>" + esc(q.name) + "</b>" + esc(q.city || "") + "</figcaption></figure>";
      }).join("");
    }
  }
})();
