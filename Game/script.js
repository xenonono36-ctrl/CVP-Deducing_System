// ============================================================
// DISCRETE MATH GAMIFIED STUDY COMPANION
// Quest for the Exam Crown
// ============================================================

let gameState = {
    level: 1,
    xp: 0,
    xpNeeded: 100,
    streak: 0,
    sessionsCompleted: 0,
    totalMinutesStudied: 0,
    problemsSolved: 0,
    accuracy: 0,
    completedChallenges: [],
    unlockedAchievements: [],
    studyProgress: {},
    lastSessionDate: null,
    timerRunning: false,
    currentTimer: 1500, // 25 minutes in seconds
    goalsScored: 0,
    goalsMissed: 0,
    currentShootout: {
        round: 1,
        maxRounds: 5,
        goalsFor: 0,
        goalsAgainst: 0,
        inProgress: false
    }
};

// ============================================================
// STUDY CONTENT DATABASE
// ============================================================

const studyContent = {
    '4.1': {
        title: 'Divisibility & Modular Arithmetic',
        concepts: [
            {
                name: 'Divisibility Notation',
                content: 'a | b means ∃ integer c: b = ac. Read as "a divides b".'
            },
            {
                name: 'Division Algorithm',
                content: 'For integer a and positive d: ∃ unique q, r where a = dq + r and 0 ≤ r < d.',
                formula: 'a = dq + r (0 ≤ r < d)'
            },
            {
                name: 'Modular Congruence',
                content: 'a ≡ b (mod m) means a and b have the same remainder when divided by m. Equivalently, m | (a - b).',
                formula: 'a ≡ b (mod m) ⟺ m | (a - b)'
            },
            {
                name: 'Congruence Properties',
                content: 'If a≡b (mod m) and c≡d (mod m), then: (1) a+c ≡ b+d (mod m), (2) ac ≡ bd (mod m). You can add/multiply congruences like equations!',
                formula: 'a+c ≡ b+d (mod m) and ac ≡ bd (mod m)'
            }
        ]
    },
    '4.3': {
        title: 'Primes & GCD',
        concepts: [
            {
                name: 'Fundamental Theorem of Arithmetic',
                content: 'Every integer > 1 has a unique prime factorization.'
            },
            {
                name: 'GCD and LCM Relationship',
                content: 'The product of GCD and LCM equals the product of the two numbers.',
                formula: 'gcd(a,b) × lcm(a,b) = a × b'
            },
            {
                name: 'Euclidean Algorithm',
                content: 'To find gcd(a,b): repeatedly replace (a,b) with (b, a mod b) until remainder is 0. The last non-zero remainder is the GCD.',
                formula: 'gcd(a,b) = gcd(b, a mod b)'
            },
            {
                name: "Bézout's Identity",
                content: 'For any integers a and b, there exist integers s and t such that gcd(a,b) = as + bt. Find s,t via back-substitution in the Euclidean Algorithm.',
                formula: 'gcd(a,b) = as + bt'
            }
        ]
    },
    '4.4': {
        title: 'Solving Congruences',
        concepts: [
            {
                name: 'Linear Congruence Solvability',
                content: 'The equation ax ≡ b (mod m) has a solution if and only if gcd(a,m) divides b.',
                formula: 'ax ≡ b (mod m) has solution ⟺ gcd(a,m) | b'
            },
            {
                name: 'Modular Inverse',
                content: 'If gcd(a,m) = 1, then a has a modular inverse ā mod m, meaning ā·a ≡ 1 (mod m). Use the Extended Euclidean Algorithm to find it.',
                formula: 'ā·a ≡ 1 (mod m)'
            },
            {
                name: 'Chinese Remainder Theorem (CRT)',
                content: 'For pairwise-coprime moduli m₁, m₂, ..., mₖ, the system x≡a₁(mod m₁), x≡a₂(mod m₂), etc. has a unique solution modulo M = m₁m₂...mₖ.',
                formula: 'Unique solution mod M = ∏ᵢ mᵢ'
            },
            {
                name: "Fermat's Little Theorem",
                content: 'If p is prime and gcd(a,p) = 1, then a^(p-1) ≡ 1 (mod p). Useful for computing large powers modulo a prime quickly.',
                formula: 'a^(p-1) ≡ 1 (mod p)'
            },
            {
                name: 'Pseudoprimes',
                content: 'A composite number n where b^(n-1) ≡ 1 (mod n) for some base b. These fool Fermat\'s primality test.'
            }
        ]
    },
    '4.6': {
        title: 'Cryptography',
        concepts: [
            {
                name: 'Shift Cipher',
                content: 'Each letter is shifted by a fixed amount k. C = (P + k) mod 26 where P is plaintext, C is ciphertext.',
                formula: 'C = (P + k) mod 26'
            },
            {
                name: 'Affine Cipher',
                content: 'Uses two keys: C = (aP + b) mod 26. For decryption to work uniquely, gcd(a, 26) must equal 1. Decrypt using a⁻¹ mod 26.',
                formula: 'C = (aP + b) mod 26, gcd(a, 26) = 1'
            },
            {
                name: 'RSA Setup',
                content: 'Choose primes p and q. Compute n = pq and φ(n) = (p-1)(q-1). Pick e coprime to φ(n). Find d = e⁻¹ mod φ(n). Public key: (n,e). Private key: (n,d).',
                formula: 'n = pq, φ(n) = (p-1)(q-1), e·d ≡ 1 (mod φ(n))'
            },
            {
                name: 'RSA Encryption/Decryption',
                content: 'Encryption: C = M^e mod n. Decryption: M = C^d mod n. Security depends on the difficulty of factoring n = pq.',
                formula: 'C = M^e mod n, M = C^d mod n'
            }
        ]
    },
    '6.2': {
        title: 'Pigeonhole Principle',
        concepts: [
            {
                name: 'Basic Pigeonhole Principle',
                content: 'If you place n+1 objects into n boxes, at least one box must contain 2 or more objects. A simple but powerful proof technique.'
            },
            {
                name: 'Generalized Pigeonhole Principle',
                content: 'If you place N objects into k boxes, at least one box must contain at least ⌈N/k⌉ objects, where ⌈·⌉ is the ceiling function.',
                formula: 'Some box has ≥ ⌈N/k⌉ objects'
            },
            {
                name: 'Proof Strategy',
                content: 'To prove a statement using pigeonhole: (1) Identify the "objects" and "boxes". (2) Ensure objects > boxes. (3) Conclude some box has multiple objects. (4) Derive the desired result.'
            }
        ]
    },
    '10': {
        title: 'Graphs',
        concepts: [
            {
                name: 'Graph Basics',
                content: 'A graph G = (V, E) has vertices V and edges E (pairs of vertices). Directed edges have direction; undirected edges do not.'
            },
            {
                name: 'Handshaking Lemma',
                content: 'The sum of all vertex degrees equals twice the number of edges. The number of vertices with odd degree is always even.',
                formula: 'Σ deg(v) = 2|E|'
            },
            {
                name: 'Special Graphs',
                content: 'Complete graph Kₙ: every pair of vertices connected (n(n-1)/2 edges). Cycle Cₙ: n vertices in a ring (n edges). Bipartite: 2-colorable, no odd-length cycles.'
            },
            {
                name: 'Graph Isomorphism',
                content: 'Two graphs are isomorphic if there\'s a bijection between vertices preserving adjacency. Necessary (but not sufficient) checks: same vertex count, edge count, degree sequence.'
            },
            {
                name: 'Connectivity',
                content: 'Undirected: connected if path exists between any two vertices. Directed: strongly connected if directed path exists both ways; weakly connected if connected when ignoring direction.'
            },
            {
                name: 'Euler Paths & Circuits',
                content: 'Euler circuit visits every edge exactly once and returns to start: exists iff graph is connected and every vertex has even degree. Euler path: exists iff connected and exactly 2 vertices have odd degree.',
                formula: 'Euler circuit ⟺ all degrees even. Euler path ⟺ exactly 2 odd-degree vertices'
            },
            {
                name: 'Hamilton Paths & Circuits',
                content: 'Hamilton circuit visits every vertex exactly once and returns to start. No simple if-and-only-if condition exists. Dirac\'s theorem: if n≥3 and every vertex has degree ≥ n/2, a Hamilton circuit exists.',
                formula: "Dirac: deg(v) ≥ n/2 for all v ⟹ Hamilton circuit exists"
            }
        ]
    },
    '11': {
        title: 'Trees',
        concepts: [
            {
                name: 'Tree Definition',
                content: 'A tree is a connected acyclic graph. Key property: a tree with n vertices has exactly n-1 edges.',
                formula: 'n vertices ⟺ n-1 edges'
            },
            {
                name: 'Full m-ary Tree',
                content: 'Every internal node has exactly m children. For a full m-ary tree: n = mi + 1, where n = total vertices, i = internal vertices.',
                formula: 'n = mi + 1'
            },
            {
                name: 'Tree Traversals',
                content: 'Preorder: root, left, right (gives prefix notation). Inorder: left, root, right (gives infix notation). Postorder: left, right, root (gives postfix/RPN notation).'
            },
            {
                name: 'Huffman Coding',
                content: 'Build a binary tree by repeatedly merging the two nodes with smallest frequency into a parent with combined frequency. Assign codes: left=0, right=1. Frequent symbols get shorter codes.',
                formula: 'Merge smallest two, repeat until one tree'
            }
        ]
    }
};

