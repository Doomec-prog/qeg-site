// This script must be placed in the <head> of the document.

// Self-invoking function to apply theme immediately and prevent FOUC
(function() {
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    htmlElement.classList.add('dark-mode');
  } else {
    // It's good practice to ensure the class is removed if value is 'light' or null
    htmlElement.classList.remove('dark-mode');
  }
})();

// Attach event listener after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const themeSwitcher = document.getElementById('theme-switcher');
  const htmlElement = document.documentElement;

  // Guard clause to prevent errors if the button doesn't exist on a page
  if (!themeSwitcher) {
    return;
  }

  // Event listener for the button click
  themeSwitcher.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-mode');

    // Save the new theme preference
    if (htmlElement.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
});
