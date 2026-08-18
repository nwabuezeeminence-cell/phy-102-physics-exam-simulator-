// ═══════════════════════════════════════════════════════════════════════════
// ULTIMATE QUIZ MASTER - Who Wants to Be a Genius
// Dark Pink to Dark Red Glass Glowing Theme Quiz Game
// ═══════════════════════════════════════════════════════════════════════════

// Sound Effects using Web Audio API
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.log('Audio API not supported');
        }
    }

    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playCorrect() {
        this.playTone(523.25, 0.1, 'sine', 0.4);
        setTimeout(() => this.playTone(659.25, 0.1, 'sine', 0.4), 100);
        setTimeout(() => this.playTone(783.99, 0.2, 'sine', 0.4), 200);
    }

    playWrong() {
        this.playTone(200, 0.3, 'sawtooth', 0.3);
        setTimeout(() => this.playTone(150, 0.4, 'sawtooth', 0.3), 200);
    }

    playLevelUp() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => this.playTone(400 + i * 100, 0.15, 'sine', 0.3), i * 100);
        }
    }

    playVictory() {
        const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
        notes.forEach((note, i) => {
            setTimeout(() => this.playTone(note, 0.2, 'sine', 0.4), i * 150);
        });
        setTimeout(() => {
            this.playTone(1318.51, 0.5, 'sine', 0.5);
        }, 900);
    }

    playLifeline() {
        this.playTone(800, 0.1, 'sine', 0.3);
        setTimeout(() => this.playTone(1000, 0.1, 'sine', 0.3), 100);
        setTimeout(() => this.playTone(1200, 0.15, 'sine', 0.3), 200);
    }

    playClick() {
        this.playTone(600, 0.05, 'sine', 0.2);
    }

    playTimer() {
        this.playTone(400, 0.1, 'square', 0.2);
    }

    playWarning() {
        this.playTone(300, 0.2, 'sawtooth', 0.4);
    }

    playGameOver() {
        this.playTone(200, 0.5, 'sawtooth', 0.4);
        setTimeout(() => this.playTone(150, 0.6, 'sawtooth', 0.3), 400);
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// Questions Database (Sample from PHY102)
const questionsDB = {
    1: {
        topic: "Electrostatics",
        question: "Two point charges of +4 µC and +9 µC are separated by 0.3 m. What is the magnitude of the force between them? (k = 9×10⁹ Nm²/C²)",
        answers: {
            A: "3.6 N",
            B: "36 N",
            C: "360 N",
            D: "0.36 N"
        },
        correct: "A",
        explanation: "F = k|q₁q₂|/r² = (9×10⁹)(4×10⁻⁶)(9×10⁻⁶)/(0.3)² = 3.6 N"
    },
    2: {
        topic: "Electrostatics",
        question: "Coulomb's law states that the force between two point charges is proportional to the product of the charges and:",
        answers: {
            A: "directly proportional to distance",
            B: "inversely proportional to the square of the distance",
            C: "independent of distance",
            D: "proportional to the square of distance"
        },
        correct: "B",
        explanation: "Coulomb's law: F ∝ q₁q₂/r². Force is inversely proportional to the square of distance."
    },
    3: {
        topic: "Electrostatics",
        question: "The SI unit of electric field intensity is:",
        answers: {
            A: "Coulomb",
            B: "Newton",
            C: "Volt/metre",
            D: "Joule/Coulomb"
        },
        correct: "C",
        explanation: "Electric field E = F/q has units N/C, which equals V/m."
    },
    4: {
        topic: "Electrostatics",
        question: "The electric field due to a point charge Q at a distance r is given by:",
        answers: {
            A: "E = kQ/r",
            B: "E = kQ/r²",
            C: "E = kQr²",
            D: "E = kQ²/r"
        },
        correct: "B",
        explanation: "From Coulomb's law, E = F/q₀ = kQ/r² for a point charge."
    },
    5: {
        topic: "Electrostatics",
        question: "Electric field lines around an isolated positive charge:",
        answers: {
            A: "converge into the charge",
            B: "radiate outward from the charge",
            C: "form closed loops",
            D: "are parallel straight lines"
        },
        correct: "B",
        explanation: "By convention, field lines leave positive charges and terminate on negative charges."
    },
    6: {
        topic: "Electrostatics",
        question: "Which of the following is true about electric charge?",
        answers: {
            A: "It can be created but not destroyed",
            B: "It is not quantized",
            C: "It is conserved in an isolated system",
            D: "It depends on the observer's velocity"
        },
        correct: "C",
        explanation: "Charge is a conserved quantity in an isolated system."
    },
    7: {
        topic: "Electrostatics",
        question: "The smallest unit of free charge observed in nature is:",
        answers: {
            A: "the charge of a proton only",
            B: "the charge of an electron (e = 1.6×10⁻¹⁹ C)",
            C: "1 Coulomb",
            D: "the charge of a neutron"
        },
        correct: "B",
        explanation: "Charge is quantized in units of the elementary charge e ≈ 1.6×10⁻¹⁹ C."
    },
    8: {
        topic: "Atomic Nucleus",
        question: "The nucleus of an atom is composed of:",
        answers: {
            A: "protons and electrons",
            B: "protons and neutrons",
            C: "neutrons and electrons",
            D: "protons only"
        },
        correct: "B",
        explanation: "The atomic nucleus consists of protons and neutrons (nucleons)."
    },
    9: {
        topic: "Atomic Nucleus",
        question: "The radius of a nucleus is approximately given by R = R₀A^(1/3), where A is:",
        answers: {
            A: "the atomic number",
            B: "the mass number",
            C: "the neutron number",
            D: "the number of electrons"
        },
        correct: "B",
        explanation: "A is the mass number (total number of nucleons)."
    },
    10: {
        topic: "Atomic Nucleus",
        question: "Nuclear binding energy is calculated from mass defect using:",
        answers: {
            A: "E = mc",
            B: "E = mc²",
            C: "E = m/c²",
            D: "E = m²c"
        },
        correct: "B",
        explanation: "Einstein's mass-energy equivalence: E = mc²."
    },
    11: {
        topic: "Magnetic Fields",
        question: "The magnetic force on a charged particle moving perpendicular to a magnetic field is:",
        answers: {
            A: "F = qvB sinθ",
            B: "F = qvB",
            C: "F = qB/v",
            D: "F = vB/q"
        },
        correct: "B",
        explanation: "When velocity is perpendicular to the field (θ=90°), F = qvB."
    },
    12: {
        topic: "Magnetic Fields",
        question: "A charged particle moving in a circular path in a uniform magnetic field has a period independent of:",
        answers: {
            A: "mass of the particle",
            B: "speed of the particle",
            C: "charge of the particle",
            D: "magnetic field strength"
        },
        correct: "B",
        explanation: "T = 2πm/qB, so period depends only on m, q, and B, not on v."
    },
    13: {
        topic: "Relativity",
        question: "The Michelson-Morley experiment was significant because it:",
        answers: {
            A: "confirmed the existence of the luminiferous ether",
            B: "failed to detect the ether, supporting the constancy of the speed of light",
            C: "measured the mass of the electron",
            D: "proved Newton's laws of motion"
        },
        correct: "B",
        explanation: "The null result of Michelson-Morley is key to special relativity."
    },
    14: {
        topic: "Relativity",
        question: "In special relativity, the Lorentz factor gamma is given by:",
        answers: {
            A: "γ = 1/√(1 - v²/c²)",
            B: "γ = √(1 - v²/c²)",
            C: "γ = v/c",
            D: "γ = c/v"
        },
        correct: "A",
        explanation: "γ = 1/√(1 - β²) where β = v/c."
    },
    15: {
        topic: "Relativity",
        question: "Einstein's general theory of relativity primarily extends special relativity to include:",
        answers: {
            A: "only uniform motion",
            B: "gravitation and accelerated (non-inertial) frames",
            C: "electromagnetism only",
            D: "quantum mechanics"
        },
        correct: "B",
        explanation: "General relativity incorporates gravity as spacetime curvature."
    },
    16: {
        topic: "Relativity",
        question: "According to general relativity, gravity is best described as:",
        answers: {
            A: "a force acting instantaneously at a distance",
            B: "the curvature of spacetime caused by mass and energy",
            C: "unrelated to spacetime geometry",
            D: "a purely electromagnetic effect"
        },
        correct: "B",
        explanation: "Matter and energy curve spacetime; particles follow geodesics."
    },
    17: {
        topic: "Relativity",
        question: "The famous mass-energy equivalence relation proposed by Einstein is:",
        answers: {
            A: "E = mc",
            B: "E = mc²",
            C: "E = m/c",
            D: "E = m + c²"
        },
        correct: "B",
        explanation: "Rest energy E = mc²."
    },
    18: {
        topic: "Generators & Motors",
        question: "An electric generator converts:",
        answers: {
            A: "electrical energy to mechanical energy",
            B: "mechanical energy to electrical energy",
            C: "chemical energy to electrical energy directly",
            D: "electrical energy to chemical energy"
        },
        correct: "B",
        explanation: "A generator uses electromagnetic induction to convert mechanical work to electrical energy."
    },
    19: {
        topic: "Generators & Motors",
        question: "An electric motor operates on the principle that:",
        answers: {
            A: "a changing magnetic flux induces an EMF",
            B: "a current-carrying conductor in a magnetic field experiences a force",
            C: "charges at rest create magnetic fields",
            D: "resistance converts current to heat only"
        },
        correct: "B",
        explanation: "The motor force F = IL × B produces mechanical rotation."
    },
    20: {
        topic: "Generators & Motors",
        question: "In an AC generator, the EMF produced varies as:",
        answers: {
            A: "a constant value",
            B: "a sinusoidal function of time",
            C: "a linear function of time",
            D: "an exponential function of time"
        },
        correct: "B",
        explanation: "e = NBAωsin(ωt) for a coil rotating at constant angular speed."
    },
    21: {
        topic: "Generators & Motors",
        question: "Eddy currents are:",
        answers: {
            A: "currents that flow in straight wires only",
            B: "circulating (loop) currents induced within the body of a conductor",
            C: "currents that only flow in insulators",
            D: "always beneficial with no energy loss"
        },
        correct: "B",
        explanation: "Eddy currents are closed-loop currents induced inside conductors by changing flux."
    },
    22: {
        topic: "Generators & Motors",
        question: "To reduce unwanted eddy current losses in transformer cores, engineers use:",
        answers: {
            A: "solid iron cores",
            B: "laminated iron cores",
            C: "larger coils",
            D: "higher frequency only"
        },
        correct: "B",
        explanation: "Thin laminations insulated from each other interrupt eddy-current paths."
    },
    23: {
        topic: "Generators & Motors",
        question: "Maxwell's equations consist of how many fundamental equations?",
        answers: {
            A: "Two",
            B: "Three",
            C: "Four",
            D: "Five"
        },
        correct: "C",
        explanation: "There are four Maxwell equations."
    },
    24: {
        topic: "Inductance & Circuits",
        question: "The self-inductance of a solenoid depends on:",
        answers: {
            A: "current through it",
            B: "number of turns only",
            C: "geometry and number of turns",
            D: "resistance of the wire"
        },
        correct: "C",
        explanation: "L = μ₀N²A/l for a solenoid - depends on geometry and turns."
    },
    25: {
        topic: "Inductance & Circuits",
        question: "In an LC circuit, the frequency of oscillation is given by:",
        answers: {
            A: "f = 2π√(LC)",
            B: "f = 1/(2π√(LC))",
            C: "f = √(LC)",
            D: "f = 1/√(LC)"
        },
        correct: "B",
        explanation: "ω = 1/√(LC), so f = ω/(2π) = 1/(2π√(LC))"
    },
    26: {
        topic: "Inductance & Circuits",
        question: "Lenz's law states that the direction of an induced current is such that:",
        answers: {
            A: "it increases the magnetic field",
            B: "it opposes the change that produced it",
            C: "it flows in the direction of applied EMF",
            D: "it is always clockwise"
        },
        correct: "B",
        explanation: "Induced EMF always opposes the change in flux that caused it."
    },
    27: {
        topic: "Inductance & Circuits",
        question: "The capacitance of a parallel plate capacitor depends on:",
        answers: {
            A: "charge on plates",
            B: "voltage across plates",
            C: "plate area, separation, and dielectric",
            D: "type of dielectric only"
        },
        correct: "C",
        explanation: "C = ε₀εᵣA/d depends on area, separation, and dielectric constant."
    },
    28: {
        topic: "Radioactivity",
        question: "Radioactivity is the spontaneous:",
        answers: {
            A: "absorption of particles by a stable nucleus",
            B: "emission of particles or radiation from an unstable nucleus",
            C: "creation of new elements from stable isotopes only",
            D: "fusion of light nuclei at room temperature"
        },
        correct: "B",
        explanation: "Radioactivity is spontaneous emission from an unstable nucleus."
    },
    29: {
        topic: "Radioactivity",
        question: "An alpha particle is equivalent to:",
        answers: {
            A: "an electron",
            B: "a helium nucleus (2 protons and 2 neutrons)",
            C: "a single proton",
            D: "a photon of high energy"
        },
        correct: "B",
        explanation: "α-particle = ⁴He nucleus (2p + 2n)."
    },
    30: {
        topic: "Radioactivity",
        question: "Of alpha, beta, and gamma radiation, which has the greatest penetrating power?",
        answers: {
            A: "Alpha",
            B: "Beta",
            C: "Gamma",
            D: "All have equal penetrating power"
        },
        correct: "C",
        explanation: "γ-rays are most penetrating; α is stopped by paper."
    },
    31: {
        topic: "Radioactivity",
        question: "The half-life of a radioactive substance is the time taken for:",
        answers: {
            A: "all the nuclei to decay",
            B: "half of the radioactive nuclei present to decay",
            C: "the activity to become zero",
            D: "the substance to become stable"
        },
        correct: "B",
        explanation: "Half-life is the time for half the nuclei to decay."
    },
    32: {
        topic: "Atomic Structure",
        question: "J.J. Thomson's atomic model is popularly known as the:",
        answers: {
            A: "nuclear model",
            B: "plum pudding model",
            C: "planetary model",
            D: "quantum cloud model"
        },
        correct: "B",
        explanation: "Thomson pictured electrons embedded in a sphere of positive charge."
    },
    33: {
        topic: "Atomic Structure",
        question: "Rutherford's gold foil experiment led to the discovery of the:",
        answers: {
            A: "electron",
            B: "small, dense, positively charged nucleus",
            C: "neutron",
            D: "photon"
        },
        correct: "B",
        explanation: "Large-angle scattering implied a tiny, massive, positive nucleus."
    },
    34: {
        topic: "Atomic Structure",
        question: "Bohr's model of the atom proposed that electrons move in:",
        answers: {
            A: "random paths with no fixed energy",
            B: "fixed circular orbits with quantized energy levels",
            C: "a continuous cloud with no defined orbit",
            D: "straight lines only"
        },
        correct: "B",
        explanation: "Bohr postulated stationary circular orbits with quantized angular momentum."
    },
    35: {
        topic: "Atomic Structure",
        question: "According to Bohr's model, an atom emits radiation when an electron:",
        answers: {
            A: "remains in the same orbit",
            B: "jumps from a higher energy orbit to a lower one",
            C: "jumps from a lower energy orbit to a higher one",
            D: "is removed from the atom completely"
        },
        correct: "B",
        explanation: "Emission occurs when an electron transitions from higher to lower energy level."
    },
    36: {
        topic: "Atomic Structure",
        question: "Cathode rays were shown by J.J. Thomson to be composed of:",
        answers: {
            A: "protons",
            B: "negatively charged particles (electrons)",
            C: "neutral particles",
            D: "X-ray photons"
        },
        correct: "B",
        explanation: "Thomson measured e/m and showed cathode rays are electrons."
    },
    37: {
        topic: "Atomic Structure",
        question: "X-rays are produced when:",
        answers: {
            A: "slow electrons strike a low atomic number target",
            B: "fast-moving electrons are suddenly decelerated upon striking a metal target",
            C: "protons collide with each other",
            D: "visible light passes through a prism"
        },
        correct: "B",
        explanation: "Bremsstrahlung X-rays are generated when electrons strike a metal anode."
    },
    38: {
        topic: "Electric Potential",
        question: "Electric potential at a point is defined as:",
        answers: {
            A: "the force per unit charge at that point",
            B: "the work done per unit charge in bringing a test charge from infinity",
            C: "the total charge at that point",
            D: "the current flowing at that point"
        },
        correct: "B",
        explanation: "V = W/q₀ (work done by external agent from infinity)."
    },
    39: {
        topic: "Electric Potential",
        question: "The SI unit of electric potential is the:",
        answers: {
            A: "Ampere",
            B: "Ohm",
            C: "Volt",
            D: "Coulomb"
        },
        correct: "C",
        explanation: "1 V = 1 J/C."
    },
    40: {
        topic: "Electric Potential",
        question: "Electric current is defined as the rate of flow of:",
        answers: {
            A: "electric potential",
            B: "electric charge",
            C: "resistance",
            D: "magnetic flux"
        },
        correct: "B",
        explanation: "I = dQ/dt."
    }
};

// Add more questions to complete the database
// (In actual implementation, you would include all 200 questions)

// Prize Ladder Configuration
const prizeLadder = [
  { level: 1, prize: 100 },
  { level: 2, prize: 200 },
  { level: 3, prize: 300 },
  { level: 4, prize: 500 },
  { level: 5, prize: 1000 },
  { level: 6, prize: 2000 },
  { level: 7, prize: 4000 },
  { level: 8, prize: 8000 },
  { level: 9, prize: 16000 },
  { level: 10, prize: 32000 },
  { level: 11, prize: 64000 },
  { level: 12, prize: 125000 },
  { level: 13, prize: 250000 },
  { level: 14, prize: 500000 },
  { level: 15, prize: 1000000 }
];


// Game State
const gameState = {
    currentQuestion: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    combo: 1,
    correctCount: 0,
    wrongCount: 0,
    timeUsed: 0,
    startTime: null,
    questions: [],
    currentLevel: 0,
    difficulty: 'normal',
    timeMode: true,
    questionCount: 25,
    topic: 'all',
    lifelines: {
        '5050': { available: true, uses: 1 },
        'audience': { available: true, uses: 1 },
        'phone': { available: true, uses: 1 },
        'skip': { available: true, uses: 3 }
    },
    isPaused: false,
    timerInterval: null,
    currentTimer: 0
};

// Sound Manager Instance
const sound = new SoundManager();

// DOM Elements
const elements = {
    startScreen: document.getElementById('startScreen'),
    gameScreen: document.getElementById('gameScreen'),
    resultScreen: document.getElementById('resultScreen'),
    startBtn: document.getElementById('startBtn'),
    questionText: document.getElementById('questionText'),
    questionBadge: document.getElementById('questionBadge'),
    answersGrid: document.getElementById('answersGrid'),
    currentQ: document.getElementById('currentQ'),
    totalQ: document.getElementById('totalQ'),
    currentScore: document.getElementById('currentScore'),
    timerFill: document.getElementById('timerFill'),
    timerText: document.getElementById('timerText'),
    timerContainer: document.getElementById('timerContainer'),
    streakCount: document.getElementById('streakCount'),
    streakDisplay: document.getElementById('streakDisplay'),
    prizeLadder: document.getElementById('prizeLadder'),
    lifelineModal: document.getElementById('lifelineModal'),
    lifelineTitle: document.getElementById('lifelineTitle'),
    lifelineContent: document.getElementById('lifelineContent'),
    closeLifelineModal: document.getElementById('closeLifelineModal'),
    pauseModal: document.getElementById('pauseModal'),
    pauseBtn: document.getElementById('pauseBtn'),
    resumeBtn: document.getElementById('resumeBtn'),
    restartFromPauseBtn: document.getElementById('restartFromPauseBtn'),
    quitFromPauseBtn: document.getElementById('quitFromPauseBtn'),
    exitBtn: document.getElementById('exitBtn'),
    soundToggle: document.getElementById('soundToggle'),
    soundIcon: document.getElementById('soundIcon'),
    highScoreDisplay: document.getElementById('highScoreDisplay'),
    comboValue: document.getElementById('comboValue'),
    topicSelect: document.getElementById('topicSelect'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    mainMenuBtn: document.getElementById('mainMenuBtn'),
    shareScoreBtn: document.getElementById('shareScoreBtn'),
    correctCountEl: document.getElementById('correctCount'),
    wrongCountEl: document.getElementById('wrongCount'),
    accuracyEl: document.getElementById('accuracy'),
    finalScoreEl: document.getElementById('finalScore'),
    bestStreakEl: document.getElementById('bestStreak'),
    timeUsedEl: document.getElementById('timeUsed'),
    resultIcon: document.getElementById('resultIcon'),
    resultTitle: document.getElementById('resultTitle'),
    resultMessage: document.getElementById('resultMessage'),
    lifeline5050: document.getElementById('lifeline5050'),
    lifelineAudience: document.getElementById('lifelineAudience'),
    lifelinePhone: document.getElementById('lifelinePhone'),
    lifelineSkip: document.getElementById('lifelineSkip')
};

// Initialize Game
function init() {
    loadHighScore();
    setupEventListeners();
    renderPrizeLadder();
    updateLifelineButtons();
}

// Event Listeners
function setupEventListeners() {
    // Start button
    elements.startBtn.addEventListener('click', startGame);

    // Mode selection buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => selectMode('difficulty', btn));
    });

    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => selectMode('timeMode', btn));
    });

    document.querySelectorAll('.count-btn').forEach(btn => {
        btn.addEventListener('click', () => selectMode('count', btn));
    });

    // Lifeline buttons
    elements.lifeline5050.addEventListener('click', () => useLifeline('5050'));
    elements.lifelineAudience.addEventListener('click', () => useLifeline('audience'));
    elements.lifelinePhone.addEventListener('click', () => useLifeline('phone'));
    elements.lifelineSkip.addEventListener('click', () => useLifeline('skip'));

    // Answer buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', () => selectAnswer(btn.dataset.answer));
    });

    // Pause/Resume
    elements.pauseBtn.addEventListener('click', togglePause);
    elements.resumeBtn.addEventListener('click', togglePause);
    elements.restartFromPauseBtn.addEventListener('click', restartGame);
    elements.quitFromPauseBtn.addEventListener('click', quitToMenu);

    // Exit
    elements.exitBtn.addEventListener('click', quitToMenu);

    // Modals
    elements.closeLifelineModal.addEventListener('click', closeLifelineModal);

    // Result buttons
    elements.playAgainBtn.addEventListener('click', restartGame);
    elements.mainMenuBtn.addEventListener('click', quitToMenu);
    elements.shareScoreBtn.addEventListener('click', shareScore);

    // Sound toggle
    elements.soundToggle.addEventListener('click', toggleSound);

    // Initialize audio on first interaction
    document.addEventListener('click', () => sound.init(), { once: true });
}

