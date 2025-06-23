document.addEventListener("DOMContentLoaded", () => {
  // Elemen UI
  const initialScreen = document.getElementById("initialScreen");
  const messageScreen = document.getElementById("messageScreen");
  const heartIcon = document.getElementById("heartIcon");
  const messageTitleDisplay = document.getElementById("messageTitle");
  const loveMessageDisplay = document.getElementById("loveMessage");
  const showAnotherGombalButton = document.getElementById("showAnotherGombal");
  const triggerPrankButton = document.getElementById("triggerPrank");
  const prankMessageDisplay = document.getElementById("prankMessage");
  const resetButton = document.getElementById("resetButton");
  const heartParticlesOverlay = document.getElementById("heartParticles");

  // Database Gombalan
  const gombalanMessages = [
    "Cuma kamu yang bisa membuat hatiku berdebar tanpa harus lari marathon.",
    "Kamu tahu bedanya kamu sama bintang? Kalau bintang di langit, kalau kamu di hatiku.",
    "Aku cuma butuh tiga hal di dunia ini: matahari, bulan, dan kamu. Matahari untuk siang, bulan untuk malam, kamu untuk selamanya.",
    "Kamu tahu nggak kenapa kita cuma bisa lihat pelangi setelah hujan? Karena keindahan sejati seperti kamu, butuh perjuangan untuk bisa dilihat.",
    "Tanganmu itu berat ya? Pantesan aja aku nggak bisa angkat tangan dari kamu.",
    "Aku punya satu pertanyaan buat kamu: 'Kamu nganggur nggak? Kalau nganggur, temenin aku yuk, aku kesepian nih.'",
  ];

  // Database Jahil (Pesan Jahil)
  const prankMessages = [
    "Kamu kira aku bakal ngajak jadian setelah ini? Hahaha, mana bisa! Nembak itu butuh persiapan. *kabur*",
    "Hahaha, udah senyum-senyum aja! Gombalan tadi khusus buat kamu... tapi dibayar kok. 😂",
    "Waduh, serius banget mukanya! Tenang aja, itu tadi cuma latihan. Tapi kalau beneran juga gapapa sih... *kedip*",
    "Kamu tahu kan kalau gombalan itu cuma fiksi? Realitanya, kamu lebih manis dari gombalan apapun!",
    "Selamat! Anda berhasil terkena gombalan receh. Hadiahnya... aku!",
  ];

  let currentGombalanIndex = -1; // Untuk melacak gombalan terakhir yang ditampilkan
  let isPrankTriggered = false; // Status jahil

  // Fungsi untuk menampilkan layar
  function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
      screen.classList.add("hidden");
    });
    document.getElementById(screenId).classList.add("active");
    document.getElementById(screenId).classList.remove("hidden");
  }

  // Fungsi untuk membuat efek partikel hati
  function createHeartParticle(x, y) {
    const heart = document.createElement("span");
    heart.classList.add("heart-particle");
    heart.textContent = "💖"; // Emoji hati
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heartParticlesOverlay.appendChild(heart);

    // Hapus partikel setelah animasinya selesai
    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  }

  // Fungsi untuk animasi ketik teks
  function typeText(element, text, speed = 50) {
    let i = 0;
    // Hapus animasi border-right (cursor) sementara
    element.style.borderRight = "none";
    element.style.width = "auto"; // Agar teks muncul dari awal
    element.textContent = ""; // Kosongkan teks sebelumnya

    return new Promise((resolve) => {
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          element.style.borderRight = ".15em solid var(--accent-orange)"; // Kembalikan cursor
          element.style.animation = "none"; // Hapus animasi ketik CSS bawaan
          resolve();
        }
      }
      type();
    });
  }

  // Fungsi untuk menampilkan pesan gombalan
  async function displayGombalan() {
    // Acak gombalan baru (pastikan tidak sama dengan yang terakhir jika memungkinkan)
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * gombalanMessages.length);
    } while (newIndex === currentGombalanIndex && gombalanMessages.length > 1); // Hindari duplikat jika > 1 gombalan

    currentGombalanIndex = newIndex;
    const gombalan = gombalanMessages[newIndex];

    messageTitleDisplay.textContent = "Pesan Rahasia Untukmu:";
    await typeText(loveMessageDisplay, gombalan, 30); // Panggil animasi ketik

    prankMessageDisplay.classList.add("hidden"); // Sembunyikan pesan jahil jika ada
    isPrankTriggered = false; // Reset status jahil
    showAnotherGombalButton.classList.remove("hidden");
    triggerPrankButton.classList.remove("hidden");
    resetButton.classList.add("hidden"); // Sembunyikan tombol ulang saat gombalan tampil
  }

  // Fungsi untuk memicu jahil
  function triggerPrank() {
    if (isPrankTriggered) return; // Mencegah klik jahil berulang

    isPrankTriggered = true;
    const prank =
      prankMessages[Math.floor(Math.random() * prankMessages.length)];

    prankMessageDisplay.textContent = prank;
    prankMessageDisplay.classList.remove("hidden"); // Tampilkan pesan jahil

    // Sembunyikan tombol gombal/jahil dan tampilkan tombol ulang
    showAnotherGombalButton.classList.add("hidden");
    triggerPrankButton.classList.add("hidden");
    resetButton.classList.remove("hidden");
  }

  // Fungsi reset game
  function resetGame() {
    initialScreen.classList.remove("hidden");
    initialScreen.classList.add("active");
    messageScreen.classList.add("hidden");
    messageScreen.classList.remove("active");

    // Reset semua status dan tampilan
    currentGombalanIndex = -1;
    isPrankTriggered = false;
    prankMessageDisplay.classList.add("hidden");
    loveMessageDisplay.textContent = "";
    messageTitleDisplay.textContent = "";

    // Pastikan partikel hati dihapus jika ada
    heartParticlesOverlay.innerHTML = "";
  }

  // Event Listeners
  heartIcon.addEventListener("click", () => {
    showScreen("messageScreen");
    displayGombalan(); // Tampilkan gombalan pertama
    // Buat efek partikel hati saat klik
    const rect = heartIcon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    for (let i = 0; i < 15; i++) {
      // Membuat 15 partikel hati
      setTimeout(() => {
        createHeartParticle(
          centerX + (Math.random() - 0.5) * 50,
          centerY + (Math.random() - 0.5) * 50
        );
      }, i * 50); // Delay sedikit untuk efek yang lebih baik
    }
  });

  showAnotherGombalButton.addEventListener("click", displayGombalan);
  triggerPrankButton.addEventListener("click", triggerPrank);
  resetButton.addEventListener("click", resetGame);

  // Inisialisasi: Tampilkan layar awal
  showScreen("initialScreen");
});
