// ==========================================
// INISIALISASI VARIABEL GLOBAL
// ==========================================
const musik = document.getElementById('musikku');
const tombolMusik = document.getElementById('tombol-musik');
const iconMusik = document.getElementById('icon-musik');
let isPlaying = false;

// ==========================================
// BAGIAN 1: ANIMASI OPENING KADO
// ==========================================
function bukaKado() {
    const textUcapan = "Semoga di usia yang baru ini kamu semakin bersinar, rezekinya lancar kayak jalan tol, dan semua wishlist kamu tahun ini kecentang satu per satu. Aamiin!";
    const elementUcapan = document.getElementById('ucapan');
    
    elementUcapan.classList.remove('hidden');   
    let i = 0;
    function typeWriter() {
        if (i < textUcapan.length) {
            elementUcapan.innerHTML += textUcapan.charAt(i);
            i++;
            setTimeout(typeWriter, 50); 
        }
    }
    typeWriter();
    
    const colors = ['#FFC3C3', '#FFD1DC', '#9F3F4F', '#FFD700', '#ffffff'];

    // Tembakan Confetti
    confetti({ angle: 60, spread: 100, particleCount: 150, origin: { x: 0, y: 0.9 }, colors: colors, zIndex: 10000, startVelocity: 60, gravity: 1.2, drift: 0 });
    setTimeout(() => {
         confetti({ angle: 120, spread: 100, particleCount: 150, origin: { x: 1, y: 0.9 }, colors: colors, zIndex: 10000, startVelocity: 60, gravity: 1.2 });
    }, 200);

    const opening = document.getElementById('opening');
    const konten = document.getElementById('isi-konten');
    
    opening.style.transition = 'all 1s ease-in-out';
    opening.style.opacity = '0';
    opening.style.transform = 'scale(1.1)';
    opening.style.pointerEvents = 'none';
    
    setTimeout(() => {
        konten.style.display = 'block';
        tombolMusik.style.display = 'block';
        
        musik.volume = 0.5;
        musik.play().then(() => { isPlaying = true; }).catch(() => { 
            iconMusik.innerHTML = "🔇"; isPlaying = false; 
        });

        AOS.init({ once: true, duration: 1000 });
        setTimeout(() => { AOS.refresh(); }, 100);

        new Swiper(".mySwiper", {
            effect: "coverflow", grabCursor: true, centeredSlides: true, slidesPerView: "auto", initialSlide: 1,
            coverflowEffect: { rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
            pagination: { el: ".swiper-pagination", dynamicBullets: true },
            autoplay: { delay: 2500, disableOnInteraction: false },
        });

    }, 800);
}

// ==========================================
// BAGIAN 2: DATABASE KONTEN FAVORIT
// ==========================================
const kontenFavorit = {
    makanan: [
        { img: 'assets/nasigoreng.jpg', desc: 'Menu andalan sedunia, gapernah salah! 🍳' },
        { img: 'assets/geprek.png', desc: 'Ayam Geprek: Pedasnya bikin melek 🔥' },
        { img: 'assets/gacoan.jpg', desc: 'Mie Gacoan: Antri panjang pun dijabanin demi ini 🍜' },
        { img: 'assets/seblak.jpg', desc: 'Seblak: Moodbooster dikala pusing, pedes nampol! 🥘' },
        { img: 'assets/dimsum.jpeg', desc: 'Dimsum: Cemilan lembut yang bikin nagih 🥟' },
        { img: 'assets/tahukocek.jpg', desc: 'Tahu Kocek: Jajanan micin favorit sejuta umat 🍢' },
        { img: 'assets/mieayam.jpg', desc: 'Mie Ayam: Comfort food paling nyaman di perut 🍲' }
    ],
    minuman: [
        { img: 'assets/cokelat.jpg', desc: 'Apapun yang rasa Coklat: Sweet like you! 🍫' },
        { img: 'assets/kopi.jpg', desc: 'Coffee: Teman setia pas lagi nugas/kerja ☕' },
        { img: 'assets/taro.jpg', desc: 'Taro: Warna ungunya lucu, rasanya creamy 🍠' },
        { img: 'assets/redvelvet.jpg', desc: 'Red Velvet: Rasa mewah kayak kue, manis! 🍰' },
        { img: 'assets/matcha.jpg', desc: 'Matcha: Si hijau yang bikin tenang 🍵' }
    ],
    musik: [
        { img: 'assets/lovesongs.jpg', desc: 'Love Songs - Kaash Paige: Vibe-nya asik buat chill 🎶' },
        { img: 'assets/aboutyou.jpg', desc: 'About You - The 1975: Lagu galau estetik wajib! 🌫️' },
        { img: 'assets/flatline.jpg', desc: 'Flatline - Justin Bieber: Suaranya emang ga ada obat 🚑' },
        { img: 'assets/aziz.jpg', desc: 'Somebody\'s Pleasure: Liriknya dalem banget... 💔' },
        { img: 'assets/lanadelrey.jpg', desc: 'Cinnamon Girl: Lana Del Rey supremacy! 🎀' },
        { img: 'assets/blue.jpg', desc: 'Blue - Yung Kai: Lagu bucin paling cute saat ini 🦋' },
        { img: 'assets/lowkey.jpg', desc: 'Lowkey - NIKI: NIKI gapernah gagal bikin baper 🤫' },
        { img: 'assets/paradehujan.jpg', desc: 'Untuk Perempuan yang Sedang di Pelukan: Lagu puitis parah 🤗' }
    ],
    traveling: [
        { img: 'assets/mekkah.jpg', desc: 'Mekkah: Tanah suci, semoga bisa ibadah bareng di depan Ka\'bah. Aamiin paling kenceng! 🕋✨' },
        { img: 'assets/swis.png', desc: 'Swiss: Definisi surga dunia! View alamnya unreal kayak lukisan 🏔️🇨🇭' },
        { img: 'assets/jepang.jpeg', desc: 'Jepang: Liat Sakura mekar & kulineran street food, estetik parah 🌸🇯🇵' },
        { img: 'assets/korea.png', desc: 'Korea: OTW ketemu Oppa & napak tilas lokasi drakor favoritmu! 🇰🇷🥢' },
        { img: 'assets/bandung.jpg', desc: 'Bandung: City light & udara dingin, vibesnya romantis buat jalan berdua ☕🍃' }
    ]
};

// ==========================================
// BAGIAN 3: LOGIKA MODAL INTERAKTIF (FLIP & VINYL)
// ==========================================
function bukaModal(kategori) {
    const tempatKonten = document.getElementById('modal-content');
    const modalContainer = document.getElementById('modal-container');
    const data = kontenFavorit[kategori];
    let html = '';

    if (kategori === 'musik') {
        html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
        data.forEach(item => {
            html += `
            <div class="flex items-center gap-4 p-4 bg-pink-50 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div class="relative w-16 h-16 flex-shrink-0 rounded-full border-4 border-gray-900 group-hover:animate-[spin_3s_linear_infinite] overflow-hidden shadow-lg transition-all">
                    <img src="${item.img}" class="w-full h-full object-cover opacity-80" alt="Album Cover">
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 border-2 border-gray-500 rounded-full z-10"></div>
                </div>
                <p class="text-sm font-medium text-gray-700 leading-snug group-hover:text-pink-500 transition-colors">${item.desc}</p>
            </div>
            `;
        });
        html += '</div>';
    } else {
        html = '<div class="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">';
        data.forEach(item => {
            html += `
            <div class="flip-card h-48 w-full cursor-pointer">
                <div class="flip-card-inner shadow-md rounded-2xl">
                    <div class="flip-card-front rounded-2xl overflow-hidden">
                        <img class="h-full w-full object-cover shadow-lg" src="${item.img}" alt="Favorit Isti" />
                        <div class="absolute inset-0 bg-black/10 transition-opacity duration-300"></div>
                    </div>
                    <div class="flip-card-back bg-pink-100 px-4 py-2 flex flex-col items-center justify-center border-2 border-pink-300 shadow-inner rounded-2xl">
                        <div class="text-3xl mb-2 opacity-50 text-pink-400">✨</div>
                        <p class="text-sm font-medium leading-relaxed text-slate-800 text-center">${item.desc}</p>
                    </div>
                </div>
            </div>
            `;
        });
        html += '</div>';
    }

    tempatKonten.innerHTML = html;
    modalContainer.classList.remove('hidden'); 
}

// Fungsi tutup modal dipanggil dari tombol X di HTML
function tutupModal() {
    const modalContainer = document.getElementById('modal-container');
    if(modalContainer) modalContainer.classList.add('hidden');
}

// ==========================================
// BAGIAN 4: MUSIK, LILIN, PASSWORD, & SURAT
// ==========================================
function toggleMusik() {
    if (isPlaying) {
        musik.pause();
        iconMusik.innerHTML = "🔇";
        tombolMusik.classList.remove("animate-spin-slow");
    } else {
        musik.play();
        iconMusik.innerHTML = "🎵 ";
        tombolMusik.classList.add("animate-pulse");
        setTimeout(() => tombolMusik.classList.remove("animate-pulse"), 1000);
    }
    isPlaying = !isPlaying;
}

function tiupLilin() {
    const lilin = document.getElementById('lilin-nyala');
    const pesan = document.getElementById('pesan-harapan');

    lilin.style.transition = "all 1s ease";
    lilin.style.opacity = "0";
    lilin.style.transform = "scale(0.5)";

    confetti({ particleCount: 200, spread: 120, origin: { y: 0.7 }, colors: ['#FFE4E1', '#FF69B4', '#FFD700'] });

    setTimeout(() => {
        lilin.style.display = "none";
        pesan.classList.remove('hidden');
        requestAnimationFrame(() => {
            pesan.classList.remove('scale-0');
            pesan.classList.add('scale-100');
        });
    }, 800);
}

function cekPassword() {
    const input = document.getElementById('passcode').value;
    const gate = document.getElementById('gatekeeper');
    const errorMsg = document.getElementById('pesan-error');
    
    const PASSWORD_BENAR = "01-10-25"; 

    if (input === PASSWORD_BENAR) {
        gate.style.transform = "translateY(-100%)";
    } else {
        errorMsg.classList.remove('hidden');
        const card = document.querySelector('#gatekeeper .glass-card');
        card.classList.add('animate-bounce');
        setTimeout(() => card.classList.remove('animate-bounce'), 500);
        document.getElementById('passcode').value = "";
    }
}

function terbangkanPesawat() {
    const container = document.getElementById('pesawat-container');
    const pesawat = document.getElementById('pesawat');
    const trigger = document.getElementById('trigger-surat');
    
    trigger.style.transition = "all 0.5s";
    trigger.style.opacity = "0";
    trigger.style.transform = "scale(0.8)";
    
    container.classList.remove('hidden');
    pesawat.classList.add('animate-fly');
    
    setTimeout(() => {
        bukaSurat();
        setTimeout(() => {
            container.classList.add('hidden');
            pesawat.classList.remove('animate-fly');
        }, 1000);
    }, 1800);
}

function bukaSurat() {
    const modal = document.getElementById('modal-surat');
    const backdrop = document.getElementById('backdrop-surat');
    const konten = document.getElementById('konten-surat');

    modal.classList.remove('hidden');
    
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        konten.classList.remove('scale-0');
        konten.classList.remove('rotate-1'); 
    }, 50);
}

function tutupSurat() {
    const modal = document.getElementById('modal-surat');
    const backdrop = document.getElementById('backdrop-surat');
    const konten = document.getElementById('konten-surat');
    const trigger = document.getElementById('trigger-surat');

    backdrop.classList.add('opacity-0');
    konten.classList.add('scale-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        trigger.style.opacity = "1";
        trigger.style.transform = "scale(1)";
    }, 500);
}