// Mode Selection
function selectMode(type, btn) {
    sound.playClick();
    const siblings = btn.parentElement.querySelectorAll('button');
    siblings.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    if (type === 'difficulty') {
        gameState.difficulty = btn.dataset.difficulty;
    } else if (type === 'timeMode') {
        gameState.timeMode = btn.dataset.timemode === 'true';
    } else if (type === 'count') {
        gameState.questionCount = btn.dataset.count === 'all' ? 200 : parseInt(btn.dataset.count);
    }
}

// Start Game
function startGame() {
    sound.playClick();
    gameState.topic = document.getElementById('topicSelect').value;
    
    // Prepare questions
    prepareQuestions();
    
    // Reset state
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.streak = 0;
    gameState.bestStreak = 0;
    gameState.combo = 1;
    gameState.correctCount = 0;
    gameState.wrongCount = 0;
    gameState.startTime = Date.now();
    gameState.currentLevel = 0;
    gameState.isPaused = false;
    
    // Reset lifelines
    gameState.lifelines = {
        '5050': { available: true, uses: 1 },
        'audience': { available: true, uses: 1 },
        'phone': { available: true, uses: 1 },
        'skip': { available: true, uses: 3 }
    };
    
    updateLifelineButtons();
    updateUI();
    
    // Switch screens
    switchScreen('game');
    
    // Load first question
    loadQuestion();
}

