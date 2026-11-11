
// Pesan ketika website dibuka
console.log("Selamat datang di FASHORA PHONE!");

// Tombol produk
const buttons = document.querySelectorAll(".btn");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        console.log("Tombol berhasil diklik");
    });
});
