document.addEventListener('DOMContentLoaded', () => {

    // Funzione per il conto alla rovescia
    function setupCountdown() {
        const tripDate = new Date("September 8, 2025 12:00:00").getTime();
        const countdownContainer = document.querySelector('.countdown-container');
        let countdownIntervalId = null;

        countdownIntervalId = setInterval(function() {
            const now = new Date().getTime();
            const distance = tripDate - now;

            if (distance < 0) {
                clearInterval(countdownIntervalId);
                countdownContainer.innerHTML = "<h2 style='text-align:center; color: var(--primary-color);'>Sei arrivato a Malta! ✈️</h2>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
        }, 1000);
    }

    // Funzione per caricare i dati meteo
    function loadWeather() {
        const apiKey = '53334284b91f30ed3191d0ddfd120800';
        const lat = 35.9122; // Latitudine di Sliema
        const lon = 14.5057; // Longitudine di Sliema
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=it`;
        const weatherContainer = document.getElementById('weather-info');

        fetch(weatherUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Impossibile recuperare i dati meteo.');
                }
                return response.json();
            })
            .then(data => {
                const temp = Math.round(data.main.temp);
                const description = data.weather[0].description;
                const iconCode = data.weather[0].icon;
                const humidity = data.main.humidity;
                const windSpeed = Math.round(data.wind.speed * 3.6);

                let animationClass = '';
                let colorClass = '';

                if (iconCode.startsWith('01')) { // Sole
                    animationClass = 'sun-animation';
                    colorClass = 'sun-bg';
                } else if (iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) { // Nuvole
                    animationClass = 'clouds-animation';
                    colorClass = 'clouds-bg';
                } else if (iconCode.startsWith('09') || iconCode.startsWith('10')) { // Pioggia
                    animationClass = 'rain-animation';
                    colorClass = 'rain-bg';
                }

                weatherContainer.innerHTML = `
                    <div class="weather-icon-container ${colorClass}">
                        <img src="https://openweathermap.org/img/wn/${iconCode}@4x.png" alt="Icona meteo" class="weather-icon ${animationClass}">
                    </div>
                    <p class="weather-temperature">${temp}°C</p>
                    <p class="weather-description">${description}</p>
                    <div class="weather-details">
                        <p><i class="fas fa-tint"></i> Umidità: ${humidity}%</p>
                        <p><i class="fas fa-wind"></i> Vento: ${windSpeed} km/h</p>
                    </div>
                `;
            })
            .catch(error => {
                console.error("Errore nel recupero del meteo:", error);
                weatherContainer.innerHTML = `<p>Errore nel caricamento del meteo.</p>`;
            });
    }

    // Avvia le funzionalità quando la pagina è pronta
    setupCountdown();
    loadWeather();
});