// ============================================================
// PRACTICE PROBLEMS DATABASE
// ============================================================

const practiceProblems = [
    // Chapter 4 problems
    {
        id: 1,
        chapter: '4.1',
        difficulty: 'easy',
        question: 'What is 15 mod 4?',
        options: ['2', '3', '4', '5'],
        correct: 1,
        explanation: '15 = 3×4 + 3, so remainder is 3.',
        xpReward: 50
    },
    {
        id: 2,
        chapter: '4.3',
        difficulty: 'medium',
        question: 'Find gcd(252, 105) using the Euclidean Algorithm.',
        options: ['21', '35', '42', '14'],
        correct: 0,
        explanation: '252 = 2×105 + 42; 105 = 2×42 + 21; 42 = 2×21 + 0 → gcd = 21',
        xpReward: 100
    },
    {
        id: 3,
        chapter: '4.4',
        difficulty: 'medium',
        question: 'Solve: 3x ≡ 4 (mod 7)',
        options: ['x ≡ 2 (mod 7)', 'x ≡ 6 (mod 7)', 'x ≡ 4 (mod 7)', 'No solution'],
        correct: 1,
        explanation: '3⁻¹ ≡ 5 (mod 7) since 3×5 = 15 ≡ 1. So x ≡ 5×4 = 20 ≡ 6 (mod 7).',
        xpReward: 150
    },
    {
        id: 4,
        chapter: '4.6',
        difficulty: 'hard',
        question: 'Encrypt "A" with shift cipher k=3 (A=0, B=1, ..., Z=25)',
        options: ['C', 'D', 'E', 'B'],
        correct: 0,
        explanation: 'A=0, (0+3) mod 26 = 3 = D. Wait, that\'s D. Let me recalculate: (0+3) mod 26 = 3, which is D. But answer is D, not C. Check options: C=2. Hmm, let me verify: shift 3 forward from A should be D. Actually, if A=0, shift by 3 gives 3=D. But if options show C first, C might be index 2... Let me set correct to 1 for "D".',
        xpReward: 200
    },
    {
        id: 5,
        chapter: '6.2',
        difficulty: 'easy',
        question: 'If 13 people are distributed into 12 months, what can we conclude?',
        options: [
            'At least 2 people share a birth month',
            'Exactly 2 people share a month',
            'Everyone has different months',
            'Cannot determine'
        ],
        correct: 0,
        explanation: 'By the basic Pigeonhole Principle: 13 objects in 12 boxes → at least one box has ≥2 objects.',
        xpReward: 75
    },
    {
        id: 6,
        chapter: '10',
        difficulty: 'medium',
        question: 'Does K₅ (complete graph on 5 vertices) have an Euler circuit?',
        options: [
            'Yes, all vertices have even degree',
            'No, not all vertices have even degree',
            'Cannot determine without more info',
            'Only if it\'s directed'
        ],
        correct: 1,
        explanation: 'K₅ is complete, so every vertex has degree 4 (even). Wait, that means Euler circuit SHOULD exist. Let me check: degree is n-1 = 4. All even, so answer is "Yes". Hmm, option 0 says yes. Let me reconsider: every vertex in K₅ has degree 4. So correct answer is 0 (Yes).',
        xpReward: 125
    },
    {
        id: 7,
        chapter: '11',
        difficulty: 'medium',
        question: 'A full binary tree has 7 internal nodes. How many leaves?',
        options: ['6', '7', '8', '9'],
        correct: 2,
        explanation: 'Full binary tree: n = 2i + 1, where i = internal, n = total. 7 internal → n = 2(7) + 1 = 15 total. Leaves = 15 - 7 = 8.',
        xpReward: 150
    }
];

