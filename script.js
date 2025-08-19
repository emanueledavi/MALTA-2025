document.addEventListener('DOMContentLoaded', () => {

    // Funzione per il conto alla rovescia
    function setupCountdown() {
        const tripDate = new Date("September 8, 2025 12:00:00").getTime();
        const countdownContainer = document.querySelector('.countdown-container');
        let countdownIntervalId = null;

        if (!countdownContainer) {
            return; // Esci se non sei sulla homepage
        }

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
    
    // Funzioni per il meteo
    const API_KEY = '53334284b91f30ed3191d0ddfd120800'; // ⚠️ Assicurati che sia la tua chiave
    const city = 'Valletta, MT';

    function updateWeatherUI(data, isFullPage) {
        const weatherCard = document.getElementById('weather-card');
        const weatherDetailsContainer = document.getElementById('weather-details-container');
        
        if (isFullPage) {
            if (weatherDetailsContainer) {
                const detailsContent = `
                    <h3 class="card-title">Previsioni Dettagliate</h3>
                    <p><strong>Condizioni:</strong> ${data.weather[0].description}</p>
                    <p><strong>Temperatura:</strong> ${Math.round(data.main.temp)}°C</p>
                    <p><strong>Umidità:</strong> ${data.main.humidity}%</p>
                    <p><strong>Velocità Vento:</strong> ${Math.round(data.wind.speed * 3.6)} km/h</p>
                    <p><strong>Pressione:</strong> ${data.main.pressure} hPa</p>
                    <p><strong>Visibilità:</strong> ${data.visibility / 1000} km</p>
                    <p><strong>Alba:</strong> ${new Date(data.sys.sunrise * 1000).toLocaleTimeString('it-IT')}</p>
                    <p><strong>Tramonto:</strong> ${new Date(data.sys.sunset * 1000).toLocaleTimeString('it-IT')}</p>
                `;
                weatherDetailsContainer.innerHTML = detailsContent;
            }
        } else {
            if (weatherCard) {
                const temperature = Math.round(data.main.temp);
                const description = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = Math.round(data.wind.speed * 3.6);
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

                const homeContent = `
                    <div class="weather-content">
                        <div class="weather-icon-container">
                            <img src="${iconUrl}" alt="${description}" class="weather-icon">
                        </div>
                        <p class="weather-temperature">${temperature}°C</p>
                        <p class="weather-description">${description}</p>
                        <div class="weather-details">
                            <p><i class="fas fa-tint"></i> Umidità: ${humidity}%</p>
                            <p><i class="fas fa-wind"></i> Vento: ${windSpeed} km/h</p>
                        </div>
                    </div>
                `;
                weatherCard.innerHTML = homeContent;
                
                // Aggiungi l'animazione corretta
                const weatherMain = data.weather[0].main.toLowerCase();
                const iconImg = weatherCard.querySelector('.weather-icon');
                if (iconImg) {
                    if (weatherMain.includes('clear')) {
                        iconImg.classList.add('sun-animation');
                    } else if (weatherMain.includes('clouds')) {
                        iconImg.classList.add('clouds-animation');
                    } else if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) {
                        iconImg.classList.add('rain-animation');
                    }
                }
            }
        }
    }

    async function fetchWeather(isFullPage = false) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Impossibile recuperare i dati del meteo.');
            }
            const data = await response.json();
            updateWeatherUI(data, isFullPage);
        } catch (error) {
            console.error("Errore nel recupero del meteo:", error);
            const container = isFullPage ? document.getElementById('weather-details-container') : document.getElementById('weather-card');
            if (container) {
                container.innerHTML = `<p class="error-message">Errore nel caricamento del meteo.</p>`;
            }
        }
    }
    
    // Funzione per il menu responsive
    function setupMobileMenu() {
        const hamburgerBtn = document.querySelector('.hamburger-menu');
        const closeBtn = document.querySelector('.close-menu');
        const navContainer = document.querySelector('.nav-links-container');
        const body = document.body;

        if (hamburgerBtn && navContainer && closeBtn) {
            hamburgerBtn.addEventListener('click', () => {
                navContainer.classList.add('open');
                body.classList.add('no-scroll');
            });

            closeBtn.addEventListener('click', () => {
                navContainer.classList.remove('open');
                body.classList.remove('no-scroll');
            });
        }
    }

    // Controlla se l'elemento 'gallery-grid' esiste prima di avviare la funzione
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        // Aggiungi qui la tua funzione per la galleria, ad esempio:
        // setupGallery();
    }


    // Avvia tutte le funzionalità quando la pagina è pronta
    setupCountdown();
    setupMobileMenu();
    
    // Controlla la pagina corrente e avvia la funzione meteo appropriata
    const isMeteoPage = window.location.pathname.endsWith('meteo.html');
    if (isMeteoPage) {
        fetchWeather(true);
    } else {
        fetchWeather();
    }
});