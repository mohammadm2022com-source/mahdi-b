// ============ تنظیمات اولیه ============
const letterParagraphs = [
    "هر شب که به ماه نگاه می‌کنم، لبخند تو را در آن می‌بینم. تو مثل مهتابی، روشنایی‌بخش تاریکی‌های زندگی من هستی.",
    "از وقتی تو را دیدم، فهمیدم که قلبم همیشه جای خالی‌اش را با تو پر می‌کرده. تو تکمیل‌کننده‌ی من هستی، نصف گمشده‌ام.",
    "صدایت مثل آهنگی است که هرگز از ذهنم پاک نمی‌شود. کلماتت مثل نسیم صبحگاهی، روحم را نوازش می‌دهد.",
    "می‌دانی چه چیزی زیباتر از یک گل رز است؟ لبخند تو، وقتی مرا می‌بینی و چشمانت مثل ستاره‌ها می‌درخشد.",
    "اگر روزی تمام دنیا فراموشم کنند، کافیست تو یک بار نامم را صدا بزنی تا دوباره زنده شوم. تو معنای زندگی منی.",
    "دوستت دارم، نه فقط به خاطر زیبایی‌ات، بلکه به خاطر تمام لحظاتی که با هم ساخته‌ایم و تمام لحظاتی که هنوز نیامده.",
    "و این نامه را با تمام قلبم نوشتم، تا بدانی که هر کلمه‌اش از عمق جانم برخاسته. تا ابد، مال تو."
];

// ============ المان‌های DOM ============
const envelope = document.getElementById('envelope');
const envelopeWrapper = document.getElementById('envelopeWrapper');
const letter = document.getElementById('letter');
const letterBody = document.getElementById('letterBody');
const hint = document.getElementById('hint');
const closeBtn = document.getElementById('closeBtn');
const musicBtn = document.getElementById('musicBtn');
const soundBtn = document.getElementById('soundBtn');
const bgMusic = document.getElementById('bgMusic');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const nightSky = document.getElementById('nightSky');
const petalsContainer = document.getElementById('petalsContainer');
const particlesCanvas = document.getElementById('particlesCanvas');
const particlesCtx = particlesCanvas.getContext('2d');

// ============ وضعیت ============
let state = {
    isOpened: false,
    isTyping: false,
    musicOn: false,
    soundOn: true,
    typingTimeout: null,
    particles: [],
    audioContext: null
};

// ============ ایجاد ستاره‌ها ============
function createStars() {
    const count = window.innerWidth < 480 ? 80 : 150;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2.5 + 0.5;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.setProperty('--delay', Math.random() * 5 + 's');
        if (Math.random() > 0.7) {
            star.style.background = '#fff8dc';
        }
        nightSky.appendChild(star);
    }
}

// ============ ایجاد گلبرگ‌ها ============
function createPetals() {
    const count = window.innerWidth < 480 ? 8 : 15;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            const size = Math.random() * 15 + 15;
            petal.style.width = size + 'px';
            petal.style.height = size + 'px';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.setProperty('--fall-duration', (Math.random() * 8 + 10) + 's');
            petal.style.setProperty('--fall-delay', Math.random() * 5 + 's');
            petal.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
            petal.style.setProperty('--drift2', (Math.random() * 100 - 50) + 'px');
            
            const colors = [
                'radial-gradient(ellipse at center, #ff6b9d 0%, #c2185b 70%, #880e4f 100%)',
                'radial-gradient(ellipse at center, #ff8a80 0%, #d32f2f 70%, #b71c1c 100%)',
                'radial-gradient(ellipse at center, #f8bbd0 0%, #ec407a 70%, #ad1457 100%)'
            ];
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            petalsContainer.appendChild(petal);
            
            setTimeout(() => petal.remove(), 20000);
        }, i * 800);
    }
    
    if (state.isOpened) {
        setTimeout(createPetals, 8000);
    }
}

// ============ سیستم ذرات نور ============
function initParticles() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
    
    const count = window.innerWidth < 480 ? 30 : 60;
    for (let i = 0; i < count; i++) {
        state.particles.push({
            x: Math.random() * particlesCanvas.width,
            y: Math.random() * particlesCanvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.5 - 0.2,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            pulse: Math.random() * Math.PI * 2
        });
    }
}