// Prepare Questions
function prepareQuestions() {
    let allQuestions = Object.values(questionsDB);
    
    // Filter by topic if selected
    if (gameState.topic !== 'all') {
        const topicNum = parseInt(gameState.topic);
        const startIdx = (topicNum - 1) * 20 + 1;
        const endIdx = startIdx + 19;
        
        allQuestions = allQuestions.filter((q, idx) => {
            const qNum = idx + 1;
            return qNum >= startIdx && qNum <= endIdx;
        });
    }
    
    // Shuffle and limit
    allQuestions = shuffleArray([...allQuestions]).slice(0, Math.min(gameState.questionCount, allQuestions.length));
    
    gameState.questions = allQuestions;
}

// Shuffle Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Load Question
function loadQuestion() {
    if (gameState.currentQuestion >= gameState.questions.length) {
        endGame(true);
        return;
    }
    
    const question = gameState.questions[gameState.currentQuestion];
    
    // Update question display
    elements.questionBadge.textContent = `Question ${gameState.currentQuestion + 1}`;
    elements.questionText.textContent = question.question;
    
    // Update answers
    const answerBtns = elements.answersGrid.querySelectorAll('.answer-btn');
    const letters = ['A', 'B', 'C', 'D'];
    
    answerBtns.forEach((btn, idx) => {
        btn.className = 'answer-btn glass-panel';
        btn.querySelector('.answer-letter').textContent = letters[idx];
        btn.querySelector('.answer-text').textContent = question.answers[letters[idx]];
        btn.querySelector('.answer-icon').textContent = '✓';
        btn.disabled = false;
    });
    
    // Update UI
    elements.currentQ.textContent = gameState.currentQuestion + 1;
    elements.totalQ.textContent = gameState.questions.length;
    
    // Update prize ladder
    updatePrizeLadder();
    
    // Start timer if in time mode
    if (gameState.timeMode) {
        startTimer();
    } else {
        elements.timerContainer.style.display = 'none';
    }
    
    // Update streak display
    updateStreakDisplay();
}

