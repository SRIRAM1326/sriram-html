# Pomodoro Timer

## Description

A beautiful, functional Pomodoro productivity timer. It features three modes (Pomodoro, Short Break, Long Break), a visual SVG progress ring, and color transitions corresponding to the active mode.

## Features

- JavaScript `setInterval` for accurate countdown timer logic
- SVG circle element manipulated via JavaScript (`stroke-dashoffset`) to act as a smooth progress indicator
- Dynamic CSS Variable updates (`--current-bg`) to smoothly transition the app's background color when modes change
- Audio notification when a session ends using the HTML5 `<audio>` element
- Automatic session tracking (switches to long break after 4 sessions)

## Technologies

- HTML5 (SVG, Audio)
- CSS3 (Variables, Transitions)
- JavaScript (DOM, Intervals, Math)

## How to Run

Open `index.html` in a web browser. Click start to begin the timer.

## What I Learned

- Manipulating SVG paths using JavaScript. The formula `circumference - (percent / 100) * circumference` applied to `strokeDashoffset` is a powerful way to create circular progress bars without any external libraries.
- Changing CSS Root variables dynamically via JS `document.documentElement.style.setProperty()` to globally reskin the app.