function drawParticles() {
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    state.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        
        if (p.y < -10) p.y = particlesCanvas.height + 10;
        if (p.x < 0) p.x = particlesCanvas.width;
        if (p.x > particlesCanvas.width) p.x = 0;
        
        const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
        
        const gradient = particlesCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `rgba(255, 215, 100, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(255, 180, 100, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 180, 100, 0)');
        
        particlesCtx.fillStyle = gradient;
        particlesCtx.beginPath();
        particlesCtx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        particlesCtx.fill();
        
        particlesCtx.fillStyle = `rgba(255, 255, 200, ${currentOpacity})`;
        particlesCtx.beginPath();
        particlesCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        particlesCtx.fill();
    });
    
    requestAnimationFrame(drawParticles);
}

// ============ صداها با Web Audio API ============
function initAudio() {
    if (!state.audioContext) {
        state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    if (!state.soundOn) return;
    initAudio();
    
    const ctx = state.audioContext;
    const now = ctx.currentTime;
    
    if (type === 'open') {
        // صدای باز شدن پاکت - ورق زدن
        const noise = ctx.createBufferSource();
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.1));
        }
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2000;
        filter.Q.value = 1;
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
    } else if (type === 'click') {
        // صدای کلیک
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 800;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === 'type') {
        // صدای تایپ
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 200 + Math.random() * 100;
        osc.type = 'square';
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.03);
    }
}

// ============ افکت تایپ پاراگراف ============
async function typeParagraph(text, paragraphIndex, totalParagraphs) {
    return new Promise((resolve) => {
        const p = document.createElement('p');
        letterBody.appendChild(p);
        
        let charIndex = 0;
        const totalChars = letterParagraphs.reduce((sum, t) => sum + t.length, 0);
        let charsSoFar = letterParagraphs.slice(0, paragraphIndex).reduce((sum, t) => sum + t.length, 0);
        
        function typeChar() {
            if (charIndex < text.length) {
                p.textContent = text.substring(0, charIndex + 1);
                charIndex++;
                
                const progress = ((charsSoFar + charIndex) / totalChars) * 100;
                progressFill.style.width = progress + '%';
                
                if (charIndex % 3 === 0) playSound('type');
                
                // اسکرول خودکار
                letter.scrollTop = letter.scrollHeight;
                
                const speed = text[charIndex - 1] === ' ' ? 30 : 50;
                state.typingTimeout = setTimeout(typeChar, speed);
            } else {
                p.classList.add('done');
                resolve();
            }
        }
        
        typeChar();
    });
}

async function startTyping() {
    state.isTyping = true;
    progressBar.classList.remove('hidden');
    
    for (let i = 0; i < letterParagraphs.length; i++) {
        if (!state.isTyping) break;
        await typeParagraph(letterParagraphs[i], i, letterParagraphs.length);
        await new Promise(r => setTimeout(r, 500));
    }
    
    state.isTyping = false;
    setTimeout(() => {
        progressBar.classList.add('hidden');
    }, 1500);
}

function resetLetter() {
    if (state.typingTimeout) clearTimeout(state.typingTimeout);
    state.isTyping = false;
    letterBody.innerHTML = '';
    progressFill.style.width = '0%';
    progressBar.classList.add('hidden');
}

// ============ باز کردن پاکت ============
function openEnvelope() {
    if (state.isOpened) return;
    state.isOpened = true;
    
    initAudio();
    playSound('open');
    
    envelope.classList.add('opened');
    hint.classList.add('hidden');
    closeBtn.classList.remove('hidden');
    
    // ایجاد گلبرگ‌ها
    createPetals();
    
    // نمایش نامه
    setTimeout(() => {
        letter.classList.add('show');
        setTimeout(startTyping, 800);
    }, 1200);
}

// ============ بستن نامه ============
function closeEnvelope() {
    if (!state.isOpened) return;
    
    resetLetter();
    playSound('click');
    
    letter.classList.remove('show');
    closeBtn.classList.add('hidden');
    
    setTimeout(() => {
        envelope.classList.remove('opened');
        state.isOpened = false;
        setTimeout(() => {
            hint.classList.remove('hidden');
        }, 500);
    }, 800);
}

// ============ کنترل موسیقی ============
function toggleMusic() {
    state.musicOn = !state.musicOn;
    const icon = document.getElementById('musicIcon');
    
    if (state.musicOn) {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => {
            state.musicOn = false;
            icon.textContent = '🎵';
            musicBtn.classList.remove('active');
        });
        icon.textContent = '🎶';
        musicBtn.classList.add('active');
    } else {
        bgMusic.pause();
        icon.textContent = '🎵';
        musicBtn.classList.remove('active');
    }
}

function toggleSound() {
    state.soundOn = !state.soundOn;
    const icon = document.getElementById('soundIcon');
    icon.textContent = state.soundOn ? '🔊' : '🔇';
    soundBtn.classList.toggle('active', state.soundOn);
    if (state.soundOn) playSound('click');
}

// ============ رویدادها ============
envelopeWrapper.addEventListener('click', openEnvelope);
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeEnvelope();
});
musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
});
soundBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSound();
});

// جلوگیری از زوم دوبار لمس
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) e.preventDefault();
});

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
}, false);

// تغییر سایز صفحه
window.addEventListener('resize', () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
});

// ============ راه‌اندازی اولیه ============
createStars();
initParticles();
drawParticles();

// ایجاد دوره‌ای گلبرگ‌ها در حالت عادی
setInterval(() => {
    if (!state.isOpened) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        const size = Math.random() * 12 + 10;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.setProperty('--fall-duration', (Math.random() * 6 + 8) + 's');
        petal.style.opacity = '0.5';
        petalsContainer.appendChild(petal);
        setTimeout(() => petal.remove(), 15000);
    }
}, 2000);

// پیام خوش‌آمدگویی در کنسول
console.log('%c💌 نامه‌ای از قلب من', 'color: #d4af37; font-size: 24px; font-weight: bold;');
console.log('%cساخته شده با ❤️', 'color: #e91e63; font-size: 14px;');