// Start Timer
function startTimer() {
    elements.timerContainer.style.display = 'flex';
    
    const times = { easy: 30, normal: 20, hard: 15 };
    gameState.currentTimer = times[gameState.difficulty];
    
    elements.timerText.textContent = gameState.currentTimer;
    elements.timerFill.style.width = '100%';
    
    clearInterval(gameState.timerInterval);
    
    gameState.timerInterval = setInterval(() => {
        if (gameState.isPaused) return;
        
        gameState.currentTimer--;
        elements.timerText.textContent = gameState.currentTimer;
        elements.timerFill.style.width = `${(gameState.currentTimer / times[gameState.difficulty]) * 100}%`;
        
        if (gameState.currentTimer <= 5) {
            sound.playWarning();
        }
        
        if (gameState.currentTimer <= 0) {
            clearInterval(gameState.timerInterval);
            timeOut();
        }
    }, 1000);
}

// Time Out
function timeOut() {
    const correctAnswer = gameState.questions[gameState.currentQuestion].correct;
    highlightAnswer(correctAnswer, false);
    
    sound.playWrong();
    
    setTimeout(() => {
        gameState.wrongCount++;
        gameState.streak = 0;
        gameState.combo = 1;
        
        // Check if game over
        if (gameState.currentQuestion >= gameState.questions.length - 1 && gameState.currentLevel < 14) {
            endGame(false);
        } else {
            gameState.currentQuestion++;
            loadQuestion();
        }
    }, 2000);
}

// Select Answer
function selectAnswer(answer) {
    if (gameState.isPaused) return;
    
    const question = gameState.questions[gameState.currentQuestion];
    const isCorrect = answer === question.correct;
    
    clearInterval(gameState.timerInterval);
    
    highlightAnswer(answer, isCorrect);
    
    if (isCorrect) {
        sound.playCorrect();
        handleCorrectAnswer();
    } else {
        sound.playWrong();
        handleWrongAnswer();
    }
}

