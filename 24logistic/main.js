document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link')
  const langButtons = document.querySelectorAll('.lang-btn')
  const root = document.documentElement
  const loginLink = document.getElementById('login-link')
  const topGetStarted = document.querySelector('.auth-btn.solid')
  const heroTitle = document.querySelector('.hero-title')
  const heroSubtitle = document.querySelector('.hero-subtitle')
  const heroPrimaryBtn = document.querySelector('.hero-btn.primary')
  const heroSecondaryBtn = document.querySelector('.hero-btn.secondary')
  const heroNote = document.querySelector('.hero-note')
  const clientPills = document.querySelectorAll('.client-pill')

  const translations = {
    az: {
      nav: ['Xüsusiyyətlər', 'Qiymətləndirmə', 'Haqqımızda', 'FAQ'],
      login: 'Daxil ol',
      topGetStarted: 'Başla',
      heroTitle:
        'Şəffaflıq və real vaxt izləmə<br />Avtomatik çatdırılma vaxtı<br />Xidmət keyfiyyətinin artırılması',
      heroSubtitle:
        'Gündəlik zəng həcmi, zaman itkisi və proseslər, müştəri emosiyaları və texnoloji həllərin önəmi.',
      heroPrimary: 'Başla',
      heroSecondary: 'Platformamız',
      heroNote: 'Aparıcı komandaların seçimi',
      clients: ['azerexpress', 'birbank', 'azcargo', 'smartlog']
    },
    en: {
      nav: ['Features', 'Pricing', 'About', 'FAQ'],
      login: 'Log in',
      topGetStarted: 'Get started',
      heroTitle: 'Dynamic<br />Warehousing Solutions',
      heroSubtitle:
        'Helping logistics and manufacturing companies improve operational efficiency with real-time visibility and automation.',
      heroPrimary: 'Get started',
      heroSecondary: 'Our Platform',
      heroNote: 'Trusted by leading teams',
      clients: ['amazon', 'wayfair', 'etsy', 'ebay']
    }
  }

  const applyLanguage = (lang) => {
    const t = translations[lang]
    if (!t) return

    const navArray = Array.from(navLinks)
    t.nav.forEach((label, index) => {
      if (navArray[index]) navArray[index].textContent = label
    })

    if (loginLink) loginLink.textContent = t.login
    if (topGetStarted) topGetStarted.textContent = t.topGetStarted

    if (heroTitle) heroTitle.innerHTML = t.heroTitle
    if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle

    if (heroPrimaryBtn) heroPrimaryBtn.textContent = t.heroPrimary
    if (heroSecondaryBtn) heroSecondaryBtn.textContent = t.heroSecondary

    if (heroNote) heroNote.textContent = t.heroNote

    const pillsArray = Array.from(clientPills)
    t.clients.forEach((label, index) => {
      if (pillsArray[index]) pillsArray[index].textContent = label
    })

    root.lang = lang
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      navLinks.forEach((item) => item.classList.remove('active'))
      link.classList.add('active')
    })
  })

  langButtons.forEach((button) => {
    button.addEventListener('click', () => {
      langButtons.forEach((item) => item.classList.remove('active'))
      button.classList.add('active')

      const lang = button.getAttribute('data-lang')
      applyLanguage(lang)
    })
  })

  applyLanguage('az')

  const handleGetStartedClick = () => {
    window.location.href = 'get-started.html'
  }

  if (topGetStarted) {
    topGetStarted.addEventListener('click', handleGetStartedClick)
  }

  if (heroPrimaryBtn) {
    heroPrimaryBtn.addEventListener('click', handleGetStartedClick)
  }
})