// Correcting problem 4 and 6
practiceProblems[3].correct = 1; // "D"
practiceProblems[5].correct = 0; // "Yes"

// ============================================================
// ACHIEVEMENTS
// ============================================================

const achievements = [
    {
        id: 'first-session',
        name: '🚀 First Steps',
        desc: 'Complete your first study session',
        icon: '🚀',
        unlocked: false,
        xpReward: 100
    },
    {
        id: 'seven-day-streak',
        name: '🔥 On Fire',
        desc: 'Build a 7-day study streak',
        icon: '🔥',
        unlocked: false,
        xpReward: 500
    },
    {
        id: 'problem-master',
        name: '🎯 Problem Master',
        desc: 'Solve 25 problems correctly',
        icon: '🎯',
        unlocked: false,
        xpReward: 750
    },
    {
        id: 'chapter-hero',
        name: '📚 Chapter Hero',
        desc: 'Master an entire chapter',
        icon: '📚',
        unlocked: false,
        xpReward: 300
    },
    {
        id: 'speedrunner',
        name: '⚡ Speedrunner',
        desc: 'Complete a 45-minute study session',
        icon: '⚡',
        unlocked: false,
        xpReward: 200
    },
    {
        id: 'accuracy-expert',
        name: '🎪 Accuracy Expert',
        desc: 'Achieve 90%+ accuracy on problems',
        icon: '🎪',
        unlocked: false,
        xpReward: 400
    },
    {
        id: 'level-5',
        name: '⭐ Level 5 Reached',
        desc: 'Reach level 5',
        icon: '⭐',
        unlocked: false,
        xpReward: 0
    },
    {
        id: 'legend',
        name: '👑 Legend',
        desc: 'Reach level 10',
        icon: '👑',
        unlocked: false,
        xpReward: 1000
    }
];

// ============================================================
// SCHEDULE DATA
// ============================================================

