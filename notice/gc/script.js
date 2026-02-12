// Custom Cursor Management
const customCursor = document.getElementById('customCursor');
let cursorActive = false;

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
});

document.addEventListener('click', () => {
    if (!cursorActive) {
        cursorActive = true;
        customCursor.classList.add('active');
    }
});

// Audio Management
const backgroundMusic = document.getElementById('backgroundMusic');
const audioToggle = document.getElementById('audioToggle');
const audioIcon = document.querySelector('.audio-icon');
let isMuted = false;

// Photo URLs for falling background
const photoUrls = [
    'https://www.genspark.ai/api/files/s/hpD4N5Sf',
    'https://www.genspark.ai/api/files/s/gQzG3l0A',
    'https://www.genspark.ai/api/files/s/dMEQHcnV',
    'https://www.genspark.ai/api/files/s/oFA0FnSO',
    'https://www.genspark.ai/api/files/s/CYdFVlOr',
    'https://www.genspark.ai/api/files/s/wzZcAGBA',
    'https://www.genspark.ai/api/files/s/9JRhxgtQ'
];

// Attempt to autoplay music when page loads
window.addEventListener('load', () => {
    document.getElementById('welcomeScreen').classList.add('active');
    
    // Start welcome screen animations
    startWelcomeScreen();
    
    // Try to autoplay music
    backgroundMusic.play().then(() => {
        isMuted = false;
        audioToggle.classList.remove('muted');
        audioIcon.textContent = '🔊';
    }).catch(e => {
        console.log('Autoplay prevented by browser. Music will start on first interaction.');
        isMuted = true;
        audioToggle.classList.add('muted');
        audioIcon.textContent = '🔇';
    });
});

// Attempt to play music on first user interaction if autoplay failed
document.addEventListener('click', () => {
    if (isMuted && backgroundMusic.paused) {
        backgroundMusic.play().then(() => {
            isMuted = false;
            audioToggle.classList.remove('muted');
            audioIcon.textContent = '🔊';
        }).catch(e => {
            console.log('Audio autoplay prevented:', e);
        });
    }
}, { once: true });

// Audio toggle button
audioToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (isMuted || backgroundMusic.paused) {
        backgroundMusic.play().then(() => {
            isMuted = false;
            audioToggle.classList.remove('muted');
            audioIcon.textContent = '🔊';
        }).catch(e => {
            console.log('Audio play failed:', e);
        });
    } else {
        backgroundMusic.pause();
        isMuted = true;
        audioToggle.classList.add('muted');
        audioIcon.textContent = '🔇';
    }
});

// Set initial volume
backgroundMusic.volume = 0.5;

// ===== WELCOME SCREEN LOGIC =====
const welcomeScreen = document.getElementById('welcomeScreen');
const passwordScreen = document.getElementById('passwordScreen');

function startWelcomeScreen() {
    // Start falling photos in background
    startWelcomePhotos();
    
    // Type welcome message
    typeWelcomeMessage();
}

function startWelcomePhotos() {
    const photosBg = document.getElementById('welcomePhotosBg');
    let photoIndex = 0;
    
    // Create falling photos continuously
    setInterval(() => {
        const photo = document.createElement('div');
        photo.className = 'welcome-photo';
        photo.style.backgroundImage = `url('${photoUrls[photoIndex % photoUrls.length]}')`;
        photo.style.left = Math.random() * (window.innerWidth - 150) + 'px';
        photo.style.setProperty('--rotation', (Math.random() - 0.5) * 360 + 'deg');
        photo.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        photosBg.appendChild(photo);
        photoIndex++;
        
        // Remove after animation
        setTimeout(() => photo.remove(), 25000);
    }, 3000);
}

function typeWelcomeMessage() {
    const messageContainer = document.getElementById('welcomeMessage');
    const chalooBtn = document.getElementById('chalooBtn');
    
    const fullMessage = `Welcome, Garima.

You are about to enter a carefully designed evaluation process conducted under the jurisdiction of the High Court of My Heart. This form has been prepared with sincerity, mild overthinking, and a suspicious amount of affection.

Please answer honestly. The results may permanently affect one Lucky. ❤️

Proceed when ready.`;
    
    const paragraphs = fullMessage.split('\n\n');
    let paragraphIndex = 0;
    
    function typeNextParagraph() {
        if (paragraphIndex < paragraphs.length) {
            const p = document.createElement('p');
            messageContainer.appendChild(p);
            
            let charIndex = 0;
            const text = paragraphs[paragraphIndex];
            
            const typingInterval = setInterval(() => {
                if (charIndex < text.length) {
                    p.textContent += text[charIndex];
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                    paragraphIndex++;
                    
                    // Wait before typing next paragraph
                    setTimeout(() => {
                        if (paragraphIndex < paragraphs.length) {
                            typeNextParagraph();
                        } else {
                            // Show button after all text is typed
                            setTimeout(() => {
                                chalooBtn.classList.remove('hidden');
                            }, 500);
                        }
                    }, 300);
                }
            }, 30);
        }
    }
    
    typeNextParagraph();
}

