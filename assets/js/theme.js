document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const htmlElement = document.documentElement; // Get the <html> element

    // Function to apply the theme based on localStorage
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            htmlElement.classList.add('dark-mode');
        } else {
            htmlElement.classList.remove('dark-mode');
        }
    };

    // Apply theme on initial load to avoid flash of wrong theme
    applyTheme();

    // Event listener for the button click
    themeSwitcher.addEventListener('click', () => {
        htmlElement.classList.toggle('dark-mode');
        
        // Save the new theme preference to localStorage
        if (htmlElement.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});