const schedule = [
    {
        day: 0,
        date: 'Saturday, Aug 29',
        blocks: [
            { time: '8:00–8:30', title: '🌅 Wake + Breakfast', desc: 'Skim today\'s plan', type: 'break' },
            { time: '8:30–10:15', title: '§4.1 Divisibility', desc: 'Divisibility, division algorithm, modular arithmetic', type: 'study' },
            { time: '10:15–10:30', title: '☕ Break', desc: 'Stretch, hydrate', type: 'break' },
            { time: '10:30–12:30', title: '§4.3 Primes & GCD', desc: 'Primes, GCD, Euclidean Algorithm, Bézout\'s Identity', type: 'study' },
            { time: '12:30–1:30', title: '🍽️ Lunch', desc: 'Full break, no studying', type: 'break' },
            { time: '1:30–3:30', title: '§4.4 Congruences', desc: 'Linear congruences, modular inverses, CRT, Fermat\'s Little Theorem', type: 'study' },
            { time: '3:30–3:45', title: '☕ Break', desc: 'Stretch, hydrate', type: 'break' },
            { time: '3:45–5:00', title: '§4.5 Hashing & PRNGs', desc: 'Hashing, PRNGs, check digits', type: 'study' },
            { time: '5:00–5:15', title: '☕ Break', desc: 'Stretch, hydrate', type: 'break' },
            { time: '5:15–7:00', title: '§4.6 Cryptography', desc: 'Shift/affine ciphers, RSA', type: 'study' },
            { time: '7:00–7:45', title: '🍽️ Dinner', desc: 'Relax', type: 'break' },
            { time: '7:45–9:15', title: '🎯 Practice Problems', desc: 'Mixed Ch. 4 problem set — timed, no notes', type: 'practice' },
            { time: '9:15–9:45', title: '🔍 Review Mistakes', desc: 'Fix mistakes from practice set only', type: 'review' },
            { time: '10:30', title: '😴 Sleep', desc: 'Aim for 8–9 hrs', type: 'break' }
        ]
    },
    {
        day: 1,
        date: 'Sunday, Aug 30',
        blocks: [
            { time: '7:30–8:00', title: '🌅 Wake + Breakfast', desc: '5-min flip through yesterday\'s cheat sheet', type: 'break' },
            { time: '8:00–9:00', title: '§6.2 Pigeonhole', desc: 'Pigeonhole Principle (basic + generalized)', type: 'study' },
            { time: '9:00–9:15', title: '☕ Break', desc: 'Stretch, hydrate', type: 'break' },
            { time: '9:15–11:00', title: '§10.1–10.2 Graph Basics', desc: 'Graph types, degree, Handshaking Lemma, special graphs', type: 'study' },
            { time: '11:00–11:15', title: '☕ Break', desc: 'Stretch, hydrate', type: 'break' },
            { time: '11:15–12:45', title: '§10.3–10.4 Graph Properties', desc: 'Adjacency/incidence matrices, isomorphism, connectivity', type: 'study' },
            { time: '12:45–1:45', title: '🍽️ Lunch', desc: 'Relax', type: 'break' },
            { time: '1:45–3:15', title: '§10.5 Euler & Hamilton', desc: 'Euler paths/circuits, Hamilton paths/circuits', type: 'study' },
            { time: '3:15–3:30', title: '☕ Break', desc: 'Stretch, hydrate', type: 'break' },
            { time: '3:30–5:00', title: '§11.1–11.2 Trees', desc: 'Tree properties, rooted/m-ary trees, BSTs, Huffman coding', type: 'study' },
            { time: '5:00–5:15', title: '☕ Break', desc: 'Stretch, hydrate', type: 'break' },
            { time: '5:15–6:45', title: '§11.3 Traversals', desc: 'Preorder/inorder/postorder, infix/prefix/postfix', type: 'study' },
            { time: '6:45–7:30', title: '🍽️ Dinner', desc: 'Relax', type: 'break' },
            { time: '7:30–9:00', title: '🎯 Practice Problems', desc: 'Mixed Ch. 6/10/11 problem set — timed, no notes', type: 'practice' },
            { time: '9:00–9:30', title: '🔍 Review Mistakes', desc: 'Fix mistakes only', type: 'review' },
            { time: '10:00', title: '😴 Sleep', desc: 'Protect this — tomorrow\'s performance depends on it', type: 'break' }
        ]
    },
    {
        day: 2,
        date: 'Monday, Aug 31',
        blocks: [
            { time: '7:30–8:00', title: '🌅 Wake + Breakfast', desc: 'No new material today — review only', type: 'break' },
            { time: '8:00–9:30', title: '📋 Rapid Review', desc: 'Go through cheat sheet top to bottom', type: 'review' },
            { time: '9:30–9:45', title: '☕ Break', desc: 'Stretch, hydrate', type: 'break' },
            { time: '9:45–11:00', title: '🎯 Mock Exam', desc: 'Pick ~10 mixed problems, simulate exam conditions', type: 'practice' },
            { time: '11:00–11:30', title: '🔍 Review', desc: 'Only look at what you got wrong', type: 'review' },
            { time: '11:30–12:30', title: '🍽️ Lunch + Break', desc: 'Walk, music, don\'t touch notes', type: 'break' },
            { time: '12:30–1:15', title: '⚡ Final Pass', desc: 'Re-read cheat sheet once, focus on weak spots', type: 'review' },
            { time: '1:15–1:45', title: '📦 Pack Up', desc: 'Calculator, pens, ID, water; head out', type: 'break' },
            { time: '1:45–2:25', title: '🚗 Arrive Early', desc: 'Breathe. Skim formula sheet one last time. Don\'t learn anything new.', type: 'break' },
            { time: '2:30', title: '📝 EXAM TIME!', desc: 'Go get it! 👑', type: 'exam' }
        ]
    }
];

// ============================================================
// CHALLENGE DATA
// ============================================================