// Chaloo button click handler
document.getElementById('chalooBtn').addEventListener('click', () => {
    welcomeScreen.classList.remove('active');
    passwordScreen.classList.add('active');
});

// ===== PASSWORD SCREEN LOGIC =====
const formScreen = document.getElementById('formScreen');
const passwordInput = document.getElementById('passwordInput');
const passwordSubmit = document.getElementById('passwordSubmit');
const popupModal = document.getElementById('popupModal');
const popupText = document.getElementById('popupText');
const popupClose = document.getElementById('popupClose');

// Questions Data
const questions = [
    {
        question: "Who should officially handle your Valentine's Day this year?",
        options: ["The responsible one", "The dramatic one", "The emotionally intelligent one", "The dangerously sincere one"]
    },
    {
        question: "Preferred Valentine qualification:",
        options: ["Advocate level argument skills", "Emotional support provider", "Surprise planner", "All of the above"]
    },
    {
        question: "If love were a case in court, who would represent you?",
        options: ["A confident lawyer", "A charming negotiator", "Someone who never gives up", "The only counsel you trust"]
    },
    {
        question: "Your Valentine must promise to:",
        options: ["Listen to your rants", "Send random thoughtful things", "Handle your mood swings professionally", "Choose you every time"]
    },
    {
        question: "Who looks best standing next to you in photos?",
        options: ["The tall one", "The serious face one", "The one who secretly smiles at you", "The one filling this form"]
    },
    {
        question: "If someone already likes you a lot, he should:",
        options: ["Confess boldly", "Pretend to be calm", "Send flowers again (properly this time)", "Just ask you already"]
    },
    {
        question: "If you had to choose one forever Valentine:",
        options: ["The loyal one", "The protective one", "The slightly filmy one", "The only correct answer"]
    },
    {
        question: "If (You == Cute) { Valentine = ? }",
        options: ["True", "Obviously True", "Always True", "Me"]
    },
    {
        question: "If your heart throws an exception, who should handle it?",
        options: ["try { comfort(); } catch { hug(); }", "A calm problem solver", "Someone who reads the logs carefully", "The default handler (him)"]
    },
    {
        question: "Who would pass all your compatibility tests?",
        options: ["100% match", "No bugs detected", "Fully responsive", "Already integrated with your system"]
    },
    {
        question: "According to machine learning predictions, your Valentine probability favors:",
        options: ["Tall advocate", "Slightly dramatic male human", "Emotionally persistent individual", "LeoTheChor"]
    },
    {
        question: "What should be your default Valentine setting?",
        options: ["auto_select_best_option = true", "force_choose_him = true", "accept_request = true", "stop_overthinking = true"]
    },
    {
        question: "Are you sure you want to proceed with this Valentine selection?",
        options: ["Yes, proceed", "Confirm deployment", "Push to production", "Say yes already"]
    },
    {
        question: "This action cannot be undone. Continue?",
        options: ["Continue", "Definitely", "Obviously", "It was always him"],
        isRedAlert: true
    }
];

// State Management
let currentState = {
    passwordAttempts: 0,
    currentQuestion: 0,
    answers: []
};

// Thinking Emoji Texts
const thinkingTexts = [
    "Girl, seriously!",
    "Hey are you sure?",
    "No no no",
    "Duhhhh",
    "Really?! 🤔",
    "Hmm... interesting choice",
    "Are you being honest?",
    "Think again!",
    "Okay okay..."
];

passwordSubmit.addEventListener('click', handlePasswordSubmit);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handlePasswordSubmit();
});

function handlePasswordSubmit() {
    currentState.passwordAttempts++;
    
    if (currentState.passwordAttempts === 1) {
        showPopup("Tumko password yaad nhi!! 😒 (dramatically)");
    } else if (currentState.passwordAttempts === 2) {
        createFlowerExplosion();
        setTimeout(() => {
            showPopup("Firse galat password... tum rehne hi do, hamesha ka hai ye 🌸");
        }, 1000);
    } else if (currentState.passwordAttempts === 3) {
        showPopup("Arey acha... sahi dala tha password tumne. Maine galat sun liya tha 😌", () => {
            createLoveEmojiBurst();
            setTimeout(() => {
                passwordScreen.classList.remove('active');
                formScreen.classList.add('active');
                initializeForm();
            }, 3000);
        });
    }
}

function showPopup(message, callback) {
    popupText.textContent = message;
    popupModal.classList.remove('hidden');
    
    popupClose.onclick = () => {
        popupModal.classList.add('hidden');
        if (callback) callback();
    };
}

