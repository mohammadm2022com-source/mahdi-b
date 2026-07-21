const letterParagraphs = [
    "سلام رفیق خوبم! 🎂\n\nامروز روز توست و من نمی‌تونم این لحظه رو بدون اینکه چند کلمه‌ای باهات حرف بزنم، بگذرونم. ۱۹ سالگی‌ات رو تبریک میگم، یه سن فوق‌العاده که از این به بعد، مسئولیت‌های جدید و دنیای تازه‌ای پیش روته.",

    "یادته وقتی بچه بودیم و با هم کلی خاطره ساختیم؟ از اون روزایی که با هم بازی می‌کردیم تا الان که هر کدوم یه مسیری رو رفتیم. ولی یه چیزی که هیچوقت عوض نشده، دوستی ماست. این دوستی برای من از طلا هم باارزش‌تره.",

    "از خداوند متعال برات آرزوی بهترین‌ها رو دارم. آرزو می‌کنم سال جدید زندگیت پر از سلامتی، شادی، موفقیت و خیر و برکت باشه. هرجا که هستی، یادت باشه که همیشه یه دوست داری که به فکرته و برات دعا می‌کنه.",

    "۱۹ تا شمع روی کیکت فوت کن و آرزو کن. من مطمئنم که آرزوهات، با کمک خداوند، یکی یکی برآورده میشن. تو آدم خوبی هستی و لایق بهترین‌هایی.",

    "از طرف تمام لحظات خوبی که با هم گذروندیم، از طرف تمام خنده‌ها و شادی‌ها، تولدت رو صد بار تبریک میگم. تو بهترین دوستی هستی که می‌تونستم داشته باشم.",

    "امیدوارم این نامه کوچیک، لبخند روی لبت بیاره. تولدت مبارک رفیق! 🎉\n\nدوست دارم تا همیشه."
];

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
const particlesCanvas = document.getElementById('particlesCanvas');
const particlesCtx = particlesCanvas.getContext('2d');

let state = {
    isOpened: false,
    isTyping: false,
    musicOn: false,
    soundOn: true,
    typingTimeout: null,
    particles: [],
    audioContext: null
};

function createCandles() {
    const topCandles = document.getElementById('candlesTop');
    const middleCandles = document.getElementById('candlesMiddle');
    const bottomCandles = document.getElementById('candlesBottom');
    
    const colors = ['#ffb6c1', '#ff69b4', '#ffd700', '#87ceeb', '#98fb98', '#dda0dd', '#ffa500'];
    
    for (let i = 0; i < 1; i++) topCandles.appendChild(createCandle(colors[i % colors.length]));
    for (let i = 0; i < 6; i++) middleCandles.appendChild(createCandle(colors[(i + 1) % colors.length]));
    for (let i = 0; i < 12; i++) bottomCandles.appendChild(createCandle(colors[(i + 2) % colors.length]));
}

function createCandle(color) {
    const candle = document.createElement('div');
    candle.className = 'candle';
    candle.style.background = `linear-gradient(90deg, ${color} 0%, ${darken(color, 20)} 100%)`;
    
    const flame = document.createElement('div');
    flame.className = 'candle-flame';
    flame.style.animationDelay = (Math.random() * 0.5) + 's';
    
    candle.appendChild(flame);
    return candle;
}

function darken(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return '#' + (0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1);
}

function createStars() {
    const count = window.innerWidth < 480 ? 80 : 140;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        if (Math.random() > 0.85) star.classList.add('gold');
        const size = Math.random() * 2.5 + 0.5;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.setProperty('--delay', Math.random() * 5 + 's');
        nightSky.appendChild(star);
    }
}