function generateTodaysChallenges() {
    const today = new Date();
    const challenges = [
        { id: 'study-1h', title: '📚 Study for 60 minutes', reward: 200, type: 'time' },
        { id: 'solve-5', title: '🎯 Solve 5 problems correctly', reward: 250, type: 'problems' },
        { id: 'chapter-progress', title: '📖 Make progress on 2 chapters', reward: 300, type: 'chapters' },
        { id: 'perfect-set', title: '🔥 Get 100% on a problem set', reward: 500, type: 'accuracy' },
        { id: 'timer-session', title: '⏱️ Complete 2 timer sessions', reward: 150, type: 'sessions' }
    ];
    return challenges;
}

// ============================================================
// INITIALIZATION
// ============================================================

function init() {
    loadGameState();
    updateHeader();
    setupEventListeners();
    renderDashboard();
    startExamCountdown();
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            const tab = e.target.getAttribute('data-tab');
            document.getElementById(tab).classList.add('active');
            if (tab === 'schedule') renderSchedule();
            if (tab === 'study') renderStudyMode();
            if (tab === 'practice') renderPractice();
            if (tab === 'achievements') renderAchievements();
        });
    });

    // Day selector in schedule
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderSchedule(parseInt(e.target.getAttribute('data-day')));
        });
    });

    // Chapter selector in study mode
    document.querySelectorAll('.chapter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.chapter-btn').classList.add('active');
            const chapter = e.target.closest('.chapter-btn').getAttribute('data-chapter');
            renderStudyContent(chapter);
        });
    });

    // Difficulty selector in practice
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const difficulty = e.target.getAttribute('data-difficulty');
            renderPracticeProblems(difficulty);
        });
    });
}

// ============================================================
// GAME STATE MANAGEMENT
// ============================================================

function saveGameState() {
    localStorage.setItem('discreteMathGameState', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('discreteMathGameState');
    if (saved) {
        gameState = { ...gameState, ...JSON.parse(saved) };
    }
}

function addXP(amount) {
    gameState.xp += amount;
    while (gameState.xp >= gameState.xpNeeded) {
        gameState.xp -= gameState.xpNeeded;
        levelUp();
    }
    saveGameState();
    updateHeader();
}

function levelUp() {
    gameState.level++;
    gameState.xpNeeded = Math.floor(gameState.xpNeeded * 1.15);
    showNotification(`⭐ LEVEL UP! You are now Level ${gameState.level}!`);
}

function addChallenge(challengeId) {
    if (!gameState.completedChallenges.includes(challengeId)) {
        gameState.completedChallenges.push(challengeId);
        addXP(100);
        showNotification('✅ Challenge Completed!');
        saveGameState();
    }
}

function unlockAchievement(achievementId) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && !gameState.unlockedAchievements.includes(achievementId)) {
        gameState.unlockedAchievements.push(achievementId);
        achievement.unlocked = true;
        addXP(achievement.xpReward);
        showNotification(`🏆 Achievement Unlocked: ${achievement.name}!`);
        saveGameState();
    }
}

// ============================================================
// UI UPDATES
// ============================================================

function updateHeader() {
    document.getElementById('level').textContent = gameState.level;
    document.getElementById('xpDisplay').textContent = `${gameState.xp}/${gameState.xpNeeded}`;
    document.getElementById('streak').textContent = `🔥 ${gameState.streak}`;
}

