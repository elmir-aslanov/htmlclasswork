// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const searchInput = document.getElementById('searchInput');
const filterBtn = document.getElementById('filterBtn');
const dropdownContent = document.getElementById('dropdownContent');
const countriesGrid = document.getElementById('countriesGrid');
const modeIcon = document.querySelector('.mode-icon');
const modeText = document.querySelector('.mode-text');

// State
let allCountries = [];
let currentRegion = 'all';

// Dark Mode
const initDarkMode = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateDarkModeButton(true);
    }
};

const updateDarkModeButton = (isDark) => {
    if (isDark) {
        modeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        modeText.textContent = 'Light Mode';
    } else {
        modeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        modeText.textContent = 'Dark Mode';
    }
};

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeButton(isDarkMode);
});

// Dropdown Toggle
filterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownContent.classList.toggle('show');
});

document.addEventListener('click', () => {
    dropdownContent.classList.remove('show');
});

// Render Countries Function
const renderCountries = (countries) => {
    if (!countries || countries.length === 0) {
        countriesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; padding: 3rem;">No countries found</p>';
        return;
    }

    countriesGrid.innerHTML = countries.map(country => `
        <a href="details.html?name=${encodeURIComponent(country.name.common)}" class="country-card">
            <img src="${country.flags.svg || country.flags.png}" alt="${country.name.common} flag" class="country-flag" loading="lazy">
            <div class="country-info">
                <h2 class="country-name">${country.name.common}</h2>
                <div class="country-details">
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                </div>
            </div>
        </a>
    `).join('');
};

// Fetch All Countries
const fetchAllCountries = async () => {
    try {
        countriesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; padding: 3rem;">Loading countries...</p>';
        
        const response = await fetch('https://restcountries.com/v3.1/all');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        allCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        renderCountries(allCountries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        countriesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: red; padding: 3rem;">Failed to load countries. Please try again later.</p>';
    }
};

// Search Functionality
const searchCountries = async (query) => {
    if (!query.trim()) {
        if (currentRegion === 'all') {
            renderCountries(allCountries);
        } else {
            filterByRegion(currentRegion);
        }
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            renderCountries([]);
            return;
        }

        const data = await response.json();
        
        // Apply region filter if one is selected
        if (currentRegion !== 'all') {
            const filtered = data.filter(country => 
                country.region.toLowerCase() === currentRegion.toLowerCase()
            );
            renderCountries(filtered);
        } else {
            renderCountries(data);
        }
    } catch (error) {
        console.error('Error searching countries:', error);
        renderCountries([]);
    }
};

// Filter by Region
const filterByRegion = async (region) => {
    currentRegion = region;

    if (region === 'all') {
        if (searchInput.value.trim()) {
            searchCountries(searchInput.value);
        } else {
            renderCountries(allCountries);
        }
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // If there's a search query, filter the results
        if (searchInput.value.trim()) {
            const filtered = data.filter(country =>
                country.name.common.toLowerCase().includes(searchInput.value.toLowerCase())
            );
            renderCountries(filtered);
        } else {
            renderCountries(data);
        }
    } catch (error) {
        console.error('Error filtering by region:', error);
        renderCountries([]);
    }
};

// Event Listeners
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value;
    
    if (query.length === 0) {
        searchCountries('');
        return;
    }
    
    // Debounce search
    searchTimeout = setTimeout(() => {
        if (query.length >= 2) {
            searchCountries(query);
        }
    }, 300);
});

// Region Filter Click
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const region = e.target.dataset.region;
        filterByRegion(region);
        dropdownContent.classList.remove('show');
        
        // Update button text
        const btnText = filterBtn.querySelector('span');
        btnText.textContent = e.target.textContent;
    });
});

// Initialize
initDarkMode();
fetchAllCountries();