document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.getElementById('dropdown-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const cityList = document.getElementById('city-list');
    const selectedCityText = document.getElementById('selected-city-text');
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date-display');
    const body = document.body;

    // City Data
    const cities = [
        { name: "📍 My Local Time", zone: "local" },
        { name: "🇳🇿 Auckland", zone: "Pacific/Auckland" },
        { name: "🇦🇺 Sydney", zone: "Australia/Sydney" },
        { name: "🇯🇵 Tokyo", zone: "Asia/Tokyo" },
        { name: "🇰🇷 Seoul", zone: "Asia/Seoul" },
        { name: "🇸🇬 Singapore", zone: "Asia/Singapore" },
        { name: "🇹🇭 Bangkok", zone: "Asia/Bangkok" },
        { name: "🇮🇳 Mumbai", zone: "Asia/Kolkata" },
        { name: "🇦🇪 Dubai", zone: "Asia/Dubai" },
        { name: "🇷🇺 Moscow", zone: "Europe/Moscow" },
        { name: "🇬🇷 Athens", zone: "Europe/Athens" },
        { name: "🇫🇷 Paris", zone: "Europe/Paris" },
        { name: "🇬🇧 London", zone: "Europe/London" },
        { name: "🇧🇷 São Paulo", zone: "America/Sao_Paulo" },
        { name: "🇺🇸 New York", zone: "America/New_York" },
        { name: "🇺🇸 Chicago", zone: "America/Chicago" },
        { name: "🇺🇸 Los Angeles", zone: "America/Los_Angeles" }
    ];

    let currentZone = "local";

    // Initialize Dropdown
    function initDropdown() {
        // Populate List
        cities.forEach(city => {
            const li = document.createElement('li');
            li.className = "px-6 py-3 text-white hover:bg-blue-400/30 cursor-pointer transition-colors text-sm font-medium tracking-wide flex items-center";
            li.textContent = city.name;
            li.dataset.zone = city.zone;

            li.addEventListener('click', () => {
                selectCity(city);
            });

            cityList.appendChild(li);
        });

        // Toggle Menu
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('hidden');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.add('hidden');
            }
        });
    }

    function selectCity(city) {
        currentZone = city.zone;
        selectedCityText.textContent = city.name;
        dropdownMenu.classList.add('hidden');
        updateClock(); // Update immediately
    }

    // Enhanced 3-Color Gradients
    const gradients = {
        dawn: 'linear-gradient(to bottom right, #ff9a9e, #fecfef, #fad0c4)',      // 5 AM - 7 AM
        day: 'linear-gradient(to bottom right, #2980b9, #6dd5fa, #ffffff)',       // 7 AM - 6 PM
        twilight: 'linear-gradient(to bottom right, #667eea, #764ba2, #434343)',  // 6 PM - 8 PM
        night: 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)'      // 8 PM - 5 AM
    };

    function updateClock() {
        const timeZone = currentZone === 'local' ? undefined : currentZone;
        const now = new Date();

        const timeOptions = {
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false, timeZone: timeZone
        };

        const dateOptions = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            timeZone: timeZone
        };

        try {
            const timeString = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
            const dateString = new Intl.DateTimeFormat('en-US', dateOptions).format(now);

            clockElement.textContent = timeString;
            dateElement.textContent = dateString;

            // Background Logic
            const hourString = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric', hour12: false, timeZone: timeZone
            }).format(now);

            const currentHour = parseInt(hourString, 10);
            updateBackground(currentHour);

        } catch (e) {
            console.error("Error formatting time:", e);
            clockElement.textContent = "Error";
        }
    }

    function updateBackground(hour) {
        let gradient;
        if (hour >= 5 && hour < 7) gradient = gradients.dawn;
        else if (hour >= 7 && hour < 18) gradient = gradients.day;
        else if (hour >= 18 && hour < 20) gradient = gradients.twilight;
        else gradient = gradients.night;

        body.style.background = gradient;
    }

    // Init
    initDropdown();
    updateClock();
    setInterval(updateClock, 1000);
});
