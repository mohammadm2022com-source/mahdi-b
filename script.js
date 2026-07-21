// ============ محتوای نامه (صمیمی، دوستانه، بدون سبک مذهبی) ============
const letterParagraphs = [
    "سلام رفیق! 😊 می‌دونستی که تو خاص‌ترین آدم دنیای منی؟ آره، جدی میگم. هر بار که فکر می‌کنم چقدر خوش‌شانس بودم که تو رو توی زندگیم دارم، یه لبخند بزرگ روی لبهام میاد.",

    "یادته اون روزا که با هم از صبح تا شب حرف می‌زدیم و اصلاً وقت نمی‌فهمیدیم؟ هنوز هم وقتی کنارتم، همون حس قشنگ رو دارم. انگار هیچی تغییر نکرده، فقط بزرگ‌تر و قشنگ‌تر شدیم.",

    "می‌خوام بدونی که هر وقت دلم تنگ میشه، کافیه یادته کنم تا یه دنیا انرژی بگیرم. تو اون آدمی هستی که با یه پیام ساده می‌تونی کل روزمو بسازی. این قدرت توئه، نه کم گذاشتی نه زیاد.",

    "۱۹ سالته میشه. ای جان! یه سال دیگه از بهترین آدم دنیا گذشت. کاش می‌تونستم همه‌ی آرزوهات رو یه‌جا جمع کنم و بذارم توی یه جعبه‌ی قشنگ بهت بدم. لایق بهترین‌هایی داداش/خواهر کوچیکتر من.",

    "قول میدم هر جا که باشم، هر وقت که صدام کنی، کنارت باشم. چون دوستی مثل تو رو هر کسی توی عمرش پیدا نمیکنه. خدا رو شکر می‌کنم هر روز که تو رو دارم. دوستت دارم به اندازه‌ی همه‌ی ستاره‌های آسمون 🌟",

    "پس امشب وقتی شمع‌ها رو فوت می‌کنی، یه آرزو کن که من هم باهاش هستم. چون آرزوهای من و تو، از اول یکی بوده. تولدت هزار بار مبارک دوست من! 🎂🎉"
];

// ============ المان‌ها ============
const envelopeStage = document.getElementById('envelopeStage');
const envelope = document.getElementById('envelope');
const envelopeWrapper = document.getElementById('envelopeWrapper');
const envelopeFlap = document.getElementById('envelopeFlap');
const letterStage = document.getElementById('letterStage');
const letter = document.getElementById('letter');
const letterBody = document.getElementById('letterBody');
const hint = document.getElementById('hint');
const closeBtn = document.getElementById('closeBtn');
const musicBtn = document.getElementById('musicBtn');
const soundBtn = document.getElementById('soundBtn');
const musicIcon = document.getElementById('musicIcon');
const soundIcon = document.getElementById('soundIcon');
const bgMusic = document.getElementById('bgMusic');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const nightSky = document.getElementById('nightSky');
const stickersContainer = document.getElementById('stickersContainer');
const cakeContainer = document.getElementById('cakeContainer');
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

// ============ ستاره‌ها ============
function createStars() {
    const count = window.innerWidth < 480 ? 80 : 150;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        if (Math.random() > 0.85) star.classList.add('gold');
        const size = Math.random() * 2 + 0.5;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.setProperty('--delay', Math.random() * 5 + 's');
        nightSky.appendChild(star);
    }
}

// ============ استیکرها ============
function createSticker() {
    const stickers = ['🎂', '🎉', '🎁', '💐', '✨', '🎈', '🎊', '💝', '🌹', '🥳'];
    const sticker = document.createElement('div');
    sticker.className = 'sticker';
    sticker.textContent = stickers[Math.floor(Math.random() * stickers.length)];
    
    sticker.style.left = Math.random() * window.innerWidth + 'px';
    sticker.style.setProperty('--float-duration', (Math.random() * 6 + 10) + 's');
    sticker.style.setProperty('--float-delay', Math.random() * 2 + 's');
    sticker.style.setProperty('--rotation', (Math.random() * 720 - 360) + 'deg');
    sticker.style.fontSize = (Math.random() * 14 + 26) + 'px';
    
    stickersContainer.appendChild(sticker);
    setTimeout(() => sticker.remove(), 17000);
}