function initParticles() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
    
    const count = window.innerWidth < 480 ? 30 : 55;
    for (let i = 0; i < count; i++) {
        state.particles.push({
            x: Math.random() * particlesCanvas.width,
            y: Math.random() * particlesCanvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.4 - 0.1,
            size: Math.random() * 2.5 + 1,
            opacity: Math.random() * 0.6 + 0.3,
            pulse: Math.random() * Math.PI * 2
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
        
        const gradient = particlesCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, `rgba(255, 215, 100, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(255, 180, 100, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 180, 100, 0)');
        
        particlesCtx.fillStyle = gradient;
        particlesCtx.beginPath();
        particlesCtx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        particlesCtx.fill();
    });
    
    requestAnimationFrame(drawParticles);
}

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
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.8, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.2));
        }
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2500;
        filter.Q.value = 1.5;
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
    } else if (type === 'type') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 250 + Math.random() * 150;
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
    } else if (type === 'magic') {
        const freqs =;
        freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = freq;
            osc.type = 'sine';
            const start = now + i * 0.1;
            gain.gain.setValueAtTime(0, start);
            gain.gain.linearRampToValueAtTime(0.1, start + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(start);
            osc.stop(start + 0.4);
        });
    } else if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
    }
}

async function typeParagraph(text, paragraphIndex, totalParagraphs) {
    return new Promise((resolve) => {
        const lines = text.split('\n');
        const p = document.createElement('p');
        letterBody.appendChild(p);
        
        let lineIndex = 0;
        let charIndex = 0;
        let currentLine = lines;
        let fullText = '';
        
        const totalChars = letterParagraphs.reduce((sum, t) => sum + t.length, 0);
        let charsSoFar = letterParagraphs.slice(0, paragraphIndex).reduce((sum, t) => sum + t.length, 0);
        
        function typeChar() {
            if (!state.isTyping) {
                p.innerHTML = text.replace(/\n/g, '<br>');
                resolve();
                return;
            }
            
            if (charIndex < currentLine.length) {
                const char = currentLine[charIndex];
                fullText += char;
                p.innerHTML = fullText + '<span class="cursor-blink"></span>';
                charIndex++;
                
                const progress = ((charsSoFar + fullText.length) / totalChars) * 100;
                progressFill.style.width = progress + '%';
                
                if (charIndex % 4 === 0) playSound('type');
                letter.scrollTop = letter.scrollHeight;
                
                let speed = 45;
                if (char === ' ') speed = 25;
                else if (char === '،' || char === '؟' || char === '.') speed = 150;
                
                state.typingTimeout = setTimeout(typeChar, speed);
            } else if (lineIndex < lines.length - 1) {
                lineIndex++;
                charIndex = 0;
                currentLine = lines[lineIndex];
                fullText += '\n';
                p.innerHTML = fullText.replace(/\n/g, '<br>') + '<span class="cursor-blink"></span>';
                state.typingTimeout = setTimeout(typeChar, 300);
            } else {
                p.innerHTML = fullText.replace(/\n/g, '<br>');
                resolve();
            }
        }
        
        setTimeout(typeChar, 200);
    });
}

async function startTyping() {
    state.isTyping = true;
    progressBar.classList.remove('hidden');
    progressFill.style.width = '0%';
    
    for (let i = 0; i < letterParagraphs.length; i++) {
        if (!state.isTyping) break;
        await typeParagraph(letterParagraphs[i], i, letterParagraphs.length);
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

function openEnvelope() {
    if (state.isOpened) return;
    state.isOpened = true;
    
    initAudio();
    playSound('open');
    hint.classList.add('hidden');
    envelope.classList.add('opened');
    
    setTimeout(() => {
        playSound('magic');
        envelopeStage.classList.add('fade-out');
        
        setTimeout(() => {
            envelopeStage.style.display = 'none';
            letterStage.classList.remove('hidden');
            letterStage.classList.add('entering');
            
            setTimeout(() => {
                letterStage.classList.remove('entering');
                startTyping();
            }, 1200);
        }, 700);
    }, 1400);
    
    closeBtn.classList.remove('hidden');
}

function closeEnvelope() {
    if (!state.isOpened) return;
    resetLetter();
    playSound('click');
    
    letterStage.classList.add('exiting');
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
    }, 800);
}

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

envelopeWrapper.addEventListener('click', openEnvelope);
envelopeFlap.addEventListener('click', (e) => { e.stopPropagation(); openEnvelope(); });
closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeEnvelope(); });
musicBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMusic(); });
soundBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleSound(); });

document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) e.preventDefault();
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
}, false);

window.addEventListener('resize', () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
});

createCandles();
createStars();
initParticles();
drawParticles();
