document.addEventListener('DOMContentLoaded', () => {

    // Funzioni per la gestione degli itinerari
    function showItinerary(itineraryId) {
        document.getElementById('itinerary-intro').style.display = 'none';

        const detailsContainer = document.getElementById('itinerary-content');
        const itineraryContent = document.getElementById(itineraryId + '-content');

        if (itineraryContent) {
            detailsContainer.innerHTML = itineraryContent.innerHTML;
        }

        document.getElementById('itinerary-details').style.display = 'block';

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        attachNavigationButtonListeners();
    }

    function showIntro() {
        document.getElementById('itinerary-details').style.display = 'none';
        document.getElementById('itinerary-intro').style.display = 'block';
    }

    function attachNavigationButtonListeners() {
        const navButtons = document.querySelectorAll('.itinerary-btn-nav');
        navButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const itineraryToShow = event.currentTarget.getAttribute('data-itinerary');
                showItinerary(itineraryToShow);
            });
        });
    }

    // Aggiungi listener per i bottoni iniziali
    const initialButtons = document.querySelectorAll('.itinerary-btn');
    initialButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const itineraryToShow = event.target.getAttribute('data-itinerary');
            showItinerary(itineraryToShow);
        });
    });

    // Aggiungi listener per il pulsante "Torna agli itinerari"
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
        backButton.addEventListener('click', showIntro);
    }


    // Funzioni per la gestione del menu mobile
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const closeBtn = document.querySelector('.close-menu');
    const navMenu = document.querySelector('.nav-links-container');
    const body = document.body;
    
    // Aggiungi event listener ai pulsanti
    if (hamburgerBtn && closeBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.add('open');
            body.classList.add('no-scroll');
            hamburgerBtn.style.display = 'none';
            closeBtn.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            navMenu.classList.remove('open');
            body.classList.remove('no-scroll');
            hamburgerBtn.style.display = 'block';
            closeBtn.style.display = 'none';
        });

        // Nascondi la 'X' all'avvio su desktop per evitare che sia visibile
        if (window.innerWidth > 768) {
            closeBtn.style.display = 'none';
        }
    }
});