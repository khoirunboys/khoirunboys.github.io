
const KEY = "wearzaCart";

function ambilKeranjang() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
}

function rupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

function tampilkanKeranjang() {
    const data = ambilKeranjang();
    const daftar = document.getElementById("daftar-produk");

    let jumlah = 0;
    let subtotal = 0;

    data.forEach(p => {
        jumlah += Number(p.qty) || 1;
        subtotal += Number(p.price) * (Number(p.qty) || 1);
    });

    document.getElementById("jumlah").textContent = jumlah;
    document.getElementById("subtotal").textContent = rupiah(subtotal);
    document.getElementById("total").textContent = rupiah(subtotal);

    if (data.length === 0) {
        daftar.innerHTML = `
            <div class="kosong">
                <h3>🛒</h3>
                <h3>Keranjang masih kosong</h3>
                <p>Silakan pilih HP favoritmu.</p>
            </div>
        `;
    } else {
        daftar.innerHTML = data.map((p, i) => `
            <div class="item">
                <img src="${p.image || ''}" alt="${p.name}"
                     onerror="this.style.visibility='hidden'">

                <div class="info">
                    <h3>${p.name}</h3>
                    <p>${p.brand || 'Smartphone'}</p>
                    <p class="harga">${rupiah(p.price)}</p>

                    <div class="aksi">
                        <button onclick="ubahJumlah(${i}, -1)">-</button>
                        ${Number(p.qty) || 1}
                        <button onclick="ubahJumlah(${i}, 1)">+</button>
                    </div>
                </div>

                <div class="aksi">
                    <button class="hapus"
                        onclick="hapusProduk(${i})">
                        Hapus
                    </button>
                </div>
            </div>
        `).join("");
    }

    document.getElementById("checkout").disabled = data.length === 0;
}

function ubahJumlah(index, perubahan) {
    const data = ambilKeranjang();

    if (!data[index]) return;

    data[index].qty = (Number(data[index].qty) || 1) + perubahan;

    if (data[index].qty <= 0) {
        data.splice(index, 1);
    }

    localStorage.setItem(KEY, JSON.stringify(data));
    tampilkanKeranjang();
}

function hapusProduk(index) {
    const data = ambilKeranjang();

    data.splice(index, 1);

    localStorage.setItem(KEY, JSON.stringify(data));
    tampilkanKeranjang();
}

document.addEventListener("DOMContentLoaded", function() {
    tampilkanKeranjang();

    document.getElementById("checkout").addEventListener("click", function() {
        if (ambilKeranjang().length > 0) {
            alert("Checkout masih dalam tahap demo.");
        }
    });
});