function startExamCountdown() {
    function updateCountdown() {
        const examDate = new Date(2026, 7, 31, 14, 30, 0); // Aug 31, 2:30 PM
        const now = new Date();
        const diff = examDate - now;

        if (diff <= 0) {
            document.getElementById('examTimer').textContent = '🎯 EXAM TIME!';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('examTimer').textContent = `⏰ ${days}d ${hours}h ${minutes}m until Exam`;
    }

    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

function showNotification(message) {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    notif.classList.remove('hidden');
    
    // Trigger confetti for special messages
    if (message.includes('LEVEL UP') || message.includes('Achievement') || message.includes('Unlocked')) {
        triggerConfetti();
    }
    
    setTimeout(() => {
        notif.classList.add('hidden');
    }, 4000);
}

function triggerConfetti() {
    // Create simple confetti animation
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.fontSize = '20px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '999';
        
        const emojis = ['🎉', '⭐', '🎊', '🏆', '🎯', '✨', '🔥', '💫'];
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        document.body.appendChild(confetti);
        
        // Animate
        let top = -10;
        const interval = setInterval(() => {
            top += Math.random() * 5 + 2;
            confetti.style.top = top + 'px';
            confetti.style.transform = `rotate(${Math.random() * 360}deg) translateX(${Math.sin(top * 0.02) * 50}px)`;
            
            if (top > window.innerHeight) {
                clearInterval(interval);
                confetti.remove();
            }
        }, 20);
    }
}

function showModal(title, content) {
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `<h2>${title}</h2><div>${content}</div>`;
    modal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('modalOverlay').classList.add('hidden');
}

// ============================================================
// DASHBOARD
// ============================================================

function renderDashboard() {
    renderTodaysChallenges();
    updateDashboardStats();
    updateProgressBar();
}

function renderTodaysChallenges() {
    const container = document.getElementById('todaysChallenges');
    const challenges = generateTodaysChallenges();
    container.innerHTML = '';
    challenges.forEach(challenge => {
        const completed = gameState.completedChallenges.includes(challenge.id);
        const html = `
            <div class="challenge-item ${completed ? 'completed' : ''}" onclick="addChallenge('${challenge.id}')">
                <div class="challenge-text">
                    <div class="challenge-name">${challenge.title}</div>
                    <div class="challenge-reward">+${challenge.reward} XP</div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

function updateDashboardStats() {
    document.getElementById('sessionsCompleted').textContent = gameState.sessionsCompleted;
    const hours = Math.floor(gameState.totalMinutesStudied / 60);
    const mins = gameState.totalMinutesStudied % 60;
    document.getElementById('totalTime').textContent = `${hours}h ${mins}m`;
    document.getElementById('problemsSolved').textContent = gameState.problemsSolved;
    document.getElementById('accuracy').textContent = `${gameState.accuracy}%`;
    document.getElementById('goalsScored').textContent = gameState.goalsScored;
    document.getElementById('goalsMissed').textContent = gameState.goalsMissed;
    const shootoutCompletions = gameState.unlockedAchievements.filter(a => a.includes('shootout')).length;
    document.getElementById('shootoutStats').textContent = `${gameState.goalsScored + gameState.goalsMissed} total kicks`;
}

function updateProgressBar() {
    const totalSections = 7;
    const completed = gameState.unlockedAchievements.length;
    const percent = Math.floor((completed / totalSections) * 100);
    document.getElementById('mainProgress').style.width = percent + '%';
    document.getElementById('overallPercent').textContent = percent;
}

// ============================================================
// SCHEDULE RENDERING
// ============================================================

function renderSchedule(dayIndex = 0) {
    const day = schedule[dayIndex];
    const container = document.getElementById('scheduleContent');
    container.innerHTML = `<h3>${day.date} - Level ${dayIndex + 1}</h3>`;

    day.blocks.forEach((block, idx) => {
        const completed = gameState.completedChallenges.includes(`block-${dayIndex}-${idx}`);
        const html = `
            <div class="time-block ${completed ? 'completed' : ''}" onclick="completeBlock(${dayIndex}, ${idx})">
                <div class="time-range">${block.time}</div>
                <div class="block-title">${block.title}</div>
                <div class="block-description">${block.desc}</div>
            </div>
        `;
        container.innerHTML += html;
    });
}

function completeBlock(dayIndex, blockIndex) {
    const blockId = `block-${dayIndex}-${blockIndex}`;
    if (!gameState.completedChallenges.includes(blockId)) {
        gameState.completedChallenges.push(blockId);
        gameState.sessionsCompleted++;
        gameState.totalMinutesStudied += 30;
        gameState.streak++;
        addXP(75);
        showNotification('✅ Block Completed! Great work!');
        saveGameState();
        renderSchedule(dayIndex);
        updateDashboardStats();
    }
}

// ============================================================
// STUDY MODE
// ============================================================

function renderStudyMode() {
    const container = document.getElementById('studyContent');
    renderStudyContent('4.1');
}

function renderStudyContent(chapter) {
    const content = studyContent[chapter];
    const container = document.getElementById('studyContent');
    container.innerHTML = `<h3>${content.title}</h3>`;

    content.concepts.forEach(concept => {
        let html = `
            <div class="concept-card">
                <div class="concept-title">📌 ${concept.name}</div>
                <div class="concept-content">${concept.content}</div>
        `;
        if (concept.formula) {
            html += `<div class="concept-formula">${concept.formula}</div>`;
        }
        html += `</div>`;
        container.innerHTML += html;
    });

    gameState.sessionsCompleted++;
    gameState.totalMinutesStudied += 45;
    addXP(100);
    saveGameState();
    updateDashboardStats();
}

// ============================================================
// PRACTICE / BATTLE ARENA
// ============================================================

function renderPractice() {
    renderPracticeProblems('easy');
}

function renderPracticeProblems(difficulty) {
    const filtered = practiceProblems.filter(p => p.difficulty === difficulty);
    const container = document.getElementById('problemArea');
    container.innerHTML = '';

    filtered.forEach((problem, idx) => {
        let html = `
            <div class="problem-card" id="problem-${problem.id}">
                <div class="problem-header">
                    <span class="problem-number">Q${problem.id}</span>
                    <span class="problem-difficulty">${difficulty.toUpperCase()}</span>
                </div>
                <div class="problem-text">${problem.question}</div>
                <div class="problem-options">
        `;

        problem.options.forEach((option, optIdx) => {
            html += `
                <div class="option" onclick="selectOption(${problem.id}, ${optIdx})">
                    ${String.fromCharCode(65 + optIdx)}) ${option}
                </div>
            `;
        });

        html += `
                </div>
                <div class="problem-actions">
                    <button class="action-btn" onclick="submitProblem(${problem.id})">🎯 Submit</button>
                    <button class="action-btn hint-btn" onclick="showHint(${problem.id})">💡 Hint</button>
                </div>
                <div id="hint-${problem.id}" class="hint-text hidden" style="display:none;"></div>
            </div>
        `;
        container.innerHTML += html;
    });
}

let selectedOption = {};

function selectOption(problemId, optIndex) {
    selectedOption[problemId] = optIndex;
    document.querySelectorAll(`#problem-${problemId} .option`).forEach((opt, idx) => {
        opt.classList.toggle('selected', idx === optIndex);
    });
}

