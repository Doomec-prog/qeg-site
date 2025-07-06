// This script must be placed in the <head> of the document.

// Self-invoking function to apply theme immediately and prevent FOUC
(function() {
  const htmlElement = document.documentElement;
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      htmlElement.classList.add('dark-mode');
    } else {
      htmlElement.classList.remove('dark-mode');
    }
  } catch (e) {
    console.error('Error applying theme from localStorage:', e);
  }
})();

// Attach event listener after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const themeSwitcher = document.getElementById('theme-switcher');
  const htmlElement = document.documentElement;

  if (!themeSwitcher) {
    return;
  }

  themeSwitcher.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-mode');

    try {
      if (htmlElement.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    } catch (e) {
      console.error('Error saving theme to localStorage:', e);
    }
  });
});