// Highlight Answer
function highlightAnswer(answer, isCorrect) {
    const question = gameState.questions[gameState.currentQuestion];
    const answerBtns = elements.answersGrid.querySelectorAll('.answer-btn');
    const letters = ['A', 'B', 'C', 'D'];
    
    answerBtns.forEach((btn, idx) => {
        btn.disabled = true;
        
        if (letters[idx] === answer) {
            btn.classList.add(isCorrect ? 'correct' : 'wrong');
        }
        
        if (letters[idx] === question.correct && !isCorrect) {
            btn.classList.add('correct');
        }
    });
}

// Handle Correct Answer
function handleCorrectAnswer() {
    gameState.correctCount++;
    gameState.streak++;
    gameState.combo = Math.min(gameState.combo + 0.5, 4);
    gameState.currentLevel = Math.min(gameState.currentLevel + 1, 14);
    
    // Calculate score
    const baseScore = 100 * (gameState.currentQuestion + 1);
    const timeBonus = gameState.timeMode ? Math.floor(gameState.currentTimer * 10) : 0;
    const streakBonus = Math.floor(gameState.streak * 50);
    const comboMultiplier = gameState.combo;
    
    const questionScore = Math.floor((baseScore + timeBonus + streakBonus) * comboMultiplier);
    gameState.score += questionScore;
    
    // Update high score
    updateHighScore();
    
    // Play level up sound at milestones
    if (gameState.currentLevel % 5 === 0) {
        sound.playLevelUp();
    }
    
    updateUI();
    
    setTimeout(() => {
        gameState.currentQuestion++;
        loadQuestion();
    }, 1500);
}

// Handle Wrong Answer
function handleWrongAnswer() {
    gameState.wrongCount++;
    gameState.streak = 0;
    gameState.combo = 1;
    
    updateUI();
    
    setTimeout(() => {
        if (gameState.currentQuestion >= gameState.questions.length - 1) {
            endGame(false);
        } else {
            gameState.currentQuestion++;
            loadQuestion();
        }
    }, 2000);
}

// Update UI
function updateUI() {
    elements.currentScore.textContent = gameState.score;
    elements.streakCount.textContent = gameState.streak;
    elements.comboValue.textContent = `x${gameState.combo.toFixed(1)}`;
    updateStreakDisplay();
}

// Update Streak Display
function updateStreakDisplay() {
    const display = elements.streakDisplay;
    if (gameState.streak >= 3) {
        display.classList.add('active');
    } else {
        display.classList.remove('active');
    }
}

// Use Lifeline
function useLifeline(type) {
    if (!gameState.lifelines[type].available || gameState.lifelines[type].uses <= 0) return;
    
    sound.playLifeline();
    
    gameState.lifelines[type].uses--;
    
    if (gameState.lifelines[type].uses <= 0) {
        gameState.lifelines[type].available = false;
    }
    
    updateLifelineButtons();
    
    switch (type) {
        case '5050':
            use5050();
            break;
        case 'audience':
            useAudiencePoll();
            break;
        case 'phone':
            usePhoneFriend();
            break;
        case 'skip':
            useSkip();
            break;
    }
}

// 50:50 Lifeline
function use5050() {
    const question = gameState.questions[gameState.currentQuestion];
    const correct = question.correct;
    
    // Get wrong answers
    const letters = ['A', 'B', 'C', 'D'];
    const wrongAnswers = letters.filter(l => l !== correct);
    
    // Remove 2 wrong answers
    const toRemove = shuffleArray([...wrongAnswers]).slice(0, 2);
    
    const answerBtns = elements.answersGrid.querySelectorAll('.answer-btn');
    answerBtns.forEach((btn, idx) => {
        if (toRemove.includes(letters[idx])) {
            btn.classList.add('eliminated');
            btn.disabled = true;
        }
    });
    
    showLifelineModal('🎰 50:50 Used!', '<p>Two wrong answers have been eliminated!</p>');
}

// Audience Poll Lifeline
function useAudiencePoll() {
    const question = gameState.questions[gameState.currentQuestion];
    const correct = question.correct;
    
    // Generate realistic poll percentages
    const letters = ['A', 'B', 'C', 'D'];
    let percentages = [15, 20, 25, 30];
    percentages = shuffleArray(percentages);
    
    // Give correct answer highest percentage
    const correctIdx = letters.indexOf(correct);
    const highestPercent = percentages[0];
    percentages[0] = percentages[correctIdx];
    percentages[correctIdx] = highestPercent;
    
    // Ensure correct answer has at least 40%
    if (percentages[0] < 40) {
        percentages[0] = 40 + Math.floor(Math.random() * 30);
        percentages = percentages.map((p, i) => i === 0 ? p : Math.floor((100 - percentages[0]) / 3));
    }
    
    const pollHTML = `
        <div class="audience-poll">
            <p>👥 The audience voted:</p>
            ${letters.map((l, i) => `
                <div class="poll-bar">
                    <span class="poll-label">${l}</span>
                    <div class="poll-track">
                        <div class="poll-fill ${l === correct ? 'high' : ''}" style="width: ${percentages[i]}%">
                            ${percentages[i]}%
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    showLifelineModal('👥 Audience Poll', pollHTML);
}

// Phone Friend Lifeline
function usePhoneFriend() {
    const question = gameState.questions[gameState.currentQuestion];
    const friends = ['🎓 Alex (Physics Professor)', '👨‍🔬 Sam (Lab Assistant)', '📚 Lisa (Study Partner)', '🧠 Max (Class Topper)'];
    const friend = friends[Math.floor(Math.random() * friends.length)];
    
    // 70% chance of giving correct answer
    const isHelpful = Math.random() < 0.7;
    const correct = question.correct;
    
    let advice;
    if (isHelpful) {
        advice = `${friend} says: "I'm pretty confident the answer is <strong>${correct}</strong>. I remember studying this!"`;
    } else {
        const letters = ['A', 'B', 'C', 'D'];
        const wrongAnswers = letters.filter(l => l !== correct);
        const wrong = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
        advice = `${friend} says: "Hmm, I'm not sure... maybe <strong>${wrong}</strong>? But I really think you should trust your instincts!"`;
    }
    
    const phoneHTML = `
        <div class="phone-friend-content">
            <div class="phone-friend-avatar">📞</div>
            <p>${friend}</p>
            <div class="phone-advice">${advice}</div>
        </div>
    `;
    
    showLifelineModal('📞 Phone a Friend', phoneHTML);
}

// Skip Lifeline
function useSkip() {
    showLifelineModal('⏭️ Question Skipped!', '<p>Moving to the next question...</p>');
    
    clearInterval(gameState.timerInterval);
    
    setTimeout(() => {
        gameState.currentQuestion++;
        closeLifelineModal();
        loadQuestion();
    }, 1500);
}

// Show Lifeline Modal
function showLifelineModal(title, content) {
    elements.lifelineTitle.textContent = title;
    elements.lifelineContent.innerHTML = content;
    elements.lifelineModal.classList.add('active');
}

// Close Lifeline Modal
function closeLifelineModal() {
    elements.lifelineModal.classList.remove('active');
}

