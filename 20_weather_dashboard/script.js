document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('search-form');
    const input = document.getElementById('city-input');
    const dashboard = document.getElementById('dashboard');

    // DOM Elements to update
    const cityNameEl = document.getElementById('city-name');
    const currentTempEl = document.getElementById('current-temp');
    const conditionEl = document.getElementById('current-condition');
    const mainIconEl = document.getElementById('main-icon');
    const feelsLikeEl = document.getElementById('feels-like');
    const humidityEl = document.getElementById('humidity');
    const windEl = document.getElementById('wind');
    const sunTimesEl = document.getElementById('sun-times');
    const forecastListEl = document.getElementById('forecast-list');

    // Fake API Data Generator
    const generateDemoData = (city) => {
        const temp = Math.floor(Math.random() * 30) + 5; // 5 to 35 C
        const conditions = [
            { text: 'Sunny', icon: 'fa-sun', color: '#f59e0b' },
            { text: 'Partly Cloudy', icon: 'fa-cloud-sun', color: '#f59e0b' },
            { text: 'Cloudy', icon: 'fa-cloud', color: '#475569' },
            { text: 'Rain', icon: 'fa-cloud-showers-heavy', color: '#2563eb' },
            { text: 'Thunderstorm', icon: 'fa-cloud-bolt', color: '#475569' },
            { text: 'Snow', icon: 'fa-snowflake', color: '#ffffff' }
        ];
        
        const currentCond = conditions[Math.floor(Math.random() * conditions.length)];
        
        // Update App Background based on temp
        if (temp < 10) {
            document.documentElement.style.setProperty('--bg-app', 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)');
        } else if (temp > 25) {
            document.documentElement.style.setProperty('--bg-app', 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)');
        } else {
            document.documentElement.style.setProperty('--bg-app', 'linear-gradient(135deg, #74ebd5 0%, #9face6 100%)');
        }

        return {
            city: city.charAt(0).toUpperCase() + city.slice(1),
            temp: temp,
            feelsLike: temp + (Math.floor(Math.random() * 5) - 2),
            humidity: Math.floor(Math.random() * 40) + 40,
            wind: Math.floor(Math.random() * 20) + 5,
            condition: currentCond,
            forecast: Array.from({length: 5}).map((_, i) => {
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const d = new Date();
                d.setDate(d.getDate() + i + 1);
                
                const fTemp = Math.floor(Math.random() * 25) + 10;
                return {
                    day: days[d.getDay()],
                    condition: conditions[Math.floor(Math.random() * conditions.length)],
                    hi: fTemp + 4,
                    lo: fTemp - 4
                };
            })
        };
    };

    function renderWeather(data) {
        // Current
        cityNameEl.innerText = data.city;
        currentTempEl.innerText = `${data.temp}°C`;
        conditionEl.innerText = data.condition.text;
        feelsLikeEl.innerText = `${data.feelsLike}°C`;
        humidityEl.innerText = `${data.humidity}%`;
        windEl.innerText = `${data.wind} km/h`;
        
        // Random sun times for demo
        const sunrise = `0${Math.floor(Math.random() * 2) + 5}:${Math.floor(Math.random() * 40) + 10}`;
        const sunset = `${Math.floor(Math.random() * 2) + 17}:${Math.floor(Math.random() * 40) + 10}`;
        sunTimesEl.innerText = `${sunrise} / ${sunset}`;

        mainIconEl.className = `fa-solid ${data.condition.icon}`;
        mainIconEl.style.color = data.condition.color;

        // Forecast
        forecastListEl.innerHTML = '';
        data.forecast.forEach(f => {
            const div = document.createElement('div');
            div.className = 'forecast-item';
            div.innerHTML = `
                <span class="day">${f.day}</span>
                <i class="fa-solid ${f.condition.icon} icon" style="color: ${f.condition.color}"></i>
                <span class="condition">${f.condition.text}</span>
                <div class="hi-lo">
                    <span class="hi">${f.hi}°</span>
                    <span class="lo">${f.lo}°</span>
                </div>
            `;
            forecastListEl.appendChild(div);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = input.value.trim();
        if (city) {
            dashboard.classList.add('loading');
            
            // Simulate network delay
            setTimeout(() => {
                const data = generateDemoData(city);
                renderWeather(data);
                dashboard.classList.remove('loading');
                input.value = '';
            }, 600);
        }
    });

});