function createFlowerExplosion() {
    const flowerExplosion = document.getElementById('flowerExplosion');
    const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹', '💐'];
    
    for (let i = 0; i < 30; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = Math.random() * 100 + '%';
        flower.style.animationDelay = Math.random() * 0.5 + 's';
        flowerExplosion.appendChild(flower);
        
        setTimeout(() => flower.remove(), 2000);
    }
}

function createLoveEmojiBurst() {
    const emojis = ['❤️', '💖', '🌹', '💘', '💕', '💓', '💗', '💝'];
    
    for (let i = 0; i < 50; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'love-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const endX = (Math.random() - 0.5) * 400;
        const endY = (Math.random() - 0.5) * 400;
        
        emoji.style.left = startX + 'px';
        emoji.style.top = startY + 'px';
        emoji.style.setProperty('--tx', endX + 'px');
        emoji.style.setProperty('--ty', endY + 'px');
        
        document.body.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 3000);
    }
}

// ===== FORM SCREEN LOGIC =====
let thinkingEmojiInterval;

function initializeForm() {
    renderQuestion(0);
    startThinkingEmojiAnimation();
}

function startThinkingEmojiAnimation() {
    const thinkingEmoji = document.getElementById('thinkingEmoji');
    const thinkingTextEl = document.getElementById('thinkingText');
    
    thinkingEmojiInterval = setInterval(() => {
        // Random position along progress bar
        const randomPos = Math.random() * 90;
        thinkingEmoji.style.left = randomPos + '%';
        
        // Random size variation
        const randomSize = 30 + Math.random() * 20;
        thinkingEmoji.style.fontSize = randomSize + 'px';
        
        // Sometimes show text
        if (Math.random() > 0.7) {
            const randomText = thinkingTexts[Math.floor(Math.random() * thinkingTexts.length)];
            thinkingTextEl.textContent = randomText;
            thinkingTextEl.classList.add('show');
            
            setTimeout(() => {
                thinkingTextEl.classList.remove('show');
            }, 2000);
        }
    }, 2000);
}

function renderQuestion(index) {
    if (index >= questions.length) {
        // Move to analysis screen
        clearInterval(thinkingEmojiInterval);
        formScreen.classList.remove('active');
        document.getElementById('analysisScreen').classList.add('active');
        startAnalysis();
        return;
    }
    
    const question = questions[index];
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    
    if (question.isRedAlert) {
        showRedAlert(question);
        return;
    }
    
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    
    const questionTitle = document.createElement('h3');
    questionTitle.textContent = `Q${index + 1}: ${question.question}`;
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';
    
    question.options.forEach((option) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(button, index, option);
        optionsDiv.appendChild(button);
    });
    
    questionDiv.appendChild(questionTitle);
    questionDiv.appendChild(optionsDiv);
    container.appendChild(questionDiv);
    
    updateProgress(index);
}

function selectOption(button, questionIndex, answer) {
    // Disable all buttons
    const allButtons = button.parentElement.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);
    
    // Mark selected
    button.classList.add('selected');
    
    // Store answer
    currentState.answers.push(answer);
    currentState.currentQuestion = questionIndex + 1;
    
    // Move to next question after animation
    setTimeout(() => {
        renderQuestion(questionIndex + 1);
    }, 800);
}

function updateProgress(questionIndex) {
    const progress = ((questionIndex + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function showRedAlert(question) {
    const redAlertModal = document.getElementById('redAlertModal');
    const redAlertText = document.getElementById('redAlertText');
    redAlertText.textContent = question.question;
    redAlertModal.classList.remove('hidden');
    
    const alertButtons = document.querySelectorAll('.alert-btn');
    alertButtons.forEach(btn => {
        btn.onclick = () => {
            redAlertModal.classList.add('hidden');
            currentState.answers.push(btn.dataset.answer);
            currentState.currentQuestion = questions.length;
            
            // Move to analysis
            clearInterval(thinkingEmojiInterval);
            formScreen.classList.remove('active');
            document.getElementById('analysisScreen').classList.add('active');
            startAnalysis();
        };
    });
}

// ===== ANALYSIS SCREEN LOGIC =====
function startAnalysis() {
    // Animate stats
    animateStats();
    
    // Show verdict after 10 seconds
    setTimeout(() => {
        document.querySelector('.analysis-visuals').style.display = 'none';
        document.querySelector('.analysis-container h2').style.display = 'none';
        document.querySelector('.analysis-container p').style.display = 'none';
        
        const verdictContainer = document.getElementById('verdictContainer');
        verdictContainer.classList.remove('hidden');
    }, 10000);
}

function animateStats() {
    const compatStat = document.getElementById('compatStat');
    const emotionalStat = document.getElementById('emotionalStat');
    const perfectStat = document.getElementById('perfectStat');
    
    animateNumber(compatStat, 0, 98, 3000);
    animateNumber(emotionalStat, 0, 95, 3500);
    animateNumber(perfectStat, 0, 100, 4000);
}

function animateNumber(element, start, end, duration) {
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

document.getElementById('continueBtn').addEventListener('click', () => {
    document.getElementById('analysisScreen').classList.remove('active');
    document.getElementById('finalScreen').classList.add('active');
    startFinalSequence();
});

// ===== FINAL SCREEN LOGIC =====
function startFinalSequence() {
    const fadeTexts = document.querySelectorAll('.fade-text');
    let delay = 0;
    
    fadeTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('show');
        }, delay);
        delay += 3000;
    });
    
    // Show final question after all texts fade
    setTimeout(() => {
        document.getElementById('finalTextSequence').style.display = 'none';
        document.getElementById('finalQuestion').classList.remove('hidden');
    }, delay + 1000);
}