// Update Lifeline Buttons
function updateLifelineButtons() {
    elements.lifeline5050.querySelector('.ll-uses').textContent = gameState.lifelines['5050'].uses;
    elements.lifelineAudience.querySelector('.ll-uses').textContent = gameState.lifelines['audience'].uses;
    elements.lifelinePhone.querySelector('.ll-uses').textContent = gameState.lifelines['phone'].uses;
    elements.lifelineSkip.querySelector('.ll-uses').textContent = gameState.lifelines['skip'].uses;
    
    elements.lifeline5050.disabled = !gameState.lifelines['5050'].available || gameState.lifelines['5050'].uses <= 0;
    elements.lifelineAudience.disabled = !gameState.lifelines['audience'].available || gameState.lifelines['audience'].uses <= 0;
    elements.lifelinePhone.disabled = !gameState.lifelines['phone'].available || gameState.lifelines['phone'].uses <= 0;
    elements.lifelineSkip.disabled = !gameState.lifelines['skip'].available || gameState.lifelines['skip'].uses <= 0;
}

// Render Prize Ladder
function renderPrizeLadder() {
    const ladderHTML = prizeLadder.map((item, idx) => `
        <div class="ladder-item" data-level="${item.level}">
            <span class="level">${item.level}</span>
            <span class="prize">💰 ${item.prize.toLocaleString()}</span>
        </div>
    `).join('');
    
    elements.prizeLadder.innerHTML = ladderHTML;
}

// Update Prize Ladder
function updatePrizeLadder() {
    const items = elements.prizeLadder.querySelectorAll('.ladder-item');
    const currentLevel = Math.min(gameState.currentLevel, prizeLadder.length - 1);
    
    items.forEach((item, idx) => {
        const level = parseInt(item.dataset.level);
        item.classList.remove('current', 'reached', 'locked');
        
        if (level === currentLevel + 1) {
            item.classList.add('current');
        } else if (level <= currentLevel) {
            item.classList.add('reached');
        } else {
            item.classList.add('locked');
        }
    });
}

// Toggle Pause
function togglePause() {
    sound.playClick();
    gameState.isPaused = !gameState.isPaused;
    
    if (gameState.isPaused) {
        elements.pauseModal.classList.add('active');
    } else {
        elements.pauseModal.classList.remove('active');
    }
}

// Switch Screen
function switchScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`${screen}Screen`).classList.add('active');
}

// End Game
function endGame(completed) {
    clearInterval(gameState.timerInterval);
    
    gameState.timeUsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    
    if (completed) {
        sound.playVictory();
    } else {
        sound.playGameOver();
    }
    
    // Update high score
    updateHighScore();
    
    // Show results
    showResults(completed);
    
    switchScreen('result');
}

// Show Results
function showResults(completed) {
    const accuracy = gameState.questions.length > 0 
        ? Math.round((gameState.correctCount / gameState.questions.length) * 100) 
        : 0;
    
    elements.correctCountEl.textContent = gameState.correctCount;
    elements.wrongCountEl.textContent = gameState.wrongCount;
    elements.accuracyEl.textContent = `${accuracy}%`;
    elements.finalScoreEl.textContent = gameState.score.toLocaleString();
    elements.bestStreakEl.textContent = gameState.bestStreak;
    
    const mins = Math.floor(gameState.timeUsed / 60);
    const secs = gameState.timeUsed % 60;
    elements.timeUsedEl.textContent = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    
    // Set result based on performance
    if (accuracy >= 90) {
        elements.resultIcon.textContent = '🏆';
        elements.resultTitle.textContent = 'PHENOMENAL!';
        elements.resultMessage.textContent = "You're a genius! Absolutely incredible performance!";
    } else if (accuracy >= 70) {
        elements.resultIcon.textContent = '🌟';
        elements.resultTitle.textContent = 'EXCELLENT!';
        elements.resultMessage.textContent = 'Great job! You really know your stuff!';
    } else if (accuracy >= 50) {
        elements.resultIcon.textContent = '👍';
        elements.resultTitle.textContent = 'GOOD EFFORT!';
        elements.resultMessage.textContent = "Keep practicing, you're improving!";
    } else {
        elements.resultIcon.textContent = '📚';
        elements.resultTitle.textContent = 'KEEP LEARNING!';
        elements.resultMessage.textContent = 'Review the material and try again!';
    }
}

// Restart Game
function restartGame() {
    sound.playClick();
    closeLifelineModal();
    elements.pauseModal.classList.remove('active');
    
    switchScreen('start');
}

// Quit to Menu
function quitToMenu() {
    sound.playClick();
    clearInterval(gameState.timerInterval);
    closeLifelineModal();
    elements.pauseModal.classList.remove('active');
    
    switchScreen('start');
}

// Toggle Sound
function toggleSound() {
    const enabled = sound.toggle();
    elements.soundIcon.textContent = enabled ? '🔊' : '🔇';
}

// High Score Management
function updateHighScore() {
    if (gameState.score > getHighScore()) {
        localStorage.setItem('quizHighScore', gameState.score);
    }
    elements.highScoreDisplay.textContent = getHighScore().toLocaleString();
}

function getHighScore() {
    return parseInt(localStorage.getItem('quizHighScore') || '0');
}

function loadHighScore() {
    elements.highScoreDisplay.textContent = getHighScore().toLocaleString();
}