function submitProblem(problemId) {
    const problem = practiceProblems.find(p => p.id === problemId);
    const selected = selectedOption[problemId];

    if (selected === undefined) {
        showNotification('⚠️ Please select an option!');
        return;
    }

    const card = document.getElementById(`problem-${problemId}`);
    const options = card.querySelectorAll('.option');

    if (selected === problem.correct) {
        options[selected].classList.add('correct');
        card.classList.add('solved');
        gameState.problemsSolved++;
        gameState.accuracy = Math.min(100, gameState.accuracy + 5);
        addXP(problem.xpReward);
        
        // Show notification and then trigger penalty shootout
        showNotification(`✅ Correct! Now take your penalty shot! ⚽`);
        
        // Delay shootout to let notification appear
        setTimeout(() => {
            startPenaltyShootout();
        }, 800);
    } else {
        options[selected].classList.add('incorrect');
        options[problem.correct].classList.add('correct');
        gameState.accuracy = Math.max(0, gameState.accuracy - 3);
        showNotification('❌ Incorrect. Study harder next time!');
    }

    saveGameState();
    updateDashboardStats();
}

function showHint(problemId) {
    const problem = practiceProblems.find(p => p.id === problemId);
    const hintDiv = document.getElementById(`hint-${problemId}`);
    hintDiv.textContent = `💡 Hint: ${problem.explanation}`;
    hintDiv.style.display = 'block';
}

// ============================================================
// PENALTY SHOOTOUT SYSTEM (Soccer Kicks)
// ============================================================

function startPenaltyShootout() {
    gameState.currentShootout = {
        round: gameState.currentShootout.round || 1,
        maxRounds: 5,
        goalsFor: gameState.currentShootout.goalsFor || 0,
        goalsAgainst: gameState.currentShootout.goalsAgainst || 0,
        inProgress: true
    };

    const shootoutHtml = `
        <div class="shootout-container">
            <div class="shootout-header">
                <div class="shootout-title">⚽ PENALTY SHOOTOUT</div>
                <div class="shootout-score">
                    <div class="shootout-team">
                        <span class="team-name">YOU</span>
                        <span class="team-score" id="playerScore">${gameState.currentShootout.goalsFor}</span>
                    </div>
                    <div class="shootout-vs">vs</div>
                    <div class="shootout-team">
                        <span class="team-name">KEEPER</span>
                        <span class="team-score" id="keeperScore">${gameState.currentShootout.goalsAgainst}</span>
                    </div>
                </div>
                <div class="shootout-round">Round ${gameState.currentShootout.round}/${gameState.currentShootout.maxRounds}</div>
            </div>

            <div class="shootout-phase" id="shootoutPhase">
                <!-- Phase content loaded here -->
            </div>
        </div>
    `;

    showModal('🎯 TAKE YOUR SHOT', shootoutHtml);
    document.getElementById('shootoutPhase').innerHTML = renderKickPhase();
}

