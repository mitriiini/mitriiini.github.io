const hamburgerMenu = document.querySelector('.hamburger-menu');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');
const themeToggle = document.getElementById('theme-toggle');
const mainContent = document.querySelector('main');

function openSidebar() {
    sidebar.style.left = '20px';
}

function closeSidebar() {
    sidebar.style.left = '-350px';
}

function closeSidebarOnClickOutside(event) {
    const isClickInside = sidebar.contains(event.target) || hamburgerMenu.contains(event.target);
    if (!isClickInside) {
        closeSidebar();
    }
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        mainContent.style.color = '#FFFFFF';
    } else {
        mainContent.style.color = '#0C0C0C';
    }
    localStorage.setItem('themePreference', theme);
}

function setThemeBasedOnTime() {
    const currentHour = new Date().getHours();
    let themeToApply;

    if (currentHour >= 5 && currentHour < 17) {
        themeToApply = 'light';
        themeToggle.checked = false;
    } else {
        themeToApply = 'dark';
        themeToggle.checked = true;
    }
    setTheme(themeToApply);
}

function toggleTheme() {
    const selectedTheme = themeToggle.checked ? 'dark' : 'light';
    setTheme(selectedTheme);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('themePreference');

    if (savedTheme) {
        setTheme(savedTheme);
        themeToggle.checked = (savedTheme === 'dark');
    } else {
        setThemeBasedOnTime();
    }

    hamburgerMenu.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    document.addEventListener('click', closeSidebarOnClickOutside);

    const links = document.querySelectorAll('.sidebar ul li a');
    links.forEach((link) => {
        link.addEventListener('click', closeSidebar);
    });

    themeToggle.addEventListener('change', toggleTheme);
});