function startStickers() {
    for (let i = 0; i < 8; i++) {
        setTimeout(createSticker, i * 1200);
    }
    // تکرار مداوم
    const interval = setInterval(() => {
        if (!state.isOpened) {
            clearInterval(interval);
            return;
        }
        createSticker();
    }, 2500);
}

// ============ ذرات نور ============
function initParticles() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
    
    const count = window.innerWidth < 480 ? 30 : 60;
    for (let i = 0; i < count; i++) {
        state.particles.push({
            x: Math.random() * particlesCanvas.width,
            y: Math.random() * particlesCanvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.4 - 0.1,
            size: Math.random() * 2.5 + 1,
            opacity: Math.random() * 0.6 + 0.3,
            pulse: Math.random() * Math.PI * 2,
            color: Math.random() > 0.5 ? 'gold' : 'rose'
        });
    }
}

function drawParticles() {
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    state.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.025;
        
        if (p.y < -10) p.y = particlesCanvas.height + 10;
        if (p.x < -10) p.x = particlesCanvas.width + 10;
        if (p.x > particlesCanvas.width + 10) p.x = -10;
        
        const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
        
        const r = p.color === 'gold' ? 255 : 233;
        const g = p.color === 'gold' ? 215 : 30;
        const b = p.color === 'gold' ? 100 : 99;
        
        const gradient = particlesCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity})`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        particlesCtx.fillStyle = gradient;
        particlesCtx.beginPath();
        particlesCtx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        particlesCtx.fill();
        
        particlesCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
        particlesCtx.beginPath();
        particlesCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        particlesCtx.fill();
    });
    
    requestAnimationFrame(drawParticles);
}

// ============ صداها ============
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
        const noise = ctx.createBufferSource();
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.7, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
        }
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2500;
        filter.Q.value = 1.2;
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
    } else if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 800;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
    } else if (type === 'type') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 220 + Math.random() * 120;
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.03);
    } else if (type === 'party') {
        // صدای جشن
        const freqs =;
        freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = freq;
            osc.type = 'sine';
            const start = now + i * 0.08;
            gain.gain.setValueAtTime(0, start);
            gain.gain.linearRampToValueAtTime(0.12, start + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(start);
            osc.stop(start + 0.5);
        });
        
        // صدای بادکنک
        const noise = ctx.createBufferSource();
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
        }
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1000;
        
        const gain2 = ctx.createGain();
        gain2.gain.setValueAtTime(0.15, now + 0.3);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        
        noise.connect(filter);
        filter.connect(gain2);
        gain2.connect(ctx.destination);
        noise.start(now + 0.3);
    }
}

// ============ تایپ ============
async function typeParagraph(text, paragraphIndex) {
    return new Promise((resolve) => {
        const p = document.createElement('p');
        letterBody.appendChild(p);
        
        let charIndex = 0;
        const totalChars = letterParagraphs.reduce((sum, t) => sum + t.length, 0);
        const charsSoFar = letterParagraphs.slice(0, paragraphIndex).reduce((sum, t) => sum + t.length, 0);
        
        function typeChar() {
            if (!state.isTyping) {
                p.textContent = text;
                resolve();
                return;
            }
            if (charIndex < text.length) {
                p.textContent = text.substring(0, charIndex + 1);
                charIndex++;
                
                const progress = ((charsSoFar + charIndex) / totalChars) * 100;
                progressFill.style.width = progress + '%';
                
                if (charIndex % 5 === 0) playSound('type');
                
                const scrollEl = document.querySelector('.letter-scroll');
                if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
                
                const char = text[charIndex - 1];
                let speed = 45;
                if (char === ' ') speed = 25;
                else if (char === '،' || char === '؟' || char === '.' || char === '!') speed = 180;
                
                state.typingTimeout = setTimeout(typeChar, speed);
            } else {
                resolve();
            }
        }
        
        setTimeout(typeChar, 150);
    });
}

async function startTyping() {
    state.isTyping = true;
    progressBar.classList.remove('hidden');
    progressFill.style.width = '0%';
    
    for (let i = 0; i < letterParagraphs.length; i++) {
        if (!state.isTyping) break;
        await typeParagraph(letterParagraphs[i], i);
        if (i < letterParagraphs.length - 1) {
            await new Promise(r => setTimeout(r, 500));
        }
    }
    
    state.isTyping = false;
    setTimeout(() => progressBar.classList.add('hidden'), 1500);
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
    
    hint.classList.add('hidden');
    
    // باز شدن فلپ
    envelope.classList.add('opened');
    
    // استیکرها
    setTimeout(() => startStickers(), 300);
    
    // پاکت محو شود
    setTimeout(() => {
        playSound('party');
        envelopeStage.classList.add('fade-out');
        
        setTimeout(() => {
            envelopeStage.style.display = 'none';
            
            // نمایش کیک
            cakeContainer.classList.remove('hidden');
            
            // نمایش نامه بعد از ۲ ثانیه
            setTimeout(() => {
                letterStage.classList.remove('hidden');
                letterStage.classList.add('entering');
                
                setTimeout(() => {
                    letterStage.classList.remove('entering');
                    startTyping();
                }, 1000);
            }, 2000);
            
        }, 700);
    }, 1300);
    
    closeBtn.classList.remove('hidden');
}

// ============ بستن نامه ============
function closeEnvelope() {
    if (!state.isOpened) return;
    
    resetLetter();
    playSound('click');
    
    letterStage.classList.add('exiting');
    cakeContainer.classList.add('hidden');
    closeBtn.classList.add('hidden');
    
    setTimeout(() => {
        letterStage.classList.add('hidden');
        letterStage.classList.remove('exiting');
        envelopeStage.style.display = 'block';
        
        setTimeout(() => {
            envelopeStage.classList.remove('fade-out');
            envelope.classList.remove('opened');
            state.isOpened = false;
            setTimeout(() => hint.classList.remove('hidden'), 800);
        }, 100);
    }, 600);
}

// ============ کنترل‌ها ============
function toggleMusic() {
    state.musicOn = !state.musicOn;
    
    if (state.musicOn) {
        bgMusic.volume = 0.35;
        bgMusic.play().catch(() => {
            state.musicOn = false;
            musicIcon.textContent = '🎵';
            musicBtn.classList.remove('active');
        });
        musicIcon.textContent = '🎶';
        musicBtn.classList.add('active');
    } else {
        bgMusic.pause();
        musicIcon.textContent = '🎵';
        musicBtn.classList.remove('active');
    }
}

function toggleSound() {
    state.soundOn = !state.soundOn;
    soundIcon.textContent = state.soundOn ? '🔊' : '🔇';
    soundBtn.classList.toggle('active', state.soundOn);
    if (state.soundOn) playSound('click');
}

// ============ رویدادها ============
envelopeWrapper.addEventListener('click', openEnvelope);
envelopeFlap.addEventListener('click', (e) => {
    e.stopPropagation();
    openEnvelope();
});

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

// جلوگیری از زوم
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) e.preventDefault();
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
}, false);

// تغییر سایز
window.addEventListener('resize', () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
});

// ============ راه‌اندازی ============
createStars();
initParticles();
drawParticles();

// پیام در کنسول
console.log('%c🎂 تولدت مبارک!', 'color: #d4af37; font-size: 24px; font-weight: bold;');
console.log('%c💝 با عشق ساخته شده', 'color: #c2185b; font-size: 14px;');