function renderKickPhase() {
    return `
        <div class="kick-phase">
            <div class="goal-container">
                <div class="goal-frame">
                    <div class="goal-grid">
                        ${Array(9).fill(0).map((_, i) => `
                            <div class="goal-spot" data-spot="${i}" onclick="selectGoalSpot(${i})">
                                <span class="spot-label">${getSpotLabel(i)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="keeper">🧤</div>
                </div>
            </div>
            <div class="kick-instruction">
                <p>Pick your corner to beat the keeper! 🎯</p>
                <p class="spot-guide">Top-Left • Top-Center • Top-Right<br>Mid-Left • Center • Mid-Right<br>Bottom-Left • Bottom-Center • Bottom-Right</p>
            </div>
        </div>
    `;
}

function getSpotLabel(index) {
    const labels = ['TL', 'TC', 'TR', 'ML', 'C', 'MR', 'BL', 'BC', 'BR'];
    return labels[index];
}

function selectGoalSpot(spotIndex) {
    const spots = document.querySelectorAll('.goal-spot');
    spots.forEach(s => s.classList.remove('selected'));
    spots[spotIndex].classList.add('selected');

    // Keeper dives to a random spot
    setTimeout(() => {
        const keeperSpot = Math.floor(Math.random() * 9);
        evaluatePenalty(spotIndex, keeperSpot);
    }, 300);
}

function evaluatePenalty(playerSpot, keeperSpot) {
    const didScore = playerSpot !== keeperSpot;
    const spots = document.querySelectorAll('.goal-spot');
    
    if (didScore) {
        spots[playerSpot].classList.add('scored');
        gameState.currentShootout.goalsFor++;
        gameState.goalsScored++;
        showNotification('⚽ GOAL! 🎉');
    } else {
        spots[playerSpot].classList.add('missed');
        spots[keeperSpot].classList.add('saved');
        gameState.currentShootout.goalsAgainst++;
        gameState.goalsMissed++;
        showNotification('🛑 SAVED! The keeper got it!');
    }

    // Update score display
    document.getElementById('playerScore').textContent = gameState.currentShootout.goalsFor;
    document.getElementById('keeperScore').textContent = gameState.currentShootout.goalsAgainst;

    setTimeout(() => {
        transitionToDefensePhase();
    }, 2000);
}

function transitionToDefensePhase() {
    document.getElementById('shootoutPhase').innerHTML = renderDefensePhase();
}

function renderDefensePhase() {
    return `
        <div class="defense-phase">
            <div class="defense-instruction">
                <p>🛡️ Now defend! The keeper is taking a shot!</p>
                <p>Pick a corner to make the save!</p>
            </div>
            <div class="goal-container">
                <div class="goal-frame">
                    <div class="goal-grid defense-grid">
                        ${Array(9).fill(0).map((_, i) => `
                            <div class="goal-spot defense-spot" data-spot="${i}" onclick="selectDefenseSpot(${i})">
                                <span class="spot-label">${getSpotLabel(i)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="striker">⚽</div>
                </div>
            </div>
        </div>
    `;
}

function selectDefenseSpot(spotIndex) {
    const spots = document.querySelectorAll('.defense-spot');
    spots.forEach(s => s.classList.remove('selected'));
    spots[spotIndex].classList.add('selected');

    // Striker shoots to a random spot
    setTimeout(() => {
        const strikerSpot = Math.floor(Math.random() * 9);
        evaluateDefense(spotIndex, strikerSpot);
    }, 300);
}

function evaluateDefense(playerSpot, strikerSpot) {
    const didSave = playerSpot === strikerSpot;
    const spots = document.querySelectorAll('.defense-spot');
    
    if (didSave) {
        spots[playerSpot].classList.add('saved');
        showNotification('🛑 SAVE! Incredible defense!');
    } else {
        spots[playerSpot].classList.add('missed');
        spots[strikerSpot].classList.add('scored');
        gameState.currentShootout.goalsAgainst++;
        showNotification('⚽ Striker scores!');
    }

    // Update score display
    document.getElementById('keeperScore').textContent = gameState.currentShootout.goalsAgainst;

    setTimeout(() => {
        // Move to next round or end shootout
        gameState.currentShootout.round++;
        if (gameState.currentShootout.round > gameState.currentShootout.maxRounds) {
            endShootout();
        } else {
            closeModal();
            addXP(100);
            saveGameState();
        }
    }, 2000);
}

function endShootout() {
    const playerGoals = gameState.currentShootout.goalsFor;
    const keeperGoals = gameState.currentShootout.goalsAgainst;
    const playerWon = playerGoals > keeperGoals;

    const resultHtml = `
        <div class="shootout-result">
            <div class="result-title">${playerWon ? '🏆 YOU WIN!' : '🤖 Keeper Wins!'}</div>
            <div class="result-score">
                <div class="result-team">
                    <span class="result-label">Your Goals</span>
                    <span class="result-goals" style="color: ${playerWon ? '#4ECDC4' : '#FF6B6B'}">${playerGoals}</span>
                </div>
                <span class="result-vs">-</span>
                <div class="result-team">
                    <span class="result-label">Keeper Goals</span>
                    <span class="result-goals" style="color: ${playerWon ? '#FF6B6B' : '#4ECDC4'}">${keeperGoals}</span>
                </div>
            </div>
            <div class="result-stats">
                <div class="stat-item">
                    <span class="stat-emoji">⚽</span>
                    <span class="stat-text">Total Goals This Session: ${gameState.goalsScored}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-emoji">🛑</span>
                    <span class="stat-text">Saves Made: ${gameState.goalsMissed}</span>
                </div>
            </div>
            <button class="result-btn" onclick="closeModal(); addXP(${playerWon ? 300 : 100});">
                ${playerWon ? '🎉 Continue Studying' : '💪 Try Again'}
            </button>
        </div>
    `;

    showModal('⚽ Shootout Over!', resultHtml);
    
    saveGameState();
}

// ============================================================
// ACHIEVEMENTS
// ============================================================

function renderAchievements() {
    const container = document.getElementById('achievementGrid');
    container.innerHTML = '';

    document.getElementById('achievementCount').textContent = gameState.unlockedAchievements.length;
    document.getElementById('totalAchievements').textContent = achievements.length;

    achievements.forEach(achievement => {
        const unlocked = gameState.unlockedAchievements.includes(achievement.id);
        const html = `
            <div class="achievement-card ${unlocked ? 'unlocked' : ''}" title="${achievement.desc}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
                <div class="achievement-reward">+${achievement.xpReward} XP</div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// ============================================================
// TIMER FUNCTIONS
// ============================================================

let timerInterval = null;

function startTimer() {
    if (gameState.timerRunning) return;
    gameState.timerRunning = true;

    timerInterval = setInterval(() => {
        if (gameState.currentTimer > 0) {
            gameState.currentTimer--;
            updateTimerDisplay();
        } else {
            pauseTimer();
            showNotification('⏰ Time\'s up! Great session!');
            gameState.sessionsCompleted++;
            gameState.totalMinutesStudied += 25;
            addXP(150);
            saveGameState();
            updateDashboardStats();
        }
    }, 1000);
}

function pauseTimer() {
    gameState.timerRunning = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    pauseTimer();
    gameState.currentTimer = 1500;
    updateTimerDisplay();
}

function setTimer(minutes) {
    pauseTimer();
    gameState.currentTimer = minutes * 60;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const mins = Math.floor(gameState.currentTimer / 60);
    const secs = gameState.currentTimer % 60;
    document.getElementById('timerDisplay').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function activatePowerup(type) {
    showNotification(`⚡ ${type.toUpperCase()} activated!`);
    if (type === 'doubleXP') {
        setTimeout(() => gameState.xpMultiplier = 1, 3600000);
    }
}

// ============================================================
// INITIALIZE ON LOAD
// ============================================================

document.addEventListener('DOMContentLoaded', init);
