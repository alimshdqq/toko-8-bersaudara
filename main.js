/* ===== CONFIG: ubah bagian ini untuk toko kamu ===== */
const CONFIG = {
  shopName: "8 Bersaudara",
  waNumber: "6281234567890",   // format internasional, tanpa + dan tanpa 0 di depan
  templateMode: true,          // ubah ke false untuk menyembunyikan pita "mode template"
  flavors: [
    {
      name: "Abon Ayam Spesial", price: 45000, unit: "per pouch", img: "img/abon-original.jpg",
      tag: "Original", desc: "Gurih, rasa asli ayam. Cocok untuk semua usia.",
      komposisi: "Daging ayam, bawang merah, rempah lainnya"
    },
    {
      name: "Abon Ayam Pedas Spesial", price: 45000, unit: "per pouch", img: "img/abon-pedas.jpg",
      tag: "Pedas", desc: "Abon yang sama dengan tambahan cabe untuk pecinta pedas.",
      komposisi: "Daging ayam, bawang merah, rempah lainnya, cabe"
    }
  ]
};

const $ = (s) => document.querySelector(s);
const rupiah = (n) => "Rp " + new Intl.NumberFormat("id-ID").format(n);
const waLink = (t) => "https://wa.me/" + CONFIG.waNumber + "?text=" + encodeURIComponent(t);
const orderText = (name) => "Halo " + CONFIG.shopName + ", saya mau pesan " + name + ".\n\nJumlah: \nNama: \nAlamat: \n\nMohon info total, ongkir, dan nomor rekening untuk transfer. Terima kasih.";

const n = CONFIG.waNumber;
$("#wa-text").textContent = n.startsWith("62") ? "+62 " + n.slice(2, 5) + "-" + n.slice(5, 9) + "-" + n.slice(9) : "+" + n;
if (!CONFIG.templateMode) $("#notice").hidden = true;
$("#notice-close").addEventListener("click", () => { $("#notice").hidden = true; });

const general = waLink("Halo " + CONFIG.shopName + ", saya mau pesan abon ayam.\n\nRasa: \nJumlah: \nNama: \nAlamat: \n\nMohon info total, ongkir, dan nomor rekening untuk transfer. Terima kasih.");
document.querySelectorAll('[data-wa]').forEach((a) => {
  a.href = a.dataset.wa === "keripik"
    ? waLink("Halo " + CONFIG.shopName + ", saya mau tanya tentang Keripik Pisang Cokelat.")
    : general;
});

$("#flavors").innerHTML = CONFIG.flavors.map((f) =>
  '<article class="flavor"><img src="' + f.img + '" alt="Kemasan ' + f.name + '" loading="lazy">' +
  '<div class="in"><span class="tag ' + (f.tag === "Original" ? "leaf" : "") + '">' + f.tag + "</span>" +
  "<h3>" + f.name + "</h3><p>" + f.desc + "</p>" +
  '<div class="komp"><b>Komposisi</b>' + f.komposisi + "</div>" +
  '<div class="buy"><div class="price">' + rupiah(f.price) + "<small>" + f.unit + "</small></div>" +
  '<a class="btn btn-wa" href="' + waLink(orderText(f.name)) + '" target="_blank" rel="noopener">Pesan via WhatsApp</a></div></div></article>'
).join("");