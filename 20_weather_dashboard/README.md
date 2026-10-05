# Weather Dashboard

## Description

A beautiful, glassmorphism-styled weather application. It features a current weather view and a 5-day forecast. **This version uses dynamically generated Demo Data** and does not require an external API key.

## Features

- Premium UI utilizing Glassmorphism (`backdrop-filter: blur`) over dynamic gradient backgrounds.
- Background gradient changes dynamically based on the simulated temperature (Cold = Blue, Warm = Orange).
- Form search triggering a simulated network request.
- Auto-generated 5-day forecast calculating relative days based on the current system date.
- Highly visible disclaimer noting the use of demo data.

## Technologies

- HTML5
- CSS3 (Glassmorphism, CSS Grid)
- JavaScript (Random Math, Date manipulation)

## How to Run

Open `index.html` in a web browser. Type any city name into the search bar and press enter to generate a new simulated weather report.

## What I Learned

- Implementing glass UI elements over vibrant background gradients.
- Structuring a fake API payload in JavaScript to test UI integration before connecting a real backend/API.
- Manipulating CSS Root variables via JavaScript to change the entire app's background dynamically based on data state (temperature).