// Share Score
function shareScore() {
    const accuracy = gameState.questions.length > 0 
        ? Math.round((gameState.correctCount / gameState.questions.length) * 100) 
        : 0;
    
    const text = `🎯 Quiz Master Score: ${gameState.score.toLocaleString()}\n` +
                 `✅ Correct: ${gameState.correctCount}/${gameState.questions.length}\n` +
                 `🎯 Accuracy: ${accuracy}%\n` +
                 `🔥 Best Streak: ${gameState.bestStreak}\n\n` +
                 `#QuizMaster #WhoWantsToBeAGenius`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Quiz Master Results',
            text: text
        }).catch(() => {
            copyToClipboard(text);
        });
    } else {
        copyToClipboard(text);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Score copied to clipboard! 📋');
    }).catch(() => {
        alert('Score: ' + text);
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
// Additional Questions (Questions 41-90)
const additionalQuestions = [
    // More Electrostatics
    { topic: "Electrostatics", question: "The work done in moving a charge of 2C through a potential difference of 5V is:", answers: { A: "10 J", B: "2.5 J", C: "7 J", D: "0.4 J" }, correct: "A", explanation: "W = QV = 2 × 5 = 10 J" },
    { topic: "Electrostatics", question: "Capacitance is defined as the ratio of:", answers: { A: "charge to current", B: "charge to potential", C: "potential to charge", D: "current to potential" }, correct: "B", explanation: "C = Q/V" },
    { topic: "Electrostatics", question: "The energy stored in a capacitor is given by:", answers: { A: "½CV", B: "½CV²", C: "CV²", D: "CV" }, correct: "B", explanation: "U = ½CV²" },
    { topic: "Electrostatics", question: "When two identical capacitors are connected in series, the equivalent capacitance is:", answers: { A: "doubled", B: "halved", C: "unchanged", D: "quartered" }, correct: "B", explanation: "For series: Ceq = C/2" },
    { topic: "Electrostatics", question: "The unit of permittivity of free space is:", answers: { A: "C²/Nm²", B: "Nm²/C²", C: "C/Nm", D: "Nm/C" }, correct: "A", explanation: "ε₀ has unit C²/Nm² or F/m" },
    
    // More Atomic Nucleus
    { topic: "Atomic Nucleus", question: "The mass number of an atom is the sum of:", answers: { A: "protons and electrons", B: "neutrons and electrons", C: "protons and neutrons", D: "nucleons and electrons" }, correct: "C", explanation: "Mass number A = Z + N (protons + neutrons)" },
    { topic: "Atomic Nucleus", question: "Isotopes are atoms of the same element with:", answers: { A: "different atomic numbers", B: "same mass number", C: "different mass numbers", D: "different chemical properties" }, correct: "C", explanation: "Isotopes have same Z but different N" },
    { topic: "Atomic Nucleus", question: "The strong nuclear force acts only over a range of about:", answers: { A: "10⁻¹⁰ m", B: "10⁻¹⁵ m", C: "10⁻⁶ m", D: "10⁻³ m" }, correct: "B", explanation: "Strong force range ≈ 10⁻¹⁵ m (1 femtometer)" },
    { topic: "Atomic Nucleus", question: "The nuclide notation for uranium-235 is:", answers: { A: "U235", B: "²³⁵U", C: "U₂₃₅", D: "₂₃₅U" }, correct: "B", explanation: "Format: ᵏX where k is mass number" },
    { topic: "Atomic Nucleus", question: "Radioactive decay is a random process that depends on:", answers: { A: "temperature", B: "pressure", C: "the number of nuclei present", D: "chemical environment" }, correct: "C", explanation: "Decay rate depends on number of undecayed nuclei" },
    
    // More Magnetic Fields
    { topic: "Magnetic Fields", question: "The magnetic field around a straight current-carrying wire is:", answers: { A: "radially outward", B: "circles around the wire", C: "parallel to the wire", D: "perpendicular to the wire in one direction" }, correct: "B", explanation: "Right-hand grip rule: field circles around wire" },
    { topic: "Magnetic Fields", question: "The force on a charge moving parallel to a magnetic field is:", answers: { A: "maximum", B: "minimum but not zero", C: "zero", D: "cannot be determined" }, correct: "C", explanation: "F = qvB sinθ; sin0° = 0, so F = 0" },
    { topic: "Magnetic Fields", question: "The unit of magnetic flux density (Tesla) is equivalent to:", answers: { A: "Wb/m²", B: "Nm/A", C: "VA", D: "J/C" }, correct: "A", explanation: "1 T = 1 Wb/m² = 1 N/(A·m)" },
    { topic: "Magnetic Fields", question: "The magnetic flux through a coil changes from 0.04 Wb to 0.02 Wb in 0.2s. The induced EMF is:", answers: { A: "0.1 V", B: "0.2 V", C: "0.4 V", D: "0.02 V" }, correct: "A", explanation: "E = -dΦ/dt = (0.04-0.02)/0.2 = 0.1 V" },
    { topic: "Magnetic Fields", question: "The direction of induced current is given by:", answers: { A: "Fleming's left-hand rule", B: "Fleming's right-hand rule", C: "Lenz's law", D: "Ohm's law" }, correct: "C", explanation: "Lenz's law determines direction of induced current" },
    
    // More Relativity
    { topic: "Relativity", question: "The speed of light in a vacuum is approximately:", answers: { A: "3 × 10⁶ m/s", B: "3 × 10⁷ m/s", C: "3 × 10⁸ m/s", D: "3 × 10⁹ m/s" }, correct: "C", explanation: "c = 299,792,458 m/s ≈ 3 × 10⁸ m/s" },
    { topic: "Relativity", question: "A body at rest has maximum:", answers: { A: "kinetic energy", B: "momentum", C: "rest mass energy", D: "velocity" }, correct: "C", explanation: "Rest energy E₀ = mc²" },
    { topic: "Relativity", question: "Time dilation occurs when an object moves:", answers: { A: "at any speed", B: "at relativistic speeds", C: "at speeds less than sound", D: "in a gravitational field only" }, correct: "B", explanation: "Significant time dilation at speeds close to c" },
    { topic: "Relativity", question: "The rest mass of a photon is:", answers: { A: "1 kg", B: "9.11 × 10⁻³¹ kg", C: "zero", D: "cannot be measured" }, correct: "C", explanation: "Photon is massless; m₀ = 0" },
    { topic: "Relativity", question: "Length contraction occurs in the direction of:", answers: { A: "perpendicular to motion", B: "parallel to motion", C: "both parallel and perpendicular", D: "only at 45° to motion" }, correct: "B", explanation: "Contraction only in direction of relative motion" },
    
    // More Generators & Motors
    { topic: "Generators & Motors", question: "The principle of a DC motor is based on:", answers: { A: "electromagnetic induction", B: "force on current-carrying conductor", C: "Faraday's law", D: "Lenz's law" }, correct: "B", explanation: "F = BIL, force on conductor in magnetic field" },
    { topic: "Generators & Motors", question: "A commutator in a DC machine is used to:", answers: { A: "increase voltage", B: "convert AC to DC", C: "reverse current direction", D: "decrease current" }, correct: "C", explanation: "Commutator reverses connection every half revolution" },
    { topic: "Generators & Motors", question: "The efficiency of an ideal transformer is:", answers: { A: "50%", B: "75%", C: "90%", D: "100%" }, correct: "D", explanation: "Ideal transformer has no losses, efficiency = 100%" },
    { topic: "Generators & Motors", question: "The turns ratio of a step-up transformer is:", answers: { A: "Ns/Np > 1", B: "Ns/Np < 1", C: "Ns/Np = 1", D: "Ns/Np = 0" }, correct: "A", explanation: "Step-up: Ns > Np, so ratio > 1" },
    { topic: "Generators & Motors", question: "The back EMF in a DC motor is maximum when:", answers: { A: "motor is starting", B: "motor is running at no load", C: "motor is running at full load", D: "motor is overloaded" }, correct: "B", explanation: "Back EMF proportional to speed, highest at no load" },
    
    // More Inductance & Circuits
    { topic: "Inductance & Circuits", question: "The unit of inductance is the:", answers: { A: "Farad", B: "Henry", C: "Ohm", D: "Coulomb" }, correct: "B", explanation: "H = Wb/A = V·s/A" },
    { topic: "Inductance & Circuits", question: "The time constant of an LR circuit is:", answers: { A: "L/R", B: "R/L", C: "LC", D: "1/LC" }, correct: "A", explanation: "τ = L/R (seconds)" },
    { topic: "Inductance & Circuits", question: "Energy stored in an inductor is given by:", answers: { A: "½LI", B: "½LI²", C: "LI²", D: "L²I" }, correct: "B", explanation: "U = ½LI² (like kinetic energy ½mv²)" },
    { topic: "Inductance & Circuits", question: "The opposition to AC current by an inductor is called:", answers: { A: "resistance", B: "capacitance", C: "inductive reactance", D: "impedance" }, correct: "C", explanation: "XL = 2πfL, called inductive reactance" },
    { topic: "Inductance & Circuits", question: "In a pure capacitive circuit, current:", answers: { A: "lags voltage by 90°", B: "leads voltage by 90°", C: "is in phase with voltage", D: "leads voltage by 45°" }, correct: "B", explanation: "In capacitive circuit, I leads V by 90°" },
    
    // More Radioactivity
    { topic: "Radioactivity", question: "Beta plus decay occurs when:", answers: { A: "a neutron changes to proton", B: "a proton changes to neutron", C: "nucleus captures an electron", D: "nucleus emits a neutron" }, correct: "B", explanation: "β⁺: p → n + e⁺ + ν" },
    { topic: "Radioactivity", question: "Gamma radiation has:", answers: { A: "mass but no charge", B: "charge but no mass", C: "no mass and no charge", D: "both mass and charge" }, correct: "C", explanation: "γ-rays are high-energy electromagnetic radiation" },
    { topic: "Radioactivity", question: "The decay constant λ is related to half-life T½ by:", answers: { A: "λ = T½", B: "λ = 1/T½", C: "λ = ln2/T½", D: "λ = T½/ln2" }, correct: "C", explanation: "T½ = ln2/λ, so λ = ln2/T½" },
    { topic: "Radioactivity", question: "Activity of a radioactive sample is measured in:", answers: { A: "Becquerel", B: "Gray", C: "Sievert", D: "Joule" }, correct: "A", explanation: "1 Bq = 1 decay per second" },
    { topic: "Radioactivity", question: "Carbon-14 dating is used to date:", answers: { A: "rocks", B: "ancient biological remains", C: " fossils only", D: "metals" }, correct: "B", explanation: "¹⁴C dating used for organic materials up to ~50,000 years" },
    
    // More Atomic Structure
    { topic: "Atomic Structure", question: "The energy levels in Bohr's model are:", answers: { A: "continuous", B: "quantized", C: "random", D: "overlapping" }, correct: "B", explanation: "Bohr proposed discrete (quantized) energy levels" },
    { topic: "Atomic Structure", question: "The ground state of an atom is:", answers: { A: "highest energy state", B: "lowest energy state", C: "excited state", D: "ionized state" }, correct: "B", explanation: "Ground state = lowest stable energy state" },
    { topic: "Atomic Structure", question: "The wavelength of photon emitted when electron falls from n=3 to n=1 is:", answers: { A: "Lyman series", B: "Balmer series", C: "Paschen series", D: "Brackett series" }, correct: "A", explanation: "Transition to n=1 = Lyman series (UV)" },
    { topic: "Atomic Structure", question: "The photoelectric effect demonstrates:", answers: { A: "wave nature of light", B: "particle nature of light", C: "wave-particle duality", D: "standing waves" }, correct: "B", explanation: "Photoelectric effect proves light acts as particles (photons)" },
    { topic: "Atomic Structure", question: "The work function is the minimum energy needed to:", answers: { A: "accelerate an electron", B: "eject an electron from metal surface", C: "excite an electron", D: "ionize an atom" }, correct: "B", explanation: "Work function Φ = minimum energy to remove electron" },
    
    // More Electric Potential
    { topic: "Electric Potential", question: "Electric potential difference is measured in:", answers: { A: "Amperes", B: "Volts", C: "Ohms", D: "Watts" }, correct: "B", explanation: "1 V = 1 J/C" },
    { topic: "Electric Potential", question: "The potential at a point 5cm from a charge of 2µC is (k=9×10⁹):", answers: { A: "3.6×10⁵ V", B: "3.6×10⁶ V", C: "7.2×10⁵ V", D: "1.8×10⁵ V" }, correct: "C", explanation: "V = kQ/r = (9×10⁹)(2×10⁻⁶)/(0.05) = 7.2×10⁵ V" },
    { topic: "Electric Potential", question: "Equipotential surfaces are always perpendicular to:", answers: { A: "electric current", B: "electric field lines", C: "magnetic field lines", D: "charge motion" }, correct: "B", explanation: "E always perpendicular to equipotential surfaces" },
    { topic: "Electric Potential", question: "The potential inside a uniformly charged sphere is:", answers: { A: "zero", B: "maximum at surface", C: "constant throughout", D: "inversely proportional to r" }, correct: "C", explanation: "Inside hollow sphere, potential is constant" },
    { topic: "Electric Potential", question: "1 eV is equal to:", answers: { A: "1.6 × 10⁻¹⁹ J", B: "1.6 × 10⁻¹⁵ J", C: "9.1 × 10⁻³¹ J", D: "9 × 10⁹ J" }, correct: "A", explanation: "1 eV = e × 1 V = 1.602 × 10⁻¹⁹ J" },
    
    // More Modern Physics
    { topic: "Modern Physics", question: "The de Broglie wavelength is given by:", answers: { A: "λ = hc", B: "λ = h/p", C: "λ = pc", D: "λ = Ep" }, correct: "B", explanation: "λ = h/p = h/(mv)" },
    { topic: "Modern Physics", question: "The uncertainty principle states that:", answers: { A: "energy is conserved", B: "position and momentum cannot both be known precisely", C: "light behaves as particles", D: "atoms have discrete energy levels" }, correct: "B", explanation: "Δx·Δp ≥ ℏ/2" },
    { topic: "Modern Physics", question: "The Davisson-Germer experiment demonstrated:", answers: { A: "photoelectric effect", B: "electron diffraction", C: "atomic spectra", D: "radioactive decay" }, correct: "B", explanation: "Proved wave nature of electrons (diffraction)" },
    { topic: "Modern Physics", question: "Heisenberg's uncertainty principle is expressed as:", answers: { A: "E = mc²", B: "ΔxΔp ≥ ℏ/2", C: "λ = h/p", D: "V = IR" }, correct: "B", explanation: "Uncertainty principle: ΔxΔp ≥ ℏ/2" },
    { topic: "Modern Physics", question: "The quantum mechanical model of the atom uses:", answers: { A: "circular orbits", B: "spherical electron clouds (orbitals)", C: "fixed paths", D: "planetary orbits" }, correct: "B", explanation: "Q.M. uses probability densities, not orbits" },
    
    // More Electromagnetic Waves
    { topic: "EM Waves", question: "Electromagnetic waves are:", answers: { A: "mechanical waves", B: "longitudinal waves", C: "transverse waves", D: "stationary waves" }, correct: "C", explanation: "EM waves are transverse; E and B fields perpendicular to propagation" },
    { topic: "EM Waves", question: "The speed of all electromagnetic waves in vacuum is:", answers: { A: "3 × 10⁶ m/s", B: "3 × 10⁷ m/s", C: "3 × 10⁸ m/s", D: "constant for each type" }, correct: "C", explanation: "All EM waves travel at c = 3 × 10⁸ m/s in vacuum" },
    { topic: "EM Waves", question: "Which of the following has the highest frequency?", answers: { A: "Radio waves", B: "Microwaves", C: "X-rays", D: "Infrared" }, correct: "C", explanation: "E = hf; X-rays have very high frequency" },
    { topic: "EM Waves", question: "The phenomenon where light changes direction when entering a different medium is called:", answers: { A: "reflection", B: "diffraction", C: "refraction", D: "polarization" }, correct: "C", explanation: "Refraction: bending of light at boundary between media" },
    { topic: "EM Waves", question: "The phenomenon of light spreading out after passing through a narrow slit is:", answers: { A: "reflection", B: "refraction", C: "diffraction", D: "interference" }, correct: "C", explanation: "Diffraction: bending/spreading of waves around obstacles" }
];