// YES/NO Button Logic
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const errorModal = document.getElementById('errorModal');
const errorClose = document.getElementById('errorClose');

noBtn.addEventListener('click', () => {
    errorModal.classList.remove('hidden');
});

errorClose.addEventListener('click', () => {
    errorModal.classList.add('hidden');
    noBtn.classList.add('hidden');
});

yesBtn.addEventListener('click', () => {
    createCelebration();
});

// ===== CELEBRATION WITH PHOTOS =====
function createCelebration() {
    const celebrationContainer = document.getElementById('celebrationContainer');
    celebrationContainer.classList.remove('hidden');
    
    // Make sure music is playing for celebration
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
        isMuted = false;
        audioToggle.classList.remove('muted');
        audioIcon.textContent = '🔊';
    }
    
    // Increase volume for celebration
    backgroundMusic.volume = 0.7;
    
    // Hide buttons
    document.querySelector('.final-buttons').style.display = 'none';
    
    // Create typing message
    const typingText = document.querySelector('.typing-text');
    typingText.innerHTML = '';
    typingText.classList.add('celebrating');
    typingText.style.borderRight = '3px solid #ff6b9d';
    
    const message = 'Garima, you didn\'t just press "Yes"… you chose me — and I promise to choose you back every single day, not just on the 14th, but in every ordinary moment that we turn special together. ❤️\n\n— Utkarsh';
    
    let charIndex = 0;
    const typingInterval = setInterval(() => {
        if (charIndex < message.length) {
            if (message[charIndex] === '\n') {
                typingText.innerHTML += '<br>';
            } else {
                typingText.textContent += message[charIndex];
            }
            charIndex++;
        } else {
            clearInterval(typingInterval);
            typingText.style.borderRight = 'none';
        }
    }, 50);
    
    // Create falling photos - CONTINUOUS LOOP
    let photoIndex = 0;
    setInterval(() => {
        const photo = document.createElement('div');
        photo.className = 'falling-photo';
        photo.style.backgroundImage = `url('${photoUrls[photoIndex % photoUrls.length]}')`;
        photo.style.left = Math.random() * (window.innerWidth - 120) + 'px';
        photo.style.setProperty('--rotation', (Math.random() - 0.5) * 720 + 'deg');
        
        celebrationContainer.appendChild(photo);
        photoIndex++;
        
        setTimeout(() => photo.remove(), 4000);
    }, 200);
    
    // Hearts explosion - CONTINUOUS LOOP
    setInterval(() => {
        createHeartBurst();
    }, 500);
    
    // Add additional celebration emojis
    setInterval(() => {
        createCelebrationEmojis();
    }, 800);
}

function createHeartBurst() {
    const hearts = ['❤️', '💖', '💕', '💓', '💗', '💝', '💘'];
    
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.className = 'love-emoji';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        const endX = (Math.random() - 0.5) * 300;
        const endY = -Math.random() * 500 - 200;
        
        heart.style.left = startX + 'px';
        heart.style.top = startY + 'px';
        heart.style.setProperty('--tx', endX + 'px');
        heart.style.setProperty('--ty', endY + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3000);
    }
}

function createCelebrationEmojis() {
    const celebrationEmojis = ['🎉', '🎊', '✨', '💫', '🌟', '⭐', '🎈', '🎆', '🎇', '💐', '🌹', '🌺'];
    
    for (let i = 0; i < 2; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'love-emoji';
        emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        const endX = (Math.random() - 0.5) * 400;
        const endY = -Math.random() * 600 - 100;
        
        emoji.style.left = startX + 'px';
        emoji.style.top = startY + 'px';
        emoji.style.setProperty('--tx', endX + 'px');
        emoji.style.setProperty('--ty', endY + 'px');
        
        document.body.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 3000);
    }
}
