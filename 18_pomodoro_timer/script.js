document.addEventListener('DOMContentLoaded', () => {

    const modes = {
        pomodoro: { time: 25 * 60, color: '#ba4949', label: 'Focus Session' },
        shortBreak: { time: 5 * 60, color: '#38858a', label: 'Short Break' },
        longBreak: { time: 15 * 60, color: '#397097', label: 'Long Break' }
    };

    let currentMode = 'pomodoro';
    let timeLeft = modes[currentMode].time;
    let timerInterval = null;
    let isRunning = false;
    let sessionCount = 1;

    // DOM Elements
    const timeDisplay = document.getElementById('time');
    const modeLabel = document.getElementById('mode-label');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const sessionCountEl = document.getElementById('session-count');
    const alarmSound = document.getElementById('alarm-sound');
    
    // SVG Circle Setup
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = 0;

    function setProgress(percent) {
        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function updateDisplay() {
        timeDisplay.innerText = formatTime(timeLeft);
        const totalTime = modes[currentMode].time;
        const percentage = (timeLeft / totalTime) * 100;
        setProgress(percentage);
    }

    function switchMode(mode) {
        // Stop timer if running
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.innerText = 'Start';
        }

        currentMode = mode;
        timeLeft = modes[currentMode].time;
        modeLabel.innerText = modes[currentMode].label;
        
        // Update styling
        document.documentElement.style.setProperty('--current-bg', modes[currentMode].color);
        startBtn.style.color = modes[currentMode].color;
        
        // Update active class on buttons
        modeBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

        updateDisplay();
    }

    function startTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            startBtn.innerText = 'Start';
            isRunning = false;
        } else {
            startBtn.innerText = 'Pause';
            isRunning = true;
            
            timerInterval = setInterval(() => {
                timeLeft--;
                updateDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    startBtn.innerText = 'Start';
                    alarmSound.play();
                    
                    // Auto logic
                    if (currentMode === 'pomodoro') {
                        sessionCount++;
                        sessionCountEl.innerText = sessionCount;
                        // Every 4th session is a long break
                        if (sessionCount % 4 === 0) {
                            switchMode('longBreak');
                        } else {
                            switchMode('shortBreak');
                        }
                    } else {
                        switchMode('pomodoro');
                    }
                }
            }, 1000);
        }
    }

    // Event Listeners
    modeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchMode(e.target.getAttribute('data-mode'));
        });
    });

    startBtn.addEventListener('click', startTimer);
    
    resetBtn.addEventListener('click', () => {
        switchMode(currentMode); // Resetting the current mode
    });

    // Initialize
    updateDisplay();
});
