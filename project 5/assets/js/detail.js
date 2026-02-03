// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const countryDetails = document.getElementById('countryDetails');
const modeIcon = document.querySelector('.mode-icon');
const modeText = document.querySelector('.mode-text');

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

// Get Country Name from URL
const getCountryName = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('name');
};

// Render Country Details
const renderCountryDetails = (country) => {
    const nativeName = country.name.nativeName
        ? Object.values(country.name.nativeName)[0].common
        : country.name.common;

    const currencies = country.currencies
        ? Object.values(country.currencies).map(curr => curr.name).join(', ')
        : 'N/A';

    const languages = country.languages
        ? Object.values(country.languages).join(', ')
        : 'N/A';

    const borderCountries = country.borders || [];

    countryDetails.innerHTML = `
        <div class="country-detail-container">
            <div>
                <img src="${country.flags.svg || country.flags.png}" alt="${country.name.common} flag" class="country-flag-large">
            </div>
            <div class="country-info-detailed">
                <h2>${country.name.common}</h2>
                <div class="info-grid">
                    <div class="info-column">
                        <p><strong>Native Name:</strong> ${nativeName}</p>
                        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> ${country.region}</p>
                        <p><strong>Sub Region:</strong> ${country.subregion || 'N/A'}</p>
                        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                    </div>
                    <div class="info-column">
                        <p><strong>Top Level Domain:</strong> ${country.tld ? country.tld[0] : 'N/A'}</p>
                        <p><strong>Currencies:</strong> ${currencies}</p>
                        <p><strong>Languages:</strong> ${languages}</p>
                    </div>
                </div>
                ${borderCountries.length > 0 ? `
                    <div class="border-countries">
                        <strong>Border Countries:</strong>
                        <div class="border-tags" id="borderTags">
                            ${borderCountries.map(border => `
                                <span class="border-tag" data-code="${border}">${border}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    // Fetch border country names
    if (borderCountries.length > 0) {
        fetchBorderCountryNames(borderCountries);
    }
};

// Fetch Border Country Names
const fetchBorderCountryNames = async (borderCodes) => {
    try {
        const codes = borderCodes.join(',');
        const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const countries = await response.json();

        const borderTags = document.getElementById('borderTags');
        if (borderTags) {
            borderTags.innerHTML = countries.map(country => `
                <a href="details.html?name=${encodeURIComponent(country.name.common)}" class="border-tag">
                    ${country.name.common}
                </a>
            `).join('');
        }
    } catch (error) {
        console.error('Error fetching border countries:', error);
    }
};

// Fetch Country Details by Name with fullText
const fetchCountryDetails = async (name) => {
    try {
        countryDetails.innerHTML = '<p style="text-align: center; padding: 3rem;">Loading country details...</p>';

        // Using fullText=true to get exact match
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.length > 0) {
            renderCountryDetails(data[0]);
        } else {
            throw new Error('No country data found');
        }
    } catch (error) {
        console.error('Error fetching country details:', error);
        countryDetails.innerHTML = `
            <p style="text-align: center; color: red; padding: 3rem;">
                Failed to load country details. Please try again later.
                <br><br>
                <button onclick="window.history.back()" style="padding: 0.5rem 2rem; background: var(--element-bg); border: none; border-radius: 5px; cursor: pointer; box-shadow: 0 2px 5px var(--shadow);">
                    Go Back
                </button>
            </p>
        `;
    }
};

// Initialize
initDarkMode();
const countryName = getCountryName();

if (countryName) {
    fetchCountryDetails(countryName);
} else {
    countryDetails.innerHTML = `
        <p style="text-align: center; color: red; padding: 3rem;">
            No country specified.
            <br><br>
            <a href="index.html" style="padding: 0.5rem 2rem; background: var(--element-bg); border-radius: 5px; text-decoration: none; color: var(--text-color); display: inline-block; box-shadow: 0 2px 5px var(--shadow);">
                Go to Home
            </a>
        </p>
    `;
}